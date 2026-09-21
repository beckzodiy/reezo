import { cookies } from "next/headers";
import { getDb, User } from "./db";
import { hashSha256, createHmacSha256, toBase64, fromBase64 } from "./crypto";

const SALT = "qooduq_secret_salt";
const JWT_SECRET = "qooduq_super_secure_jwt_token_2026";
const COOKIE_NAME = "qooduq_auth_token";

export function hashPassword(password: string): string {
  return hashSha256(password + SALT);
}

export function generateToken(user: User): string {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    name: user.name,
    timestamp: Date.now(),
  };
  const str = JSON.stringify(payload);
  const signature = createHmacSha256(str, JWT_SECRET);
  return toBase64(str) + "." + signature;
}

export function verifyToken(token: string): { id: string; username: string; role: string; name: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [payloadB64, signature] = parts;
    const str = fromBase64(payloadB64);
    const expectedSig = createHmacSha256(str, JWT_SECRET);

    if (signature !== expectedSig) return null;
    return JSON.parse(str);
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  const db = await getDb();
  const user = db.users.find((u) => u.id === payload.id && u.status === "active");
  return user || null;
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
