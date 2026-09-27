"use client";

import { useCallback, useEffect, useState } from "react";

import TopNav from "@/components/TopNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import AiLab from "@/components/AiLab";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { CursorGlow, ScrollProgress } from "@/components/Chrome";
import IntroGate from "@/components/IntroGate";

import { burst } from "@/lib/confetti";

export default function Home() {
  /* the welcome card sits on top until the visitor picks a door */
  const [entered, setEntered] = useState(false);
  const enterSite = useCallback(() => setEntered(true), []);

  /* easter egg #2: type my name anywhere on the page */
  useEffect(() => {
    let buffer = "";

    const onKey = (event: KeyboardEvent) => {
      if (event.key.length !== 1) return;

      buffer = (buffer + event.key.toLowerCase()).slice(-8);

      if (buffer.includes("lakshmi")) {
        buffer = "";
        burst(window.innerWidth / 2, window.innerHeight * 0.4, 80);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {!entered && <IntroGate onEnter={enterSite} />}

      {/* re-keys the site so every intro animation plays on entering */}
      <main className="portfolio" key={entered ? "site" : "boot"}>
        <CursorGlow />

        <TopNav />
        <Hero />
        <About />
        <Projects />
        <AiLab />
        <Skills />
        <Journey />
        <Contact />
        <Footer />
      </main>

      <ScrollProgress />
    </>
  );
}
