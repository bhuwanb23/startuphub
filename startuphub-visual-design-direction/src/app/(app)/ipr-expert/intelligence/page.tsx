import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { IpDiscovery } from "@/users/ipr-expert/components/intelligence/intelligence";

export const metadata: Metadata = { title: "IP Discovery · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="IP Discovery">
      <IpDiscovery />
    </IprShell>
  );
}
