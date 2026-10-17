"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MousePointerClick } from "lucide-react";
import {
  ECO_TYPES,
  ecoIndustries,
  ecoLocations,
  ecoStages,
  entities,
  links,
  typeStyles,
  type EcoEntity,
  type EcoType,
} from "@/views/ecosystem-map/constants/map-data";
import { cn } from "@/lib/utils";

const byId = new Map(entities.map((e) => [e.id, e]));

function Select({
  label, value, options, onChange,
}: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-10 appearance-none rounded-[10px] border border-line bg-white pl-3 pr-8 text-[12.5px] font-medium focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15",
          value ? "text-ink" : "text-slate-500"
        )}
        aria-label={label}
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

export default function EcoMap() {
  const [type, setType] = useState<EcoType | "">("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [active, setActive] = useState<EcoEntity | null>(null);

  const stageTags: Record<string, string> = {
    Validation: "Pre-seed",
    MVP: "Seed",
    Growth: "Series A",
    Scale: "Series B",
  };

  const matches = (e: EcoEntity) => {
    if (type && e.type !== type) return false;
    if (location && e.location !== location) return false;
    if (industry && e.industry !== industry) return false;
    if (stage) {
      if (e.type !== "Startups") return false;
      if (stageTags[stage] && !e.note.includes(stageTags[stage])) return false;
    }
    return true;
  };

  const visible = entities.filter(matches);
  const visibleIds = new Set(visible.map((e) => e.id));
  const visibleLinks = links.filter(([a, b]) => visibleIds.has(a) && visibleIds.has(b));

  const countFor = (t: EcoType) => entities.filter((e) => (type ? e.type === type : true) && e.type === t).length;

  const related = useMemo(() => {
    if (!active) return [];
    const out = new Set<string>(active.links ?? []);
    links.forEach(([a, b]) => {
      if (a === active.id) out.add(b);
      if (b === active.id) out.add(a);
    });
    return [...out].map((id) => byId.get(id)).filter(Boolean) as EcoEntity[];
  }, [active]);

  return (
    <div className="flex flex-col gap-4">
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setType("")}
          className={cn(
            "rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-all",
            type === "" ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
          )}
        >
          All ({entities.length})
        </button>
        {ECO_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType((v) => (v === t ? "" : t))}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-all",
              type === t ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
            )}
          >
            {t} ({countFor(t)})
          </button>
        ))}
        <div className="ml-auto flex flex-wrap gap-2">
          <Select label="Location" value={location} options={ecoLocations} onChange={setLocation} />
          <Select label="Industry" value={industry} options={ecoIndustries} onChange={setIndustry} />
          <Select label="Startup Stage" value={stage} options={ecoStages} onChange={setStage} />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        {/* map canvas */}
        <div className="bg-dotgrid relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-white">
          {/* connection lines */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {visibleLinks.map(([a, b]) => {
              const A = byId.get(a)!;
              const B = byId.get(b)!;
              const live = active ? a === active.id || b === active.id : false;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                  stroke={live ? "#3157E8" : "#C9D4EC"}
                  strokeWidth={live ? 0.45 : 0.25}
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "stroke .25s" }}
                />
              );
            })}
          </svg>

          {/* nodes */}
          {visible.map((e) => {
            const st = typeStyles[e.type];
            const isActive = active?.id === e.id;
            const dimmed = active && !isActive && !related.some((r) => r.id === e.id);
            return (
              <button
                key={e.id}
                onClick={() => setActive((v) => (v?.id === e.id ? null : e))}
                onMouseEnter={() => !active && setHoverTip(e, true)}
                onMouseLeave={() => !active && setHoverTip(e, false)}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${e.x}%`, top: `${e.y}%`, opacity: dimmed ? 0.25 : 1, transition: "opacity .25s" }}
                aria-label={`${e.name} — ${e.type}`}
              >
                <span
                  className={cn(
                    "block rounded-full transition-all duration-200 group-hover:scale-125",
                    st.dot.split(" ").filter((c) => !["rotate-45"].includes(c)).join(" "),
                    e.type === "Investors" && "rotate-45 rounded-sm",
                    (e.type === "Corporates" || e.type === "Investors") && "rounded-[3px]",
                    isActive && "scale-125"
                  )}
                  style={{ width: st.size, height: st.size }}
                />
                {/* tooltip */}
                <span
                  className={cn(
                    "pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-44 -translate-x-1/2 rounded-xl border border-line bg-white p-3 text-left opacity-0 shadow-[0_16px_36px_-14px_rgba(11,18,32,0.3)] transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100",
                    isActive && "-translate-y-1 opacity-100"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <span className={cn("rounded px-1.5 py-px text-[9px] font-bold uppercase tracking-wide", st.chip)}>
                      {e.type}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-[13px] font-semibold text-ink">{e.name}</span>
                  <span className="block text-[11px] text-slate-400">{e.note}</span>
                  <span className="mt-1 block text-[10.5px] font-medium text-slate-400">
                    {e.location} · {e.industry}
                  </span>
                </span>
              </button>
            );
          })}

          {/* hint */}
          <span className="pointer-events-none absolute bottom-3 left-3.5 flex items-center gap-1.5 rounded-full border border-line bg-white/90 px-3 py-1.5 text-[11px] font-medium text-slate-400 backdrop-blur">
            <MousePointerClick className="h-3 w-3 text-accent" />
            Click any node to trace its connections
          </span>
          <span className="pointer-events-none absolute right-3.5 top-3 rounded-full border border-line bg-white/90 px-3 py-1.5 text-[11px] font-medium text-slate-400 backdrop-blur">
            {visible.length} orgs · {visibleLinks.length} connections
          </span>
        </div>

        {/* side panel */}
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-accent/25 bg-white p-5 shadow-[0_18px_40px_-22px_rgba(49,87,232,0.4)]"
              >
                <span className={cn("inline-block rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide", typeStyles[active.type].chip)}>
                  {active.type}
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{active.name}</h3>
                <p className="mt-1 text-[13px] text-slate-500">{active.note}</p>
                <p className="mt-3 border-t border-line pt-3 text-[12px] text-slate-400">
                  {active.location} · {active.industry}
                </p>
                <div className="mt-4">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                    Connected to ({related.length})
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {related.map((r) => (
                      <li key={r.id}>
                        <button
                          onClick={() => setActive(r)}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12.5px] font-medium text-slate-600 transition-colors hover:bg-accent-mist hover:text-ink"
                        >
                          <span className={cn("h-2 w-2 rounded-full", typeStyles[r.type].dot.split(" ")[0])} />
                          {r.name}
                          <span className="ml-auto text-[10px] text-slate-300">{r.type}</span>
                        </button>
                      </li>
                    ))}
                    {related.length === 0 && (
                      <li className="px-2 py-1.5 text-[12.5px] text-slate-400">
                        No mapped links yet — connections grow with activity.
                      </li>
                    )}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-2xl border border-dashed border-line bg-white/70 p-5"
              >
                <p className="text-[13px] font-medium text-slate-500">
                  Select any organization on the map to inspect it and trace how it connects to the rest of the ecosystem.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* legend */}
          <div className="rounded-2xl border border-line bg-white p-5">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-300">Legend</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
              {ECO_TYPES.map((t) => (
                <li key={t} className="flex items-center gap-2 text-[11.5px] text-slate-500">
                  <span className={cn("h-2.5 w-2.5 rounded-full", typeStyles[t].dot.split(" ")[0])} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function setHoverTip(_e: EcoEntity, _on: boolean) {
  /* tooltip handled purely via CSS group-hover; stub kept for clarity */
}
