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
  factions: [
    {
      id: "iron-dominion",
      name: "Iron Dominion",
      theme: "Human/clockwork hybrid, steampunk, fragment-infused",
      flavor_text:
        "The Iron Dominion marches to the rhythm of pistons and steam. Each soldier, each machine, is a cog in a greater design—yet within the fragments they have harnessed lies the unpredictable pulse of the cosmos. Those who master Knowledge bend the battlefield to their will; those who embrace Chaos let fragments carve new realities. Few survive to see which path will prevail.",
      motif_description:
        "Human/clockwork hybrid steampunk faction. Industrial, mechanical, cold, and precise. Integrates fragment technology into weapons, armor, and constructs.",
      core_philosophy:
        "Focused on Knowledge vs Chaos mechanics. Highly disciplined, tactical, and strategic, but fragment tech introduces risk/reward mechanics.",
      faction_bonuses: [
        "All mechanical units gain +1 durability",
        "War machines cost 1 less point when led by a Knowledge commander",
        "Fragment instability effects reduced by 10% faction-wide",
        "Engineers can repair 1 HP per turn to adjacent units",
      ],
      playstyle_notes:
        "The Iron Dominion excels at combined arms tactics, mixing durable infantry with devastating war machines. Choose your evolution path carefully—Knowledge provides stability and control, while Chaos unlocks raw power at great risk.",
      worldview: [
        "Progress is the only moral imperative. What can be improved must be improved.",
        "The body is a flawed machine; augmentation is correction, not corruption.",
        "Fragments are tools — dangerous, yes, but all tools are dangerous to the untrained.",
        "Chaos is not evil; it is energy without discipline. Knowledge is not virtue; it is energy with direction.",
        "The Forge burns away weakness. What survives is worthy.",
      ],
      political_structure:
        "The Iron Dominion is a technocratic oligarchy governed by the Forge Council — a rotating body of the most accomplished engineers, commanders, and fragment theorists. Above the Council sits the Arch-Fabricator, a singular authority who has proven mastery over both Knowledge and Chaos applications of fragment technology. Leadership is earned through innovation, battlefield success, and peer review — not bloodline or politics.",
      iron_doctrine: {
        overview:
          "The Iron Doctrine is the Iron Dominion's foundational framework governing technology, warfare, and fragment usage. It consists of three pillars that every citizen, soldier, and engineer must internalize. Where the Dominion's enemies see cold machinery, followers of the Doctrine see a system of belief as fervent as any religion.",
        pillars: [
          {
            name: "The Pillar of the Forge",
            concept:
              "Creation through destruction. Every advancement requires sacrifice of the obsolete.",
            implications: [
              "Soldiers accept augmentation willingly, viewing organic limitation as a defect to overcome.",
              "Failed prototypes are studied relentlessly — defeat is data, not dishonor.",
              "Factories operate ceaselessly; downtime is considered a form of decay.",
            ],
            mechanics: [
              "Engineers can salvage destroyed friendly units for repair materials (+1 HP to adjacent mechanical units).",
              "War machines destroyed in battle may leave behind Fragment Cores that can be recovered.",
              "Failed Chaos experiments grant 'Forge Data' tokens that improve subsequent fragment activations.",
            ],
            symbol:
              "An anvil wreathed in blue flame — representing the transformative fire of knowledge applied to raw material.",
          },
          {
            name: "The Pillar of the Grid",
            concept:
              "Order, precision, and systemic thinking. Every soldier is a node in a vast network.",
            implications: [
              "Communication between units is maintained through clockwork relay systems and signal constructs.",
              "Individual initiative is encouraged only within defined tactical parameters.",
              "Officers are trained in systems theory — understanding how small changes cascade through formations.",
            ],
            mechanics: [
              "Adjacent friendly units share partial buffs from commander auras (+5% effectiveness per adjacent unit).",
              "Breaking formation (units isolated from allies) incurs temporary debuffs.",
              "Command cards that affect 'the Grid' can reposition multiple units simultaneously.",
            ],
            symbol:
              "A hexagonal lattice interlocking with gears — representing the interconnected precision of the Dominion's war machine.",
          },
          {
            name: "The Pillar of the Spark",
            concept:
              "Fragment energy is the divine fire. Those who master it ascend; those who fear it stagnate.",
            implications: [
              "Every soldier carries a minor fragment shard, even if dormant — a symbol of potential.",
              "Fragment accidents are not punished but analyzed; knowledge gained from failure is sacred.",
              "The boundary between Knowledge and Chaos is considered the 'Edge of Ignition' — the most productive and dangerous place to operate.",
            ],
            mechanics: [
              "All Iron Dominion units generate minor Fragment Charge passively when within range of a fragment source.",
              "Fragment overcharge events have a 15% chance to trigger bonus effects rather than penalties for Dominion units.",
              "Commanders at the Knowledge/Chaos boundary gain access to unique 'Spark' abilities unavailable to pure-path commanders.",
            ],
            symbol:
              "A lightning bolt splitting an atom — representing the raw, barely-contained energy that drives the Dominion forward.",
          },
        ],
        doctrine_in_practice: {
          training:
            "Recruits undergo the Crucible — a grueling program combining mechanical aptitude tests, live-fire fragment exposure, and tactical simulation. Approximately 30% wash out; most become support personnel rather than being discarded.",
          hierarchy_integration:
            "Rank in the Iron Dominion correlates directly with technical expertise. A brilliant engineer outranks a decorated soldier if their innovations have greater battlefield impact.",
          combat_philosophy:
            "Engage with overwhelming firepower, maintain formation integrity, and exploit fragment instability in the enemy's ranks while stabilizing your own.",
        },
        keywords: [
          "Techno-Doctrine",
          "Three Pillars",
          "Fragment Mastery",
          "Systematic Warfare",
          "Forge Philosophy",
        ],
      },
      hierarchy: {
        overview:
          "The Iron Dominion's hierarchy is a meritocratic technocracy where rank is determined by demonstrated competence in engineering, fragment science, and battlefield command. Unlike hereditary systems, authority must be continuously justified through results. Stagnation at any level triggers review and potential reassignment.",
        ranks: [
          {
            title: "The Arch-Fabricator",
            role: "Supreme authority of the Iron Dominion; final arbiter of all military, scientific, and political decisions.",
            responsibilities: [
              "Directs the Forge Council and approves all major fragment experiments.",
              "Commands the Dominion's war effort at the strategic level.",
              "Serves as the living embodiment of the Iron Doctrine.",
            ],
            characteristics: [
              "Heavily augmented — more machine than human, yet retains sharp tactical intellect.",
              "Wears the Ironclad Regalia: armor fused with fragment cores that pulse with contained energy.",
              "Speaks rarely but with absolute authority; decisions are final and immediate.",
            ],
          },
          {
            title: "Forge Councilors",
            role: "Senior advisors and division leaders; each oversees a branch of the Dominion's war machine.",
            responsibilities: [
              "Manage specific arms of the military: Infantry Division, War Machine Corps, Fragment Research, Logistics.",
              "Propose and approve new unit designs, weapons, and tactical doctrines.",
              "Conduct peer review of commanders' performance.",
            ],
            characteristics: [
              "Distinguished by bronze-and-steel ceremonial augmentations.",
              "Each carries a unique Fragment Key — a personal fragment artifact symbolizing their expertise.",
              "Rotate seats on the Council based on contribution metrics, ensuring no permanent entrenchment.",
            ],
          },
          {
            title: "Grand Engineers",
            role: "Field commanders with engineering mastery; design and deploy battlefield solutions in real time.",
            responsibilities: [
              "Lead combined arms operations.",
              "Oversee war machine deployment and fragment integration in the field.",
              "Innovate under fire — expected to improvise solutions to unexpected tactical problems.",
            ],
            characteristics: [
              "Carry multi-tools integrated into their augmented limbs.",
              "Armor displays unit insignia alongside technical schematics etched in fragment-reactive ink.",
              "Known for eccentric personalities — the best engineers are often brilliant but unconventional.",
            ],
          },
          {
            title: "Ironclad Officers",
            role: "Mid-level commanders; direct control over specific battalions or specialized units.",
            responsibilities: [
              "Execute tactical plans designed by Grand Engineers.",
              "Maintain Grid cohesion across their assigned units.",
              "Report technical anomalies and fragment instabilities up the chain.",
            ],
            characteristics: [
              "Standard augmentation package with rank-specific modifications.",
              "Wear reinforced officer's plate with integrated communication arrays.",
              "Expected to lead from the front in critical engagements.",
            ],
          },
          {
            title: "Gearwrights",
            role: "Specialized technical soldiers — combat engineers, fragment handlers, and field mechanics.",
            responsibilities: [
              "Repair and maintain war machines and augmented units during battle.",
              "Handle fragment cores and manage instability in the field.",
              "Construct battlefield fortifications and relay stations.",
            ],
            characteristics: [
              "Heavy tool-integrated armor with reinforced gauntlets.",
              "Often scarred from fragment exposure — considered marks of experience, not disfigurement.",
              "Carry personal repair kits and emergency fragment dampeners.",
            ],
          },
          {
            title: "Line Soldiers",
            role: "Core infantry and standard combat units.",
            responsibilities: [
              "Hold formation and execute Grid-based tactics.",
              "Provide covering fire and screening for specialist units.",
              "Generate passive Fragment Charge through proximity to fragment sources.",
            ],
            characteristics: [
              "Standard-issue clockwork-reinforced armor with minor augmentations.",
              "Weapons range from steam-powered rifles to fragment-tipped polearms.",
              "Expendable individually but devastating in coordinated groups.",
            ],
          },
        ],
        titles_table: [
          {
            title: "Arch-Fabricator",
            significance: "Supreme ruler",
            notes: "More machine than human; absolute authority",
          },
          {
            title: "Forge Councilor",
            significance: "Division leader / Senior advisor",
            notes: "Rotating seats based on contribution metrics",
          },
          {
            title: "Grand Engineer",
            significance: "Field commander / Innovator",
            notes: "Expected to improvise battlefield solutions",
          },
          {
            title: "Ironclad Officer",
            significance: "Battalion commander",
            notes: "Leads from the front in critical engagements",
          },
          {
            title: "Gearwright",
            significance: "Combat engineer / Fragment handler",
            notes: "Scarred by fragment exposure; marks of experience",
          },
          {
            title: "Line Soldier",
            significance: "Standard infantry",
            notes: "Devastating in coordinated Grid formations",
          },
        ],
        hierarchy_notes: [
          "Advancement is based on measurable contribution: patents filed, battles won, fragment experiments survived, units improved.",
          "Demotion is not punitive but corrective — an officer who fails is retrained, not discarded. Waste is anathema to the Doctrine.",
          "Cross-training between engineering and combat roles is mandatory; every soldier must understand the machines they fight beside.",
          "The Arch-Fabricator's identity is public, unlike some factions' shadowy leaders — transparency is a Dominion value.",
        ],
        keywords: [
          "Technocratic Meritocracy",
          "Forge Council",
          "Engineering Authority",
          "Fragment Expertise",
          "Grid Command",
        ],
      },
      arch_fabricator: {
        title: "Arch-Fabricator Voltan Kress",
        role: "Supreme leader of the Iron Dominion",
        faction_rank: "Highest authority (military, scientific, and political)",
        aliases: [
          "The Iron Constant",
          "First Among Gears",
          "The Living Blueprint",
        ],
        summary:
          "Voltan Kress is the 14th Arch-Fabricator of the Iron Dominion, and by all accounts the most prolific. More machine than human after decades of voluntary augmentation, Kress embodies the Dominion's belief that flesh is a starting point, not a destination. His body is a masterwork of fragment-infused clockwork, his mind augmented by calculation engines that allow him to process battlefield data in real time. Despite his mechanical nature, Kress is known for unexpected warmth toward his soldiers — he considers every unit, human or construct, a component of his greatest invention: the Dominion itself.",
        appearance: [
          "Towering figure, roughly seven feet tall due to augmented legs and reinforced spine.",
          "Left arm replaced entirely with a multi-function limb housing tools, weapons, and a fragment stabilizer.",
          "Face partially visible behind a half-mask of brushed steel; one eye is organic, the other a glowing blue fragment lens.",
          "Chest cavity contains a visible Fragment Core — the Axiom Engine — pulsing with contained blue-white energy.",
          "Moves with mechanical precision but occasional surprisingly human gestures.",
        ],
        personality: [
          {
            trait: "Relentlessly Analytical",
            description:
              "Sees every situation as a system to be optimized. Even casual conversations are data-gathering exercises.",
          },
          {
            trait: "Protective of His Creations",
            description:
              "Views soldiers and constructs as extensions of his life's work; losses are felt as engineering failures, not acceptable casualties.",
          },
          {
            trait: "Darkly Humorous",
            description:
              "Despite his mechanical demeanor, Kress delivers dry, cutting observations that catch subordinates off guard.",
          },
          {
            trait: "Obsessed with Legacy",
            description:
              "Driven by the need to leave the Dominion stronger than he found it. Every decision is measured against long-term impact.",
          },
        ],
        abilities: [
          {
            name: "Axiom Override",
            description:
              "Kress can temporarily take direct control of any Dominion war machine within visual range, overriding its pilot with his own tactical calculations.",
          },
          {
            name: "Grid Resonance",
            description:
              "Emits a pulse that strengthens Grid cohesion, granting all allied units within range +1 to coordination-based actions for 2 turns.",
          },
          {
            name: "Fragment Synthesis",
            description:
              "Can combine two active fragment effects into a single amplified effect, though at increased instability risk.",
          },
          {
            name: "The Constant",
            description:
              "Passive aura: all fragment instability within 3 units of Kress is reduced by 20%. Represents his stabilizing presence on chaotic battlefield energies.",
          },
        ],
        faction_role: [
          {
            area: "Scientific Authority",
            detail:
              "Personally approves all fragment experiments above Tier 3 risk. His laboratory, the Axiom Crucible, produces the Dominion's most advanced prototypes.",
          },
          {
            area: "Military Oversight",
            detail:
              "Designs campaign strategies as engineering projects — with timelines, resource budgets, and contingency branches.",
          },
          {
            area: "Cultural Figurehead",
            detail:
              "Embodies the Iron Doctrine's promise that augmentation and discipline can overcome any obstacle. His public appearances are meticulously staged to inspire.",
          },
        ],
        lore_notes: [
          "Kress has survived three assassination attempts, each time returning with additional augmentations inspired by the attack method.",
          "He is rumored to no longer sleep, instead entering a 'maintenance cycle' where his organic components are sustained by fragment energy.",
          "His predecessor, Arch-Fabricator Lune, was removed by Council vote for 'insufficient innovation' — Kress designed the voting mechanism.",
          "The Axiom Engine in his chest is believed to be a unique fragment artifact, possibly predating the Dominion itself.",
        ],
        keywords: [
          "Supreme Commander",
          "Fragment-Augmented Leader",
          "Living Blueprint",
          "Technocratic Authority",
          "Axiom Engine",
        ],
      },
      augmentation_tiers: {
        overview:
          "The Iron Dominion's soldiers do not remain baseline human. Through voluntary augmentation programs, fragment infusion, and progressive mechanical integration, warriors evolve along a spectrum from enhanced human to near-complete construct. This system, known as the Augmentation Tiers, governs both the physical transformation of soldiers and their access to increasingly powerful fragment-based abilities. Advancement requires proven competence, psychological stability, and physical compatibility.",
        stages: [
          {
            name: "Baseline Enhanced",
            stage_number: 1,
            overview:
              "The entry tier for all Dominion soldiers. Recruits receive basic augmentations during the Crucible training program: reinforced skeletal structure, minor clockwork joints, and a dormant fragment shard implant.",
            physical: [
              "Standard clockwork-reinforced armor integrated with biological systems.",
              "Minor visible augmentations: reinforced joints, optical enhancements, communication implants.",
              "Fragment shard dormant but present — a symbol of potential and a minor energy reservoir.",
            ],
            abilities: [
              "Enhanced strength and endurance beyond baseline human.",
              "Basic Grid connectivity — can receive tactical data from command relays.",
              "Minor fragment resistance — reduces instability effects by 5%.",
            ],
            behavior: [
              "Operate in tight Grid formations, relying on numbers and coordination.",
              "Excel at holding positions and providing sustained fire.",
              "Advancement to Tier 2 requires 3 campaigns survived and engineering aptitude test.",
            ],
          },
          {
            name: "Ironclad Integrated",
            stage_number: 2,
            overview:
              "Veterans who have proven themselves through multiple campaigns undergo the Integration, a painful but transformative process that replaces significant organic components with superior clockwork systems. The fragment shard is awakened, granting active abilities.",
            physical: [
              "Approximately 40-60% mechanical by volume.",
              "Visible clockwork limbs, reinforced torsos, and fragment-reactive plating.",
              "Eyes often replaced with multi-spectrum lenses; some retain one organic eye as a matter of tradition.",
              "Steam vents along joints and spine release excess fragment energy during combat.",
            ],
            abilities: [
              "Active fragment shard — can channel minor fragment effects (buffs, repairs, energy pulses).",
              "Enhanced Grid integration — can share sensory data with adjacent units in real time.",
              "Increased durability and resistance to morale effects.",
              "Access to specialist combat roles: Shock Trooper, Fragment Handler, Combat Engineer.",
            ],
            behavior: [
              "Operate as squad leaders or specialist operators.",
              "Capable of independent tactical decisions within Grid parameters.",
              "Begin mentoring Tier 1 soldiers, reinforcing doctrine and Grid discipline.",
              "May pilot light war machines or serve as secondary operators on heavy platforms.",
            ],
          },
          {
            name: "Construct Ascendant",
            stage_number: 3,
            overview:
              "The pinnacle of Iron Dominion augmentation, reserved for commanders, Grand Engineers, and the most exceptional specialists. Construct Ascendants are more machine than human — their organic components serve primarily as the 'spark' that drives a vast mechanical frame. They are walking war machines in their own right.",
            physical: [
              "80-95% mechanical; organic components are sustained by fragment energy rather than biological processes.",
              "Towering frames, often 7-9 feet tall with modular weapon systems integrated into limbs.",
              "Fragment cores visible through armored chassis, pulsing with contained energy.",
              "Some retain a recognizable human face behind reinforced glass; others have fully mechanical visages.",
            ],
            abilities: [
              "Full fragment core integration — can activate and sustain powerful fragment effects continuously.",
              "Command-level Grid authority — can directly coordinate entire battalions through neural relay.",
              "Near-immunity to morale effects and environmental hazards.",
              "Can interface directly with war machines, dramatically increasing their effectiveness.",
              "Risk: fragment overload can cause catastrophic system failure, potentially damaging nearby allies.",
            ],
            behavior: [
              "Serve as battlefield anchors and force multipliers.",
              "Can operate independently or as the nexus of a Grid formation.",
              "Their presence stabilizes fragment effects for nearby units but also draws concentrated enemy fire.",
              "Advancement beyond Tier 3 is theoretical — the Arch-Fabricator is considered the only 'Tier 4' entity.",
            ],
          },
        ],
        progression_notes: [
          "Augmentation is always voluntary — the Dominion views forced modification as waste, producing inferior results.",
          "Not all soldiers advance to Tier 2 or 3; many serve distinguished careers at Tier 1. Advancement is an option, not an expectation.",
          "Psychological screening is rigorous — candidates for Tier 3 must demonstrate that their sense of self survives the transformation.",
          "Players commanding augmented units must balance the power of higher tiers against their increased fragment vulnerability and point costs.",
        ],
        keywords: [
          "Augmentation Tiers",
          "Clockwork Evolution",
          "Fragment Integration",
          "Human-Machine Hybrid",
          "Construct Ascendant",
        ],
      },
      military_doctrine: {
        overview:
          "The Iron Dominion's military doctrine is built on the principle that war is an engineering problem. Every battle is a system to be analyzed, optimized, and solved. The Dominion excels at combined arms operations, integrating infantry, war machines, artillery, and fragment effects into seamless Grid formations that overwhelm opponents through coordinated firepower, mechanical durability, and relentless pressure.",
        core_principles: [
          {
            name: "Grid Supremacy",
            details: [
              "All units operate as nodes in a tactical Grid — sharing data, coordinating fire, and reinforcing each other's weaknesses.",
              "Grid cohesion provides cumulative bonuses; isolated units lose these advantages and become vulnerable.",
              "Disrupting the enemy's coordination while maintaining your own is the core of Dominion strategy.",
            ],
          },
          {
            name: "Engineering the Battlefield",
            details: [
              "Gearwright Engineers construct fortifications, relay stations, and repair depots during battle.",
              "Terrain is not accepted but modified — bridges built, obstacles cleared, firing positions constructed.",
              "The ideal Dominion engagement takes place on a battlefield the enemy doesn't recognize by turn three.",
            ],
          },
          {
            name: "Overwhelming Firepower",
            details: [
              "The Dominion favors concentrated ranged attacks from steam artillery, aether blasters, and war machine weapons.",
              "Infantry advances under covering fire, closing to melee only when the enemy is already suppressed.",
              "Fragment effects amplify ranged damage, creating kill zones that punish enemy movement.",
            ],
          },
          {
            name: "Attrition Through Durability",
            details: [
              "Dominion units are designed to outlast opponents rather than outmaneuver them.",
              "Repair mechanics allow damaged units to return to combat effectiveness mid-battle.",
              "War machines serve as damage sponges, absorbing enemy fire while infantry operates behind them.",
            ],
          },
          {
            name: "Fragment Exploitation",
            details: [
              "Fragment instability is a weapon — Knowledge commanders stabilize their own forces while Chaos commanders weaponize instability against enemies.",
              "Fragment cores in war machines can be overloaded deliberately, creating devastating area effects at the cost of the machine.",
              "Managing fragment charge across the army is as important as managing ammunition or positioning.",
            ],
          },
        ],
        battlefield_behavior: [
          {
            name: "Standard Engagements",
            details: [
              "Infantry deploys in Grid formation with Gearwright support.",
              "Artillery establishes kill zones at key chokepoints.",
              "War machines advance as mobile fortresses, soaking damage and providing heavy firepower.",
              "Engineers construct forward positions to extend Grid range.",
            ],
          },
          {
            name: "Combined Arms Assault",
            details: [
              "Cavalry screens flanks while artillery softens targets.",
              "Infantry advances in coordinated waves, each wave covered by the one behind it.",
              "War machines deliver the decisive blow, crushing weakened positions.",
            ],
          },
          {
            name: "Fragment Surge Operations",
            details: [
              "When fragment charge reaches critical levels, commanders can trigger a Surge — a coordinated release of fragment energy across multiple units.",
              "Knowledge Surges provide stable, predictable buffs to the entire Grid.",
              "Chaos Surges create powerful but unpredictable area effects that may affect friend and foe alike.",
            ],
          },
          {
            name: "Defensive Doctrine",
            details: [
              "The Dominion excels at defense — engineers fortify positions rapidly, war machines anchor flanks, and infantry creates interlocking fields of fire.",
              "Fragment effects are used to create deterrent zones that punish enemy approach.",
              "Defensive actions generate Forge Data, improving offensive capability when the Dominion counterattacks.",
            ],
          },
        ],
        strategic_notes: [
          "Commanders must balance Grid cohesion against flexibility — too rigid and enemies can outmaneuver; too dispersed and Grid bonuses are lost.",
          "Fragment management is the deciding factor in most Dominion battles; running dry means losing access to critical abilities.",
          "War machine deployment timing is crucial — too early and they become priority targets; too late and the infantry has already suffered unsustainable losses.",
          "The ideal Dominion victory involves the enemy surrendering because the math of the battle has become unsurvivable, not because every unit was destroyed.",
        ],
        keywords: [
          "Grid Warfare",
          "Combined Arms",
          "Engineering Dominance",
          "Fragment Exploitation",
          "Attrition Tactics",
          "Overwhelming Firepower",
        ],
      },
      war_machines_lore: {
        overview:
          "The Iron Dominion's War Machines are towering constructs of clockwork engineering, steam power, and fragment energy. Unlike the spirit-bound entities of other dimensions, these are purpose-built weapons platforms — designed, manufactured, tested, and deployed with industrial precision. Each war machine is a masterwork of the Forge, piloted by Tier 2 or Tier 3 augmented operators who interface directly with the machine's control systems. They are expensive, difficult to replace, and devastatingly effective.",
        general_characteristics: [
          {
            trait: "Manufactured Precision",
            detail:
              "Every war machine is built to exact specifications in the Dominion's Forge-Cities. No two are identical, but all follow standardized design principles.",
          },
          {
            trait: "Fragment-Powered",
            detail:
              "War machines run on fragment cores — concentrated energy sources that provide both motive power and offensive capability.",
          },
          {
            trait: "Pilot Integration",
            detail:
              "Operators connect to their machines through neural interfaces; Tier 3 pilots achieve near-symbiotic control.",
          },
          {
            trait: "Modular Design",
            detail:
              "Weapons and defensive systems can be swapped between deployments, allowing commanders to customize loadouts for specific missions.",
          },
        ],
        tactical_role: [
          "Serve as mobile fortresses, anchoring Grid formations and providing heavy firepower.",
          "Draw enemy fire away from infantry, absorbing damage through reinforced clockwork armor.",
          "Fragment cores can be overloaded for devastating area attacks — a last resort that destroys the machine.",
          "Require Gearwright support for field repairs; unsupported war machines degrade in effectiveness over prolonged engagements.",
        ],
        keywords: [
          "Clockwork Titans",
          "Fragment-Powered Engines",
          "Industrial War Machines",
          "Modular Weapons Platforms",
          "Grid Anchors",
        ],
      },
      signature_weapons: {
        overview:
          "The Iron Dominion's weapons are marvels of engineering — precision-manufactured instruments that integrate fragment technology with clockwork mechanisms and steam power. Unlike mystical armaments, every weapon in the Dominion's arsenal can be disassembled, studied, and replicated (at least in theory). In practice, the most powerful weapons require fragment cores and augmented wielders, making them irreplaceable masterworks.",
        core_traits: [
          {
            trait: "Fragment Integration",
            detail:
              "Most weapons above standard issue contain fragment shards that enhance damage, accuracy, or special effects.",
          },
          {
            trait: "Mechanical Reliability",
            detail:
              "Clockwork mechanisms ensure consistent performance; Dominion weapons rarely jam or misfire under normal conditions.",
          },
          {
            trait: "Modular Attachments",
            detail:
              "Many weapons accept field modifications — scopes, bayonets, fragment amplifiers, and suppression modules.",
          },
          {
            trait: "Steam Amplification",
            detail:
              "Heavy weapons use pressurized steam to boost projectile velocity or power melee strikes beyond human capability.",
          },
        ],
        weapons: [
          {
            name: "Cogblade",
            type: "Clockwork longsword",
            wielder: "Ironclad Officers and Construct Ascendants",
            properties:
              "Teeth along the blade rotate at high speed on activation, dramatically increasing cutting power. Fragment shard in the pommel allows energy-charged strikes.",
            lore: "The standard sidearm of Dominion officers. Each Cogblade is custom-fitted to its wielder's augmented grip; stealing one is useless without the matching interface.",
          },
          {
            name: "Aether Repeater",
            type: "Fragment-powered repeating rifle",
            wielder: "Aether Infused Soldiers and snipers",
            properties:
              "Fires fragment-energized bolts at high rate. Can switch between rapid fire and charged single shots.",
            lore: "The weapon that changed Dominion warfare. Before the Repeater, fragment energy was reserved for war machines. Grand Engineer Tessik's breakthrough miniaturized fragment projection, putting devastating firepower in infantry hands.",
          },
          {
            name: "Forge Hammer",
            type: "Steam-powered warhammer",
            wielder: "Shock Infantry and heavy assault troops",
            properties:
              "Steam pistons in the haft deliver crushing blows with mechanical force multiplied beyond human strength. Each impact generates a minor shockwave.",
            lore: "Forged in the Crucible foundries, each hammer contains a pressure core that must be recharged between battles. Soldiers often name their hammers — a rare display of sentiment in the Dominion.",
          },
          {
            name: "Axiom Cannon",
            type: "War machine-mounted siege weapon",
            wielder: "Clockwork Titans and Steam Colossus platforms",
            properties:
              "Fires concentrated fragment energy in devastating beams. Can switch between focused anti-armor mode and dispersed area suppression.",
            lore: "Named after the Arch-Fabricator's personal fragment core. Only six Axiom Cannons exist; each requires a dedicated Gearwright crew to maintain.",
          },
          {
            name: "Spark Lance",
            type: "Fragment-tipped cavalry lance",
            wielder: "Clockwork Cavalry",
            properties:
              "Discharges fragment energy on impact, disrupting enemy augmentations and clockwork systems. Devastating on the charge.",
            lore: "Originally designed to counter rogue constructs during the Fracture Rebellion. Now standard issue for Dominion cavalry, turning every charge into a fragment-enhanced thunderbolt.",
          },
          {
            name: "Gearwright's Omni-Tool",
            type: "Multi-function engineering weapon",
            wielder: "Gearwright Engineers",
            properties:
              "Functions as welding torch, cutting tool, fragment stabilizer, and close-combat weapon. Can repair friendly units or damage enemy mechanical systems.",
            lore: "The pride of every Gearwright. Customized extensively by each owner, no two Omni-Tools are alike. Veterans' tools are works of art, covered in battle-earned modifications and kill tallies.",
          },
          {
            name: "Chrono-Disruptor",
            type: "Experimental fragment device",
            wielder: "Fragment Researchers and the Arch-Fabricator only",
            properties:
              "Temporarily disrupts the flow of cause and effect in a small area, causing enemy actions to resolve out of sequence. Extremely unstable.",
            lore: "The most dangerous weapon in the Dominion's arsenal. Only three have been built; two were destroyed during testing. The surviving unit is carried by the Arch-Fabricator himself, used only in existential emergencies.",
          },
        ],
        tactical_notes: [
          "Standard infantry weapons are reliable and mass-produced; fragment-enhanced weapons require specialized training.",
          "War machine weapons draw from the machine's fragment core — sustained fire depletes the core, reducing overall combat effectiveness.",
          "Field modifications are encouraged; Gearwrights can adapt weapons mid-battle to counter specific threats.",
          "Captured enemy weapons are studied extensively; the Dominion's weapon designs often incorporate reverse-engineered features from defeated foes.",
        ],
        keywords: [
          "Clockwork Weapons",
          "Fragment-Enhanced Armaments",
          "Steam-Powered Arms",
          "Precision Engineering",
          "Modular Design",
        ],
      },
      fragment_source: {
        overview:
          "While other civilizations encounter cosmic entities or mystical forces, the Iron Dominion's power derives from the Fracture — a cataclysmic event in their dimension's deep history that shattered the boundary between physical reality and raw entropic energy. Fragment shards are crystallized remnants of this event, scattered across the Dominion's world like the debris of a broken mirror. Each shard contains a sliver of the Fracture's energy — potent, versatile, and inherently unstable.",
        primary_name: "The Fracture",
        aliases: [
          "The Great Sundering",
          "The Axiom Break",
          "The Engine That Cracked",
        ],
        nature: [
          {
            trait: "Entropic Energy",
            detail:
              "Fragment energy exists at the boundary between order and chaos — it can reinforce reality or unravel it, depending on application.",
          },
          {
            trait: "Crystallized Potential",
            detail:
              "Each shard is a frozen moment of the Fracture, containing energy that can be released, shaped, or channeled.",
          },
          {
            trait: "Resonance",
            detail:
              "Fragments near each other resonate, amplifying effects but also increasing instability. Concentrated fragments can trigger cascading reactions.",
          },
        ],
        relationship: [
          {
            aspect: "Scientific Exploitation",
            details: [
              "The Dominion treats fragment energy as a natural resource to be harvested, refined, and deployed.",
              "Fragment research is the most prestigious scientific discipline, attracting the Dominion's brightest minds.",
            ],
          },
          {
            aspect: "Knowledge vs. Chaos Dichotomy",
            details: [
              "Knowledge-aligned usage stabilizes fragment energy into predictable, controllable effects.",
              "Chaos-aligned usage unleashes raw fragment potential — more powerful but with unpredictable side effects.",
              "The tension between these approaches defines Dominion politics, military doctrine, and personal identity.",
            ],
          },
          {
            aspect: "Augmentation Source",
            details: [
              "Fragment shards power the augmentation process — every mechanical enhancement draws on fragment energy.",
              "Higher-tier augmentations require purer, more concentrated fragments, making supply a constant strategic concern.",
            ],
          },
        ],
        lore_notes: [
          "The original Fracture event occurred approximately 1,200 years before the current era. Its cause is debated — natural cosmic event, failed experiment, or deliberate act.",
          "Fragment deposits are finite. The Dominion's expansion is partially driven by the need for new fragment sources.",
          "Prolonged fragment exposure without proper shielding causes 'Fragment Drift' — a gradual blurring of the boundary between the user's body and the energy itself.",
          "Some Forge Councilors theorize that sufficient fragment concentration could replicate the Fracture on a smaller scale — an idea that is officially forbidden but secretly researched.",
        ],
        influence_on_philosophy: [
          "The Fracture taught the Dominion that reality is not fixed but malleable — and that those who understand this malleability hold power.",
          "The Knowledge/Chaos divide is a direct response to the dual nature of fragment energy: it can build or destroy.",
          "The Iron Doctrine's emphasis on engineering and discipline is fundamentally a survival response — without structure, fragment energy consumes its users.",
          "The Dominion views other dimensions' mystical traditions as primitive interpretations of the same underlying reality that fragments represent.",
        ],
        keywords: [
          "The Fracture",
          "Fragment Energy",
          "Entropic Crystallization",
          "Knowledge-Chaos Duality",
          "Scientific Resource",
        ],
      },
      historical_background: {
        origins:
          "The Iron Dominion began as scattered industrial city-states competing for fragment deposits in the aftermath of the Fracture. For centuries, warlords and petty engineers fought over shards, using crude fragment-powered weapons that were as dangerous to their users as their enemies. Unity came only when the first Arch-Fabricator, Maren Koss, demonstrated that coordinated Grid warfare could defeat any individual power.",
        rise_to_power:
          "Under the Forge Council system, the Dominion consolidated fragment research, standardized augmentation, and built the Forge-Cities — vast industrial complexes that serve as both factories and fortresses. Within three generations, the scattered city-states became a continental empire, powered by relentless innovation and the Iron Doctrine.",
        major_conflicts: [
          {
            name: "The Fracture Wars",
            description:
              "The centuries-long conflict between fragment-wielding city-states that preceded the Dominion's unification. Brutal, chaotic, and wasteful — everything the modern Dominion defines itself against.",
          },
          {
            name: "The Fracture Rebellion",
            description:
              "A civil war sparked by rogue Chaos-aligned engineers who sought to weaponize fragment instability without restraint. The rebellion was crushed, but it permanently established the Knowledge/Chaos tension as the Dominion's central political divide.",
          },
          {
            name: "The Construct Uprising",
            description:
              "A brief but terrifying period when early autonomous constructs, poorly designed without proper fragment safeguards, turned on their creators. Led to strict regulations on construct intelligence and mandatory human oversight of all war machines.",
          },
        ],
      },
      culture_philosophy: {
        overview:
          "The Iron Dominion's culture is inseparable from its industry. Creativity is expressed through engineering; beauty is found in efficiency; and community is built around the shared work of the Forge. Citizens who do not serve in the military contribute through manufacture, research, or logistics — there is no idle class.",
        three_pillars_expanded: [
          {
            pillar: "Forge",
            focus:
              "Innovation, creation, and the relentless improvement of everything. Citizens are judged by what they build, not what they inherit.",
          },
          {
            pillar: "Grid",
            focus:
              "Community, coordination, and mutual support. No individual is more important than the system — but every individual is essential to the system.",
          },
          {
            pillar: "Spark",
            focus:
              "Ambition, risk-taking, and the courage to push boundaries. Fragment research is the frontier, and those who explore it are the Dominion's heroes.",
          },
        ],
        cultural_practices: [
          "The Calibration Festival: an annual event where citizens display inventions, soldiers demonstrate augmentations, and commanders are publicly evaluated.",
          "The Forge Oath: every citizen's coming-of-age ceremony, where they pledge to improve one thing in the Dominion before they die.",
          "Construct Exhibitions: competitive events where engineers pit their creations against each other in controlled combat arenas.",
        ],
        symbols: [
          "The Gear-and-Flame: the Dominion's official emblem, representing the union of mechanical precision and fragment energy.",
          "Blueprint tattoos: soldiers and engineers mark their skin with schematics of their greatest achievements.",
          "Fragment glass: windows and decorative elements made from spent fragment shards, glowing faintly with residual energy.",
        ],
      },
      military_traditions: {
        battlefield_philosophy: [
          "War is an engineering problem. Define variables, control conditions, solve for victory.",
          "Every battle lost is a prototype that failed. Study it, improve the design, test again.",
          "The optimal outcome is an enemy that surrenders before engagement — because the math of the battle is already decided.",
        ],
        forge_rites: [
          "Before major engagements, Gearwrights perform the Calibration Rite — a systematic check of all weapons, augmentations, and war machines.",
          "Commanders present battle plans to their peers for 'stress testing' — deliberate attempts to find flaws before the enemy does.",
          "After battle, the Forge Accounting: a meticulous analysis of every decision, shot fired, and fragment spent, seeking improvements.",
        ],
        unit_naming_conventions: [
          "Units are named for their function (Shock Infantry, Steam Artillery Crew) rather than mystical concepts.",
          "Individual war machines receive names from their pilots — often technical terms, historical engineers, or dry humor.",
          "Elite units earn designation codes that become informal nicknames (e.g., 'The 7th Grid' becomes 'Lucky Sevens').",
        ],
      },
      geography_strongholds: {
        overview:
          "The Iron Dominion occupies a vast industrial landscape scarred by the ancient Fracture. Massive Forge-Cities rise from mineral-rich plains, connected by steam-rail networks and defended by concentric rings of fortifications. The terrain itself bears the marks of fragment energy — crystallized spires, slag fields, and rivers that glow faintly with residual entropic charge.",
        sacred_sites: [
          {
            name: "The Axiom Crucible",
            description:
              "The Arch-Fabricator's personal laboratory and the Dominion's most advanced research facility. Located in the heart of Forge-Prime, it sits atop the largest known fragment deposit. Access is restricted to Forge Councilors and personally invited researchers.",
          },
          {
            name: "The Fracture Scar",
            description:
              "The epicenter of the original Fracture event — a massive canyon where reality still flickers and fragment energy pools naturally. Heavily fortified and mined for raw fragments, it is both the Dominion's most valuable resource and its most dangerous location.",
          },
          {
            name: "Forge-Prime",
            description:
              "The capital Forge-City and seat of the Forge Council. A sprawling metropolis of factories, academies, and barracks, surrounded by concentric walls bristling with fragment-powered defenses. The sound of hammering and steam venting never stops.",
          },
        ],
        battlefield_features: [
          "Slag fields: flat, barren terrain ideal for Grid formations and long-range artillery, but offering minimal cover.",
          "Fragment crystalline forests: spires of crystallized fragment energy that interfere with Grid signals but can be tapped for emergency power.",
          "Steam vents: geothermal features that provide natural cover with dense steam clouds but can scald unwary units.",
          "Rail networks: the Dominion's train lines double as rapid deployment corridors; controlling rail junctions is often a battle objective.",
        ],
      },
      unique_phenomena: {
        overview:
          "The Iron Dominion's deep entanglement with fragment energy produces unique battlefield phenomena that no other faction experiences. These effects are byproducts of concentrated fragment usage and the lingering influence of the ancient Fracture.",
        phenomena: [
          {
            name: "Fragment Cascades",
            description:
              "When multiple fragment effects activate simultaneously in proximity, they can cascade — each effect amplifying the next in a chain reaction. Can produce devastating results but risks total fragment depletion for all nearby units.",
            gameplay_effect:
              "When 3+ fragment effects activate within 2 units of each other in a single turn, a Cascade triggers. Roll on the Cascade table: results range from massive allied buffs to catastrophic friendly fire.",
          },
          {
            name: "Grid Ghosts",
            description:
              "Residual data echoes in the Grid network, manifesting as phantom signals or false unit readings. Experienced commanders learn to distinguish real data from ghosts, but the phenomenon can confuse both sides.",
            gameplay_effect:
              "When Grid cohesion drops below 50%, there is a 20% chance of Grid Ghost interference — enemy units may receive false information about Dominion positions, or Dominion units may respond to phantom commands.",
          },
          {
            name: "Forge Awakening",
            description:
              "In areas of extreme fragment concentration, dormant machinery and abandoned constructs may spontaneously activate. These 'Forge Woken' constructs are uncontrolled and attack anything nearby, but a skilled Gearwright can attempt to redirect them.",
            gameplay_effect:
              "On battlefields near fragment deposits, there is a chance per turn that a neutral construct activates. It attacks the nearest unit unless a Gearwright spends an action to attempt control (60% success rate).",
          },
        ],
      },
      faction_keywords: [
        "Industrial Supremacy",
        "Clockwork Engineering",
        "Fragment Science",
        "Augmentation Culture",
        "Grid Warfare",
        "Forge Philosophy",
      ],
    },
    {
      id: "veilbound-shogunate",
      name: "The Veilbound Shogunate",
      theme:
        "Eldritch samurai civilization, discipline-driven horror, reality-alteration through martial enlightenment",
      flavor_text:
        "The Veilbound Shogunate is an ancient warrior civilization that blends rigid samurai discipline with exposure to incomprehensible cosmic entities. Unlike factions that descend into madness through eldritch contact, the Veilbound believe madness is a failure of preparation. Through strict ritual, absolute obedience, and relentless self-denial, they train their minds and bodies to survive truths that shatter lesser beings. They are feared not for their numbers, but for their inevitability.",
      motif_description:
        "Traditional samurai armor fused with non-Euclidean geometry. Masks as sacred symbols of self-removal. Subtle reality distortions around elite warriors. Weapons that appear slightly out of phase with the world.",
      core_philosophy:
        "Perfection through the erasure of self. Order used as a gateway to the unknowable. Follows the doctrine of The Three Veils — the Veil of Flesh (illusion of the body), the Veil of Thought (lie of a sovereign mind), and the Veil of Reality (the greatest deception: that the universe operates by consistent rules). True warriors seek to pierce all three.",
      faction_bonuses: [
        "All units gain +1 morale resistance (disciplined self-denial)",
        "Enemy units suffer -1 morale when engaged in melee by Veilbound (psychological dread)",
        "Elite warriors cause minor reality distortion — adjacent enemies have 10% miss chance",
        "Commanders cannot be broken by fear or morale effects",
      ],
      playstyle_notes:
        "The Veilbound Shogunate fields armies that appear calm, sparse, and restrained — until combat begins. They emphasize precision over numbers, psychological collapse over brute destruction, and decisive engagements that feel preordained. Observers report battles that feel scripted, as though the Veilbound knew the outcome long before blades were drawn.",
      worldview: [
        "Individual identity is temporary and ultimately irrelevant.",
        "Names are tools, not truths.",
        "Death is neither failure nor release — it is merely misalignment.",
        "Victory is achieved when an enemy no longer understands how they were defeated.",
      ],
      eldritch_relationship:
        "The Veilbound do not worship eldritch entities. They regard them as Teachers, Mirrors, and Tests of worth. These beings are never named publicly. Knowledge of them is restricted by rank, and even high-ranking commanders understand only fragments of the greater truth.",
      political_structure:
        "Ruled by an inscrutable figure known as The Shrouded Shogun, beneath whom exist layered hierarchies of masked lords, commanders, and ritual warriors. Authority is absolute, but leadership is not inherited — it is endured.",
      three_veils: {
        overview:
          "The Three Veils Doctrine is the central philosophical and tactical framework of the Veilbound Shogunate. It governs personal conduct, battlefield strategy, and the use of cosmic powers. Every soldier, from the lowliest Ashigaru to the Shrouded Shogun, is trained to recognize and pierce these veils.",
        veils: [
          {
            name: "The Veil of Flesh",
            concept:
              "The body is an imperfect vessel; clinging to it is folly.",
            implications: [
              "Pain is disregarded in favor of efficiency.",
              "Injuries are tolerated if the mission continues.",
              "Mutations or minor corruption from fragments or spirit bonds are accepted as enhancements rather than deformities.",
            ],
            mechanics: [
              "Units with this understanding gain stability bonuses when in danger.",
              "High bond cavalry units can temporarily ignore damage penalties.",
            ],
            symbol:
              "Armor adorned with subtle cracks glowing with cosmic light.",
          },
          {
            name: "The Veil of Thought",
            concept:
              "The mind is not sovereign; fear, doubt, and ego are illusions.",
            implications: [
              "Ritual meditation strengthens mental resilience.",
              "Soldiers are trained to respond instinctively, relying on cosmic perception rather than conventional tactics.",
            ],
            mechanics: [
              "Units operating under high Ritual Flow gain predictive bonuses in duels or counterattacks.",
              "Corruption events are less likely to affect veterans or highly bonded riders.",
            ],
            symbol:
              "Masks featuring shifting patterns that reflect mental clarity or focus.",
          },
          {
            name: "The Veil of Reality",
            concept:
              "The universe is inconsistent and fluid; rules of cause and effect are malleable to those who understand the truth.",
            implications: [
              "Advanced warriors may perform feats that appear impossible to outsiders: phasing attacks, multi-location strikes, and battlefield manipulation.",
              "The Veilbound may willingly enter extreme transformations or summon spirit-bound entities without fear.",
            ],
            mechanics: [
              "High-level commanders and ascended units can temporarily alter movement zones or create battlefield distortions.",
              "The risk/reward system peaks here: powerful effects may destabilize units if mishandled.",
            ],
            symbol:
              "Weapons, banners, or mounts subtly shifting in impossible geometries.",
          },
        ],
        doctrine_in_practice: {
          training:
            "Every Veilbound warrior undergoes physical, mental, and ritualized training corresponding to each veil.",
          hierarchy_integration:
            "Understanding the Veils is mandatory for promotion. A failure to recognize or pierce a veil can result in ritual demotion or execution.",
          combat_philosophy:
            "Battles are fought not only with steel but with perception. Success is measured by efficiency, control of momentum, and enlightenment milestones rather than casualty counts.",
        },
        keywords: [
          "Ritualized Warfare",
          "Mental Discipline",
          "Cosmic Perception",
          "Transformation Mechanics",
          "Momentum-Based Combat",
        ],
      },
      hierarchy: {
        overview:
          "The Veilbound Shogunate is a strictly stratified society where rank is earned through mastery of the Three Veils, combat prowess, and ritual dedication. Hierarchy is fluid only in the sense that advancement must be proven through trial and cosmic alignment, not birthright.",
        ranks: [
          {
            title: "The Shrouded Shogun",
            role: "Supreme leader of the faction; both military and spiritual authority.",
            responsibilities: [
              "Oversees all military campaigns.",
              "Performs and supervises high-order rituals.",
              "Decides the fate of commanders and provinces.",
            ],
            characteristics: [
              "Cloaked in a mask that fully conceals identity.",
              "Wields a spirit-bound weapon of unknown origin.",
              "Rarely seen directly on the battlefield, appearing only in decisive moments.",
            ],
          },
          {
            title: "Masked Lords",
            role: "Regional or divisional commanders.",
            responsibilities: [
              "Manage fleets of spirit riders and infantry.",
              "Conduct advanced rituals tied to fragments or yokai.",
              "Mentor mid-ranking commanders.",
            ],
            characteristics: [
              "Elaborate masks that reflect rank and accomplishments.",
              "Often ride uniquely bonded spirit beasts.",
              "Have access to limited battlefield-altering abilities.",
            ],
          },
          {
            title: "Elite Commanders",
            role: "Mid-level officers; direct control over specific squadrons or units.",
            responsibilities: [
              "Tactical decision-making in battle.",
              "Training and bonding with mounted units.",
              "Execution of rituals that affect battlefield momentum.",
            ],
            characteristics: [
              "Masks more ornate than standard warriors, less than Masked Lords.",
              "Can unlock temporary transformations mid-battle.",
            ],
          },
          {
            title: "Ritual Captains",
            role: "Specialized officers responsible for Ritual Flow management.",
            responsibilities: [
              "Coordinate spiritual support units and ceremonies.",
              "Maintain bond levels between mounted warriors and spirit beasts.",
              "Provide battlefield buffs or manipulate enemy perception.",
            ],
            characteristics: [
              "Often carry sigils, talismans, or ceremonial banners.",
              "Do not always ride into combat; many operate from central positions.",
            ],
          },
          {
            title: "Standard Warriors",
            role: "Core infantry and support units.",
            responsibilities: [
              "Execute orders with precision.",
              "Engage in duels or standard combat missions.",
              "Generate Ritual Flow for elite units.",
            ],
            characteristics: [
              "Wear masks of simpler design.",
              "Armor reflects basic cosmic patterns but is less mutable.",
            ],
          },
          {
            title: "Initiates / Apprentices",
            role: "Low-ranking soldiers and new recruits.",
            responsibilities: [
              "Observe and learn under senior commanders.",
              "Participate in minor rituals.",
              "Prepare for full ascension through The Veils.",
            ],
            characteristics: [
              "Simplified ceremonial dress.",
              "Minimal cosmic embellishments until proven worthy.",
            ],
          },
        ],
        titles_table: [
          {
            title: "The Shrouded Shogun",
            significance: "Supreme ruler",
            notes: "Rarely seen, absolute authority",
          },
          {
            title: "Masked Lord",
            significance: "Regional/Divisional Commander",
            notes: "Mask reflects accomplishments and alignment with The Veils",
          },
          {
            title: "Elite Commander",
            significance: "Squadron leader",
            notes: "May unlock temporary transformations",
          },
          {
            title: "Ritual Captain",
            significance: "Ritual and support officer",
            notes: "Critical for bond management",
          },
          {
            title: "Starblade Samurai / Spirit Rider Captain",
            significance: "High-level unit leaders",
            notes: "Often serve as battlefield exemplars",
          },
          {
            title: "Warrior Initiate",
            significance: "New recruit",
            notes: "Must complete trials to advance",
          },
        ],
        hierarchy_notes: [
          "Advancement is based solely on demonstrated mastery of combat, ritual, and bond systems.",
          "Mask designs are living symbols of rank — patterns may subtly change as the wearer gains power or bond.",
          "Ritual authority and battlefield authority are intertwined, meaning that a competent ritualist can out-rank a stronger fighter if their abilities alter the battle's outcome.",
        ],
        keywords: [
          "Masked Hierarchy",
          "Ritual Authority",
          "Spirit Bond Command",
          "Ascension-Based Rank",
          "Combat Meritocracy",
        ],
      },
      shrouded_shogun: {
        title: "The Shrouded Shogun",
        role: "Supreme leader of the Veilbound Shogunate",
        faction_rank: "Highest authority (military, spiritual, and political)",
        aliases: [
          "The Veiled One",
          "Keeper of the Final Cut",
          "Shadow Beyond the Mask",
        ],
        summary:
          "The Shrouded Shogun is the embodiment of the Veilbound philosophy: a figure both human and alien, whose presence commands awe and terror. Rarely seen directly, the Shogun's actions shape the faction's strategy, military campaigns, and spiritual doctrine.",
        appearance: [
          "Fully masked, with the mask seemingly made from living void that subtly shifts in impossible patterns.",
          "Armor is ceremonial, black lacquer fused with starlight filaments and ink-like veins that flow as if alive.",
          "Mount: A colossal spirit beast, part dragon, part shrine, partially phasing between dimensions.",
          "Aura: Reality around the Shogun subtly bends, causing distant observers to see multiple forms or ghostly afterimages.",
        ],
        personality: [
          {
            trait: "Cold and Calculated",
            description:
              "Every action is deliberate; improvisation exists only within the bounds of ritual.",
          },
          {
            trait: "Detached Yet Observant",
            description:
              "Rarely intervenes directly in low-tier conflicts but will decisively appear in battles that matter.",
          },
          {
            trait: "Philosophical Mentor",
            description:
              "Occasionally imparts cryptic lessons to commanders and initiates.",
          },
          {
            trait: "Strategic Omniscience",
            description:
              "Known for anticipating enemy actions as if perceiving beyond the flow of time.",
          },
        ],
        abilities: [
          {
            name: "Veil Piercing",
            description:
              "Can temporarily see through all enemy tactics, giving the faction strategic foresight.",
          },
          {
            name: "Spirit Convergence",
            description:
              "Calls forth fragments and spirit beasts to the battlefield, enhancing Ritual Flow for all units.",
          },
          {
            name: "Reality Rend",
            description:
              "At high bond or critical battle moments, can perform an area-altering strike that temporarily distorts movement and visibility for enemies.",
          },
          {
            name: "Final Cut Manifestation",
            description:
              "Rarely used in full form \u2014 the Shogun may phase their weapon into multiple locations at once, symbolically severing reality.",
          },
        ],
        faction_role: [
          {
            area: "Spiritual Authority",
            detail:
              "Interprets fragments and cosmic guidance. Rituals performed under the Shogun's direction are considered flawless.",
          },
          {
            area: "Military Oversight",
            detail:
              "Approves campaigns and appoints Masked Lords and Elite Commanders based on proven mastery.",
          },
          {
            area: "Cultural Figurehead",
            detail:
              "Embodies the Veilbound's philosophy of piercing the Three Veils; often the subject of tales and lessons for new initiates.",
          },
        ],
        lore_notes: [
          "Observers from other factions often report seeing the Shogun simultaneously in multiple locations or perceiving them in two places at once.",
          "Some believe that the Shogun is not fully human, having merged partially with a cosmic entity.",
          "The true identity is unknown, even to the faction's highest ranks \u2014 only the mask remains consistent.",
        ],
        keywords: [
          "Supreme Commander",
          "Masked Authority",
          "Reality Manipulation",
          "Spirit Bond Nexus",
          "Cosmic Samurai Leader",
        ],
      },
      transformation_stages: {
        overview:
          "The Veilbound Shogunate's warriors do not remain static. Through years of ritual, combat, and cosmic exposure, soldiers evolve physically, mentally, and spiritually. This evolution is known as the Transformation Stages, representing increasing mastery of the Three Veils and deeper alignment with eldritch forces. All elite units and commanders progress through these stages over time, with each stage unlocking new abilities, tactical options, and risks.",
        stages: [
          {
            name: "The Masked",
            stage_number: 1,
            overview:
              "The entry stage for fully trained soldiers and newly promoted commanders. Soldiers maintain human form and wear masks that symbolize mastery of the Veil of Flesh.",
            physical: [
              "Traditional samurai armor, subtly enhanced with cosmic motifs.",
              "Masks display simple patterns, sometimes glowing faintly.",
              "Slight distortion around weapons or armor may hint at latent eldritch energy.",
            ],
            abilities: [
              "Standard combat skills.",
              "Minor Ritual Flow generation.",
              "Limited access to dual-stance mechanics.",
            ],
            behavior: [
              "Follow strict orders and formation.",
              "Excel in Honor Stance (defensive, disciplined).",
              "Engage in duels to train for Revelation Stance.",
            ],
          },
          {
            name: "The Unbound",
            stage_number: 2,
            overview:
              "Warriors at this stage have pierced the first two veils: Flesh and Thought. They display partial reality-warping abilities and are beginning to merge with their spirit beasts.",
            physical: [
              "Armor and masks start to shift in non-Euclidean ways.",
              "Subtle extra limbs or appendages may manifest during combat.",
              "Spirit bonds are visually evident: mounts may glow, ripple, or phase partially.",
            ],
            abilities: [
              "Access to both Honor and Revelation Stances with greater effectiveness.",
              "Enhanced mobility and reaction speed.",
              "Unlock transformation-based attacks (Ascended Charge).",
              "Moderate risk of corruption events if mismanaged.",
            ],
            behavior: [
              "Capable of independent tactical decision-making.",
              "Can perform high-level duels, flanking maneuvers, and battlefield manipulations.",
              "Begin mentoring Masked units, reinforcing morale and Ritual Flow.",
            ],
          },
          {
            name: "Hollow Lords",
            stage_number: 3,
            overview:
              "The pinnacle of Veilbound evolution, typically reserved for commanders and the most elite warriors. At this stage, warriors have pierced all Three Veils and partially fused with cosmic entities.",
            physical: [
              "Armor and masks are fully eldritch, sometimes appearing as living voids or shifting constellations.",
              "Spirit beasts may appear to merge with the rider; outlines blur between the two.",
              "Weapons appear in multiple locations or slightly out of phase with reality.",
            ],
            abilities: [
              "Maximum access to dual stance mechanics.",
              "Reality manipulation, battlefield-altering powers, and extreme momentum bonuses.",
              "Immense combat power, but unstable \u2014 mistakes may result in corruption or uncontrolled mutations.",
            ],
            behavior: [
              "Operate as force multipliers on the battlefield.",
              "Can challenge multiple enemy units simultaneously.",
              "Serve as living symbols of the Three Veils doctrine.",
            ],
          },
        ],
        progression_notes: [
          "Advancement requires combat experience, successful rituals, and bond alignment with spirit beasts.",
          "Transformation is not instantaneous; improper training can stall or corrupt growth.",
          "Players commanding these units must consider risk vs. reward \u2014 Hollow Lords are incredibly powerful but can destabilize armies if mismanaged.",
        ],
        keywords: [
          "Veilbound Transformation",
          "Spirit Bond Evolution",
          "Ascended Samurai",
          "Momentum Combat Mechanics",
          "Dual-Entity Units",
        ],
      },
      military_doctrine: {
        overview:
          "The Veilbound Shogunate's military doctrine emphasizes precision, rhythm, and ritualized violence. Unlike conventional armies that rely on overwhelming numbers or brute force, the Veilbound excel at flowing combat, manipulation of enemy perception, and momentum-based strikes. Every unit, from infantry to spirit-bound cavalry, participates in a coordinated, almost dance-like battlefield performance.",
        core_principles: [
          {
            name: "Momentum is Victory",
            details: [
              "Battles are fought like a sequence of flowing strikes.",
              "Units gain bonuses when chain actions succeed (e.g., flanking, countering, ritual completions).",
              "Loss of momentum can cause entire formations to falter.",
            ],
          },
          {
            name: "Dual-Entity Synergy",
            details: [
              "Rider and spirit beast operate as a single unit.",
              "Effective management of bond levels allows for advanced abilities, transformations, and battlefield manipulation.",
              "Separation of rider and beast, whether by terrain or enemy action, reduces effectiveness dramatically.",
            ],
          },
          {
            name: "Ritual Flow Management",
            details: [
              "Ritual units, captains, and ceremonial banners create and manage Flow.",
              "High Flow allows elite units to activate special stances or perform Ascended Charges.",
              "Mismanagement can leave critical units unable to access their abilities.",
            ],
          },
          {
            name: "Precision Over Numbers",
            details: [
              "The Veilbound rarely rely on massed infantry assaults.",
              "Battles are planned for targeted strikes, exploiting enemy weaknesses, and focusing on high-value units.",
              "Even smaller forces can overwhelm larger armies with perfect execution.",
            ],
          },
          {
            name: "Psychological Warfare",
            details: [
              "Masked and Hollow Lord units manipulate perception.",
              "Enemy units may experience fear, disorientation, or hallucinations in proximity to high-ranking Veilbound.",
              "Observers describe Veilbound attacks as inevitable, which can erode morale.",
            ],
          },
        ],
        battlefield_behavior: [
          {
            name: "Standard Engagements",
            details: [
              "Infantry forms defensive lines while supporting cavalry initiates flanking maneuvers.",
              "Ritual units maintain Flow, ensuring elite units remain empowered.",
              "Skirmishers and scouts harass enemy flanks and secure objectives.",
            ],
          },
          {
            name: "Elite Strikes",
            details: [
              "Spirit Rider Cavalry performs rapid flanking, Ascended Charges, and multi-target duels.",
              "Elite infantry execute precision duels or infiltrations to disrupt enemy formations.",
            ],
          },
          {
            name: "Momentum Exploitation",
            details: [
              "Successive actions from bonded units increase bonuses across nearby allies.",
              "Chain effects amplify speed, attack, and bond generation, creating a crescendo of devastation.",
              "When momentum is broken (failed rituals, bond loss, mispositioning), units can enter a temporary state of instability, reducing effectiveness.",
            ],
          },
          {
            name: "Transformation Integration",
            details: [
              "Stage II (Unbound) and Stage III (Hollow Lords) units serve as tactical anchors.",
              "Their transformations can shift the tide of battle but must be carefully timed to avoid friendly disruption.",
            ],
          },
        ],
        strategic_notes: [
          "Commanders must balance risk and reward: pushing transformations too early can destabilize forces; waiting too long may forfeit momentum.",
          "Terrain and positioning are critical; Veilbound units often exploit elevation, natural corridors, and lines of sight to maximize Flow.",
          "Observers from other factions often report battles as a performance rather than chaotic combat, with Veilbound forces appearing eerily synchronized.",
        ],
        keywords: [
          "Momentum-Based Combat",
          "Dual-Entity Units",
          "Ritual Flow Management",
          "Precision Warfare",
          "Psychological Manipulation",
          "Ascended Charges",
        ],
      },
      war_machines_lore: {
        overview:
          "The Veilbound Shogunate's War Machines, often referred to as Titans, are massive spirit-bound entities fused with ritual constructs. Unlike mechanical war engines, these Titans are part eldritch, part samurai tradition, reflecting the faction's core philosophy: the merging of mortal discipline with incomprehensible cosmic forces. They are few in number but battlefield-defining, capable of turning engagements through sheer presence, devastating attacks, and reality-warping abilities. War Machines are slow, costly, and difficult to maintain, requiring both Ritual Flow and elite personnel to operate effectively.",
        general_characteristics: [
          {
            trait: "Dual Nature",
            detail:
              "Majestic and divine in appearance, but their true form hints at horror and unpredictability.",
          },
          {
            trait: "Bonded Operation",
            detail:
              "Typically commanded by Stage II or Stage III warriors; the pilot and the Titan must maintain perfect synchronization.",
          },
          {
            trait: "Battlefield Impact",
            detail:
              "War Machines influence terrain, morale, and momentum; many attacks cause area-wide psychological effects.",
          },
          {
            trait: "Maintenance",
            detail:
              "Requires significant Ritual Flow and preparation before deployment; cannot be replaced quickly if destroyed.",
          },
        ],
        tactical_role: [
          "Serve as anchors for elite cavalry and infantry.",
          "Often used to control critical zones, block enemy advances, or disrupt formations.",
          "Require careful synchronization with commanders; mismanagement can render them vulnerable despite raw power.",
        ],
        keywords: [
          "Spirit-Bound Titans",
          "Dual Nature War Machines",
          "Reality-Warping Constructs",
          "Ascended Battlefield Units",
          "Ritual Flow Anchors",
        ],
      },
      signature_weapons: {
        overview:
          "The Veilbound Shogunate wields weapons that are extensions of their philosophy, designed to channel Ritual Flow, spirit bonds, and cosmic perception. These weapons are not mere tools; they are living conduits that blur the line between samurai mastery and eldritch influence. Many are only usable by Stage II (Unbound) or Stage III (Hollow Lord) warriors, and some are permanently bonded to their wielder.",
        core_traits: [
          {
            trait: "Dual-Phase Presence",
            detail:
              "Weapons often appear in multiple locations simultaneously during combat.",
          },
          {
            trait: "Ritual Channeling",
            detail:
              "Infused with cosmic energy, enabling battlefield-altering strikes.",
          },
          {
            trait: "Spirit Integration",
            detail:
              "Some weapons bond to spirit beasts, amplifying combined abilities.",
          },
          {
            trait: "Visual Manifestation",
            detail:
              "Weapons shimmer with starlight, ink-like voids, or shifting geometry.",
          },
        ],
        weapons: [
          {
            name: "Final Cut Katana",
            type: "Katana (single-handed or dual-wieldable by masters)",
            wielder: "High-ranking Hollow Lords and select commanders",
            properties:
              "Can phase partially through reality, allowing multi-location strikes.",
            lore: "Said to sever the 'fabric of causality' in rare circumstances.",
          },
          {
            name: "Nagato of the Veil",
            type: "Naginata (polearm)",
            wielder:
              "Stage II Unbound warriors specializing in momentum strikes",
            properties: "Generates shockwaves that warp enemy positioning.",
            lore: "Carved with cosmic sigils that glow when enemies are nearby.",
          },
          {
            name: "Inkblade of the Hollow",
            type: "Dual short swords",
            wielder: "Skirmishers and elite duelists",
            properties:
              "Leaves afterimages that confuse enemy perception; integrates minor fragments of the wielder's spirit.",
            lore: "Forged from the voided ink of collapsed rituals.",
          },
          {
            name: "Spirit Banner of the Star Serpent",
            type: "Ceremonial Banner/Weapon Hybrid",
            wielder: "Banner carriers, often in elite cavalry squadrons",
            properties:
              "Amplifies Ritual Flow in nearby units; occasionally animates spirit constructs.",
            lore: "Represents the Veilbound's dual nature \u2014 ceremonial and martial simultaneously.",
          },
          {
            name: "Komainu Fang Halberd",
            type: "Halberd",
            wielder: "Defensive cavalry or ritual guards",
            properties: "Can counter-charge multiple enemies; emits fear aura.",
            lore: "Designed in honor of the guardian beasts of sacred shrines.",
          },
          {
            name: "Dreampiercer Bow",
            type: "Longbow",
            wielder: "Ranged specialists and select ritualists",
            properties:
              "Arrows phase through minor obstacles and temporarily distort enemy senses.",
            lore: "Crafted with fragments of fallen celestial spirits; arrow trails shimmer like moonlight on ink.",
          },
          {
            name: "Lotus Blossom Blades",
            type: "Twin daggers",
            wielder:
              "Ritual assassins or Hollow Lords performing transformation attacks",
            properties:
              "Can temporarily summon phantom copies to strike additional targets; boosts Ritual Flow on successful kills.",
            lore: "Forged from sacred lotus petals imbued with cosmic energy.",
          },
        ],
        tactical_notes: [
          "Signature weapons are rare and unique, usually tied to unit specialization or commander rank.",
          "Proper management enhances battlefield performance; misuse may drain Ritual Flow or destabilize bonds.",
          "Many weapons gain additional abilities when wielded alongside spirit-bound cavalry or high-level Ritual Flow units.",
        ],
        keywords: [
          "Spirit-Infused Weapons",
          "Dual-Phase Arms",
          "Ritual Channeling",
          "Hollow Lord Artifacts",
          "Momentum Amplification",
        ],
      },
      cosmic_entity: {
        overview:
          "The Veilbound Shogunate does not worship in the conventional sense. Instead, they are agents and vessels of a vast, unknowable cosmic entity known only as 'The Shimmering Beyond'. This entity exists outside conventional reality, bridging dimensions and perception, and serves as both teacher and ultimate test for the faction.",
        primary_name: "The Shimmering Beyond",
        aliases: [
          "The Infinite Reflection",
          "Void of Silent Truth",
          "The Unbroken Horizon",
        ],
        nature: [
          {
            trait: "Formless",
            detail:
              "The entity has no fixed shape; glimpses suggest constantly shifting geometric and organic structures.",
          },
          {
            trait: "Reality-Warping",
            detail:
              "Its presence can bend space and time around mortal perception.",
          },
          {
            trait: "Eldritch Wisdom",
            detail:
              "It communicates through visions, rituals, and fragments, often incomprehensible without proper training.",
          },
        ],
        relationship: [
          {
            aspect: "Guidance Through Fragments",
            details: [
              "Soldiers and commanders receive fragmentary visions or objects that allow access to forbidden techniques.",
              "These fragments require interpretation; misuse can lead to corruption or disaster.",
            ],
          },
          {
            aspect: "Testing Worthiness",
            details: [
              "The entity presents challenges or illusions to ensure only the disciplined advance through the Three Veils.",
              "Hollow Lords and the Shrouded Shogun themselves are considered vessels partially aligned with the Shimmering Beyond.",
            ],
          },
          {
            aspect: "Enhancing Ritual Flow",
            details: [
              "Ritual units channel the entity's energy to empower elite units and war machines.",
              "During key battles, fragments may temporarily alter battlefield physics, increasing unpredictability.",
            ],
          },
        ],
        lore_notes: [
          "Very few outside the Veilbound understand its nature. Observers often report shifting geometry, multiple overlapping shadows, and impossible movements during its indirect influence.",
          "Some believe the entity does not distinguish between friend and foe; it simply tests, instructs, and observes.",
          "The Shrouded Shogun is rumored to have a direct alignment, allowing partial manifestation of the entity's power.",
        ],
        influence_on_philosophy: [
          "Every aspect of Veilbound doctrine, hierarchy, and military practice is a response to or preparation for the Shimmering Beyond's influence.",
          "The Three Veils doctrine itself is a codified interpretation of lessons provided by the entity, aiming to prepare warriors for cosmic truth.",
          "Rituals, combat styles, and transformations are designed to safely harness fragmentary insights without succumbing to madness.",
        ],
        keywords: [
          "Eldritch Cosmic Entity",
          "Reality-Warping Teacher",
          "Fragment-Based Power",
          "Ritual Influence",
          "Test of Worthiness",
        ],
      },
      historical_background: {
        origins:
          "The Veilbound Shogunate began as a secretive clan of samurai who discovered fragments of the Shimmering Beyond. Initially, they were scholars seeking knowledge, but exposure to eldritch energies forced them to blend martial discipline with cosmic ritual.",
        rise_to_power:
          "Through centuries, the Shogunate conquered neighboring regions by outmaneuvering armies with superior Flow manipulation and momentum chains, eventually becoming a dominant military power.",
        major_conflicts: [
          {
            name: "The Veil Wars",
            description:
              "Battles against rival clans seeking fragments of the Beyond. These grueling campaigns tested the limits of Ritual Flow warfare and forced the Shogunate to refine their Three Veils doctrine under fire.",
          },
          {
            name: "The Hollow Rebellion",
            description:
              "Early Hollow Lord experiments caused internal strife; only those loyal to the Three Veils survived. The rebellion was both a civil war and a spiritual crisis, reshaping the hierarchy permanently.",
          },
        ],
      },
      culture_philosophy: {
        overview:
          "The Veilbound Shogunate's culture is inseparable from its military doctrine. Every aspect of life — from daily training to festival celebrations — is infused with cosmic awareness and martial discipline.",
        three_veils_expanded: [
          {
            veil: "Flesh Veil",
            focus:
              "Discipline, physical mastery, and endurance. Warriors train their bodies to withstand the strain of channeling Ritual Flow and bonding with spirit beasts.",
          },
          {
            veil: "Thought Veil",
            focus:
              "Tactical acumen, strategic awareness, and momentum usage. Commanders study battlefield patterns as cosmic equations, reading Flow currents like a language.",
          },
          {
            veil: "Spirit Veil",
            focus:
              "Ritual Flow mastery, spirit beast bonding, and cosmic alignment. The highest veil connects warriors directly to the Shimmering Beyond.",
          },
        ],
        ritual_practices: [
          "Daily combat drills infused with small fragments of the Shimmering Beyond.",
          "Ceremonial duels to maintain unit cohesion and test commanders' judgment.",
          "Spirit offerings to maintain bond with War Machines and mounts.",
        ],
        symbols: [
          "Ink sigils, masks, and banners all encode fragments of eldritch truths.",
          "Celestial patterns represent alignment with Shimmering Beyond fragments.",
        ],
      },
      military_traditions: {
        battlefield_philosophy: [
          "Use precision, momentum, and Flow manipulation over brute force.",
          "Elite units and commanders operate as extensions of the cosmic fragments they wield.",
        ],
        ritual_warfare: [
          "Even small skirmishes are treated as ritualized tests, with commanders observing outcomes to determine unit evolution.",
          "War Machines (Titans) are only deployed after a proper ritual alignment, as mismanagement can warp reality or fracture Flow chains.",
        ],
        unit_naming_conventions: [
          "Names reflect cosmic alignment or martial archetypes (e.g., Moonlit Duelists, Lotus Ascetics).",
          "Elite and commander units often receive personal titles tied to deeds or cosmic visions.",
        ],
      },
      geography_strongholds: {
        overview:
          "The Veilbound Lands are mountainous regions interlaced with floating shrines, ritual towers, and Spirit Sanctuaries. The terrain itself resonates with Ritual Flow, creating natural phenomena that both protect and challenge inhabitants.",
        sacred_sites: [
          {
            name: "The Three Veils Monastery",
            description:
              "Training ground for all elite units. Perched atop an impossible peak where three mountain ridges converge, the monastery exists partially in the material world and partially within the Shimmering Beyond.",
          },
          {
            name: "Inkspire Tower",
            description:
              "Center of Ritual Flow amplification. A towering spire of living ink that serves as both library and amplifier, channeling Flow across the entire Veilbound territory.",
          },
        ],
        battlefield_features: [
          "Fog-laden valleys where Ritual Flow pools naturally, creating zones of enhanced power and unpredictable effects.",
          "Ink-filled rivers that respond to nearby Flow manipulation, forming temporary barriers or bridges.",
          "Floating shrine fragments that drift across battlefields, providing cover and Flow amplification to nearby units.",
        ],
      },
      unique_phenomena: {
        overview:
          "The Veilbound Shogunate's deep connection to the Shimmering Beyond produces supernatural battlefield effects that no other faction experiences.",
        phenomena: [
          {
            name: "Veil Storms",
            description:
              "Random reality-bending events that occur when Flow is over-accumulated on a battlefield. Terrain shifts, gravity warps, and phantom echoes of past battles manifest. Both a danger and an opportunity for skilled commanders.",
            gameplay_effect:
              "When total Ritual Flow on the battlefield exceeds a threshold, a Veil Storm triggers — randomizing terrain, buffing or debuffing units unpredictably, and potentially summoning spirit echoes.",
          },
          {
            name: "Spirit Echoes",
            description:
              "Lingering traces of fallen commanders or War Machines that can assist or disrupt battles. These echoes retain fragments of their former abilities and may act autonomously.",
            gameplay_effect:
              "When a commander or War Machine is destroyed, there is a chance a Spirit Echo persists for 1-3 turns, performing weakened versions of the original's abilities.",
          },
          {
            name: "Fragmentary Visions",
            description:
              "Players controlling commanders may receive optional vision-based quests or missions that influence unit evolution. These visions come from the Shimmering Beyond and offer risk-reward choices.",
            gameplay_effect:
              "At certain Flow thresholds, commanders receive vision cards offering bonus abilities or evolution points in exchange for completing specific battlefield objectives.",
          },
        ],
      },
      faction_keywords: [
        "Eldritch Discipline",
        "Samurai Horror",
        "Reality Manipulation",
        "Masked Hierarchy",
        "Ritualized Warfare",
        "Cosmic Enlightenment",
      ],
    },

    {
      id: "nightfang-dominion",
      name: "The Nightfang Dominion",
      theme: "Vampiric tiger empire, plague corruption, thrall armies, blood magic",
      flavor_text:
        "From the blood-drenched jungles of the Crimson Maw, the Nightfang Dominion stalks forth — an empire of cursed predators who spread vampiric corruption like wildfire. Once mortal warlords and great jungle cats, they were transformed by the Scarlet Blight, a plague of sentient blood that fused beast and noble into something neither alive nor dead. Now their thrall armies march in endless waves, their tiger-lords prowl the battlefield draining the life from all they touch, and the corruption they carry reshapes the very land beneath their claws.",
      motif_description:
        "Crimson and black armor adorned with tiger pelts and fang motifs. Thrall infantry wear tattered remnants of their former lives. War beasts trail corruption mist. Commanders are regal vampiric figures with tiger-like features — slit pupils, elongated canines, striped skin, and clawed gauntlets dripping with ichor.",
      core_philosophy:
        "The Nightfang believe all living things are merely blood waiting to be consumed. Their empire is a hierarchy of predation — the strong feed on the weak, and the weak are reborn as thralls to serve. They see corruption not as a curse but as evolution: the Scarlet Blight 'perfects' mortal flesh by stripping away weakness. Their ultimate goal is the Great Feeding — to spread the Blight across the entire world until all living things are either Nightfang or thrall.",
      faction_bonuses: [
        "Corruption Spread: When a Nightfang unit deals melee damage, the target gains 1 Corruption token. Units with 3+ tokens suffer -1 ATK and -1 MOR.",
        "Blood Tithe: Nightfang units may sacrifice 1 HP to gain +1 ATK die for one attack. Commanders may sacrifice 2 HP to draw 1 card.",
        "Hunger Pool: Each enemy model destroyed adds 1 to the faction Hunger Pool. At 5 Hunger: all units +1 MOV. At 10: all units +1 ATK. At 15: Commander heals 3 HP.",
        "Nocturnal Predators: Nightfang units gain +1 DEF when in terrain or areas with the 'shadow' or 'cover' keyword."
      ],
      playstyle_notes:
        "The Nightfang Dominion is an aggressive, attrition-based faction that grinds opponents down through corruption debuffs and blood-fueled surges. They field cheap thrall hordes backed by elite tiger warriors and massive corrupted war beasts. The Hunger Pool rewards aggressive play — the more you kill, the stronger you become. Blood Tithe lets you trade HP for burst power at critical moments. Their weakness is low baseline DEF on many units and reliance on momentum — if they stall, they lack the defensive tools of Iron Dominion or the Flow synergy of the Veilbound.",
      worldview: [
        "All flesh is prey. The only question is when it will be consumed.",
        "The Blight is not a curse — it is liberation from the weakness of mortality.",
        "A thrall serves in death as it never could in life. This is mercy.",
        "The strong feed. The weak are fed upon. This is the natural order.",
        "Blood is memory, power, and prophecy. To drink is to know."
      ],
      political_structure:
        "The Nightfang Dominion is a feudal blood aristocracy. The Blood Patriarch rules supreme, with Blood Dukes and Duchesses governing conquered territories. Below them are the Fang Generals who command armies, and beneath them the Plague Heralds who spread corruption ahead of the main force. At the bottom are the thralls — mindless infected servants who form the bulk of the army. Social mobility exists only through the Blooding: a ritual where a mortal is deliberately infected with concentrated Blight, either ascending to vampiric nobility or degenerating into a mindless thrall. Only about 1 in 10 survive the Blooding with their mind intact.",
      blood_creed: {
        overview:
          "The Blood Creed is the Nightfang Dominion's guiding doctrine — three tenets that govern everything from warfare to governance. Each tenet corresponds to a pillar of their corrupted civilization.",
        tenets: [
          {
            name: "The Tenet of Consumption",
            concept: "All resources — blood, territory, soldiers — exist to be consumed and converted into Nightfang power.",
            implications: [
              "Enemy casualties fuel the Hunger Pool, making the army stronger",
              "Conquered territories are corrupted and transformed into Blight-lands",
              "Prisoners are either Blooded (turned) or drained for the Blood Tithe",
              "Nothing is wasted — even destroyed units leave corruption zones"
            ],
            mechanics: [
              "Hunger Pool generation on kills",
              "Blood Tithe HP sacrifice for ATK/card draw",
              "Corruption tokens on damaged enemies"
            ],
            symbol: "An open maw dripping with blood — the Consuming Jaw"
          },
          {
            name: "The Tenet of Propagation",
            concept: "The Blight must spread. Every battle is an opportunity to infect, convert, and expand the Dominion's reach.",
            implications: [
              "Corruption Spread mechanic debuffs enemies over time",
              "Plague Heralds and support units specialize in applying Corruption at range",
              "Heavily corrupted enemies become less effective, making them easier prey",
              "The faction rewards long engagements where corruption accumulates"
            ],
            mechanics: [
              "Corruption tokens applied via melee and certain abilities",
              "Corruption threshold at 3+ tokens: -1 ATK, -1 MOR to enemy",
              "Some units gain bonuses against corrupted targets"
            ],
            symbol: "A spreading stain of crimson veins — the Creeping Blight"
          },
          {
            name: "The Tenet of Dominance",
            concept: "The apex predator rules. Strength, cunning, and ferocity determine rank. The weak serve; the strong command.",
            implications: [
              "Commanders are powerful individual fighters, not just support pieces",
              "Tiger units and war beasts are elite apex predators with high ATK",
              "Challenge mechanic is thematically central — Nightfang commanders seek duels",
              "Thralls are expendable but numerous, screening for the true predators"
            ],
            mechanics: [
              "Commanders have above-average ATK stats",
              "Tiger/beast units gain Pack Tactics (+1 ATK when 2+ attack same target)",
              "Thrall units are cheap but low MOR — they Rout easily without commander support"
            ],
            symbol: "A tiger skull crowned with thorns — the Apex Crown"
          }
        ],
        creed_in_practice: {
          training: "Nightfang warriors are not trained — they are transformed. The Blooding process rewrites their instincts, making them faster, stronger, and utterly loyal to the Blood Patriarch. Thralls require no training at all; they follow simple commands driven by the Blight's hive-instinct.",
          hierarchy_integration: "Rank in the Nightfang Dominion is determined by the potency of one's blood. The more concentrated the Blight in a warrior's veins, the more powerful and intelligent they become. This creates a natural hierarchy where the strongest naturally command.",
          combat_philosophy: "Nightfang warfare is a hunt. Scout units identify prey, thrall hordes pin them in place, and elite tiger warriors deliver the killing blow. Corruption softens targets over time, and the Hunger Pool ensures the hunt grows more frenzied as casualties mount."
        },
        keywords: ["Blood Creed", "Consumption", "Propagation", "Dominance", "The Hunt"]
      },
      hierarchy: {
        overview:
          "The Nightfang hierarchy is a strict blood-caste system. Rank is determined by the concentration and purity of the Scarlet Blight in one's veins. The highest-ranking Nightfang are nearly immortal apex predators; the lowest are barely-conscious thralls driven by hunger alone.",
        ranks: [
          {
            title: "Blood Patriarch / Matriarch",
            role: "Supreme ruler of the Dominion",
            responsibilities: [
              "Commands all Nightfang forces and territories",
              "Performs the Grand Blooding to create new vampiric nobles",
              "Channels the deepest Blight powers",
              "Sets the direction of the Great Feeding"
            ],
            characteristics: [
              "Immortal, immensely powerful",
              "Can command thralls telepathically across vast distances",
              "Tiger transformation is permanent — a massive, regal beast-form"
            ]
          },
          {
            title: "Blood Duke / Duchess",
            role: "Territorial governor and senior commander",
            responsibilities: [
              "Rules a conquered region in the Patriarch's name",
              "Commands multiple armies",
              "Performs regional Bloodings to replenish forces",
              "Manages the corruption infrastructure"
            ],
            characteristics: [
              "Near-immortal, can shift between human and tiger forms at will",
              "Commands deep Blight sorcery",
              "Maintains a court of lesser vampires"
            ]
          },
          {
            title: "Fang General",
            role: "Senior military commander",
            responsibilities: [
              "Leads armies in the field",
              "Coordinates thrall hordes with elite units",
              "Executes the tactical hunt"
            ],
            characteristics: [
              "Powerful combatant with partial tiger transformation",
              "Strong tactical instincts — the Blight enhances predatory cunning",
              "Can issue Blood Commands to nearby thralls"
            ]
          },
          {
            title: "Plague Herald",
            role: "Corruption vanguard and spiritual leader",
            responsibilities: [
              "Spreads the Blight ahead of the main army",
              "Performs corruption rituals on battlefields",
              "Converts prisoners and manages Blooding ceremonies"
            ],
            characteristics: [
              "Deeply infected — body is more Blight than flesh",
              "Can project corruption at range",
              "Revered as prophets by the lower castes"
            ]
          },
          {
            title: "Tiger Warrior",
            role: "Elite frontline combatant",
            responsibilities: [
              "Serves as the killing blow in Nightfang tactics",
              "Hunts high-value targets",
              "Leads packs of lesser units"
            ],
            characteristics: [
              "Partial tiger transformation — claws, fangs, enhanced senses",
              "High combat prowess",
              "Pack mentality — fights best alongside other tiger warriors"
            ]
          },
          {
            title: "Thrall",
            role: "Expendable infantry and labor",
            responsibilities: [
              "Forms the bulk of Nightfang armies",
              "Absorbs enemy attacks to protect elite units",
              "Overwhelms through numbers"
            ],
            characteristics: [
              "Mindless — driven by the Blight's hunger",
              "Low combat skill but numerous",
              "Crumbles without commander presence"
            ]
          }
        ],
        titles_table: [
          { title: "Blood Patriarch", significance: "Lord of the Dominion", notes: "Hereditary through strongest Blight lineage" },
          { title: "Blood Duke/Duchess", significance: "Regional Overlord", notes: "Appointed by Patriarch after proving strength" },
          { title: "Fang General", significance: "Army Commander", notes: "Earned through battlefield kills" },
          { title: "Plague Herald", significance: "Corruption Priest", notes: "Chosen by the Blight itself — involuntary" },
          { title: "Blood Champion", significance: "Elite Warrior", notes: "Won through ritual combat (Challenge)" },
          { title: "Thrallmaster", significance: "Horde Commander", notes: "Controls thralls through Blight-link" }
        ],
        hierarchy_notes: [
          "Rank challenges are common — any Nightfang can challenge a superior to single combat for their position",
          "The Blooding ceremony determines initial rank — stronger transformations yield higher starting positions",
          "Thralls are not considered people — they are resources, weapons, and shields",
          "The Blood Patriarch's word is absolute law, enforced by the Blight-link"
        ],
        keywords: ["Blood Hierarchy", "Blooding", "Thrall-Caste", "Apex Dominance"]
      },
      blood_patriarch: {
        title: "Lord Sanguinar, the First Fang",
        role: "Ruler and progenitor of the Nightfang Dominion",
        faction_rank: "Blood Patriarch",
        aliases: ["The Crimson Tiger", "Father of the Blight", "The Undying Maw"],
        summary:
          "Lord Sanguinar was once a mortal jungle warlord who discovered the Scarlet Blight in the heart of the Crimson Maw — a sentient blood-plague that had festered in the corpse of an ancient god-beast. He drank from its wounds and was transformed into the first vampire tiger, a being of terrible beauty and insatiable hunger. Over centuries, he has built the Nightfang Dominion by spreading the Blight to worthy warriors and unleashing thrall armies upon the unconquered lands. He is both king and predator, ruling through strength, cunning, and the absolute authority of the Blight-link.",
        appearance: [
          "Towering figure with pale skin marked by tiger-stripe scarification that pulses with crimson light",
          "Eyes are solid gold with vertical slit pupils",
          "Elongated canines visible even when his mouth is closed",
          "Wears ornate crimson and black plate armor adorned with real tiger skulls and preserved fangs",
          "In battle, partially transforms — arms become clawed tiger limbs, spine extends into a prehensile tail"
        ],
        personality: [
          { trait: "Patient Predator", description: "Sanguinar thinks in centuries. He is never rushed, never panicked — every battle is just one hunt in an eternal campaign." },
          { trait: "Aristocratic Cruelty", description: "He maintains courtly manners even while ordering mass Bloodings. Cruelty is refined, never crude." },
          { trait: "Territorial Obsession", description: "He views all land as prey-territory to be claimed. Losing ground enrages him more than losing soldiers." },
          { trait: "Paternal Toward the Blight", description: "He genuinely sees the Blight as his child and the infected as his family — in his twisted way, he believes he is saving the world." }
        ],
        abilities: [
          { name: "Blight Communion", description: "Telepathically commands all thralls within 24\" — they act with coordinated precision rather than mindless stumbling." },
          { name: "Crimson Transformation", description: "Once per battle, fully transforms into a massive tiger form. ATK +3, MOV +4, gains Terrifying. Lasts 2 turns." },
          { name: "The Red Feast", description: "After destroying an enemy unit in melee, heals HP equal to that unit's original HP value." }
        ],
        faction_role: [
          { area: "Military", detail: "Supreme commander of all Nightfang forces; personally leads the Great Hunt campaigns" },
          { area: "Political", detail: "Absolute monarch; his Blight-link allows him to sense and command any infected being in the Dominion" },
          { area: "Spiritual", detail: "Regarded as the voice of the Blight itself; his word is divine law to the infected" }
        ],
        lore_notes: [
          "Has survived over 800 years — the Blight halts aging entirely",
          "The Crimson Maw, his homeland, is now a permanently corrupted jungle where the trees bleed and the rivers run red",
          "His personal guard, the Crimson Twelve, are the twelve strongest Blooded warriors in the Dominion",
          "Has never lost a Challenge duel — challengers are permitted, even encouraged, but none have survived"
        ],
        keywords: ["Blood Patriarch", "First Fang", "Blight Communion", "Crimson Transformation", "The Red Feast"]
      },
      corruption_stages: {
        overview:
          "The Scarlet Blight transforms its hosts in three stages. Each stage grants greater power but pushes the host further from humanity. Most thralls are stuck at Stage 1; elite warriors reach Stage 2; only the oldest and most powerful Nightfang achieve Stage 3.",
        stages: [
          {
            name: "The Quickening",
            stage_number: 1,
            overview: "Initial infection. The Blight enters the bloodstream and begins rewriting the host's biology. Most thralls never progress beyond this stage.",
            physical: [
              "Skin pales, veins become visible as dark crimson lines",
              "Eyes develop a reddish tint",
              "Canines extend slightly",
              "Enhanced strength and speed, but clumsy — body is still adapting"
            ],
            abilities: [
              "Basic Corruption Spread on melee attacks",
              "Reduced need for sleep or food (sustained by the Blight)",
              "Minor wound regeneration between battles"
            ],
            behavior: [
              "Thralls at this stage are driven by hunger — barely sentient",
              "Warriors who maintain their mind gain predatory focus",
              "Heightened aggression, reduced empathy"
            ]
          },
          {
            name: "The Feral Ascent",
            stage_number: 2,
            overview: "The Blight fully integrates with the host. Tiger-like features emerge. The warrior becomes a true predator — faster, stronger, and instinctively cunning.",
            physical: [
              "Tiger-stripe markings appear across the skin, glowing faintly with Blight energy",
              "Hands can shift into clawed tiger paws at will",
              "Senses become superhuman — can track prey by blood-scent alone",
              "Partial transformation possible — spine, limbs, and jaw can shift to tiger form"
            ],
            abilities: [
              "Enhanced Corruption Spread — affects targets at 2\" range",
              "Blood Drain: melee kills restore 1 HP",
              "Pack Tactics: +1 ATK when attacking with another Nightfang unit",
              "Night Vision: no penalties in darkness or low-light"
            ],
            behavior: [
              "Maintains full intelligence with enhanced predatory instincts",
              "Strong pack bonding with other Stage 2+ warriors",
              "Territorial — will fiercely defend claimed areas"
            ]
          },
          {
            name: "The Apex Form",
            stage_number: 3,
            overview: "The ultimate expression of the Blight. The host can fully transform into a massive tiger-beast and back. They are apex predators in every sense — nearly immortal, devastatingly powerful, and radiating corruption.",
            physical: [
              "Can fully shift between humanoid and massive tiger form at will",
              "In tiger form: 8-foot tall at the shoulder, armored hide, saber-fangs",
              "Blight energy visibly pulses through veins — body glows faintly crimson",
              "Wounds close almost instantly — must be killed outright or they regenerate"
            ],
            abilities: [
              "Full Transformation: switch between forms as a free action",
              "Corruption Aura: all enemies within 3\" gain 1 Corruption token per turn",
              "Apex Strike: once per battle, make an attack with double ATK dice",
              "Blight Regeneration: heal 1 HP at the start of each friendly turn"
            ],
            behavior: [
              "Perfectly balanced between bestial instinct and aristocratic intelligence",
              "Views all non-Nightfang as prey — not with malice, but with absolute certainty",
              "Commands the respect (and fear) of all lesser Nightfang"
            ]
          }
        ],
        progression_notes: [
          "Thralls typically remain at Stage 1 permanently — they lack the will to progress",
          "Warriors who survive the Blooding with their minds intact usually reach Stage 2 within a year",
          "Stage 3 takes decades or centuries — it requires immense willpower and an extraordinary concentration of Blight",
          "The Blood Patriarch is rumored to be beyond Stage 3 — a theoretical Stage 4 that no one else has achieved"
        ],
        keywords: ["Quickening", "Feral Ascent", "Apex Form", "Blooding", "Blight Stages"]
      },
      military_doctrine: {
        overview: "Nightfang warfare follows the pattern of a great hunt. Every battle has three phases: the Stalk (reconnaissance and positioning), the Drive (thrall hordes pin the enemy), and the Kill (elite tigers and war beasts deliver the finishing blow).",
        core_principles: [
          "Numbers win the Drive, but quality wins the Kill",
          "Corruption is a weapon — every wound you inflict weakens the enemy further",
          "Blood Tithe at the right moment can turn a losing battle into a rout",
          "The Hunger Pool is your clock — as it fills, your army accelerates toward inevitable victory"
        ],
        battlefield_tactics: [
          "Screen with thralls to absorb ranged fire and pin enemy units",
          "Flank with cavalry and scouts to isolate high-value targets",
          "Commit tiger warriors and war beasts only when corruption has softened the enemy",
          "Keep your commander safe early — they fuel the entire army through Blood Commands"
        ]
      },
      war_machines_lore: {
        overview:
          "Nightfang war machines are not built — they are grown. Massive tiger-beasts, corrupted megafauna, and Blight-mutated horrors serve as living engines of destruction. Each is a unique creature, shaped by centuries of Blight exposure into something truly monstrous.",
        characteristics: [
          "Living creatures, not mechanical constructs",
          "Radiate Corruption Aura — enemies nearby gain Corruption tokens",
          "Self-healing through Blight Regeneration",
          "Terrifying presence causes morale checks in nearby enemies"
        ],
        tactical_role:
          "Nightfang war beasts serve as the apex predators of the battlefield. They are the Kill phase incarnate — sent in after thralls have pinned the enemy, they break through defensive lines and devour everything in their path."
      },
      signature_weapons: {
        overview: "Nightfang weapons are extensions of the Blight itself — organic, dripping with corruption, and designed to infect as much as they wound.",
        core_traits: [
          { trait: "Blight-Forged", detail: "All Nightfang weapons are grown from corrupted bone and sinew, not forged from metal. They are living extensions of the wielder." },
          { trait: "Infectious Edge", detail: "Every wound from a Nightfang weapon carries the risk of corruption. Even a scratch can begin the Quickening in the vulnerable." },
          { trait: "Blood-Bonded", detail: "Nightfang weapons are bonded to their wielder's bloodstream. They cannot be used by non-infected beings." }
        ],
        weapons: [
          { name: "Crimson Fang Blade", type: "Melee Sword", wielder: "Tiger Warriors", properties: "Corruption Spread, Blood Drain on kill", lore: "Grown from the canine of a Stage 3 predator, sharpened to a molecular edge" },
          { name: "Blight Bow", type: "Ranged Bow", wielder: "Corruption Scouts", properties: "18\" range, applies 1 Corruption token on hit", lore: "Sinew-strung bow that fires bone-tipped arrows dripping with concentrated Blight" },
          { name: "Plague Censer", type: "Area Support", wielder: "Plague Heralds", properties: "3\" AoE Corruption application", lore: "A swinging brazier filled with burning Blight-matter that spreads infectious mist" },
          { name: "Thrall Glaive", type: "Melee Polearm", wielder: "Fang Guard", properties: "Reach 2\", basic Corruption Spread", lore: "Mass-produced bone weapon given to thrall officers — crude but effective" },
          { name: "The Patriarch's Claw", type: "Melee Gauntlet", wielder: "Lord Sanguinar", properties: "ATK +2, Blood Drain, Corruption Aura 3\"", lore: "Not a weapon but Sanguinar's own transformed hand — five razor claws that can shear through plate armor" }
        ],
        tactical_notes: [
          "Nightfang weapons prioritize infection over immediate damage — chip damage that corrupts is often more valuable than a clean kill",
          "Blood-bonded weapons cannot be looted or used by other factions",
          "War beast natural weapons (claws, fangs, tail) all carry Corruption Spread by default"
        ],
        keywords: ["Blight-Forged", "Blood-Bonded", "Crimson Fang", "Corruption Weaponry"]
      },
      crimson_wellspring: {
        overview: "The Scarlet Blight originated from the Crimson Wellspring — a wound in reality where an ancient god-beast died and its blood seeped into the earth, mutating over millennia into a sentient plague.",
        origin: "Deep beneath the jungles of the Crimson Maw, the god-beast Raktavana fell in a primordial war and bled for ten thousand years. Its divine blood mixed with the earth, the water, the beasts, and eventually achieved a form of sentient hunger — the Scarlet Blight.",
        nature: "The Blight is not truly alive nor truly dead. It is a self-replicating pattern of corruption that rewrites biological systems to serve its singular drive: to feed and to spread. It communicates through blood — those infected can sense its desires as instinctual urges.",
        relationship_to_fragments: "Nightfang fragments are crystallized nodes of concentrated Blight — so dense with corrupted god-blood that they've solidified into crimson gems. They pulse with the Wellspring's hunger and amplify the Blight's effects in nearby units."
      },
      plague_origin:
        "The Nightfang Dominion's relationship with the Scarlet Blight is symbiotic — the Blight provides power, transformation, and near-immortality, and the Nightfang provide it with new hosts and new territories to infect. Lord Sanguinar, as the first host, has the deepest connection and can direct the Blight's evolution to some degree. But even he admits that the Blight has its own will — sometimes it transforms warriors in unexpected ways, creates new strains of corruption, or drives thralls to strange behaviors. The Nightfang do not fully control the Blight. They ride it, like a tiger rides the storm.",
      historical_background: {
        origins:
          "800 years ago, the warlord Sanguinar led his tiger-clan into the forbidden heart of the Crimson Maw jungle, seeking the legendary blood of Raktavana. He found it — and it found him. The Scarlet Blight erupted from the Wellspring, infecting Sanguinar and his entire warband. Most became mindless thralls. Sanguinar alone maintained his consciousness, transformed into the first vampire tiger. He claimed dominion over the thralls, declared himself Blood Patriarch, and began the Long Hunt — the systematic conquest and corruption of the surrounding kingdoms.",
        rise_to_power:
          "Over centuries, the Nightfang Dominion has consumed twelve kingdoms, three empires, and countless tribes. Each conquest adds to the thrall army and provides new warriors for the Blooding. The Dominion's territory is the Blight-Lands — a vast corrupted region where normal life cannot survive. Cities become nesting grounds, forests become hunting preserves, and rivers become arteries of infection. The other great powers — the Iron Dominion and the Veilbound Shogunate — have so far resisted, but the Nightfang are patient. They have eternity.",
        major_conflicts: [
          "The Long Hunt (ongoing) — the systematic expansion of Nightfang territory",
          "The Siege of Iron Gate — a failed assault on Iron Dominion's border fortress, repelled by Grid Cohesion artillery",
          "The Crimson Tide — a massive naval invasion of the Veilbound coast, partially successful before Ritual Flow countermeasures contained the corruption",
          "The Blooding Wars — internal power struggles between rival Blood Dukes, resulting in the current stable hierarchy"
        ]
      },
      culture_philosophy: {
        overview: "Nightfang culture is a paradox — refined aristocratic manners layered over absolute predatory ruthlessness. They hold elaborate courts, compose blood-poetry, and observe complex social rituals, even as they drain captives and unleash plague upon the living.",
        pillar_expansion: [
          "Blood is sacred — it carries memory, power, and the Blight's will",
          "The Hunt is the highest art — all other pursuits are secondary",
          "Strength determines worth — the weak serve, the strong rule",
          "Corruption is evolution — the Blight perfects what nature left incomplete"
        ],
        practices: [
          "The Blooding: the central ritual of Nightfang society, where mortals are infected with concentrated Blight to either ascend or become thralls",
          "Blood Court: monthly gathering where nobles present trophies from their hunts and compete for the Patriarch's favor",
          "The Red Feast: a celebration after major victories where the Hunger Pool's accumulated power is channeled into a mass healing/enhancement ritual",
          "Challenge Duels: any Nightfang can challenge a superior to single combat for their rank — this keeps the hierarchy strong"
        ],
        symbols: [
          "The Crimson Maw — symbol of the homeland and the endless hunger",
          "The Tiger Skull Crown — symbol of rank and dominance",
          "The Spreading Vein — symbol of the Blight's reach and inevitability",
          "The Apex Fang — symbol of the perfect predator"
        ]
      },
      military_traditions: {
        battlefield_philosophy:
          "War is a hunt. The prey is identified, stalked, cornered, and consumed. There is no honor in fair fights — only in successful kills. The Nightfang do not seek glory; they seek feeding grounds.",
        rites_of_warfare: [
          "Before battle, commanders drink from the Hunger Cup — a vessel filled with the blood of previous victories",
          "Thralls are released first, always — they are the beaters that flush the prey",
          "The Kill is sacred — the commander or elite unit that delivers the final blow claims the strongest blood",
          "After battle, the Blight is allowed to claim the field — corruption zones mark Nightfang victories permanently"
        ],
        naming_conventions: [
          "Nobles take blood-titles: Sanguinar (blood ruler), Hemora (blood healer), Mortivex (death weaver)",
          "Military ranks use predator terminology: Fang General, Claw Captain, Pack Leader",
          "Thralls are not named — they are numbered in their horde designation",
          "War beasts are named for their most notable kill"
        ]
      },
      geography_strongholds: {
        overview: "The Nightfang Dominion occupies the Blight-Lands — a vast swath of corrupted territory centered on the Crimson Maw jungle. The land itself is infected: trees bleed, rivers run red, and the soil births fungal horrors. Normal armies cannot survive long in Blight-Lands without succumbing to corruption.",
        sacred_sites: [
          { name: "The Crimson Wellspring", description: "The source of the Blight, deep beneath the Crimson Maw. Guarded by the Patriarch's personal thralls. A place of terrible power where the god-beast Raktavana's blood still flows." },
          { name: "The Bone Palace", description: "Lord Sanguinar's seat of power — a massive fortress grown from corrupted bone and sinew, alive with the Blight's pulse. It shifts and rebuilds itself constantly." },
          { name: "The Red March", description: "A corrupted highway connecting Nightfang territories, paved with hardened Blight-matter. Nightfang units move at double speed along it." },
          { name: "The Breeding Pits", description: "Underground caverns where war beasts are grown from concentrated Blight. Each pit produces a unique strain of creature." }
        ],
        battlefield_features: [
          { name: "Corruption Zone", description: "Areas of active Blight infection. Count as Difficult Terrain for non-Nightfang. Nightfang units gain +1 DEF while in Corruption Zones." },
          { name: "Blood Pool", description: "Terrain feature. Any unit that enters must pass a MOR check or gain 1 Corruption token." },
          { name: "Blight Spore Cloud", description: "Obscuring terrain. Blocks LOS beyond 6\". Non-Nightfang units inside gain 1 Corruption token per turn." },
          { name: "Feeding Ground", description: "Objective terrain. Nightfang units on a Feeding Ground heal 1 HP per End Phase." }
        ]
      },
      unique_phenomena: {
        overview: "The Scarlet Blight generates supernatural phenomena on and around the battlefield. These effects are unique to the Nightfang Dominion and reflect the living, hungry nature of their corruption.",
        phenomena: [
          { name: "The Red Mist", description: "A crimson fog that rolls across the battlefield when the Hunger Pool reaches 10+. Provides Light Cover to all Nightfang units.", gameplay_effect: "At Hunger 10+, all Nightfang units gain Light Cover (+1 DEF vs ranged) regardless of position." },
          { name: "Blight Eruption", description: "When a Nightfang War Machine is destroyed, the concentrated Blight inside erupts outward in a 3\" radius.", gameplay_effect: "When a Nightfang War Machine is destroyed, all units within 3\" gain 2 Corruption tokens." },
          { name: "Blood Frenzy", description: "When the Hunger Pool reaches 15, the accumulated bloodlust drives all Nightfang units into a killing frenzy.", gameplay_effect: "At Hunger 15, all Nightfang units gain +1 ATK and Fearless until end of battle. Cannot be reversed." },
          { name: "Thrall Surge", description: "Nearby thrall units sometimes spontaneously swarm toward wounded enemies, driven by the Blight's hunger instinct.", gameplay_effect: "Once per turn, a Thrall unit within 6\" of a wounded enemy (below half HP) may make a free 3\" move toward that enemy." },
          { name: "The Patriarch's Will", description: "Lord Sanguinar can project his consciousness through the Blight-link, temporarily enhancing any unit on the battlefield.", gameplay_effect: "Once per battle, the Nightfang commander may give any one friendly unit within 18\" an immediate free activation (move + attack)." }
        ]
      },
      faction_keywords: [
        "Corruption Spread",
        "Blood Tithe",
        "Hunger Pool",
        "Blight-Forged",
        "Apex Predator",
        "Thrall Horde"
      ]
    },
  ],
  commanders: [
    {
      name: "Lord Calculon",
      faction: "iron-dominion",
      title: "The Gear-Hearted",
      flavor_text:
        "Once a man of flesh, now a being of perfect logic and cold steel. His heart ticks with the precision of a thousand gears, and his mind calculates victory before the battle begins.",
      theme: "Cold, calculated, tactical genius",
      personality:
        "Emotionless, methodical, speaks in precise terms. Values efficiency above all else.",
      playstyle: "Command-heavy, regiment coordination, war machine efficiency",
      base_stats: {
        Command: 8,
        Knowledge: 10,
        Leadership: 7,
        Agility: 5,
        Health: 100,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 10, MOV: 5, RNG: 6, MOR: 9 },
      points_cost: 21,
      level_1_deck: {
        command: ["Strategic Advance", "Coordinated Assault"],
        tech: ["Gear Synchronization", "Precision Calibration"],
        fragment: ["Stable Core Activation"],
        tactical: ["Calculated Strike"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Enhanced Calculations (+1 Command)",
          chaos: "Fragment Surge (risk: +2 attack, -1 stability)",
          tactical: "Quick Deployment",
        },
        level_3: {
          knowledge: "Predictive Algorithms",
          chaos: "Unstable Amplification",
          tactical: "Flanking Protocols",
        },
        level_4: {
          knowledge: "Master Tactician",
          chaos: "Chaos Conduit",
          tactical: "Rapid Response",
        },
        level_5: {
          knowledge: "Perfect Formation",
          chaos: "Reality Bend",
          tactical: "Multi-Front Assault",
        },
        level_6: {
          knowledge: "Clockwork Precision",
          chaos: "Fragment Storm",
          tactical: "Tactical Superiority",
        },
        level_7: {
          knowledge: "War Machine Mastery",
          chaos: "Unstable Overcharge",
          tactical: "Combined Arms",
        },
        level_8: {
          knowledge: "Strategic Dominance",
          chaos: "Chaotic Empowerment",
          tactical: "Battlefield Control",
        },
        level_9: {
          knowledge: "Analytical Perfection",
          chaos: "Fragment Overload",
          tactical: "Supreme Command",
        },
        level_10: {
          knowledge: "Ascended Calculator",
          chaos: "Chaos Avatar",
          tactical: "Grand Strategist",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Master Strategist",
          description:
            "Precise command, stable fragment boosts. All units gain +1 to hit, war machines activate with 100% reliability.",
          abilities: [
            "Perfect Coordination",
            "Stable Fragment Aura",
            "Calculated Victory",
          ],
          fragment_interaction:
            "All fragment effects are predictable and maximized without instability",
          unit_synergy:
            "Gearwright Engineers repair twice as fast; Elite Vanguard gain guaranteed critical hits",
        },
        chaos: {
          name: "Fragment Conduit",
          description:
            "Risky fragment effects, battlefield warping. High variance but devastating potential.",
          abilities: ["Reality Warp", "Unstable Surge", "Chaos Unleashed"],
          fragment_interaction:
            "Fragment effects are doubled but have 30% chance of backfire",
          unit_synergy:
            "Experimental Constructs gain +3 attack; Fragment Swarm Units multiply unpredictably",
        },
        hybrid: {
          name: "Hybrid Architect",
          description:
            "Balanced command and fragment manipulation. Moderate power with occasional surprises.",
          abilities: [
            "Adaptive Strategy",
            "Controlled Chaos",
            "Balanced Approach",
          ],
          fragment_interaction:
            "Fragment effects are 75% strength with only 10% instability chance",
          unit_synergy:
            "All units gain minor buffs; no penalties but no exceptional bonuses",
        },
      },
      signature_units: ["Gearwright Engineers"],
      strategic_notes:
        "Lord Calculon excels in large-scale battles where coordination matters. Pair him with artillery and war machines for optimal results. Avoid chaos evolution unless you enjoy gambling.",
      tags: ["knowledge-heavy", "strategic", "war-machine-focus"],
    },
    {
      name: "Lady Cogsworth",
      faction: "iron-dominion",
      title: "The Swiftblade",
      flavor_text:
        "Speed is her doctrine, surprise her sacrament. Where others see a battlefield, she sees a chessboard—and she's already three moves ahead.",
      theme: "Rapid deployment & battlefield mobility",
      personality:
        "Quick-witted, impatient, thrives on momentum. Prefers to strike before enemies can react.",
      playstyle: "Fast assaults, scouts/recon, fragment-assisted flanking",
      base_stats: {
        Command: 7,
        Knowledge: 6,
        Leadership: 8,
        Agility: 9,
        Health: 90,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 9, MOV: 9, RNG: 3, MOR: 10 },
      points_cost: 21,
      level_1_deck: {
        command: ["Swift Advance", "Flanking Maneuver"],
        tech: ["Speed Boost Module", "Rapid Deployment"],
        fragment: ["Aether Pulse Activation"],
        tactical: ["Lightning Strike"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Predictive Movement",
          chaos: "Unstable Speed Burst",
          tactical: "Scout Enhancement",
        },
        level_3: {
          knowledge: "Precision Flanking",
          chaos: "Chaotic Charge",
          tactical: "Hit and Run",
        },
        level_4: {
          knowledge: "Calculated Assault",
          chaos: "Fragment Sprint",
          tactical: "Ambush Tactics",
        },
        level_5: {
          knowledge: "Strategic Mobility",
          chaos: "Warp Speed",
          tactical: "Multi-Pronged Attack",
        },
        level_6: {
          knowledge: "Perfect Positioning",
          chaos: "Reality Dash",
          tactical: "Cavalry Mastery",
        },
        level_7: {
          knowledge: "Controlled Speed",
          chaos: "Unstable Momentum",
          tactical: "Blitz Assault",
        },
        level_8: {
          knowledge: "Master Scout",
          chaos: "Fragment Surge",
          tactical: "Rapid Dominance",
        },
        level_9: {
          knowledge: "Swift Precision",
          chaos: "Chaos Velocity",
          tactical: "Lightning War",
        },
        level_10: {
          knowledge: "Precision Tactician",
          chaos: "Unstable Skirmisher",
          tactical: "Supreme Mobility",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Precision Tactician",
          description:
            "Predictive strikes, stable boosts. Always knows where to be.",
          abilities: [
            "Predictive Strike",
            "Stable Speed Aura",
            "Perfect Timing",
          ],
          fragment_interaction: "Aether Pulse effects are 100% reliable",
          unit_synergy:
            "Clockwork Cavalry gain +2 movement; scouts reveal entire battlefield",
        },
        chaos: {
          name: "Unstable Skirmisher",
          description:
            "High-speed, random AoE effects. Unpredictable but devastating charges.",
          abilities: ["Chaotic Sprint", "Random Strike Zone", "Unstable Blitz"],
          fragment_interaction:
            "Speed fragments can teleport units but destination is random",
          unit_synergy: "Steam Recon Flyers can attack twice but may crash",
        },
        hybrid: {
          name: "Adaptive Commander",
          description:
            "Moderate mobility + fragment effects. Good overall flexibility.",
          abilities: [
            "Adaptive Movement",
            "Controlled Burst",
            "Flexible Tactics",
          ],
          fragment_interaction:
            "Speed boosts are reliable with occasional bonus effects",
          unit_synergy: "All mobile units gain +1 movement",
        },
      },
      signature_units: ["Clockwork Cavalry", "Steam Recon Flyers"],
      strategic_notes:
        "Lady Cogsworth excels at flanking and disruption. Use her to strike weak points and withdraw before enemies can respond. Ideal for smaller, mobile armies.",
      tags: ["chaos-heavy", "mobility", "flanking"],
    },
    {
      name: "Archmagister Gearbane",
      faction: "iron-dominion",
      title: "The Fragment Whisperer",
      flavor_text:
        "They call him mad. He prefers 'enlightened.' The fragments speak to him in languages the sane cannot comprehend.",
      theme: "Fragment manipulation & experimental tech",
      personality:
        "Eccentric, brilliant, obsessed with fragment research. Sees instability as opportunity.",
      playstyle: "Risk/reward fragment specialist, high chaos potential",
      base_stats: {
        Command: 5,
        Knowledge: 10,
        Leadership: 6,
        Agility: 6,
        Health: 85,
      },
      battle_stats: { ATK: 4, DEF: 3, HP: 9, MOV: 6, RNG: 6, MOR: 9 },
      points_cost: 17,
      level_1_deck: {
        command: ["Fragment Command"],
        tech: ["Experimental Protocol", "Unstable Enhancement"],
        fragment: ["Fragment Surge", "Reality Manipulation", "Chaos Tap"],
        tactical: ["Calculated Risk"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Fragment Study",
          chaos: "Unstable Experiment",
          tactical: "Risk Assessment",
        },
        level_3: {
          knowledge: "Controlled Experimentation",
          chaos: "Wild Fragment",
          tactical: "Tactical Instability",
        },
        level_4: {
          knowledge: "Fragment Mastery",
          chaos: "Chaos Infusion",
          tactical: "Calculated Chaos",
        },
        level_5: {
          knowledge: "Stable Manipulation",
          chaos: "Reality Tear",
          tactical: "Strategic Risk",
        },
        level_6: {
          knowledge: "Perfect Control",
          chaos: "Fragment Storm",
          tactical: "Balanced Instability",
        },
        level_7: {
          knowledge: "Scientific Method",
          chaos: "Unbridled Power",
          tactical: "Controlled Explosion",
        },
        level_8: {
          knowledge: "Fragment Harmony",
          chaos: "Chaos Ascension",
          tactical: "Risk Mastery",
        },
        level_9: {
          knowledge: "Unified Theory",
          chaos: "Reality Break",
          tactical: "Strategic Chaos",
        },
        level_10: {
          knowledge: "Controlled Technomancer",
          chaos: "Fragment Overlord",
          tactical: "Chaotic Engineer",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Controlled Technomancer",
          description:
            "Maximum fragment power with zero instability. The scientist's dream.",
          abilities: [
            "Perfect Fragment Control",
            "Stable Experimentation",
            "Predictable Power",
          ],
          fragment_interaction:
            "All fragments operate at 150% power with no risk",
          unit_synergy:
            "Experimental Constructs become reliable; Arcane Tinkerers boost all nearby fragments",
        },
        chaos: {
          name: "Fragment Overlord",
          description:
            "Embraces instability for devastating power. The battlefield becomes his laboratory.",
          abilities: ["Reality Shatter", "Fragment Cascade", "Chaos Overload"],
          fragment_interaction:
            "Fragment effects can chain to multiple targets but are completely unpredictable",
          unit_synergy:
            "All fragment-touched units deal 2x damage but may explode",
        },
        hybrid: {
          name: "Chaotic Engineer",
          description:
            "Balances experimentation with reliability. Takes calculated risks.",
          abilities: [
            "Controlled Experiment",
            "Managed Chaos",
            "Scientific Risk",
          ],
          fragment_interaction:
            "Fragment power is enhanced with only moderate instability",
          unit_synergy:
            "Experimental units gain +1 to all stats with 15% instability",
        },
      },
      signature_units: ["Experimental Constructs", "Fragment Swarm Units"],
      strategic_notes:
        "Archmagister Gearbane is the most fragment-focused commander. Build around fragment interactions and accept that some battles will go very right or very wrong.",
      tags: ["chaos-heavy", "fragment-specialist", "experimental"],
    },
    {
      name: "Commander Ironweld",
      faction: "iron-dominion",
      title: "The Colossus Handler",
      flavor_text:
        "Where Ironweld walks, titans follow. His war machines are not mere tools—they are extensions of his iron will.",
      theme: "Heavy mechanized assaults, war machine mastery",
      personality:
        "Patient, methodical, speaks rarely but with authority. Treats war machines like children.",
      playstyle:
        "Slow but devastating, area control, high-point war machine focus",
      base_stats: {
        Command: 9,
        Knowledge: 5,
        Leadership: 8,
        Agility: 4,
        Health: 110,
      },
      battle_stats: { ATK: 6, DEF: 5, HP: 11, MOV: 4, RNG: 3, MOR: 10 },
      points_cost: 24,
      level_1_deck: {
        command: ["War Machine Command", "Heavy Assault Order"],
        tech: ["Titan Maintenance", "Overclock Protocol", "Armor Enhancement"],
        fragment: ["Overclock Node Activation"],
        tactical: ["Crushing Advance"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Machine Efficiency",
          chaos: "Overclock Risk",
          tactical: "Heavy Support",
        },
        level_3: {
          knowledge: "Stable Engines",
          chaos: "Power Surge",
          tactical: "Titan Tactics",
        },
        level_4: {
          knowledge: "Perfect Maintenance",
          chaos: "Unstable Core",
          tactical: "Combined Arms",
        },
        level_5: {
          knowledge: "War Machine Mastery",
          chaos: "Fragment Overload",
          tactical: "Siege Warfare",
        },
        level_6: {
          knowledge: "Efficient Operation",
          chaos: "Chaotic Power",
          tactical: "Area Denial",
        },
        level_7: {
          knowledge: "Reliability",
          chaos: "Double Output",
          tactical: "Battlefield Control",
        },
        level_8: {
          knowledge: "Machine Perfection",
          chaos: "Maximum Overdrive",
          tactical: "Strategic Deployment",
        },
        level_9: {
          knowledge: "Titan Bond",
          chaos: "Chaos Engines",
          tactical: "Iron Wall",
        },
        level_10: {
          knowledge: "Mechanized Strategist",
          chaos: "Overclocked Destroyer",
          tactical: "Iron Juggernaut",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Mechanized Strategist",
          description:
            "Stable war machines with perfect reliability. Maximum efficiency.",
          abilities: [
            "Perfect Machine Bond",
            "Stable Overclock",
            "Efficient Destruction",
          ],
          fragment_interaction:
            "Overclock effects never misfire and last twice as long",
          unit_synergy:
            "All war machines gain +2 durability and cost 2 fewer points",
        },
        chaos: {
          name: "Overclocked Destroyer",
          description:
            "High-risk AoE devastation. War machines become unstable death dealers.",
          abilities: [
            "Maximum Overclock",
            "Unstable Titan",
            "Explosive Finale",
          ],
          fragment_interaction:
            "War machines deal 2x damage but have 25% chance to malfunction each turn",
          unit_synergy:
            "Clockwork Titan gains AoE explosion on death; all war machines ignore armor",
        },
        hybrid: {
          name: "Iron Juggernaut",
          description:
            "Balanced power and reliability. The safest heavy approach.",
          abilities: [
            "Reinforced Chassis",
            "Controlled Power",
            "Steady Advance",
          ],
          fragment_interaction:
            "Overclock effects are enhanced with only 10% risk",
          unit_synergy: "War machines gain +1 attack and +1 durability",
        },
      },
      signature_units: ["Clockwork Titan", "Steam Colossus"],
      strategic_notes:
        "Commander Ironweld is THE war machine commander. Invest heavily in titans and use infantry only as screens. Slow but unstoppable when built correctly.",
      tags: ["war-machine-focus", "heavy", "slow"],
    },
    {
      name: "Lady Brassveil",
      faction: "iron-dominion",
      title: "The Shadow Mechanic",
      flavor_text:
        "In the fog of war, she is the fog. Her enemies see nothing until it's far too late.",
      theme: "Tactical deception & sabotage",
      personality:
        "Mysterious, calculating, speaks in riddles. Enjoys watching carefully laid plans unfold.",
      playstyle: "Stealth units, traps, fragment sabotage",
      base_stats: {
        Command: 6,
        Knowledge: 8,
        Leadership: 7,
        Agility: 8,
        Health: 80,
      },
      battle_stats: { ATK: 5, DEF: 3, HP: 8, MOV: 8, RNG: 6, MOR: 9 },
      points_cost: 19,
      level_1_deck: {
        command: ["Hidden Deployment", "Sabotage Order"],
        tech: ["Trap Mechanism", "Stealth Field"],
        fragment: ["Reality Lens Activation", "Disruption Pulse"],
        tactical: ["Ambush Strike"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Precision Sabotage",
          chaos: "Random Disruption",
          tactical: "Trap Enhancement",
        },
        level_3: {
          knowledge: "Calculated Ambush",
          chaos: "Chaotic Interference",
          tactical: "Stealth Mastery",
        },
        level_4: {
          knowledge: "Perfect Timing",
          chaos: "Wild Sabotage",
          tactical: "Infiltration",
        },
        level_5: {
          knowledge: "Strategic Disruption",
          chaos: "Fragment Corruption",
          tactical: "Deep Strike",
        },
        level_6: {
          knowledge: "Master Planner",
          chaos: "Unstable Traps",
          tactical: "Covert Operations",
        },
        level_7: {
          knowledge: "Predictive Sabotage",
          chaos: "Chaos Bombs",
          tactical: "Shadow War",
        },
        level_8: {
          knowledge: "Perfect Disruption",
          chaos: "Random Devastation",
          tactical: "Total Infiltration",
        },
        level_9: {
          knowledge: "Surgical Precision",
          chaos: "Explosive Chaos",
          tactical: "Master Infiltrator",
        },
        level_10: {
          knowledge: "Master Saboteur",
          chaos: "Fragment Trickster",
          tactical: "Covert Architect",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Master Saboteur",
          description:
            "Precise disruption at the perfect moment. Nothing is left to chance.",
          abilities: [
            "Perfect Sabotage",
            "Predictive Ambush",
            "Calculated Disruption",
          ],
          fragment_interaction:
            "Can disable enemy fragment effects for 2 turns",
          unit_synergy: "Infiltrators always succeed; traps deal 2x damage",
        },
        chaos: {
          name: "Fragment Trickster",
          description:
            "Unpredictable sabotage that even she can't fully control.",
          abilities: [
            "Random Disruption Field",
            "Chaotic Trap",
            "Fragment Corruption",
          ],
          fragment_interaction:
            "Can redirect fragment effects to random targets",
          unit_synergy:
            "Sappers may plant extra traps randomly; infiltrators cause chain reactions",
        },
        hybrid: {
          name: "Covert Architect",
          description: "Mixed effects with reliable core sabotage.",
          abilities: [
            "Controlled Chaos",
            "Reliable Infiltration",
            "Strategic Traps",
          ],
          fragment_interaction:
            "Sabotage effects are enhanced with controlled randomness",
          unit_synergy:
            "All stealth units gain +1 attack; traps have 75% chance of bonus effect",
        },
      },
      signature_units: ["Aether Infiltrators", "Mechanical Sappers"],
      strategic_notes:
        "Lady Brassveil excels at disrupting enemy plans. Use her when facing stronger armies—she can level the playing field through sabotage.",
      tags: ["stealth", "sabotage", "defensive"],
    },
    {
      name: "High Engineer Vortan",
      faction: "iron-dominion",
      title: "The Fortifier",
      flavor_text:
        "Give him time, and he will build a fortress from scrap. Give him more time, and that fortress will have cannons.",
      theme: "Battlefield engineers & fortifications",
      personality:
        "Thoughtful, creative, always planning the next improvement. Never satisfied with 'good enough.'",
      playstyle: "Defensive bonuses, unit synergy, fragment-enhanced repair",
      base_stats: {
        Command: 7,
        Knowledge: 8,
        Leadership: 7,
        Agility: 5,
        Health: 95,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 10, MOV: 5, RNG: 6, MOR: 9 },
      points_cost: 21,
      level_1_deck: {
        command: ["Fortification Order", "Engineer Deployment"],
        tech: [
          "Rapid Construction",
          "Repair Protocol",
          "Defensive Enhancement",
        ],
        fragment: ["Steam Core Activation"],
        tactical: ["Defensive Posture"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Efficient Construction",
          chaos: "Unstable Structures",
          tactical: "Quick Fortify",
        },
        level_3: {
          knowledge: "Stable Foundations",
          chaos: "Explosive Materials",
          tactical: "Field Repairs",
        },
        level_4: {
          knowledge: "Perfect Defense",
          chaos: "Chaotic Construction",
          tactical: "Mobile Fortifications",
        },
        level_5: {
          knowledge: "Engineering Excellence",
          chaos: "Fragment-Infused Walls",
          tactical: "Tactical Barriers",
        },
        level_6: {
          knowledge: "Master Builder",
          chaos: "Unstable Upgrades",
          tactical: "Defensive Network",
        },
        level_7: {
          knowledge: "Fortress Protocol",
          chaos: "Chaos Engineering",
          tactical: "Combined Defense",
        },
        level_8: {
          knowledge: "Perfect Repairs",
          chaos: "Explosive Defenses",
          tactical: "Strategic Fortification",
        },
        level_9: {
          knowledge: "Ultimate Fortification",
          chaos: "Reality-Bent Walls",
          tactical: "Defensive Mastery",
        },
        level_10: {
          knowledge: "Fortress Architect",
          chaos: "Unstable Builder",
          tactical: "Tactical Innovator",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Fortress Architect",
          description:
            "Creates impenetrable defenses. Enemies break against his walls.",
          abilities: [
            "Perfect Fortification",
            "Instant Repair",
            "Unbreakable Walls",
          ],
          fragment_interaction:
            "Steam Core fragments provide permanent armor bonuses",
          unit_synergy:
            "Engineers build twice as fast; all structures have 2x HP",
        },
        chaos: {
          name: "Unstable Builder",
          description:
            "Creates powerful but unpredictable structures. May explode spectacularly.",
          abilities: [
            "Explosive Walls",
            "Chaotic Repair",
            "Unstable Enhancement",
          ],
          fragment_interaction:
            "Fortifications can explode when destroyed, damaging nearby enemies",
          unit_synergy: "Structures may randomly upgrade or collapse",
        },
        hybrid: {
          name: "Tactical Innovator",
          description: "Balanced construction with moderate enhancements.",
          abilities: [
            "Adaptive Construction",
            "Controlled Enhancement",
            "Flexible Defense",
          ],
          fragment_interaction: "Structures gain random minor bonuses safely",
          unit_synergy: "All constructions gain +1 to a random stat",
        },
      },
      signature_units: ["Clockwork Engineers", "Overclocked Engineers"],
      strategic_notes:
        "High Engineer Vortan is the premier defensive commander. Use him to hold objectives or deny terrain. Combine with artillery for a fortress-and-fire strategy.",
      tags: ["defensive", "engineering", "fortification"],
    },
    {
      name: "General Steamjaw",
      faction: "iron-dominion",
      title: "The Brass Fist",
      flavor_text:
        "Subtlety is for cowards. Steamjaw believes the shortest path to victory is through the enemy's front line.",
      theme: "Brutal aggression & direct assault",
      personality:
        "Loud, aggressive, leads from the front. Respects only strength and courage.",
      playstyle:
        "Frontline heavy hitter, fragment boosts melee, smaller tactical flexibility",
      base_stats: {
        Command: 9,
        Knowledge: 4,
        Leadership: 9,
        Agility: 6,
        Health: 120,
      },
      battle_stats: { ATK: 6, DEF: 5, HP: 12, MOV: 6, RNG: 1, MOR: 10 },
      points_cost: 25,
      level_1_deck: {
        command: ["Charge Order", "Brutal Assault"],
        tech: ["Melee Enhancement", "Adrenaline Surge"],
        fragment: ["Infused Cog Activation"],
        tactical: ["All-Out Attack", "Overwhelming Force"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Efficient Assault",
          chaos: "Reckless Charge",
          tactical: "Shock Tactics",
        },
        level_3: {
          knowledge: "Controlled Aggression",
          chaos: "Berserk Rage",
          tactical: "Breakthrough",
        },
        level_4: {
          knowledge: "Precise Strike",
          chaos: "Wild Swing",
          tactical: "Momentum",
        },
        level_5: {
          knowledge: "Strategic Assault",
          chaos: "Fragment Fury",
          tactical: "Shock and Awe",
        },
        level_6: {
          knowledge: "Calculated Brutality",
          chaos: "Unstable Rage",
          tactical: "Front Line Mastery",
        },
        level_7: {
          knowledge: "Disciplined Force",
          chaos: "Chaos Rampage",
          tactical: "Iron Will",
        },
        level_8: {
          knowledge: "Perfect Assault",
          chaos: "Maximum Destruction",
          tactical: "Unstoppable Advance",
        },
        level_9: {
          knowledge: "Master Warrior",
          chaos: "Fragment Berserker",
          tactical: "Legendary Charge",
        },
        level_10: {
          knowledge: "Efficient Warlord",
          chaos: "Rampaging Conduit",
          tactical: "Balanced Enforcer",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Efficient Warlord",
          description:
            "Controlled aggression with maximum efficiency. Every blow counts.",
          abilities: [
            "Precision Assault",
            "Calculated Charge",
            "Efficient Destruction",
          ],
          fragment_interaction:
            "Melee fragments provide stable +3 attack bonus",
          unit_synergy:
            "Elite Vanguard gain guaranteed criticals; Infantry never flee",
        },
        chaos: {
          name: "Rampaging Conduit",
          description:
            "Uncontrollable destruction. Allies and enemies alike should fear.",
          abilities: ["Berserk Rage", "Fragment Fury", "Unstoppable Rampage"],
          fragment_interaction:
            "Melee damage doubled but may hit friendly units",
          unit_synergy: "All melee units gain +3 attack but -2 defense",
        },
        hybrid: {
          name: "Balanced Enforcer",
          description: "Aggressive but controlled. A fist in an iron glove.",
          abilities: [
            "Controlled Power",
            "Disciplined Assault",
            "Balanced Aggression",
          ],
          fragment_interaction: "Melee boosts are enhanced with minimal risk",
          unit_synergy: "Melee units gain +2 attack with no penalties",
        },
      },
      signature_units: ["Elite Vanguard", "Steam Shock Infantry"],
      strategic_notes:
        "General Steamjaw is the aggressive melee commander. Use him with elite infantry and charge straight at the enemy. Not subtle, but effective.",
      tags: ["aggressive", "melee", "frontline"],
    },
    {
      name: "Lady Aetheris",
      faction: "iron-dominion",
      title: "The Fragment Sage",
      flavor_text:
        "She walks between worlds, one foot in reality and one in the aether. The fragments are not tools to her—they are friends.",
      theme: "Aether/fragment manipulation expert",
      personality:
        "Serene, mysterious, speaks of fragments as living things. Seems to know things before they happen.",
      playstyle: "Enhances fragment units, mid-tier destabilization",
      base_stats: {
        Command: 6,
        Knowledge: 9,
        Leadership: 7,
        Agility: 7,
        Health: 85,
      },
      battle_stats: { ATK: 5, DEF: 3, HP: 9, MOV: 7, RNG: 6, MOR: 9 },
      points_cost: 19,
      level_1_deck: {
        command: ["Aether Command"],
        tech: ["Fragment Attunement", "Aether Enhancement"],
        fragment: ["Aether Pulse", "Fragment Harmony", "Resonance Field"],
        tactical: ["Aether Strike"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Fragment Attunement",
          chaos: "Aether Surge",
          tactical: "Energy Manipulation",
        },
        level_3: {
          knowledge: "Stable Aether",
          chaos: "Wild Resonance",
          tactical: "Tactical Aether",
        },
        level_4: {
          knowledge: "Perfect Harmony",
          chaos: "Chaotic Aether",
          tactical: "Energy Control",
        },
        level_5: {
          knowledge: "Fragment Mastery",
          chaos: "Unstable Power",
          tactical: "Aether Tactics",
        },
        level_6: {
          knowledge: "Sage Wisdom",
          chaos: "Fragment Storm",
          tactical: "Energy Network",
        },
        level_7: {
          knowledge: "Perfect Control",
          chaos: "Chaos Wave",
          tactical: "Aether Mastery",
        },
        level_8: {
          knowledge: "Fragment Unity",
          chaos: "Reality Tear",
          tactical: "Strategic Energy",
        },
        level_9: {
          knowledge: "Aether Perfection",
          chaos: "Chaotic Ascension",
          tactical: "Energy Dominance",
        },
        level_10: {
          knowledge: "Aether Strategist",
          chaos: "Fragment Catalyst",
          tactical: "Aether Architect",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Aether Strategist",
          description:
            "Perfect control over fragment energy. Stability and efficiency personified.",
          abilities: [
            "Fragment Harmony",
            "Stable Aether Field",
            "Predictive Manipulation",
          ],
          fragment_interaction:
            "All fragment effects are 50% stronger with zero instability",
          unit_synergy:
            "Aether Infused Soldiers become elite; all fragment units heal 1 HP per turn",
        },
        chaos: {
          name: "Fragment Catalyst",
          description:
            "Amplifies fragment instability for devastating effects.",
          abilities: ["Aether Explosion", "Unstable Cascade", "Reality Warp"],
          fragment_interaction:
            "Can trigger fragment chain reactions across the battlefield",
          unit_synergy:
            "Fragment units deal AoE damage on death; may spawn fragment anomalies",
        },
        hybrid: {
          name: "Aether Architect",
          description:
            "Balanced fragment manipulation with controlled enhancement.",
          abilities: [
            "Controlled Enhancement",
            "Stable Surge",
            "Balanced Power",
          ],
          fragment_interaction:
            "Fragment effects are moderately enhanced with low risk",
          unit_synergy: "All aether units gain +1 to all stats",
        },
      },
      signature_units: ["Aether Infused Soldiers", "Aether Blasters"],
      strategic_notes:
        "Lady Aetheris is the fragment enhancement specialist. Use her when you want to maximize fragment effects without Archmagister Gearbane's extreme risks.",
      tags: ["fragment-specialist", "aether", "balanced"],
    },
    {
      name: "Lord Piston",
      faction: "iron-dominion",
      title: "The Bombardier King",
      flavor_text:
        "Every problem can be solved with sufficient explosive force. Lord Piston has plenty to spare.",
      theme: "Heavy artillery & siege master",
      personality:
        "Boisterous, loves explosions, takes pride in precision destruction. Surprisingly caring about his crews.",
      playstyle:
        "Long-range control, war machines, fragment-enhanced artillery",
      base_stats: {
        Command: 8,
        Knowledge: 7,
        Leadership: 8,
        Agility: 4,
        Health: 100,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 10, MOV: 4, RNG: 3, MOR: 10 },
      points_cost: 20,
      level_1_deck: {
        command: ["Artillery Barrage Order", "Siege Command"],
        tech: ["Enhanced Ammunition", "Range Extension", "Reload Optimization"],
        fragment: ["Arcane Spark Activation"],
        tactical: ["Precision Strike"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Precision Targeting",
          chaos: "Wild Bombardment",
          tactical: "Quick Reload",
        },
        level_3: {
          knowledge: "Calculated Barrage",
          chaos: "Explosive Chaos",
          tactical: "Fire Support",
        },
        level_4: {
          knowledge: "Perfect Aim",
          chaos: "Fragment Shells",
          tactical: "Suppression Fire",
        },
        level_5: {
          knowledge: "Artillery Mastery",
          chaos: "Unstable Munitions",
          tactical: "Coordinated Fire",
        },
        level_6: {
          knowledge: "Master Gunner",
          chaos: "Chaos Bombardment",
          tactical: "Area Denial",
        },
        level_7: {
          knowledge: "Long Range Precision",
          chaos: "Reality Shells",
          tactical: "Siege Mastery",
        },
        level_8: {
          knowledge: "Perfect Barrage",
          chaos: "Maximum Destruction",
          tactical: "Strategic Bombardment",
        },
        level_9: {
          knowledge: "Artillery Legend",
          chaos: "Cataclysmic Fire",
          tactical: "Total Suppression",
        },
        level_10: {
          knowledge: "Siege Commander",
          chaos: "Cataclysmic Artificer",
          tactical: "Tactical Bombardier",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Siege Commander",
          description:
            "Perfect artillery precision. Never misses, never wastes ammunition.",
          abilities: [
            "Perfect Aim",
            "Efficient Bombardment",
            "Precision Destruction",
          ],
          fragment_interaction:
            "Fragment shells always hit and deal bonus damage",
          unit_synergy:
            "Artillery gains +3 range and +2 damage; can target specific units",
        },
        chaos: {
          name: "Cataclysmic Artificer",
          description: "Unstable ammunition for maximum destruction.",
          abilities: [
            "Explosive Chaos",
            "Fragment Detonation",
            "Unpredictable Barrage",
          ],
          fragment_interaction:
            "Artillery shells can warp terrain and cause fragment cascades",
          unit_synergy: "Artillery AoE is doubled but may hit friendly units",
        },
        hybrid: {
          name: "Tactical Bombardier",
          description: "Balanced firepower with controlled enhancement.",
          abilities: [
            "Calculated Fire",
            "Stable Enhancement",
            "Strategic Destruction",
          ],
          fragment_interaction:
            "Artillery gains bonus effects with minimal risk",
          unit_synergy:
            "Artillery gains +1 range and +1 damage with 10% bonus effect chance",
        },
      },
      signature_units: ["Gearwright Artillery", "Steam Artillery Crew"],
      strategic_notes:
        "Lord Piston specializes in ranged destruction. Keep him protected and rain fire from afar. Combine with defensive units for a classic artillery fortress.",
      tags: ["artillery", "ranged", "siege"],
    },
    {
      name: "Captain Ironclad",
      faction: "iron-dominion",
      title: "The Unbreakable Wall",
      flavor_text:
        "He has never retreated. He has never broken. Some say he cannot be killed—only delayed.",
      theme: "Defensive frontline commander",
      personality:
        "Stoic, protective, speaks little. Values his soldiers' lives above victory.",
      playstyle: "Buffs durable units, protects elite regiments, slows enemy",
      base_stats: {
        Command: 8,
        Knowledge: 6,
        Leadership: 9,
        Agility: 5,
        Health: 130,
      },
      battle_stats: { ATK: 5, DEF: 5, HP: 13, MOV: 5, RNG: 3, MOR: 10 },
      points_cost: 25,
      level_1_deck: {
        command: ["Defensive Formation", "Hold the Line"],
        tech: ["Armor Enhancement", "Shield Protocol"],
        fragment: ["Steam Core Activation"],
        tactical: ["Stalwart Defense", "Iron Will"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Efficient Defense",
          chaos: "Unstable Shield",
          tactical: "Quick Guard",
        },
        level_3: {
          knowledge: "Perfect Formation",
          chaos: "Chaotic Resistance",
          tactical: "Mobile Defense",
        },
        level_4: {
          knowledge: "Iron Constitution",
          chaos: "Fragment Shield",
          tactical: "Tactical Retreat",
        },
        level_5: {
          knowledge: "Unbreakable",
          chaos: "Unstable Armor",
          tactical: "Defensive Mastery",
        },
        level_6: {
          knowledge: "Master Guardian",
          chaos: "Chaos Barrier",
          tactical: "Area Protection",
        },
        level_7: {
          knowledge: "Perfect Protection",
          chaos: "Reality Shield",
          tactical: "Combined Defense",
        },
        level_8: {
          knowledge: "Legendary Defense",
          chaos: "Fragment Barrier",
          tactical: "Strategic Guard",
        },
        level_9: {
          knowledge: "Ultimate Guardian",
          chaos: "Chaos Fortress",
          tactical: "Total Protection",
        },
        level_10: {
          knowledge: "Master Defender",
          chaos: "Fragment Bulwark",
          tactical: "Balanced Sentinel",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Master Defender",
          description: "Perfect defensive capabilities. Nothing gets through.",
          abilities: [
            "Unbreakable Wall",
            "Perfect Guard",
            "Absolute Protection",
          ],
          fragment_interaction:
            "Defensive fragments never fail and provide extra HP",
          unit_synergy:
            "All units in formation gain +3 armor; morale never breaks",
        },
        chaos: {
          name: "Fragment Bulwark",
          description: "Creates unpredictable defensive barriers.",
          abilities: ["Unstable Shield", "Chaos Guard", "Fragment Wall"],
          fragment_interaction:
            "Defensive fragments can reflect damage back at attackers",
          unit_synergy:
            "Shields may expand randomly; damage reflection possible",
        },
        hybrid: {
          name: "Balanced Sentinel",
          description: "Solid defense with moderate enhancement.",
          abilities: [
            "Reliable Guard",
            "Controlled Protection",
            "Balanced Defense",
          ],
          fragment_interaction: "Defensive bonuses are enhanced with low risk",
          unit_synergy: "All defensive units gain +1 armor and +1 HP",
        },
      },
      signature_units: ["Steam Heavy Guards", "Clockwork Vanguard"],
      strategic_notes:
        "Captain Ironclad is the ultimate defensive commander. Use him to hold objectives against superior numbers. Nearly impossible to break through.",
      tags: ["defensive", "tank", "protective"],
    },
    {
      name: "Engineer Brassforge",
      faction: "iron-dominion",
      title: "The Rapid Prototype",
      flavor_text:
        "His inventions are brilliant. His survival rate is concerning. Worth the risk? Usually.",
      theme: "Rapid tech deployment & experimental constructs",
      personality:
        "Enthusiastic, creative, always covered in grease. Treats failures as learning opportunities.",
      playstyle:
        "Mid-tier units, fragment-powered engineering, risk/reward setups",
      base_stats: {
        Command: 6,
        Knowledge: 8,
        Leadership: 7,
        Agility: 7,
        Health: 90,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 9, MOV: 7, RNG: 6, MOR: 9 },
      points_cost: 21,
      level_1_deck: {
        command: ["Rapid Deployment"],
        tech: ["Quick Construction", "Prototype Testing", "Emergency Repair"],
        fragment: ["Experimental Node Activation", "Gear Infusion"],
        tactical: ["Field Innovation"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Stable Prototyping",
          chaos: "Wild Innovation",
          tactical: "Quick Build",
        },
        level_3: {
          knowledge: "Controlled Experimentation",
          chaos: "Explosive Prototypes",
          tactical: "Field Engineering",
        },
        level_4: {
          knowledge: "Reliable Design",
          chaos: "Unstable Creation",
          tactical: "Rapid Iteration",
        },
        level_5: {
          knowledge: "Engineering Excellence",
          chaos: "Chaotic Invention",
          tactical: "Tactical Engineering",
        },
        level_6: {
          knowledge: "Master Designer",
          chaos: "Fragment Fusion",
          tactical: "Mobile Workshop",
        },
        level_7: {
          knowledge: "Perfect Efficiency",
          chaos: "Unstable Genius",
          tactical: "Combat Engineering",
        },
        level_8: {
          knowledge: "Reliable Innovation",
          chaos: "Chaos Engineering",
          tactical: "Strategic Design",
        },
        level_9: {
          knowledge: "Engineering Legend",
          chaos: "Reality Forge",
          tactical: "Supreme Innovation",
        },
        level_10: {
          knowledge: "Stable Engineer",
          chaos: "Unstable Innovator",
          tactical: "Tactical Constructor",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Stable Engineer",
          description: "Reliable experimentation with consistent results.",
          abilities: [
            "Perfect Prototype",
            "Stable Innovation",
            "Reliable Creation",
          ],
          fragment_interaction: "Experimental effects always work as intended",
          unit_synergy: "All constructs gain +2 to all stats; no malfunctions",
        },
        chaos: {
          name: "Unstable Innovator",
          description: "Brilliant but unpredictable creations.",
          abilities: ["Wild Invention", "Chaotic Creation", "Fragment Fusion"],
          fragment_interaction:
            "Constructs gain random powerful abilities but may explode",
          unit_synergy: "Experimental units can gain 2x power or self-destruct",
        },
        hybrid: {
          name: "Tactical Constructor",
          description: "Balanced innovation with controlled risk.",
          abilities: [
            "Calculated Innovation",
            "Controlled Experiment",
            "Balanced Design",
          ],
          fragment_interaction: "Experiments are enhanced with moderate risk",
          unit_synergy: "Constructs gain +1 to all stats with 15% bonus chance",
        },
      },
      signature_units: ["Arcane Tinker Battalion", "Experimental Constructs"],
      strategic_notes:
        "Engineer Brassforge is the experimental tech commander. Embrace the chaos of innovation or stabilize for reliable results. Good for players who like variety.",
      tags: ["experimental", "engineering", "innovative"],
    },
    {
      name: "Lady Mechana",
      faction: "iron-dominion",
      title: "The War Machine Whisperer",
      flavor_text:
        "She doesn't command war machines. She communes with them. And they respond with devastating loyalty.",
      theme: "Specialized war machine strategist",
      personality:
        "Calm, focused, has an almost spiritual connection to machines. Speaks to constructs as equals.",
      playstyle:
        "Focused war machines, boosts efficiency, combines with fragment powers",
      base_stats: {
        Command: 7,
        Knowledge: 7,
        Leadership: 8,
        Agility: 6,
        Health: 100,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 10, MOV: 6, RNG: 3, MOR: 10 },
      points_cost: 21,
      level_1_deck: {
        command: ["Machine Command", "Coordinated Machines"],
        tech: ["Machine Enhancement", "Efficiency Protocol", "Repair Link"],
        fragment: ["Overclock Node Activation"],
        tactical: ["Machine Strike"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Machine Bond",
          chaos: "Overclock Surge",
          tactical: "Quick Activation",
        },
        level_3: {
          knowledge: "Stable Connection",
          chaos: "Wild Power",
          tactical: "Tactical Machines",
        },
        level_4: {
          knowledge: "Perfect Harmony",
          chaos: "Unstable Link",
          tactical: "Combined Operations",
        },
        level_5: {
          knowledge: "Machine Mastery",
          chaos: "Fragment Overclock",
          tactical: "Strategic Machines",
        },
        level_6: {
          knowledge: "Unity",
          chaos: "Chaos Surge",
          tactical: "Machine Network",
        },
        level_7: {
          knowledge: "Perfect Control",
          chaos: "Maximum Power",
          tactical: "Coordinated Assault",
        },
        level_8: {
          knowledge: "Machine Legend",
          chaos: "Unstable Maximum",
          tactical: "Strategic Control",
        },
        level_9: {
          knowledge: "Ultimate Harmony",
          chaos: "Chaos Machines",
          tactical: "Total Coordination",
        },
        level_10: {
          knowledge: "Mechanical Virtuoso",
          chaos: "Fragmented Behemoth",
          tactical: "Adaptive Mechana",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Mechanical Virtuoso",
          description: "Perfect war machine efficiency and reliability.",
          abilities: ["Machine Harmony", "Perfect Efficiency", "Stable Power"],
          fragment_interaction:
            "All machine-related fragments are 100% reliable",
          unit_synergy: "War machines cost 3 less points and never malfunction",
        },
        chaos: {
          name: "Fragmented Behemoth",
          description: "Unstable but devastating war machine power.",
          abilities: ["Overclock Overload", "Unstable Power", "Maximum Force"],
          fragment_interaction:
            "War machines deal 3x damage but have 30% malfunction chance",
          unit_synergy:
            "War machines gain AoE attacks; may damage nearby allies",
        },
        hybrid: {
          name: "Adaptive Mechana",
          description: "Balanced war machine optimization.",
          abilities: [
            "Flexible Control",
            "Adaptive Power",
            "Balanced Machines",
          ],
          fragment_interaction: "Machine fragments are enhanced with low risk",
          unit_synergy: "War machines gain +2 damage and +1 armor",
        },
      },
      signature_units: ["Chrono Walker", "Arcane Steam Golem"],
      strategic_notes:
        "Lady Mechana is the precision war machine commander. While Ironweld focuses on raw power, she focuses on efficiency. Ideal for point-efficient war machine armies.",
      tags: ["war-machine-focus", "efficiency", "balanced"],
    },
    {
      name: "Lord Gearheart",
      faction: "iron-dominion",
      title: "The Universal Cog",
      flavor_text:
        "Jack of all trades, master of adaptation. Where others specialize, he synthesizes.",
      theme: "Balanced commander, adaptive tactics",
      personality:
        "Pragmatic, flexible, sees value in all approaches. Never commits fully to one strategy.",
      playstyle:
        "Versatile, hybrid of fragments, standard units, and war machines",
      base_stats: {
        Command: 7,
        Knowledge: 7,
        Leadership: 7,
        Agility: 7,
        Health: 100,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 10, MOV: 7, RNG: 3, MOR: 9 },
      points_cost: 21,
      level_1_deck: {
        command: ["Adaptive Command", "Flexible Orders"],
        tech: ["Universal Enhancement", "Balanced Protocol"],
        fragment: ["Core Fragment Activation", "Adaptive Energy"],
        tactical: ["Strategic Flexibility"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Calculated Approach",
          chaos: "Random Strategy",
          tactical: "Adaptability",
        },
        level_3: {
          knowledge: "Stable Balance",
          chaos: "Chaotic Adaptation",
          tactical: "Flexible Tactics",
        },
        level_4: {
          knowledge: "Perfect Balance",
          chaos: "Wild Strategy",
          tactical: "Universal Training",
        },
        level_5: {
          knowledge: "Strategic Balance",
          chaos: "Unpredictable",
          tactical: "Combined Arms Mastery",
        },
        level_6: {
          knowledge: "Master of Balance",
          chaos: "Chaos Flexibility",
          tactical: "Adaptive Mastery",
        },
        level_7: {
          knowledge: "Perfect Synthesis",
          chaos: "Random Mastery",
          tactical: "Universal Command",
        },
        level_8: {
          knowledge: "Balanced Legend",
          chaos: "Chaos Legend",
          tactical: "Strategic Synthesis",
        },
        level_9: {
          knowledge: "Ultimate Balance",
          chaos: "Ultimate Chaos",
          tactical: "Total Adaptation",
        },
        level_10: {
          knowledge: "Tactical Genius",
          chaos: "Chaotic Conduit",
          tactical: "Universal Architect",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Tactical Genius",
          description: "Perfect strategic balance and adaptability.",
          abilities: [
            "Strategic Synthesis",
            "Perfect Adaptation",
            "Balanced Excellence",
          ],
          fragment_interaction:
            "Can choose fragment effects each turn for maximum flexibility",
          unit_synergy: "All units gain +1 to their primary stat",
        },
        chaos: {
          name: "Chaotic Conduit",
          description: "Embraces randomness for unexpected advantages.",
          abilities: [
            "Random Excellence",
            "Chaotic Adaptation",
            "Unpredictable Genius",
          ],
          fragment_interaction:
            "Fragment effects are random but always beneficial",
          unit_synergy: "Units gain random bonuses each turn",
        },
        hybrid: {
          name: "Universal Architect",
          description: "The ultimate balanced commander.",
          abilities: [
            "Total Flexibility",
            "Adaptive Excellence",
            "Universal Strategy",
          ],
          fragment_interaction:
            "Fragments provide stable moderate bonuses to all stats",
          unit_synergy: "All units gain +1 to all stats; no weaknesses",
        },
      },
      signature_units: ["Elite Vanguard", "Experimental Constructs"],
      strategic_notes:
        "Lord Gearheart is the most flexible commander. He lacks peak performance in any area but has no weaknesses. Ideal for new players learning the game.",
      tags: ["balanced", "flexible", "versatile"],
    },
    {
      name: "The Shrouded Shogun",
      faction: "veilbound-shogunate",
      title: "Keeper of the Final Cut",
      flavor_text:
        "The embodiment of the Veilbound philosophy: a figure both human and alien, whose presence commands awe and terror. Rarely seen directly, the Shogun's actions shape the faction's strategy, military campaigns, and spiritual doctrine.",
      theme: "Supreme cosmic authority, reality manipulation",
      personality:
        "Cold and calculated, detached yet observant, philosophical mentor. Every action is deliberate; improvisation exists only within the bounds of ritual.",
      playstyle:
        "Supreme support and battlefield control, massive Ritual Flow generation, reality-altering strikes",
      base_stats: {
        Command: 10,
        Knowledge: 10,
        Leadership: 10,
        Agility: 7,
        Health: 150,
      },
      battle_stats: { ATK: 6, DEF: 5, HP: 15, MOV: 7, RNG: 6, MOR: 10 },
      points_cost: 29,
      skill_tree: {
        format: "branching",
        levels: [
          {
            level: 1,
            option_a: {
              name: "Veil Awareness",
              type: "Passive",
              description:
                "Increases detection range; +1 evasion to all units within 2 spaces.",
              effect: "+1 detection range, +1 evasion within 2 spaces",
            },
            option_b: {
              name: "Spirit Bond Initiate",
              type: "Active",
              description: "Boost Ritual Flow of one nearby unit for 1 turn.",
              effect: "+Ritual Flow to 1 target for 1 turn",
            },
          },
          {
            level: 2,
            option_a: {
              name: "Momentum Strike",
              type: "Active",
              description:
                "First attack each turn gains +10% damage, increases chain bonus by 1.",
              effect: "+10% first-attack damage, +1 chain bonus",
            },
            option_b: {
              name: "Dual Strike",
              type: "Active",
              description:
                "Can attack two adjacent enemies for minor damage (doesn't consume Flow).",
              effect: "Hit 2 adjacent enemies, no Flow cost",
            },
          },
          {
            level: 3,
            option_a: {
              name: "Flow Amplification",
              type: "Active",
              description:
                "Converts accumulated Flow into temporary bonus for nearby units (+2 Flow per 10 stored).",
              effect: "+2 Flow per 10 stored to nearby units",
            },
            option_b: {
              name: "Tactical Insight",
              type: "Passive",
              description:
                "Reveals enemy movement for next 2 turns; +5% damage on first strike against revealed units.",
              effect: "Reveal movement 2 turns, +5% vs revealed",
            },
          },
          {
            level: 4,
            option_a: {
              name: "Multi-Strike Phasing",
              type: "Active",
              description: "Attack hits up to 2 additional nearby units.",
              effect: "Cleave to 2 adjacent enemies",
            },
            option_b: {
              name: "Veil Ward",
              type: "Passive",
              description: "Nearby allies gain minor damage reduction (+5%).",
              effect: "+5% damage reduction to nearby allies",
            },
          },
          {
            level: 5,
            option_a: {
              name: "Command Overwatch",
              type: "Passive",
              description: "Allies within 3 units gain +10% attack or evasion.",
              effect: "+10% attack or evasion within range 3",
            },
            option_b: {
              name: "Hollow Resonance",
              type: "Active",
              description:
                "Sacrifice 3 Flow to temporarily increase damage of adjacent units by 15% for 1 turn.",
              effect: "-3 Flow → +15% damage to adjacent allies, 1 turn",
            },
          },
          {
            level: 6,
            option_a: {
              name: "Veil Warp",
              type: "Active",
              description:
                "Short-range teleport; attack can occur before or after teleport.",
              effect: "Teleport + attack in any order",
            },
            option_b: {
              name: "Spirit Surge",
              type: "Active",
              description:
                "Restore bond or minor health to one nearby unit; bonus if it's Shrouded Shogun Vassal.",
              effect: "Heal/bond restore, +bonus to Vassals",
            },
          },
          {
            level: 7,
            option_a: {
              name: "Reality Phase Strike",
              type: "Active",
              description:
                "Attack 2–3 enemy units in separate locations; requires 2 Flow points.",
              effect: "Multi-target strike (2-3 enemies), costs 2 Flow",
            },
            option_b: {
              name: "Aura of Determination",
              type: "Passive",
              description:
                "Adjacent units gain bonus chain progression (+1 per turn).",
              effect: "+1 chain progression/turn to adjacent allies",
            },
          },
          {
            level: 8,
            option_a: {
              name: "Shadow Momentum",
              type: "Active",
              description:
                "Temporarily double chain bonus of a chosen unit for 1 turn.",
              effect: "2× chain bonus on 1 unit for 1 turn",
            },
            option_b: {
              name: "Veil Echo",
              type: "Active",
              description: "Make one attack hit twice; minor Flow cost.",
              effect: "Double-hit attack, minor Flow cost",
            },
          },
          {
            level: 9,
            option_a: {
              name: "Spirit Convergence",
              type: "Active",
              description:
                "Convert stored Flow into +10% damage for all nearby units.",
              effect: "Flow → +10% damage to all nearby units",
            },
            option_b: {
              name: "Final Cut Manifestation",
              type: "Active",
              description:
                "Multi-location strike against isolated enemy units; consumes 3 Flow points.",
              effect: "Multi-location strike vs isolated enemies, costs 3 Flow",
            },
          },
        ],
        evolution: {
          label: "Level 10: Evolution Choice",
          chaos: {
            name: "Hollow Eclipse",
            abilities: [
              {
                name: "Reality Phase Strike+",
                type: "Active",
                description:
                  "Reality Phase Strike now hits all enemies within 2 units, 50% chance to confuse.",
                effect: "AoE within 2 units + 50% confuse",
              },
              {
                name: "Fear Aura",
                type: "Passive",
                description:
                  "Adjacent enemies suffer minor damage and -20% morale.",
                effect: "Minor damage + -20% morale to adjacent enemies",
              },
            ],
          },
          knowledge: {
            name: "Celestial Arbiter",
            abilities: [
              {
                name: "Preemptive Insight",
                type: "Active",
                description:
                  "See enemy stats in 3-unit radius; first strike gains +15% damage.",
                effect: "Reveal stats (3 range) + +15% first-strike damage",
              },
              {
                name: "Doubled Flow Generation",
                type: "Passive",
                description: "Nearby units generate double Ritual Flow.",
                effect: "2× Ritual Flow generation (nearby units)",
              },
            ],
          },
        },
      },
      signature_units: ["Shrouded Shogun Vassals"],
      strategic_notes:
        "The Shogun is extremely versatile, able to lead either fear-inducing Chaos armies or strategically precise Knowledge armies, rewarding different playstyles. Extremely expensive but battlefield-defining — deploy only in the most critical engagements.",
      tags: ["supreme", "reality-manipulation", "ritual-flow", "versatile"],
    },
    {
      name: "Masked Lord Kurohane",
      faction: "veilbound-shogunate",
      title: "The Shadow Phalanx",
      flavor_text:
        "Where Kurohane rides, shadows deepen and formations tighten. His presence turns ordinary infantry into an unbreakable wall of masked steel.",
      theme: "Infantry support, momentum disruption",
      personality:
        "Stoic, protective of subordinates, speaks in clipped commands. Values discipline above all.",
      playstyle:
        "Infantry buffs, enemy momentum disruption, mounted special attacks",
      base_stats: {
        Command: 9,
        Knowledge: 7,
        Leadership: 9,
        Agility: 6,
        Health: 120,
      },
      battle_stats: { ATK: 6, DEF: 5, HP: 12, MOV: 6, RNG: 3, MOR: 10 },
      points_cost: 26,
      level_1_deck: {
        command: ["Shadow Phalanx", "Formation Command"],
        tech: ["Momentum Disrupt", "Shield Wall Protocol"],
        fragment: ["Spirit Lance Charge"],
        tactical: ["Disciplined Advance"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Tactical Formation",
          chaos: "Dread Presence",
          tactical: "Shield Enhancement",
        },
        level_3: {
          knowledge: "Bond Reinforcement",
          chaos: "Terror Aura",
          tactical: "Infantry Mastery",
        },
        level_4: {
          knowledge: "Flow Generation",
          chaos: "Shadow Strike",
          tactical: "Phalanx Perfection",
        },
        level_5: {
          knowledge: "Oracle Insight",
          chaos: "Dread Charge",
          tactical: "Combined Defense",
        },
        level_6: {
          knowledge: "Bond Mastery",
          chaos: "Fear Cascade",
          tactical: "Momentum Control",
        },
        level_7: {
          knowledge: "Ritual Shield",
          chaos: "Nightmare Aura",
          tactical: "Iron Formation",
        },
        level_8: {
          knowledge: "Flow Amplification",
          chaos: "Void Presence",
          tactical: "Strategic Shield",
        },
        level_9: {
          knowledge: "Perfect Bond",
          chaos: "Absolute Terror",
          tactical: "Supreme Formation",
        },
        level_10: {
          knowledge: "Oracle Mask",
          chaos: "Dread Mask",
          tactical: "Balanced Lord",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Oracle Mask",
          description:
            "Increases bond generation and boosts Ritual Flow for all nearby units.",
          abilities: [
            "Enhanced Bond Generation",
            "Flow Amplification",
            "Oracle Vision",
          ],
          fragment_interaction:
            "Bond generation doubled; Ritual Flow always optimal",
          unit_synergy:
            "All infantry gain +2 defense; Ritual Flow generation increased by 50%",
        },
        chaos: {
          name: "Dread Mask",
          description:
            "Unleashes terror aura, enhances fear effects of all units under command.",
          abilities: ["Terror Cascade", "Dread Aura", "Fear Amplification"],
          fragment_interaction:
            "Fear effects spread to additional enemy units unpredictably",
          unit_synergy:
            "All units gain fear aura; enemy morale penalties doubled",
        },
        hybrid: {
          name: "Balanced Lord",
          description: "Moderate buffs to both Flow and fear effects.",
          abilities: ["Controlled Presence", "Balanced Aura", "Steady Command"],
          fragment_interaction: "Balanced enhancement with low instability",
          unit_synergy: "Infantry gain +1 defense and minor fear aura",
        },
      },
      signature_units: ["Masked Lord Retinue"],
      strategic_notes:
        "Kurohane excels at infantry-centric armies. Use him to create unbreakable defensive formations while disrupting enemy momentum.",
      tags: ["infantry-focus", "defensive", "momentum-disruption"],
    },
    {
      name: "Elite Commander Asagiri",
      faction: "veilbound-shogunate",
      title: "The Inkstep Duelist",
      flavor_text:
        "Between one heartbeat and the next, Asagiri has already struck twice. Her blade leaves trails of void-ink that linger like afterimages of death.",
      theme: "Dueling specialist, teleportation tactics",
      personality:
        "Quiet, intense, deeply focused. Communicates through action rather than words.",
      playstyle: "Duelist, teleport strikes, damage reduction aura",
      base_stats: {
        Command: 6,
        Knowledge: 8,
        Leadership: 7,
        Agility: 10,
        Health: 90,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 9, MOV: 10, RNG: 6, MOR: 9 },
      points_cost: 22,
      level_1_deck: {
        command: ["Duel Challenge"],
        tech: ["Inkstep", "Veil Ward"],
        fragment: ["Lunar Blade Activation", "Phantom Edge"],
        tactical: ["Precision Duel"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Flow Enhancement",
          chaos: "Phantom Strike",
          tactical: "Quick Step",
        },
        level_3: {
          knowledge: "Precise Cut",
          chaos: "Fear on Hit",
          tactical: "Duelist Mastery",
        },
        level_4: {
          knowledge: "Veil Shield",
          chaos: "Shadow Slash",
          tactical: "Counter Stance",
        },
        level_5: {
          knowledge: "Flow Attunement",
          chaos: "Teleport Chain",
          tactical: "Perfect Timing",
        },
        level_6: {
          knowledge: "Blade Harmony",
          chaos: "Void Cut",
          tactical: "Evasion Mastery",
        },
        level_7: {
          knowledge: "Ritual Blade",
          chaos: "Phantom Barrage",
          tactical: "Adaptive Dueling",
        },
        level_8: {
          knowledge: "Flow Mastery",
          chaos: "Shadow Storm",
          tactical: "Supreme Duelist",
        },
        level_9: {
          knowledge: "Enlightened Blade",
          chaos: "Void Duelist",
          tactical: "Perfect Form",
        },
        level_10: {
          knowledge: "Flow Adept",
          chaos: "Phantom Duelist",
          tactical: "Balanced Duelist",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Flow Adept",
          description:
            "Enhances Ritual Flow on nearby units, turning duels into Flow-generating events.",
          abilities: [
            "Flow Generation on Kill",
            "Ritual Blade Mastery",
            "Enhanced Coordination",
          ],
          fragment_interaction:
            "Successful duels generate massive Ritual Flow for nearby allies",
          unit_synergy:
            "Nearby units gain +2 Ritual Flow; dueling victories buff all allies",
        },
        chaos: {
          name: "Phantom Duelist",
          description:
            "Additional teleport attacks and fear on every hit. A nightmare in close combat.",
          abilities: ["Chain Teleport", "Fear Strike", "Phantom Barrage"],
          fragment_interaction:
            "Teleport attacks leave fear zones that persist for 2 turns",
          unit_synergy:
            "Inkblade Masters gain teleport ability; fear spreads on kills",
        },
        hybrid: {
          name: "Balanced Duelist",
          description: "Moderate teleport enhancement and Flow generation.",
          abilities: ["Controlled Blink", "Steady Flow", "Balanced Blade"],
          fragment_interaction:
            "Moderate Flow and fear effects with low instability",
          unit_synergy: "Inkblade Masters gain minor Flow bonus and evasion",
        },
      },
      signature_units: ["Inkblade Masters"],
      strategic_notes:
        "Asagiri is the premier duelist commander. Send her to eliminate enemy elites and commanders. Fragile but devastating in the right hands.",
      tags: ["duelist", "teleport", "agility"],
    },
    {
      name: "Elite Commander Hoshimaru",
      faction: "veilbound-shogunate",
      title: "The Starfall Guardian",
      flavor_text:
        "When Hoshimaru raises his banner, starlight cascades across the battlefield. His allies are shielded; his enemies are blinded.",
      theme: "Area control, protective commander",
      personality:
        "Warm, protective, inspires fierce loyalty. Leads by example and shields allies.",
      playstyle: "AoE strikes, enemy immobilization, ally buffing",
      base_stats: {
        Command: 8,
        Knowledge: 7,
        Leadership: 9,
        Agility: 6,
        Health: 110,
      },
      battle_stats: { ATK: 5, DEF: 5, HP: 11, MOV: 6, RNG: 3, MOR: 10 },
      points_cost: 23,
      level_1_deck: {
        command: ["Starfall Strike", "Ascendant Guard"],
        tech: ["Spirit Bind", "Celestial Shield"],
        fragment: ["Starlight Cascade"],
        tactical: ["Protective Formation"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Celestial Insight",
          chaos: "Void Burst",
          tactical: "Shield Mastery",
        },
        level_3: {
          knowledge: "Star Ward",
          chaos: "Dark Star",
          tactical: "Combined Guard",
        },
        level_4: {
          knowledge: "Flow Shield",
          chaos: "Star Collapse",
          tactical: "Area Protection",
        },
        level_5: {
          knowledge: "Celestial Blessing",
          chaos: "Void Star Charge",
          tactical: "Chain Bonuses",
        },
        level_6: {
          knowledge: "Bond Shield",
          chaos: "Fear Cascade",
          tactical: "Guardian Mastery",
        },
        level_7: {
          knowledge: "Flow Barrier",
          chaos: "Dark Nova",
          tactical: "Combined Arms",
        },
        level_8: {
          knowledge: "Starlight Mastery",
          chaos: "Void Eruption",
          tactical: "Supreme Guardian",
        },
        level_9: {
          knowledge: "Celestial Perfection",
          chaos: "Eclipse Storm",
          tactical: "Total Protection",
        },
        level_10: {
          knowledge: "Celestial Protector",
          chaos: "Void Star",
          tactical: "Balanced Guardian",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Celestial Protector",
          description:
            "Buffs all nearby units and increases chain bonuses. The ultimate protective commander.",
          abilities: [
            "Celestial Aura",
            "Chain Amplification",
            "Starlight Shield",
          ],
          fragment_interaction: "All protective Ritual Flow effects doubled",
          unit_synergy:
            "Spirit Dragon Cohort gains +3 charge bonus; all nearby units gain shields",
        },
        chaos: {
          name: "Void Star",
          description:
            "Gains AoE fear and damage over time aura. Protection through destruction.",
          abilities: ["Void Nova", "Fear Cascade", "Dark Star Aura"],
          fragment_interaction:
            "AoE damage warps terrain and applies persistent fear zones",
          unit_synergy:
            "Spirit Dragon Cohort gains void damage; enemies near Hoshimaru take DoT",
        },
        hybrid: {
          name: "Balanced Guardian",
          description: "Moderate buffs and AoE effects with stability.",
          abilities: ["Stable Shield", "Controlled Star", "Steady Guard"],
          fragment_interaction: "Balanced protective and offensive effects",
          unit_synergy:
            "Spirit Dragon Cohort gains +1 charge bonus and minor shield",
        },
      },
      signature_units: ["Spirit Dragon Cohort"],
      strategic_notes:
        "Hoshimaru excels at protecting elite cavalry charges. Pair him with Spirit Riders for devastating coordinated assaults under starlight shields.",
      tags: ["protective", "area-control", "cavalry-synergy"],
    },
    {
      name: "Ritual Captain Akikaze",
      faction: "veilbound-shogunate",
      title: "The Flow Surge",
      flavor_text:
        "Where Akikaze stands, the veils thin and Ritual Flow surges like a tide. Even the weakest unit becomes extraordinary under her guidance.",
      theme: "Ritual Flow mastery, support enhancement",
      personality:
        "Serene, meditative, speaks softly but with absolute certainty. The faction's most gifted ritualist.",
      playstyle:
        "Massive Ritual Flow generation, ability enhancement, defensive support",
      base_stats: {
        Command: 6,
        Knowledge: 10,
        Leadership: 8,
        Agility: 5,
        Health: 85,
      },
      battle_stats: { ATK: 5, DEF: 3, HP: 9, MOV: 5, RNG: 6, MOR: 10 },
      points_cost: 19,
      level_1_deck: {
        command: ["Ritual Surge"],
        tech: ["Spirit Barrier", "Flow Channeling"],
        fragment: ["Flow Amplification", "Ritual Cascade", "Bond Enhancement"],
        tactical: ["Defensive Ritual"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Enhanced Flow",
          chaos: "Corrupted Surge",
          tactical: "Quick Ritual",
        },
        level_3: {
          knowledge: "Flow Mastery",
          chaos: "Dark Flow",
          tactical: "Efficient Channeling",
        },
        level_4: {
          knowledge: "Perfect Ritual",
          chaos: "Unstable Surge",
          tactical: "Barrier Enhancement",
        },
        level_5: {
          knowledge: "Enlightened Flow",
          chaos: "Corrupted Channeling",
          tactical: "Multi-Target Flow",
        },
        level_6: {
          knowledge: "Sage Wisdom",
          chaos: "Dark Ritual",
          tactical: "Flow Network",
        },
        level_7: {
          knowledge: "Perfect Channeling",
          chaos: "Chaos Flow",
          tactical: "Ritual Mastery",
        },
        level_8: {
          knowledge: "Flow Legend",
          chaos: "Unstable Maximum",
          tactical: "Strategic Flow",
        },
        level_9: {
          knowledge: "Ultimate Ritual",
          chaos: "Chaos Cascade",
          tactical: "Total Enhancement",
        },
        level_10: {
          knowledge: "Enlightened Ritualist",
          chaos: "Corrupted Ritualist",
          tactical: "Balanced Ritualist",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Enlightened Ritualist",
          description:
            "Reduces cooldowns, boosts all Flow generation. The perfect support commander.",
          abilities: [
            "Perfect Flow",
            "Cooldown Reduction",
            "Enlightened Surge",
          ],
          fragment_interaction:
            "All Ritual Flow generation tripled; abilities recharge faster",
          unit_synergy:
            "Flow Adepts gain double effectiveness; all units gain bonus abilities",
        },
        chaos: {
          name: "Corrupted Ritualist",
          description:
            "Damage over time effects applied to all enemies in Flow range.",
          abilities: ["Corrupted Flow", "Dark Surge", "Poison Ritual"],
          fragment_interaction:
            "Ritual Flow becomes toxic to enemies; damaging effects spread",
          unit_synergy:
            "Flow Adepts gain offensive capabilities; enemies in range take damage",
        },
        hybrid: {
          name: "Balanced Ritualist",
          description: "Enhanced Flow with minor offensive capabilities.",
          abilities: [
            "Controlled Flow",
            "Moderate Surge",
            "Balanced Enhancement",
          ],
          fragment_interaction:
            "Moderate Flow boost with minor offensive effects",
          unit_synergy: "Flow Adepts gain +1 to all stats; minor area DoT",
        },
      },
      signature_units: ["Flow Adepts"],
      strategic_notes:
        "Akikaze is the Veilbound's primary Flow battery. Essential in armies that rely on transformations and elite abilities. Protect her at all costs.",
      tags: ["ritual-flow", "support", "enhancement"],
    },
    {
      name: "Ritual Captain Tsukihana",
      faction: "veilbound-shogunate",
      title: "The Sigil Weaver",
      flavor_text:
        "Her ink is alive. Her sigils write themselves into reality. When Tsukihana paints, the battlefield obeys.",
      theme: "Sigil warfare, terrain manipulation",
      personality:
        "Artistic, methodical, sees combat as calligraphy. Every battlefield is a canvas.",
      playstyle: "AoE projectiles, area disruption, spirit bond enhancement",
      base_stats: {
        Command: 7,
        Knowledge: 9,
        Leadership: 7,
        Agility: 6,
        Health: 90,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 9, MOV: 6, RNG: 6, MOR: 9 },
      points_cost: 20,
      level_1_deck: {
        command: ["Inkwave"],
        tech: ["Veil Sigil", "Spirit Bond Boost"],
        fragment: ["Ink Manifestation", "Sigil Cascade"],
        tactical: ["Area Disruption"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Precise Sigils",
          chaos: "Phantom Ink",
          tactical: "Quick Sigil",
        },
        level_3: {
          knowledge: "Bond Enhancement",
          chaos: "Dark Ink",
          tactical: "Sigil Mastery",
        },
        level_4: {
          knowledge: "Flow Sigils",
          chaos: "Ink Horror",
          tactical: "Area Control",
        },
        level_5: {
          knowledge: "Perfect Calligraphy",
          chaos: "Phantom Summoning",
          tactical: "Strategic Sigils",
        },
        level_6: {
          knowledge: "Sigil Network",
          chaos: "Dark Manifestation",
          tactical: "Ink Mastery",
        },
        level_7: {
          knowledge: "Flow Inscription",
          chaos: "Horror Ink",
          tactical: "Combined Sigils",
        },
        level_8: {
          knowledge: "Sigil Legend",
          chaos: "Phantom Storm",
          tactical: "Strategic Inscription",
        },
        level_9: {
          knowledge: "Ultimate Sigil",
          chaos: "Ink Nightmare",
          tactical: "Total Calligraphy",
        },
        level_10: {
          knowledge: "Sigil Master",
          chaos: "Ink Horror",
          tactical: "Balanced Weaver",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Sigil Master",
          description:
            "Stronger, more efficient Flow generation through masterful sigil work.",
          abilities: [
            "Perfect Sigils",
            "Enhanced Flow Inscription",
            "Efficient Channeling",
          ],
          fragment_interaction: "Sigils generate maximum Flow with zero waste",
          unit_synergy:
            "Ink Sigil Crafters gain double effectiveness; sigils persist longer",
        },
        chaos: {
          name: "Ink Horror",
          description:
            "Summons phantoms to fight alongside units. The ink comes alive.",
          abilities: [
            "Phantom Summoning",
            "Living Ink",
            "Horror Manifestation",
          ],
          fragment_interaction:
            "Ink constructs spawn from sigils unpredictably but fight for the Veilbound",
          unit_synergy:
            "Ink Sigil Crafters can summon phantom units; sigils become traps",
        },
        hybrid: {
          name: "Balanced Weaver",
          description: "Moderate sigil enhancement with minor summoning.",
          abilities: ["Controlled Ink", "Stable Sigils", "Minor Phantoms"],
          fragment_interaction:
            "Moderate sigil power with occasional phantom support",
          unit_synergy:
            "Ink Sigil Crafters gain +1 to all stats; minor phantom chance",
        },
      },
      signature_units: ["Ink Sigil Crafters"],
      strategic_notes:
        "Tsukihana controls the battlefield through area denial and debuffs. Use her to reshape engagements and support cavalry charges.",
      tags: ["sigil-warfare", "area-control", "debuff"],
    },
    {
      name: "Elite Commander Rengoku",
      faction: "veilbound-shogunate",
      title: "The Flame Crescent",
      flavor_text:
        "His blade draws arcs of cosmic fire. Each swing builds momentum until the battlefield erupts in a crescent of devastation.",
      theme: "Melee destruction, momentum building",
      personality:
        "Fierce, passionate, leads every charge personally. Burns with inner fire and cosmic intensity.",
      playstyle:
        "Wide melee attacks, momentum chain bonuses, teleport repositioning",
      base_stats: {
        Command: 8,
        Knowledge: 6,
        Leadership: 8,
        Agility: 8,
        Health: 105,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 11, MOV: 8, RNG: 3, MOR: 10 },
      points_cost: 22,
      level_1_deck: {
        command: ["Flame Crescent", "Momentum Surge"],
        tech: ["Veil Step", "Fire Enhancement"],
        fragment: ["Cosmic Flame Activation"],
        tactical: ["Chain Attack"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Controlled Flame",
          chaos: "Wild Fire",
          tactical: "Quick Strike",
        },
        level_3: {
          knowledge: "Precise Arc",
          chaos: "Infernal Slash",
          tactical: "Chain Mastery",
        },
        level_4: {
          knowledge: "Flow Flame",
          chaos: "Fire Storm",
          tactical: "Momentum Control",
        },
        level_5: {
          knowledge: "Celestial Fire",
          chaos: "Infernal Charge",
          tactical: "Combined Rush",
        },
        level_6: {
          knowledge: "Blade Harmony",
          chaos: "Raging Inferno",
          tactical: "Attack Mastery",
        },
        level_7: {
          knowledge: "Perfect Arc",
          chaos: "Chaos Flame",
          tactical: "Tactical Fire",
        },
        level_8: {
          knowledge: "Flow Blade",
          chaos: "Maximum Inferno",
          tactical: "Supreme Momentum",
        },
        level_9: {
          knowledge: "Flame Perfection",
          chaos: "Infernal Apex",
          tactical: "Total Chain",
        },
        level_10: {
          knowledge: "Celestial Ronin",
          chaos: "Infernal Ronin",
          tactical: "Balanced Ronin",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Celestial Ronin",
          description:
            "Enhanced speed and bonus to allied chain attacks. A precision fire master.",
          abilities: [
            "Celestial Speed",
            "Chain Amplification",
            "Perfect Flame",
          ],
          fragment_interaction:
            "Chain bonuses spread to all nearby allies; attacks are precise and devastating",
          unit_synergy: "Moonlit Duelists gain fire damage and chain bonuses",
        },
        chaos: {
          name: "Infernal Ronin",
          description:
            "Massive AoE attacks with persistent fear aura. Unstoppable in melee.",
          abilities: ["Infernal Nova", "Fear Flame", "Unstoppable Charge"],
          fragment_interaction:
            "Fire attacks leave burning terrain that damages and fears enemies",
          unit_synergy:
            "Moonlit Duelists gain fear on hit; fire damage spreads",
        },
        hybrid: {
          name: "Balanced Ronin",
          description: "Moderate fire enhancement and chain bonuses.",
          abilities: ["Steady Flame", "Controlled Chain", "Balanced Fire"],
          fragment_interaction:
            "Moderate fire and chain effects with stability",
          unit_synergy: "Moonlit Duelists gain +1 attack and minor fire damage",
        },
      },
      signature_units: ["Moonlit Duelists"],
      strategic_notes:
        "Rengoku is the Veilbound's premier offensive melee commander. Build momentum through chain attacks and unleash devastating crescendos.",
      tags: ["aggressive", "momentum", "melee"],
    },
    {
      name: "Elite Commander Yukimaru",
      faction: "veilbound-shogunate",
      title: "The Spirit Fang",
      flavor_text:
        "The pack follows Yukimaru not because they must, but because his bond with the spirit wolves is absolute. Where he rides, the hunt begins.",
      theme: "Beast mastery, cavalry command",
      personality:
        "Wild, instinctive, communicates better with beasts than humans. Fiercely loyal to the pack.",
      playstyle: "Mounted attacks, immobilization, dual-stance mastery",
      base_stats: {
        Command: 7,
        Knowledge: 6,
        Leadership: 8,
        Agility: 9,
        Health: 100,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 10, MOV: 9, RNG: 3, MOR: 10 },
      points_cost: 22,
      level_1_deck: {
        command: ["Spirit Fang Charge", "Pack Command"],
        tech: ["Shadow Bind", "Dual Stance Mastery"],
        fragment: ["Spirit Bond Activation"],
        tactical: ["Hunt Formation"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Bond Insight",
          chaos: "Wild Frenzy",
          tactical: "Pack Tactics",
        },
        level_3: {
          knowledge: "Controlled Hunt",
          chaos: "Shadow Beast",
          tactical: "Cavalry Mastery",
        },
        level_4: {
          knowledge: "Flow Bond",
          chaos: "Feral Charge",
          tactical: "Flanking Mastery",
        },
        level_5: {
          knowledge: "Spirit Harmony",
          chaos: "Beast Summoning",
          tactical: "Combined Pack",
        },
        level_6: {
          knowledge: "Perfect Bond",
          chaos: "Shadow Pack",
          tactical: "Hunt Mastery",
        },
        level_7: {
          knowledge: "Rider Unity",
          chaos: "Feral Storm",
          tactical: "Tactical Hunt",
        },
        level_8: {
          knowledge: "Flow Rider Mastery",
          chaos: "Beast Lord",
          tactical: "Supreme Pack",
        },
        level_9: {
          knowledge: "Spirit Perfection",
          chaos: "Shadow Alpha",
          tactical: "Total Hunt",
        },
        level_10: {
          knowledge: "Flow Rider",
          chaos: "Shadow Beastmaster",
          tactical: "Balanced Hunter",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Flow Rider",
          description:
            "Enhances all Spirit Rider cavalry effectiveness. The ultimate cavalry support commander.",
          abilities: ["Cavalry Enhancement", "Flow Riding", "Perfect Bond"],
          fragment_interaction:
            "All cavalry gain bonus Ritual Flow generation while charging",
          unit_synergy:
            "Spirit Wolf Packs gain +3 attack in groups; all cavalry gain +2 speed",
        },
        chaos: {
          name: "Shadow Beastmaster",
          description:
            "Summons shadow beasts alongside units. The pack grows beyond reality.",
          abilities: [
            "Shadow Summoning",
            "Beast Frenzy",
            "Pack Multiplication",
          ],
          fragment_interaction:
            "Spirit bonds can spawn shadow copies of bonded beasts",
          unit_synergy:
            "Spirit Wolf Packs duplicate unpredictably; shadow beasts join charges",
        },
        hybrid: {
          name: "Balanced Hunter",
          description: "Moderate cavalry enhancement with minor summoning.",
          abilities: ["Controlled Pack", "Steady Bond", "Balanced Hunt"],
          fragment_interaction: "Moderate cavalry and bond enhancement",
          unit_synergy:
            "Spirit Wolf Packs gain +1 attack; minor shadow beast chance",
        },
      },
      signature_units: ["Spirit Wolf Packs"],
      strategic_notes:
        "Yukimaru is the cavalry commander of the Veilbound. Pair him with multiple Spirit Rider units for overwhelming flanking attacks.",
      tags: ["cavalry-focus", "beast-mastery", "flanking"],
    },
    {
      name: "Commander Hisame",
      faction: "veilbound-shogunate",
      title: "The Celestial Bow",
      flavor_text:
        "Her arrows are drawn from starlight and released into destiny. Each shot finds not where the enemy is, but where they will be.",
      theme: "Ranged precision, stealth detection",
      personality:
        "Patient, observant, rarely speaks. When she does, every word is as precise as her aim.",
      playstyle:
        "Long-range precision, anti-elite specialist, stealth detection",
      base_stats: {
        Command: 7,
        Knowledge: 8,
        Leadership: 7,
        Agility: 8,
        Health: 85,
      },
      battle_stats: { ATK: 5, DEF: 3, HP: 9, MOV: 8, RNG: 6, MOR: 9 },
      points_cost: 20,
      level_1_deck: {
        command: ["Celestial Bow"],
        tech: ["Spirit Arrow", "Veil Sight"],
        fragment: ["Starlight Arrow Activation", "Precision Enhancement"],
        tactical: ["Sniper Position"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Precise Shot",
          chaos: "Void Arrow",
          tactical: "Quick Aim",
        },
        level_3: {
          knowledge: "Star Guidance",
          chaos: "Fear Arrow",
          tactical: "Range Mastery",
        },
        level_4: {
          knowledge: "Flow Arrow",
          chaos: "Dark Volley",
          tactical: "Anti-Elite Training",
        },
        level_5: {
          knowledge: "Celestial Sight",
          chaos: "Void Volley",
          tactical: "Combined Fire",
        },
        level_6: {
          knowledge: "Perfect Aim",
          chaos: "Shadow Arrow",
          tactical: "Ranged Mastery",
        },
        level_7: {
          knowledge: "Flow Precision",
          chaos: "Dark Rain",
          tactical: "Tactical Shooting",
        },
        level_8: {
          knowledge: "Star Mastery",
          chaos: "Void Storm",
          tactical: "Supreme Range",
        },
        level_9: {
          knowledge: "Celestial Perfection",
          chaos: "Shadow Barrage",
          tactical: "Total Precision",
        },
        level_10: {
          knowledge: "Star Archer",
          chaos: "Void Archer",
          tactical: "Balanced Archer",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Star Archer",
          description:
            "Bonus damage and range for all allied ranged units. Unmatched precision.",
          abilities: ["Star Shot", "Range Amplification", "Guided Fire"],
          fragment_interaction:
            "All ranged attacks gain homing and bonus damage",
          unit_synergy:
            "Dreampiercer Archers gain +3 range and +2 damage; all ranged units gain accuracy",
        },
        chaos: {
          name: "Void Archer",
          description:
            "Inflicts additional fear and damage over time. Arrows become cursed projectiles.",
          abilities: ["Void Shot", "Fear Arrow", "Cursed Volley"],
          fragment_interaction:
            "Arrows leave void zones that damage and fear enemies over time",
          unit_synergy:
            "Dreampiercer Archers gain void damage; shots apply persistent DoT",
        },
        hybrid: {
          name: "Balanced Archer",
          description: "Moderate range and damage enhancement.",
          abilities: ["Steady Aim", "Controlled Shot", "Balanced Precision"],
          fragment_interaction: "Moderate range and accuracy bonuses",
          unit_synergy: "Dreampiercer Archers gain +1 range and +1 damage",
        },
      },
      signature_units: ["Dreampiercer Archers"],
      strategic_notes:
        "Hisame controls the backline. Use her to snipe enemy commanders and reveal hidden threats. Essential against stealth-heavy opponents.",
      tags: ["ranged", "precision", "anti-stealth"],
    },
    {
      name: "Commander Midorikaze",
      faction: "veilbound-shogunate",
      title: "The Lotus Bloom",
      flavor_text:
        "In the garden of war, Midorikaze is both the gardener and the poison. Her enemies wilt before they understand why.",
      theme: "Debuff specialist, area control",
      personality:
        "Calm, nurturing to allies but merciless to enemies. Sees warfare as cultivation.",
      playstyle: "Area debuffs, minor control, momentum support",
      base_stats: {
        Command: 7,
        Knowledge: 8,
        Leadership: 8,
        Agility: 6,
        Health: 95,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 10, MOV: 6, RNG: 6, MOR: 10 },
      points_cost: 22,
      level_1_deck: {
        command: ["Lotus Bloom"],
        tech: ["Spirit Bind", "Momentum Boost"],
        fragment: ["Lotus Energy Activation", "Debuff Enhancement"],
        tactical: ["Area Suppression"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Enhanced Bloom",
          chaos: "Toxic Lotus",
          tactical: "Quick Debuff",
        },
        level_3: {
          knowledge: "Flow Bloom",
          chaos: "Phantom Spores",
          tactical: "Debuff Mastery",
        },
        level_4: {
          knowledge: "Perfect Growth",
          chaos: "Dark Lotus",
          tactical: "Area Control",
        },
        level_5: {
          knowledge: "Sage Bloom",
          chaos: "Horror Bloom",
          tactical: "Strategic Debuff",
        },
        level_6: {
          knowledge: "Flow Garden",
          chaos: "Nightmare Spores",
          tactical: "Combined Control",
        },
        level_7: {
          knowledge: "Perfect Cultivation",
          chaos: "Phantom Garden",
          tactical: "Tactical Bloom",
        },
        level_8: {
          knowledge: "Lotus Mastery",
          chaos: "Dark Garden",
          tactical: "Supreme Control",
        },
        level_9: {
          knowledge: "Ultimate Bloom",
          chaos: "Horror Garden",
          tactical: "Total Suppression",
        },
        level_10: {
          knowledge: "Lotus Sage",
          chaos: "Lotus Horror",
          tactical: "Balanced Gardener",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Lotus Sage",
          description:
            "Improves Ritual Flow and unit efficiency. The garden feeds the army.",
          abilities: ["Flow Garden", "Efficient Bloom", "Sage Cultivation"],
          fragment_interaction: "Debuffs convert into Ritual Flow for allies",
          unit_synergy:
            "Lotus Ascetics gain +3 to all stats; debuffs last longer and are stronger",
        },
        chaos: {
          name: "Lotus Horror",
          description:
            "Summons phantoms and AoE debuffs. The garden becomes a nightmare.",
          abilities: ["Phantom Bloom", "Fear Spores", "Horror Garden"],
          fragment_interaction:
            "Debuff zones spawn phantom constructs that attack enemies",
          unit_synergy:
            "Lotus Ascetics gain phantom summoning; debuffs spread to additional targets",
        },
        hybrid: {
          name: "Balanced Gardener",
          description:
            "Moderate debuff enhancement with minor Flow generation.",
          abilities: ["Controlled Growth", "Steady Bloom", "Balanced Garden"],
          fragment_interaction:
            "Moderate debuff strength with minor Flow return",
          unit_synergy:
            "Lotus Ascetics gain +1 to all stats; debuffs have minor area spread",
        },
      },
      signature_units: ["Lotus Ascetics"],
      strategic_notes:
        "Midorikaze weakens enemy forces before engagement. Position her to debuff enemy formations, then charge with cavalry.",
      tags: ["debuff", "area-control", "support"],
    },
    {
      name: "Commander Kagero",
      faction: "veilbound-shogunate",
      title: "The Shadow Phantom",
      flavor_text:
        "Kagero does not fight battles. He ends them — silently, suddenly, and with the certainty of a closing eye.",
      theme: "Stealth operations, assassination",
      personality:
        "Silent, deadly, moves like smoke. His loyalty is absolute but his methods are unsettling even to allies.",
      playstyle: "Teleport strikes, stealth, chain momentum for allies",
      base_stats: {
        Command: 6,
        Knowledge: 7,
        Leadership: 7,
        Agility: 10,
        Health: 80,
      },
      battle_stats: { ATK: 5, DEF: 3, HP: 8, MOV: 10, RNG: 3, MOR: 9 },
      points_cost: 19,
      level_1_deck: {
        command: ["Phantom Strike"],
        tech: ["Veil Shroud", "Dual Momentum"],
        fragment: ["Shadow Manifestation", "Phantom Edge"],
        tactical: ["Silent Kill"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Flow Shadow",
          chaos: "Dark Strike",
          tactical: "Quick Shadow",
        },
        level_3: {
          knowledge: "Controlled Phantom",
          chaos: "Fear Shadow",
          tactical: "Stealth Mastery",
        },
        level_4: {
          knowledge: "Flow Phase",
          chaos: "Shadow Storm",
          tactical: "Assassination Training",
        },
        level_5: {
          knowledge: "Phantom Flow",
          chaos: "Dark Assassination",
          tactical: "Combined Stealth",
        },
        level_6: {
          knowledge: "Perfect Stealth",
          chaos: "Nightmare Shadow",
          tactical: "Shadow Mastery",
        },
        level_7: {
          knowledge: "Flow Phantom",
          chaos: "Void Shadow",
          tactical: "Tactical Ghost",
        },
        level_8: {
          knowledge: "Shadow Legend",
          chaos: "Dark Phantom",
          tactical: "Supreme Stealth",
        },
        level_9: {
          knowledge: "Ultimate Phantom",
          chaos: "Shadow Nightmare",
          tactical: "Total Shadow",
        },
        level_10: {
          knowledge: "Flow Phantom",
          chaos: "Shadow Phantom",
          tactical: "Balanced Phantom",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Flow Phantom",
          description:
            "Enhances Flow generation and chain bonuses through phantom strikes.",
          abilities: [
            "Flow Generation on Kill",
            "Chain Enhancement",
            "Phantom Flow",
          ],
          fragment_interaction:
            "Kills generate massive Ritual Flow; chains spread invisibility",
          unit_synergy:
            "Silent Ink Assassins gain Flow generation; all stealth units gain chain bonuses",
        },
        chaos: {
          name: "Shadow Phantom",
          description:
            "Additional AoE damage with fear on every phantom strike.",
          abilities: ["Fear Strike", "Shadow Explosion", "Phantom Terror"],
          fragment_interaction:
            "Phantom strikes leave fear zones and shadow damage areas",
          unit_synergy:
            "Silent Ink Assassins gain AoE fear; kills trigger shadow explosions",
        },
        hybrid: {
          name: "Balanced Phantom",
          description:
            "Moderate stealth enhancement with controlled fear effects.",
          abilities: [
            "Controlled Shadow",
            "Steady Phantom",
            "Balanced Stealth",
          ],
          fragment_interaction:
            "Moderate stealth and fear effects with stability",
          unit_synergy:
            "Silent Ink Assassins gain +1 attack and minor fear effect",
        },
      },
      signature_units: ["Silent Ink Assassins"],
      strategic_notes:
        "Kagero is the Veilbound's assassination specialist. Use him to eliminate key targets before the main engagement begins.",
      tags: ["stealth", "assassination", "agility"],
    },
    {
      name: "Commander Tsuyukusa",
      faction: "veilbound-shogunate",
      title: "The Ink Current",
      flavor_text:
        "The ink flows where Tsuyukusa wills it. She reshapes the currents of battle like water reshaping stone — slowly, inevitably.",
      theme: "Repositioning, Flow enhancement, morale disruption",
      personality:
        "Fluid, adaptable, sees every battle as a flowing river. Patient and methodical.",
      playstyle:
        "Movement bonuses, minor AoE Flow boost, enemy morale reduction",
      base_stats: {
        Command: 7,
        Knowledge: 8,
        Leadership: 7,
        Agility: 7,
        Health: 90,
      },
      battle_stats: { ATK: 5, DEF: 4, HP: 9, MOV: 7, RNG: 6, MOR: 9 },
      points_cost: 21,
      level_1_deck: {
        command: ["Inkstep"],
        tech: ["Ritual Burst", "Veil Aura"],
        fragment: ["Ink Current Activation", "Flow Pulse"],
        tactical: ["Repositioning"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Flow Current",
          chaos: "Dark Ink",
          tactical: "Quick Reposition",
        },
        level_3: {
          knowledge: "Controlled Flow",
          chaos: "Corrupt Current",
          tactical: "Ink Mastery",
        },
        level_4: {
          knowledge: "Perfect Current",
          chaos: "Ink Poison",
          tactical: "Area Movement",
        },
        level_5: {
          knowledge: "Sage Current",
          chaos: "Dark Wave",
          tactical: "Strategic Ink",
        },
        level_6: {
          knowledge: "Flow River",
          chaos: "Nightmare Current",
          tactical: "Combined Reposition",
        },
        level_7: {
          knowledge: "Perfect Ink",
          chaos: "Void Current",
          tactical: "Tactical Flow",
        },
        level_8: {
          knowledge: "Current Mastery",
          chaos: "Dark Flood",
          tactical: "Supreme Ink",
        },
        level_9: {
          knowledge: "Ultimate Current",
          chaos: "Ink Collapse",
          tactical: "Total Flow",
        },
        level_10: {
          knowledge: "Ink Master",
          chaos: "Corrupt Ink",
          tactical: "Balanced Current",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Ink Master",
          description:
            "Enhances Ritual Flow and reduces cooldowns. The current carries all allies forward.",
          abilities: ["Flow Enhancement", "Cooldown Reduction", "Ink Mastery"],
          fragment_interaction:
            "All Ritual Flow doubled; abilities recharge significantly faster",
          unit_synergy:
            "Ink Sigil Crafters gain double range; all units gain repositioning bonus",
        },
        chaos: {
          name: "Corrupt Ink",
          description:
            "AoE debuff and damage over time. The ink becomes poison.",
          abilities: ["Toxic Current", "Ink Poison", "Dark Flow"],
          fragment_interaction:
            "Ink trails damage and slow enemies; debuffs persist",
          unit_synergy:
            "Ink Sigil Crafters gain DoT effects; ink zones spread corruption",
        },
        hybrid: {
          name: "Balanced Current",
          description: "Moderate Flow enhancement with minor debuff effects.",
          abilities: ["Controlled Current", "Steady Ink", "Balanced Flow"],
          fragment_interaction: "Moderate Flow and minor debuff effects",
          unit_synergy:
            "Ink Sigil Crafters gain +1 range; minor DoT on ink zones",
        },
      },
      signature_units: ["Ink Sigil Crafters"],
      strategic_notes:
        "Tsuyukusa excels at repositioning and Flow management. Use her for flexible, adaptive battle plans.",
      tags: ["repositioning", "flow-management", "debuff"],
    },
    {
      name: "Commander Hoshikami",
      faction: "veilbound-shogunate",
      title: "The Star Weaver",
      flavor_text:
        "Hoshikami's illusions are so perfect that even his allies sometimes wonder which version of reality is real. In the end, it doesn't matter — all versions serve his purpose.",
      theme: "Illusions, ranged area control, Flow amplification",
      personality:
        "Enigmatic, playful, treats warfare as a grand performance. Always smiling behind his mask.",
      playstyle:
        "Long-range area attacks, illusion creation, Flow amplification",
      base_stats: {
        Command: 7,
        Knowledge: 9,
        Leadership: 7,
        Agility: 7,
        Health: 85,
      },
      battle_stats: { ATK: 5, DEF: 3, HP: 9, MOV: 7, RNG: 6, MOR: 9 },
      points_cost: 19,
      level_1_deck: {
        command: ["Starfall Volley"],
        tech: ["Veil Phantasm", "Flow Link"],
        fragment: ["Star Energy Activation", "Illusion Weave"],
        tactical: ["Area Bombardment"],
      },
      skill_tree: {
        level_2: {
          knowledge: "Star Precision",
          chaos: "Phantom Star",
          tactical: "Quick Volley",
        },
        level_3: {
          knowledge: "Flow Star",
          chaos: "Dark Illusion",
          tactical: "Illusion Mastery",
        },
        level_4: {
          knowledge: "Perfect Weave",
          chaos: "Horror Illusion",
          tactical: "Area Mastery",
        },
        level_5: {
          knowledge: "Celestial Link",
          chaos: "Phantom Storm",
          tactical: "Combined Illusion",
        },
        level_6: {
          knowledge: "Star Network",
          chaos: "Nightmare Weave",
          tactical: "Star Mastery",
        },
        level_7: {
          knowledge: "Perfect Flow Link",
          chaos: "Dark Star Rain",
          tactical: "Tactical Stars",
        },
        level_8: {
          knowledge: "Star Legend",
          chaos: "Phantom Rain",
          tactical: "Supreme Illusion",
        },
        level_9: {
          knowledge: "Ultimate Star",
          chaos: "Star Nightmare",
          tactical: "Total Weave",
        },
        level_10: {
          knowledge: "Star Sage",
          chaos: "Star Horror",
          tactical: "Balanced Weaver",
        },
      },
      evolution_paths: {
        knowledge: {
          name: "Star Sage",
          description:
            "Greatly enhances Ritual Flow generation and chain bonuses. The stars align for all allies.",
          abilities: [
            "Flow Amplification",
            "Chain Enhancement",
            "Star Guidance",
          ],
          fragment_interaction:
            "All Ritual Flow tripled in range; chain bonuses spread further",
          unit_synergy:
            "Celestial Slingers gain +3 range and +2 AoE; all units gain Flow boost",
        },
        chaos: {
          name: "Star Horror",
          description:
            "Illusions become semi-real, dealing actual damage. Reality becomes uncertain.",
          abilities: ["Real Illusions", "Phantom Damage", "Star Nightmare"],
          fragment_interaction:
            "Illusions deal 50% real damage; enemies cannot distinguish real from phantom",
          unit_synergy:
            "Celestial Slingers gain phantom duplicates; illusion attacks deal damage",
        },
        hybrid: {
          name: "Balanced Weaver",
          description: "Moderate illusion and Flow enhancement.",
          abilities: ["Controlled Stars", "Steady Weave", "Balanced Illusion"],
          fragment_interaction:
            "Moderate illusion effectiveness with Flow boost",
          unit_synergy:
            "Celestial Slingers gain +1 range; minor illusion effects",
        },
      },
      signature_units: ["Celestial Slingers"],
      strategic_notes:
        "Hoshikami combines ranged control with illusion warfare. Use him to confuse and overwhelm enemies at distance before cavalry closes.",
      tags: ["illusion", "ranged", "flow-amplification"],
    },

    // ===================== NIGHTFANG DOMINION COMMANDERS =====================
    {
      name: "Lord Sanguinar",
      faction: "nightfang-dominion",
      title: "The Blood Patriarch",
      flavor_text: "The first and greatest of the Nightfang. Lord Sanguinar drank from the Crimson Wellspring 800 years ago and has built an empire of blood and corruption ever since. He is patient, methodical, and utterly ruthless — a predator who thinks in centuries.",
      theme: "Supreme balanced commander — high stats, Blood Tithe mastery, Corruption Aura",
      personality: "Patient, aristocratic, paternally cruel. Sees the Blight as salvation and himself as its shepherd.",
      playstyle: "All-rounder with a slight melee focus. Excels at Blood Tithe sacrifice strategies and commanding thrall hordes. His Blight Communion ability gives nearby thralls tactical awareness they normally lack.",
      base_stats: {
        Command: 10,
        Knowledge: 8,
        Leadership: 10,
        Agility: 6,
        Health: 140
      },
      battle_stats: {
        ATK: 6,
        DEF: 4,
        HP: 11,
        MOV: 5,
        RNG: 3,
        MOR: 10
      },
      points_cost: 25,
      level_1_deck: {
        command: ["Blood Command", "Thrall Surge"],
        tech: ["Blight Infusion", "Corruption Amplifier"],
        fragment: ["Crimson Wellspring Tap"],
        tactical: ["Apex Strike"]
      },
      skill_tree: {
        level_2: {
          knowledge: "+1 Command range for Thrall Command",
          chaos: "Blood Tithe costs 0 HP once per turn",
          tactical: "+1 ATK when Hunger Pool is 5+"
        },
        level_3: {
          knowledge: "Thrall units within 12\" gain +1 MOR",
          chaos: "Corruption Aura 3\" on commander",
          tactical: "+1 DEF in melee"
        },
        level_4: {
          knowledge: "Draw 1 extra card per turn",
          chaos: "Blood Drain heals 2 HP instead of 1",
          tactical: "Challenge kills heal commander to full HP"
        },
        level_5: {
          knowledge: "All Thrall units gain +1 ATK faction-wide",
          chaos: "Hunger Pool thresholds reduced by 2",
          tactical: "+1 ATK and +1 DEF permanently"
        },
        level_6: {
          knowledge: "Unlock Blight Communion: command all thralls within 24\"",
          chaos: "Corruption tokens on enemies also reduce DEF by 1 per 3 tokens",
          tactical: "Once per battle, all friendly units make a free attack"
        },
        level_7: {
          knowledge: "Commander Aura +2 MOR instead of +1",
          chaos: "Blood Tithe can sacrifice thralls instead of HP",
          tactical: "+2 ATK dice in Challenges"
        },
        level_8: {
          knowledge: "Thrall units are no longer Expendable when within 12\"",
          chaos: "When Hunger Pool hits 15, all enemies gain 2 Corruption tokens",
          tactical: "Counterattack: strike back when attacked in melee, once per turn"
        },
        level_9: {
          knowledge: "All friendly units heal 1 HP at End Phase",
          chaos: "Crimson Transformation: once per battle, +3 ATK, +4 MOV for 2 turns",
          tactical: "All attacks gain Corruption Spread"
        },
        level_10: {
          knowledge: "The Red Feast: after killing any commander, heal to full and gain +2 all stats for rest of battle",
          chaos: "Blight Eruption: when reduced to 0 HP, explode for 6 damage to all enemies within 4\" and revive with 3 HP once per game",
          tactical: "Supreme Commander: all friendly units within 18\" gain +1 ATK permanently"
        }
      },
      evolution_paths: {
        knowledge: {
          name: "Patriarch Ascended",
          description: "Sanguinar becomes a godlike commander, his thralls acting with perfect coordination and his Blight Communion spanning the entire battlefield.",
          abilities: [
            "Blight Communion: 24\" thrall command range",
            "All thralls gain +1 ATK and +1 MOR",
            "Heal 1 HP per turn to all friendly units within 12\""
          ],
          fragment_interaction: "Fragments within 12\" activate for free once per battle",
          unit_synergy: "Thrall units become effective soldiers rather than expendable screens"
        },
        chaos: {
          name: "The Crimson Apotheosis",
          description: "Sanguinar fully unleashes the Blight within him, becoming a living corruption engine that warps reality around him.",
          abilities: [
            "Corruption Aura 4\"",
            "Crimson Transformation: +3 ATK, +4 MOV for 2 turns",
            "Blight Eruption on death: 6 damage to all within 4\", revive with 3 HP"
          ],
          fragment_interaction: "Fragments near Sanguinar gain double charges but become unstable",
          unit_synergy: "Elite units near commander gain Corruption Aura 2\""
        },
        hybrid: {
          name: "The Eternal Predator",
          description: "A balance of command mastery and personal lethality. Sanguinar leads from the front, coordinating thralls while personally hunting enemy commanders.",
          abilities: [
            "Thralls gain +1 ATK within 12\"",
            "+2 ATK and +1 DEF permanently",
            "Challenge kills heal to full HP"
          ],
          fragment_interaction: "Balanced fragment enhancement — +1 charge and stable",
          unit_synergy: "All units gain +1 MOR within commander aura range"
        }
      },
      signature_units: ["Corruption Guard", "Tiger Fang Elite", "Plague Titan"],
      strategic_notes: "Lord Sanguinar is the most balanced Nightfang commander. Use him when you want a large thrall-based army with strong command presence. His Blight Communion transforms cheap thralls from mindless screens into coordinated infantry. Blood Tithe and Hunger Pool management are key — sacrifice thralls early to power up, then push with elites when the Pool is high.",
      tags: ["balanced", "thrall-commander", "blood-tithe", "apex"]
    },
    {
      name: "Countess Nyxara",
      faction: "nightfang-dominion",
      title: "The Plague Weaver",
      flavor_text: "Countess Nyxara views warfare as a garden — she plants corruption and patiently watches it bloom. Her enemies don't die in battle; they wither as the Blight consumes them from within. By the time her warriors engage, the enemy is already half-dead.",
      theme: "Corruption specialist — maximum debuff through Corruption tokens",
      personality: "Patient, methodical, disturbingly calm. She speaks in gardening metaphors and genuinely finds corruption beautiful.",
      playstyle: "Debuff-focused commander. Nyxara excels at applying Corruption tokens at range, weakening enemies before engagement. She pairs best with Corruption Spreaders, Plague Apothecaries, and ranged units.",
      base_stats: {
        Command: 8,
        Knowledge: 9,
        Leadership: 7,
        Agility: 7,
        Health: 100
      },
      battle_stats: {
        ATK: 4,
        DEF: 3,
        HP: 9,
        MOV: 5,
        RNG: 6,
        MOR: 9
      },
      points_cost: 20,
      level_1_deck: {
        command: ["Corruption Wave", "Plague Wind"],
        tech: ["Intensified Blight", "Corruption Seeds"],
        fragment: ["Blighted Harvest"],
        tactical: ["Withering Strike"]
      },
      skill_tree: {
        level_2: {
          knowledge: "Corruption tokens also reduce enemy RNG by 1 per 3 tokens",
          chaos: "Corruption Spread range increased to 3\"",
          tactical: "+1 ATK against targets with Corruption tokens"
        },
        level_3: {
          knowledge: "Plague Apothecaries within 12\" can Intensify for free once per turn",
          chaos: "Enemies with 3+ tokens take 1 damage at End Phase",
          tactical: "+1 DEF when within 6\" of corrupted enemies"
        },
        level_4: {
          knowledge: "Corruption threshold reduced to 2 tokens (instead of 3)",
          chaos: "Corruption tokens spread to adjacent enemy units on kill",
          tactical: "+1 ATK die for each Corruption token on the target (max +3)"
        },
        level_5: {
          knowledge: "All support units gain +1 to Corruption application range",
          chaos: "Enemies cannot remove Corruption tokens by any means",
          tactical: "+1 ATK and +1 RNG permanently"
        },
        level_6: {
          knowledge: "Unlock Plague Garden: create a 6\" Corruption Zone anywhere on battlefield, once per battle",
          chaos: "At End Phase, all corrupted enemy units take damage equal to half their Corruption tokens (round down)",
          tactical: "Ranged attacks apply 2 Corruption tokens instead of 1"
        },
        level_7: {
          knowledge: "Corrupted enemies have -1 CP generation per 3 tokens on their commander",
          chaos: "Corruption Explosion: when corrupted unit dies, all adjacent units gain 2 tokens",
          tactical: "+2 ATK against targets with 4+ tokens"
        },
        level_8: {
          knowledge: "All friendly units heal 1 HP for each corrupted enemy destroyed",
          chaos: "Maximum Corruption tokens increased to 9 (instead of 6)",
          tactical: "Counterattack: apply 1 Corruption token to any unit that attacks Nyxara in melee"
        },
        level_9: {
          knowledge: "All corruption support units gain +1 DEF",
          chaos: "Blight Plague: once per battle, all enemy units on the battlefield gain 1 Corruption token",
          tactical: "All attacks are ranged 6\" — Nyxara can fight from distance"
        },
        level_10: {
          knowledge: "Corruption Ascendancy: corrupted enemies are treated as having -2 to all stats per 3 tokens",
          chaos: "Pandemic: when an enemy unit with 6+ tokens is destroyed, every enemy unit gains 3 tokens",
          tactical: "Toxic Mastery: Nyxara's attacks deal bonus damage equal to target's Corruption tokens"
        }
      },
      evolution_paths: {
        knowledge: {
          name: "The Patient Plague",
          description: "Nyxara perfects corruption control, making each token more devastating and expanding her infection range across the entire battlefield.",
          abilities: [
            "Corruption threshold at 2 tokens instead of 3",
            "Corrupted enemies lose -2 all stats per 3 tokens",
            "Plague Garden: 6\" Corruption Zone once per battle"
          ],
          fragment_interaction: "Fragments amplify corruption potency — each token counts as 2",
          unit_synergy: "Support units gain extended range and free Intensify"
        },
        chaos: {
          name: "The Living Pandemic",
          description: "Nyxara becomes corruption incarnate. Tokens spread uncontrollably, damage ticks every phase, and dying corrupted units infect everything around them.",
          abilities: [
            "Corruption tokens cannot be removed",
            "Corrupted units take damage each End Phase",
            "Pandemic: killing a 6-token unit spreads 3 tokens to all enemies"
          ],
          fragment_interaction: "Fragments become volatile — double effect but may infect friendlies",
          unit_synergy: "All Nightfang units gain Corruption Spread on all attacks"
        },
        hybrid: {
          name: "The Garden of Thorns",
          description: "A balanced blend of patient corruption and combat effectiveness. Nyxara weakens and fights in concert.",
          abilities: [
            "Corruption threshold at 2 tokens",
            "+1 ATK per token on target (max +3)",
            "Blight Plague: all enemies gain 1 token once per battle"
          ],
          fragment_interaction: "Fragments gain +1 charge and enhanced corruption range",
          unit_synergy: "Support and combat units both benefit from corruption synergy"
        }
      },
      signature_units: ["Corruption Spreaders", "Plague Apothecaries", "Blight Weavers"],
      strategic_notes: "Nyxara is the premier debuffer. Build armies with lots of Corruption Spreaders and support units to blanket the enemy in tokens before your combat units engage. She is weak in direct combat — keep her behind the lines and let the plague do the work.",
      tags: ["corruption-focus", "debuffer", "support-synergy", "ranged"]
    },
    {
      name: "Grand Fang Voraxis",
      faction: "nightfang-dominion",
      title: "The Tiger Lord",
      flavor_text: "Voraxis is not a king who commands tigers — he IS a tiger who commands an empire. The largest and most ferocious Stage 3 warrior in the Dominion, he leads from the absolute front, tearing through enemy lines with claws that can shear through plate armor.",
      theme: "Melee monster — highest ATK, beast synergy, Challenge specialist",
      personality: "Primal, territorial, speaks little. When he does speak, it's usually a warning or a death sentence. Respects only strength.",
      playstyle: "Pure melee aggression. Voraxis is the most dangerous individual combatant in the game. Pair him with Tiger Chargers, Tiger Fang Elite, and War Beasts. He dominates Challenges and his Alpha presence buffs all beast units.",
      base_stats: {
        Command: 6,
        Knowledge: 5,
        Leadership: 9,
        Agility: 10,
        Health: 150
      },
      battle_stats: {
        ATK: 7,
        DEF: 5,
        HP: 12,
        MOV: 6,
        RNG: 1,
        MOR: 10
      },
      points_cost: 29,
      level_1_deck: {
        command: ["Pack Hunt", "Alpha Roar"],
        tech: ["Predator's Instinct", "Tiger's Fury"],
        fragment: ["Feral Awakening"],
        tactical: ["Rending Claws"]
      },
      skill_tree: {
        level_2: {
          knowledge: "All beast units within 8\" gain +1 MOR",
          chaos: "+1 ATK permanently",
          tactical: "Charge bonus increased to +2 ATK dice"
        },
        level_3: {
          knowledge: "Beast units gain Pack Tactics if they don't already have it",
          chaos: "Blood Drain heals 2 HP",
          tactical: "+1 DEF in melee"
        },
        level_4: {
          knowledge: "+1 ATK to all tiger units within 12\"",
          chaos: "When below half HP, +2 ATK",
          tactical: "Counterattack once per turn in melee"
        },
        level_5: {
          knowledge: "All beast units gain Fearless within 12\"",
          chaos: "Frenzy: +1 ATK for each friendly unit destroyed this battle",
          tactical: "+1 ATK and +1 MOV permanently"
        },
        level_6: {
          knowledge: "Supreme Alpha: all beasts within 12\" gain +1 ATK and +1 DEF",
          chaos: "Berserker Rage: when below half HP, double ATK dice",
          tactical: "Challenge kills restore all HP and grant +1 permanent ATK"
        },
        level_7: {
          knowledge: "Beast units can use Voraxis's MOR instead of their own",
          chaos: "+2 ATK when charging",
          tactical: "All melee attacks gain Corruption Spread"
        },
        level_8: {
          knowledge: "Once per turn, command a beast within 12\" to make a free attack",
          chaos: "Tiger Transformation: always in Apex Form, +2 ATK, +2 MOV",
          tactical: "Trample: deal 1 damage to every enemy moved over during charge"
        },
        level_9: {
          knowledge: "All beast units heal 1 HP at End Phase",
          chaos: "Bloodlust: after killing a model, may immediately charge again",
          tactical: "+2 ATK and +1 DEF permanently"
        },
        level_10: {
          knowledge: "Alpha Dominion: all beast units on the battlefield gain +2 ATK and +1 DEF permanently",
          chaos: "Apex Predator Unleashed: ATK becomes 12, cannot be reduced. If killed, deal ATK damage to attacker",
          tactical: "The Perfect Hunt: once per battle, kill any one non-commander model within MOV range automatically"
        }
      },
      evolution_paths: {
        knowledge: {
          name: "The Pack Lord",
          description: "Voraxis elevates every beast in his army, transforming a collection of war beasts into a perfectly coordinated hunting pack.",
          abilities: ["All beasts +2 ATK, +1 DEF", "Supreme Alpha aura 12\"", "Command free beast attack once per turn"],
          fragment_interaction: "Fragments enhance beast units directly — +1 HP to all beasts",
          unit_synergy: "Every tiger and war beast becomes significantly more dangerous"
        },
        chaos: {
          name: "The Apex Incarnate",
          description: "Voraxis becomes the ultimate individual predator — nearly unkillable in melee and growing stronger with every kill.",
          abilities: [
            "Permanent tiger form: ATK +2, MOV +2",
            "Berserker Rage at half HP: double dice",
            "Bloodlust: chain charges after kills"
          ],
          fragment_interaction: "Fragments fuel personal power — each activation grants Voraxis +1 ATK for the rest of battle",
          unit_synergy: "Other units become less important — Voraxis IS the army"
        },
        hybrid: {
          name: "The Night Hunter",
          description: "A balanced approach — Voraxis is a terrifying fighter who also makes his pack deadly.",
          abilities: ["Beast units gain +1 ATK within 12\"", "+2 ATK permanently", "Challenge kills heal to full"],
          fragment_interaction: "Fragments grant +1 to both Voraxis and nearby beasts",
          unit_synergy: "Tiger Warriors, Chargers, and War Beasts all benefit from proximity"
        }
      },
      signature_units: ["Tiger Fang Elite", "Tiger Chargers", "Elder Tiger Horror"],
      strategic_notes: "Voraxis is the ultimate aggro commander. Build around tiger units and war beasts, then charge straight at the enemy. He excels in Challenges — no other commander can match his melee output. His weakness is low Command stat (only 6 CP per turn) and no ranged ability. Use beast units to compensate for his poor strategic flexibility.",
      tags: ["melee-monster", "beast-synergy", "challenge-specialist", "aggressive"]
    },
    {
      name: "Thrallmaster Ghûl",
      faction: "nightfang-dominion",
      title: "The Horde Commander",
      flavor_text: "Where other Nightfang commanders seek personal glory, Ghûl understands that victory belongs to the endless horde. He maintains thousands of thralls through his Blight-link, fielding armies that outnumber the enemy three to one and simply never stop coming.",
      theme: "Cheap horde commander — thrall buffs, swarm tactics, attrition warfare",
      personality: "Quiet, obsessive, counts everything. He treats thralls like pieces on a board — individually meaningless, collectively unstoppable.",
      playstyle: "Economy commander. Ghûl's low cost means more points for units. His abilities make cheap thralls significantly more effective. Field maximum thrall hordes and grind the enemy down through sheer attrition.",
      base_stats: {
        Command: 7,
        Knowledge: 8,
        Leadership: 6,
        Agility: 5,
        Health: 90
      },
      battle_stats: {
        ATK: 3,
        DEF: 3,
        HP: 8,
        MOV: 5,
        RNG: 3,
        MOR: 8
      },
      points_cost: 17,
      level_1_deck: {
        command: ["Horde Command", "Endless Tide"],
        tech: ["Thrall Enhancement", "Blight-Link Pulse"],
        fragment: ["Mass Quickening"],
        tactical: ["Swarm Tactics"]
      },
      skill_tree: {
        level_2: {
          knowledge: "Thrall units within 12\" gain +1 ATK",
          chaos: "Destroyed thralls return on a 5+ roll at End Phase",
          tactical: "Thralls gain +1 MOR within 12\""
        },
        level_3: {
          knowledge: "Thrall units gain Corruption Spread",
          chaos: "Thralls explode on death: 1 damage to adjacent enemies",
          tactical: "+1 DEF for all thralls within 12\""
        },
        level_4: {
          knowledge: "Thrall Masters within 12\" affect thralls at 12\" instead of 6\"",
          chaos: "Thrall Surge: once per turn, one thrall unit makes a free move",
          tactical: "Thrall units count as 2 models for objective control"
        },
        level_5: {
          knowledge: "+1 CP per turn for each 3 thrall units on the battlefield",
          chaos: "When a thrall unit is destroyed, add 2 to Hunger Pool instead of 1",
          tactical: "+1 ATK to Ghûl for each thrall destroyed this battle (max +5)"
        },
        level_6: {
          knowledge: "All thralls gain +1 HP",
          chaos: "Thrall Tide: at start of each turn, place 1 free Thrall Conscripts within 6\" of Ghûl",
          tactical: "Thrall screens: allies behind thralls gain +1 DEF vs ranged"
        },
        level_7: {
          knowledge: "Thrall units no longer have Expendable keyword within 12\"",
          chaos: "Blight-Link Detonation: sacrifice 3 thrall units to deal 3 damage to all enemies within 6\"",
          tactical: "Whip Cruelty: Ghûl can attack friendly thralls to make them move again"
        },
        level_8: {
          knowledge: "All thrall units gain +1 ATK and +1 DEF permanently",
          chaos: "Recycling: destroyed thralls generate 1 Blood Tithe automatically",
          tactical: "Tarpit Enhancement: enemies engaged with 2+ thrall units cannot Disengage"
        },
        level_9: {
          knowledge: "Thrall Command radius becomes 18\"",
          chaos: "Once per battle, sacrifice all thralls to deal their total remaining HP as damage divided among enemies within 12\"",
          tactical: "+2 ATK and +2 DEF for Ghûl permanently"
        },
        level_10: {
          knowledge: "Endless Legion: all thralls gain +2 ATK, +1 DEF, +1 HP, and lose Expendable and Thrall keywords — they become real soldiers",
          chaos: "Grand Detonation: when Ghûl is killed, ALL thralls explode for 2 damage each to nearest enemy",
          tactical: "The Swarm Eternal: thralls regenerate 1 model per turn per unit automatically"
        }
      },
      evolution_paths: {
        knowledge: {
          name: "The Legion Master",
          description: "Ghûl transforms thralls from expendable chaff into a disciplined fighting force, matching regular infantry in capability.",
          abilities: ["All thralls +2 ATK, +1 DEF, +1 HP", "Thralls lose Expendable keyword", "24\" command range"],
          fragment_interaction: "Fragments buff all thralls simultaneously — mass enhancement",
          unit_synergy: "Thrall units become viable mainline combat troops"
        },
        chaos: {
          name: "The Detonation Swarm",
          description: "Ghûl weaponizes thrall deaths, turning every casualty into explosive collateral damage.",
          abilities: [
            "Thralls explode on death for area damage",
            "Destroyed thralls return on 5+",
            "Grand Detonation on commander death"
          ],
          fragment_interaction: "Fragments supercharge thrall detonations — double explosion damage",
          unit_synergy: "Thralls become suicide bombers — quantity over quality taken to extremes"
        },
        hybrid: {
          name: "The Relentless Tide",
          description: "A balance of thrall enhancement and attrition — thralls are better than baseline but still expendable, and the horde never stops.",
          abilities: [
            "Thralls +1 ATK, +1 DEF within 12\"",
            "Free thrall unit each turn",
            "Thralls generate Blood Tithe on death"
          ],
          fragment_interaction: "Fragments sustain the horde — each activation spawns 1 thrall unit",
          unit_synergy: "Continuous thrall reinforcement with moderate combat ability"
        }
      },
      signature_units: ["Thrall Conscripts", "Plague Horde", "Blood Thralls", "Thrall Masters"],
      strategic_notes: "Ghûl is the cheapest Nightfang commander (17 pts), leaving maximum budget for units. Field as many thralls as possible and grind the enemy down. His Knowledge evolution actually makes thralls good fighters; his Chaos evolution turns them into walking bombs. He is personally weak — protect him at all costs.",
      tags: ["horde-commander", "thrall-specialist", "attrition", "economy"]
    },
    {
      name: "Lady Hemora",
      faction: "nightfang-dominion",
      title: "The Blood Surgeon",
      flavor_text: "Lady Hemora is the Nightfang Dominion's premier battlefield healer — though her methods are unsettling. She drains blood from enemies and channels it into wounded allies, stitching torn flesh with tendrils of Blight. Her operating theater is the battlefield, and no patient escapes her care.",
      theme: "Support/healing commander — Blood Drain mastery, sustain warfare",
      personality: "Clinical, detached, speaks in medical terminology. She views combat injuries the way a surgeon views patients — problems to be solved with blood.",
      playstyle: "Sustain commander. Hemora keeps her army alive through constant healing via Blood Drain and Blood Tithe. She excels in prolonged battles where her healing outpaces enemy damage output.",
      base_stats: {
        Command: 7,
        Knowledge: 10,
        Leadership: 8,
        Agility: 5,
        Health: 110
      },
      battle_stats: {
        ATK: 4,
        DEF: 4,
        HP: 10,
        MOV: 4,
        RNG: 6,
        MOR: 9
      },
      points_cost: 22,
      level_1_deck: {
        command: ["Blood Transfusion", "Surgical Strike"],
        tech: ["Regenerative Blight", "Vital Extraction"],
        fragment: ["Crimson Rejuvenation"],
        tactical: ["Draining Touch"]
      },
      skill_tree: {
        level_2: {
          knowledge: "Heal range increased to 6\"",
          chaos: "Blood Drain heals 2 HP instead of 1",
          tactical: "+1 ATK when attacking wounded enemies (below half HP)"
        },
        level_3: {
          knowledge: "All friendly units within 8\" heal 1 HP at End Phase",
          chaos: "Blood Tithe costs 0 HP — drain from enemies instead",
          tactical: "+1 DEF permanently"
        },
        level_4: {
          knowledge: "Blood Shamans within 12\" heal for 2 HP instead of 1",
          chaos: "When a friendly unit kills an enemy, heal the killer for 1 HP",
          tactical: "Blood Drain applies 1 Corruption token"
        },
        level_5: {
          knowledge: "Once per turn, revive a destroyed non-War Machine unit with 1 HP within 6\"",
          chaos: "Blood Tithe generates +1 ATK die AND heals the sacrificer for 1 HP",
          tactical: "+1 ATK and +1 RNG permanently"
        },
        level_6: {
          knowledge: "Mass Heal: once per battle, heal all friendly units within 12\" for 2 HP",
          chaos: "Vampiric Aura: all friendly units within 6\" gain Blood Drain",
          tactical: "Blood Scalpel: ranged attacks ignore DEF bonuses from cover"
        },
        level_7: {
          knowledge: "Revive can target War Machines with 3 HP",
          chaos: "Blood Fountain: when an enemy model is destroyed within 6\", all nearby friendlies heal 1 HP",
          tactical: "+2 ATK dice against targets below half HP"
        },
        level_8: {
          knowledge: "All support units gain +2 DEF",
          chaos: "Hemora cannot be reduced below 1 HP (once per battle, survives lethal damage)",
          tactical: "Counterattack: melee attacks against Hemora trigger Blood Drain on attacker"
        },
        level_9: {
          knowledge: "Friendly units within 12\" gain Blight Regeneration (heal 1 HP at start of turn)",
          chaos: "Blood Sacrifice: sacrifice a unit within 6\" to fully heal Hemora",
          tactical: "+2 ATK and +1 DEF permanently"
        },
        level_10: {
          knowledge: "Crimson Resurrection: once per battle, revive ALL destroyed non-War Machine units with half HP",
          chaos: "Immortal Blood: Hemora cannot die while any friendly unit survives — damage is redirected to nearest friendly unit",
          tactical: "Surgical Mastery: all attacks are guaranteed to hit (ignore DEF) against targets with 3+ Corruption tokens"
        }
      },
      evolution_paths: {
        knowledge: {
          name: "The Crimson Savior",
          description: "Hemora becomes the ultimate battlefield medic, keeping an entire army alive through Blood Drain and mass resurrection.",
          abilities: [
            "Mass Heal all friendlies within 12\" for 2 HP",
            "Revive destroyed units with 1 HP",
            "All friendlies heal 1 HP per turn within 12\""
          ],
          fragment_interaction: "Fragments generate healing pulses — each activation heals all nearby units for 1 HP",
          unit_synergy: "Support units become durable and effective; the entire army is hard to kill"
        },
        chaos: {
          name: "The Blood Vampire",
          description: "Hemora weaponizes healing, draining enemies to fuel allies and becoming nearly impossible to kill herself.",
          abilities: [
            "Vampiric Aura: all friendlies gain Blood Drain within 6\"",
            "Blood Fountain: kills heal nearby allies",
            "Immortal Blood: cannot die while friendly units live"
          ],
          fragment_interaction: "Fragments drain enemy HP directly — each activation deals 1 damage to nearest enemy and heals nearest friendly",
          unit_synergy: "Every unit becomes a vampire — self-sustaining and aggressive"
        },
        hybrid: {
          name: "The Battlefield Physician",
          description: "A balance of healing and combat prowess. Hemora keeps her army functional while being a credible fighter herself.",
          abilities: [
            "Heal all friendlies 1 HP at End Phase within 8\"",
            "Blood Drain heals 2 HP",
            "+1 ATK and +1 DEF permanently"
          ],
          fragment_interaction: "Fragments provide moderate healing and combat enhancement",
          unit_synergy: "All unit types benefit from sustained healing support"
        }
      },
      signature_units: ["Blood Shamans", "Blood Collectors", "Crimson Chanters"],
      strategic_notes: "Hemora excels in attrition battles. Her healing keeps units alive longer than the enemy expects, and Blood Drain ensures her army self-sustains. She's weak in alpha-strike scenarios where enemies can burst down her units before healing kicks in. Build a durable army with high-HP units to maximize her healing value.",
      tags: ["healer", "support-commander", "sustain", "blood-drain"]
    },
    {
      name: "Shadowfang Kreev",
      faction: "nightfang-dominion",
      title: "The Silent Hunter",
      flavor_text: "Kreev does not command armies — he stalks battlefields. A master assassin who emerged from the shadows of the Crimson Maw, he specializes in decapitating enemy forces by killing their commanders. Where Kreev walks, leaders die.",
      theme: "Stealth assassin commander — commander-killer, ambush tactics",
      personality: "Laconic, intense, moves like liquid shadow. Speaks only in whispers. His eyes track movement like a hunting cat.",
      playstyle: "Assassination-focused. Kreev excels at penetrating enemy lines using Stealth and Phase, reaching the enemy commander, and challenging them. Pair with Shadow Claw Infantry, Nightveil Infiltrators, and Midnight Assassins for a stealth-themed army.",
      base_stats: {
        Command: 6,
        Knowledge: 7,
        Leadership: 7,
        Agility: 10,
        Health: 95
      },
      battle_stats: {
        ATK: 6,
        DEF: 3,
        HP: 8,
        MOV: 7,
        RNG: 1,
        MOR: 9
      },
      points_cost: 22,
      level_1_deck: {
        command: ["Shadow Step", "Silent Kill"],
        tech: ["Venom Claws", "Night Vision"],
        fragment: ["Shadow Fragment"],
        tactical: ["Assassination Strike"]
      },
      skill_tree: {
        level_2: {
          knowledge: "Stealth units within 12\" gain +1 ATK",
          chaos: "+2 ATK on first attack from Stealth",
          tactical: "+1 MOV permanently"
        },
        level_3: {
          knowledge: "Scout units deploy 8\" ahead instead of 6\"",
          chaos: "After killing a model, re-enter Stealth",
          tactical: "+1 DEF when in cover"
        },
        level_4: {
          knowledge: "All Stealth units gain Phase",
          chaos: "Ambush bonus increases to +3 ATK",
          tactical: "+1 ATK permanently"
        },
        level_5: {
          knowledge: "Stealth units cannot be detected by Spotter abilities",
          chaos: "When attacking from Stealth, ignore target's DEF bonuses",
          tactical: "+1 ATK and +1 MOV permanently"
        },
        level_6: {
          knowledge: "Once per turn, move a Stealth unit 6\" as a free action",
          chaos: "Shadow Pounce: may charge a target within 12\" ignoring intervening models",
          tactical: "Challenge bonus: +2 ATK and +2 DEF in Challenges"
        },
        level_7: {
          knowledge: "All Stealth units gain Ambush if they don't have it",
          chaos: "After killing a commander in a Challenge, all enemy units take immediate MOR check at -2",
          tactical: "Counterattack: strike first when attacked in melee"
        },
        level_8: {
          knowledge: "Stealth units gain +1 DEF permanently",
          chaos: "Kreev can attack twice in melee (second attack at -1 ATK)",
          tactical: "Blood Drain on all melee attacks"
        },
        level_9: {
          knowledge: "All friendly units gain Stealth while in cover",
          chaos: "Once per battle, remove Kreev from the board and redeploy anywhere in Stealth",
          tactical: "+3 ATK dice in Challenges"
        },
        level_10: {
          knowledge: "Shadow Network: all Stealth units can communicate silently — they cannot be surprised and gain +2 ATK permanently",
          chaos: "Death From Darkness: Kreev's first attack from Stealth automatically kills any non-War Machine target",
          tactical: "The Perfect Kill: once per battle, Kreev may fight a Challenge that cannot be refused and cannot be intervened in"
        }
      },
      evolution_paths: {
        knowledge: {
          name: "The Shadow Master",
          description: "Kreev makes his entire army a stealth force, with coordinated ambushes and enhanced concealment.",
          abilities: [
            "All Stealth units gain Phase",
            "Stealth units +2 ATK permanently",
            "Shadow Network prevents surprise attacks"
          ],
          fragment_interaction: "Fragments generate shadow zones — 3\" Stealth-granting areas",
          unit_synergy: "All stealth and scout units become elite ambushers"
        },
        chaos: {
          name: "The Deathstalker",
          description: "Kreev becomes the ultimate assassin — able to kill any target in a single strike from Stealth.",
          abilities: [
            "First attack auto-kills non-War Machine",
            "Re-enter Stealth after kills",
            "Can redeploy anywhere once per battle"
          ],
          fragment_interaction: "Fragments enhance personal lethality — each activation grants +2 ATK for 1 turn",
          unit_synergy: "Other units become distractions while Kreev hunts the real target"
        },
        hybrid: {
          name: "The Night Terror",
          description: "Kreev combines personal assassination prowess with stealth army enhancement.",
          abilities: ["Stealth units +1 ATK", "+2 ATK from Stealth", "Challenge bonus: +2 ATK and +2 DEF"],
          fragment_interaction: "Fragments provide balanced stealth and combat enhancement",
          unit_synergy: "Stealth units fight well and Kreev is a credible assassin"
        }
      },
      signature_units: ["Midnight Assassin", "Shadow Claw Infantry", "Nightveil Infiltrators"],
      strategic_notes: "Kreev is a surgical instrument, not a sledgehammer. Use stealth units to screen and distract while Kreev sneaks toward the enemy commander. His low HP means he MUST strike first — if caught in the open, he's vulnerable. His Chaos evolution's auto-kill from Stealth is the most dangerous single ability in the game.",
      tags: ["assassin", "stealth-specialist", "commander-hunter", "glass-cannon"]
    },
    {
      name: "The Crimson Prophet",
      faction: "nightfang-dominion",
      title: "Voice of the Blight",
      flavor_text: "The Crimson Prophet speaks for the Scarlet Blight itself — or so they claim. A Plague Herald who ascended beyond mortal form, they channel the Wellspring's power directly, wielding fragments with unmatched precision. Their prophecies always come true — because they make them come true.",
      theme: "Fragment specialist — maximizes fragment efficiency and corruption rituals",
      personality: "Messianic, eerily calm, speaks in prophecies. Gender-ambiguous — the Blight has consumed enough of their form that mortal categories no longer apply.",
      playstyle: "Fragment-focused commander. The Crimson Prophet makes fragments more powerful, gains bonus charges, and can activate them at range. Build around Blood Hierophants, Hunger Priests, and Blight Weavers for maximum fragment/ritual synergy.",
      base_stats: {
        Command: 8,
        Knowledge: 10,
        Leadership: 8,
        Agility: 5,
        Health: 110
      },
      battle_stats: {
        ATK: 3,
        DEF: 4,
        HP: 10,
        MOV: 4,
        RNG: 8,
        MOR: 10
      },
      points_cost: 21,
      level_1_deck: {
        command: ["Prophecy of Blood", "Fragment Surge"],
        tech: ["Blight Channeling", "Wellspring Link"],
        fragment: ["Crimson Revelation", "Fragment Overcharge"],
        tactical: ["Prophetic Strike"]
      },
      skill_tree: {
        level_2: {
          knowledge: "Fragments gain +1 charge",
          chaos: "Fragment activation deals 1 damage to all enemies within 3\" of the fragment",
          tactical: "+1 ATK at range"
        },
        level_3: {
          knowledge: "Fragment activation range increased to 12\"",
          chaos: "Fragments can be activated twice per turn",
          tactical: "+1 DEF permanently"
        },
        level_4: {
          knowledge: "Blood Hierophants within 12\" grant +2 charges instead of +1",
          chaos: "Fragment activation applies 2 Corruption tokens to enemies within 3\"",
          tactical: "+1 ATK and +1 RNG permanently"
        },
        level_5: {
          knowledge: "Once per turn, activate a fragment for free (no charge cost)",
          chaos: "When a fragment runs out of charges, it detonates: 3 damage to all within 3\"",
          tactical: "Prophetic Vision: may look at enemy commander's hand once per turn"
        },
        level_6: {
          knowledge: "Fragment effects doubled (healing, ATK bonuses, etc.)",
          chaos: "Fragments become Unstable: +50% effect but 50% chance of 2 damage to nearby friendlies",
          tactical: "Ranged attacks apply corruption from fragments to all targets hit"
        },
        level_7: {
          knowledge: "Once per battle, restore all fragment charges",
          chaos: "Fragment Eruption: once per battle, detonate all active fragments simultaneously",
          tactical: "Fragments grant +1 DEF to all friendlies within 3\""
        },
        level_8: {
          knowledge: "All support units can activate fragments",
          chaos: "Destroyed fragments leave permanent Corruption Zones",
          tactical: "+2 ATK permanently"
        },
        level_9: {
          knowledge: "Fragments can be placed anywhere within 18\" as a free action",
          chaos: "Wellspring Connection: The Prophet regenerates 2 HP per turn from fragment energy",
          tactical: "All ranged attacks ignore 1 point of DEF"
        },
        level_10: {
          knowledge: "Wellspring Mastery: all fragments have unlimited charges and doubled effects",
          chaos: "Crimson Apocalypse: once per battle, every fragment on the battlefield detonates for 5 damage in 4\" radius, then respawns with full charges",
          tactical: "Prophetic Supremacy: at start of each turn, choose one: enemy cannot play cards, or all friendlies gain +1 ATK"
        }
      },
      evolution_paths: {
        knowledge: {
          name: "The Wellspring Conduit",
          description: "The Prophet becomes a living channel for the Wellspring, making fragments virtually unlimited and vastly more powerful.",
          abilities: [
            "All fragments have unlimited charges",
            "Fragment effects doubled",
            "Place fragments anywhere within 18\""
          ],
          fragment_interaction: "Fragments become the core of the army — unlimited, doubled, repositionable",
          unit_synergy: "Support units near fragments gain significant buffs"
        },
        chaos: {
          name: "The Crimson Detonator",
          description: "The Prophet weaponizes fragments, turning them into corruption bombs that devastate the battlefield.",
          abilities: [
            "Fragment detonation: 5 damage in 4\" radius",
            "Fragments respawn after detonation",
            "Destroyed fragments leave Corruption Zones"
          ],
          fragment_interaction: "Fragments become weapons first, support second — explosive and destructive",
          unit_synergy: "All units benefit from fragment explosions but must stay clear of blast zones"
        },
        hybrid: {
          name: "The Blight Oracle",
          description: "A balanced approach that enhances fragment effects while maintaining personal combat capability.",
          abilities: ["Fragments gain +1 charge", "Fragment effects are 50% stronger", "+1 ATK and +1 RNG permanently"],
          fragment_interaction: "Fragments are enhanced but stable — reliable support with extra potency",
          unit_synergy: "Fragments support both combat and corruption strategies effectively"
        }
      },
      signature_units: ["Blood Hierophant", "Hunger Priests", "Blight Weavers"],
      strategic_notes: "The Crimson Prophet is the ultimate fragment commander. Build around multiple fragments and fragment-enhancing support units. His Knowledge evolution makes fragments virtually unlimited — overwhelm the enemy with layered, persistent buffs. His Chaos evolution turns fragments into devastating bombs. He is personally weak in melee — keep him safe.",
      tags: ["fragment-specialist", "ritual-focus", "support-commander", "ranged"]
    },
    {
      name: "Warlord Rathka",
      faction: "nightfang-dominion",
      title: "The Siege Breaker",
      flavor_text: "Rathka was a fortress commander before the Blooding. He brought his knowledge of fortifications to the Nightfang, becoming the Dominion's premier siege commander. He knows how to build walls — and more importantly, how to tear them down.",
      theme: "War Machine commander — siege warfare, artillery synergy",
      personality: "Methodical, patient, obsessed with structural weak points. He sees every battlefield as a puzzle to be cracked open.",
      playstyle: "War Machine and artillery focused. Rathka buffs War Machines and siege units while providing strong defensive presence. Pair with Plague Catapults, Blood Engines, and multiple War Machines for maximum siege power.",
      base_stats: {
        Command: 9,
        Knowledge: 8,
        Leadership: 9,
        Agility: 5,
        Health: 130
      },
      battle_stats: {
        ATK: 5,
        DEF: 5,
        HP: 11,
        MOV: 4,
        RNG: 3,
        MOR: 10
      },
      points_cost: 25,
      level_1_deck: {
        command: ["Siege Command", "War Beast Rally"],
        tech: ["Fortified Position", "Siege Protocols"],
        fragment: ["Blight Engine Boost"],
        tactical: ["Crushing Blow"]
      },
      skill_tree: {
        level_2: {
          knowledge: "War Machines within 12\" gain +1 ATK",
          chaos: "Artillery Blast radius increased by 1\"",
          tactical: "+1 DEF permanently"
        },
        level_3: {
          knowledge: "War Machines heal 1 HP at End Phase",
          chaos: "War Machine attacks apply 2 Corruption tokens",
          tactical: "+1 ATK in melee"
        },
        level_4: {
          knowledge: "Artillery gains +2\" range",
          chaos: "When a War Machine destroys a unit, add 3 to Hunger Pool",
          tactical: "Siege bonus: +2 damage to fortifications and buildings"
        },
        level_5: {
          knowledge: "War Machines gain +1 DEF",
          chaos: "Blood Engine can sacrifice from units within 6\" instead of 3\"",
          tactical: "+1 ATK and +1 DEF permanently"
        },
        level_6: {
          knowledge: "Once per turn, a War Machine may attack twice",
          chaos: "War Machines gain Blight Regeneration (heal 1 HP per turn)",
          tactical: "Fortify: create improvised cover at Rathka's position"
        },
        level_7: {
          knowledge: "Artillery can fire without LOS (indirect fire on all)",
          chaos: "War Machine destruction explodes for 4 damage in 3\" instead of normal Blight Eruption",
          tactical: "Counterattack: all units within 6\" of Rathka strike back when attacked"
        },
        level_8: {
          knowledge: "War Machines gain +2 ATK",
          chaos: "War Beast attacks knock targets back 2\"",
          tactical: "+2 DEF when stationary"
        },
        level_9: {
          knowledge: "All artillery gains Sharpshot",
          chaos: "Once per battle, all War Machines gain +4 ATK for 1 turn",
          tactical: "Immovable: Rathka and units within 6\" cannot be pushed, knocked back, or moved by enemy abilities"
        },
        level_10: {
          knowledge: "War Machine Mastery: all War Machines gain +3 ATK, +2 DEF, and attack twice per turn",
          chaos: "Blight Bombardment: once per battle, every artillery and War Machine fires simultaneously at the same target",
          tactical: "Fortress Rathka: Rathka gains DEF 8 and all units within 6\" gain +2 DEF permanently"
        }
      },
      evolution_paths: {
        knowledge: {
          name: "The Machine Lord",
          description: "Rathka maximizes War Machine effectiveness, making them devastating and resilient.",
          abilities: [
            "All War Machines +3 ATK, +2 DEF",
            "War Machines attack twice per turn",
            "Artillery has indirect fire and Sharpshot"
          ],
          fragment_interaction: "Fragments enhance War Machines directly — each activation grants +2 ATK to nearest War Machine",
          unit_synergy: "War Machines become the core damage dealers, nearly unkillable"
        },
        chaos: {
          name: "The Demolisher",
          description: "Rathka turns every War Machine into a walking bomb of concentrated destruction.",
          abilities: [
            "War Machine attacks apply 2 Corruption tokens",
            "Blight Regeneration on all War Machines",
            "Blight Bombardment: simultaneous War Machine alpha strike"
          ],
          fragment_interaction: "Fragments fuel War Machine destructive potential — double damage on fragment activation turn",
          unit_synergy: "War Machines become offensive juggernauts at the cost of supporting infantry"
        },
        hybrid: {
          name: "The Siege Commander",
          description: "A balanced approach that makes War Machines effective while maintaining strong defensive presence.",
          abilities: [
            "War Machines +1 ATK and +1 DEF",
            "War Machines heal 1 HP per turn",
            "+1 ATK and +1 DEF permanently for Rathka"
          ],
          fragment_interaction: "Fragments provide steady enhancement to War Machines and defensive positions",
          unit_synergy: "Both War Machines and infantry benefit from Rathka's command"
        }
      },
      signature_units: ["Blood Engine", "Plague Titan", "Crimson Behemoth", "Plague Catapult Crew"],
      strategic_notes: "Rathka is the War Machine commander. Field 2-3 War Machines plus artillery and let them pound the enemy from range while infantry screens. His Knowledge evolution makes War Machines terrifyingly effective — attacking twice per turn with +3 ATK makes a Plague Titan into a game-ending threat. His weakness is low mobility — he can't reposition quickly.",
      tags: ["siege-commander", "war-machine-focus", "defensive", "artillery"]
    },
    {
      name: "Blood Duchess Lysara",
      faction: "nightfang-dominion",
      title: "The Crimson Aristocrat",
      flavor_text: "Duchess Lysara rules the most civilized corner of the Nightfang Dominion — a territory where the courts still dance, the wine still flows (though it is red in a different sense), and the warriors fight with elegant precision. She favors elite units over hordes, quality over quantity.",
      theme: "Elite-focused commander — buffs small number of expensive units",
      personality: "Elegant, cultured, dangerously charming. She holds court on the battlefield, directing her warriors with the grace of an orchestra conductor.",
      playstyle: "Elite army commander. Lysara excels with a small number of expensive, high-quality units. Her abilities amplify their effectiveness, making each model hit harder and survive longer. Pair with Tiger Fang Elite, Blood Fanged Riders, and Corruption Guard.",
      base_stats: {
        Command: 8,
        Knowledge: 8,
        Leadership: 9,
        Agility: 7,
        Health: 105
      },
      battle_stats: {
        ATK: 5,
        DEF: 4,
        HP: 9,
        MOV: 5,
        RNG: 6,
        MOR: 10
      },
      points_cost: 23,
      level_1_deck: {
        command: ["Noble Command", "Aristocratic Precision"],
        tech: ["Elite Enhancement", "Blood Refinement"],
        fragment: ["Crimson Elegance"],
        tactical: ["Precision Strike"]
      },
      skill_tree: {
        level_2: {
          knowledge: "Units with 4+ points_cost gain +1 ATK",
          chaos: "Challenge kills grant +1 permanent ATK to surviving unit",
          tactical: "+1 DEF to all units within 6\""
        },
        level_3: {
          knowledge: "Elite units (4+ pts) gain +1 MOR",
          chaos: "Blood Drain heals 2 HP on all elite units",
          tactical: "+1 ATK permanently"
        },
        level_4: {
          knowledge: "Units within 8\" of Lysara can reroll 1 missed die per attack",
          chaos: "Units that make 2+ kills in one attack gain +1 permanent ATK",
          tactical: "+1 DEF permanently"
        },
        level_5: {
          knowledge: "+1 CP per turn for each elite unit (4+ pts) within 12\"",
          chaos: "Elite units gain Frenzy (+1 ATK below half HP)",
          tactical: "+1 ATK and +1 DEF permanently"
        },
        level_6: {
          knowledge: "Coordinated Elite: all elite units within 8\" may attack the same target in sequence, each gaining +1 ATK cumulative",
          chaos: "Blood Refinement: elite units gain +1 ATK for each enemy unit they've destroyed this battle (max +3)",
          tactical: "Precision: Lysara's attacks always hit on 3+ regardless of DEF"
        },
        level_7: {
          knowledge: "Elite units gain +1 HP",
          chaos: "When an elite unit is destroyed, one other elite unit gains +2 ATK permanently",
          tactical: "+2 ATK in Challenges"
        },
        level_8: {
          knowledge: "Once per turn, an elite unit may attack twice",
          chaos: "Ultimate Refinement: elite units gain +1 to all stats for each kill this battle (max +2)",
          tactical: "Counterattack: all elite units strike back when attacked in melee"
        },
        level_9: {
          knowledge: "All elite units can use Lysara's MOR instead of their own",
          chaos: "Blood Dueling: any elite unit can issue Challenges to enemy commanders",
          tactical: "+2 ATK and +1 DEF permanently"
        },
        level_10: {
          knowledge: "Noble Court Perfected: all elite units gain +2 to all stats and reroll all missed dice",
          chaos: "Crimson Ascendancy: after each battle (campaign), all surviving elite units gain +1 permanent ATK and +1 HP",
          tactical: "Supreme Precision: all elite unit attacks ignore DEF — every die is a hit"
        }
      },
      evolution_paths: {
        knowledge: {
          name: "The Perfect Court",
          description: "Lysara creates the ultimate elite army — each unit is a masterwork of vampiric warfare.",
          abilities: ["Elite units +2 all stats", "Reroll all missed dice", "Attack twice per turn"],
          fragment_interaction: "Fragments enhance individual elite units — each activation buffs one unit's ATK by +2",
          unit_synergy: "Small number of extremely powerful elite units dominate the field"
        },
        chaos: {
          name: "The Crimson Aristocracy",
          description: "Lysara's elite warriors grow stronger with every kill, becoming unstoppable killing machines.",
          abilities: [
            "Elite units gain +1 all stats per kill (max +2)",
            "Blood Refinement: +1 ATK per destroyed enemy",
            "When an elite dies, another gains +2 ATK"
          ],
          fragment_interaction: "Fragments fuel kill-based snowballing — each activation grants +1 ATK to all elite units that killed this turn",
          unit_synergy: "Elite units that get early kills become exponentially dangerous"
        },
        hybrid: {
          name: "The Elegant War",
          description: "A balance of elite enhancement and personal combat mastery.",
          abilities: [
            "Elite units +1 ATK and +1 DEF",
            "Reroll 1 missed die per attack for elite units",
            "+1 ATK and +1 DEF permanently for Lysara"
          ],
          fragment_interaction: "Fragments provide steady elite enhancement",
          unit_synergy: "Elite units are reliably strong without requiring kills to snowball"
        }
      },
      signature_units: ["Tiger Fang Elite", "Blood Fanged Riders", "Corruption Guard"],
      strategic_notes: "Lysara wants a small, elite army — 15-20 expensive models rather than 40+ cheap ones. Her abilities amplify each model's effectiveness dramatically. Her Knowledge evolution is terrifying: elite units with +2 all stats and rerolling misses are nearly unstoppable. Her weakness is model count — losing even one elite is painful.",
      tags: ["elite-focus", "quality-over-quantity", "precision", "aristocratic"]
    },
    {
      name: "Plague Herald Mortivex",
      faction: "nightfang-dominion",
      title: "The Contagion Bringer",
      flavor_text: "Mortivex was not Blooded by choice — the Blight chose him, erupting from within during a battle and transforming him into something between a Plague Herald and a walking biohazard. He is more Blight than flesh now, and everywhere he walks, corruption blossoms.",
      theme: "Maximum corruption spread — area denial, debuff saturation",
      personality: "Mournful, resigned, speaks in raspy whispers. He didn't choose this path and sometimes regrets it, but he has accepted his role as the Blight's instrument.",
      playstyle: "Area-denial and corruption saturation. Mortivex creates Corruption Zones, applies tokens at extreme range, and makes the battlefield itself hostile to enemies. Pair with Plague Runners, Blight Weavers, and artillery for maximum area control.",
      base_stats: {
        Command: 7,
        Knowledge: 9,
        Leadership: 7,
        Agility: 8,
        Health: 100
      },
      battle_stats: {
        ATK: 4,
        DEF: 3,
        HP: 9,
        MOV: 6,
        RNG: 6,
        MOR: 8
      },
      points_cost: 20,
      level_1_deck: {
        command: ["Plague Wind", "Corruption Bloom"],
        tech: ["Blight Cloud", "Toxin Enhancement"],
        fragment: ["Plague Fragment"],
        tactical: ["Withering Touch"]
      },
      skill_tree: {
        level_2: {
          knowledge: "Corruption Zones created by friendlies are 1\" larger",
          chaos: "Mortivex radiates Corruption Aura 3\" at all times",
          tactical: "+1 ATK against corrupted targets"
        },
        level_3: {
          knowledge: "Corruption Zones also grant +1 ATK to Nightfang units inside",
          chaos: "Enemies that start their turn in Corruption Zones take 1 damage",
          tactical: "+1 MOV permanently"
        },
        level_4: {
          knowledge: "Corruption Spreaders within 12\" apply 2 tokens instead of 1",
          chaos: "Corruption tokens cannot be removed in Corruption Zones",
          tactical: "+1 ATK and +1 RNG permanently"
        },
        level_5: {
          knowledge: "Once per turn, create a 2\" Corruption Zone within 12\" for free",
          chaos: "Corruption Zones deal 2 damage per turn to non-Nightfang",
          tactical: "+1 DEF in Corruption Zones"
        },
        level_6: {
          knowledge: "Corruption Zones are permanent — they don't dissipate",
          chaos: "Blight Storm: once per battle, create a 6\" Corruption Zone centered on Mortivex",
          tactical: "All attacks gain Corruption Spread while in a Corruption Zone"
        },
        level_7: {
          knowledge: "Friendly units in Corruption Zones gain +1 DEF and +1 ATK",
          chaos: "Corruption Zones expand by 1\" at the start of each friendly turn",
          tactical: "+2 ATK against targets in Corruption Zones"
        },
        level_8: {
          knowledge: "All Corruption Zones heal Nightfang units for 1 HP per turn",
          chaos: "Enemies in Corruption Zones have -2 MOV",
          tactical: "Mortivex can teleport between Corruption Zones once per turn"
        },
        level_9: {
          knowledge: "Corruption Zones grant Nightfang units Stealth",
          chaos: "Massive Corruption Zones: all zones expand to 6\" radius",
          tactical: "+2 ATK and +1 MOV permanently"
        },
        level_10: {
          knowledge: "Living Plague: the entire battlefield becomes a Corruption Zone — all non-Nightfang units permanently suffer Corruption Zone effects",
          chaos: "Pandemic Storm: at End Phase, every Corruption Zone dealing damage now deals 3 damage and applies 3 Corruption tokens",
          tactical: "Plague Mastery: Mortivex can attack all enemies within all Corruption Zones simultaneously once per battle"
        }
      },
      evolution_paths: {
        knowledge: {
          name: "The Living Landscape",
          description: "Mortivex turns the entire battlefield into a Blight-land, making it permanently hostile to non-Nightfang forces.",
          abilities: [
            "Permanent Corruption Zones",
            "Entire battlefield becomes Corruption Zone",
            "Nightfang units gain bonuses in zones"
          ],
          fragment_interaction: "Fragments create additional Corruption Zones on activation",
          unit_synergy: "All Nightfang units benefit from the corrupted battlefield"
        },
        chaos: {
          name: "The Walking Plague",
          description: "Mortivex becomes an engine of destruction, with expanding, damage-dealing Corruption Zones that consume everything.",
          abilities: [
            "Corruption Zones expand each turn",
            "Zones deal 3 damage per turn",
            "Blight Storm: massive initial zone"
          ],
          fragment_interaction: "Fragments supercharge corruption damage within zones",
          unit_synergy: "Enemies are ground down by environmental damage while Nightfang units are immune"
        },
        hybrid: {
          name: "The Toxic Commander",
          description: "Balanced corruption control with personal combat effectiveness.",
          abilities: [
            "Create free Corruption Zones",
            "Zones grant +1 ATK/DEF to Nightfang",
            "+1 ATK and +1 RNG permanently"
          ],
          fragment_interaction: "Fragments enhance zones moderately and boost combat stats",
          unit_synergy: "All units benefit from zone bonuses while Mortivex holds his own in combat"
        }
      },
      signature_units: ["Blight Weavers", "Plague Runners", "Corruption Spreaders"],
      strategic_notes: "Mortivex controls the battlefield through Corruption Zones. His Knowledge evolution eventually makes the ENTIRE board a Corruption Zone — devastating for armies that can't handle environmental damage. His weakness is personal combat — he relies on zones and support units rather than direct fighting.",
      tags: ["area-denial", "corruption-zone", "terrain-control", "debuffer"]
    },
    {
      name: "Fang General Zharak",
      faction: "nightfang-dominion",
      title: "The Iron Fang",
      flavor_text: "Zharak is the most conventionally military commander in the Nightfang Dominion. A former army general who was Blooded during the Siege of Iron Gate, he combines mortal tactical doctrine with vampiric ferocity. His armies fight with discipline that surprises those who expect mindless savagery.",
      theme: "Balanced tactical commander — conventional warfare with corruption edge",
      personality: "Disciplined, pragmatic, respects competent enemies. He is the Nightfang commander most likely to offer terms — and most likely to honor them.",
      playstyle: "Balanced all-rounder. Zharak excels at conventional combined-arms tactics: infantry holds, cavalry flanks, artillery supports. His corruption mechanics enhance rather than replace standard warfare. Good starter commander for players learning the faction.",
      base_stats: {
        Command: 8,
        Knowledge: 7,
        Leadership: 9,
        Agility: 6,
        Health: 115
      },
      battle_stats: {
        ATK: 5,
        DEF: 4,
        HP: 10,
        MOV: 5,
        RNG: 3,
        MOR: 9
      },
      points_cost: 23,
      level_1_deck: {
        command: ["Tactical Advance", "Combined Arms"],
        tech: ["Battle Formation", "Iron Discipline"],
        fragment: ["Tactical Corruption"],
        tactical: ["Precision Strike"]
      },
      skill_tree: {
        level_2: {
          knowledge: "+1 ATK to infantry within 8\"",
          chaos: "Corruption Spread range +1\" for all units",
          tactical: "+1 DEF to all units within 6\""
        },
        level_3: {
          knowledge: "Cavalry charge bonus increased to +2 ATK",
          chaos: "All melee attacks apply 1 extra Corruption token",
          tactical: "+1 ATK permanently"
        },
        level_4: {
          knowledge: "Infantry gain +1 DEF when in formation (3+ units within 3\")",
          chaos: "Blood Tithe costs 0 HP once per turn",
          tactical: "+1 ATK and +1 DEF when within 6\" of 3+ friendly units"
        },
        level_5: {
          knowledge: "+1 CP per turn",
          chaos: "Hunger Pool thresholds reduced by 2",
          tactical: "+1 MOV to all units within 12\""
        },
        level_6: {
          knowledge: "Combined Arms: when infantry, cavalry, and artillery all attack same target, all gain +2 ATK",
          chaos: "Corruption-forged weapons: all friendly units gain +1 damage against corrupted targets",
          tactical: "Hold the Line: all units within 6\" gain +2 DEF on the turn they don't move"
        },
        level_7: {
          knowledge: "Once per turn, issue a free command to move one unit 4\"",
          chaos: "Blood Frenzy: +1 ATK to all units when Hunger Pool is 10+",
          tactical: "Counterattack: all units within 6\" strike back when attacked"
        },
        level_8: {
          knowledge: "All units gain +1 MOR",
          chaos: "Zharak gains +1 ATK for each enemy commander wounded",
          tactical: "+2 DEF when defending an objective"
        },
        level_9: {
          knowledge: "Draw 2 extra cards per turn",
          chaos: "Once per battle, all units gain +2 ATK for 1 turn",
          tactical: "+2 ATK and +1 DEF permanently"
        },
        level_10: {
          knowledge: "Grand Tactics: at the start of each turn, choose one: all units +1 ATK, or +1 DEF, or +2 MOV for that turn",
          chaos: "Iron Fang Unleashed: all units gain Corruption Spread, Blood Drain, and +1 ATK permanently",
          tactical: "Tactical Supremacy: Zharak and all units within 12\" gain +2 ATK, +2 DEF for the rest of the battle"
        }
      },
      evolution_paths: {
        knowledge: {
          name: "The Master Tactician",
          description: "Zharak applies conventional military genius with vampiric enhancement, creating a disciplined and flexible fighting force.",
          abilities: [
            "Combined Arms bonus: infantry/cavalry/artillery +2 ATK",
            "Grand Tactics: choose faction-wide buff each turn",
            "+1 CP per turn"
          ],
          fragment_interaction: "Fragments provide tactical flexibility — each activation lets Zharak reposition one unit",
          unit_synergy: "All unit types benefit from balanced, tactical play"
        },
        chaos: {
          name: "The Corrupted General",
          description: "Zharak embraces the Blight fully, turning his disciplined army into a corruption-enhanced war machine.",
          abilities: ["All units gain Corruption Spread", "Blood Drain on all units", "+1 ATK permanently to all units"],
          fragment_interaction: "Fragments amplify corruption — each activation applies 1 token to all enemies within 6\"",
          unit_synergy: "Every unit becomes a corruption vector while maintaining combat discipline"
        },
        hybrid: {
          name: "The Balanced Commander",
          description: "A well-rounded approach that combines tactical acumen with corruption enhancement.",
          abilities: ["Infantry +1 DEF in formation", "Cavalry +2 Charge bonus", "+1 ATK and +1 DEF permanently"],
          fragment_interaction: "Fragments provide moderate enhancement across all areas",
          unit_synergy: "All unit types perform above baseline with solid tactical support"
        }
      },
      signature_units: ["Nightfang Warriors", "Tiger Chargers", "Plague Catapult Crew"],
      strategic_notes: "Zharak is the Nightfang starter commander. He's good at everything but master of nothing. His balanced approach lets you learn the faction's mechanics while fielding a conventional army. His Grand Tactics ability (Knowledge evolution) gives incredible turn-by-turn flexibility.",
      tags: ["balanced", "tactical", "combined-arms", "starter-friendly"]
    },
    {
      name: "The Hollow King",
      faction: "nightfang-dominion",
      title: "The Undying Bastion",
      flavor_text: "The Hollow King is a mystery even among the Nightfang. No one knows his mortal name or how he was Blooded. He appeared from the deep Blight-Lands centuries ago, a towering figure in ancient bone armor that seems to be part of his body. He does not speak. He does not eat. He simply endures — and everything around him dies.",
      theme: "Tank commander — extreme durability, defensive warfare",
      personality: "Silent, immovable, ancient. He communicates through gestures and the Blight-link. Some suspect he IS the Blight given physical form.",
      playstyle: "Defensive anchor. The Hollow King is virtually unkillable and makes nearby units equally durable. Build a brick-wall army with Plague Knights, Bloodsworn Templars, and Corruption Guard. Dare the enemy to attack you and grind them down.",
      base_stats: {
        Command: 7,
        Knowledge: 6,
        Leadership: 10,
        Agility: 3,
        Health: 150
      },
      battle_stats: {
        ATK: 4,
        DEF: 6,
        HP: 13,
        MOV: 3,
        RNG: 1,
        MOR: 10
      },
      points_cost: 26,
      level_1_deck: {
        command: ["Fortify", "Immovable Wall"],
        tech: ["Bone Armor Reinforcement", "Blight Shield"],
        fragment: ["Endurance Fragment"],
        tactical: ["Crushing Counter"]
      },
      skill_tree: {
        level_2: {
          knowledge: "All units within 6\" gain +1 DEF",
          chaos: "When attacked, attacker gains 1 Corruption token",
          tactical: "Counterattack: always strike back in melee"
        },
        level_3: {
          knowledge: "Units within 6\" gain +1 HP",
          chaos: "Corruption Aura 3\"",
          tactical: "+1 ATK permanently"
        },
        level_4: {
          knowledge: "Damage to Hollow King reduced by 1 (minimum 1)",
          chaos: "Reflects 1 damage to melee attackers",
          tactical: "+1 DEF permanently"
        },
        level_5: {
          knowledge: "All defensive units (DEF 4+) gain +1 MOR within 12\"",
          chaos: "When Hollow King takes damage, all enemies within 3\" take 1 damage",
          tactical: "+1 ATK and +1 DEF permanently"
        },
        level_6: {
          knowledge: "Fortress Aura: all units within 8\" cannot be pushed, moved, or displaced by enemy abilities",
          chaos: "Blight Armor: the first 3 damage per turn against Hollow King is negated",
          tactical: "Heavy Counter: counterattacks deal +2 damage"
        },
        level_7: {
          knowledge: "Units within 6\" heal 1 HP at End Phase",
          chaos: "When Hollow King would be reduced to 0 HP, instead heal to half HP (once per battle)",
          tactical: "All units within 6\" gain Counterattack"
        },
        level_8: {
          knowledge: "All units within 8\" gain +2 DEF when stationary",
          chaos: "Hollow King's attacks inflict -1 ATK on target for rest of battle",
          tactical: "+2 ATK and +1 DEF permanently"
        },
        level_9: {
          knowledge: "Once per battle, all friendly units within 12\" become immune to damage for 1 turn",
          chaos: "Blight Regeneration: heal 2 HP per turn permanently",
          tactical: "Immovable Object: Hollow King can never be reduced below 1 HP by a single attack"
        },
        level_10: {
          knowledge: "Eternal Bastion: Hollow King gains DEF 8, all units within 12\" gain +3 DEF, and he heals 3 HP per turn",
          chaos: "Undying: when reduced to 0 HP, Hollow King rises again with full HP at end of next turn (once per battle). All enemies within 6\" take 4 damage on resurrection.",
          tactical: "The Wall: no enemy unit can move past Hollow King — he blocks all movement within 2\". All units within 6\" gain +2 ATK and +2 DEF."
        }
      },
      evolution_paths: {
        knowledge: {
          name: "The Eternal Fortress",
          description: "The Hollow King becomes a nearly immovable defensive anchor that makes his entire army virtually unkillable.",
          abilities: ["DEF 8 personally", "All units +3 DEF within 12\"", "Heal 3 HP per turn"],
          fragment_interaction: "Fragments create defensive zones — each activation grants +2 DEF to all nearby units for 1 turn",
          unit_synergy: "Every unit becomes extremely durable — nearly impossible to dislodge"
        },
        chaos: {
          name: "The Undying Horror",
          description: "The Hollow King becomes truly unkillable — rising from death, reflecting damage, and regenerating constantly.",
          abilities: [
            "Revive with full HP once per battle",
            "Blight Armor: negate first 3 damage per turn",
            "Heal 2 HP per turn"
          ],
          fragment_interaction: "Fragments enhance regeneration — each activation heals all nearby units for 2 HP",
          unit_synergy: "The Hollow King himself becomes the centerpiece — nearly impossible to kill"
        },
        hybrid: {
          name: "The Silent Wall",
          description: "Balanced durability for both the King and his army.",
          abilities: [
            "All units +1 DEF and +1 HP within 6\"",
            "Counterattack in melee",
            "+1 ATK and +1 DEF permanently"
          ],
          fragment_interaction: "Fragments provide steady defensive enhancement",
          unit_synergy: "All units benefit from moderate but reliable durability buffs"
        }
      },
      signature_units: ["Bloodsworn Templars", "Plague Knights", "Corruption Guard"],
      strategic_notes: "The Hollow King is the ultimate defensive commander. Park him on an objective with defensive infantry and dare the enemy to move you. His Knowledge evolution (DEF 8 + 3 HP/turn) makes him virtually unkillable. His weakness is atrocious mobility — he can't chase anything and smart opponents will just avoid him.",
      tags: ["tank", "defensive", "unkillable", "objective-holder"]
    },
    {
      name: "Nightclaw Vex",
      faction: "nightfang-dominion",
      title: "The Feral Alpha",
      flavor_text: "Vex was never fully human even before the Blooding — raised by corrupted great cats in the deep Crimson Maw, she is more beast than noble. She fights with raw, primal fury, shifting between human and tiger forms mid-combat, leading packs of war beasts with instinctual coordination.",
      theme: "Shapeshifter commander — form-switching, beast pack leader, high mobility",
      personality: "Wild, instinctual, loyal to her pack above all. Speaks in short, clipped sentences. Purrs when content, growls when angry.",
      playstyle: "High-mobility shapeshifter. Vex can switch between human form (ranged, support) and tiger form (melee, devastating). She leads beast and cavalry units with Pack Tactics synergy. Extremely fast and aggressive but fragile if caught in the wrong form.",
      base_stats: {
        Command: 6,
        Knowledge: 6,
        Leadership: 8,
        Agility: 10,
        Health: 110
      },
      battle_stats: {
        ATK: 7,
        DEF: 3,
        HP: 10,
        MOV: 8,
        RNG: 1,
        MOR: 9
      },
      points_cost: 25,
      level_1_deck: {
        command: ["Pack Rally", "Feral Roar"],
        tech: ["Shapeshift Mastery", "Predator Instincts"],
        fragment: ["Feral Fragment"],
        tactical: ["Savage Pounce"]
      },
      skill_tree: {
        level_2: {
          knowledge: "Human Form gains RNG 6\" and +1 ATK at range",
          chaos: "Tiger Form gains +1 ATK",
          tactical: "+1 MOV permanently"
        },
        level_3: {
          knowledge: "Beast units within 8\" gain +1 MOV",
          chaos: "Shapeshift is a free action instead of start-of-turn",
          tactical: "+1 DEF in tiger form"
        },
        level_4: {
          knowledge: "Pack Tactics applies to cavalry within 8\" as well",
          chaos: "Tiger Form gains Terrifying",
          tactical: "+1 ATK permanently"
        },
        level_5: {
          knowledge: "All beast/cavalry units gain +1 ATK within 12\"",
          chaos: "When shifting to tiger form, deal 1 damage to all enemies within 2\"",
          tactical: "+1 ATK and +1 MOV permanently"
        },
        level_6: {
          knowledge: "Alpha Call: once per turn, one beast unit within 12\" makes a free move",
          chaos: "Tiger Form: ATK becomes 9, MOV becomes 10",
          tactical: "Shapeshift gains: Human Form DEF 5, Tiger Form ATK +2"
        },
        level_7: {
          knowledge: "Beast units can use Vex's MOR instead of their own",
          chaos: "Tiger Form gains Blood Drain healing 2 HP",
          tactical: "Charge in tiger form grants +2 ATK instead of +1"
        },
        level_8: {
          knowledge: "All beast/cavalry units gain Pack Tactics",
          chaos: "Tiger Form gains Blight Regeneration (heal 1 HP/turn)",
          tactical: "Counterattack in both forms"
        },
        level_9: {
          knowledge: "Once per battle, all beast/cavalry units make a free charge move",
          chaos: "Tiger Form gains Corruption Aura 3\" and Fearless",
          tactical: "+2 ATK and +2 MOV in tiger form"
        },
        level_10: {
          knowledge: "Supreme Shapeshift: maintain bonuses from BOTH forms simultaneously — RNG 6\", ATK 9, MOV 10, all beast buffs active",
          chaos: "Apex Predator Form: permanently become a massive tiger — ATK 10, DEF 5, HP 14, MOV 12, Corruption Aura 4\", Terrifying, Fearless, Blood Drain",
          tactical: "The Perfect Predator: Vex can shift forms after every action, gaining +2 to primary stat of each form (ATK in tiger, DEF in human)"
        }
      },
      evolution_paths: {
        knowledge: {
          name: "The Pack Mother",
          description: "Vex becomes the supreme beast coordinator, leading every war beast and cavalry unit with instinctual perfection.",
          abilities: [
            "Both form bonuses simultaneously",
            "All beasts/cavalry +1 ATK",
            "Free charge move once per battle"
          ],
          fragment_interaction: "Fragments enhance all beast units simultaneously — each activation grants +1 ATK to all beasts",
          unit_synergy: "Beast and cavalry units are significantly more dangerous under Vex's leadership"
        },
        chaos: {
          name: "The Apex Beast",
          description: "Vex fully surrenders to the tiger within, becoming the most powerful individual combatant — a permanent massive tiger form.",
          abilities: [
            "Permanent tiger form: ATK 10, DEF 5, HP 14, MOV 12",
            "Corruption Aura 4\"",
            "Blood Drain, Terrifying, Fearless"
          ],
          fragment_interaction: "Fragments fuel personal power — each activation heals 2 HP and grants +1 ATK",
          unit_synergy: "Vex becomes the army's primary weapon — other units support her"
        },
        hybrid: {
          name: "The Adaptive Hunter",
          description: "Vex masters form-switching, gaining combat bonuses in both forms while buffing nearby beasts.",
          abilities: [
            "Free-action shapeshift with +2 to both forms",
            "Beast/cavalry +1 ATK within 12\"",
            "+1 ATK and +1 MOV permanently"
          ],
          fragment_interaction: "Fragments provide balanced enhancement to Vex and nearby beasts",
          unit_synergy: "Flexible commander who adapts to any battlefield situation"
        }
      },
      signature_units: ["Tiger Alpha", "Tiger Chargers", "Shadow Pounce Cavalry", "Elder Tiger Horror"],
      strategic_notes: "Vex is the mobility commander. Her shapeshift ability makes her incredibly versatile — human form for ranged/defensive phases, tiger form for aggressive charges. She pairs brilliantly with fast cavalry and beast units. Her Chaos evolution (permanent ATK 10, MOV 12 tiger) is one of the most individually powerful commanders in the game.",
      tags: ["shapeshifter", "beast-commander", "mobility", "aggressive"]
    },
  ],
  units: [
    // ===================== IRON DOMINION UNITS =====================
    // Stats: ATK (dice), DEF (target#), HP, MOV (inches), RNG (inches, 1=melee), MOR (2d6 threshold)
    {
      name: "Infantry Regiment",
      faction: "iron-dominion",
      points_cost: 1,
      role: "Core combat",
      fragment_interactions: "Minor fragment buffs optional",
      flavor_text: "Standard human troops; disciplined formation",
      type: "Infantry",
      stats: { ATK: 2, DEF: 3, HP: 1, MOV: 5, RNG: 1, MOR: 6 },
      special: ["Grid Node"],
    },
    {
      name: "Clockwork Infantry",
      faction: "iron-dominion",
      points_cost: 2,
      role: "Durable core",
      fragment_interactions: "Fragment boosts attack slightly",
      flavor_text: "Soldiers with mechanized limbs; immune to morale effects",
      type: "Infantry",
      stats: { ATK: 2, DEF: 4, HP: 2, MOV: 5, RNG: 1, MOR: 10 },
      special: ["Grid Node", "Fearless (auto-pass Morale)"],
    },
    {
      name: "Aether Infused Soldiers",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Mid-tier",
      fragment_interactions:
        "Fragment implants enhance speed/attack; risk of instability",
      flavor_text: "Humans with glowing fragment augmentations",
      type: "Infantry",
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 6, RNG: 1, MOR: 7 },
      special: [
        "Grid Node",
        "Fragment Infused (+1 ATK when Fragment Charge spent)",
      ],
    },
    {
      name: "Gearwright Engineers",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Support",
      fragment_interactions: "Repair war machines; fragment manipulation",
      flavor_text: "Can build temporary traps or structures",
      type: "Support",
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        "Grid Node",
        "Repair (restore 1 HP to adjacent friendly unit, End Phase)",
        'Construct Barricade (place Light Cover within 2")',
      ],
    },
    {
      name: "Elite Vanguard",
      faction: "iron-dominion",
      points_cost: 4,
      role: "Heavy hitter",
      fragment_interactions: "Fragment boosts tactical strike",
      flavor_text: "Small elite unit with high damage output",
      type: "Infantry",
      stats: { ATK: 4, DEF: 4, HP: 2, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        "Grid Node",
        "Precision Strike (reroll 1 missed die per attack)",
      ],
    },
    {
      name: "Scouts / Recon",
      faction: "iron-dominion",
      points_cost: 1,
      role: "Fast",
      fragment_interactions: "Trigger fragment events; weak in combat",
      flavor_text: "Quick, mobile units for exploration",
      type: "Scout",
      stats: { ATK: 1, DEF: 3, HP: 1, MOV: 8, RNG: 8, MOR: 5 },
      special: [
        'Scout (deploy up to 6" ahead of deployment zone)',
        "Spotter (+1 ATK die to friendly Artillery targeting spotted unit)",
      ],
    },
    {
      name: "Steam Artillery Crew",
      faction: "iron-dominion",
      points_cost: 5,
      role: "Ranged support",
      fragment_interactions: "Fragment increases AoE damage",
      flavor_text: "Operates long-range cannons powered by fragments",
      type: "Artillery",
      stats: { ATK: 4, DEF: 3, HP: 2, MOV: 3, RNG: 24, MOR: 7 },
      special: [
        "Grid Node",
        'Blast (hits target + all units within 1")',
        "Immobile (cannot move and shoot same turn)",
      ],
    },
    {
      name: "Siege Infantry",
      faction: "iron-dominion",
      points_cost: 4,
      role: "Breach",
      fragment_interactions: "Fragment may cause small area tremors",
      flavor_text: "Break walls and fortifications",
      type: "Infantry",
      stats: { ATK: 3, DEF: 4, HP: 3, MOV: 4, RNG: 1, MOR: 8 },
      special: [
        "Grid Node",
        "Siege (double damage vs terrain and fortifications)",
        "Heavy (+1 ATK vs DEF 5+)",
      ],
    },
    {
      name: "Mechanized Infantry",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Hybrid",
      fragment_interactions: "Minor fragment buff",
      flavor_text:
        "Human + small mechanical suit; balanced durability & attack",
      type: "Infantry",
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: ["Grid Node"],
    },
    {
      name: "Specialist Hero",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Tier 2",
      fragment_interactions: "Fragment ability tied to commander",
      flavor_text: "Elite unit triggering tactical zoom-ins",
      type: "Specialist",
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 6, RNG: 1, MOR: 8 },
      special: [
        'Commander Bond (+1 ATK when within 6" of your Commander)',
        "Duelist (may issue Challenge — 1v1 combat vs enemy Specialist/Commander)",
      ],
    },
    {
      name: "Experimental Construct",
      faction: "iron-dominion",
      points_cost: 4,
      role: "Risk/Reward",
      fragment_interactions: "May warp battlefield",
      flavor_text: "Unstable fragment-driven mechanical constructs",
      type: "Infantry",
      stats: { ATK: 4, DEF: 3, HP: 3, MOV: 5, RNG: 1, MOR: 10 },
      special: [
        "Fearless",
        'Unstable (at start of each turn, roll 1d6: on a 1, deal 1 damage to this unit and all within 2")',
      ],
    },
    {
      name: "Steam-Powered Sharpshooters",
      faction: "iron-dominion",
      points_cost: 2,
      role: "Precision",
      fragment_interactions: "Fragment can increase critical chance",
      flavor_text: "Long-range rifles, overclockable with fragment energy",
      type: "Infantry",
      stats: { ATK: 2, DEF: 3, HP: 1, MOV: 5, RNG: 18, MOR: 6 },
      special: ["Grid Node", "Sharpshot (crits on 5+ instead of 6)"],
    },
    {
      name: "Clockwork Pioneers",
      faction: "iron-dominion",
      points_cost: 2,
      role: "Utility",
      fragment_interactions: "Fragment boosts construction speed",
      flavor_text: "Build barricades, traps, and battlefield improvements",
      type: "Support",
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        "Grid Node",
        'Construct Barricade (place Light Cover within 2")',
        'Trap Layer (place trap token within 3": enemy stepping on it takes 1 damage)',
      ],
    },
    {
      name: "Aether Hackers",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Tech / Specialist",
      fragment_interactions: "Can manipulate enemy mechanical units",
      flavor_text: "Fragment boosts hacking success",
      type: "Specialist",
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 12, MOR: 7 },
      special: [
        'Hack (target enemy War Machine within 12": roll d6, on 4+ target cannot act next turn)',
        "Grid Node",
      ],
    },
    {
      name: "Steam Miners",
      faction: "iron-dominion",
      points_cost: 1,
      role: "Resource / Support",
      fragment_interactions: "Fragment absorption improves efficiency",
      flavor_text: "Extract battlefield materials; support units",
      type: "Support",
      stats: { ATK: 1, DEF: 3, HP: 1, MOV: 4, RNG: 1, MOR: 5 },
      special: [
        "Grid Node",
        "Salvage (generate 1 extra Fragment Charge if adjacent to destroyed unit)",
      ],
    },
    {
      name: "Arcane Tinkerers",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Fragment Specialists",
      fragment_interactions:
        "Amplify fragment effects nearby; risk of instability",
      flavor_text: "Engineers who harness fragments creatively",
      type: "Specialist",
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        'Fragment Amplifier (friendly units within 3" gain +1 to fragment activation rolls)',
        'Unstable Aura (if fragment backfires within 3", this unit takes 1 extra damage)',
      ],
    },
    {
      name: "Steam Grenadiers",
      faction: "iron-dominion",
      points_cost: 3,
      role: "AoE",
      fragment_interactions: "Fragment increases explosion radius",
      flavor_text: "Throw explosive steam grenades",
      type: "Infantry",
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 5, RNG: 8, MOR: 7 },
      special: ["Grid Node", 'Blast (hits target + all units within 1")'],
    },
    {
      name: "Clockwork Cavalry",
      faction: "iron-dominion",
      points_cost: 4,
      role: "Fast assault",
      fragment_interactions:
        "Fragment grants temporary speed boost; risk misfire",
      flavor_text: "Mounted mechanical units",
      type: "Cavalry",
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 9, RNG: 1, MOR: 7 },
      special: [
        "Grid Node",
        'Charge (+1 ATK die when charging 4"+)',
        "Spark Lance (on charge, crits on 5+)",
      ],
    },
    {
      name: "Aether Marksmen",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Long-range",
      fragment_interactions: "Fragment targeting enhancements",
      flavor_text: "Precision rifle units",
      type: "Infantry",
      stats: { ATK: 3, DEF: 3, HP: 1, MOV: 5, RNG: 18, MOR: 7 },
      special: ["Grid Node", "Sharpshot (crits on 5+)"],
    },
    {
      name: "Steam Medic Corps",
      faction: "iron-dominion",
      points_cost: 2,
      role: "Support",
      fragment_interactions: "Fragment stabilizes units during healing",
      flavor_text: "Heal or repair units and constructs",
      type: "Support",
      stats: { ATK: 1, DEF: 3, HP: 1, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        "Grid Node",
        "Heal (restore 1 HP to adjacent friendly unit, once per turn)",
        "Non-combatant (cannot attack)",
      ],
    },
    {
      name: "Gear-Linked Infantry",
      faction: "iron-dominion",
      points_cost: 2,
      role: "Synergy",
      fragment_interactions: "Fragment increases coordination",
      flavor_text: "Units linked via mechanical network",
      type: "Infantry",
      stats: { ATK: 2, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        "Grid Node",
        'Network (+1 ATK die when 2+ Gear-Linked Infantry within 3" of each other)',
      ],
    },
    {
      name: "Mechanical Sappers",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Sabotage",
      fragment_interactions: "Fragment may trigger unexpected explosions",
      flavor_text: "Plant traps or explosives on battlefield",
      type: "Support",
      stats: { ATK: 2, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        "Grid Node",
        'Plant Charge (place explosive token within 1": detonates for 2 damage to all within 2" when triggered by enemy movement or commander card)',
      ],
    },
    {
      name: "Overclocked Engineers",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Specialist",
      fragment_interactions: "Fragment overload increases repair speed",
      flavor_text: "Rapid repair at risk of accidental hazards",
      type: "Support",
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        "Grid Node",
        "Rapid Repair (restore 2 HP instead of 1 to adjacent War Machine, but roll d6: on 1, deal 1 damage to self)",
      ],
    },
    {
      name: "Clockwork Grenadiers",
      faction: "iron-dominion",
      points_cost: 3,
      role: "AoE",
      fragment_interactions: "Fragment may expand blast radius",
      flavor_text: "Explosive devices powered by fragments",
      type: "Infantry",
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 5, RNG: 10, MOR: 7 },
      special: ["Grid Node", 'Blast (hits target + all units within 1")'],
    },
    {
      name: "Steam Recon Flyers",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Scout",
      fragment_interactions: "Fragment may temporarily warp battlefield vision",
      flavor_text: "Mechanical flying units",
      type: "Scout",
      stats: { ATK: 2, DEF: 3, HP: 2, MOV: 10, RNG: 8, MOR: 7 },
      special: [
        "Fly (ignore terrain during movement)",
        "Spotter (+1 ATK die to friendly Artillery targeting spotted unit)",
      ],
    },
    {
      name: "Aether Infiltrators",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Stealth",
      fragment_interactions: "Fragment may backfire",
      flavor_text: "Disable enemy units or traps",
      type: "Specialist",
      stats: { ATK: 2, DEF: 3, HP: 2, MOV: 7, RNG: 1, MOR: 7 },
      special: [
        'Stealth (cannot be targeted by ranged attacks until this unit attacks or moves within 6" of an enemy)',
        "Sabotage (instead of attacking, disable 1 enemy trap or reduce enemy War Machine ATK by 1 for 1 turn)",
      ],
    },
    {
      name: "Gearstorm Infantry",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Shock troops",
      fragment_interactions: "Fragment boosts attack, risk of self-damage",
      flavor_text: "Aggressive assault units",
      type: "Infantry",
      stats: { ATK: 4, DEF: 3, HP: 2, MOV: 6, RNG: 1, MOR: 7 },
      special: [
        "Grid Node",
        "Reckless (+1 ATK die but -1 DEF on the turn this unit charges)",
      ],
    },
    {
      name: "Steam Heavy Guards",
      faction: "iron-dominion",
      points_cost: 4,
      role: "Defensive",
      fragment_interactions: "Fragment adds temporary armor",
      flavor_text: "Protect elite units or commanders",
      type: "Infantry",
      stats: { ATK: 2, DEF: 5, HP: 3, MOV: 4, RNG: 1, MOR: 8 },
      special: [
        "Grid Node",
        "Bodyguard (if adjacent friendly Commander or Specialist is attacked, may redirect the attack to this unit instead)",
      ],
    },
    {
      name: "Fragment Swarm Units",
      faction: "iron-dominion",
      points_cost: 4,
      role: "Experimental",
      fragment_interactions: "Mini clockwork swarm; high risk/reward",
      flavor_text: "Fragment-controlled swarms",
      type: "Infantry",
      stats: { ATK: 5, DEF: 2, HP: 2, MOV: 6, RNG: 3, MOR: 10 },
      special: [
        "Fearless",
        "Swarm (cannot be targeted by Blast; takes 1 damage from any source instead of normal damage)",
        "Unstable",
      ],
    },
    {
      name: "Aether Blasters",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Ranged",
      fragment_interactions: "Fragment-powered cannon",
      flavor_text: "Portable fragment cannons; unstable but powerful",
      type: "Artillery",
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 4, RNG: 16, MOR: 7 },
      special: [
        "Grid Node",
        "Overcharge (spend 1 Fragment Charge: +2 ATK dice this attack, but on any roll of 1, deal 1 damage to self)",
      ],
    },
    {
      name: "Clockwork Engineers",
      faction: "iron-dominion",
      points_cost: 2,
      role: "Utility",
      fragment_interactions: "Minor fragment interactions",
      flavor_text: "Repair and fortify units",
      type: "Support",
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        "Grid Node",
        "Repair (restore 1 HP to adjacent friendly unit, End Phase)",
      ],
    },
    {
      name: "Steam Sentinels",
      faction: "iron-dominion",
      points_cost: 4,
      role: "Heavy defense",
      fragment_interactions: "Fragment grants temporary AoE shield",
      flavor_text: "Slow, but area control",
      type: "Infantry",
      stats: { ATK: 2, DEF: 5, HP: 3, MOV: 3, RNG: 1, MOR: 8 },
      special: [
        "Grid Node",
        'Shield Wall (friendly units within 2" gain +1 DEF vs ranged attacks)',
        "Immovable (cannot be pushed or displaced by enemy abilities)",
      ],
    },
    {
      name: "Arcane Steam Marksmen",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Snipers",
      fragment_interactions: "Fragment may add critical bonus",
      flavor_text: "Precision long-range attacks",
      type: "Infantry",
      stats: { ATK: 2, DEF: 3, HP: 1, MOV: 5, RNG: 20, MOR: 7 },
      special: [
        "Grid Node",
        "Sharpshot (crits on 5+)",
        "Sniper (may target enemy Commanders and Specialists even if other units are closer)",
      ],
    },
    {
      name: "Mechanized Scouts",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Fast / Utility",
      fragment_interactions: "Fragment boosts mobility",
      flavor_text: "Traverse difficult terrain quickly",
      type: "Scout",
      stats: { ATK: 2, DEF: 3, HP: 2, MOV: 8, RNG: 8, MOR: 7 },
      special: [
        'Scout (deploy 6" ahead)',
        "All-Terrain (ignore difficult terrain penalties)",
      ],
    },
    {
      name: "Gearwright Artillery",
      faction: "iron-dominion",
      points_cost: 5,
      role: "Ranged support",
      fragment_interactions: "Fragment amplifies shots",
      flavor_text: "Heavy cannons powered by fragments",
      type: "Artillery",
      stats: { ATK: 5, DEF: 3, HP: 3, MOV: 3, RNG: 24, MOR: 7 },
      special: [
        "Grid Node",
        'Blast (hits target + all within 1")',
        "Immobile (cannot move and shoot same turn)",
        "Heavy Ordinance (ignore Light Cover)",
      ],
    },
    {
      name: "Steam Shock Infantry",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Assault",
      fragment_interactions: "Fragment energy increases melee damage",
      flavor_text: "Aggressive assault units",
      type: "Infantry",
      stats: { ATK: 4, DEF: 3, HP: 2, MOV: 6, RNG: 1, MOR: 7 },
      special: ["Grid Node", 'Charge (+1 ATK die when charging 4"+)'],
    },
    {
      name: "Clockwork Vanguard",
      faction: "iron-dominion",
      points_cost: 4,
      role: "Frontline",
      fragment_interactions: "Fragment boosts nearby morale",
      flavor_text: "Durable, disciplined frontline unit",
      type: "Infantry",
      stats: { ATK: 3, DEF: 4, HP: 3, MOV: 5, RNG: 1, MOR: 9 },
      special: ["Grid Node", 'Inspiring (+1 MOR to friendly units within 3")'],
    },
    {
      name: "Aether Engineers",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Tech",
      fragment_interactions: "Fragment can trigger traps",
      flavor_text: "Manipulate battlefield hazards",
      type: "Support",
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        "Grid Node",
        'Trap Layer (place trap token within 3": 1 damage on trigger)',
        'Remote Detonate (trigger any friendly explosive/trap within 12")',
      ],
    },
    {
      name: "Steam Reclaimers",
      faction: "iron-dominion",
      points_cost: 2,
      role: "Support",
      fragment_interactions: "Fragment improves salvage rate",
      flavor_text: "Recover destroyed units or machines",
      type: "Support",
      stats: { ATK: 1, DEF: 3, HP: 1, MOV: 5, RNG: 1, MOR: 6 },
      special: [
        "Grid Node",
        "Salvage (when adjacent to destroyed friendly unit's position, recover 2 Fragment Charges)",
      ],
    },
    {
      name: "Gear Infused Infantry",
      faction: "iron-dominion",
      points_cost: 2,
      role: "Balanced",
      fragment_interactions: "Minor fragment boosts",
      flavor_text: "Standard troops with minor mechanical augmentation",
      type: "Infantry",
      stats: { ATK: 2, DEF: 4, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: ["Grid Node"],
    },
    {
      name: "Arcane Tinker Battalion",
      faction: "iron-dominion",
      points_cost: 3,
      role: "Experimental",
      fragment_interactions: "Amplifies fragment energy",
      flavor_text: "Small group that enhances fragment effects",
      type: "Specialist",
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        'Fragment Amplifier (+1 to fragment activation rolls within 3")',
        "Fragment Battery (generate 2 Fragment Charges per turn instead of 1 when near a source)",
      ],
    },
    // Iron Dominion War Machines
    {
      name: "Clockwork Titan",
      faction: "iron-dominion",
      points_cost: 12,
      role: "War Machine",
      fragment_interactions: "AoE melee; fragment boosts radius",
      flavor_text: "Massive humanoid construct, slow but devastating",
      type: "War Machine",
      stats: { ATK: 7, DEF: 5, HP: 10, MOV: 4, RNG: 1, MOR: 10 },
      special: [
        "Grid Anchor (counts as 2 units for Grid adjacency)",
        'Stomp (melee hits all enemy units within 2")',
        "Fearless",
        "Towering (can be targeted from anywhere on the table by Artillery)",
      ],
    },
    {
      name: "Steam Colossus",
      faction: "iron-dominion",
      points_cost: 10,
      role: "War Machine",
      fragment_interactions: "Fragment enhances long-range damage",
      flavor_text: "Siege & artillery hybrid",
      type: "War Machine",
      stats: { ATK: 6, DEF: 5, HP: 8, MOV: 3, RNG: 24, MOR: 10 },
      special: [
        "Grid Anchor",
        'Blast (hits target + all within 2")',
        "Siege (double damage vs fortifications)",
        "Fearless",
      ],
    },
    {
      name: "Aether Cannon Walker",
      faction: "iron-dominion",
      points_cost: 11,
      role: "War Machine",
      fragment_interactions:
        "Fires massive fragment blasts; unstable terrain effects",
      flavor_text: "Huge fragment-powered artillery unit",
      type: "War Machine",
      stats: { ATK: 7, DEF: 4, HP: 8, MOV: 4, RNG: 20, MOR: 10 },
      special: [
        "Grid Anchor",
        'Blast (hits target + all within 2")',
        "Terrain Warp (after firing, target area becomes Difficult Terrain)",
        "Fearless",
      ],
    },
    {
      name: "Gear-Beast Construct",
      faction: "iron-dominion",
      points_cost: 10,
      role: "War Machine",
      fragment_interactions: "Fragment boosts melee; risk of malfunction",
      flavor_text: "Multi-legged mechanical war machine",
      type: "War Machine",
      stats: { ATK: 7, DEF: 4, HP: 8, MOV: 6, RNG: 1, MOR: 10 },
      special: [
        "Grid Anchor",
        "Charge (+2 ATK dice when charging)",
        "All-Terrain",
        "Fearless",
        "Malfunction (roll d6 at start of turn: on 1, cannot act this turn)",
      ],
    },
    {
      name: "Experimental Leviathan",
      faction: "iron-dominion",
      points_cost: 15,
      role: "War Machine",
      fragment_interactions:
        "Fragment may warp battlefield; extremely high risk",
      flavor_text: "Half-mechanical, half-living construct",
      type: "War Machine",
      stats: { ATK: 8, DEF: 5, HP: 12, MOV: 4, RNG: 3, MOR: 10 },
      special: [
        "Grid Anchor",
        'Stomp (melee hits all within 2")',
        'Reality Distortion (enemies within 3" suffer -1 ATK)',
        "Unstable (roll d6 each turn: on 1, take 2 damage)",
        "Fearless",
      ],
    },
    {
      name: "Overclocked Automaton",
      faction: "iron-dominion",
      points_cost: 10,
      role: "War Machine",
      fragment_interactions: "Fragment grants temporary double activation",
      flavor_text: "Fast mechanical unit with explosive attacks",
      type: "War Machine",
      stats: { ATK: 6, DEF: 4, HP: 7, MOV: 7, RNG: 1, MOR: 10 },
      special: [
        "Grid Anchor",
        "Double Strike (may attack twice per Combat Phase)",
        "Overheat (after Double Strike, take 1 damage)",
        "Fearless",
      ],
    },
    {
      name: "Steam Gargoyle",
      faction: "iron-dominion",
      points_cost: 12,
      role: "War Machine",
      fragment_interactions: "Fragment adds unpredictable AoE attacks",
      flavor_text: "Flying mechanical scout/assault unit",
      type: "War Machine",
      stats: { ATK: 6, DEF: 4, HP: 8, MOV: 10, RNG: 8, MOR: 10 },
      special: [
        "Grid Anchor",
        "Fly (ignore terrain)",
        "Dive Attack (+2 ATK dice on charge from Fly)",
        "Fearless",
      ],
    },
    {
      name: "Mechanized Siege Engine",
      faction: "iron-dominion",
      points_cost: 10,
      role: "War Machine",
      fragment_interactions: "Fragment can collapse terrain",
      flavor_text: "Slow, massive damage output",
      type: "War Machine",
      stats: { ATK: 6, DEF: 5, HP: 9, MOV: 3, RNG: 18, MOR: 10 },
      special: [
        "Grid Anchor",
        "Siege (double damage vs fortifications)",
        "Terrain Collapse (destroy one terrain piece within range)",
        "Immobile (cannot move and shoot)",
        "Fearless",
      ],
    },
    {
      name: "Arcane Steam Golem",
      faction: "iron-dominion",
      points_cost: 11,
      role: "War Machine",
      fragment_interactions: "Increases nearby unit effectiveness; unstable",
      flavor_text: "Fragment-powered giant construct",
      type: "War Machine",
      stats: { ATK: 6, DEF: 5, HP: 9, MOV: 4, RNG: 1, MOR: 10 },
      special: [
        "Grid Anchor",
        'Fragment Aura (friendly units within 3" gain +1 ATK die)',
        "Unstable (roll d6 each turn: on 1, Fragment Aura damages friendlies for 1 HP instead)",
        "Fearless",
      ],
    },
    {
      name: "Chrono Walker",
      faction: "iron-dominion",
      points_cost: 14,
      role: "War Machine",
      fragment_interactions: "Fragment can reorder units; high instability",
      flavor_text: "Time-manipulation-themed war machine",
      type: "War Machine",
      stats: { ATK: 5, DEF: 5, HP: 10, MOV: 5, RNG: 12, MOR: 10 },
      special: [
        "Grid Anchor",
        "Time Warp (once per game: take an extra full turn immediately after this one)",
        "Temporal Shield (+2 DEF for 1 turn, then 0 DEF next turn)",
        "Fearless",
        "Unstable",
      ],
    },

    // ===================== VEILBOUND SHOGUNATE UNITS =====================
    // War Machines
    {
      name: "Shrine Dragon",
      faction: "veilbound-shogunate",
      points_cost: 14,
      role: "War Machine",
      fragment_interactions:
        "Reality-phase strikes; flame-based ritual attacks; Ritual Flow enhances AoE",
      flavor_text: "Serpentine cosmic dragon fused with shrine architecture",
      type: "War Machine",
      stats: { ATK: 7, DEF: 4, HP: 10, MOV: 8, RNG: 12, MOR: 10 },
      special: [
        'Dragon Breath (Blast: hits target + all within 2")',
        "Fly",
        "Phase Strike (melee attacks ignore DEF bonuses from cover)",
        "Fearless",
      ],
      ritual_flow: 3,
    },
    {
      name: "Walking Torii Gate",
      faction: "veilbound-shogunate",
      points_cost: 12,
      role: "War Machine",
      fragment_interactions:
        "Warps battlefield geometry; boosts nearby bond generation",
      flavor_text:
        "Colossal torii gate with phasing pillars, eyes of cosmic energy along crossbeams",
      type: "War Machine",
      stats: { ATK: 4, DEF: 5, HP: 9, MOV: 4, RNG: 1, MOR: 10 },
      special: [
        'Reality Warp (once per turn: teleport one friendly unit within 6" to any point within 6" of this model)',
        'Flow Beacon (friendly units within 3" generate +2 Ritual Flow)',
        "Fearless",
      ],
      ritual_flow: 4,
    },
    {
      name: "Komainu Guardian Colossus",
      faction: "veilbound-shogunate",
      points_cost: 13,
      role: "War Machine",
      fragment_interactions:
        "Defensive anchor; aura induces fear in enemies; Ritual Flow boosts counterattacks",
      flavor_text: "Giant lion-dog made of living starlight and ink",
      type: "War Machine",
      stats: { ATK: 6, DEF: 5, HP: 10, MOV: 5, RNG: 1, MOR: 10 },
      special: [
        'Terror Aura (enemies within 3" suffer -1 MOR)',
        "Guardian (counterattacks at full ATK when attacked in melee)",
        "Fearless",
      ],
      ritual_flow: 2,
    },
    {
      name: "Spirit Temple Walker",
      faction: "veilbound-shogunate",
      points_cost: 11,
      role: "War Machine",
      fragment_interactions:
        "Summons minor spirits; shields allies; creates terrain hazards",
      flavor_text: "Living temple with spirit-infused arms and shifting walls",
      type: "War Machine",
      stats: { ATK: 4, DEF: 5, HP: 8, MOV: 4, RNG: 1, MOR: 10 },
      special: [
        'Spirit Summon (once per turn: place a Spirit Token within 6" — acts as Light Cover and deals 1 damage to enemies who enter it)',
        'Shield Aura (friendly units within 3" gain +1 DEF)',
        "Fearless",
      ],
      ritual_flow: 3,
    },
    {
      name: "Hollow Ronin Construct",
      faction: "veilbound-shogunate",
      points_cost: 12,
      role: "War Machine",
      fragment_interactions:
        "Multi-target phasing strikes; temporary battlefield terror effect",
      flavor_text: "Shadowed samurai of immense size, half flesh, half void",
      type: "War Machine",
      stats: { ATK: 7, DEF: 4, HP: 8, MOV: 6, RNG: 1, MOR: 10 },
      special: [
        'Multi-Strike (may split ATK dice between up to 3 targets within 2")',
        "Phase (ignore Engagement — may move freely through enemy units)",
        "Terror Aura",
        "Fearless",
      ],
      ritual_flow: 1,
    },
    {
      name: "Celestial Ink Dragon",
      faction: "veilbound-shogunate",
      points_cost: 13,
      role: "War Machine",
      fragment_interactions:
        "AoE ranged attacks; obscures enemy vision; temporarily disables units",
      flavor_text: "Dragon-shaped ink cloud solidified in starlight form",
      type: "War Machine",
      stats: { ATK: 6, DEF: 4, HP: 9, MOV: 8, RNG: 16, MOR: 10 },
      special: [
        'Ink Cloud (after attacking, target area becomes obscured: -2 ATK for enemies within 2" for 1 turn)',
        "Fly",
        'Blast (hits target + all within 1")',
        "Fearless",
      ],
      ritual_flow: 2,
    },
    {
      name: "Eclipse Manta Titan",
      faction: "veilbound-shogunate",
      points_cost: 14,
      role: "War Machine",
      fragment_interactions:
        "Gliding battlefield suppression; knockback waves; airborne disruption",
      flavor_text:
        "Gigantic manta-like creature with void-black wings spanning hundreds of feet",
      type: "War Machine",
      stats: { ATK: 6, DEF: 4, HP: 10, MOV: 10, RNG: 6, MOR: 10 },
      special: [
        "Fly",
        'Knockback Wave (after moving over enemy units, each must pass MOR check or be pushed 3" and take 1 damage)',
        "Suppression (enemy units this model flew over cannot shoot this turn)",
        "Fearless",
      ],
      ritual_flow: 2,
    },
    {
      name: "Lotus Ascendant Monolith",
      faction: "veilbound-shogunate",
      points_cost: 11,
      role: "War Machine",
      fragment_interactions:
        "Buffs nearby units; blooms to release massive area attacks; amplifies Ritual Flow",
      flavor_text:
        "Towering lotus flower with living petals, pulsating with ritual energy",
      type: "War Machine",
      stats: { ATK: 3, DEF: 5, HP: 8, MOV: 3, RNG: 1, MOR: 10 },
      special: [
        'Bloom (spend 5 Ritual Flow: deal 3 damage to all enemy units within 4")',
        'Flow Beacon (friendly units within 3" generate +2 Ritual Flow)',
        "Immovable",
        "Fearless",
      ],
      ritual_flow: 5,
    },
    {
      name: "Veilbound Oni Juggernaut",
      faction: "veilbound-shogunate",
      points_cost: 15,
      role: "War Machine",
      fragment_interactions:
        "Heavy shock role; devastating melee; causes fear aura in all adjacent units",
      flavor_text:
        "Gigantic Oni armored in celestial patterns, wielding oversized weapons",
      type: "War Machine",
      stats: { ATK: 9, DEF: 4, HP: 12, MOV: 5, RNG: 1, MOR: 10 },
      special: [
        "Devastating Charge (+3 ATK dice when charging)",
        'Terror Aura (enemies within 3" suffer -2 MOR)',
        "Fearless",
        'Rampage (if this unit destroys an enemy, it may immediately charge another enemy within 4")',
      ],
    },
    {
      name: "Shrouded Throne Entity",
      faction: "veilbound-shogunate",
      points_cost: 15,
      role: "War Machine",
      fragment_interactions:
        "Battlefield-altering aura; reality distortions; amplifies all Ritual Flow-based abilities nearby",
      flavor_text:
        "Walking throne with spectral figures orbiting; pilot merges partially into it",
      type: "War Machine",
      stats: { ATK: 5, DEF: 5, HP: 12, MOV: 4, RNG: 8, MOR: 10 },
      special: [
        'Reality Distortion (all enemy units within 6" suffer -1 ATK and -1 MOV)',
        'Flow Nexus (doubles Ritual Flow generated by all friendly units within 6")',
        "Fearless",
        "Immovable",
      ],
      ritual_flow: 5,
    },
    // Veilbound Infantry
    {
      name: "Shrine Wardens",
      faction: "veilbound-shogunate",
      points_cost: 2,
      role: "Defensive",
      fragment_interactions: "Ritual Flow +1; hold objectives",
      flavor_text: "Defensive spear infantry; backbone of formations",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 4, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        "Stance",
        'Objective Holders (+1 DEF when within 3" of an objective marker)',
      ],
    },
    {
      name: "Veiled Ashigaru",
      faction: "veilbound-shogunate",
      points_cost: 1,
      role: "Core combat",
      fragment_interactions: "Ritual Flow +1; synergy with mounted allies",
      flavor_text:
        "Flexible infantry; basic frontline with mounted unit synergy",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 3, HP: 1, MOV: 5, RNG: 1, MOR: 6 },
      special: [
        "Stance",
        "Cavalry Screen (+1 DEF when adjacent to a friendly Cavalry unit)",
      ],
    },
    {
      name: "Mask Bearers",
      faction: "veilbound-shogunate",
      points_cost: 2,
      role: "Support",
      fragment_interactions:
        "Ritual Flow +2; reduces enemy morale and corruption spread",
      flavor_text: "Defensive aura units that suppress enemy morale",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        'Dread Aura (enemies within 3" suffer -1 MOR)',
        "Non-combatant",
      ],
    },
    {
      name: "Inkblade Initiates",
      faction: "veilbound-shogunate",
      points_cost: 1,
      role: "Duelist",
      fragment_interactions: "Ritual Flow +1; minor skill boost on duels",
      flavor_text: "Beginner duelists with 1v1 focus",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 3, HP: 1, MOV: 6, RNG: 1, MOR: 6 },
      special: [
        "Stance",
        "Duelist (reroll 1 die when in 1v1 melee engagement)",
      ],
    },
    {
      name: "Banner of Silent Prayer",
      faction: "veilbound-shogunate",
      points_cost: 2,
      role: "Support",
      fragment_interactions:
        "Ritual Flow +2; buffs nearby units, increases bond generation",
      flavor_text: "Support shrine unit that amplifies nearby allies",
      type: "Support",
      ritual_flow: 2,
      stats: { ATK: 0, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        'Inspiring (+1 MOR to friendly units within 3")',
        'Flow Amplifier (friendly units within 3" generate +1 Ritual Flow)',
        "Non-combatant",
      ],
    },
    {
      name: "Temple Defenders",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Defensive",
      fragment_interactions: "Ritual Flow +1; strong against shock attacks",
      flavor_text: "Shield-heavy counter units that anchor formations",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 5, HP: 3, MOV: 4, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        'Shield Wall (friendly units within 2" gain +1 DEF vs ranged)',
        "Brace (enemy Charge bonuses are negated against this unit)",
      ],
    },
    {
      name: "Starblade Samurai",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Heavy hitter",
      fragment_interactions:
        "Ritual Flow +2; extra strike damage in Revelation Stance",
      flavor_text: "High-value melee elite with devastating stance attacks",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 4, DEF: 4, HP: 2, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        "Revelation Mastery (in Revelation Stance: crits on 5+ instead of 6)",
      ],
    },
    {
      name: "Oni Mask Executioners",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Elite assault",
      fragment_interactions:
        "Ritual Flow +1; terror aura, strong vs damaged enemies",
      flavor_text: "Fear-inducing elite warriors that finish wounded foes",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 4, DEF: 3, HP: 2, MOV: 6, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        "Executioner (+2 ATK dice against targets below half HP)",
        'Terror Aura (enemies within 3" suffer -1 MOR)',
      ],
    },
    {
      name: "Moonlit Duelists",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Duelist",
      fragment_interactions:
        "Ritual Flow +2; counterattack bonus, challenge enemy elites",
      flavor_text: "Expert duelists specializing in counterattacks",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 6, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        "Riposte (when attacked in melee and survives, immediately make a free 2-die counter-attack)",
        "Duelist",
      ],
    },
    {
      name: "Lotus Ascetics",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Adaptive",
      fragment_interactions:
        "Ritual Flow +2; temporary stance adaptation (offense/defense)",
      flavor_text: "Adaptive fighters who shift between combat stances",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        "Adaptive (may switch stance as a free action at ANY point during the turn, not just Movement Phase)",
      ],
    },
    {
      name: "Silent Ink Assassins",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Stealth",
      fragment_interactions:
        "Ritual Flow +1; bypass formations, minor disruption",
      flavor_text: "Teleporting assassins that bypass enemy lines",
      type: "Specialist",
      ritual_flow: 1,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 7, RNG: 1, MOR: 7 },
      special: [
        "Stealth",
        "Phase (ignore Engagement — move freely through enemies)",
        "Assassin (+2 ATK dice when attacking from Stealth)",
      ],
    },
    {
      name: "Kintsugi Blademasters",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Berserker",
      fragment_interactions:
        "Ritual Flow +1; bonus critical strikes when damaged",
      flavor_text: "Damage-activated elite; grow stronger as they take wounds",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 4, DEF: 4, HP: 4, MOV: 5, RNG: 1, MOR: 9 },
      special: [
        "Stance",
        "Kintsugi Rage (+1 ATK die for each HP lost)",
        "Gold-Scarred (crits on 5+ when below half HP)",
      ],
    },
    // Veilbound Cavalry
    {
      name: "Star Serpent Lancers",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Fast assault",
      fragment_interactions:
        "Ritual Flow +2; charge attack, chain momentum bonuses",
      flavor_text: "Fast flanking spirit rider cavalry with charge synergy",
      type: "Cavalry",
      ritual_flow: 2,
      stats: { ATK: 4, DEF: 4, HP: 2, MOV: 9, RNG: 1, MOR: 7 },
      special: [
        'Charge (+1 ATK die when charging 4"+)',
        "Momentum Chain (if this unit destroys an enemy on a charge, +2 ATK dice on next charge this game)",
      ],
    },
    {
      name: "Lunar Kitsune Riders",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Illusion",
      fragment_interactions:
        "Ritual Flow +2; mislead enemy targeting, evade detection",
      flavor_text: "Illusion cavalry that misdirects enemy attacks",
      type: "Cavalry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 9, RNG: 1, MOR: 8 },
      special: [
        "Illusion (enemy ranged attacks against this unit suffer -1 ATK die)",
        'Misdirect (once per turn: when targeted, redirect the attack to a different friendly unit within 3")',
      ],
    },
    {
      name: "Crimson Oni Riders",
      faction: "veilbound-shogunate",
      points_cost: 6,
      role: "Heavy shock",
      fragment_interactions: "Ritual Flow +1; disrupt formations, fear aura",
      flavor_text: "Heavy shock cavalry that breaks enemy lines with terror",
      type: "Cavalry",
      ritual_flow: 1,
      stats: { ATK: 5, DEF: 4, HP: 3, MOV: 8, RNG: 1, MOR: 8 },
      special: [
        "Charge (+2 ATK dice when charging)",
        'Terror Aura (enemies within 3" suffer -1 MOR)',
        "Formation Breaker (enemy units hit by charge lose Grid Cohesion bonuses for 1 turn)",
      ],
    },
    {
      name: "Void Crane Riders",
      faction: "veilbound-shogunate",
      points_cost: 6,
      role: "Aerial duelist",
      fragment_interactions: "Ritual Flow +2; bypass obstacles, dive attacks",
      flavor_text: "Aerial duelist cavalry that strikes from above",
      type: "Cavalry",
      ritual_flow: 2,
      stats: { ATK: 4, DEF: 3, HP: 2, MOV: 10, RNG: 1, MOR: 7 },
      special: [
        "Fly",
        "Dive Attack (+2 ATK dice on charge from Fly)",
        "Duelist",
      ],
    },
    {
      name: "Thunder Kirin Cavalry",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Momentum",
      fragment_interactions:
        "Ritual Flow +2; charge increases successive strike bonuses",
      flavor_text: "Momentum specialists whose charges build cascading power",
      type: "Cavalry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 9, RNG: 1, MOR: 7 },
      special: [
        "Charge (+1 ATK die)",
        "Cascading Thunder (each successive combat this unit enters in the same game adds +1 ATK die permanently, max +3)",
      ],
    },
    {
      name: "Dreambound Riders",
      faction: "veilbound-shogunate",
      points_cost: 7,
      role: "Reality-phase",
      fragment_interactions:
        "Ritual Flow +3; bypass positioning rules, minor phasing",
      flavor_text:
        "Reality-phase cavalry that ignores conventional battlefield rules",
      type: "Cavalry",
      ritual_flow: 3,
      stats: { ATK: 4, DEF: 3, HP: 3, MOV: 10, RNG: 1, MOR: 8 },
      special: [
        "Phase (ignore Engagement and terrain)",
        "Dream Step (once per game: remove from table, redeploy anywhere on the battlefield next turn)",
        "Charge (+1 ATK die)",
      ],
    },
    {
      name: "Shrine Lion Riders",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Defensive flank",
      fragment_interactions:
        "Ritual Flow +1; protect nearby units, defensive aura",
      flavor_text: "Defensive flank cavalry with protective aura",
      type: "Cavalry",
      ritual_flow: 1,
      stats: { ATK: 3, DEF: 4, HP: 3, MOV: 8, RNG: 1, MOR: 8 },
      special: [
        "Charge (+1 ATK die)",
        'Guardian Aura (friendly units within 3" gain +1 DEF)',
        "Bodyguard",
      ],
    },
    {
      name: "Ink Dragon Scouts",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Scout",
      fragment_interactions:
        "Ritual Flow +1; harassment attacks, quick movement",
      flavor_text: "Fast-response reconnaissance with harassing strikes",
      type: "Scout",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 3, HP: 2, MOV: 9, RNG: 8, MOR: 7 },
      special: [
        'Scout (deploy 6" ahead)',
        'Hit-and-Run (may move 4" after attacking)',
      ],
    },
    {
      name: "Spirit Wolf Hunters",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Pack synergy",
      fragment_interactions:
        "Ritual Flow +2; attack bonus in groups, flank advantage",
      flavor_text: "Pack synergy cavalry with group attack bonuses",
      type: "Cavalry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 9, RNG: 1, MOR: 7 },
      special: [
        'Pack Tactics (+1 ATK die for each other Spirit Wolf Hunter unit within 3", max +3)',
        "Charge (+1 ATK die)",
      ],
    },
    {
      name: "Eclipse Manta Riders",
      faction: "veilbound-shogunate",
      points_cost: 6,
      role: "Aerial harassment",
      fragment_interactions:
        "Ritual Flow +2; aerial disruption, bypass terrain",
      flavor_text: "Gliding harassment cavalry that bypasses terrain obstacles",
      type: "Cavalry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 10, RNG: 6, MOR: 7 },
      special: [
        "Fly",
        "Suppression (enemy units this model flew over suffer -1 ATK this turn)",
        "Hit-and-Run",
      ],
    },
    // Veilbound Support
    {
      name: "Spirit Healer Monks",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Healing",
      fragment_interactions:
        "Ritual Flow +3; restore unit health, boost bonded units temporarily",
      flavor_text: "Healing and bond restoration specialists",
      type: "Support",
      ritual_flow: 3,
      stats: { ATK: 0, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        "Heal (restore 2 HP to adjacent friendly unit, once per turn)",
        "Non-combatant",
        'Flow Healer (spend 3 Ritual Flow: heal ALL friendly units within 4" for 1 HP)',
      ],
    },
    {
      name: "Flow Adepts",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Ritual amplification",
      fragment_interactions:
        "Ritual Flow +4; increase Ritual Flow for nearby units, enhance transformations",
      flavor_text:
        "Ritual amplification units that supercharge Flow generation",
      type: "Support",
      ritual_flow: 4,
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        'Flow Amplifier (friendly units within 3" generate +1 Ritual Flow)',
        'Ritual Surge (spend 5 Flow: one friendly unit within 6" gains +2 ATK dice this turn)',
      ],
    },
    {
      name: "Shrine Artificers",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Engineering",
      fragment_interactions:
        "Ritual Flow +2; deploy temporary barricades or small spirit constructs",
      flavor_text: "Trap and minor construct deployment specialists",
      type: "Support",
      ritual_flow: 2,
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        'Construct Spirit Wall (place Light Cover within 2")',
        'Spirit Trap (place trap token within 3": 1 damage + -1 MOV on trigger)',
      ],
    },
    {
      name: "Lantern Bearers",
      faction: "veilbound-shogunate",
      points_cost: 2,
      role: "Morale support",
      fragment_interactions:
        "Ritual Flow +1; illuminate battlefield, reduce fear effects on allies",
      flavor_text:
        "Morale and visibility support that protects allies from fear",
      type: "Support",
      ritual_flow: 1,
      stats: { ATK: 1, DEF: 3, HP: 1, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        'Lantern Light (friendly units within 4" ignore Terror Aura effects)',
        'Inspiring (+1 MOR to friendlies within 3")',
      ],
    },
    {
      name: "Ink Sigil Crafters",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Debuff",
      fragment_interactions:
        "Ritual Flow +2; apply temporary penalties to enemy units (movement or attack)",
      flavor_text:
        "Battlefield debuff specialists applying sigil-based penalties",
      type: "Support",
      ritual_flow: 2,
      stats: { ATK: 1, DEF: 3, HP: 2, MOV: 5, RNG: 12, MOR: 7 },
      special: [
        'Sigil of Binding (target enemy unit within 12": -2 MOV next turn)',
        'Sigil of Weakness (target enemy unit within 12": -1 ATK die next turn)',
        "May use one Sigil per turn",
      ],
    },
    // Veilbound Artillery
    {
      name: "Dreampiercer Archers",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Long-range",
      fragment_interactions:
        "Ritual Flow +1; arrows bypass minor obstacles, minor enemy disorientation",
      flavor_text:
        "Long-range perception-altering archers whose arrows phase through cover",
      type: "Artillery",
      ritual_flow: 1,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 5, RNG: 20, MOR: 7 },
      special: [
        "Phase Arrows (target does not benefit from Light Cover)",
        "Disorientation (targets hit suffer -1 MOV next turn)",
      ],
    },
    {
      name: "Void Bolt Crossbowmen",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Heavy ranged",
      fragment_interactions:
        "Ritual Flow +1; bolt attacks deal high damage, can disrupt formations",
      flavor_text: "Heavy ranged unit firing void-infused bolts",
      type: "Artillery",
      ritual_flow: 1,
      stats: { ATK: 4, DEF: 3, HP: 2, MOV: 4, RNG: 16, MOR: 7 },
      special: [
        "Armor Piercing (target's DEF reduced by 1 for this attack)",
        "Heavy (cannot move and shoot same turn)",
      ],
    },
    {
      name: "Spirit Javelin Skirmishers",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Mobile ranged",
      fragment_interactions:
        "Ritual Flow +1; quick ranged attacks, bonus when retreating or flanking",
      flavor_text: "Mobile harassment specialists with spirit-infused javelins",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 3, HP: 2, MOV: 6, RNG: 10, MOR: 7 },
      special: [
        "Stance",
        'Skirmish (may move 3" after making a ranged attack)',
        "Flank Bonus (+1 ATK die when attacking from flank)",
      ],
    },
    {
      name: "Celestial Slingers",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "AoE harassment",
      fragment_interactions:
        "Ritual Flow +2; hurl fragments infused with Ritual Flow for minor AoE effects",
      flavor_text: "Area harassment units hurling ritual-charged projectiles",
      type: "Artillery",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 5, RNG: 14, MOR: 7 },
      special: [
        'Blast (hits target + all within 1")',
        'Flow Infused (spend 2 Ritual Flow: Blast radius becomes 2")',
      ],
    },
    {
      name: "Shadow Marksmen",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Sniper",
      fragment_interactions:
        "Ritual Flow +2; extra damage vs commanders or unbound units, fear aura",
      flavor_text:
        "Elite snipers specializing in eliminating high-value targets",
      type: "Artillery",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 5, RNG: 22, MOR: 8 },
      special: [
        "Sharpshot (crits on 5+)",
        "Sniper (may target Commanders and Specialists regardless)",
        "Commander Hunter (+2 ATK dice when targeting enemy Commander)",
      ],
    },
    // Veilbound Specialists
    {
      name: "Ritual Captains",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Flow management",
      fragment_interactions:
        "Ritual Flow +5; enhance Ritual Flow, maintain bonds, minor battlefield manipulation",
      flavor_text:
        "Central Flow management officers critical for army coordination",
      type: "Specialist",
      ritual_flow: 5,
      stats: { ATK: 2, DEF: 4, HP: 3, MOV: 5, RNG: 1, MOR: 9 },
      special: [
        'Flow Nexus (friendly units within 4" generate +2 Ritual Flow)',
        'Ritual Command (spend 4 Flow: one friendly unit within 6" may immediately take an extra action)',
        "Commander Bond",
      ],
    },
    {
      name: "Spirit Monolith",
      faction: "veilbound-shogunate",
      points_cost: 6,
      role: "Area control",
      fragment_interactions:
        "Ritual Flow +4; blocks movement, alters terrain slightly, buffs nearby allies",
      flavor_text:
        "Immovable area control construct that reshapes the battlefield",
      type: "Specialist",
      ritual_flow: 4,
      stats: { ATK: 0, DEF: 6, HP: 6, MOV: 0, RNG: 1, MOR: 10 },
      special: [
        "Immovable (cannot move; placed during deployment)",
        'Zone of Power (friendly units within 3" gain +1 ATK die and +1 DEF)',
        "Blocks Movement (enemies cannot move through this unit)",
        "Non-combatant",
      ],
    },
    {
      name: "Veilbound Sigil Bearers",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Disruption",
      fragment_interactions:
        "Ritual Flow +3; apply positional penalties to enemies, minor fear effect",
      flavor_text: "Enemy disruption specialists wielding sigils of dread",
      type: "Specialist",
      ritual_flow: 3,
      stats: { ATK: 2, DEF: 3, HP: 2, MOV: 5, RNG: 1, MOR: 7 },
      special: [
        'Sigil of Dread (enemies within 4" suffer -1 ATK die)',
        "Terror Aura",
      ],
    },
    {
      name: "Phantom Ward Constructs",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Defensive",
      fragment_interactions:
        "Ritual Flow +2; stationary, reduce damage for nearby allies",
      flavor_text: "Defensive barricade constructs that shield allied units",
      type: "Support",
      ritual_flow: 2,
      stats: { ATK: 0, DEF: 5, HP: 5, MOV: 0, RNG: 1, MOR: 10 },
      special: [
        "Immovable (placed during deployment)",
        'Phantom Shield (friendly units within 2" reduce all damage by 1, minimum 0)',
        "Non-combatant",
      ],
    },
    {
      name: "Hollow Shrine Guardians",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Crowd control",
      fragment_interactions:
        "Ritual Flow +3; large AoE fear aura, slows enemies in zone",
      flavor_text:
        "Crowd control units emanating terror that slows all nearby foes",
      type: "Specialist",
      ritual_flow: 3,
      stats: { ATK: 3, DEF: 4, HP: 3, MOV: 4, RNG: 1, MOR: 9 },
      special: [
        'Terror Aura (enemies within 4" suffer -1 MOR — extended range)',
        'Slow Aura (enemies within 3" suffer -2 MOV)',
        "Fearless",
      ],
    },
    {
      name: "Ink Shadow Scouts",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Recon",
      fragment_interactions:
        "Ritual Flow +1; fast, avoid detection, minor enemy disruption",
      flavor_text: "Stealthy reconnaissance skirmishers",
      type: "Scout",
      ritual_flow: 1,
      stats: { ATK: 2, DEF: 3, HP: 1, MOV: 8, RNG: 1, MOR: 7 },
      special: [
        'Scout (deploy 6" ahead)',
        "Stealth",
        'Disruption (enemies within 3" cannot benefit from Grid Cohesion)',
      ],
    },
    // Veilbound additional Infantry
    {
      name: "Moonlit Wanderers",
      faction: "veilbound-shogunate",
      points_cost: 3,
      role: "Hit-and-run",
      fragment_interactions:
        "Ritual Flow +1; can retreat without penalties, moderate dueling ability",
      flavor_text: "Hit-and-run melee skirmishers who fade after striking",
      type: "Infantry",
      ritual_flow: 1,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 6, RNG: 1, MOR: 7 },
      special: [
        "Stance",
        'Hit-and-Run (may move 4" after attacking)',
        "Free Disengage (Disengage does not cost full movement)",
      ],
    },
    {
      name: "Spirit Wolf Packs",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Group harassment",
      fragment_interactions:
        "Ritual Flow +2; synergy when used in groups, flank bonuses",
      flavor_text: "Pack synergy skirmishers that grow deadlier in numbers",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 7, RNG: 1, MOR: 7 },
      special: [
        "Stance",
        'Pack Tactics (+1 ATK die for each other Spirit Wolf Pack within 3", max +2)',
        "Flank Bonus (+1 ATK die from flank)",
      ],
    },
    {
      name: "Void Serpent Harriers",
      faction: "veilbound-shogunate",
      points_cost: 4,
      role: "Flanking",
      fragment_interactions:
        "Ritual Flow +2; moderate AoE strikes, evade frontline units",
      flavor_text: "Flanking skirmishers with area attack capability",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 3, DEF: 3, HP: 2, MOV: 7, RNG: 1, MOR: 7 },
      special: [
        "Stance",
        "Serpent Strike (melee hits target + 1 adjacent enemy)",
        "Phase (may move through enemy units)",
      ],
    },
    {
      name: "Lotus Phantom Assassins",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Elite skirmisher",
      fragment_interactions:
        "Ritual Flow +3; teleport short distances, bonus against high-value targets",
      flavor_text: "Elite skirmishers that teleport to strike priority targets",
      type: "Specialist",
      ritual_flow: 3,
      stats: { ATK: 4, DEF: 3, HP: 2, MOV: 7, RNG: 1, MOR: 8 },
      special: [
        "Phase",
        'Teleport (spend 3 Flow: immediately redeploy within 8")',
        "Assassin (+2 ATK dice vs Commanders and Specialists)",
      ],
    },
    {
      name: "Shrouded Shogun Vassals",
      faction: "veilbound-shogunate",
      points_cost: 6,
      role: "Personal guard",
      fragment_interactions:
        "Ritual Flow +5; only deployed with Shogun, extreme combat abilities",
      flavor_text: "The Shrouded Shogun's personal guard; unmatched in combat",
      type: "Specialist",
      ritual_flow: 5,
      stats: { ATK: 5, DEF: 5, HP: 4, MOV: 5, RNG: 1, MOR: 10 },
      special: [
        "Shogun Only (can only be taken if The Shrouded Shogun is your Commander)",
        "Bodyguard (redirect attacks from Shogun to this unit)",
        "Fearless",
        'Elite (+1 ATK die for each Vassal unit within 3")',
      ],
    },
    {
      name: "Masked Lord Retinue",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Elite protectors",
      fragment_interactions:
        "Ritual Flow +4; accompanies Masked Lords, buffs commander and nearby units",
      flavor_text: "Elite protectors bonded to their Masked Lord commander",
      type: "Specialist",
      ritual_flow: 4,
      stats: { ATK: 4, DEF: 4, HP: 3, MOV: 5, RNG: 1, MOR: 9 },
      special: [
        'Commander Bond (+1 ATK when within 6" of Commander)',
        "Bodyguard",
        "Retinue Synergy (your Commander gains +1 DEF while this unit is alive)",
      ],
    },
    {
      name: "Hollow Lord Phalanx",
      faction: "veilbound-shogunate",
      points_cost: 6,
      role: "Commander synergy",
      fragment_interactions:
        "Ritual Flow +3; maximizes momentum for Hollow Lord transformations",
      flavor_text:
        "Synergy unit designed to amplify Hollow Lord transformation power",
      type: "Infantry",
      ritual_flow: 3,
      stats: { ATK: 4, DEF: 4, HP: 4, MOV: 5, RNG: 1, MOR: 9 },
      special: [
        "Stance",
        "Transformation Catalyst (if Flow Pool ≥30, this unit gains +2 ATK dice and +1 DEF)",
        "Momentum Engine (generate +1 Flow for each enemy this unit damages)",
      ],
    },
    {
      name: "Spirit Dragon Cohort",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Cavalry bonus",
      fragment_interactions:
        "Ritual Flow +3; works best with Spirit Rider Cavalry, extra charge bonus",
      flavor_text:
        "Cavalry bonus unit that amplifies spirit rider charge attacks",
      type: "Cavalry",
      ritual_flow: 3,
      stats: { ATK: 3, DEF: 4, HP: 2, MOV: 9, RNG: 1, MOR: 8 },
      special: [
        "Charge (+1 ATK die)",
        'Cavalry Amplifier (all friendly Cavalry within 3" gain +1 ATK die on charges)',
        "Dragon Bond (if adjacent to Shrine Dragon War Machine, gain +2 ATK dice)",
      ],
    },
    {
      name: "Inkblade Masters",
      faction: "veilbound-shogunate",
      points_cost: 5,
      role: "Commander elite melee",
      fragment_interactions:
        "Ritual Flow +2; bonus damage when adjacent to commanders, synergizes with dueling stance",
      flavor_text:
        "Commander elite melee specialists with devastating dueling prowess",
      type: "Infantry",
      ritual_flow: 2,
      stats: { ATK: 4, DEF: 4, HP: 3, MOV: 5, RNG: 1, MOR: 8 },
      special: [
        "Stance",
        'Commander Bond (+2 ATK dice when within 3" of friendly Commander)',
        "Duelist",
        "Master Swordsman (reroll up to 2 missed dice per attack)",
      ],
    },

    // ===================== NIGHTFANG DOMINION UNITS =====================
    // Stats: ATK (dice), DEF (target#), HP, MOV (inches), RNG (inches, 1=melee), MOR (2d6 threshold)
    {
      name: "Thrall Conscripts",
      faction: "nightfang-dominion",
      points_cost: 1,
      role: "Expendable screen",
      fragment_interactions: "Hunger Pool +1 on death; absorbs hits for elites",
      flavor_text: "Mindless infected humans driven forward by the Blight's hunger. They fight with crude weapons and bare hands.",
      type: "Infantry",
      corruption_spread: 0,
      stats: {
        ATK: 1,
        DEF: 3,
        HP: 1,
        MOV: 5,
        RNG: 1,
        MOR: 4
      },
      special: [
        "Corruption",
        "Thrall (cannot benefit from Commander Aura)",
        "Expendable (does not cause Morale checks when destroyed)"
      ]
    },
    {
      name: "Plague Horde",
      faction: "nightfang-dominion",
      points_cost: 1,
      role: "Tarpit screen",
      fragment_interactions: "Hunger Pool +1 on death; pins enemies in melee",
      flavor_text: "A seething mass of infected wretches that pin enemies in place through sheer weight of rotting flesh.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 1,
        DEF: 2,
        HP: 1,
        MOV: 5,
        RNG: 1,
        MOR: 4
      },
      special: ["Corruption", "Thrall", "Expendable", "Tarpit (engaged enemies cannot Disengage without a MOR check)"]
    },
    {
      name: "Blood Thralls",
      faction: "nightfang-dominion",
      points_cost: 2,
      role: "Improved line infantry",
      fragment_interactions: "Corruption Spread on hit; feeds Hunger Pool",
      flavor_text: "Former soldiers turned by the Blight. They retain enough muscle memory to wield weapons competently.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 2,
        DEF: 3,
        HP: 2,
        MOV: 5,
        RNG: 1,
        MOR: 5
      },
      special: ["Corruption", "Corruption Spread (melee hits apply 1 Corruption token)"]
    },
    {
      name: "Corrupted Militia",
      faction: "nightfang-dominion",
      points_cost: 2,
      role: "Defensive thrall infantry",
      fragment_interactions: "Corruption Spread; holds objectives cheaply",
      flavor_text: "Town guards and militia who fell to the Blight. Their armor remains, rusted and stained with dried blood.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 2,
        DEF: 4,
        HP: 1,
        MOV: 4,
        RNG: 1,
        MOR: 5
      },
      special: ["Corruption", "Corruption Spread", "Shield Wall (+1 DEF when adjacent to another Corrupted Militia)"]
    },
    {
      name: "Fang Guard",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Core melee infantry",
      fragment_interactions: "Corruption Spread; +1 ATK near fragments",
      flavor_text: "Tiger-marked warriors wielding bone glaives. The backbone of Nightfang infantry — fast, aggressive, and infectious.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 3,
        DEF: 3,
        HP: 2,
        MOV: 5,
        RNG: 1,
        MOR: 7
      },
      special: ["Corruption", "Corruption Spread", "Reach 2\" (can attack enemies up to 2\" away)"]
    },
    {
      name: "Crimson Spearmen",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Anti-cavalry infantry",
      fragment_interactions: "Corruption Spread; Hunger Pool generation",
      flavor_text: "Blight-forged spears gleam crimson as these warriors brace against charges. The corruption on their weapons weakens even armored targets.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 2,
        DEF: 4,
        HP: 2,
        MOV: 5,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Brace (enemies charging this unit do not gain Charge bonus; this unit strikes first)"
      ]
    },
    {
      name: "Nightfang Warriors",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Elite melee infantry",
      fragment_interactions: "Corruption Spread; Blood Tithe sacrifice for +1 ATK",
      flavor_text: "Stage 2 Blight-warriors with partial tiger transformation. Their clawed hands and predatory speed make them devastating in melee.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 4,
        DEF: 3,
        HP: 2,
        MOV: 6,
        RNG: 1,
        MOR: 8
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Blood Tithe (sacrifice 1 HP for +1 ATK die)",
        "Pack Tactics (+1 ATK when 2+ Nightfang units attack same target)"
      ]
    },
    {
      name: "Blood Reavers",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Aggressive assault infantry",
      fragment_interactions: "Corruption Spread; heals from kills via Blood Drain",
      flavor_text: "Frenzied warriors who charge headlong into enemy lines, draining blood from every wound they inflict.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 4,
        DEF: 3,
        HP: 2,
        MOV: 6,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Blood Drain (restore 1 HP when this unit destroys an enemy model)",
        "Frenzy (+1 ATK when below half HP)"
      ]
    },
    {
      name: "Plague Knights",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Heavy assault infantry",
      fragment_interactions: "Corruption Aura 2\"; Blood Tithe",
      flavor_text: "Heavily armored in Blight-forged plate, these warriors are walking corruption engines. Every step leaves infected ground.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 3,
        DEF: 5,
        HP: 3,
        MOV: 4,
        RNG: 1,
        MOR: 8
      },
      special: [
        "Corruption",
        "Corruption Aura 2\" (enemies within 2\" gain 1 Corruption token at start of your turn)",
        "Blood Tithe",
        "Heavy Armor"
      ]
    },
    {
      name: "Tiger Berserkers",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Glass cannon melee",
      fragment_interactions: "Blood Tithe; Hunger Pool fueling; Pack Tactics",
      flavor_text: "Fully transformed Stage 2 warriors in permanent tiger-rage. They cannot be reasoned with — only pointed at the enemy.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 5,
        DEF: 3,
        HP: 2,
        MOV: 6,
        RNG: 1,
        MOR: 9
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Frenzy (+1 ATK when below half HP)",
        "Fearless",
        "Cannot Disengage (must always attack if Engaged)"
      ]
    },
    {
      name: "Shadow Claw Infantry",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Stealth melee infantry",
      fragment_interactions: "Corruption Spread; ambush bonus from cover",
      flavor_text: "Night-hunters who strike from shadows. Their Blight-darkened skin makes them nearly invisible in low light.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 3,
        DEF: 3,
        HP: 2,
        MOV: 5,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Stealth (cannot be targeted by ranged attacks while in cover)",
        "Ambush (+1 ATK on the first attack after leaving cover)"
      ]
    },
    {
      name: "Corruption Guard",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Defensive elite infantry",
      fragment_interactions: "Corruption Aura 2\"; protects Plague Heralds and commanders",
      flavor_text: "The Patriarch's personal guard strain — bred for endurance and loyalty. They form impenetrable walls of corrupted flesh.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 3,
        DEF: 5,
        HP: 3,
        MOV: 4,
        RNG: 1,
        MOR: 9
      },
      special: ["Corruption", "Corruption Aura 2\"", "Bodyguard (may intercept attacks targeting a Commander within 3\")"]
    },
    {
      name: "Blight Reapers",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Anti-elite infantry",
      fragment_interactions: "Extra Corruption on corrupted targets; Blood Tithe",
      flavor_text: "Specialist hunters who target already-corrupted enemies. Their scythe-claws harvest weakened prey with terrifying efficiency.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 4,
        DEF: 3,
        HP: 2,
        MOV: 5,
        RNG: 1,
        MOR: 8
      },
      special: ["Corruption", "Corruption Spread", "Reaper (+2 ATK dice against targets with 3+ Corruption tokens)", "Blood Tithe"]
    },
    {
      name: "Infected Archers",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Ranged Corruption applicator",
      fragment_interactions: "Applies Corruption at range; feeds Hunger Pool",
      flavor_text: "Blight Bow wielders who rain corruption-tipped arrows upon the enemy. Each arrow carries a dose of the Quickening.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 3,
        DEF: 3,
        HP: 1,
        MOV: 5,
        RNG: 18,
        MOR: 6
      },
      special: ["Corruption", "Corruption Spread (ranged hits also apply Corruption tokens)", "Volley (may fire over friendly units)"]
    },
    {
      name: "Blightspitter Thralls",
      faction: "nightfang-dominion",
      points_cost: 2,
      role: "Cheap ranged support",
      fragment_interactions: "Corruption Spread at range; expendable",
      flavor_text: "Thralls whose Blight mutation causes them to projectile-vomit streams of infectious bile. Disgusting but effective.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 2,
        DEF: 2,
        HP: 1,
        MOV: 5,
        RNG: 8,
        MOR: 4
      },
      special: ["Corruption", "Thrall", "Expendable", "Corruption Spread", "Blast 1\" (hits all models within 1\" of target)"]
    },
    {
      name: "Tiger Fang Elite",
      faction: "nightfang-dominion",
      points_cost: 6,
      role: "Premium melee infantry",
      fragment_interactions: "Blood Tithe; Pack Tactics; Corruption Aura",
      flavor_text: "The finest non-commander warriors in the Dominion. Stage 2+ veterans with centuries of hunting experience.",
      type: "Infantry",
      corruption_spread: 3,
      stats: {
        ATK: 5,
        DEF: 4,
        HP: 3,
        MOV: 6,
        RNG: 1,
        MOR: 9
      },
      special: ["Corruption", "Corruption Spread", "Pack Tactics", "Blood Tithe", "Blood Drain"]
    },
    {
      name: "Crimson Halberdiers",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Versatile line infantry",
      fragment_interactions: "Corruption Spread; Reach; solid all-rounder",
      flavor_text: "Disciplined Blight-warriors armed with Crimson Halberds — weapons that combine reach with devastating corruption delivery.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 3,
        DEF: 4,
        HP: 2,
        MOV: 5,
        RNG: 1,
        MOR: 7
      },
      special: ["Corruption", "Corruption Spread", "Reach 2\""]
    },
    {
      name: "Bloodsworn Templars",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Heavy defensive infantry",
      fragment_interactions: "Corruption Aura; Blood Tithe; anchors battle line",
      flavor_text: "An ancient order of vampire warriors sworn to protect the Blood Creed. Their corrupted tower shields absorb punishment that would fell lesser beings.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 3,
        DEF: 5,
        HP: 3,
        MOV: 4,
        RNG: 1,
        MOR: 9
      },
      special: ["Corruption", "Corruption Aura 2\"", "Shield Wall (+1 DEF when adjacent to another Bloodsworn Templar)", "Fearless"]
    },
    {
      name: "Thrall Riders",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Cheap fast cavalry",
      fragment_interactions: "Corruption Spread on charge; flanking",
      flavor_text: "Thralls strapped onto corrupted beasts. Neither rider nor mount has much intelligence, but their speed and mass are useful for flanking.",
      type: "Cavalry",
      corruption_spread: 1,
      stats: {
        ATK: 3,
        DEF: 3,
        HP: 2,
        MOV: 8,
        RNG: 1,
        MOR: 5
      },
      special: ["Corruption", "Corruption Spread", "Charge (+1 ATK die when charging)"]
    },
    {
      name: "Tiger Chargers",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Shock cavalry",
      fragment_interactions: "Corruption Spread; Pack Tactics; devastating charge",
      flavor_text: "Vampire warriors riding massive corrupted tigers into battle. The thundering charge of Tiger Chargers can break any line.",
      type: "Cavalry",
      corruption_spread: 2,
      stats: {
        ATK: 4,
        DEF: 4,
        HP: 2,
        MOV: 9,
        RNG: 1,
        MOR: 8
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Charge (+1 ATK die when charging)",
        "Pack Tactics",
        "Terrifying (enemy must pass MOR check when charged)"
      ]
    },
    {
      name: "Blood Fanged Riders",
      faction: "nightfang-dominion",
      points_cost: 6,
      role: "Elite heavy cavalry",
      fragment_interactions: "Blood Drain; Corruption Aura; Pack Tactics",
      flavor_text: "The Blood Dukes' personal cavalry — elegantly armored vampire nobles on Blight-enhanced war-tigers with crystalline fangs.",
      type: "Cavalry",
      corruption_spread: 2,
      stats: {
        ATK: 5,
        DEF: 4,
        HP: 3,
        MOV: 9,
        RNG: 1,
        MOR: 9
      },
      special: ["Corruption", "Corruption Spread", "Charge", "Blood Drain", "Pack Tactics"]
    },
    {
      name: "Plague Runners",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Fast corruption delivery",
      fragment_interactions: "Corruption Spread; area denial; fast Hunger generation",
      flavor_text: "Swift reptilian mounts carrying plague censers — they lap the battlefield spreading corruption mist in their wake.",
      type: "Cavalry",
      corruption_spread: 2,
      stats: {
        ATK: 2,
        DEF: 3,
        HP: 2,
        MOV: 10,
        RNG: 1,
        MOR: 6
      },
      special: [
        "Corruption",
        "Corruption Trail (all units the Plague Runners pass within 1\" of during movement gain 1 Corruption token)",
        "Fast Cavalry (may move after attacking)"
      ]
    },
    {
      name: "Nightstalker Cavalry",
      faction: "nightfang-dominion",
      points_cost: 7,
      role: "Super-heavy elite cavalry",
      fragment_interactions: "Blood Tithe; Corruption Aura; apex mounted unit",
      flavor_text: "Stage 3 warriors who have merged with their mounts into something between centaur and tiger — impossibly fast and utterly lethal.",
      type: "Cavalry",
      corruption_spread: 3,
      stats: {
        ATK: 5,
        DEF: 4,
        HP: 3,
        MOV: 10,
        RNG: 1,
        MOR: 9
      },
      special: ["Corruption", "Corruption Aura 2\"", "Charge", "Pack Tactics", "Blood Tithe", "Fearless"]
    },
    {
      name: "Shadow Pounce Cavalry",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Ambush cavalry",
      fragment_interactions: "Stealth + Charge combo; surprise attacks",
      flavor_text: "Darkness-wreathed riders who cannot be seen until they strike. They pounce from concealment with devastating force.",
      type: "Cavalry",
      corruption_spread: 2,
      stats: {
        ATK: 4,
        DEF: 3,
        HP: 2,
        MOV: 9,
        RNG: 1,
        MOR: 7
      },
      special: ["Corruption", "Corruption Spread", "Charge", "Stealth", "Ambush (+1 ATK on first attack from Stealth)"]
    },
    {
      name: "Blood Shamans",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Blood Tithe healer",
      fragment_interactions: "Blood Tithe healing; Hunger Pool acceleration",
      flavor_text: "Blight-priests who channel the power of consumed blood to heal wounded warriors. They chant in the language of the Scarlet Wellspring.",
      type: "Support",
      corruption_spread: 1,
      stats: {
        ATK: 1,
        DEF: 3,
        HP: 2,
        MOV: 5,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Heal (restore 1 HP to adjacent friendly unit)",
        "Blood Ritual (sacrifice 1 HP from any friendly unit within 3\" to heal a different unit for 2 HP)"
      ]
    },
    {
      name: "Corruption Spreaders",
      faction: "nightfang-dominion",
      points_cost: 2,
      role: "Ranged corruption applicator",
      fragment_interactions: "Applies Corruption tokens at range; weakens enemies",
      flavor_text: "Plague censer-bearers who swing braziers of burning Blight-matter, sending clouds of corruption drifting across the battlefield.",
      type: "Support",
      corruption_spread: 2,
      stats: {
        ATK: 0,
        DEF: 3,
        HP: 2,
        MOV: 5,
        RNG: 6,
        MOR: 6
      },
      special: [
        "Corruption",
        "Plague Censer (instead of attacking, apply 1 Corruption token to all enemy units within 3\" — 6\" range)",
        "Non-Combatant"
      ]
    },
    {
      name: "Plague Apothecaries",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Corruption enhancement",
      fragment_interactions: "Boosts Corruption effects; fragment synergy",
      flavor_text: "Mad scientists of the Blight who brew concentrated corruption serums. They enhance the infection already ravaging enemy units.",
      type: "Support",
      corruption_spread: 1,
      stats: {
        ATK: 1,
        DEF: 3,
        HP: 2,
        MOV: 5,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Intensify Corruption (choose an enemy unit within 8\" with Corruption tokens — double their current token count, max 6)",
        "Non-Combatant"
      ]
    },
    {
      name: "Thrall Masters",
      faction: "nightfang-dominion",
      points_cost: 2,
      role: "Thrall buffer",
      fragment_interactions: "Enhances Thrall units; cheap command support",
      flavor_text: "Low-ranking vampires who maintain the Blight-link to nearby thralls, giving them basic tactical direction instead of mindless swarming.",
      type: "Support",
      corruption_spread: 1,
      stats: {
        ATK: 1,
        DEF: 3,
        HP: 2,
        MOV: 5,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Thrall Command (Thrall units within 6\" gain +1 MOR and +1 ATK)",
        "If this unit is destroyed, all Thrall units within 6\" immediately take a MOR check"
      ]
    },
    {
      name: "Hunger Priests",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Hunger Pool accelerator",
      fragment_interactions: "Doubles Hunger Pool generation; ritual focus",
      flavor_text: "Gaunt, hollow-eyed priests who channel the collective hunger of the Nightfang. Their chanting accelerates the feeding frenzy.",
      type: "Support",
      corruption_spread: 1,
      stats: {
        ATK: 0,
        DEF: 3,
        HP: 2,
        MOV: 4,
        RNG: 1,
        MOR: 8
      },
      special: [
        "Corruption",
        "Hunger Amplification (enemy models destroyed within 6\" of this unit add 2 to the Hunger Pool instead of 1)",
        "Non-Combatant"
      ]
    },
    {
      name: "Blood Collectors",
      faction: "nightfang-dominion",
      points_cost: 2,
      role: "Resource gathering support",
      fragment_interactions: "Generates Blood Tithe resources; post-combat healing",
      flavor_text: "Thrall-servants who follow the army collecting blood from the fallen. This harvested blood fuels the Nightfang war machine.",
      type: "Support",
      corruption_spread: 0,
      stats: {
        ATK: 0,
        DEF: 3,
        HP: 1,
        MOV: 5,
        RNG: 1,
        MOR: 5
      },
      special: [
        "Corruption",
        "Blood Harvest (at End Phase, if adjacent to any destroyed unit's position, generate 1 free Blood Tithe — gives +1 ATK die to a chosen friendly unit next turn)",
        "Non-Combatant",
        "Expendable"
      ]
    },
    {
      name: "Blight Weavers",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Terrain manipulation support",
      fragment_interactions: "Creates Corruption Zones; area denial",
      flavor_text: "Powerful Blight-sorcerers who can seed corruption into the very ground, creating hazardous zones that weaken and infect all who enter.",
      type: "Support",
      corruption_spread: 2,
      stats: {
        ATK: 1,
        DEF: 3,
        HP: 2,
        MOV: 4,
        RNG: 1,
        MOR: 8
      },
      special: [
        "Corruption",
        "Create Corruption Zone (place a 3\" Corruption Zone within 8\" — counts as Difficult Terrain for non-Nightfang, Nightfang gain +1 DEF in it)",
        "Non-Combatant"
      ]
    },
    {
      name: "Crimson Chanters",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Morale support",
      fragment_interactions: "Boosts MOR for nearby units; prevents Rout cascades",
      flavor_text: "Blood-singers whose eerie harmonics resonate through the Blight-link, strengthening the will of nearby Nightfang warriors.",
      type: "Support",
      corruption_spread: 1,
      stats: {
        ATK: 0,
        DEF: 3,
        HP: 2,
        MOV: 5,
        RNG: 1,
        MOR: 8
      },
      special: [
        "Corruption",
        "Blood Song (+1 MOR to all friendly units within 6\")",
        "Rally Cry (once per battle, all Shaken friendly units within 6\" immediately Rally)",
        "Non-Combatant"
      ]
    },
    {
      name: "Plague Catapult Crew",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Long range corruption AoE",
      fragment_interactions: "Applies Corruption at extreme range; area denial",
      flavor_text: "A living catapult grown from corrupted bone that hurls balls of concentrated Blight at distant targets, blanketing areas in infectious mist.",
      type: "Artillery",
      corruption_spread: 1,
      stats: {
        ATK: 4,
        DEF: 3,
        HP: 3,
        MOV: 3,
        RNG: 24,
        MOR: 7
      },
      special: [
        "Corruption",
        "Blast 2\" (hits all models within 2\" of target)",
        "Corruption Spread",
        "Immobile (cannot move and fire in the same turn)"
      ]
    },
    {
      name: "Blood Mortar Team",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Medium range AoE",
      fragment_interactions: "Blast + Corruption; feeds Hunger Pool",
      flavor_text: "A crew operating a Blight-grown mortar that fires globules of pressurized infected blood in high arcs.",
      type: "Artillery",
      corruption_spread: 1,
      stats: {
        ATK: 3,
        DEF: 3,
        HP: 2,
        MOV: 4,
        RNG: 18,
        MOR: 7
      },
      special: ["Corruption", "Blast 2\"", "Corruption Spread", "Indirect Fire (may fire over obstacles and units)"]
    },
    {
      name: "Corruption Spire Battery",
      faction: "nightfang-dominion",
      points_cost: 6,
      role: "Long range corruption beam",
      fragment_interactions: "Maximum corruption application at range; area denial",
      flavor_text: "A towering spire of crystallized Blight that channels corruption energy into devastating beams. It takes a full crew to aim and fire.",
      type: "Artillery",
      corruption_spread: 2,
      stats: {
        ATK: 5,
        DEF: 3,
        HP: 3,
        MOV: 3,
        RNG: 24,
        MOR: 7
      },
      special: ["Corruption", "Corruption Spread", "Sharpshot (+1 ATK die against targets in the open)", "Immobile"]
    },
    {
      name: "Bile Cannon Crew",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Short range devastation",
      fragment_interactions: "Massive short-range AoE; corruption saturation",
      flavor_text: "A grotesque living cannon that vomits a torrent of acidic Blight-bile in a wide cone. Short-ranged but devastating.",
      type: "Artillery",
      corruption_spread: 2,
      stats: {
        ATK: 5,
        DEF: 3,
        HP: 2,
        MOV: 3,
        RNG: 10,
        MOR: 7
      },
      special: ["Corruption", "Blast 3\"", "Corruption Spread", "Cone Attack (hits all units in a 3\"-wide cone from the cannon)"]
    },
    {
      name: "Plague Ballista Crew",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Anti-large precision",
      fragment_interactions: "Precision Corruption; targets War Machines and Commanders",
      flavor_text: "A precision weapon grown from a single massive bone, firing corruption-coated bolts that can punch through armor and infect the wound.",
      type: "Artillery",
      corruption_spread: 1,
      stats: {
        ATK: 4,
        DEF: 3,
        HP: 2,
        MOV: 4,
        RNG: 20,
        MOR: 7
      },
      special: ["Corruption", "Corruption Spread", "Anti-Large (+2 ATK dice against War Machines and models with 5+ HP)", "Sharpshot"]
    },
    {
      name: "Shadow Stalkers",
      faction: "nightfang-dominion",
      points_cost: 1,
      role: "Cheap expendable scouts",
      fragment_interactions: "Spotting for artillery; early corruption application",
      flavor_text: "Fast-moving thralls with enhanced senses. They are released ahead of the army like hunting hounds to flush out the prey.",
      type: "Scout",
      corruption_spread: 0,
      stats: {
        ATK: 1,
        DEF: 3,
        HP: 1,
        MOV: 8,
        RNG: 1,
        MOR: 4
      },
      special: [
        "Corruption",
        "Thrall",
        "Scout (deploy up to 6\" ahead of deployment zone)",
        "Spotter (friendly artillery targeting enemies within 6\" of this unit gain +1 ATK)"
      ]
    },
    {
      name: "Tiger Scout Pack",
      faction: "nightfang-dominion",
      points_cost: 2,
      role: "Fast beast scouts",
      fragment_interactions: "Pack Tactics; early Corruption Spread; flanking",
      flavor_text: "Small corrupted tigers released as a hunting pack. Fast, cunning, and able to take down isolated targets.",
      type: "Scout",
      corruption_spread: 1,
      stats: {
        ATK: 2,
        DEF: 3,
        HP: 1,
        MOV: 9,
        RNG: 1,
        MOR: 6
      },
      special: ["Corruption", "Corruption Spread", "Scout", "Pack Tactics"]
    },
    {
      name: "Corruption Scouts",
      faction: "nightfang-dominion",
      points_cost: 2,
      role: "Ranged scout with corruption",
      fragment_interactions: "Applies Corruption at range while scouting; spotter",
      flavor_text: "Blight Bow-armed scouts who infect targets from concealment. Their arrows carry corruption deep into enemy territory.",
      type: "Scout",
      corruption_spread: 1,
      stats: {
        ATK: 2,
        DEF: 3,
        HP: 1,
        MOV: 8,
        RNG: 8,
        MOR: 5
      },
      special: ["Corruption", "Corruption Spread", "Scout", "Stealth"]
    },
    {
      name: "Blood Runners",
      faction: "nightfang-dominion",
      points_cost: 1,
      role: "Ultra-fast disposable scouts",
      fragment_interactions: "Fastest unit in faction; objective grabbing",
      flavor_text: "Thralls mutated for pure speed — elongated limbs and stripped muscle. They run until they drop.",
      type: "Scout",
      corruption_spread: 0,
      stats: {
        ATK: 1,
        DEF: 2,
        HP: 1,
        MOV: 10,
        RNG: 1,
        MOR: 4
      },
      special: ["Corruption", "Thrall", "Expendable", "Scout", "Sprint (may move an additional 4\" instead of attacking)"]
    },
    {
      name: "Nightveil Infiltrators",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Elite stealth scouts",
      fragment_interactions: "Stealth + Corruption; ambush deployment",
      flavor_text: "Elite vampire scouts who can vanish into shadow and reappear behind enemy lines. Their first strike is always lethal.",
      type: "Scout",
      corruption_spread: 1,
      stats: {
        ATK: 3,
        DEF: 3,
        HP: 2,
        MOV: 8,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Scout",
        "Stealth",
        "Ambush (+1 ATK on first attack)",
        "Phase (may move through enemy units and terrain)"
      ]
    },
    {
      name: "Blight Hound Pack",
      faction: "nightfang-dominion",
      points_cost: 2,
      role: "Fast scout beast pack",
      fragment_interactions: "Hunt wounded targets; Hunger Pool feeding",
      flavor_text: "Corrupted war-dogs with elongated jaws and glowing crimson eyes. They can smell blood from a mile away.",
      type: "Scout",
      corruption_spread: 1,
      stats: {
        ATK: 2,
        DEF: 3,
        HP: 1,
        MOV: 9,
        RNG: 1,
        MOR: 5
      },
      special: ["Corruption", "Corruption Spread", "Scout", "Blood Scent (+1 ATK against targets below half HP)"]
    },
    {
      name: "Blood Champion",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Duelist / character hunter",
      fragment_interactions: "Blood Tithe; gains power from Challenge kills",
      flavor_text: "A Stage 3 warrior whose sole purpose is to hunt and destroy enemy commanders. They live for the Challenge.",
      type: "Specialist",
      corruption_spread: 2,
      stats: {
        ATK: 5,
        DEF: 4,
        HP: 3,
        MOV: 6,
        RNG: 1,
        MOR: 9
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Duelist (+1 ATK and +1 DEF in Challenges)",
        "Blood Drain",
        "Commander Bond (gains +1 ATK when within 6\" of a friendly Commander)"
      ]
    },
    {
      name: "Tiger Alpha",
      faction: "nightfang-dominion",
      points_cost: 6,
      role: "Beast buffer / leader beast",
      fragment_interactions: "Buffs nearby tiger/beast units; Pack Tactics center",
      flavor_text: "The dominant predator in any Nightfang beast pack. Its roar coordinates nearby tigers and war beasts with terrifying precision.",
      type: "Specialist",
      corruption_spread: 2,
      stats: {
        ATK: 5,
        DEF: 4,
        HP: 4,
        MOV: 7,
        RNG: 1,
        MOR: 9
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Alpha Roar (all friendly beast/tiger units within 6\" gain +1 ATK)",
        "Pack Tactics",
        "Terrifying"
      ]
    },
    {
      name: "Plague Doctor",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Versatile corruption specialist",
      fragment_interactions: "Can cure or intensify corruption; flexible support",
      flavor_text: "A twisted healer who wields the Blight as both weapon and medicine. To allies, they bring restoration. To enemies, only the Quickening.",
      type: "Specialist",
      corruption_spread: 1,
      stats: {
        ATK: 2,
        DEF: 3,
        HP: 2,
        MOV: 5,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Purge Corruption (remove all Corruption tokens from a friendly unit within 3\" and heal it for 1 HP)",
        "Inject Corruption (apply 2 Corruption tokens to an enemy within 3\")"
      ]
    },
    {
      name: "Midnight Assassin",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Stealth assassination",
      fragment_interactions: "Commander hunter; Stealth + high ATK burst",
      flavor_text: "Shadow-wreathed killers who strike from nowhere, drain their target's blood, and vanish. They specialize in decapitating armies by killing leaders.",
      type: "Specialist",
      corruption_spread: 1,
      stats: {
        ATK: 5,
        DEF: 3,
        HP: 2,
        MOV: 7,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Stealth",
        "Ambush (+1 ATK on first attack from Stealth)",
        "Assassination (+2 ATK dice against Commanders)",
        "Phase"
      ]
    },
    {
      name: "Hunger Wraith",
      faction: "nightfang-dominion",
      points_cost: 6,
      role: "Ethereal damage specialist",
      fragment_interactions: "Phase; Hunger Pool interaction; hard to kill",
      flavor_text: "A manifestation of pure Blight-hunger that has taken physical form. It passes through walls, armor, and flesh alike.",
      type: "Specialist",
      corruption_spread: 2,
      stats: {
        ATK: 4,
        DEF: 6,
        HP: 3,
        MOV: 6,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Corruption Aura 2\"",
        "Phase",
        "Ethereal (can only be damaged by attacks that score critical hits — natural 6)",
        "Fearless"
      ]
    },
    {
      name: "Feral Skinchanger",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Flexible form-shifter",
      fragment_interactions: "Switches between ranged/melee forms; versatile",
      flavor_text: "A warrior who can shift between human form (agile, ranged) and tiger form (brutal, melee) at will. Unpredictable and dangerous.",
      type: "Specialist",
      corruption_spread: 2,
      stats: {
        ATK: 4,
        DEF: 4,
        HP: 3,
        MOV: 6,
        RNG: 1,
        MOR: 8
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Shapeshift: Human Form (ATK 3, DEF 3, RNG 8, MOV 5) / Tiger Form (ATK 5, DEF 4, RNG 1, MOV 8) — switch at start of turn"
      ]
    },
    {
      name: "Blood Hierophant",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Fragment specialist",
      fragment_interactions: "Enhances fragment effects; doubles activation charges",
      flavor_text: "A priest of the Crimson Wellspring who channels the deepest Blight powers through crystallized corruption fragments.",
      type: "Specialist",
      corruption_spread: 1,
      stats: {
        ATK: 2,
        DEF: 3,
        HP: 2,
        MOV: 4,
        RNG: 6,
        MOR: 8
      },
      special: [
        "Corruption",
        "Fragment Attunement (fragments activated within 6\" of this unit gain +1 charge)",
        "Blood Tithe",
        "Non-Combatant"
      ]
    },
    {
      name: "Crimson Behemoth",
      faction: "nightfang-dominion",
      points_cost: 14,
      role: "Massive melee war beast",
      fragment_interactions: "Corruption Aura 3\"; Blood Drain; Hunger Pool anchor",
      flavor_text: "A Stage 3 tiger of immense size — 20 feet at the shoulder, armored in plates of hardened Blight. It devours entire regiments.",
      type: "War Machine",
      corruption_spread: 3,
      stats: {
        ATK: 7,
        DEF: 5,
        HP: 10,
        MOV: 6,
        RNG: 1,
        MOR: 10
      },
      special: ["Corruption", "Corruption Aura 3\"", "Blood Drain", "Towering", "Terrifying", "Fearless"]
    },
    {
      name: "Plague Titan",
      faction: "nightfang-dominion",
      points_cost: 15,
      role: "Walking corruption engine",
      fragment_interactions: "Maximum Corruption Aura; plague saturation; siege breaker",
      flavor_text: "The largest creature in the Nightfang arsenal — a Blight-mutated colossus whose every footstep spreads corruption and whose roar liquefies morale.",
      type: "War Machine",
      corruption_spread: 4,
      stats: {
        ATK: 8,
        DEF: 5,
        HP: 12,
        MOV: 4,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Corruption Aura 4\"",
        "Towering",
        "Siege (double damage to fortifications)",
        "Terrifying",
        "Fearless",
        "Blight Regeneration (heal 1 HP at start of friendly turn)"
      ]
    },
    {
      name: "Blood Engine",
      faction: "nightfang-dominion",
      points_cost: 13,
      role: "Blood-powered war machine",
      fragment_interactions: "Blood Tithe multiplier; powered by sacrificed HP",
      flavor_text: "A pulsing heart-like construct of corrupted flesh and bone, fed by blood sacrificed from nearby units. The more it feeds, the more devastating its attacks.",
      type: "War Machine",
      corruption_spread: 2,
      stats: {
        ATK: 6,
        DEF: 4,
        HP: 8,
        MOV: 4,
        RNG: 12,
        MOR: 10
      },
      special: [
        "Corruption",
        "Blood-Powered (for each 1 HP sacrificed from friendly units within 3\", gain +2 ATK dice this turn, max +6)",
        "Blast 2\"",
        "Fearless"
      ]
    },
    {
      name: "Corruption Colossus",
      faction: "nightfang-dominion",
      points_cost: 14,
      role: "Mobile corruption factory",
      fragment_interactions: "Creates Corruption Zones; area denial on legs",
      flavor_text: "A walking factory of plague — it trails corruption in its wake and can projectile-infect entire areas of the battlefield.",
      type: "War Machine",
      corruption_spread: 3,
      stats: {
        ATK: 5,
        DEF: 5,
        HP: 9,
        MOV: 5,
        RNG: 8,
        MOR: 10
      },
      special: [
        "Corruption",
        "Corruption Trail (creates a 2\" Corruption Zone in every space it moves through)",
        "Corruption Spread",
        "Towering",
        "Fearless"
      ]
    },
    {
      name: "Nightfang Dragon",
      faction: "nightfang-dominion",
      points_cost: 15,
      role: "Flying apex war beast",
      fragment_interactions: "Fly; Corruption Breath; apex predator of the sky",
      flavor_text: "A primordial dragon corrupted by the Blight over millennia. Its breath is concentrated Blight-fire and its shadow causes panic.",
      type: "War Machine",
      corruption_spread: 4,
      stats: {
        ATK: 8,
        DEF: 4,
        HP: 11,
        MOV: 10,
        RNG: 12,
        MOR: 10
      },
      special: [
        "Corruption",
        "Fly",
        "Corruption Breath (ranged attack applies 2 Corruption tokens to all targets hit)",
        "Blast 3\"",
        "Towering",
        "Terrifying",
        "Fearless"
      ]
    },
    {
      name: "Bile Wurm",
      faction: "nightfang-dominion",
      points_cost: 12,
      role: "Burrowing war beast",
      fragment_interactions: "Ambush from underground; terrain manipulation",
      flavor_text: "A massive corrupted worm that burrows beneath the battlefield and erupts among enemy formations, spewing bile and corruption.",
      type: "War Machine",
      corruption_spread: 2,
      stats: {
        ATK: 6,
        DEF: 4,
        HP: 8,
        MOV: 6,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Burrow (may deploy anywhere on the battlefield at the start of Turn 2+, counts as charging)",
        "Corruption Spread",
        "Terrifying",
        "Fearless"
      ]
    },
    {
      name: "Blood Harvester Juggernaut",
      faction: "nightfang-dominion",
      points_cost: 13,
      role: "Armored assault war machine",
      fragment_interactions: "Blood Drain on kill; Hunger Pool anchor; siege unit",
      flavor_text: "A massive armored beast bristling with bone-blades and draining tubes. It harvests blood from everything it tramples.",
      type: "War Machine",
      corruption_spread: 2,
      stats: {
        ATK: 6,
        DEF: 5,
        HP: 9,
        MOV: 5,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Blood Drain",
        "Trample (when charging, deal 1 damage to every enemy model it moves over)",
        "Siege",
        "Fearless"
      ]
    },
    {
      name: "Elder Tiger Horror",
      faction: "nightfang-dominion",
      points_cost: 14,
      role: "Ancient apex predator",
      fragment_interactions: "Corruption Aura 3\"; Pack Tactics for all tigers within 6\"",
      flavor_text: "An ancient vampiric tiger, possibly older than the Dominion itself. Its roar commands every tiger on the battlefield.",
      type: "War Machine",
      corruption_spread: 3,
      stats: {
        ATK: 7,
        DEF: 4,
        HP: 10,
        MOV: 8,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Corruption Aura 3\"",
        "Supreme Alpha (all tiger/beast units within 6\" gain +1 ATK and +1 MOR)",
        "Pack Tactics",
        "Terrifying",
        "Fearless"
      ]
    },
    {
      name: "Plague Broodmother",
      faction: "nightfang-dominion",
      points_cost: 13,
      role: "Thrall spawner",
      fragment_interactions: "Generates free Thrall units; sustains attrition warfare",
      flavor_text: "A horrifying brood-beast that births new thralls directly onto the battlefield. It is both war machine and factory.",
      type: "War Machine",
      corruption_spread: 2,
      stats: {
        ATK: 4,
        DEF: 4,
        HP: 9,
        MOV: 3,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Spawn Thralls (at the start of each friendly turn, place 1 free Thrall Conscripts unit within 3\" of this model)",
        "Corruption Aura 2\"",
        "Fearless"
      ]
    },
    {
      name: "Shadow Leviathan",
      faction: "nightfang-dominion",
      points_cost: 15,
      role: "Supreme apex war beast",
      fragment_interactions: "Stealth war machine; Corruption Aura; devastating ambush",
      flavor_text: "The apex predator of the Nightfang — a shadow-cloaked leviathan that phases in and out of visibility. When it strikes, it is already too late.",
      type: "War Machine",
      corruption_spread: 4,
      stats: {
        ATK: 9,
        DEF: 4,
        HP: 10,
        MOV: 7,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Corruption Aura 3\"",
        "Stealth",
        "Phase",
        "Ambush (+2 ATK on first attack from Stealth)",
        "Towering",
        "Terrifying",
        "Fearless"
      ]
    },
  ],
  fragments: [
    {
      name: "Core Fragment",
      faction: "iron-dominion",
      effects: "Basic energy boost; minor attack & defense buff",
      risk_instability: "Low",
      activation_cost: 1,
      interaction_evolution:
        "Stable across all evolutions; good for Knowledge commanders",
    },
    {
      name: "Aether Pulse",
      faction: "iron-dominion",
      effects: "Increases unit movement and speed",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Chaos evolutions amplify unpredictably; Knowledge stabilizes speed",
    },
    {
      name: "Reality Shard",
      faction: "iron-dominion",
      effects: "Alters battlefield terrain slightly",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Chaos amplifies terrain warping; Knowledge reduces effect magnitude",
    },
    {
      name: "Overclock Node",
      faction: "iron-dominion",
      effects: "Temporarily boosts war machine activation",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Best used by Ironweld or Mechana; Knowledge stabilizes, Chaos risks misfire",
    },
    {
      name: "Fragment Conduit",
      faction: "iron-dominion",
      effects: "Amplifies fragment effects nearby",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Chaos commanders can trigger AoE anomalies; Knowledge keeps effects precise",
    },
    {
      name: "Temporal Chip",
      faction: "iron-dominion",
      effects: "Allows minor reordering of unit activation",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Best for Chrono Walker; Knowledge commanders gain controlled timing, Chaos risks disruption",
    },
    {
      name: "Arcane Spark",
      faction: "iron-dominion",
      effects: "Enhances ranged attacks",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Synergizes with Aether Blasters and Steam Artillery; Chaos may cause accidental explosions",
    },
    {
      name: "Steam Core",
      faction: "iron-dominion",
      effects: "Buffs mechanical unit durability",
      risk_instability: "Low",
      activation_cost: 1,
      interaction_evolution:
        "Knowledge commanders benefit most; Chaos may slightly destabilize units",
    },
    {
      name: "Infused Cog",
      faction: "iron-dominion",
      effects: "Boosts elite unit damage",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Works with Vanguard and Shock Infantry; Chaos adds random crits, Knowledge stabilizes output",
    },
    {
      name: "Fragment Swarm",
      faction: "iron-dominion",
      effects: "Summons temporary mini constructs",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Risk/reward mechanic; Chaos makes swarm aggressive but erratic",
    },
    {
      name: "Reality Lens",
      faction: "iron-dominion",
      effects: "Reveals hidden or stealth units",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Best for stealth detection; Knowledge stabilizes accuracy, Chaos may misidentify",
    },
    {
      name: "Flux Matrix",
      faction: "iron-dominion",
      effects: "Minor AoE fragment pulse",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Can destabilize battlefield; Chaos amplifies, Knowledge reduces erratic effects",
    },
    {
      name: "Resonance Core",
      faction: "iron-dominion",
      effects: "Improves fragment-linked unit coordination",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Knowledge commanders maximize efficiency, Chaos may cause coordination glitches",
    },
    {
      name: "Experimental Node",
      faction: "iron-dominion",
      effects: "Random fragment effect",
      risk_instability: "Very High",
      activation_cost: 4,
      interaction_evolution:
        "Risk/reward; Chaos evolutions increase unpredictability, Knowledge reduces magnitude",
    },
    {
      name: "Gear Infusion",
      faction: "iron-dominion",
      effects: "Boosts mechanical unit speed & power",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Synergizes with Clockwork Cavalry & Mechanized Infantry; Knowledge stabilizes, Chaos risks misfire",
    },
    {
      name: "Spirit Thread",
      faction: "veilbound-shogunate",
      effects: "Grants +1 ATK die to an adjacent Spirit unit for one turn",
      risk_instability: "Low",
      activation_cost: 1,
      interaction_evolution:
        "Stable and reliable; amplified by high Ritual Flow pools",
    },
    {
      name: "Ancestral Echo",
      faction: "veilbound-shogunate",
      effects: "Restores 2 HP to a wounded unit within 3\". Single use per turn",
      risk_instability: "Low",
      activation_cost: 1,
      interaction_evolution:
        "Knowledge evolutions improve healing range; Chaos may overheal causing instability",
    },
    {
      name: "Veil Tear",
      faction: "veilbound-shogunate",
      effects: "Creates a 2\" zone of Difficult Terrain lasting 2 turns",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Chaos evolutions extend zone to 3\"; Knowledge makes it selective (allies pass freely)",
    },
    {
      name: "Phantom Mask",
      faction: "veilbound-shogunate",
      effects: "Grants Stealth to target unit until it attacks or is damaged",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Best with Shadow units; Chaos may grant stealth but also confuse allied targeting",
    },
    {
      name: "Ritual Blade",
      faction: "veilbound-shogunate",
      effects: "Target melee unit gains +2 ATK dice on next attack, then suffers 1 damage",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Chaos evolutions remove self-damage; Knowledge keeps +2 but also adds +1 DEF",
    },
    {
      name: "Flow Conduit",
      faction: "veilbound-shogunate",
      effects: "Generates +3 Ritual Flow immediately. Does not count as the turn's fragment use",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Pure Flow generation; Knowledge increases to +4, Chaos adds randomness (2d3)",
    },
    {
      name: "Yokai Summon",
      faction: "veilbound-shogunate",
      effects: "Places a Yokai token (ATK 2, DEF 2, HP 2) within 6\". Acts next turn. Lasts 3 turns",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Chaos extends Yokai lifespan to 5 turns but it may attack allies; Knowledge makes it controllable",
    },
    {
      name: "Soul Mirror",
      faction: "veilbound-shogunate",
      effects: "Reflect the next ranged attack targeting this unit back at the attacker",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Knowledge reflects at full damage; Chaos reflects at double but has 50% chance to fail",
    },
    {
      name: "Kitsune Charm",
      faction: "veilbound-shogunate",
      effects: "Force an enemy unit within 6\" to reroll its next ATK roll and take the lower result",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Pairs well with commander debuff cards; Knowledge extends to 2 attacks, Chaos extends range to 9\"",
    },
    {
      name: "Onryo Wail",
      faction: "veilbound-shogunate",
      effects: "All enemy units within 4\" must make an immediate Morale check at -1 MOR",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution:
        "Devastating with Terror Aura units; Chaos increases to -2 MOR but may affect allies",
    },
    {
      name: "Celestial Ink",
      faction: "veilbound-shogunate",
      effects: "Draw 1 additional card this turn. Excess cards above hand limit discarded at end of turn",
      risk_instability: "Low",
      activation_cost: 1,
      interaction_evolution:
        "Universal utility; Knowledge lets you choose which card to draw, Chaos draws 2 but random",
    },
    {
      name: "Void Step",
      faction: "veilbound-shogunate",
      effects: "Target unit may teleport up to 8\" in any direction. Cannot end within 1\" of enemies",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Chaos allows ending in engagement (surprise melee); Knowledge extends to 12\"",
    },
    {
      name: "Kami's Blessing",
      faction: "veilbound-shogunate",
      effects: "Target unit gains +2 MOR and Fearless until end of next turn",
      risk_instability: "Low",
      activation_cost: 1,
      interaction_evolution:
        "Reliable morale control; Knowledge extends to 2 units, Chaos adds +1 ATK but risks overconfidence",
    },
    {
      name: "Dragon Vein Tap",
      faction: "veilbound-shogunate",
      effects: "Massive Flow surge: set your Flow Pool to maximum threshold. All Flow abilities unlock this turn",
      risk_instability: "Very High",
      activation_cost: 4,
      interaction_evolution:
        "Extremely powerful but dangerous; Chaos may cause Flow overflow (damage to all units within 6\")",
    },
    {
      name: "Shinigami Mark",
      faction: "veilbound-shogunate",
      effects: "Mark an enemy unit. All attacks against marked unit gain +1 ATK die for 2 turns",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution:
        "Focus fire enabler; Knowledge extends to 3 turns, Chaos makes mark spread to adjacent enemies on kill",
    },

    // ===================== NIGHTFANG DOMINION FRAGMENTS =====================
    {
      name: "Crimson Wellspring Shard",
      faction: "nightfang-dominion",
      effects: "Heals all Nightfang units within 3\" for 2 HP; grants +1 ATK until End Phase",
      risk_instability: "Low",
      activation_cost: 1,
      interaction_evolution: "Knowledge commanders gain stable healing aura; Chaos commanders double healing but risk blood frenzy in nearby thralls"
    },
    {
      name: "Blight Seed",
      faction: "nightfang-dominion",
      effects: "Creates a 3\" Corruption Zone at fragment location; enemies inside gain 2 Corruption tokens per turn",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution: "Chaos evolution expands zone to 5\"; Knowledge evolution makes zone grant +1 DEF to Nightfang units inside"
    },
    {
      name: "Blood Chalice",
      faction: "nightfang-dominion",
      effects: "Activates Blood Tithe at no HP cost for 1 turn; all Blood Drain abilities heal double",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution: "Knowledge commanders gain efficient blood economy; Chaos commanders trigger blood frenzy — all units gain +1 ATK but lose 1 HP"
    },
    {
      name: "Hunger Stone",
      faction: "nightfang-dominion",
      effects: "Adds 3 to the Hunger Pool immediately; all units within 4\" gain +1 ATK until the Pool is spent",
      risk_instability: "Low",
      activation_cost: 1,
      interaction_evolution: "Stable with Knowledge commanders — controlled Hunger gain; Chaos commanders can chain-activate for rapid Pool flooding"
    },
    {
      name: "Tiger Fang Relic",
      faction: "nightfang-dominion",
      effects: "All beast units within 6\" gain +2 ATK and Charge bonus until End Phase",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution: "Beast-focused commanders amplify effect to +3 ATK; Chaos evolution risks feral madness — beasts may attack nearest unit regardless of faction"
    },
    {
      name: "Corruption Nexus",
      faction: "nightfang-dominion",
      effects: "Doubles all Corruption token effects within 8\" for 1 turn; threshold reduced to 2 tokens",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution: "Knowledge keeps effect controlled and targeted; Chaos amplifies corruption to affect ALL units including friendlies within range"
    },
    {
      name: "Shadowveil Gem",
      faction: "nightfang-dominion",
      effects: "Grants Stealth to all friendly units within 4\" until they attack; Stealth units gain +2 ATK from ambush",
      risk_instability: "Low",
      activation_cost: 2,
      interaction_evolution: "Stealth commanders extend range to 8\"; Chaos evolution grants Phase but shadow instability may teleport units randomly"
    },
    {
      name: "Plague Heart",
      faction: "nightfang-dominion",
      effects: "All enemy units within 6\" gain 3 Corruption tokens and take 1 damage; creates lasting Corruption Zone",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution: "Chaos commanders can detonate the Plague Heart for massive area damage; Knowledge commanders sustain it for persistent corruption pressure"
    },
    {
      name: "Bone Crown Fragment",
      faction: "nightfang-dominion",
      effects: "Commander gains +2 DEF and Immovable for 2 turns; all units within 6\" gain +1 DEF",
      risk_instability: "Low",
      activation_cost: 2,
      interaction_evolution: "Defensive commanders gain extended duration (3 turns); Chaos commanders risk bone growth — gain +3 DEF but -2 MOV permanently"
    },
    {
      name: "Thrall Beacon",
      faction: "nightfang-dominion",
      effects: "Spawns 2 Thrall Conscript units within 3\" of fragment; existing thralls within 6\" gain +1 to all stats for 1 turn",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution: "Horde commanders spawn 3 units instead; Chaos evolution thralls are unstable — explode on death for 2 damage to adjacent enemies"
    },
    {
      name: "Crimson Mirror",
      faction: "nightfang-dominion",
      effects: "Reflects the next attack made against any unit within 4\" back at the attacker; deals reflected damage equal to original attack",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution: "Knowledge commanders can choose which attacks to reflect; Chaos evolution reflects ALL attacks but may also reflect friendly attacks"
    },
    {
      name: "Feral Totem",
      faction: "nightfang-dominion",
      effects: "All beast and cavalry units within 6\" gain Pack Tactics, +1 MOV, and Fearless until End Phase",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution: "Beast commanders amplify to +2 MOV and Terrifying; Chaos evolution triggers feral transformation — units gain +3 ATK but cannot be commanded"
    },
    {
      name: "Blood Engine Core",
      faction: "nightfang-dominion",
      effects: "All War Machines within 6\" gain +2 ATK and heal 3 HP; artillery gains +2\" range",
      risk_instability: "Medium",
      activation_cost: 2,
      interaction_evolution: "Siege commanders maximize War Machine output; Chaos evolution overcharges war machines — +4 ATK but risk explosion (d6: on 1, take 4 damage)"
    },
    {
      name: "Nightfall Orb",
      faction: "nightfang-dominion",
      effects: "Creates 6\" darkness zone — all Nightfang units inside gain +1 DEF (Nocturnal Predators bonus applies); enemies have -1 ATK and -2 RNG",
      risk_instability: "Low",
      activation_cost: 2,
      interaction_evolution: "Knowledge commanders sustain darkness for 3 turns; Chaos evolution deepens darkness — enemies cannot target units inside from outside the zone"
    },
    {
      name: "Apex Predator Fang",
      faction: "nightfang-dominion",
      effects: "Commander undergoes partial Apex transformation: +2 ATK, +2 MOV, Terrifying for 2 turns; melee attacks gain Corruption Spread",
      risk_instability: "High",
      activation_cost: 3,
      interaction_evolution: "Knowledge commanders maintain control during transformation; Chaos evolution is permanent but commander cannot use ranged attacks or play command cards"
    },
  ],
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
