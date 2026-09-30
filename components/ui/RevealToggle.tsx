"use client";

type RevealToggleProps = {
  pressed: boolean;
  onToggle: () => void;
  label?: string;
};

// Keyboard and touch path to the original image; the lens alone is pointer-only.
// Constant label + aria-pressed, with a terminal-style checkbox as the visual state.
export function RevealToggle({ pressed, onToggle, label = "View original" }: RevealToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      className="text-label -my-3 inline-flex items-center gap-2 py-3 text-muted transition-colors hover:text-fg aria-pressed:text-fg"
    >
      <span aria-hidden="true" className="tabular-nums">
        [{pressed ? "×" : "\u00a0"}]
      </span>
      {label}
    </button>
  );
}
