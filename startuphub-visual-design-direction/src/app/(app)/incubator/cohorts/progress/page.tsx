import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { CohortProgress } from "@/users/incubator/components/cohorts/progress";

export const metadata: Metadata = {
  title: "Cohort Progress · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Cohort Progress">
      <CohortProgress />
    </IncubatorShell>
  );
}
