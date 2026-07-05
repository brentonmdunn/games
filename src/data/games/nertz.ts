import type { Game } from '../types'

const nertz: Game = {
  id: 'nertz',
  name: 'Nertz',
  tagline: 'Real-time competitive solitaire. Everyone plays at once.',
  minPlayers: 2,
  maxPlayers: 8,
  playTime: '20–45 min',
  icon: '⚡',

  rules: [
    {
      title: 'Objective',
      paragraphs: [
        'Nertz is solitaire as a race. Everyone plays their own solitaire layout simultaneously — no turns — and races to play cards onto shared foundation piles in the middle of the table. Empty your 13-card Nertz pile to end the round; score the most points across rounds to win.',
      ],
    },
    {
      title: 'Setup',
      steps: [
        'Each player takes their own standard 52-card deck (no jokers). Decks must have distinguishable backs — scoring depends on sorting the foundations back out afterward.',
        'Deal yourself a Nertz pile: 13 cards, face down in a stack, then flip the top card face up.',
        'Deal 4 cards face up in a row next to it — these are your work piles.',
        'Hold the remaining 35 cards as your stock. Leave the middle of the table open for shared foundations.',
      ],
    },
    {
      title: 'How to Play',
      paragraphs: [
        'There are no turns. When someone says go, everyone plays at once, as fast as they can. You may only move cards with one hand at a time and only one card at a time (except moving a run between work piles).',
      ],
      bullets: [
        'Foundations (shared, center): start with any ace, then build up by suit — A, 2, 3 … K. Anyone may play on any foundation. First card there wins; ties go to whoever touched down first.',
        'Work piles (yours): build down in alternating colors, like solitaire. Move single cards or whole runs between your work piles.',
        'Nertz pile: the face-up top card may be played to a foundation or a work pile. Then flip the next card. This is the pile you\'re racing to empty.',
        'Stock: flip through it three cards at a time into a waste pile. The top waste card is playable. When the stock runs out, flip the waste over (don\'t shuffle) and keep cycling.',
        'Empty work pile: fill it with any available card — usually from your Nertz pile.',
      ],
    },
    {
      title: 'Ending a Round',
      paragraphs: [
        'The moment your Nertz pile is empty, yell "Nertz!" — the round ends instantly and everyone stops, mid-move or not.',
        'You don\'t have to call it right away: if you\'re piling up foundation points, you can keep playing after your Nertz pile empties. But someone else might call first.',
      ],
    },
    {
      title: 'Scoring',
      bullets: [
        'Sort the foundation piles by card backs and count: +1 point per card you got onto the foundations.',
        '−2 points per card left in your Nertz pile.',
        'Cards in your work piles, stock, and waste score nothing.',
        'First player to reach 100 points (or a total your table agrees on) wins. If several players cross 100 in the same round, highest total wins.',
      ],
    },
    {
      title: 'Table Rules Worth Agreeing On',
      bullets: [
        'One hand on your cards at a time; the other may only hold your stock.',
        'No hovering over a foundation to block it, and no holding a card in the air "reserved" — play it or keep it.',
        'If two cards hit a foundation at once, the bottom one stays; the other goes back.',
        'Misplays (wrong suit or rank on a foundation) come back when noticed — no penalty beyond lost time, unless your table wants one.',
        'If everyone is stuck and no one can move, each player moves one card from the top of their waste to the bottom of their stock and play resumes.',
      ],
    },
  ],

  configForPlayers: (players) => {
    const crowded = players >= 5
    return {
      items: [
        { label: 'Decks', value: `${players} standard decks, one per player, distinguishable backs` },
        { label: 'Nertz pile', value: '13 cards, top card face up' },
        { label: 'Work piles', value: '4 cards face up in a row' },
        { label: 'Stock in hand', value: '35 cards, flipped 3 at a time' },
        {
          label: 'Table space',
          value: crowded
            ? 'Big table required — everyone must reach the center foundations'
            : 'Any table with a clear middle works',
        },
      ],
      notes: [
        ...(crowded
          ? [
              `With ${players} players the center gets chaotic — up to ${players * 4} foundation piles. Consider pairing up into teams (one plays, one advises and plays to foundations) if reach is a problem.`,
            ]
          : []),
        ...(players === 2
          ? ['Head-to-head plays fast and tense — consider flipping the stock 1 card at a time for a slower, more skillful game.']
          : []),
        'No two decks with the same back — you can\'t score otherwise. In a pinch, mark one deck\'s backs with a pencil dot.',
      ],
    }
  },

  cheatSheet: [
    {
      title: 'Where Cards Go',
      entries: [
        { label: 'Foundations', effect: 'Shared center: up by suit, A → K. Anyone can play', tone: 'good' },
        { label: 'Work piles', effect: 'Yours: down, alternating colors' },
        { label: 'Nertz pile', effect: 'Top card playable — race to empty it', tone: 'bad' },
        { label: 'Stock', effect: 'Flip 3 at a time; top waste card playable' },
        { label: 'Empty work pile', effect: 'Fill with any card (Nertz pile first!)' },
      ],
    },
    {
      title: 'Scoring',
      entries: [
        { label: 'Foundation card', effect: '+1 each', tone: 'good' },
        { label: 'Nertz leftover', effect: '−2 each', tone: 'bad' },
        { label: 'Work / stock / waste', effect: '0', tone: 'neutral' },
        { label: 'Game', effect: 'First to 100 wins' },
      ],
    },
    {
      title: 'Quick Reminders',
      entries: [
        { label: 'Nertz!', effect: 'Empty pile → yell it, round stops instantly' },
        { label: 'Or don\'t', effect: 'You may keep playing for points — risky', tone: 'neutral' },
        { label: 'Ties', effect: 'Bottom card on the foundation stays' },
        { label: 'Stuck?', effect: 'Everyone moves 1 waste card to bottom of stock' },
      ],
    },
  ],
}

export default nertz
