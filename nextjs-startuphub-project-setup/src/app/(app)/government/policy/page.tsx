import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { PolicyInsights } from "@/users/government/components/policy";

export const metadata: Metadata = { title: "Policy Insights · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Policy Insights">
      <PolicyInsights />
    </GovernmentShell>
  );
}
