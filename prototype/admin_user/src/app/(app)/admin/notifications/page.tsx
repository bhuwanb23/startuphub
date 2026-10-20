import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { NotificationsAdmin } from "@/users/admin/components/operations/operations";

export const metadata: Metadata = { title: "Notification Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Notification Management">
      <NotificationsAdmin />
    </AdminShell>
  );
}
