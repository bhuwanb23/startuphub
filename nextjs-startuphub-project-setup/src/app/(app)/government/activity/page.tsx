import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { GovActivity } from "@/users/government/components/ops/workspace";

export const metadata: Metadata = { title: "Activity · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Activity">
      <GovActivity />
    </GovernmentShell>
  );
}
