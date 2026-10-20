import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { AdminDashboard } from "@/users/admin/components/dashboard/dashboard";

export const metadata: Metadata = { title: "Control Center · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Dashboard">
      <AdminDashboard />
    </AdminShell>
  );
}
