// Static 1-bit grain over the whole page at ~3% opacity: texture without motion or
// repaints. The tile is a 128px PNG in /public, so the cost is one tiny request.
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 bg-[url('/noise.png')] bg-[length:128px_128px] opacity-[0.03]"
    />
  );
}
