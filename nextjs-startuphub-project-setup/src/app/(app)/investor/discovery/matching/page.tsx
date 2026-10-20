import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { AiMatching } from "@/users/investor/components/discovery";

export const metadata: Metadata = { title: "AI Startup Matching · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="AI Startup Matching">
      <AiMatching />
    </InvestorShell>
  );
}
