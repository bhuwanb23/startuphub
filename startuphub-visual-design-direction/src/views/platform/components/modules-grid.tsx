import { Check } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { aiModule, modules } from "@/views/platform/constants/modules";

export default function ModulesGrid() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Platform Modules"
          title={
            <>
              Everything a startup needs,{" "}
              <span className="text-accent">already connected.</span>
            </>
          }
          lead="Eleven modules mapped onto the lifecycle. Each one is strong alone — unfair when combined."
        />

        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-3">
          {/* AI layer — full width feature */}
          <Reveal className="lg:col-span-3">
            <div className="bg-nodegrid relative overflow-hidden rounded-2xl border border-accent/20 bg-accent-mist p-8 md:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-white">
                      <aiModule.icon className="h-5.5 w-5.5" />
                    </span>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                        {aiModule.stage}
                      </span>
                      <h3 className="text-2xl font-semibold tracking-tight text-ink">
                        {aiModule.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate-600">
                    {aiModule.desc}
                  </p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {aiModule.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 rounded-xl border border-line bg-white/80 px-4 py-3 text-[13.5px] font-medium text-ink backdrop-blur"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                        <Check className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {modules.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.06} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.22)]">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <m.icon className="h-5 w-5" />
                  </span>
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                    {m.stage}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{m.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{m.desc}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-4">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[13px] text-slate-600">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
