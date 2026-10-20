"use client";

import { useState } from "react";
import { PageIntro, Panel } from "@/components/app/widgets";
import { cn } from "@/lib/utils";

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

const ROLE_ROWS = [
  { role: "Institution Administrator", people: 2, scope: "Full access" },
  { role: "Technology Transfer Office", people: 5, scope: "IP · licensing · transfer" },
  { role: "Research Office", people: 4, scope: "Projects · funding" },
  { role: "Department Heads", people: 14, scope: "Own department" },
  { role: "Lab Managers", people: 9, scope: "Infrastructure · bookings" },
];

export function UniversitySettings() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Settings"
        description="Institution identity, roles, research workflows, IP policy and alert preferences."
      />

      <div className="grid max-w-4xl gap-4">
        <Panel title="Institution">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Institution name" value="Crestmont University" />
            <Field label="Type" value="Public Research University" />
            <Field label="TTO lead" value="Dr. Amara Deshpande" />
            <Field label="Public profile" value="startuphub.app/university/crestmont" />
          </div>
        </Panel>

        <Panel title="Team & permissions">
          <ul className="divide-y divide-line">
            {ROLE_ROWS.map((r) => (
              <li key={r.role} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <span>
                  <span className="block text-[13.5px] font-medium text-ink">{r.role}</span>
                  <span className="block text-[12px] text-slate-400">{r.scope}</span>
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11.5px] font-semibold text-slate-600">
                  {r.people} people
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Research & IP policy">
          <div className="divide-y divide-line">
            <Toggle label="Automatic novelty check on disclosures" hint="Runs prior-art scan before IP assessment" defaultOn />
            <Toggle label="Inventor approval before filing" hint="All named inventors must sign off" defaultOn />
            <Toggle label="Default license template v4" hint="Applies standard royalty bands by TRL" defaultOn />
            <Toggle label="Publication embargo window" hint="Hold 30 days when disclosure is pending" />
            <Toggle label="External lab access requires safety induction" hint="Applies to startup & corporate bookings" defaultOn />
          </div>
        </Panel>

        <Panel title="Notifications">
          <div className="divide-y divide-line">
            <Toggle label="Patent & statutory deadlines" hint="Email + in-app · 30/14/7 day alerts" defaultOn />
            <Toggle label="New license requests" hint="Instant · email + in-app" defaultOn />
            <Toggle label="Startup match digest" hint="Nightly · in-app" defaultOn />
            <Toggle label="Lab booking requests" hint="Daily summary · email" />
            <Toggle label="Funding opportunity bulletin" hint="Weekly · Mondays" defaultOn />
          </div>
        </Panel>
      </div>
    </div>
  );
}
