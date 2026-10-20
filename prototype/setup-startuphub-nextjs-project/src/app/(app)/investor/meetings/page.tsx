import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestorMeetings } from "@/users/investor/components/meetings/meetings";

export const metadata: Metadata = { title: "Meetings · Meridian Capital" };

export default function Page() {
  return (
    <InvestorShell title="Meetings">
      <InvestorMeetings />
    </InvestorShell>
  );
}
