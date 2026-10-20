import { Reveal, SectionHeader } from "@/components/motion";

const STORIES = [
  {
    quote:
      "We filed three patents, landed two enterprise pilots and closed our seed round — every one of those doors opened inside the same platform.",
    name: "Dr. Ananya Rao",
    role: "Co-founder & CEO, Averia Health",
    metric: "Seed → Series A in 14 months",
  },
  {
    quote:
      "The ecosystem graph told us exactly who to talk to next. We stopped guessing at the market and started compounding connections.",
    name: "Kabir Mehta",
    role: "Founder, Terragrid",
    metric: "1.4M hectares mapped in year one",
  },
];

export function Stories() {
  return (
    <section className="border-t border-line bg-soft">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeader
          eyebrow="Success stories"
          title="Proof, not promises."
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {STORIES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-10">
                <span
                  className="pointer-events-none absolute -top-6 right-4 text-[130px] leading-none font-bold text-accent/8 select-none"
                  aria-hidden="true"
                >
                  ”
                </span>
                <blockquote className="relative text-[19px] leading-[1.55] font-medium tracking-[-0.01em] text-ink sm:text-[21px]">
                  {s.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-end justify-between gap-4 border-t border-slate-100 pt-6">
                  <div>
                    <p className="text-[14.5px] font-semibold text-ink">
                      {s.name}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-slate-500">
                      {s.role}
                    </p>
                  </div>
                  <span className="rounded-lg bg-accent-soft px-3 py-1.5 text-right font-mono text-[10px] font-semibold tracking-[0.06em] text-accent uppercase">
                    {s.metric}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
