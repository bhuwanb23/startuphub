import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { CopyrightManagement } from "@/users/startup/components/ipr/copyright";

export const metadata: Metadata = { title: "Copyright Management · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Copyright Management">
      <CopyrightManagement />
    </FounderShell>
  );
}
