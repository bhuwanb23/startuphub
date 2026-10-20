import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { StartupMatching } from "@/users/talent/components/discover/matching";

export const metadata: Metadata = { title: "Startup Matching · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Startup Matching">
      <StartupMatching />
    </TalentShell>
  );
}
