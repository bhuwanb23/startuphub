import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { VerificationAdmin } from "@/users/admin/components/governance/governance";

export const metadata: Metadata = { title: "Verification Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Verification Management">
      <VerificationAdmin />
    </AdminShell>
  );
}
