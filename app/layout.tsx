import type { Metadata } from "next";
import { DM_Sans, Fredoka, Space_Grotesk } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import "./sections.css";
import "./resume.css";
import "./recruiter.css";

/* Player Mode · subheadings + body */
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/* Recruiter Mode · headings (Semibold / Bold) */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* Recruiter Mode · body (Regular / Medium) */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Lakshmi — developer, AI tinkerer, builder of small delights",
  description:
    "Portfolio of Lakshmi — a full-stack developer and AI tinkerer who builds things with code, curiosity and a little bit of chaos.",
  keywords: [
    "portfolio",
    "full-stack developer",
    "AI",
    "machine learning",
    "React",
    "Next.js",
    "Lakshmi",
  ],
  authors: [{ name: "Lakshmi" }],
  openGraph: {
    title: "Lakshmi — developer & AI tinkerer",
    description:
      "I build things with code, curiosity and a little bit of chaos.",
    type: "website",
  },
};

/* the active mode lands on <html data-mode> before first paint, so the
   matching font system is already applied and nothing flashes.
   First-time visitors land in Recruiter Mode; a stored choice wins. */
const modeInit = `(function(){try{var m=localStorage.getItem("lakshmi-mode");document.documentElement.dataset.mode=m==="player"?"player":"recruiter"}catch(e){document.documentElement.dataset.mode="recruiter"}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${spaceGrotesk.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="mode-init" strategy="beforeInteractive">
          {modeInit}
        </Script>
        {children}
      </body>
    </html>
  );
}
