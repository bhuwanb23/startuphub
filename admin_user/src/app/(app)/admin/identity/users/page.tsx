import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { UsersAdmin } from "@/users/admin/components/identity/identity";

export const metadata: Metadata = { title: "User Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="User Management">
      <UsersAdmin />
    </AdminShell>
  );
}
