type Word = {
  text: string;
  x: number; // % from the left edge of its area
  y: number; // % from the top edge
  rotate: number;
  size: string; // CSS font-size
  color: string; // Tailwind text color class
  style: "serif" | "bold" | "light";
};

// Wide screens: words live only in the empty side margins, so they never sit
// under the text. Scattered along the diagonals, in the brand colors.
const sideA: Word[] = [
  { text: "Комьюнити", x: 8, y: 6, rotate: -10, size: "clamp(1.4rem,2.3vw,2.4rem)", color: "text-mural-clay", style: "serif" },
  { text: "Дружба", x: 40, y: 19, rotate: 9, size: "clamp(1.3rem,2.1vw,2.2rem)", color: "text-primary", style: "serif" },
  { text: "Идеи", x: 6, y: 32, rotate: -5, size: "clamp(1.1rem,1.8vw,1.9rem)", color: "text-mural-olive", style: "bold" },
  { text: "Доверие", x: 34, y: 46, rotate: 11, size: "clamp(1.2rem,2vw,2.1rem)", color: "text-telegram", style: "serif" },
  { text: "Встречи", x: 8, y: 59, rotate: -12, size: "clamp(0.9rem,1.3vw,1.4rem)", color: "text-mural-ink", style: "light" },
  { text: "Вдохновение", x: 22, y: 72, rotate: 8, size: "clamp(1rem,1.6vw,1.7rem)", color: "text-skin", style: "bold" },
  { text: "Смыслы", x: 6, y: 88, rotate: -8, size: "clamp(1.3rem,2.1vw,2.2rem)", color: "text-telegram", style: "serif" },
];

const sideB: Word[] = [
  { text: "Бизнес", x: 14, y: 5, rotate: 8, size: "clamp(1.2rem,1.9vw,2rem)", color: "text-telegram", style: "bold" },
  { text: "Нетворкинг", x: 30, y: 17, rotate: -6, size: "clamp(0.9rem,1.3vw,1.4rem)", color: "text-mural-olive", style: "light" },
  { text: "Любовь", x: 10, y: 31, rotate: -13, size: "clamp(1.4rem,2.3vw,2.4rem)", color: "text-skin", style: "serif" },
  { text: "Проекты", x: 30, y: 45, rotate: 8, size: "clamp(1.1rem,1.8vw,1.9rem)", color: "text-primary", style: "bold" },
  { text: "Команда", x: 8, y: 60, rotate: -7, size: "clamp(1.3rem,2.1vw,2.2rem)", color: "text-mural-olive", style: "serif" },
  { text: "Рост", x: 44, y: 74, rotate: 12, size: "clamp(1rem,1.6vw,1.7rem)", color: "text-mural-ink", style: "light" },
  { text: "Ереван", x: 14, y: 87, rotate: -11, size: "clamp(1.4rem,2.3vw,2.4rem)", color: "text-mural-clay", style: "serif" },
];

// Phones and narrow windows: there is no free margin, so the words are small,
// very faint and kept near the edges, scattered along the diagonals.
const small: Word[] = [
  { text: "Комьюнити", x: 3, y: 2, rotate: -8, size: "1.35rem", color: "text-mural-clay", style: "serif" },
  { text: "Бизнес", x: 66, y: 3, rotate: 7, size: "0.95rem", color: "text-telegram", style: "bold" },
  { text: "Дружба", x: 72, y: 16, rotate: -10, size: "1.25rem", color: "text-primary", style: "serif" },
  { text: "Идеи", x: 2, y: 24, rotate: 9, size: "0.95rem", color: "text-mural-olive", style: "bold" },
  { text: "Нетворкинг", x: 62, y: 33, rotate: -6, size: "0.7rem", color: "text-mural-olive", style: "light" },
  { text: "Любовь", x: 3, y: 44, rotate: -12, size: "1.3rem", color: "text-skin", style: "serif" },
  { text: "Проекты", x: 66, y: 52, rotate: 8, size: "0.95rem", color: "text-primary", style: "bold" },
  { text: "Доверие", x: 2, y: 63, rotate: 10, size: "1.2rem", color: "text-telegram", style: "serif" },
  { text: "Встречи", x: 70, y: 70, rotate: -9, size: "0.7rem", color: "text-mural-ink", style: "light" },
  { text: "Команда", x: 4, y: 80, rotate: -7, size: "1.25rem", color: "text-mural-olive", style: "serif" },
  { text: "Рост", x: 74, y: 82, rotate: 12, size: "0.95rem", color: "text-mural-ink", style: "bold" },
  { text: "Смыслы", x: 3, y: 94, rotate: 6, size: "1.1rem", color: "text-telegram", style: "serif" },
  { text: "Ереван", x: 62, y: 93, rotate: -9, size: "1.35rem", color: "text-mural-clay", style: "serif" },
];

const wordStyles = {
  serif: "font-serif italic",
  bold: "font-extrabold uppercase tracking-wide",
  light: "font-medium uppercase tracking-[0.18em]",
} as const;

// Static class names (Tailwind must see them in full).
const breakpoints = {
  // side margins are wide enough from 1280px (for a 48rem column)
  xl: { side: "hidden xl:block", small: "xl:hidden" },
  // for a wider column (56rem) the margins are wide enough from 1400px
  wide: { side: "hidden min-[1400px]:block", small: "min-[1400px]:hidden" },
} as const;

function Words({ words, className, opacity }: { words: Word[]; className: string; opacity: string }) {
  return (
    <>
      {words.map((w) => (
        <span
          key={w.text}
          className={`absolute whitespace-nowrap leading-none ${opacity} ${w.color} ${wordStyles[w.style]} ${className}`}
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
    </>
  );
}

export function WordMural({
  variant = "a",
  contentWidth,
  breakpoint,
  mobileOpacity = "opacity-[0.2]",
}: {
  /** "b" swaps the left and right word columns, so two pages look related but not identical. */
  variant?: "a" | "b";
  /** Width of the centered content column, e.g. "48rem". */
  contentWidth: string;
  breakpoint: keyof typeof breakpoints;
  mobileOpacity?: string;
}) {
  const bp = breakpoints[breakpoint];
  const left = variant === "a" ? sideA : sideB;
  const right = variant === "a" ? sideB : sideA;
  const sideStyle = { width: `calc((100vw - ${contentWidth}) / 2)` };

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

      <div className={`absolute left-0 top-0 h-full ${bp.side}`} style={sideStyle}>
        <Words words={left} className="" opacity="opacity-[0.42]" />
      </div>
      <div className={`absolute right-0 top-0 h-full ${bp.side}`} style={sideStyle}>
        <Words words={right} className="" opacity="opacity-[0.42]" />
      </div>

      <div className={`absolute inset-0 ${bp.small}`}>
        <Words words={small} className="" opacity={mobileOpacity} />
      </div>
    </div>
  );
}
