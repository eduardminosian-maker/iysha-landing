import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Words, phoneWords } from "@/components/word-mural";
import { APPLY_URL, useNextMeeting } from "@/lib/apply";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "canonical", href: "https://iysha.am/" },
    ],
    meta: [
      { title: "Знакомства. Нетворкинг. Ереван. — IYSHA" },
      { name: "description", content: "Клуб живых знакомств для совместного предпринимательства и не только. Вход после личной встречи." },
      { property: "og:title", content: "Знакомства. Нетворкинг. Ереван. — IYSHA" },
      { property: "og:description", content: "Клуб живых знакомств для совместного предпринимательства и не только." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "yandex-verification", content: "a3591098d7eb6200" },
    ],
  }),
  component: Index,
});

type MuralWord = {
  text: string;
  x: number;
  y: number;
  kind: "caps" | "script" | "v";
  color: string;
  size: number; // rem
  rotate: number;
  desktopOnly: boolean;
};

// Words scattered around the headline: letter-spaced capitals, a few vertical
// ones, and handwritten accents. Wide screens get all of them, phones only a few.
const muralWords: MuralWord[] = [
  { text: "ЛЮДИ", x: 5, y: 17, kind: "caps", color: "#1a1612", size: 1.7, rotate: 0, desktopOnly: true },
  { text: "TEAM", x: 7, y: 25, kind: "caps", color: "#6f655a", size: 1, rotate: 0, desktopOnly: true },
  { text: "Мечты", x: 5.5, y: 33, kind: "script", color: "#c4572e", size: 2.6, rotate: -6, desktopOnly: true },
  { text: "ВСТРЕЧИ", x: 5, y: 46, kind: "caps", color: "#6f655a", size: 1.05, rotate: 0, desktopOnly: true },
  { text: "СООБЩЕСТВО", x: 17.5, y: 12, kind: "v", color: "#1a1612", size: 1.15, rotate: 0, desktopOnly: true },
  { text: "РОСТ", x: 17, y: 58, kind: "caps", color: "#1a1612", size: 1.5, rotate: 0, desktopOnly: true },
  { text: "Together", x: 5, y: 64, kind: "script", color: "#c4572e", size: 2.4, rotate: -8, desktopOnly: true },
  { text: "ПАРТНЁРСТВО", x: 70, y: 16, kind: "caps", color: "#6f655a", size: 1.0, rotate: 0, desktopOnly: true },
  { text: "Бизнес", x: 78, y: 25, kind: "script", color: "#c4572e", size: 2.8, rotate: -5, desktopOnly: true },
  { text: "КОММЬЮНИТИ", x: 68, y: 11, kind: "v", color: "#1a1612", size: 1.15, rotate: 0, desktopOnly: true },
  { text: "ЛЮБОВЬ", x: 84, y: 13, kind: "caps", color: "#6f655a", size: 1.0, rotate: 0, desktopOnly: true },
  { text: "КАРЬЕРА", x: 76, y: 38, kind: "caps", color: "#1a1612", size: 1.2, rotate: 0, desktopOnly: true },
  { text: "YEREVAN", x: 83, y: 48, kind: "caps", color: "#c4572e", size: 1.5, rotate: 0, desktopOnly: true },
  { text: "ДРУЗЬЯ", x: 86, y: 67, kind: "caps", color: "#6f655a", size: 1.0, rotate: 0, desktopOnly: true },
  { text: "ПРОЕКТЫ", x: 72, y: 60, kind: "caps", color: "#6f655a", size: 1.0, rotate: 0, desktopOnly: true },
  { text: "ЦЕННОСТИ", x: 96, y: 38, kind: "v", color: "#1a1612", size: 1.0, rotate: 0, desktopOnly: true },
  { text: "СМЫСЛЫ", x: 68, y: 67, kind: "caps", color: "#1a1612", size: 1.2, rotate: 0, desktopOnly: true },
];

const steps = [
  "Отправь кружок или голосовое в Telegram",
  "Возможно, тебе предложат встречу",
  "При встрече мы вправе выбрать или не выбрать друг друга",
  "Если мы выбираем друг друга – ты в комьюнити",
];

function Index() {
  const meeting = useNextMeeting();
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-x-hidden max-sm:fixed max-sm:inset-0 max-sm:min-h-0 max-sm:overflow-y-auto bg-[#f3ece1] text-[#1a1612]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute -left-[9vw] -top-[14vh] size-[26vmin] rounded-full bg-[#3b402d]" />
        <div className="absolute -bottom-[24vh] -left-[9vw] size-[36vmin] rounded-full bg-[#d98a63]" />
        <div className="absolute -right-[10vw] -top-[14vh] size-[42vmin] rounded-full bg-[#e3d6c4]" />
        <div className="absolute -bottom-[20vh] -right-[9vw] size-[34vmin] rounded-full bg-[#e3d6c4]" />
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <path d="M62 -2 C 69 8, 83 8, 90 -2" stroke="#c4572e" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
        </svg>
        {muralWords.map((w) => (
          <span
            key={`${w.text}-${w.desktopOnly}`}
            className={`absolute whitespace-nowrap ${w.desktopOnly ? "max-md:hidden" : "hidden"} ${
              w.kind === "script"
                ? "font-script font-normal"
                : "font-semibold uppercase tracking-[0.32em]"
            } ${w.kind === "v" ? "rotate-180 [writing-mode:vertical-rl]" : ""}`}
            style={{
              left: `${w.x}%`,
              top: `${w.y}%`,
              color: w.color,
              fontSize: `${w.size}rem`,
              transform: w.rotate ? `rotate(${w.rotate}deg)` : undefined,
              letterSpacing: w.kind === "script" ? "-0.03em" : undefined,
            }}
          >
            {w.text}
          </span>
        ))}
        <Words words={phoneWords} className="md:hidden opacity-[0.18]" />
      </div>

      <header className="relative z-10 flex items-center justify-center px-6 py-3 sm:px-12 sm:py-5">
        <span className="text-sm font-bold tracking-[0.4em]">IYSHA</span>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 text-center">
        <img
          src="/logo-faces.svg"
          alt=""
          aria-hidden="true"
          className="mb-3 h-[clamp(2.5rem,8vh,6.5rem)] w-auto sm:mb-5 sm:h-[clamp(3.5rem,11vh,6.5rem)]"
        />
        <h1 className="font-display text-[clamp(2.4rem,min(9vh,12vw),7rem)] font-medium leading-[0.95] tracking-tight">
          Знакомства.<br />Нетворкинг.<br />
          <em className="font-medium text-[#c4572e]">Ереван.</em>
        </h1>
        <p className="mt-4 max-w-xl sm:mt-6 text-[clamp(0.85rem,min(2vh,4vw),1.2rem)] leading-relaxed text-[#1a1612]/70">
          <span className="block">Клуб живых знакомств</span>
          <span className="block">
            для совместного предпринимательства
            <span className="max-md:block"> и не только</span>
          </span>
          <span className="block">Вход после личной встречи</span>
          <span key={meeting.k} suppressHydrationWarning className="block font-semibold text-[#1a1612]">Ближайшая встреча {meeting.date} · бесплатно</span>
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 sm:mt-8 sm:flex-wrap sm:gap-3">
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1a1612] px-5 text-[15px] font-bold sm:h-12 sm:px-8 sm:text-base text-[#f3ece1] transition-colors hover:bg-black"
          >
            Подать заявку <ArrowRight aria-hidden="true" className="size-4" />
          </a>
          <Link
            to="/about"
            className="inline-flex h-11 items-center rounded-full border border-[#1a1612]/30 px-5 text-[15px] font-semibold sm:h-12 sm:px-7 sm:text-base transition-colors hover:bg-[#1a1612]/5"
          >
            В чем идея
          </Link>
        </div>
      </section>

      <footer className="relative top-px z-10 mx-auto w-full max-w-5xl px-6 pb-5 sm:top-0 sm:px-12 sm:pb-9">
        <ol aria-label="Как к нам попасть" className="grid grid-cols-1 gap-x-8 sm:grid-cols-4 sm:border-t sm:border-[#1a1612]/20 sm:pt-5">
          {steps.map((t, i) => (
            <li key={i} className="flex gap-3 py-0.5 sm:block sm:py-0">
              <span className="font-display text-2xl font-medium italic text-[#c4572e] sm:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[13px] font-medium leading-snug text-[#1a1612]/70 sm:mt-1 sm:text-sm">{t}</p>
            </li>
          ))}
        </ol>
      </footer>
    </main>
  );
}
