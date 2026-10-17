import { Plus, ShieldCheck } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

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

export function TeamManagement() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Team Management"
        desc="Your workspace members, their roles, and what each can see or change."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Invite member</button>}
      />
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card title={`Members (${members.length})`} pad={false}>
          <ul className="divide-y divide-line">
            {members.map((m) => (
              <li key={m.email} className="flex items-center gap-4 px-5 py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-[12px] font-bold text-accent">
                  {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold text-ink">{m.name}</p>
                  <p className="truncate text-[11.5px] text-slate-400">{m.role} · {m.email}</p>
                </div>
                <span className="hidden text-[11px] text-slate-300 sm:block">{m.lastActive}</span>
                <Badge tone={m.scope === "Admin" ? "accent" : m.lastActive === "Invited" ? "warn" : "default"}>{m.scope}</Badge>
              </li>
            ))}
          </ul>
        </Card>
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
      </div>
    </div>
  );
}
