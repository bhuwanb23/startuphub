import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { InnovationPipeline } from "@/users/corporate/components/innovation";

export const metadata: Metadata = { title: "Innovation Pipeline · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Innovation Pipeline">
      <InnovationPipeline />
    </CorporateShell>
  );
}
