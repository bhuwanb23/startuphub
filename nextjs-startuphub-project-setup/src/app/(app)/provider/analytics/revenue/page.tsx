import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { RevenueAnalytics } from "@/users/provider/components/analytics";

export const metadata: Metadata = { title: "Revenue Analytics · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Revenue Analytics">
      <RevenueAnalytics />
    </ProviderShell>
  );
}
