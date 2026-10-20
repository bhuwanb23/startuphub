import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { RecommendationsAdmin } from "@/users/admin/components/ai/ai";

export const metadata: Metadata = { title: "Recommendations · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Recommendation Management">
      <RecommendationsAdmin />
    </AdminShell>
  );
}
