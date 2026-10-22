import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { ApplicantEvaluation } from "@/users/incubator/components/programs/evaluation";

export const metadata: Metadata = {
  title: "Applicant Evaluation · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Applicant Evaluation">
      <ApplicantEvaluation />
    </IncubatorShell>
  );
}
