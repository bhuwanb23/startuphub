import type { Metadata } from "next";
import { MentorsView } from "@/views/solutions/mentors/mentors";

export const metadata: Metadata = {
  title: "For Mentors & Experts — StartupHub",
  description:
    "Build an expert profile, get matched with startups, run structured mentorship and sessions, and track the impact of your guidance.",
};

export default function Page() {
  return <MentorsView />;
}
