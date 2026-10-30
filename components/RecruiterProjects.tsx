"use client";

type Project = {
  name: string;
  description: string[];
  meta: string;
};

/* The four Recruiter Mode projects — exact copy from
   PORTFOLIO_SPEC.md (RECRUITER MODE > PROJECTS), byte-for-byte:
   no rewording, no extra projects, no added claims, dates,
   links or metrics. */
const PROJECTS: Project[] = [
  {
    name: "NextStep",
    description: [
      "A full-stack web application I built with my team to make the Letter of Recommendation process easier for students and faculty. It replaces the usual manual process with a platform where students can submit requests and faculty can review and approve them.",
      "This was one of my first projects where I got to work with backend APIs, databases, and the frontend together, and understand how all the pieces of a web application fit.",
    ],
    meta: "Tech: Node.js · MySQL · MongoDB",
  },
  {
    name: "WIN-DIA",
    description: [
      "I got the opportunity to work with the college incubation centre and a student team to build an e-commerce website for WIN-DIA, a food startup.",
      "I worked mainly on the frontend, turning the brand's ideas and requirements into the actual website. Since this was for a real startup, I also got to work directly with the client and understand how design and development change when you're building something for an actual business.",
    ],
    meta: "Tech: Next.js · CSS · Supabase · Resend · Git · GitHub · Vercel",
  },
  {
    name: "NutriAgama",
    description: [
      "Another startup project I’m working on through the college incubation centre, this time for NutriAgama, a wellness brand focused on traditional Indian nutrition products.",
      "I'm handling the backend and payment gateway, while working with the team to build the rest of the platform. These projects have been a good way to experience what development looks like beyond college assignments—from understanding client requirements to figuring out how to actually implement them.",
    ],
    meta: "Tech: Next.js · CSS · Supabase · Resend · Git · GitHub · Vercel",
  },
  {
    name: "AI Engineering Roadmap",
    description: [
      "An ongoing individual project where I'm exploring AI engineering by building 8 projects, starting with basic LLM applications and gradually moving into more advanced systems.",
      "So far, the roadmap covers things like RAG, hybrid retrieval, reranking, evaluation, monitoring, multi-agent systems, and LLM fine-tuning with LoRA/QLoRA. I'm also exploring AI coding assistants and multimodal applications.",
      "The idea is simple: instead of just learning AI concepts separately, I want to actually build with them and understand what goes on behind the scenes.",
    ],
    meta: "Status: In progress · Individual project",
  },
];

/**
 * Recruiter Mode · Projects — a structured grid of the four
 * projects: project name, description, tech stack / status.
 * Clean hairline rules only — no Player Mode card treatment
 * (no flips, rotations, stickers or game mechanics).
 */
export default function RecruiterProjects() {
  return (
    <section id="projects" className="rc-projects" aria-label="Projects">
      <h2 className="rc-section-title">Projects</h2>

      <div className="rc-project-list">
        {PROJECTS.map((project) => (
          <article key={project.name} className="rc-project">
            <h2 className="rc-project-name">{project.name}</h2>

            {project.description.map((paragraph) => (
              <p key={paragraph} className="rc-project-desc">
                {paragraph}
              </p>
            ))}

            <p className="rc-project-meta">{project.meta}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
