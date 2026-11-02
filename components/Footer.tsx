"use client";

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

    </footer>
  );
}
