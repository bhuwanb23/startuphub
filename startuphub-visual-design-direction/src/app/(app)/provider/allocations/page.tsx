import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { AllocationManagement } from "@/users/provider/components/bookings";

export const metadata: Metadata = { title: "Allocation Management · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Allocation Management">
      <AllocationManagement />
    </ProviderShell>
  );
}
