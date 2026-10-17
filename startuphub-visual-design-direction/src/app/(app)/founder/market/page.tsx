import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Market } from "@/users/startup/components/market/market";

export const metadata: Metadata = { title: "Market Intelligence · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Market Intelligence">
      <Market />
    </FounderShell>
  );
}
