import type { Metadata } from "next";
import { Handshake } from "lucide-react";
import { FounderShell } from "@/users/startup/startup";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Partnerships · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Partnerships">
      <AppTemplate
        icon={Handshake}
        title="Partnerships"
        desc="Discover, negotiate and run partnerships — pilots, PoCs and corporate challenges."
        nextFeatures={["Partner discovery", "Active partnerships", "Pilot management", "Performance"]}
      />
    </FounderShell>
  );
}
