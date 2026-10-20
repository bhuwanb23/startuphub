import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { ReportsAdmin } from "@/users/admin/components/operations/operations";

export const metadata: Metadata = { title: "Report Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Report Management">
      <ReportsAdmin />
    </AdminShell>
  );
}
