import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentInterviews } from "@/users/talent/components/applications/interviews";

export const metadata: Metadata = { title: "Interviews · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Interviews & Meetings">
      <TalentInterviews />
    </TalentShell>
  );
}
