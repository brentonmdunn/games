import { games } from '../data/games'

export default function GameList() {
  return (
    <div className="game-list">
      <header className="home-header">
        <h1>Game Night</h1>
        <p>Rules, setup &amp; cheat sheets</p>
      </header>
      {games.map((game) => (
        <a key={game.id} className="game-card" href={`#/${game.id}`}>
          <span className="game-icon">{game.icon}</span>
          <span className="game-card-body">
            <span className="game-card-name">{game.name}</span>
            <span className="game-card-tagline">{game.tagline}</span>
            <span className="game-card-meta">
              {game.minPlayers}–{game.maxPlayers} players · {game.playTime}
            </span>
          </span>
          <span className="game-card-chevron">›</span>
        </a>
      ))}
    </div>
  )
}
