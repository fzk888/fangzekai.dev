import { Redis } from "@upstash/redis";
import { createHash } from "crypto";
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
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;
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

function getClientIdentifier(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || request.headers.get("x-real-ip") || "unknown";

  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

async function checkRateLimit(redis: Redis, request: NextRequest) {
  const now = Math.floor(Date.now() / 1000);
  const windowId = Math.floor(now / RATE_LIMIT_WINDOW_SECONDS);
  const retryAfter = RATE_LIMIT_WINDOW_SECONDS - (now % RATE_LIMIT_WINDOW_SECONDS);
  const key = `guestbook_rate_limit:${getClientIdentifier(request)}:${windowId}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, RATE_LIMIT_WINDOW_SECONDS + 60);
  }

  return { allowed: count <= RATE_LIMIT_MAX, retryAfter };
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

    const rateLimit = await checkRateLimit(redis, request);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many messages", code: "RATE_LIMITED", retryAfter: rateLimit.retryAfter },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfter) },
        }
      );
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
