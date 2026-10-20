import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { AllocationTracking } from "@/users/government/components/funding";

export const metadata: Metadata = { title: "Allocation Tracking · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Allocation Tracking">
      <AllocationTracking />
    </GovernmentShell>
  );
}
