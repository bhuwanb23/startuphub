import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable}>
      <body className="bg-white font-sans text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
