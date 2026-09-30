export type StackGroup = {
  index: string;
  label: string;
  items: string[];
};

// Only technologies that appear in real projects or coursework.
export const stack: StackGroup[] = [
  { index: "01", label: "Languages", items: ["Python", "TypeScript", "JavaScript", "C++", "Java"] },
  { index: "02", label: "Frameworks", items: ["FastAPI", "Flask", "React", "Next.js", "Tailwind CSS"] },
  { index: "03", label: "Cloud & infra", items: ["Docker", "Linux", "Git", "Google Cloud", "Vercel", "Nginx"] },
  { index: "04", label: "Data & AI", items: ["MongoDB", "PostgreSQL", "Redis", "Gemini / Vertex AI"] },
  { index: "05", label: "Security", items: ["Wireshark", "Nmap", "Burp Suite", "Scapy"] },
];
