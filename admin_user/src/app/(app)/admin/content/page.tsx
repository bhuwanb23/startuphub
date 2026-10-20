import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { ContentAdmin } from "@/users/admin/components/programs/programs";

export const metadata: Metadata = { title: "Content Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Content Management">
      <ContentAdmin />
    </AdminShell>
  );
}
