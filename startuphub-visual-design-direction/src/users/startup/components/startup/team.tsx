import {
  Activity,
  CheckCircle2,
  Clock,
  CreditCard,
  Mail,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  Badge,
  Card,
  PageHeader,
  Progress,
  Stat,
} from "@/components/app/widgets";

const members = [
  { name: "Ravi Sharma", email: "ravi@lumen.ai", role: "Co-founder & CEO", scope: "Admin", lastActive: "now" },
  { name: "Ananya Rao", email: "ananya@lumen.ai", role: "Co-founder & CPO", scope: "Admin", lastActive: "2h ago" },
  { name: "Vikash Jha", email: "vikash@lumen.ai", role: "Co-founder & CTO", scope: "Editor", lastActive: "30m ago" },
  { name: "Meera Pillai", email: "meera@lumen.ai", role: "Head of Agronomy", scope: "Viewer", lastActive: "1d ago" },
  { name: "Kabir Shah", email: "kabir@lumen.ai", role: "ML Engineer", scope: "Editor", lastActive: "Invited" },
];

const roles = [
  { name: "Admin", desc: "Full access — billing, team, all data", count: 2 },
  { name: "Editor", desc: "Edit startup data, documents, product", count: 2 },
  { name: "Viewer", desc: "Read-only dashboards and documents", count: 1 },
];

const pendingInvites = [
  { email: "kabir@lumen.ai", role: "ML Engineer", scope: "Editor", sent: "2 days ago", expires: "in 5 days" },
  { email: "nisha@lumen.ai", role: "Growth analyst", scope: "Viewer", sent: "5 hours ago", expires: "in 6 days" },
];

const activityLog = [
  { actor: "Vikash Jha", action: "updated the product roadmap", when: "12 min ago", tone: "accent" as const },
  { actor: "Ravi Sharma", action: "invited Kabir Shah as Editor", when: "2 days ago", tone: "default" as const },
  { actor: "Ananya Rao", action: "published a new company deck (v7)", when: "4 days ago", tone: "good" as const },
  { actor: "Meera Pillai", action: "downloaded the IP portfolio export", when: "1 week ago", tone: "default" as const },
  { actor: "Ravi Sharma", action: "raised the team seat limit to 30", when: "2 weeks ago", tone: "warn" as const },
];

const byFunction = [
  { fn: "Engineering & ML", count: 11, share: 39 },
  { fn: "Field operations", count: 6, share: 21 },
  { fn: "Agronomy research", count: 4, share: 14 },
  { fn: "Growth & sales", count: 4, share: 14 },
  { fn: "Leadership", count: 3, share: 11 },
];

const accessReview = [
  { item: "Quarterly access review completed", state: "Done", tone: "good" as const, note: "Last reviewed 1 Aug 2026" },
  { item: "Off-boarded accounts removed", state: "Done", tone: "good" as const, note: "2 accounts closed in July" },
  { item: "Two-factor authentication enforced", state: "Done", tone: "good" as const, note: "All 5 workspace members" },
  { item: "Viewer accounts re-checked", state: "Pending", tone: "warn" as const, note: "Due in 12 days" },
];

const SEATS_TOTAL = 30;
const SEATS_USED = 28;

export function TeamManagement() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Team Management"
        desc="Your workspace members, their roles, and what each can see or change."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep">
            <Plus className="h-3.5 w-3.5" /> Invite member
          </button>
        }
      />

      {/* 1 — Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Users} label="Active members" value={String(members.length)} delta="4 active now" tone="good" />
        <Stat icon={Mail} label="Pending invites" value={String(pendingInvites.length)} hint="not yet accepted" tone="warn" />
        <Stat icon={ShieldCheck} label="Admins" value="2" hint="full workspace access" tone="default" />
        <Stat icon={CreditCard} label="Seats used" value={`${SEATS_USED}/${SEATS_TOTAL}`} delta="2 left" tone="warn" />
      </div>

      {/* 2 — Members */}
      <Card title={`Members (${members.length})`} action={<Badge tone="accent">5 seats</Badge>} pad={false}>
        <ul className="divide-y divide-line">
          {members.map((m) => (
            <li key={m.email} className="flex items-center gap-4 px-5 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-[12px] font-bold text-accent">
                {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-ink">{m.name}</p>
                <p className="truncate text-[11.5px] text-slate-400">
                  {m.role} · {m.email}
                </p>
              </div>
              <span className="hidden text-[11px] text-slate-300 sm:block">{m.lastActive}</span>
              <Badge
                tone={
                  m.scope === "Admin"
                    ? "accent"
                    : m.lastActive === "Invited"
                      ? "warn"
                      : "default"
                }
              >
                {m.scope}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 3 — Roles & permissions */}
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card title="Roles & permissions" action={<ShieldCheck className="h-4 w-4 text-slate-400" />}>
          <ul className="space-y-3">
            {roles.map((r) => (
              <li key={r.name} className="rounded-xl border border-line p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[13.5px] font-semibold text-ink">{r.name}</p>
                  <Badge tone="default">{r.count} people</Badge>
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{r.desc}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Pending invitations" action={<Badge tone="warn">2 open</Badge>} pad={false}>
          <ul className="divide-y divide-line">
            {pendingInvites.map((p) => (
              <li key={p.email} className="px-5 py-3.5">
                <p className="text-[13px] font-semibold text-ink">{p.email}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">
                  {p.role} · {p.scope}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    sent {p.sent}
                  </span>
                  <span>expires {p.expires}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 4 — Activity log */}
      <Card title="Recent activity" action={<Activity className="h-4 w-4 text-slate-300" />} pad={false}>
        <ul className="divide-y divide-line">
          {activityLog.map((a) => (
            <li key={a.actor + a.when} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  a.tone === "good"
                    ? "bg-emerald-500"
                    : a.tone === "accent"
                      ? "bg-accent"
                      : a.tone === "warn"
                        ? "bg-amber-400"
                        : "bg-slate-300"
                }`}
              />
              <p className="min-w-0 flex-1 text-[12.5px] text-slate-600">
                <span className="font-semibold text-ink">{a.actor}</span> {a.action}
              </p>
              <span className="text-[11.5px] text-slate-400">{a.when}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5 — Headcount by function */}
      <Card title="Headcount by function" action={<Badge tone="default">5 functions</Badge>}>
        <div className="space-y-3.5">
          {byFunction.map((f) => (
            <div key={f.fn} className="flex items-center gap-3">
              <span className="w-40 shrink-0 text-[12.5px] font-medium text-slate-600">
                {f.fn}
              </span>
              <Progress value={f.share} tone="accent" className="flex-1" />
              <span className="w-8 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {f.count}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* 6 — Seats & billing */}
      <Card title="Seats & billing" action={<CreditCard className="h-4 w-4 text-slate-300" />}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Seats used
            </p>
            <p className="mt-1 text-xl font-semibold text-ink">
              {SEATS_USED}
              <span className="text-[14px] font-normal text-slate-400">/{SEATS_TOTAL}</span>
            </p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Seats available
            </p>
            <p className="mt-1 text-xl font-semibold text-amber-600">{SEATS_TOTAL - SEATS_USED}</p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Monthly cost
            </p>
            <p className="mt-1 text-xl font-semibold text-ink">₹28,000</p>
          </div>
        </div>
        <Progress value={(SEATS_USED / SEATS_TOTAL) * 100} tone="warn" className="mt-4" />
        <p className="mt-2 text-[11.5px] text-slate-400">
          Two seats remain and one invitation is already outstanding — raise the
          limit before the next hiring round starts.
        </p>
      </Card>

      {/* 7 — Access review */}
      <Card title="Access review" action={<CheckCircle2 className="h-4 w-4 text-slate-300" />} pad={false}>
        <ul className="divide-y divide-line">
          {accessReview.map((a) => (
            <li key={a.item} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{a.item}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{a.note}</p>
              </div>
              <Badge tone={a.tone === "good" ? "good" : "warn"}>{a.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 8 — Where to go next */}
      <Card title="Where to go next">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Startup Profile",
              href: "/founder/startup",
              body: "Company identity, traction and the public profile.",
            },
            {
              label: "Founder Profile",
              href: "/founder/startup/founder-profile",
              body: "Your background, expertise and ecosystem ties.",
            },
            {
              label: "Startup Assessment",
              href: "/founder/startup/assessment",
              body: "Dimension scoring against the Stage A cohort.",
            },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-line p-4 transition-colors hover:border-accent"
            >
              <p className="text-[13px] font-semibold text-ink">{link.label}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{link.body}</p>
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}
