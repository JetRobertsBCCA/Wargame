// Balance Audit Script - Extracts all unit/commander data from all factions
// Run with: node balance_audit.js

const fs = require('fs');
const path = require('path');

// We need to set up the gameData structure that the faction files expect
global.gameData = {
  factions: [],
  rules: {}
};

// Load core.js first
eval(fs.readFileSync(path.join(__dirname, 'data', 'core.js'), 'utf8'));

// Load all faction files
const factionFiles = [
  'emberclaw-warpack.js',
  'iron-dominion.js',
  'nightfang-dominion.js',
  'thornweft-matriarchy.js',
  'veilbound-shogunate.js'
];

factionFiles.forEach(f => {
  const content = fs.readFileSync(path.join(__dirname, 'data', 'factions', f), 'utf8');
  eval(content);
});

// Now extract all data
const output = {};

gameData.factions.forEach(faction => {
  const factionData = {
    name: faction.name,
    commanders: [],
    units: [],
    war_machines: []
  };

  // Extract commanders
  if (faction.commanders) {
    faction.commanders.forEach(cmd => {
      factionData.commanders.push({
        name: cmd.name,
        points_cost: cmd.points_cost,
        base_stats: cmd.base_stats,
        battle_stats: cmd.battle_stats,
        special_abilities: cmd.special_abilities ? cmd.special_abilities.map(a => a.name || a) : [],
        card_pool_size: cmd.card_pool ? cmd.card_pool.length : 0
      });
    });
  }

  // Extract units
  if (faction.units) {
    faction.units.forEach(unit => {
      factionData.units.push({
        name: unit.name,
        type: unit.type,
        role: unit.role,
        points_cost: unit.points_cost,
        stats: unit.stats,
        special_abilities: unit.special_abilities ? unit.special_abilities.map(a => a.name || a) : [],
        num_abilities: unit.special_abilities ? unit.special_abilities.length : 0,
        keywords: unit.keywords || [],
        flavor: unit.flavor_text || ''
      });
    });
  }

  // Extract war machines
  if (faction.war_machines) {
    faction.war_machines.forEach(wm => {
      factionData.war_machines.push({
        name: wm.name,
        type: 'War Machine',
        role: wm.role,
        points_cost: wm.points_cost,
        stats: wm.stats,
        special_abilities: wm.special_abilities ? wm.special_abilities.map(a => a.name || a) : [],
        num_abilities: wm.special_abilities ? wm.special_abilities.length : 0,
        keywords: wm.keywords || []
      });
    });
  }

  output[faction.id] = factionData;
});

// Output as JSON
console.log(JSON.stringify(output, null, 2));
