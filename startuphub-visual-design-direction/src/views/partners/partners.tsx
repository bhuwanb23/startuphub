import { ArrowUpRight, Handshake } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { partnerGroups, partnerPaths } from "@/views/partners/constants/partners";
import CTA from "@/components/cta";

export function PartnersView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Organization" }, { label: "Partners" }]}
        eyebrow="Partners"
        title={
          <>
            Built with the ecosystem,{" "}
            <span className="text-accent">not just for it.</span>
          </>
        }
        lead="Governments, incubators, universities, corporates, investors and technology providers — the institutions making the network real."
      />

      <section className="bg-white py-20 md:py-24">
        <Container>
          <div className="space-y-6">
            {partnerGroups.map((g, i) => (
              <Reveal key={g.name} delay={i * 0.04}>
                <div className="grid gap-5 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-[0_16px_40px_-24px_rgba(11,18,32,0.2)] md:grid-cols-[280px_1fr_auto] md:items-center md:p-8">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-ink">{g.name}</h2>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{g.desc}</p>
                    <span className="mt-3 inline-block rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
                      {g.stat}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.members.map((m) => (
                      <span
                        key={m}
                        className="rounded-lg border border-line bg-soft px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:border-accent/30 hover:bg-accent-mist hover:text-ink"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="group hidden h-10 w-10 shrink-0 place-items-center justify-self-end rounded-full border border-line text-slate-400 transition-all hover:border-accent hover:bg-accent hover:text-white md:grid"
                    aria-label={`Partner with ${g.name}`}
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-soft py-24 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Become a Partner"
            title={
              <>
                Three ways to{" "}
                <span className="text-accent">build with us.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {partnerPaths.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07} className="h-full">
                <Link
                  href="/contact"
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]"
                >
                  <Handshake className="h-5 w-5 text-accent" />
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                  <span className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-accent">
                    Start the conversation
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        title="Let's multiply what you already do."
        primary={{ label: "Become a partner", href: "/contact" }}
        secondary={{ label: "Read about us", href: "/about" }}
      />
    </>
  );
}
