"use client";

type Category = {
  name: string;
  skills: string[];
};

/* The eight skill categories from the provided Recruiter Mode
   material — grouped exactly as provided. Skill names are
   untouched, including "Hugging Face (project experience)". */
const CATEGORIES: Category[] = [
  {
    name: "Programming Languages",
    skills: ["Java", "Python", "C", "C++"],
  },
  {
    name: "Frontend Development",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    name: "Backend Development",
    skills: ["Node.js", "Express"],
  },
  {
    name: "Databases",
    skills: ["MySQL", "MongoDB", "Supabase"],
  },
  {
    name: "AI / AI Application Development",
    skills: ["Python", "Hugging Face (project experience)"],
  },
  {
    name: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Vercel"],
  },
  {
    name: "CS Fundamentals",
    skills: [
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
    ],
  },
  {
    name: "Design",
    skills: ["Figma"],
  },
];

/**
 * Recruiter Mode · Skills — the eight provided categories, each
 * heading with its skills as quiet bordered chips. Static list
 * only: no scores, bars, game mechanics, quizzes or filtering.
 */
export default function RecruiterSkills() {
  return (
    <section id="skills" className="rc-skills" aria-label="Skills">
      <h2 className="rc-section-title">Skills</h2>

      <div className="rc-skill-grid">
        {CATEGORIES.map((category) => (
          <div key={category.name} className="rc-skill-category">
            <h3 className="rc-skill-category-name">{category.name}</h3>

            <ul className="rc-skill-chips">
              {category.skills.map((skill) => (
                <li key={skill} className="rc-skill-chip">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
