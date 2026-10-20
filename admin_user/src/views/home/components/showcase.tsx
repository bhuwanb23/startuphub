import { ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion";
import { StartupArt } from "@/components/startup-art";
import { ArrowGlyph, SectionHead } from "@/components/ui";
import type { HomeStartup } from "../constants/directory";

function Monogram({
  name,
  accent,
  large,
}: {
  name: string;
  accent: string;
  large?: boolean;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl font-semibold tracking-tight ${
        large ? "h-14 w-14 text-xl sm:h-16 sm:w-16 sm:text-2xl" : "h-12 w-12 text-lg"
      }`}
      style={{ backgroundColor: `${accent}14`, color: accent }}
    >
      {name.charAt(0)}
    </span>
  );
}

export function Showcase({ startups }: { startups: HomeStartup[] }) {
  if (!startups.length) return null;
  const featured = startups.find((s) => s.featured) ?? startups[0];
  const rest = startups.filter((s) => s.id !== featured.id).slice(0, 4);

  return (
    <section className="border-y border-line bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Featured Startups" title="Built inside the ecosystem." />
          <Reveal delay={0.1}>
            <a
              href="/explore/startups"
              className="group inline-flex items-center gap-1.5 pb-1 text-[14px] font-semibold text-accent"
            >
              View all startups
              <ArrowGlyph />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* featured card */}
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <a
              href={`/explore/startups/${featured.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-10"
            >
              <StartupArt className="absolute -right-10 -top-10 h-64 w-80 opacity-50" />

              <div className="relative flex items-start justify-between">
                <Monogram name={featured.name} accent={featured.accent} large />
                <span className="grid h-10 w-10 place-items-center rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </span>
              </div>
              <div className="relative mt-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {featured.sector} · {featured.stage}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {featured.name}
                </h3>
                <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-slate-500">
                  {featured.oneLiner}
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-400">
                  <MapPin className="h-3.5 w-3.5" />
                  {featured.location}
                </p>
              </div>
              <div className="relative mt-auto pt-10">
                <p className="border-t border-line pt-6 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {featured.metric}
                </p>
                <p className="mt-1.5 text-[12.5px] font-medium text-slate-500">
                  milestone reached on StartupHub
                </p>
              </div>
            </a>
          </Reveal>

          {/* smaller cards */}
          {rest.map((s, i) => (
            <Reveal key={s.id} delay={0.08 * (i + 1)}>
              <a
                href={`/explore/startups/${s.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-start justify-between">
                  <Monogram name={s.name} accent={s.accent} />
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-6 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {s.sector} · {s.stage}
                </p>
                <h3 className="mt-2 text-[19px] font-semibold tracking-tight text-ink">
                  {s.name}
                </h3>
                <p className="mb-6 mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-slate-500">
                  {s.oneLiner}
                </p>
                <p className="mt-auto border-t border-line pt-4 text-[15px] font-semibold text-ink">
                  {s.metric}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
