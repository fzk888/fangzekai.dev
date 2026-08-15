export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export type LocalizedText = Readonly<Record<Locale, string>>;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

export function resolveLocale(
  savedLocale?: string | null,
  browserLanguages: readonly string[] = []
): Locale {
  if (isLocale(savedLocale)) {
    return savedLocale;
  }

  return browserLanguages.some((language) =>
    language.toLowerCase().startsWith("zh")
  )
    ? "zh"
    : "en";
}

export function localize(
  value: string | LocalizedText | undefined,
  locale: Locale
): string | undefined {
  if (!value || typeof value === "string") {
    return value;
  }

  return value[locale];
}
