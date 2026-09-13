import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Qooduq - O'zbek bolalar uchun ingliz tili onlayn maktabi",
  description:
    "Qooduq — O'zbekiston bolalari va o'smirlari uchun interaktiv ingliz tili o'rganish platformasi. O'yin va qiziqarli video darslar orqali o'rganing!",
  keywords: [
    "qooduq",
    "ingliz tili",
    "english",
    "uzbek",
    "o'rganish",
    "online school",
    "IELTS",
    "kurslar",
  ],
  authors: [{ name: "Qooduq" }],
  openGraph: {
    title: "Qooduq - Ingliz tilini oson va erkin o'rganing!",
    description:
      "O'zbekiston bolalari va o'smirlari uchun interaktiv ingliz tili onlayn maktabi",
    type: "website",
    locale: "uz_UZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
