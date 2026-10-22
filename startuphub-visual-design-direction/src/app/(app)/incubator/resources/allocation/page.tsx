import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { ResourceAllocation } from "@/users/incubator/components/resources/allocation";

export const metadata: Metadata = {
  title: "Resource Allocation · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Resource Allocation">
      <ResourceAllocation />
    </IncubatorShell>
  );
}
