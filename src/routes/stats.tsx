import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ignoreThisBrowser } from "@/lib/track";
import { STATS_KEY, STATS_URL } from "@/lib/stats-config";

// Private page: not in the sitemap, closed to search engines, protected by a password.
export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [{ title: "Статистика" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: StatsPage,
});

type Row = {
  created_at: string;
  visit: string;
  kind: "visit" | "apply_open" | "apply_click";
  path: string;
  source: string;
  referrer: string | null;
  tag: string | null;
  device: string | null;
};

const PW_KEY = "iysha_stats_pw";
const PERIODS = [
  { label: "Сегодня", days: 1 },
  { label: "7 дней", days: 7 },
  { label: "30 дней", days: 30 },
  { label: "90 дней", days: 90 },
] as const;

const timeFmt = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Yerevan",
});
const dayFmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Yerevan" }); // 2026-11-01

async function load(pw: string): Promise<Row[] | null> {
  const res = await fetch(`${STATS_URL}/rest/v1/rpc/stats_get`, {
    method: "POST",
    headers: { apikey: STATS_KEY, Authorization: `Bearer ${STATS_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ pw, days: 90 }),
  });
  if (!res.ok) throw new Error("load");
  return (await res.json()) as Row[] | null;
}

function StatsPage() {
  const [pw, setPw] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [days, setDays] = useState<number>(7);

  // Your own visits are not counted from this browser any more
  useEffect(() => {
    ignoreThisBrowser();
  }, []);

  const enter = async (password: string) => {
    setBusy(true);
    setError("");
    try {
      const data = await load(password);
      if (data === null) {
        setError("Неверный пароль");
        sessionStorage.removeItem(PW_KEY);
      } else {
        sessionStorage.setItem(PW_KEY, password);
        setRows(data);
      }
    } catch {
      setError("Не удалось загрузить данные");
    }
    setBusy(false);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(PW_KEY);
    if (saved && STATS_URL) void enter(saved);
  }, []);

  if (!STATS_URL) {
    return <Shell><p className="text-[#1a1612]/70">Статистика ещё не подключена.</p></Shell>;
  }

  if (!rows) {
    return (
      <Shell>
        <form
          className="mx-auto mt-16 flex max-w-xs flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            void enter(pw);
          }}
        >
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Пароль"
            className="h-12 rounded-full border border-[#1a1612]/25 bg-white/60 px-5 text-base outline-none focus:border-[#1a1612]"
          />
          <button
            type="submit"
            disabled={busy || !pw}
            className="h-12 cursor-pointer rounded-full bg-[#1a1612] text-base font-bold text-[#f3ece1] disabled:opacity-50"
          >
            Войти
          </button>
          {error && <p className="text-center text-sm text-[#c4572e]">{error}</p>}
        </form>
      </Shell>
    );
  }

  return <Report rows={rows} days={days} setDays={setDays} reload={() => void enter(sessionStorage.getItem(PW_KEY) ?? pw)} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f3ece1] px-4 py-8 text-[#1a1612] sm:px-8">
      <div className="mx-auto max-w-4xl">
        <a
          href="/"
          className="mb-4 inline-flex h-10 items-center rounded-full border border-[#1a1612]/30 px-4 text-sm font-semibold"
        >
          ← На главную
        </a>
        <h1 className="font-display text-4xl font-medium">Статистика</h1>
        {children}
      </div>
    </main>
  );
}

function Report({ rows, days, setDays, reload }: { rows: Row[]; days: number; setDays: (d: number) => void; reload: () => void }) {
  const data = useMemo(() => {
    // "Сегодня" = since midnight in Yerevan; other periods = that many last days
    const today = dayFmt.format(new Date());
    const from = Date.now() - days * 86_400_000;
    const inPeriod = rows.filter((r) => (days === 1 ? dayFmt.format(new Date(r.created_at)) === today : new Date(r.created_at).getTime() >= from));
    const visits = new Map<string, { first: Row; opened: boolean; clicked: boolean; pages: Set<string> }>();
    for (const r of [...inPeriod].reverse()) {
      const v = visits.get(r.visit) ?? { first: r, opened: false, clicked: false, pages: new Set<string>() };
      if (r.kind === "visit") v.pages.add(r.path);
      if (r.kind === "apply_open") v.opened = true;
      if (r.kind === "apply_click") v.clicked = true;
      visits.set(r.visit, v);
    }
    const list = [...visits.values()];
    const sources = new Map<string, { visits: number; opened: number; clicked: number }>();
    for (const v of list) {
      const s = sources.get(v.first.source) ?? { visits: 0, opened: 0, clicked: 0 };
      s.visits++;
      if (v.opened) s.opened++;
      if (v.clicked) s.clicked++;
      sources.set(v.first.source, s);
    }
    const pages = new Map<string, number>();
    for (const r of inPeriod) if (r.kind === "visit") pages.set(r.path, (pages.get(r.path) ?? 0) + 1);
    return {
      total: list.length,
      opened: list.filter((v) => v.opened).length,
      clicked: list.filter((v) => v.clicked).length,
      sources: [...sources.entries()].sort((a, b) => b[1].visits - a[1].visits),
      pages: [...pages.entries()].sort((a, b) => b[1] - a[1]),
      clicks: inPeriod.filter((r) => r.kind === "apply_click").slice(0, 30),
      recent: [...list].sort((a, b) => b.first.created_at.localeCompare(a.first.created_at)).slice(0, 40),
    };
  }, [rows, days]);

  return (
    <Shell>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {PERIODS.map((p) => (
          <button
            key={p.days}
            onClick={() => setDays(p.days)}
            className={`h-10 cursor-pointer rounded-full border px-4 text-sm font-semibold ${days === p.days ? "border-[#1a1612] bg-[#1a1612] text-[#f3ece1]" : "border-[#1a1612]/30"}`}
          >
            {p.label}
          </button>
        ))}
        <button onClick={reload} className="h-10 cursor-pointer rounded-full border border-[#1a1612]/30 px-4 text-sm font-semibold">
          Обновить
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Big n={data.total} label="Посещений" />
        <Big n={data.clicked} label="Нажали «Подать заявку»" />
      </div>

      <Section title="Откуда пришли">
        <Table head={["Источник", "Посещений", "Нажали «Подать заявку»"]}>
          {data.sources.map(([name, s]) => (
            <tr key={name}>
              <td className="font-semibold">{name}</td>
              <td>{s.visits}</td>
              <td>{s.clicked}</td>
            </tr>
          ))}
        </Table>
        {data.sources.length === 0 && <p className="px-3 py-2 text-sm text-[#1a1612]/60">Пока посещений нет.</p>}
      </Section>

      <Section title="Кто нажал «Подать заявку» (свежие сверху)">
        <Table head={["Когда", "Откуда", "Устройство"]}>
          {data.clicks.map((r, i) => (
            <tr key={i}>
              <td className="whitespace-nowrap">{timeFmt.format(new Date(r.created_at))}</td>
              <td className="font-semibold">{r.source}</td>
              <td>{r.device ?? "—"}</td>
            </tr>
          ))}
        </Table>
        {data.clicks.length === 0 && <p className="px-3 py-2 text-sm text-[#1a1612]/60">Пока нажатий нет.</p>}
      </Section>
    </Shell>
  );
}

function Big({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-2xl bg-white/60 p-4">
      <div className="text-4xl font-bold">{n}</div>
      <div className="mt-1 text-sm text-[#1a1612]/70">{label}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-2 text-lg font-bold">{title}</h2>
      <div className="overflow-x-auto rounded-2xl bg-white/60 p-2">{children}</div>
    </section>
  );
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <table className="w-full text-left text-sm [&_td]:px-3 [&_td]:py-2 [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-[#1a1612]/60 [&_tr:not(:last-child)]:border-b [&_tr]:border-[#1a1612]/10">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
