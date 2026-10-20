"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Bar, PageIntro, Panel, PanelLink } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { COLLABORATIONS, COLLAB_REQUESTS } from "../../constants/work-data";

const COLLABORATION_REQUESTS_STUB = COLLAB_REQUESTS;
const COLLABORATIONS_STUB = COLLABORATIONS;

type Decision = "accepted" | "declined";

export function TalentCollaborate() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  return (
    <div className="space-y-6">
      <PageIntro
        title="Collaborations"
        description="Requests in, active engagements across startups, open source and innovation projects."
      />

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1.5fr]">
        {/* requests — interactive accept/decline */}
        <Panel
          title="Collaboration requests"
          action={
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-deep">
              {COLLABORATION_REQUESTS_STUB.length - Object.keys(decisions).length} pending
            </span>
          }
        >
          <ul className="divide-y divide-line">
            {COLLABORATION_REQUESTS_STUB.map((r) => {
              const decision = decisions[r.id];
              return (
                <li key={r.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold text-ink">{r.startup}</p>
                      <p className="text-[12px] text-slate-400">{r.role}</p>
                    </div>
                    <span className="shrink-0 text-[11px] text-slate-400">{r.since}</span>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">
                    {r.scope} · <span className="font-semibold text-ink">{r.terms}</span>
                  </p>
                  {decision ? (
                    <p className={cn(
                      "mt-2.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold",
                      decision === "accepted" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500",
                    )}>
                      {decision === "accepted" ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                      {decision === "accepted" ? "Accepted — intro scheduled" : "Declined politely"}
                    </p>
                  ) : (
                    <div className="mt-2.5 flex gap-2">
                      <button
                        onClick={() => setDecisions((d) => ({ ...d, [r.id]: "accepted" }))}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 text-[12px] font-semibold text-white transition-colors hover:bg-accent-deep"
                      >
                        <Check className="h-3.5 w-3.5" /> Accept
                      </button>
                      <button
                        onClick={() => setDecisions((d) => ({ ...d, [r.id]: "declined" }))}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-[12px] font-medium text-slate-500 transition-colors hover:bg-soft"
                      >
                        <X className="h-3.5 w-3.5" /> Decline
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Panel>

        {/* active collaborations */}
        <Panel title="Active collaborations" action={<PanelLink href="#">History</PanelLink>}>
          <ul className="space-y-4">
            {COLLABORATIONS_STUB.map((c) => (
              <li key={c.name} className="rounded-lg border border-line bg-soft px-4 py-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold text-ink">{c.name}</p>
                    <p className="mt-0.5 text-[12px] text-slate-400">{c.org} · {c.kind}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[10.5px] font-semibold text-accent-deep">
                    {c.role}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <Bar value={c.progress} className="flex-1" tone="accent" />
                  <span className="text-[11.5px] font-semibold tabular-nums text-slate-500">{c.progress}%</span>
                </div>
                <p className="mt-2 text-[11.5px] text-slate-500">
                  Next · <span className="font-medium text-ink">{c.next}</span>
                </p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
