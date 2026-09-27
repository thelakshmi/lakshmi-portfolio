"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Scroll-triggered entrance for every element marked `.reveal`
 * inside the given container. Elements animate once, then stay put.
 */
export function useScrollReveal(
  rootRef: RefObject<HTMLElement | null>,
  selector = ".reveal"
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector, root);

      items.forEach((el) => {
        const delay = Number(el.dataset.delay ?? 0);

        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          y: Number(el.dataset.y ?? 44),
          opacity: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
        });
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef, selector]);
}

/** Counts a number up when it scrolls into view. */
export function animateCount(
  el: HTMLElement,
  target: number,
  suffix = "",
  duration = 1.6
) {
  if (prefersReducedMotion()) {
    el.textContent = `${target}${suffix}`;
    return;
  }

  const counter = { value: 0 };

  gsap.to(counter, {
    value: target,
    duration,
    ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 90%", once: true },
    onUpdate: () => {
      el.textContent = `${Math.round(counter.value)}${suffix}`;
    },
  });
}
