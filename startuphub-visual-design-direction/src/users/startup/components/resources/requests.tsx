"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Inbox,
  Plus,
  Send,
  Timer,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageHeader, Progress, Stat } from "@/components/app/widgets";
import {
  approvalRoutes,
  costBandOf,
  providers,
  rankedCatalogue,
  resourceCatalogue,
  resourceRequests as seedRequests,
  type RequestStatus,
  type ResourceRequest,
} from "@/users/startup/constants/resource-data";

const statusFilters: (RequestStatus | "All statuses")[] = [
  "All statuses",
  "Approved",
  "In review",
  "Submitted",
  "Shortlisting",
];

export function ResourceRequests() {
  const [requests, setRequests] = useState<ResourceRequest[]>(seedRequests);
  const [status, setStatus] = useState<RequestStatus | "All statuses">("All statuses");
  const [resourceId, setResourceId] = useState(rankedCatalogue[0].id);
  const [justification, setJustification] = useState("");
  const [drafts, setDrafts] = useState(0);

  const selected = rankedCatalogue.find((r) => r.id === resourceId) ?? rankedCatalogue[0];
  const route = approvalRoutes.find((r) => r.category === selected.category);

  const results = useMemo(
    () => (status === "All statuses" ? requests : requests.filter((r) => r.status === status)),
    [requests, status],
  );

  const approved = requests.filter((r) => r.status === "Approved").length;
  const inReview = requests.filter((r) => r.status === "In review").length;

  /* Catalogue items nobody has raised a request for yet. */
  const untouched = rankedCatalogue.filter(
    (r) => !requests.some((q) => q.resourceId === r.id),
  );
  /* Anything not yet approved is waiting on a person. */
  const openRequests = requests.filter((r) => r.status !== "Approved");
  const avgSla = Math.round((requests.reduce((s, r) => s + r.slaDays, 0) / requests.length) * 10) / 10;

  const submit = () => {
    const request: ResourceRequest = {
      id: `req-new-${drafts + 1}`,
      resourceId: selected.id,
      item: selected.title,
      category: selected.category,
      qty: selected.value,
      fit: selected.fit,
      status: "Submitted",
      tone: "default",
      submitted: "Today",
      owner: "Ravi Sharma",
      sla: route?.sla ?? "5 days",
      slaDays: route?.sla ? Number(route.sla.replace(/\D/g, "")) : 5,
      note:
        justification.trim() ||
        `${selected.title} — ${selected.eligibility.toLowerCase()}, ${selected.lead} lead time.`,
    };
    setRequests((prev) => [request, ...prev]);
    setJustification("");
    setDrafts((d) => d + 1);
    setStatus("All statuses");
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Resource Requests"
        desc="Everything you have asked for — who signs it off, how long it takes, and whether it is still worth claiming."
        actions={
          <Link
            href="/founder/resources/allocation"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink hover:border-slate-300"
          >
            See what is allocated
          </Link>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Inbox} label="Requests in flight" value={String(requests.length)} delta={`${inReview} awaiting review`} tone="default" />
        <Stat icon={CheckCircle2} label="Approved" value={String(approved)} delta={`of ${requests.length} requests`} tone="good" />
        <Stat icon={Timer} label="Average turnaround" value={`${avgSla} days`} delta="promised by the approver" tone="warn" />
        <Stat icon={Clock} label="New this session" value={String(drafts)} delta="added from the form below" tone="default" />
      </div>

      {/* 2 — New request */}
      <Card
        title="Raise a request"
        action={<Badge tone="accent">routes to the right approver</Badge>}
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Resource
            </span>
            <select
              value={resourceId}
              onChange={(e) => setResourceId(e.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-[13px] font-medium text-ink outline-none focus:border-accent"
            >
              {rankedCatalogue.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} — {r.provider} ({r.fit}% fit)
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Why now
            </span>
            <input
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="One line on what this unblocks"
              className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-[13px] text-ink outline-none placeholder:text-slate-300 focus:border-accent"
            />
          </label>

          <button
            type="button"
            onClick={submit}
            className="inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"
          >
            <Send className="h-3.5 w-3.5" /> Submit request
          </button>
        </div>

        <div className="mt-4 grid gap-3 rounded-xl bg-accent-mist p-4 sm:grid-cols-3">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Selected
            </p>
            <p className="mt-1 text-[13px] font-semibold text-ink">{selected.title}</p>
            <p className="mt-0.5 text-[11.5px] text-slate-500">
              {selected.provider} · {costBandOf(selected.cost)}
            </p>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Routes to
            </p>
            <p className="mt-1 text-[13px] font-semibold text-ink">
              {route?.approver ?? "Unassigned"}
            </p>
            <p className="mt-0.5 text-[11.5px] text-slate-500">
              {route?.role ?? "—"} · {route?.sla ?? "5 days"}
            </p>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Match score
            </p>
            <p className="mt-1 text-[13px] font-semibold text-ink">{selected.fit}% fit</p>
            <Progress
              value={selected.fit}
              tone={selected.fit >= 88 ? "good" : "accent"}
              className="mt-2"
            />
          </div>
        </div>
      </Card>

      {/* 3 — Request register */}
      <Card
        title={`Request register (${results.length})`}
        action={
          <div className="flex flex-wrap gap-1.5">
            {statusFilters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  status === s
                    ? "bg-accent text-white"
                    : "border border-line bg-white text-slate-500 hover:border-slate-300 hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        }
        pad={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Request", "Type", "Qty", "Match score", "Status", "Owner", "SLA"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {results.map((r) => (
                <tr key={r.id}>
                  <td className="px-5 py-4">
                    <p className="text-[13.5px] font-semibold text-ink">{r.item}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-400">
                      Submitted {r.submitted} · {r.note}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge>{r.category}</Badge>
                  </td>
                  <td className="px-5 py-4 text-[12.5px] font-medium text-slate-500">{r.qty}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent">
                      {r.fit}%
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={r.tone}>{r.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-500">{r.owner}</td>
                  <td className="px-5 py-4 text-[12.5px] text-slate-400">{r.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {results.length === 0 && (
          <p className="px-5 py-10 text-center text-[13px] text-slate-400">
            No requests with that status — pick another filter above.
          </p>
        )}
      </Card>

      {/* 4 — Approval routes */}
      <Card title="Who approves what" action={<Badge tone="default">{approvalRoutes.length} categories</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {approvalRoutes.map((r) => (
            <li key={r.category} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <UserCheck className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{r.category}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{r.note}</p>
              </div>
              <div className="text-right">
                <p className="text-[12.5px] font-medium text-slate-600">{r.approver}</p>
                <p className="text-[11px] text-slate-400">{r.role}</p>
              </div>
              <span className="w-16 text-right text-[11.5px] font-semibold text-ink">{r.sla}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5 — Coverage gap */}
      <Card
        title="Coverage gap — what you have not asked for"
        action={<Badge tone="warn">{untouched.length} untouched</Badge>}
        pad={false}
      >
        <ul className="divide-y divide-line">
          {untouched.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{r.title}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {r.provider} · {r.category} · {r.lead}
                </p>
              </div>
              <span className="text-[12px] font-medium text-slate-500">
                {r.cost === 0 ? "Free" : `₹${r.cost} L`}
              </span>
              <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">
                {r.fit}%
              </span>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-5 py-3 text-[11.5px] leading-relaxed text-slate-400">
          Nothing in the catalogue has to be claimed to be used — but each one has a window, and the
          grant-funded ones close first.
        </p>
      </Card>

      {/* 6 — Waiting on whom */}
      <Card title="Open requests — waiting on whom" action={<Badge tone="accent">{openRequests.length} open</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {openRequests.map((r) => {
            const r2 = approvalRoutes.find((a) => a.category === r.category);
            return (
              <li key={r.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <UserCheck className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">{r.item}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">{r.note}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12.5px] font-medium text-slate-600">
                    {r2?.approver ?? "Unassigned"}
                  </p>
                  <p className="text-[11px] text-slate-400">{r.sla} promised</p>
                </div>
                <Badge tone={r.tone}>{r.status}</Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* 7 — Turnaround */}
      <Card title="Turnaround, by category">
        <div className="space-y-4">
          {approvalRoutes.map((r) => {
            const open = requests.filter(
              (q) => q.category === r.category && q.status !== "Approved",
            ).length;
            const days = Number(r.sla.replace(/\D/g, ""));
            return (
              <div key={r.category}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[12.5px] font-medium text-slate-600">{r.category}</span>
                  <span className="text-[11.5px] text-slate-400">
                    {open} open ·{" "}
                    <span className="font-semibold tabular-nums text-ink">{days} days</span> promised
                  </span>
                </div>
                <Progress
                  value={(days / 10) * 100}
                  tone={days <= 3 ? "good" : days <= 5 ? "accent" : "warn"}
                  className="mt-2"
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* 8 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Resource Discovery",
              href: "/founder/resources",
              body: `The full catalogue — ${resourceCatalogue.length} resources from ${providers.length} providers, with fit scores.`,
            },
            {
              label: "Resource Matching",
              href: "/founder/resources/matching",
              body: "How a fit score is computed, and how to make the model more confident.",
            },
            {
              label: "Resource Allocation",
              href: "/founder/resources/allocation",
              body: "What an approved request becomes once it lands in the ledger.",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-line p-4 transition-colors hover:border-accent"
            >
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{link.body}</p>
            </Link>
          ))}
        </div>
      </Card>

      {/* 9 — Note */}
      <p className="flex items-center gap-2 px-1 text-[11.5px] text-slate-400">
        <Plus className="h-3.5 w-3.5" />
        A submitted request is routed to the category approver within one working day — nothing here
        approves itself.
      </p>
    </div>
  );
}
