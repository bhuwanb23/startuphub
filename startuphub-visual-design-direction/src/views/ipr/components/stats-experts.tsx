import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import { CountUp, Reveal } from "@/components/motion";
import { ipExperts, ipStats } from "@/views/ipr/constants/data";

export function IpStats() {
  return (
    <section className="bg-white py-24 md:py-28">
      <Container>
        <SectionHead
          eyebrow="IP Statistics"
          title={
            <>
              Protection, <span className="text-accent">by the numbers.</span>
            </>
          }
        />
        <div className="mt-14 grid grid-cols-2 gap-6 md:mt-16 lg:grid-cols-4">
          {ipStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="rounded-2xl border border-line bg-white p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(11,18,32,0.2)]">
                <div className="text-[2.3rem] font-semibold leading-none tracking-[-0.03em] text-ink">
                  <CountUp to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix} className="tabular-nums" />
                </div>
                <div className="mt-2.5 text-[13px] leading-snug text-slate-500">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function IpExpertsSection() {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            align="left"
            eyebrow="IPR Experts"
            title={
              <>
                Filed by people who&apos;ve{" "}
                <span className="text-accent">filed thousands.</span>
              </>
            }
            lead="The IPR desk pairs your startup with specialists in your exact technology area."
          />
          <Reveal delay={0.1}>
            <Link
              href="/explore/mentors"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent"
            >
              Browse all experts
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ipExperts.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.06}>
              <div className="group rounded-2xl border border-line bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(11,18,32,0.22)]">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-soft text-[15px] font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  {e.name.split(" ").filter((w) => w.length > 2).map((w) => w.replace(".", "")[0]).join("").slice(0, 2)}
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">{e.name}</h3>
                <p className="mt-1 text-[12.5px] text-slate-400">{e.role}</p>
                <div className="mt-4 flex items-center justify-center gap-2 border-t border-line pt-4 text-[11.5px]">
                  <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-500">{e.tag}</span>
                  <span className="font-semibold text-accent">{e.stat}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
