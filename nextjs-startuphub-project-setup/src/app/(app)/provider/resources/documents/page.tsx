import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ResourceDocuments } from "@/users/provider/components/resources/plan";

export const metadata: Metadata = { title: "Resource Documents · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Resource Documents">
      <ResourceDocuments />
    </ProviderShell>
  );
}
