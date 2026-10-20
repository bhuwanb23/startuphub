import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Monospace companion — used by the workspace screens for data readouts,
   chips, timestamps and metric labels. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StartupHub — One connected ecosystem for every stage of your startup journey",
  description:
    "StartupHub is the connected ecosystem for builders: idea validation, incubation, IPR protection, resources, market access, funding and growth — in one platform.",
  keywords: [
    "startup ecosystem",
    "incubation",
    "IPR",
    "funding",
    "mentorship",
    "market intelligence",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-white font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
