import {
  Award,
  Building2,
  Factory,
  Globe2,
  Landmark,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Avatar, Chip, Panel } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  BUSINESS_UNITS,
  CORP_PROFILE,
  INDUSTRY_PROFILE,
  INNOVATION_TEAM,
} from "../../constants/ops-data";

/* ── Corporate Profile ──────────────────────────────────────── */
export function CorporateProfile() {
  const c = CORP_PROFILE;
  return (
    <div className="space-y-5">
      <PageHead
        title="Corporate profile"
        sub="How startups see Arjuna Industries across StartupHub"
        action={
          <button className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-soft">
            <Pencil className="h-3.5 w-3.5 text-slate-400" /> Edit profile
          </button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="flex flex-col gap-5 sm:flex-row">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
              <Factory className="h-8 w-8" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{c.name}</h3>
                <Chip tone="rise"><ShieldCheck className="h-3 w-3" /> Verified enterprise</Chip>
              </div>
              <p className="mt-1 text-[13px] text-slate-400">{c.descriptor} · {c.locations}</p>
              <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-slate-500">
                Innovation office sourcing startup technology for quality, traceability,
                cold-chain and sustainability across a 340-point farmer network and 9 plants.
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
            {[
              { l: "Revenue", v: c.revenue },
              { l: "Employees", v: c.employees },
              { l: "On StartupHub", v: "Nov 2025" },
            ].map((x) => (
              <div key={x.l} className="rounded-lg bg-soft p-3.5 text-center">
                <p className="text-[14.5px] font-semibold text-ink">{x.v}</p>
                <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.12em] text-slate-400 uppercase">{x.l}</p>
              </div>
            ))}
          </div>
        </Panel>
        <div className="space-y-4">
          <Panel title="Contact" sub="Innovation office">
            <ul className="space-y-2.5 text-[12.5px] text-slate-500">
              <li className="flex items-center gap-2.5"><Mail className="h-3.5 w-3.5 text-slate-400" />{c.contact.email}</li>
              <li className="flex items-center gap-2.5"><Phone className="h-3.5 w-3.5 text-slate-400" />{c.contact.phone}</li>
              <li className="flex items-center gap-2.5"><Globe2 className="h-3.5 w-3.5 text-slate-400" />{c.contact.web}</li>
            </ul>
          </Panel>
          <Panel title="Public profile" sub={c.profile}>
            <ul className="space-y-2.5 text-[12.5px]">
              <li className="flex justify-between"><span className="text-slate-500">Profile views / month</span><span className="font-medium text-ink">2,214</span></li>
              <li className="flex justify-between"><span className="text-slate-500">Startup interest score</span><span className="font-medium text-rise">A-grade buyer</span></li>
              <li className="flex justify-between"><span className="text-slate-500">Response rating</span><span className="font-medium text-ink">4.7 / 5</span></li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── Industry Profile ───────────────────────────────────────── */
export function IndustryProfile() {
  const i = INDUSTRY_PROFILE;
  return (
    <div className="space-y-5">
      <PageHead title="Industry profile" sub="Segments, technologies, challenges and strategic priorities" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Market segments" action={<Landmark className="h-4 w-4 text-slate-300" />}>
          <div className="flex flex-wrap gap-2">
            {i.segments.map((s) => <Chip key={s} tone="accent" className="px-3 py-1.5">{s}</Chip>)}
          </div>
          <p className="mt-4 mb-2 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Business domains</p>
          <div className="flex flex-wrap gap-2">
            {i.domains.map((d) => <Chip key={d} tone="line">{d}</Chip>)}
          </div>
        </Panel>
        <Panel title="Technology landscape">
          <div className="flex flex-wrap gap-2">
            {i.technologies.map((t) => <Chip key={t} tone="ink" className="px-3 py-1.5">{t}</Chip>)}
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-slate-500">
            <span className="font-semibold text-ink">Competitive position:</span> {i.competitive}.
          </p>
        </Panel>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Industry challenges" sub="What keeps the business up at night">
          <ul className="space-y-2.5">
            {i.challenges.map((c) => (
              <li key={c} className="flex gap-2.5 rounded-lg border border-amber-dim/20 bg-amber-tint p-3.5 text-[12.5px] leading-relaxed text-ink">
                <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-dim" />{c}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Market trends" sub="What we track quarterly">
          <ul className="space-y-2.5">
            {i.trends.map((t) => (
              <li key={t} className="flex gap-2.5 rounded-lg border border-rise/20 bg-rise-tint p-3.5 text-[12.5px] leading-relaxed text-ink">
                <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" />{t}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <Panel title="Strategic priorities" sub="Board-approved, FY26–28">
        <div className="grid gap-3 sm:grid-cols-3">
          {i.priorities.map((p, idx) => (
            <div key={p} className="rounded-xl border border-accent/20 bg-accent-mist p-5">
              <p className="font-mono text-[10px] font-semibold text-accent">0{idx + 1}</p>
              <h3 className="mt-2 text-[14.5px] font-semibold text-ink">{p}</h3>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Business Units ─────────────────────────────────────────── */
export function BusinessUnits() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Business units"
        sub="4 units with innovation budgets, problem ownership and pilot capacity"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ Add unit</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {BUSINESS_UNITS.map((u) => (
          <Panel key={u.name} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Building2 className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-ink">{u.name}</h3>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">Lead · {u.lead}</p>
                </div>
              </div>
              <Chip tone="accent">{u.problems} problems</Chip>
            </div>
            <p className="mt-3.5 text-[12.5px] text-slate-500">{u.note}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <span className="font-mono text-[11px] text-slate-400">{u.budget}</span>
              <a href="/corporate/innovation/problems" className="text-[12px] font-semibold text-accent">Unit problems →</a>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Innovation Team ────────────────────────────────────────── */
export function InnovationTeam() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Innovation team"
        sub="Core office + cross-functional experts from procurement, legal and technology"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ Add member</button>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {INNOVATION_TEAM.map((t) => (
            <li key={t.name} className="flex items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <Avatar label={t.i} className="h-10 w-10 rounded-xl bg-ink text-[12px] font-bold text-white" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{t.name}</p>
                <p className="text-[12px] text-accent">{t.role}</p>
              </div>
              <span className="hidden max-w-sm text-[12.5px] text-slate-500 sm:block">{t.scope}</span>
              <Chip tone={t.role.includes("Chief") ? "amber" : "line"}>{t.role.includes("Chief") ? "Full authority" : "Scoped"}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* ── Roles & Permissions ────────────────────────────────────── */
export function RolesPermissions() {
  const roles = [
    { role: "Chief Innovation Officer", access: "Full workspace + council approvals", tier: "L3" },
    { role: "Innovation Manager", access: "Problems, challenges, discovery, pilots", tier: "L2" },
    { role: "Technology Expert", access: "Evaluation + technical gates (no budgets)", tier: "L2" },
    { role: "Procurement Lead", access: "Vendors, RFPs, purchase requests (CPO rules)", tier: "L2" },
    { role: "Legal Counsel", access: "Contracts + NDA review, risk flags", tier: "Scoped" },
    { role: "BU Stakeholder", access: "Own unit's problems + pilot dashboards", tier: "Scoped" },
  ];
  return (
    <div className="space-y-5">
      <PageHead title="Roles & permissions" sub="Access tiers across projects, startups, procurement and contracts" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {roles.map((r) => (
            <li key={r.role} className="flex items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <Users className="h-4.5 w-4.5 shrink-0 text-slate-300" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{r.role}</p>
                <p className="text-[12px] text-slate-400">{r.access}</p>
              </div>
              <Chip tone={r.tier === "L3" ? "amber" : r.tier === "L2" ? "accent" : "line"}>{r.tier}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
