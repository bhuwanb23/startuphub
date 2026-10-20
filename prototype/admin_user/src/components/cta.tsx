import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink, Container } from "@/components/ui";
import { Reveal } from "@/components/motion";

export function CTA({
  eyebrow = "Begin Here",
  title,
  lead,
  primary = { label: "Get Started", href: "/register" },
  secondary,
  footnote = "Free to start · Onboard in minutes · Cancel anytime",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  footnote?: string;
}) {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-20 text-center sm:px-12 sm:py-24">
            {/* faint ecosystem lines */}
            <svg
              viewBox="0 0 1200 500"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              <g stroke="#8aa0f0" strokeWidth="1" fill="none">
                <path d="M120,420 C300,300 420,340 600,240 C780,140 900,180 1080,90" />
                <path d="M80,140 C260,220 460,120 640,220 C820,320 980,260 1140,340" />
                <path d="M600,60 C600,180 600,320 600,470" />
              </g>
              <g fill="#8aa0f0">
                <circle cx="120" cy="420" r="4" />
                <circle cx="600" cy="240" r="5" />
                <circle cx="1080" cy="90" r="4" />
                <circle cx="80" cy="140" r="4" />
                <circle cx="640" cy="220" r="4" />
                <circle cx="1140" cy="340" r="4" />
                <circle cx="600" cy="60" r="4" />
                <circle cx="600" cy="470" r="4" />
              </g>
            </svg>
            <div
              className="absolute -top-48 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]"
              aria-hidden
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                <span className="h-1.5 w-1.5 rounded-[2px] bg-accent" />
                {eyebrow}
              </span>
              <h2 className="mx-auto mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl">
                {title}
              </h2>
              {lead ? (
                <p className="mx-auto mt-5 max-w-lg text-pretty text-[16px] leading-relaxed text-slate-400">
                  {lead}
                </p>
              ) : null}
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={primary.href}
                  className="group inline-flex h-11 items-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-ink transition hover:bg-slate-100"
                >
                  {primary.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                {secondary ? (
                  <Link
                    href={secondary.href}
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 px-6 text-sm font-semibold text-white transition hover:bg-white/5"
                  >
                    {secondary.label}
                  </Link>
                ) : null}
              </div>
              {footnote ? (
                <p className="mt-7 text-[12px] font-medium text-slate-500">
                  {footnote}
                </p>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export { ButtonLink };
