import type { Metadata } from "next";
import { LoginView } from "@/views/auth/auth";

export const metadata: Metadata = {
  title: "Log in — StartupHub",
  description: "Sign in to your StartupHub workspace.",
};

export default function Page() {
  return <LoginView />;
}
