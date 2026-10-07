import { useState } from "react";
import { flushSync } from "react-dom";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faqItems } from "@/lib/faq-items";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "В чем идея и FAQ — IYSHA" },
      {
        name: "description",
        content:
          "Несколько мыслей о том, как может работать живое сообщество людей, которые хотят расширять круг знакомств, создавать проекты и лучше понимать друг друга.",
      },
      { property: "og:title", content: "В чем идея и FAQ — IYSHA" },
      {
        property: "og:description",
        content:
          "Несколько мыслей о том, как может работать живое сообщество людей, которые хотят расширять круг знакомств, создавать проекты и лучше понимать друг друга.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const ideaItems: { title: string; content: React.ReactNode }[] = [
  {
    title: "Почему вход только через “эстафету” живых знакомств?",
    content: (
      <>
        <p>
          Технократия завела людей в ловушку: ты можешь общаться с кем угодно
          благодаря возможности удаленного контакта, поэтому все чаще остаешься
          “один в комнате”.
        </p>
        <p>
          Исследования многих известных нетворкеров подтверждают правило:
          настоящее партнерство бывает только в офлайне.
        </p>
        <p>
          Вряд ли нас спасет очередной “чатик”. Комьюнити это про общие
          ценности. Поэтому начинать нужно с личных знакомств, потом уже
          приглашать в чат тех, с кем познакомились.
        </p>
        <p>
          Причем человека, которого вы приглашаете, не обязательно должны знать
          все уже существующие участники чата. Одна из ценностей – доверие.
          Поэтому достаточно, чтобы тот, кого вы уже пригласили, знал лично
          того, кого хочет пригласить он. Тогда каждый новый человек будет нести
          в себе зерно нашей общей близости. Главное не приглашать тех, кого
          приглашать не хотите: это тоже ценность – эмоциональная близость.
        </p>
      </>
    ),
  },
  {
    title: "Почему бесплатно?",
    content: (
      <>
        <p>
          Знакомо ли вам чувство “хочу найти своего, а тут всё какие-то
          продажные нетворкинги”?
        </p>
        <p>
          Если основатели комьюнити не могут обеспечить его жизнь бесплатно, то
          это повод задуматься об их искренности и глубине.
        </p>
        <p>
          Доступ к людям должен быть свободным. Если мы начнем продавать друг
          другу доступ к себе, то мы дешево стоим, какой бы ни была цена.
        </p>
        <p>
          Настоящее комьюнити это про близость, преданность, великодушие, огонь
          в глазах, совместные проекты, будущее. Неужели мы готовы разменять все
          это на плату за подписку? Ну уж нет. Пусть этим занимаются те, для
          кого комьюнити это источник денег, а не источник людей. А мы создадим
          настоящее искреннее пространство для глубоких коммуникаций.
        </p>
      </>
    ),
  },
  {
    title: "Сначала кто, потом что",
    content: (
      <>
        <p>
          Джим Коллинз в своей книге “От хорошего к великому” опубликовал
          исследование, целью которого было выявить общие паттерны в
          деятельности компаний, добившихся наиболее высоких результатов по
          сравнению с конкурентами.
        </p>
        <p>
          Один из таких паттернов – принцип “сначала кто, потом что”. Сначала
          собираем “правильных” людей, затем разрабатываем стратегию. В отличие
          от стандартного подхода “сначала решим, куда и как идти, потом
          подберем людей под наши цели”.
        </p>
        <p>
          Можно возразить: эти компании уже были в рынке к тому времени, когда
          совершили прорыв. Да, это так. Но если задуматься, смысл принципа
          “сначала кто, потом что” на самом деле шире контекста, который
          использует Коллинз. Да и не следует забывать, что этот принцип
          компании начинали использовать именно перед прорывом, что его и
          обеспечило.
        </p>
        <p>
          Возьмите трех заряженных людей и скажите им, чтобы они вместе
          сгенерировали мощную идею и придумали, как ее воплотить. Успех более
          вероятен, чем если вы придумаете идею сами, затем попробуете найти под
          нее людей. Это в разы сложнее и зачастую приводит даже к полному
          разочарованию в идее.
        </p>
        <p>
          Поэтому сначала люди, потом проекты. Сначала люди, потом стратегии. И
          даже сначала люди, потом цели. Сначала синергия, потом генерация.
          Иначе можно угодить в ловушку “я знаю”, а рынок ответит вялым “я не
          хочу”.
        </p>
      </>
    ),
  },
  {
    title: "Нужно ли быть предпринимателем?",
    content: (
      <>
        <p>
          Предприниматель – отличное слово. Помимо общепринятого, у него есть
          простой буквальный смысл – тот, кто что-то предпринимает. Можно стать
          предпринимателем, просто начав что-то предпринимать для этого. Но если
          вы еще не предприниматель, это не значит, что у вас нет потенциала. А
          если есть потенциал, то вы заведомо интересны.
        </p>
        <p>
          Кроме этого, нетворкинг это не только про прямую выгоду, но и про
          косвенную – вы знакомитесь с одним человеком, он знакомит вас с другим,
          тот становится партнером. Возможно, тот, кто вас познакомил – не
          предприниматель. Но если он принес пользу, зачем от него
          отграничиваться?
        </p>
      </>
    ),
  },
  {
    title: "Формат встреч",
    content: (
      <>
        <p>
          Мы встречаемся регулярно, обычно по воскресеньям. Конфигурация людей
          для встречи может подбираться исходя из озвученных ими запросов.
        </p>
        <p>
          Обычно количество людей на одну встречу ограничивается 6 участниками,
          чтобы успеть познакомиться.
        </p>
        <p>
          Есть смысл регулярно менять конфигурации людей, которые приходят на
          встречи, чтобы пополнять свой социальный капитал, насмотренность,
          опыт самовыражения в группе. Мы лучше видим себя через людей, а не в
          зеркало. В каком-то смысле, кто мы на самом деле, нам могут сказать
          только люди, с которыми мы взаимодействуем.
        </p>
        <p>
          В начале нетворкинг-активности не стоит делать поспешные выводы, если
          никто из людей, пришедших на встречу, не показался подходящим под ваши
          запросы. Польза может прилететь с задержкой. Главное не
          останавливаться, пробовать снова.
        </p>
        <p>
          Если вам откликается такая система знакомств, отправьте заявку на
          вступление в группу. Вам предложат встречу, после которой вы вступите
          в группу и сможете начать или продолжить бесконечный путь наращивания
          выгодного социального капитала вместе с нами.
        </p>
      </>
    ),
  },
];

function EditorialMural() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-mural-paper select-none"
    >
      <div className="relative h-full min-h-[100svh] overflow-hidden opacity-30 sm:opacity-40">
        <div className="absolute -left-36 -top-36 size-64 rounded-full bg-mural-olive opacity-55 sm:-left-36 sm:-top-36 sm:size-96" />
        <div className="absolute -right-36 top-24 size-64 rounded-full bg-mural-mist opacity-50 sm:-right-36 sm:top-16 sm:size-96" />
        <div className="absolute -bottom-36 -left-28 size-80 rounded-full border border-mural-clay/25 sm:-bottom-64 sm:-left-44 sm:size-[34rem]" />
        <div className="absolute -bottom-16 -right-36 size-64 rounded-full border border-mural-clay/25 sm:-right-32 sm:size-96" />

        <svg
          className="absolute inset-0 size-full text-mural-olive opacity-[0.18]"
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
        >
          <path d="M-80 630 Q 240 410 570 660 T 1080 590" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M760 -80 Q 650 120 770 310" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M85 405 H220" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M735 455 H850" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        <div className="absolute left-5 top-8 text-mural-ink/60 sm:left-12 sm:top-14">
          <span className="block text-sm font-medium uppercase sm:text-base">Люди</span>
          <span className="mt-1 block text-[10px] uppercase opacity-65">Team</span>
          <span className="mt-3 block font-serif text-2xl italic text-mural-clay sm:text-3xl">Идеи</span>
          <span className="mt-1 block text-xs uppercase">Встречи</span>
        </div>

        <span className="absolute left-1 top-64 hidden text-[10px] font-medium uppercase text-mural-ink/35 [writing-mode:vertical-rl] sm:left-4 sm:top-72 sm:block sm:text-xs">
          Сообщество
        </span>

        <div className="absolute right-5 top-10 text-right text-mural-ink/50 sm:right-16 sm:top-16">
          <span className="block text-xs font-medium uppercase sm:text-sm">Рост</span>
          <span className="mt-2 block text-[10px] uppercase">Стартапы</span>
        </div>

        <span className="absolute right-4 top-[29%] hidden font-serif text-2xl italic text-mural-clay/55 sm:right-14 sm:block sm:text-3xl">
          Бизнес
        </span>
        <span className="absolute left-5 top-[42%] hidden font-serif text-2xl italic text-mural-olive/45 sm:left-12 sm:block sm:text-3xl">
          Together
        </span>
        <span className="absolute right-3 top-[46%] hidden -rotate-12 text-[10px] uppercase text-mural-ink/30 sm:right-14 sm:block sm:text-xs">
          Вдохновение
        </span>

        <div className="absolute bottom-24 left-5 text-mural-ink/45 sm:bottom-28 sm:left-14">
          <span className="block font-serif text-2xl italic text-mural-clay sm:text-3xl">Успех</span>
          <span className="mt-2 block text-[10px] uppercase sm:text-xs">Возможности</span>
        </div>

        <div className="absolute bottom-16 right-5 text-right text-mural-ink/50 sm:bottom-20 sm:right-14">
          <span className="block text-xs font-medium uppercase sm:text-sm">Смыслы</span>
          <span className="mt-2 ml-auto block h-px w-12 bg-mural-ink/45" />
          <span className="mt-6 block font-serif text-2xl italic text-mural-clay sm:text-3xl">Вместе</span>
          <span className="mt-1 block text-[10px] uppercase sm:text-xs">Развитие</span>
        </div>

        <span className="absolute right-1 top-[57%] hidden text-[10px] font-medium uppercase text-mural-ink/35 [writing-mode:vertical-rl] sm:right-8 sm:block sm:text-xs">
          Ценности
        </span>

        <span className="absolute left-[7%] top-[31%] hidden text-sm font-medium uppercase text-mural-ink/35 lg:block">
          Партнёрство
        </span>
        <span className="absolute left-[2%] top-[55%] hidden text-sm uppercase text-mural-ink/30 lg:block">
          Предпринимательство
        </span>
        <span className="absolute right-[14%] top-[39%] hidden text-sm uppercase text-mural-ink/30 lg:block">
          Проекты · Команда
        </span>
      </div>
    </div>
  );
}

function AccordionList({
  idPrefix,
  items,
}: {
  idPrefix: string;
  items: { title: string; content: React.ReactNode }[];
}) {
  const [openSection, setOpenSection] = useState<string>("");

  const handleValueChange = (value: string) => {
    const section = value ? document.getElementById(value) : null;
    const topBefore = section?.getBoundingClientRect().top ?? 0;

    // Apply the change synchronously so the new layout is final right away
    // (content opens/closes instantly, without a height animation).
    flushSync(() => setOpenSection(value));
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
                className="flex flex-1 cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-bold leading-snug sm:py-6 sm:text-lg"
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

function AboutPage() {
  return (
    <main className="relative isolate min-h-[100svh] bg-mural-paper text-foreground">
      <EditorialMural />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col px-5 py-12 sm:px-10 sm:py-16 lg:px-16">
        <h1 className="text-center text-3xl font-extrabold leading-tight sm:text-4xl">
          В чем идея?
        </h1>

        <div className="mt-10 sm:mt-14">
          <AccordionList idPrefix="idea" items={ideaItems} />
        </div>

        <h2
          id="faq"
          className="mt-16 scroll-mt-8 text-center text-3xl font-extrabold leading-tight sm:mt-24 sm:text-4xl"
        >
          Частые вопросы
        </h2>

        <div className="mt-10 sm:mt-14">
          <AccordionList idPrefix="faq" items={faqItems} />
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
