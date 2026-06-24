import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type GuestbookNote = {
  id: string;
  message: string;
  author: string;
  createdAt: string;
  tone: "sky" | "lime" | "rose" | "violet" | "amber" | "slate";
};

const GUESTBOOK_KEY = "guestbook_notes";
const GUESTBOOK_ID_KEY = "guestbook_note_id";
const MAX_MESSAGE_LENGTH = 120;
const MAX_NOTES = 50;
const tones: GuestbookNote["tone"][] = ["sky", "lime", "rose", "violet", "amber", "slate"];

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

function cleanMessage(value: unknown) {
  if (typeof value !== "string") return "";

  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

function parseNote(value: unknown): GuestbookNote | null {
  if (!value || typeof value !== "object") return null;

  const note = value as Partial<GuestbookNote>;
  if (
    typeof note.id !== "string" ||
    typeof note.message !== "string" ||
    typeof note.author !== "string" ||
    typeof note.createdAt !== "string" ||
    !tones.includes(note.tone as GuestbookNote["tone"])
  ) {
    return null;
  }

  return note as GuestbookNote;
}

export async function GET() {
  const redis = getRedis();

  if (!redis) {
    return NextResponse.json({ notes: [], configured: false });
  }

  try {
    const values = await redis.lrange<GuestbookNote | string>(GUESTBOOK_KEY, 0, MAX_NOTES - 1);
    const notes = values
      .map((value) => {
        if (typeof value === "string") {
          try {
            return parseNote(JSON.parse(value));
          } catch {
            return null;
          }
        }

        return parseNote(value);
      })
      .filter((note): note is GuestbookNote => Boolean(note));

    return NextResponse.json({ notes, configured: true });
  } catch (error) {
    console.error("Guestbook read error:", error);
    return NextResponse.json({ notes: [], configured: true, error: "Failed to read notes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const redis = getRedis();

  if (!redis) {
    return NextResponse.json({ error: "Guestbook database is not configured" }, { status: 503 });
  }

  try {
    const body = await request.json().catch(() => null);
    const message = cleanMessage(body?.message);

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const numericId = await redis.incr(GUESTBOOK_ID_KEY);
    const note: GuestbookNote = {
      id: `guestbook-${numericId}`,
      message,
      author: "匿名朋友",
      createdAt: new Date().toISOString(),
      tone: tones[numericId % tones.length],
    };

    await redis.lpush(GUESTBOOK_KEY, note);
    await redis.ltrim(GUESTBOOK_KEY, 0, MAX_NOTES - 1);

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error("Guestbook write error:", error);
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
  }
}
