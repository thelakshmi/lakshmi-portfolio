"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { useScrollReveal } from "@/lib/useScrollReveal";

/* Current About photograph. Swap this path (and the file in
   public/images) to change the photo without touching the layout:
   the frame is .about-photo — a fixed 4:5 box the image covers. */
const PHOTO = "/images/lakshmi.jpg";

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  /* the "Want to know more?" reveal */
  const [storyOpen, setStoryOpen] = useState(false);

  useScrollReveal(rootRef);

  return (
    <section
      id="about"
      className="section about"
      ref={rootRef}
      aria-label="About"
    >
      <div className="section-head">
        <span className="section-rule" />
      </div>

      <h2 className="section-title reveal">About</h2>

      {/* two-part layout: photograph | short introduction */}
      <div className="about-grid">
        <div className="about-photo reveal">
          <Image
            src={PHOTO}
            alt="Lakshmi"
            fill
            sizes="(max-width: 1100px) 86vw, 44vw"
          />
        </div>

        <div className="about-intro reveal" data-delay="0.12">
          <p>
            I’m Lakshmi, a 3rd-year engineering student who likes building
            things, breaking things, and figuring out why they work.
          </p>
          <p>
            I’m into web design, creative tech, and currently exploring AI/ML.
            Give me an interesting problem and there’s a good chance I’ll try to
            take it one step further than what was originally asked.
          </p>

          <button
            className="about-more"
            type="button"
            aria-expanded={storyOpen}
            aria-controls={storyOpen ? "story-time" : undefined}
            onClick={() => setStoryOpen((open) => !open)}
          >
            Want to know more?
          </button>
        </div>
      </div>

      {/* revealed by "Want to know more?" */}
      {storyOpen && (
        <div className="about-story" id="story-time">
          <h2 className="story-title">Story Time</h2>

          <div className="story-row">
            <div className="story-body">
              <p>
                I’m Lakshmi S, a 3rd-year engineering student from India,
                fascinated by technology, design, and pretty much anything that
                makes me stop and ask, “but why?”
              </p>
              <p>
                My curiosity for tech started back in high school, when I was
                usually among the first to finish the programs in our computer
                lab—and almost always ended up adding something extra to what
                was asked. That habit somehow stuck. Today, I love building
                things that are useful, but I also love making them a little
                more interesting than they need to be. Web design is where that
                side of me comes alive: funky interactions, unexpected details,
                and the endless question of “what else can I add to make this
                better?”
              </p>
              <p>
                I’m currently exploring AI and ML, especially the mathematics
                behind them. Outside of tech, you’ll probably find me reading
                about philosophy, psychology, and the strange ways our minds
                work—placebo effects, paradoxes, mental shortcuts, and other
                rabbit holes I probably didn&apos;t need to fall into.
              </p>
              <p>
                I want to learn a little bit of everything: from whether
                consciousness could exist without a brain to whether there could
                be another version of us living in a parallel universe. I
                collect random knowledge, watch movies that leave me thinking
                long after they end, and genuinely enjoy not knowing
                something—because it gives me something new to figure out.
              </p>
              <p>
                I’m probably a jack of all trades, master of none—and I’m quite
                alright with that. I like being curious, creative, and
                constantly learning.
              </p>
            </div>

            {/* looping sleepy-student illustration — one seamless 16s cycle */}
            <svg
              className="story-art"
              viewBox="0 0 240 240"
              aria-hidden="true"
            >
              {/* floor shadow */}
              <ellipse
                cx="120"
                cy="216"
                rx="88"
                ry="10"
                fill="#2a5ca8"
                fillOpacity="0.14"
              />

              {/* torso — sits behind the desk */}
              <g className="st-torso">
                <rect
                  x="113"
                  y="110"
                  width="14"
                  height="20"
                  rx="5"
                  fill="#f9f7ee"
                  stroke="#1a2440"
                  strokeWidth="3"
                />
                <path
                  d="M97 178C93 152 95 132 105 124C113 118 127 118 135 124C145 132 147 152 143 178Z"
                  fill="#2a5ca8"
                  stroke="#1a2440"
                  strokeWidth="3"
                />
              </g>

              {/* desk */}
              <rect
                x="34"
                y="178"
                width="13"
                height="46"
                rx="3"
                fill="#16305c"
                stroke="#1a2440"
                strokeWidth="2.5"
              />
              <rect
                x="193"
                y="178"
                width="13"
                height="46"
                rx="3"
                fill="#16305c"
                stroke="#1a2440"
                strokeWidth="2.5"
              />
              <rect
                x="18"
                y="166"
                width="204"
                height="13"
                rx="4"
                fill="#f5f3e7"
                stroke="#1a2440"
                strokeWidth="3"
              />

              {/* stacks of books and a loose page */}
              <rect
                x="27"
                y="153"
                width="44"
                height="13"
                rx="3"
                fill="#2a5ca8"
                stroke="#1a2440"
                strokeWidth="2.5"
              />
              <rect
                x="31"
                y="141"
                width="36"
                height="12"
                rx="3"
                fill="#ffffff"
                stroke="#1a2440"
                strokeWidth="2.5"
              />
              <rect
                x="170"
                y="153"
                width="44"
                height="13"
                rx="3"
                fill="#db8084"
                stroke="#1a2440"
                strokeWidth="2.5"
              />
              <rect
                x="176"
                y="141"
                width="32"
                height="12"
                rx="2"
                fill="#ffffff"
                stroke="#1a2440"
                strokeWidth="2"
              />
              <path
                d="M181 146H199M181 149.5H195"
                fill="none"
                stroke="#1a2440"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.5"
              />

              {/* the open book she is reading */}
              <path
                d="M84 152C100 146 112 146 120 150C128 146 140 146 156 152L156 166C140 160 128 160 120 164C112 160 100 160 84 166Z"
                fill="#d8006f"
                stroke="#1a2440"
                strokeWidth="2.5"
              />
              <path
                d="M88 150C101 145 111 145 118 148L118 163C111 160 101 160 88 164Z"
                fill="#ffffff"
                stroke="#1a2440"
                strokeWidth="2"
              />
              <path
                d="M152 150C139 145 129 145 122 148L122 163C129 160 139 160 152 164Z"
                fill="#ffffff"
                stroke="#1a2440"
                strokeWidth="2"
              />
              <path
                d="M94 154H110M94 158H107M130 154H146M133 158H146"
                fill="none"
                stroke="#1a2440"
                strokeWidth="1.3"
                strokeLinecap="round"
                opacity="0.45"
              />

              {/* left arm, resting on the page */}
              <path
                d="M99 130C88 142 82 152 86 160"
                fill="none"
                stroke="#1a2440"
                strokeWidth="15"
                strokeLinecap="round"
              />
              <path
                d="M99 130C88 142 82 152 86 160"
                fill="none"
                stroke="#2a5ca8"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <circle
                cx="86"
                cy="160"
                r="7.5"
                fill="#f9f7ee"
                stroke="#1a2440"
                strokeWidth="2.5"
              />

              {/* head — reads, nods off, slumps onto the desk, wakes */}
              <g className="st-head">
                <circle
                  cx="120"
                  cy="90"
                  r="32"
                  fill="#f9f7ee"
                  stroke="#1a2440"
                  strokeWidth="3"
                />
                <path
                  d="M88 90C88 62 102 46 120 46C140 46 152 62 152 90C146 76 138 69 128 73C119 63 104 63 96 73C91 77 89 84 88 90Z"
                  fill="#1a2440"
                />
                <circle cx="147" cy="62" r="14.5" fill="#d8006f" />
                <circle cx="147" cy="62" r="11.5" fill="#1a2440" />

                {/* eyes — open / sleepy / wide / embarrassed */}
                <g className="st-eye-open">
                  <circle cx="107" cy="97" r="4.5" fill="#1a2440" />
                  <circle cx="133" cy="97" r="4.5" fill="#1a2440" />
                </g>
                <g className="st-eye-sleep">
                  <path
                    d="M101 96Q107 103.5 113 96"
                    fill="none"
                    stroke="#1a2440"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M127 96Q133 103.5 139 96"
                    fill="none"
                    stroke="#1a2440"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </g>
                <g className="st-eye-wide">
                  <circle cx="107" cy="95" r="6.5" fill="#1a2440" />
                  <circle cx="133" cy="95" r="6.5" fill="#1a2440" />
                  <circle cx="109" cy="92.5" r="1.7" fill="#f9f7ee" />
                  <circle cx="135" cy="92.5" r="1.7" fill="#f9f7ee" />
                </g>
                <g className="st-eye-shut">
                  <path
                    d="M101 99Q107 91.5 113 99"
                    fill="none"
                    stroke="#1a2440"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M127 99Q133 91.5 139 99"
                    fill="none"
                    stroke="#1a2440"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </g>

                {/* blush */}
                <g className="st-blush">
                  <ellipse
                    cx="99"
                    cy="105"
                    rx="7"
                    ry="4"
                    fill="#d8006f"
                    fillOpacity="0.62"
                  />
                  <ellipse
                    cx="141"
                    cy="105"
                    rx="7"
                    ry="4"
                    fill="#d8006f"
                    fillOpacity="0.62"
                  />
                </g>

                {/* mouth — smile / yawn-gasp / wavy */}
                <path
                  className="st-mouth-smile"
                  d="M113 111C116.5 115 123.5 115 127 111"
                  fill="none"
                  stroke="#1a2440"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <ellipse
                  className="st-mouth-o"
                  cx="120"
                  cy="112"
                  rx="4.5"
                  ry="6"
                  fill="#1a2440"
                />
                <path
                  className="st-mouth-wave"
                  d="M112 112C115 108 118 115 121 111C124 107.5 127 114 129 111"
                  fill="none"
                  stroke="#1a2440"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* drool — forms, stretches, drips */}
                <path
                  className="st-drool"
                  d="M119 114C117 121 118 129 121.5 131C125 129 126 121 124 114Z"
                  fill="#e3edfb"
                  stroke="#2a5ca8"
                  strokeWidth="1.6"
                />
                <ellipse
                  className="st-drop1"
                  cx="121.5"
                  cy="133"
                  rx="3.5"
                  ry="4.5"
                  fill="#e3edfb"
                  stroke="#2a5ca8"
                  strokeWidth="1.5"
                />
                <ellipse
                  className="st-drop2"
                  cx="121.5"
                  cy="133"
                  rx="3.5"
                  ry="4.5"
                  fill="#e3edfb"
                  stroke="#2a5ca8"
                  strokeWidth="1.5"
                />

                {/* embarrassment sweat drop */}
                <path
                  className="st-sweat"
                  d="M82 64C86 71 88.5 76 85.5 79.5C82.5 83 77.5 81.5 77 77C76.5 73 79 68.5 82 64Z"
                  fill="#2a5ca8"
                  fillOpacity="0.8"
                />
              </g>

              {/* right arm — rests, then lifts up to wipe her mouth */}
              <g className="st-arm">
                <path
                  d="M141 130C152 142 158 152 155 160"
                  fill="none"
                  stroke="#1a2440"
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                <path
                  d="M141 130C152 142 158 152 155 160"
                  fill="none"
                  stroke="#2a5ca8"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <circle
                  cx="155"
                  cy="160"
                  r="7.5"
                  fill="#f9f7ee"
                  stroke="#1a2440"
                  strokeWidth="2.5"
                />
              </g>

              {/* floating Zzz */}
              <text className="st-z st-z1" x="160" y="74" fontSize="13">
                Z
              </text>
              <text className="st-z st-z2" x="168" y="58" fontSize="16">
                Z
              </text>
              <text className="st-z st-z3" x="182" y="40" fontSize="20">
                Z
              </text>

              {/* the website teasing the character */}
              <text className="st-caption" x="14" y="40">
                ok bro, stop flexing!
              </text>
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
