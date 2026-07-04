import { useState } from 'react'
import type { Game } from '../data/types'

export default function SetupTab({ game }: { game: Game }) {
  const counts = []
  for (let n = game.minPlayers; n <= game.maxPlayers; n++) counts.push(n)
  const [players, setPlayers] = useState(
    Math.min(Math.max(4, game.minPlayers), game.maxPlayers),
  )
  const config = game.configForPlayers(players)

  return (
    <div className="setup">
      <div className="player-picker">
        <span className="player-picker-label">Players</span>
        <div className="player-picker-buttons">
          {counts.map((n) => (
            <button
              key={n}
              type="button"
              className={n === players ? 'active' : ''}
              onClick={() => setPlayers(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {config.cardGroups && (
        <div className="setup-card-groups">
          {config.cardGroups.map((group) => (
            <div key={group.title} className="setup-card-group">
              <div className="setup-cards">
                {group.cards.map((card, i) => (
                  <span
                    key={i}
                    className={`setup-card tone-${card.tone ?? 'neutral'}${card.emphasis ? ' emphasis' : ''}`}
                  >
                    {card.label}
                  </span>
                ))}
              </div>
              <span className="setup-card-group-title">{group.title}</span>
            </div>
          ))}
        </div>
      )}

      <dl className="config-items">
        {config.items.map((item) => (
          <div key={item.label} className="config-item">
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      {config.notes && config.notes.length > 0 && (
        <div className="config-notes">
          {config.notes.map((note, i) => (
            <p key={i}>💡 {note}</p>
          ))}
        </div>
      )}
    </div>
  )
}
