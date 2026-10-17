import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { CohortDetail } from "@/users/incubator/components/cohorts/cohort-detail";

export const metadata: Metadata = { title: "Cohort VI · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Cohort VI">
      <CohortDetail />
    </IncubatorShell>
  );
}
