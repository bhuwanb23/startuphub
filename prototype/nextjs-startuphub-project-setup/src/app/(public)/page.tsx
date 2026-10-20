import type { Metadata } from "next";
import { HomeView } from "@/views/home/home";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "StartupHub — One connected ecosystem for every stage of your startup",
  description:
    "Build. Protect. Validate. Scale. StartupHub connects idea, incubation, IPR, resources, market, funding and growth into one intelligent ecosystem.",
};

export default function Page() {
  return <HomeView />;
}
