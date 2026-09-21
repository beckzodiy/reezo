import { NextResponse } from "next/server";
import { getDb, saveDb, User } from "@/lib/db";
import { getCurrentUser, hashPassword } from "@/lib/auth";

export const runtime = "edge";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Ruxsat berilmagan" }, { status: 403 });
  }

  const db = await getDb();
  // Return users with passwords visible for admin to copy credentials
  return NextResponse.json({
    users: db.users.map((u) => ({
      id: u.id,
      username: u.username,
      plainPassword: u.plainPassword || "********",
      name: u.name,
      phone: u.phone || "",
      role: u.role,
      status: u.status,
      course: u.course,
      notes: u.notes || "",
      createdAt: u.createdAt,
      lastLogin: u.lastLogin,
      completedCount: u.completedLessons?.length || 0,
    })),
  });
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Ruxsat berilmagan" }, { status: 403 });
  }

  try {
    const { username, password, name, phone, course, notes, role } = await request.json();

    if (!username || !password || !name) {
      return NextResponse.json(
        { error: "Login, parol va ismni to'liq kiriting" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const cleanUsername = username.trim().toLowerCase();

    // Check if username already exists
    const existing = db.users.find((u) => u.username.toLowerCase() === cleanUsername);
    if (existing) {
      return NextResponse.json(
        { error: "Bu login bilan foydalanuvchi allaqachon mavjud" },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      username: cleanUsername,
      passwordHash: hashPassword(password),
      plainPassword: password, // kept for admin convenience to copy & send to students
      name: name.trim(),
      phone: phone?.trim() || "",
      role: role === "admin" ? "admin" : "student",
      status: "active",
      course: course || "General English",
      notes: notes || "",
      createdAt: new Date().toISOString(),
      completedLessons: [],
    };

    db.users.push(newUser);
    await saveDb(db);

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        plainPassword: newUser.plainPassword,
        name: newUser.name,
        phone: newUser.phone,
        role: newUser.role,
        status: newUser.status,
        course: newUser.course,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { error: "Foydalanuvchi yaratishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
