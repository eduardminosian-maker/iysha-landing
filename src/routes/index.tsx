import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Handshake, MessageCircle, Send, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
const heroUrl = "/yerevan-sunset.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "preload", href: heroUrl, as: "image" }],
    meta: [
      { title: "Знакомства. Нетворкинг. Ереван. — IYSHA" },
      { name: "description", content: "Клуб живых знакомств для совместного предпринимательства и не только. Вход после встречи с любым участником." },
      { property: "og:title", content: "Знакомства. Нетворкинг. Ереван. — IYSHA" },
      { property: "og:description", content: "Клуб живых знакомств для совместного предпринимательства и не только." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "yandex-verification", content: "a3591098d7eb6200" },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: Send, className: "text-telegram", text: "Подай заявку в Telegram" },
  { icon: Handshake, className: "text-skin", text: <>Приди на бесплатную встречу<br />(можно тет-а-тет с<br />любым участником)</> },
  { icon: MessageCircle, className: "text-stone", text: "Получи доступ в группу" },
  { icon: UsersRound, className: "text-primary", text: <>Знакомься с теми,&nbsp;<br />кто тебе интересен</> },
];

function Index() {
  return (
    <main className="flex h-[100svh] flex-col overflow-hidden bg-background text-foreground">
      <header
        className="relative flex min-h-0 shrink-0 basis-[51%] flex-col overflow-hidden bg-cover bg-[position:center_63%] text-primary-foreground sm:basis-[55%] sm:bg-[position:center_57%]"
        style={{ backgroundImage: `url("${heroUrl}")` }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-hero-overlay/35 via-hero-overlay/25 to-hero-overlay/90" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 py-4 text-center sm:px-10 lg:px-16">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(2rem,5.3vh,3.25rem)] font-extrabold leading-[1.04] sm:text-[clamp(2.75rem,6.5vh,4.5rem)]">
              Знакомства<br />Нетворкинг<br />Ереван
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[clamp(0.9rem,2vh,1.25rem)] leading-snug sm:mt-7">
              Клуб живых знакомств<br />
              для совместного предпринимательства<br />
              и не только
            </p>
            <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:mt-5">
              <span className="inline-flex items-center rounded-lg border border-primary-foreground/60 px-3 py-1 text-sm font-extrabold uppercase sm:text-base">Бесплатно</span>
              <Button asChild className="h-10 rounded-full px-6 text-sm font-bold sm:h-12 sm:px-8 sm:text-base">
                <a href="https://t.me/iysha_yerevan" target="_blank" rel="noopener noreferrer">Подать заявку <ArrowRight aria-hidden="true" /></a>
              </Button>
            </div>
            <div className="mt-4 flex w-full items-center justify-center gap-2.5 text-center text-sm leading-snug sm:mt-5 sm:text-base">
              <UsersRound aria-hidden="true" className="h-6 w-6 shrink-0" />
              <span>Вход после встречи с любым участником</span>
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby="steps-heading" className="flex min-h-0 flex-1 flex-col px-5 py-3 sm:px-10 sm:py-6 lg:px-16">
        <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col">
          <h2 id="steps-heading" className="shrink-0 text-xl font-extrabold leading-tight sm:text-3xl">Как к нам попасть</h2>
          <ol className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 content-center items-start gap-x-4 gap-y-10 pt-4 md:grid-cols-4 md:grid-rows-1 md:gap-x-5 md:gap-y-0 md:pt-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={i} className="relative flex min-w-0 flex-col items-center text-center">
                  <div className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-step-circle max-[359px]:size-10 sm:size-16 lg:size-18">
                    <Icon aria-hidden="true" strokeWidth={1.7} className={`size-6 max-[359px]:size-5 sm:size-8 ${step.className}`} />
                    <span className="absolute -left-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground sm:size-6 sm:text-xs">{i + 1}</span>
                  </div>
                  <p className="mt-2 max-w-48 text-[clamp(0.7rem,1.65vh,0.95rem)] font-semibold leading-snug max-[359px]:mt-1 max-[359px]:text-[10px] sm:mt-3 sm:text-base">{step.text}</p>
                  {i < 3 && (
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={2.5}
                      className={
                        i === 1
                          ? "absolute -left-[18px] top-[calc(50%+34px)] size-5 rotate-[147deg] text-primary md:-right-4 md:left-auto md:top-8 md:rotate-0"
                          : "absolute -right-4 top-3.5 size-5 text-primary md:top-8"
                      }
                    />
                  )}
                </li>
              );
            })}
          </ol>
          <div className="mt-3 flex shrink-0 justify-center md:mt-6">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 px-6 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent sm:px-8 sm:py-2.5 sm:text-base"
            >
              В чем идея и FAQ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}