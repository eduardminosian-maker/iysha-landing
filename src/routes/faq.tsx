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
  x: number; // % from the left edge
  y: number; // % from the top edge
  rotate: number;
  size: string; // CSS font-size
  color: string; // Tailwind text color class
  style: "serif" | "bold" | "light";
  desktopOnly?: boolean;
};

// Scattered along the diagonals, in the brand colors, behind the content.
const words: Word[] = [
  { text: "Комьюнити", x: 3, y: 5, rotate: -10, size: "clamp(1.6rem,4.2vw,3.6rem)", color: "text-mural-clay", style: "serif" },
  { text: "Бизнес", x: 62, y: 3, rotate: 8, size: "clamp(1.4rem,3.4vw,3rem)", color: "text-telegram", style: "bold" },
  { text: "Нетворкинг", x: 74, y: 13, rotate: -6, size: "clamp(1.1rem,2.6vw,2.4rem)", color: "text-mural-olive", style: "light" },
  { text: "Дружба", x: 6, y: 20, rotate: 12, size: "clamp(1.4rem,3.6vw,3.2rem)", color: "text-primary", style: "serif" },
  { text: "Любовь", x: 80, y: 27, rotate: -14, size: "clamp(1.6rem,4vw,3.6rem)", color: "text-skin", style: "serif" },
  { text: "Идеи", x: 2, y: 36, rotate: -4, size: "clamp(1.2rem,3vw,2.6rem)", color: "text-mural-olive", style: "bold" },
  { text: "Партнёрство", x: 70, y: 41, rotate: 7, size: "clamp(1.1rem,2.6vw,2.4rem)", color: "text-mural-clay", style: "light", desktopOnly: true },
  { text: "Доверие", x: 8, y: 50, rotate: 10, size: "clamp(1.3rem,3.2vw,2.8rem)", color: "text-telegram", style: "serif" },
  { text: "Проекты", x: 76, y: 55, rotate: -9, size: "clamp(1.2rem,3vw,2.6rem)", color: "text-primary", style: "bold" },
  { text: "Встречи", x: 1, y: 63, rotate: -12, size: "clamp(1.1rem,2.6vw,2.4rem)", color: "text-mural-ink", style: "light" },
  { text: "Команда", x: 66, y: 68, rotate: 6, size: "clamp(1.4rem,3.6vw,3.2rem)", color: "text-mural-olive", style: "serif" },
  { text: "Вдохновение", x: 5, y: 76, rotate: 8, size: "clamp(1.2rem,3vw,2.6rem)", color: "text-skin", style: "bold" },
  { text: "Единомышленники", x: 55, y: 80, rotate: -5, size: "clamp(1rem,2.2vw,2rem)", color: "text-mural-clay", style: "light", desktopOnly: true },
  { text: "Ереван", x: 80, y: 88, rotate: -12, size: "clamp(1.6rem,4.2vw,3.8rem)", color: "text-mural-clay", style: "serif" },
  { text: "Смыслы", x: 3, y: 90, rotate: -8, size: "clamp(1.3rem,3.2vw,2.8rem)", color: "text-telegram", style: "serif" },
  { text: "Рост", x: 30, y: 93, rotate: 5, size: "clamp(1.1rem,2.6vw,2.2rem)", color: "text-primary", style: "bold", desktopOnly: true },
  { text: "Знакомства", x: 24, y: 1, rotate: 4, size: "clamp(1rem,2.2vw,2rem)", color: "text-mural-olive", style: "light", desktopOnly: true },
  { text: "Общение", x: 88, y: 70, rotate: 14, size: "clamp(1rem,2.2vw,2rem)", color: "text-mural-ink", style: "light", desktopOnly: true },
];

const wordStyles = {
  serif: "font-serif italic",
  bold: "font-extrabold uppercase tracking-wide",
  light: "font-medium uppercase tracking-[0.2em]",
} as const;

function FaqMural() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-mural-paper select-none"
    >
      <div className="absolute -right-40 -top-40 size-72 rounded-full bg-mural-mist opacity-60 sm:size-[26rem]" />
      <div className="absolute -bottom-40 -left-32 size-72 rounded-full bg-mural-olive opacity-20 sm:size-[26rem]" />
      <div className="absolute -right-24 bottom-24 size-56 rounded-full border border-mural-clay/25 sm:size-80" />
      <svg
        className="absolute inset-0 size-full text-mural-olive opacity-[0.14]"
        viewBox="0 0 1000 800"
        preserveAspectRatio="none"
      >
        <path d="M-60 120 Q 300 380 560 400 T 1080 700" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1060 90 Q 760 300 520 420 T -40 760" fill="none" stroke="currentColor" strokeWidth="0.9" />
      </svg>
      {words.map((w) => (
        <span
          key={w.text}
          className={`absolute whitespace-nowrap leading-none opacity-[0.3] sm:opacity-[0.36] ${w.color} ${wordStyles[w.style]} ${w.desktopOnly ? "hidden sm:block" : ""}`}
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
