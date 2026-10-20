import { ArrowRight, LockKeyhole } from "lucide-react";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { DEMO_WORKSPACES } from "./constants/roles";

export function LoginView() {
  return (
    <section className="bg-soft pb-24 pt-28 sm:pt-36">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* left — form */}
          <Reveal>
            <div>
              <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Welcome back
              </p>
              <h1 className="mt-4 text-balance text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
                Pick up where your ecosystem left off.
              </h1>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-500">
                One account, every role you play — founder, mentor, expert,
                incubator or investor.
              </p>

              <form className="mt-8 max-w-md space-y-3.5" action="/founder">
                <label className="block">
                  <span className="mb-1.5 block text-[12.5px] font-medium text-slate-600">
                    Work email
                  </span>
                  <input
                    type="email"
                    defaultValue="ravi@lumen.ai"
                    className="h-11 w-full rounded-lg border border-line bg-white px-3.5 text-[14px] text-ink placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-100"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 flex items-center justify-between text-[12.5px] font-medium text-slate-600">
                    Password
                    <a href="#" className="text-[12px] font-semibold text-accent hover:text-accent-deep">
                      Forgot?
                    </a>
                  </span>
                  <input
                    type="password"
                    defaultValue="demo-password"
                    className="h-11 w-full rounded-lg border border-line bg-white px-3.5 text-[14px] text-ink focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-100"
                  />
                </label>
                <button
                  type="submit"
                  className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent text-[14.5px] font-semibold text-white shadow-[0_1px_2px_rgba(49,87,232,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] transition-colors hover:bg-accent-deep"
                >
                  <LockKeyhole className="h-4 w-4" />
                  Sign in
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
                <p className="pt-1 text-center text-[12.5px] text-slate-400">
                  New to StartupHub?{" "}
                  <a href="/register" className="font-semibold text-accent hover:text-accent-deep">
                    Create your account
                  </a>
                </p>
              </form>
            </div>
          </Reveal>

          {/* right — demo workspaces */}
          <Reveal delay={140}>
            <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Demo build — enter a workspace
              </p>
              <div className="mt-4 space-y-2.5">
                {DEMO_WORKSPACES.map((w) => {
                  const Icon = w.icon;
                  return (
                    <a
                      key={w.role}
                      href={w.href}
                      className="group flex items-center gap-3.5 rounded-xl border border-line bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-card"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft transition-colors duration-300 group-hover:bg-accent">
                        <Icon className="h-[18px] w-[18px] text-accent transition-colors duration-300 group-hover:text-white" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14px] font-semibold text-ink">
                          {w.role}
                          <span className="ml-2 text-[11.5px] font-medium text-slate-400">
                            {w.name} · {w.org}
                          </span>
                        </span>
                        <span className="block truncate text-[12px] text-slate-400">
                          {w.blurb}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
