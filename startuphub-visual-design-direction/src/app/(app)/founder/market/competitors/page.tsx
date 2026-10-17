import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Competitors } from "@/users/startup/components/market/competitors";

export const metadata: Metadata = { title: "Competitor Analysis · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Competitor Analysis">
      <Competitors />
    </FounderShell>
  );
}
