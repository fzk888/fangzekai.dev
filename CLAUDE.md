# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
npm start        # Start production server
```

## Architecture

This is a personal portfolio/blog site built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Deployed on Vercel.

### Routing and Pages

- `src/app/` — App Router pages: home, blog, projects, videos, gadgets, cli
- `src/app/api/` — API routes: github-stats, sponsors, steam-stats, visitor-count, youtube-stats, og (image generation), revalidate

### Content System

Blog posts live in `content/*.mdx` with gray-matter frontmatter (title, publishedAt, summary, tags). The MDX pipeline is in `src/data/blog.ts` — it uses unified/remark/rehype with rehype-pretty-code (shiki) for syntax highlighting. Posts are read from the filesystem at build time.

### Data and Configuration

- `src/data/resume.tsx` — Personal info, experience, education, social links
- `src/data/products.ts` — Gadgets/products listing
- `src/data/blog.ts` — Blog post loading and markdown processing

### UI Layer

- shadcn/ui (new-york style) with Radix primitives — components in `src/components/ui/`
- Magic UI components in `src/components/magicui/`
- Framer Motion for page transitions and micro-interactions
- Path alias: `@/*` maps to `./src/*`

### External Integrations (require env vars)

- GitHub API (GITHUB_TOKEN) — sponsors, profile stats
- Upstash Redis (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN) — visitor counter
- Steam Web API (STEAM_API_KEY) — live gaming status hover card
- PostHog — analytics via Next.js rewrites to `/ingest/*`

## Adding Content

New blog post: create `content/<slug>.mdx` with frontmatter:
```yaml
---
title: "Post Title"
publishedAt: "2024-01-01"
summary: "Brief description"
---
```
