import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
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

const faq: { question: string; answer: React.ReactNode }[] = [
  {
    question: "Как попасть в сообщество?",
    answer: (
      <p>
        Подать заявку в Telegram. Вам предложат встречу. Встретиться. Если мы и
        вы захотим встретиться снова – вы в сообществе.
      </p>
    ),
  },
  {
    question: "Нужно ли что-то написать в Telegram?",
    answer: (
      <p>
        Да, лучше дополнительно написать{" "}
        <a
          href="https://t.me/zarazakupidon"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline underline-offset-4"
        >
          @zarazakupidon
        </a>{" "}
        о том, что вы хотите попасть в группу. Это ускорит процесс.
      </p>
    ),
  },
  {
    question: "Как быстро ответят?",
    answer: (
      <p>
        Если вы напишете @zarazakupidon, то он обычно отвечает в течение суток.
      </p>
    ),
  },
  {
    question: "Почему сначала встреча?",
    answer: (
      <p>
        Тех, кто готов встретиться, с большей вероятностью объединит желание
        делать что-то вместе.
      </p>
    ),
  },
  {
    question: "Кто может прийти?",
    answer: <p>Любой человек, осознающий, для чего ему расширять свое окружение.</p>,
  },
  {
    question: "Нужно ли быть предпринимателем?",
    answer: <p>Нет.</p>,
  },
  {
    question: "Участие бесплатное на всех этапах для любых мероприятий?",
    answer: <p>Да.</p>,
  },
  {
    question: "Как проходят встречи?",
    answer: (
      <p>
        Встречаемся по 6 человек или иногда меньше, в 13:00 по воскресеньям в
        каких-либо кафе Еревана. Рассказываем друг другу о своих идеях,
        желаниях, проектах. Пробуем определить общие интересы и запланировать
        конкретные шаги.
      </p>
    ),
  },
  {
    question: "На каком языке проходят встречи?",
    answer: (
      <p>
        Сейчас на русском, так как основатель сообщества – русскоязычный
        армянин, пока не говорящий на армянском. Но планируем проводить встречи
        также на армянском и английском. Если захотите, можете в этом помочь.
      </p>
    ),
  },
];

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
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="relative isolate min-h-[100svh] bg-mural-paper text-foreground">
      <FaqMural />
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col px-5 py-12 sm:px-10 sm:py-16">
        <h1 className="text-center text-3xl font-extrabold leading-tight sm:text-4xl">
          Частые вопросы
        </h1>

        <div className="mt-10 sm:mt-14">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-border">
                <h2>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-bold leading-snug sm:py-6 sm:text-lg"
                  >
                    {item.question}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h2>
                <div
                  id={`faq-${i}`}
                  role="region"
                  hidden={!isOpen}
                  className="pb-6 text-base leading-relaxed text-foreground sm:text-lg"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 sm:mt-16">
          <Button asChild className="h-12 rounded-full px-8 text-base font-bold">
            <a href="https://t.me/iysha_yerevan" target="_blank" rel="noopener noreferrer">
              Подать заявку <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Link to="/" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            ← На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
