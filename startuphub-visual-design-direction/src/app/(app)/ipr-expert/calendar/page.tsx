import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Calendar · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Calendar">
      <AppTemplate
        icon={CalendarDays}
        title="Calendar"
        desc="IP deadlines, filing dates, renewal dates, hearings and consultations."
        nextFeatures={["Deadline view", "Hearings", "Consultations", "Renewals"]}
      />
    </IprShell>
  );
}
