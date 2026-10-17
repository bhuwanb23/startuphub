import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { DeadlineManagement } from "@/users/ipr-expert/components/compliance/compliance";

export const metadata: Metadata = { title: "Deadline Management · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Deadline Management">
      <DeadlineManagement />
    </IprShell>
  );
}
