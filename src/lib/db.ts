import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  plainPassword?: string;
  name: string;
  phone?: string;
  role: "admin" | "student";
  status: "active" | "blocked";
  course: string;
  notes?: string;
  createdAt: string;
  lastLogin?: string;
  completedLessons: string[];
}

export interface Lesson {
  id: string;
  postId: string;
  messageId: number;
  title: string;
  description: string;
  videoId?: string;
  videoSrc?: string;
  thumbSrc?: string;
  duration?: string;
  views?: string;
  publishedAt: string;
  youtubeUrl?: string;
  telegramUrl?: string;
  embedUrl: string;
  order: number;
}

export interface DatabaseSchema {
  users: User[];
  lessons: Lesson[];
  lastSync?: string;
  lastTelegramSync?: string;
}

const DB_PATH = path.join(process.cwd(), "data", "db.json");

function ensureDbExists(): DatabaseSchema {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const salt = "qooduq_secret_salt";
    const defaultPassword = "adminpassword";
    const passwordHash = crypto
      .createHash("sha256")
      .update(defaultPassword + salt)
      .digest("hex");

    const initialDb: DatabaseSchema = {
      users: [
        {
          id: "admin-1",
          username: "admin",
          passwordHash,
          plainPassword: defaultPassword,
          name: "Bosh Administrator",
          phone: "+998 77 028 0039",
          role: "admin",
          status: "active",
          course: "Barcha kurslar",
          notes: "Tizim asosiy administratori",
          createdAt: new Date().toISOString(),
          completedLessons: [],
        },
      ],
      lessons: [],
      lastSync: undefined,
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), "utf-8");
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { users: [], lessons: [] };
  }
}

export function getDb(): DatabaseSchema {
  return ensureDbExists();
}

export function saveDb(data: DatabaseSchema): void {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}
