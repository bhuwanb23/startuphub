import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { IdeaValidation } from "@/users/startup/components/idea/idea";

export const metadata: Metadata = { title: "Idea & Validation · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Idea & Validation">
      <IdeaValidation />
    </FounderShell>
  );
}
