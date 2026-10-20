import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { PerformanceReports } from "@/users/provider/components/analytics";

export const metadata: Metadata = { title: "Performance Reports · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Performance Reports">
      <PerformanceReports />
    </ProviderShell>
  );
}
