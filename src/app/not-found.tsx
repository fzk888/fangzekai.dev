"use client";

import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { useLanguage } from "@/components/language-provider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 text-center">
      <BlurFade delay={0.04}>
        <div className="space-y-2">
          <h1 className="text-7xl font-bold tracking-tighter sm:text-9xl">
            404
          </h1>
          <p className="text-xl text-muted-foreground sm:text-2xl">
            {t.pages.notFound.title}
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={0.12}>
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
          {t.pages.notFound.description}
        </p>
      </BlurFade>

      <BlurFade delay={0.2}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-background"
          >
            {t.pages.notFound.home}
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-background"
          >
            {t.nav.projects}
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-background"
          >
            {t.nav.blog}
          </Link>
        </div>
      </BlurFade>
    </div>
  );
}
