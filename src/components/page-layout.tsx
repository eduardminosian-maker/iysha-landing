import type { ReactNode } from "react";
import { WordMural } from "@/components/word-mural";

/**
 * Shared frame for the text pages ("В чем идея", "Частые вопросы"), so both are
 * laid out identically: same top margin, heading, gap to the list and width.
 * The bottom block (buttons, links) is passed in by each page.
 */
export function PageLayout({
  title,
  list,
  actions,
  muralVariant,
  compactPhone = false,
}: {
  title: string;
  list: ReactNode;
  actions: ReactNode;
  muralVariant?: "a" | "b";
  /** Tighter spacing on phones, so a long list plus its buttons fit on one screen. */
  compactPhone?: boolean;
}) {
  return (
    <main className="relative isolate min-h-[100svh] bg-[#f3ece1] text-foreground">
      <WordMural variant={muralVariant} />
      <div className={`relative z-10 mx-auto flex w-full max-w-3xl flex-col px-5 ${compactPhone ? "pt-5 pb-4" : "pt-12 pb-10"} sm:px-10 sm:pt-16 sm:pb-10 md:pt-[clamp(1.5rem,7vh,4.5rem)] md:pb-[clamp(1rem,4vh,3rem)]`}>
        <h1 className={`text-center font-display ${compactPhone ? "text-3xl" : "text-4xl"} font-medium leading-tight sm:text-5xl md:text-[clamp(2rem,6vh,3.25rem)]`}>
          {title}
        </h1>
        <div className={`${compactPhone ? "mt-3" : "mt-10"} sm:mt-14 md:mt-[clamp(0.75rem,3vh,2.5rem)]`}>{list}</div>
        <div className={`${compactPhone ? "mt-4 gap-3" : "mt-12 gap-5"} flex flex-col items-center sm:mt-16 sm:gap-5 md:mt-[clamp(1rem,3.5vh,3rem)] md:gap-[clamp(0.5rem,1.6vh,1.25rem)]`}>
          {actions}
        </div>
      </div>
      <div id="scroll-spacer" aria-hidden="true" />
    </main>
  );
}
