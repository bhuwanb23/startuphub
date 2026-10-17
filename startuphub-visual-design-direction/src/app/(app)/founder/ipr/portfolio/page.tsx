import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { IpPortfolio } from "@/users/startup/components/ipr/portfolio";

export const metadata: Metadata = { title: "IP Portfolio · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="IP Portfolio">
      <IpPortfolio />
    </FounderShell>
  );
}
