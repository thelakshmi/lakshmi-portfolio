"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { marqueeItems, skills } from "@/lib/content";
import { prefersReducedMotion, useScrollReveal } from "@/lib/useScrollReveal";

export default function Skills() {
  const rootRef = useRef<HTMLElement>(null);

  useScrollReveal(rootRef);

  /* bars grow as you scroll past them */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".skill-fill").forEach((bar) => {
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${bar.dataset.level}%`,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 92%", once: true },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const ticker = [...marqueeItems, ...marqueeItems];

  return (
    <section id="skills" className="section skills" ref={rootRef}>

      <div className="section-head reveal">
        <span className="section-rule" />
      </div>

      <div className="section-heading-row">
        <h2 className="section-title reveal">
          <span className="title-line">Tools I reach for</span>
          <span className="title-line" data-delay="0.08">
            without looking<span className="yellow">.</span>
          </span>
        </h2>
        <p className="section-blurb reveal" data-delay="0.16">
          The bars are honest-ish. Anything above 90 means I&apos;ve broken it
          in production at least once.
        </p>
      </div>

      <div className="marquee reveal" aria-hidden="true">
        <div className="marquee-track">
          {ticker.map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <div className="skill-groups">
        {skills.map((group, index) => (
          <div
            className="skill-group reveal"
            key={group.id}
            data-delay={(index % 3) * 0.08}
          >
            <div className="skill-group-head">
              <h3>{group.label}</h3>
              <span>{group.note}</span>
            </div>

            <ul>
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <div className="skill-line">
                    <span>{skill.name}</span>
                    <em>{skill.level}</em>
                  </div>
                  <div className="skill-track">
                    <i
                      className="skill-fill"
                      data-level={skill.level}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </section>
  );
}
