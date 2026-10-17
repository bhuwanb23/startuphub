import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { IncubatorDiscover } from "@/users/startup/components/incubation/discover";

export const metadata: Metadata = { title: "Discover Incubators · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Discover Incubators">
      <IncubatorDiscover />
    </FounderShell>
  );
}
