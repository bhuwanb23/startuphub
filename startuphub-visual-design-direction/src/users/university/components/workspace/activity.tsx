import { Download } from "lucide-react";
import { PageIntro, Panel } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { ACTIVITY, ACTIVITY_TONE } from "../../constants/workspace-data";

export function UniversityActivity() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Activity"
        description="Institutional audit trail — every filing, transfer, booking and document action, in order."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-4 text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft">
            <Download className="h-4 w-4" /> Export log
          </button>
        }
      />

      <Panel title="Last 7 days">
        <ol className="relative space-y-5 before:absolute before:bottom-1.5 before:left-[5px] before:top-1.5 before:w-px before:bg-line">
          {ACTIVITY.map((a) => (
            <li key={`${a.entity}-${a.time}`} className="relative flex gap-4 pl-6">
              <span className={cn("absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-white ring-1 ring-line", ACTIVITY_TONE[a.kind])} />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] leading-snug text-slate-600">
                  <span className="font-semibold text-ink">{a.actor}</span>{" "}
                  {a.action}{" "}
                  <span className="font-medium text-ink">{a.entity}</span>
                </p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{a.time}</p>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}
