import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { MessagesPage } from "@/users/investor/components/ops/workspace";

export const metadata: Metadata = { title: "Messages · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Messages">
      <MessagesPage />
    </InvestorShell>
  );
}
