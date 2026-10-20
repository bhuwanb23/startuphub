import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  CalendarClock,
  Globe2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Bar, PageIntro, Panel, PanelLink } from "@/components/app/widgets";
import {
  AVAILABILITY,
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  SKILLS,
} from "../../constants/profile-data";

export function TalentProfile() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Professional profile"
        description="How startups see you in matching — headline, skills, experience and availability all feed your fit score."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-4 text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft">
            <ArrowUpRight className="h-4 w-4" /> View public profile
          </button>
        }
      />

      {/* identity card */}
      <section className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(11,18,32,0.03)]">
        <div className="relative h-24 bg-ink">
          <div className="bg-nodegrid absolute inset-0 opacity-60" />
        </div>
        <div className="px-6 pb-6">
          <div className="-mt-9 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border-4 border-white bg-ink text-[20px] font-bold text-white shadow-card">
                ZK
              </span>
              <div className="pb-1">
                <h2 className="flex items-center gap-2 text-[20px] font-semibold tracking-[-0.02em] text-ink">
                  {PROFILE.name}
                  <BadgeCheck className="h-5 w-5 text-accent" />
                </h2>
                <p className="text-[13px] text-slate-500">{PROFILE.headline}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-slate-400">
                  <MapPin className="h-3.5 w-3.5" /> {PROFILE.location}
                </p>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[12px] font-semibold text-emerald-700">
                {AVAILABILITY.status}
              </span>
              <span className="rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-semibold text-accent-deep">
                Skill score 86
              </span>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-[13.5px] leading-relaxed text-slate-600">{PROFILE.about}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
            <span className="font-semibold text-ink">Goal · </span>{PROFILE.goal}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-[12.5px] text-slate-500">
            <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-slate-400" /> {PROFILE.contact.email}</span>
            <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-slate-400" /> {PROFILE.contact.phone}</span>
            <span className="flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5 text-slate-400" /> {PROFILE.contact.links.join(" · ")}</span>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* skills */}
        <Panel title="Skill profile" action={<PanelLink href="#">Assess skills</PanelLink>}>
          <ul className="space-y-3.5">
            {SKILLS.map((s) => (
              <li key={s.name}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-1.5 font-medium text-slate-600">
                    {s.name}
                    {s.verified && <BadgeCheck className="h-3.5 w-3.5 text-accent" />}
                  </span>
                  <span className="text-slate-400">{s.years} yrs · <span className="font-semibold text-ink">{s.level}</span></span>
                </div>
                <Bar value={s.level} tone={s.verified ? "accent" : "ink"} />
              </li>
            ))}
          </ul>
        </Panel>

        {/* availability */}
        <Panel title="Availability" action={<PanelLink href="#">Edit</PanelLink>}>
          <ul className="space-y-3 text-[13px]">
            <li className="flex justify-between"><span className="text-slate-500">Status</span><span className="font-semibold text-emerald-700">{AVAILABILITY.status}</span></li>
            <li className="flex justify-between"><span className="text-slate-500">Working hours</span><span className="font-medium text-ink">{AVAILABILITY.hours}</span></li>
            <li className="flex justify-between"><span className="text-slate-500">Start date</span><span className="font-medium text-ink">{AVAILABILITY.start}</span></li>
          </ul>
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[12px]">
              <span className="flex items-center gap-1.5 text-slate-500"><CalendarClock className="h-3.5 w-3.5" /> Weekly capacity</span>
              <span className="font-semibold text-ink">{AVAILABILITY.capacity}/{AVAILABILITY.capacityMax} hrs</span>
            </div>
            <Bar value={(AVAILABILITY.capacity / AVAILABILITY.capacityMax) * 100} tone="accent" />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {AVAILABILITY.modes.map((m) => (
              <span key={m} className="rounded-full bg-soft px-2.5 py-1 text-[11.5px] font-medium text-slate-600">{m}</span>
            ))}
          </div>
          <h4 className="mt-5 border-t border-line pt-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-400">
            Preferred engagement
          </h4>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {PROFILE.engagement.map((e) => (
              <span key={e} className="rounded-full bg-accent-soft px-2.5 py-1 text-[11.5px] font-semibold text-accent-deep">{e}</span>
            ))}
          </div>
        </Panel>

        {/* experience */}
        <Panel title="Experience" action={<PanelLink href="#">Add role</PanelLink>} className="lg:col-span-2">
          <ol className="relative space-y-5 before:absolute before:bottom-1.5 before:left-[5px] before:top-1.5 before:w-px before:bg-line">
            {EXPERIENCE.map((e) => (
              <li key={e.org} className="relative pl-6">
                <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-white bg-accent ring-1 ring-line" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-[14px] font-semibold text-ink">{e.role}</span>
                  <span className="text-[11.5px] font-medium text-slate-400">{e.period}</span>
                </div>
                <p className="text-[12.5px] text-slate-500">
                  {e.org} · <span className="text-slate-400">{e.kind}</span>
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{e.note}</p>
              </li>
            ))}
          </ol>
        </Panel>

        {/* education + certifications */}
        <Panel title="Education">
          <ul className="space-y-3">
            {EDUCATION.map((e) => (
              <li key={e.title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft">
                  <GraduationCap className="h-4 w-4 text-accent" />
                </span>
                <span>
                  <span className="block text-[13.5px] font-medium text-ink">{e.title}</span>
                  <span className="block text-[12px] text-slate-400">{e.org} · {e.period}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Certifications">
          <ul className="space-y-3">
            {CERTIFICATIONS.map((c) => (
              <li key={c.name} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft">
                  <Award className="h-4 w-4 text-accent" />
                </span>
                <span>
                  <span className="block text-[13.5px] font-medium text-ink">{c.name}</span>
                  <span className="block text-[12px] text-slate-400">{c.issuer} · {c.year}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* industry preferences */}
      <Panel title="Industry preferences">
        <div className="flex flex-wrap gap-2">
          {PROFILE.industries.map((i, idx) => (
            <span
              key={i}
              className={`rounded-full px-3 py-1.5 text-[12.5px] font-medium ${
                idx < 2 ? "bg-accent-soft text-accent-deep" : "border border-line bg-soft text-slate-600"
              }`}
            >
              {i}
            </span>
          ))}
        </div>
      </Panel>
    </div>
  );
}
