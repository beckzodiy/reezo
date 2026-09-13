"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Users,
  Trophy,
  Globe,
  Smartphone,
  Target,
  Gamepad2,
  ChevronDown,
  ChevronUp,
  Check,
  Star,
  Menu,
  X,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Play,
  Sparkles,
  LogIn,
  Send,
} from "lucide-react";

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── data ─── */
const features = [
  {
    icon: <Gamepad2 className="w-8 h-8" />,
    title: "Interaktiv video darslar",
    desc: "Qiziqarli mavzular, o'yin va viktorinalar orqali ingliz tilini qulay o'rganing.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Shaxsiy o'quv rejasi",
    desc: "Har bir o'quvchi uchun maxsus tuzilgan individual ta'lim dasturi.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Professional ustozlar",
    desc: "CELTA va IELTS sertifikatiga ega tajribali o'qituvchilar jamoasi.",
    color: "from-teal-500 to-emerald-500",
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Zamonaviy platforma",
    desc: "Istalgan qurilma va telefonda qulay video darslarni tomosha qiling.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Sertifikatlar",
    desc: "Har bir bosqichni muvaffaqiyatli tugatganingizda rasmiy sertifikat oling.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Jonli mashg'ulotlar",
    desc: "Real vaqtda o'qituvchi bilan jonli suhbat darslari va guruh mashqlari.",
    color: "from-pink-500 to-rose-500",
  },
];

const courses = [
  {
    level: "A1-A2",
    title: "Boshlang'ich",
    desc: "Ingliz tili asoslarini noldan o'rganing. Alifbo, kundalik so'zlar va oddiy jumlalar.",
    lessons: 30,
    duration: "3 oy",
    price: "Bepul",
    color: "bg-emerald-500",
    border: "border-emerald-200",
  },
  {
    level: "B1-B2",
    title: "O'rta daraja",
    desc: "Grammatikani mustahkamlang va erkin suhbatlashishni o'rganing.",
    lessons: 50,
    duration: "5 oy",
    price: "99,000 so'm/oy",
    color: "bg-blue-500",
    border: "border-blue-200",
  },
  {
    level: "C1-C2",
    title: "Yuqori daraja",
    desc: "Professional darajada ingliz tilini egallang va erkin muloqot qiling.",
    lessons: 40,
    duration: "4 oy",
    price: "179,000 so'm/oy",
    color: "bg-primary",
    border: "border-primary-200",
  },
  {
    level: "IELTS",
    title: "IELTS Tayyorgarlik",
    desc: "IELTS imtihoniga to'liq tayyorgarlik: Reading, Writing, Speaking, Listening.",
    lessons: 60,
    duration: "6 oy",
    price: "249,000 so'm/oy",
    color: "bg-secondary",
    border: "border-secondary-200",
  },
];

const steps = [
  {
    num: "01",
    title: "Login oling",
    desc: "Administrator tomonidan berilgan shaxsiy login va parolni oling.",
    icon: <Mail className="w-6 h-6" />,
  },
  {
    num: "02",
    title: "O'quv xonasiga kiring",
    desc: "Saytga kirib barcha video darslar va vazifalarni oching.",
    icon: <LogIn className="w-6 h-6" />,
  },
  {
    num: "03",
    title: "Video darslarni ko'ring",
    desc: "Platformamizdagi qulay HD pleyer orqali darslarni tomosha qiling.",
    icon: <Play className="w-6 h-6" />,
  },
  {
    num: "04",
    title: "Natijaga erishing",
    desc: "Mashqlarni bajaring va ingliz tilida erkin gapiring.",
    icon: <Trophy className="w-6 h-6" />,
  },
];

const testimonials = [
  {
    name: "Aziza Karimova",
    level: "B2 daraja",
    text: "Qooduq menga ingliz tilini juda qiziqarli qilib o'rgatdi. 6 oyda A1 dan B2 gacha ko'tarildim! O'qituvchilar juda yaxshi.",
    initials: "AK",
    color: "bg-purple-500",
  },
  {
    name: "Jasur Aliyev",
    level: "IELTS 7.5",
    text: "IELTS tayyorgarlik kursi ajoyib! Qooduq orqali IELTS dan 7.5 ball oldim. Hamma mavzular juda sodda tushuntirilgan.",
    initials: "JA",
    color: "bg-orange-500",
  },
  {
    name: "Malika Toshmatova",
    level: "C1 daraja",
    text: "Video darslar juda qulay joylashtirilgan. Istalgan vaqtda kirib darslarni qayta ko'rish mumkin. Hammaga tavsiya qilaman!",
    initials: "MT",
    color: "bg-teal-500",
  },
];

const pricingPlans = [
  {
    name: "Bepul (Telegram)",
    price: "0",
    period: "so'm",
    desc: "Rasmiy Telegram kanalimizda bepul o'rganing",
    features: [
      "Bepul video darslar",
      "Ochiq Telegram kanali",
      "Foydali lug'atlar va testlar",
      "Kunlik yangi iboralar",
    ],
    cta: "Kanalga qo'shilish",
    link: "https://t.me/qooduq",
    isExternal: true,
    popular: false,
    gradient: "from-gray-50 to-gray-100",
    border: "border-gray-200",
  },
  {
    name: "Standart",
    price: "99,000",
    period: "so'm/oy",
    desc: "Eng mashhur reja",
    features: [
      "Barcha maxsus video darslar",
      "Rasmiy sertifikat",
      "Cheksiz mashqlar",
      "Shaxsiy o'quvchi kabineti",
      "Uyga vazifalar tekshiruvi",
      "Qo'llab-quvvatlash",
    ],
    cta: "Boshlash",
    link: "/login",
    isExternal: false,
    popular: true,
    gradient: "from-purple-50 to-purple-100",
    border: "border-primary",
  },
  {
    name: "Premium",
    price: "199,000",
    period: "so'm/oy",
    desc: "To'liq individual tajriba",
    features: [
      "Standart rejadagi hammasi",
      "Shaxsiy ustoz yordami",
      "Jonli Speaking darslari",
      "IELTS tayyorgarlik moduli",
      "Ustuvor 24/7 yordam",
      "Oila uchun 3 ta profil",
    ],
    cta: "Boshlash",
    link: "/login",
    isExternal: false,
    popular: false,
    gradient: "from-orange-50 to-amber-100",
    border: "border-secondary-200",
  },
];

const faqs = [
  {
    q: "Qooduq qanday ishlaydi?",
    a: "Qooduq — bu zamonaviy onlayn ingliz tili maktabi. Administrator sizga shaxsiy login va parol beradi. O'quv xonasiga kirib barcha video darslarni tomosha qilasiz va vazifalarni bajarasiz.",
  },
  {
    q: "Bepul darslarni qayerda ko'rish mumkin?",
    a: "Bepul darslar va kundalik foydali materiallarni bizning rasmiy Telegram kanalimizda (https://t.me/qooduq) bemalol kuzatib borishingiz mumkin!",
  },
  {
    q: "Qaysi yoshdagilar uchun mo'ljallangan?",
    a: "Qooduq 7 yoshdan kattalar uchun mo'ljallangan. Bolalar, o'smirlar va kattalar uchun alohida darajalarga bo'lingan kurslar mavjud.",
  },
  {
    q: "Darslar qancha davom etadi?",
    a: "Har bir video dars o'rtacha 15-30 daqiqa davom etadi. Siz o'zingizga qulay vaqtda, telefon yoki kompyuteringiz orqali o'rganishingiz mumkin.",
  },
  {
    q: "To'lovni qanday amalga oshiraman?",
    a: "Payme, Click, Uzum Bank va karta orqali to'lov qilishingiz mumkin.",
  },
];

/* ─── COMPONENT ─── */
export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-heading font-extrabold text-gradient">
                Qooduq
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-semibold text-gray-700 hover:text-primary transition"
              >
                Bosh sahifa
              </Link>
              <Link
                href="/courses"
                className="text-sm font-semibold text-gray-700 hover:text-primary transition"
              >
                Kurslar
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-semibold text-gray-700 hover:text-primary transition"
              >
                Narxlar
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold text-gray-700 hover:text-primary transition"
              >
                Biz haqimizda
              </Link>
            </div>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/qooduq"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-purple-50 text-primary text-xs font-bold rounded-xl hover:bg-purple-100 transition"
              >
                <Send className="w-3.5 h-3.5" /> @qooduq kanali
              </a>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-2xl hover:bg-primary-600 transition shadow-lg shadow-primary/25"
              >
                <LogIn className="w-4 h-4" /> Kirish
              </Link>
              <button
                className="md:hidden p-2 text-gray-600"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                {mobileMenu ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden glass border-t border-white/20"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                className="block text-gray-700 font-medium"
                onClick={() => setMobileMenu(false)}
              >
                Bosh sahifa
              </Link>
              <Link
                href="/courses"
                className="block text-gray-700 font-medium"
                onClick={() => setMobileMenu(false)}
              >
                Kurslar
              </Link>
              <Link
                href="/pricing"
                className="block text-gray-700 font-medium"
                onClick={() => setMobileMenu(false)}
              >
                Narxlar
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 font-medium"
                onClick={() => setMobileMenu(false)}
              >
                Biz haqimizda
              </Link>
              <a
                href="https://t.me/qooduq"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-4 py-2 bg-purple-50 text-primary font-bold rounded-xl"
              >
                ✈️ @qooduq Telegram Kanali
              </a>
              <Link
                href="/login"
                className="block text-center px-5 py-2.5 bg-primary text-white font-bold rounded-xl"
              >
                O&apos;quv xonasiga kirish
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute top-0 -left-4 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 -right-4 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-primary text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              O&apos;zbekiston bolalari uchun zamonaviy ingliz tili maktabi
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Ingliz tilini{" "}
              <span className="text-gradient">Qooduq</span> bilan erkin
              o&apos;rganing! 🚀
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Qiziqarli video darslar, professional ustozlar va qulay o&apos;quv platformasi.
              Har bir darsni o&apos;zingizga qulay vaqtda tomosha qiling!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white text-lg font-bold rounded-2xl hover:bg-primary-600 transition-all shadow-xl shadow-primary/30 hover:shadow-2xl hover:scale-105"
              >
                O&apos;quv xonasiga kirish <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://t.me/qooduq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-2xl border-2 border-gray-200 hover:border-primary hover:text-primary transition-all"
              >
                <Send className="w-5 h-5 text-primary" /> Bepul Telegram Kanal
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {[
              { num: "10,000+", label: "O'quvchilar" },
              { num: "500+", label: "Video darslar" },
              { num: "50+", label: "Tajribali ustozlar" },
            ].map((s, i) => (
              <div key={i} className="text-center p-5 glass rounded-2xl">
                <p className="text-2xl sm:text-3xl font-heading font-bold text-gradient">
                  {s.num}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-4xl font-heading font-bold text-gray-900"
            >
              Nima uchun <span className="text-gradient">Qooduq</span>?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Biz bilan ingliz tilini o&apos;rganish oson, qiziqarli va samarali!
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-md`}
                >
                  {f.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ COURSES ═══ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
              Bizning <span className="text-gradient">kurslar</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Har bir daraja uchun maxsus tayyorlangan video darslar
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-3xl overflow-hidden shadow-sm border ${c.border} hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className={`${c.color} p-6 text-white relative overflow-hidden`}>
                    <span className="inline-block px-3 py-1 text-xs font-bold bg-white/20 rounded-full mb-3">
                      {c.level}
                    </span>
                    <h3 className="text-xl font-heading font-bold">{c.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{c.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" /> {c.lessons} dars
                      </span>
                      <span>{c.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between">
                  <span className="font-heading font-bold text-gray-900 text-sm">
                    {c.price}
                  </span>
                  <Link
                    href="/login"
                    className="text-primary text-sm font-bold hover:underline"
                  >
                    Boshlash →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
              Qanday <span className="text-gradient">ishlaydi</span>?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-primary text-white mb-4 shadow-lg shadow-primary/25">
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {s.num}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
              O&apos;quvchilarimiz <span className="text-gradient">fikrlari</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic text-sm">
                  &quot;{t.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.level}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
              <span className="text-gradient">Narxlar</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              O&apos;zingizga mos ta&apos;lim rejasini tanlang
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative bg-gradient-to-b ${p.gradient} rounded-3xl p-8 border-2 ${p.border} ${
                  p.popular ? "shadow-xl scale-105" : "shadow-sm"
                } transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  {p.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-lg">
                      ⭐ Eng mashhur
                    </span>
                  )}
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">{p.desc}</p>
                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900">
                      {p.price}
                    </span>
                    {p.period && (
                      <span className="text-gray-500 text-xs ml-1">{p.period}</span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {p.isExternal ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl font-bold text-center text-sm transition-all block bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary"
                  >
                    {p.cta} →
                  </a>
                ) : (
                  <Link
                    href={p.link}
                    className={`w-full py-3 rounded-2xl font-bold text-center text-sm transition-all block ${
                      p.popular
                        ? "bg-primary text-white hover:bg-primary-600 shadow-lg shadow-primary/25"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {p.cta}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
              Ko&apos;p beriladigan <span className="text-gradient">savollar</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                >
                  <span className="font-bold text-gray-900 pr-4 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-hero rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                Bugun ingliz tilini o&apos;rganishni boshlang! 🎯
              </h2>
              <p className="text-sm sm:text-base text-white/80 mb-8">
                Qooduq orqali ingliz tilini qiziqarli video darslar bilan mustahkamlang
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-bold rounded-2xl hover:bg-secondary-500 transition-all shadow-lg hover:scale-105"
                >
                  O&apos;quv xonasiga kirish <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="https://t.me/qooduq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/30 transition-all border border-white/30"
                >
                  <Send className="w-5 h-5" /> @qooduq Telegram Kanali
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-2xl font-heading font-bold">Qooduq</span>
              </Link>
              <p className="text-gray-400 text-xs leading-relaxed">
                O&apos;zbekiston bolalari va o&apos;smirlari uchun qiziqarli ingliz tili onlayn maktabi.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-heading font-semibold text-sm mb-4">Kurslar</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <Link href="/courses" className="hover:text-white transition">
                    Boshlang&apos;ich
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-white transition">
                    O&apos;rta daraja
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-white transition">
                    IELTS Tayyorgarlik
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-sm mb-4">Kompaniya</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    Biz haqimizda
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition">
                    Narxlar
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition">
                    O&apos;quv xonasi
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-sm mb-4">Bog&apos;lanish</h4>
              <ul className="space-y-3 text-xs text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Toshkent, O&apos;zbekiston
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  info@qooduq.uz
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  +998 77 028 0039
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© 2026 Qooduq. Barcha huquqlar himoyalangan.</p>
            <div className="flex items-center gap-4">
              <a
                href="https://t.me/qooduq"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center gap-1 text-purple-400 font-semibold"
              >
                <Send className="w-3.5 h-3.5" /> Telegram: @qooduq
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
