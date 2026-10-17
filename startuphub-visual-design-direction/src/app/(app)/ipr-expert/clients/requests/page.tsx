import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { ClientRequests } from "@/users/ipr-expert/components/clients/clients";

export const metadata: Metadata = { title: "Client Requests · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Client Requests">
      <ClientRequests />
    </IprShell>
  );
}
