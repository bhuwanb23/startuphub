import type { Metadata } from "next";
import { OpportunitiesView } from "@/views/opportunities/opportunities";

export const metadata: Metadata = {
  title: "Opportunities — StartupHub",
  description:
    "Incubation programs, accelerators, grants, funding, competitions, challenges, jobs, internships, mentorship, partnerships and pilot opportunities.",
};

export default function Page() {
  return <OpportunitiesView />;
}
