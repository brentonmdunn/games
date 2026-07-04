import type { Game } from '../types'

/**
 * Recommended card set: a fixed core plus one extra card per player above 3.
 * Card count is always players + 3 (the extras go face down in the center).
 */
const CORE = ['Werewolf ×2', 'Seer', 'Robber', 'Troublemaker']
const ADDITIONS = [
  'Villager', // 3 players
  'Insomniac', // 4
  'Minion', // 5
  'Drunk', // 6
  'Hunter', // 7
  'Tanner', // 8
  'Villager', // 9
  'Villager', // 10
]

const oneNightWerewolf: Game = {
  id: 'one-night-werewolf',
  name: 'One Night Ultimate Werewolf',
  tagline: 'One night, one vote. Find the werewolf — or fake being one.',
  minPlayers: 3,
  maxPlayers: 10,
  playTime: '10 min',
  icon: '🐺',

  rules: [
    {
      title: 'Objective',
      paragraphs: [
        'Everyone gets a secret role, but during the night many roles get swapped around — you might not be who you think you are. After one night and a few minutes of arguing, everyone votes at once. The village team wins if a werewolf dies; the werewolf team wins if none do. There are no eliminations across rounds: one night, one vote, done.',
      ],
    },
    {
      title: 'Setup',
      steps: [
        'Choose a number of role cards equal to players + 3 (see the Setup tab for the recommended set at your player count).',
        'Shuffle and deal one card face down to each player. Everyone secretly looks at their own card, then places it face down in front of them.',
        'Put the 3 leftover cards face down in a row in the center of the table.',
        'Use the free One Night app as narrator (recommended), or pick a narrator who calls the night phase with eyes closed.',
      ],
    },
    {
      title: 'Night Phase',
      paragraphs: [
        'Everyone closes their eyes. The narrator calls each role in order; players with that role open their eyes and act. Act on where cards are now, not what you were dealt — if your card was swapped, you act as your original role anyway (you only know what you were dealt).',
      ],
      steps: [
        'Werewolves — open eyes and see each other. A lone werewolf may look at one center card.',
        'Minion — sees who the werewolves are (they don\'t see him).',
        'Seer — looks at another player\'s card, or two center cards.',
        'Robber — may swap their card with another player\'s and look at their new card.',
        'Troublemaker — may swap two other players\' cards without looking.',
        'Drunk — must swap their card with a center card without looking.',
        'Insomniac — looks at their own card to see if it changed.',
      ],
    },
    {
      title: 'Day Phase',
      paragraphs: [
        'Everyone opens their eyes and discusses — usually with a 5-minute timer. Anything goes: claim any role, lie about what you saw, demand others explain themselves. Werewolves want to blend in; villagers want to piece together the night\'s swaps.',
        'When time is up, everyone counts to three and points at a player simultaneously. The player with the most votes dies and reveals their card. On a tie, all tied players die. If no player receives more than one vote, no one dies.',
      ],
    },
    {
      title: 'Who Wins',
      bullets: [
        'Village team wins if at least one werewolf dies.',
        'Werewolf team wins if at least one werewolf is in play and no werewolf dies.',
        'If no werewolves are in play (both in the center), the village wins only if no one dies.',
        'Tanner wins alone if he dies — and the werewolves lose even if no werewolf died.',
        'Minion is on the werewolf team: he wins when they win, even if he dies. If the Minion dies and no werewolf does, the werewolves still win.',
        'Hunter: if the Hunter dies, the player he\'s pointing at also dies.',
      ],
    },
    {
      title: 'Key Things People Get Wrong',
      bullets: [
        'You are whatever card is in front of you at dawn — not what you were dealt. The Robber who stole a Werewolf card is now a werewolf.',
        'Night roles act in strict order: the Seer looks before the Robber steals, the Troublemaker swaps after the Robber, the Insomniac checks last.',
        'The Drunk has no idea what they are — they swapped blind with the center.',
        'Voting for a center-card werewolf does nothing; you must kill a player holding a werewolf card at dawn.',
      ],
    },
  ],

  configForPlayers: (players) => {
    const roles = [...CORE, ...ADDITIONS.slice(0, players - 2)]
    return {
      items: [
        { label: 'Cards in play', value: `${players + 3} (3 face down in the center)` },
        { label: 'Recommended roles', value: roles.join(', ') },
        { label: 'Timer', value: '5 minutes of discussion' },
      ],
      notes: [
        'The set is a recommendation — swap roles freely, but always keep exactly players + 3 cards and at least 2 Werewolves.',
        ...(players <= 4
          ? ['With few players, werewolves often end up in the center — remember: if nobody is a werewolf, the village must vote for no one to win.']
          : []),
        ...(players >= 8
          ? ['With the Tanner in play, be suspicious of anyone begging to be voted out.']
          : []),
        'Masons (added as a pair) and the Doppelgänger are good swap-ins once your group knows the base roles.',
      ],
    }
  },

  cheatSheet: [
    {
      title: 'Night Order',
      entries: [
        { label: '1. Werewolf', effect: 'See each other; lone wolf may peek 1 center card' },
        { label: '2. Minion', effect: 'Sees the werewolves (one-way)' },
        { label: '3. Seer', effect: 'View 1 player card OR 2 center cards' },
        { label: '4. Robber', effect: 'Swap with a player, look at new card' },
        { label: '5. Troublemaker', effect: 'Swap two OTHER players\' cards, no looking' },
        { label: '6. Drunk', effect: 'Swap with a center card, no looking' },
        { label: '7. Insomniac', effect: 'Check own card at end of night' },
      ],
    },
    {
      title: 'Win Conditions',
      entries: [
        { label: 'Village', effect: 'A werewolf dies (or no wolves in play and no one dies)', tone: 'good' },
        { label: 'Werewolves', effect: 'A wolf is in play and no wolf dies', tone: 'bad' },
        { label: 'Tanner', effect: 'Wins alone if he dies; wolves lose', tone: 'neutral' },
        { label: 'Minion', effect: 'Wins with the wolves, even dead', tone: 'bad' },
      ],
    },
    {
      title: 'Voting',
      entries: [
        { label: 'How', effect: 'Count to 3, everyone points at once' },
        { label: 'Most votes', effect: 'Dies and reveals; ties all die' },
        { label: '≤1 vote each', effect: 'No one dies' },
        { label: 'Hunter dies', effect: 'Whoever he points at dies too', tone: 'bad' },
      ],
    },
    {
      title: 'Remember',
      entries: [
        { label: 'You are', effect: 'The card in front of you at dawn, not what you were dealt' },
        { label: 'Lying', effect: 'Always allowed — roles, claims, everything', tone: 'good' },
      ],
    },
  ],
}

export default oneNightWerewolf
