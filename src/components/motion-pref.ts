/**
 * Decorative motion is always on for this portfolio (typing headings, marquee, 3D carousel).
 * Windows with 'Animation effects' off report prefers-reduced-motion and would silently
 * disable every effect, so the OS flag is intentionally not used here.
 */
export function useReducedMotion(): boolean {
  return false;
}
