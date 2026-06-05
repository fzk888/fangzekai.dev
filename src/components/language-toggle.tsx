"use client";

import { useLanguage } from "@/components/language-provider";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "zh" : "en")}
      className="rounded-full border border-border/60 bg-card/40 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-card hover:text-foreground"
      aria-label="Toggle language"
    >
      {locale === "en" ? "中" : "EN"}
    </button>
  );
}
