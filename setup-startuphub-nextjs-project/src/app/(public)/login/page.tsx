import type { Metadata } from "next";
import { LoginView } from "@/views/auth/login";

export const metadata: Metadata = {
  title: "Log in — StartupHub",
  description: "One account, every role you play in the ecosystem.",
};

export default function Page() {
  return <LoginView />;
}
