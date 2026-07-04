import type { Game } from '../data/types'

export default function RulesTab({ game }: { game: Game }) {
  return (
    <div className="rules">
      {game.rules.map((section) => (
        <section key={section.title} className="rule-section">
          <h2>{section.title}</h2>
          {section.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
          {section.steps && (
            <ol>
              {section.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          )}
          {section.bullets && (
            <ul>
              {section.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
