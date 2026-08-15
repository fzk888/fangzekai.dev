import BlurFade from "@/components/magicui/blur-fade";
import { VideosList } from "@/components/videos-list";
import { fetchYouTubeVideos } from "@/lib/youtube";
import { VideosHeader } from "@/components/i18n-content";

export const revalidate = 3600;

export const metadata = {
  title: "Videos",
  description: "Watch my latest videos about software development and technology.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function VideosPage() {
  const videos = await fetchYouTubeVideos();

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="videos">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <VideosHeader />
        </BlurFade>
        
        <VideosList videos={videos} />
      </section>
    </main>
  );
}
