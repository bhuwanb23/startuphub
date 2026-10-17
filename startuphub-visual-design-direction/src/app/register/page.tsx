import type { Metadata } from "next";
import { AuthView } from "@/views/auth/auth";

export const metadata: Metadata = {
  title: "Get Started — StartupHub",
  description: "Create your StartupHub account and join the connected startup ecosystem.",
};

export default function Page() {
  return <AuthView mode="register" />;
}
