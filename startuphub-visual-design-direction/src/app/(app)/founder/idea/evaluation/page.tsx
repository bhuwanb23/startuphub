import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { IdeaEvaluation } from "@/users/startup/components/idea/idea-evaluation";

export const metadata: Metadata = {
  title: "Idea Evaluation · Lumen AI",
};

export default function Page() {
  return (
    <FounderShell title="Idea Evaluation">
      <IdeaEvaluation />
    </FounderShell>
  );
}