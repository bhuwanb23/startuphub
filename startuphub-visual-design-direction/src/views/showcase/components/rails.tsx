import { ArrowUpRight, FlaskConical } from "lucide-react";
import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { emerging, products } from "@/views/showcase/constants/showcase";

export function EmergingRail() {
  return (
    <section className="overflow-hidden border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            align="left"
            eyebrow="Emerging Startups"
            title={
              <>
                Early, unusual and{" "}
                <span className="text-accent">worth remembering.</span>
              </>
            }
            lead="Pre-seed ventures the intelligence layer flagged this month — before anyone else talks about them."
          />
          <Reveal delay={0.1}>
            <Link
              href="/explore/startups"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent"
            >
              Explore all startups
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </Container>
      <div className="mask-x-fade mt-12">
        <div className="marquee-root overflow-hidden">
          <div className="anim-marquee flex w-max gap-5 pl-5 pr-5" style={{ animationDuration: "38s" }}>
            {[...emerging, ...emerging].map((e, i) => (
              <Link
                key={`${e.slug}-${i}`}
                href={`/explore/startups/${e.slug}`}
                className="group w-[280px] shrink-0 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(11,18,32,0.22)]"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  {e.sector}
                </span>
                <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-ink">{e.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{e.note}</p>
                <ArrowUpRight className="mt-5 h-4 w-4 text-slate-300 transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductSpotlight() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Innovative Products"
          title={
            <>
              Products that make you think{" "}
              <span className="text-accent">&ldquo;why didn&apos;t this exist?&rdquo;</span>
            </>
          }
          lead="This month's most interesting shipping from ecosystem startups."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(11,18,32,0.22)]">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                    <FlaskConical className="h-4.5 w-4.5" />
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-ink">{p.name}</h3>
                <p className="mt-0.5 text-[12px] font-semibold text-accent">{p.by}</p>
                <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slate-500">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
