import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { IpPortfolioPage } from "@/users/ipr-expert/components/ip/ip-management";

export const metadata: Metadata = { title: "IP Portfolio · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="IP Portfolio">
      <IpPortfolioPage />
    </IprShell>
  );
}
