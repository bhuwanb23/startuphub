import { Radar } from "lucide-react";

/* Placeholder for workspace screens that are designed but not yet built —
   paired with the `soon` chip in sidebar sub-navigation. */
export function ComingSoon({
  title,
  blurb,
}: {
  title: string;
  blurb?: string;
}) {
  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <div className="max-w-sm rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-10 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
          <Radar className="h-5 w-5 text-accent" />
        </span>
        <h2 className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-ink">
          {title}
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">
          {blurb ??
            "This workspace screen is shipping soon. The navigation is already wired — the surface is on the roadmap."}
        </p>
        <span className="mt-5 inline-block rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent-deep">
          Coming soon
        </span>
      </div>
    </div>
  );
}
