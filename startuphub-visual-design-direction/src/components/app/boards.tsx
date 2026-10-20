import { AlertTriangle, CheckCircle2, ChevronRight, Circle, Clock3, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Bar, Chip, Panel, ScoreRing } from "@/components/app/widgets";
import { cn } from "@/lib/utils";

/* Shared screen machinery for the investor workspace — keeps every one of
   the 70+ screens on the same visual grammar. */

/* ── Subject banner (evaluation / DD / deal subject header) ── */
export function SubjectBanner({
  kicker,
  title,
  meta,
  score,
  action,
}: {
  kicker: string;
  title: string;
  meta: string;
  score?: number;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-white p-5">
      <div className="flex items-center gap-4">
        {typeof score === "number" && <ScoreRing score={score} size={54} />}
        <div>
          <p className="font-mono text-[9.5px] font-medium tracking-[0.2em] text-accent uppercase">
            {kicker}
          </p>
          <h2 className="mt-1 text-[19px] font-semibold tracking-[-0.02em] text-ink">{title}</h2>
          <p className="mt-0.5 text-[12px] text-slate-400">{meta}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

/* ── Page intro row ─────────────────────────────────────────── */
export function PageHead({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{title}</h2>
        {sub && <p className="mt-1 text-[13px] text-slate-500">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

/* ── Status vocabulary ──────────────────────────────────────── */
export const STATUS = {
  clear: { icon: CheckCircle2, cls: "text-rise", chip: "rise" as const },
  flag: { icon: AlertTriangle, cls: "text-amber-dim", chip: "amber" as const },
  pending: { icon: Clock3, cls: "text-slate-400", chip: "slate" as const },
  open: { icon: Circle, cls: "text-accent", chip: "accent" as const },
  reject: { icon: XCircle, cls: "text-slate-400", chip: "slate" as const },
};

export function StatusIcon({ kind }: { kind: keyof typeof STATUS }) {
  const S = STATUS[kind];
  return <S.icon className={cn("h-4 w-4 shrink-0", S.cls)} />;
}

/* ── Checklist (DD / closing) ───────────────────────────────── */
export function Checklist({
  items,
  doneKey,
  totalKey,
}: {
  items: Record<string, unknown>[];
  doneKey: string;
  totalKey?: string;
}) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => {
        const label = String(it.label ?? it.area ?? it.item);
        const done = Number(it[doneKey]);
        const total = totalKey ? Number(it[totalKey]) : 1;
        const pct = total > 0 ? Math.round((done / total) * 100) : done === 1 ? 100 : 0;
        return (
          <li key={i} className="flex items-center gap-4">
            <span className="w-32 shrink-0 truncate text-[12.5px] font-medium text-ink sm:w-36">
              {label}
            </span>
            <Bar pct={pct} barClass={pct === 100 ? "bg-rise" : "bg-accent"} className="flex-1" />
            <span className="w-14 shrink-0 text-right font-mono text-[11px] text-slate-400">
              {totalKey ? `${done}/${total}` : pct === 100 ? "done" : "open"}
            </span>
            {"owner" in it && (
              <span className="hidden w-24 truncate font-mono text-[10px] text-slate-400 sm:block">
                {String((it as Record<string, unknown>).owner)}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ── Review board (DD legal/financial/tech/IP reviews) ──────── */
export function ReviewBoard({
  review,
}: {
  review: {
    title: string;
    score: number;
    items: { label: string; status: "Clear" | "Flag" | "Pending"; note: string }[];
    findings: string[];
  };
}) {
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="Due diligence · ReJoule Energy"
        title={review.title}
        meta="Seed · ₹7 Cr ask · target close Apr 14"
        score={review.score}
        action={<Chip tone="accent" className="px-3 py-1.5">Reviewer: assigned</Chip>}
      />
      <div className="grid gap-4 lg:grid-cols-5">
        <Panel title="Review items" sub={`${review.items.length} documents & checks`} pad={false} className="lg:col-span-3">
          <ul className="divide-y divide-line">
            {review.items.map((it) => (
              <li key={it.label} className="flex items-start gap-3.5 px-5 py-4">
                <StatusIcon kind={it.status.toLowerCase() as "clear"} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">{it.label}</p>
                  <p className="mt-0.5 text-[12px] text-slate-500">{it.note}</p>
                </div>
                <Chip tone={STATUS[it.status.toLowerCase() as "clear"].chip}>{it.status}</Chip>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Key findings" sub="Feed into DD report" className="lg:col-span-2">
          <ul className="space-y-3.5">
            {review.findings.map((f, i) => (
              <li key={i} className="flex gap-3 rounded-lg border border-line p-3.5 text-[12.5px] leading-relaxed text-slate-600">
                <span className="mt-0.5 font-mono text-[10px] font-semibold text-accent">0{i + 1}</span>
                {f}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Timeline ───────────────────────────────────────────────── */
export function Timeline({
  events,
}: {
  events: { date: string; event?: string; text?: string; done?: boolean }[];
}) {
  return (
    <ol className="relative space-y-0 border-l border-line pl-5">
      {events.map((e, i) => (
        <li key={i} className="relative pb-5 last:pb-0">
          <span
            className={cn(
              "absolute -left-[26.5px] top-1 h-3 w-3 rounded-full border-2",
              e.done === false
                ? "border-slate-300 bg-white"
                : "border-accent bg-accent",
            )}
          />
          <p className="font-mono text-[10px] tracking-[0.08em] text-slate-400 uppercase">{e.date}</p>
          <p className="mt-0.5 text-[13px] font-medium text-ink">{e.event ?? e.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── Toggle row (settings) ──────────────────────────────────── */
export function Toggle({ on = false }: { on?: boolean }) {
  return (
    <span className={cn("flex h-5 w-9 items-center rounded-full px-0.5", on ? "justify-end bg-accent" : "justify-start bg-slate-200")}>
      <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
    </span>
  );
}

/* ── Severity chip helper ───────────────────────────────────── */
export function Severity({ s }: { s: string }) {
  const tone = s === "Critical" ? "ink" : s === "High" ? "amber" : s === "Medium" ? "accent" : "slate";
  return <Chip tone={tone as "amber"}>{s}</Chip>;
}

/* ── Breadcrumb-ish stage trail ─────────────────────────────── */
export function StageTrail({ stages, active }: { stages: string[]; active: number }) {
  return (
    <div className="no-scrollbar flex items-center gap-1 overflow-x-auto">
      {stages.map((s, i) => (
        <span key={s} className="flex shrink-0 items-center gap-1">
          <span
            className={cn(
              "rounded-md px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.06em] uppercase",
              i < active ? "bg-rise-tint text-rise" : i === active ? "bg-accent text-white" : "bg-slate-100 text-slate-400",
            )}
          >
            {s}
          </span>
          {i < stages.length - 1 && <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />}
        </span>
      ))}
    </div>
  );
}
