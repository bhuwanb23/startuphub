import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { CorporateMessages } from "@/users/corporate/components/ops/workspace";

export const metadata: Metadata = { title: "Messages · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Messages">
      <CorporateMessages />
    </CorporateShell>
  );
}
