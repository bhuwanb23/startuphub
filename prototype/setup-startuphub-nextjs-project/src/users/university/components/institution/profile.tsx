import { Building2, ExternalLink, Globe2, Mail, MapPin, Phone } from "lucide-react";
import { PageIntro, Panel } from "@/components/app/widgets";
import { INSTITUTION } from "../../constants/institution-data";

export function InstitutionProfile() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Institution profile"
        description="How your institution appears across StartupHub — to startups seeking technology, corporates seeking research, and funders scanning capacity."
        action={
          <a
            href="#"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-4 text-[13px] font-medium text-slate-600 transition-colors hover:bg-soft"
          >
            <ExternalLink className="h-4 w-4" /> View public profile
          </a>
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
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border-4 border-white bg-accent text-[20px] font-bold text-white shadow-card">
                CU
              </span>
              <div className="pb-1">
                <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">
                  {INSTITUTION.name}
                </h2>
                <p className="flex items-center gap-2 text-[12.5px] text-slate-400">
                  <Building2 className="h-3.5 w-3.5" />
                  {INSTITUTION.type} · {INSTITUTION.founded}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-semibold text-accent-deep">
              Verified institution
            </span>
          </div>
          <p className="mt-5 max-w-3xl text-[13.5px] leading-relaxed text-slate-600">
            {INSTITUTION.overview}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-5">
            {INSTITUTION.stats.map((s) => (
              <div key={s.label}>
                <p className="text-[22px] font-semibold tracking-[-0.02em] text-ink">{s.value}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Research areas & specializations">
          <div className="flex flex-wrap gap-2">
            {INSTITUTION.researchAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-line bg-soft px-3 py-1.5 text-[12.5px] font-medium text-slate-600"
              >
                {area}
              </span>
            ))}
          </div>
        </Panel>

        <Panel title="Core facilities">
          <ul className="grid gap-2 sm:grid-cols-2">
            {INSTITUTION.facilities.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[13px] text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Industry partnerships">
          <div className="flex flex-wrap gap-2">
            {INSTITUTION.partners.map((p) => (
              <span
                key={p}
                className="rounded-full bg-accent-soft px-3 py-1.5 text-[12.5px] font-semibold text-accent-deep"
              >
                {p}
              </span>
            ))}
          </div>
        </Panel>

        <Panel title="Contact — Technology Transfer Office">
          <ul className="space-y-2.5 text-[13px] text-slate-600">
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-slate-400" /> {INSTITUTION.contact.office}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-slate-400" /> {INSTITUTION.contact.email}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-slate-400" /> {INSTITUTION.contact.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <Globe2 className="h-4 w-4 text-slate-400" />
              <span className="font-medium text-accent-deep">{INSTITUTION.contact.profile}</span>
            </li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}
