import { Quote } from "lucide-react";
import type { Story } from "@/db/schema";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";

export function Stories({ stories }: { stories: Story[] }) {
  const [mainStory, secondStory] = stories;
  if (!mainStory) return null;

  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <Eyebrow>Success Stories</Eyebrow>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal delay={100}>
            <figure>
              <Quote className="h-8 w-8 text-accent-200" />
              <blockquote className="mt-6 text-balance text-[clamp(1.35rem,2.4vw,1.9rem)] font-medium leading-[1.35] tracking-[-0.02em] text-ink">
                {mainStory.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white">
                  {mainStory.founder
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-ink">
                    {mainStory.founder}
                  </span>
                  <span className="block text-[13.5px] text-slate-400">
                    {mainStory.role} · {mainStory.startup}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid content-start gap-5">
            <Reveal delay={180}>
              <div className="rounded-2xl border border-line bg-soft p-7">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {mainStory.timeline}
                </p>
                <p className="mt-2 text-[38px] font-semibold tracking-[-0.035em] text-accent">
                  {mainStory.metricValue}
                </p>
                <p className="mt-1 text-[13.5px] font-medium text-slate-500">
                  {mainStory.metricLabel}
                </p>
              </div>
            </Reveal>
            {secondStory && (
              <Reveal delay={260}>
                <div className="rounded-2xl border border-line bg-white p-7 shadow-card">
                  <p className="text-[14.5px] leading-relaxed text-slate-600">
                    &ldquo;{secondStory.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-[13px] font-semibold text-ink">
                    {secondStory.founder}
                    <span className="ml-1.5 font-normal text-slate-400">
                      · {secondStory.startup}, {secondStory.sector}
                    </span>
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
