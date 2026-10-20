import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { ModerationAdmin } from "@/users/admin/components/governance/governance";

export const metadata: Metadata = { title: "Moderation · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Moderation">
      <ModerationAdmin />
    </AdminShell>
  );
}
