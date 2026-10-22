"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Send, Sparkles, User } from "lucide-react";
import { healthScore, projectedHealth } from "@/users/startup/constants/ipr-data";

const starters = [
  "What should I fix before the Northgate partner meeting?",
  "Analyze my runway against the hiring plan",
  "Which grants am I leaving on the table?",
  "How do I close the IP health gap this quarter?",
];

const demoAnswers: [RegExp, string][] = [
  [/northgate|meeting|partner/i, "Three things before Thursday: (1) attach both pilot testimonials to the data room — their team flagged reference customers; (2) the trademark for 'Field Alert' is still unfiled and they'll ask; (3) rehearse the per-acre unit economics slide — your ₹3.2 cost is your strongest argument."],
  [/runway|hiring|burn/i, "You're at 11.2 months with the current ₹38L/mo burn. The hiring plan (2 agronomy + 1 ML eng) adds ₹5.4L/mo, pulling runway to ~9.4 months. Safe if Series B conversations start by August; the GPU grant expiry in 18 days changes this math most — use it before it lapses."],
  [/grant/i, "Two live matches: BIRAC BioIgnite (₹50L, Apr 30) fits your agronomy models, and the Karnataka Startup Window (up to ₹30L) opens Apr 15 — your 14-state footprint qualifies for the max slab. Combined, that's a month and a half of runway with zero dilution."],
  [/ip|ipr|trademark|patent/i, `Your IP health is ${healthScore} — the weakest dimension. Closing the gap this quarter: (1) file the 'Field Alert' trademark before next week's launch, (2) finish patent claims v3 — you're blocking your own complete-spec window, (3) collect the 2 missing contractor IP assignments. That takes you to ~${projectedHealth}. Meera can review Thursday.`],
];

type Msg = { role: "user" | "assistant"; text: string };

export function Copilot() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Good morning, Ravi. I'm synced to Lumen AI's live state — 11.2 months runway, readiness 78, claims review overdue. What do you want to work on first?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const answer = (q: string) => {
    const hit = demoAnswers.find(([re]) => re.test(q));
    return hit
      ? hit[1]
      : "I've noted that against your startup context. In the full platform I answer with live data — grants, IPR, funding and growth — synced continuously. For now, try the suggested prompts on the left of this input; those are wired with real answers from your workspace state.";
  };

  const submit = (q: string) => {
    const text = q.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: answer(text) }]);
      setTyping(false);
    }, 900);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(input);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col">
      <div className="flex items-center gap-3 border-b border-line pb-4">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white">
          <Sparkles className="h-4.5 w-4.5" />
        </span>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-ink">Startup Copilot</h1>
          <p className="text-[12px] text-slate-400">Synced to Lumen AI · 6 data sources · updated 8 min ago</p>
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
            <div key={i} className="flex gap-3 justify-end">
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
            <button
              key={s}
              onClick={() => submit(s)}
              className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-[12.5px] font-medium text-slate-600 transition-colors hover:border-accent/40 hover:text-accent"
            >
              {s}
              <ArrowUpRight className="h-3 w-3" />
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex gap-2.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your startup…"
            className="h-12 flex-1 rounded-xl border border-line bg-white px-4 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
          />
          <button
            type="submit"
            className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-deep"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-2.5 text-center text-[11px] text-slate-300">
          Demo Copilot — full AI-grade answers with synced data at platform launch.
        </p>
      </div>
    </div>
  );
}
