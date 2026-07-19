import type { ReactNode } from "react";

export function AuthCardFrame({ children }: { children: ReactNode }) {
  return <div className="group relative">{children}</div>;
}
