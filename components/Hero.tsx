"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { profile } from "@/lib/content";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(
        ".hero-small",
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power3.out",
        }
      )
        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 80,
            stagger: 0.12,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".explore-button",
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .from(
          ".scene",
          {
            opacity: 0,
            scale: 0.8,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!orbRef.current) return;

      const x = (event.clientX / window.innerWidth - 0.5) * 25;
      const y = (event.clientY / window.innerHeight - 0.5) * 25;

      gsap.to(orbRef.current, {
        x,
        y,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero" id="home">

      <div className="hero-content">

        <p className="hero-small">
          {profile.greeting}
        </p>

        <h1 className="hero-title">

          <span className="hero-title-line">
            Hi, I&apos;m
          </span>

          <span className="hero-title-line">
            {profile.name}<span className="yellow">.</span>
          </span>

        </h1>

        <p className="hero-description">
          {profile.tagline[0]}
          <br />
          {profile.tagline[1]}
        </p>

        <a href="#projects" className="explore-button">
          explore
          <span>→</span>
        </a>

      </div>


      {/* ART DIRECTION */}

      <div className="scene">

        <div className="scene-glow" />

        <div
          ref={orbRef}
          className="floating-orb"
        />

        <div className="planet-small" />

        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />

        <div className="portal">

          <div className="portal-back" />

          <div className="portal-front">

            <div className="stairs">
              <span />
              <span />
              <span />
              <span />
            </div>

          </div>

        </div>

        <div className="figure" />

      </div>


      {/* HANDWRITTEN NOTES */}

      <div className="scribble scribble-one">
        curiosity
        <br />
        builds
        <br />
        better
        <br />
        systems
        <span>↙</span>
      </div>

      <div className="scribble scribble-two">
        small
        <br />
        steps
        <br />
        big
        <br />
        systems
        <span>✦</span>
      </div>

    </section>
  );
}
