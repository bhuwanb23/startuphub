import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { OutcomeTracking } from "@/users/government/components/performance";

export const metadata: Metadata = { title: "Outcome Tracking · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Outcome Tracking">
      <OutcomeTracking />
    </GovernmentShell>
  );
}
