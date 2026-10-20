import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentApplications } from "@/users/talent/components/applications/applications";

export const metadata: Metadata = { title: "Applications · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Applications">
      <TalentApplications />
    </TalentShell>
  );
}
