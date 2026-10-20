import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { PolicyRecommendations } from "@/users/government/components/policy";

export const metadata: Metadata = { title: "Policy Recommendations · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Policy Recommendations">
      <PolicyRecommendations />
    </GovernmentShell>
  );
}
