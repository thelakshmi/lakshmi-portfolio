"use client";

import { useEffect } from "react";

import TopNav from "@/components/TopNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import AiLab from "@/components/AiLab";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RecruiterAbout from "@/components/RecruiterAbout";
import { CursorGlow, ScrollProgress } from "@/components/Chrome";

import { burst } from "@/lib/confetti";
import { getMode, subscribeMode, useMode } from "@/lib/mode";

export default function Home() {
  /* the two modes of the site swap through the existing mode system:
     useMode() tracks <html data-mode>, set by the ModeSwitch toggle.
     Exactly one view is mounted at a time, so #about never exists
     twice in the document. */
  const mode = useMode();
  const recruiter = mode === "recruiter";

  /* easter egg #2: type my name anywhere on the page (Player Mode only) */
  useEffect(() => {
    let buffer = "";

    const onKey = (event: KeyboardEvent) => {
      if (event.key.length !== 1) return;
      if (getMode() !== "player") return;

      buffer = (buffer + event.key.toLowerCase()).slice(-8);

      if (buffer.includes("lakshmi")) {
        buffer = "";
        burst(window.innerWidth / 2, window.innerHeight * 0.4, 80);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* switching modes always starts the new mode at the top of the page */
  useEffect(() => {
    return subscribeMode(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }, []);

  return (
    <>
      <main className="portfolio">
        <CursorGlow />
        <TopNav />

        {recruiter ? (
          <div className="mode-recruiter">
            <RecruiterAbout />
          </div>
        ) : (
          <div className="mode-player">
            <Hero />
            <About />
            <Projects />
            <AiLab />
            <Skills />
            <Journey />
            <Contact />
            <Footer />
          </div>
        )}
      </main>

      <ScrollProgress />
    </>
  );
}
