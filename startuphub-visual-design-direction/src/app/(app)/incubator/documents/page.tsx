import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Documents · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Documents">
      <AppTemplate
        icon={FileText}
        title="Documents"
        desc="Program, startup, legal and report documents with versioning and access control."
        nextFeatures={["Foldered by program", "Versioning", "Access control", "Bulk export"]}
      />
    </IncubatorShell>
  );
}
