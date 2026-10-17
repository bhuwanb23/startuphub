import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Organization } from "@/users/incubator/components/organization/organization";

export const metadata: Metadata = { title: "My Organization · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="My Organization">
      <Organization />
    </IncubatorShell>
  );
}
