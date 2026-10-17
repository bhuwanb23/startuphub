import { ArrowUpRight, Check, Quote } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { featuredStory } from "@/views/success-stories/constants/stories";

export default function FeaturedStory() {
  const f = featuredStory;
  return (
    <section className="bg-white py-24 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-ink text-white">
            <div className="bg-nodegrid absolute inset-0 opacity-25" aria-hidden="true" />
            <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {f.category} · Featured
                </span>
                <h2 className="mt-4 max-w-xl text-balance text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                  {f.title}
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">{f.body}</p>
                <figure className="mt-7 max-w-xl border-l-2 border-accent pl-5">
                  <Quote className="h-4 w-4 text-accent" />
                  <blockquote className="mt-2 text-[15px] font-medium italic leading-relaxed text-white">
                    &ldquo;{f.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-[12.5px] text-slate-400">{f.by}</figcaption>
                </figure>
                <Link
                  href={`/explore/startups/${f.slug}`}
                  className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-slate-100"
                >
                  Read the full story
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  The journey on StartupHub
                </span>
                {f.milestones.map((m, i) => (
                  <Reveal key={m} delay={0.1 + i * 0.08}>
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-white">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-[13.5px] font-medium text-white">{m}</span>
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
