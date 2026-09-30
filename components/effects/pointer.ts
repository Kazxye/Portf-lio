/**
 * Shared, smoothed pointer position (viewport coordinates).
 *
 * One store for the whole page: every lens reads the same eased point, updated in a
 * single rAF loop that only runs while the point is still travelling. Nothing here
 * touches React state, so pointer movement never re-renders components.
 */

type Listener = () => void;

const LERP = 0.12; // per 60 Hz frame
const OFFSCREEN = -1e4;

const target = { x: OFFSCREEN, y: OFFSCREEN, present: false };
const current = { x: OFFSCREEN, y: OFFSCREEN };
const listeners = new Set<Listener>();

let raf = 0;
let previous = 0;
let reducedMotion = false;

function notify() {
  listeners.forEach((listener) => listener());
}

function step(now: number) {
  raf = 0;
  const dt = previous ? Math.min(0.05, (now - previous) / 1000) : 1 / 60;
  previous = now;

  // Frame-rate independent version of lerp(current, target, 0.12).
  const k = reducedMotion ? 1 : 1 - Math.pow(1 - LERP, dt * 60);
  current.x += (target.x - current.x) * k;
  current.y += (target.y - current.y) * k;

  const settled = Math.abs(target.x - current.x) < 0.1 && Math.abs(target.y - current.y) < 0.1;
  if (settled) {
    current.x = target.x;
    current.y = target.y;
    previous = 0;
  } else {
    raf = requestAnimationFrame(step);
  }
  notify();
}

export function setPointerTarget(x: number, y: number) {
  // Coming back into the window: snap instead of gliding in from the last known spot.
  if (!target.present) {
    current.x = x;
    current.y = y;
  }
  target.x = x;
  target.y = y;
  target.present = true;
  if (!raf) raf = requestAnimationFrame(step);
}

export function clearPointer() {
  target.present = false;
  notify();
}

export function setPointerReducedMotion(value: boolean) {
  reducedMotion = value;
}

export function getPointer(): Readonly<{ x: number; y: number }> {
  return current;
}

export function getPointerTarget(): Readonly<{ x: number; y: number; present: boolean }> {
  return target;
}

export function subscribePointer(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
