import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDb, saveDb } from "@/lib/db";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
  }

  try {
    const { lessonId, completed } = await request.json();
    if (!lessonId) {
      return NextResponse.json({ error: "Dars ID talab qilinadi" }, { status: 400 });
    }

    const db = await getDb();
    const user = db.users.find((u) => u.id === currentUser.id);

    if (!user) {
      return NextResponse.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
    }

    if (!user.completedLessons) {
      user.completedLessons = [];
    }

    if (completed !== false) {
      if (!user.completedLessons.includes(lessonId)) {
        user.completedLessons.push(lessonId);
      }
    } else {
      user.completedLessons = user.completedLessons.filter((id) => id !== lessonId);
    }

    await saveDb(db);

    return NextResponse.json({
      success: true,
      completedLessons: user.completedLessons,
    });
  } catch (error) {
    console.error("Complete lesson error:", error);
    return NextResponse.json(
      { error: "Statusni yangilashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
