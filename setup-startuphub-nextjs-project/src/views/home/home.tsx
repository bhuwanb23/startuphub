import { asc } from "drizzle-orm";
import { db } from "@/db";
import {
  marketSectors,
  opportunities,
  startups,
  stories,
} from "@/db/schema";
import { CTA } from "@/components/cta";
import { Hero } from "./components/hero";
import { Stats } from "./components/stats";
import { Lifecycle } from "./components/lifecycle";
import { Pillars } from "./components/pillars";
import { EcosystemMap } from "./components/ecosystem-map";
import { MarketPanel } from "./components/market-panel";
import { Startups } from "./components/startups";
import { Opportunities } from "./components/opportunities";
import { Stories } from "./components/stories";
import {
  FALLBACK_OPPORTUNITIES,
  FALLBACK_SECTORS,
  FALLBACK_STARTUPS,
  FALLBACK_STORIES,
} from "./constants/home-data";

/* The view composes components; components render constants.
   DB-backed sections degrade gracefully to seed fallbacks. */

async function loadData() {
  try {
    const [startupRows, opportunityRows, sectorRows, storyRows] =
      await Promise.all([
        db.select().from(startups).orderBy(asc(startups.id)).limit(3),
        db.select().from(opportunities).orderBy(asc(opportunities.id)).limit(3),
        db.select().from(marketSectors).orderBy(asc(marketSectors.id)).limit(4),
        db.select().from(stories).orderBy(asc(stories.id)).limit(2),
      ]);
    return {
      startups: startupRows.length ? startupRows : FALLBACK_STARTUPS,
      opportunities: opportunityRows.length
        ? opportunityRows
        : FALLBACK_OPPORTUNITIES,
      sectors: sectorRows.length ? sectorRows : FALLBACK_SECTORS,
      stories: storyRows.length ? storyRows : FALLBACK_STORIES,
    };
  } catch {
    return {
      startups: FALLBACK_STARTUPS,
      opportunities: FALLBACK_OPPORTUNITIES,
      sectors: FALLBACK_SECTORS,
      stories: FALLBACK_STORIES,
    };
  }
}

export async function HomeView() {
  const data = await loadData();

  return (
    <div id="top" className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <Lifecycle />
      <Pillars />
      <EcosystemMap />
      <MarketPanel sectors={data.sectors} />
      <Startups startups={data.startups} />
      <Opportunities opportunities={data.opportunities} />
      <Stories stories={data.stories} />
      <CTA />
    </div>
  );
}
