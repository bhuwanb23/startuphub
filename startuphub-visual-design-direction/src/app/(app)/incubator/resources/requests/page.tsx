import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { ResourceRequests } from "@/users/incubator/components/resources/requests";

export const metadata: Metadata = {
  title: "Resource Requests · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Resource Requests">
      <ResourceRequests />
    </IncubatorShell>
  );
}
