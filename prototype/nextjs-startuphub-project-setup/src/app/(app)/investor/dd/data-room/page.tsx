import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DataRoom } from "@/users/investor/components/dd";

export const metadata: Metadata = { title: "Data Room · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Data Room">
      <DataRoom />
    </InvestorShell>
  );
}
