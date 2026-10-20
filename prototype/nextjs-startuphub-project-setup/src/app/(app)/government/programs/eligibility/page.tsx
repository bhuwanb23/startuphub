import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { StartupEligibility } from "@/users/government/components/programs";

export const metadata: Metadata = { title: "Startup Eligibility · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Startup Eligibility">
      <StartupEligibility />
    </GovernmentShell>
  );
}
