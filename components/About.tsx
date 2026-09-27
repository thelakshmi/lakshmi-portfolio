"use client";

import { useEffect, useRef, useState } from "react";

import { about } from "@/lib/content";
import { burstFrom } from "@/lib/confetti";
import { animateCount, useScrollReveal } from "@/lib/useScrollReveal";

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const factRef = useRef<HTMLParagraphElement>(null);
  const [fact, setFact] = useState(0);

  useScrollReveal(rootRef);

  /* count the numbers up when they scroll into view */
  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll<HTMLElement>("[data-count]");
    if (!nodes) return;

    nodes.forEach((node) => {
      animateCount(
        node,
        Number(node.dataset.count),
        node.dataset.suffix ?? "",
        1.4
      );
    });
  }, []);

  const shuffleFact = () => {
    setFact((current) => (current + 1) % about.funFacts.length);
    burstFrom(factRef.current, 12);
  };

  return (
    <section id="about" className="section about" ref={rootRef}>

      <div className="section-head reveal">
        <span className="section-rule" />
      </div>

      <div className="about-grid">

        <div className="about-main">

          <h2 className="section-title">
            {about.title.map((line, index) => (
              <span
                key={line}
                className="title-line reveal"
                data-delay={index * 0.08}
              >
                {line}
              </span>
            ))}
          </h2>

          <div className="about-body">
            {about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="reveal">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about-stats reveal">
            {about.stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <strong
                  data-count={stat.value}
                  data-suffix={stat.suffix}
                >
                  0
                </strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

        </div>

        <aside className="about-side">

          <div className="avatar-card reveal">
            <div className="avatar-face">
              <span>L</span>
            </div>

            <svg className="badge-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path
                  id="about-ring"
                  d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
                />
              </defs>
              <text>
                <textPath href="#about-ring">
                  ✦ open to interesting problems ✦ let&apos;s build something weird
                </textPath>
              </text>
            </svg>

            <span className="avatar-sticker">⚡</span>
          </div>

          <div className="currently-card reveal" data-delay="0.12">
            <h3>currently</h3>
            <ul>
              {about.currently.map((item) => (
                <li key={item.text}>
                  <span className="currently-icon">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

        </aside>

      </div>

      <div className="fact-box reveal">
        <span className="fact-label">fun fact · no. {fact + 1}</span>
        <p ref={factRef} className="fact-text">
          {about.funFacts[fact]}
        </p>
        <button className="fact-button" onClick={shuffleFact}>
          shuffle ✦
        </button>
      </div>

    </section>
  );
}
