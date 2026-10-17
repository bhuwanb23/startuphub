import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { IpValuation } from "@/users/ipr-expert/components/commercialization/commercialization";

export const metadata: Metadata = { title: "IP Valuation · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="IP Valuation">
      <IpValuation />
    </IprShell>
  );
}
