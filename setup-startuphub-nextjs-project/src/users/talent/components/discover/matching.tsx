import { Send, Sparkles } from "lucide-react";
import { Avatar, Bar, PageIntro } from "@/components/app/widgets";
import { STARTUP_MATCHES } from "../../constants/discover-data";

function ScoreRing({ score }: { score: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-16 w-16">
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#E5E7EB" strokeWidth="5" />
        <circle
          cx="32" cy="32" r={r} fill="none" stroke="#3157E8" strokeWidth="5"
          strokeLinecap="round" strokeDasharray={c}
          strokeDashoffset={c - (score / 100) * c}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[15px] font-bold text-ink">
        {score}
      </span>
    </div>
  );
}

const DIMS = [
  ["skill", "Skill fit"],
  ["experience", "Experience"],
  ["availability", "Availability"],
] as const;

export function StartupMatching() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Startup matching"
        description="Every score comes with an explanation — what matched, why, and what to say in your first message."
        action={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-semibold text-accent-deep">
            <Sparkles className="h-3.5 w-3.5" /> Re-scored nightly
          </span>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {STARTUP_MATCHES.map((m) => (
          <article
            key={m.startup}
            className="rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <Avatar name={m.startup} className="h-11 w-11 text-[13px]" />
                <div>
                  <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-ink">{m.startup}</h3>
                  <p className="mt-0.5 text-[12px] text-slate-400">{m.sector} · {m.stage}</p>
                  <p className="text-[12.5px] font-medium text-slate-600">{m.role}</p>
                </div>
              </div>
              <ScoreRing score={m.score} />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-4">
              {DIMS.map(([key, label]) => (
                <div key={key}>
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">{label}</span>
                    <span className="font-bold text-ink">{m.dims[key]}</span>
                  </div>
                  <Bar value={m.dims[key]} />
                </div>
              ))}
            </div>

            <ul className="mt-4 space-y-1.5">
              {m.reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2 text-[12.5px] leading-snug text-slate-600">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {reason}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
              <button className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
                <Send className="h-3.5 w-3.5" /> Apply with match brief
              </button>
              <button className="inline-flex h-9 items-center justify-center rounded-lg border border-line bg-white px-3.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft">
                View startup
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-4 text-[13px] leading-relaxed text-slate-500">
        <span className="font-semibold text-ink">Why your scores moved:</span>{" "}
        adding the verified GenAI skill lifted you{" "}
        <span className="font-semibold text-ink">+6 fit points</span> on AI
        roles this week. Keep assessments current — verification decays after 12 months.
      </p>
    </div>
  );
}
