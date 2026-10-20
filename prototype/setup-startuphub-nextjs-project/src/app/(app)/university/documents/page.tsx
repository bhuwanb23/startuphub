import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { UniversityDocuments } from "@/users/university/components/workspace/documents";

export const metadata: Metadata = { title: "Documents · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Documents">
      <UniversityDocuments />
    </UniversityShell>
  );
}
