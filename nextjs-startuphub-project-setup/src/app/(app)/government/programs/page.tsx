import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { SchemeManagement } from "@/users/government/components/programs";

export const metadata: Metadata = { title: "Scheme Management · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Scheme Management">
      <SchemeManagement />
    </GovernmentShell>
  );
}
