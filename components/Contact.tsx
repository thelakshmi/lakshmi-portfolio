"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { contact } from "@/lib/content";
import { burst } from "@/lib/confetti";
import { sendAnonymousMessage } from "@/lib/messages";
import { useScrollReveal } from "@/lib/useScrollReveal";

/* The actual profiles from the specification.
   Instagram is deliberately absent — no Instagram URL exists in the
   project or specification yet, and links must never be invented. */
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lakshmi-s-656435360/" },
  { label: "GitHub", href: "https://github.com/thelakshmi" },
];

type Status = "idle" | "sending" | "sent" | "failed";

const STATUS_TEXT: Record<Status, string> = {
  idle: "",
  sending: "sending…",
  sent: "sent! ✦ thank you",
  failed: "couldn't send — try again?",
};

/* how close the pointer gets before NO runs away */
const DODGE_RADIUS = 92;
/* NO never lands this close to the YES button either */
const YES_CLEARANCE = 100;

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [impressed, setImpressed] = useState(false);

  const fireTimers = useRef<number[]>([]);

  useScrollReveal(rootRef);

  /* clear any pending fireworks if the page unmounts mid-burst */
  useEffect(() => {
    const timers = fireTimers.current;
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  /* --------------------------------------------------------------
     The NO button that refuses to be clicked: every time the
     pointer gets close, it relocates somewhere else inside its
     zone (never on top of YES). Clicking it does nothing at all.
  -------------------------------------------------------------- */
  useEffect(() => {
    const root = rootRef.current;
    const zone = zoneRef.current;
    const yes = yesRef.current;
    const no = noRef.current;
    if (!root || !zone || !yes || !no) return;

    let pointerX = -1;
    let pointerY = -1;

    const dodge = (atX?: number, atY?: number) => {
      if (atX !== undefined) pointerX = atX;
      if (atY !== undefined) pointerY = atY;

      const zoneBox = zone.getBoundingClientRect();
      const noBox = no.getBoundingClientRect();
      const yesBox = yes.getBoundingClientRect();

      const minX = 6;
      const minY = 6;
      const maxX = Math.max(minX, zoneBox.width - noBox.width - 6);
      const maxY = Math.max(minY, zoneBox.height - noBox.height - 6);

      const yesCx = yesBox.left + yesBox.width / 2;
      const yesCy = yesBox.top + yesBox.height / 2;

      const fits = (x: number, y: number) => {
        const cx = zoneBox.left + x + noBox.width / 2;
        const cy = zoneBox.top + y + noBox.height / 2;

        const fromYes = Math.hypot(cx - yesCx, cy - yesCy);
        if (fromYes < YES_CLEARANCE) return false;

        if (pointerX < 0) return true;
        return Math.hypot(cx - pointerX, cy - pointerY) >= DODGE_RADIUS;
      };

      let placed = false;

      for (let tries = 0; tries < 24 && !placed; tries += 1) {
        const x = minX + Math.random() * (maxX - minX);
        const y = minY + Math.random() * (maxY - minY);

        if (fits(x, y)) {
          no.style.left = `${x}px`;
          no.style.top = `${y}px`;
          placed = true;
        }
      }

      if (!placed) {
        /* tiny zone: fall back to whichever corner is furthest from YES and the pointer */
        const corners: Array<[number, number]> = [
          [minX, minY],
          [maxX, minY],
          [minX, maxY],
          [maxX, maxY],
        ];
        let best = corners[0];
        let bestScore = -1;

        for (const corner of corners) {
          const cx = zoneBox.left + corner[0] + noBox.width / 2;
          const cy = zoneBox.top + corner[1] + noBox.height / 2;
          const fromYes = Math.hypot(cx - yesCx, cy - yesCy);
          const fromPointer =
            pointerX < 0
              ? 0
              : Math.hypot(cx - pointerX, cy - pointerY);
          const value = Math.min(fromYes, fromPointer);

          if (value > bestScore) {
            bestScore = value;
            best = corner;
          }
        }

        no.style.left = `${best[0]}px`;
        no.style.top = `${best[1]}px`;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const box = no.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const distance = Math.hypot(event.clientX - cx, event.clientY - cy);

      if (distance < DODGE_RADIUS) {
        dodge(event.clientX, event.clientY);
      } else {
        pointerX = event.clientX;
        pointerY = event.clientY;
      }
    };

    const onPointerDown = (event: PointerEvent) => dodge(event.clientX, event.clientY);
    const onClick = (event: Event) => {
      event.preventDefault();
      dodge();
    };

    root.addEventListener("pointermove", onPointerMove);
    no.addEventListener("pointerdown", onPointerDown);
    no.addEventListener("click", onClick);

    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      no.removeEventListener("pointerdown", onPointerDown);
      no.removeEventListener("click", onClick);
    };
  }, []);

  /* --------------------------------------------------------------
     YES -> crackers across the screen using the existing confetti
     utility (spans only, fixed position — layout is never altered).
  -------------------------------------------------------------- */
  const celebrate = () => {
    setImpressed(true);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const waves: Array<{ at: number; x: number; y: number }> = [
      { at: 0, x: 0.5, y: 0.42 },
      { at: 150, x: 0.2, y: 0.34 },
      { at: 310, x: 0.8, y: 0.3 },
      { at: 470, x: 0.34, y: 0.6 },
      { at: 630, x: 0.66, y: 0.54 },
    ];

    waves.forEach((wave, index) => {
      const spawn = () => burst(width * wave.x, height * wave.y, index === 0 ? 70 : 44);

      if (wave.at === 0) {
        spawn();
      } else {
        fireTimers.current.push(window.setTimeout(spawn, wave.at));
      }
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    if (status !== "sending") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const text = message.trim();
    if (!text || status === "sending") return;

    setStatus("sending");

    try {
      await sendAnonymousMessage(text);
      setMessage("");
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section id="contact" className="section contact" ref={rootRef}>
      <div className="section-head reveal">
        <span className="section-rule" />
      </div>

      <h2 className="section-title contact-title reveal">Contact</h2>

      <p className="section-blurb reveal">{contact.blurb}</p>

      {/* small anonymous chat box — no name, no email, no account */}
      <form className="chatbox reveal" data-delay="0.08" onSubmit={handleSubmit} aria-busy={status === "sending"}>
        <label className="chatbox-head" htmlFor="contact-message">
          <span className="chatbox-avatar" aria-hidden="true" />
          anonymous message
        </label>

        <textarea
          id="contact-message"
          className="chatbox-input"
          rows={3}
          value={message}
          maxLength={500}
          placeholder="type something nice (or chaotic)…"
          onChange={handleChange}
        />

        <div className="chatbox-foot">
          <button type="submit" className="explore-button chatbox-send" disabled={!message.trim() || status === "sending"}>
            send
          </button>

          <p className={`chatbox-status${status === "idle" ? "" : ` chatbox-status--${status}`}`} role="status">
            {STATUS_TEXT[status]}
          </p>
        </div>
      </form>

      {/* the final question */}
      <div className="impress reveal" data-delay="0.12">
        <p className="impress-q">Are u impressed?</p>

        <div className="impress-zone" ref={zoneRef}>
          <button type="button" className="impress-yes" ref={yesRef} onClick={celebrate}>
            YES
          </button>

          <button type="button" className="impress-no" ref={noRef} tabIndex={-1}>
            NO
          </button>
        </div>

        {impressed && (
          <div className="impress-socials">
            {SOCIALS.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
