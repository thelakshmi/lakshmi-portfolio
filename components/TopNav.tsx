"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { burstFrom } from "@/lib/confetti";
import { useMode } from "@/lib/mode";
import ModeSwitch from "@/components/ModeSwitch";
import PlayerMenu from "@/components/PlayerMenu";

export default function TopNav() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoClicks = useRef(0);
  const mode = useMode();

  /* staggered entrance — the original hero timeline, scoped to the nav */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        opacity: 0,
        y: -15,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  /* easter egg: whack the logo five times */
  const handleLogo = () => {
    logoClicks.current += 1;

    if (logoClicks.current >= 5) {
      logoClicks.current = 0;
      burstFrom(logoRef.current, 60);
    }

    window.setTimeout(() => {
      if (logoClicks.current > 0) logoClicks.current -= 1;
    }, 1400);
  };

  return (
    <header ref={navRef} className="top-nav">
      <div
        ref={logoRef}
        onClick={handleLogo}
        className="logo nav-item"
        title="psst… click me five times"
      >
        lakshmi<span>.</span>
      </div>

      {/* fixed top-right cluster: the mode switch, plus the Player
          Mode hamburger menu only while Player Mode is active */}
      <div className="nav-actions nav-item">
        <ModeSwitch />
        {mode === "player" && <PlayerMenu />}
      </div>
    </header>
  );
}
