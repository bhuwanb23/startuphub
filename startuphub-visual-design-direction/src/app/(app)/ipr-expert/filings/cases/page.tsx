import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { CaseManagement } from "@/users/ipr-expert/components/filings/filings";

export const metadata: Metadata = { title: "Case Management · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Case Management">
      <CaseManagement />
    </IprShell>
  );
}
