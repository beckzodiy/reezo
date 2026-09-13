import { NextResponse } from "next/server";
import { fetchYouTubeLessons } from "@/lib/youtube";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const lessons = await fetchYouTubeLessons(false);
    const currentUser = await getCurrentUser();

    const formattedLessons = lessons.map((lesson) => ({
      ...lesson,
      isCompleted: currentUser?.completedLessons?.includes(lesson.id) || false,
    }));

    return NextResponse.json({
      lessons: formattedLessons,
      total: formattedLessons.length,
      userCompletedCount: currentUser?.completedLessons?.length || 0,
    });
  } catch (error) {
    console.error("Fetch lessons error:", error);
    return NextResponse.json(
      { error: "Darslarni yuklashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
