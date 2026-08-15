"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { en, type Translations } from "@/i18n/en";
import { zh } from "@/i18n/zh";
import { isLocale, resolveLocale, type Locale } from "@/i18n/config";

export type { Locale, LocalizedText } from "@/i18n/config";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  toggleLocale: () => {},
  t: en,
  mounted: false,
});

const dictionaries: Record<Locale, Translations> = { en, zh };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("locale");
    } catch {
      // Some privacy modes disable storage; browser language still works.
    }

    const detectedLocale = resolveLocale(saved, [
      ...navigator.languages,
      navigator.language,
    ]);
    setLocale(detectedLocale);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("locale", locale);
      } catch {
        // Keep the in-memory preference when storage is unavailable.
      }
      document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
      document.documentElement.dataset.locale = locale;
    }
  }, [locale, mounted]);

  useEffect(() => {
    const syncLocale = (event: StorageEvent) => {
      if (event.key === "locale" && isLocale(event.newValue)) {
        setLocale(event.newValue);
      }
    };

    window.addEventListener("storage", syncLocale);
    return () => window.removeEventListener("storage", syncLocale);
  }, []);

  const updateLocale = useCallback((nextLocale: Locale) => {
    if (isLocale(nextLocale)) {
      setLocale(nextLocale);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((currentLocale) => (currentLocale === "en" ? "zh" : "en"));
  }, []);

  const value = useMemo<LanguageContextType>(
    () => ({
      locale,
      setLocale: updateLocale,
      toggleLocale,
      t: dictionaries[locale],
      mounted,
    }),
    [locale, mounted, toggleLocale, updateLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
