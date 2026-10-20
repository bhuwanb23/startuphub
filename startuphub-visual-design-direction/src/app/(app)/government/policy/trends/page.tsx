import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { TrendAnalysis } from "@/users/government/components/policy";

export const metadata: Metadata = { title: "Trend Analysis · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Trend Analysis">
      <TrendAnalysis />
    </GovernmentShell>
  );
}
