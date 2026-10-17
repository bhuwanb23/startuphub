import type { Metadata } from "next";
import { IncubatorsView } from "@/views/explore/incubators/incubators";

export const metadata: Metadata = {
  title: "Incubator Directory — StartupHub",
  description:
    "Search verified incubators and accelerators by domain and location — programs, facilities, mentors and application details.",
};

export default function Page() {
  return <IncubatorsView />;
}
