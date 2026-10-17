import type { Metadata } from "next";
import { EcosystemView } from "@/views/ecosystem-map/ecosystem";

export const metadata: Metadata = {
  title: "Ecosystem Map — StartupHub",
  description:
    "Interactive map of the startup ecosystem: startups, incubators, investors, mentors, corporates, universities, labs and resources with live connections.",
};

export default function Page() {
  return <EcosystemView />;
}
