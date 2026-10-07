import { useState } from "react";
import { flushSync } from "react-dom";
import { ChevronDown } from "lucide-react";

export function AccordionList({
  idPrefix,
  items,
  dense = false,
}: {
  idPrefix: string;
  items: { title: string; content: React.ReactNode }[];
  /** Compact rows that scale with the screen height, so a whole list fits on one screen. */
  dense?: boolean;
}) {
  const [openSection, setOpenSection] = useState<string>("");

  const handleValueChange = (value: string) => {
    const section = value ? document.getElementById(value) : null;
    const topBefore = section?.getBoundingClientRect().top ?? 0;

    // Apply the change synchronously so the new layout is final right away
    // (content opens/closes instantly, without a height animation).
    flushSync(() => setOpenSection(value));

    // A short section near the end of the page can't scroll up to the top of
    // the screen, because there is nothing below it. Add just enough empty
    // space at the bottom (only while a section is open) so that it can.
    const spacer = document.getElementById("scroll-spacer");
    if (spacer) {
      const spacerHeight = spacer.offsetHeight;
      let needed = 0;
      if (section) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - spacerHeight;
        needed = Math.max(0, Math.ceil(sectionTop + window.innerHeight - pageHeight));
      }
      spacer.style.height = `${needed}px`;
    }
    if (!section) return;

    // Keep the tapped title visually in place if a section above collapsed...
    const topAfter = section.getBoundingClientRect().top;
    if (topAfter !== topBefore) {
      window.scrollTo({ top: window.scrollY + (topAfter - topBefore), behavior: "instant" });
    }

    // ...then one smooth movement bringing the title to the top of the screen.
    window.scrollTo({
      top: window.scrollY + section.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  return (
    <div className="[overflow-anchor:none]">
      {items.map((item, i) => {
        const id = `${idPrefix}-${i}`;
        const isOpen = openSection === id;
        return (
          <div key={id} id={id} className="border-b border-border">
            <h3 className="flex">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-content`}
                onClick={() => handleValueChange(isOpen ? "" : id)}
                className={`flex flex-1 cursor-pointer items-center justify-between gap-4 text-left font-bold leading-snug ${
                  dense
                    ? "py-[clamp(0.55rem,1.7vh,1.25rem)] text-[clamp(0.9rem,2vh,1.125rem)]"
                    : "py-5 text-base sm:py-6 sm:text-lg"
                }`}
              >
                {item.title}
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            <div
              id={`${id}-content`}
              role="region"
              hidden={!isOpen}
              className="animate-in fade-in-0 pb-6 text-base leading-relaxed text-foreground duration-300 sm:text-lg"
            >
              <div className="space-y-4">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
