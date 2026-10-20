import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ResourceAvailability } from "@/users/provider/components/resources/plan";

export const metadata: Metadata = { title: "Resource Availability · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Resource Availability">
      <ResourceAvailability />
    </ProviderShell>
  );
}
