import { Quote } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { quotes } from "@/views/home/constants/data";

export default function Stories() {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Success Stories"
          title={
            <>
              Founders who took the <span className="text-accent">connected path.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-3">
          {quotes.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]">
                <Quote className="h-6 w-6 text-accent/25" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-600">
                  &ldquo;{s.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-[13px] font-bold text-accent">
                    {s.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">{s.name}</span>
                    <span className="block truncate text-[12px] text-slate-400">{s.role}</span>
                  </span>
                  <span className="ml-auto hidden shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10.5px] font-semibold text-slate-500 sm:block">
                    {s.chip}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
