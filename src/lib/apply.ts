import { useEffect, useState } from "react";

// One place for the "apply" link and the next meeting, so the whole site stays in sync.
export const APPLY_URL =
  "https://t.me/zarazakupidon?text=" + encodeURIComponent("Привет! Хочу подать заявку на встречу.");

// Meetings are every Sunday at 13:00, Yerevan time (UTC+4, no daylight saving).
const MEETING_WEEKDAY = 0; // Sunday
const MEETING_HOUR = 13;
const YEREVAN_OFFSET_H = 4;
// The very first meeting: until it has started, this date is shown, even if an earlier Sunday comes first.
const FIRST_MEETING = Date.UTC(2026, 9, 25, MEETING_HOUR) - YEREVAN_OFFSET_H * 3600_000;

const dateFormat = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", timeZone: "Asia/Yerevan" });
const WEEKDAY_NAME = "воскресенье";
const TIME = `${MEETING_HOUR}:00`;

export type NextMeeting = { date: string; weekday: string; time: string };

/** The next Sunday 13:00 (Yerevan). From Sunday 13:00 on it already shows the following Sunday. */
export function getNextMeeting(now: Date = new Date()): NextMeeting {
  const shifted = new Date(now.getTime() + YEREVAN_OFFSET_H * 3600_000); // "Yerevan wall clock" in UTC getters
  const daysAhead = (MEETING_WEEKDAY - shifted.getUTCDay() + 7) % 7;
  let start = Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate() + daysAhead, MEETING_HOUR) -
    YEREVAN_OFFSET_H * 3600_000;
  if (now.getTime() >= start) start += 7 * 24 * 3600_000;
  if (start < FIRST_MEETING) start = FIRST_MEETING;
  return { date: dateFormat.format(new Date(start)), weekday: WEEKDAY_NAME, time: TIME };
}

/**
 * Same as getNextMeeting, but re-checks on the page itself, so an old cached page never shows a past date.
 * `k` changes once the page is live: put it as `key` on the element that shows the date, so the server text is
 * replaced by the fresh one.
 */
export function useNextMeeting(): NextMeeting & { k: string } {
  const [meeting, setMeeting] = useState(() => getNextMeeting());
  const [live, setLive] = useState(false);
  useEffect(() => {
    const update = () => setMeeting(getNextMeeting());
    update();
    setLive(true);
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return { ...meeting, k: live ? `live-${meeting.date}` : "server" };
}
