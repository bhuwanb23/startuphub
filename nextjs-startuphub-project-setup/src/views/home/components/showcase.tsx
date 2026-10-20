import { ArrowUpRight, MapPin } from "lucide-react";
import type { StartupItem } from "@/lib/data";
import { Reveal, SectionHeader } from "@/components/motion";

function FeaturedCard({ s }: { s: StartupItem }) {
  return (
    <a
      href="#cta"
      className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl border border-line bg-ink p-8 text-white transition-shadow duration-500 hover:shadow-lift sm:p-10"
    >
      {/* ambient network deco */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.16]"
        viewBox="0 0 600 480"
        fill="none"
        aria-hidden="true"
      >
        <path d="M60 380 L300 120 L540 300 M300 120 L180 60 M540 300 L480 420" stroke="#8FA4E6" strokeWidth="1.2" strokeDasharray="3 6" />
        <circle cx="300" cy="120" r="5" fill="#3157E8" className="anim-node-pulse" />
        <circle cx="60" cy="380" r="4" fill="#fff" opacity="0.8" />
        <circle cx="540" cy="300" r="4" fill="#fff" opacity="0.8" />
        <circle cx="180" cy="60" r="3" fill="#fff" opacity="0.5" />
        <circle cx="480" cy="420" r="3" fill="#fff" opacity="0.5" />
      </svg>
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/25 blur-[90px] transition-opacity duration-700 group-hover:opacity-80" />

      <div className="relative flex items-start justify-between">
        <span className="text-[96px] leading-[0.8] font-bold tracking-[-0.06em] text-white/90 transition-transform duration-500 group-hover:scale-[1.04] sm:text-[120px]">
          {s.mark}
          <span className="text-accent">.</span>
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 opacity-0 transition-all duration-400 group-hover:opacity-100">
          <ArrowUpRight className="h-4.5 w-4.5" />
        </span>
      </div>

      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-accent px-2.5 py-1 font-mono text-[9.5px] font-semibold tracking-[0.12em] uppercase">
            Featured
          </span>
          <span className="rounded-md border border-white/15 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.12em] text-white/70 uppercase">
            {s.sector}
          </span>
          <span className="rounded-md border border-white/15 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.12em] text-white/70 uppercase">
            {s.stage}
          </span>
        </div>
        <h3 className="mt-4 text-[28px] font-semibold tracking-tight sm:text-[32px]">
          {s.name}
        </h3>
        <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/65">
          {s.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[13px] font-semibold text-white">
            {s.traction}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-white/50">
            <MapPin className="h-3 w-3" /> {s.location}
          </span>
        </div>
      </div>
    </a>
  );
}

function StartupCard({ s }: { s: StartupItem }) {
  return (
    <a
      href="#cta"
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift sm:p-8"
    >
      <div className="flex items-start justify-between">
        <span className="text-[52px] leading-[0.85] font-bold tracking-[-0.05em] text-ink transition-colors duration-400 group-hover:text-accent">
          {s.mark}
          <span className="text-accent">.</span>
        </span>
        <ArrowUpRight className="h-4.5 w-4.5 -translate-x-1 translate-y-1 text-accent opacity-0 transition-all duration-400 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[9.5px] font-medium tracking-[0.1em] text-accent uppercase">
            {s.sector}
          </span>
          <span className="rounded-md border border-line px-2 py-0.5 font-mono text-[9.5px] tracking-[0.1em] text-slate-500 uppercase">
            {s.stage}
          </span>
        </div>
        <h3 className="mt-3 text-[19px] font-semibold tracking-tight text-ink">
          {s.name}
        </h3>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
          {s.description}
        </p>
        <p className="mt-4 border-t border-slate-100 pt-3.5 text-[12px] font-semibold text-ink">
          {s.traction}
        </p>
      </div>

      <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full" />
    </a>
  );
}

export function Showcase({ startups }: { startups: StartupItem[] }) {
  const featured = startups.find((s) => s.featured) ?? startups[0];
  const rest = startups.filter((s) => s.id !== featured.id).slice(0, 3);

  return (
    <section id="startups" className="border-t border-line bg-soft">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Featured startups"
            title="Founders moving the needle."
          />
          <Reveal delay={0.15}>
            <a
              href="#opportunities"
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-accent"
            >
              Browse all 10K+ startups
              <span className="border-b border-accent/40 pb-0.5 transition-all duration-300 group-hover:border-accent">
                <ArrowUpRight className="inline h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <FeaturedCard s={featured} />
          </Reveal>
          <div className="grid gap-5">
            {rest.map((s, i) => (
              <Reveal key={s.id} delay={0.1 + i * 0.08}>
                <StartupCard s={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
