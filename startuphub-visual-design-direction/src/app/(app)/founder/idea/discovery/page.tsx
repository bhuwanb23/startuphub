import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { CustomerDiscovery } from "@/users/startup/components/idea/customer-discovery";

export const metadata: Metadata = {
  title: "Customer Discovery · Lumen AI",
};

export default function Page() {
  return (
    <FounderShell title="Customer Discovery">
      <CustomerDiscovery />
    </FounderShell>
  );
}