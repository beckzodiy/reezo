"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Lightbulb,
  Heart,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Users,
  BookOpen,
  GraduationCap,
  ThumbsUp,
  LogIn,
  Send,
} from "lucide-react";

const team = [
  {
    name: "Bekzod",
    role: "Asoschisi va Bosh Dasturchi",
    desc: "Ta'lim innovatori va platforma yaratuvchisi.",
    initials: "B",
    color: "bg-primary",
  },
  {
    name: "Nodira Karimova",
    role: "Bosh o'qituvchi",
    desc: "CELTA sertifikatiga ega, 8 yillik ingliz tili o'qituvchisi.",
    initials: "NK",
    color: "bg-accent",
  },
  {
    name: "Sardor Alimov",
    role: "Metodist",
    desc: "IELTS 8.5 sohibi, metodika bo'yicha mutaxassis.",
    initials: "SA",
    color: "bg-secondary",
  },
  {
    name: "Dilnoza Rahimova",
    role: "O'quvchilar koordinatori",
    desc: "O'quvchilar bilan ishlash bo'yicha mutaxassis.",
    initials: "DR",
    color: "bg-pink-500",
  },
];

const values = [
  {
    icon: <Award className="w-8 h-8" />,
    title: "Sifat",
    desc: "Eng yuqori sifatli video darslar va ta'lim tajribasi.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Innovatsiya",
    desc: "Zamonaviy texnologiyalar orqali qulay va tezkor ta'lim.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Qulaylik",
    desc: "Istalgan vaqtda va istalgan qurilmada o'rganish imkoni.",
    color: "from-teal-500 to-emerald-500",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Natija",
    desc: "O'lchanadigan va ko'rinadigan natijalar kafolati.",
    color: "from-blue-500 to-cyan-500",
  },
];

const stats = [
  { num: "10,000+", label: "O'quvchilar", icon: <Users className="w-6 h-6" /> },
  { num: "500+", label: "Video darslar", icon: <BookOpen className="w-6 h-6" /> },
  { num: "50+", label: "O'qituvchilar", icon: <GraduationCap className="w-6 h-6" /> },
  { num: "98%", label: "Qoniqish", icon: <ThumbsUp className="w-6 h-6" /> },
];

export default function AboutPage() {
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
            <Link href="/courses" className="text-sm font-semibold text-gray-700 hover:text-primary transition">Kurslar</Link>
            <Link href="/pricing" className="text-sm font-semibold text-gray-700 hover:text-primary transition">Narxlar</Link>
            <Link href="/about" className="text-sm font-semibold text-primary">Biz haqimizda</Link>
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
              Biz haqimizda 🌟
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Qooduq — O&apos;zbekistonlik o&apos;quvchilarga ingliz tilini oson va qiziqarli o&apos;rgatishga bag&apos;ishlangan zamonaviy ta&apos;lim platformasi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">
                Bizning <span className="text-gradient">maqsadimiz</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                <p>
                  <strong>Qooduq</strong> — har bir o&apos;zbek bolasi va o&apos;smiriga sifatli ingliz tili ta&apos;limini qulay va erkin tarzda yetkazish maqsadida yaratilgan onlayn maktab.
                </p>
                <p>
                  Platformamiz orqali o&apos;quvchilar darslarni istalgan vaqtda tomosha qilishi, mashqlarni bajarishi va sifatli video pleyer orqali bilim olishi mumkin.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-80 rounded-3xl gradient-hero opacity-90 flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-3xl font-heading font-extrabold">Qooduq</p>
                  <p className="text-white/80 text-sm mt-1">Onlayn Ingliz Tili Maktabi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50 text-primary mb-4">
                  {s.icon}
                </div>
                <p className="text-3xl font-heading font-extrabold text-gradient">{s.num}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
              Bizning <span className="text-gradient">qadriyatlarimiz</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${v.color} text-white mb-4 shadow-md`}>
                  {v.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
              Biz bilan <span className="text-gradient">bog&apos;laning</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50 text-primary mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 mb-1 text-base">Manzil</h3>
              <p className="text-xs text-gray-600">Toshkent shahri, Chilonzor tumani</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50 text-primary mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 mb-1 text-base">Email</h3>
              <p className="text-xs text-gray-600">info@qooduq.uz</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50 text-primary mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 mb-1 text-base">Telefon</h3>
              <p className="text-xs text-gray-600 font-bold">+998 77 028 0039</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="text-xl font-heading font-bold">Qooduq</span>
          </Link>
          <p className="text-xs text-gray-500">
            © 2026 Qooduq. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </footer>
    </div>
  );
}
