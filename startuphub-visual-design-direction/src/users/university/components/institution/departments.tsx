import { ArrowUpRight, GraduationCap, Handshake, Layers, Split } from "lucide-react";
import { Bar, PageIntro, Panel, StatCard } from "@/components/app/widgets";
import { DEPARTMENTS, FACULTY_STATS } from "../../constants/institution-data";

const STAT_ICONS = [Layers, GraduationCap, Split, Handshake] as const;

export function InstitutionDepartments() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Departments & faculties"
        description="Fourteen departments, eight with technologies in the transfer pipeline. Performance blends research output, IP conversion and funding velocity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {FACULTY_STATS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} hint={s.hint} icon={STAT_ICONS[i]} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {DEPARTMENTS.map((d) => (
          <Panel key={d.name} title={d.name} action={<ArrowUpRight className="h-4 w-4 text-slate-300" />}>
            <div className="flex items-center justify-between text-[12.5px] text-slate-500">
              <span>Head · <span className="font-semibold text-ink">{d.head}</span></span>
              <span className="text-slate-400">{d.focus}</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4 text-center">
              <div>
                <p className="text-[18px] font-semibold text-ink">{d.faculty}</p>
                <p className="text-[11px] text-slate-400">Faculty</p>
              </div>
              <div>
                <p className="text-[18px] font-semibold text-ink">{d.projects}</p>
                <p className="text-[11px] text-slate-400">Active projects</p>
              </div>
              <div>
                <p className="text-[18px] font-semibold text-accent-deep">{d.patents}</p>
                <p className="text-[11px] text-slate-400">Patents</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-[11.5px]">
                <span className="text-slate-400">Department performance</span>
                <span className="font-bold text-ink">{d.performance}</span>
              </div>
              <Bar value={d.performance} tone={d.performance >= 85 ? "accent" : "ink"} />
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
