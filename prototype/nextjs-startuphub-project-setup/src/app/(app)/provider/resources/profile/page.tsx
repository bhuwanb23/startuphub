import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ResourceProfile } from "@/users/provider/components/resources";

export const metadata: Metadata = { title: "Resource Profile · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Resource Profile">
      <ResourceProfile />
    </ProviderShell>
  );
}
