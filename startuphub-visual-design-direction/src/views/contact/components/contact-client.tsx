"use client";

import { useState, type FormEvent } from "react";
import { Check, ChevronDown, Clock3, Mail, MapPin, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type TabKey = "General" | "Partnerships" | "Support" | "Feedback" | "Report Issue";

const tabs: Record<TabKey, { headline: string; sub: string; extra?: "org" | "area" | "severity" }> = {
  General: { headline: "Say hello.", sub: "Questions about StartupHub, the ecosystem, or anything in between." },
  Partnerships: { headline: "Let's build together.", sub: "For institutions, programs and providers exploring partnership.", extra: "org" },
  Support: { headline: "We're on it.", sub: "Something not working in your account or application?", extra: "area" },
  Feedback: { headline: "Tell us what's missing.", sub: "The product roadmap is shaped by messages exactly like this." },
  "Report Issue": { headline: "Thanks for flagging it.", sub: "Bugs, incorrect data or anything that looks off — we'll fix it fast.", extra: "severity" },
};

const inputCls =
  "h-11 w-full rounded-[10px] border border-line bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15";

export default function ContactClient() {
  const [tab, setTab] = useState<TabKey>("General");
  const [sent, setSent] = useState(false);
  const t = tabs[tab];

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-14">
      <div>
        {/* tabs */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(tabs) as TabKey[]).map((k) => (
            <button
              key={k}
              onClick={() => {
                setTab(k);
                setSent(false);
              }}
              className={cn(
                "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all",
                tab === k ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
              )}
            >
              {k}
            </button>
          ))}
        </div>

        <h1 className="mt-8 text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold tracking-[-0.025em] text-ink">
          {t.headline}
        </h1>
        <p className="mt-3 max-w-lg text-[15.5px] leading-relaxed text-slate-500">{t.sub}</p>

        {sent ? (
          <div className="mt-10 flex max-w-md flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50/60 p-10 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white">
              <Check className="h-5 w-5" />
            </span>
            <p className="mt-4 text-lg font-semibold text-ink">Message received.</p>
            <p className="mt-1.5 text-sm text-slate-500">
              {tab === "Support" || tab === "Report Issue"
                ? "A ticket is open — expect a first response within 4 working hours."
                : "We read everything. Expect a reply within one working day."}
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 text-sm font-semibold text-accent hover:underline"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-9 max-w-xl space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="mb-1.5 block text-[13px] font-medium text-slate-600">Name</label>
                <input id="c-name" required placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1.5 block text-[13px] font-medium text-slate-600">Email</label>
                <input id="c-email" type="email" required placeholder="you@company.com" className={inputCls} />
              </div>
            </div>

            {t.extra === "org" && (
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-slate-600">Organization type</label>
                <div className="relative">
                  <select defaultValue="" className={cn(inputCls, "appearance-none pr-10")}>
                    <option value="" disabled>Select…</option>
                    {["Government / Public body", "University / Research", "Incubator / Accelerator", "Corporate", "Investor / Fund", "NGO / Ecosystem", "Other"].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            )}
            {t.extra === "area" && (
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-slate-600">Area</label>
                <div className="relative">
                  <select defaultValue="" className={cn(inputCls, "appearance-none pr-10")}>
                    <option value="" disabled>Select…</option>
                    {["Account & login", "Applications & programs", "Directory profile", "Billing", "Data & privacy", "Something else"].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            )}
            {t.extra === "severity" && (
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-slate-600">Severity</label>
                <div className="flex flex-wrap gap-2">
                  {["Cosmetic", "Annoying", "Blocking me", "Data issue"].map((s, i) => (
                    <label key={s} className="cursor-pointer">
                      <input type="radio" name="severity" defaultChecked={i === 1} className="peer sr-only" />
                      <span className="inline-block rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-all peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white">
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="c-subject" className="mb-1.5 block text-[13px] font-medium text-slate-600">Subject</label>
              <input id="c-subject" required placeholder={tab === "Partnerships" ? "Partnership with…" : "How can we help?"} className={inputCls} />
            </div>
            <div>
              <label htmlFor="c-msg" className="mb-1.5 block text-[13px] font-medium text-slate-600">Message</label>
              <textarea
                id="c-msg"
                required
                rows={5}
                placeholder="Give us the details — links and specifics help us help you faster."
                className="w-full rounded-[10px] border border-line bg-white px-3.5 py-3 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              />
            </div>
            <button
              type="submit"
              className="flex h-11 items-center gap-2 rounded-[10px] bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              <Send className="h-4 w-4" />
              Send message
            </button>
          </form>
        )}
      </div>

      {/* info side */}
      <aside className="space-y-4 lg:pt-16">
        {[
          { icon: Mail, title: "Email us", lines: ["hello@startuphub.in", "support@startuphub.in"] },
          { icon: Clock3, title: "Response time", lines: ["General — within 1 working day", "Support — within 4 working hours"] },
          { icon: MapPin, title: "Offices", lines: ["Bengaluru — StartupHub Campus, Koramangala", "Delhi — Ecosystem Bhawan, CP"] },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
                <c.icon className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold text-ink">{c.title}</h3>
            </div>
            <ul className="mt-3 space-y-1.5">
              {c.lines.map((l) => (
                <li key={l} className="text-[13.5px] text-slate-500">{l}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="rounded-2xl border border-accent/20 bg-accent-mist p-5">
          <p className="text-[13.5px] font-medium leading-relaxed text-ink">
            Looking for answers, not a form?{" "}
            <a href="/faq" className="font-semibold text-accent hover:underline">
              Check the FAQ first
            </a>{" "}
            — it's genuinely good.
          </p>
        </div>
      </aside>
    </div>
  );
}
