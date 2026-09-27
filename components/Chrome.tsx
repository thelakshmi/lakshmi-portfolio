"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { prefersReducedMotion } from "@/lib/useScrollReveal";

/** Hairline reading progress pinned to the very top of the window. */
export function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={barRef} />
    </div>
  );
}

/** A soft spotlight that trails the cursor. Desktop pointers only. */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    const moveX = gsap.quickTo(glow, "x", { duration: 0.55, ease: "power3.out" });
    const moveY = gsap.quickTo(glow, "y", { duration: 0.55, ease: "power3.out" });

    gsap.to(glow, { opacity: 1, duration: 1, delay: 0.8 });

    const onMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
