import { Download, FileText, Layers, Settings2, SlidersHorizontal } from "lucide-react";
import { Chip, Panel } from "@/components/app/widgets";
import { PageHead } from "@/components/app/boards";

type ReportSet = {
  title: string;
  items: { name: string; period: string; status: "Published" | "Draft" | "Scheduled" }[];
};

const SETS: Record<string, ReportSet> = {
  startup: {
    title: "Startup reports",
    items: [
      { name: "Startup Registry Report — Q1 FY26", period: "Jan–Mar 2026", status: "Published" },
      { name: "Startup Growth Report — H2 FY25", period: "Oct–Mar", status: "Published" },
      { name: "Sector Distribution Snapshot", period: "Mar 2026", status: "Draft" },
      { name: "Regional Formation Report", period: "Mar 2026", status: "Draft" },
    ],
  },
  program: {
    title: "Program reports",
    items: [
      { name: "Scheme Performance Pack — Q1", period: "Jan–Mar 2026", status: "Draft" },
      { name: "Grant Compliance Digest", period: "Mar 2026", status: "Published" },
      { name: "Challenge Outcomes Annual", period: "FY25", status: "Published" },
      { name: "Incubator Accreditation Review", period: "Mar 2026", status: "Scheduled" },
    ],
  },
  funding: {
    title: "Funding reports",
    items: [
      { name: "Allocation & Disbursement — Q1", period: "Jan–Mar 2026", status: "Published" },
      { name: "Utilization Certificate Pack", period: "Mar 2026", status: "Draft" },
      { name: "Funding by District", period: "FY25", status: "Published" },
      { name: "PFMS Reconciliation", period: "Mar 2026", status: "Scheduled" },
    ],
  },
};

function ReportGrid({ set }: { set: ReportSet }) {
  return (
    <Panel pad={false} title={set.title} sub={`${set.items.length} documents`}>
      <ul className="divide-y divide-line">
        {set.items.map((r) => (
          <li key={r.name} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-soft">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <FileText className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-ink">{r.name}</p>
              <p className="font-mono text-[9.5px] tracking-[0.08em] text-slate-400 uppercase">{r.period}</p>
            </div>
            <Chip tone={r.status === "Published" ? "rise" : r.status === "Draft" ? "amber" : "slate"}>{r.status}</Chip>
            <button aria-label="Download" className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-slate-400 hover:border-accent/40 hover:text-accent">
              <Download className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ── Startup Reports ────────────────────────────────────────── */
export function StartupReports() {
  return (
    <div className="space-y-5">
      <PageHead title="Startup reports" sub="Registry, growth, sector, regional, funding and IPR reporting" />
      <div className="grid gap-4 lg:grid-cols-2">
        <ReportGrid set={SETS.startup} />
        <Panel title="Scheduled cadence" sub="Auto-assembled from registry">
          <ul className="space-y-3 text-[12.5px] text-slate-600">
            <li>· Registry report — monthly, 1st working day</li>
            <li>· Growth report — fortnightly Fridays</li>
            <li>· IPR report — monthly, synced from IPR desk</li>
            <li>· Regional snapshot — quarterly, for steering</li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ── Program Reports ────────────────────────────────────────── */
export function ProgramReports() {
  return (
    <div className="space-y-5">
      <PageHead title="Program reports" sub="Scheme, grant, challenge and incubator performance" />
      <ReportGrid set={SETS.program} />
    </div>
  );
}

/* ── Funding Reports ────────────────────────────────────────── */
export function FundingReportsPage() {
  return (
    <div className="space-y-5">
      <PageHead title="Funding reports" sub="Allocation, disbursement, utilization and reconciliations" />
      <ReportGrid set={SETS.funding} />
    </div>
  );
}

/* ── Ecosystem Reports ──────────────────────────────────────── */
export function EcosystemReports() {
  return (
    <div className="space-y-5">
      <PageHead title="Ecosystem reports" sub="Startup, innovation, incubation and funding ecosystem views" />
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { t: "State of the Ecosystem — FY26", d: "Flagship 40-page brief for legislature", s: "Assembly Jun 2026" },
          { t: "Innovation Ecosystem Quarterly", d: "IPR + research commercialization", s: "Live · Q1" },
          { t: "Incubation Network Review", d: "68 incubators, accreditation outcomes", s: "Live · Q1" },
          { t: "Funding Ecosystem Map", d: "Govt + private flows by stage/region", s: "Apr 2026" },
        ].map((r) => (
          <Panel key={r.t} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <Layers className="h-5 w-5 text-accent" />
            <h3 className="mt-3 text-[15px] font-semibold text-ink">{r.t}</h3>
            <p className="mt-1 text-[12.5px] text-slate-500">{r.d}</p>
            <p className="mt-3 border-t border-line pt-3 font-mono text-[10px] tracking-[0.1em] text-accent uppercase">{r.s}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Impact Reports ─────────────────────────────────────────── */
export function ImpactReports() {
  return (
    <div className="space-y-5">
      <PageHead title="Impact reports" sub="Economic, employment, innovation, regional and social impact" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { t: "Economic impact brief", v: "₹2,860 Cr revenue · 6.8× leverage" },
          { t: "Employment impact brief", v: "48.2K jobs · 62% skilled" },
          { t: "Innovation impact brief", v: "3,120 filings · 412 commercialized" },
          { t: "Regional impact pack", v: "8 district deep-dives" },
          { t: "Social impact report", v: "31% women-led · 212 SDG startups" },
          { t: "Legislature summary", v: "8-page verified brief, steering-approved" },
        ].map((r) => (
          <Panel key={r.t}>
            <h3 className="text-[14px] font-semibold text-ink">{r.t}</h3>
            <p className="mt-1.5 text-[12.5px] text-slate-500">{r.v}</p>
            <button className="mt-4 w-full rounded-lg border border-line py-2 text-[12px] font-semibold text-ink hover:bg-soft">
              <Download className="mr-1 inline h-3.5 w-3.5" /> Download
            </button>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ── Custom Reports ─────────────────────────────────────────── */
export function CustomReports() {
  const metrics = ["Registrations", "Verification pass", "Funding disbursed", "Utilization", "Jobs", "Patents", "Survival", "Density"];
  const filters = ["By district", "By sector", "By scheme", "By stage", "By quarter", "By cohort"];
  return (
    <div className="space-y-5">
      <PageHead
        title="Custom reports"
        sub="Report builder — metrics, filters, dashboards, scheduling and export"
        action={<Settings2 className="h-4 w-4 text-slate-300" />}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Select metrics" sub="Drag into your report">
          <div className="flex flex-wrap gap-2">
            {metrics.map((m) => <Chip key={m} tone="line" className="cursor-pointer px-3 py-1.5 hover:border-accent/40 hover:text-accent">{m}</Chip>)}
          </div>
          <p className="mt-5 mb-2.5 font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">Filters</p>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => <Chip key={f} tone="accent">{f}</Chip>)}
          </div>
        </Panel>
        <Panel title="Output" sub="Where the report goes">
          <ul className="space-y-3 text-[12.5px] text-slate-600">
            <li className="flex items-center gap-2.5"><SlidersHorizontal className="h-3.5 w-3.5 text-accent" /> Custom dashboard tile — live, shareable link</li>
            <li className="flex items-center gap-2.5"><Download className="h-3.5 w-3.5 text-accent" /> Export — PDF, XLSX or CSV with audit footer</li>
            <li className="flex items-center gap-2.5"><FileText className="h-3.5 w-3.5 text-accent" /> Scheduled email — weekly to steering + 6 department heads</li>
          </ul>
          <button className="mt-5 w-full rounded-lg bg-accent py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            Build report
          </button>
        </Panel>
      </div>
    </div>
  );
}
