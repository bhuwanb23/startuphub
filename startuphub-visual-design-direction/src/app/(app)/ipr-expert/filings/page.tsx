import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { FilingManagement } from "@/users/ipr-expert/components/filings/filings";

export const metadata: Metadata = { title: "Filing Management · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Filing Management">
      <FilingManagement />
    </IprShell>
  );
}
