import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentOffers } from "@/users/talent/components/applications/offers";

export const metadata: Metadata = { title: "Offers · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Offers">
      <TalentOffers />
    </TalentShell>
  );
}
