import { isPlaceholder } from "@/lib/placeholder";

// Renders missing data as a visible dashed marker instead of silently shipping it.
export function Value({ children }: { children: string }) {
  if (isPlaceholder(children)) {
    return <span className="placeholder-value">{children}</span>;
  }
  return <>{children}</>;
}
