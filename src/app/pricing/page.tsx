"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowLeft, Minus, GraduationCap, LogIn, Send } from "lucide-react";

const plans = [
  {
    name: "Bepul (Telegram)",
    monthlyPrice: "0",
    yearlyPrice: "0",
    period: "so'm",
    desc: "Rasmiy Telegram kanalimizda bepul o'rganing",
    features: [
      { text: "Ochiq video darslar", included: true },
      { text: "Rasmiy @qooduq Telegram kanali", included: true },
      { text: "Lug'atlar va testlar", included: true },
      { text: "Kunlik yangi iboralar", included: true },
      { text: "Shaxsiy kabinet", included: false },
      { text: "Rasmiy sertifikat", included: false },
      { text: "Shaxsiy o'qituvchi", included: false },
      { text: "Jonli darslar", included: false },
    ],
    cta: "Kanalga qo'shilish",
    link: "https://t.me/qooduq",
    isExternal: true,
    popular: false,
  },
  {
    name: "Standart",
    monthlyPrice: "99,000",
    yearlyPrice: "79,000",
    period: "so'm/oy",
    desc: "Eng mashhur ta'lim rejasi",
    features: [
      { text: "Barcha maxsus video darslar", included: true },
      { text: "Cheksiz mashqlar", included: true },
      { text: "Rasmiy sertifikat", included: true },
      { text: "Shaxsiy kabinet va progress", included: true },
      { text: "Vazifalar tekshiruvi", included: true },
      { text: "Qo'llab-quvvatlash", included: true },
      { text: "Shaxsiy o'qituvchi", included: false },
      { text: "Jonli darslar", included: false },
    ],
    cta: "Standartni tanlash",
    link: "/login",
    isExternal: false,
    popular: true,
  },
  {
    name: "Premium",
    monthlyPrice: "199,000",
    yearlyPrice: "159,000",
    period: "so'm/oy",
    desc: "To'liq individual tajriba",
    features: [
      { text: "Standart rejadagi hammasi", included: true },
      { text: "Shaxsiy o'qituvchi yordami", included: true },
      { text: "Jonli darslar (haftalik)", included: true },
      { text: "IELTS tayyorgarlik moduli", included: true },
      { text: "Ustuvor yordam 24/7", included: true },
      { text: "Oila uchun 3 ta profil", included: true },
      { text: "Kafolatlangan natija", included: true },
      { text: "Shaxsiy o'quv rejasi", included: true },
    ],
    cta: "Premiumni tanlash",
    link: "/login",
    isExternal: false,
    popular: false,
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

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
            <Link href="/pricing" className="text-sm font-semibold text-primary">Narxlar</Link>
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
              Narxlar va Rejalar 💰
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              O&apos;zingizga mos ta&apos;lim rejasini tanlang yoki bepul Telegram kanalimizga a&apos;zo bo&apos;ling
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toggle */}
      <section className="py-8">
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-bold ${!isYearly ? "text-gray-900" : "text-gray-400"}`}>
            Oylik
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              isYearly ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                isYearly ? "translate-x-7" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className={`text-sm font-bold ${isYearly ? "text-gray-900" : "text-gray-400"}`}>
            Yillik <span className="text-accent text-xs font-bold ml-1">-20%</span>
          </span>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative bg-white rounded-3xl p-8 border-2 ${
                  plan.popular
                    ? "border-primary shadow-xl shadow-primary/10 scale-105"
                    : "border-gray-100 shadow-sm"
                } transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  {plan.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-primary text-white text-xs font-bold rounded-full shadow-lg">
                      ⭐ Eng mashhur
                    </span>
                  )}
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-6">{plan.desc}</p>
                  <div className="mb-8">
                    <span className="text-4xl sm:text-5xl font-heading font-extrabold text-gray-900">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    {plan.period && (
                      <span className="text-gray-500 text-xs ml-2">{plan.period}</span>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-xs">
                        {f.included ? (
                          <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        ) : (
                          <Minus className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        )}
                        <span className={f.included ? "text-gray-700" : "text-gray-400"}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.isExternal ? (
                  <a
                    href={plan.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-2xl font-bold text-center text-sm transition-all block bg-purple-50 text-primary hover:bg-purple-100 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" /> {plan.cta}
                  </a>
                ) : (
                  <Link
                    href={plan.link}
                    className={`w-full py-3.5 rounded-2xl font-bold text-center text-sm transition-all block ${
                      plan.popular
                        ? "bg-primary text-white hover:bg-primary-600 shadow-lg shadow-primary/25"
                        : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-white"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
