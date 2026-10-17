import type { Metadata } from "next";
import { SolutionsView } from "@/views/solutions/solutions";

export const metadata: Metadata = {
  title: "Solutions — Who We Serve | StartupHub",
  description:
    "Dedicated experiences for founders, incubators, investors, mentors, corporates, government, IPR experts, resource providers, universities and talent.",
};

export default function Page() {
  return <SolutionsView />;
}
