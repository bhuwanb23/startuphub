import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Mentors } from "@/users/startup/components/mentors/mentors";

export const metadata: Metadata = { title: "Mentors · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Mentors">
      <Mentors />
    </FounderShell>
  );
}
