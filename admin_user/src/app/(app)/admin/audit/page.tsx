import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { AuditAdmin } from "@/users/admin/components/governance/governance";

export const metadata: Metadata = { title: "Audit Logs · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Audit Logs">
      <AuditAdmin />
    </AdminShell>
  );
}
