import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ScenarioAnalysis } from "@/users/government/components/policy";

export const metadata: Metadata = { title: "Scenario Analysis · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Scenario Analysis">
      <ScenarioAnalysis />
    </GovernmentShell>
  );
}
