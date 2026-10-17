import { Badge, Card, PageHeader } from "@/components/app/widgets";
import { cn } from "@/lib/utils";

const week = [
  { day: "Tue 08", slots: [{ t: "15:00", state: "booked" as const, who: "GridSense" }, { t: "16:00", state: "open" as const }, { t: "17:00", state: "blocked" as const }] },
  { day: "Wed 09", slots: [{ t: "15:00", state: "open" as const }, { t: "16:00", state: "booked" as const, who: "Lumen AI" }, { t: "18:00", state: "open" as const }] },
  { day: "Thu 10", slots: [{ t: "15:00", state: "booked" as const, who: "BloomBio intro" }, { t: "16:00", state: "open" as const }, { t: "17:00", state: "open" as const }] },
  { day: "Fri 11", slots: [{ t: "off", state: "off" as const }] },
];

export function Scheduling() {
  return (
    <div className="space-y-5">
      <PageHeader title="Session Scheduling" desc="Founders book into your live availability — no back-and-forth, no double-books." />
      <Card title="This week's availability">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {week.map((d) => (
            <div key={d.day}>
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-slate-400">{d.day}</p>
              <div className="mt-3 space-y-2">
                {d.slots.map((s) => (
                  <div
                    key={s.t}
                    className={cn(
                      "rounded-xl border p-3.5 text-center",
                      s.state === "booked" && "border-accent/30 bg-accent-mist",
                      s.state === "open" && "border-line bg-white transition-colors hover:border-accent/40",
                      s.state === "blocked" && "border-slate-200 bg-slate-50",
                      s.state === "off" && "border-dashed border-line bg-soft/60"
                    )}
                  >
                    <p className={cn("text-[13px] font-semibold", s.state === "open" ? "text-accent" : s.state === "off" ? "text-slate-300" : "text-ink")}>
                      {s.t === "off" ? "Rest day" : s.t}
                    </p>
                    {s.state === "booked" && <p className="mt-0.5 text-[10.5px] text-accent font-medium">{s.who}</p>}
                    {s.state === "blocked" && <p className="mt-0.5 text-[10.5px] text-slate-400">Blocked</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Scheduling preferences" action={<button className="text-[12px] font-semibold text-accent">Edit</button>}>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Slots per week", "2", "Hard cap — enforce quality"],
            ["Max back-to-back", "0", "15-min buffer between sessions"],
            ["Advance notice", "48 h", "Founders must book 2 days out"],
          ].map(([l, v, note]) => (
            <div key={l} className="rounded-xl border border-line p-4">
              <span className="text-lg font-semibold text-ink">{v}</span>
              <p className="mt-1 text-[12px] font-medium text-slate-500">{l}</p>
              <p className="mt-1.5 text-[11px] text-slate-400">{note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-accent-mist p-4 text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-semibold text-ink">Copilot:</span> BloomBio&apos;s intro is booked Thursday 15:00 — but you still have Wednesday 16:00 free after Lumen AI. Moving it forward avoids a 2-day wait for an intake startup.
        </div>
      </Card>
    </div>
  );
}
