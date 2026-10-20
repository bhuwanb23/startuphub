import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { NotificationsPage } from "@/users/investor/components/ops/workspace";

export const metadata: Metadata = { title: "Notifications · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Notifications">
      <NotificationsPage />
    </InvestorShell>
  );
}
