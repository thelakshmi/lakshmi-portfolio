"use client";

import { useRef } from "react";

import { useScrollReveal } from "@/lib/useScrollReveal";

/* The four Player Mode projects — exact copy from PORTFOLIO_SPEC.md.
   Front of the card carries the title + its illustrated mark, the
   reverse reveals the project information on hover/focus. */
const PROJECTS = [
  {
    title: "GradTrack",
    description:
      "LOR management platform built with my team to simplify requests and approvals between students and faculty.",
    technologies: "Node.js · MySQL · MongoDB",
    art: (
      <svg className="card-art" viewBox="0 0 120 76" aria-hidden="true">
        <path
          d="M12 66A48 48 0 0 1 108 66"
          fill="none"
          stroke="#2a5ca8"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M28 66A32 32 0 0 1 92 66"
          fill="none"
          stroke="#d8006f"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M44 66A16 16 0 0 1 76 66"
          fill="none"
          stroke="#1a2440"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="60" cy="66" r="5" fill="#2a5ca8" />
      </svg>
    ),
  },
  {
    title: "WIN-DIA",
    description:
      "E-commerce website for a startup, where I handled the frontend and worked directly with the client.",
    technologies: "Next.js · CSS · Supabase",
    art: (
      <svg className="card-art" viewBox="0 0 120 76" aria-hidden="true">
        <circle
          cx="46"
          cy="38"
          r="26"
          fill="none"
          stroke="#d8006f"
          strokeWidth="5"
        />
        <circle cx="74" cy="38" r="26" fill="#2a5ca8" />
        <circle cx="74" cy="38" r="11" fill="#f9f7ee" />
        <circle cx="20" cy="66" r="5" fill="#db8084" />
      </svg>
    ),
  },
  {
    title: "NutriAgama",
    description:
      "E-commerce platform for a wellness startup. I’m working on the backend and payment integration.",
    technologies: "Next.js · Supabase · Payments",
    art: (
      <svg className="card-art" viewBox="0 0 120 76" aria-hidden="true">
        <path
          d="M16 62L52 16"
          fill="none"
          stroke="#2a5ca8"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M38 62L74 16"
          fill="none"
          stroke="#db8084"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M60 62L96 16"
          fill="none"
          stroke="#2a5ca8"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="102" cy="58" r="8" fill="#d8006f" />
      </svg>
    ),
  },
  {
    title: "AI Engineering Roadmap",
    description:
      "An ongoing 8-project journey exploring RAG, agents, fine-tuning, evaluation, and multimodal AI.",
    technologies: "Python · LLMs · RAG · Agents",
    art: (
      <svg className="card-art" viewBox="0 0 120 76" aria-hidden="true">
        <path
          d="M14 60C40 60 44 30 70 30C90 30 96 44 106 44"
          fill="none"
          stroke="#1a2440"
          strokeWidth="3"
          strokeDasharray="1 10"
          strokeLinecap="round"
        />
        <circle cx="14" cy="60" r="8" fill="#2a5ca8" />
        <circle cx="70" cy="30" r="7" fill="#d8006f" />
        <circle cx="106" cy="44" r="5" fill="#2a5ca8" />
      </svg>
    ),
  },
];

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);

  useScrollReveal(rootRef);

  return (
    <section
      id="projects"
      className="section projects"
      ref={rootRef}
      aria-label="Projects"
    >
      <div className="section-head">
        <span className="section-rule" />
      </div>

      <h2 className="section-title reveal">Projects</h2>

      {/* a physical collection of cards — each at its own angle,
          proportion and offset, turning over on hover/focus */}
      <div className="project-grid">
        {PROJECTS.map((project, index) => (
          <article
            key={project.title}
            className="project-card reveal"
            data-delay={index * 0.08}
            tabIndex={0}
          >
            <div className="project-card-inner">
              <div className="project-card-face project-card-front">
                {project.art}
                <h3>{project.title}</h3>
              </div>

              <div className="project-card-face project-card-back">
                <p>{project.description}</p>
                <span className="project-tech">{project.technologies}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
