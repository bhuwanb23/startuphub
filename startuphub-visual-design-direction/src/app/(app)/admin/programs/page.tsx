import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { ProgramsAdmin } from "@/users/admin/components/programs/programs";

export const metadata: Metadata = { title: "Program Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Program Management">
      <ProgramsAdmin />
    </AdminShell>
  );
}
