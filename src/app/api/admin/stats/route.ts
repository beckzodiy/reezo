import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { fetchYouTubeLessons, YOUTUBE_CHANNEL_URL } from "@/lib/youtube";

export const runtime = "edge";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Ruxsat berilmagan" }, { status: 403 });
  }

  const db = await getDb();
  const students = db.users.filter((u) => u.role === "student");
  const activeStudents = students.filter((u) => u.status === "active");
  const lessons = await fetchYouTubeLessons(false);

  return NextResponse.json({
    totalStudents: students.length,
    activeStudents: activeStudents.length,
    totalLessons: lessons.length,
    lastSync: db.lastSync || "Hozircha yo'q",
    videoSource: YOUTUBE_CHANNEL_URL,
  });
}
