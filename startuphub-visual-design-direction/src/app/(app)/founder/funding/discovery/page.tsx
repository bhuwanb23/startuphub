import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { FundingDiscovery } from "@/users/startup/components/funding/discovery";

export const metadata: Metadata = { title: "Funding Discovery · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Funding Discovery">
      <FundingDiscovery />
    </FounderShell>
  );
}
