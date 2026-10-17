import type { Metadata } from "next";
import { MarketIntelligenceView } from "@/views/market-intelligence/market-intelligence";

export const metadata: Metadata = {
  title: "Market Intelligence — StartupHub",
  description:
    "Industry insights, market trends, competitor insights, startup trends, reports and infographics — live intelligence for founders.",
};

export default function Page() {
  return <MarketIntelligenceView />;
}
