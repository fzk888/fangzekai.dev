"use client";

import { useLanguage } from "@/components/language-provider";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import { localize, type LocalizedText } from "@/i18n/config";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Localized({
  value,
}: {
  value: string | LocalizedText | undefined;
}) {
  const { locale } = useLanguage();
  return <>{localize(value, locale)}</>;
}

export function HeroGreeting() {
  const { locale, t } = useLanguage();
  return t.hero.greeting.replace(
    "{name}",
    localize(DATA.displayName, locale) ?? DATA.name
  );
}

export function HeroGreetingHeading() {
  const { locale, t } = useLanguage();
  return (
    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
      {t.hero.greeting.replace(
        "{name}",
        localize(DATA.displayName, locale) ?? DATA.name
      )}
    </h1>
  );
}

export function Summary() {
  const { t } = useLanguage();
  return (
    <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
      {t.resume.summary}
    </Markdown>
  );
}

export function SectionLabelI18n({ labelKey }: { labelKey: keyof typeof import("@/i18n/en").en.sections }) {
  const { t } = useLanguage();
  return (
    <span className="inline-block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
      {t.sections[labelKey]}
    </span>
  );
}

export function HeadingI18n({ headingKey }: { headingKey: keyof typeof import("@/i18n/en").en.headings }) {
  const { t } = useLanguage();
  return <>{t.headings[headingKey]}</>;
}

export function ViewAllProjectsButton() {
  const { t } = useLanguage();
  return <>{t.actions.viewAllProjects}</>;
}

export function ContactMessage() {
  const { t } = useLanguage();
  return <>{t.contact.message}</>;
}

export function LetsTalkButton() {
  const { t } = useLanguage();
  return <>{t.actions.letsTalk}</>;
}

export function FooterTagline() {
  const { t } = useLanguage();
  return (
    <>
      {t.footer.tagline}
      <br />
      {t.footer.subTagline}
    </>
  );
}

export function FooterLinks() {
  const { t } = useLanguage();
  return <>{t.footer.links}</>;
}

export function FooterMeta() {
  const { t } = useLanguage();
  return <>{t.footer.meta}</>;
}

export function FooterSitemap() {
  const { t } = useLanguage();
  return <>{t.footer.sitemap}</>;
}

export function FooterRss() {
  const { t } = useLanguage();
  return <>{t.footer.rssFeed}</>;
}

export function FooterSource() {
  const { t } = useLanguage();
  return <>{t.footer.sourceCode}</>;
}

export function FooterOpenSource() {
  const { t } = useLanguage();
  return <>{t.footer.openSource}</>;
}

export function ContactEmailButton() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const email = DATA.contact.email;
  const subject = encodeURIComponent("Hello Fang Zekai");

  const handleClick = () => {
    navigator.clipboard
      ?.writeText(email)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {
        // The mailto link still works when clipboard access is unavailable.
      });
  };

  return (
    <a
      href={`mailto:${email}?subject=${subject}`}
      onClick={handleClick}
      className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-background/70 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Avatar className="size-6">
        <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
        <AvatarFallback>{DATA.initials}</AvatarFallback>
      </Avatar>
      <span aria-live="polite">
        {copied ? t.actions.emailCopied : t.actions.letsTalk}
      </span>
    </a>
  );
}

export function PageTitle({
  page,
}: {
  page: "blog" | "projects";
}) {
  const { t } = useLanguage();
  return <>{t.pages[page].title}</>;
}

export function VideosHeader() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
      <div className="space-y-2">
        <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
          {t.pages.videos.eyebrow}
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {t.pages.videos.title}
        </h1>
        <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          {t.pages.videos.description}
        </p>
      </div>
    </div>
  );
}

export function GadgetsHeader() {
  const { t } = useLanguage();
  return (
    <div className="max-w-3xl mx-auto mb-12 text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {t.pages.gadgets.title}
      </h1>
      <p className="text-muted-foreground text-lg leading-relaxed">
        {t.pages.gadgets.description}
      </p>
    </div>
  );
}

export function GadgetCategoryLabel({ category }: { category: string }) {
  const { t } = useLanguage();
  const labels: Record<string, string> = {
    "PC Components": t.pages.gadgets.categories.pc,
    Peripherals: t.pages.gadgets.categories.peripherals,
    Mobile: t.pages.gadgets.categories.mobile,
  };
  return <>{labels[category] ?? category}</>;
}

export function GadgetItemCount({ count }: { count: number }) {
  const { locale, t } = useLanguage();
  if (locale === "zh") {
    return <>{count} {t.common.items}</>;
  }
  return <>{count} {count === 1 ? t.common.item : t.common.items}</>;
}

export function GadgetToolsHeader() {
  const { t } = useLanguage();
  return (
    <>
      <h2 className="text-2xl font-bold">{t.pages.gadgets.toolsTitle}</h2>
      <p className="text-sm text-muted-foreground">
        {t.pages.gadgets.toolsDescription}
      </p>
    </>
  );
}

export function BlogPostMeta({
  publishedAt,
  minutes,
}: {
  publishedAt: string;
  minutes: number;
}) {
  const { locale, t } = useLanguage();
  const date = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: locale === "zh" ? "long" : "short",
    day: "numeric",
  }).format(new Date(`${publishedAt}T00:00:00`));

  return (
    <>
      {date} &middot;{" "}
      {t.pages.blog.minutes.replace("{count}", String(minutes))}
    </>
  );
}
