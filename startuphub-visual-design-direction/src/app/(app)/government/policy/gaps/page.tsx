import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { GapAnalysis } from "@/users/government/components/policy";

export const metadata: Metadata = { title: "Gap Analysis · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Gap Analysis">
      <GapAnalysis />
    </GovernmentShell>
  );
}
