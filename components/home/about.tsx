import { profile } from '@/content/profile'

export function About() {
  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="about-title"
      className="section about-section container-page"
    >
      <p className="eyebrow reveal">02 / About</p>
      <div className="about-grid reveal">
        <h2 id="about-title">
          Understand the system.
          <br />
          <span className="text-fg-2">Question the boundaries.</span>
        </h2>
        <div className="about-copy">
          <p>
            I’m Kazys, a Software Engineering student at FIAP in São Paulo. I
            build backend systems, security tools and software that helps me
            understand what happens beneath the interface.
          </p>
          <p>
            My work connects offensive and defensive security: understanding how
            a system can fail, then thinking about detection, trust boundaries
            and safer implementation. Reverse engineering, networking and
            low-level development keep me curious.
          </p>
          <div className="education-line">
            <span className="education-marker" aria-hidden="true" />
            <div>
              <span className="eyebrow">Education / In progress</span>
              <h3>
                {profile.education.school} — {profile.education.program}
              </h3>
              <p>Expected completion · December {profile.education.end}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
