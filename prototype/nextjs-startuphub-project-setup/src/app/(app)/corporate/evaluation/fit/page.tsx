import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { BusinessFit } from "@/users/corporate/components/evaluation";

export const metadata: Metadata = { title: "Business Fit · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Business Fit">
      <BusinessFit />
    </CorporateShell>
  );
}
