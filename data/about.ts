export const about = {
  title: ["Software that holds up", "under scrutiny."],
  paragraphs: [
    "I'm a Software Engineering student at FIAP in São Paulo and an intern at Clarity HealthCare, where I work on clinical software, including a pipeline that turns a physician's dictation into a structured, reviewable report.",
    "Most of what I build sits on the backend: Python and FastAPI services, data validation, and the failure modes that only show up once real users and real data arrive.",
    "On the side I study defensive security. I build tools like a phishing detector and a DLL injector to understand what an attack looks like from the defender's side.",
  ],
  facts: [
    { label: "Currently", value: "Intern, Clarity HealthCare" },
    { label: "Focus", value: "Backend / Healthcare / Security" },
    { label: "Studying", value: "Software Engineering, FIAP" },
    { label: "Based in", value: "São Paulo, Brazil" },
  ],
} as const;
