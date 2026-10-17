"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Send, Sparkles, User } from "lucide-react";

const starters = [
  "Which 3 startups need me this week?",
  "Give me Cohort VI graduation blockers",
  "How did Cohort V compare at week 14?",
  "Draft the April funder update highlights",
];

const demo: [RegExp, string][] = [
  [/which 3|need me|attention/i, "In priority order: (1) FreshChain — conflict is 11 days old, past the threshold where mediation still works; (2) GridSense — 3.4 months runway, bridge plan needed by Friday; (3) FinEdge — strong progress but two investor intros are waiting on your calendar link. Everything else is green."],
  [/blocker|demo day|graduation/i, "Cohort VI blockers: (1) 2 decks still unreviewed — assign Rohan today; (2) FreshChain's participation is a judgment call — resolve the mediation first; (3) Data-room completeness is 74% vs the 80% Northgate expects for demo introductions."],
  [/cohort v|compare|week 14/i, "Cohort V at week 14: health 74, milestones 79% vs Cohort VI's 78 health / 86% milestones. The difference is mentor hours (Cohort VI averaged 44h vs 31h). Cohort V graduated 87% — you're tracking ahead."],
  [/funder|update|april/i, "Draft highlights for the funder deck: 12 programs run · 38 new startups · ₹41 Cr raised in Q1 · 212 patents tracked · survival at 84% vs 71% national baseline · 3 interventions succeeded, 1 ongoing. Use 'outcome per program rupee' as the headline metric."],
];

type Msg = { role: "user" | "assistant"; text: string };

export function IncubatorCopilot() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Meera — I'm synced to StartupHub Labs: 3 active programs, 240 startups, 7 at risk, Demo Day in 20 days. What are we deciding today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const submit = (q: string) => {
    const text = q.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    const hit = demo.find(([re]) => re.test(text));
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: hit
            ? hit[1]
            : "In the full platform I answer with live cohort, funding and mentor data. Try the suggested prompts — they're wired with real program state.",
        },
      ]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col">
      <div className="flex items-center gap-3 border-b border-line pb-4">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white">
          <Sparkles className="h-4.5 w-4.5" />
        </span>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-ink">Program Copilot</h1>
          <p className="text-[12px] text-slate-400">Synced to StartupHub Labs · 240 startups · updated 5 min ago</p>
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto py-5">
        {messages.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i} className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <div className="max-w-2xl rounded-2xl rounded-tl-none border border-line bg-white px-4.5 py-3.5 text-[13.5px] leading-relaxed text-slate-600">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end gap-3">
              <div className="max-w-2xl rounded-2xl rounded-tr-none bg-accent px-4.5 py-3.5 text-[13.5px] leading-relaxed text-white">
                {m.text}
              </div>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink text-white">
                <User className="h-3.5 w-3.5" />
              </span>
            </div>
          )
        )}
        {typing && (
          <div className="flex gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-none border border-line bg-white px-4.5 py-4">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent/50" style={{ animationDelay: `${d * 0.18}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-line pt-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {starters.map((s) => (
            <button key={s} onClick={() => submit(s)} className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-[12.5px] font-medium text-slate-600 transition-colors hover:border-accent/40 hover:text-accent">
              {s}
              <ArrowUpRight className="h-3 w-3" />
            </button>
          ))}
        </div>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); submit(input); }} className="flex gap-2.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about programs, startups, outcomes…"
            className="h-12 flex-1 rounded-xl border border-line bg-white px-4 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
          />
          <button type="submit" className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-deep" aria-label="Send">
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-2.5 text-center text-[11px] text-slate-300">Demo Copilot — full program intelligence at platform launch.</p>
      </div>
    </div>
  );
}
