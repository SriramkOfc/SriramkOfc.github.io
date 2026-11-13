"use client";

import { useEffect, useRef, useState } from "react";

export type Mood = "idle" | "hover" | "thinking" | "happy";

/**
 * The Ask Sriram character: the dark cube from Fig. 1 with a face.
 * Alive cues: eyes track the cursor (or wander on touch screens), random blinks,
 * slow breathing, an orange "heartbeat" light, and a look-up wobble while thinking.
 */
export default function Face({ size = 60, mood = "idle", track = true }: { size?: number; mood?: Mood; track?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  // Eye tracking
  useEffect(() => {
    if (!track) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let raf = 0;
    let target = { x: 0, y: 0 };
    let cur = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, d / 260);
      target = { x: (dx / d) * reach, y: (dy / d) * reach };
    };

    let wander: ReturnType<typeof setInterval> | undefined;
    if (coarse) {
      wander = setInterval(() => {
        target = Math.random() < 0.35 ? { x: 0, y: 0 } : { x: Math.random() * 2 - 1, y: Math.random() * 1.4 - 0.7 };
      }, 1800);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    const loop = () => {
      cur = { x: cur.x + (target.x - cur.x) * 0.18, y: cur.y + (target.y - cur.y) * 0.18 };
      setEye((p) => (Math.abs(p.x - cur.x) + Math.abs(p.y - cur.y) > 0.01 ? { ...cur } : p));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      if (wander) clearInterval(wander);
    };
  }, [track]);

  // Random blinking, occasionally a double blink
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        if (Math.random() < 0.25) {
          setTimeout(() => setBlink(true), 260);
          setTimeout(() => setBlink(false), 390);
        }
        schedule();
      }, 2200 + Math.random() * 3800);
    };
    schedule();
    return () => clearTimeout(t);
  }, []);

  const look = mood === "thinking" ? { x: 0.55, y: -0.85 } : eye;
  const travel = size * 0.075;
  const eyeW = size * 0.13;
  const eyeH = mood === "hover" || mood === "happy" ? size * 0.21 : size * 0.18;

  return (
    <div
      ref={root}
      className={`face relative ${mood === "thinking" ? "face-thinking" : ""}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div className="face-body absolute inset-0 rounded-[30%] bg-ink shadow-[inset_0_-6px_12px_rgba(255,255,255,0.06),inset_0_6px_10px_rgba(255,255,255,0.08),0_10px_24px_-8px_rgba(0,0,0,0.45)]">
        {/* eyes */}
        <div
          className="absolute left-1/2 top-[46%] flex"
          style={{ gap: size * 0.14, transform: `translate(calc(-50% + ${look.x * travel}px), calc(-50% + ${look.y * travel}px))` }}
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className="block rounded-full bg-white transition-[height] duration-100"
              style={{ width: eyeW, height: blink ? size * 0.025 : eyeH }}
            />
          ))}
        </div>
        {/* mouth: appears when happy */}
        <span
          className="absolute left-1/2 top-[70%] block -translate-x-1/2 rounded-b-full border-b-2 border-white/80 transition-all duration-300"
          style={{ width: mood === "happy" ? size * 0.22 : 0, height: size * 0.08, opacity: mood === "happy" ? 1 : 0 }}
        />
      </div>
      {/* heartbeat light */}
      <span className="heartbeat absolute rounded-full bg-accent" style={{ width: size * 0.16, height: size * 0.16, top: -size * 0.03, right: -size * 0.03 }} />
    </div>
  );
}
