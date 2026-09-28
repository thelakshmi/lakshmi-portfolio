"use client";

import { useEffect, useRef, useState } from "react";

import { useScrollReveal } from "@/lib/useScrollReveal";

/* ------------------------------------------------------------------
   LAKSHMI'S LIFE / CAREER — SIDE-SCROLLING GAME
   (PORTFOLIO_SPEC.md — the Skills Game section, id="skills")

   One run from 2006 to 2026: exactly 3 hurdles to jump and exactly
   5 achievements to collect, in timeline order, while the
   environment shifts day -> dusk -> night -> darkness and the run
   ends on "TO BE CONTINUED...". Running into a hurdle freezes the
   run on a simple loss state ("OOPS!" + "Oops! Try Again"); the
   successful ending keeps a quiet "Play Again" and a post-game
   overview that holds the full official event strings. No scores,
   lives, enemies, power-ups, levels or events beyond the specified
   timeline.
------------------------------------------------------------------ */

/* Each object appears `at` seconds after the run starts. The moving
   objects carry short labels so they stay readable at game speed;
   the full official event strings live in the post-game overview
   below the stage. */
const HURDLES = [
  {
    at: 10.5,
    width: 58,
    height: 52,
    label: "ICSE Exams",
    art: (
      <svg width="58" height="52" viewBox="0 0 58 52" aria-hidden="true">
        <ellipse cx="29" cy="50" rx="25" ry="2.6" fill="#1a2440" opacity="0.14" />
        <rect x="3" y="37" width="52" height="13" rx="2.5" fill="#f5f3e7" stroke="#1a2440" strokeWidth="2" />
        <path d="M11 37V50" stroke="#1a2440" strokeWidth="1.5" />
        <rect x="7" y="23" width="44" height="13" rx="2.5" fill="#2a5ca8" stroke="#1a2440" strokeWidth="2" />
        <path d="M15 23V36" stroke="#f5f3e7" strokeWidth="1.5" opacity="0.8" />
        <rect x="4" y="9" width="47" height="13" rx="2.5" fill="#d8006f" stroke="#1a2440" strokeWidth="2" />
        <path d="M12 9V22" stroke="#f5f3e7" strokeWidth="1.5" opacity="0.85" />
      </svg>
    ),
  },
  {
    at: 17.5,
    width: 54,
    height: 58,
    label: "12th Exams",
    art: (
      <svg width="54" height="58" viewBox="0 0 54 58" aria-hidden="true">
        <ellipse cx="27" cy="56" rx="22" ry="2.6" fill="#1a2440" opacity="0.14" />
        <g transform="rotate(8 24 56)">
          <rect x="9" y="12" width="30" height="44" rx="2" fill="#f5f3e7" stroke="#1a2440" strokeWidth="2" />
        </g>
        <g transform="rotate(-7 28 56)">
          <rect x="16" y="8" width="30" height="48" rx="2" fill="#ffffff" stroke="#1a2440" strokeWidth="2" />
          <path d="M22 18H40M22 25H40M22 32H35" stroke="#1a2440" strokeWidth="1.6" opacity="0.5" strokeLinecap="round" />
          <path d="M23 42l4 4l8 -9" fill="none" stroke="#2a5ca8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    ),
  },
  {
    at: 24.5,
    width: 62,
    height: 48,
    label: "Hostel Life",
    art: (
      <svg width="62" height="48" viewBox="0 0 62 48" aria-hidden="true">
        <ellipse cx="31" cy="46" rx="27" ry="2.6" fill="#1a2440" opacity="0.14" />
        <path d="M24 14a7 7 0 0 1 14 0" fill="none" stroke="#1a2440" strokeWidth="2.6" strokeLinecap="round" />
        <rect x="5" y="13" width="52" height="33" rx="4" fill="#2a5ca8" stroke="#1a2440" strokeWidth="2" />
        <rect x="5" y="26" width="52" height="5" fill="#f5f3e7" opacity="0.85" />
        <rect x="27" y="13" width="8" height="33" fill="#d8006f" stroke="#1a2440" strokeWidth="1.5" />
        <circle cx="31" cy="28.5" r="4" fill="#f9f7ee" stroke="#1a2440" strokeWidth="1.8" />
      </svg>
    ),
  },
];

const STARS = [
  { at: 3.0, height: 64, label: "Learnt to Walk" },
  { at: 13.0, height: 74, label: "Top 10 ICSE" },
  { at: 19.6, height: 62, label: "100/100 Maths" },
  { at: 22.0, height: 70, label: "SPC" },
  { at: 27.5, height: 66, label: "Samsung Campus" },
];

const CLOUD_PATH =
  "M12 36C4 36 2 29 6 25C8 18 16 17 21 20C22 11 31 6 40 9C46 11 50 16 50 22C57 18 66 21 67 28C73 28 76 32 74 36Z";

const HILL_PATH =
  "M0 64V30Q62.5 4 125 30T250 30T375 30T500 30T625 30T750 30T875 30T1000 30V64Z";

/* ---- run timing (seconds) ---- */
const GRAVITY = 1120;
const JUMP_VELOCITY = 512;
const DARK_START = 29;
const DARK_FULL = 32;
const END_AT = 32.4;
const DASH_PERIOD = 46;

/* The year shown at each moment of the run — interpolated between
   the event years, never leaving 2006–2026. */
const YEAR_MARKS: [number, number][] = [
  [0, 2006],
  [3.0, 2008],
  [10.5, 2022],
  [13.0, 2022],
  [17.5, 2024],
  [19.6, 2024],
  [22.0, 2024],
  [24.5, 2024],
  [27.5, 2025],
  [32.0, 2026],
];

const ramp = (value: number, from: number, to: number) =>
  value <= from ? 0 : value >= to ? 1 : (value - from) / (to - from);

const yearAt = (time: number) => {
  if (time <= YEAR_MARKS[0][0]) return YEAR_MARKS[0][1];

  for (let index = 1; index < YEAR_MARKS.length; index += 1) {
    const [end, endYear] = YEAR_MARKS[index];

    if (time <= end) {
      const [start, startYear] = YEAR_MARKS[index - 1];
      return Math.round(
        startYear + ((endYear - startYear) * (time - start)) / (end - start)
      );
    }
  }

  return YEAR_MARKS[YEAR_MARKS.length - 1][1];
};

type Phase = "ready" | "running" | "ended" | "lost";

type TrackObject = {
  el: HTMLElement;
  at: number;
  width: number;
  height: number;
  kind: "hurdle" | "star";
  done: boolean;
};

/**
 * The Life/Career side-scrolling game. A single rAF simulation
 * drives the run (jump physics, object positions, collisions, the
 * year readout and the environment ramps); React only swaps the
 * ready/running/ended stage state. Controls: Space or ArrowUp to
 * jump, click/tap on the stage to jump — one action, nothing else.
 */
export default function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const retryRef = useRef<HTMLButtonElement>(null);
  const againRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<Phase>("ready");

  useScrollReveal(rootRef);

  useEffect(() => {
    const stage = stageRef.current;
    const player = playerRef.current;
    const yearEl = yearRef.current;
    if (!stage || !player || !yearEl) return;

    const retryBtn = retryRef.current;
    const againBtn = againRef.current;

    const clouds = stage.querySelector<HTMLElement>(".game-clouds");
    const hills = stage.querySelector<HTMLElement>(".game-hills");

    const objects: TrackObject[] = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-obj]")
    ).map((el) => ({
      el,
      at: Number(el.dataset.at),
      width: Number(el.dataset.width),
      height: Number(el.dataset.height),
      kind: el.dataset.kind === "hurdle" ? "hurdle" : "star",
      done: false,
    }));

    let current: Phase = "ready";
    let stageWidth = 0;
    let charX = 72;
    let speed = 300;
    let time = 0;
    let jumpHeight = 0;
    let velocity = 0;
    let airborne = false;
    let shownYear = 2006;
    let inView = false;
    let raf = 0;
    let lastFrame = 0;
    let groundOff = 0;
    let cloudOff = 0;
    let hillOff = 0;
    let bonkTimer = 0;
    let wobbleTimer = 0;

    const measure = () => {
      stageWidth = stage.clientWidth;
      charX = Math.max(64, stageWidth * 0.16);
      speed = Math.min(stageWidth * 0.5, 560);
      stage.style.setProperty("--char-x", `${charX}px`);
    };

    const end = () => {
      current = "ended";
      setPhase("ended");

      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    /* one collision = the loss state, right where it happened */
    const lose = () => {
      current = "lost";
      setPhase("lost");

      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const step = (dt: number) => {
      /* jump physics */
      if (airborne) {
        velocity -= GRAVITY * dt;
        jumpHeight += velocity * dt;

        if (jumpHeight <= 0) {
          jumpHeight = 0;
          velocity = 0;
          airborne = false;
          player.classList.remove("jumping");
        }

        player.style.transform = `translate3d(0, ${(-jumpHeight).toFixed(1)}px, 0)`;
      }

      /* timeline year readout */
      const year = yearAt(time);
      if (year !== shownYear) {
        shownYear = year;
        yearEl.textContent = String(year);
      }

      /* environment ramps: day -> dusk -> night -> darkness */
      stage.style.setProperty("--dusk", ramp(time, 12, 19).toFixed(3));
      stage.style.setProperty("--night", ramp(time, 20, 26).toFixed(3));
      stage.style.setProperty("--sun", (1 - ramp(time, 14, 19)).toFixed(3));
      stage.style.setProperty("--cloud", (1 - ramp(time, 13.5, 18.5)).toFixed(3));
      stage.style.setProperty("--moon", ramp(time, 21, 25.5).toFixed(3));
      stage.style.setProperty("--spark", ramp(time, 20, 24.5).toFixed(3));
      stage.style.setProperty(
        "--dark",
        ramp(time, DARK_START, DARK_FULL).toFixed(3)
      );

      /* parallax scroll: track dashes, clouds, hills */
      groundOff += speed * dt;
      cloudOff += speed * 0.12 * dt;
      hillOff += speed * 0.35 * dt;
      stage.style.setProperty(
        "--gx",
        `${(-(groundOff % DASH_PERIOD)).toFixed(1)}px`
      );
      if (clouds) {
        clouds.style.transform = `translate3d(${(-(cloudOff % stageWidth)).toFixed(1)}px, 0, 0)`;
      }
      if (hills) {
        hills.style.transform = `translate3d(${(-(hillOff % stageWidth)).toFixed(1)}px, 0, 0)`;
      }

      /* object positions + collisions */
      const playerLeft = charX + 7;
      const playerRight = charX + 37;

      for (const object of objects) {
        const x = charX + (object.at - time) * speed;
        object.el.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;

        if (object.done) continue;

        if (object.kind === "hurdle") {
          const overlapsX =
            x + object.width - 3 > playerLeft && x + 3 < playerRight;

          /* fair collision: inset boxes on both sides, so a well-timed
             jump always clears and running into it never does */
          if (overlapsX && jumpHeight + 3 < object.height) {
            object.done = true;
            player.classList.add("bonk");

            const hurdleArt = object.el.querySelector("svg");
            hurdleArt?.classList.add("wobble");

            bonkTimer = window.setTimeout(
              () => player.classList.remove("bonk"),
              460
            );
            wobbleTimer = window.setTimeout(
              () => hurdleArt?.classList.remove("wobble"),
              520
            );

            lose();
            break;
          }
        } else {
          const overlapsX = x + 26 > playerLeft && x + 2 < playerRight;
          const overlapsY =
            object.height + 28 > jumpHeight + 3 &&
            object.height < jumpHeight + 56;

          if (overlapsX && overlapsY) {
            object.done = true;
            object.el.classList.add("got");
          }
        }
      }

      if (current === "running" && time >= END_AT) end();
    };

    const loop = (now: number) => {
      raf = 0;
      if (current !== "running" || !inView) return;

      if (!lastFrame) lastFrame = now;
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;
      time += dt;

      step(dt);

      if (current === "running" && inView) raf = requestAnimationFrame(loop);
    };

    const ensureLoop = () => {
      if (!raf && current === "running" && inView) {
        lastFrame = 0;
        raf = requestAnimationFrame(loop);
      }
    };

    /* Try Again / Play Again: one full reset, then the journey
       starts over from the very beginning of the timeline. */
    const reset = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      window.clearTimeout(bonkTimer);
      window.clearTimeout(wobbleTimer);

      time = 0;
      lastFrame = 0;
      jumpHeight = 0;
      velocity = 0;
      airborne = false;
      shownYear = 2006;
      groundOff = 0;
      cloudOff = 0;
      hillOff = 0;

      player.classList.remove("jumping", "bonk");
      player.style.transform = "translate3d(0, 0px, 0)";
      yearEl.textContent = "2006";

      /* back to a clear day at the start of the 2006 -> 2026 run */
      stage.style.setProperty("--dusk", "0");
      stage.style.setProperty("--night", "0");
      stage.style.setProperty("--sun", "1");
      stage.style.setProperty("--cloud", "1");
      stage.style.setProperty("--moon", "0");
      stage.style.setProperty("--spark", "0");
      stage.style.setProperty("--dark", "0");
      stage.style.setProperty("--gx", "0px");
      if (clouds) clouds.style.transform = "translate3d(0, 0, 0)";
      if (hills) hills.style.transform = "translate3d(0, 0, 0)";

      for (const object of objects) {
        object.done = false;
        object.el.classList.remove("got");
        object.el.querySelector("svg")?.classList.remove("wobble");
        object.el.style.removeProperty("transform");
      }

      current = "running";
      setPhase("running");
      ensureLoop();
    };

    const jump = () => {
      if (current !== "running" || airborne) return;

      airborne = true;
      velocity = JUMP_VELOCITY;
      player.classList.add("jumping");
    };

    /* one action: start the run (first input) and/or jump */
    const act = () => {
      if (current === "ended" || current === "lost") return;

      if (current === "ready") {
        current = "running";
        setPhase("running");
        time = 0;
        ensureLoop();
      }

      jump();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== " " && event.key !== "ArrowUp") return;
      if (!inView || current === "ended" || current === "lost") return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      /* keep the page from scrolling while the game is on screen */
      event.preventDefault();
      if (event.repeat) return;

      act();
    };

    const onStageClick = (event: MouseEvent) => {
      /* the retry / play-again buttons handle themselves */
      const target = event.target as HTMLElement | null;
      if (target?.closest("button")) return;

      act();
    };

    const onResetClick = () => reset();
    const onResize = () => measure();

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        ensureLoop();
      },
      { threshold: 0.35 }
    );

    measure();
    observer.observe(stage);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    stage.addEventListener("click", onStageClick);
    retryBtn?.addEventListener("click", onResetClick);
    againBtn?.addEventListener("click", onResetClick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(bonkTimer);
      window.clearTimeout(wobbleTimer);

      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("click", onStageClick);
      retryBtn?.removeEventListener("click", onResetClick);
      againBtn?.removeEventListener("click", onResetClick);
    };
  }, []);

  return (
    <section
      id="skills"
      className="section skills"
      ref={rootRef}
      aria-label="Skills Game"
    >
      <div className="section-head reveal">
        <span className="section-rule" />
      </div>

      <div className="game-shell reveal" data-delay="0.12" data-phase={phase}>
        <div className={`game-stage ${phase}`} ref={stageRef}>
          {/* environment layers — visual only */}
          <div className="game-sky" aria-hidden="true" />
          <div className="game-dusk" aria-hidden="true" />
          <div className="game-night" aria-hidden="true" />

          <div className="game-sun" aria-hidden="true">
            <svg viewBox="0 0 64 64">
              <path
                d="M32 4v8M32 52v8M4 32h8M52 32h8M12 12l5.5 5.5M46.5 46.5L52 52M52 12l-5.5 5.5M17.5 46.5L12 52"
                stroke="#1a2440"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="32" cy="32" r="17" fill="#f9f7ee" stroke="#1a2440" strokeWidth="2.4" />
            </svg>
          </div>

          <div className="game-moon" aria-hidden="true">
            <svg viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="18" fill="#f9f7ee" stroke="#1a2440" strokeWidth="2.4" />
              <circle cx="26" cy="27" r="4" fill="#1a2440" opacity="0.16" />
              <circle cx="37" cy="38" r="5.5" fill="#1a2440" opacity="0.13" />
              <circle cx="38" cy="24" r="2.5" fill="#1a2440" opacity="0.13" />
            </svg>
          </div>

          {/* decorative night sparkles — scenery, never game objects */}
          <div className="game-sparks" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>

          <div className="game-clouds" aria-hidden="true">
            {[0, 1].map((tile) => (
              <div className="game-tile" key={tile}>
                <svg className="game-cloud game-cloud--a" viewBox="0 0 96 40">
                  <path d={CLOUD_PATH} fill="#f9f7ee" stroke="#1a2440" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                <svg className="game-cloud game-cloud--b" viewBox="0 0 96 40">
                  <path d={CLOUD_PATH} fill="#f9f7ee" stroke="#1a2440" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>

          <div className="game-hills" aria-hidden="true">
            {[0, 1].map((tile) => (
              <div className="game-tile" key={tile}>
                <svg className="game-hill" viewBox="0 0 1000 64" preserveAspectRatio="none">
                  <path d={HILL_PATH} fill="#2a5ca8" fillOpacity="0.16" />
                </svg>
              </div>
            ))}
          </div>

          <div className="game-ground" aria-hidden="true">
            <div className="game-track" />
          </div>

          {/* the five achievements */}
          {STARS.map((star) => (
            <div
              className="game-obj game-star"
              key={star.label}
              data-obj=""
              data-kind="star"
              data-at={star.at}
              data-width="28"
              data-height={star.height}
              style={{ bottom: `calc(22% + ${star.height}px)` }}
            >
              <span className="game-tag game-tag--star">{star.label}</span>
              <svg className="star-svg" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <path
                  d="M14 1L17.3 9.5L26.4 10L19.3 15.7L21.6 24.5L14 19.6L6.4 24.5L8.7 15.7L1.6 10L10.7 9.5Z"
                  fill="#d8006f"
                  stroke="#1a2440"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}

          {/* the three hurdles */}
          {HURDLES.map((hurdle) => (
            <div
              className="game-obj game-hurdle"
              key={hurdle.label}
              data-obj=""
              data-kind="hurdle"
              data-at={hurdle.at}
              data-width={hurdle.width}
              data-height={hurdle.height}
              style={{ width: `${hurdle.width}px` }}
            >
              <span className="game-tag game-tag--hurdle">{hurdle.label}</span>
              {hurdle.art}
            </div>
          ))}

          {/* the runner */}
          <div className="game-player" ref={playerRef} aria-hidden="true">
            <svg className="runner-svg" width="44" height="62" viewBox="0 0 44 62" aria-hidden="true">
              <g className="runner-leg runner-leg--back" opacity="0.55">
                <path d="M20 39L17 57" />
                <ellipse cx="15.5" cy="59" rx="4.5" ry="3" fill="#d8006f" stroke="#1a2440" strokeWidth="1.6" />
              </g>
              <g className="runner-leg runner-leg--front">
                <path d="M24 39L27 57" />
                <ellipse cx="28.5" cy="59" rx="4.5" ry="3" fill="#d8006f" stroke="#1a2440" strokeWidth="1.6" />
              </g>
              <rect x="13" y="23" width="20" height="20" rx="6" fill="#2a5ca8" stroke="#1a2440" strokeWidth="2" />
              <g className="runner-arm">
                <path d="M20 26L15 36" />
              </g>
              <circle cx="13.5" cy="13" r="5" fill="#1a2440" />
              <circle cx="26" cy="14" r="9.5" fill="#f9f7ee" stroke="#1a2440" strokeWidth="2" />
              <path d="M17 11.5C19.5 3.5 27.5 4.5 35.5 12.5 31 7 24 7.5 17 11.5Z" fill="#1a2440" />
              <circle cx="31" cy="15.5" r="1.7" fill="#1a2440" />
            </svg>
          </div>

          {/* timeline year, 2006 -> 2026 */}
          <div className="game-year">
            <span ref={yearRef}>2006</span>
          </div>

          {/* the run into darkness */}
          <div className="game-dark" aria-hidden="true" />

          <p className="game-prompt">Press space or tap to run</p>

          {/* successful ending — the title stays the focus, with a
              quiet Play Again tucked into the bottom-right */}
          <div className="game-final">
            <p className="game-ending">TO BE CONTINUED...</p>
            <button type="button" className="game-again" ref={againRef}>
              Play Again
            </button>
          </div>

          {/* loss state — one collision, one simple retry */}
          <div className="game-lost">
            <p className="game-oops">OOPS!</p>
            <button type="button" className="game-retry" ref={retryRef}>
              Oops! Try Again
            </button>
          </div>
        </div>

        {/* the journey in full — readable only after a successful run */}
        <div className="game-overview">
          <div className="game-overview-col game-overview-col--overcame">
            <h3>THINGS I OVERCAME</h3>
            <ul>
              <li>ICSE Board Exams — 2022</li>
              <li>12th Board Exams — 2024</li>
              <li>Hostel Life — 2024–present</li>
            </ul>
          </div>
          <div className="game-overview-col game-overview-col--achieved">
            <h3>THINGS I ACHIEVED</h3>
            <ul>
              <li>Learnt to Walk — 2008</li>
              <li>Top 10 ICSE Rank — 2022</li>
              <li>100/100 in Mathematics — 2024</li>
              <li>Became Student Placement Coordinator (SPC) — 2024</li>
              <li>Selected for Samsung Innovation Campus — 2025</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
