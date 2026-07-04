import type { Game } from '../types'

const cambio: Game = {
  id: 'cambio',
  name: 'Cambio',
  tagline: 'Memory + bluffing card game. Lowest total wins.',
  minPlayers: 2,
  maxPlayers: 8,
  playTime: '15–30 min',
  icon: '🃏',

  rules: [
    {
      title: 'Objective',
      paragraphs: [
        'Have the lowest total card value when someone calls "Cambio" and the round ends. You mostly can\'t look at your own cards, so you have to remember what you have, figure out what everyone else has, and swap wisely.',
      ],
    },
    {
      title: 'Setup',
      steps: [
        'Shuffle a standard 52-card deck with 2 jokers.',
        'Deal 4 cards face down to each player, arranged in a 2×2 grid in front of them.',
        'Place the rest of the deck in the middle as a draw pile, and flip the top card to start the discard pile.',
        'Each player secretly peeks at their two cards closest to them (the bottom row) — once, at the same time. Then everyone plays from memory.',
      ],
    },
    {
      title: 'On Your Turn',
      paragraphs: [
        'Draw the top card of the draw pile and look at it. Then choose one:',
      ],
      bullets: [
        'Swap it with one of your own face-down cards (without looking at the one you replace beforehand — the replaced card goes face up on the discard pile).',
        'Discard it directly onto the discard pile. If it\'s a power card (7 through K), you may use its power.',
      ],
    },
    {
      title: 'Power Cards',
      paragraphs: [
        'Powers only trigger when you draw the card from the deck and discard it directly. Cards discarded from your grid via a swap or stick do not trigger powers.',
      ],
      bullets: [
        '7 or 8 — Peek at one of your own cards.',
        '9 or 10 — Peek at one card of another player.',
        'Jack or Queen — Blind swap: exchange any two cards between any players (including your own) without looking at them.',
        'Black King — Peek at any one card on the table, then you may blind swap any two cards.',
      ],
    },
    {
      title: 'Sticking (Slapping)',
      paragraphs: [
        'Whenever a card lands on the discard pile, anyone — in or out of turn — may "stick" a card they believe matches its rank.',
      ],
      bullets: [
        'Stick your own card: if it matches the rank, it stays on the pile and you now have one fewer card. If you\'re wrong, take it back plus one penalty card from the deck.',
        'Stick someone else\'s card: if it matches, it goes on the pile and you give them one of your own cards (their pile shrinks by zero, yours by one — you choose which card to give without looking). If you\'re wrong, you draw a penalty card.',
        'Only the first stick counts — fastest hand wins.',
      ],
    },
    {
      title: 'Calling Cambio',
      paragraphs: [
        'If you think you have the lowest total, call "Cambio" at the start of your turn instead of drawing. Every other player then gets exactly one more turn. Your cards are locked — no one may swap with or stick your cards after you call.',
        'Then everyone reveals. If the caller has the strictly lowest total, they win. If anyone ties or beats the caller, the caller loses and that player wins.',
      ],
    },
    {
      title: 'Card Values',
      bullets: [
        'Joker = 0',
        'Ace = 1',
        '2–10 = face value',
        'Jack = 11, Queen = 12',
        'Black King = 13',
        'Red King = −1 (the best card in the game)',
      ],
    },
  ],

  configForPlayers: (players) => {
    const twoDecks = players >= 7
    return {
      items: [
        {
          label: 'Deck',
          value: twoDecks
            ? '2 standard decks + 4 jokers (shuffled together)'
            : '1 standard deck + 2 jokers',
        },
        { label: 'Cards per player', value: '4, face down in a 2×2 grid' },
        { label: 'Initial peek', value: 'Your own bottom 2 cards, once' },
        {
          label: 'Table space',
          value:
            players >= 5
              ? 'Use a big table — everyone must be able to reach the discard pile to stick'
              : 'Any table works',
        },
      ],
      notes: [
        ...(twoDecks
          ? ['With two decks, duplicate cards are in play — sticking gets wild.']
          : []),
        ...(players === 2
          ? [
              'Head-to-head: peeking powers (9/10) are strong since there\'s only one opponent. Some pairs ban calling Cambio in the first round.',
            ]
          : []),
        'If the draw pile runs out, shuffle the discard pile (except its top card) into a new draw pile.',
      ],
    }
  },

  cheatSheet: [
    {
      title: 'Card Values',
      entries: [
        { label: 'Joker', effect: '0', tone: 'good' },
        { label: 'Red K', effect: '−1', tone: 'good' },
        { label: 'A', effect: '1', tone: 'good' },
        { label: '2–10', effect: 'Face value', tone: 'neutral' },
        { label: 'J', effect: '11', tone: 'bad' },
        { label: 'Q', effect: '12', tone: 'bad' },
        { label: 'Black K', effect: '13', tone: 'bad' },
      ],
    },
    {
      title: 'Powers (draw + discard only)',
      entries: [
        { label: '7 / 8', effect: 'Peek at one of your own cards' },
        { label: '9 / 10', effect: "Peek at one opponent's card" },
        { label: 'J / Q', effect: 'Blind swap any two cards' },
        { label: 'Black K', effect: 'Peek any card, then may blind swap two' },
      ],
    },
    {
      title: 'Sticking',
      entries: [
        { label: 'Match own', effect: 'Card stays discarded — one fewer card', tone: 'good' },
        { label: 'Match theirs', effect: 'Discard it + give them one of yours', tone: 'good' },
        { label: 'Wrong', effect: 'Take it back + 1 penalty card', tone: 'bad' },
      ],
    },
    {
      title: 'Cambio Call',
      entries: [
        { label: 'When', effect: 'Start of your turn, instead of drawing' },
        { label: 'Then', effect: 'Everyone else gets one final turn' },
        { label: 'Win', effect: 'Caller wins only with strictly lowest total' },
        { label: 'Tie', effect: 'Ties beat the caller', tone: 'bad' },
      ],
    },
  ],
}

export default cambio
