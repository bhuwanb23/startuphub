import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Surveys } from "@/users/startup/components/idea/surveys";

export const metadata: Metadata = {
  title: "Survey Results · Lumen AI",
};

export default function Page() {
  return (
    <FounderShell title="Survey Results">
      <Surveys />
    </FounderShell>
  );
}