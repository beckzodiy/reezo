# 🎓 Qooduq — Onlayn Ingliz Tili Maktabi

**Qooduq** — O'zbekiston bolalari va o'smirlari uchun maxsus yaratilgan interaktiv onlayn ta'lim platformasi.

---

## 🌟 Asosiy Imkoniyatlar

### 1. 📺 YouTube Video Bazasi (`@MilliySfera`)
- Barcha video darslar [YouTube: @MilliySfera](https://www.youtube.com/@MilliySfera) kanali bilan avtomatik integratsiyalashgan.
- Kanalga yangi video dars joylanganda:
  - **Video sarlavhasi (Title)** — Darsning mavzusi bo'ladi.
  - **Video tavsifi (Description)** — Dars matni va uyga vazifa bo'lib tushadi.
  - **HD 1080p YouTube Player** — Hech qanday hajm cheklovisiz (no size limits), toza va tezkor pleyer orqali ko'rsatiladi.
  - Admin panelda **"YouTube Darslarni Yangilash"** tugmasi orqali darslarni 1 soniyada sinxronlash mumkin.

### 2. 🔐 Foydalanuvchilar va Admin Tizimi
- **Admin Paneli** (`/admin`):
  - O'quvchilarga **Login va Parol** yaratish (avtomatik parol generatori bilan).
  - O'quvchiga Telegram orqali yuborish uchun tayyor shablonli **bir bosishda nusxa olish (Copy Credentials)**.
  - O'quvchilarni bloklash / faollashtirish, tahrirlash va o'chirish.
- **Login sahifasi** (`/login`):
  - Toza va xavfsiz (hech qanday ochiq admin parollari ko'rsatilmaydi).

### 3. 🎯 O'quvchi Xonasi (`/dashboard`)
- Har bir o'quvchi o'ziga berilgan login/parol bilan kiradi.
- Progress monitoring (necha dars yakunlanganligi).
- **"Darsni yakunladim"** tugmasi bilan darslarni belgilab borish.
- Keyingi va oldingi darslarga tezkor o'tish.

### 4. ✈️ Bepul Ta'lim — Rasmiy Telegram Kanal
- Bepul o'rganuvchilar uchun rasmiy kanal: [https://t.me/qooduq](https://t.me/qooduq) (`@qooduq`).

---

## 🚀 Ishga Tushirish (Local Run)

```bash
# Paketlarni o'rnatish
npm install

# Ishga tushirish
npm run dev

# Production build
npm run build
npm start
```

Brauzeringizda oching: [http://localhost:3000](http://localhost:3000)

---

## ☁️ Cloudflare orqali Joylash (Deployment)

### 1-usul: Cloudflare Pages (GitHub orqali)
1. Loyihangizni GitHub-ga yuklang:
   ```bash
   git add .
   git commit -m "Qooduq with YouTube integration"
   git push origin main
   ```
2. **Cloudflare Dashboard** -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git** bo'limiga kiring.
3. Loyihangizni tanlang va quyidagi sozlamalarni kiriting:
   - **Framework preset:** `Next.js`
   - **Build command:** `npx @cloudflare/next-on-pages` (yoki `npm run build`)
   - **Build output directory:** `.vercel/output/static` (yoki `.next`)
4. **Custom Domains** bo'limiga kirib **`qooduq.beckzodiy.com`** domenini ulang.

---

### 2-usul: Cloudflare Tunnel (Eng tez va qulay usul)
Serveringizda yoki kompyuteringizda:
```bash
# 1. Cloudflared o'rnatish
sudo pacman -S cloudflared

# 2. Login qilish
cloudflared tunnel login

# 3. Tunnel yaratish
cloudflared tunnel create qooduq

# 4. Domen bilan bog'lash
cloudflared tunnel route dns qooduq qooduq.beckzodiy.com

# 5. Ishga tushirish (Local port 3000 ni tunnelga yo'naltirish)
cloudflared tunnel run --url http://localhost:3000 qooduq
```

---

## 📞 Aloqa
- **Telefon:** +998 77 028 0039
- **Email:** info@qooduq.uz
- **Telegram:** [@qooduq](https://t.me/qooduq)
- **YouTube:** [@MilliySfera](https://www.youtube.com/@MilliySfera)

---

© 2026 **Qooduq** — Barcha huquqlar himoyalangan.
