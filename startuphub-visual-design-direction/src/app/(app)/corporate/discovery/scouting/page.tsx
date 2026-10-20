import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { TechnologyScouting } from "@/users/corporate/components/discovery";

export const metadata: Metadata = { title: "Technology Scouting · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Technology Scouting">
      <TechnologyScouting />
    </CorporateShell>
  );
}
