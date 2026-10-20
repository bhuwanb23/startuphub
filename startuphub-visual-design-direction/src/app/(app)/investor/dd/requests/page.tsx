import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DocRequests } from "@/users/investor/components/dd";

export const metadata: Metadata = { title: "Document Requests · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Document Requests">
      <DocRequests />
    </InvestorShell>
  );
}
