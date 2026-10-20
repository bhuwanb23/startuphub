import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { StartupSearch } from "@/users/investor/components/discovery";

export const metadata: Metadata = { title: "Startup Search · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Startup Search">
      <StartupSearch />
    </InvestorShell>
  );
}
