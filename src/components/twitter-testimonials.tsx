"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, Send } from "lucide-react";

type GuestbookNote = {
  id: string;
  message: string;
  author: string;
  createdAt: string;
  tone: "sky" | "lime" | "rose" | "violet" | "amber" | "slate";
};

const MAX_MESSAGE_LENGTH = 120;

const starterNotes: GuestbookNote[] = [
  {
    id: "starter-1",
    message: "这个站点很有个人气质，继续做下去会很酷。",
    author: "匿名朋友",
    createdAt: "刚刚",
    tone: "sky",
  },
  {
    id: "starter-2",
    message: "路过留一句：AI 项目和博客都可以继续更，想看。",
    author: "路过的人",
    createdAt: "今天",
    tone: "lime",
  },
  {
    id: "starter-3",
    message: "这个页面的氛围很舒服，有种真的有人在认真搭自己空间的感觉。",
    author: "访客",
    createdAt: "昨天",
    tone: "rose",
  },
  {
    id: "starter-4",
    message: "加油，慢慢把它改成完全属于你的作品集。",
    author: "朋友",
    createdAt: "2 天前",
    tone: "violet",
  },
  {
    id: "starter-5",
    message: "想看更多你做 Agent 和 RAG 的项目记录。",
    author: "匿名朋友",
    createdAt: "3 天前",
    tone: "amber",
  },
  {
    id: "starter-6",
    message: "保持这种探索感，网站会越来越像你。",
    author: "某位同学",
    createdAt: "上周",
    tone: "slate",
  },
];

const toneClassName: Record<GuestbookNote["tone"], string> = {
  sky: "from-sky-400/55",
  lime: "from-lime-400/55",
  rose: "from-rose-400/55",
  violet: "from-violet-400/55",
  amber: "from-amber-400/55",
  slate: "from-slate-400/55",
};

const tones: GuestbookNote["tone"][] = ["sky", "lime", "rose", "violet", "amber", "slate"];

function formatNoteTime(value: string) {
  if (!value.includes("T")) return value;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const diff = Date.now() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return "刚刚";
  if (diff < hour) return `${Math.floor(diff / minute)} 分钟前`;
  if (diff < day) return "今天";
  if (diff < 2 * day) return "昨天";
  if (diff < 7 * day) return `${Math.floor(diff / day)} 天前`;

  return date.toLocaleDateString("zh-CN", {
    month: "numeric",
    day: "numeric",
  });
}

function isGuestbookNote(note: unknown): note is GuestbookNote {
  if (!note || typeof note !== "object") return false;

  const maybeNote = note as Partial<GuestbookNote>;
  return (
    typeof maybeNote.id === "string" &&
    typeof maybeNote.message === "string" &&
    typeof maybeNote.author === "string" &&
    typeof maybeNote.createdAt === "string" &&
    tones.includes(maybeNote.tone as GuestbookNote["tone"])
  );
}

async function fetchGuestbookNotes() {
  const response = await fetch("/api/guestbook", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to load guestbook");
  }

  const data = await response.json();
  if (!Array.isArray(data.notes)) return [];
  return data.notes.filter(isGuestbookNote);
}

function GuestbookCard({ note }: { note: GuestbookNote }) {
  return (
    <article
      className="relative flex h-[92px] w-[232px] shrink-0 flex-col justify-between overflow-hidden rounded-lg border border-border/55 bg-card/50 p-3 shadow-sm backdrop-blur-sm"
    >
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${toneClassName[note.tone]} via-foreground/10 to-transparent`}
      />
      <p className="line-clamp-2 text-[13px] leading-5 text-foreground/90">“{note.message}”</p>
      <div className="flex items-center justify-between gap-3 pt-2 text-[10px] text-muted-foreground">
        <span className="truncate">{note.author}</span>
        <span className="shrink-0">{formatNoteTime(note.createdAt)}</span>
      </div>
    </article>
  );
}

export function TwitterTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState<GuestbookNote[]>(starterNotes);
  const [status, setStatus] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchGuestbookNotes()
      .then((remoteNotes) => {
        if (!cancelled) {
          setNotes(remoteNotes.length ? remoteNotes : starterNotes);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("数据库还没连上。");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const marqueeNotes = useMemo(() => [...notes, ...notes], [notes]);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  const submitNote = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setStatus("先写点什么再贴上墙。");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !isGuestbookNote(data?.note)) {
        throw new Error(data?.error || "Failed to save note");
      }

      setNotes((currentNotes) => [
        data.note,
        ...currentNotes.filter((note) => !note.id.startsWith("starter-")),
      ]);
      setMessage("");
      setStatus("已贴上墙");
      setIsWriting(false);
    } catch {
      setStatus("数据库还没连上。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-3 overflow-hidden">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <MessageCircle className="size-3.5" />
            留言簿
          </div>
          <h2 className="text-base font-semibold tracking-tight sm:text-lg">
            这里收着一些路过的话。
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">匿名也可以，随便留一句。</p>
      </div>

      {isWriting ? (
        <div className="rounded-full border border-border/55 bg-card/45 p-1 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="guestbook-message">留言</label>
            <input
              id="guestbook-message"
              autoFocus
              value={message}
              disabled={isSubmitting}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(event) => {
                setMessage(event.target.value);
                if (status) setStatus("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setIsWriting(false);
                  setMessage("");
                  return;
                }

                if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                  submitNote();
                }
              }}
              placeholder="写一句话..."
              className="h-8 min-w-0 flex-1 rounded-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground/65"
            />
            <span className="hidden text-[11px] text-muted-foreground sm:inline">
              {message.length}/{MAX_MESSAGE_LENGTH}
            </span>
            <button
              type="button"
              onClick={submitNote}
              disabled={isSubmitting}
              className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full bg-foreground px-3 text-xs font-medium text-background transition hover:bg-foreground/90 sm:px-3.5"
            >
              <Send className="size-3.5" />
              <span className="hidden sm:inline">{isSubmitting ? "保存中" : "贴上墙"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsWriting(true);
              if (status) setStatus("");
            }}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border/55 bg-card/45 px-3 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur transition hover:border-border hover:bg-card hover:text-foreground"
          >
            <Send className="size-3.5" />
            写一句留言
          </button>
          {status ? <span className="text-[11px] text-muted-foreground">{status}</span> : null}
        </div>
      )}

      <div className="group relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-background group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="size-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-background group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="size-5" />
        </button>

        <div
          ref={scrollRef}
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div
            className="flex w-max gap-4 hover:[animation-play-state:paused]"
            style={{
              animation: "scroll 62s linear infinite",
            }}
          >
            {marqueeNotes.map((note, idx) => (
              <GuestbookCard key={`${note.id}-${idx}`} note={note} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
