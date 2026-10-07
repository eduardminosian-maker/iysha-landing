import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AccordionList } from "@/components/accordion-list";
import { faqItems } from "@/lib/faq-items";
import { Button } from "@/components/ui/button";

const description =
  "Ответы на частые вопросы о сообществе IYSHA: как вступить, как проходят встречи, сколько это стоит и на каком языке мы общаемся.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Частые вопросы — IYSHA" },
      { name: "description", content: description },
      { property: "og:title", content: "Частые вопросы — IYSHA" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

type Word = {
  text: string;
  x: number; // % from the left edge of its side column
  y: number; // % from the top edge
  rotate: number;
  size: string; // CSS font-size
  color: string; // Tailwind text color class
  style: "serif" | "bold" | "light";
};

// Words live only in the empty side margins (wide screens), so they never
// sit under the questions. Scattered along the diagonals, in the brand colors.
const leftWords: Word[] = [
  { text: "Комьюнити", x: 8, y: 6, rotate: -10, size: "clamp(1.4rem,2.3vw,2.4rem)", color: "text-mural-clay", style: "serif" },
  { text: "Дружба", x: 40, y: 19, rotate: 9, size: "clamp(1.3rem,2.1vw,2.2rem)", color: "text-primary", style: "serif" },
  { text: "Идеи", x: 6, y: 32, rotate: -5, size: "clamp(1.1rem,1.8vw,1.9rem)", color: "text-mural-olive", style: "bold" },
  { text: "Доверие", x: 34, y: 46, rotate: 11, size: "clamp(1.2rem,2vw,2.1rem)", color: "text-telegram", style: "serif" },
  { text: "Встречи", x: 8, y: 59, rotate: -12, size: "clamp(0.9rem,1.3vw,1.4rem)", color: "text-mural-ink", style: "light" },
  { text: "Вдохновение", x: 22, y: 72, rotate: 8, size: "clamp(1rem,1.6vw,1.7rem)", color: "text-skin", style: "bold" },
  { text: "Смыслы", x: 6, y: 88, rotate: -8, size: "clamp(1.3rem,2.1vw,2.2rem)", color: "text-telegram", style: "serif" },
];

const rightWords: Word[] = [
  { text: "Бизнес", x: 14, y: 5, rotate: 8, size: "clamp(1.2rem,1.9vw,2rem)", color: "text-telegram", style: "bold" },
  { text: "Нетворкинг", x: 30, y: 17, rotate: -6, size: "clamp(0.9rem,1.3vw,1.4rem)", color: "text-mural-olive", style: "light" },
  { text: "Любовь", x: 10, y: 31, rotate: -13, size: "clamp(1.4rem,2.3vw,2.4rem)", color: "text-skin", style: "serif" },
  { text: "Проекты", x: 30, y: 45, rotate: 8, size: "clamp(1.1rem,1.8vw,1.9rem)", color: "text-primary", style: "bold" },
  { text: "Команда", x: 8, y: 60, rotate: -7, size: "clamp(1.3rem,2.1vw,2.2rem)", color: "text-mural-olive", style: "serif" },
  { text: "Рост", x: 44, y: 74, rotate: 12, size: "clamp(1rem,1.6vw,1.7rem)", color: "text-mural-ink", style: "light" },
  { text: "Ереван", x: 14, y: 87, rotate: -11, size: "clamp(1.4rem,2.3vw,2.4rem)", color: "text-mural-clay", style: "serif" },
];

const wordStyles = {
  serif: "font-serif italic",
  bold: "font-extrabold uppercase tracking-wide",
  light: "font-medium uppercase tracking-[0.18em]",
} as const;

// Width of one side margin: (screen - content column) / 2.
const sideColumn = "hidden xl:block absolute top-0 h-full w-[calc((100vw-48rem)/2)]";

function WordColumn({ words, side }: { words: Word[]; side: "left" | "right" }) {
  return (
    <div className={`${sideColumn} ${side === "left" ? "left-0" : "right-0"}`}>
      {words.map((w) => (
        <span
          key={w.text}
          className={`absolute whitespace-nowrap leading-none opacity-[0.42] ${w.color} ${wordStyles[w.style]}`}
          style={{
            left: `${w.x}%`,
            top: `${w.y}%`,
            fontSize: w.size,
            transform: `rotate(${w.rotate}deg)`,
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}

function FaqMural() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-mural-paper select-none"
    >
      <div className="absolute -right-40 -top-40 size-72 rounded-full bg-mural-mist opacity-50 sm:size-[26rem]" />
      <div className="absolute -bottom-40 -left-32 size-72 rounded-full bg-mural-olive opacity-15 sm:size-[26rem]" />
      <svg
        className="absolute inset-0 size-full text-mural-olive opacity-[0.05]"
        viewBox="0 0 1000 800"
        preserveAspectRatio="none"
      >
        <path d="M-60 120 Q 300 380 560 400 T 1080 700" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1060 90 Q 760 300 520 420 T -40 760" fill="none" stroke="currentColor" strokeWidth="0.9" />
      </svg>
      <WordColumn words={leftWords} side="left" />
      <WordColumn words={rightWords} side="right" />
    </div>
  );
}

function FaqPage() {
  return (
    <main className="relative isolate min-h-[100svh] bg-mural-paper text-foreground">
      <FaqMural />
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col justify-center px-5 py-[clamp(1rem,3.5vh,3rem)] sm:px-10">
        <h1 className="text-center text-[clamp(1.5rem,4.5vh,2.5rem)] font-extrabold leading-tight">
          Частые вопросы
        </h1>

        <div className="mt-[clamp(0.75rem,3vh,2.5rem)]">
          <AccordionList idPrefix="faq" items={faqItems} dense />
        </div>

        <div className="mt-[clamp(1rem,3.5vh,3rem)] flex flex-col items-center gap-[clamp(0.6rem,2vh,1.25rem)]">
          <Button asChild className="h-11 rounded-full px-8 text-base font-bold sm:h-12">
            <a href="https://t.me/iysha_yerevan" target="_blank" rel="noopener noreferrer">
              Подать заявку <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Link to="/" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            ← На главную
          </Link>
        </div>
      </div>
      <div id="scroll-spacer" aria-hidden="true" />
    </main>
  );
}
