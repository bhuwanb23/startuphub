import { IndianRupee, MessagesSquare, Scale, Send } from "lucide-react";
import { PageIntro, Panel, PanelLink, StatCard } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import {
  ACTIVE_LICENSES,
  AVAILABLE_IP,
  LICENSE_REQUESTS,
  LICENSING_STATS,
} from "../../constants/ip-data";

const STAT_ICONS = [Scale, MessagesSquare, IndianRupee, Send] as const;

const REQUEST_TONE: Record<string, string> = {
  Negotiation: "bg-amber-50 text-amber-700",
  "Term sheet sent": "bg-accent-soft text-accent-deep",
  "Due diligence": "bg-sky-50 text-sky-700",
  "NDA signed": "bg-slate-100 text-slate-600",
};

export function IpLicensing() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="IP licensing"
        description="Available IP, incoming requests and the active license book — royalty terms, renewals and revenue in one place."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Send className="h-4 w-4" /> Create opportunity
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {LICENSING_STATS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} hint={s.hint} icon={STAT_ICONS[i]} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1.5fr]">
        {/* available IP */}
        <Panel title="Available for licensing" action={<PanelLink href="/university/commercialization/showcase">Showcase</PanelLink>}>
          <ul className="space-y-3">
            {AVAILABLE_IP.map((ip) => (
              <li key={ip.tech} className="rounded-lg border border-line bg-accent-mist px-4 py-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13.5px] font-semibold text-ink">{ip.tech}</span>
                  <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-white">{ip.trl}</span>
                </div>
                <p className="mt-1 text-[12px] text-slate-500">{ip.field}</p>
                <p className="mt-2 border-t border-line/70 pt-2 text-[12px] font-semibold text-accent-deep">
                  Ask · {ip.ask}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-line pt-4">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-400">
              License requests
            </h4>
            <ul className="mt-2.5 space-y-2.5">
              {LICENSE_REQUESTS.map((r) => (
                <li key={r.org} className="flex items-center justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium text-ink">{r.org}</span>
                    <span className="block text-[11.5px] text-slate-400">{r.tech} · {r.type}</span>
                  </span>
                  <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold", REQUEST_TONE[r.status])}>
                    {r.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* active licenses */}
        <Panel
          title="Active license book"
          action={<span className="text-[12px] text-slate-400">FY royalty ₹2.4 Cr</span>}
          bodyClassName="px-0 py-0 sm:px-0"
        >
          <ul className="divide-y divide-line">
            {ACTIVE_LICENSES.map((l) => (
              <li key={l.licensee} className="px-4.5 py-4 transition-colors hover:bg-soft sm:px-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold text-ink">{l.licensee}</p>
                    <p className="mt-0.5 text-[12px] text-slate-400">{l.tech}</p>
                  </div>
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10.5px] font-semibold text-accent-deep">
                    {l.type}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[12px]">
                  <span className="font-semibold text-ink">{l.royalty}</span>
                  <span className="text-slate-400">renewal {l.renewal}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-line px-4.5 py-3.5 sm:px-5">
            <p className="text-[12px] leading-relaxed text-slate-500">
              Two renewals fall inside Q4 — Terraforma Corp (€60K + 4%) is the
              larger. Start conversation 90 days out.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
