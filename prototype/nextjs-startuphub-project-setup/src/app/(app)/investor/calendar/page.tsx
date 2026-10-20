import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { CalendarPage } from "@/users/investor/components/ops/workspace";

export const metadata: Metadata = { title: "Calendar · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Calendar">
      <CalendarPage />
    </InvestorShell>
  );
}
