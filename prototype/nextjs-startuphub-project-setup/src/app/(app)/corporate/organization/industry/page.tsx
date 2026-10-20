import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { IndustryProfile } from "@/users/corporate/components/organization";

export const metadata: Metadata = { title: "Industry Profile · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Industry Profile">
      <IndustryProfile />
    </CorporateShell>
  );
}
