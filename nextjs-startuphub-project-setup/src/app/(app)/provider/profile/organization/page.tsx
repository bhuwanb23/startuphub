import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { OrganizationDetails } from "@/users/provider/components/profile";

export const metadata: Metadata = { title: "Organization Details · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Organization Details">
      <OrganizationDetails />
    </ProviderShell>
  );
}
