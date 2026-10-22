import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Reports } from "@/users/startup/components/market/reports";

export const metadata: Metadata = { title: "Reports · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Reports">
      <Reports />
    </FounderShell>
  );
}
