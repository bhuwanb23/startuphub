import { ArrowUpRight, Download, FileText, Sparkles, Wrench } from "lucide-react";
import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import StartupArt from "@/components/startup-art";
import { innovationItems, ipResources } from "@/views/ipr/constants/data";

export function InnovationShowcase() {
  return (
    <section className="border-t border-line bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Innovation Showcase"
          title={
            <>
              Protected ideas, <span className="text-accent">winning in the open.</span>
            </>
          }
          lead="Startups that filed early, pitched confidently and negotiated from strength."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {innovationItems.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.06} className="h-full">
              <Link
                href={`/explore/startups/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]"
              >
                <div className="relative h-32 border-b border-line bg-accent-mist/70">
                  <StartupArt variant={i} id={item.slug} />
                  <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[10.5px] font-semibold text-accent">
                    <Sparkles className="h-3 w-3" />
                    {item.ip}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[15.5px] font-semibold tracking-tight text-ink">{item.name}</h3>
                    <span className="text-[11px] font-medium text-slate-400">{item.sector}</span>
                  </div>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-500">{item.note}</p>
                  <ArrowUpRight className="mt-4 h-4 w-4 text-slate-300 transition-colors group-hover:text-accent" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const typeIcons = [FileText, FileText, Wrench, FileText, FileText, FileText];

export function IpResourcesSection() {
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="IP Resources"
          title={
            <>
              Learn it enough to{" "}
              <span className="text-accent">never be blindsided.</span>
            </>
          }
          lead="Guides, checklists and templates from the IPR desk — free, forever."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {ipResources.map((r, i) => {
            const Icon = typeIcons[i % typeIcons.length];
            return (
              <Reveal key={r.title} delay={(i % 3) * 0.06} className="h-full">
                <div className="group flex h-full cursor-pointer items-start gap-4 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(11,18,32,0.22)]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                      {r.type}
                    </span>
                    <h3 className="mt-1 text-[15px] font-semibold leading-snug text-ink">{r.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{r.desc}</p>
                  </div>
                  <Download className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-accent" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
