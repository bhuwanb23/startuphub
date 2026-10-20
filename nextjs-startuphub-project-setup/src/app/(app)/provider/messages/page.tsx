import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ProviderMessages } from "@/users/provider/components/ops/workspace";

export const metadata: Metadata = { title: "Messages · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Messages">
      <ProviderMessages />
    </ProviderShell>
  );
}
