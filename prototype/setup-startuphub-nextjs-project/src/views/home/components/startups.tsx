import { ArrowRight, ArrowUpRight, MapPin, TrendingUp } from "lucide-react";
import type { Startup } from "@/db/schema";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { TILE_BG } from "../constants/home-data";

function TileNodes() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-[0.16]"
      viewBox="0 0 200 120"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#fff" strokeWidth="0.7">
        <line x1="40" y1="30" x2="95" y2="60" />
        <line x1="150" y1="25" x2="95" y2="60" />
        <line x1="95" y1="60" x2="60" y2="100" />
        <line x1="95" y1="60" x2="155" y2="95" />
      </g>
      <g fill="#fff">
        <circle cx="40" cy="30" r="3" />
        <circle cx="150" cy="25" r="3" />
        <circle cx="95" cy="60" r="4" />
        <circle cx="60" cy="100" r="3" />
        <circle cx="155" cy="95" r="3" />
      </g>
    </svg>
  );
}

export function Startups({ startups }: { startups: Startup[] }) {
  const [featured, ...rest] = startups;

  return (
    <section id="startups" className="bg-white py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead eyebrow="Featured Startups" title="Built inside the network." className="flex-1" />
          <Reveal delay={120}>
            <a
              href="/login"
              className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent hover:text-accent-deep"
            >
              Browse all startups
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          {featured && (
            <Reveal delay={100}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <div
                  className="relative h-56 overflow-hidden sm:h-72"
                  style={{ background: TILE_BG[0] }}
                >
                  <TileNodes />
                  <span className="absolute left-6 top-6 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
                    {featured.sector}
                  </span>
                  <span className="absolute bottom-4 left-6 text-[64px] font-semibold tracking-[-0.04em] text-white/90">
                    {featured.initials}
                  </span>
                  <span className="absolute bottom-6 right-6 flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-[12px] font-semibold text-white backdrop-blur">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {featured.signal}
                  </span>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-ink">
                        {featured.name}
                      </h3>
                      <p className="mt-1.5 max-w-md text-[14.5px] leading-relaxed text-slate-500">
                        {featured.tagline}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 text-[12.5px] font-medium text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {featured.stage}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {featured.location}
                    </span>
                    <span className="ml-auto font-semibold text-ink">
                      {featured.raised}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          )}

          <div className="grid gap-5">
            {rest.map((s, i) => (
              <Reveal key={s.slug} delay={180 + i * 90}>
                <article className="group relative flex h-full items-stretch overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <div
                    className="relative w-28 shrink-0 overflow-hidden sm:w-36"
                    style={{ background: TILE_BG[(i + 1) % TILE_BG.length] }}
                  >
                    <TileNodes />
                    <span className="absolute bottom-4 left-4 text-[30px] font-semibold tracking-[-0.04em] text-white/90">
                      {s.initials}
                    </span>
                  </div>
                  <div className="flex-1 p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-deep">
                        {s.sector}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
                    <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.02em] text-ink">
                      {s.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-slate-500">
                      {s.tagline}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-[12px] font-medium text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {s.stage}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {s.location}
                      </span>
                      <span className="ml-auto font-semibold text-ink">
                        {s.raised}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
