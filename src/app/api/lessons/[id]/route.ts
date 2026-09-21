import { NextResponse } from "next/server";
import { fetchYouTubeLessons } from "@/lib/youtube";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const lessons = await fetchYouTubeLessons(false);
    const lesson = lessons.find(
      (l) => l.id === id || l.videoId === id || l.postId.includes(id)
    );

    if (!lesson) {
      return NextResponse.json({ error: "Dars topilmadi" }, { status: 404 });
    }

    const currentUser = await getCurrentUser();
    const isCompleted = currentUser?.completedLessons?.includes(lesson.id) || false;

    // Find next and previous lessons
    const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
    const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

    return NextResponse.json({
      lesson: {
        ...lesson,
        isCompleted,
      },
      prevLesson: prevLesson ? { id: prevLesson.id, title: prevLesson.title } : null,
      nextLesson: nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null,
    });
  } catch (error) {
    console.error("Get lesson error:", error);
    return NextResponse.json(
      { error: "Darsni yuklashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
