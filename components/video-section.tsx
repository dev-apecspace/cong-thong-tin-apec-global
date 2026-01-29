'use client';

import type { SiteConfiguration } from '@/lib/types';

interface VideoSectionProps {
  config: SiteConfiguration;
}

export function VideoSection({ config }: VideoSectionProps) {
  const { videoUrl, videoTitle } = config.footer;

  if (!videoUrl) {
    return null;
  }

  const isYouTubeUrl = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const embedUrl = isYouTubeUrl && !videoUrl.includes('embed')
    ? videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')
    : videoUrl;

  return (
    <section className="w-full py-8 md:py-16 lg:py-24 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {videoTitle && (
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-foreground mb-2 md:mb-3 text-balance leading-tight">
              {videoTitle}
            </h2>
          </div>
        )}

        {/* Video Container */}
        <div className="relative w-full bg-background rounded-lg overflow-hidden border border-border focus-within:outline-ring focus-within:outline-2 focus-within:outline-offset-2">
          <div className="relative pt-[56.25%]">
            <iframe
              src={embedUrl}
              title={videoTitle || 'VIDEO TẬP ĐOÀN'}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
