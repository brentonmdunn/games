import { useEffect, useState } from 'react'
import type { Game } from '../data/types'
import RulesTab from './RulesTab'
import SetupTab from './SetupTab'
import CheatSheetTab from './CheatSheetTab'

const TABS = ['Rules', 'Setup', 'Cheat Sheet'] as const
type Tab = (typeof TABS)[number]

export default function GamePage({ game }: { game: Game }) {
  const [tab, setTab] = useState<Tab>('Rules')

  // Themes are CSS blocks keyed off this attribute (see App.css).
  useEffect(() => {
    document.documentElement.dataset.game = game.id
    return () => {
      delete document.documentElement.dataset.game
    }
  }, [game.id])

  return (
    <div className="game-page">
      <header className="game-header">
        <a className="back-link" href="#/">
          ‹ Games
        </a>
        <h1>
          {game.icon} {game.name}
        </h1>
        <p className="game-meta">
          {game.minPlayers}–{game.maxPlayers} players · {game.playTime}
        </p>
      </header>

      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={t === tab ? 'active' : ''}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="tab-content">
        {tab === 'Rules' && <RulesTab game={game} />}
        {tab === 'Setup' && <SetupTab game={game} />}
        {tab === 'Cheat Sheet' && <CheatSheetTab game={game} />}
      </main>
    </div>
  )
}
