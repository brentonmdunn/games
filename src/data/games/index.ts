import type { Game } from '../types'
import cambio from './cambio'
import secretHitler from './secretHitler'
import oneNightWerewolf from './oneNightWerewolf'

export const games: Game[] = [cambio, secretHitler, oneNightWerewolf]

export function getGame(id: string): Game | undefined {
  return games.find((g) => g.id === id)
}
