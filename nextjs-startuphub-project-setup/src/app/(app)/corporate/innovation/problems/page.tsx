import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { ProblemStatements } from "@/users/corporate/components/innovation";

export const metadata: Metadata = { title: "Problem Statements · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Problem Statements">
      <ProblemStatements />
    </CorporateShell>
  );
}
