import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { CohortAnalytics } from "@/users/incubator/components/cohorts/analytics";

export const metadata: Metadata = {
  title: "Cohort Analytics · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Cohort Analytics">
      <CohortAnalytics />
    </IncubatorShell>
  );
}
