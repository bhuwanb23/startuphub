import {
  Building2,
  Download,
  File,
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
  DEPARTMENTS,
  ORG_DOCUMENTS,
  ORG_PROFILE,
  ROLE_MATRIX,
} from "../../constants/ops-data";

/* ── Organization Profile ───────────────────────────────────── */
export function OrganizationProfile() {
  const o = ORG_PROFILE;
  return (
    <div className="space-y-5">
      <PageHead
        title="Organization profile"
        sub="How the ecosystem sees the State Innovation Mission"
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
              <Landmark className="h-8 w-8" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{o.name}</h3>
                <Chip tone="rise"><ShieldCheck className="h-3 w-3" /> Official institution</Chip>
              </div>
              <p className="mt-1 text-[13px] text-slate-400">{o.dept} · {o.level}</p>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                <Globe2 className="h-3.5 w-3.5" /> {o.jurisdiction}
              </p>
              <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-slate-500">
                <span className="font-mono text-[9.5px] tracking-[0.16em] text-slate-400 uppercase block mb-1.5">Mission</span>
                {o.mission}
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
            {[
              { l: "Live schemes", v: String(o.schemes) },
              { l: "Officials", v: "46" },
              { l: "Departments", v: "6" },
            ].map((x) => (
              <div key={x.l} className="rounded-lg bg-soft p-3.5 text-center">
                <p className="text-[16px] font-semibold text-ink">{x.v}</p>
                <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.12em] text-slate-400 uppercase">{x.l}</p>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Contact" sub="Public — on ecosystem profile">
            <ul className="space-y-2.5 text-[12.5px] text-slate-500">
              <li className="flex items-center gap-2.5"><Mail className="h-3.5 w-3.5 text-slate-400" />{o.contact.email}</li>
              <li className="flex items-center gap-2.5"><Phone className="h-3.5 w-3.5 text-slate-400" />{o.contact.phone}</li>
              <li className="flex items-center gap-2.5 truncate"><Globe2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />{o.contact.web}</li>
            </ul>
          </Panel>
          <Panel title="Public profile" sub={o.profile}>
            <ul className="space-y-2.5 text-[12.5px]">
              <li className="flex justify-between"><span className="text-slate-500">Registered startups viewing</span><span className="font-medium text-ink">12,480</span></li>
              <li className="flex justify-between"><span className="text-slate-500">Profile views this month</span><span className="font-medium text-ink">8,412</span></li>
              <li className="flex justify-between"><span className="text-slate-500">Response rating</span><span className="font-medium text-rise">4.6 / 5</span></li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── Departments & Teams ────────────────────────────────────── */
export function DepartmentsTeams() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Departments & teams"
        sub="6 departments · 46 officials · clear ownership of every workspace area"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ Add department</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {DEPARTMENTS.map((d) => (
          <Panel key={d.name} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Building2 className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="text-[14.5px] font-semibold text-ink">{d.name}</h3>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">Head · {d.head} · {d.staff} officials</p>
                </div>
              </div>
              <Chip tone="line">{d.staff} staff</Chip>
            </div>
            <p className="mt-3.5 border-t border-line pt-3 text-[12.5px] leading-relaxed text-slate-500">{d.scope}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Roles & Permissions ────────────────────────────────────── */
export function RolesPermissions() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Roles & permissions"
        sub="Approval authority tiers + scoped access — every action audit-logged"
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {ROLE_MATRIX.map((r) => (
            <li key={r.role} className="flex items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <Avatar label={r.role.split(" ").map((x) => x[0]).join("").slice(0, 2)} className="h-10 w-10 rounded-xl bg-ink text-[12px] font-bold text-white" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{r.role}</p>
                <p className="text-[12px] text-slate-400">{r.access}</p>
              </div>
              {r.ic ? <Chip tone="amber">Approval L3</Chip> : <Chip tone="line">Scoped</Chip>}
            </li>
          ))}
        </ul>
      </Panel>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { l: "Access logs", d: "Every document view, approval and export is logged immutably." },
          { l: "Approval tiers", d: "L1 officer → L2 program manager (₹50L) → L3 Mission Director." },
          { l: "Data access", d: "Startup data visible only with founder consent per sharing scope." },
        ].map((x) => (
          <div key={x.l} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-[12px] leading-relaxed text-slate-500">
            <ShieldCheck className="h-4 w-4 shrink-0 text-rise" />
            <span><b className="text-ink">{x.l}.</b> {x.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Organization Documents ─────────────────────────────────── */
const KIND_TONE: Record<string, "accent" | "rise" | "amber" | "ink" | "slate"> = {
  Policy: "ink", Guideline: "accent", Circular: "amber", Agreement: "rise", Template: "slate",
};

export function OrgDocuments() {
  return (
    <div className="space-y-5">
      <PageHead title="Organization documents" sub="Policies, guidelines, circulars, agreements and templates" />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {ORG_DOCUMENTS.map((d) => (
            <li key={d.file} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <File className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-ink">{d.file}</p>
                <p className="font-mono text-[9.5px] tracking-[0.06em] text-slate-400 uppercase">{d.size} · {d.updated}</p>
              </div>
              <Chip tone={KIND_TONE[d.kind] ?? "slate"}>{d.kind}</Chip>
              <button aria-label="Download" className="flex h-8.5 w-8.5 items-center justify-center rounded-lg border border-line text-slate-400 transition-colors hover:border-accent/40 hover:text-accent">
                <Download className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
