import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { audiences } from "@/views/home/constants/data";

export default function WhoWeServe() {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Who We Serve"
          title={
            <>
              Built for <span className="text-accent">everyone who builds.</span>
            </>
          }
          lead="Founders, institutions and everyone in between — each gets a dedicated experience inside the same ecosystem."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.06} className="h-full">
              <Link
                href={a.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                  For {a.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">{a.line}</p>
                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                  {a.points.map((pt) => (
                    <span
                      key={pt}
                      className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500 transition-colors group-hover:bg-accent-soft group-hover:text-accent"
                    >
                      {pt}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
