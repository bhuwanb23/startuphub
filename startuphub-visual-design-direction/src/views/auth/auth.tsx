"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ArrowGlyph, Container, Logo } from "@/components/ui";
import { cn } from "@/lib/utils";

const roles = [
  "Founder / Startup",
  "Incubator",
  "Mentor / Expert",
  "IPR Expert",
  "Investor",
  "Government / Institution",
  "Resource Provider",
  "Corporate",
  "University / Research",
  "Talent / Professional",
];

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

const promises = [
  "One profile unlocks every directory, program and match",
  "Role-specific dashboard shaped around what you do",
  "Your sensitive data stays locked until you share it",
];

function AuthShell({
  mode,
  children,
}: {
  mode: "login" | "register";
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-soft pb-24 pt-28">
      <div
        aria-hidden="true"
        className="bg-nodegrid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black_25%,transparent)]"
      />
      <Container className="relative">
        <div className="mx-auto grid max-w-4xl overflow-hidden rounded-3xl border border-line bg-white shadow-[0_40px_80px_-40px_rgba(11,18,32,0.3)] lg:grid-cols-[1fr_1.1fr]">
          {/* brand panel */}
          <div className="bg-nodegrid relative hidden flex-col justify-between bg-ink p-9 text-white lg:flex">
            <div className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span className="text-[15px] font-bold tracking-tight">
                Startup<span className="text-accent">Hub</span>
              </span>
            </div>
            <div>
              <p className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-[1.15] tracking-tight">
                {mode === "login"
                  ? "Welcome back to the ecosystem."
                  : "One account. The entire ecosystem."}
              </p>
              <ul className="mt-6 space-y-3">
                {promises.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[13.5px] text-slate-300">
                    <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-accent text-white">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[12px] text-slate-500">
              10,000+ startups · 480+ investors · 2,800+ mentors
            </p>
          </div>

          {/* form panel */}
          <div className="p-7 sm:p-10 md:p-12">{children}</div>
        </div>
      </Container>
    </section>
  );
}

const inputCls =
  "h-11 w-full rounded-[10px] border border-line bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15";

export function AuthView({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";
  const [role, setRole] = useState(roles[0]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <AuthShell mode={mode}>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">
        {isLogin ? "Log in to StartupHub" : "Create your account"}
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        {isLogin ? (
          <>
            New here?{" "}
            <Link href="/register" className="font-semibold text-accent hover:underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Log in
            </Link>
          </>
        )}
      </p>

      {!isLogin && (
        <div className="mt-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            I&apos;m joining as
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all",
                  role === r
                    ? "border-accent bg-accent text-white"
                    : "border-line bg-white text-slate-600 hover:border-slate-300"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        className="mt-7 flex h-11 w-full items-center justify-center gap-2.5 rounded-[10px] border border-line bg-white text-sm font-semibold text-ink transition-colors hover:border-slate-300 hover:bg-slate-50"
      >
        <GoogleIcon className="h-4 w-4" />
        Continue with Google
      </button>
      <div className="my-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-300">
        <span className="h-px flex-1 bg-line" />
        or with email
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="mb-1.5 block text-[13px] font-medium text-slate-600">
              Full name
            </label>
            <input id="name" required placeholder="Ananya Rao" className={inputCls} />
          </div>
        )}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-slate-600">
            Work email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder={role === roles[0] ? "ananya@lumenai.com" : "you@company.com"}
            className={inputCls}
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="block text-[13px] font-medium text-slate-600">
              Password
            </label>
            {isLogin && (
              <span className="cursor-pointer text-[12px] font-semibold text-accent hover:underline">
                Forgot password?
              </span>
            )}
          </div>
          <input
            id="password"
            type="password"
            required
            placeholder={isLogin ? "Your password" : "8+ characters"}
            className={inputCls}
          />
        </div>

        <button
          type="submit"
          className="group/btn flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-accent text-sm font-semibold text-white shadow-[0_1px_2px_rgba(11,18,32,0.12),inset_0_1px_0_rgba(255,255,255,0.16)] transition-colors hover:bg-accent-deep"
        >
          {isLogin ? "Log in" : `Continue — ${role}`}
          <ArrowGlyph className="h-3.5 w-3.5" />
          <ArrowRight className="hidden" aria-hidden="true" />
        </button>
      </form>

      <p className="mt-6 rounded-xl border border-line bg-soft px-4 py-3 text-center text-[12px] text-slate-400">
        Demo build — full authentication activates with the platform launch.
      </p>
    </AuthShell>
  );
}
