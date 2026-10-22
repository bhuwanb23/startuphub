import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { TrademarkManagement } from "@/users/startup/components/ipr/trademarks";

export const metadata: Metadata = { title: "Trademark Management · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Trademark Management">
      <TrademarkManagement />
    </FounderShell>
  );
}
