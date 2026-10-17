import type { Metadata } from "next";
import { SuccessStoriesView } from "@/views/success-stories/success-stories";

export const metadata: Metadata = {
  title: "Success Stories — StartupHub",
  description:
    "Startup stories, founder stories, incubation success, funding wins, IPR success, corporate partnerships and market success.",
};

export default function Page() {
  return <SuccessStoriesView />;
}
