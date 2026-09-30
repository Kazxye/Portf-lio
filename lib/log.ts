type Level = "info" | "warn" | "error";

// Structured client logs: one object per event so a failure (no WebGL, shader compile
// error, lost context) is diagnosable from the console or a log drain.
export function log(level: Level, component: string, event: string, detail: Record<string, unknown> = {}) {
  console[level]({ ts: new Date().toISOString(), component, event, ...detail });
}
