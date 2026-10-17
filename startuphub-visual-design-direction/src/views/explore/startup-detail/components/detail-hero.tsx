import { ArrowLeft, ArrowUpRight, Globe } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import type { Startup } from "@/views/explore/startups/constants/startups";

export default function DetailHero({ s }: { s: Startup }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-soft pb-12 pt-28 md:pt-32">
      <div
        aria-hidden="true"
        className="bg-nodegrid absolute inset-x-0 top-0 h-[340px] [mask-image:radial-gradient(ellipse_65%_80%_at_50%_0%,black_25%,transparent)]"
      />
      <Container className="relative">
        <Link
          href="/explore/startups"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-400 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to directory
        </Link>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div className="flex items-start gap-5">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-line bg-white text-xl font-bold text-accent shadow-sm md:h-20 md:w-20 md:text-2xl">
                {s.initials}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-[clamp(1.8rem,3.6vw,2.7rem)] font-semibold tracking-[-0.025em] text-ink">
                    {s.name}
                  </h1>
                  <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
                    {s.fundingStage}
                  </span>
                </div>
                <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-slate-500">
                  {s.oneLiner}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {[s.industry, s.stage, s.location, `Founded ${s.founded}`, `${s.employees} people`, s.model].map(
                    (chip) => (
                      <span
                        key={chip}
                        className="rounded-md border border-line bg-white px-2.5 py-1 text-[12px] font-medium text-slate-500"
                      >
                        {chip}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            <a
              href={`https://${s.website}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[10px] border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              <Globe className="h-4 w-4 text-slate-400" />
              Website
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
            </a>
            <Link
              href="/register"
              className="inline-flex items-center rounded-[10px] bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(11,18,32,0.12),inset_0_1px_0_rgba(255,255,255,0.16)] transition-colors hover:bg-accent-deep"
            >
              Connect with {s.name}
            </Link>
          </Reveal>
        </div>

        {/* traction strip */}
        <Reveal delay={0.16}>
          <div className="mt-10 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {s.traction.map((t) => (
              <div key={t.label} className="px-5 py-5 text-center md:py-6">
                <div className="text-xl font-semibold tracking-tight text-ink tabular-nums md:text-2xl">
                  {t.value}
                </div>
                <div className="mt-1 text-[12px] text-slate-400">{t.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
