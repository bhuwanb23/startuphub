import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/ui";
import type { HomeStory } from "../constants/directory";

export function Stories({ stories }: { stories: HomeStory[] }) {
  if (!stories.length) return null;

  return (
    <section className="border-y border-line bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Success Stories"
          title="Proof, in founders' own words."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {stories.map((story, i) => (
            <Reveal key={story.id} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <Quote className="h-6 w-6 text-accent/25" fill="currentColor" strokeWidth={0} />
                <blockquote className="mt-5 text-pretty text-[16px] font-medium leading-relaxed text-ink">
                  {story.quote}
                </blockquote>
                <figcaption className="mt-auto pt-8">
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-[13px] font-semibold text-accent">
                      {story.initials}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-ink">{story.name}</p>
                      <p className="text-[12.5px] text-slate-500">{story.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 border-t border-line pt-4 text-[14px] font-semibold text-accent">
                    {story.metric}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
