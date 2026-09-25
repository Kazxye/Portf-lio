import { stackGroups } from '@/content/profile'

export function EngineeringStack() {
  return (
    <section
      id="stack"
      tabIndex={-1}
      aria-labelledby="stack-title"
      className="section stack-section container-page"
    >
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">03 / Engineering stack</p>
          <h2 id="stack-title">Tools with a purpose.</h2>
        </div>
        <p className="section-intro">
          The working set behind the projects.
          <br />
          Chosen for the problem at hand.
        </p>
      </div>
      <div className="stack-grid reveal">
        {stackGroups.map((group, index) => (
          <div key={group.name} className="stack-group">
            <span className="stack-node mono-small">0{index + 1}</span>
            <h3 className="eyebrow">{group.name}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
