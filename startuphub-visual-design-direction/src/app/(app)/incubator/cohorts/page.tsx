import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Cohorts } from "@/users/incubator/components/cohorts/cohorts";

export const metadata: Metadata = { title: "Cohorts · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Cohorts">
      <Cohorts />
    </IncubatorShell>
  );
}
