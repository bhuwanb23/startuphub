import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DocumentsPage } from "@/users/investor/components/ops/workspace";

export const metadata: Metadata = { title: "Documents · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Documents">
      <DocumentsPage />
    </InvestorShell>
  );
}
