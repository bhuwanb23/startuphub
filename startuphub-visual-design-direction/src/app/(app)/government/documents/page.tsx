import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { GovDocuments } from "@/users/government/components/ops/workspace";

export const metadata: Metadata = { title: "Documents · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Documents">
      <GovDocuments />
    </GovernmentShell>
  );
}
