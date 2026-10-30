"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import ModeSwitch from "@/components/ModeSwitch";
import PlayerMenu from "@/components/PlayerMenu";

export default function TopNav() {
  const navRef = useRef<HTMLElement>(null);

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

  return (
    <header ref={navRef} className="top-nav">
      {/* fixed top-right cluster: the mode switch, plus the single
          circular hamburger — the same button in both modes; its
          links follow the current mode */}
      <div className="nav-actions nav-item">
        <ModeSwitch />
        <PlayerMenu />
      </div>
    </header>
  );
}
