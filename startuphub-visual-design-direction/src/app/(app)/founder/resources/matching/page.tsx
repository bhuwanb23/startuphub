import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { ResourceMatching } from "@/users/startup/components/resources/matching";

export const metadata: Metadata = { title: "Resource Matching · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Resource Matching">
      <ResourceMatching />
    </FounderShell>
  );
}
