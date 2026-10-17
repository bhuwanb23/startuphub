import { CircleDollarSign, Crosshair, Lightbulb, Package } from "lucide-react";
import { Reveal } from "@/components/motion";
import type { Startup } from "@/views/explore/startups/constants/startups";

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
      {children}
    </h2>
  );
}

export default function DetailMain({ s }: { s: Startup }) {
  return (
    <div className="space-y-10">
      <Reveal>
        <section>
          <SectionTitle>Overview</SectionTitle>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">{s.overview}</p>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-500">
                <Crosshair className="h-4 w-4" />
              </span>
              <h3 className="text-[15.5px] font-semibold text-ink">The Problem</h3>
            </div>
            <p className="mt-3.5 text-sm leading-relaxed text-slate-500">{s.problem}</p>
          </div>
          <div className="rounded-2xl border border-accent/20 bg-accent-mist p-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
                <Lightbulb className="h-4 w-4" />
              </span>
              <h3 className="text-[15.5px] font-semibold text-ink">The Solution</h3>
            </div>
            <p className="mt-3.5 text-sm leading-relaxed text-slate-600">{s.solution}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="rounded-2xl border border-line bg-white p-6 md:p-7">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
              <Package className="h-4 w-4" />
            </span>
            <h3 className="text-[15.5px] font-semibold text-ink">Product Highlights</h3>
          </div>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
            {s.product.map((p) => (
              <li
                key={p}
                className="rounded-xl border border-line bg-soft px-4 py-3.5 text-[13.5px] font-medium leading-snug text-slate-600"
              >
                {p}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section>
          <div className="flex items-center justify-between">
            <SectionTitle>Funding History</SectionTitle>
            <span className="flex items-center gap-1.5 text-[12px] font-medium text-slate-400">
              <CircleDollarSign className="h-3.5 w-3.5" />
              Public rounds only
            </span>
          </div>
          <div className="relative mt-5">
            <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-200" />
            <div className="space-y-3">
              {s.funding.map((f) => (
                <div key={f.round} className="relative flex gap-5 rounded-xl p-3 transition-colors hover:bg-white">
                  <span className="relative z-10 mt-1 h-[15px] w-[15px] shrink-0 rounded-full border-[3px] border-accent bg-white" />
                  <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-[15px] font-semibold text-ink">
                        {f.round} · {f.amount}
                      </p>
                      <p className="mt-0.5 text-[13px] text-slate-400">Led by {f.lead}</p>
                    </div>
                    <span className="text-[13px] font-medium text-slate-400">{f.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
