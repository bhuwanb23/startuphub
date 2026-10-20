import { ArrowUpRight, FileText, ShieldCheck } from "lucide-react";
import { Chip, Panel } from "@/components/app/widgets";
import { PageHead, ReviewBoard, Severity, SubjectBanner } from "../shared/boards";
import { DD_FINDINGS, DD_RECOMMENDATION, DD_REVIEWS } from "../../constants/deal-dd-data";

/* The four domain reviews share the ReviewBoard machinery, fed by distinct
   typed constants — same pattern as the solutions template. */
export function LegalReview() {
  return <ReviewBoard review={DD_REVIEWS.legal} />;
}

export function FinancialReview() {
  return <ReviewBoard review={DD_REVIEWS.financial} />;
}

export function TechnologyReview() {
  return <ReviewBoard review={DD_REVIEWS.technology} />;
}

export function IpReview() {
  return <ReviewBoard review={DD_REVIEWS.ip} />;
}

/* ── DD Findings ────────────────────────────────────────────── */
export function DdFindings() {
  const open = DD_FINDINGS.filter((f) => f.status !== "Resolved");
  const critical = DD_FINDINGS.filter((f) => f.severity === "Critical").length;

  return (
    <div className="space-y-5">
      <SubjectBanner
        kicker="DD findings · ReJoule Energy"
        title="Findings register"
        meta={`${DD_FINDINGS.length} findings · ${open.length} open · ${critical} critical`}
        score={DD_RECOMMENDATION.score}
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <FileText className="h-3.5 w-3.5" /> Generate DD report
          </button>
        }
      />

      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {["All", "Critical", "High", "Medium", "Low", "Resolved", "Unresolved"].map((s, i) => (
          <button key={s} className={`shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold ${i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-500 hover:text-ink"}`}>{s}</button>
        ))}
      </div>

      <Panel pad={false}>
        <ul className="divide-y divide-line">
          {DD_FINDINGS.map((f) => (
            <li key={f.id} className="grid items-center gap-3 px-5 py-4 transition-colors hover:bg-soft sm:grid-cols-[64px_1fr_auto]">
              <span className="font-mono text-[11px] font-semibold text-slate-400">{f.id}</span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-ink">{f.title}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {f.area} · Owner: {f.owner} · <span className="text-slate-500">{f.note}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Severity s={f.severity} />
                <Chip tone={f.status === "Resolved" ? "rise" : f.status === "Open" ? "amber" : "accent"}>
                  {f.status}
                </Chip>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Recommendations into IC" sub="Synthesised from open findings" action={<ShieldCheck className="h-4 w-4 text-rise" />}>
        <ul className="space-y-3">
          {[
            "Condition precedent: third-party accuracy bench ≥94% before IC vote (F-01).",
            "Condition precedent: prior-employer IP carve-out cured before signing (F-02).",
            "Term-sheet structure: tranche 2 only after first OEM conversion (F-03).",
            "Convert founder loan at round price via SSA side letter (F-04).",
          ].map((r, i) => (
            <li key={i} className="flex gap-3 rounded-lg border border-line p-3.5 text-[13px] leading-relaxed text-ink">
              <span className="font-mono text-[10px] font-semibold text-accent">R{i + 1}</span>
              {r}
              <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-300" />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
