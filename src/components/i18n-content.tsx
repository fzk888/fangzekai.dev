"use client";

import { useLanguage } from "@/components/language-provider";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";

export function HeroGreeting() {
  const { t } = useLanguage();
  return t.hero.greeting.replace("{name}", DATA.name.split(" ")[0]);
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
