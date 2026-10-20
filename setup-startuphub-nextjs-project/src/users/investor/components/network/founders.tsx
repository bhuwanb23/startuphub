import { Handshake, Send } from "lucide-react";
import { Avatar, PageIntro } from "@/components/app/widgets";
import { FOUNDERS } from "../../constants/dashboard-data";

export function NetworkFounders() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Founder network"
        description="Founders matched to your thesis through the StartupHub graph — warm paths via incubators, mentors and co-investors."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Handshake className="h-4 w-4" /> Request batch intro
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {FOUNDERS.map((f) => (
          <article
            key={f.startup}
            className="rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar name={f.name} className="h-10 w-10 text-[12px]" />
                <div>
                  <h3 className="text-[14.5px] font-semibold tracking-[-0.01em] text-ink">
                    {f.name}
                  </h3>
                  <p className="text-[12px] text-slate-400">{f.startup}</p>
                </div>
              </div>
              <span className="rounded-full bg-accent-soft px-2 py-1 text-[11px] font-bold text-accent-deep">
                {f.match} fit
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="rounded-full border border-line bg-soft px-2.5 py-1 text-[11.5px] font-medium text-slate-600">
                {f.sector}
              </span>
              <span className="rounded-full border border-line bg-soft px-2.5 py-1 text-[11.5px] font-medium text-slate-600">
                {f.stage}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="text-[12px] text-slate-400">
                Raising{" "}
                <span className="font-semibold text-ink">{f.raising}</span>
              </span>
              <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-[12px] font-semibold text-ink transition-colors hover:border-accent-200 hover:bg-accent-soft hover:text-accent-deep">
                <Send className="h-3.5 w-3.5" /> Intro
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-4 text-[13px] leading-relaxed text-slate-500">
        Warm-path note: <span className="font-semibold text-ink">4 of 6</span>{" "}
        founders above share a connection through Nexus Labs or your mentor
        bench — intros via a shared node convert <span className="font-semibold text-ink">3.2×</span> better than cold outreach.
      </p>
    </div>
  );
}
