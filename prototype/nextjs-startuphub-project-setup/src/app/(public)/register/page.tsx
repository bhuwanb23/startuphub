import type { Metadata } from "next";
import { AuthView } from "@/views/auth/auth";

export const metadata: Metadata = {
  title: "Create account — StartupHub",
  description: "Create your StartupHub workspace — founder, mentor, IPR expert, incubator or investor.",
};

export default function Page() {
  return <AuthView mode="register" />;
}
