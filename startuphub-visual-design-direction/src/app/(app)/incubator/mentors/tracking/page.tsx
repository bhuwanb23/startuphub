import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Mentorship Tracking · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Mentorship Tracking">
      <AppTemplate
        icon={ShieldCheck}
        title="Mentorship Tracking"
        desc="Sessions, action items, mentee progress and impact attribution."
        nextFeatures={["Session logs", "Action items", "Impact metrics", "Feedback"]}
      />
    </IncubatorShell>
  );
}
