import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { PlatformAnalyticsAdmin } from "@/users/admin/components/analytics/analytics";

export const metadata: Metadata = { title: "Platform Analytics · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Platform Analytics">
      <PlatformAnalyticsAdmin />
    </AdminShell>
  );
}
