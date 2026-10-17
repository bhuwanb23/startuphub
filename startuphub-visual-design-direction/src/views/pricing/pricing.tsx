import PageHero from "@/components/page-hero";
import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import PricingClient from "@/views/pricing/components/pricing-client";
import { pricingFaq } from "@/views/pricing/constants/plans";
import CTA from "@/components/cta";

export function PricingView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        eyebrow="Pricing & Plans"
        title={
          <>
            Start free. Pay when it&apos;s{" "}
            <span className="text-accent">already working.</span>
          </>
        }
        lead="The public ecosystem stays free forever. Paid plans unlock the working tools — matched to whether you're building, backing or running programs."
      />

      <section className="bg-white py-20 md:py-24">
        <Container>
          <PricingClient />
        </Container>
      </section>

      <section className="border-t border-line bg-soft py-24 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Pricing FAQ"
            title={
              <>
                Fair questions, <span className="text-accent">straight answers.</span>
              </>
            }
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {pricingFaq.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="rounded-2xl border border-line bg-white p-6">
                  <h3 className="text-[15.5px] font-semibold text-ink">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        title="Not sure which plan fits?"
        lead="Start free — the platform reads your stage and recommends the right plan when you actually need it."
        primary={{ label: "Start free", href: "/register" }}
        secondary={{ label: "Talk to us", href: "/contact" }}
        note="14-day trials on paid plans · Cancel anytime · GST invoices included"
      />
    </>
  );
}
