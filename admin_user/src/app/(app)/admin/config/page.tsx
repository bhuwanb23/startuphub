import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { SystemConfigAdmin } from "@/users/admin/components/config/system-config";

export const metadata: Metadata = { title: "System Configuration · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="System Configuration">
      <SystemConfigAdmin />
    </AdminShell>
  );
}
