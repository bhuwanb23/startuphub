import type { Metadata } from "next";
import { InvestorsView } from "@/views/solutions/investors/investors";

export const metadata: Metadata = {
  title: "For Investors — StartupHub",
  description:
    "Discover startups with AI deal matching, startup intelligence, structured due diligence, clean deal flow and portfolio monitoring.",
};

export default function Page() {
  return <InvestorsView />;
}
