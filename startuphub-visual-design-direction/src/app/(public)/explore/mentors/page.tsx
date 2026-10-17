import type { Metadata } from "next";
import { MentorsDirectoryView } from "@/views/explore/mentors/mentors";

export const metadata: Metadata = {
  title: "Mentor & Expert Directory — StartupHub",
  description:
    "Search 2,800+ verified mentors by expertise, industry, location and availability — operators ready to guide your startup.",
};

export default function Page() {
  return <MentorsDirectoryView />;
}
