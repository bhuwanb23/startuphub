"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Download, FileText, Star } from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  averageRelevance,
  reports,
  unreadReports,
  type Report,
} from "@/users/startup/constants/market-data";

type KindFilter = Report["kind"] | "All reports";

const kinds: KindFilter[] = [
  "All reports",
  "Market research",
  "Sector deep-dive",
  "Quarterly index",
  "Regulatory brief",
  "Investor memo",
];

const totalPages = reports.reduce((sum, r) => sum + r.pages, 0);

export function Reports() {
  const [kind, setKind] = useState<KindFilter>("All reports");

  const results = useMemo(
    () => (kind === "All reports" ? reports : reports.filter((r) => r.kind === kind)),
    [kind],
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Reports"
        desc="The research behind the decisions — ranked by how much each one changes the plan, not by when it arrived."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300">
            <Download className="h-3.5 w-3.5" /> Export library
          </button>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={BookOpen}
          label="Reports in the library"
          value={String(reports.length)}
          delta={`${totalPages} pages total`}
          tone="default"
        />
        <Stat
          icon={FileText}
          label="Unread"
          value={String(unreadReports)}
          delta="since your last visit"
          tone="warn"
        />
        <Stat
          icon={Star}
          label="Average relevance"
          value={`${averageRelevance}%`}
          delta="against the current plan"
          tone="good"
        />
        <Stat
          icon={BookOpen}
          label="Longest read"
          value={`${Math.max(...reports.map((r) => r.readMinutes))} min`}
          delta="DeepTech Funding Outlook"
          tone="default"
        />
      </div>

      {/* 2 — Filter */}
      <Card title="Filter the library" action={<span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{results.length} shown</span>}>
        <div className="flex flex-wrap items-center gap-2">
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                kind === k
                  ? "bg-accent text-white"
                  : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </Card>

      {/* 3 — The library */}
      <div className="grid gap-4 lg:grid-cols-2">
        {results.map((r) => (
          <Card key={r.id} className="flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold leading-snug text-ink">{r.title}</p>
                <p className="mt-1 text-[11.5px] text-slate-400">
                  {r.kind} · {r.pages} pages · {r.readMinutes} min · {r.date}
                </p>
              </div>
              {r.unread ? (
                <Badge tone="accent">Unread</Badge>
              ) : (
                <Badge>Read</Badge>
              )}
            </div>

            <p className="mt-3 text-[12.5px] leading-relaxed text-slate-500">{r.summary}</p>

            <div className="mt-4">
              <div className="flex items-baseline justify-between text-[11.5px]">
                <span className="text-slate-400">Relevance to the current plan</span>
                <span className="font-semibold tabular-nums text-ink">{r.relevance}%</span>
              </div>
              <Progress
                value={r.relevance}
                tone={r.relevance >= 85 ? "good" : r.relevance >= 70 ? "accent" : "warn"}
                className="mt-1.5"
              />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <span className="text-[11.5px] text-slate-400">{r.meta}</span>
              <button className="rounded-lg border border-line px-2.5 py-1.5 text-[11.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                Add to data room
              </button>
            </div>
          </Card>
        ))}
      </div>

      {results.length === 0 && (
        <Card className="border-dashed">
          <p className="py-12 text-center text-[13px] text-slate-400">
            No reports of that kind yet.
          </p>
        </Card>
      )}

      {/* 4 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Market Overview",
              href: "/founder/market",
              body: "The market these reports describe, sized and watched.",
            },
            {
              label: "Competitor Analysis",
              href: "/founder/market/competitors",
              body: "Who the research says we are actually up against.",
            },
            {
              label: "Funding",
              href: "/founder/funding/data-room",
              body: "Where the reports end up once an investor asks for them.",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-line p-4 transition-colors hover:border-accent"
            >
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{link.body}</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
