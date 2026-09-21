import { NextResponse } from "next/server";
import { getDb, saveDb } from "@/lib/db";
import { hashPassword, generateToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Login va parolni kiriting" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const cleanUsername = username.trim().toLowerCase();
    const passwordHash = hashPassword(password);

    const user = db.users.find(
      (u) =>
        u.username.toLowerCase() === cleanUsername &&
        (u.passwordHash === passwordHash || u.plainPassword === password)
    );

    if (!user) {
      return NextResponse.json(
        { error: "Login yoki parol noto'g'ri" },
        { status: 401 }
      );
    }

    if (user.status === "blocked") {
      return NextResponse.json(
        { error: "Sizning hisobingiz bloklangan. Administratorga murojaat qiling." },
        { status: 403 }
      );
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    await saveDb(db);

    const token = generateToken(user);
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        course: user.course,
      },
      redirectTo: user.role === "admin" ? "/admin" : "/dashboard",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Tizimda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
