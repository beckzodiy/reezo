import { hashSha256 } from "./crypto";

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

const salt = "qooduq_secret_salt";
const defaultPassword = "adminpassword";
const defaultPasswordHash = hashSha256(defaultPassword + salt);

const memoryDb: DatabaseSchema = {
  users: [
    {
      id: "admin-1",
      username: "admin",
      passwordHash: defaultPasswordHash,
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

function getFs() {
  try {
    return eval("require('fs')");
  } catch {
    return null;
  }
}

function getPath() {
  try {
    return eval("require('path')");
  } catch {
    return null;
  }
}

export function getDb(): DatabaseSchema {
  const fsModule = getFs();
  const pathModule = getPath();

  if (!fsModule || !pathModule) {
    return memoryDb;
  }

  try {
    const DB_PATH = pathModule.join(process.cwd(), "data", "db.json");
    const dir = pathModule.dirname(DB_PATH);
    if (!fsModule.existsSync(dir)) {
      try {
        fsModule.mkdirSync(dir, { recursive: true });
      } catch {
        // Ignored
      }
    }

    if (!fsModule.existsSync(DB_PATH)) {
      try {
        fsModule.writeFileSync(DB_PATH, JSON.stringify(memoryDb, null, 2), "utf-8");
      } catch {
        // Ignored
      }
      return memoryDb;
    }

    const raw = fsModule.readFileSync(DB_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return memoryDb;
  }
}

export function saveDb(data: DatabaseSchema): void {
  memoryDb.users = data.users;
  memoryDb.lessons = data.lessons;
  memoryDb.lastSync = data.lastSync;
  memoryDb.lastTelegramSync = data.lastTelegramSync;

  const fsModule = getFs();
  const pathModule = getPath();
  if (!fsModule || !pathModule) return;

  try {
    const DB_PATH = pathModule.join(process.cwd(), "data", "db.json");
    const dir = pathModule.dirname(DB_PATH);
    if (!fsModule.existsSync(dir)) {
      fsModule.mkdirSync(dir, { recursive: true });
    }
    fsModule.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Ignore in edge
  }
}
