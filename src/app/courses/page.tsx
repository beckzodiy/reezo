"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Star,
  ArrowLeft,
  Search,
  Filter,
  GraduationCap,
  LogIn,
} from "lucide-react";

const categories = [
  "Hammasi",
  "Boshlang'ich",
  "O'rta",
  "Yuqori",
  "IELTS",
];

const courses = [
  {
    id: 1,
    title: "Ingliz tili asoslari",
    level: "A1",
    category: "Boshlang'ich",
    desc: "Ingliz tilini noldan boshlang. Alifbo, oddiy so'zlar, salomlashish va o'zingiz haqingizda gapirishni o'rganing.",
    lessons: 30,
    duration: "3 oy",
    rating: 4.8,
    students: 3200,
    price: "Bepul",
    priceNum: 0,
    color: "from-emerald-400 to-emerald-600",
  },
  {
    id: 2,
    title: "Kundalik ingliz tili",
    level: "A2",
    category: "Boshlang'ich",
    desc: "Kundalik hayotda kerak bo'ladigan ingliz tilini o'rganing: do'konda, restoranda, safarda.",
    lessons: 40,
    duration: "4 oy",
    rating: 4.7,
    students: 2800,
    price: "79,000 so'm/oy",
    priceNum: 79000,
    color: "from-green-400 to-emerald-600",
  },
  {
    id: 3,
    title: "Grammatika kursi",
    level: "B1",
    category: "O'rta",
    desc: "Ingliz tili grammatikasini chuqur o'rganing: zamonlar, artikl, modal fe'llar va boshqalar.",
    lessons: 50,
    duration: "5 oy",
    rating: 4.9,
    students: 2100,
    price: "99,000 so'm/oy",
    priceNum: 99000,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 4,
    title: "Suhbat kursi",
    level: "B1",
    category: "O'rta",
    desc: "Ingliz tilida erkin suhbatlashishni o'rganing. Turli mavzularda gaplashing va o'z fikringizni bildiring.",
    lessons: 35,
    duration: "3 oy",
    rating: 4.8,
    students: 1900,
    price: "119,000 so'm/oy",
    priceNum: 119000,
    color: "from-cyan-400 to-blue-600",
  },
  {
    id: 5,
    title: "Biznes ingliz tili",
    level: "B2",
    category: "O'rta",
    desc: "Ish joyida va biznes muhitida ingliz tilini qo'llashni o'rganing. Prezentatsiya, email, muzokaralar.",
    lessons: 45,
    duration: "4 oy",
    rating: 4.6,
    students: 1500,
    price: "149,000 so'm/oy",
    priceNum: 149000,
    color: "from-indigo-400 to-indigo-600",
  },
  {
    id: 6,
    title: "Ilg'or grammatika",
    level: "C1",
    category: "Yuqori",
    desc: "Murakkab grammatik tuzilmalarni o'rganing: conditional, passive, reported speech va boshqalar.",
    lessons: 40,
    duration: "4 oy",
    rating: 4.9,
    students: 800,
    price: "179,000 so'm/oy",
    priceNum: 179000,
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 7,
    title: "IELTS Reading & Writing",
    level: "IELTS",
    category: "IELTS",
    desc: "IELTS imtihonining Reading va Writing qismlariga to'liq tayyorgarlik. Strategiyalar va amaliy mashqlar.",
    lessons: 60,
    duration: "6 oy",
    rating: 4.9,
    students: 1200,
    price: "249,000 so'm/oy",
    priceNum: 249000,
    color: "from-orange-400 to-red-500",
  },
  {
    id: 8,
    title: "IELTS Speaking & Listening",
    level: "IELTS",
    category: "IELTS",
    desc: "IELTS imtihonining Speaking va Listening qismlariga tayyorlaning. Mock testlar va feedback.",
    lessons: 50,
    duration: "5 oy",
    rating: 4.8,
    students: 1100,
    price: "249,000 so'm/oy",
    priceNum: 249000,
    color: "from-red-400 to-orange-500",
  },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("Hammasi");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = courses.filter((c) => {
    const matchCat =
      activeCategory === "Hammasi" || c.category === activeCategory;
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-2xl font-heading font-bold text-gradient">Qooduq</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-gray-700 hover:text-primary transition">Bosh sahifa</Link>
            <Link href="/courses" className="text-sm font-semibold text-primary">Kurslar</Link>
            <Link href="/pricing" className="text-sm font-semibold text-gray-700 hover:text-primary transition">Narxlar</Link>
            <Link href="/about" className="text-sm font-semibold text-gray-700 hover:text-primary transition">Biz haqimizda</Link>
          </div>
          <Link href="/login" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-2xl hover:bg-primary-600 transition shadow-lg shadow-primary/25">
            <LogIn className="w-4 h-4" /> Kirish
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 text-sm transition">
              <ArrowLeft className="w-4 h-4" /> Bosh sahifaga qaytish
            </Link>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold mb-4">
              Barcha Kurslar 📚
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              A1 dan C2 gacha, IELTS tayyorgarlik — o&apos;zingizga mos kursni tanlang
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-gray-100 sticky top-16 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Kurs qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0 ml-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-2xl whitespace-nowrap transition ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Hech qanday kurs topilmadi</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Image placeholder */}
                    <div className={`h-40 bg-gradient-to-br ${course.color} relative overflow-hidden flex items-center justify-center`}>
                      <BookOpen className="w-16 h-16 text-white/30" />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                        {course.level}
                      </span>
                      {course.priceNum === 0 && (
                        <span className="absolute top-3 right-3 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                          Bepul
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-heading font-bold text-gray-900 mb-2 group-hover:text-primary transition">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {course.desc}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" /> {course.lessons} dars
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {course.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="font-heading font-bold text-gray-900 text-sm">{course.price}</span>
                      <Link
                        href="/login"
                        className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-600 transition"
                      >
                        Boshlash
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
