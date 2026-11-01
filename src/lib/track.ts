import { STATS_KEY, STATS_URL } from "@/lib/stats-config";

export type EventKind = "visit" | "apply_open" | "apply_click";

const VISIT_KEY = "iysha_visit";
const NO_TRACK_KEY = "iysha_no_track";

/** Labels for the ?s=... part of a link, so every link in a bio can say where it sits. */
const TAGS: Record<string, string> = {
  insta: "Instagram",
  instagram: "Instagram",
  ig: "Instagram",
  fb: "Facebook",
  facebook: "Facebook",
  threads: "Threads",
  tg: "Telegram",
  telegram: "Telegram",
  yt: "YouTube",
  youtube: "YouTube",
  li: "LinkedIn",
  linkedin: "LinkedIn",
  vk: "ВКонтакте",
  wa: "WhatsApp",
  whatsapp: "WhatsApp",
  tiktok: "TikTok",
  x: "X (Twitter)",
  twitter: "X (Twitter)",
  mail: "Почта",
  email: "Почта",
};

const HOSTS: [RegExp, string][] = [
  [/(^|\.)instagram\.com$/, "Instagram"],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, "Facebook"],
  [/(^|\.)threads\.(net|com)$/, "Threads"],
  [/(^|\.)(t\.me|telegram\.org|telegram\.me)$/, "Telegram"],
  [/(^|\.)google\.[a-z.]+$/, "Google"],
  [/(^|\.)(yandex\.[a-z.]+|ya\.ru)$/, "Яндекс"],
  [/(^|\.)bing\.com$/, "Bing"],
  [/(^|\.)duckduckgo\.com$/, "DuckDuckGo"],
  [/(^|\.)(chatgpt\.com|openai\.com)$/, "ChatGPT"],
  [/(^|\.)claude\.ai$/, "Claude"],
  [/(^|\.)perplexity\.ai$/, "Perplexity"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "YouTube"],
  [/(^|\.)linkedin\.com$/, "LinkedIn"],
  [/(^|\.)(vk\.com|vk\.ru)$/, "ВКонтакте"],
  [/(^|\.)(wa\.me|whatsapp\.com)$/, "WhatsApp"],
  [/(^|\.)tiktok\.com$/, "TikTok"],
  [/(^|\.)(x\.com|twitter\.com|t\.co)$/, "X (Twitter)"],
];

function randomId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function deviceKind(): string {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return "планшет";
  if (/iPhone|Android.+Mobile|Mobile/i.test(ua)) return "телефон";
  return "компьютер";
}

/** Where the visit came from: the link label first, then the referring site, then the in-app browser. */
function detectSource(): { source: string; referrer: string | null; tag: string | null } {
  const params = new URLSearchParams(location.search);
  const rawTag = (params.get("s") ?? "").trim().toLowerCase();
  const tag = rawTag || null;
  let referrer: string | null = null;
  let refSource: string | null = null;
  try {
    if (document.referrer) {
      const url = new URL(document.referrer);
      if (url.hostname !== location.hostname) {
        referrer = url.hostname + (url.pathname !== "/" ? url.pathname : "");
        refSource = HOSTS.find(([re]) => re.test(url.hostname))?.[1] ?? url.hostname.replace(/^www\./, "");
      }
    }
  } catch {
    /* no referrer */
  }
  const ua = navigator.userAgent;
  const inApp = /Instagram/i.test(ua) ? "Instagram" : /FBAN|FBAV|FB_IAB/i.test(ua) ? "Facebook" : /Threads/i.test(ua) ? "Threads" : null;
  const tagSource = tag ? (TAGS[tag] ?? tag) : null;
  const source = tagSource ?? refSource ?? inApp ?? "Напрямую";
  return { source, referrer: referrer ?? (inApp && !refSource ? `внутри приложения ${inApp}` : null), tag };
}

function enabled() {
  if (!STATS_URL || !STATS_KEY || typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(NO_TRACK_KEY)) return false; // your own browser, once you have opened /stats
  } catch {
    /* ignore */
  }
  if (navigator.webdriver) return false;
  return true;
}

/** Stop counting this browser (called when you open /stats). */
export function ignoreThisBrowser() {
  try {
    localStorage.setItem(NO_TRACK_KEY, "1");
  } catch {
    /* ignore */
  }
}

type Visit = { id: string; source: string; referrer: string | null; tag: string | null; device: string };

/** One record per visit (tab), created at the first page and kept while the person moves around the site. */
function currentVisit(): Visit {
  try {
    const saved = sessionStorage.getItem(VISIT_KEY);
    if (saved) return JSON.parse(saved) as Visit;
  } catch {
    /* ignore */
  }
  const visit: Visit = { id: randomId(), ...detectSource(), device: deviceKind() };
  try {
    sessionStorage.setItem(VISIT_KEY, JSON.stringify(visit));
  } catch {
    /* ignore */
  }
  return visit;
}

let lastKey = "";
let lastAt = 0;

export function track(kind: EventKind, path: string = location.pathname) {
  if (!enabled()) return;
  // the same event twice within a second is a double fire, not a real repeat
  const key = `${kind}|${path}`;
  const now = Date.now();
  if (key === lastKey && now - lastAt < 1000) return;
  lastKey = key;
  lastAt = now;
  const v = currentVisit();
  void fetch(`${STATS_URL}/rest/v1/site_events`, {
    method: "POST",
    keepalive: true,
    headers: {
      apikey: STATS_KEY,
      Authorization: `Bearer ${STATS_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      visit: v.id,
      kind,
      path,
      source: v.source,
      referrer: v.referrer,
      tag: v.tag,
      device: v.device,
    }),
  }).catch(() => {});
}
