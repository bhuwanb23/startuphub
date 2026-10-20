import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { OpenInnovation } from "@/users/corporate/components/innovation";

export const metadata: Metadata = { title: "Open Innovation · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Open Innovation">
      <OpenInnovation />
    </CorporateShell>
  );
}
