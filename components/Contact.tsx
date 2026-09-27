"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { contact, profile } from "@/lib/content";
import { prefersReducedMotion, useScrollReveal } from "@/lib/useScrollReveal";

interface Frame {
  line: number;
  char: number;
  out: boolean;
}

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useScrollReveal(rootRef);

  /* pre-compute every frame of the terminal typing sequence */
  const script = useMemo<Frame[]>(() => {
    const frames: Frame[] = [{ line: 0, char: 0, out: false }];

    contact.terminal.forEach((line, index) => {
      for (let char = 1; char <= line.cmd.length; char++) {
        frames.push({ line: index, char, out: false });
      }
      frames.push({ line: index, char: line.cmd.length, out: true });

      for (let pause = 0; pause < 16; pause++) {
        frames.push({ line: index, char: line.cmd.length, out: true });
      }
    });

    return frames;
  }, []);

  /* kick things off once the terminal scrolls into view */
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    if (prefersReducedMotion()) {
      /* land on the finished script a tick later — never mid-render */
      const jump = window.setTimeout(() => setStep(script.length), 0);
      return () => window.clearTimeout(jump);
    }

    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= script.length) {
          window.clearInterval(id);
          return current;
        }
        return current + 1;
      });
    }, 26);

    return () => window.clearInterval(id);
  }, [started, script.length]);

  const frame = script[Math.min(step, script.length - 1)];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the address is visible right there anyway */
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("all three, please — yes, even the fun one");
      return;
    }

    setError("");
    setSent(true);

    const subject = encodeURIComponent(`Portfolio hello from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section contact" ref={rootRef}>

      <div className="section-head reveal">
        <span className="section-rule" />
      </div>

      <h2 className="section-title contact-title reveal">
        {contact.title.map((line, index) => (
          <span key={line} className="title-line" data-delay={index * 0.08}>
            {line}
          </span>
        ))}
      </h2>

      <div className="contact-grid">

        <div className="contact-left">

          <p className="section-blurb reveal">{contact.blurb}</p>

          <div className="terminal reveal" data-delay="0.1">
            <div className="terminal-bar">
              <span /><span /><span />
              <em>lakshmi — zsh</em>
            </div>

            <div className="terminal-body">
              {contact.terminal.map((line, index) => {
                if (index > frame.line) return null;

                const partial =
                  index === frame.line
                    ? line.cmd.slice(0, frame.char)
                    : line.cmd;
                const showOut = index < frame.line || frame.out;

                return (
                  <div className="term-line" key={line.cmd}>
                    <p>
                      <span className="term-dollar">$</span> {partial}
                      {index === frame.line && !showOut && (
                        <i className="caret" />
                      )}
                    </p>
                    {showOut && <p className="term-out">{line.out}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="contact-quick reveal" data-delay="0.16">
            <button className="copy-button" onClick={copyEmail}>
              {copied ? "copied ✓" : `copy ${profile.email}`}
            </button>

            <div className="social-row">
              {profile.socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                  <span>↗</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        <form className="contact-form reveal" data-delay="0.12" onSubmit={handleSubmit}>

          <label>
            <span>{contact.form.nameLabel}</span>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Ada Lovelace"
            />
          </label>

          <label>
            <span>{contact.form.emailLabel}</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@somewhere.nice"
            />
          </label>

          <label>
            <span>{contact.form.messageLabel}</span>
            <textarea
              rows={5}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              placeholder="We want to build a thing that nobody has built yet…"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="explore-button form-submit">
            {contact.form.submit}
          </button>

          <p className="form-hint">
            {sent ? "✦ your mail app should be waking up…" : contact.form.hint}
          </p>

        </form>

      </div>

    </section>
  );
}
