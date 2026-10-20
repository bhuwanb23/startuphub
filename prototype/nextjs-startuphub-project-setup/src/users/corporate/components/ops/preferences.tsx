import {
  BookOpen,
  HelpCircle,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Chip, Panel } from "@/components/app/widgets";
import { PageHead, Toggle } from "@/components/app/boards";
import {
  CORP_FAQ,
  CORP_HELP_GUIDES,
  CORP_SETTINGS,
} from "../../constants/ops-data";

/* ── Settings ───────────────────────────────────────────────── */
export function CorporateSettings() {
  return (
    <div className="space-y-5">
      <PageHead title="Settings" sub="Organization, innovation preferences, procurement rules and security" />
      <div className="grid gap-4 lg:grid-cols-2">
        {CORP_SETTINGS.map((s) => (
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel title="Security" sub="Enterprise-grade controls" pad>
          <ul className="space-y-3 text-[12.5px] text-slate-600">
            {["SAML SSO enforced for all corporate seats", "Two-factor authentication", "Immutable audit logs for council review", "Data residency: India cloud regions"].map((x) => (
              <li key={x} className="flex gap-2.5">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" />{x}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Integrations" sub="Corporate systems" pad>
          <ul className="space-y-3.5">
            {[
              { n: "SAP ERP (procurement sync)", c: true },
              { n: "CRM — account sync", c: true },
              { n: "Document storage (SharePoint)", c: true },
              { n: "BI warehouse feed", c: false },
            ].map((x) => (
              <li key={x.n} className="flex items-center justify-between text-[13px]">
                <span className="text-slate-600">{x.n}</span>
                <Chip tone={x.c ? "rise" : "slate"}>{x.c ? "Linked" : "Off"}</Chip>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Help & Support ─────────────────────────────────────────── */
export function CorporateHelp() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Help & support"
        sub="Guides for innovation teams + dedicated enterprise desk"
        action={<Chip tone="rise" className="px-3 py-1.5"><LifeBuoy className="h-3 w-3" /> Enterprise desk · named CSM</Chip>}
      />
      <Panel title="Corporate guides" sub="Task-focused playbooks" pad>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CORP_HELP_GUIDES.map((g) => (
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
            {CORP_FAQ.map((f) => (
              <li key={f.q} className="rounded-lg border border-line p-4">
                <p className="flex gap-2.5 text-[13.5px] font-semibold text-ink">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{f.q}
                </p>
                <p className="mt-2 pl-6.5 text-[12.5px] leading-relaxed text-slate-500">{f.a}</p>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Contact support" sub="Enterprise desk" className="lg:col-span-2">
          <div className="space-y-3">
            {[
              { t: "Message your CSM", d: "Named success manager", icon: MessageSquare },
              { t: "Report an issue", d: "Priority SLA for enterprises", icon: LifeBuoy },
              { t: "Request a feature", d: "Enterprise council roadmap", icon: KeyRound },
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
