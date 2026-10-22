import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Trends } from "@/users/startup/components/market/trends";

export const metadata: Metadata = { title: "Trends · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Trends">
      <Trends />
    </FounderShell>
  );
}
