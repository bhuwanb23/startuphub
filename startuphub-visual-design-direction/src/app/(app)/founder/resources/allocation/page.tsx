import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { ResourceAllocation } from "@/users/startup/components/resources/allocation";

export const metadata: Metadata = { title: "Resource Allocation · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Resource Allocation">
      <ResourceAllocation />
    </FounderShell>
  );
}
