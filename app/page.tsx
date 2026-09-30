import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { education } from "@/data/experience";
import { profile } from "@/data/profile";

// Structured data for search engines. Only facts that are published on the page.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  worksFor: { "@type": "Organization", name: "Clarity HealthCare" },
  alumniOf: education.map((item) => ({ "@type": "CollegeOrUniversity", name: item.institution })),
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.city,
    addressCountry: "BR",
  },
  sameAs: [profile.links.github, profile.links.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escaping "<" keeps the JSON from ever closing the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Stack />
      <Contact />
    </>
  );
}
