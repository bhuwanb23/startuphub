import { FileText, Plus, TriangleAlert } from "lucide-react";
import { Badge, Card, GaugeRing, PageHeader, Progress, Stat } from "@/components/app/widgets";

export function Ipr() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="IPR & Legal"
        desc="Your moat, managed like a portfolio — filings, deadlines and risks in one place."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> New filing</button>}
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat icon={FileText} label="IP assets" value="3" delta="1 pending review" tone="default" />
        <Stat icon={FileText} label="Filings in progress" value="1" delta="Claims v3" tone="warn" />
        <Stat icon={FileText} label="Upcoming deadlines" value="2" delta="Next: Apr 09" tone="default" />
        <Stat icon={FileText} label="IP health score" value="66" delta="-4 this quarter" tone="warn" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <Card title="Patent management" pad={false}>
            <ul className="divide-y divide-line">
              {[
                { title: "Multispectral crop stress inference", status: "Filed", date: "Nov 2024", note: "Claims v3 under review", tone: "accent" as const },
                { title: "Per-acre yield attribution method", status: "Filed", date: "Feb 2025", note: "FER response due Jun", tone: "accent" as const },
                { title: "Drone-edge preprocessing pipeline", status: "Potential", date: "—", note: "Patentability search clear — file", tone: "warn" as const },
              ].map((p) => (
                <li key={p.title} className="flex items-center gap-4 px-5 py-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-semibold text-ink">{p.title}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">{p.note} · {p.date}</p>
                  </div>
                  <Badge tone={p.tone === "warn" ? "warn" : "accent"}>{p.status}</Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Trademark & copyright" pad={false}>
            <ul className="divide-y divide-line">
              {[
                { t: "“Lumen AI” wordmark", k: "Trademark", s: "Registered", tone: "good" as const, exp: "Renewal 2034" },
                { t: " “Field Alert” mark (v2)", k: "Trademark", s: "Not filed", tone: "bad" as const, exp: "Launch in 9 days — file now" },
                { t: "Platform source code", k: "Copyright", s: "Registered", tone: "good" as const, exp: "Auto · literary work" },
              ].map((x) => (
                <li key={x.t} className="flex items-center justify-between gap-3 px-5 py-4">
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-medium text-ink">{x.t}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">{x.k} · {x.exp}</p>
                  </div>
                  <Badge tone={x.tone === "good" ? "good" : "bad"}>{x.s}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-5">
          <Card title="IP portfolio strength">
            <div className="flex items-center gap-4">
              <GaugeRing value={66} size={80} label="score" />
              <div className="text-[12.5px] text-slate-500">
                <p className="font-semibold text-ink">Moderate coverage</p>
                <p className="mt-1 leading-relaxed">Strong patents, but the unprotected v2 brand and missing design filings drag it down.</p>
              </div>
            </div>
            <div className="mt-4 space-y-2.5 border-t border-line pt-4">
              {[
                ["Patents", 84],
                ["Trademarks", 48],
                ["Designs", 22],
                ["Contract coverage", 88],
              ].map(([l, v]) => (
                <div key={l as string} className="flex items-center gap-3">
                  <span className="w-28 text-[12px] text-slate-600">{l}</span>
                  <Progress value={v as number} tone={(v as number) < 60 ? "warn" : "accent"} className="flex-1" />
                  <span className="w-7 text-right text-[12px] font-semibold tabular-nums text-ink">{v}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Risk radar" action={<TriangleAlert className="h-4 w-4 text-amber-500" />}>
            <ul className="space-y-3">
              {[
                { t: "v2 brand unprotected at launch", l: "High", tone: "bad" as const },
                { t: "Contractor IP assignment — 2 missing", l: "Medium", tone: "warn" as const },
                { t: "Prior-art overlap in literature", l: "Low", tone: "default" as const },
              ].map((r) => (
                <li key={r.t} className="flex items-start justify-between gap-3 rounded-lg bg-slate-50 p-3">
                  <p className="text-[12.5px] font-medium leading-snug text-ink">{r.t}</p>
                  <Badge tone={r.tone === "bad" ? "bad" : r.tone === "warn" ? "warn" : "default"}>{r.l}</Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Compliance calendar">
            <ul className="space-y-2.5">
              {[
                ["GST annual return", "Apr 30"],
                ["Startup India self-cert", "May 15"],
                ["FER response — patent 2", "Jun 02"],
              ].map(([c, d]) => (
                <li key={c} className="flex items-center justify-between text-[12.5px]">
                  <span className="text-slate-600">{c}</span>
                  <span className="rounded-md bg-slate-100 px-2 py-1 font-semibold tabular-nums text-slate-500">{d}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
