export type Role = {
  start: string;
  end: string;
  company: string;
  title: string;
  description: string[];
};

export const experience: Role[] = [
  {
    start: "Aug 2026",
    end: "Present",
    company: "Clarity HealthCare",
    title: "Intern",
    description: [
      "Sole developer of the clinical report from audio system: live transcription with Gemini on Vertex AI, the physician review flow, deterministic PDF reports, logging and the frontend.",
      "Python, FastAPI and MongoDB Atlas on the backend, packaged with Docker.",
    ],
  },
];

export type Education = {
  institution: string;
  program: string;
  start: string;
  end: string;
};

export const education: Education[] = [
  { institution: "FIAP", program: "Software Engineering", start: "2025", end: "2028" },
];
