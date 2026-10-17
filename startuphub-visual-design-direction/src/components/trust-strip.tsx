const partners = [
  "Northgate Ventures",
  "Meridian Labs",
  "Atlas Capital",
  "Foundry Six",
  "Cobalt Partners",
  "Horizon Fund",
  "Nexus Angels",
  "Vertex Global",
];

export default function TrustStrip({
  label = "Powering the ecosystem behind 10,000+ startups",
}: {
  label?: string;
}) {
  const row = [...partners, ...partners];
  return (
    <section className="border-b border-line bg-white py-10">
      <p className="mb-7 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
        {label}
      </p>
      <div className="marquee-root mask-x-fade overflow-hidden">
        <div className="anim-marquee flex w-max items-center gap-14 pr-14">
          {row.map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="flex items-center gap-14 whitespace-nowrap text-sm font-semibold tracking-wide text-slate-400 transition-colors hover:text-ink"
            >
              {p}
              <span className="h-1 w-1 rounded-full bg-slate-200" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
