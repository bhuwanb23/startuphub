import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { OrganizationDocuments } from "@/users/incubator/components/organization/documents";

export const metadata: Metadata = {
  title: "Organization Documents · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Organization Documents">
      <OrganizationDocuments />
    </IncubatorShell>
  );
}
