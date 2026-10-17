import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { MentorShell } from "@/users/mentor/mentor";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Documents · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Documents">
      <AppTemplate
        icon={FileText}
        title="Documents"
        desc="Your documents plus everything founders shared for review — versioned and organized."
        nextFeatures={["My documents", "Review queue", "Shared docs", "Versions"]}
      />
    </MentorShell>
  );
}
