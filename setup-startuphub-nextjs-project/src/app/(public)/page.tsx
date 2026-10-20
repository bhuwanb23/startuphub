import type { Metadata } from "next";
import { HomeView } from "@/views/home/home";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "StartupHub — The Connected Startup Ecosystem",
  description:
    "One connected ecosystem for every stage of your startup journey. Idea, incubation, IPR, resources, market, funding and growth.",
};

export default function Page() {
  return <HomeView />;
}
