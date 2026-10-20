import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { AvailabilitySettings } from "@/users/provider/components/profile";

export const metadata: Metadata = { title: "Availability · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Availability">
      <AvailabilitySettings />
    </ProviderShell>
  );
}
