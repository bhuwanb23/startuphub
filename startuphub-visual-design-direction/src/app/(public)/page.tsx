import type { Metadata } from "next";
import { HomeView } from "@/views/home/home";

export const metadata: Metadata = {
  title: "StartupHub — One connected ecosystem for every stage of your startup journey",
  description:
    "Build. Protect. Validate. Scale. StartupHub connects idea validation, incubation, IPR, resources, market, funding and growth into one platform.",
};

export default function Page() {
  return <HomeView />;
}
