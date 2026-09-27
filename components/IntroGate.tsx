"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

import { intro } from "@/lib/content";

/**
 * The full-screen welcome card the site opens with.
 * 01 → PDF   02 → recruiter page   03 → the interactive site
 */
export default function IntroGate({ onEnter }: { onEnter: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  const enterSite = useCallback(() => {
    if (closing.current || !rootRef.current) return;
    closing.current = true;

    gsap.to(rootRef.current, {
      opacity: 0,
      scale: 1.03,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: onEnter,
    });
  }, [onEnter]);

  /* entrance timeline + "esc to enter", all in one place */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") enterSite();
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".intro-bg", { opacity: 0, duration: 1.1, ease: "power2.out" })
        .from(
          ".intro-title span",
          { y: 70, opacity: 0, stagger: 0.11, duration: 0.95 },
          "-=0.55"
        )
        .from(".intro-lead", { y: 16, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(
          ".intro-option",
          { y: 30, opacity: 0, stagger: 0.1, duration: 0.7 },
          "-=0.35"
        );
    }, rootRef);

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [enterSite]);

  return (
    <div className="intro" ref={rootRef}>
      <div className="intro-bg">
        <i className="intro-star star-1">✦</i>
        <i className="intro-star star-2">✦</i>
        <i className="intro-star star-3">✦</i>
        <i className="intro-star star-4">✦</i>
        <i className="intro-star star-5">✦</i>
      </div>

      <div className="intro-inner">
        <div className="intro-card">
          <h1 className="intro-title">
            {intro.title.map((line) => (
              <span key={line}>
                {line}
                <em>.</em>
              </span>
            ))}
          </h1>

          <p className="intro-lead">
            You&apos;ve got three doors. Pick whichever matches how much time
            you&apos;ve got.
          </p>

          <div className="intro-options">
            {intro.options.map((option) => {
              const className = `intro-option${option.primary ? " is-primary" : ""}`;
              const isPdf = option.href.endsWith(".pdf");

              /* player mode dismisses the card and drops you into the site */
              if (option.href === "#enter") {
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={className}
                    onClick={enterSite}
                  >
                    <span className="intro-copy">
                      <strong>{option.label}</strong>
                      <p>{option.caption}</p>
                    </span>
                    <span className="intro-arrow">→</span>
                  </button>
                );
              }

              const body = (
                <>
                  <span className="intro-copy">
                    <strong>{option.label}</strong>
                    <p>{option.caption}</p>
                  </span>
                  <span className="intro-arrow">{isPdf ? "↓" : "→"}</span>
                </>
              );

              if (isPdf) {
                return (
                  <a key={option.id} className={className} href={option.href} download="">
                    {body}
                  </a>
                );
              }

              return (
                <Link key={option.id} className={className} href={option.href}>
                  {body}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
