import type { LucideIcon } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";
import { Hammer } from "lucide-react";

/** Compact placeholder for sub-pages landing in the next demo drop. */
export function AppTemplate({
  icon: Icon,
  title,
  desc,
  nextFeatures,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  nextFeatures: string[];
}) {
  return (
    <div>
      <PageHeader title={title} desc={desc} />
      <Card className="border-dashed">
        <div className="flex flex-col items-center py-14 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-accent/20 bg-accent-soft text-accent">
            <Icon className="h-6 w-6" />
          </span>
          <h2 className="mt-6 text-xl font-semibold tracking-tight text-ink">
            {title} is being assembled
          </h2>
          <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-slate-500">{desc}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {nextFeatures.map((f) => (
              <Badge key={f}>{f}</Badge>
            ))}
          </div>
          <p className="mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            <Hammer className="h-3.5 w-3.5" />
            Next demo drop
          </p>
        </div>
      </Card>
    </div>
  );
}
