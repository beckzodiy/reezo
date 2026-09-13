"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  Video,
  RefreshCw,
  Plus,
  Trash2,
  Copy,
  Check,
  Search,
  ExternalLink,
  LogOut,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  UserCheck,
  CheckCircle,
  Youtube,
} from "lucide-react";

interface UserItem {
  id: string;
  username: string;
  plainPassword?: string;
  name: string;
  phone?: string;
  role: string;
  status: string;
  course: string;
  notes?: string;
  createdAt: string;
  completedCount: number;
}

interface LessonItem {
  id: string;
  postId: string;
  messageId: number;
  title: string;
  description: string;
  videoId?: string;
  duration?: string;
  publishedAt: string;
  youtubeUrl?: string;
  embedUrl: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"users" | "lessons">("users");

  // Stats
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    totalLessons: 0,
    lastSync: "",
  });

  // Users state
  const [users, setUsers] = useState<UserItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // New user modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    phone: "",
    course: "General English",
    notes: "",
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");

  // Sync state
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState("");
  const [lessons, setLessons] = useState<LessonItem[]>([]);

  // Copied state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Check auth & load users
      const usersRes = await fetch("/api/admin/users");
      if (usersRes.status === 403 || usersRes.status === 401) {
        router.push("/login");
        return;
      }
      const usersData = await usersRes.json();
      setUsers(usersData.users || []);

      // Load stats
      const statsRes = await fetch("/api/admin/stats");
      const statsData = await statsRes.json();
      setStats(statsData);

      // Load lessons
      const lessonsRes = await fetch("/api/lessons");
      const lessonsData = await lessonsRes.json();
      setLessons(lessonsData.lessons || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncYouTube = async () => {
    setSyncing(true);
    setSyncSuccess("");
    try {
      const res = await fetch("/api/admin/sync", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSyncSuccess(`✅ ${data.count} ta dars YouTube kanalidan muvaffaqiyatli yangilandi!`);
        setLessons(data.lessons || []);
        loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncSuccess(""), 4000);
    }
  };

  const handleGeneratePassword = () => {
    const chars = "abcdefghjkmnpqrstuvwxyz23456789";
    let pass = "";
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password: pass }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");
    setCreateLoading(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setCreateError(data.error || "Foydalanuvchi yaratishda xatolik");
        setCreateLoading(false);
        return;
      }

      // Success
      setIsModalOpen(false);
      setFormData({
        name: "",
        username: "",
        password: "",
        phone: "",
        course: "General English",
        notes: "",
      });
      loadData();
    } catch {
      setCreateError("Server xatosi");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`${name} foydalanuvchisini o'chirmoqchimisiz?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (user: UserItem) => {
    const newStatus = user.status === "active" ? "blocked" : "active";
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyCredentials = (user: UserItem) => {
    const text = `🎓 *Qooduq Onlayn Maktabi*ga xush kelibsiz!\n\n🌐 Sayt: https://qooduq.beckzodiy.com/login\n👤 Login: ${user.username}\n🔑 Parol: ${user.plainPassword || "adminpassword"}\n📚 Kurs: ${user.course}\n\nPlatformaga kirib video darslarni tomosha qilishingiz mumkin! 🚀`;

    navigator.clipboard.writeText(text);
    setCopiedId(user.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.phone && u.phone.includes(searchQuery))
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-heading font-bold text-gradient">
                    Qooduq
                  </span>
                  <span className="ml-2 px-2 py-0.5 bg-purple-100 text-primary text-xs font-bold rounded-md">
                    ADMIN
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-600 hover:text-primary transition px-3 py-1.5 rounded-lg hover:bg-gray-100"
              >
                O&apos;quv xonasi
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" /> Chiqish
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome & Stats Row */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2">
            Boshqaruv Paneli (Admin) 🛠️
          </h1>
          <p className="text-sm text-gray-600">
            O&apos;quvchilar hisoblarini yaratish va YouTube (@MilliySfera) kanalidan video darslarni sinxronlash
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">Jami O&apos;quvchilar</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-heading font-bold text-gray-900">{stats.totalStudents}</p>
          </div>

          <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">Faol O&apos;quvchilar</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-heading font-bold text-emerald-600">{stats.activeStudents}</p>
          </div>

          <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">Video Darslar</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-heading font-bold text-blue-600">{stats.totalLessons}</p>
          </div>

          <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">YouTube Manba</span>
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <Youtube className="w-4 h-4" />
              </div>
            </div>
            <a
              href="https://www.youtube.com/@MilliySfera"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-red-600 hover:underline flex items-center gap-1"
            >
              @MilliySfera <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* YouTube Live Sync Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-red-900 via-purple-900 to-indigo-950 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-2">
              <Youtube className="w-3.5 h-3.5 text-red-400" /> YouTube Video Bazasi (@MilliySfera)
            </div>
            <h2 className="text-xl font-heading font-bold mb-1">
              Kanal: https://www.youtube.com/@MilliySfera
            </h2>
            <p className="text-sm text-purple-200">
              Kanalga yangi video joylanganda, uning sarlavhasi dars mavzusi va izohi esa dars matni bo&apos;lib platformaga avtomatik tushadi.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleSyncYouTube}
              disabled={syncing}
              className="w-full md:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Yuklanmoqda..." : "YouTube Darslarni Yangilash"}
            </button>
          </div>
        </div>

        {syncSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            {syncSuccess}
          </div>
        )}

        {/* Tabs & Actions */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-2xl w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("users")}
                className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-bold transition ${
                  activeTab === "users"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                O&apos;quvchilar ({users.filter((u) => u.role === "student").length})
              </button>
              <button
                onClick={() => setActiveTab("lessons")}
                className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-bold transition ${
                  activeTab === "lessons"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Video Darslar ({lessons.length})
              </button>
            </div>

            {/* Actions */}
            {activeTab === "users" && (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Qidirish (ism, login)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-600 transition shadow-md shadow-primary/20 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" /> Yangi O&apos;quvchi
                </button>
              </div>
            )}
          </div>

          {/* TAB 1: USERS LIST */}
          {activeTab === "users" && (
            <div className="overflow-x-auto">
              {loading ? (
                <div className="py-20 text-center text-gray-500">Yuklanmoqda...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="py-20 text-center">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">Foydalanuvchilar topilmadi</p>
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50/70 border-b border-gray-100 text-gray-500 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">O&apos;quvchi</th>
                      <th className="px-6 py-4">Login & Parol</th>
                      <th className="px-6 py-4">Kurs</th>
                      <th className="px-6 py-4">Telefon</th>
                      <th className="px-6 py-4">Holat</th>
                      <th className="px-6 py-4 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-purple-100 text-primary font-bold flex items-center justify-center text-sm">
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{u.name}</p>
                              <span className="text-xs text-gray-400">
                                {u.role === "admin" ? "👑 Admin" : `Ko'rildi: ${u.completedCount} dars`}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-800">
                                {u.username}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-gray-500">
                                {showPasswords[u.id] ? u.plainPassword || "—" : "••••••••"}
                              </span>
                              <button
                                onClick={() =>
                                  setShowPasswords((prev) => ({
                                    ...prev,
                                    [u.id]: !prev[u.id],
                                  }))
                                }
                                className="text-gray-400 hover:text-gray-600"
                              >
                                {showPasswords[u.id] ? (
                                  <EyeOff className="w-3.5 h-3.5" />
                                ) : (
                                  <Eye className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <span className="px-2.5 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
                            {u.course}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-xs">
                          {u.phone || "—"}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleStatus(u)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                              u.status === "active"
                                ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                : "bg-red-50 text-red-600 hover:bg-red-100"
                            }`}
                          >
                            {u.status === "active" ? "Faol" : "Bloklangan"}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Copy button */}
                            <button
                              onClick={() => handleCopyCredentials(u)}
                              title="O'quvchiga jo'natish uchun login va paroldan nusxa olish"
                              className="p-2 rounded-lg text-primary hover:bg-purple-50 transition"
                            >
                              {copiedId === u.id ? (
                                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                  <Check className="w-4 h-4" /> Nusxalandi!
                                </span>
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>

                            {u.role !== "admin" && (
                              <button
                                onClick={() => handleDeleteUser(u.id, u.name)}
                                title="O'chirish"
                                className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 2: LESSONS LIST */}
          {activeTab === "lessons" && (
            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1">
                          <Youtube className="w-3.5 h-3.5 text-red-600" /> #{lesson.messageId}
                        </span>
                        <span className="text-xs text-gray-400">{lesson.duration || "15:00"}</span>
                      </div>
                      <h3 className="font-heading font-bold text-gray-900 mb-2 line-clamp-2 text-sm">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                        {lesson.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <Link
                        href={`/dashboard/lessons/${lesson.id}`}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Darsni ko&apos;rish →
                      </Link>
                      {lesson.youtubeUrl && (
                        <a
                          href={lesson.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-400 hover:text-red-600 flex items-center gap-1"
                        >
                          YouTube <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CREATE USER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
              Yangi O&apos;quvchi Hisobini Yaratish 🎓
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Login va parol yarating. Yaratgandan so&apos;ng bir bosish bilan nusxa olib jo&apos;natishingiz mumkin.
            </p>

            {createError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  O&apos;quvchi Ism Familiyasi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="masalan: Jasur Aliyev"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Login (Username) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="masalan: jasur"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Parol *
                  </label>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    <KeyRound className="w-3 h-3" /> Parol generatsiya qilish
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Parolni kiriting yoki avtomatik yarating"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Telefon raqami
                </label>
                <input
                  type="text"
                  placeholder="+998 77 028 0039"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Biriktirilgan Kurs
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none bg-white"
                >
                  <option value="General English">General English (Boshlang&apos;ich & O&apos;rta)</option>
                  <option value="IELTS Tayyorgarlik">IELTS Tayyorgarlik</option>
                  <option value="Speaking Club">Speaking & Listening</option>
                  <option value="Grammatika">Intensiv Grammatika</option>
                  <option value="Barcha kurslar">Barcha kurslar (Premium)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-600 transition shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {createLoading ? "Yaratilmoqda..." : "Yaratish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
