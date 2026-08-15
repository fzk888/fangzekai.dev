"use client";

import { useLanguage } from "@/components/language-provider";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className="relative inline-flex h-8 items-center rounded-full border border-border/60 bg-card/40 p-0.5 shadow-sm backdrop-blur transition-colors hover:border-border hover:bg-card"
      role="group"
      aria-label={t.accessibility.toggleLanguage}
    >
      {(["zh", "en"] as const).map((option) => {
        const isActive = locale === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            className={`relative z-10 min-w-7 rounded-full px-1.5 py-1 text-[10px] font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
              isActive
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={isActive}
            aria-label={option === "zh" ? "中文" : "English"}
          >
            {option === "zh" ? "中" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
