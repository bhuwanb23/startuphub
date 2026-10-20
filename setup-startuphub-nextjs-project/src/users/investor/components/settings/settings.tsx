"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PageIntro, Panel } from "@/components/app/widgets";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-slate-500">{label}</span>
      <span className="block rounded-lg border border-line bg-soft px-3.5 py-2.5 text-[13.5px] text-ink">
        {value}
      </span>
    </label>
  );
}

function Toggle({
  label,
  hint,
  defaultOn = false,
}: {
  label: string;
  hint: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="flex w-full items-center justify-between gap-4 py-3.5 text-left first:pt-0 last:pb-0"
    >
      <span>
        <span className="block text-[13.5px] font-medium text-ink">{label}</span>
        <span className="block text-[12px] text-slate-400">{hint}</span>
      </span>
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
          on ? "bg-accent" : "bg-slate-200",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200",
            on ? "left-[22px]" : "left-0.5",
          )}
        />
      </span>
    </button>
  );
}

export function InvestorSettings() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Settings"
        description="Your identity, fund thesis and alert preferences — the matching engine tunes itself against this."
      />

      <div className="grid max-w-4xl gap-4">
        <Panel title="Profile">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" value="Arjun Mehta" />
            <Field label="Role" value="Investment Partner" />
            <Field label="Fund" value="Meridian Capital · Fund II" />
            <Field label="Email" value="arjun@meridian.capital" />
          </div>
        </Panel>

        <Panel title="Investment thesis">
          <p className="rounded-lg border border-line bg-accent-mist px-4 py-3.5 text-[13.5px] leading-relaxed text-slate-700">
            Seed to Series A, $1–6M first checks. Climate adaptation, capital
            rails for emerging markets, and applied AI with defensible data
            moats. India + SEA + EU corridors. We lead or co-lead, and we plug
            every portfolio company into the StartupHub mentor and IP bench.
          </p>
          <p className="mt-3 text-[12px] text-slate-400">
            Thesis v4 · last tuned Feb 28, 2026 · used by the matching engine
          </p>
        </Panel>

        <Panel title="Notifications & alerts">
          <div className="divide-y divide-line">
            <Toggle label="New matches above 85 fit" hint="Instant · email + in-app" defaultOn />
            <Toggle label="Watchlist trigger crossings" hint="Instant · in-app" defaultOn />
            <Toggle label="Weekly sector digest" hint="Mondays · email" defaultOn />
            <Toggle label="Co-investor activity" hint="Daily summary · email" />
            <Toggle label="LP-facing monthly snapshot" hint="1st of month · PDF draft" />
          </div>
        </Panel>
      </div>
    </div>
  );
}
