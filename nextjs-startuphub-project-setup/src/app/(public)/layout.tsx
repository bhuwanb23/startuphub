import type { ReactNode } from "react";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

/* Public chrome: marketing navbar + footer around every (public) route. */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
