import {
  Award,
  CalendarDays,
  Clock3,
  FlaskConical,
  Globe2,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { Bar, Chip, Panel } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";
import {
  ORG_DETAILS,
  PROVIDER_AVAILABILITY,
  PROVIDER_PROFILE,
  TEAM_STAFF,
} from "../../constants/ops-data";

/* ── Provider Profile ───────────────────────────────────────── */
export function ProviderProfilePage() {
  const p = PROVIDER_PROFILE;
  return (
    <div className="space-y-5">
      <PageHead
        title="Provider profile"
        sub="How startups see Vertex Labs & Compute in the marketplace"
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
              <FlaskConical className="h-8 w-8" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{p.name}</h3>
                <Chip tone="rise"><ShieldCheck className="h-3 w-3" /> Verified provider</Chip>
              </div>
              <p className="mt-1 text-[13px] text-slate-400">{p.type} · {p.since}</p>
              <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-slate-500">{p.bio}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
            {[
              { l: "Rating", v: `${p.rating} / 5` },
              { l: "Reviews", v: String(p.reviews) },
              { l: "Resource units", v: "24" },
            ].map((x) => (
              <div key={x.l} className="rounded-lg bg-soft p-3.5 text-center">
                <p className="text-[16px] font-semibold text-ink">{x.v}</p>
                <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.12em] text-slate-400 uppercase">{x.l}</p>
              </div>
            ))}
          </div>
        </Panel>
        <div className="space-y-4">
          <Panel title="Industries served">
            <div className="flex flex-wrap gap-2">
              {p.served.split(" · ").map((s) => <Chip key={s} tone="accent" className="px-3 py-1.5">{s}</Chip>)}
            </div>
          </Panel>
          <Panel title="Contact" sub="Public after booking confirmation">
            <ul className="space-y-2.5 text-[12.5px] text-slate-500">
              <li className="flex items-center gap-2.5"><Mail className="h-3.5 w-3.5 text-slate-400" />{p.contact.email}</li>
              <li className="flex items-center gap-2.5"><Phone className="h-3.5 w-3.5 text-slate-400" />{p.contact.phone}</li>
              <li className="flex items-center gap-2.5"><Globe2 className="h-3.5 w-3.5 text-slate-400" />{p.contact.web}</li>
            </ul>
            <p className="mt-3 flex items-center gap-1.5 border-t border-line pt-3 text-[11.5px] text-slate-400">
              <Star className="h-3.5 w-3.5 text-amber-dim" /> Locations: {p.locations}
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── Organization Details ───────────────────────────────────── */
export function OrganizationDetails() {
  const o = ORG_DETAILS;
  return (
    <div className="space-y-5">
      <PageHead title="Organization details" sub="Registration, certifications, compliance and sites" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Registered entity">
          <dl className="space-y-3 text-[13px]">
            {[
              ["Legal name", o.registered],
              ["GST", o.gst],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[9px] tracking-[0.14em] text-slate-400 uppercase">{k}</dt>
                <dd className="mt-1 font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Certifications</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {o.certifications.map((c) => <Chip key={c} tone="rise"><Award className="h-3 w-3" /> {c}</Chip>)}
          </div>
        </Panel>
        <Panel title="Compliance documents" sub="Current and audit-ready" pad={false}>
          <ul className="divide-y divide-line text-[12.5px]">
            {o.compliance.map((c) => (
              <li key={c} className="flex items-center gap-2.5 px-5 py-3.5">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-rise" />
                <span className="text-slate-600">{c}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <Panel title="Sites & facilities" sub="4 operating locations">
        <div className="grid gap-3 sm:grid-cols-2">
          {o.sites.map((s) => (
            <div key={s.name} className="rounded-lg border border-line p-4">
              <h3 className="text-[14px] font-semibold text-ink">{s.name}</h3>
              <p className="mt-0.5 font-mono text-[10px] text-slate-400">{s.size}</p>
              <p className="mt-1.5 text-[12px] text-slate-500">{s.note}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Team & Staff ───────────────────────────────────────────── */
export function TeamStaff() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Team & staff"
        sub="Roles, responsibilities, permissions and activity"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ Add member</button>}
      />
      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {TEAM_STAFF.map((t) => (
            <li key={t.name} className="flex items-center gap-4 px-5 py-4.5 transition-colors hover:bg-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-[12px] font-bold text-white">{t.i}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">{t.name}</p>
                <p className="text-[12px] text-accent">{t.role}</p>
              </div>
              <span className="hidden max-w-sm text-[12.5px] text-slate-500 sm:block">{t.scope}</span>
              <Chip tone={t.role === "Head of Operations" ? "amber" : "line"}>
                {t.role === "Head of Operations" ? "Full access" : "Scoped"}
              </Chip>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { l: "Operations", d: "Bookings, allocations, resources and pricing" },
          { l: "Facility owners", d: "Own facility's calendar, usage and incidents" },
          { l: "Finance", d: "Invoices, payouts and statements (no listing edits)" },
        ].map((x) => (
          <div key={x.l} className="rounded-xl border border-line bg-white p-4">
            <p className="text-[13.5px] font-semibold text-ink">{x.l}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{x.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Expertise & Capabilities ───────────────────────────────── */
export function ExpertiseCapabilities() {
  const groups: { title: string; items: string[] }[] = [
    { title: "Facilities", items: ["BSL-2 wet labs", "ISO-7 cleanroom", "Certified drone range", "Prototyping bay", "Demo suites"] },
    { title: "Compute", items: ["8× A100 nodes", "Auto-provisioned night pools", "Reserved node Fridays", "Kubernetes jobs"] },
    { title: "Technologies", items: ["Battery cell/pack cycling", "HPLC + qPCR stack", "CNC + SLS + FFF", "BVLOS flight ops"] },
    { title: "Services", items: ["Lab manager assist", "Compliance & FTO desk", "Drone safety officer", "Prototype technician"] },
  ];
  return (
    <div className="space-y-5">
      <PageHead title="Expertise & capabilities" sub="What Vertex can deliver — drives matching accuracy" />
      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <Panel key={g.title} title={g.title}>
            <div className="flex flex-wrap gap-2">
              {g.items.map((i) => <Chip key={i} tone="accent" className="px-3 py-1.5">{i}</Chip>)}
            </div>
          </Panel>
        ))}
      </div>
      <Panel title="Capability proof" sub="Evidence behind the badges">
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { l: "Sessions delivered", v: "1,240+" },
            { l: "Zero-incident months", v: "19" },
            { l: "Avg. response", v: "< 10 min" },
            { l: "Repeat rate", v: "68%" },
          ].map((x) => (
            <div key={x.l} className="rounded-lg bg-soft p-4 text-center">
              <p className="text-[18px] font-semibold text-ink">{x.v}</p>
              <p className="mt-1 text-[10.5px] text-slate-400">{x.l}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ── Availability ───────────────────────────────────────────── */
export function AvailabilitySettings() {
  const a = PROVIDER_AVAILABILITY;
  return (
    <div className="space-y-5">
      <PageHead
        title="Availability"
        sub="Operating hours, holidays and blocked dates across facilities"
        action={<button className="rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">+ Block dates</button>}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Operating hours" action={<Clock3 className="h-4 w-4 text-slate-300" />}>
          <dl className="space-y-3.5 text-[13px]">
            {[
              ["Facilities", a.hours],
              ["Compute", a.compute],
              ["Support SLA", a.sla],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-3">
                <dt className="font-mono text-[9.5px] tracking-[0.1em] text-slate-400 uppercase pt-1">{k}</dt>
                <dd className="font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
        <Panel title="Holidays & blocks" action={<CalendarDays className="h-4 w-4 text-slate-300" />}>
          <ul className="space-y-2.5">
            {[...a.holidays, ...a.blocked].map((h) => (
              <li key={h} className="rounded-lg border border-line px-3.5 py-2.5 text-[12.5px] font-medium text-ink">{h}</li>
            ))}
          </ul>
        </Panel>
      </div>
      <div className="rounded-xl border border-accent/20 bg-accent-mist px-5 py-4 text-[13px] leading-relaxed text-ink">
        <b className="text-accent">Smart-block:</b> maintenance blocks auto-decline overlapping
        requests with alternative slots offered — enabled for all equipment categories.
      </div>
    </div>
  );
}
