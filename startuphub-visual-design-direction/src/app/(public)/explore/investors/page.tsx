import type { Metadata } from "next";
import { InvestorsDirectoryView } from "@/views/explore/investors/investors";

export const metadata: Metadata = {
  title: "Investor Directory — StartupHub",
  description:
    "Search verified investors by type, investment stage, sector, geography and investment range — VCs, angels, corporate and government funds.",
};

export default function Page() {
  return <InvestorsDirectoryView />;
}
