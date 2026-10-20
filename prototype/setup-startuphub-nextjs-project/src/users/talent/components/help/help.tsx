import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Briefcase,
  Compass,
  FileSignature,
  Handshake,
  MessageCircleQuestion,
  LifeBuoy,
  UserRound,
} from "lucide-react";
import { PageIntro, Panel } from "@/components/app/widgets";

const GUIDES = [
  { title: "Profile Setup", desc: "Headline, skills and a profile that converts views to intros", icon: UserRound },
  { title: "Opportunity Discovery", desc: "Filters, saved searches and reading fit scores", icon: Compass },
  { title: "Applications", desc: "Match briefs, follow-ups and interview prep notes", icon: FileSignature },
  { title: "Projects & Tasks", desc: "Deliverables, reviews and staying on track", icon: Briefcase },
  { title: "Collaborations", desc: "Requests, terms and professional boundaries", icon: Handshake },
  { title: "Reputation & Verification", desc: "Reviews, badges and the verified passport", icon: BadgeCheck },
];

const FAQS = [
  { q: "How is my fit score calculated?", a: "Skills, verified experience, rate band, availability and past outcomes — each match shows its full explanation." },
  { q: "Can startups see my rate expectations?", a: "Only matches above your visibility threshold (default 75 fit) — configurable in Settings." },
  { q: "How does work verification work?", a: "Clients confirm engagement facts; StartupHub signs them into your passport without exposing documents." },
  { q: "What happens when I accept an offer?", a: "A contract draft opens with scope and terms prefilled; e-signing completes in the Documents tab." },
];

export function TalentHelp() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Help & support"
        description="Guides for building a profile that gets matched — plus direct access to the talent success team."
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
            <p className="mt-3 text-[13.5px] font-semibold text-ink">Talent success desk</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">
              Matching, offers and verification help. Median first response: 1h 40m.
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
            SLA: 99.9% uptime · professional tier
          </p>
        </Panel>
      </div>
    </div>
  );
}
