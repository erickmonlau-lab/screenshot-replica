import { describe, expect, it } from "vitest";
import { createLanyard } from "@/components/rope-physics";

const mk = () => createLanyard({ areaW: 470, areaH: 700, seg: 7, link: 22, cardH: 375 });
const idle = { x: 0, y: 0, down: false, gx: 0, gy: 0 };

describe("lanyard physics", () => {
  it("settles hanging below the anchor", () => {
    const l = mk();
    for (let i = 0; i < 1500; i++) l.step(idle);
    expect(Math.abs(l.A.x - 235)).toBeLessThan(6);
    expect(l.A.y).toBeGreaterThan(l.restRope * 0.9);
    expect(l.B.y).toBeGreaterThan(l.A.y + 300);
  });

  it("stretches when pulled and swings after release", () => {
    const l = mk();
    for (let i = 0; i < 600; i++) l.step(idle);
    const rest = l.ropeLength();
    const ptr = { x: 90, y: 560, down: true, gx: 0, gy: 0 };
    for (let i = 0; i < 40; i++) l.step(ptr);
    expect(l.ropeLength()).toBeGreaterThan(rest * 1.03);
    ptr.down = false;
    const xs: number[] = [];
    for (let i = 0; i < 240; i++) {
      l.step(ptr);
      xs.push(l.B.x);
    }
    const crossedCentre = xs.some((x) => x > 235) && xs.some((x) => x < 235);
    expect(crossedCentre).toBe(true);
    for (let i = 0; i < 3000; i++) l.step(ptr);
    expect(Math.abs(l.A.x - 235)).toBeLessThan(8);
  });
});
