import type { Metadata } from "next";
import { RegisterView } from "@/views/auth/register";

export const metadata: Metadata = {
  title: "Create your account — StartupHub",
  description: "Start from the role you play — founder, mentor, IPR expert, incubator or investor.",
};

export default function Page() {
  return <RegisterView />;
}
