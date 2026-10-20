import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { CorporateMatching } from "@/users/corporate/components/discovery";

export const metadata: Metadata = { title: "AI Startup Matching · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="AI Startup Matching">
      <CorporateMatching />
    </CorporateShell>
  );
}
