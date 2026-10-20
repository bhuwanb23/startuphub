import { CTA } from "@/components/cta";
import { EcosystemMap } from "./components/ecosystem-map";
import { Hero } from "./components/hero";
import { Lifecycle } from "./components/lifecycle";
import { MarketIntel } from "./components/market-intel";
import { Opportunities } from "./components/opportunities";
import { Platform } from "./components/platform";
import { Showcase } from "./components/showcase";
import { StatsBand } from "./components/stats-band";
import { Stories } from "./components/stories";
import {
  HOME_OPPORTUNITIES,
  HOME_STARTUPS,
  HOME_STORIES,
} from "./constants/directory";

export default function HomeView() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Lifecycle />
      <Platform />
      <EcosystemMap />
      <MarketIntel />
      <Showcase startups={HOME_STARTUPS} />
      <Opportunities opportunities={HOME_OPPORTUNITIES} />
      <Stories stories={HOME_STORIES} />
      <CTA
        title="Ready to build what's next?"
        lead="Join 10,000+ founders building inside one connected ecosystem. Free to start — upgrade when you do."
        primary={{ label: "Get Started", href: "/register" }}
        secondary={{ label: "Talk to our team", href: "/contact" }}
      />
    </>
  );
}
