import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { IprDashboard } from "@/users/ipr-expert/components/dashboard/dashboard";

export const metadata: Metadata = { title: "Dashboard · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Dashboard">
      <IprDashboard />
    </IprShell>
  );
}
