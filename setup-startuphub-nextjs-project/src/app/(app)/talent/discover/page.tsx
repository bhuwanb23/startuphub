import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentDiscover } from "@/users/talent/components/discover/discover";

export const metadata: Metadata = { title: "Discover · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Discover">
      <TalentDiscover />
    </TalentShell>
  );
}
