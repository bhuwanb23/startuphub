import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { ResourceUtilization } from "@/users/incubator/components/resources/utilization";

export const metadata: Metadata = {
  title: "Resource Utilization · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Resource Utilization">
      <ResourceUtilization />
    </IncubatorShell>
  );
}
