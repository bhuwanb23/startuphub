import type { ReactNode } from "react";

/* Deliberately empty: (app) is a SIBLING of the public chrome, so workspace
   routes render without the marketing navbar/footer. Auth-gating (middleware,
   session check) can live here later without touching any route file. */
export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
