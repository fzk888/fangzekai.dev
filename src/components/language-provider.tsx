"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { en, type Translations } from "@/i18n/en";
import { zh } from "@/i18n/zh";

type Locale = "en" | "zh";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

const dictionaries: Record<Locale, Translations> = { en, zh };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && (saved === "en" || saved === "zh")) {
      setLocale(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("locale", locale);
    }
  }, [locale, mounted]);

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: dictionaries[locale],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
