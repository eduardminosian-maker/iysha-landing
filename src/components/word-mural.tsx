type Word = {
  text: string;
  x: number; // % of the viewport width
  y: number; // % of the viewport height
  kind: "caps" | "script" | "v";
  color: string;
  size: number; // rem
  rotate: number;
  aboutOnly?: boolean; // hidden on the FAQ page, where the list is longer
};

// Words across the whole screen, very light, so they can pass right behind the text.
const desktopWords: Word[] = [
  { text: "ЛЮДИ", x: 6, y: 17, kind: "caps", color: "#1a1612", size: 1.7, rotate: 0 },
  { text: "TEAM", x: 8, y: 27, kind: "caps", color: "#6f655a", size: 1, rotate: 0 },
  { text: "Мечты", x: 4, y: 36, kind: "script", color: "#c4572e", size: 2.6, rotate: -6 },
  { text: "ВСТРЕЧИ", x: 13, y: 46, kind: "caps", color: "#6f655a", size: 1.05, rotate: 0 },
  { text: "СООБЩЕСТВО", x: 19, y: 8, kind: "v", color: "#1a1612", size: 1.15, rotate: 0 },
  { text: "РОСТ", x: 5, y: 55, kind: "caps", color: "#1a1612", size: 1.5, rotate: 0 },
  { text: "Together", x: 5, y: 64, kind: "script", color: "#c4572e", size: 2.4, rotate: -8 },
  { text: "КОМАНДА", x: 9, y: 77, kind: "caps", color: "#3b402d", size: 1.15, rotate: 0 },
  { text: "ВОЗМОЖНОСТИ", x: 15, y: 91, kind: "caps", color: "#6f655a", size: 0.95, rotate: 0 },
  { text: "НЕТВОРКИНГ", x: 58, y: 75, kind: "caps", color: "#6f655a", size: 1.3, rotate: 18 },
  { text: "ИДЕИ", x: 36, y: 91, kind: "caps", color: "#1a1612", size: 1.3, rotate: 0 },
  { text: "ПАРТНЁРСТВО", x: 43, y: 37, kind: "caps", color: "#6f655a", size: 1.1, rotate: 16 },
  { text: "Бизнес", x: 80, y: 21, kind: "script", color: "#c4572e", size: 2.8, rotate: -5 },
  { text: "КОММЬЮНИТИ", x: 77, y: 6, kind: "v", color: "#1a1612", size: 1.15, rotate: 0 },
  { text: "ЛЮБОВЬ", x: 86, y: 8, kind: "caps", color: "#6f655a", size: 1.0, rotate: 0 },
  { text: "КАРЬЕРА", x: 78, y: 33, kind: "caps", color: "#1a1612", size: 1.2, rotate: 0 },
  { text: "YEREVAN", x: 82, y: 45, kind: "caps", color: "#c4572e", size: 1.5, rotate: 0 },
  { text: "ДРУЗЬЯ", x: 88, y: 56, kind: "caps", color: "#6f655a", size: 1.0, rotate: 0 },
  { text: "ПРОЕКТЫ", x: 83, y: 68, kind: "caps", color: "#6f655a", size: 1.1, rotate: -18 },
  { text: "ВДОХНОВЕНИЕ", x: 70, y: 82, kind: "caps", color: "#3b402d", size: 1.05, rotate: -24 },
  { text: "ЦЕННОСТИ", x: 96, y: 36, kind: "v", color: "#1a1612", size: 1.0, rotate: 0 },
  { text: "СМЫСЛЫ", x: 54, y: 92, kind: "caps", color: "#1a1612", size: 1.2, rotate: 0 },
  { text: "Доверие", x: 83, y: 88, kind: "script", color: "#c4572e", size: 2.2, rotate: -6 },
  { text: "ДРУЖБА", x: 62, y: 48, kind: "caps", color: "#6f655a", size: 1.2, rotate: -18 },
  { text: "ДИАЛОГ", x: 65, y: 10, kind: "caps", color: "#1a1612", size: 1.0, rotate: 12 },
  { text: "ЭНЕРГИЯ", x: 25, y: 10, kind: "caps", color: "#6f655a", size: 1.1, rotate: -12 },
  { text: "СВЯЗИ", x: 30, y: 58, kind: "caps", color: "#1a1612", size: 1.25, rotate: 14, aboutOnly: true },
  { text: "Вместе", x: 33, y: 66, kind: "script", color: "#c4572e", size: 2.4, rotate: -8, aboutOnly: true },
  { text: "ЗНАКОМСТВА", x: 24, y: 81, kind: "caps", color: "#6f655a", size: 1.05, rotate: -14 },
  { text: "Connect", x: 66, y: 58, kind: "script", color: "#c4572e", size: 2.2, rotate: -9, aboutOnly: true },
];

const phoneWords: Word[] = [
  { text: "Мечты", x: 3, y: 3, kind: "script", color: "#c4572e", size: 1.9, rotate: -6 },
  { text: "ЛЮДИ", x: 66, y: 6, kind: "caps", color: "#1a1612", size: 0.8, rotate: 0 },
  { text: "СООБЩЕСТВО", x: 4, y: 22, kind: "caps", color: "#6f655a", size: 0.7, rotate: 0 },
  { text: "Бизнес", x: 60, y: 30, kind: "script", color: "#c4572e", size: 1.9, rotate: -5 },
  { text: "РОСТ", x: 6, y: 42, kind: "caps", color: "#1a1612", size: 0.9, rotate: 0 },
  { text: "YEREVAN", x: 58, y: 52, kind: "caps", color: "#c4572e", size: 0.85, rotate: 0 },
  { text: "Together", x: 4, y: 63, kind: "script", color: "#c4572e", size: 1.9, rotate: -8 },
  { text: "ПРОЕКТЫ", x: 62, y: 72, kind: "caps", color: "#6f655a", size: 0.75, rotate: 0 },
  { text: "КОМАНДА", x: 5, y: 82, kind: "caps", color: "#3b402d", size: 0.8, rotate: 0 },
  { text: "Доверие", x: 58, y: 90, kind: "script", color: "#c4572e", size: 1.8, rotate: -6 },
  { text: "СМЫСЛЫ", x: 6, y: 94, kind: "caps", color: "#1a1612", size: 0.8, rotate: 0 },
];

function Words({ words, className }: { words: Word[]; className: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {words.map((w) => (
        <span
          key={w.text}
          className={`absolute whitespace-nowrap ${
            w.kind === "script" ? "font-script font-normal" : "font-semibold uppercase tracking-[0.32em]"
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
    </div>
  );
}

// variant "b" (FAQ) leaves out the words meant for the empty space below the shorter About list.
export function WordMural({ variant }: {
  variant?: "a" | "b" | undefined;
  contentWidth?: string;
  breakpoint?: string;
  mobileOpacity?: string;
} = {}) {
  const desktop = variant === "b" ? desktopWords.filter((w) => !w.aboutOnly) : desktopWords;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f3ece1] select-none">
      <div className="absolute -left-[9vw] -top-[14vh] size-[26vmin] rounded-full bg-[#3b402d]" />
      <div className="absolute -bottom-[24vh] -left-[9vw] size-[36vmin] rounded-full bg-[#d98a63]" />
      <div className="absolute -right-[10vw] -top-[14vh] size-[42vmin] rounded-full bg-[#e3d6c4]" />
      <div className="absolute -bottom-[20vh] -right-[9vw] size-[34vmin] rounded-full bg-[#e3d6c4]" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        <path d="M62 -2 C 69 8, 83 8, 90 -2" stroke="#c4572e" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
      </svg>
      <Words words={desktop} className="max-md:hidden opacity-[0.2]" />
      <Words words={phoneWords} className="md:hidden opacity-[0.2]" />
    </div>
  );
}
