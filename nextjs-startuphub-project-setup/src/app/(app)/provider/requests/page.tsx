import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { RequestManagement } from "@/users/provider/components/bookings";

export const metadata: Metadata = { title: "Resource Requests · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Resource Requests">
      <RequestManagement />
    </ProviderShell>
  );
}
