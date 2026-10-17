import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { PatentManagement } from "@/users/startup/components/ipr/patents";

export const metadata: Metadata = { title: "Patent Management · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Patent Management">
      <PatentManagement />
    </FounderShell>
  );
}
