import {
  Award,
  Compass,
  Globe2,
  Landmark,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { Bar, Chip, Panel } from "@/components/app/widgets";
import { PageHead } from "../shared/boards";
import {
  INVESTMENT_TEAM,
  INVESTOR_PROFILE,
  MANDATE,
  PREFERENCES,
} from "../../constants/ops-data";
import { THESIS } from "../../constants/investor-data";

/* ── Investor Profile ───────────────────────────────────────── */
export function InvestorProfile() {
  const p = INVESTOR_PROFILE;
  return (
    <div className="space-y-5">
      <PageHead
        title="Investor profile"
        sub="Your public identity on StartupHub"
        action={
          <button className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft">
            <Pencil className="h-3.5 w-3.5 text-slate-400" /> Edit profile
          </button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="flex flex-col gap-5 sm:flex-row">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-ink text-[22px] font-bold text-white">AM</span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{p.name}</h3>
                <Chip tone="rise"><ShieldCheck className="h-3 w-3" /> Verified investor</Chip>
              </div>
              <p className="mt-1 text-[13px] text-slate-400">{p.type} · {p.org}</p>
              <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-slate-500">{p.bio}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
            {[
              { l: "Experience", v: "14 yrs" },
              { l: "Portfolio", v: "38 cos" },
              { l: "Exits", v: "3" },
            ].map((x) => (
              <div key={x.l} className="rounded-lg bg-soft p-3.5 text-center">
                <p className="text-[16px] font-semibold text-ink">{x.v}</p>
                <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.12em] text-slate-400 uppercase">{x.l}</p>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Public profile" sub={p.public.visibility}>
            <ul className="space-y-2.5 text-[12.5px]">
              <li className="flex justify-between"><span className="text-slate-500">Listed on StartupHub</span><span className="font-medium text-ink">{p.public.listed}</span></li>
              <li className="flex justify-between"><span className="text-slate-500">Profile views</span><span className="font-medium text-ink">{p.public.views}</span></li>
              <li className="flex justify-between"><span className="text-slate-500">Location</span><span className="font-medium text-ink">{p.location}</span></li>
            </ul>
          </Panel>
          <Panel title="Contact" sub="Visible after accepted intro">
            <ul className="space-y-2.5 text-[12.5px] text-slate-500">
              <li className="flex items-center gap-2.5"><Mail className="h-3.5 w-3.5 text-slate-400" />{p.contact.email}</li>
              <li className="flex items-center gap-2.5"><Phone className="h-3.5 w-3.5 text-slate-400" />{p.contact.phone}</li>
            </ul>
          </Panel>
        </div>
      </div>

      <Panel title="Achievements" sub="Highlights shown on your public profile" action={<Award className="h-4 w-4 text-slate-300" />}>
        <div className="grid gap-3 sm:grid-cols-2">
          {p.achievements.map((a, i) => (
            <div key={a} className="flex items-center gap-3 rounded-lg border border-line p-3.5">
              <span className="font-mono text-[11px] font-semibold text-accent">0{i + 1}</span>
              <span className="text-[13px] text-ink">{a}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Investment Preferences ─────────────────────────────────── */
function PrefPanel({ title, items, tone }: { title: string; items: string[]; tone: "accent" | "ink" | "line" }) {
  return (
    <Panel title={title}>
      <div className="flex flex-wrap gap-2">
        {items.map((i) => <Chip key={i} tone={tone} className="px-3 py-1.5">{i}</Chip>)}
      </div>
    </Panel>
  );
}

export function InvestmentPreferences() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Investment preferences"
        sub="These drive discovery filters and AI matching weights"
        action={
          <button className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft">
            <Pencil className="h-3.5 w-3.5 text-slate-400" /> Edit preferences
          </button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <PrefPanel title="Preferred industries" items={PREFERENCES.industries} tone="accent" />
        <PrefPanel title="Preferred technologies" items={PREFERENCES.technologies} tone="accent" />
        <PrefPanel title="Geography" items={PREFERENCES.geography} tone="ink" />
        <PrefPanel title="Startup stage" items={PREFERENCES.stages} tone="ink" />
        <PrefPanel title="Business models" items={PREFERENCES.models} tone="line" />
      </div>
      <Panel title="Deal parameters" sub="Hard preferences applied before scoring">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { l: "Investment size", v: PREFERENCES.size },
            { l: "Ownership preference", v: PREFERENCES.ownership },
            { l: "Revenue requirement", v: PREFERENCES.revenue },
            { l: "Growth requirement", v: PREFERENCES.growth },
            { l: "Risk preference", v: PREFERENCES.risk },
          ].map((r) => (
            <div key={r.l} className="rounded-lg border border-line p-4">
              <p className="font-mono text-[9px] tracking-[0.16em] text-slate-400 uppercase">{r.l}</p>
              <p className="mt-1.5 text-[13px] font-semibold leading-snug text-ink">{r.v}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Investment Thesis (moved from studio) ─────────────────── */
export function InvestmentThesis() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Investment thesis"
        sub="Drives Copilot scoring across every inbound deck"
        action={
          <button className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft">
            <Pencil className="h-3.5 w-3.5 text-slate-400" /> Edit thesis
          </button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Focus" sub="Where we lead or co-lead">
          <div className="space-y-5">
            <div>
              <p className="mb-2 font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">Themes</p>
              <div className="flex flex-wrap gap-2">{THESIS.focus.map((f) => <Chip key={f} tone="accent" className="px-3 py-1.5">{f}</Chip>)}</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-soft p-3.5">
                <p className="font-mono text-[9px] tracking-[0.14em] text-slate-400 uppercase">Target markets</p>
                <p className="mt-1.5 text-[13px] font-semibold text-ink">Health, fintech infra, climate, agri-AI</p>
              </div>
              <div className="rounded-lg bg-soft p-3.5">
                <p className="font-mono text-[9px] tracking-[0.14em] text-slate-400 uppercase">Target technologies</p>
                <p className="mt-1.5 text-[13px] font-semibold text-ink">Applied AI, federated systems, sensing</p>
              </div>
            </div>
          </div>
        </Panel>
        <Panel title="Exclusion criteria" sub="Hard passes, decided before the pitch">
          <ul className="space-y-3">
            {THESIS.antiThesis.map((a) => (
              <li key={a} className="flex items-start gap-3 rounded-lg border border-line p-3.5 text-[13px] leading-relaxed text-slate-600">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-dim" />{a.trim()}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <Panel title="Strategic priorities" sub="The four pillars scored in partner meetings">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {THESIS.pillars.map((p, i) => (
            <div key={p.title} className="rounded-xl border border-line p-5 transition-colors hover:border-accent/30 hover:bg-accent-mist">
              <p className="font-mono text-[11px] font-semibold text-accent">0{i + 1}</p>
              <h3 className="mt-2.5 text-[14.5px] font-semibold text-ink">{p.title}</h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{p.detail}</p>
            </div>
          ))}
        </div>
      </Panel>
      <div className="rounded-xl border border-line bg-white p-5">
        <p className="font-mono text-[9.5px] tracking-[0.18em] text-slate-400 uppercase">Thesis history</p>
        <p className="mt-2 text-[13px] text-slate-500">
          v8 (current) · Feb 2026 — added ClimateTech as pillar 2. v7 · Sep 2025 — narrowed consumer exposure.
        </p>
      </div>
    </div>
  );
}

/* ── Investment Team ────────────────────────────────────────── */
export function InvestmentTeam() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Investment team"
        sub="Roles, deal responsibilities and IC access"
        action={
          <button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            + Invite member
          </button>
        }
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {INVESTMENT_TEAM.map((t) => (
            <li key={t.name} className="flex items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-[12px] font-bold text-white">{t.i}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{t.name}</p>
                <p className="text-[12px] text-slate-400">{t.role}</p>
              </div>
              <span className="hidden max-w-xs flex-1 text-[12.5px] text-slate-500 sm:block">{t.focus}</span>
              {t.ic ? <Chip tone="accent">IC member</Chip> : <Chip tone="slate">Advisor</Chip>}
              <Chip tone="line">Workspace · Full</Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Permissions model" sub="Role-based access across the workspace">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { r: "Partner", d: "Full access, IC vote, term sheet authority" },
            { r: "Principal", d: "Full access, IC vote, no signing authority" },
            { r: "Analyst / Advisor", d: "Deal-scoped access, observer in IC" },
          ].map((x) => (
            <div key={x.r} className="rounded-lg border border-line p-4">
              <p className="text-[13.5px] font-semibold text-ink">{x.r}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{x.d}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Investment Mandate ─────────────────────────────────────── */
export function InvestmentMandate() {
  return (
    <div className="space-y-5">
      <PageHead title="Investment mandate" sub="Fund I guardrails agreed with LPs" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { l: "Fund size", v: MANDATE.fundSize.split(" (")[0] },
          { l: "Available capital", v: MANDATE.available.split(" (")[0] },
          { l: "Entry range", v: "₹2–6 Cr" },
          { l: "Ownership target", v: "10–12%" },
        ].map((x) => (
          <div key={x.l} className="rounded-xl border border-line bg-white p-4">
            <p className="text-[16px] font-semibold tracking-tight text-ink">{x.v}</p>
            <p className="mt-1 text-[11px] text-slate-400">{x.l}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Sector allocation" sub="Target vs. actual" className="lg:col-span-2">
          <ul className="space-y-3.5">
            {MANDATE.sectorAllocation.map((s) => (
              <li key={s.label} className="grid grid-cols-[110px_1fr_90px] items-center gap-3">
                <span className="text-[12.5px] font-medium text-ink">{s.label}</span>
                <div className="relative h-[6px] overflow-hidden rounded-full bg-slate-100">
                  <div className="absolute h-full rounded-full bg-accent" style={{ width: `${s.actual * 3}%` }} />
                  <div className="absolute h-[10px] w-[2px] -translate-y-[2px] bg-ink" style={{ left: `${s.target * 3}%` }} />
                </div>
                <span className="text-right font-mono text-[10.5px] text-slate-400">
                  {s.actual}% <span className="text-slate-300">/ {s.target}%</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11.5px] text-slate-400">Markers show target; bars show actual.</p>
        </Panel>

        <Panel title="Stage allocation" sub="By deployed capital">
          <ul className="space-y-4">
            {MANDATE.stageAllocation.map((s) => (
              <li key={s.label}>
                <div className="mb-1.5 flex justify-between text-[12px]">
                  <span className="font-medium text-slate-500">{s.label}</span>
                  <span className="font-mono text-[11px] font-semibold text-ink">{s.pct}%</span>
                </div>
                <Bar pct={s.pct * 1.6} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Portfolio limits" sub="Hard guardrails — Copilot blocks breaches pre-IC" action={<Landmark className="h-4 w-4 text-slate-300" />}>
        <div className="grid gap-3 sm:grid-cols-3">
          {MANDATE.limits.map((l) => (
            <div key={l} className="rounded-lg border border-line p-3.5 text-[12.5px] font-medium text-slate-600">{l}</div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {MANDATE.geoAllocation.map((g) => (
            <Chip key={g.label} tone="ink" className="px-3 py-1.5">
              <Globe2 className="h-3 w-3" /> {g.label} · {g.pct}%
            </Chip>
          ))}
          <Chip tone="accent" className="px-3 py-1.5"><Target className="h-3 w-3" /> Cheque ₹2–6 Cr</Chip>
          <Chip tone="accent" className="px-3 py-1.5"><Compass className="h-3 w-3" /> 2023 vintage</Chip>
        </div>
      </Panel>
    </div>
  );
}
