"use client";

import React from "react";
import { createPortal } from "react-dom";
import GitHubCalendar from "react-github-calendar";
import type { Activity } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useLanguage } from "@/components/language-provider";
import type { Locale } from "@/i18n/config";

interface TooltipData {
  date: string;
  count: number;
  level: number;
  x: number;
  y: number;
}

function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

function formatCount(count: number, template: string): string {
  if (count === 0) return "";
  return template.replace("{count}", count.toLocaleString());
}

// Shared between the calendar and the tooltip swatch so the two never drift.
const CALENDAR_THEME = {
  dark: ["#161b22", "#3a3f47", "#6b7280", "#b0b8c4", "#e5e7eb"],
  light: ["#ebedf0", "#9ca3af", "#6b7280", "#4b5563", "#374151"],
};

export function GithubContributions() {
  const { locale, t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [tooltip, setTooltip] = React.useState<TooltipData | null>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<{ left: number; top: number } | null>(
    null
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Pin the calendar to the right edge so visitors land on the recent
  // (denser) activity first. The SVG is fetched + rendered asynchronously by
  // react-github-calendar, so we keep re-pinning for a short window. We stop
  // as soon as the user manually scrolls away from the right edge.
  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let cancelled = false;
    let rafId = 0;
    const start = performance.now();

    const pinRight = () => {
      if (cancelled) return;
      container.scrollLeft = container.scrollWidth;
      if (performance.now() - start < 2500) {
        rafId = requestAnimationFrame(pinRight);
      }
    };
    rafId = requestAnimationFrame(pinRight);

    const onUserScroll = () => {
      const atRight =
        container.scrollWidth - container.scrollLeft - container.clientWidth;
      if (atRight > 24) {
        cancelled = true;
        cancelAnimationFrame(rafId);
        container.removeEventListener("scroll", onUserScroll);
      }
    };
    container.addEventListener("scroll", onUserScroll, { passive: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      container.removeEventListener("scroll", onUserScroll);
    };
  }, [mounted]);

  // Clamp the tooltip inside the viewport and flip it below the block when it
  // would otherwise overflow the top edge. Measured from the rendered element
  // so it stays correct across font-size / content changes.
  React.useLayoutEffect(() => {
    if (!tooltip || !tooltipRef.current) {
      setPos(null);
      return;
    }
    const el = tooltipRef.current;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const margin = 8;
    let left = tooltip.x + 14;
    let top = tooltip.y - h - 12;
    left = Math.max(margin, Math.min(left, window.innerWidth - w - margin));
    if (top < margin) top = tooltip.y + 18; // not enough space above -> flip below
    setPos({ left, top });
  }, [tooltip]);

  // Fixed container height to prevent layout shift
  const containerHeight = "min-h-[200px]";

  const renderBlock = React.useCallback(
    (block: React.ReactElement, activity: Activity) => {
      return React.cloneElement(block, {
        onMouseEnter: (e: React.MouseEvent<SVGRectElement>) => {
          setTooltip({
            date: activity.date,
            count: activity.count,
            level: activity.level,
            x: e.clientX,
            y: e.clientY,
          });
        },
        onMouseMove: (e: React.MouseEvent<SVGRectElement>) => {
          setTooltip((prev) =>
            prev ? { ...prev, x: e.clientX, y: e.clientY } : prev
          );
        },
        onMouseLeave: () => setTooltip(null),
      } as React.SVGAttributes<SVGRectElement>);
    },
    []
  );

  return (
    <div className={`relative overflow-hidden rounded-xl ${containerHeight}`}>
      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-zinc-400 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        className="from-transparent via-slate-300 to-transparent"
      />
      <motion.div
        className={`w-full overflow-hidden rounded-xl border border-border/60 bg-card/40 p-4 transition-all duration-300 hover:border-border hover:bg-card/70 hover:shadow-lg ${containerHeight}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {!mounted ? (
          <div className="w-full h-[160px] rounded-lg bg-muted/50 animate-pulse" />
        ) : (
          <div ref={scrollRef} className="relative overflow-x-auto p-4 -mx-1">
            <GitHubCalendar
              username="fzk888"
              colorScheme={resolvedTheme as "light" | "dark"}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
              theme={CALENDAR_THEME}
              renderBlock={renderBlock}
            />
          </div>
        )}

        {/* Tooltip is portaled to <body> so it escapes any transformed ancestor
            (framer-motion / overflow containers), keeping position:fixed aligned
            with viewport coordinates (clientX/clientY). */}
        {mounted &&
          createPortal(
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  key="gh-tooltip"
                  ref={tooltipRef}
                  initial={{ opacity: 0, scale: 0.92, y: 2 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 2 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  className="fixed z-50 pointer-events-none px-2.5 py-1.5 text-xs rounded-md border border-border/80 bg-popover/95 text-popover-foreground shadow-md backdrop-blur-sm whitespace-nowrap"
                  style={
                    pos
                      ? { left: pos.left, top: pos.top }
                      : { visibility: "hidden" }
                  }
                >
                  <div className="font-medium">{formatDate(tooltip.date, locale)}</div>
                  {tooltip.count > 0 && (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-[3px] ring-1 ring-black/10"
                        style={{
                          backgroundColor:
                            CALENDAR_THEME[
                              resolvedTheme === "dark" ? "dark" : "light"
                            ][tooltip.level] ?? CALENDAR_THEME.dark[4],
                        }}
                      />
                      {formatCount(tooltip.count, t.github.contributions)}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </motion.div>
    </div>
  );
}
