import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "StartupHub — One connected ecosystem for every stage of your startup",
  description:
    "Build. Protect. Validate. Scale. StartupHub connects idea, incubation, IPR, resources, market, funding and growth into one intelligent ecosystem.",
  keywords: [
    "startup ecosystem",
    "incubation",
    "IPR",
    "funding",
    "market intelligence",
    "StartupHub",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-soft font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
