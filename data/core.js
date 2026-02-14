const gameData = {
  rules: {
    version: "0.9 — War Crier Core Rules",
    overview:
      "War Crier is a dice-and-card tabletop wargame for 2 players. Armies clash on a battlefield using miniatures or tokens. Combat is resolved with six-sided dice (d6). Only Commanders can play cards from their hand, making the commander your strategic brain — protecting them is critical.",

    measurement: {
      system: "inches",
      table_sizes: {
        skirmish: '24" x 24" (50-100 pts)',
        standard: '36" x 48" (200-300 pts)',
        epic: '48" x 72" (500+ pts)',
      },
    },

    army_building: {
      overview:
        "Choose a Commander, then fill your roster with units up to your agreed points limit. Your Commander costs points (see Commander entries for their point cost). Each unit purchased represents a single model or base on the table — its stat line applies to that individual model.",
      unit_definition: "Each unit entry represents a single model (or base/token) placed on the battlefield. When you purchase a unit, you place one model with that stat line. To field multiples, purchase the same unit entry multiple times (max 3 copies of any single unit type). War Machines are always single models.",
      battle_sizes: {
        skirmish: {
          points: "50–100",
          min_units: 5,
          max_units: 15,
          max_war_machines: 1,
          table_size: '24" x 24"',
          recommended_turns: 5
        },
        standard: {
          points: "200–300",
          min_units: 15,
          max_units: 30,
          max_war_machines: 3,
          table_size: '36" x 48"',
          recommended_turns: 6
        },
        epic: {
          points: "500+",
          min_units: 30,
          max_units: 60,
          max_war_machines: 6,
          table_size: '48" x 72"',
          recommended_turns: 7
        }
      },
      composition_rules: [
        "You must include at least 1 Infantry unit for every 50 points in your army.",
        "War Machines are limited by battle size (see above).",
        "Specialist units cannot exceed 25% of your total points.",
        "Support units cannot exceed 25% of your total points.",
        "You may include up to 3 copies of any single unit type.",
        "You cannot mix factions — all units must belong to the same faction as your Commander.",
        "Fragments are limited to 2 per army in Skirmish, 3 in Standard, and 5 in Epic."
      ],
      deck_rules: {
        pool_size: 20,
        deck_size: 15,
        draw_per_turn: 2,
        max_hand_size: 7,
        discard_rule: "When your deck is empty, shuffle your discard pile to form a new deck. Discard down to max hand size (7) at end of turn.",
        building_rules: [
          "Build a 15-card deck from your Commander's available card pool before the game begins.",
          "You must include at least 2 cards of each type (Command, Tech, Fragment, Tactical).",
          "No more than 2 copies of any single card in your deck.",
          "At game start, draw 5 cards (your opening hand). You may mulligan once: shuffle your hand back and draw 5 new cards.",
          "Each Command Phase, draw 2 cards.",
          "As your Commander levels up (campaign mode), they unlock additional cards for their pool."
        ]
      },
    },

    turn_structure: {
      overview:
        "Players alternate full turns. On your turn, you complete all phases before your opponent takes their turn. CP does NOT carry over between turns — use it or lose it.",
      phases: [
        {
          name: "Command Phase",
          description: "Generate resources, draw cards, and play support cards.",
          actions: [
            "Generate Command Points (CP) equal to your Commander's Command stat. Unspent CP from previous turns is lost.",
            "Draw 2 cards from your deck (max hand size: 7; discard extras).",
            "You may play any number of Command or Fragment cards (paying CP costs).",
            "Iron Dominion: Calculate Grid Cohesion bonuses for each unit based on nearby allies.",
            "Veilbound: Add each surviving friendly unit's Ritual Flow value to your Flow Pool. Check Flow thresholds.",
            "Veilbound: Declare Stance changes for infantry and cavalry units (free action)."
          ],
        },
        {
          name: "Movement Phase",
          description: "Move your units across the battlefield.",
          actions: [
            "Activate each unit one at a time. Each unit may move up to its MOV stat in inches.",
            "Units may move through friendly models but cannot end overlapping them (maintain at least 1\" gap).",
            'Difficult terrain costs 2\" of movement per 1\" moved.',
            'A unit that moves its base within 1\" of an enemy model is now Engaged (in melee).',
            "Engaged units cannot move away unless they Disengage (sacrifice entire movement and cannot attack this turn).",
            'Charging: A unit that moves 4\"+ in a straight line directly toward an enemy and becomes Engaged is Charging (+1 ATK die in melee this turn).',
            "You may play Movement-timing cards during this phase (paying CP costs)."
          ],
        },
        {
          name: "Combat Phase",
          description: "Resolve ranged and melee attacks.",
          actions: [
            "Ranged attacks resolve first. Each unit with RNG > 1 may attack one enemy within range and line of sight. Engaged units cannot make ranged attacks.",
            "Melee attacks follow. Each Engaged unit attacks one enemy unit it is Engaged with.",
            "Multiple friendly units may be Engaged with the same enemy — each attacks separately.",
            "Resolve each attack using the Combat Resolution system (see Combat section).",
            "The active player may play Combat-timing cards before or after rolling dice (paying CP costs). The defending player may play Reaction cards.",
            "Units reduced to 0 HP are destroyed and removed immediately.",
          ],
        },
        {
          name: "End Phase",
          description: "Resolve morale, fragment effects, and cleanup.",
          actions: [
            "Morale Check: Any unit that lost HP this turn must roll 2d6. If the result exceeds their MOR stat, they become Shaken (−1 ATK die next turn). If it exceeds MOR by 3+, the unit Routs and is removed.",
            "Rally: A Shaken unit that was NOT damaged this turn may attempt to Rally — roll 2d6. If the result is ≤ MOR, remove Shaken. Shaken does not stack.",
            "Fragment Effects: Resolve any ongoing fragment effects or instability checks.",
            "Iron Dominion: Support units with Repair adjacent to damaged friendly units may restore 1 HP.",
            "Veilbound: Check if Ritual Flow Pool has crossed any new thresholds.",
            "Check victory conditions.",
            "Discard down to max hand size (7) if needed. All unspent CP is lost."
          ],
        },
      ],
    },

    combat_resolution: {
      overview:
        "When a unit attacks, roll dice equal to its ATK stat. Each die that meets or exceeds the defender's DEF value scores a hit. Each hit deals 1 damage (reduces HP by 1). Commander cards can modify any step of this process.",
      steps: [
        {
          step: 1,
          name: "Declare Attack",
          description:
            'Choose an attacking unit and a target. The target must be within range (RNG stat in inches for ranged; within 1" for melee) and line of sight.',
        },
        {
          step: 2,
          name: "Roll Attack Dice",
          description:
            "Roll a number of d6 equal to the attacker's ATK stat. Each die that equals or exceeds the defender's DEF value is a Hit.",
        },
        {
          step: 3,
          name: "Apply Modifiers",
          description:
            "Before or after rolling, the attacking player may play Combat cards to add dice, reroll misses, or modify results. The defending player's commander may play cards to negate hits or boost defense.",
        },
        {
          step: 4,
          name: "Critical Hits",
          description:
            "Any natural 6 is a Critical Hit — it deals 2 damage instead of 1 and cannot be negated by normal defense cards.",
        },
        {
          step: 5,
          name: "Apply Damage",
          description:
            "Total hits reduce the target's HP. A unit reduced to 0 HP is destroyed. Excess damage is lost (no spillover to other units).",
        },
      ],
      modifiers: [
        { name: "Flanking (90°+ angle from front)", effect: "+1 ATK die" },
        { name: "Rear Attack (behind target's facing)", effect: "+2 ATK dice" },
        { name: "Light Cover", effect: "+1 DEF vs ranged attacks" },
        { name: "Heavy Cover", effect: "+2 DEF vs ranged attacks" },
        { name: "Elevated Attacker (ranged)", effect: "+1 ATK die" },
        { name: "Charging (moved 4\"+ directly toward target)", effect: "+1 ATK die (melee only)" },
        { name: "Unit is Shaken", effect: "−1 ATK die (minimum 1)" },
        { name: "Grid Active (Iron Dominion, 2+ allies within 3\")", effect: "+1 ATK die" },
        { name: "Grid Fortified (Iron Dominion, 3+ allies incl. Support)", effect: "+1 ATK die and +1 DEF" },
        { name: "Revelation Stance (Veilbound)", effect: "+1 ATK die, −1 DEF" },
        { name: "Honor Stance (Veilbound)", effect: "+1 DEF, −1 ATK die, cannot be flanked" },
        { name: "Commander Aura (within 6\")", effect: "+1 MOR to friendly units" },
      ],
      example:
        "A Steam Shock Infantry (ATK 4) attacks Temple Defenders (DEF 4). Roll 4d6: results are 2, 4, 5, 6. The 4, 5, and 6 meet or exceed DEF 4, so that's 3 hits. The 6 is a critical, dealing 2 damage. Total damage: 4 HP. The Temple Defenders had 3 HP, so they are destroyed.",
    },

    faction_mechanics: {
      iron_dominion: {
        grid_cohesion: {
          description:
            "Iron Dominion units fight as nodes in a tactical Grid. When units maintain formation, they share bonuses. When isolated, they lose effectiveness. During the Command Phase, calculate Grid status for each unit by counting friendly non-War Machine units within 3\".",
          tiers: [
            { name: "Isolated", units_within_3_inches: 0, bonus: "−1 ATK die. Unit operates alone without Grid support." },
            { name: "Connected", units_within_3_inches: 1, bonus: "No bonus or penalty. Stable but unremarkable." },
            { name: "Grid Active", units_within_3_inches: 2, bonus: "+1 ATK die on all attacks. The Grid feeds tactical data." },
            { name: "Grid Fortified", units_within_3_inches: 3, bonus: "+1 ATK die and +1 DEF. Requires at least 1 Support unit among adjacent allies." }
          ],
          war_machine_rule: "War Machines are Grid Anchors: they count as 2 units for Grid adjacency purposes."
        },
        fragment_charges: {
          description:
            "Iron Dominion armies accumulate Fragment Charges — energy tokens spent to activate their Fragment loadout. Fragment Charges are tracked with tokens or a counter.",
          instability: [
            "Each Iron Dominion unit generates 1 Fragment Charge at the start of your turn if within 6\" of a War Machine or Support unit.",
            "Spend Fragment Charges to activate fragments. Each fragment lists its activation cost (Low=1, Medium=2, High=3, Very High=4 charges).",
            "After activating a fragment, roll 1d6 for instability. If the result ≤ the instability threshold (Low=1, Medium=1-2, High=1-3, Very High=1-4), the fragment backfires: deal 1 damage to the activating unit and all units within 2\".",
            "Fragment Charges persist between turns but are lost if the generating unit is destroyed.",
            "A maximum of one fragment can be activated per Command Phase unless a card allows additional activations."
          ]
        }
      },
      veilbound_shogunate: {
        ritual_flow: {
          description:
            "Veilbound Shogunate units generate Ritual Flow — spiritual energy that accumulates in a shared Flow Pool. Early turns are weaker, but as Flow builds across turns, the Shogunate unlocks increasingly devastating abilities. Flow spent is removed from the pool.",
          thresholds: [
            { name: "Stirring", flow_required: 5, effect: "Unlock Tier 1 Flow abilities on units and commander cards." },
            { name: "Surging", flow_required: 12, effect: "Unlock Tier 2 Flow abilities. All Veilbound units gain +1 MOR." },
            { name: "Overflowing", flow_required: 20, effect: "Unlock Tier 3 Flow abilities. Commander may play 1 card per turn at no CP cost." },
            { name: "Ascendant", flow_required: 30, effect: "Unlock Tier 4 Flow abilities. All Veilbound units gain +1 ATK die. Transformation-stage units may attempt transformation." }
          ],
          pool_rules: [
            "The Flow Pool has no maximum — it grows each turn as long as units survive.",
            "Flow is tracked with a counter or dial. Flow does NOT carry between games.",
            "When you spend Flow on an ability, your pool total decreases. Spending can drop you below a threshold — you lose that threshold's passive bonuses until you rebuild.",
            "If all your units with Ritual Flow are destroyed, you can no longer generate Flow (but may still spend remaining pool)."
          ]
        },
        stance_system: {
          description:
            "Veilbound infantry and cavalry units can switch stances at the start of the Movement Phase (free action, once per turn). War Machines and Support units cannot use stances. A unit's stance persists until changed.",
          stances: [
            {
              name: "Honor Stance 🛡️",
              effect: "+1 DEF, −1 ATK die. Unit cannot be flanked (negates flank and rear bonuses). Focused on discipline and formation holding."
            },
            {
              name: "Revelation Stance ⚔️",
              effect: "+1 ATK die, −1 DEF. Generate +1 Ritual Flow this turn. Aggressive posture channeling spiritual energy into devastating attacks."
            }
          ]
        }
      },
      nightfang_dominion: {
        corruption_system: {
          description:
            "Nightfang Dominion units spread Corruption through melee combat. Each melee hit from a unit with Corruption Spread applies Corruption tokens to the target. As tokens accumulate, enemies weaken and eventually collapse under the weight of the Scarlet Blight.",
          thresholds: [
            { name: "Clean", tokens: 0, effect: "No corruption effects. Unit is unaffected." },
            { name: "Tainted", tokens: 3, effect: "-1 ATK and -1 MOR. The Blight begins to take hold." },
            { name: "Corrupted", tokens: 6, effect: "-2 ATK, -1 DEF, -2 MOR. Unit is significantly weakened by spreading infection." },
            { name: "Consumed", tokens: 9, effect: "-3 ATK, -2 DEF, -3 MOR. Unit is barely functional; roll d6 at start of turn — on 1-2, unit cannot act." }
          ],
          spread_rules: [
            "Each Nightfang unit has a corruption_spread stat (0-4) indicating tokens applied per melee hit.",
            "Corruption tokens persist between turns and cannot be removed except by specific abilities.",
            "When a corrupted unit (3+ tokens) is destroyed, adjacent enemy units each gain 1 Corruption token.",
            "Nightfang units are immune to Corruption tokens — they are carriers, not victims.",
            "A maximum of 9 Corruption tokens can be placed on a single unit."
          ]
        },
        blood_tithe: {
          description:
            "Nightfang commanders and units can sacrifice their own HP to gain tactical advantages. Blood Tithe is a core mechanic representing the vampiric nature of the faction — power through self-inflicted bloodletting.",
          rules: [
            "Units: Sacrifice 1 HP → gain +1 ATK die for the next attack this turn.",
            "Commanders: Sacrifice 2 HP → draw 1 card immediately.",
            "Blood Tithe cannot reduce a unit below 1 HP — you must have HP to spare.",
            "Blood Tithe is a free action that can be used once per phase per unit.",
            "Some commander abilities and cards can modify Blood Tithe costs or effects."
          ]
        },
        hunger_pool: {
          description:
            "The Nightfang track kills in a shared Hunger Pool. As the Pool grows, the entire army enters a feeding frenzy, gaining cumulative bonuses. The Hunger Pool represents the collective bloodlust of the Nightfang horde.",
          thresholds: [
            { name: "Peckish", kills: 5, effect: "All Nightfang units gain +1 MOV. The hunt begins." },
            { name: "Ravenous", kills: 10, effect: "All Nightfang units gain +1 ATK die. Blood frenzy spreads." },
            { name: "Gorged", kills: 15, effect: "Commander heals 3 HP. All units gain Blood Drain for the rest of the game." }
          ],
          pool_rules: [
            "Each enemy model destroyed adds 1 to the Hunger Pool.",
            "The Hunger Pool never decreases — it only grows.",
            "Thresholds are cumulative — reaching 10 gives both the 5 and 10 bonuses.",
            "Some cards and abilities add directly to the Hunger Pool without requiring kills."
          ]
        },
        nocturnal_predators: {
          description: "All Nightfang units gain +1 DEF when in cover or shadow terrain, representing their natural affinity for darkness and ambush. This bonus stacks with normal cover bonuses.",
          rule: "Passive faction ability — always active. No cost or activation required."
        }
      }
    },

    commander_rules: {
      overview:
        "Commanders are the heart of your army. They generate Command Points, play cards, and provide leadership. If your Commander dies, you lose access to cards entirely.",
      rules: [
        "Your Commander deploys with your army and acts as a unit on the battlefield.",
        "Commanders have their own stat line (derived from base_stats): ATK, DEF, HP, MOV, RNG, MOR.",
        "Commanders generate Command Points (CP) equal to their Command stat each turn.",
        "Only your Commander can play cards from your hand. Each card has a CP cost.",
        'Your Commander has a 6" Command Aura: friendly units within this range gain +1 MOR.',
        "If your Commander is destroyed, you immediately lose all remaining CP and can no longer play cards for the rest of the game. Your hand is discarded.",
      ],
      commander_stats_formula: {
        ATK: "Base 3 + (Command / 3, rounded down)",
        DEF: "4 for most commanders; 3 for aggressive, 5 for defensive",
        HP: "HP = base Health / 10, rounded to nearest integer",
        MOV: "Agility value (direct mapping)",
        RNG: "1 (melee) for most; some have ranged based on theme",
        MOR: "9 for most; 10 for elite commanders",
      },
    },

    card_rules: {
      overview:
        "Commander cards are the strategic layer of War Crier. Only Commanders can play cards, and only if they are alive. Cards cost Command Points (CP) to play.",
      card_types: [
        {
          type: "Command",
          color: "#4caf50",
          timing: "Command Phase or Movement Phase",
          description:
            "Movement buffs, redeployment, formation changes. Strategic positioning tools.",
        },
        {
          type: "Tech",
          color: "#2196f3",
          timing: "Any Phase",
          description:
            "Equipment buffs, repairs, engineering effects. Modify unit capabilities.",
        },
        {
          type: "Fragment",
          color: "#9c27b0",
          timing: "Command Phase",
          description:
            "Fragment activations, energy manipulation. Powerful but may trigger instability.",
        },
        {
          type: "Tactical",
          color: "#ff9800",
          timing: "Combat Phase",
          description:
            "Attack modifiers, defensive reactions, combat tricks. The bread and butter of card play.",
        },
      ],
      deck_building_rules: [
        "Your Commander's card pool contains ~20 cards across 4 types. Build a 15-card deck from this pool.",
        "You must include at least 2 cards of each type (Command, Tech, Fragment, Tactical).",
        "No more than 2 copies of any single card in your deck.",
        "As your Commander levels up (campaign mode), they unlock additional cards for their pool.",
      ],
      timing: [
        "Command Phase cards: May be played during your Command Phase. Effect applies immediately or for the duration stated.",
        "Movement Phase cards: May be played during your Movement Phase, before or after moving a unit.",
        "Combat Phase cards: May be played before rolling dice (pre-roll) or after seeing results (post-roll) during your Combat Phase.",
        "Any Phase cards: May be played at any time, including during your opponent's turn as a Reaction. Reactions interrupt the current action.",
        "End Phase cards: May be played during the End Phase, before or after Morale checks.",
        "Each card may only be played once per turn unless it specifically says otherwise.",
        "If your Commander is destroyed, discard your hand immediately. You can no longer play cards for the rest of the game."
      ],
    },

    victory_conditions: {
      overview:
        "Agree on a victory condition before the game begins. All games have a maximum turn count based on battle size. If neither player has won by the final turn, use tiebreaker rules (most enemy points destroyed).",
      modes: [
        {
          name: "Annihilation",
          description:
            "Destroy the enemy Commander. The game ends immediately when a Commander is reduced to 0 HP. If both Commanders die in the same turn, the player with more surviving unit points wins."
        },
        {
          name: "Objective Control",
          description:
            "Place 3 objective markers during setup (one at table center, one in each player's half at least 8\" from edges). At the end of the final turn, the player controlling more objectives wins. A unit controls an objective if it is the closest model to that marker with no enemy model closer."
        },
        {
          name: "Attrition",
          description:
            "The game lasts the full turn count. At the end, total the points cost of all enemy units you destroyed. The player who destroyed more points wins. Commander kills award bonus VP equal to the Commander's Command stat."
        },
        {
          name: "King of the Hill",
          description:
            'One objective in the center of the table. At the end of each turn (starting Turn 2), the player with the most total HP of units within 3\" of the objective scores 1 Victory Point. First to 5 VP wins. If the game ends in a tie, most remaining HP wins.'
        }
      ],
    },

    terrain_rules: {
      overview: "Terrain is placed during the Pre-Game Sequence. Each terrain piece should be classified as one of the types below. Recommended: 6–10 terrain pieces per standard table.",
      types: [
        { name: "Open Ground", effect: "No modifiers. Full movement." },
        { name: "Light Cover", effect: "+1 DEF vs ranged attacks. Normal movement. Models must be touching or within the terrain piece." },
        { name: "Heavy Cover", effect: "+2 DEF vs ranged attacks. Blocks line of sight for models fully behind it. Normal movement." },
        { name: "Difficult Terrain", effect: 'Costs 2\" of movement per 1\" moved. No combat modifiers.' },
        { name: "Impassable Terrain", effect: "Cannot be entered by non-Fly units. Blocks line of sight completely." },
        { name: "Elevated Ground", effect: "+1 ATK die for ranged attacks targeting lower ground. +1 DEF vs melee from units on lower ground." },
        { name: "Dangerous Terrain", effect: 'Any unit entering or starting its turn in dangerous terrain rolls 1d6: on a 1, it takes 1 damage.' },
        { name: "Fragment Deposit", effect: 'Iron Dominion units within 3\" generate +1 Fragment Charge per turn. Veilbound units treat this as Difficult Terrain.' },
        { name: "Spirit Well", effect: 'Veilbound units within 3\" generate +2 Ritual Flow per turn. Iron Dominion units treat this as Dangerous Terrain.' }
      ]
    },

    stat_definitions: {
      ATK: {
        name: "Attack",
        description:
          "Number of d6 rolled when this unit attacks. More dice = more chances to hit.",
      },
      DEF: {
        name: "Defense",
        description:
          "The target number an attacker must roll to score a hit. Higher = harder to damage. Range: 2-6.",
      },
      HP: {
        name: "Hit Points",
        description:
          "Damage this unit can absorb before being destroyed. Each hit deals 1 damage (crits deal 2).",
      },
      MOV: {
        name: "Movement",
        description: "Maximum distance in inches this unit can move per turn.",
      },
      RNG: {
        name: "Range",
        description:
          "Maximum attack range in inches. 1 = melee only (must be Engaged). Higher = ranged attacks.",
      },
      MOR: {
        name: "Morale",
        description:
          "Morale threshold. When damaged, roll 2d6 — if result exceeds MOR, unit becomes Shaken. If it exceeds by 3+, unit Routs (destroyed).",
      },
      special: {
        name: "Special Rules",
        description:
          "Unique abilities or keywords that modify how this unit operates.",
      },
    },

    // ==========================================
    // PRE-GAME SEQUENCE
    // ==========================================
    pre_game: {
      overview: "Before the first turn, both players complete the following steps in order. This ensures a fair and structured start to every game.",
      steps: [
        {
          step: 1,
          name: "Agree on Battle Parameters",
          description: "Both players agree on: points limit (Skirmish/Standard/Epic), victory condition (Annihilation/Objective Control/Attrition/King of the Hill), and any house rules or scenario modifiers."
        },
        {
          step: 2,
          name: "Reveal Army Lists",
          description: "Both players reveal their army lists simultaneously. Army lists are open information — both players should know what they are facing. Verify army lists comply with composition rules."
        },
        {
          step: 3,
          name: "Set Up the Battlefield",
          description: "Place terrain on the table. Recommended: 6–10 terrain pieces for a standard game. Players alternate placing terrain pieces, starting with the player who has fewer total army points. Each terrain piece must be classified (Open, Light Cover, Heavy Cover, Difficult, Impassable, Elevated, Dangerous, Fragment Deposit, or Spirit Well)."
        },
        {
          step: 4,
          name: "Determine Deployment Zones",
          description: "Standard deployment: divide the table into two equal halves along the long edge. Each player's deployment zone is their half, but units must deploy at least 12\" from the center line. Alternative: corner deployment (each player gets a table corner with a 12\" radius deployment zone)."
        },
        {
          step: 5,
          name: "Place Objectives (if applicable)",
          description: "For Objective Control: place 3 objective markers — one at table center, and each player places one in their half (at least 8\" from any table edge). For King of the Hill: place 1 objective at table center."
        },
        {
          step: 6,
          name: "Roll for Initiative",
          description: "Both players roll 1d6. Higher roll chooses whether to deploy first or second. The player who deploys second takes the first turn. Reroll ties."
        },
        {
          step: 7,
          name: "Deploy Armies",
          description: "Players alternate placing units one at a time, starting with the player who chose to deploy first. Commanders must be deployed. Units with the Scout keyword may deploy up to 6\" ahead of the deployment zone. War Machines must be placed in your deployment zone."
        },
        {
          step: 8,
          name: "Build Decks & Draw Opening Hand",
          description: "Each player builds their 15-card deck from their Commander's card pool (if not already done during list building). Shuffle your deck. Draw 5 cards as your opening hand. You may mulligan once: shuffle your hand back into your deck and draw 5 new cards."
        },
        {
          step: 9,
          name: "Begin the Game",
          description: "The player who deployed second takes Turn 1. Play proceeds with alternating turns until the victory condition is met or the maximum turn count is reached."
        }
      ]
    },

    // ==========================================
    // LINE OF SIGHT
    // ==========================================
    line_of_sight: {
      overview: "Line of sight (LOS) determines whether a unit can see — and therefore target — another unit. War Crier uses 'true line of sight' simplified for tabletop play.",
      rules: [
        "A model has line of sight to a target if you can draw an unobstructed straight line from the attacking model's base to any part of the target model's base.",
        "Terrain classified as Heavy Cover or Impassable blocks LOS if the target is fully behind it (no part of base visible).",
        "Elevated models can see over Light Cover and friendly models on lower ground.",
        "Models on the same elevation level can see over other models on the same level — units do NOT block LOS for other units (keeps the game simple and avoids arguments).",
        "If there is any dispute about LOS, the attacking player and defending player each roll 1d6. Higher roll decides. This is final."
      ],
      exceptions: [
        "Units with Fly always have LOS to ground units and vice versa.",
        "Stealth units cannot be targeted by ranged attacks from beyond 6\" until they attack or an ability reveals them.",
        "Sniper-keyword units ignore LOS restrictions from intervening models (but not terrain).",
        "Towering units (War Machines with Towering keyword) can always be seen and targeted from anywhere on the table."
      ]
    },

    // ==========================================
    // MOVEMENT RULES
    // ==========================================
    movement: {
      overview: "Movement is measured in inches. Each unit has a MOV stat representing how far it can move during the Movement Phase. Movement is the primary way to control the battlefield — positioning determines your advantages in combat.",
      core_rules: [
        "Each unit may move up to its MOV stat in inches during the Movement Phase. Movement is optional — a unit can stay still.",
        "Movement is measured from any part of the model's base to any part of the model's base (nearest edge to nearest edge for simplicity).",
        "A unit must end its movement with at least 1\" gap between its base and any friendly model's base. Models cannot overlap.",
        "A unit may move through friendly models freely but cannot move through enemy models (unless it has Phase or Fly).",
        "A unit that enters within 1\" of an enemy model becomes Engaged and must stop moving immediately.",
        "After completing movement, the controlling player sets the model's facing direction."
      ],
      difficult_terrain: {
        description: "Moving through Difficult Terrain costs extra movement. For every 1\" moved within Difficult Terrain, the unit spends 2\" of its MOV allowance.",
        examples: "Rubble, dense forest, shallow water, wreckage, Spirit Wells (Veilbound terrain).",
        rule: "A unit with MOV 5 entering Difficult Terrain effectively moves at 2.5\" through it. Units with the All-Terrain keyword ignore Difficult Terrain penalties entirely."
      },
      charging: {
        description: "A Charge is a special movement where a unit rushes directly at an enemy to engage in melee.",
        rules: [
          "To Charge, a unit must move at least 4\" in a straight line directly toward an enemy model and end within 1\" of it (becoming Engaged).",
          "A Charging unit gains +1 ATK die on its melee attack this turn.",
          "A unit cannot Charge if it starts its Movement Phase already Engaged.",
          "A Charge must be declared at the start of the unit's activation during the Movement Phase.",
          "If the charging unit cannot reach within 1\" of the target, the Charge fails — the unit moves its full MOV toward the target but gains no Charge bonus.",
          "Units with Fly may Charge from any direction, ignoring intervening terrain and models."
        ]
      },
      special_movement: [
        "Fly: The unit ignores all terrain during movement and may move over other models. It still cannot end overlapping another model.",
        "Phase: The unit may move through enemy models and terrain features. It does not become Engaged when passing through enemies — only when it ends within 1\".",
        "Scout (Deployment): During setup, Scout units may deploy up to 6\" ahead of the deployment zone boundary.",
        "Disengage: An Engaged unit may use its entire Movement Phase to move away from all enemies. It must move at least 1\" away from all enemy models. It cannot attack this turn.",
        "Consolidate: After destroying a melee opponent, a unit may make a free 2\" move in any direction.",
        "Fall Back: A Shaken unit may voluntarily Fall Back — it moves its full MOV directly away from the nearest enemy. It cannot attack this turn.",
        "Climbing: Moving up Elevated terrain costs double movement (same as Difficult Terrain). A unit must have enough remaining MOV to complete the climb.",
        "Jumping Down: A unit may jump down from Elevated terrain for free (no extra cost), but must roll 1d6: on a 1, the unit suffers 1 damage."
      ],
      war_machine_movement: "War Machines with the Immobile keyword cannot move and attack in the same turn — they must choose one. Other War Machines move normally using their MOV stat but cannot Charge (too slow to build momentum)."
    },

    // ==========================================
    // FACING & FLANKING
    // ==========================================
    facing: {
      overview: "Every model has a facing — the direction its front is pointing. This matters for flanking and rear attacks. Facing is determined by the miniature's facing direction or, if using tokens, by a small arrow or mark on the base.",
      rules: [
        "A model's front arc is a 180° arc centered on the direction the model is facing.",
        "The rear arc is the opposite 180° behind the model.",
        "When a model is attacked from within its front arc, no facing modifier applies.",
        "When a model is attacked from outside its front arc but not fully in the rear (the side zones), it is a Flank attack: +1 ATK die.",
        "When a model is attacked from fully within the rear arc, it is a Rear attack: +2 ATK dice.",
        "After a model completes its movement, the controlling player may freely choose its facing direction.",
        "Units in Honor Stance (Veilbound) cannot be flanked — all attacks count as frontal.",
        "Units do not change facing when attacked — they maintain the facing set during their last movement."
      ]
    },

    // ==========================================
    // ENGAGEMENT & MELEE
    // ==========================================
    engagement: {
      overview: "Engagement is the state of being locked in close combat. Engaged units fight in melee and cannot easily escape.",
      rules: [
        "A unit becomes Engaged when it moves within 1\" of an enemy model, or when an enemy moves within 1\" of it.",
        "Engaged units MUST direct their melee attacks at units they are Engaged with.",
        "Engaged units cannot make ranged attacks.",
        "Multiple friendly units can Engage a single enemy. Each attacks separately during the Combat Phase.",
        "A unit Engaged with multiple enemies must choose one to attack. It does not split attacks.",
        "To Disengage: during your Movement Phase, declare a Disengage. The unit cannot attack this turn and uses its full movement to move away. It must move at least 1\" away from all enemy models.",
        "If a unit destroys its melee opponent, it may Consolidate: make an immediate free move of up to 2\" in any direction. If this brings it within 1\" of another enemy, it becomes Engaged with that enemy (but does not attack again this turn)."
      ]
    },

    // ==========================================
    // CHALLENGES (DUELS)
    // ==========================================
    challenges: {
      overview: "Some units and cards can issue Challenges — formal one-on-one duels that temporarily separate two combatants from the surrounding melee.",
      rules: [
        "A Challenge may be issued by a Specialist or Commander when they are Engaged with an enemy Specialist or Commander.",
        "The challenged unit must accept unless a card allows refusal. If refused, the challenging unit gains +2 ATK dice against the refusing unit for the rest of the battle.",
        "During a Challenge, both units attack each other simultaneously — both roll their ATK dice at the same time. Apply damage to both.",
        "Other units cannot target or assist either combatant in a Challenge for that combat round.",
        "A Challenge lasts one combat round. If both units survive, the Challenge ends and normal melee resumes.",
        "Cards that reference 'Challenge' or 'Duel' apply their bonuses during the Challenge combat round."
      ]
    },

    // ==========================================
    // MORALE DETAILED RULES
    // ==========================================
    morale: {
      overview: "Morale represents a unit's willingness to fight. When units take damage, they may falter or flee. Commanders inspire nearby troops to hold the line.",
      rules: [
        "Any unit that lost HP during the current turn must make a Morale Check in the End Phase: roll 2d6.",
        "If the result EXCEEDS the unit's MOR stat, the unit becomes Shaken.",
        "If the result exceeds MOR by 3 or more, the unit Routs and is immediately removed from play.",
        "Shaken: The unit suffers −1 ATK die (minimum 1 die) on its next turn. Shaken does NOT stack — a Shaken unit that fails another Morale check does not get −2; it stays at −1.",
        "Rally: During the End Phase, a Shaken unit that was NOT damaged this turn may attempt to Rally. Roll 2d6: if the result is ≤ MOR, remove Shaken status.",
        "Units with Fearless automatically pass all Morale checks. They can never become Shaken or Rout.",
        "Commander's Aura: Friendly units within 6\" of their Commander gain +1 MOR for Morale checks.",
        "If your Commander is destroyed, all friendly units must immediately make a Morale check at −2 MOR (this check happens even if they weren't damaged this turn)."
      ]
    },

    // ==========================================
    // KEYWORDS GLOSSARY
    // ==========================================
    keywords: {
      overview: "Many units have special Keywords that grant them unique abilities. Here is the complete reference for all Keywords used in War Crier.",
      entries: [
        { name: "Grid Node", description: "This unit counts for Iron Dominion Grid Cohesion adjacency. Most ID units have this." },
        { name: "Grid Anchor", description: "This unit counts as 2 units for Grid Cohesion adjacency. War Machines only." },
        { name: "Fearless", description: "Automatically passes all Morale checks. Cannot be Shaken or Routed." },
        { name: "Charge", description: "Gains +1 ATK die when it moves 4\"+ in a straight line directly into melee this turn." },
        { name: "Blast", description: "Attacks hit the target and all units (friend or foe) within the stated radius." },
        { name: "Siege", description: "Deals double damage to terrain pieces and fortifications." },
        { name: "Stealth", description: "Cannot be targeted by ranged attacks from more than 6\" away. Lost when the unit attacks or an ability reveals it." },
        { name: "Fly", description: "Ignores terrain during movement. May move over other models. Has LOS to all ground units." },
        { name: "Scout", description: "May deploy up to 6\" ahead of the deployment zone during setup." },
        { name: "Spotter", description: "Grants +1 ATK die to friendly Artillery units targeting the same enemy this unit can see." },
        { name: "Bodyguard", description: "If an adjacent friendly Commander or Specialist is targeted by an attack, this unit may redirect the attack to itself instead." },
        { name: "Immobile", description: "Cannot move and attack in the same turn. Must choose one." },
        { name: "Towering", description: "Can be targeted by Artillery from anywhere on the table regardless of LOS." },
        { name: "Unstable", description: "At the start of each turn, roll 1d6. On a 1, this unit suffers damage as described on its stat line." },
        { name: "Phase", description: "May move through enemy models and terrain. Does not become Engaged by moving through enemies." },
        { name: "Sniper", description: "May target enemy Commanders and Specialists even if other enemy units are closer. Ignores intervening models for LOS." },
        { name: "Fragment Infused", description: "Gains +1 ATK die when Fragment Charges are spent on abilities within 3\" of this unit." },
        { name: "Fragment Amplifier", description: "Friendly units within 3\" gain +1 to fragment activation rolls." },
        { name: "Repair", description: "During the End Phase, restore 1 HP to an adjacent friendly unit." },
        { name: "Heal", description: "During the End Phase, restore 1 HP to an adjacent friendly unit (organic version of Repair)." },
        { name: "All-Terrain", description: "Ignores Difficult Terrain penalties." },
        { name: "Sharpshot", description: "Critical hits occur on rolls of 5+ instead of only on 6." },
        { name: "Double Strike", description: "May attack twice in a single Combat Phase." },
        { name: "Terror Aura", description: "Enemy units within 3\" suffer −1 MOR on Morale checks." },
        { name: "Guardian", description: "When attacked in melee, this unit counterattacks at full ATK before damage is applied." },
        { name: "Ritual Flow", description: "This unit generates the stated amount of Ritual Flow for the Veilbound Flow Pool each Command Phase." }
      ]
    },

    // ==========================================
    // SCENARIOS & MISSIONS
    // ==========================================
    scenarios: {
      overview: "Beyond standard victory conditions, War Crier includes narrative scenarios that create asymmetric, thematic battles. Use these for variety or as part of a campaign.",
      missions: [
        {
          name: "Breakthrough",
          type: "Asymmetric",
          description: "The Attacker must move at least 3 units across the table and off the Defender's table edge. The Defender must prevent this.",
          special_rules: "The Attacker gets +1 to Initiative roll. The Defender may place 2 extra terrain pieces (Heavy Cover or Difficult Terrain). The game lasts 6 turns. The Attacker wins if 3+ units exit via the Defender's edge.",
          recommended_size: "Standard (200–300 pts)"
        },
        {
          name: "Relic Hunt",
          type: "Symmetric",
          description: "5 Relic tokens are placed across the table. Units can pick up relics by moving into contact (free action). The player holding the most relics at the end of Turn 6 wins.",
          special_rules: "A unit carrying a relic suffers −2\" MOV. If destroyed, the relic is dropped at its position. Commanders may carry 2 relics. Relics cannot be placed in your deployment zone.",
          recommended_size: "Standard (200–300 pts)"
        },
        {
          name: "Assassination",
          type: "Asymmetric",
          description: "One player is the Assassin; the other is the Protector. The Assassin must destroy the Protector's Commander. The Protector must keep their Commander alive for 5 turns.",
          special_rules: "The Protector gets 25% more points. The Assassin deploys second and goes first. The Protector's Commander cannot be placed within 6\" of any table edge during deployment.",
          recommended_size: "Skirmish (50–100 pts)"
        },
        {
          name: "Scorched Earth",
          type: "Symmetric",
          description: "Each player places 2 objective markers in their opponent's half of the table. A unit can destroy an enemy objective by spending a full turn in contact with it (no movement or attacks). The first player to destroy both enemy objectives wins.",
          special_rules: "Destroying an objective awards 50 bonus XP in campaign mode. Objectives must be at least 6\" apart and at least 6\" from table edges.",
          recommended_size: "Standard (200–300 pts)"
        },
        {
          name: "Tides of War",
          type: "Escalation",
          description: "Both armies start with only their Commander and 50 points of units on the table. At the start of Turn 2, 3, and 4, each player may deploy up to 100 additional points of units from reserve onto their table edge.",
          special_rules: "Reserve units deploy along your table edge during your Command Phase. The game lasts 6 turns. Victory by Attrition (most enemy points destroyed). Fragment effects are amplified: +1 to all fragment activation rolls.",
          recommended_size: "Epic (500+ pts)"
        },
        {
          name: "Last Stand",
          type: "Asymmetric / Cooperative",
          description: "One player (the Defender) holds a fortified position at table center with 150 points. The other (the Horde) attacks with 300 points but deploys from all table edges in waves.",
          special_rules: "The Defender sets up first, placing 4 Barricade tokens. The Horde deploys 1/3 of their army each on Turns 1, 3, and 5. The Defender wins if they hold at least 1 unit alive at center after Turn 7. The Horde wins if all Defender units are destroyed.",
          recommended_size: "Standard/Epic"
        }
      ]
    },

  },
  card_library: {
    // ===================== COMMAND CARDS =====================
    "Strategic Advance": {
      type: "command",
      cp: 2,
      timing: "Movement Phase",
      effect:
        'Choose up to 3 friendly units within 6" of your Commander. They gain +2" MOV this turn.',
    },
    "Coordinated Assault": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect:
        'All friendly units within 6" of Commander that attack the same target this turn gain +1 ATK die each.',
    },
    "Swift Advance": {
      type: "command",
      cp: 1,
      timing: "Movement Phase",
      effect:
        'One friendly unit within 8" gains +3" MOV this turn. That unit may run and still shoot.',
    },
    "Flanking Maneuver": {
      type: "command",
      cp: 2,
      timing: "Movement Phase",
      effect:
        'Choose 1 friendly unit within 8". Remove it from the table and redeploy it within 6" of any table edge.',
    },
    "Fragment Command": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Gain 2 Fragment Charges. All friendly units within 6" may use Fragment abilities this turn without instability risk.',
    },
    "War Machine Command": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect:
        'One friendly War Machine within 12" may activate twice this turn (move + attack, or attack + attack).',
    },
    "Heavy Assault Order": {
      type: "command",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "One friendly War Machine gains +2 ATK dice and ignores cover bonuses this turn.",
    },
    "Hidden Deployment": {
      type: "command",
      cp: 2,
      timing: "Movement Phase",
      effect:
        'Choose 1 friendly Stealth unit. It may redeploy anywhere on the table more than 6" from enemies. It gains Stealth again.',
    },
    "Sabotage Order": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Choose 1 enemy unit within 12" of a friendly Stealth unit. That enemy suffers -2 ATK dice next attack.',
    },
    "Fortification Order": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Place 2 Barricade tokens (Light Cover) within 4" of your Commander.',
    },
    "Engineer Deployment": {
      type: "command",
      cp: 1,
      timing: "Movement Phase",
      effect:
        "One friendly Support unit may act immediately (move + use ability) out of normal activation order.",
    },
    "Charge Order": {
      type: "command",
      cp: 2,
      timing: "Movement Phase",
      effect:
        'One friendly melee unit within 8" gains +3" MOV and +1 ATK die if it charges this turn.',
    },
    "Brutal Assault": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect:
        "One friendly unit gains +3 ATK dice this attack. That unit cannot benefit from Grid Cohesion this turn.",
    },
    "Aether Command": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect:
        'All friendly units within 6" gain +1 to all Fragment activation rolls this turn. Generate 1 Fragment Charge.',
    },
    "Artillery Barrage Order": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect:
        "All friendly Artillery units may attack the same target this turn with +1 ATK die each and combined Blast radius.",
    },
    "Siege Command": {
      type: "command",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "One friendly unit gains Siege keyword this turn. Double damage vs terrain and fortifications.",
    },
    "Defensive Formation": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect:
        'All friendly units within 4" gain +1 DEF until end of turn. They cannot move this turn.',
    },
    "Hold the Line": {
      type: "command",
      cp: 1,
      timing: "Movement Phase",
      effect:
        'All friendly units within 6" automatically pass Morale checks this turn. They gain +1 DEF but cannot advance.',
    },
    "Rapid Deployment": {
      type: "command",
      cp: 2,
      timing: "Movement Phase",
      effect:
        'One friendly unit in reserve may deploy immediately within 6" of your Commander.',
    },
    "Machine Command": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect:
        'All friendly War Machines within 12" gain +1 ATK die and auto-pass Malfunction rolls this turn.',
    },
    "Coordinated Machines": {
      type: "command",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "Two friendly War Machines may combine their attacks: add their ATK dice together and resolve as one attack.",
    },
    "Adaptive Command": {
      type: "command",
      cp: 1,
      timing: "Command Phase",
      effect:
        "Draw 1 extra card this turn. You may discard 1 card to generate 1 CP.",
    },
    "Flexible Orders": {
      type: "command",
      cp: 2,
      timing: "Any Phase",
      effect:
        'Choose 1 friendly unit within 8". It may immediately take 1 action (move OR attack OR use ability).',
    },
    "Shadow Phalanx": {
      type: "command",
      cp: 2,
      timing: "Movement Phase",
      effect:
        'Up to 3 friendly units within 4" of each other gain Phase this turn (may move through enemy units).',
    },
    "Formation Command": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect:
        'All friendly units within 6" of Commander gain +1 DEF and +1 MOR this turn if in Stance.',
    },
    "Duel Challenge": {
      type: "command",
      cp: 1,
      timing: "Combat Phase",
      effect:
        'Issue a Challenge to an enemy Specialist or Commander within 6". Must be accepted. Winner deals double damage.',
    },
    "Starfall Strike": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect:
        'One friendly unit within 8" makes an attack with +3 ATK dice. Crits on 5+ this attack.',
    },
    "Ascendant Guard": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Your Commander and all units within 3" gain +2 DEF this turn. They cannot attack this turn.',
    },
    "Ritual Surge": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect:
        "Generate 5 Ritual Flow immediately. All friendly units generate +1 Flow this turn.",
    },
    Inkwave: {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect:
        'All enemy units within 4" of Commander suffer -1 ATK die and -2 MOV next turn. Area becomes Difficult Terrain.',
    },
    "Flame Crescent": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect:
        'Commander makes a sweeping attack hitting all units (friend and foe) within 3". Roll 5 ATK dice vs each target.',
    },
    "Momentum Surge": {
      type: "command",
      cp: 2,
      timing: "Movement Phase",
      effect:
        'All friendly Cavalry within 8" gain +3" MOV and +1 ATK die on charges this turn.',
    },
    "Spirit Fang Charge": {
      type: "command",
      cp: 2,
      timing: "Movement Phase",
      effect:
        'One friendly pack unit within 6" may charge and gains +2 ATK dice. If it destroys the target, another pack unit within 3" may immediately charge.',
    },
    "Pack Command": {
      type: "command",
      cp: 1,
      timing: "Command Phase",
      effect:
        'All Spirit Wolf units within 8" gain +1 ATK die and may move 2" as a free action.',
    },
    "Celestial Bow": {
      type: "command",
      cp: 2,
      timing: "Combat Phase",
      effect:
        'Commander makes a ranged attack at 24" range with 4 ATK dice. This attack ignores cover and Stealth.',
    },
    "Lotus Bloom": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: 'All friendly units within 6" heal 1 HP. Generate 3 Ritual Flow.',
    },
    "Phantom Strike": {
      type: "command",
      cp: 2,
      timing: "Combat Phase",
      effect:
        'Commander teleports up to 8" and makes an attack with +2 ATK dice. Returns to original position after.',
    },
    Inkstep: {
      type: "command",
      cp: 1,
      timing: "Movement Phase",
      effect:
        'Commander or 1 friendly unit within 6" may teleport up to 4" in any direction, ignoring terrain and engagement.',
    },
    "Starfall Volley": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect:
        'Choose a point within 18". All enemy units within 3" of that point suffer a 4-dice attack. Crits generate 1 Ritual Flow each.',
    },

    // ===================== TECH CARDS =====================
    "Gear Synchronization": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'All friendly units within 4" gain +1 ATK die this turn. Grid Cohesion bonuses are doubled for these units.',
    },
    "Precision Calibration": {
      type: "tech",
      cp: 1,
      timing: "Combat Phase",
      effect:
        "One friendly unit may reroll up to 2 missed attack dice this attack.",
    },
    "Speed Boost Module": {
      type: "tech",
      cp: 1,
      timing: "Movement Phase",
      effect:
        'One friendly unit within 6" gains +3" MOV this turn. If it\'s a War Machine, +4" instead.',
    },
    "Experimental Protocol": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        "One friendly unit gains +2 ATK dice and +1 DEF until end of turn. Roll d6: on a 1, that unit takes 1 damage.",
    },
    "Unstable Enhancement": {
      type: "tech",
      cp: 1,
      timing: "Combat Phase",
      effect:
        "One friendly unit gains +3 ATK dice for one attack. After resolving, that unit takes 1 damage from instability.",
    },
    "Titan Maintenance": {
      type: "tech",
      cp: 2,
      timing: "End Phase",
      effect:
        "One friendly War Machine heals 3 HP. Remove all negative status effects from it.",
    },
    "Overclock Protocol": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        "One friendly War Machine gains Double Strike this turn (attacks twice). It takes 1 damage at end of turn from overheating.",
    },
    "Armor Enhancement": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect: "One friendly unit gains +2 DEF until end of turn.",
    },
    "Trap Mechanism": {
      type: "tech",
      cp: 1,
      timing: "Movement Phase",
      effect:
        'Place 2 Trap tokens within 4" of a friendly Support unit. Enemy units stepping on them take 1 damage and lose 2" MOV.',
    },
    "Stealth Field": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Up to 2 friendly units within 6" gain Stealth until they attack or are within 3" of an enemy.',
    },
    "Rapid Construction": {
      type: "tech",
      cp: 1,
      timing: "Movement Phase",
      effect:
        'Place 3 Barricade tokens (Light Cover) within 6" of a friendly Support unit.',
    },
    "Repair Protocol": {
      type: "tech",
      cp: 1,
      timing: "End Phase",
      effect: 'Heal 2 HP to one friendly unit within 6" of a Support unit.',
    },
    "Defensive Enhancement": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect:
        'All friendly units within 4" of a Barricade gain +1 DEF this turn.',
    },
    "Melee Enhancement": {
      type: "tech",
      cp: 1,
      timing: "Combat Phase",
      effect:
        "One friendly melee unit gains +2 ATK dice and crits on 5+ this attack.",
    },
    "Adrenaline Surge": {
      type: "tech",
      cp: 2,
      timing: "Movement Phase",
      effect:
        'One friendly unit gains +4" MOV and +1 ATK die this turn. After combat, it suffers -1 DEF next turn.',
    },
    "Fragment Attunement": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect:
        'All Fragment activations by friendly units within 6" automatically succeed this turn (no instability roll).',
    },
    "Aether Enhancement": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        "One friendly unit gains Fragment Infused (+1 ATK from fragment) permanently until end of game.",
    },
    "Enhanced Ammunition": {
      type: "tech",
      cp: 1,
      timing: "Combat Phase",
      effect:
        "One friendly ranged unit gains +1 ATK die and Armor Piercing (reduce target DEF by 1) this attack.",
    },
    "Range Extension": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect: 'One friendly Artillery unit gains +6" RNG this turn.',
    },
    "Reload Optimization": {
      type: "tech",
      cp: 1,
      timing: "Combat Phase",
      effect:
        "One friendly Artillery unit that already attacked may attack again immediately with -1 ATK die.",
    },
    "Shield Protocol": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'One friendly unit gains Shield Wall: all friendlies within 2" gain +1 DEF vs ranged this turn.',
    },
    "Quick Construction": {
      type: "tech",
      cp: 1,
      timing: "Movement Phase",
      effect:
        "One friendly Support unit may use its construction ability twice this turn.",
    },
    "Prototype Testing": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'One friendly unit gains a random enhancement: roll d6. 1-2: +1 ATK, 3-4: +1 DEF, 5-6: +2" MOV. Lasts 2 turns.',
    },
    "Emergency Repair": {
      type: "tech",
      cp: 1,
      timing: "Any Phase",
      effect:
        'Immediately heal 2 HP on one friendly unit within 6" of Commander. May be played as a reaction.',
    },
    "Machine Enhancement": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'All friendly War Machines within 8" gain +1 ATK die and +1 DEF this turn.',
    },
    "Efficiency Protocol": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect:
        "Reduce the CP cost of the next card you play this turn by 1 (minimum 0).",
    },
    "Repair Link": {
      type: "tech",
      cp: 2,
      timing: "End Phase",
      effect:
        'All friendly War Machines within 8" heal 1 HP. If adjacent to a Support unit, heal 2 HP instead.',
    },
    "Universal Enhancement": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Choose all friendly units within 4". They gain +1 to the stat of your choice (ATK, DEF, or MOV) this turn.',
    },
    "Balanced Protocol": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect:
        'One friendly unit gains +1 ATK die, +1 DEF, and +1" MOV this turn.',
    },
    "Momentum Disrupt": {
      type: "tech",
      cp: 2,
      timing: "Any Phase",
      effect:
        "Cancel one enemy Charge bonus. The charging unit moves normally but gains no ATK bonus.",
    },
    "Shield Wall Protocol": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'All friendly units within 3" of Commander gain +2 DEF vs melee this turn. They cannot move.',
    },
    "Veil Ward": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect:
        "One friendly unit gains Phase (may move through enemies) and +1 DEF this turn.",
    },
    "Spirit Bind": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Bond 2 friendly units within 6" of each other: they share damage equally (round up) this turn.',
    },
    "Celestial Shield": {
      type: "tech",
      cp: 2,
      timing: "Any Phase",
      effect:
        "One friendly unit negates all damage from one attack. May be played as a reaction.",
    },
    "Spirit Barrier": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Create a Spirit Wall within 4" of Commander: counts as Heavy Cover and blocks enemy movement for 2 turns.',
    },
    "Flow Channeling": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect:
        "Transfer up to 5 Ritual Flow from one part of the pool to generate CP: every 2 Flow = 1 CP.",
    },
    "Veil Sigil": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Place a Sigil token within 6". Enemy units within 2" of the Sigil suffer -1 ATK die. Lasts 2 turns.',
    },
    "Spirit Bond Boost": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect: 'All friendly units within 4" generate +2 Ritual Flow this turn.',
    },
    "Veil Step": {
      type: "tech",
      cp: 1,
      timing: "Movement Phase",
      effect:
        'One friendly unit may Phase through terrain and enemies, gaining +2" MOV this turn.',
    },
    "Fire Enhancement": {
      type: "tech",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "One friendly unit's attacks deal +1 damage per hit this turn. Hits create burning terrain (1 damage to units entering).",
    },
    "Shadow Bind": {
      type: "tech",
      cp: 2,
      timing: "Any Phase",
      effect:
        'One enemy unit within 8" cannot move next turn. Roll d6: on 4+, it also cannot attack.',
    },
    "Dual Stance Mastery": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect:
        "One friendly unit with Stance gains BOTH Honor and Revelation bonuses this turn instead of choosing one.",
    },
    "Spirit Arrow": {
      type: "tech",
      cp: 1,
      timing: "Combat Phase",
      effect:
        'One friendly ranged attack gains Phase Arrows (ignores cover) and +2" RNG.',
    },
    "Veil Sight": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect:
        'Reveal all Stealth units within 12" of Commander. Friendly ranged units gain +1 ATK die vs revealed units.',
    },
    "Momentum Boost": {
      type: "tech",
      cp: 1,
      timing: "Movement Phase",
      effect:
        'All friendly Cavalry within 6" gain +2" MOV. Charge bonuses are +1 ATK die higher this turn.',
    },
    "Veil Shroud": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Commander and all units within 3" gain Stealth this turn. Enemies can only target them from within 6".',
    },
    "Dual Momentum": {
      type: "tech",
      cp: 2,
      timing: "Movement Phase",
      effect:
        "One friendly unit may move twice this turn (full MOV each time). Cannot attack on the turn it double-moves.",
    },
    "Ritual Burst": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Spend 5 Ritual Flow: all friendly units within 4" gain +2 ATK dice this turn.',
    },
    "Veil Aura": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect:
        'Friendly units within 4" of Commander gain +1 DEF vs ranged attacks this turn.',
    },
    "Veil Phantasm": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Create a Phantom copy of one friendly unit within 6". The copy has 1 HP and the same ATK/DEF. Lasts 1 turn.',
    },
    "Flow Link": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect:
        'Link 2 friendly units within 8". They share Ritual Flow generation and both gain +1 ATK die this turn.',
    },

    // ===================== FRAGMENT CARDS =====================
    "Stable Core Activation": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        "Activate a Fragment with no instability risk. All friendly units within 4\" gain the Fragment's buff at full power.",
    },
    "Aether Pulse Activation": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Activate a Fragment and pulse its energy: all friendly units within 6" gain +1 ATK die this turn. Risk: roll d6, on 1 = 1 damage to Commander.',
    },
    "Fragment Surge": {
      type: "fragment",
      cp: 3,
      timing: "Command Phase",
      effect:
        "Activate ALL Fragments in your army simultaneously. Each applies its effect. Roll d6 per Fragment: on 1, instability deals 1 damage to nearest unit.",
    },
    "Reality Manipulation": {
      type: "fragment",
      cp: 3,
      timing: "Any Phase",
      effect:
        'Choose one terrain piece within 12" of Commander. Move it up to 6" in any direction or change its type (e.g., cover → open).',
    },
    "Chaos Tap": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Drain Fragment energy recklessly: gain 4 Fragment Charges but all friendly units within 3" take 1 damage.',
    },
    "Overclock Node Activation": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        'One friendly War Machine gains +2 ATK dice and +2" MOV this turn. At end of turn, roll d6: on 1-2, it takes 2 damage.',
    },
    "Reality Lens Activation": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Reveal all hidden/stealth units within 12". Your Commander gains true sight — ignore cover and Stealth for targeting this turn.',
    },
    "Disruption Pulse": {
      type: "fragment",
      cp: 2,
      timing: "Any Phase",
      effect:
        'All enemy units within 4" of a Fragment source lose 1 ATK die and suffer -2" MOV next turn.',
    },
    "Steam Core Activation": {
      type: "fragment",
      cp: 1,
      timing: "Command Phase",
      effect:
        'Generate 2 Fragment Charges. One friendly unit within 4" heals 1 HP.',
    },
    "Infused Cog Activation": {
      type: "fragment",
      cp: 1,
      timing: "Combat Phase",
      effect:
        "One friendly melee unit gains +1 ATK die for the rest of the game. Roll d6: on 1, it takes 1 damage now.",
    },
    "Aether Pulse": {
      type: "fragment",
      cp: 2,
      timing: "Combat Phase",
      effect:
        'All friendly units within 6" gain +1 ATK die this turn. Fragment energy ripples: enemies within 3" suffer -1 DEF.',
    },
    "Fragment Harmony": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        "All Fragment effects this turn are doubled in potency. No instability rolls this turn.",
    },
    "Resonance Field": {
      type: "fragment",
      cp: 3,
      timing: "Command Phase",
      effect:
        'Create a 4" radius zone centered on Commander. All friendlies inside gain +1 ATK, +1 DEF, and auto-pass instability. Lasts 2 turns.',
    },
    "Arcane Spark Activation": {
      type: "fragment",
      cp: 1,
      timing: "Combat Phase",
      effect:
        "One friendly Artillery unit gains +2 ATK dice this attack. The shot leaves burning terrain at impact point (1 damage to enter).",
    },
    "Experimental Node Activation": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Activate an experimental Fragment: roll d6. 1-2: nothing. 3-4: +2 ATK to one unit. 5-6: +2 ATK and +1 DEF to all within 4".',
    },
    "Gear Infusion": {
      type: "fragment",
      cp: 1,
      timing: "Command Phase",
      effect:
        "Permanently give one friendly unit Fragment Infused keyword. It gains +1 ATK die when Fragment Charges are spent nearby.",
    },
    "Core Fragment Activation": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        "Activate core Fragment: all friendly units gain +1 ATK die and +1 DEF this turn. Stable — no instability risk.",
    },
    "Adaptive Energy": {
      type: "fragment",
      cp: 1,
      timing: "Any Phase",
      effect:
        "Convert 2 Fragment Charges into either: 2 CP, or heal 2 HP on one unit, or +2 ATK dice on one attack.",
    },
    "Spirit Lance Charge": {
      type: "fragment",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "Spend 3 Ritual Flow: one friendly unit's melee attack gains +3 ATK dice and Phase (strikes ignore DEF from cover).",
    },
    "Lunar Blade Activation": {
      type: "fragment",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "Commander's next attack gains +3 ATK dice and crits on 4+. Generates 2 Ritual Flow per crit scored.",
    },
    "Phantom Edge": {
      type: "fragment",
      cp: 1,
      timing: "Combat Phase",
      effect:
        "One friendly unit's melee attack gains Phase — the attack ignores DEF bonuses from cover and Shield Wall.",
    },
    "Starlight Cascade": {
      type: "fragment",
      cp: 3,
      timing: "Combat Phase",
      effect:
        'Spend 5 Ritual Flow: Attack all enemy units within 4" of Commander with 3 ATK dice each. Crits generate 1 Flow.',
    },
    "Flow Amplification": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        "Double all Ritual Flow generated this turn. Flow Pool maximum is temporarily raised by 10.",
    },
    "Ritual Cascade": {
      type: "fragment",
      cp: 3,
      timing: "Command Phase",
      effect:
        "Spend 10 Ritual Flow: all friendly units gain +2 ATK dice and +1 DEF this turn. If Flow Pool was at a threshold, also heal all friendlies 1 HP.",
    },
    "Bond Enhancement": {
      type: "fragment",
      cp: 1,
      timing: "Command Phase",
      effect:
        "All Spirit Bond effects between linked units are doubled this turn. Linked units generate +1 Flow each.",
    },
    "Ink Manifestation": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Manifest an Ink Spirit: place a spirit token within 6". It has ATK 3, DEF 3, HP 2. Acts on your turn. Lasts 2 turns.',
    },
    "Sigil Cascade": {
      type: "fragment",
      cp: 3,
      timing: "Command Phase",
      effect:
        'All active Sigils on the battlefield pulse: enemy units within 2" of any Sigil take 1 damage and suffer -1 ATK die next turn.',
    },
    "Cosmic Flame Activation": {
      type: "fragment",
      cp: 3,
      timing: "Combat Phase",
      effect:
        "Commander's attacks this turn deal +2 damage per hit and create burning terrain. All units (friend/foe) within 2\" take 1 damage.",
    },
    "Spirit Bond Activation": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Bond all Spirit Wolf units within 8": they share damage equally and gain +1 ATK die each.',
    },
    "Starlight Arrow Activation": {
      type: "fragment",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "Commander's ranged attack this turn gains +4 ATK dice, ignores cover, and crits deal 3 damage instead of 2.",
    },
    "Precision Enhancement": {
      type: "fragment",
      cp: 1,
      timing: "Combat Phase",
      effect:
        "One friendly ranged unit may reroll ALL missed dice this attack. Crits on 5+ this attack.",
    },
    "Lotus Energy Activation": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Heal all friendly units within 6" for 1 HP. Generate 3 Ritual Flow. Units healed gain +1 DEF this turn.',
    },
    "Debuff Enhancement": {
      type: "fragment",
      cp: 1,
      timing: "Command Phase",
      effect:
        'All debuffs currently on enemy units within 8" have their duration extended by 1 turn. Apply one extra -1 ATK die to one enemy.',
    },
    "Shadow Manifestation": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        "Create a shadow clone of Commander within 8\". The clone has half Commander's stats and lasts 1 turn. Enemies must target the clone first.",
    },
    "Ink Current Activation": {
      type: "fragment",
      cp: 2,
      timing: "Movement Phase",
      effect:
        'Create an Ink Current on the battlefield (6" line). Friendly units crossing it gain +2" MOV. Enemy units crossing it lose 2" MOV.',
    },
    "Flow Pulse": {
      type: "fragment",
      cp: 1,
      timing: "Command Phase",
      effect:
        "Generate 3 Ritual Flow immediately. If Flow Pool is at a threshold, also gain 1 CP.",
    },
    "Star Energy Activation": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        'All friendly units within 6" gain ranged attacks at RNG 8" with 2 ATK dice this turn (in addition to normal attacks).',
    },
    "Illusion Weave": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect:
        'Create 3 Illusion tokens within 8". They look like units to the enemy. Enemies must target them before real units unless within 4". Lasts 1 turn.',
    },

    // ===================== TACTICAL CARDS =====================
    "Calculated Strike": {
      type: "tactical",
      cp: 1,
      timing: "Combat Phase",
      effect:
        "One friendly unit may reroll all missed attack dice once. If all dice hit, deal +1 bonus damage.",
    },
    "Lightning Strike": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "One friendly unit may attack twice this turn. The second attack has -1 ATK die.",
    },
    "Calculated Risk": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "One friendly unit gains +4 ATK dice this attack. If any die rolls a 1, that unit takes 1 damage per 1 rolled.",
    },
    "Crushing Advance": {
      type: "tactical",
      cp: 2,
      timing: "Movement Phase",
      effect:
        "One friendly War Machine may move its full MOV and attack in the same turn, ignoring the Immobile restriction.",
    },
    "Ambush Strike": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "One friendly Stealth unit attacks with +3 ATK dice and crits on 5+. That unit loses Stealth after.",
    },
    "Defensive Posture": {
      type: "tactical",
      cp: 1,
      timing: "Any Phase",
      effect:
        "One friendly unit gains +2 DEF until its next activation. It cannot attack during this period.",
    },
    "All-Out Attack": {
      type: "tactical",
      cp: 3,
      timing: "Combat Phase",
      effect:
        "One friendly unit gains +5 ATK dice for one attack. Its DEF becomes 2 until end of next turn.",
    },
    "Overwhelming Force": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "If the target unit has fewer remaining HP than the attacking unit's ATK dice, the attack automatically hits (no roll needed).",
    },
    "Aether Strike": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "One friendly unit's attack this turn bypasses all DEF bonuses (from cover, abilities, cards). Roll ATK dice vs base DEF only.",
    },
    "Precision Strike": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "One friendly Artillery unit makes a precision shot: no Blast, but +3 ATK dice and crits on 4+.",
    },
    "Stalwart Defense": {
      type: "tactical",
      cp: 2,
      timing: "Any Phase",
      effect:
        "One friendly unit reduces all damage it takes this turn by 2 (minimum 0). It also auto-passes Morale.",
    },
    "Iron Will": {
      type: "tactical",
      cp: 1,
      timing: "Any Phase",
      effect:
        'All friendly units within 4" of Commander auto-pass their next Morale check. They gain +1 ATK die if they were forced to check Morale.',
    },
    "Field Innovation": {
      type: "tactical",
      cp: 1,
      timing: "Any Phase",
      effect:
        "One friendly Support unit may use its special ability an extra time this turn. +1 to any construction/repair roll.",
    },
    "Machine Strike": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect:
        'One friendly War Machine gains +3 ATK dice for this attack. If it destroys the target, it may immediately move 3".',
    },
    "Strategic Flexibility": {
      type: "tactical",
      cp: 1,
      timing: "Any Phase",
      effect:
        'Swap the positions of 2 friendly units within 8" of Commander. Both units may act normally after swapping.',
    },
    "Disciplined Advance": {
      type: "tactical",
      cp: 2,
      timing: "Movement Phase",
      effect:
        'Up to 3 friendly units within 6" may move simultaneously in formation (maintaining relative positions). Each gains +1" MOV.',
    },
    "Precision Duel": {
      type: "tactical",
      cp: 1,
      timing: "Combat Phase",
      effect:
        "In a Challenge or 1v1 melee, your unit gains +2 ATK dice and rerolls all misses once.",
    },
    "Protective Formation": {
      type: "tactical",
      cp: 2,
      timing: "Command Phase",
      effect:
        'All friendly units within 4" of Commander gain +1 DEF and Bodyguard (may redirect attacks to each other).',
    },
    "Defensive Ritual": {
      type: "tactical",
      cp: 2,
      timing: "Any Phase",
      effect:
        "Spend 3 Ritual Flow: one friendly unit negates all damage from one attack or effect. May be played as a reaction.",
    },
    "Area Disruption": {
      type: "tactical",
      cp: 3,
      timing: "Combat Phase",
      effect:
        'Choose a 4" radius area within 12". All units in that area (friend and foe) suffer -2 ATK dice next turn. Area becomes Difficult Terrain.',
    },
    "Chain Attack": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect:
        'If your unit destroys an enemy, it may immediately attack another enemy within 3" with -1 ATK die. Can chain up to 3 times.',
    },
    "Hunt Formation": {
      type: "tactical",
      cp: 1,
      timing: "Movement Phase",
      effect:
        'All Spirit Wolf / Pack units within 8" may immediately move 2" toward the nearest enemy. They gain +1 ATK vs that target.',
    },
    "Sniper Position": {
      type: "tactical",
      cp: 1,
      timing: "Command Phase",
      effect:
        'One friendly ranged unit gains +4" RNG, Sniper (target anyone), and crits on 5+ for this turn. Cannot move.',
    },
    "Area Suppression": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect:
        'Choose a 3" radius area within 12". All enemy units in the area suffer -1 ATK die and cannot use special abilities next turn.',
    },
    "Silent Kill": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect:
        "One friendly Stealth/Assassin unit may attack without losing Stealth. The attack gains +2 ATK dice. Target cannot react.",
    },
    Repositioning: {
      type: "tactical",
      cp: 1,
      timing: "Movement Phase",
      effect:
        'Up to 2 friendly units within 6" may immediately move up to 3" each. This does not count as their normal movement.',
    },
    "Area Bombardment": {
      type: "tactical",
      cp: 3,
      timing: "Combat Phase",
      effect:
        'Choose a point within 16". All units (friend and foe) within 3" suffer a 5-dice attack. Creates Difficult Terrain in the area.',
    },

    // ===================== NIGHTFANG DOMINION CARDS =====================
    "Blood Command": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Select up to 3 Nightfang units within 12\" of your commander. Each selected unit may immediately make a free 4\" move. Units with the Thrall keyword gain +1 ATK until End Phase."
    },
    "Thrall Surge": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "All Thrall units within 18\" of your commander gain +1 ATK and +1 MOV until End Phase. If your Hunger Pool is 5 or higher, they also gain +1 DEF."
    },
    "Corruption Wave": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Choose a point within 12\" of your commander. All enemy units within 4\" of that point gain 2 Corruption tokens. Units that already have 3+ tokens also suffer -1 MOR until End Phase."
    },
    "Plague Wind": {
      type: "command",
      cp: 4,
      timing: "Command Phase",
      effect: "All enemy units within 18\" of your commander gain 1 Corruption token. Enemy units that are already corrupted (3+ tokens) also take 1 damage."
    },
    "Horde Command": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Select up to 5 Thrall units within 12\" of your commander. Each may immediately make a free 3\" move toward the nearest enemy. Thrall units that reach engagement range gain +1 ATK die for the following Action Phase."
    },
    "Endless Tide": {
      type: "command",
      cp: 4,
      timing: "Command Phase",
      effect: "Place 1 Thrall Conscripts unit (1 pt, full HP) in base contact with any board edge within 12\" of your commander. If your commander has the Thrall Horde keyword, place 2 units instead."
    },
    "Pack Hunt": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Select up to 3 beast or cavalry units within 12\" of your commander. Each selected unit may immediately make a free charge move (up to their MOV) toward the nearest enemy. If they reach engagement range, they gain +1 ATK die."
    },
    "Alpha Roar": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "All beast units within 12\" of your commander gain Fearless until End Phase. Enemy units within 6\" of any beast unit must make an immediate MOR check at -1."
    },
    "Siege Command": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "All War Machine and artillery units within 12\" of your commander gain +1 ATK and may reroll 1 missed die until End Phase. War Machines that did not move this turn gain an additional +1 ATK."
    },
    "Noble Command": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Select up to 3 units with points_cost 4 or higher within 12\" of your commander. Each gains +1 ATK and +1 MOR until End Phase."
    },
    "Shadow Step": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Your commander or 1 Stealth unit within 12\" may immediately teleport up to 8\" to any position not in line of sight of enemy units. The unit gains Stealth until it attacks or is detected."
    },
    "Prophecy of Blood": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Look at the top 3 cards of your deck. Keep 1, discard the rest. Then activate 1 fragment within 12\" of your commander for free (no charge cost). The fragment gains +1 to its effect this activation."
    },
    "Pack Rally": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "All beast and cavalry units within 12\" of your commander gain +1 MOV and Pack Tactics until End Phase. If your commander is in Tiger Form, the range increases to 18\"."
    },
    "Feral Roar": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "All enemy units within 8\" of your commander must make an immediate MOR check. Beast units within 8\" gain +2 ATK until End Phase. Your commander gains +1 ATK until End Phase."
    },
    "Tactical Advance": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Select up to 4 units within 12\" of your commander. Each may make a free 3\" move. Units that end this move in cover gain +1 DEF until they leave cover."
    },
    "Combined Arms": {
      type: "command",
      cp: 4,
      timing: "Command Phase",
      effect: "Choose 1 enemy unit visible to your commander. All friendly infantry, cavalry, AND artillery that target that unit this turn gain +2 ATK. If all three types target it, the target also suffers -2 DEF."
    },
    "Fortify": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Your commander and all units within 6\" gain +2 DEF until your next Command Phase. These units cannot move this turn. Units that were already stationary gain +1 ATK as well."
    },
    "Immovable Wall": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Select up to 4 units within 8\" of your commander. They gain Immovable (cannot be pushed, displaced, or forced to retreat) and +1 DEF until End Phase. Enemy units cannot move through their bases."
    },
    "Blood Transfusion": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Choose 1 friendly unit within 8\" of your commander. It heals 3 HP. If the unit is at full HP, it instead gains +2 ATK until End Phase. Your commander loses 1 HP (Blood Tithe cost)."
    },
    "Corruption Bloom": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Choose a point within 12\" of your commander. Create a 3\" Corruption Zone that lasts until End Phase. Non-Nightfang units entering or starting their turn in it gain 2 Corruption tokens. Nightfang units in the zone gain +1 ATK."
    },
    "War Beast Rally": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "All War Machine units within 12\" of your commander heal 2 HP and may immediately pivot to face any direction. War Machines that have not moved gain +1 ATK until End Phase."
    },
    "Aristocratic Precision": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Select up to 3 elite units (4+ pts) within 12\" of your commander. Each may reroll all missed attack dice on their next attack this turn. On a successful hit, the target gains 1 Corruption token."
    },
    "Silent Kill": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Your commander or 1 Stealth unit within 12\" may make an immediate melee attack against an adjacent enemy. If attacking from Stealth, gain +3 ATK for this attack. If the target is destroyed, the attacker re-enters Stealth."
    },
    "Fragment Surge": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Activate up to 2 fragments within 12\" of your commander simultaneously. Both activations cost only 1 charge each (instead of normal cost). Fragment effects stack."
    },
    "Blight Infusion": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "Select 1 friendly unit within 6\" of your commander. It gains +1 ATK and Corruption Spread until End Phase. If the unit already has Corruption Spread, its spread applies 2 tokens instead of 1."
    },
    "Corruption Amplifier": {
      type: "tech",
      cp: 3,
      timing: "Action Phase",
      effect: "Until End Phase, all Corruption tokens on enemies within 12\" of your commander have double effect. The threshold for Corruption penalties becomes 2 tokens instead of 3."
    },
    "Intensified Blight": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "Choose 1 enemy unit with Corruption tokens within 12\". Double the number of Corruption tokens on it (max 8). The unit immediately takes 1 damage."
    },
    "Corruption Seeds": {
      type: "tech",
      cp: 3,
      timing: "Action Phase",
      effect: "Place 3 Corruption Seed markers within 12\" of your commander. At End Phase, each Seed detonates: all enemy units within 2\" gain 2 Corruption tokens. Seeds are removed after detonation."
    },
    "Predator's Instinct": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "1 beast or cavalry unit in your army gains Ambush and Scout until End Phase. If the unit already has both, it instead gains +2 ATK dice on its next attack."
    },
    "Tiger's Fury": {
      type: "tech",
      cp: 3,
      timing: "Action Phase",
      effect: "1 beast unit within 8\" of your commander gains Frenzy (+2 ATK when below half HP) and +2 MOV until End Phase. If the unit kills a model this turn, it heals 2 HP."
    },
    "Thrall Enhancement": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "All Thrall units within 12\" of your commander gain +1 to all stats (ATK, DEF, MOV) until End Phase. Thralls lose the Expendable keyword for this turn."
    },
    "Blight-Link Pulse": {
      type: "tech",
      cp: 3,
      timing: "Action Phase",
      effect: "All Nightfang units within 12\" of your commander may share information: they ignore Fog of War effects and gain +1 ATK against targets that another Nightfang unit can see. Lasts until End Phase."
    },
    "Regenerative Blight": {
      type: "tech",
      cp: 3,
      timing: "Action Phase",
      effect: "Select up to 3 friendly units within 8\" of your commander. Each heals 2 HP. If any healed unit is at full HP, it instead gains +1 ATK until End Phase."
    },
    "Vital Extraction": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "Choose 1 enemy unit within 8\" of your commander. It takes 2 damage (ignoring DEF). 1 friendly unit within 6\" of the target heals 2 HP. This counts as Blood Drain."
    },
    "Venom Claws": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "Select up to 2 friendly units within 8\" of your commander. Their melee attacks apply 1 Corruption token on hit and deal +1 damage against targets with 3+ Corruption tokens. Lasts until End Phase."
    },
    "Night Vision": {
      type: "tech",
      cp: 1,
      timing: "Action Phase",
      effect: "All friendly units within 12\" of your commander ignore cover penalties and Fog of War effects until End Phase. Stealth units gain an additional +1 ATK when attacking from Stealth."
    },
    "Blight Channeling": {
      type: "tech",
      cp: 3,
      timing: "Action Phase",
      effect: "Activate 1 fragment within 12\" of your commander. The fragment's effects are doubled for this activation. The fragment does not lose a charge for this activation."
    },
    "Wellspring Link": {
      type: "tech",
      cp: 4,
      timing: "Action Phase",
      effect: "Restore 2 charges to all fragments within 12\" of your commander. Each restored fragment pulses: all friendly units within 3\" of it heal 1 HP and gain +1 ATK until End Phase."
    },
    "Fortified Position": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "Create a fortified position at your commander's location. All friendly units within 4\" gain +2 DEF and cannot be pushed or displaced. Lasts until your commander moves."
    },
    "Siege Protocols": {
      type: "tech",
      cp: 3,
      timing: "Action Phase",
      effect: "All War Machine and artillery units within 12\" of your commander gain +2\" range, +1 ATK, and Sharpshot (enemy cover bonuses reduced by 1) until End Phase."
    },
    "Elite Enhancement": {
      type: "tech",
      cp: 3,
      timing: "Action Phase",
      effect: "Select up to 2 units with points_cost 4 or higher within 8\" of your commander. Each gains +1 ATK, +1 DEF, and Blood Drain until End Phase."
    },
    "Blood Refinement": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "1 friendly unit within 8\" of your commander gains +2 ATK until End Phase. If the unit makes a kill this turn, the bonus becomes permanent (+1 ATK, not +2)."
    },
    "Blight Cloud": {
      type: "tech",
      cp: 3,
      timing: "Action Phase",
      effect: "Create a 4\" Blight Cloud centered on a point within 12\" of your commander. Non-Nightfang units inside have -1 ATK, -1 RNG, and gain 1 Corruption token at End Phase. Lasts 2 turns."
    },
    "Toxin Enhancement": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "Select up to 3 units within 8\" of your commander. Their attacks apply 1 additional Corruption token per hit until End Phase. Units with Corruption Spread apply 2 additional tokens instead."
    },
    "Battle Formation": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "Select up to 4 infantry units within 8\" of your commander. If any of them are within 3\" of another selected unit, all selected units gain +1 ATK and +1 DEF until End Phase."
    },
    "Iron Discipline": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "All friendly units within 12\" of your commander become immune to MOR checks and Terrifying effects until End Phase. Units that were Shaken rally immediately."
    },
    "Bone Armor Reinforcement": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "Your commander and up to 2 units within 6\" gain +2 DEF until End Phase. The first point of damage dealt to each reinforced unit is negated."
    },
    "Blight Shield": {
      type: "tech",
      cp: 3,
      timing: "Action Phase",
      effect: "Select up to 3 friendly units within 8\" of your commander. Each gains a Blight Shield: the next attack against them has its damage reduced by 2 (minimum 0). Lasts until triggered or End Phase."
    },
    "Shapeshift Mastery": {
      type: "tech",
      cp: 3,
      timing: "Action Phase",
      effect: "Your commander may immediately switch forms (if applicable). In Tiger Form: gain +2 ATK and +2 MOV until End Phase. In Human Form: gain +2 DEF and +2 RNG until End Phase. This does not use your normal action."
    },
    "Predator Instincts": {
      type: "tech",
      cp: 2,
      timing: "Action Phase",
      effect: "All beast and cavalry units within 12\" of your commander gain +1 ATK and +1 MOV until End Phase. These units may reroll 1 failed charge distance die."
    },
    "Crimson Wellspring Tap": {
      type: "fragment",
      cp: 3,
      timing: "Action Phase",
      effect: "Activate 1 fragment within 8\" of your commander. The fragment heals all Nightfang units within 3\" for 2 HP and grants them +1 ATK until End Phase. Add 1 to the Hunger Pool."
    },
    "Blighted Harvest": {
      type: "fragment",
      cp: 3,
      timing: "Action Phase",
      effect: "All Corruption tokens on enemies within 12\" of your commander generate energy. For every 3 Corruption tokens total, draw 1 card (max 3 cards). Each drawn card costs 1 less CP this turn."
    },
    "Mass Quickening": {
      type: "fragment",
      cp: 4,
      timing: "Action Phase",
      effect: "All Nightfang units within 12\" of your commander gain the Quickening: +1 ATK, +1 MOV, and their Corruption Spread applies 1 extra token. Lasts until End Phase. If any fragment is within 6\" of the commander, the range increases to 18\"."
    },
    "Crimson Rejuvenation": {
      type: "fragment",
      cp: 3,
      timing: "Action Phase",
      effect: "Choose 1 fragment within 8\" of your commander. It regains 2 charges. All friendly units within 4\" of the fragment heal 3 HP. Units at full HP gain +1 DEF until End Phase instead."
    },
    "Shadow Fragment": {
      type: "fragment",
      cp: 2,
      timing: "Action Phase",
      effect: "Activate 1 fragment within 12\" of your commander. All friendly units within 4\" of the fragment gain Stealth until they attack or are detected. Stealth units already within range gain +2 ATK on their next attack from Stealth."
    },
    "Crimson Revelation": {
      type: "fragment",
      cp: 3,
      timing: "Action Phase",
      effect: "Activate 1 fragment within 12\" of your commander. Its effects target all units (friend and foe) within 6\" instead of its normal range. Enemy units affected gain 2 Corruption tokens. Fragment does not lose a charge."
    },
    "Fragment Overcharge": {
      type: "fragment",
      cp: 4,
      timing: "Action Phase",
      effect: "Choose 1 fragment within 8\" of your commander. Triple its effect for this activation (healing, ATK bonuses, etc. are tripled). The fragment loses 3 charges instead of 1. If it has fewer than 3 charges, it detonates: 4 damage to all units within 3\"."
    },
    "Blight Engine Boost": {
      type: "fragment",
      cp: 3,
      timing: "Action Phase",
      effect: "All War Machine units within 8\" of a fragment gain +2 ATK and +1 DEF until End Phase. The fragment pulses: all friendly units within 3\" gain +1 ATK. Fragment loses 1 charge."
    },
    "Crimson Elegance": {
      type: "fragment",
      cp: 3,
      timing: "Action Phase",
      effect: "Activate 1 fragment within 12\" of your commander. All elite units (4+ pts) within 6\" of the fragment gain +1 ATK, +1 DEF, and may reroll 1 missed die until End Phase."
    },
    "Plague Fragment": {
      type: "fragment",
      cp: 3,
      timing: "Action Phase",
      effect: "Activate 1 fragment within 12\" of your commander. All enemy units within 6\" of the fragment gain 3 Corruption tokens and take 1 damage. The fragment creates a 3\" Corruption Zone at its location."
    },
    "Tactical Corruption": {
      type: "fragment",
      cp: 2,
      timing: "Action Phase",
      effect: "Activate 1 fragment within 12\" of your commander. Choose: either all friendlies within 4\" gain +1 ATK, or all enemies within 4\" gain 2 Corruption tokens. The fragment does not lose a charge."
    },
    "Endurance Fragment": {
      type: "fragment",
      cp: 3,
      timing: "Action Phase",
      effect: "Activate 1 fragment within 8\" of your commander. All friendly units within 6\" gain +2 DEF and Immovable (cannot be pushed or displaced) until End Phase. Your commander gains +1 HP permanently (max once per battle)."
    },
    "Feral Awakening": {
      type: "fragment",
      cp: 3,
      timing: "Action Phase",
      effect: "Activate 1 fragment within 12\" of your commander. All beast units within 8\" of the fragment undergo partial transformation: +2 ATK, +1 MOV, and Terrifying until End Phase. Non-beast units within 4\" gain +1 ATK."
    },
    "Feral Fragment": {
      type: "fragment",
      cp: 3,
      timing: "Action Phase",
      effect: "Activate 1 fragment within 12\" of your commander. All beast and cavalry units within 6\" gain +1 ATK and +2 MOV until End Phase. Your commander may immediately make a free 4\" move."
    },
    "Apex Strike": {
      type: "tactical",
      cp: 3,
      timing: "Action Phase",
      effect: "Your commander makes an immediate melee attack with +2 ATK dice. If the attack kills a model, add 2 to the Hunger Pool and your commander heals 2 HP via Blood Drain."
    },
    "Withering Strike": {
      type: "tactical",
      cp: 2,
      timing: "Action Phase",
      effect: "1 friendly unit within 8\" of your commander makes an immediate attack. The target gains 2 Corruption tokens regardless of whether the attack hits. If the target already has 3+ tokens, it takes 1 extra damage."
    },
    "Rending Claws": {
      type: "tactical",
      cp: 3,
      timing: "Action Phase",
      effect: "Your commander or 1 beast unit within 8\" makes a melee attack with +3 ATK dice. This attack ignores 2 points of DEF. Killed models add 1 to the Hunger Pool."
    },
    "Swarm Tactics": {
      type: "tactical",
      cp: 2,
      timing: "Action Phase",
      effect: "Select 1 enemy unit engaged with 2 or more Thrall units. All Thrall units engaged with that target make a simultaneous attack with +1 ATK each. The target cannot counterattack this attack."
    },
    "Draining Touch": {
      type: "tactical",
      cp: 2,
      timing: "Action Phase",
      effect: "Your commander makes a melee attack. If it deals damage, heal HP equal to damage dealt (max 3 HP). The target gains 1 Corruption token per HP healed."
    },
    "Assassination Strike": {
      type: "tactical",
      cp: 3,
      timing: "Action Phase",
      effect: "Your commander or 1 Stealth unit makes an attack against a target within 6\". If attacking from Stealth, gain +4 ATK for this attack. If the target is an enemy commander, gain an additional +2 ATK."
    },
    "Prophetic Strike": {
      type: "tactical",
      cp: 2,
      timing: "Action Phase",
      effect: "Your commander makes a ranged attack at full range with +1 ATK. If the attack hits, the target gains 2 Corruption tokens and cannot play Reaction cards until End Phase."
    },
    "Crushing Blow": {
      type: "tactical",
      cp: 3,
      timing: "Action Phase",
      effect: "Your commander or 1 War Machine within 12\" makes an attack with +2 ATK. If the attack deals 3+ damage, the target is Staggered: -2 MOV and -1 ATK until End Phase."
    },
    "Precision Strike": {
      type: "tactical",
      cp: 2,
      timing: "Action Phase",
      effect: "1 friendly unit within 8\" of your commander makes an attack with +1 ATK that ignores 1 point of DEF. If the target has Corruption tokens, ignore an additional point of DEF per 3 tokens."
    },
    "Withering Touch": {
      type: "tactical",
      cp: 2,
      timing: "Action Phase",
      effect: "Your commander makes a melee attack. The target gains 3 Corruption tokens regardless of whether damage is dealt. If the target has 6+ tokens after this attack, it immediately suffers -2 to all stats until End Phase."
    },
    "Crushing Counter": {
      type: "tactical",
      cp: 3,
      timing: "Reaction",
      effect: "When your commander or a unit within 6\" is attacked in melee, the attacked unit may immediately strike back before the attacker rolls. If the counterattack kills the attacker, the original attack is negated."
    },
    "Savage Pounce": {
      type: "tactical",
      cp: 3,
      timing: "Action Phase",
      effect: "Your commander or 1 beast unit within 8\" makes a charge attack with +3 MOV and +2 ATK for this charge. If the charge starts from outside the target's line of sight, gain an additional +2 ATK."
    },
    "Surgical Strike": {
      type: "tactical",
      cp: 2,
      timing: "Action Phase",
      effect: "Your commander makes a ranged or melee attack against a target within RNG. This attack ignores all DEF bonuses from cover, shields, and abilities. Deal +1 damage. If the target is below half HP, deal +2 damage instead."
    },
    "Blood Tithe Offering": {
      type: "tactical",
      cp: 1,
      timing: "Any Phase",
      effect: "Your commander sacrifices 2 HP to immediately draw 2 cards. Add 1 to the Hunger Pool. If the Hunger Pool is 10+, draw 3 cards instead."
    },
    "Corruption Cascade": {
      type: "tech",
      cp: 4,
      timing: "Action Phase",
      effect: "When an enemy unit with 3+ Corruption tokens is destroyed this turn, all enemy units within 4\" of it gain Corruption tokens equal to the destroyed unit's token count. Lasts until End Phase."
    },
    "Hunger Frenzy": {
      type: "tactical",
      cp: 3,
      timing: "Action Phase",
      effect: "If your Hunger Pool is 10+, all friendly units gain +1 ATK until End Phase. If it is 15+, they also gain +1 MOV and Blood Drain. Reduce the Hunger Pool by 5 after use."
    },
    "Nocturnal Ambush": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "All friendly units in cover or shadow terrain gain +2 ATK for their next attack this turn. Stealth units also gain +1 DEF and may reroll 1 attack die."
    },
    "Crimson Feast": {
      type: "tactical",
      cp: 4,
      timing: "Action Phase",
      effect: "All Nightfang units that are engaged in melee gain Blood Drain until End Phase. Each kill made during this phase heals the killing unit 2 HP and adds 2 to the Hunger Pool instead of 1."
    },
    "Blight Eruption": {
      type: "tech",
      cp: 4,
      timing: "Action Phase",
      effect: "Choose a point within 12\" of your commander. All units within 3\" take 3 damage (Nightfang units take only 1). All surviving enemy units gain 3 Corruption tokens. Creates a Corruption Zone lasting 2 turns."
    },
    "Thrall Sacrifice": {
      type: "tactical",
      cp: 1,
      timing: "Any Phase",
      effect: "Destroy 1 Thrall unit within 6\" of your commander. Your commander heals HP equal to the destroyed unit's remaining HP (max 4). Add 2 to the Hunger Pool. Draw 1 card."
    },
    "Vampiric Regeneration": {
      type: "tech",
      cp: 3,
      timing: "End Phase",
      effect: "All friendly units that dealt melee damage this turn heal 2 HP. Your commander heals 3 HP. Units at full HP gain +1 ATK next turn instead."
    },
  },
  factions: [],
  commanders: [],
  units: [],
  fragments: [],
};

// Helper functions to filter by faction
function getCommandersByFaction(factionId) {
  return gameData.commanders.filter((c) => c.faction === factionId);
}

function getUnitsByFaction(factionId) {
  return gameData.units.filter((u) => u.faction === factionId);
}

function getFragmentsByFaction(factionId) {
  return gameData.fragments.filter((f) => f.faction === factionId);
}

function getFactionById(factionId) {
  return gameData.factions.find((f) => f.id === factionId);
}
