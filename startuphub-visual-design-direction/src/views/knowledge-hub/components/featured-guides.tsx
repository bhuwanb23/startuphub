import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { featuredGuides } from "@/views/knowledge-hub/constants/content";
import { cn } from "@/lib/utils";

export default function FeaturedGuides() {
  return (
    <section className="bg-white pb-4 pt-20 md:pt-24">
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredGuides.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <Link
                href="/register"
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 md:p-9",
                  g.accent
                    ? "border-accent/25 bg-accent-mist hover:shadow-[0_24px_48px_-24px_rgba(49,87,232,0.4)]"
                    : "border-line bg-white hover:shadow-[0_24px_48px_-24px_rgba(11,18,32,0.25)]"
                )}
              >
                {g.accent && <div aria-hidden="true" className="bg-nodegrid absolute inset-0 opacity-60" />}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "rounded-md px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em]",
                        g.accent ? "bg-accent text-white" : "bg-accent-soft text-accent"
                      )}
                    >
                      {g.type}
                    </span>
                    <BookOpen className={cn("h-4 w-4", g.accent ? "text-accent" : "text-slate-300")} />
                  </div>
                  <h3 className="mt-5 max-w-sm text-2xl font-semibold tracking-tight text-ink">
                    {g.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-slate-600">{g.desc}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-line/70 pt-5">
                    <span className="text-[12.5px] font-medium text-slate-400">{g.meta}</span>
                    <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-accent">
                      Start reading
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
