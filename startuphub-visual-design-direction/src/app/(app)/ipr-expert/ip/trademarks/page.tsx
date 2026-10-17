import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { TrademarkManagementPage } from "@/users/ipr-expert/components/ip/ip-management";

export const metadata: Metadata = { title: "Trademark Management · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Trademark Management">
      <TrademarkManagementPage />
    </IprShell>
  );
}
