import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { lifecycleStages } from "@/views/lifecycle/constants/stages";

export default function LifecycleOverview() {
  return (
    <section className="bg-white py-20 md:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[15px] leading-relaxed text-slate-500">
              Most platforms help with one stage and abandon you at the hard
              parts. The StartupHub lifecycle is designed as a{" "}
              <span className="font-semibold text-ink">continuous conveyor</span> —
              every stage finishes by setting up the next.
            </p>
          </div>
        </Reveal>

        {/* full chain — scrollable on small screens */}
        <Reveal delay={0.1}>
          <div className="relative mt-14 overflow-x-auto pb-4">
            <div className="flex min-w-[980px] items-start">
              {lifecycleStages.map((s, i) => (
                <div key={s.n} className="relative flex-1">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-1/2 top-[22px] h-px bg-slate-200"
                    />
                  )}
                  {i < lifecycleStages.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 right-0 top-[22px] h-px bg-slate-200"
                    />
                  )}
                  <div className="relative flex flex-col items-center gap-3">
                    <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-[11px] font-bold tabular-nums text-accent shadow-sm">
                      {s.n}
                    </span>
                    <span className="text-[12px] font-semibold text-ink">{s.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-center sm:grid-cols-3">
            {[
              { v: "11", l: "connected stages" },
              { v: "2", l: "built-in feedback loops" },
              { v: "1", l: "intelligence layer throughout" },
            ].map((m) => (
              <div key={m.l} className="rounded-xl border border-line bg-soft px-4 py-4">
                <span className="text-xl font-semibold tracking-tight text-ink">{m.v}</span>
                <span className="block text-[12px] text-slate-500">{m.l}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
