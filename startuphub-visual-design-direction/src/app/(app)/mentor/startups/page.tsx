import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { MentorStartupDiscovery } from "@/users/mentor/components/startups/startups";

export const metadata: Metadata = { title: "Startup Discovery · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Startup Discovery">
      <MentorStartupDiscovery />
    </MentorShell>
  );
}
