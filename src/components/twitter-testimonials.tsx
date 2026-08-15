"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import type { Locale } from "@/i18n/config";
import type { Translations } from "@/i18n/en";

type GuestbookNote = {
  id: string;
  message: string;
  author: string;
  createdAt: string;
  tone: "sky" | "lime" | "rose" | "violet" | "amber" | "slate";
};

const MAX_MESSAGE_LENGTH = 120;
const CARD_WIDTH = 232;
const CARD_GAP = 16;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const AUTO_SCROLL_SPEED = 34;

const starterNotes: GuestbookNote[] = [
  {
    id: "starter-1",
    message: "这个站点很有个人气质，继续做下去会很酷。",
    author: "匿名朋友",
    createdAt: "starter.justNow",
    tone: "sky",
  },
  {
    id: "starter-2",
    message: "路过留一句：AI 项目和博客都可以继续更，想看。",
    author: "路过的人",
    createdAt: "starter.today",
    tone: "lime",
  },
  {
    id: "starter-3",
    message: "这个页面的氛围很舒服，有种真的有人在认真搭自己空间的感觉。",
    author: "访客",
    createdAt: "starter.yesterday",
    tone: "rose",
  },
  {
    id: "starter-4",
    message: "加油，慢慢把它改成完全属于你的作品集。",
    author: "朋友",
    createdAt: "starter.2days",
    tone: "violet",
  },
  {
    id: "starter-5",
    message: "想看更多你做 Agent 和 RAG 的项目记录。",
    author: "匿名朋友",
    createdAt: "starter.3days",
    tone: "amber",
  },
  {
    id: "starter-6",
    message: "保持这种探索感，网站会越来越像你。",
    author: "某位同学",
    createdAt: "starter.7days",
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

function formatNoteTime(value: string, locale: Locale, t: Translations) {
  const starterTimes: Record<string, string> = {
    "starter.justNow": t.guestbook.justNow,
    "starter.today": t.guestbook.today,
    "starter.yesterday": t.guestbook.yesterday,
    "starter.2days": t.guestbook.daysAgo.replace("{count}", "2"),
    "starter.3days": t.guestbook.daysAgo.replace("{count}", "3"),
    "starter.7days": t.guestbook.daysAgo.replace("{count}", "7"),
  };
  if (starterTimes[value]) return starterTimes[value];
  if (!value.includes("T")) return value;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const diff = Date.now() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return t.guestbook.justNow;
  if (diff < hour) {
    return t.guestbook.minutesAgo.replace(
      "{count}",
      String(Math.floor(diff / minute))
    );
  }
  if (diff < day) return t.guestbook.today;
  if (diff < 2 * day) return t.guestbook.yesterday;
  if (diff < 7 * day) {
    return t.guestbook.daysAgo.replace(
      "{count}",
      String(Math.floor(diff / day))
    );
  }

  return date.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
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

function GuestbookCard({
  note,
  locale,
  t,
  isDuplicate = false,
}: {
  note: GuestbookNote;
  locale: Locale;
  t: Translations;
  isDuplicate?: boolean;
}) {
  return (
    <article
      role="listitem"
      aria-hidden={isDuplicate || undefined}
      className="relative flex h-[92px] w-[232px] shrink-0 flex-col justify-between overflow-hidden rounded-lg border border-border/55 bg-card/50 p-3 shadow-sm backdrop-blur-sm"
    >
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${toneClassName[note.tone]} via-foreground/10 to-transparent`}
      />
      <p className="line-clamp-2 text-[13px] leading-5 text-foreground/90">“{note.message}”</p>
      <div className="flex items-center justify-between gap-3 pt-2 text-[10px] text-muted-foreground">
        <span className="truncate">{note.author}</span>
        <span className="shrink-0">{formatNoteTime(note.createdAt, locale, t)}</span>
      </div>
    </article>
  );
}

export function TwitterTestimonials() {
  const { locale, t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollEndTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interactionResumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
  } | null>(null);
  const pauseReasonsRef = useRef(new Set<string>());
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState<GuestbookNote[]>(starterNotes);
  const [status, setStatus] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [groupRepeatCount, setGroupRepeatCount] = useState(1);

  useEffect(() => {
    let cancelled = false;

    fetchGuestbookNotes()
      .then((remoteNotes) => {
        if (!cancelled) {
          setNotes(remoteNotes.length ? [...remoteNotes, ...starterNotes] : starterNotes);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus(t.guestbook.unavailable);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [t.guestbook.unavailable]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport) return;

    const updateRepeatCount = () => {
      const singleSetWidth = Math.max(notes.length, 1) * CARD_STEP;
      setGroupRepeatCount(
        Math.max(1, Math.ceil((viewport.clientWidth + CARD_STEP) / singleSetWidth))
      );
    };

    updateRepeatCount();
    const resizeObserver = new ResizeObserver(updateRepeatCount);
    resizeObserver.observe(viewport);
    return () => resizeObserver.disconnect();
  }, [notes.length]);

  const groupNotes = useMemo(
    () =>
      Array.from({ length: groupRepeatCount }, () => notes).flat(),
    [groupRepeatCount, notes]
  );

  const setPauseReason = useCallback((reason: string, active: boolean) => {
    if (active) {
      pauseReasonsRef.current.add(reason);
    } else {
      pauseReasonsRef.current.delete(reason);
    }
    setIsPaused(pauseReasonsRef.current.size > 0);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const normalizeScrollPosition = useCallback(() => {
    const viewport = scrollRef.current;
    const firstGroup = firstGroupRef.current;
    if (!viewport || !firstGroup) return;

    const loopWidth = firstGroup.offsetWidth;
    if (loopWidth <= 0) return;

    while (viewport.scrollLeft >= loopWidth) {
      viewport.scrollLeft -= loopWidth;
    }
    while (viewport.scrollLeft < 0) {
      viewport.scrollLeft += loopWidth;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollEndTimeoutRef.current) {
      clearTimeout(scrollEndTimeoutRef.current);
    }
    scrollEndTimeoutRef.current = setTimeout(normalizeScrollPosition, 120);
  }, [normalizeScrollPosition]);

  const scheduleInteractionResume = useCallback((reason: string, delay: number) => {
    if (interactionResumeTimeoutRef.current) {
      clearTimeout(interactionResumeTimeoutRef.current);
    }
    interactionResumeTimeoutRef.current = setTimeout(() => {
      normalizeScrollPosition();
      setPauseReason(reason, false);
    }, delay);
  }, [normalizeScrollPosition, setPauseReason]);

  useEffect(
    () => () => {
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
      if (interactionResumeTimeoutRef.current) {
        clearTimeout(interactionResumeTimeoutRef.current);
      }
    },
    []
  );

  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport || isPaused || prefersReducedMotion) return;

    let previousTime = performance.now();
    let scrollPosition = viewport.scrollLeft;

    const animate = (currentTime: number) => {
      const elapsed = Math.min(currentTime - previousTime, 64);
      previousTime = currentTime;
      scrollPosition += (AUTO_SCROLL_SPEED * elapsed) / 1000;

      const loopWidth = firstGroupRef.current?.offsetWidth ?? 0;
      if (loopWidth > 0 && scrollPosition >= loopWidth) {
        scrollPosition %= loopWidth;
      }

      viewport.scrollLeft = scrollPosition;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return stopAutoScroll;
  }, [groupNotes, isPaused, prefersReducedMotion, stopAutoScroll]);

  const scroll = useCallback((direction: "left" | "right") => {
    const viewport = scrollRef.current;
    const firstGroup = firstGroupRef.current;
    if (!viewport || !firstGroup) return;

    stopAutoScroll();
    setPauseReason("manual", true);

    const loopWidth = firstGroup.offsetWidth;
    if (direction === "left" && viewport.scrollLeft < CARD_STEP) {
      viewport.scrollLeft += loopWidth;
    } else {
      normalizeScrollPosition();
    }

    viewport.scrollLeft += direction === "left" ? -CARD_STEP : CARD_STEP;
    scheduleInteractionResume("manual", 300);
  }, [normalizeScrollPosition, scheduleInteractionResume, setPauseReason, stopAutoScroll]);

  const submitNote = async () => {
    if (isSubmitting) return;

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setStatus(t.guestbook.empty);
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

      if (response.status === 429 || data?.code === "RATE_LIMITED") {
        setStatus(t.guestbook.rateLimited);
        return;
      }

      if (!response.ok || !isGuestbookNote(data?.note)) {
        throw new Error(data?.error || "Failed to save note");
      }

      setNotes((currentNotes) => [
        data.note,
        ...currentNotes.filter((note) => note.id !== data.note.id),
      ]);
      setMessage("");
      setStatus(t.guestbook.saved);
      setIsWriting(false);
    } catch {
      setStatus(t.guestbook.unavailable);
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
            {t.guestbook.label}
          </div>
          <h2 className="text-base font-semibold tracking-tight sm:text-lg">
            {t.guestbook.title}
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">{t.guestbook.subtitle}</p>
      </div>

      {isWriting ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitNote();
          }}
          className="rounded-full border border-border/55 bg-card/45 p-1 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="guestbook-message">
              {t.guestbook.inputLabel}
            </label>
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
                if (event.key === "Escape" && !isSubmitting) {
                  setIsWriting(false);
                  setMessage("");
                  return;
                }
              }}
              placeholder={t.guestbook.placeholder}
              className="h-8 min-w-0 flex-1 rounded-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground/65"
            />
            <span className="hidden text-[11px] text-muted-foreground sm:inline">
              {message.length}/{MAX_MESSAGE_LENGTH}
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full bg-foreground px-3 text-xs font-medium text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:px-3.5"
            >
              <Send className="size-3.5" />
              <span className="hidden sm:inline">
                {isSubmitting ? t.guestbook.saving : t.guestbook.submit}
              </span>
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsWriting(true);
              if (status) setStatus("");
            }}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border/55 bg-card/45 px-3 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur transition hover:border-border hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Send className="size-3.5" />
            {t.guestbook.write}
          </button>
        </div>
      )}

      {status ? (
        <p role="status" aria-live="polite" className="text-[11px] text-muted-foreground">
          {status}
        </p>
      ) : null}

      <div
        className="group relative"
        onFocusCapture={() => setPauseReason("focus", true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPauseReason("focus", false);
          }
        }}
      >
        <button
          type="button"
          onClick={() => scroll("left")}
          onPointerUp={(event) => event.currentTarget.blur()}
          className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/85 p-2 opacity-100 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:left-0 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
          aria-label={t.accessibility.scrollLeft}
        >
          <ChevronLeft className="size-5" />
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          onPointerUp={(event) => event.currentTarget.blur()}
          className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/85 p-2 opacity-100 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:right-0 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
          aria-label={t.accessibility.scrollRight}
        >
          <ChevronRight className="size-5" />
        </button>

        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label={t.guestbook.label}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              scroll(event.key === "ArrowLeft" ? "left" : "right");
            }
          }}
          onPointerDown={(event) => {
            if (interactionResumeTimeoutRef.current) {
              clearTimeout(interactionResumeTimeoutRef.current);
            }
            stopAutoScroll();
            setPauseReason("pointer", true);

            if (event.pointerType === "mouse" && event.button === 0) {
              event.currentTarget.setPointerCapture(event.pointerId);
              dragStateRef.current = {
                pointerId: event.pointerId,
                startX: event.clientX,
                startScrollLeft: event.currentTarget.scrollLeft,
              };
            }
          }}
          onPointerMove={(event) => {
            const dragState = dragStateRef.current;
            if (!dragState || dragState.pointerId !== event.pointerId) return;

            event.preventDefault();
            event.currentTarget.scrollLeft =
              dragState.startScrollLeft - (event.clientX - dragState.startX);
          }}
          onPointerUp={(event) => {
            if (dragStateRef.current?.pointerId === event.pointerId) {
              event.currentTarget.releasePointerCapture(event.pointerId);
              dragStateRef.current = null;
            }
            if (document.activeElement === event.currentTarget) {
              event.currentTarget.blur();
            }
            scheduleInteractionResume("pointer", event.pointerType === "touch" ? 700 : 350);
          }}
          onPointerCancel={(event) => {
            if (dragStateRef.current?.pointerId === event.pointerId) {
              dragStateRef.current = null;
            }
            scheduleInteractionResume("pointer", 350);
          }}
          onWheel={() => {
            stopAutoScroll();
            setPauseReason("pointer", true);
            scheduleInteractionResume("pointer", 300);
          }}
          onScroll={handleScroll}
          className="touch-pan-x cursor-grab select-none overflow-x-auto overscroll-x-contain [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [scrollbar-width:none] active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max">
            <div ref={firstGroupRef} role="list" className="flex shrink-0 gap-4 pr-4">
              {groupNotes.map((note, idx) => (
                <GuestbookCard
                  key={`primary-${note.id}-${idx}`}
                  note={note}
                  locale={locale}
                  t={t}
                  isDuplicate={idx >= notes.length}
                />
              ))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 gap-4 pr-4">
              {groupNotes.map((note, idx) => (
                <GuestbookCard
                  key={`duplicate-${note.id}-${idx}`}
                  note={note}
                  locale={locale}
                  t={t}
                  isDuplicate
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
