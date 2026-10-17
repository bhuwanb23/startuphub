import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import TrustStrip from "@/components/trust-strip";
import Lifecycle from "@/components/lifecycle";
import Platform from "@/components/platform";
import Stats from "@/components/stats";
import Ecosystem from "@/components/ecosystem";
import Intelligence from "@/components/intelligence";
import Showcase from "@/components/showcase";
import Resources from "@/components/resources";
import Stories from "@/components/stories";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Lifecycle />
        <Platform />
        <Stats />
        <Ecosystem />
        <Intelligence />
        <Showcase />
        <Resources />
        <Stories />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
