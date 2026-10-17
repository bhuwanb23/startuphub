import { Badge, Card, PageHeader, Progress } from "@/components/app/widgets";

const lifecycle = ["Draft", "Filed", "Published", "FER", "Granted"];

const patents = [
  { client: "Lumen AI", title: "Multispectral crop stress inference", num: "IN 2024/112233", stage: 4, next: "Claims v3 review — overdue 3 days", tone: "warn" as const },
  { client: "Lumen AI", title: "Per-acre yield attribution method", num: "IN 2025/441208", stage: 3, next: "FER response due Jun 02", tone: "accent" as const },
  { client: "OrbitalWorks", title: "Ground-segment edge compression", num: "IN 2025/223410", stage: 3, next: "PCT US entry — Apr 22", tone: "accent" as const },
  { client: "OrbitalWorks", title: "Multi-pass data stitching", num: "IN 2025/223411", stage: 2, next: "Publication due May", tone: "default" as const },
  { client: "TerraGrid", title: "Degradation-aware dispatch scheduling", num: "IN 2024/098120", stage: 3, next: "FER response drafting", tone: "default" as const },
  { client: "AquaPure", title: "Modular cascade filtration", num: "IN 2026/031455", stage: 1, next: "Specification drafting", tone: "default" as const },
  { client: "MedSync", title: "Consent-scoped record exchange", num: "IN 2025/110982", stage: 3, next: "Claims can broaden at FER", tone: "accent" as const },
  { client: "FinEdge", title: "Cash-flow entropy credit scoring", num: "—", stage: 0, next: "Patentability positive — ready to file", tone: "good" as const },
];

export function PatentManagementPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Patent Management"
        desc="Every application as a pipeline — stage, jurisdiction, next action and who owes it."
        actions={<button className="rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">New filing</button>}
      />
      <div className="space-y-3">
        {patents.map((p) => (
          <Card key={p.title} pad={false}>
            <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-semibold text-ink">{p.title}</p>
                  <Badge tone="default">{p.num}</Badge>
                  {p.tone === "warn" && <Badge tone="warn">Action overdue</Badge>}
                  {p.tone === "good" && <Badge tone="good">Ready</Badge>}
                </div>
                <p className="mt-1 text-[11.5px] text-slate-400">Client: {p.client}</p>
                <p className="mt-2 flex items-center gap-1.5 text-[12px] text-slate-500">
                  <span className="font-semibold text-accent">Next: </span>{p.next}
                </p>
              </div>
              <div className="flex shrink-0 items-center lg:w-[420px]">
                {lifecycle.map((s, i) => {
                  const done = i < p.stage;
                  const current = i === p.stage;
                  return (
                    <div key={s} className="flex flex-1 items-center last:flex-none">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`h-3 w-3 rounded-full border-2 transition-colors ${done ? "border-accent bg-accent" : current ? "border-accent bg-white ring-4 ring-accent/15" : "border-slate-200 bg-white"}`} />
                        <span className={`whitespace-nowrap text-[9.5px] font-semibold ${current ? "text-accent" : "text-slate-300"}`}>{s}</span>
                      </div>
                      {i < lifecycle.length - 1 && <div className={`mx-1 h-0.5 flex-1 rounded ${i < p.stage ? "bg-accent" : "bg-slate-100"}`} />}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const marks = [
  { client: "Lumen AI", mark: "“Lumen AI” wordmark", classes: "9, 42", status: "Registered", renewal: "2034", tone: "good" as const },
  { client: "Lumen AI", mark: "“Field Alert” (v2)", classes: "9, 42", status: "NOT FILED", renewal: "—", tone: "bad" as const },
  { client: "MedSync", mark: "“MedSync” wordmark", classes: "9, 44", status: "Registered", renewal: "2027", tone: "good" as const },
  { client: "MedSync", mark: "Class 9 expansion", classes: "9 (add)", status: "In filing", renewal: "—", tone: "accent" as const },
  { client: "OrbitalWorks", mark: "“GroundEdge” wordmark", classes: "9, 42", status: "In filing", renewal: "—", tone: "accent" as const },
  { client: "Skyline", mark: "“Skyline” logo + word", classes: "39, 42", status: "Registered", renewal: "Nov 2026", tone: "warn" as const },
];

export function TrademarkManagementPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Trademark Management" desc="Marks, classes, jurisdictions and renewals — brand protection at a glance." />
      <Card title={`Trademark portfolio (${marks.length})`} pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Client", "Mark", "Classes", "Status", "Renewal", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {marks.map((m) => (
                <tr key={m.mark} className={m.tone === "bad" ? "bg-red-50/40" : ""}>
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{m.client}</td>
                  <td className="px-5 py-4 text-[13px] font-medium text-slate-600">{m.mark}</td>
                  <td className="px-5 py-4 text-[12.5px] tabular-nums text-slate-500">{m.classes}</td>
                  <td className="px-5 py-4">
                    <Badge tone={m.tone === "good" ? "good" : m.tone === "bad" ? "bad" : m.tone === "warn" ? "warn" : "accent"}>{m.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-400">{m.renewal}</td>
                  <td className="px-5 py-4">
                    <button className="text-[12px] font-semibold text-accent hover:underline">
                      {m.tone === "bad" ? "File now" : "Open"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

const portfolio = [
  { client: "OrbitalWorks", patents: 3, marks: 1, copyright: 2, designs: 0, secrets: 2, value: "₹5.4 Cr", health: 91 },
  { client: "Lumen AI", patents: 3, marks: 1, copyright: 1, designs: 0, secrets: 2, value: "₹4.8 Cr", health: 78 },
  { client: "MedSync", patents: 2, marks: 2, copyright: 2, designs: 0, secrets: 1, value: "₹2.6 Cr", health: 68 },
  { client: "TerraGrid", patents: 1, marks: 0, copyright: 1, designs: 1, secrets: 1, value: "₹1.9 Cr", health: 88 },
  { client: "AquaPure", patents: 1, marks: 1, copyright: 0, designs: 1, secrets: 1, value: "₹1.4 Cr", health: 74 },
];

export function IpPortfolioPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="IP Portfolio Management" desc="Every asset class, every client, one balance sheet — value and coverage." />
      <Card title="Client portfolios" pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Client", "Patents", "Trademarks", "Copyright", "Designs", "Secrets", "Est. value", "Coverage"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {portfolio.map((p) => (
                <tr key={p.client}>
                  <td className="px-5 py-4 text-[13px] font-semibold text-ink">{p.client}</td>
                  <td className="px-5 py-4 text-center text-[13px] tabular-nums text-slate-600">{p.patents}</td>
                  <td className="px-5 py-4 text-center text-[13px] tabular-nums text-slate-600">{p.marks}</td>
                  <td className="px-5 py-4 text-center text-[13px] tabular-nums text-slate-600">{p.copyright}</td>
                  <td className="px-5 py-4 text-center text-[13px] tabular-nums text-slate-600">{p.designs}</td>
                  <td className="px-5 py-4 text-center text-[13px] tabular-nums text-slate-600">{p.secrets}</td>
                  <td className="px-5 py-4 text-[13px] font-semibold tabular-nums text-ink">{p.value}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Progress value={p.health} tone={p.health > 80 ? "good" : p.health > 65 ? "accent" : "warn"} className="w-16" />
                      <span className="text-[12px] font-semibold tabular-nums text-slate-500">{p.health}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
