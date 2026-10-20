import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { BeneficiaryPerformance } from "@/users/government/components/performance";

export const metadata: Metadata = { title: "Beneficiary Performance · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Beneficiary Performance">
      <BeneficiaryPerformance />
    </GovernmentShell>
  );
}
