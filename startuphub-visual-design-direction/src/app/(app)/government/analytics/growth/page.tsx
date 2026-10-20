import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { GrowthAnalytics } from "@/users/government/components/analytics/deep";

export const metadata: Metadata = { title: "Growth Analytics · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Growth Analytics">
      <GrowthAnalytics />
    </GovernmentShell>
  );
}
