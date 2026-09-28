"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { applyMode, type Mode } from "@/lib/mode";

/**
 * Opening / Hero — a full-screen illustrated scrapbook scene.
 * Every word on screen is spec copy from docs/PORTFOLIO_SPEC.md
 * (title + three invitation lines); the three CTA buttons act on
 * that copy — open the resume PDF, or switch mode and travel down
 * to About. The art layers are decorative only and hidden from
 * assistive technology.
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
      {/* ---------------- the scrapbook scene (decorative) ---------------- */}
      <div className="hero-art" aria-hidden="true">
        {/* soft painted background: blue + pink pastel areas on paper */}
        <div className="hero-wash" />
        <div className="hero-paper" />

        {/* torn paper strip along the bottom */}
        <div className="hero-torn-strip" />

        {/* soft fluffy clouds across the lower portion */}
        <svg className="hero-cloud cloud-one" viewBox="0 0 300 130">
          <g className="cloud-shade" transform="translate(3 9)">
            <ellipse cx="74" cy="98" rx="72" ry="28" />
            <circle cx="86" cy="72" r="34" />
            <circle cx="140" cy="60" r="42" />
            <circle cx="196" cy="74" r="34" />
            <circle cx="238" cy="90" r="26" />
          </g>
          <g className="cloud-puff">
            <ellipse cx="74" cy="98" rx="72" ry="28" />
            <circle cx="86" cy="72" r="34" />
            <circle cx="140" cy="60" r="42" />
            <circle cx="196" cy="74" r="34" />
            <circle cx="238" cy="90" r="26" />
          </g>
        </svg>

        <svg className="hero-cloud cloud-two" viewBox="0 0 300 130">
          <g className="cloud-shade" transform="translate(3 9)">
            <ellipse cx="80" cy="100" rx="78" ry="26" />
            <circle cx="70" cy="74" r="32" />
            <circle cx="128" cy="56" r="40" />
            <circle cx="182" cy="70" r="36" />
            <circle cx="234" cy="86" r="30" />
          </g>
          <g className="cloud-puff">
            <ellipse cx="80" cy="100" rx="78" ry="26" />
            <circle cx="70" cy="74" r="32" />
            <circle cx="128" cy="56" r="40" />
            <circle cx="182" cy="70" r="36" />
            <circle cx="234" cy="86" r="30" />
          </g>
        </svg>

        <svg className="hero-cloud cloud-three" viewBox="0 0 300 130">
          <g className="cloud-shade" transform="translate(3 9)">
            <ellipse cx="70" cy="96" rx="66" ry="26" />
            <circle cx="88" cy="68" r="34" />
            <circle cx="144" cy="58" r="38" />
            <circle cx="196" cy="76" r="32" />
          </g>
          <g className="cloud-puff">
            <ellipse cx="70" cy="96" rx="66" ry="26" />
            <circle cx="88" cy="68" r="34" />
            <circle cx="144" cy="58" r="38" />
            <circle cx="196" cy="76" r="32" />
          </g>
        </svg>

        {/* small hand-drawn stars / sparkles */}
        <svg className="hero-sparkle sparkle-a" viewBox="0 0 24 24">
          <path d="M12 2Q13 11 22 12Q13 13 12 22Q11 13 2 12Q11 11 12 2Z" />
        </svg>
        <svg className="hero-sparkle sparkle-b" viewBox="0 0 24 24">
          <path d="M12 2Q13 11 22 12Q13 13 12 22Q11 13 2 12Q11 11 12 2Z" />
        </svg>
        <svg className="hero-sparkle sparkle-c is-drawn" viewBox="0 0 24 24">
          <path d="M12 3.4 14.6 9 20.8 9.7 16.1 13.9 17.5 20 12 16.7 6.5 20 7.9 13.9 3.2 9.7 9.4 9.1Z" />
        </svg>
        <svg className="hero-sparkle sparkle-d" viewBox="0 0 24 24">
          <path d="M12 2Q13 11 22 12Q13 13 12 22Q11 13 2 12Q11 11 12 2Z" />
        </svg>
        <svg className="hero-sparkle sparkle-e is-drawn" viewBox="0 0 24 24">
          <path d="M12 3.4 14.6 9 20.8 9.7 16.1 13.9 17.5 20 12 16.7 6.5 20 7.9 13.9 3.2 9.7 9.4 9.1Z" />
        </svg>
        <svg className="hero-sparkle sparkle-f" viewBox="0 0 24 24">
          <path d="M12 2Q13 11 22 12Q13 13 12 22Q11 13 2 12Q11 11 12 2Z" />
        </svg>
        <svg className="hero-sparkle sparkle-g" viewBox="0 0 24 24">
          <path d="M12 2Q13 11 22 12Q13 13 12 22Q11 13 2 12Q11 11 12 2Z" />
        </svg>
        <svg className="hero-sparkle sparkle-h is-drawn" viewBox="0 0 24 24">
          <path d="M12 3.4 14.6 9 20.8 9.7 16.1 13.9 17.5 20 12 16.7 6.5 20 7.9 13.9 3.2 9.7 9.4 9.1Z" />
        </svg>
        <svg className="hero-sparkle sparkle-i" viewBox="0 0 24 24">
          <path d="M12 2Q13 11 22 12Q13 13 12 22Q11 13 2 12Q11 11 12 2Z" />
        </svg>

        {/* taped scrap of paper with a torn lower edge */}
        <div className="hero-scrap-wrap">
          <div className="hero-scrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
              <path d="M12 3.4 14.6 9 20.8 9.7 16.1 13.9 17.5 20 12 16.7 6.5 20 7.9 13.9 3.2 9.7 9.4 9.1Z" />
            </svg>
          </div>
          <i className="hero-tape tape-a" />
          <i className="hero-tape tape-b" />
        </div>

        {/* sticker */}
        <div className="hero-sticker">
          <svg viewBox="0 0 24 24">
            <path d="M12 2Q13 11 22 12Q13 13 12 22Q11 13 2 12Q11 11 12 2Z" />
          </svg>
        </div>

        {/* imperfect hand-drawn shapes */}
        <svg className="hero-doodle doodle-circle" viewBox="0 0 100 100">
          <path d="M50 8C70 8 88 24 89 46c1 22-16 44-39 45C27 92 10 76 9 53 8 32 24 11 47 9" />
        </svg>
        <svg className="hero-doodle doodle-squiggle" viewBox="0 0 140 60">
          <path d="M8 34C18 12 30 50 42 30 54 10 66 46 80 28 92 12 104 44 118 26 124 18 130 20 134 24" />
        </svg>
      </div>

      {/* ---------------- the spec's exact hero copy ---------------- */}
      <div className="hero-content">
        <h1 className="hero-title">
          Welcome to my personal website!
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
