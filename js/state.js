// ==========================================
// Shardborne Universe Wiki - Global State
// ==========================================

let currentArmy = {
  faction: null,
  commander: null,
  evolution: null,
  units: [],
  fragments: [],
  pointsLimit: 200,
};

let campaignState = {
  commander: null,
  level: 1,
  xp: 0,
  skillChoices: [],
  evolution: null,
  battles: [],
  fragments: [],
  persistentUnits: [],
  injuryLog: [],
  commanderInjuries: [],
};
