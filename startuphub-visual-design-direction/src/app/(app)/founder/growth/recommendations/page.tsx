import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Recommendations } from "@/users/startup/components/growth/recommendations";

export const metadata: Metadata = { title: "Recommendations · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Recommendations">
      <Recommendations />
    </FounderShell>
  );
}
