import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { MatchingAdmin } from "@/users/admin/components/ai/ai";

export const metadata: Metadata = { title: "Matching Engine · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Matching Engine">
      <MatchingAdmin />
    </AdminShell>
  );
}
