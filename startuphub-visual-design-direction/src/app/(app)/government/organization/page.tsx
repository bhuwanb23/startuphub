import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { OrganizationProfile } from "@/users/government/components/organization";

export const metadata: Metadata = { title: "Organization Profile · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Organization Profile">
      <OrganizationProfile />
    </GovernmentShell>
  );
}
