import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { ReturnsPage } from "@/users/investor/components/investments";

export const metadata: Metadata = { title: "Returns · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Returns">
      <ReturnsPage />
    </InvestorShell>
  );
}
