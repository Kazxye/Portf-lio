import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
};

export function ButtonLink({ href, children, variant = "solid" }: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className={cn(
        "button-link inline-flex h-11 items-center gap-2 rounded-[2px] px-5 text-sm font-medium transition-colors duration-200",
        variant === "solid"
          ? "bg-fg text-bg hover:bg-accent"
          : "border border-line text-fg hover:border-fg",
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <span aria-hidden="true">{external ? "↗" : "→"}</span>
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
