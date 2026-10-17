import type { Metadata } from "next";
import { NewsView } from "@/views/news/news";

export const metadata: Metadata = {
  title: "News & Updates — StartupHub",
  description:
    "Startup news, funding news, IPR news, government updates, ecosystem updates and platform updates.",
};

export default function Page() {
  return <NewsView />;
}
