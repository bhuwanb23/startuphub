import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { AuthShell } from "./components/auth-card";

export function LoginView() {
  return (
    <AuthShell
      title="Welcome back to the ecosystem."
      lead="Sign in to pick up exactly where you left off — your deals, filings, cohorts and milestones are all here."
      footer={
        <>
          New to StartupHub?{" "}
          <Link href="/register" className="font-semibold text-accent hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form className="max-w-md space-y-3.5" action="#">
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] font-semibold text-ink">Email</span>
          <input
            type="email"
            placeholder="you@company.com"
            className="h-11 w-full rounded-lg border border-line bg-white px-4 text-[14px] font-medium text-ink shadow-card outline-none transition-colors placeholder:text-slate-400 focus:border-accent/50"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center justify-between text-[12.5px] font-semibold text-ink">
            Password
            <Link href="#" className="text-[12px] font-semibold text-accent hover:underline">
              Forgot password?
            </Link>
          </span>
          <input
            type="password"
            placeholder="••••••••"
            className="h-11 w-full rounded-lg border border-line bg-white px-4 text-[14px] font-medium text-ink shadow-card outline-none transition-colors placeholder:text-slate-400 focus:border-accent/50"
          />
        </label>
        <ButtonLink href="/founder" className="w-full">
          Sign in
        </ButtonLink>
      </form>
    </AuthShell>
  );
}

export function RegisterView() {
  return (
    <AuthShell
      title="Start your journey in the ecosystem."
      lead="One account, every workspace — founder today, mentor tomorrow. Free to start, upgrade when you do."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-accent hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form className="max-w-md space-y-3.5" action="#">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-semibold text-ink">Full name</span>
            <input
              type="text"
              placeholder="Ravi Sharma"
              className="h-11 w-full rounded-lg border border-line bg-white px-4 text-[14px] font-medium text-ink shadow-card outline-none transition-colors placeholder:text-slate-400 focus:border-accent/50"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-semibold text-ink">Organization</span>
            <input
              type="text"
              placeholder="Lumen AI"
              className="h-11 w-full rounded-lg border border-line bg-white px-4 text-[14px] font-medium text-ink shadow-card outline-none transition-colors placeholder:text-slate-400 focus:border-accent/50"
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] font-semibold text-ink">I am joining as</span>
          <select
            className="h-11 w-full appearance-none rounded-lg border border-line bg-white px-4 text-[14px] font-medium text-ink shadow-card outline-none transition-colors focus:border-accent/50"
            defaultValue="founder"
          >
            <option value="founder">Founder</option>
            <option value="mentor">Mentor</option>
            <option value="ipr-expert">IPR Expert</option>
            <option value="incubator">Incubator</option>
            <option value="investor">Investor</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] font-semibold text-ink">Email</span>
          <input
            type="email"
            placeholder="you@company.com"
            className="h-11 w-full rounded-lg border border-line bg-white px-4 text-[14px] font-medium text-ink shadow-card outline-none transition-colors placeholder:text-slate-400 focus:border-accent/50"
          />
        </label>
        <ButtonLink href="/founder" className="w-full" arrow>
          Create account
        </ButtonLink>
      </form>
    </AuthShell>
  );
}
