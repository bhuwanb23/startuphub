import type { ReactNode } from "react";

/* App routes (role workspaces) render without the public navbar/footer,
   since (app) is a sibling route group of the root layout's chrome. */
export default function AppLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
