import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/scroll-progress";
import { JsonLd } from "@/components/json-ld";
import { PageBackground } from "@/components/page-background";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { CommandPalette } from "@/components/command-palette";
import { SoundProvider } from "@/components/sound-provider";
import { BackToTop } from "@/components/back-to-top";
import { DomainGuardedAnalytics } from "@/components/domain-guarded-analytics";
import { LanguageProvider } from "@/components/language-provider";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const iconVersion = "fzk-20260624-round";
const versionedIcon = (path: string) => `${path}?v=${iconVersion}`;

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: "Fang Zekai | AI应用工程师 & 全栈开发",
    template: `%s | Fang Zekai`,
  },
  description: "方泽铠 (Fang Zekai) — AI应用工程师、大模型算法工程师、Agent 开发工程师、全栈开发工程师。专注于 RAG 系统、AI Agent、计算机视觉和大模型应用开发。",
  keywords: ["Fang Zekai", "方泽铠", "AI应用工程师", "大模型算法工程师", "Agent开发", "全栈开发", "RAG", "LLM", "Computer Vision", "Python", "Next.js"],
  authors: [{ name: "Fang Zekai" }],
  creator: "Fang Zekai",
  publisher: "Fang Zekai",
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: "Fang Zekai | AI应用工程师 & 全栈开发",
    description: "AI应用工程师、大模型算法工程师、Agent 开发工程师、全栈开发工程师。",
    url: DATA.url,
    siteName: "Fang Zekai - Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DATA.url}/me.png`,
        width: 1200,
        height: 630,
        alt: "Fang Zekai - AI应用工程师 & 全栈开发"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fang Zekai | AI应用工程师 & 全栈开发',
    description: 'AI应用工程师、大模型算法工程师、Agent 开发工程师、全栈开发工程师',
    images: [`${DATA.url}/me.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: versionedIcon("/favicons/favicon.ico"), type: "image/x-icon" },
      { url: versionedIcon("/favicons/favicon-16.png"), sizes: "16x16", type: "image/png" },
      { url: versionedIcon("/favicons/favicon-32.png"), sizes: "32x32", type: "image/png" },
      { url: versionedIcon("/favicons/favicon-96.png"), sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: versionedIcon("/favicons/apple-touch-icon.png"), sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: versionedIcon("/favicons/web-app-icon-192.png"),
      },
      {
        rel: "manifest",
        url: versionedIcon("/favicons/manifest.json"),
      },
    ],
  },
  manifest: versionedIcon("/favicons/manifest.json"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Fang Zekai",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.variable, "font-sans antialiased")}>
        {/* Background container */}
        <div className="fixed inset-0 z-[-1]">
          <PageBackground />
        </div>


        {/* Main content */}
        <div className="relative z-10 max-w-4xl mx-auto pt-20 sm:pt-24 pb-24 px-6">
          <DomainGuardedAnalytics gaId="G-XVF0SFD4GW" />
          <JsonLd />
          <ScrollProgress />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <LanguageProvider>
            <SoundProvider>
              <TooltipProvider delayDuration={0}>
                {children}
                <Analytics />
                <SpeedInsights />
                <Navbar />
                <CommandPalette />
                <BackToTop />
                <SmoothCursor />
              </TooltipProvider>
            </SoundProvider>
            </LanguageProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
