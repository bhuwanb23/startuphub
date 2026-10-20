import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { CommActivity } from "@/users/investor/components/comm";

export const metadata: Metadata = { title: "Communication Activity · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Communication Activity">
      <CommActivity />
    </InvestorShell>
  );
}
