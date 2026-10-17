import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Resources } from "@/users/startup/components/resources/resources";

export const metadata: Metadata = { title: "Resources · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Resources">
      <Resources />
    </FounderShell>
  );
}
