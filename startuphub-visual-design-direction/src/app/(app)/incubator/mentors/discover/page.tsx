import type { Metadata } from "next";
import { Users } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Mentor Discovery · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Mentor Discovery">
      <AppTemplate
        icon={Users}
        title="Mentor Discovery"
        desc="Find new mentors in the network matched to your program needs."
        nextFeatures={["Network discovery", "AI shortlisting", "Invite flow", "Bench planning"]}
      />
    </IncubatorShell>
  );
}
