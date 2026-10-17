import { Plus, Share2 } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

const decks = [
  { name: "Series A — Main Deck", version: "v4.2", updated: "2h ago", views: 14, score: 86, tone: "good" as const },
  { name: "5-min Demo Day Cut", version: "v1.1", updated: "1w ago", views: 0, score: 79, tone: "accent" as const },
  { name: "Government Program Deck", version: "v2.0", updated: "1mo ago", views: 3, score: 74, tone: "default" as const },
];

const aiFeedback = [
  { slide: "Slide 4 — Problem", note: "Lead with the 30–40% yield loss stat; it has 4× the dwell time of your other openers.", score: 92 },
  { slide: "Slide 9 — Unit economics", note: "Add cost-per-acre trend line; Northgate spent 40s here but left without the trend story.", score: 68 },
  { slide: "Slide 12 — Ask", note: "₹8Cr with 18-month runway — tie it explicitly to 3 milestones, not rounds.", score: 81 },
];

export function PitchDeck() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Pitch Deck"
        desc="Versions, views and AI feedback on what actually lands with investors."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> New deck</button>}
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <Card title="My decks" pad={false}>
          <ul className="divide-y divide-line">
            {decks.map((d) => (
              <li key={d.name} className="flex items-center gap-4 px-5 py-4">
                <div className="grid h-10 w-14 shrink-0 place-items-center rounded-lg bg-accent-soft text-[10px] font-bold text-accent">DECK</div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">{d.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">{d.version} · {d.updated} · {d.views} views</p>
                </div>
                <Badge tone={d.tone === "good" ? "good" : d.tone === "accent" ? "accent" : "default"}>{d.score}</Badge>
                <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Share">
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="AI pitch feedback — main deck">
          <ul className="space-y-4">
            {aiFeedback.map((f) => (
              <li key={f.slide}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-semibold text-ink">{f.slide}</p>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${f.score < 75 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>{f.score}</span>
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{f.note}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
