import type { Game } from '../types'

interface Board {
  label: string
  powers: [string, string, string, string, string]
}

/** Fascist board powers by fascist policies enacted (slots 1–5). */
function boardForPlayers(players: number): Board {
  if (players <= 6) {
    return {
      label: '5–6 players',
      powers: [
        'No power',
        'No power',
        'Policy Peek — President looks at the top 3 policies',
        'Execution — President kills a player',
        'Execution — President kills a player (veto power unlocks)',
      ],
    }
  }
  if (players <= 8) {
    return {
      label: '7–8 players',
      powers: [
        'No power',
        'Investigate Loyalty — President sees a player\'s party card',
        'Special Election — President picks the next President',
        'Execution — President kills a player',
        'Execution — President kills a player (veto power unlocks)',
      ],
    }
  }
  return {
    label: '9–10 players',
    powers: [
      'Investigate Loyalty — President sees a player\'s party card',
      'Investigate Loyalty — President sees a player\'s party card',
      'Special Election — President picks the next President',
      'Execution — President kills a player',
      'Execution — President kills a player (veto power unlocks)',
    ],
  }
}

const secretHitler: Game = {
  id: 'secret-hitler',
  name: 'Secret Hitler',
  tagline: 'Social deduction. Find and stop the fascists.',
  minPlayers: 5,
  maxPlayers: 10,
  playTime: '30–45 min',
  icon: '🕴️',

  rules: [
    {
      title: 'Objective',
      paragraphs: [
        'Players are secretly divided into Liberals and Fascists — one fascist is Secret Hitler. Liberals win by enacting 5 liberal policies or assassinating Hitler. Fascists win by enacting 6 fascist policies or getting Hitler elected Chancellor after 3 fascist policies are on the board.',
      ],
    },
    {
      title: 'Setup',
      steps: [
        'Deal each player one secret role card and matching party membership card (see the Setup tab for role counts at your player count).',
        'Shuffle the policy deck: 6 liberal and 11 fascist policies, face down.',
        'Lay out the liberal board, and the fascist board matching your player count.',
        'Night phase: everyone closes their eyes. Fascists (not Hitler at 7+) open their eyes and identify each other; Hitler sticks a thumb up so fascists know who he is. At 5–6 players, Hitler also opens his eyes and sees his fellow fascist.',
        'The player who most recently ate schnitzel (or any random pick) takes the President placard.',
      ],
    },
    {
      title: 'Election',
      steps: [
        'The President placard passes clockwise each round; that player nominates a Chancellor candidate (term limits apply — see below).',
        'Everyone, including the candidates, votes Ja or Nein simultaneously.',
        'If the vote passes (majority Ja): the pair takes office. If 3+ fascist policies are enacted, first ask — if the new Chancellor is Hitler, fascists win immediately.',
        'If the vote fails: advance the Election Tracker one space. On the third consecutive failed election, the top policy of the deck is enacted immediately (no power triggers), term limits reset, and the tracker resets.',
        'Any successful election also resets the Election Tracker.',
      ],
    },
    {
      title: 'Legislative Session',
      steps: [
        'The President draws the top 3 policies, secretly discards 1, and passes the remaining 2 to the Chancellor.',
        'The Chancellor secretly discards 1 and enacts the other, placing it on the matching board.',
        'No communication of any kind during the session — no talking, gestures, or showing cards. Lying about what you saw afterward is allowed (and expected).',
        'If the enacted policy is fascist and lands on a power slot, the President must use that power before the next round.',
        'If fewer than 3 policies remain in the deck, shuffle them with the discard pile into a new deck.',
      ],
    },
    {
      title: 'Term Limits',
      bullets: [
        'The last elected Chancellor is always ineligible to be nominated Chancellor.',
        'The last elected President is also ineligible for Chancellor — unless only 5 players remain alive.',
        'Term limits only apply to elected governments; a policy enacted by a failed Election Tracker resets them.',
      ],
    },
    {
      title: 'Presidential Powers',
      paragraphs: [
        'Fascist policies on certain slots grant the President a one-time power. Which slots have powers depends on your player count — check the Setup tab. Powers are mandatory and used immediately.',
      ],
      bullets: [
        'Investigate Loyalty — Look at a player\'s party membership card (not their role). You may lie about what you saw. No player may be investigated twice in one game.',
        'Policy Peek — Secretly look at the top 3 policies in the deck.',
        'Special Election — Choose any player to be the next President; afterward the placard returns to its normal order.',
        'Execution — Kill a player. If it\'s Hitler, liberals win instantly. Otherwise the player reveals nothing, says nothing, and is out of the game (they don\'t vote or talk).',
      ],
    },
    {
      title: 'Veto Power',
      paragraphs: [
        'After the 5th fascist policy is enacted, the Chancellor may propose a veto during any legislative session: if the President agrees, both policies are discarded and the Election Tracker advances one space (as if the election had failed). If the President refuses, the Chancellor must enact a policy as normal.',
      ],
    },
    {
      title: 'Winning',
      bullets: [
        'Liberals win: 5 liberal policies enacted, or Hitler is executed.',
        'Fascists win: 6 fascist policies enacted, or Hitler is elected Chancellor after 3+ fascist policies are on the board.',
      ],
    },
  ],

  configForPlayers: (players) => {
    const fascists = Math.floor((players - 1) / 2) - 1 // non-Hitler fascists
    const liberals = players - fascists - 1
    const hitlerKnows = players <= 6
    const board = boardForPlayers(players)
    return {
      items: [
        { label: 'Liberals', value: `${liberals}` },
        { label: 'Fascists', value: `${fascists} + Hitler` },
        {
          label: 'Hitler knows the fascists?',
          value: hitlerKnows
            ? 'Yes — Hitler opens his eyes during the night phase'
            : 'No — Hitler only thumbs up; fascists know him, not vice versa',
        },
        { label: 'Fascist board', value: board.label },
        ...board.powers.map((power, i) => ({
          label: `${i + 1} fascist policies`,
          value: power,
        })),
      ],
      notes: [
        'Policy deck is always 6 liberal + 11 fascist, regardless of player count.',
        ...(hitlerKnows
          ? [
              'With Hitler in the know, the fascist team coordinates easily — liberals should be extra suspicious of quiet pairs.',
            ]
          : [
              'Hitler must play blind: fascists want to look liberal enough to get Hitler elected Chancellor late-game.',
            ]),
      ],
    }
  },

  cheatSheet: [
    {
      title: 'Win Conditions',
      entries: [
        { label: 'Liberals', effect: '5 liberal policies OR execute Hitler', tone: 'good' },
        { label: 'Fascists', effect: '6 fascist policies OR Hitler elected Chancellor after 3 fascist policies', tone: 'bad' },
      ],
    },
    {
      title: 'Round Order',
      entries: [
        { label: '1. Elect', effect: 'President nominates Chancellor, everyone votes Ja/Nein' },
        { label: '2. Legislate', effect: 'President draws 3, discards 1 → Chancellor discards 1, enacts 1' },
        { label: '3. Power', effect: 'If a fascist power slot was filled, President uses it now' },
      ],
    },
    {
      title: 'Key Numbers',
      entries: [
        { label: 'Deck', effect: '6 liberal + 11 fascist policies' },
        { label: '3 fails', effect: 'Top policy auto-enacted, no power, limits reset', tone: 'bad' },
        { label: '3 fascist', effect: 'Chancellor = Hitler? Ask before seating — fascists win', tone: 'bad' },
        { label: '5 fascist', effect: 'Veto unlocked (Chancellor proposes, President agrees)' },
      ],
    },
    {
      title: 'Term Limits',
      entries: [
        { label: 'Chancellor', effect: 'Last elected Chancellor never re-nominatable' },
        { label: 'President', effect: 'Last elected President blocked too, unless only 5 players alive' },
      ],
    },
    {
      title: 'Table Talk',
      entries: [
        { label: 'Allowed', effect: 'Lying about roles, votes, and what cards you saw', tone: 'good' },
        { label: 'Forbidden', effect: 'Talking during legislative session; showing role/policy cards as proof', tone: 'bad' },
      ],
    },
  ],
}

export default secretHitler
