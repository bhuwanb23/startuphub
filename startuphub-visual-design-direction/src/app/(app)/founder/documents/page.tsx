import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Documents } from "@/users/startup/components/documents/documents";

export const metadata: Metadata = { title: "Documents · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Documents">
      <Documents />
    </FounderShell>
  );
}
