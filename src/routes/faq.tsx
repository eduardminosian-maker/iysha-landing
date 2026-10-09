import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AccordionList } from "@/components/accordion-list";
import { faqItems } from "@/lib/faq-items";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/page-layout";

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
    <PageLayout
      title="Частые вопросы"
      list={<AccordionList idPrefix="faq" items={faqItems} dense="desktop" scrollToTitle={false} />}
      actions={
        <>
          <Button asChild className="h-12 rounded-full bg-[#1a1612] px-8 text-base font-bold text-[#f3ece1] hover:bg-black md:h-[clamp(2.5rem,5.5vh,3rem)]">
            <a href="https://t.me/iysha_yerevan" target="_blank" rel="noopener noreferrer">
              Подать заявку <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Link to="/" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            ← На главную
          </Link>
        </>
      }
    />
  );
}
