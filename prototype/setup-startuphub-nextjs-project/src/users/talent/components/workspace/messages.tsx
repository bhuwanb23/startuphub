"use client";

import { useState, type FormEvent } from "react";
import { SendHorizonal } from "lucide-react";
import { Avatar, PageIntro, Panel } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { useSelection } from "../../hooks/use-selection";
import { CONVERSATIONS, type Message } from "../../constants/workspace-data";

export function TalentMessages() {
  const { selected, select, isSelected } = useSelection(CONVERSATIONS[0].id);
  const [threads, setThreads] = useState(() =>
    Object.fromEntries(CONVERSATIONS.map((c) => [c.id, c.messages])),
  );
  const [read, setRead] = useState<Record<string, number>>({});
  const [draft, setDraft] = useState("");

  const conversation = CONVERSATIONS.find((c) => c.id === selected)!;
  const messages: Message[] = threads[selected] ?? [];

  const send = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setThreads((t) => ({
      ...t,
      [selected]: [
        ...(t[selected] ?? []),
        { from: "Zoya Khan", text, time: "Now", mine: true },
      ],
    }));
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <PageIntro
        title="Messages"
        description="Startups, clients, recruiters and project teams — one inbox for every professional conversation."
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Panel title="Inbox" bodyClassName="px-0 py-0 sm:px-0">
          <ul className="divide-y divide-line">
            {CONVERSATIONS.map((c) => {
              const unread = read[c.id] ?? c.unread;
              const last = (threads[c.id] ?? []).slice(-1)[0];
              return (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      select(c.id);
                      setRead((r) => ({ ...r, [c.id]: 0 }));
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 px-4.5 py-3.5 text-left transition-colors sm:px-5",
                      isSelected(c.id) ? "bg-accent-soft/60" : "hover:bg-soft",
                    )}
                  >
                    <Avatar name={c.name} className={isSelected(c.id) ? "bg-accent" : undefined} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-[13px] font-semibold text-ink">{c.name}</span>
                        <span className="shrink-0 text-[10.5px] text-slate-400">{c.time}</span>
                      </span>
                      <span className="block truncate text-[11.5px] text-slate-400">
                        {last ? last.text : c.preview}
                      </span>
                    </span>
                    {unread > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-white">
                        {unread}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel
          title={conversation.name}
          action={<span className="text-[12px] text-slate-400">{conversation.role}</span>}
          bodyClassName="flex min-h-[420px] flex-col"
        >
          <ol className="flex-1 space-y-3.5">
            {messages.map((m, i) => (
              <li key={i} className={cn("flex", m.mine ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed",
                    m.mine
                      ? "rounded-br-md bg-accent text-white"
                      : "rounded-bl-md bg-soft text-slate-700",
                  )}
                >
                  {!m.mine && (
                    <p className="mb-0.5 text-[11px] font-semibold text-slate-400">{m.from}</p>
                  )}
                  <p>{m.text}</p>
                  <p className={cn("mt-1 text-[10px]", m.mine ? "text-white/70" : "text-slate-400")}>
                    {m.time}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <form onSubmit={send} className="mt-5 flex items-center gap-2 border-t border-line pt-4">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Reply to ${conversation.name}…`}
              className="h-10 flex-1 rounded-lg border border-line bg-white px-3.5 text-[13px] text-ink placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-100"
            />
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep disabled:opacity-50"
              disabled={!draft.trim()}
            >
              <SendHorizonal className="h-4 w-4" />
              Send
            </button>
          </form>
        </Panel>
      </div>
    </div>
  );
}
