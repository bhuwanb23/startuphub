import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { PitchDeck } from "@/users/startup/components/funding/pitch";

export const metadata: Metadata = { title: "Pitch Deck · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Pitch Deck">
      <PitchDeck />
    </FounderShell>
  );
}
