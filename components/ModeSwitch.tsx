"use client";

import { toggleMode, useMode } from "@/lib/mode";

/**
 * The persistent Recruiter/Player mode switch: a compact ON/OFF
 * toggle that flips <html data-mode> through lib/mode.ts. Its
 * label always names the active mode. This is a mode switch, not
 * a navigation button — it has no other purpose.
 */
export default function ModeSwitch() {
  const mode = useMode();
  const recruiter = mode === "recruiter";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={recruiter}
      aria-label={`Mode: ${mode}. Switch to ${recruiter ? "player" : "recruiter"} mode`}
      className={`mode-switch${recruiter ? " is-recruiter" : ""}`}
      onClick={toggleMode}
    >
      <span className="mode-switch-label">
        {recruiter ? "recruiter mode" : "player mode"}
      </span>

      <span className="mode-switch-track" aria-hidden="true">
        <span className="mode-switch-knob" />
      </span>
    </button>
  );
}
