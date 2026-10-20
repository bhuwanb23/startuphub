import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ProviderDocuments } from "@/users/provider/components/ops/workspace";

export const metadata: Metadata = { title: "Documents · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Documents">
      <ProviderDocuments />
    </ProviderShell>
  );
}
