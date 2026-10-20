import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { FundUtilization } from "@/users/government/components/funding";

export const metadata: Metadata = { title: "Fund Utilization · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Fund Utilization">
      <FundUtilization />
    </GovernmentShell>
  );
}
