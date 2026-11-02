"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

import { sendAnonymousMessage } from "@/lib/messages";

/* Contact details from the provided Recruiter Mode material —
   the Email row renders now that a real address is supplied. */
const EMAIL = "lakshmi090506@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/lakshmi-s-656435360/";
const GITHUB = "https://github.com/thelakshmi";

type Status = "idle" | "sending" | "sent" | "failed";

/* short, professional send states for the feedback box */
const STATUS_TEXT: Record<Status, string> = {
  idle: "",
  sending: "Sending…",
  sent: "Sent — thank you for the feedback.",
  failed: "Couldn't send. Please try again.",
};

/**
 * Recruiter Mode - Contact: the three specified areas - Feedback,
 * Collaboration, Contact Information - as plain rows in the recruiter
 * layout (heading left, content right). The Feedback area is a small
 * chatbox: one message field and one Send button that posts to the
 * same anonymous backend as Player Contact (insert only, anon key
 * only - never any service-role credentials). Collaboration and
 * Contact Information keep ordinary link interactions: no Player
 * Mode mechanics, illustrations, moving buttons or playful elements.
 */
export default function RecruiterContact() {
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(event.target.value);
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const text = feedback.trim();
    if (!text || status === "sending") return;

    setStatus("sending");

    try {
      await sendAnonymousMessage(text);
      setFeedback("");
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section id="contact" className="rc-contact" aria-label="Contact">
      <h2 className="rc-section-title">Contact</h2>

      <div className="rc-contact-grid">
        <div className="rc-contact-area">
          <h2 className="rc-contact-heading">Feedback</h2>

          <div className="rc-feedback">
            <ul className="rc-feedback-list">
              <li>Advice on how I can improve my existing projects</li>
              <li>Advice on how I can improve the website</li>
            </ul>

            <form
              className="rc-feedback-form"
              onSubmit={handleSubmit}
              aria-busy={status === "sending"}
            >
              <textarea
                id="recruiter-feedback"
                className="rc-feedback-input"
                rows={4}
                maxLength={500}
                value={feedback}
                aria-label="Feedback message"
                onChange={handleChange}
              />

              <div className="rc-feedback-foot">
                <button
                  type="submit"
                  className="rc-feedback-send"
                  disabled={!feedback.trim() || status === "sending"}
                >
                  Send
                </button>

                <p
                  className={`rc-feedback-status${
                    status === "idle" ? "" : ` rc-feedback-status--${status}`
                  }`}
                  role="status"
                >
                  {STATUS_TEXT[status]}
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="rc-contact-area">
          <h2 className="rc-contact-heading">Collaboration</h2>

          <div className="rc-contact-copy">
            <p>Interested in collaborating with me to build something new?</p>
            <p>I am open to collaboration and interested in building new things with others.</p>
          </div>
        </div>

        <div className="rc-contact-area">
          <h2 className="rc-contact-heading">Contact Information</h2>

          <div className="rc-contact-details">
            {EMAIL ? (
              <div className="rc-contact-row">
                <span className="rc-contact-label">Email</span>
                <a className="rc-contact-link" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </div>
            ) : null}

            <div className="rc-contact-row">
              <span className="rc-contact-label">LinkedIn</span>
              <a
                className="rc-contact-link"
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
              >
                {LINKEDIN}
              </a>
            </div>

            <div className="rc-contact-row">
              <span className="rc-contact-label">GitHub</span>
              <a
                className="rc-contact-link"
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
              >
                {GITHUB}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
