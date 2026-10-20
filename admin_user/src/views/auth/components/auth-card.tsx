import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui";
import { WORKSPACE_ROLES } from "../constants/roles";

export function AuthShell({
  title,
  lead,
  children,
  footer,
}: {
  title: string;
  lead: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-28">
      <div className="absolute inset-0 -z-10 bg-nodegrid" aria-hidden />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Logo className="h-10 w-10" />
            <h1 className="mt-8 text-balance text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
              {title}
            </h1>
            <p className="mt-4 max-w-md text-pretty text-[16px] leading-relaxed text-slate-500">
              {lead}
            </p>
            <div className="mt-8">{children}</div>
            <p className="mt-8 text-[13.5px] font-medium text-slate-500">{footer}</p>
          </div>

          <div className="hidden lg:block">
            <WorkspacePicker />
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkspacePicker() {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-lift">
      <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        One account, five workspaces
      </p>
      <div className="mt-4 space-y-1">
        {WORKSPACE_ROLES.map((role) => {
          const Icon = role.icon;
          return (
            <Link
              key={role.slug}
              href={role.href}
              className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-soft"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="h-4.5 w-4.5" strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold text-ink">
                  {role.name}
                </span>
                <span className="block truncate text-[12.5px] text-slate-500">
                  {role.desc}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
