import { GraduationCap, Search, UserPlus, Users, UsersRound } from "lucide-react";
import { Avatar, PageIntro, Panel, StatCard } from "@/components/app/widgets";
import {
  EXPERTISE_DOMAINS,
  PEOPLE_STATS,
  RESEARCHERS,
} from "../../constants/people-data";

const STAT_ICONS = [Users, GraduationCap, UsersRound, UserPlus] as const;

export function UniversityPeople() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="People & expertise"
        description="Researchers, faculty specialists and student talent — the expertise graph startups and corporates search before they knock."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <UserPlus className="h-4 w-4" /> Add researcher
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {PEOPLE_STATS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} hint={s.hint} icon={STAT_ICONS[i]} />
        ))}
      </div>

      {/* search bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-line bg-white p-3.5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-line bg-soft px-3.5 py-2.5 text-[13.5px] text-slate-400">
          <Search className="h-4 w-4" />
          Search expertise, technologies or people…
        </div>
        <div className="flex gap-2">
          {["All", "Available", "Industry experience", "Patent holders"].map((f, i) => (
            <span
              key={f}
              className={`rounded-full px-3 py-2 text-[12px] font-medium ${
                i === 0 ? "bg-ink text-white" : "bg-soft text-slate-500"
              }`}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        {/* directory */}
        <div className="grid content-start gap-4">
          {RESEARCHERS.map((r) => (
            <article
              key={r.name}
              className="rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(11,18,32,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <Avatar name={r.name} className="h-11 w-11 text-[13px]" />
                  <div>
                    <h3 className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em] text-ink">
                      {r.name}
                      <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        r.available ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${r.available ? "bg-emerald-500" : "bg-slate-400"}`} />
                        {r.available ? "Consulting open" : "At capacity"}
                      </span>
                    </h3>
                    <p className="text-[12px] text-slate-400">{r.title} · {r.dept}</p>
                  </div>
                </div>
                <button className="rounded-lg border border-line px-3 py-1.5 text-[12px] font-semibold text-ink transition-colors hover:border-accent-200 hover:bg-accent-soft hover:text-accent-deep">
                  View profile
                </button>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-slate-500">{r.focus}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.interests.map((tag) => (
                  <span key={tag} className="rounded-full bg-soft px-2.5 py-1 text-[11.5px] font-medium text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-5 border-t border-line pt-3.5 text-[12px] text-slate-500">
                <span><span className="font-semibold text-ink">{r.pubs}</span> publications</span>
                <span><span className="font-semibold text-ink">{r.patents}</span> patents</span>
                <span><span className="font-semibold text-ink">{r.projects}</span> active projects</span>
              </div>
            </article>
          ))}
        </div>

        {/* expertise domains */}
        <Panel title="Expertise directory">
          <ul className="space-y-3">
            {EXPERTISE_DOMAINS.map((d) => (
              <li key={d.domain} className="flex items-center justify-between gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                <span className="text-[13px] font-medium text-slate-600">{d.domain}</span>
                <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11.5px] font-bold text-accent-deep">
                  {d.experts} experts
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-accent-mist px-3.5 py-3 text-[12px] leading-relaxed text-slate-600">
            62 researchers are publicly discoverable. Profiles marked
            &ldquo;industry-ready&rdquo; get 4× more corporate enquiries.
          </p>
        </Panel>
      </div>
    </div>
  );
}
