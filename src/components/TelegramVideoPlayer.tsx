"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Maximize, Volume2, VolumeX, Sparkles, Layers } from "lucide-react";

interface TelegramVideoPlayerProps {
  postId: string; // e.g. "xolumie/3" or "3"
  videoSrc?: string;
  thumbSrc?: string;
  title: string;
}

export default function TelegramVideoPlayer({
  postId,
  videoSrc,
  thumbSrc,
  title,
}: TelegramVideoPlayerProps) {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useWidget, setUseWidget] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Normalize postId (e.g. "xolumie/3" or "3")
  const cleanPostId = postId.includes("/") ? postId : `xolumie/${postId}`;

  useEffect(() => {
    // If no direct video source is provided, default to widget
    if (!videoSrc) {
      setUseWidget(true);
    }
  }, [videoSrc]);

  useEffect(() => {
    if (!useWidget || !widgetContainerRef.current) return;

    // Clear previous widget
    widgetContainerRef.current.innerHTML = "";

    // Inject official Telegram widget script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-post", cleanPostId);
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-color", "6C3CE1");
    script.setAttribute("data-dark", "0");

    widgetContainerRef.current.appendChild(script);
  }, [cleanPostId, useWidget]);

  const handleSpeedChange = () => {
    const rates = [1, 1.25, 1.5, 2];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Top player header */}
      <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-heading font-semibold text-slate-200 truncate max-w-xs sm:max-w-md">
            {title}
          </span>
        </div>

        {/* Player mode switcher if videoSrc is available */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseWidget(!useWidget)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition flex items-center gap-1.5"
            title="Pleyer rejimini almashtirish"
          >
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">
              {useWidget ? "HD Pleyerga o'tish" : "Kengaytirilgan pleyer"}
            </span>
          </button>
        </div>
      </div>

      {/* Player Screen */}
      <div className="relative w-full min-h-[360px] sm:min-h-[480px] bg-black flex items-center justify-center">
        {useWidget ? (
          <div className="w-full p-4 sm:p-6 flex items-center justify-center">
            <div
              ref={widgetContainerRef}
              className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lg"
            />
          </div>
        ) : videoSrc ? (
          <div className="relative w-full aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoSrc}
              poster={thumbSrc}
              controls
              playsInline
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              Brauzeringiz videoni qo&apos;llab-quvvatlamaydi.
            </video>
          </div>
        ) : (
          <div className="w-full p-4 sm:p-6 flex items-center justify-center">
            <div
              ref={widgetContainerRef}
              className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Bottom controls banner (for direct video) */}
      {!useWidget && videoSrc && (
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSpeedChange}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition"
            >
              Tezlik: {playbackRate}x
            </button>
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition"
              title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={handleFullscreen}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition"
            title="To'liq ekranga olish"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
