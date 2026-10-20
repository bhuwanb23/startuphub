import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { ResearchFunding } from "@/users/university/components/research/funding";

export const metadata: Metadata = { title: "Research Funding · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Research Funding">
      <ResearchFunding />
    </UniversityShell>
  );
}
