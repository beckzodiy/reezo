-- Cloudflare D1 schema for Qooduq

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  passwordHash TEXT NOT NULL,
  plainPassword TEXT,
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'student',
  status TEXT DEFAULT 'active',
  course TEXT DEFAULT 'General English',
  notes TEXT,
  completedLessons TEXT DEFAULT '[]',
  createdAt TEXT NOT NULL,
  lastLogin TEXT
);

CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  postId TEXT NOT NULL,
  messageId INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  videoId TEXT,
  videoSrc TEXT,
  thumbSrc TEXT,
  duration TEXT,
  views TEXT,
  publishedAt TEXT,
  youtubeUrl TEXT,
  telegramUrl TEXT,
  embedUrl TEXT,
  lesson_order INTEGER
);

CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(lesson_order);

INSERT OR IGNORE INTO users (
  id, username, passwordHash, plainPassword, name, phone, role, status, course, notes, completedLessons, createdAt
) VALUES (
  'admin-1',
  'admin',
  '76353444468070421b06c41ade1731ca12881a4a99a152ec6cb47305eda49249',
  'adminpassword',
  'Bosh Administrator',
  '+998 77 028 0039',
  'admin',
  'active',
  'Barcha kurslar',
  'Tizim asosiy administratori',
  '[]',
  datetime('now')
);
