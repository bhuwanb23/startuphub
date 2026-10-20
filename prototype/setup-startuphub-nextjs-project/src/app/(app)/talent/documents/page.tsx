import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentDocuments } from "@/users/talent/components/workspace/documents";

export const metadata: Metadata = { title: "Documents · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Documents">
      <TalentDocuments />
    </TalentShell>
  );
}
