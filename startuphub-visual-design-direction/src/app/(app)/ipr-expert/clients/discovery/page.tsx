import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { StartupDiscovery } from "@/users/ipr-expert/components/clients/clients";

export const metadata: Metadata = { title: "Startup Discovery · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Startup Discovery">
      <StartupDiscovery />
    </IprShell>
  );
}
