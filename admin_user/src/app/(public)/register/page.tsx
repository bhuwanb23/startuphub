import type { Metadata } from "next";
import { RegisterView } from "@/views/auth/auth";

export const metadata: Metadata = {
  title: "Create an account — StartupHub",
  description: "One account, every workspace in the ecosystem.",
};

export default function Page() {
  return <RegisterView />;
}
