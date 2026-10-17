import type { Metadata } from "next";
import { ShowcaseView } from "@/views/showcase/showcase";

export const metadata: Metadata = {
  title: "Startup Showcase — StartupHub",
  description:
    "Featured startups, emerging ventures, innovative products and the Startup of the Month — curated from the ecosystem.",
};

export default function Page() {
  return <ShowcaseView />;
}
