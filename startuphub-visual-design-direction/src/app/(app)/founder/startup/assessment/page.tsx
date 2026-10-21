import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { StartupProfile } from "@/users/startup/components/startup/startup";

export const metadata: Metadata = {
  title: "Startup Assessment · Lumen AI",
};

export default function Page() {
  return (
    <FounderShell title="Startup Assessment">
      <StartupProfile />
    </FounderShell>
  );
}