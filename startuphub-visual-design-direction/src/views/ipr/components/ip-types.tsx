import { Copyright, FileBadge, Paintbrush, ShieldCheck } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ipTypes } from "@/views/ipr/constants/data";

const icons = [FileBadge, ShieldCheck, Copyright, Paintbrush];

export default function IpTypes() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Know Your IP"
          title={
            <>
              Four shields. <span className="text-accent">Pick them early.</span>
            </>
          }
          lead="Different parts of your venture are protected by different instruments. Here's how each one works — without the legalese."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-16">
          {ipTypes.map((t, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={t.name} delay={(i % 2) * 0.07} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)] md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                      {t.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{t.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{t.desc}</p>
                  <ul className="mt-5 space-y-2 border-t border-line pt-4">
                    {t.facts.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px] text-slate-600">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
