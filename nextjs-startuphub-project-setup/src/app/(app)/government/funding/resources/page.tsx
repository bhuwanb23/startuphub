import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ResourceAllocation } from "@/users/government/components/funding";

export const metadata: Metadata = { title: "Resource Allocation · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Resource Allocation">
      <ResourceAllocation />
    </GovernmentShell>
  );
}
