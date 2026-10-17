import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { StartupProfile } from "@/users/startup/components/startup/startup";

export const metadata: Metadata = { title: "My Startup · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="My Startup">
      <StartupProfile />
    </FounderShell>
  );
}
