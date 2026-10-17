import type { Metadata } from "next";
import { KnowledgeHubView } from "@/views/knowledge-hub/knowledge-hub";

export const metadata: Metadata = {
  title: "Knowledge Hub — StartupHub",
  description:
    "Articles, guides, startup playbooks, IPR guides, funding guides, market research, templates, case studies and reports.",
};

export default function Page() {
  return <KnowledgeHubView />;
}
