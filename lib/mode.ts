"use client";

import { useSyncExternalStore } from "react";

/**
 * The two modes of the website: Player Mode and Recruiter Mode.
 *
 * The active mode lives on <html data-mode="player" | "recruiter">:
 * it is set before first paint by the inline script in app/layout.tsx,
 * it persists in localStorage, and the font system in
 * app/globals.css keys off it (--font-hero, --font-heading, --font-body).
 *
 * This is the plumbing the persistent mode switch will drive; the
 * switch itself and the mode pages are not built yet.
 */
export type Mode = "player" | "recruiter";

export const MODE_KEY = "lakshmi-mode";
export const MODE_EVENT = "mode:change";

export function getMode(): Mode {
  if (typeof document === "undefined") return "player";
  return (document.documentElement.dataset.mode as Mode) || "player";
}

export function applyMode(mode: Mode) {
  document.documentElement.dataset.mode = mode;

  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {
    /* storage blocked — the mode still applies for this session */
  }

  window.dispatchEvent(new CustomEvent<Mode>(MODE_EVENT, { detail: mode }));
}

/** Flips between Player Mode and Recruiter Mode. Nothing else. */
export function toggleMode() {
  applyMode(getMode() === "player" ? "recruiter" : "player");
}

export function subscribeMode(onChange: () => void) {
  window.addEventListener(MODE_EVENT, onChange);
  return () => window.removeEventListener(MODE_EVENT, onChange);
}

/** The current mode, always in sync with <html data-mode>. */
export function useMode(): Mode {
  return useSyncExternalStore(subscribeMode, getMode, () => "player" as Mode);
}
