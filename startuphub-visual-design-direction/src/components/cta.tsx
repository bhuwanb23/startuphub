import { ArrowGlyph, ButtonLink, Container } from "@/components/ui";
import { Reveal } from "@/components/motion";

export default function CTA({
  title = "Ready to build what's next?",
  lead = "Join 10,000+ founders moving faster with one connected ecosystem — from first idea to lasting impact.",
  primary = { label: "Get Started — it's free", href: "/register" },
  secondary = { label: "Explore the platform", href: "/platform" },
  note = "Free to start · No credit card required · Your IP stays yours",
}: {
  title?: string;
  lead?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  note?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-line bg-white py-28 md:py-36">
      <div
        aria-hidden="true"
        className="bg-nodegrid absolute inset-0 [mask-image:radial-gradient(ellipse_55%_65%_at_50%_45%,black_20%,transparent)]"
      />
      <Container className="relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal>
            <svg viewBox="0 0 120 32" className="mx-auto h-8 w-auto" aria-hidden="true">
              <path
                d="M20 16h24M76 16h24"
                stroke="#3157E8"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="1 5"
              />
              <circle cx="12" cy="16" r="5" fill="#3157E8" />
              <circle cx="60" cy="16" r="5" fill="none" stroke="#3157E8" strokeWidth="1.6" />
              <circle cx="108" cy="16" r="5" fill="#0B1220" />
            </svg>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 text-balance text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-slate-500">
              {lead}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primary.href} size="lg">
                {primary.label}
                <ArrowGlyph />
              </ButtonLink>
              <ButtonLink href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-[13px] text-slate-400">{note}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
