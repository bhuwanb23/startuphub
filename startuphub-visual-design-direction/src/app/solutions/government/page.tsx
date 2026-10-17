import type { Metadata } from "next";
import { GovernmentView } from "@/views/solutions/government/government";

export const metadata: Metadata = {
  title: "For Government & Institutions — StartupHub",
  description:
    "Ecosystem mapping, digital programs, milestone-based grants, startup support, ecosystem analytics and outcome-level impact measurement.",
};

export default function Page() {
  return <GovernmentView />;
}
