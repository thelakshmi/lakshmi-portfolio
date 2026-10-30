"use client";

import Image from "next/image";

const PHOTO = "/images/lakshmi.jpg";

/* The exact introduction from PORTFOLIO_SPEC.md — Recruiter Mode > About.
   Byte-for-byte as specified: no rewording, no extra paragraphs. */
const INTRODUCTION =
  "My name is Lakshmi S, a 3rd-year Computer Science Engineering student from India. I enjoy building practical web applications and experimenting with AI/ML. I am driven by curiosity and a commitment to building impactful software solutions. I usually spend my free time on side projects that earn me new skills. I am always working to better myself as an engineer and person.";

/**
 * Recruiter Mode · About — a circular photograph beside the exact
 * introduction. Nothing else: no badges, stickers, illustrations,
 * skill bars or social links (those are later sections or not
 * part of Recruiter About at all).
 */
export default function RecruiterAbout() {
  return (
    <section id="about" className="rc-about" aria-label="About">
      <h2 className="rc-section-title">About</h2>

      {/* two-part layout: circular photograph | introduction */}
      <div className="rc-about-photo">
        <Image
          src={PHOTO}
          alt="Lakshmi"
          fill
          sizes="(max-width: 760px) 64vw, 236px"
        />
      </div>

      <div className="rc-about-intro">
        <p>{INTRODUCTION}</p>
      </div>
    </section>
  );
}
