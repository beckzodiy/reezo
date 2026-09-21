import { getDb, saveDb, Lesson } from "./db";

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@MilliySfera";
export const YOUTUBE_CHANNEL_ID = "UCHDYwjtQts079W2mwqcVFwA";
export const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

export async function fetchYouTubeLessons(force = false): Promise<Lesson[]> {
  const db = await getDb();
  const now = Date.now();

  // If synced within last 60 seconds and not forced, return cached lessons
  if (!force && db.lastSync) {
    const lastSync = new Date(db.lastSync).getTime();
    if (now - lastSync < 60 * 1000 && db.lessons && db.lessons.length > 0) {
      return db.lessons;
    }
  }

  try {
    const response = await fetch(YOUTUBE_FEED_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/xml,text/xml,*/*",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn("Failed to fetch YouTube feed:", response.status);
      return db.lessons || [];
    }

    const xml = await response.text();
    const scrapedLessons: Lesson[] = [];

    // Parse <entry> blocks from XML
    const entryBlocks = xml.split("<entry>");

    for (let i = 1; i < entryBlocks.length; i++) {
      const block = entryBlocks[i].split("</entry>")[0];

      const videoIdMatch =
        block.match(/<yt:videoId>(.*?)<\/yt:videoId>/) ||
        block.match(/<id>yt:video:(.*?)<\/id>/);
      const titleMatch = block.match(/<title>(.*?)<\/title>/);
      const descMatch = block.match(/<media:description>([\s\S]*?)<\/media:description>/);
      const thumbMatch = block.match(/<media:thumbnail url="([^"]+)"/);
      const dateMatch = block.match(/<published>(.*?)<\/published>/);
      const viewsMatch = block.match(/<media:statistics views="([^"]+)"/);

      if (!videoIdMatch) continue;

      const videoId = videoIdMatch[1].trim();
      const rawTitle = titleMatch ? titleMatch[1].trim() : `Dars #${i}`;
      // Clean HTML entities from title
      const title = rawTitle
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

      const description = descMatch
        ? descMatch[1]
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .trim()
        : "Ushbu dars bo'yicha to'liq videoni tomosha qiling va mashqlarni bajaring.";

      const thumbnail = thumbMatch
        ? thumbMatch[1]
        : `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      const publishedAt = dateMatch ? dateMatch[1] : new Date().toISOString();
      const views = viewsMatch ? viewsMatch[1] : "100+";

      scrapedLessons.push({
        id: `yt-${videoId}`,
        postId: videoId,
        messageId: i,
        title,
        description,
        videoId,
        thumbSrc: thumbnail,
        duration: "15:00",
        views,
        publishedAt,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`,
        order: i,
      });
    }

    if (scrapedLessons.length > 0) {
      db.lessons = scrapedLessons;
    } else if (!db.lessons || db.lessons.length === 0) {
      // Fallback starter lessons
      db.lessons = [
        {
          id: "yt-starter-1",
          postId: "ZI1frF9EpN8",
          messageId: 1,
          videoId: "ZI1frF9EpN8",
          title: "1-Dars: Ingliz tili asosiy talaffuz va kundalik so'zlar",
          description:
            "Ingliz tilida to'g'ri talaffuz qilish qoidalari. Harflar va ularning o'qilishini o'rganamiz.\n\nUyga vazifa:\n1. 10 ta so'zning talaffuzini mashq qiling.\n2. Lug'at tuzing.",
          thumbSrc: "https://i3.ytimg.com/vi/ZI1frF9EpN8/hqdefault.jpg",
          duration: "15:00",
          views: "250+",
          publishedAt: new Date().toISOString(),
          youtubeUrl: "https://www.youtube.com/watch?v=ZI1frF9EpN8",
          embedUrl: "https://www.youtube-nocookie.com/embed/ZI1frF9EpN8?autoplay=0&rel=0&modestbranding=1",
          order: 1,
        },
      ];
    }

    db.lastSync = new Date().toISOString();
    await saveDb(db);

    return db.lessons;
  } catch (error) {
    console.error("Error fetching YouTube feed:", error);
    return db.lessons || [];
  }
}
