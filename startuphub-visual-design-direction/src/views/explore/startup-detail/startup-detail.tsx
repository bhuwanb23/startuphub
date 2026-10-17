import { Container } from "@/components/ui";
import DetailHero from "@/views/explore/startup-detail/components/detail-hero";
import DetailMain from "@/views/explore/startup-detail/components/detail-main";
import DetailSide from "@/views/explore/startup-detail/components/detail-side";
import CTA from "@/components/cta";
import type { Startup } from "@/views/explore/startups/constants/startups";

export function StartupDetailView({ s }: { s: Startup }) {
  return (
    <>
      <DetailHero s={s} />
      <section className="bg-soft py-14 md:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <DetailMain s={s} />
            <DetailSide s={s} />
          </div>
        </Container>
      </section>
      <CTA
        title={`Interested in ${s.name}?`}
        lead="Join StartupHub to request an introduction, open the data room or track this startup's progress."
        primary={{ label: "Request an introduction", href: "/register" }}
        secondary={{ label: "Back to directory", href: "/explore/startups" }}
      />
    </>
  );
}
