"use client";

export const runtime = "edge";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  Sparkles,
} from "lucide-react";
import YouTubeVideoPlayer from "@/components/YouTubeVideoPlayer";

interface LessonData {
  id: string;
  postId: string;
  messageId: number;
  title: string;
  description: string;
  videoId?: string;
  thumbSrc?: string;
  duration?: string;
  youtubeUrl?: string;
  embedUrl: string;
  isCompleted?: boolean;
}

interface NavLesson {
  id: string;
  title: string;
}

export default function LessonViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [prevLesson, setPrevLesson] = useState<NavLesson | null>(null);
  const [nextLesson, setNextLesson] = useState<NavLesson | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/lessons/${id}`)
      .then((res) => {
        if (!res.ok) {
          router.push("/dashboard");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.lesson) {
          setLesson(data.lesson);
          setIsCompleted(!!data.lesson.isCompleted);
          setPrevLesson(data.prevLesson);
          setNextLesson(data.nextLesson);
        }
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleToggleCompleted = async () => {
    if (!lesson) return;
    setToggleLoading(true);
    const newStatus = !isCompleted;

    try {
      const res = await fetch("/api/lessons/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id, completed: newStatus }),
      });

      if (res.ok) {
        setIsCompleted(newStatus);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggleLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-500">Dars yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 mb-4">Dars topilmadi</p>
        <Link href="/dashboard" className="text-primary font-bold hover:underline">
          ← O&apos;quv xonasiga qaytish
        </Link>
      </div>
    );
  }

  const videoId = lesson.videoId || lesson.postId;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4" /> Barcha darslarga qaytish
        </Link>

        <div className="flex items-center gap-2 text-xs text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Qooduq HD Video Dars</span>
        </div>
      </div>

      {/* Clean YouTube Video Player (Single clean player) */}
      <div className="mb-8">
        <YouTubeVideoPlayer
          videoId={videoId}
          title={lesson.title}
        />
      </div>

      {/* Lesson Details Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-8">
        {/* Title and Complete Button */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3.5 py-1 bg-purple-100 text-primary text-xs font-bold rounded-full">
                #{lesson.messageId}-Dars
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {lesson.duration || "15:00"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 leading-tight">
              {lesson.title}
            </h1>
          </div>

          {/* Mark Completed Button */}
          <button
            onClick={handleToggleCompleted}
            disabled={toggleLoading}
            className={`flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md ${
              isCompleted
                ? "bg-emerald-500 text-white shadow-emerald-500/25"
                : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? "Dars yakunlandi ✓" : "Darsni yakunladim"}
          </button>
        </div>

        {/* Lesson Description & Homework */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-heading font-bold text-gray-900">
              Dars mavzusi va Uyga vazifa
            </h2>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line border border-slate-100">
            {lesson.description}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevLesson ? (
          <Link
            href={`/dashboard/lessons/${prevLesson.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 hover:border-primary hover:text-primary transition shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Oldingi dars
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/dashboard/lessons/${nextLesson.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-2xl text-sm font-bold hover:bg-primary-600 transition shadow-lg shadow-primary/20"
          >
            Keyingi dars <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
