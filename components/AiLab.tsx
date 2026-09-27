"use client";

import { useEffect, useRef, useState } from "react";

import { lab } from "@/lib/content";
import { prefersReducedMotion, useScrollReveal } from "@/lib/useScrollReveal";

interface NetNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Signal {
  from: number;
  to: number;
  t: number;
  speed: number;
}

type Message = { role: "you" | "bot"; text: string };

/* ------------------------------------------------------------------
   A drifting neural-ish graph that shies away from your cursor.
------------------------------------------------------------------- */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };
    let nodes: NetNode[] = [];
    let signals: Signal[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;

    /* pull the live palette so the graph matches the active theme */
    const palette = { edge: "#55617a", signal: "#d8006f", node: "#2a5ca8" };

    const readPalette = () => {
      const styles = getComputedStyle(document.documentElement);
      palette.edge = styles.getPropertyValue("--muted").trim() || palette.edge;
      palette.signal =
        styles.getPropertyValue("--yellow").trim() || palette.signal;
      palette.node =
        styles.getPropertyValue("--accent-text").trim() || palette.node;
    };

    const seed = () => {
      const count = width < 420 ? 16 : 26;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 2.4 + 1.6,
      }));

      signals = Array.from({ length: 5 }, () => ({
        from: Math.floor(Math.random() * count),
        to: Math.floor(Math.random() * count),
        t: Math.random(),
        speed: Math.random() * 0.006 + 0.003,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readPalette();
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        const dx = node.x - pointer.x;
        const dy = node.y - pointer.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 96 && dist > 0.01) {
          const push = (96 - dist) / 96;
          node.vx += (dx / dist) * push * 0.45;
          node.vy += (dy / dist) * push * 0.45;
        }

        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.985;
        node.vy *= 0.985;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      }

      /* edges */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);

          if (dist < 140) {
            ctx.globalAlpha = (1 - dist / 140) * 0.6;
            ctx.strokeStyle = palette.edge;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      /* travelling signals */
      for (const signal of signals) {
        const a = nodes[signal.from];
        const b = nodes[signal.to];

        signal.t += signal.speed;
        if (signal.t >= 1 || !a || !b) {
          signal.from = Math.floor(Math.random() * nodes.length);
          signal.to = Math.floor(Math.random() * nodes.length);
          signal.t = 0;
          continue;
        }

        const x = a.x + (b.x - a.x) * signal.t;
        const y = a.y + (b.y - a.y) * signal.t;

        ctx.fillStyle = palette.signal;
        ctx.beginPath();
        ctx.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      /* nodes */
      for (const node of nodes) {
        ctx.fillStyle = palette.node;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();

    if (prefersReducedMotion()) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="lab-canvas" aria-hidden="true" />;
}

/* ---------------------------------------------------------------- */

export default function AiLab() {
  const rootRef = useRef<HTMLElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const fallbackRef = useRef(0);

  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [typing, setTyping] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Ask me anything. I run locally on this page — no cloud, no telemetry, no vibes-based tracking.",
    },
  ]);

  useScrollReveal(rootRef);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const feed = feedRef.current;
    if (feed) feed.scrollTop = feed.scrollHeight;
  }, [messages, typing]);

  const answerFor = (question: string) => {
    const needle = question.toLowerCase();
    const match = lab.exchanges.find((item) =>
      item.q
        .toLowerCase()
        .split(" ")
        .some((word) => word.length > 3 && needle.includes(word))
    );

    if (match) return match.a;

    const fallback = lab.fallbacks[fallbackRef.current % lab.fallbacks.length];
    fallbackRef.current += 1;
    return fallback;
  };

  const send = (question: string) => {
    const clean = question.trim();
    if (!clean || thinking) return;

    setMessages((current) => [...current, { role: "you", text: clean }]);
    setInput("");
    setThinking(true);

    const answer = answerFor(clean);
    let cursor = 0;

    window.setTimeout(() => {
      setThinking(false);
      setTyping("");

      timerRef.current = window.setInterval(() => {
        cursor += 2;
        setTyping(answer.slice(0, cursor));

        if (cursor >= answer.length) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          timerRef.current = null;
          setTyping("");
          setMessages((current) => [...current, { role: "bot", text: answer }]);
        }
      }, 16);
    }, 520);
  };

  return (
    <section id="ai" className="section lab" ref={rootRef}>

      <div className="section-head reveal">
        <span className="section-rule" />
      </div>

      <div className="section-heading-row">
        <h2 className="section-title reveal">
          <span className="title-line">{lab.title}</span>
        </h2>
        <p className="section-blurb reveal" data-delay="0.1">
          {lab.blurb}
        </p>
      </div>

      <div className="lab-grid">

        <div className="lab-panel lab-graph reveal">
          <div className="lab-panel-head">
            <span>inference graph</span>
            <span className="lab-live">● live</span>
          </div>
          <NeuralCanvas />
          <div className="lab-models">
            {lab.models.map((model) => (
              <span key={model}>{model}</span>
            ))}
          </div>
        </div>

        <div className="lab-panel lab-chat reveal" data-delay="0.12">
          <div className="lab-panel-head">
            <span>lakshmi-mini :: local</span>
            <span className="lab-live">● online</span>
          </div>

          <div className="lab-feed" ref={feedRef}>
            {messages.map((message, index) => (
              <p
                key={`${message.role}-${index}`}
                className={`bubble ${message.role === "you" ? "from-you" : "from-bot"}`}
              >
                {message.text}
              </p>
            ))}

            {thinking && (
              <p className="bubble from-bot thinking">
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </p>
            )}

            {typing && <p className="bubble from-bot">{typing}<i className="caret" /></p>}
          </div>

          <div className="lab-chips">
            {lab.exchanges.slice(0, 3).map((item) => (
              <button key={item.q} onClick={() => send(item.q)}>
                {item.q}
              </button>
            ))}
          </div>

          <form
            className="lab-input"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <span className="lab-prompt">&gt;</span>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="ask the tiny model…"
              aria-label="Ask the local model a question"
            />
            <button type="submit" disabled={thinking || !input.trim()}>
              run
            </button>
          </form>
        </div>

      </div>

    </section>
  );
}
