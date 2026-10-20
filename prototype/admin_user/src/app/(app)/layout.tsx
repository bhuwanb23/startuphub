import type { ReactNode } from "react";

/**
 * (app) routes render without the public chrome — this group is a *sibling*
 * of (public), not nested under it.
 *
 * Deliberately empty: this layout exists so the group can later hold
 * auth-gating (middleware / session check) without touching 150 route files.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
