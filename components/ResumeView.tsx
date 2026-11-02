"use client";

import Link from "next/link";

import { applyMode } from "@/lib/mode";
import { about, journey, profile, projects, skills } from "@/lib/content";

/** Experience reads newest-first; education gets pulled out into its own block. */
const experience = journey.filter((entry) => entry.tag !== "study");
const education = journey.filter((entry) => entry.tag === "study");
const featured = projects.slice(0, 4);

export default function ResumeView() {
  return (
    <div className="resume mode-recruiter">
      <div className="resume-bar">
        <Link className="resume-back" href="/" onClick={() => applyMode("player")}>
          ← player mode
        </Link>

        <div className="resume-actions">
          <button type="button" onClick={() => window.print()}>
            print
          </button>
          <a href="/resume.pdf" download>
            download pdf ↓
          </a>
        </div>
      </div>

      <article className="resume-sheet">
        <header className="resume-head">
          <div>
            <p className="resume-eyebrow">recruiter mode</p>
            <h1>{profile.name}</h1>
            <p className="resume-role">{profile.role}</p>
          </div>

          <ul className="resume-contact">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>{profile.location}</li>
            <li>{profile.availability}</li>
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.handle}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <section>
          <h2>profile</h2>
          {about.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </section>

        <section>
          <h2>experience</h2>
          {experience.map((entry) => (
            <div className="resume-entry" key={`${entry.year}-${entry.title}`}>
              <span className="resume-year">{entry.year}</span>
              <div>
                <h3>{entry.title}</h3>
                <p className="resume-place">{entry.place}</p>
                <p>{entry.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2>selected work</h2>
          {featured.map((project) => (
            <div className="resume-entry" key={project.id}>
              <span className="resume-year">{project.year}</span>
              <div>
                <h3>{project.title}</h3>
                <p className="resume-place">
                  {project.type} · {project.tags.join(", ")}
                </p>
                <p>
                  {project.blurb} {project.result}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2>skills</h2>
          {skills.map((group) => (
            <div className="resume-skill" key={group.id}>
              <span className="resume-skill-label">{group.label}</span>
              <span className="resume-skill-items">
                {group.skills.map((skill) => skill.name).join(" · ")}
              </span>
            </div>
          ))}
        </section>

        {education.length > 0 && (
          <section>
            <h2>education</h2>
            {education.map((entry) => (
              <div className="resume-entry" key={`${entry.year}-${entry.title}`}>
                <span className="resume-year">{entry.year}</span>
                <div>
                  <h3>{entry.title}</h3>
                  <p className="resume-place">{entry.place}</p>
                  <p>{entry.text}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        <footer className="resume-foot">
          <span>
            {about.stats.map((stat) => `${stat.value}${stat.suffix} ${stat.label}`).join(" · ")}
          </span>
          <Link href="/" onClick={() => applyMode("player")}>
            player mode →
          </Link>
        </footer>
      </article>
    </div>
  );
}
