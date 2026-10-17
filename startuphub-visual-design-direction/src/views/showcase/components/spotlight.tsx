import { ArrowUpRight, Quote, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import StartupArt from "@/components/startup-art";
import { featured, monthSpotlight } from "@/views/showcase/constants/showcase";

export function MonthSpotlight() {
  const s = monthSpotlight;
  return (
    <section className="bg-white py-24 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-accent-mist">
            <div className="bg-nodegrid absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  {s.month}
                </span>
                <div className="mt-7 flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-lg font-bold text-white">
                    {s.initials}
                  </span>
                  <div>
                    <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold tracking-[-0.025em] text-ink">
                      {s.name}
                    </h2>
                    <p className="text-[13px] font-medium text-accent">{s.sector}</p>
                  </div>
                </div>
                <p className="mt-5 max-w-lg text-[clamp(1.15rem,2vw,1.5rem)] font-medium leading-snug tracking-tight text-ink">
                  {s.line}
                </p>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">{s.story}</p>
                <figure className="mt-7 max-w-lg rounded-2xl border border-line bg-white/80 p-5 backdrop-blur">
                  <Quote className="h-4 w-4 text-accent/40" />
                  <blockquote className="mt-2 text-[14.5px] font-medium leading-relaxed text-ink">
                    &ldquo;{s.quote.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-[12.5px] text-slate-400">{s.quote.by}</figcaption>
                </figure>
                <Link
                  href={`/explore/startups/${s.slug}`}
                  className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
                >
                  Read the full profile
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
              <div className="grid content-center gap-4 sm:grid-cols-2">
                {s.metrics.map((m, i) => (
                  <Reveal key={m.l} delay={0.1 + i * 0.07}>
                    <div className="rounded-2xl border border-line bg-white/85 p-6 text-center backdrop-blur">
                      <span className="block text-[1.65rem] font-semibold leading-none tracking-tight text-ink tabular-nums">
                        {m.v}
                      </span>
                      <span className="mt-2 block text-[12px] text-slate-500">{m.l}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function FeaturedGrid() {
  return (
    <section className="bg-white pb-24 md:pb-28">
      <Container>
        <SectionHead
          eyebrow="Featured Startups"
          title={
            <>
              The ventures everyone&apos;s{" "}
              <span className="text-accent">watching this quarter.</span>
            </>
          }
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {featured.map((f, i) => (
            <Reveal key={f.slug} delay={(i % 2) * 0.07} className="h-full">
              <Link
                href={`/explore/startups/${f.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(11,18,32,0.25)]"
              >
                <div className="relative h-48 border-b border-line bg-accent-mist/60 md:h-52">
                  <StartupArt variant={i + 1} id={f.slug} />
                  <span className="absolute left-5 top-5 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold text-accent">
                    {f.stat}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold tracking-tight text-ink">{f.name}</h3>
                    <span className="text-[12px] font-medium text-slate-400">{f.sector} · {f.place}</span>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{f.line}</p>
                  <span className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 transition-colors group-hover:text-accent">
                    View profile
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
