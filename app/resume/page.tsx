import type { Metadata } from "next";

import ResumeView from "@/components/ResumeView";

export const metadata: Metadata = {
  title: "Lakshmi — résumé · recruiter mode",
  description:
    "Online résumé of Lakshmi — full-stack developer and AI tinkerer: experience, selected work, skills and education.",
  robots: { index: true, follow: true },
};

export default function ResumePage() {
  return <ResumeView />;
}
