import { Plus, ShieldCheck } from "lucide-react";
import { Bar, PageIntro } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { PROJECTS, STATUS_TONE } from "../../constants/research-data";

const COUNTS: [string, number][] = [
  ["Proposed", PROJECTS.filter((p) => p.status === "Proposed").length + 11],
  ["Active", PROJECTS.filter((p) => p.status === "Active").length + 81],
  ["Completed", PROJECTS.filter((p) => p.status === "Completed").length + 208],
];

export function ResearchProjects() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Research projects"
        description="Proposals, active grants and completed programs — with budget burn, deliverables and the IP each project generates."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Plus className="h-4 w-4" /> New project
          </button>
        }
      />

      {/* status summary */}
      <div className="flex flex-wrap gap-2">
        {COUNTS.map(([label, count], i) => (
          <span
            key={label}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12.5px] font-semibold",
              i === 1 ? "bg-accent-soft text-accent-deep" : "border border-line bg-white text-slate-500",
            )}
          >
            {label}
            <span className={cn("rounded-full px-1.5 text-[11px]", i === 1 ? "bg-white" : "bg-slate-100")}>
              {count}
            </span>
          </span>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {PROJECTS.map((p) => (
          <article
            key={p.id}
            className="rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[14.5px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-1 text-[12px] text-slate-400">
                  {p.pi} · {p.dept}
                </p>
              </div>
              <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-semibold", STATUS_TONE[p.status])}>
                {p.status}
              </span>
            </div>

            <p className="mt-3 text-[12px] font-medium text-slate-500">
              Funded by <span className="text-ink">{p.agency}</span>
            </p>

            <div className="mt-3.5">
              <div className="mb-1.5 flex items-center justify-between text-[11.5px]">
                <span className="text-slate-400">
                  Budget <span className="font-semibold text-ink">{p.budget}</span>
                </span>
                <span className="font-semibold text-ink">{p.spent}% utilized</span>
              </div>
              <Bar value={p.spent} tone={p.spent >= 100 ? "ink" : "accent"} />
            </div>

            <div className="mt-4 flex items-center gap-4 border-t border-line pt-3.5 text-[12px] text-slate-500">
              <span>Ends <span className="font-medium text-ink">{p.endDate}</span></span>
              <span><span className="font-medium text-ink">{p.deliverables}</span> deliverables</span>
              {p.ip && (
                <span className="ml-auto flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent-deep">
                  <ShieldCheck className="h-3 w-3" /> IP generated
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
