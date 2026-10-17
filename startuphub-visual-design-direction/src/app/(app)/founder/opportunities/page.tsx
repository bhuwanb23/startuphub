import type { Metadata } from "next";
import { Crosshair } from "lucide-react";
import { FounderShell } from "@/users/startup/startup";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Opportunities · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Opportunities">
      <AppTemplate
        icon={Crosshair}
        title="Opportunities"
        desc="Your personalized opportunity feed — grants, programs and pilots matched to your stage."
        nextFeatures={["Saved opportunities", "Application tracker", "Deadline radar", "AI matching"]}
      />
    </FounderShell>
  );
}
