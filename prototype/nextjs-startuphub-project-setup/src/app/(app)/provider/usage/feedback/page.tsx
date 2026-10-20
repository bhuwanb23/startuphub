import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ServiceFeedback } from "@/users/provider/components/usage";

export const metadata: Metadata = { title: "Service Feedback · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Service Feedback">
      <ServiceFeedback />
    </ProviderShell>
  );
}
