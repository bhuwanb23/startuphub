import type { Metadata } from "next";
import { AuthView } from "@/views/auth/auth";

export const metadata: Metadata = {
  title: "Log in · StartupHub",
  description:
    "Log in to your StartupHub workspace — founder, mentor, IPR expert, incubator, investor or admin.",
};

export default function Page() {
  return <AuthView mode="login" />;
}
