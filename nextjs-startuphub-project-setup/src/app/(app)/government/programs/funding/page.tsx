import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { FundingPrograms } from "@/users/government/components/programs";

export const metadata: Metadata = { title: "Funding Programs · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Funding Programs">
      <FundingPrograms />
    </GovernmentShell>
  );
}
