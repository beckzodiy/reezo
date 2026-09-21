import { NextResponse } from "next/server";
import { removeAuthCookie } from "@/lib/auth";

export const runtime = "edge";

export async function POST() {
  await removeAuthCookie();
  return NextResponse.json({ success: true });
}
