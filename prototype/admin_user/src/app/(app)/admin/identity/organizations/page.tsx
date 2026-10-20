import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { OrganizationsAdmin } from "@/users/admin/components/identity/identity";

export const metadata: Metadata = { title: "Organization Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Organization Management">
      <OrganizationsAdmin />
    </AdminShell>
  );
}
