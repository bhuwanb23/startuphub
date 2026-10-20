import type { Metadata } from "next";
import HomeView from "@/views/home/home";

export const metadata: Metadata = {
  title: "StartupHub — Build. Protect. Validate. Scale.",
  description:
    "One connected ecosystem for every stage of your startup journey — from first idea to lasting impact.",
};

export default function Page() {
  return <HomeView />;
}
