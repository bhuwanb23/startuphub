import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Funding } from "@/users/startup/components/funding/funding";

export const metadata: Metadata = { title: "Funding · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Funding">
      <Funding />
    </FounderShell>
  );
}
