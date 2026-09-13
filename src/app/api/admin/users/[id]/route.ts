import { NextResponse } from "next/server";
import { getDb, saveDb } from "@/lib/db";
import { getCurrentUser, hashPassword } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Ruxsat berilmagan" }, { status: 403 });
  }

  try {
    const { id } = params;
    const { name, phone, course, notes, status, password } = await request.json();

    const db = getDb();
    const userIndex = db.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: "Foydalanuvchi topilmadi" },
        { status: 404 }
      );
    }

    const user = db.users[userIndex];

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (course !== undefined) user.course = course;
    if (notes !== undefined) user.notes = notes;
    if (status !== undefined) user.status = status;

    if (password && password.trim().length > 0) {
      user.passwordHash = hashPassword(password);
      user.plainPassword = password;
    }

    saveDb(db);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        plainPassword: user.plainPassword,
        name: user.name,
        phone: user.phone,
        status: user.status,
        course: user.course,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Yangilashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Ruxsat berilmagan" }, { status: 403 });
  }

  try {
    const { id } = params;
    const db = getDb();

    // Prevent deleting the main admin
    if (id === "admin-1") {
      return NextResponse.json(
        { error: "Bosh admin hisobini o'chirish mumkin emas" },
        { status: 400 }
      );
    }

    const initialLength = db.users.length;
    db.users = db.users.filter((u) => u.id !== id);

    if (db.users.length === initialLength) {
      return NextResponse.json(
        { error: "Foydalanuvchi topilmadi" },
        { status: 404 }
      );
    }

    saveDb(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { error: "O'chirishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
