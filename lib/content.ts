/* ------------------------------------------------------------------
   ALL COPY LIVES HERE.
   Swap the sample text below with your real content — nothing else
   in the codebase needs to change.
------------------------------------------------------------------- */

export type ProjectType = "web" | "ai" | "tools" | "design";

export interface Project {
  id: string;
  title: string;
  year: string;
  type: ProjectType;
  blurb: string;
  story: string;
  tags: string[];
  role: string;
  result: string;
  link: string;
  hue: number; // art direction for the generated thumbnail
}

export interface Skill {
  name: string;
  level: number; // 0 - 100
}

export interface SkillGroup {
  id: string;
  label: string;
  note: string;
  skills: Skill[];
}

export interface JourneyEntry {
  year: string;
  title: string;
  place: string;
  text: string;
  tag: string;
  highlight?: boolean;
}

export interface LabExchange {
  q: string;
  a: string;
}

/* ---------------------------------------------------------------- */

export const profile = {
  name: "Lakshmi",
  greeting: "Hello, curious human.",
  role: "Full-stack developer & AI tinkerer",
  location: "Bengaluru, IN",
  email: "hello@lakshmi.dev",
  availability: "open to interesting problems",
  tagline: ["I build things with code,", "curiosity and a little bit of chaos."],
  socials: [
    { label: "github", handle: "@lakshmi", href: "https://github.com" },
    { label: "linkedin", handle: "in/lakshmi", href: "https://linkedin.com" },
    { label: "x / twitter", handle: "@lakshmibuilds", href: "https://x.com" },
    { label: "read.cv", handle: "/lakshmi", href: "https://read.cv" },
  ],
};

export const navSections = [
  { id: "home", label: "home", number: "01" },
  { id: "about", label: "about", number: "02" },
  { id: "projects", label: "projects", number: "03" },
  { id: "ai", label: "ai lab", number: "04" },
  { id: "skills", label: "skills", number: "05" },
  { id: "journey", label: "journey", number: "06" },
  { id: "contact", label: "contact", number: "07" },
];

export const dockLinks = [
  { id: "projects", label: "Projects", icon: "⌂" },
  { id: "ai", label: "AI / ML", icon: "◉" },
  { id: "skills", label: "Skills", icon: "</>" },
  { id: "journey", label: "Journey", icon: "◇" },
  { id: "about", label: "About", icon: "○" },
];

/* ---------------------------------------------------------------- */

export const about = {
  title: ["Curious by", "default, stubborn", "by design."],
  body: [
    "I'm a developer who likes building things that feel alive — interfaces that respond like they're listening, systems that stay calm when traffic doesn't, and tools that make people say \"oh, that's nice\" without knowing why.",
    "Somewhere between the frontend and the model weights is where I'm happiest. I care about the boring parts too: accessibility, readable code, and the one small detail that makes a product feel considered.",
  ],
  currently: [
    { icon: "🎧", text: "Learning diffusion models (and how they denoise my life)" },
    { icon: "📚", text: "Reading 'The Design of Everyday Things', slowly" },
    { icon: "🎧", text: "Listening to a playlist where 40% is the same 5 songs" },
    { icon: "🧪", text: "Prototyping voice interfaces that don't interrupt" },
    { icon: "☕", text: "Over-boiling chai while a build runs" },
  ],
  stats: [
    { value: 24, suffix: "+", label: "projects shipped" },
    { value: 4, suffix: "", label: "years building" },
    { value: 17, suffix: "k", label: "commits & counting" },
    { value: 420, suffix: "+", label: "cups of chai" },
  ],
  funFacts: [
    "I've written the same todo app seven times. It's a personality trait now.",
    "I once debugged for six hours. The fix was a missing comma. I collect them now.",
    "All my plants are named after JS frameworks. React is thriving.",
    "My IDE has 47 custom colours and none of them is my favourite.",
    "I can't start a task without making a playlist for it. 112 playlists. Zero regrets.",
    "I name my branches things like `fix-final-final-2` and I'm not sorry.",
  ],
};

/* ---------------------------------------------------------------- */

export const projects: Project[] = [
  {
    id: "orbit",
    title: "Orbit",
    year: "2025",
    type: "web",
    blurb: "A habit tracker that nags you, but kindly.",
    story:
      "Orbit turns daily habits into tiny planets that drift away when you skip a day. The whole thing is built around one idea: guilt doesn't work, but visual momentum does. Offline-first, syncs when you come back, and never shows a streak at zero — it shows a seed instead.",
    tags: ["Next.js", "TypeScript", "Postgres", "PWA"],
    role: "Design + engineering, end to end",
    result: "1,200 early users, 4.9★ average rating",
    link: "#",
    hue: 218,
  },
  {
    id: "paperplane",
    title: "Paperplane",
    year: "2025",
    type: "ai",
    blurb: "Inbox zero, summarised by a very small robot.",
    story:
      "A retrieval-augmented assistant that reads your inbox, drafts replies in your voice, and cites the thread it learned from. The hard part wasn't the model — it was earning trust: every suggestion shows its sources and can be undone in one click.",
    tags: ["Python", "FastAPI", "RAG", "pgvector"],
    role: "ML engineering & product",
    result: "Cut average reply time from 14m to 90s",
    link: "#",
    hue: 332,
  },
  {
    id: "moss",
    title: "Moss",
    year: "2024",
    type: "design",
    blurb: "A design system that grows on you.",
    story:
      "Forty-two components, three themes, one very opinionated spacing scale. Moss started as a Friday afternoon fix and became the shared language between two design teams. Everything ships with motion specs, accessibility notes, and a \"do not\" list.",
    tags: ["Figma", "CSS", "Storybook", "A11y"],
    role: "Design systems lead",
    result: "3.2× faster feature handoff across 6 squads",
    link: "#",
    hue: 200,
  },
  {
    id: "signal",
    title: "Signal",
    year: "2024",
    type: "web",
    blurb: "A collaborative whiteboard that never feels laggy.",
    story:
      "Real-time canvas with CRDT-based sync, presence cursors, and an undo history that survives a page refresh. Built for flaky networks first: everything renders locally before the packet even leaves.",
    tags: ["WebSockets", "CRDT", "Node", "Canvas"],
    role: "Backend & realtime systems",
    result: "Sub-40ms median sync across three continents",
    link: "#",
    hue: 348,
  },
  {
    id: "chaigpt",
    title: "ChaiGPT",
    year: "2024",
    type: "ai",
    blurb: "Running a language model on a laptop, over chai.",
    story:
      "A local-first playground for open-weight models: quantise, chat, compare, repeat. No cloud, no data leaving the machine. I built it to understand inference properly, then kept it because it's genuinely useful on planes.",
    tags: ["llama.cpp", "Python", "Docker", "WebGPU"],
    role: "Just me and a hot laptop",
    result: "18k downloads, 1.1k stars",
    link: "#",
    hue: 232,
  },
  {
    id: "drift",
    title: "Drift",
    year: "2023",
    type: "tools",
    blurb: "Turns a playlist into a generative poster.",
    story:
      "Drift listens to tempo, energy and spectral brightness, then draws a poster from it. Each track gets its own composition, so an album becomes a series. Built in a weekend, still the thing people ask me about most.",
    tags: ["WebGL", "Web Audio API", "Shaders"],
    role: "Creative coding",
    result: "Featured in two generative-art galleries",
    link: "#",
    hue: 312,
  },
];

export const projectFilters: { id: ProjectType | "all"; label: string }[] = [
  { id: "all", label: "everything" },
  { id: "web", label: "web" },
  { id: "ai", label: "ai / ml" },
  { id: "tools", label: "tools" },
  { id: "design", label: "design" },
];

/* ---------------------------------------------------------------- */

export const lab = {
  title: "Prompts, pixels & a little paranoia",
  blurb:
    "A sandbox where you can poke at how I think about AI products. Ask the local model something — it's a tiny, offline, gloriously opinionated stand-in for the real thing.",
  models: ["lakshmi-mini", "rag-lite", "chai-7b", "vision-wip"],
  exchanges: [
    {
      q: "what's your stack?",
      a: "TypeScript for the glue, React for the face, Python when brains are required, and Postgres for anything I don't want to lose. If it needs to move fast, Redis. If it needs to sleep, me.",
    },
    {
      q: "are you available?",
      a: "Yes — for projects with a good problem and a kind team. Bonus points if nobody has built it before. Email me before someone else does.",
    },
    {
      q: "explain AI like I'm five",
      a: "Imagine a very eager parrot that read the entire internet. It repeats patterns back at you — and sometimes, miraculously, it's right. The craft is knowing when to trust the parrot.",
    },
    {
      q: "how do you take your chai?",
      a: "Over-boiled, under-sweet, ideally while a build is running. Two sugars is a code smell, but I don't care.",
    },
    {
      q: "what makes a good product?",
      a: "It answers 'why am I here' in under three seconds, then gets out of the way. Everything after that is decoration — lovely, optional decoration.",
    },
  ],
  fallbacks: [
    "Processing... done. That's the extent of my local inference. Email me for the full model.",
    "404: opinion not found. Try asking about projects, chai, or semicolons.",
    "My neural network says yes. My experience says: tell me more.",
    "I'd hallucinate something convincing here, but I have a policy against it.",
  ],
};

/* ---------------------------------------------------------------- */

export const skills: SkillGroup[] = [
  {
    id: "languages",
    label: "languages",
    note: "the alphabet I think in",
    skills: [
      { name: "TypeScript", level: 92 },
      { name: "Python", level: 88 },
      { name: "SQL", level: 82 },
      { name: "Java", level: 70 },
      { name: "C++", level: 62 },
    ],
  },
  {
    id: "frontend",
    label: "frontend",
    note: "where the delight lives",
    skills: [
      { name: "React", level: 93 },
      { name: "Next.js", level: 90 },
      { name: "CSS & Tailwind", level: 91 },
      { name: "GSAP / Motion", level: 85 },
      { name: "Accessibility", level: 78 },
    ],
  },
  {
    id: "backend",
    label: "backend & cloud",
    note: "the quiet part",
    skills: [
      { name: "Node.js", level: 86 },
      { name: "PostgreSQL", level: 82 },
      { name: "Redis", level: 74 },
      { name: "Docker", level: 78 },
      { name: "AWS", level: 72 },
    ],
  },
  {
    id: "ai",
    label: "ai / ml",
    note: "the loud part",
    skills: [
      { name: "PyTorch", level: 80 },
      { name: "RAG pipelines", level: 84 },
      { name: "Hugging Face", level: 78 },
      { name: "Prompt engineering", level: 90 },
      { name: "Embeddings", level: 76 },
    ],
  },
  {
    id: "soft",
    label: "design & chaos",
    note: "unofficial, heavily used",
    skills: [
      { name: "Figma", level: 82 },
      { name: "Storytelling", level: 88 },
      { name: "Debugging", level: 94 },
      { name: "Overthinking", level: 99 },
    ],
  },
];

export const marqueeItems = [
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "PyTorch",
  "Postgres",
  "GSAP",
  "Figma",
  "Docker",
  "Node.js",
  "Tailwind",
  "Redis",
  "WebGL",
  "FastAPI",
  "RAG",
];

/* ---------------------------------------------------------------- */

export const journey: JourneyEntry[] = [
  {
    year: "2026",
    title: "Building things that feel alive",
    place: "Independent",
    text: "Consulting for teams who want the last 10% — the motion, the details, the part users can't name but always feel.",
    tag: "now",
    highlight: true,
  },
  {
    year: "2025",
    title: "Shipped AI features to 100k people",
    place: "Senior Engineer · Nimbus Labs",
    text: "Led the assistant that answered support tickets in plain language. Learned that evaluation is 80% of the work and demos are 20%.",
    tag: "work",
  },
  {
    year: "2024",
    title: "Grew a design system nobody fought",
    place: "Frontend · Nimbus Labs",
    text: "Convinced six squads to share one component library. The trick was making it faster to use than to copy-paste.",
    tag: "work",
  },
  {
    year: "2023",
    title: "Won the hackathon (and did not sleep)",
    place: "Hack for Good · Bengaluru",
    text: "36 hours, 4 people, 1 idea: a triage tool for community health workers. We won, then slept for eleven hours.",
    tag: "plot twist",
    highlight: true,
  },
  {
    year: "2022",
    title: "Computer Science, survived compilers",
    place: "University",
    text: "Final project: a tiny language that compiled to bytecode. Still the hardest and most satisfying thing I've built.",
    tag: "study",
  },
  {
    year: "2019",
    title: "Hello, World",
    place: "A borrowed laptop",
    text: "One loop printed ninety-nine bottles of beer and I was hooked for life.",
    tag: "origin",
  },
];

/* ---------------------------------------------------------------- */

export const contact = {
  title: ["Let's build", "something weird."],
  blurb:
    "Got a problem that doesn't fit in a template? I'd like to hear about it. I reply to everything, usually within a day — unless the build is running.",
  terminal: [
    { cmd: "whoami", out: "lakshmi — developer, designer of small delights, professional tab-hoarder." },
    { cmd: "cat contact.txt", out: "hello@lakshmi.dev · Bengaluru, IN (GMT+5:30)" },
    { cmd: "ls ./socials", out: "github/  linkedin/  x/  read.cv/" },
    { cmd: "status", out: "🟢 open to interesting problems" },
  ],
  form: {
    nameLabel: "your name",
    emailLabel: "your email",
    messageLabel: "what are we building?",
    submit: "send it →",
    hint: "opens in your mail app — no servers, no tracking, no nonsense",
  },
};

export const footer = {
  marquee: "available for work ✦ available for work ✦ available for work ✦ ",
  note: "made with Next.js, GSAP & an unreasonable amount of chai",
  hint: "psst — press ⌘K (or /) for the secret menu",
};

export const funFacts = about.funFacts;

/* ----------------------------------------------------------------
   INTRO / WELCOME GATE — the very first thing visitors see
------------------------------------------------------------------- */

export interface IntroOption {
  id: string;
  label: string;
  caption: string;
  href: string;
  primary?: boolean;
}

export const intro = {
  title: ["Welcome to my", "personal website"],
  options: [
    {
      id: "download",
      label: "Download my resume",
      caption:
        "If you're in a rush, you can download my resume by clicking the button.",
      href: "/resume.pdf",
      primary: true,
    },
    {
      id: "recruiter",
      label: "Recruiter mode",
      caption: "If you want to go back, you can return to recruiter mode.",
      href: "/resume",
    },
    {
      id: "player",
      label: "Player mode",
      caption:
        "If you have absolutely nothing to do, feel free to view it in player mode.",
      href: "#enter",
    },
  ] satisfies IntroOption[],
};
