import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { MarketContentAdmin } from "@/users/admin/components/programs/programs";

export const metadata: Metadata = { title: "Market Content · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Market Content">
      <MarketContentAdmin />
    </AdminShell>
  );
}
