import {
  Boxes,
  Eye,
  FilePlus2,
  FlaskConical,
  Layers,
  MapPin,
  PauseCircle,
  Star,
} from "lucide-react";
import { Bar, Chip, Panel, ScoreRing } from "@/components/app/widgets";
import { PageHead, SubjectBanner } from "@/components/app/boards";
import { CATEGORIES, RESOURCE_SUBJECT, RESOURCES, type ResourceStatus } from "../../constants/provider-data";
import { PROVIDER_DOCS } from "../../constants/ops-data";
import { File } from "lucide-react";

const STATUS_TONE: Record<ResourceStatus, "rise" | "accent" | "amber" | "slate" | "ink"> = {
  Available: "rise", Allocated: "accent", Booked: "amber", Maintenance: "amber",
  Unavailable: "slate", Archived: "slate",
};
const LISTING_TONE: Record<string, "rise" | "accent" | "amber" | "slate"> = {
  Active: "rise", Draft: "accent", Paused: "amber", Expired: "slate",
};

/* ── Resource Listing ───────────────────────────────────────── */
export function ResourceListings() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Resource listings"
        sub="8 listings · publish, pause and preview how startups see them"
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <FilePlus2 className="h-3.5 w-3.5" /> Create listing
          </button>
        }
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "Active", "Draft", "Paused", "Expired"].map((s, i) => (
          <button key={s} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{s}</button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {RESOURCES.map((r) => (
          <Panel key={r.id} className="group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink">{r.name}</h3>
                <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">{r.category} · {r.units} units</p>
              </div>
              <Chip tone={LISTING_TONE[r.listing]}>{r.listing}</Chip>
            </div>
            <p className="mt-2.5 text-[12.5px] text-slate-500">{r.type}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11.5px] text-slate-400">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{r.location}</span>
              <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-dim/20 text-amber-dim" />{r.rating}</span>
              <span className="font-semibold text-ink">{r.price}</span>
            </div>
            <div className="mt-4 flex gap-2 border-t border-line pt-3.5">
              <a href="/provider/resources/profile" className="flex-1 rounded-lg border border-line py-2 text-center text-[12px] font-semibold text-ink hover:bg-soft">
                <Eye className="mr-1 inline h-3.5 w-3.5" /> Preview
              </a>
              <a href="/provider/resources/profile" className="flex-1 rounded-lg bg-accent py-2 text-center text-[12px] font-semibold text-white hover:bg-accent-deep">Manage</a>
              <button aria-label="Pause" className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-slate-400 hover:text-amber-dim">
                <PauseCircle className="h-4 w-4" />
              </button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Resource Profile (subject: Bio-Bench Lab Suite A) ─────── */
export function ResourceProfile() {
  const r = RESOURCE_SUBJECT;
  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker={`Resource profile · ${r.id}`}
        title={r.name}
        meta={`${r.type} · ${r.location}`}
        score={96}
        action={
          <Chip tone="rise" className="px-3 py-1.5">
            <Star className="h-3 w-3" /> {r.rating} rating · Active listing
          </Chip>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Specifications" className="lg:col-span-2">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 text-[13px] sm:grid-cols-2">
            {r.specs.map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[9px] tracking-[0.14em] text-slate-400 uppercase">{k}</dt>
                <dd className="mt-1 font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2.5 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Included features</p>
            <div className="flex flex-wrap gap-2">
              {r.features.map((f) => <Chip key={f} tone="accent">{f}</Chip>)}
            </div>
          </div>
        </Panel>
        <div className="space-y-4">
          <Panel title="Performance" sub="Last 30 days">
            <ul className="space-y-3">
              {r.incremental.map((x) => (
                <li key={x.label} className="flex items-center justify-between text-[12.5px]">
                  <span className="text-slate-500">{x.label}</span>
                  <span className="font-semibold text-ink">{x.value}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Documents" sub={`${r.docs.length} attached`} pad={false}>
            <ul className="divide-y divide-line text-[11.5px]">
              {r.docs.map((d) => (
                <li key={d} className="flex items-center gap-2.5 px-5 py-2.5 text-slate-600">
                  <File className="h-3.5 w-3.5 shrink-0 text-slate-400" /> {d}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ── My Resources (inventory) ───────────────────────────────── */
export function MyResources() {
  return (
    <div className="space-y-5">
      <PageHead
        title="My resources"
        sub="24 units across 8 listings · live status of every physical and logical unit"
        action={<button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Boxes className="h-3.5 w-3.5" /> Add resource</button>}
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "Available", "Allocated", "Booked", "Under Maintenance", "Unavailable", "Archived"].map((s, i) => (
          <button key={s} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{s}</button>
        ))}
      </div>
      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Unit", "Resource", "Category", "Location", "Utilization", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {RESOURCES.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-soft">
                  <td className="px-5 py-4 font-mono text-[10.5px] text-slate-500">{r.id}</td>
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-semibold text-ink">{r.name}</p>
                    <p className="text-[10.5px] text-slate-400">{r.units} units · {r.price}</p>
                  </td>
                  <td className="px-5 py-4"><Chip tone="line">{r.category}</Chip></td>
                  <td className="px-5 py-4 text-[11.5px] text-slate-500">{r.location}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Bar pct={r.util} className="w-16" barClass={r.util >= 85 ? "bg-rise" : r.util >= 60 ? "bg-accent" : "bg-amber-dim"} />
                      <span className="font-mono text-[10.5px]">{r.util}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><Chip tone={STATUS_TONE[r.status]}>{r.status}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ── Resource Categories ────────────────────────────────────── */
export function ResourceCategories() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Resource categories"
        sub="How your inventory is structured — and what each category earns"
        action={<Layers className="h-4 w-4 text-slate-300" />}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <Panel key={c.name} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <FlaskConical className="h-4.5 w-4.5" />
              </span>
              <Chip tone={c.util >= 85 ? "rise" : c.util >= 60 ? "accent" : "amber"}>{c.util}% util</Chip>
            </div>
            <h3 className="mt-3.5 text-[15px] font-semibold text-ink">{c.name}</h3>
            <p className="mt-1 text-[12px] text-slate-500">{c.note}</p>
            <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3">
              <span className="font-mono text-[11px] text-slate-400">{c.count} units</span>
              <Bar pct={c.util} className="w-20" barClass={c.util >= 85 ? "bg-rise" : "bg-accent"} />
            </div>
          </Panel>
        ))}
        <Panel className="flex flex-col items-center justify-center border-dashed !border-slate-300 bg-transparent text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-slate-300 text-slate-400">+</span>
          <p className="mt-3 text-[13px] font-semibold text-slate-500">New category</p>
          <p className="mt-1 text-[11.5px] text-slate-400">Demand radar suggests "Cryo storage"</p>
        </Panel>
      </div>
    </div>
  );
}
