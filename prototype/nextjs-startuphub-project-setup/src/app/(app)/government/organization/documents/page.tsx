import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { OrgDocuments } from "@/users/government/components/organization";

export const metadata: Metadata = { title: "Organization Documents · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Organization Documents">
      <OrgDocuments />
    </GovernmentShell>
  );
}
