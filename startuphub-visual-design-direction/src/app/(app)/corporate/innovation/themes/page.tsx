import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { InnovationThemes } from "@/users/corporate/components/innovation";

export const metadata: Metadata = { title: "Innovation Themes · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Innovation Themes">
      <InnovationThemes />
    </CorporateShell>
  );
}
