import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AccordionList } from "@/components/accordion-list";
import { faqItems } from "@/lib/faq-items";
import { Button } from "@/components/ui/button";
import { ApplyDialog } from "@/components/apply-dialog";
import { PageLayout } from "@/components/page-layout";

const description =
  "Ответы на частые вопросы о сообществе IYSHA: есть ли чат, есть ли шанс у начинающего предпринимателя и почему на встречах не больше шести человек.";

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
      muralVariant="b"
      compactPhone
      title="Частые вопросы"
      list={<AccordionList idPrefix="faq" items={faqItems} dense="fit" scrollToTitle={false} />}
      actions={
        <>
          <ApplyDialog>
            <Button className="h-12 rounded-full bg-[#1a1612] px-8 text-base font-bold text-[#f3ece1] hover:bg-black md:h-[clamp(2.5rem,5.5vh,3rem)]">
              Подать заявку <ArrowRight aria-hidden="true" />
            </Button>
          </ApplyDialog>
          <Link to="/" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            ← На главную
          </Link>
        </>
      }
    />
  );
}
