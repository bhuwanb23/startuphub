import { Building2, FileText, Lock, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import type { Startup } from "@/views/explore/startups/constants/startups";
import { cn } from "@/lib/utils";

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Users;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function DetailSide({ s }: { s: Startup }) {
  return (
    <div className="space-y-5">
      <Reveal>
        <Card icon={Building2} title="Incubated at">
          <p className="text-[15px] font-semibold text-ink">{s.incubator}</p>
          <p className="mt-1 text-[13px] text-slate-400">
            Verified program partner · cohort verified
          </p>
        </Card>
      </Reveal>

      <Reveal delay={0.06}>
        <Card icon={ShieldCheck} title={`IP Portfolio (${s.ipr.length})`}>
          {s.ipr.length === 0 ? (
            <p className="text-sm text-slate-400">No public filings yet.</p>
          ) : (
            <ul className="space-y-3">
              {s.ipr.map((ip) => (
                <li key={ip.title} className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300" />
                    <div>
                      <p className="text-[13.5px] font-medium leading-snug text-ink">{ip.title}</p>
                      <p className="text-[12px] text-slate-400">{ip.type}</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold",
                      ip.status === "Registered"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {ip.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </Reveal>

      <Reveal delay={0.1}>
        <Card icon={Users} title={`Team (${s.team.length})`}>
          <ul className="space-y-3">
            {s.team.map((m) => (
              <li key={m.name} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[12px] font-bold text-accent">
                  {m.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">{m.name}</p>
                  <p className="text-[12px] text-slate-400">{m.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>

      {/* locked private data */}
      <Reveal delay={0.14}>
        <div className="relative overflow-hidden rounded-2xl border border-line bg-white">
          <div className="select-none p-6 blur-[5px]" aria-hidden="true">
            <p className="text-sm font-semibold text-ink">Financials &amp; Documents</p>
            <div className="mt-3 space-y-2">
              <div className="h-3 w-3/4 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-200" />
              <div className="h-3 w-2/3 rounded bg-slate-200" />
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/55 p-6 text-center">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-slate-400 shadow-sm">
              <Lock className="h-4 w-4" />
            </span>
            <p className="mt-3 text-[13.5px] font-semibold text-ink">
              Financials, documents &amp; contact
            </p>
            <p className="mt-1 text-[12px] text-slate-500">
              Unlock after login and founder approval.
            </p>
            <Link
              href="/login"
              className="mt-4 rounded-[9px] bg-accent px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              Log in to view
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
