import { Users } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

const details = [
  ["Focus", "Multi-sector · deep tech friendly"], ["Founded", "2021 · Bengaluru"],
  ["Programs run", "12"], ["Capacity", "64 concurrent startups"],
  ["Facilities", "Co-working, prototype studio, investor lounge"], ["Partners", "CIED, T-Hub, KSM + 5 more"],
];

const staff = [
  { name: "Meera Iyer", role: "Program Director", scope: "Admin" },
  { name: "Rohan Pillai", role: "Program Manager", scope: "Editor" },
  { name: "Arjun Nair", role: "Funding Lead", scope: "Editor" },
  { name: "Divya Menon", role: "Community & Events", scope: "Viewer" },
  { name: "Kavi Sharma", role: "Operations", scope: "Viewer" },
];

const partners = ["CIED Pune", "T-Hub Health", "Kerala Startup Mission", "Nexus Angels", "Nimbus Cloud", "SH IPR Desk"];

export function Organization() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="My Organization"
        desc="StartupHub Labs' identity inside the ecosystem — profile, team and partnerships."
      />

      <Card>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink text-lg font-bold text-white">SL</span>
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight text-ink">StartupHub Labs</h2>
            <p className="mt-1 max-w-xl text-[13.5px] leading-relaxed text-slate-500">
              Bengaluru&apos;s multi-sector incubation flagship — 16-week programs from validated idea to fund-ready venture.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge tone="good">Verified partner</Badge>
              <Badge tone="accent">Deep-tech friendly</Badge>
              <Badge>Non-dilutive</Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Organization details">
          <dl className="grid gap-4 sm:grid-cols-2">
            {details.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{k}</dt>
                <dd className="mt-1 text-[13.5px] font-medium leading-snug text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
        <Card id="team" title="Team & staff" action={<button className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-accent-deep"><Users className="h-3.5 w-3.5" /> Add staff</button>} pad={false}>
          <ul className="divide-y divide-line">
            {staff.map((s) => (
              <li key={s.name} className="flex items-center gap-3 px-5 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
                  {s.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold text-ink">{s.name}</p>
                  <p className="truncate text-[11.5px] text-slate-400">{s.role}</p>
                </div>
                <Badge tone={s.scope === "Admin" ? "accent" : "default"}>{s.scope}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Ecosystem partners">
        <div className="flex flex-wrap gap-2">
          {partners.map((p) => (
            <span key={p} className="rounded-lg border border-line bg-soft px-3.5 py-2 text-[13px] font-medium text-slate-600">
              {p}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
