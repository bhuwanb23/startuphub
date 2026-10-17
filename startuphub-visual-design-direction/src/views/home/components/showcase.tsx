import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { featuredStartups } from "@/views/home/constants/data";
import { cn } from "@/lib/utils";

function Art({ variant }: { variant: number }) {
  const common = "absolute inset-0 h-full w-full";
  if (variant === 0)
    return (
      <svg viewBox="0 0 480 260" className={common} aria-hidden="true">
        <g stroke="#3157E8" strokeOpacity="0.22" fill="none">
          <circle cx="240" cy="130" r="52" />
          <circle cx="240" cy="130" r="86" />
          <circle cx="240" cy="130" r="120" strokeDasharray="3 7" />
          <path d="M240 78v-38M292 130h56M240 182v40M188 130h-60M278 92l30-30M202 168l-30 30" />
        </g>
        <g fill="#3157E8">
          <circle cx="240" cy="130" r="6" />
          <circle cx="240" cy="40" r="4" opacity="0.7" />
          <circle cx="348" cy="130" r="4" opacity="0.7" />
          <circle cx="240" cy="222" r="4" opacity="0.7" />
          <circle cx="128" cy="130" r="4" opacity="0.7" />
          <circle cx="308" cy="62" r="3.5" opacity="0.5" />
          <circle cx="172" cy="198" r="3.5" opacity="0.5" />
        </g>
      </svg>
    );
  if (variant === 1)
    return (
      <svg viewBox="0 0 480 260" className={common} aria-hidden="true">
        <g stroke="#3157E8" strokeOpacity="0.22" fill="none">
          <path d="M60 210 150 150l70 30 90-90 70 20" strokeWidth="1.6" />
          <path d="M60 210h340" strokeDasharray="2 6" />
        </g>
        <g fill="#3157E8">
          {[[60, 210], [150, 150], [220, 180], [310, 90], [380, 110]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 3 ? 6 : 4} opacity={i === 3 ? 1 : 0.65} />
          ))}
        </g>
      </svg>
    );
  if (variant === 2)
    return (
      <svg viewBox="0 0 480 260" className={common} aria-hidden="true">
        <path
          d="M40 130h70l24-44 32 88 26-64 20 20h228"
          fill="none" stroke="#3157E8" strokeOpacity="0.35" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <circle cx="166" cy="174" r="5" fill="#3157E8" />
        <circle cx="212" cy="130" r="4" fill="#3157E8" opacity="0.6" />
      </svg>
    );
  if (variant === 3)
    return (
      <svg viewBox="0 0 480 260" className={common} aria-hidden="true">
        <g stroke="#3157E8" strokeOpacity="0.25" fill="none">
          <path d="M240 60v140M240 90l-70 40M240 90l70 40M240 150l-46 34M240 150l46 34" strokeWidth="1.4" />
        </g>
        <g fill="#3157E8">
          <circle cx="240" cy="60" r="6" />
          {[[170, 130], [310, 130], [194, 184], [286, 184], [240, 200]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" opacity="0.6" />
          ))}
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 480 260" className={common} aria-hidden="true">
      <g stroke="#3157E8" strokeOpacity="0.25" fill="none">
        <ellipse cx="240" cy="130" rx="130" ry="52" />
        <ellipse cx="240" cy="130" rx="130" ry="52" transform="rotate(-28 240 130)" strokeDasharray="3 6" />
        <ellipse cx="240" cy="130" rx="130" ry="52" transform="rotate(28 240 130)" strokeDasharray="3 6" />
      </g>
      <circle cx="240" cy="130" r="7" fill="#3157E8" />
      <circle cx="132" cy="96" r="4.5" fill="#3157E8" opacity="0.7" />
      <circle cx="352" cy="168" r="4" fill="#3157E8" opacity="0.55" />
    </svg>
  );
}

export default function Showcase() {
  const [feature, ...rest] = featuredStartups;
  return (
    <section className="border-t border-line bg-soft py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            align="left"
            eyebrow="Featured Startups"
            title={
              <>
                Built on StartupHub. <span className="text-accent">Backed by the ecosystem.</span>
              </>
            }
            lead="A sample of the ventures moving through the platform right now."
          />
          <Reveal delay={0.1}>
            <Link
              href="/explore/startups"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent"
            >
              Browse the full directory
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          <Reveal className="md:col-span-2">
            <StartupCard s={feature} variant={0} feature className="h-full" />
          </Reveal>
          {rest.map((s, i) => (
            <Reveal key={s.slug} delay={0.08 + i * 0.05}>
              <StartupCard s={s} variant={i + 1} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StartupCard({
  s,
  variant,
  feature = false,
  className,
}: {
  s: (typeof featuredStartups)[number];
  variant: number;
  feature?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/explore/startups/${s.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_48px_-24px_rgba(11,18,32,0.25)]",
        className
      )}
    >
      <div className={cn("relative border-b border-line bg-accent-mist/70", feature ? "h-56 md:h-64" : "h-36")}>
        <Art variant={variant} />
        <span className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-[13px] font-bold text-ink shadow-sm">
          {s.initials}
        </span>
        <span className="absolute right-5 top-5 rounded-full border border-line bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500">
          {s.stage}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[17px] font-semibold tracking-tight text-ink">{s.name}</h3>
          <span className="text-[12px] font-medium text-accent">{s.sector}</span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{s.line}</p>
        {feature && "metrics" in s && s.metrics && (
          <div className="mt-5 grid grid-cols-3 divide-x divide-line rounded-xl border border-line">
            {s.metrics.map((m) => (
              <div key={m} className="px-4 py-3 text-center text-[13px] font-semibold text-ink">
                {m}
              </div>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="flex items-center gap-1.5 text-[12px] text-slate-400">
            <MapPin className="h-3.5 w-3.5" />
            {s.place}
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
