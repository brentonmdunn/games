import type { Game } from '../types'
import cambio from './cambio'
import secretHitler from './secretHitler'

export const games: Game[] = [cambio, secretHitler]

export function getGame(id: string): Game | undefined {
  return games.find((g) => g.id === id)
}
