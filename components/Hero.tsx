"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { applyMode, type Mode } from "@/lib/mode";

/**
 * Opening / Hero — a full-screen illustrated scene: the painted
 * reference artwork fills the section background as a single
 * decorative layer. Every word on screen is spec copy from
 * docs/PORTFOLIO_SPEC.md (title + three invitation lines); the
 * three CTA buttons act on that copy — open the resume PDF, or
 * switch mode and travel down to About. The background layer is
 * decorative only and hidden from assistive technology.
 */

/** switches mode, then glides down to the About section (#about). */
function enterMode(mode: Mode) {
  applyMode(mode);

  /* let mode-dependent layout settle before aiming at the target */
  window.requestAnimationFrame(() => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  });
}
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  /* entrance only — the scene itself stays still and handmade */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-art", { opacity: 0, duration: 1, ease: "power2.out" })
        .from(".hero-title", { opacity: 0, y: 44, duration: 1 }, "-=0.5")
        .from(".hero-line", { opacity: 0, y: 18, stagger: 0.14, duration: 0.7 }, "-=0.45")
        .from(
          ".hero-button, .hero-arrow",
          {
            opacity: 0,
            scale: 0.88,
            stagger: 0.12,
            duration: 0.55,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" id="home">
      {/* ---------------- the painted background (decorative) ---------------- */}
      <div className="hero-art" aria-hidden="true" />

      {/* ---------------- the spec's exact hero copy ---------------- */}
      <div className="hero-content">
        <h1 className="hero-title">
          Hi, I’m Lakshmi. Welcome to my corner of the internet.
          <svg className="hero-underline" viewBox="0 0 420 26" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <path d="M6 16c58-12 122-16 190-11 66 5 132 14 218 6" />
          </svg>
        </h1>

        <div className="hero-lines">
          <div className="hero-note">
            <p className="hero-line">
              If you&apos;re in a rush, you can see my resume by clicking the
              button.
            </p>
            <a
              className="hero-button is-view"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </a>
          </div>

          <div className="hero-note">
            <p className="hero-line">
              If you have some time to spare, you can view my online resume in
              recruiter mode.
            </p>
            <button
              className="hero-button is-mode"
              type="button"
              onClick={() => enterMode("recruiter")}
            >
              Recruiter Mode
            </button>
            {/* handwritten annotation pointing at the mode button */}
            <svg className="hero-arrow" viewBox="0 0 62 48">
              <path d="M4 8c18 3 34 11 44 22M48 30l-11-3M48 30l-3-11" />
            </svg>
          </div>

          <div className="hero-note">
            <p className="hero-line">
              If you have absolutely nothing to do, feel free to view it in the
              player mode.
            </p>
            <button
              className="hero-button is-player"
              type="button"
              onClick={() => enterMode("player")}
            >
              Player Mode
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
