import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { Introductions } from "@/users/investor/components/comm";

export const metadata: Metadata = { title: "Introductions · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Introductions">
      <Introductions />
    </InvestorShell>
  );
}
