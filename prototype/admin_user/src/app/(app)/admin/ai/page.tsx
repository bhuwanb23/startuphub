import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { AiManagementAdmin } from "@/users/admin/components/ai/ai";

export const metadata: Metadata = { title: "AI Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="AI Management">
      <AiManagementAdmin />
    </AdminShell>
  );
}
