import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: string;
  index?: string;
  className?: string;
};

export function SectionLabel({ children, index, className }: SectionLabelProps) {
  return (
    <p data-reveal="" className={cn("section-label text-label text-muted", className)}>
      <span className="text-fg">{children}</span>
      {index ? <span> / {index}</span> : null}
    </p>
  );
}
