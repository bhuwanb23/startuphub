import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ApplicationsPage } from "@/users/government/components/programs";

export const metadata: Metadata = { title: "Applications · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Applications">
      <ApplicationsPage />
    </GovernmentShell>
  );
}
