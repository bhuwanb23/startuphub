import { Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ArrowGlyph, Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";
import type { SolutionData } from "@/components/solution/types";

export default function SolutionHero({ data }: { data: SolutionData }) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-16 pt-28 md:pb-20 md:pt-36">
      <div
        aria-hidden="true"
        className="bg-nodegrid absolute inset-x-0 top-0 h-[420px] [mask-image:radial-gradient(ellipse_65%_80%_at_50%_0%,black_25%,transparent)]"
      />
      <Container className="relative">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] font-medium text-slate-400">
          <Link href="/" className="transition-colors hover:text-ink">Home</Link>
          <span className="text-slate-300">/</span>
          <Link href="/solutions" className="transition-colors hover:text-ink">Solutions</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">{data.audience}</span>
        </nav>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>For {data.audience}</Eyebrow>
            <h1 className="mt-5 text-balance text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
              {data.title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-slate-500">
              {data.lead}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {data.ticks.map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-[13px] font-medium text-slate-600">
                  <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(11,18,32,0.12),inset_0_1px_0_rgba(255,255,255,0.16)] transition-all hover:bg-accent-deep"
              >
                {data.ctaLabel}
                <ArrowGlyph />
              </Link>
              <Link
                href="/platform"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                See the platform
              </Link>
            </div>
          </Reveal>

          {/* role console preview */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_32px_64px_-32px_rgba(11,18,32,0.25)] md:p-7">
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white">
                  <data.icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{data.panel.title}</p>
                  <p className="text-[11px] text-slate-400">Live preview · your view after joining</p>
                </div>
                <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10.5px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
              <div className="divide-y divide-line">
                {data.panel.rows.map((r, i) => (
                  <div key={r.label} className="flex items-center gap-3 py-3.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                      <r.icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[13.5px] font-medium text-slate-600">{r.label}</span>
                    <span className="ml-auto text-[13px] font-semibold tabular-nums text-ink">
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-accent-mist px-4 py-3.5">
                <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
                <p className="text-[13px] font-medium text-ink">
                  {data.panel.stat.value}{" "}
                  <span className="font-normal text-slate-500">{data.panel.stat.label}</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
