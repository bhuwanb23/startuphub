import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { RenewalManagement } from "@/users/ipr-expert/components/compliance/compliance";

export const metadata: Metadata = { title: "Renewal Management · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Renewal Management">
      <RenewalManagement />
    </IprShell>
  );
}
