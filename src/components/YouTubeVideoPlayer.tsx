"use client";

interface YouTubeVideoPlayerProps {
  videoId: string;
  title: string;
}

export default function YouTubeVideoPlayer({
  videoId,
  title,
}: YouTubeVideoPlayerProps) {
  // Extract pure YouTube video ID
  const cleanId = videoId.replace(/^yt-/, "").replace(/.*\?v=/, "");

  return (
    <div className="w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Top player header */}
      <div className="px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-heading font-semibold text-slate-200 truncate max-w-xs sm:max-w-md">
            {title}
          </span>
        </div>
        <div className="px-3 py-1 bg-slate-800 rounded-full text-slate-400 font-mono text-xs">
          HD 1080p
        </div>
      </div>

      {/* Responsive 16:9 YouTube Video Embed */}
      <div className="relative w-full aspect-video bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${cleanId}?autoplay=0&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
