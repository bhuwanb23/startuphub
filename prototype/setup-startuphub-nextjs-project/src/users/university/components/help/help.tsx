import {
  ArrowRight,
  ArrowRightLeft,
  BookOpenText,
  FlaskConical,
  LifeBuoy,
  Landmark,
  MessageCircleQuestion,
  Microscope,
  Rocket,
  Scale,
} from "lucide-react";
import { PageIntro, Panel } from "@/components/app/widgets";

const GUIDES = [
  { title: "Research Management", desc: "Projects, teams, budgets and deliverables", icon: FlaskConical },
  { title: "IP Management", desc: "Disclosures, filings, portfolio and renewals", icon: Scale },
  { title: "Technology Transfer", desc: "Assessment → matching → handover playbook", icon: ArrowRightLeft },
  { title: "Lab Management", desc: "Bookings, sharing rules and safety", icon: Microscope },
  { title: "Spin-off Playbook", desc: "Equity, incubation and founder transitions", icon: Rocket },
  { title: "Funding Guide", desc: "Grant calendars, applications and utilization", icon: Landmark },
];

const FAQS = [
  { q: "How does a researcher submit an invention disclosure?", a: "From the IP Portfolio screen → Submit disclosure. The TTO runs a novelty check within 5 working days." },
  { q: "Can startups book our labs directly?", a: "Yes — facilities marked 'external sharing open' accept requests. Lab managers approve after safety induction." },
  { q: "How is institution equity in spin-offs decided?", a: "The IP policy sets 5–9% equity for licensed core IP, negotiated at incorporation and recorded in the spin-off register." },
  { q: "Who approves exclusive licenses?", a: "TTO negotiates, Legal reviews, and the Institution Administrator signs anything exclusive or above ₹50L." },
];

export function UniversityHelp() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Help & support"
        description="Guides for every playbook in the workspace — plus a direct line to the StartupHub institutional success team."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {GUIDES.map((g) => {
          const Icon = g.icon;
          return (
            <a
              key={g.title}
              href="#"
              className="group rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-card"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft transition-colors duration-300 group-hover:bg-accent">
                <Icon className="h-5 w-5 text-accent transition-colors duration-300 group-hover:text-white" />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-ink">{g.title}</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{g.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-accent">
                Read guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Panel title="Frequently asked">
          <ul className="space-y-4">
            {FAQS.map((f) => (
              <li key={f.q} className="border-b border-line pb-4 last:border-0 last:pb-0">
                <p className="flex items-start gap-2 text-[13.5px] font-semibold text-ink">
                  <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {f.q}
                </p>
                <p className="mt-1.5 pl-6 text-[12.5px] leading-relaxed text-slate-500">{f.a}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Contact support">
          <div className="rounded-lg bg-accent-mist px-4 py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <LifeBuoy className="h-5 w-5 text-white" />
            </span>
            <p className="mt-3 text-[13.5px] font-semibold text-ink">Institutional success desk</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">
              Dedicated manager for Crestmont University. Median first response:
              2h 10m.
            </p>
            <div className="mt-4 space-y-2">
              <button className="h-9 w-full rounded-lg bg-accent text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
                Message the desk
              </button>
              <button className="h-9 w-full rounded-lg border border-line bg-white text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft">
                Report an issue
              </button>
            </div>
          </div>
          <p className="mt-3.5 text-center text-[11.5px] text-slate-400">
            SLA: 99.9% uptime · institution tier
          </p>
        </Panel>
      </div>
    </div>
  );
}
