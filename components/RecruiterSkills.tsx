"use client";

type Skill = {
  name: string;
  score: number;
};

/* The ten Recruiter Mode skills - exact names and scores from
   PORTFOLIO_SPEC.md (RECRUITER MODE > SKILLS). The bar width is
   derived directly from the score (score / 10 of the full track,
   so 6.5/10 = 65%); nothing is rounded, exaggerated or added. */
const SKILLS: Skill[] = [
  { name: "Java", score: 6 },
  { name: "Python", score: 6 },
  { name: "C/C++", score: 4 },
  { name: "HTML", score: 7 },
  { name: "CSS", score: 6 },
  { name: "Javascript", score: 5 },
  { name: "Node.js", score: 5 },
  { name: "Microsoft Suite (Excel, PowerPoint, etc.)", score: 7 },
  { name: "Formal/Technical Presentations", score: 6.5 },
  { name: "IoT", score: 5 },
];

/* The scale labels exactly as established by the reference image. */
const SCALE = ["Introduced", "Proficient", "Expert"];

/**
 * Recruiter Mode - Skills: the reference's proficiency pattern -
 * a category heading, the Introduced / Proficient / Expert scale
 * with its hairline, and one thin bar per skill whose filled
 * portion is score / 10 of the full track. Static visualisation
 * only: no game mechanics, quizzes, sliders, filtering or hover
 * states, and no skills beyond the spec's ten.
 */
export default function RecruiterSkills() {
  return (
    <section id="skills" className="rc-skills" aria-label="Skills">
      <h2 className="rc-section-title">Skills</h2>

      {/* One category: the spec gives no sub-categories for these ten
          skills and the reference's categories (CAD, Mechanical) belong
          to its example skills, so no new grouping is invented. */}
      <div className="rc-skill-category">
        <div className="rc-skill-scale">
          <h2 className="rc-skill-category-name">SKILLSET</h2>

          <div className="rc-skill-scale-labels">
            <span>{SCALE[0]}</span>
            <span>{SCALE[1]}</span>
            <span>{SCALE[2]}</span>
          </div>
        </div>

        <ul className="rc-skill-list">
          {SKILLS.map((skill) => (
            <li key={skill.name} className="rc-skill-row">
              <span className="rc-skill-name">{skill.name}</span>

              <div
                className="rc-skill-track"
                role="progressbar"
                aria-label={skill.name}
                aria-valuemin={0}
                aria-valuemax={10}
                aria-valuenow={skill.score}
              >
                <span
                  className="rc-skill-fill"
                  style={{ width: `${skill.score * 10}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
