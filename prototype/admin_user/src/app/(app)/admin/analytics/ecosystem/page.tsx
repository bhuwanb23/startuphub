import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { EcosystemAnalyticsAdmin } from "@/users/admin/components/analytics/analytics";

export const metadata: Metadata = { title: "Ecosystem Analytics · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Ecosystem Analytics">
      <EcosystemAnalyticsAdmin />
    </AdminShell>
  );
}
