import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { fetchYouTubeLessons } from "@/lib/youtube";
import { getDb } from "@/lib/db";

export async function POST() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Ruxsat berilmagan" }, { status: 403 });
  }

  try {
    const lessons = await fetchYouTubeLessons(true); // Force sync from YouTube
    const db = getDb();
    return NextResponse.json({
      success: true,
      message: "YouTube (@MilliySfera) kanalidan darslar muvaffaqiyatli sinxronlandi!",
      count: lessons.length,
      lastSync: db.lastSync,
      lessons,
    });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json(
      { error: "YouTube kanalini sinxronlashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
