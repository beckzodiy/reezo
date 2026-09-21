import { getDb, saveDb, Lesson } from "./db";

export async function fetchTelegramLessons(force = false): Promise<Lesson[]> {
  const db = await getDb();
  const now = Date.now();

  // If synced within last 60 seconds and not forced, return cached lessons
  if (!force && db.lastTelegramSync) {
    const lastSync = new Date(db.lastTelegramSync).getTime();
    if (now - lastSync < 60 * 1000 && db.lessons.length > 0) {
      return db.lessons;
    }
  }

  try {
    const response = await fetch("https://t.me/s/xolumie", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn("Failed to fetch Telegram channel HTML", response.status);
      return db.lessons;
    }

    const html = await response.text();
    const scrapedLessons: Lesson[] = [];

    // Split messages by widget message wrap
    const messageBlocks = html.split('<div class="tgme_widget_message_wrap');

    for (const block of messageBlocks) {
      const postMatch = block.match(/data-post="([^"]+)"/);
      if (!postMatch) continue;

      const post = postMatch[1]; // e.g. "xolumie/5"
      const messageId = parseInt(post.split("/")[1], 10) || 0;
      if (messageId <= 0) continue;

      // Extract text / caption
      let fullText = "";
      const textMatch = block.match(
        /class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/
      );
      if (textMatch) {
        // Clean up HTML tags and entities
        fullText = textMatch[1]
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "$2 ($1)")
          .replace(/<[^>]+>/g, "")
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&#39;/g, "'")
          .trim();
      }

      // Check for video or media
      const videoMatch = block.match(/<video[^>]*src="([^"]+)"/);
      const isVideo =
        !!videoMatch ||
        block.includes("tgme_widget_message_video_player") ||
        block.includes("tgme_widget_message_video_wrap") ||
        block.includes("message_video");

      // Extract thumbnail
      let thumbSrc = "";
      const thumbMatch = block.match(/background-image:url\(['"]?([^'")]+)['"]?\)/);
      if (thumbMatch) {
        thumbSrc = thumbMatch[1];
      }

      // Extract duration
      let duration = "";
      const durMatch = block.match(
        /class="[^"]*tgme_widget_message_video_duration[^"]*"[^>]*>([^<]+)</
      );
      if (durMatch) {
        duration = durMatch[1].trim();
      }

      // Extract views
      let views = "";
      const viewsMatch = block.match(
        /class="[^"]*tgme_widget_message_views[^"]*"[^>]*>([^<]+)</
      );
      if (viewsMatch) {
        views = viewsMatch[1].trim();
      }

      // Extract datetime
      let datetime = new Date().toISOString();
      const timeMatch = block.match(/<time datetime="([^"]+)"/);
      if (timeMatch) {
        datetime = timeMatch[1];
      }

      // Only include if it has video, media or substantial content
      const hasContent = isVideo || fullText.length > 0;
      if (!hasContent) continue;

      // Split caption into Title (first line) and Description (remaining lines)
      const lines = fullText.split("\n").map((l) => l.trim()).filter(Boolean);
      let title = lines[0] || `Dars #${messageId}`;
      let description = lines.slice(1).join("\n") || fullText;

      // If text was short, make title friendly
      if (!title || title.toLowerCase() === "channel created" || title.toLowerCase().includes("channel name")) {
        // Skip purely administrative channel setup events if no video
        if (!isVideo) continue;
        title = `Video Dars #${messageId}`;
      }

      const lesson: Lesson = {
        id: `tg-${messageId}`,
        postId: post,
        messageId,
        title,
        description: description || "Ushbu dars bo'yicha to'liq videoni tomosha qiling va mashqlarni bajaring.",
        videoSrc: videoMatch ? videoMatch[1] : undefined,
        thumbSrc: thumbSrc || undefined,
        duration: duration || "15:00",
        views: views || "100+",
        publishedAt: datetime,
        telegramUrl: `https://t.me/${post}`,
        embedUrl: `https://t.me/${post}?embed=1`,
        order: messageId,
      };

      scrapedLessons.push(lesson);
    }

    // Sort newest to oldest or by order
    scrapedLessons.sort((a, b) => a.order - b.order);

    // If channel is newly created and has 0 video posts yet, provide starter lessons so the platform is ready
    if (scrapedLessons.length === 0) {
      const sampleLessons: Lesson[] = [
        {
          id: "starter-1",
          postId: "xolumie/starter-1",
          messageId: 1,
          title: "1-Dars: Ingliz tili alifbosi va asosiy tovushlar (Pronunciation)",
          description:
            "Ingliz tilida to'g'ri talaffuz qilish qoidalari. Harflar va ularning o'qilishini o'rganamiz.\n\nUyga vazifa:\n1. 10 ta so'zning talaffuzini audio qilib yozib oling.\n2. Alifbo mashqlarini bajaring.",
          videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          thumbSrc: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
          duration: "12:45",
          views: "1.2k",
          publishedAt: new Date().toISOString(),
          telegramUrl: "https://t.me/xolumie",
          embedUrl: "https://t.me/xolumie",
          order: 1,
        },
        {
          id: "starter-2",
          postId: "xolumie/starter-2",
          messageId: 2,
          title: "2-Dars: To Be fe'li (Am, Is, Are) va Salomlashish jumlalari",
          description:
            "Ingliz tilidagi eng asosiy fe'l - To Be fe'lini qanday to'g'ri ishlatish kerak? Salomlashish va o'zingizni tanishtirish.\n\nUyga vazifa:\n1. O'zingiz haqingizda 5 ta jumla tuzing.\n2. Do'stingiz bilan qisqa dialog qiling.",
          videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          thumbSrc: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
          duration: "18:20",
          views: "980",
          publishedAt: new Date().toISOString(),
          telegramUrl: "https://t.me/xolumie",
          embedUrl: "https://t.me/xolumie",
          order: 2,
        },
        {
          id: "starter-3",
          postId: "xolumie/starter-3",
          messageId: 3,
          title: "3-Dars: Present Simple (Hozirgi oddiy zamon) va Kundalik tartib",
          description:
            "Kundalik rejangiz, odatlaringiz va qiziqishlaringiz haqida ingliz tilida gapirishni o'rganamiz.\n\nUyga vazifa:\n1. Kuningiz tartibini ingliz tilida yozing.",
          videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          thumbSrc: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
          duration: "21:10",
          views: "750",
          publishedAt: new Date().toISOString(),
          telegramUrl: "https://t.me/xolumie",
          embedUrl: "https://t.me/xolumie",
          order: 3,
        },
      ];

      db.lessons = sampleLessons;
    } else {
      db.lessons = scrapedLessons;
    }

    db.lastTelegramSync = new Date().toISOString();
    await saveDb(db);

    return db.lessons;
  } catch (error) {
    console.error("Error scraping Telegram channel:", error);
    return db.lessons;
  }
}
