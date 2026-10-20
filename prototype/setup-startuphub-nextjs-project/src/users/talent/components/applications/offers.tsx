"use client";

import { useState } from "react";
import { BadgeIndianRupee, Check, FileSignature, X } from "lucide-react";
import { PageIntro } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { OFFERS } from "../../constants/work-data";

type Decision = "accepted" | "declined" | "negotiating";

export function TalentOffers() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  return (
    <div className="space-y-6">
      <PageIntro
        title="Offers"
        description="Two offers on the table — weigh scope and terms, then respond before the expiry dates below."
        action={
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[12px] font-semibold text-emerald-700">
            {OFFERS.length - Object.keys(decisions).length} awaiting response
          </span>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {OFFERS.map((o) => {
          const decision = decisions[o.id];
          return (
            <article
              key={o.id}
              className={cn(
                "rounded-xl border bg-white p-5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-colors sm:p-6",
                decision === "accepted" ? "border-emerald-200" : "border-line",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10.5px] font-semibold text-accent-deep">
                    {o.kind}
                  </span>
                  <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.01em] text-ink">
                    {o.role}
                  </h3>
                  <p className="text-[12.5px] text-slate-400">{o.startup}</p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                  Expires {o.expires}
                </span>
              </div>

              <p className="mt-4 flex items-center gap-2 rounded-lg bg-accent-mist px-4 py-3 text-[14px] font-semibold text-ink">
                <BadgeIndianRupee className="h-4.5 w-4.5 text-accent" />
                {o.comp}
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">Scope</p>
                  <ul className="mt-2 space-y-1.5">
                    {o.scope.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-[12.5px] leading-snug text-slate-600">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">Terms</p>
                  <ul className="mt-2 space-y-1.5">
                    {o.terms.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-[12.5px] leading-snug text-slate-600">
                        <FileSignature className="mt-0.5 h-3 w-3 shrink-0 text-slate-400" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {decision ? (
                <p className={cn(
                  "mt-5 flex items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-semibold",
                  decision === "accepted" && "bg-emerald-50 text-emerald-700",
                  decision === "negotiating" && "bg-amber-50 text-amber-700",
                  decision === "declined" && "bg-slate-100 text-slate-500",
                )}>
                  {decision === "accepted" && <><Check className="h-4 w-4" /> Accepted — contract drafting</>}
                  {decision === "negotiating" && "Negotiation opened — counsel notified"}
                  {decision === "declined" && <><X className="h-4 w-4" /> Declined</>}
                </p>
              ) : (
                <div className="mt-5 flex gap-2 border-t border-line pt-4">
                  <button
                    onClick={() => setDecisions((d) => ({ ...d, [o.id]: "accepted" }))}
                    className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
                  >
                    <Check className="h-4 w-4" /> Accept
                  </button>
                  <button
                    onClick={() => setDecisions((d) => ({ ...d, [o.id]: "negotiating" }))}
                    className="inline-flex h-9 items-center justify-center rounded-lg border border-line bg-white px-3.5 text-[13px] font-semibold text-ink transition-colors hover:bg-soft"
                  >
                    Negotiate
                  </button>
                  <button
                    onClick={() => setDecisions((d) => ({ ...d, [o.id]: "declined" }))}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-line bg-white px-3.5 text-[13px] font-medium text-slate-500 transition-colors hover:bg-soft"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
