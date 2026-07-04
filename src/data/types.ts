export interface RuleSection {
  title: string
  /** Paragraphs of body text. */
  paragraphs?: string[]
  /** Bulleted list rendered after the paragraphs. */
  bullets?: string[]
  /** Numbered list rendered after the paragraphs. */
  steps?: string[]
}

/** Setup details for a specific player count. */
export interface PlayerConfig {
  /** e.g. "1 standard deck + 2 jokers" */
  items: { label: string; value: string }[]
  notes?: string[]
}

export interface CheatSheetEntry {
  /** Short label, e.g. a card rank or action name. */
  label: string
  effect: string
  /** Optional grouping color hint: 'good' | 'bad' | 'neutral' */
  tone?: 'good' | 'bad' | 'neutral'
}

export interface CheatSheetGroup {
  title: string
  entries: CheatSheetEntry[]
}

export interface Game {
  id: string
  name: string
  tagline: string
  minPlayers: number
  maxPlayers: number
  /** Rough play time, e.g. "15–30 min" */
  playTime: string
  /** Emoji used as the game's icon in the list. */
  icon: string
  rules: RuleSection[]
  /** Setup configuration keyed by player count. */
  configForPlayers: (players: number) => PlayerConfig
  cheatSheet: CheatSheetGroup[]
}
