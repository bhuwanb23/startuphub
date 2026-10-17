import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { MentorShell } from "@/users/mentor/mentor";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Help & Support · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Help & Support">
      <AppTemplate
        icon={HelpCircle}
        title="Help & Support"
        desc="Mentor guide, FAQs, and direct support from the StartupHub team."
        nextFeatures={["Mentor guide", "FAQs", "Contact support", "Feature requests"]}
      />
    </MentorShell>
  );
}
