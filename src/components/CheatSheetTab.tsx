import type { Game } from '../data/types'

export default function CheatSheetTab({ game }: { game: Game }) {
  return (
    <div className="cheat-sheet">
      {game.cheatSheet.map((group) => (
        <section key={group.title} className="cheat-group">
          <h2>{group.title}</h2>
          <div className="cheat-entries">
            {group.entries.map((entry) => (
              <div key={entry.label} className={`cheat-entry tone-${entry.tone ?? 'none'}`}>
                <span className="cheat-label">{entry.label}</span>
                <span className="cheat-effect">{entry.effect}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
