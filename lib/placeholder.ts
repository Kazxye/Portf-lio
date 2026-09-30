/**
 * Missing real data is never invented. Anything wrapped in todo() renders as a visible
 * dashed marker in the UI and is easy to find before launch: grep -rn "todo(" data/
 */
const PREFIX = "TODO:";

export function todo(what: string): string {
  return `[${PREFIX} ${what}]`;
}

export function isPlaceholder(value: string): boolean {
  return value.startsWith(`[${PREFIX}`);
}
