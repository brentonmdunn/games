import type { Game } from '../types'
import cambio from './cambio'
import secretHitler from './secretHitler'
import oneNightWerewolf from './oneNightWerewolf'
import nertz from './nertz'

export const games: Game[] = [cambio, secretHitler, oneNightWerewolf, nertz]

export function getGame(id: string): Game | undefined {
  return games.find((g) => g.id === id)
}
