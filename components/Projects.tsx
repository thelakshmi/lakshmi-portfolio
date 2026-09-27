"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

import {
  projectFilters,
  projects,
  type Project,
  type ProjectType,
} from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<ProjectType | "all">("all");
  const [open, setOpen] = useState<Project | null>(null);

  useScrollReveal(rootRef);

  /* esc closes the case study, and the page stops scrolling behind it */
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.type === filter);

  return (
    <section id="projects" className="section projects" ref={rootRef}>

      <div className="section-head reveal">
        <span className="section-rule" />
      </div>

      <div className="section-heading-row">
        <h2 className="section-title reveal">
          <span className="title-line">Things I made</span>
          <span className="title-line" data-delay="0.08">
            instead of sleeping<span className="yellow">.</span>
          </span>
        </h2>

        <div className="project-filters reveal" data-delay="0.16">
          {projectFilters.map((option) => (
            <button
              key={option.id}
              className={filter === option.id ? "chip active" : "chip"}
              onClick={() => setFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="project-grid" key={filter}>
        {visible.map((project, index) => (
          <article
            key={project.id}
            className="project-card"
            style={{ "--i": index, "--hue": project.hue } as CSSProperties}
            onClick={() => setOpen(project)}
          >

            <div className="project-thumb">
              <span className="thumb-grid" />
              <span className="thumb-orbit" />
              <span className="thumb-block" />
              <span className="thumb-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="project-meta">
              <span>{project.year}</span>
              <span className="project-dot" />
              <span>{project.type}</span>
            </div>

            <h3>{project.title}</h3>
            <p>{project.blurb}</p>

            <ul className="project-tags">
              {project.tags.slice(0, 3).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <span className="project-open">open case →</span>

          </article>
        ))}
      </div>

      {open &&
        createPortal(
          <div
            className="case-backdrop"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <div
              className="case-panel"
              onClick={(event) => event.stopPropagation()}
            >

              <button
                className="case-close"
                onClick={() => setOpen(null)}
                aria-label="Close case study"
              >
                ✕
              </button>

              <div
                className="case-art"
                style={{ "--hue": open.hue } as CSSProperties}
              >
                <span className="thumb-grid" />
                <span className="thumb-orbit" />
                <span className="thumb-block" />
              </div>

              <div className="case-body">
                <div className="project-meta">
                  <span>{open.year}</span>
                  <span className="project-dot" />
                  <span>{open.type}</span>
                </div>

                <h3>{open.title}</h3>
                <p className="case-story">{open.story}</p>

                <dl className="case-facts">
                  <div>
                    <dt>role</dt>
                    <dd>{open.role}</dd>
                  </div>
                  <div>
                    <dt>result</dt>
                    <dd>{open.result}</dd>
                  </div>
                  <div>
                    <dt>stack</dt>
                    <dd>{open.tags.join(" · ")}</dd>
                  </div>
                </dl>

                <a className="explore-button" href={open.link}>
                  view project <span>→</span>
                </a>
              </div>

            </div>
          </div>,
          document.body
        )}

    </section>
  );
}
