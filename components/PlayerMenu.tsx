"use client";

import { useEffect, useRef, useState } from "react";

import { subscribeMode, useMode } from "@/lib/mode";

/* the four section links each mode's menu must reach */
const MENU_PLAYER = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills Game" },
  { id: "contact", label: "Contact" },
];

const MENU_RECRUITER = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/**
 * The single circular hamburger button in the top-right corner —
 * the same button in Player Mode and Recruiter Mode. Its four
 * links always follow the current mode (Player: Skills Game,
 * Recruiter: Skills). It closes again on link click, outside
 * click or Escape. No other navigation lives here.
 */
export default function PlayerMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const recruiter = useMode() === "recruiter";
  const links = recruiter ? MENU_RECRUITER : MENU_PLAYER;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  /* a mode toggle always starts from a closed menu */
  useEffect(() => subscribeMode(() => setOpen(false)), []);

  return (
    <div className="player-menu" ref={rootRef}>
      <button
        type="button"
        className="menu-button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="menu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {open && (
        <nav className="menu-panel" aria-label="Sections">
          {links.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
