import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { DataRoom } from "@/users/startup/components/funding/data-room";

export const metadata: Metadata = { title: "Data Room · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Data Room">
      <DataRoom />
    </FounderShell>
  );
}
