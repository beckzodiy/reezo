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
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      // Ignored in read-only environments
    }
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
      lessons: [
        {
          id: "yt-ZI1frF9EpN8",
          postId: "ZI1frF9EpN8",
          messageId: 1,
          videoId: "ZI1frF9EpN8",
          title: "Qo'rquvni qo'rqitish mumkinmi? @toplesofficial",
          description: "#Qorquv #Qorquvniqorqitish #Milliysfera #Arvohlar #horror #Milliykontent",
          thumbSrc: "https://i3.ytimg.com/vi/ZI1frF9EpN8/hqdefault.jpg",
          duration: "15:00",
          views: "258+",
          publishedAt: "2024-04-20T11:59:51+00:00",
          youtubeUrl: "https://www.youtube.com/watch?v=ZI1frF9EpN8",
          embedUrl: "https://www.youtube-nocookie.com/embed/ZI1frF9EpN8?autoplay=0&rel=0&modestbranding=1",
          order: 1,
        },
      ],
      lastSync: new Date().toISOString(),
    };

    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), "utf-8");
    } catch {
      // Ignored if read-only
    }
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
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      // Ignore
    }
  }
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Ignore in serverless edge
  }
}
