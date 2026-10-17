import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { ResourceRequests } from "@/users/startup/components/resources/requests";

export const metadata: Metadata = { title: "Resource Requests · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Resource Requests">
      <ResourceRequests />
    </FounderShell>
  );
}
