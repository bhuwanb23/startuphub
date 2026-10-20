import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ProviderProfilePage } from "@/users/provider/components/profile";

export const metadata: Metadata = { title: "Provider Profile · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Provider Profile">
      <ProviderProfilePage />
    </ProviderShell>
  );
}
