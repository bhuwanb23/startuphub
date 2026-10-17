import { ArrowUpRight, Download } from "lucide-react";
import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const snapshot = [
  { l: "Market size", v: "$42.8B" },
  { l: "Growth (YoY)", v: "+18.4%" },
  { l: "Competitors tracked", v: "23" },
  { l: "Your whitespace score", v: "81" },
];

const competitors = [
  { name: "AgriVue Global", overlap: 78, notes: "US pricing, no vernacular — you win tier-2 India" },
  { name: "CropSense Labs", overlap: 71, notes: "Strong on hardware, weak on software economics" },
  { name: "TerraLens", overlap: 64, notes: "Data reseller model — margin cap evident at scale" },
];

const trends = [
  { t: "Precision-farming subsidy wave opens gov channel", pct: 86 },
  { t: "Satellite data cost dropping 22% YoY", pct: 74 },
  { t: "Insurance-linked agronomy becoming the buyer's ask", pct: 62 },
];

const reports = [
  { title: "Indian AgriTech Operating Map 2026", meta: "Market research · 40 min", unread: true },
  { title: "DeepTech Funding Outlook", meta: "Sector deep-dive · Feb 2026", unread: false },
  { title: "Vernacular Tech Adoption Index", meta: "Quarterly index · Mar 2026", unread: true },
];

export function Market() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Market Intelligence"
        desc="Your sector, sized and watched — the same signals investors use to diligence you."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"><Download className="h-3.5 w-3.5" /> Export view</button>}
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {snapshot.map((s) => (
          <Card key={s.l} pad={false}>
            <div className="p-5">
              <p className="text-[11.5px] font-medium text-slate-400">{s.l}</p>
              <p className="mt-1.5 text-xl font-semibold tracking-tight text-ink tabular-nums">{s.v}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Competitor watch" action={<Badge>3 direct</Badge>} pad={false}>
          <ul className="divide-y divide-line">
            {competitors.map((c) => (
              <li key={c.name} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[14px] font-semibold text-ink">{c.name}</p>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-600">{c.overlap}% overlap</span>
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{c.notes}</p>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-5">
          <Card title="Sector signals this month">
            <ul className="space-y-4">
              {trends.map((t) => (
                <li key={t.t}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[13px] font-medium leading-snug text-ink">{t.t}</p>
                    <span className="text-[12px] font-bold tabular-nums text-accent">{t.pct}</span>
                  </div>
                  <Progress value={t.pct} className="mt-2" />
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Saved & recommended reports" pad={false}>
            <ul className="divide-y divide-line">
              {reports.map((r) => (
                <li key={r.title} className="group flex cursor-pointer items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-slate-50">
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-medium text-ink group-hover:text-accent">{r.title}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{r.meta}</p>
                  </div>
                  {r.unread ? (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
