import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { CorporateDocuments } from "@/users/corporate/components/ops/workspace";

export const metadata: Metadata = { title: "Documents · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Documents">
      <CorporateDocuments />
    </CorporateShell>
  );
}
