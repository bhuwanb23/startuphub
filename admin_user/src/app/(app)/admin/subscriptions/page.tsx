import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { SubscriptionsAdmin } from "@/users/admin/components/finance/finance";

export const metadata: Metadata = { title: "Subscription Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Subscription Management">
      <SubscriptionsAdmin />
    </AdminShell>
  );
}
