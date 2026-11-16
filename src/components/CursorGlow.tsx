import { useEffect, useRef } from "react";

/** Blue halo + ring that follow the pointer (fine pointers only). The halo blends with `screen`, so it only shows on dark areas. */
export function CursorGlow() {
  const halo = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      if (halo.current)
        halo.current.style.transform = `translate(${e.clientX - 260}px, ${e.clientY - 260}px)`;
      if (ring.current)
        ring.current.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("a,button,[role=tab],.cursor-grab");
      ring.current?.setAttribute("data-hot", el ? "1" : "0");
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <>
      <div
        ref={halo}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[55] hidden h-[520px] w-[520px] rounded-full [mix-blend-mode:screen] [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{
          background: "radial-gradient(circle, rgba(0,68,255,0.38) 0%, rgba(0,68,255,0) 62%)",
          transform: "translate(-999px,-999px)",
        }}
      />
      <div
        ref={ring}
        data-hot="0"
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[70] hidden h-9 w-9 rounded-full border-2 border-white transition-[width,height,margin,background-color] duration-150 [mix-blend-mode:difference] data-[hot=1]:-mt-2 data-[hot=1]:-ml-2 data-[hot=1]:h-[52px] data-[hot=1]:w-[52px] data-[hot=1]:bg-white [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{ transform: "translate(-999px,-999px)" }}
      />
    </>
  );
}
