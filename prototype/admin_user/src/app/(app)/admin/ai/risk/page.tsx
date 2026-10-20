import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { RiskAdmin } from "@/users/admin/components/ai/ai";

export const metadata: Metadata = { title: "Risk Engine · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Risk Engine">
      <RiskAdmin />
    </AdminShell>
  );
}
