type Word = {
  text: string;
  x: number; // % of the viewport width
  y: number; // % of the viewport height
  kind: "caps" | "script" | "v";
  color: string;
  size: number; // rem
  rotate: number;
  fade?: boolean; // passes behind or next to the text, so it is made a little lighter
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
  { text: "КОМАНДА", x: 9, y: 77, kind: "caps", color: "#3b402d", size: 1.15, rotate: 0, fade: true },
  { text: "ВОЗМОЖНОСТИ", x: 15, y: 91, kind: "caps", color: "#6f655a", size: 0.95, rotate: 0, fade: true },
  { text: "НЕТВОРКИНГ", x: 58, y: 75, kind: "caps", color: "#6f655a", size: 1.3, rotate: 18, fade: true },
  { text: "ИДЕИ", x: 36, y: 91, kind: "caps", color: "#1a1612", size: 1.3, rotate: 0, fade: true },
  { text: "ПАРТНЁРСТВО", x: 43, y: 37, kind: "caps", color: "#6f655a", size: 1.1, rotate: 16, fade: true },
  { text: "Бизнес", x: 80, y: 21, kind: "script", color: "#c4572e", size: 2.8, rotate: -5 },
  { text: "КОММЬЮНИТИ", x: 77, y: 6, kind: "v", color: "#1a1612", size: 1.15, rotate: 0 },
  { text: "ЛЮБОВЬ", x: 86, y: 8, kind: "caps", color: "#6f655a", size: 1.0, rotate: 0 },
  { text: "КАРЬЕРА", x: 78, y: 33, kind: "caps", color: "#1a1612", size: 1.2, rotate: 0 },
  { text: "YEREVAN", x: 82, y: 45, kind: "caps", color: "#c4572e", size: 1.5, rotate: 0 },
  { text: "ДРУЗЬЯ", x: 88, y: 56, kind: "caps", color: "#6f655a", size: 1.0, rotate: 0 },
  { text: "ПРОЕКТЫ", x: 83, y: 68, kind: "caps", color: "#6f655a", size: 1.1, rotate: -18, fade: true },
  { text: "ВДОХНОВЕНИЕ", x: 70, y: 82, kind: "caps", color: "#3b402d", size: 1.05, rotate: -24, fade: true },
  { text: "ЦЕННОСТИ", x: 96, y: 36, kind: "v", color: "#1a1612", size: 1.0, rotate: 0 },
  { text: "СМЫСЛЫ", x: 54, y: 92, kind: "caps", color: "#1a1612", size: 1.2, rotate: 0, fade: true },
  { text: "Доверие", x: 83, y: 88, kind: "script", color: "#c4572e", size: 2.2, rotate: -6 },
  { text: "ДРУЖБА", x: 62, y: 48, kind: "caps", color: "#6f655a", size: 1.2, rotate: -18, fade: true },
  { text: "ДИАЛОГ", x: 65, y: 10, kind: "caps", color: "#1a1612", size: 1.0, rotate: 12, fade: true },
  { text: "ЭНЕРГИЯ", x: 25, y: 10, kind: "caps", color: "#6f655a", size: 1.1, rotate: -12, fade: true },
  { text: "СВЯЗИ", x: 30, y: 58, kind: "caps", color: "#1a1612", size: 1.25, rotate: 14, aboutOnly: true, fade: true },
  { text: "Вместе", x: 33, y: 66, kind: "script", color: "#c4572e", size: 2.4, rotate: -8, aboutOnly: true, fade: true },
  { text: "ЗНАКОМСТВА", x: 24, y: 81, kind: "caps", color: "#6f655a", size: 1.05, rotate: -14, fade: true },
  { text: "Connect", x: 66, y: 58, kind: "script", color: "#c4572e", size: 2.2, rotate: -9, aboutOnly: true, fade: true },
];

export const phoneWords: Word[] = [
  // Phones: words lie diagonally, tilting up and down in turn, down the whole screen.
  { text: "Мечты", x: 4, y: 4, kind: "script", color: "#c4572e", size: 1.9, rotate: -12 },
  { text: "ЛЮДИ", x: 62, y: 8, kind: "caps", color: "#1a1612", size: 0.85, rotate: 16 },
  { text: "СООБЩЕСТВО", x: 5, y: 16, kind: "caps", color: "#6f655a", size: 0.75, rotate: 16 },
  { text: "Бизнес", x: 60, y: 24, kind: "script", color: "#c4572e", size: 1.9, rotate: -14 },
  { text: "РОСТ", x: 8, y: 32, kind: "caps", color: "#1a1612", size: 0.9, rotate: -18 },
  { text: "YEREVAN", x: 56, y: 40, kind: "caps", color: "#c4572e", size: 0.85, rotate: 16 },
  { text: "Together", x: 4, y: 48, kind: "script", color: "#c4572e", size: 1.9, rotate: -12 },
  { text: "ПРОЕКТЫ", x: 58, y: 56, kind: "caps", color: "#6f655a", size: 0.8, rotate: -16 },
  { text: "КОМАНДА", x: 6, y: 64, kind: "caps", color: "#3b402d", size: 0.85, rotate: 16 },
  { text: "Доверие", x: 56, y: 72, kind: "script", color: "#c4572e", size: 1.8, rotate: -12 },
  { text: "НЕТВОРКИНГ", x: 4, y: 80, kind: "caps", color: "#6f655a", size: 0.75, rotate: -18 },
  { text: "СМЫСЛЫ", x: 60, y: 87, kind: "caps", color: "#1a1612", size: 0.85, rotate: 14 },
  { text: "ИДЕИ", x: 10, y: 94, kind: "caps", color: "#1a1612", size: 0.85, rotate: 14 },
];

export function Words({ words, className }: { words: Word[]; className: string }) {
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
            opacity: w.fade ? 0.6 : undefined,
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}

type Face = { x: number; y: number; w: number; r: number; b?: boolean }; // x, y in % of the screen, w in px, r = rotation in degrees

// The little two-faces logo, tossed around the page and turned every which way.
const desktopFaces: Face[] = [
  { x: 13, y: 21, w: 52, r: 200 }, { x: 2, y: 9, w: 44, r: 75, b: true }, { x: 3, y: 46, w: 50, r: -40 },
  { x: 14, y: 69, w: 46, r: 150, b: true }, { x: 2, y: 85, w: 54, r: 290 }, { x: 25, y: 40, w: 44, r: 20, b: true },
  { x: 34, y: 14, w: 46, r: 250 }, { x: 47, y: 5, w: 50, r: 120, b: true }, { x: 56, y: 19, w: 44, r: -70 },
  { x: 72, y: 14, w: 48, r: 180, b: true }, { x: 91, y: 22, w: 52, r: 60 }, { x: 71, y: 56, w: 46, r: 330, b: true },
  { x: 91, y: 30, w: 44, r: 230 }, { x: 95, y: 66, w: 50, r: 100, b: true }, { x: 66, y: 28, w: 46, r: -150 },
  { x: 76, y: 76, w: 50, r: 10, b: true }, { x: 92, y: 82, w: 46, r: 215 }, { x: 61, y: 68, w: 52, r: 300, b: true },
  { x: 28, y: 94, w: 44, r: 90 }, { x: 59, y: 60, w: 44, r: 160, b: true }, { x: 23, y: 73, w: 46, r: -100 },
];
const phoneFaces: Face[] = [
  { x: 40, y: 2, w: 34, r: 200 }, { x: 85, y: 17, w: 36, r: 75, b: true }, { x: 40, y: 27, w: 34, r: -40 },
  { x: 2, y: 38, w: 36, r: 150, b: true }, { x: 80, y: 47, w: 34, r: 290 }, { x: 36, y: 44, w: 32, r: 20, b: true },
  { x: 86, y: 63, w: 36, r: 250 }, { x: 38, y: 70, w: 34, r: 120, b: true }, { x: 4, y: 74, w: 34, r: -70 },
  { x: 82, y: 80, w: 36, r: 180, b: true }, { x: 36, y: 86, w: 32, r: 60 }, { x: 80, y: 95, w: 34, r: 330, b: true },
  { x: 2, y: 56, w: 30, r: 230 }, { x: 44, y: 14, w: 30, r: 100, b: true },
];

function Faces({ faces, className }: { faces: Face[]; className: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {faces.map((f, i) => (
        <img
          key={i}
          src={f.b ? "/favicon.png" : "/logo-faces.svg"}
          alt=""
          className={`absolute h-auto ${f.b ? "rounded-full" : ""}`}
          style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.b ? f.w * 0.85 : f.w, transform: `rotate(${f.r}deg)` }}
        />
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
      <Words words={desktop} className="max-md:hidden opacity-[0.2] md:max-lg:opacity-[0.1]" />
      <Words words={phoneWords} className="md:hidden opacity-[0.15]" />
      <Faces faces={desktopFaces} className="max-md:hidden opacity-[0.2] md:max-lg:opacity-[0.1]" />
      <Faces faces={phoneFaces} className="md:hidden opacity-[0.14]" />
    </div>
  );
}
