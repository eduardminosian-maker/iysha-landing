import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AccordionList } from "@/components/accordion-list";
import { faqItems } from "@/lib/faq-items";
import { Button } from "@/components/ui/button";
import { WordMural } from "@/components/word-mural";

const description =
  "Ответы на частые вопросы о сообществе IYSHA: как вступить, как проходят встречи, сколько это стоит и на каком языке мы общаемся.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://iysha.am/faq" }],
    meta: [
      { title: "Частые вопросы — IYSHA" },
      { name: "description", content: description },
      { property: "og:title", content: "Частые вопросы — IYSHA" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.title,
            acceptedAnswer: { "@type": "Answer", text: item.text },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <main className="relative isolate min-h-[100svh] bg-mural-paper text-foreground">
      <WordMural variant="a" contentWidth="48rem" breakpoint="xl" />
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
