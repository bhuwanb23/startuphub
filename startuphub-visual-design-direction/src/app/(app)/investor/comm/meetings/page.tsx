import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { CommMeetings } from "@/users/investor/components/comm";

export const metadata: Metadata = { title: "Meetings · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Meetings">
      <CommMeetings />
    </InvestorShell>
  );
}
