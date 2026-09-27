"use client";

import { profile } from "@/lib/content";

export default function Footer() {
  const marquee = [
    "available for work",
    "available for work",
    "available for work",
    "available for work",
  ];

  return (
    <footer className="footer">

      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-marquee-track">
          {marquee.map((text, index) => (
            <span key={index}>
              {text} <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <div className="footer-row">
        <div className="logo">
          lakshmi<span>.</span>
        </div>

        <a className="footer-top" href="#home">
          back to the top ↑
        </a>
      </div>

      <div className="footer-row footer-sub">
        <span>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </span>
        <span className="footer-hint">
          built at 2am · powered by curiosity
        </span>
      </div>

    </footer>
  );
}
