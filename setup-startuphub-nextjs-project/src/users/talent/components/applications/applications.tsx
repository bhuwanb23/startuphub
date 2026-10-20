import { Send } from "lucide-react";
import { PageIntro, Panel, PanelLink } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  APPLICATIONS,
  APP_STATUS_TONE,
  type AppStatus,
} from "../../constants/work-data";

const STAGE_ORDER: AppStatus[] = ["Submitted", "Under Review", "Shortlisted", "Interview", "Offer", "Rejected"];

export function TalentApplications() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Applications"
        description="Every application, its live status and the next move — follow-ups surface here before they go stale."
        action={
          <a
            href="/talent/discover"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            <Send className="h-4 w-4" /> New application
          </a>
        }
      />

      {/* pipeline chips */}
      <div className="flex flex-wrap gap-2">
        {STAGE_ORDER.map((stage) => {
          const count = APPLICATIONS.filter((a) => a.status === stage).length;
          return (
            <span
              key={stage}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12.5px] font-semibold",
                stage === "Offer"
                  ? "bg-emerald-50 text-emerald-700"
                  : stage === "Interview"
                    ? "bg-accent-soft text-accent-deep"
                    : "border border-line bg-white text-slate-500",
              )}
            >
              {stage}
              <span className="rounded-full bg-white/80 px-1.5 text-[11px]">{count}</span>
            </span>
          );
        })}
      </div>

      <Panel
        title={`All applications · ${APPLICATIONS.length}`}
        action={<PanelLink href="#">Export</PanelLink>}
        bodyClassName="px-0 py-0 sm:px-0"
      >
        <ul className="divide-y divide-line">
          {APPLICATIONS.map((a) => (
            <li
              key={a.id}
              className="flex flex-col gap-3 px-4.5 py-4 transition-colors hover:bg-soft sm:flex-row sm:items-center sm:px-5"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-ink">{a.role}</p>
                <p className="mt-0.5 truncate text-[12px] text-slate-400">
                  {a.org} · {a.type} · applied {a.applied}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-medium text-slate-500 sm:w-44">{a.next}</span>
                <span className={cn("w-24 shrink-0 rounded-full px-2.5 py-1 text-center text-[11px] font-semibold", APP_STATUS_TONE[a.status])}>
                  {a.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
