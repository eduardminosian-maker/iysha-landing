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

function FaqMural() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-mural-paper select-none"
    >
      <div className="relative h-full min-h-[100svh] overflow-hidden opacity-30 sm:opacity-40">
        <div className="absolute -right-40 -top-40 size-72 rounded-full bg-mural-mist opacity-60 sm:size-[26rem]" />
        <div className="absolute -bottom-40 -left-32 size-72 rounded-full bg-mural-olive opacity-35 sm:size-[26rem]" />
        <div className="absolute -right-24 bottom-24 size-56 rounded-full border border-mural-clay/25 sm:size-80" />
        <svg
          className="absolute inset-0 size-full text-mural-olive opacity-[0.18]"
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
        >
          <path d="M-60 180 Q 300 380 620 160 T 1080 260" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span className="absolute bottom-10 right-6 font-serif text-2xl italic text-mural-clay sm:bottom-14 sm:right-14 sm:text-3xl">
          Вопросы
        </span>
      </div>
    </div>
  );
}

function FaqPage() {
  return (
    <main className="relative isolate min-h-[100svh] bg-mural-paper text-foreground">
      <FaqMural />
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col px-5 py-12 sm:px-10 sm:py-16">
        <h1 className="text-center text-3xl font-extrabold leading-tight sm:text-4xl">
          Частые вопросы
        </h1>

        <div className="mt-10 sm:mt-14">
          <AccordionList idPrefix="faq" items={faqItems} />
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 sm:mt-16">
          <Button asChild className="h-12 rounded-full px-8 text-base font-bold">
            <a href="https://t.me/iysha_yerevan" target="_blank" rel="noopener noreferrer">
              Подать заявку <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Link to="/about" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            ← В чем идея
          </Link>
        </div>
      </div>
      <div id="scroll-spacer" aria-hidden="true" />
    </main>
  );
}
