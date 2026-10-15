import { useEffect, useRef, useState } from "react";

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

export function Words({ words, className, avoidColumn, solid }: { words: Word[]; className: string; avoidColumn?: boolean; solid?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [touching, setTouching] = useState<Set<string>>(new Set());
  // Words may only be fully visible outside the text column; any word that reaches into it is made lighter.
  useEffect(() => {
    if (!avoidColumn) return;
    const measure = () => {
      const el = root.current;
      if (!el) return;
      const half = 21.5 * parseFloat(getComputedStyle(document.documentElement).fontSize) + 8; // 43rem column / 2 + margin
      const mid = window.innerWidth / 2;
      const next = new Set<string>();
      el.querySelectorAll<HTMLElement>("[data-w]").forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.width > 0 && r.right > mid - half && r.left < mid + half) next.add(n.dataset["w"]!);
      });
      setTouching(next);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [avoidColumn]);
  return (
    <div ref={root} className={`absolute inset-0 ${className}`}>
      {words.map((w) => (
        <span
          key={w.text}
          data-w={w.text}
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
            opacity: touching.has(w.text) ? (w.kind === "v" ? 0 : solid ? 0.07 : 0.35) : w.fade ? (solid ? 0.12 : 0.6) : undefined,
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}

type Shape = { x: number; y: number; k: "tri" | "sq" | "ring" | "star" | "hex"; c: string; w: number; r: number }; // x, y: centre in % of the screen

// Simple geometric decorations, only in the free space (not under the text column, the words, the circles or the arc).
// The free space depends on the screen width, so there is one hand-checked set per width range.
const shapesA: Shape[] = [
  { x: 5.0, y: 82.0, k: "hex", c: "#1a1612", w: 34, r: 330 },
  { x: 93.5, y: 81.0, k: "ring", c: "#6f655a", w: 22, r: 210 },
];
const shapesB: Shape[] = [
  { x: 4.5, y: 29.0, k: "sq", c: "#c4572e", w: 22, r: 75 },
  { x: 5.0, y: 81.0, k: "tri", c: "#c4572e", w: 40, r: 105 },
  { x: 16.0, y: 56.0, k: "star", c: "#1a1612", w: 22, r: 270 },
  { x: 84.5, y: 56.5, k: "sq", c: "#1a1612", w: 28, r: 195 },
  { x: 92.0, y: 39.0, k: "ring", c: "#c4572e", w: 40, r: 75 },
  { x: 93.0, y: 81.0, k: "tri", c: "#6f655a", w: 40, r: 60 },
];
const shapesC: Shape[] = [
  { x: 3.5, y: 80.0, k: "sq", c: "#c4572e", w: 22, r: 90 },
  { x: 4.5, y: 29.0, k: "sq", c: "#6f655a", w: 28, r: 135 },
  { x: 15.0, y: 7.5, k: "ring", c: "#1a1612", w: 28, r: 75 },
  { x: 15.0, y: 33.5, k: "ring", c: "#6f655a", w: 40, r: 135 },
  { x: 19.0, y: 58.5, k: "tri", c: "#6f655a", w: 40, r: 75 },
  { x: 21.0, y: 85.0, k: "sq", c: "#c4572e", w: 22, r: 150 },
  { x: 23.0, y: 42.5, k: "ring", c: "#6f655a", w: 22, r: 285 },
  { x: 77.0, y: 46.5, k: "ring", c: "#6f655a", w: 34, r: 30 },
  { x: 77.5, y: 70.5, k: "ring", c: "#c4572e", w: 34, r: 225 },
  { x: 83.0, y: 58.0, k: "ring", c: "#6f655a", w: 28, r: 225 },
  { x: 85.0, y: 81.0, k: "star", c: "#c4572e", w: 28, r: 15 },
  { x: 90.5, y: 35.0, k: "ring", c: "#1a1612", w: 34, r: 180 },
  { x: 92.5, y: 82.5, k: "tri", c: "#1a1612", w: 40, r: 165 },
  { x: 95.0, y: 66.0, k: "star", c: "#c4572e", w: 22, r: 210 },
];

// Thin, crisp outlines only (no fill, no transparency); the line colour varies.
function ShapeIcon({ k, c }: { k: Shape["k"]; c: string }) {
  const line = { fill: "none", stroke: c, strokeWidth: 1.6, strokeLinejoin: "round" as const, vectorEffect: "non-scaling-stroke" as const };
  switch (k) {
    case "tri": return <polygon points="12,3 22,20 2,20" {...line} />;
    case "sq": return <rect x="4" y="4" width="16" height="16" {...line} />;
    case "ring": return <circle cx="12" cy="12" r="9" {...line} />;
    case "hex": return <polygon points="12,2 20.7,7 20.7,17 12,22 3.3,17 3.3,7" {...line} />;
    case "star": return <polygon points="12,2 14.9,8.9 22,9.5 16.6,14.3 18.2,21.5 12,17.7 5.8,21.5 7.4,14.3 2,9.5 9.1,8.9" {...line} />;
  }
}

function Shapes({ shapes, className }: { shapes: Shape[]; className: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {shapes.map((f, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute"
          style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.w, height: f.w, transform: `translate(-50%,-50%) rotate(${f.r}deg)` }}
        >
          <ShapeIcon k={f.k} c={f.c} />
        </svg>
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
      <Words words={desktop} avoidColumn solid className="max-md:hidden" />
      <Words words={phoneWords} className="md:hidden opacity-[0.15]" />
      <Shapes shapes={shapesA} className="hidden min-[1024px]:max-[1279px]:block" />
      <Shapes shapes={shapesB} className="hidden min-[1280px]:max-[1599px]:block" />
      <Shapes shapes={shapesC} className="hidden min-[1600px]:block" />
    </div>
  );
}
