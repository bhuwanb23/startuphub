import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { DEMO_WORKSPACES } from "./constants/roles";

export function RegisterView() {
  return (
    <section className="bg-soft pb-24 pt-28 sm:pt-36">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Join StartupHub
          </p>
          <h1 className="mt-4 text-balance text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            Start from the role you play.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate-500">
            Your workspace adapts to your role — journeys for founders, deal
            flow for investors, programs for incubators.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_WORKSPACES.map((w, i) => {
            const Icon = w.icon;
            return (
              <Reveal key={w.role} delay={i * 70}>
                <a
                  href={w.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-lift"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft transition-colors duration-300 group-hover:bg-accent">
                    <Icon className="h-5 w-5 text-accent transition-colors duration-300 group-hover:text-white" />
                  </span>
                  <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-ink">
                    {w.role}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-slate-500">
                    {w.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
                    Continue
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={320}>
          <p className="mt-10 text-center text-[12.5px] text-slate-400">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-accent hover:text-accent-deep">
              Sign in
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
