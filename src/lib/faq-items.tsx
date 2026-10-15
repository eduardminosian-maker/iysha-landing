function TelegramLink() {
  return (
    <a
      href="https://t.me/zarazakupidon"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline underline-offset-4"
    >
      @zarazakupidon
    </a>
  );
}

/** `text` is the plain-text answer, used for search-engine structured data. */
export const faqItems: { title: string; content: React.ReactNode; text: string }[] = [
  {
    title: "Как попасть в сообщество?",
    text: "Отправить кружок или голосовое в Telegram @zarazakupidon. Тебе могут предложить встречу. На встрече мы определяем, идем ли вместе дальше. Если идем – ты в комьюнити.",
    content: (
      <p>
        Отправить кружок или голосовое в Telegram <TelegramLink />. Тебе могут предложить встречу. На встрече мы
        определяем, идем ли вместе дальше. Если идем – ты в комьюнити.
      </p>
    ),
  },
  {
    title: "Как проходят встречи?",
    text: "Встречаемся по 6 человек или иногда меньше, в 13:00 по воскресеньям в каких-либо кафе Еревана. Рассказываем друг другу о своих идеях, желаниях, проектах. Пробуем определить общие интересы и запланировать конкретные шаги.",
    content: (
      <p>
        Встречаемся по 6 человек или иногда меньше, в 13:00 по воскресеньям в
        каких-либо кафе Еревана. Рассказываем друг другу о своих идеях,
        желаниях, проектах. Пробуем определить общие интересы и запланировать
        конкретные шаги.
      </p>
    ),
  },
  {
    title: "Участие бесплатное на всех этапах для любых мероприятий?",
    text: "Да.",
    content: <p>Да.</p>,
  },
];
