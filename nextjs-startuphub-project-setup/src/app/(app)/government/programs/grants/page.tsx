import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { GrantManagement } from "@/users/government/components/programs";

export const metadata: Metadata = { title: "Grant Management · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Grant Management">
      <GrantManagement />
    </GovernmentShell>
  );
}
