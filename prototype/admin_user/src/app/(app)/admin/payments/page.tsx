import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { PaymentsAdmin } from "@/users/admin/components/finance/finance";

export const metadata: Metadata = { title: "Payment Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Payment Management">
      <PaymentsAdmin />
    </AdminShell>
  );
}
