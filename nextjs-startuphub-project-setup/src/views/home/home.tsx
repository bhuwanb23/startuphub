import { asc } from "drizzle-orm";
import { db } from "@/db";
import {
  ecosystemStats,
  marketSectors,
  opportunities,
  startups,
} from "@/db/schema";
import {
  fallbackOpportunities,
  fallbackSectors,
  fallbackStartups,
  fallbackStats,
  type OpportunityItem,
  type SectorItem,
  type StartupItem,
  type StatItem,
} from "@/lib/data";
import { Cta } from "./components/cta";
import { Ecosystem } from "./components/ecosystem";
import { Hero } from "./components/hero";
import { Intelligence } from "./components/intelligence";
import { Lifecycle } from "./components/lifecycle";
import { Opportunities } from "./components/opportunities";
import { Platform } from "./components/platform";
import { Showcase } from "./components/showcase";
import { StatsStrip } from "./components/stats-strip";
import { Stories } from "./components/stories";

type PageData = {
  stats: StatItem[];
  startups: StartupItem[];
  opportunities: OpportunityItem[];
  sectors: SectorItem[];
};

async function getPageData(): Promise<PageData> {
  try {
    const [statsRows, startupRows, opportunityRows, sectorRows] =
      await Promise.all([
        db.select().from(ecosystemStats).orderBy(asc(ecosystemStats.sortOrder)),
        db.select().from(startups).orderBy(asc(startups.sortOrder)),
        db.select().from(opportunities).orderBy(asc(opportunities.sortOrder)),
        db.select().from(marketSectors).orderBy(asc(marketSectors.sortOrder)),
      ]);

    if (!statsRows.length || !startupRows.length) throw new Error("empty");

    return {
      stats: statsRows.map((r) => ({
        id: r.id,
        label: r.label,
        value: r.value,
        decimals: r.decimals,
        prefix: r.prefix ?? "",
        suffix: r.suffix ?? "",
        subtext: r.subtext ?? "",
      })),
      startups: startupRows.map((r) => ({
        id: r.id,
        name: r.name,
        sector: r.sector,
        stage: r.stage,
        location: r.location,
        description: r.description,
        traction: r.traction,
        mark: r.mark,
        featured: r.featured,
      })),
      opportunities: opportunityRows.map((r) => ({
        id: r.id,
        kind: r.kind as OpportunityItem["kind"],
        title: r.title,
        org: r.org,
        meta: r.meta,
        deadline: r.deadline,
      })),
      sectors: sectorRows.map((r) => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        marketSize: r.marketSize,
        growth: r.growth,
        activeStartups: r.activeStartups,
        insight: r.insight,
        sparkline: r.sparkline as number[],
        trends: r.trends as string[],
        emerging: r.emerging as SectorItem["emerging"],
        investment: r.investment as SectorItem["investment"],
        ip: r.ip as SectorItem["ip"],
      })),
    };
  } catch {
    /* Database not provisioned yet — render with bundled content. */
    return {
      stats: fallbackStats,
      startups: fallbackStartups,
      opportunities: fallbackOpportunities,
      sectors: fallbackSectors,
    };
  }
}

export async function HomeView() {
  const data = await getPageData();

  return (
    <>
      <Hero />
      <StatsStrip stats={data.stats} />
      <Lifecycle />
      <Platform />
      <Ecosystem />
      <Intelligence sectors={data.sectors} />
      <Showcase startups={data.startups} />
      <Opportunities items={data.opportunities} />
      <Stories />
      <Cta />
    </>
  );
}
