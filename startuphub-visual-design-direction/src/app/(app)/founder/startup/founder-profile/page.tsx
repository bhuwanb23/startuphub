import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { FounderProfile } from "@/users/startup/components/startup/founder-profile";

export const metadata: Metadata = {
  title: "Founder Profile · Lumen AI",
};

export default function Page() {
  return (
    <FounderShell title="Founder Profile">
      <FounderProfile />
    </FounderShell>
  );
}