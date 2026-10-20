import type { ReactNode } from "react";

/*
 * Workspace routes render without the public marketing chrome — this group is
 * a sibling of (public), not nested inside it. Kept deliberately empty so
 * auth-gating (middleware / sessions) can attach here later without touching
 * every route file. Each role supplies its own shell via src/users/<role>.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
