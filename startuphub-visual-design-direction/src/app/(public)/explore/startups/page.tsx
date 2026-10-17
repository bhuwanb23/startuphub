import type { Metadata } from "next";
import { StartupsView } from "@/views/explore/startups/startups";

export const metadata: Metadata = {
  title: "Startup Directory — StartupHub",
  description:
    "Search verified startups by industry, location, stage, funding and technology. Public profiles with private data locked until login.",
};

export default function Page() {
  return <StartupsView />;
}
