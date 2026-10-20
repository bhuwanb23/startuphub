import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { CollaborationManagement } from "@/users/corporate/components/partnerships";

export const metadata: Metadata = { title: "Collaborations · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Collaborations">
      <CollaborationManagement />
    </CorporateShell>
  );
}
