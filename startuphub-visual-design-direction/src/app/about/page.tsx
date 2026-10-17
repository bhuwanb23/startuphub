import type { Metadata } from "next";
import { AboutView } from "@/views/about/about";

export const metadata: Metadata = {
  title: "About — StartupHub",
  description:
    "Mission, vision, approach and the team behind StartupHub — the connected ecosystem for the next generation of companies.",
};

export default function Page() {
  return <AboutView />;
}
