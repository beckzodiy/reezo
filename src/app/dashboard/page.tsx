"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Search,
  Sparkles,
  Trophy,
  ArrowRight,
} from "lucide-react";

interface Lesson {
  id: string;
  postId: string;
  messageId: number;
  title: string;
  description: string;
  videoSrc?: string;
  thumbSrc?: string;
  duration?: string;
  views?: string;
  isCompleted?: boolean;
}

export default function DashboardPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    course: string;
    completedLessons: string[];
  } | null>(null);

  useEffect(() => {
    // Load current user profile
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUserProfile(data.user);
        }
      });

    // Load lessons
    fetch("/api/lessons")
      .then((res) => res.json())
      .then((data) => {
        setLessons(data.lessons || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const completedCount = lessons.filter((l) => l.isCompleted).length;
  const progressPercent =
    lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  const filteredLessons = lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nextUncompletedLesson = lessons.find((l) => !l.isCompleted) || lessons[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="mb-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-800 via-primary to-indigo-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            {userProfile?.course || "General English"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold mb-3 leading-tight">
            Xush kelibsiz, {userProfile?.name || "O'quvchi"}! 🎯
          </h1>
          <p className="text-white/80 text-sm sm:text-base mb-6">
            Bugun ingliz tili darsingizni davom ettiring va yangi so&apos;zlar, qoidalar va talaffuzni o&apos;rganing.
          </p>

          {nextUncompletedLesson && (
            <Link
              href={`/dashboard/lessons/${nextUncompletedLesson.id}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-secondary hover:bg-secondary-500 text-white font-bold rounded-2xl shadow-lg shadow-secondary/30 transition-all hover:scale-105"
            >
              <Play className="w-5 h-5 fill-white" /> Darsni boshlash / davom ettirish
            </Link>
          )}
        </div>

        {/* Right side progress circular/card */}
        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center w-64">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-8 h-8 text-yellow-300" />
          </div>
          <p className="text-2xl font-heading font-extrabold">{progressPercent}%</p>
          <p className="text-xs text-white/70 mt-1">
            {completedCount} / {lessons.length} dars yakunlandi
          </p>
          <div className="w-full bg-white/20 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Progress Card (Mobile / Tablet) */}
      <div className="lg:hidden mb-8 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-900">O&apos;quv jarayoni</span>
          <span className="text-sm font-bold text-primary">{progressPercent}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {completedCount} ta dars ko&apos;rildi ({lessons.length} tadan)
        </p>
      </div>

      {/* Lessons Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-900">
            Barcha Video Darslar 📚
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Darslarni ketma-ketlikda ko&apos;rib boring va mashqlarni bajaring
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Darsni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Lessons Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-500">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Darslar yuklanmoqda...
        </div>
      ) : filteredLessons.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-gray-100">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-semibold">Darslar topilmadi</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson, idx) => (
            <Link
              key={lesson.id}
              href={`/dashboard/lessons/${lesson.id}`}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail / Header */}
                <div className="relative h-48 bg-gradient-to-br from-purple-700 to-indigo-900 overflow-hidden flex items-center justify-center">
                  {lesson.thumbSrc ? (
                    <img
                      src={lesson.thumbSrc}
                      alt={lesson.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-white text-center p-4">
                      <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <span className="text-xs font-bold uppercase tracking-wider opacity-75">
                        Video Dars #{idx + 1}
                      </span>
                    </div>
                  )}

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-primary text-gray-900 group-hover:text-white shadow-xl flex items-center justify-center transition-all group-hover:scale-110">
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full">
                      #{idx + 1}-Dars
                    </span>
                  </div>

                  {lesson.isCompleted && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ko&apos;rildi
                    </div>
                  )}
                </div>

                {/* Body info */}
                <div className="p-6">
                  <h3 className="font-heading font-bold text-gray-900 text-base mb-2 group-hover:text-primary transition line-clamp-2">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {lesson.duration || "15:00"}
                </span>
                <span className="font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Tomosha qilish <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
