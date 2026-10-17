import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { ClientManagement } from "@/users/ipr-expert/components/clients/clients";

export const metadata: Metadata = { title: "Client Management · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Client Management">
      <ClientManagement />
    </IprShell>
  );
}
