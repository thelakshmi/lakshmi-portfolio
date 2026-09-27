"use client";

import gsap from "gsap";

const COLORS = ["#d8006f", "#2a5ca8", "#db8084", "#8fa1b1", "#edebdb"];

/**
 * A tiny, dependency-free confetti burst.
 * Call it from anywhere: birthdays, easter eggs, shipped features.
 */
export function burst(x: number, y: number, amount = 34) {
  if (typeof document === "undefined") return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = reduced ? 0 : amount;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    const size = gsap.utils.random(5, 11, 1);
    const round = Math.random() > 0.5;

    piece.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${round ? size : size * 1.8}px;
      border-radius: ${round ? "50%" : "2px"};
      background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
      pointer-events: none;
      z-index: 400;
      will-change: transform, opacity;
    `;

    document.body.appendChild(piece);

    const angle = gsap.utils.random(0, Math.PI * 2);
    const distance = gsap.utils.random(70, 240);

    gsap.to(piece, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - gsap.utils.random(30, 120),
      rotation: gsap.utils.random(-540, 540),
      duration: gsap.utils.random(0.7, 1.5),
      ease: "power2.out",
      onComplete: () => piece.remove(),
    });

    gsap.to(piece, {
      opacity: 0,
      duration: 0.4,
      delay: 0.7,
      ease: "power1.in",
    });
  }
}

export function burstFrom(el: Element | null, amount?: number) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  burst(rect.left + rect.width / 2, rect.top + rect.height / 2, amount);
}
