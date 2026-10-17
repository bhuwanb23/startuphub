import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";

export default function MissionVision() {
  return (
    <section className="border-y border-line bg-accent-mist py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Our Mission</Eyebrow>
            <p className="mt-6 text-balance text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
              To make the path from idea to impact{" "}
              <span className="text-accent">radically shorter</span> — for every
              founder, everywhere.
            </p>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-500">
              Talent is evenly distributed. Access is not. We build the
              infrastructure that closes that gap — so a founder in a small town
              gets the same shot as one in a major startup hub.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <Eyebrow>Our Vision</Eyebrow>
            <p className="mt-6 text-balance text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
              A world where no promising startup fails{" "}
              <span className="text-accent">for lack of connection.</span>
            </p>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-500">
              The best mentor, the right investor, the exact resource — we
              believe these should find the startup, not the other way around.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
