import {
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  MapPin,
  Plus,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import {
  Badge,
  Card,
  GaugeRing,
  PageHeader,
  Progress,
  Stat,
} from "@/components/app/widgets";
import {
  customerInsights,
  discoveryConfidence,
  discoveryFunnel,
  discoveryNextSteps,
  geographies,
  personas,
  rejectionReasons,
  segmentProgressTone,
  segmentTone,
  testedSegments,
} from "@/users/startup/constants/customer-data";

/* The interview funnel — how raw conversations become usable evidence. */
const funnel = discoveryFunnel;

/* The segments we have actually interviewed. */
const segments = testedSegments;

export function CustomerDiscovery() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Customer Discovery"
        desc="Who you have actually spoken to, what they will pay for, and which segment you are deliberately not serving."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> Log interview
          </button>
        }
      />

      {/* 1 — Discovery confidence */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Discovery confidence" className="lg:col-span-1">
          <div className="flex items-center gap-5">
            <GaugeRing value={discoveryConfidence} size={104} label="confidence" />
            <div className="min-w-0">
              <Badge tone="good">Segment validated</Badge>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
                38 valid interviews across 3 segments and 4 agri belts — enough
                to commit to one primary segment.
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent-mist p-3.5">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-[12px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Copilot:</span> Large-scale
              agri-farms show a 92 segment-fit score. Concentrate the next
              discovery wave there instead of widening coverage.
            </p>
          </div>
        </Card>

        <Card
          title="Interview funnel"
          className="lg:col-span-2"
          action={<Badge tone="accent">120 outreach</Badge>}
        >
          <div className="space-y-3">
            {funnel.map((f) => (
              <div key={f.stage} className="grid grid-cols-[130px_1fr_54px] items-center gap-3">
                <span className="truncate text-[12.5px] font-medium text-slate-600">
                  {f.stage}
                </span>
                <div>
                  <Progress
                    value={(f.count / funnel[0].count) * 100}
                    tone="accent"
                  />
                  <p className="mt-1 text-[11px] text-slate-400">{f.note}</p>
                </div>
                <span className="text-right text-[13px] font-semibold tabular-nums text-ink">
                  {f.count}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 2 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={Users}
          label="Total interviews"
          value="47"
          delta="38 valid"
          tone="good"
        />
        <Stat
          icon={Clipboard}
          label="Segments tested"
          value="3"
          hint="1 validated · 1 pilot · 1 rejected"
          tone="default"
        />
        <Stat
          icon={MapPin}
          label="Geographies"
          value="4"
          hint="agri belts covered"
          tone="default"
        />
        <Stat
          icon={CheckCircle2}
          label="Validated"
          value="87%"
          delta="+9 vs. last wave"
          tone="good"
        />
      </div>

      {/* 3 — Segment matrix */}
      <Card title="Segment matrix" action={<Badge tone="accent">3 segments</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {segments.map((s) => (
            <li key={s.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                  {s.name.split(" ")[0].slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold text-ink">
                    {s.name}
                  </p>
                  <p className="truncate text-[11.5px] text-slate-400">
                    {s.size} · {s.interviews} interviews
                  </p>
                </div>
                <div className="w-32">
                  <Progress
                    value={s.fit}
                    tone={segmentProgressTone[s.status]}
                    className="w-full"
                  />
                  <p className="mt-1 text-right text-[10.5px] text-slate-400">
                    {s.fit}% segment fit
                  </p>
                </div>
                <Badge tone={segmentTone[s.status]}>{s.status}</Badge>
                <span className="w-16 text-right text-[11px] font-medium text-slate-500">
                  {s.potential}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* 4 — Geography spread */}
      <Card title="Geographic spread" action={<MapPin className="h-4 w-4 text-slate-300" />} pad={false}>
        <ul className="divide-y divide-line">
          {geographies.map((g) => (
            <li key={g.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{g.region}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{g.note}</p>
              </div>
              <div className="w-40">
                <Progress
                  value={(g.interviews / 18) * 100}
                  tone="accent"
                  className="w-full"
                />
              </div>
              <span className="w-20 text-right text-[12px] font-medium text-slate-600">
                {g.interviews} interviews
              </span>
              <span className="w-16 text-right text-[12px] font-semibold text-ink tabular-nums">
                {g.farms} farms
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5 — Personas */}
      <Card title="What we heard" action={<Badge tone="default">3 personas</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {personas.map((p) => (
            <li key={p.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                <span className="text-[11.5px] text-slate-400">{p.org}</span>
                <Badge tone={p.tone}>{p.stance}</Badge>
              </div>
              <p className="mt-2 border-l-2 border-accent-200 pl-3 text-[12.5px] italic leading-relaxed text-slate-600">
                “{p.quote}”
              </p>
            </li>
          ))}
        </ul>
      </Card>

      {/* 6 — Rejected segment */}
      <Card
        title="Why smallholders are out of scope"
        action={<Badge tone="bad">Deliberate decision</Badge>}
        pad={false}
      >
        <div className="border-b border-line bg-red-50/40 px-5 py-4">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-red-500">
            Rejected segment
          </p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
            Individual smallholders — service cost per acre is too high for the
            willingness to pay, and fragmented plots fall outside usable
            satellite revisit windows.
          </p>
        </div>
        <ul className="divide-y divide-line">
          {rejectionReasons.map((r) => (
            <li key={r.reason} className="px-5 py-3.5">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <div>
                  <p className="text-[12.5px] font-semibold text-ink">{r.reason}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-500">{r.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* 7 — Key insights */}
      <Card title="Key insights" action={<Badge tone="accent">4 findings</Badge>}>
        <ul className="space-y-3">
          {customerInsights.map((insight) => (
            <li key={insight} className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-[12.5px] leading-relaxed text-slate-600">
                {insight}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Budget */}
      <Card title="Discovery budget" action={<Wallet className="h-4 w-4 text-slate-300" />}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Allocated
            </p>
            <p className="mt-1 text-xl font-semibold text-ink">₹50L</p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Spent
            </p>
            <p className="mt-1 text-xl font-semibold text-emerald-600">₹32L (64%)</p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Runway left
            </p>
            <p className="mt-1 text-xl font-semibold text-ink">₹18L</p>
          </div>
        </div>
        <Progress value={64} tone="accent" className="mt-4" />
        <p className="mt-2 text-[11.5px] text-slate-400">
          Spend is ahead of plan on the FPO channel study and behind on the
          second discovery wave.
        </p>
      </Card>

      {/* 9 — Next steps */}
      <Card title="Recommended next steps" action={<Badge tone="accent">4 queued</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {discoveryNextSteps.map((n) => (
            <li key={n.action} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{n.action}</p>
                <Badge tone={n.impact === "High" ? "good" : "accent"}>
                  {n.impact} impact
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[11.5px] text-slate-500">
                <span>{n.timeline}</span>
                <span>{n.cost}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
