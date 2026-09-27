"use client";

import { useRef } from "react";

import { journey } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Journey() {
  const rootRef = useRef<HTMLElement>(null);

  useScrollReveal(rootRef);

  return (
    <section id="journey" className="section journey" ref={rootRef}>

      <div className="section-head reveal">
        <span className="section-rule" />
      </div>

      <div className="section-heading-row">
        <h2 className="section-title reveal">
          <span className="title-line">A very abridged</span>
          <span className="title-line" data-delay="0.08">
            origin story<span className="yellow">.</span>
          </span>
        </h2>
        <p className="section-blurb reveal" data-delay="0.16">
          From a borrowed laptop to whatever this is.
        </p>
      </div>

      <div className="timeline">
        {[...journey].reverse().map((entry, index) => (
          <article
            key={entry.year + entry.title}
            className={`timeline-item reveal${entry.highlight ? " is-highlight" : ""}`}
            data-delay={(index % 2) * 0.07}
          >
            <span className="timeline-dot" />

            <div className="timeline-year">{entry.year}</div>

            <div className="timeline-card">
              <span className="timeline-tag">{entry.tag}</span>
              <h3>{entry.title}</h3>
              <span className="timeline-place">{entry.place}</span>
              <p>{entry.text}</p>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
