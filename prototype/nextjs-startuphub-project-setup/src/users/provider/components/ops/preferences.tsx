import { BookOpen, HelpCircle, KeyRound, LifeBuoy, MessageSquare } from "lucide-react";
import { Chip, Panel } from "@/components/app/widgets";
import { PageHead, Toggle } from "@/components/app/boards";
import {
  PROVIDER_FAQ,
  PROVIDER_HELP_GUIDES,
  PROVIDER_SETTINGS,
} from "../../constants/ops-data";

/* ── Settings ───────────────────────────────────────────────── */
export function ProviderSettings() {
  return (
    <div className="space-y-5">
      <PageHead title="Settings" sub="Account, provider identity, resource defaults, payments and notifications" />
      <div className="grid gap-4 lg:grid-cols-2">
        {PROVIDER_SETTINGS.map((s) => (
          <Panel key={s.title} title={s.title} sub={s.desc}>
            <ul className="space-y-3.5">
              {s.rows.map((r) => (
                <li key={r.label} className="flex items-center justify-between gap-4 text-[13px]">
                  <span className="text-slate-600">{r.label}</span>
                  {r.value ? <span className="font-medium text-ink">{r.value}</span> : <Toggle on={r.on} />}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
      <Panel title="Team & permissions" sub="Access across bookings, resources and finances">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { r: "Operations lead", d: "Everything except payout changes" },
            { r: "Facility managers", d: "Own facility's resources, calendar, incidents" },
            { r: "Finance staff", d: "Invoices + payouts; no listing edits" },
          ].map((x) => (
            <div key={x.r} className="rounded-lg border border-line p-4">
              <p className="text-[13px] font-semibold text-ink">{x.r}</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">{x.d}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Help & Support ─────────────────────────────────────────── */
export function ProviderHelp() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Help & support"
        sub="Guides, payment help and direct support for providers"
        action={<Chip tone="rise" className="px-3 py-1.5"><LifeBuoy className="h-3 w-3" /> Provider desk · 24×7</Chip>}
      />
      <Panel title="Provider guides" sub="Short, task-focused walkthroughs" pad>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROVIDER_HELP_GUIDES.map((g) => (
            <a key={g.title} href="#" className="group rounded-xl border border-line p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-mist">
              <BookOpen className="h-4.5 w-4.5 text-accent" />
              <h3 className="mt-3 text-[13.5px] font-semibold text-ink">{g.title}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{g.desc}</p>
              <p className="mt-2.5 font-mono text-[9px] tracking-[0.12em] text-slate-400 uppercase">{g.mins} min read</p>
            </a>
          ))}
        </div>
      </Panel>
      <div className="grid gap-4 lg:grid-cols-5">
        <Panel title="FAQs" className="lg:col-span-3">
          <ul className="space-y-4">
            {PROVIDER_FAQ.map((f) => (
              <li key={f.q} className="rounded-lg border border-line p-4">
                <p className="flex gap-2.5 text-[13.5px] font-semibold text-ink">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{f.q}
                </p>
                <p className="mt-2 pl-6.5 text-[12.5px] leading-relaxed text-slate-500">{f.a}</p>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Contact support" className="lg:col-span-2">
          <div className="space-y-3">
            {[
              { t: "Chat with provider desk", d: "24×7 for active sessions", icon: MessageSquare },
              { t: "Report an issue", d: "Attaches session logs", icon: LifeBuoy },
              { t: "Request a feature", d: "Provider council votes monthly", icon: KeyRound },
            ].map((c) => (
              <a key={c.t} href="#" className="flex items-center gap-3.5 rounded-lg border border-line p-3.5 transition-colors hover:border-accent/40 hover:bg-accent-mist">
                <c.icon className="h-4.5 w-4.5 text-accent" />
                <div>
                  <p className="text-[13px] font-semibold text-ink">{c.t}</p>
                  <p className="text-[11.5px] text-slate-400">{c.d}</p>
                </div>
              </a>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
