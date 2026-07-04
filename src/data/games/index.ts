import type { Game } from '../types'
import cambio from './cambio'

export const games: Game[] = [cambio]

export function getGame(id: string): Game | undefined {
  return games.find((g) => g.id === id)
}
