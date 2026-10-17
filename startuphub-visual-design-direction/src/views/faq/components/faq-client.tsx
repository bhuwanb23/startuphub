"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Search, SearchX } from "lucide-react";
import { faqCategories, faqs } from "@/views/faq/constants/faq";
import { cn } from "@/lib/utils";

export default function FaqClient() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs
      .map((f, i) => ({ ...f, idx: i }))
      .filter((f) => {
        if (cat && f.cat !== cat) return false;
        if (!q) return true;
        return [f.q, f.a].join(" ").toLowerCase().includes(q);
      });
  }, [query, cat]);

  const countFor = (c: string) => faqs.filter((f) => f.cat === c).length;

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
      {/* side: search + categories */}
      <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search answers…"
            className="h-12 w-full rounded-xl border border-line bg-white pl-11 pr-4 text-sm text-ink placeholder:text-slate-400 shadow-[0_8px_28px_-18px_rgba(11,18,32,0.18)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
          />
        </div>
        <div className="flex flex-wrap gap-2 lg:flex-col">
          <CatButton active={cat === ""} onClick={() => setCat("")} label="All topics" count={faqs.length} />
          {faqCategories.map((c) => (
            <CatButton key={c} active={cat === c} onClick={() => setCat((v) => (v === c ? "" : c))} label={c} count={countFor(c)} />
          ))}
        </div>
      </div>

      {/* accordion */}
      <div>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-white/70 py-20 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-slate-300">
              <SearchX className="h-5 w-5" />
            </span>
            <p className="mt-4 text-[15px] font-semibold text-ink">No answers match</p>
            <p className="mt-1 text-sm text-slate-400">
              Try different words — or <a className="font-semibold text-accent" href="/contact">ask us directly</a>.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((f) => {
              const isOpen = open === f.idx;
              return (
                <div
                  key={f.idx}
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-white transition-colors",
                    isOpen ? "border-accent/30 shadow-[0_14px_36px_-20px_rgba(49,87,232,0.35)]" : "border-line"
                  )}
                >
                  <button
                    onClick={() => setOpen((v) => (v === f.idx ? null : f.idx))}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    <span className="hidden shrink-0 rounded-md bg-accent-soft px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent sm:block">
                      {f.cat}
                    </span>
                    <span className="flex-1 text-[15.5px] font-semibold text-ink">{f.q}</span>
                    <span
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors",
                        isOpen ? "bg-accent text-white" : "bg-slate-100 text-slate-400"
                      )}
                    >
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <p className="px-6 pb-6 text-[14.5px] leading-relaxed text-slate-500 sm:pl-[104px]">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CatButton({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-[13.5px] font-medium transition-all lg:w-full",
        active ? "border-accent bg-accent text-white" : "border-line bg-white text-slate-600 hover:border-slate-300"
      )}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-[11px] font-semibold",
          active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
        )}
      >
        {count}
      </span>
    </button>
  );
}
