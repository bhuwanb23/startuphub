import type { Metadata } from "next";
import { ResourcesView } from "@/views/resources/resources";

export const metadata: Metadata = {
  title: "Resource Hub — StartupHub",
  description:
    "Funding, grants, labs, infrastructure, cloud credits, tools, talent, legal, IPR and learning resources — stage-matched for startups.",
};

export default function Page() {
  return <ResourcesView />;
}
