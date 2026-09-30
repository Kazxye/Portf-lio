import type { StaticImageData } from "next/image";
import clinicalReportShot from "@/assets/projects/clinical-report.jpg";
import networkRadarShot from "@/assets/projects/network-radar.jpg";
import phishGuardShot from "@/assets/projects/phishguard.jpg";
import vaultKeeperShot from "@/assets/projects/vaultkeeper.jpg";

export type Project = {
  slug: string;
  name: string;
  summary: string;
  description: string[];
  sequence: string[];
  highlights: string[];
  year: string;
  role: string;
  stack: string[];
  type: string;
  href?: string;
  note?: string;
  /** Real screenshot of the running project. Omit rather than use anything illustrative. */
  image?: { src: StaticImageData; alt: string };
};

export const projects: Project[] = [
  {
    slug: "clinical-report-from-audio",
    sequence: ["PCM", "transcript", "physician review", "deterministic PDF"],
    highlights: ["PCM streaming over WebSocket; sessions persisted in MongoDB Atlas.", "Physician review before deterministic A4 PDF generation."],
    name: "Clinical report from audio",
    summary: "A physician dictates the appointment, reviews the extracted fields and gets the report as a PDF.",
    description: [
      "Built at Clarity HealthCare as the only developer on the project, end to end: audio capture, the Gemini integration, the review flow, report generation, logging and the frontend.",
      "The browser captures PCM audio with getUserMedia and streams it over a WebSocket to Gemini Live on Vertex AI, with Google Cloud Speech-to-Text as the alternative engine. A recognition vocabulary per clinical context helps with technical terms without correcting or completing speech, and sessions persist in MongoDB Atlas, so a reload restores the transcript saved so far.",
      "Gemini drafts the clinical review from the transcript and the physician confirms or corrects each field. The final report deliberately uses no LLM: it is rendered from deterministic templates per clinical workflow (general consultation, cardiac catheterization, angioplasty) and served as an A4 PDF. Sign-in is delegated to the TAMIS API, with refresh tokens in an HttpOnly cookie, encrypted with Fernet.",
      "Next, I designed a stricter review step: each extracted field validated on separate axes (values and units, negation and context, citations back to the transcript). It costs one more LLM call in exchange for faster reviews, fewer missed doses and allergies, and an audit trail for every correction.",
    ],
    year: "2026",
    role: "Sole developer, end to end",
    stack: ["Python", "FastAPI", "MongoDB Atlas", "Gemini Live (Vertex AI)", "Cloud Speech-to-Text", "ReportLab", "Docker"],
    type: "Healthcare",
    note: "Internal project at Clarity HealthCare, no public repository",
    image: {
      src: clinicalReportShot,
      alt: "Clinical report from audio: the recording step, with appointment type, recognition vocabulary and live transcript",
    },
  },
  {
    slug: "vaultkeeper",
    sequence: ["Argon2id", "HKDF", "AES-256-GCM"],
    highlights: ["Browser-side encryption; non-extractable key held in memory.", "Fresh 96-bit IV per entry; auto-lock after five idle minutes."],
    name: "VaultKeeper",
    summary: "Zero-knowledge password manager. The server only ever stores encrypted blobs.",
    description: [
      "Key derivation and encryption run in the browser: Argon2id (64 MB) produces a master key, HKDF splits it into a login key and an encryption key, and each vault entry is sealed with AES-256-GCM under a fresh 96-bit IV.",
      "The encryption key is a non-extractable Web Crypto key kept in memory only. Around it: Redis rate limiting, 15-minute JWTs with refresh rotation, HttpOnly SameSite cookies, auto-lock after five idle minutes, and a script that tests SQL injection, JWT forgery and token replay.",
    ],
    year: "2026",
    role: "Lead developer, team of two",
    stack: ["FastAPI", "PostgreSQL", "Redis", "React", "Web Crypto", "Docker"],
    type: "Security",
    href: "https://github.com/Kazxye/PasswordManager",
    image: { src: vaultKeeperShot, alt: "VaultKeeper landing page with its key derivation pipeline" },
  },
  {
    slug: "phishguard",
    sequence: ["six engines", "weighted risk score"],
    highlights: ["Six concurrent engines with asyncio.gather.", "Per-URL caching; weights redistributed when an optional engine is unavailable."],
    name: "PhishGuard",
    summary: "Phishing detection for Chrome: six engines, one weighted risk score.",
    description: [
      "A Manifest V3 extension sends each page to a FastAPI service that runs six engines concurrently with asyncio.gather: brand impersonation, VirusTotal, homograph detection, domain age, SSL certificate and form analysis.",
      "Results combine into a weighted score with combo multipliers, cached per URL, and come back as a colored badge. Weights are redistributed when an optional engine is unavailable.",
    ],
    year: "2025–26",
    role: "Solo project",
    stack: ["Python", "FastAPI", "asyncio", "React", "TypeScript", "VirusTotal API"],
    type: "Security",
    href: "https://github.com/Kazxye/PhishGuard",
    image: { src: phishGuardShot, alt: "PhishGuard Chrome extension popup before any page has been analyzed" },
  },
  {
    slug: "kazz-injector",
    sequence: ["ProcessAccess", "CreateRemoteThread", "ImageLoad"],
    highlights: ["Sysmon telemetry as a practical reference for writing detections.", "C++20, Win32 API and a DirectX 11 / Dear ImGui interface."],
    name: "Kazz Injector",
    summary: "Windows DLL injector built to study a technique defenders hunt for.",
    description: [
      "C++20 with a DirectX 11 and Dear ImGui interface: a live process list, drag-and-drop DLL loading and the classic OpenProcess, VirtualAllocEx, WriteProcessMemory and CreateRemoteThread chain into LoadLibraryA.",
      "Every call leaves telemetry, from Sysmon ProcessAccess and CreateRemoteThread events to ImageLoad, which makes it a practical reference for writing detections.",
    ],
    year: "2026",
    role: "Solo project",
    stack: ["C++20", "Win32 API", "DirectX 11", "Dear ImGui", "CMake"],
    type: "Systems / Security research",
    href: "https://github.com/Kazxye/Kazz-Injector",
  },
  {
    slug: "network-radar",
    sequence: ["ARP/ping", "discovered devices", "port checks"],
    highlights: ["MAC vendor resolution using the OUI database.", "Live updates streamed to React over WebSocket."],
    name: "Network Radar",
    summary: "Local network monitor with a live radar view.",
    description: [
      "Finds devices with a ping sweep and ARP scans, resolves vendors from MAC addresses using the OUI database, checks open ports and streams updates to a React radar view over WebSocket.",
    ],
    year: "2025",
    role: "Solo project",
    stack: ["Python", "FastAPI", "Scapy", "WebSocket", "React", "TypeScript"],
    type: "Networking",
    href: "https://github.com/Kazxye/Network-Radar",
    image: { src: networkRadarShot, alt: "Network Radar dashboard with the radar view and device list, before a scan" },
  },
];
