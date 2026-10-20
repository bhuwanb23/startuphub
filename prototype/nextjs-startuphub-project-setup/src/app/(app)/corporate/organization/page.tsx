import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { CorporateProfile } from "@/users/corporate/components/organization";

export const metadata: Metadata = { title: "Corporate Profile · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Corporate Profile">
      <CorporateProfile />
    </CorporateShell>
  );
}
