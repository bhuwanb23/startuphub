import { FileBadge, FilePlus2, Hourglass, PenTool, ShieldCheck, Sigma } from "lucide-react";
import { PageIntro, Panel, PanelLink } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  COMM_TONE,
  IP_FLOW,
  IP_STATS,
  PATENTS,
  PATENT_STATUS_TONE,
} from "../../constants/ip-data";

const STAT_ICONS = [FileBadge, ShieldCheck, Hourglass, Sigma, PenTool, FilePlus2] as const;

export function IpPortfolio() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Intellectual property"
        description="Disclosures through granted patents — every asset tagged with where it sits in the commercialization journey."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <FilePlus2 className="h-4 w-4" /> Submit disclosure
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {IP_STATS.map((s, i) => (
          <section key={s.label} className="rounded-xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(11,18,32,0.03)]">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft">
              {(() => { const Icon = STAT_ICONS[i]; return <Icon className="h-3.5 w-3.5 text-accent" />; })()}
            </span>
            <p className="mt-2.5 text-[22px] font-semibold leading-none tracking-[-0.03em] text-ink">
              {s.value}
              {s.delta && <span className="ml-1.5 text-[11px] font-bold text-accent">{s.delta}</span>}
            </p>
            <p className="mt-1.5 text-[11.5px] text-slate-400">{s.label}</p>
            {s.hint && <p className="text-[10.5px] text-slate-400/80">{s.hint}</p>}
          </section>
        ))}
      </div>

      {/* flow strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {IP_FLOW.map((f, i) => (
          <div key={f.stage} className="flex items-center gap-2.5">
            <div className="flex-1 rounded-xl border border-line bg-white px-4 py-3 text-center shadow-[0_1px_2px_rgba(11,18,32,0.03)]">
              <p className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{f.count}</p>
              <p className="text-[11px] text-slate-400">{f.stage}</p>
            </div>
            {i < IP_FLOW.length - 1 && <span className="text-slate-300">→</span>}
          </div>
        ))}
      </div>

      <Panel
        title="Portfolio"
        action={<PanelLink href="#">Export register</PanelLink>}
        bodyClassName="px-0 py-0 sm:px-0"
      >
        <div className="hidden grid-cols-[90px_1.6fr_1fr_110px_110px_120px] gap-3 border-b border-line px-4.5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-400 sm:px-5 lg:grid">
          <span>ID</span><span>Title</span><span>Inventors</span><span>Type</span><span>Status</span><span>Commercialization</span>
        </div>
        <ul className="divide-y divide-line">
          {PATENTS.map((p) => (
            <li
              key={p.id}
              className="grid gap-2 px-4.5 py-3.5 transition-colors hover:bg-soft sm:px-5 lg:grid-cols-[90px_1.6fr_1fr_110px_110px_120px] lg:items-center lg:gap-3"
            >
              <span className="text-[11.5px] font-semibold tabular-nums text-slate-500">{p.id}</span>
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-semibold text-ink">{p.title}</span>
                <span className="block text-[11.5px] text-slate-400">{p.dept} · filed {p.filed}</span>
              </span>
              <span className="truncate text-[12px] text-slate-500">{p.inventors}</span>
              <span className="text-[12px] text-slate-500">{p.type}</span>
              <span>
                <span className={cn("inline-block rounded-full px-2 py-0.5 text-[10.5px] font-semibold", PATENT_STATUS_TONE[p.status])}>
                  {p.status}
                </span>
              </span>
              <span>
                <span className={cn("inline-block rounded-full border px-2 py-0.5 text-[10.5px] font-medium", COMM_TONE[p.commercialization])}>
                  {p.commercialization}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
