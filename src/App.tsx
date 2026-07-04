import { useEffect, useState } from 'react'
import { getGame } from './data/games'
import GameList from './components/GameList'
import GamePage from './components/GamePage'
import './App.css'

function currentRoute(): string {
  return window.location.hash.replace(/^#\/?/, '')
}

function App() {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onHashChange = () => {
      setRoute(currentRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const game = route ? getGame(route) : undefined

  if (route && !game) {
    return (
      <div className="not-found">
        <p>Game not found.</p>
        <a href="#/">‹ Back to games</a>
      </div>
    )
  }

  return game ? <GamePage key={game.id} game={game} /> : <GameList />
}

export default App
