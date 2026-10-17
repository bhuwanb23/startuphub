import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/app/widgets";
import { copilotFeed } from "@/users/startup/constants/dashboard-data";

export default function CopilotPanel() {
  const c = copilotFeed;
  return (
    <section className="bg-nodegrid relative overflow-hidden rounded-2xl border border-accent/25 bg-accent-mist p-5 md:p-6">
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Startup Copilot
            </p>
            <h2 className="text-[17px] font-semibold tracking-tight text-ink">
              What should I do next?
            </h2>
          </div>
          <Badge tone="bad">High impact</Badge>
        </div>

        <div className="mt-4 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-[17px] font-semibold leading-snug tracking-tight text-ink md:text-lg">
              {c.action}
            </p>
            <p className="mt-2.5 max-w-xl text-[13.5px] leading-relaxed text-slate-600">
              <span className="font-semibold text-accent">Why now — </span>
              {c.why}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/founder/funding/data-room"
                className="group inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4.5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                Open data room
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/founder/copilot"
                className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4.5 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-slate-300"
              >
                Explore alternatives
              </Link>
            </div>
          </div>

          <div className="space-y-2.5">
            {c.alternatives.map((a) => (
              <div
                key={a.title}
                className="group flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-line bg-white/80 p-3.5 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_24px_-14px_rgba(49,87,232,0.4)]"
              >
                <div>
                  <p className="text-[13px] font-semibold leading-snug text-ink">{a.title}</p>
                  <p className="mt-1 line-clamp-2 text-[11.5px] leading-snug text-slate-500">{a.why}</p>
                </div>
                <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300 transition-colors group-hover:text-accent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
