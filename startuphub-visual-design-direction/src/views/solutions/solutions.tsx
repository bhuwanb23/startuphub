import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { audiences, workflowMini } from "@/views/solutions/constants/audiences";
import CTA from "@/components/cta";
import { cn } from "@/lib/utils";

export function SolutionsView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
        eyebrow="Solutions — Who We Serve"
        title={
          <>
            One ecosystem.{" "}
            <span className="text-accent">Ten ways to belong to it.</span>
          </>
        }
        lead="Every actor in the startup economy gets a dedicated experience — connected to everyone else's. Choose yours."
      />

      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal key={a.name} delay={(i % 3) * 0.05} className="h-full">
                {a.href ? (
                  <Link
                    href={a.href}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)] md:p-7"
                  >
                    <AudienceCard a={a} />
                  </Link>
                ) : (
                  <div className="flex h-full cursor-default flex-col rounded-2xl border border-dashed border-line bg-soft/60 p-6 md:p-7">
                    <AudienceCard a={a} soon />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-soft py-24 md:py-32">
        <Container>
          <SectionHead
            eyebrow="Getting Started"
            title={
              <>
                Three steps and{" "}
                <span className="text-accent">you&apos;re inside.</span>
              </>
            }
          />
          <div className="relative mt-14 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-6">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[26px] hidden border-t border-dashed border-slate-200 md:block"
            />
            {workflowMini.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.09} className="relative">
                <div className="flex items-start gap-4 md:flex-col md:gap-0">
                  <span className="relative z-10 grid h-[52px] w-[52px] shrink-0 place-items-center rounded-2xl border border-line bg-white text-sm font-bold text-accent shadow-sm">
                    {step.n}
                  </span>
                  <div className="md:mt-6">
                    <h3 className="text-[17px] font-semibold tracking-tight text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        title="Find your place in the ecosystem."
        primary={{ label: "Create your profile", href: "/register" }}
        secondary={{ label: "Explore the platform", href: "/platform" }}
      />
    </>
  );
}

function AudienceCard({ a, soon = false }: { a: (typeof audiences)[number]; soon?: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "grid h-11 w-11 place-items-center rounded-xl",
            soon ? "bg-slate-100 text-slate-400" : "bg-accent-soft text-accent"
          )}
        >
          <a.icon className="h-5 w-5" />
        </span>
        {soon ? (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10.5px] font-semibold text-slate-400">
            Coming soon
          </span>
        ) : (
          <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent" />
        )}
      </div>
      <h3 className={cn("mt-5 text-lg font-semibold tracking-tight", soon ? "text-slate-500" : "text-ink")}>
        For {a.name}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">{a.line}</p>
      <ul className="mt-5 space-y-1.5 border-t border-line pt-4">
        {a.points.map((pt) => (
          <li key={pt} className="flex items-center gap-2 text-[13px] text-slate-500">
            <span className={cn("h-1 w-1 rounded-full", soon ? "bg-slate-300" : "bg-accent")} />
            {pt}
          </li>
        ))}
      </ul>
    </>
  );
}
