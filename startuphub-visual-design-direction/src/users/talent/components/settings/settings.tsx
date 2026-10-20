"use client";

import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
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

const SESSIONS = [
  { device: "MacBook Pro · Bengaluru", current: true, when: "Now" },
  { device: "iPhone 15 · Bengaluru", current: false, when: "2h ago" },
];

export function TalentSettings() {
  const [publicProfile, setPublicProfile] = useState(true);

  return (
    <div className="space-y-6">
      <PageIntro
        title="Settings"
        description="Account, visibility, career preferences and notifications — what startups can see and how StartupHub reaches you."
      />

      <div className="grid max-w-4xl gap-4">
        <Panel title="Account">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" value="Zoya Khan" />
            <Field label="Headline" value="Senior Product Engineer · AI & Fintech" />
            <Field label="Email" value="zoya.khan@workmail.dev" />
            <Field label="Location" value="Bengaluru, IN · Remote-first" />
          </div>
        </Panel>

        <Panel
          title="Profile visibility"
          action={
            <button
              onClick={() => setPublicProfile((v) => !v)}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-accent"
            >
              {publicProfile ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              {publicProfile ? "Public" : "Hidden"}
            </button>
          }
        >
          <div className="divide-y divide-line">
            <Toggle label="Discoverable in startup search" hint="Matched startups can find your profile" defaultOn />
            <Toggle label="Show rate expectations" hint="Visible only to above-75-fit matches" defaultOn />
            <Toggle label="Show work history" hint="Employers and clients can verify experience" defaultOn />
            <Toggle label="Share contact details" hint="Only after you accept an intro request" />
          </div>
        </Panel>

        <Panel title="Career preferences">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Preferred roles" value="Staff/Founding Engineer · Fractional CTO · Advisor" />
            <Field label="Industries" value="FinTech · ClimateTech · Applied AI" />
            <Field label="Engagement" value="Full-time (Series A+) · Retainer consulting" />
            <Field label="Compensation floor" value="₹55L+ full-time · ₹4,000/hr consulting" />
          </div>
        </Panel>

        <Panel title="Notifications">
          <div className="divide-y divide-line">
            <Toggle label="New matches above 85 fit" hint="Instant · email + in-app" defaultOn />
            <Toggle label="Interview reminders" hint="24h + 1h before" defaultOn />
            <Toggle label="Offer expiries" hint="7/3/1 day alerts" defaultOn />
            <Toggle label="Weekly opportunity digest" hint="Mondays · email" defaultOn />
            <Toggle label="Task & deliverable reminders" hint="Daily · in-app" />
          </div>
        </Panel>

        <Panel title="Privacy & security">
          <div className="mb-4 flex items-center gap-3 rounded-lg bg-emerald-50 px-4 py-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <p className="text-[13px] text-slate-600">
              Two-factor authentication is <span className="font-semibold text-emerald-700">enabled</span> via authenticator app.
            </p>
          </div>
          <ul className="divide-y divide-line">
            {SESSIONS.map((s) => (
              <li key={s.device} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <span className="text-[13.5px] font-medium text-ink">{s.device}</span>
                <span className="text-[12px] text-slate-400">
                  {s.current ? <span className="font-semibold text-emerald-700">This device</span> : s.when}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
