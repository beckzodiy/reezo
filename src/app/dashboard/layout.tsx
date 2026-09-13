"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";

interface UserInfo {
  id: string;
  name: string;
  username: string;
  role: string;
  course: string;
  completedLessons: string[];
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router, pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-500">O&apos;quv xonasi yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white shadow-md">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-xl font-heading font-bold text-gradient">
                  Qooduq
                </span>
              </Link>

              {/* Navigation links */}
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    pathname === "/dashboard"
                      ? "bg-purple-50 text-primary"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Darslar
                  </span>
                </Link>
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" /> Admin Panel
                  </Link>
                )}
              </nav>
            </div>

            {/* User Profile & Logout */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
                <div className="w-9 h-9 rounded-full bg-purple-100 text-primary font-bold flex items-center justify-center text-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900 leading-none">
                    {user?.name || "O'quvchi"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {user?.course || "General English"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition"
              >
                <LogOut className="w-4 h-4" /> Chiqish
              </button>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileNav(!mobileNav)}
                className="p-2 text-gray-600"
              >
                {mobileNav ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileNav && (
          <div className="md:hidden border-t border-gray-100 px-4 py-3 bg-white space-y-2">
            <div className="p-3 bg-gray-50 rounded-xl mb-3">
              <p className="font-bold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.course}</p>
            </div>
            <Link
              href="/dashboard"
              onClick={() => setMobileNav(false)}
              className="block px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
            >
              Darslar
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setMobileNav(false)}
                className="block px-3 py-2 rounded-lg font-medium text-primary hover:bg-purple-50"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50"
            >
              Chiqish
            </button>
          </div>
        )}
      </header>

      {/* Children content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
