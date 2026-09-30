import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className={cn("group", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {/* Inline, not flex: long values such as the email must be able to wrap on narrow
          screens. The underline is a background so it grows from the left on hover, and
          box-decoration-break keeps it on every line when the text wraps. */}
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-0.5 [box-decoration-break:clone] [overflow-wrap:anywhere] transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="ml-2 inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-px"
      >
        {external ? "↗" : "→"}
      </span>
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
