const gameData = {
  rules: {
    version: "0.9 — Shardborne Core Rules",
    overview:
      "Shardborne is a dice-and-card tabletop wargame for 2 players. Armies clash on a battlefield using miniatures or tokens. Combat is resolved with six-sided dice (d6). Only Commanders can play cards from their hand, making the commander your strategic brain — protecting them is critical.",

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
      unit_definition: "Each unit entry represents a single model (or base/token) placed on the battlefield. When you purchase a unit, you place one model with that stat line. To field multiples, purchase the same unit entry multiple times (max 3 copies of any single unit type). War Machines are always single models. Your Commander counts as one unit for minimum/maximum unit count purposes.",
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
            "Generate Command Points (CP) equal to your Commander's Command stat. Any CP remaining from your previous turn is lost (including unspent CP held for Reactions).",
            "Draw 2 cards from your deck (max hand size: 7; discard extras).",
            "You may play any number of Command or Fragment cards (paying CP costs).",
            "Iron Dominion: Calculate Grid Cohesion bonuses for each unit based on nearby allies.",
            "Veilbound: Add each surviving friendly unit's Ritual Flow value to your Flow Pool. Check Flow thresholds.",
            "Veilbound: Declare Stance changes for infantry and cavalry units (free action, before any units move)."
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
            "The active player chooses the order in which their units attack — activate each attacking unit one at a time, resolving its attack completely (including damage and removal of destroyed targets) before activating the next.",
            "Ranged attacks resolve first. Each unit with RNG > 1 may attack one enemy within range and line of sight. Engaged units cannot make ranged attacks (including card-granted ranged attacks, unless the card explicitly says it ignores Engagement).",
            "Melee attacks follow. Each Engaged unit attacks one enemy unit it is Engaged with.",
            "Multiple friendly units may be Engaged with the same enemy — each attacks separately.",
            "Resolve each attack using the Combat Resolution system (see Combat section).",
            "The active player may play Combat-timing cards before or after rolling dice (paying CP costs). The defending player may play Reaction cards.",
            "Units reduced to 0 HP are destroyed and removed immediately. A destroyed unit does NOT get to attack back (it was destroyed before its activation). Choose your activation order wisely.",
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
            "Discard down to max hand size (7) if needed. Unspent CP carries into your opponent's turn (for Reaction Cards) but is lost at the start of your next Command Phase."
          ],
        },
      ],
    },

    combat_resolution: {
      overview:
        "When a unit attacks, roll dice equal to its ATK stat. Each die that meets or exceeds the defender's DEF value scores a hit. Each hit deals 1 damage (reduces HP by 1). Commander cards can modify any step of this process. The defending player may spend CP (retained from their last turn) and RP to play defensive cards during the attacker's combat.",
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
            "Any natural 6 is a Critical Hit — it ALWAYS hits regardless of the target's DEF value (even DEF 7+), deals 2 damage instead of 1, and cannot be negated by normal defense cards. This is the only way to damage units with DEF 7 or higher.",
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
            "Iron Dominion units fight as nodes in a tactical Grid. When units maintain formation, they share bonuses. When isolated, they lose effectiveness. During the Command Phase, calculate Grid status for each unit by counting friendly units within 3\" (War Machines with Grid Anchor count as 2 units for this purpose). Grid status is LOCKED for the rest of the turn once calculated — it does not change if units move apart during the Movement Phase. This rewards careful pre-movement positioning.",
          tiers: [
            { name: "Isolated", units_within_3_inches: 0, bonus: "−1 ATK die. Unit operates alone without Grid support." },
            { name: "Connected", units_within_3_inches: 1, bonus: "No bonus or penalty. Stable but unremarkable." },
            { name: "Grid Active", units_within_3_inches: 2, bonus: "+1 ATK die on all attacks. The Grid feeds tactical data." },
            { name: "Grid Fortified", units_within_3_inches: 3, bonus: "+1 ATK die and +1 DEF. Requires at least 1 Support unit among adjacent allies." }
          ],
          war_machine_rule: "War Machines with the Grid Anchor keyword count as 2 units for Grid Cohesion adjacency calculations. A War Machine adjacent to just 1 other unit counts as if that unit has 2 allies nearby."
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
            "Veilbound infantry and cavalry units can switch stances during the Command Phase (free action, declared before Movement begins). War Machines and Support units cannot use stances. A unit's stance persists until changed.",
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
      },
      emberclaw_warpack: {
        heat_pool: {
          description:
            "Emberclaw armies build Heat — raw draconic energy generated by fire attacks, breath weapons, and drake bonds. Heat fuels devastating abilities but risks Overheat if pushed too far. Heat is tracked with a shared counter or tokens.",
          generation: [
            "Each Emberclaw unit with the Fire keyword generates 1 Heat at the start of your Command Phase.",
            "Each Breath Weapon attack generates 2 Heat after resolving.",
            "Drake Bond pairs generate 1 Heat when they activate within 6\" of each other.",
            "Destroying an enemy unit with a Fire attack generates 1 bonus Heat.",
            "Your Commander generates Heat equal to half their Command stat (rounded up)."
          ],
          spending: [
            "Spend 2 Heat: One friendly unit's attacks gain +1 damage per hit this turn (Superheated Strikes).",
            "Spend 3 Heat: One friendly unit with Breath Weapon may use it a second time this turn.",
            "Spend 4 Heat: All friendly flying units gain +2\" MOV and +1 ATK die this turn (Thermal Updraft).",
            "Spend 5 Heat: Activate Firestorm — choose a 3\" radius area within 12\" of your Commander. All units in the area suffer a 3-dice fire attack. Creates Burning Terrain.",
            "Spend Heat on Fragment activations: Heat replaces Fragment Charges for Emberclaw. Fragment activation costs are paid in Heat at a 1:1 ratio."
          ],
          overheat: {
            description: "If your Heat Pool exceeds 15 at the end of any phase, your army Overheats. Overheat is dangerous but manageable — it rewards aggressive play while punishing recklessness.",
            effects: [
              "Immediately reduce Heat to 10.",
              "All Emberclaw units suffer 1 damage from thermal backlash.",
              "Your Commander cannot play Fragment cards next turn.",
              "All Fire keyword attacks deal +1 damage next turn (the flame burns hotter before dying down)."
            ],
            design_note: "Overheat should happen roughly once per game if you're playing aggressively. It's a speedbump, not a death sentence. Good players ride the edge of 12-14 Heat without tipping over."
          },
          pool_rules: [
            "Heat Pool starts at 0. Maximum capacity is 15 before Overheat triggers.",
            "Heat does NOT carry between turns automatically — at the start of each Command Phase, FIRST lose 3 Heat (the forges cool), THEN generate Heat from all sources. This order matters.",
            "If your Commander is destroyed, lose 5 Heat immediately (loss of coordination).",
            "Heat cannot go below 0."
          ]
        },
        drake_bond: {
          description:
            "Emberclaw riders and their drakes fight as bonded pairs — two bodies, one soul. Drake Bond pairs activate together, share wounds, and become more dangerous when separated by tragedy.",
          rules: [
            "During army building, you may designate up to 3 Drake Bond pairs. Each pair consists of one Rider unit and one Drake unit. Both must be purchased separately.",
            "Bonded pairs activate simultaneously during the Movement and Combat Phases — they use a single activation slot. Move and/or attack both units in any order during that shared activation.",
            "Bonded pairs within 6\" of each other share a wound pool: when one takes damage, the controlling player chooses which unit loses HP.",
            "If one half of a Bond is destroyed, the survivor gains Vengeful: +2 ATK dice, Fearless, and +2\" MOV for the rest of the game. This is permanent and powerful.",
            "Bonded units may use each other's special abilities while within 6\" (e.g., a Rider can use the Drake's Breath Weapon).",
            "A unit can only be part of one Bond. Bonds cannot be reformed during a game."
          ]
        },
        aerial_supremacy: {
          description: "Emberclaw armies dominate the skies. Their flying units have special rules that reward vertical control and punish grounded opponents.",
          rules: [
            "Breath Weapon: Emberclaw units with this keyword make a special attack that hits all units (friend and foe) in a cone template (2\" wide at origin, 4\" wide at 6\" range). Breath attacks ignore cover. Each Breath Weapon can only be used once per turn unless Heat is spent.",
            "Strafing Run: A flying unit that moves at least 6\" in a straight line over enemy units may make a free 2-dice ranged attack against one unit it passed over. This does not count as its normal attack.",
            "Elevated Dive: A flying unit that charges from above gains +2 ATK dice instead of +1 (Diving Charge). The unit lands and becomes a ground unit until its next Movement Phase.",
            "Grounded: If a flying unit takes 3+ damage in a single attack, roll 1d6. On a 1-2, it is Grounded — it loses Fly until the end of its next turn. Grounded flying units suffer -2 MOR.",
            "Anti-Air Vulnerability: Emberclaw flying units suffer -1 DEF against ranged attacks from Elevated terrain or units with the Anti-Air keyword."
          ]
        },
        flame_terrain: {
          description: "Emberclaw can create and exploit Burning Terrain — fire-scarred ground that punishes non-Emberclaw units.",
          rules: [
            "Burning Terrain: Created by Breath Weapons, Firestorm, Fire Enhancement cards, or specific abilities. Lasts 2 turns, then burns out.",
            "Non-Emberclaw units entering or starting their turn in Burning Terrain take 1 damage and suffer -1 MOV.",
            "Emberclaw units treat Burning Terrain as Open Ground and generate +1 Heat when starting their turn in it.",
            "Burning Terrain blocks Stealth — units in Burning Terrain cannot be Stealthed.",
            "At most 6 Burning Terrain markers can exist at once. If a 7th would be placed, the oldest one burns out."
          ]
        }
      },
      thornweft_matriarchy: {
        web_anchor_network: {
          description:
            "The Thornweft fight by weaving a Web across the battlefield — a network of silk anchor points that enable teleportation, grant bonuses, and restrict enemy movement. The Web starts small and grows each turn, rewarding patient positional play.",
          anchor_placement: [
            "The Thornweft player starts the game with 2 Web-Anchor tokens placed during deployment (within deployment zone).",
            "During each Command Phase, the Thornweft player may place 1 new Web-Anchor token within 6\" of any friendly Thornweft unit. The unit must not be Engaged.",
            "Web-Spinner units (Support keyword) may place 1 additional Anchor per turn within 3\" of themselves (free action during Movement Phase).",
            "Maximum Anchors: 4 in Skirmish, 6 in Standard, 10 in Epic.",
            "Web-Anchors are terrain tokens (not units). They cannot be attacked directly, but any unit can spend a full activation in contact with an Anchor to remove it (no movement or attacks that turn).",
            "If a Web-Anchor is removed, any Thornweft unit within 3\" of it becomes Severed (see below) until a new Anchor is placed within range."
          ],
          web_teleport: [
            "Web-Network Teleport: Instead of normal movement, a Thornweft unit within 3\" of a Web-Anchor may teleport to within 3\" of any other friendly Web-Anchor on the table.",
            "A unit that teleports cannot Charge on the turn it arrives (it needs a moment to reorient after translocation).",
            "Only 3 units may teleport per turn (the Web's bandwidth is limited). War Machines cannot teleport.",
            "A unit that teleports counts as having used its full movement — it cannot move further this turn.",
            "Enemy units cannot use Web-Anchors."
          ],
          network_bonuses: {
            description: "Thornweft units gain passive bonuses based on their proximity to the Web-Anchor network. The more developed the Web, the stronger the Thornweft become — but severed units are vulnerable.",
            tiers: [
              { name: "Severed", anchors_within_8: 0, bonus: "-1 ATK die, -1 MOR. The unit is cut off from the Web's guidance. Vulnerable and afraid." },
              { name: "Threaded", anchors_within_8: 1, bonus: "No bonus or penalty. The unit has basic Web contact." },
              { name: "Woven", anchors_within_8: 2, bonus: "+1 DEF. The Web feeds information about incoming threats." },
              { name: "Enthroned", anchors_within_8: 3, bonus: "+1 DEF and +1 ATK die. The unit is deep in the Web's embrace — fully supported." }
            ]
          }
        },
        fate_threads: {
          description:
            "The Thornweft can tug at the threads of fate, forcing enemies to reroll successful dice or granting allies second chances. Fate-Thread Manipulations are limited and precious — use them at the moments that matter most.",
          rules: [
            "The Thornweft player has a Fate-Thread Pool equal to their Commander's Command stat at the start of the game.",
            "Spend 1 Fate-Thread: Force one enemy unit to reroll one successful hit die. The new result stands (no further rerolls).",
            "Spend 1 Fate-Thread: Grant one friendly unit a reroll on one failed hit die. The new result stands.",
            "Spend 2 Fate-Threads: Force an enemy to reroll a Morale check. The new result stands.",
            "Spend 3 Fate-Threads: After an enemy plays a card, negate its effect. The card is still discarded and CP spent.",
            "Fate-Threads do NOT regenerate during a game — once spent, they are gone. They represent the Thornweft's pre-woven destiny unraveling.",
            "If the Thornweft Commander is within 3\" of a Web-Anchor when spending a Fate-Thread, gain +1 bonus: reroll results of 1-2 become rerolls of 1-3 (broader manipulation).",
            "A maximum of 2 Fate-Threads may be spent per turn (the Web can only be pulled so hard)."
          ]
        },
        gossamer_trap: {
          description: "Thornweft terrain manipulation — reality re-woven in silk. Gossamer Traps are terrain pieces placed by Thornweft abilities that restrict enemy movement while empowering Thornweft units.",
          rules: [
            "Gossamer Trap tokens may be placed by specific units, cards, or abilities. Each is a 3\" radius terrain zone.",
            "For enemy units: Gossamer Traps count as Impassable Terrain. Enemies cannot enter or pass through them.",
            "For Thornweft units: Gossamer Traps count as Open Ground. Thornweft units inside gain +1 DEF (Silk Shroud).",
            "An enemy unit that starts its turn within 1\" of a Gossamer Trap (adjacent but outside) suffers -2\" MOV as trailing silk clings to them.",
            "Maximum Gossamer Traps: 3 in Skirmish, 5 in Standard, 8 in Epic. If the maximum is reached, placing a new one removes the oldest.",
            "Gossamer Traps are permanent until removed. An enemy unit can spend a full activation in contact with a Trap edge to destroy it."
          ]
        },
        silk_shroud: {
          description: "All Thornweft units gain Light Cover (+1 DEF vs ranged attacks) when within 6\" of any Web-Anchor or Gossamer Trap. This represents the ambient silk-haze that cloaks the Thornweft's territory.",
          rule: "Passive faction ability — always active when within range. Stacks with actual terrain cover (max +3 DEF from all cover sources combined)."
        },
        fragment_interaction: {
          description: "Thornweft fragments are woven into Web-Anchors. Fragments must be assigned to specific Web-Anchors during deployment. A fragment activates from its Anchor's location.",
          rules: [
            "Each Web-Anchor can hold 1 fragment. Fragments placed at Anchors affect all units within 4\" of that Anchor.",
            "Thornweft do not use Fragment Charges or Heat. Instead, fragment activation costs are paid in Fate-Threads (1 Thread per activation).",
            "Because Fate-Threads are finite, Thornweft fragment activations are few but guaranteed — no instability rolls. The Web absorbs the chaos.",
            "If a Web-Anchor holding a fragment is removed by an enemy, the fragment is lost for the rest of the game."
          ]
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
        "Commander cards are the strategic layer of Shardborne. Only Commanders can play cards, and only if they are alive. Cards cost Command Points (CP) to play.",
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
            "Place 3 objective markers during setup (one at table center, one in each player's half at least 8\" from edges). At the end of the final turn, the player controlling more objectives wins. A unit controls an objective if it is the closest model to that marker with no enemy model closer. If both players have a model equidistant from an objective, neither controls it — it is Contested."
        },
        {
          name: "Attrition",
          description:
            "The game lasts the full turn count. At the end, total the points cost of all enemy units you destroyed. The player who destroyed more points wins. Commander kills award bonus VP equal to the Commander's Command stat."
        },
        {
          name: "King of the Hill",
          description:
            'One objective in the center of the table. At the end of each turn (starting Turn 2), the player with the most total current HP (not maximum) of units within 3\" of the objective scores 1 Victory Point. First to 5 VP wins. If the game ends in a tie, most remaining HP wins.'
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
          "The target number an attacker must roll to score a hit. Higher = harder to damage. Standard range: 2-6. Some legendary units and War Machines have DEF 7+ — these can only be damaged by Critical Hits (natural 6, which always hit regardless of DEF).",
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
          description: "Both players roll 1d6. Higher roll chooses whether to deploy first or second. The player who deploys FIRST takes the first turn (compensating for revealing their positions). The player who deploys second has the information advantage but must react to the opponent's opening move. Reroll ties."
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
          description: "The player who deployed first takes Turn 1. Play proceeds with alternating turns until the victory condition is met or the maximum turn count is reached."
        }
      ]
    },

    // ==========================================
    // LINE OF SIGHT
    // ==========================================
    line_of_sight: {
      overview: "Line of sight (LOS) determines whether a unit can see — and therefore target — another unit. Shardborne uses 'true line of sight' simplified for tabletop play.",
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
          "Note: A unit already within 1-3\" of an enemy cannot Charge (it cannot cover 4\" of straight-line distance). It simply moves into Engagement normally without the Charge bonus. This 'dead zone' is intentional — charges represent a running start.",
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
        "Engaged units cannot make ranged attacks (including card-granted ranged attacks, unless the card explicitly states it ignores Engagement).",
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
        "Commanders may freely refuse a Challenge issued by a non-Commander (e.g. a Specialist) with no penalty. Only a Challenge from another Commander carries the refusal penalty. This prevents cheap expendable units from locking down expensive characters.",
        "If a Commander-vs-Commander Challenge is refused, the challenging Commander gains +2 ATK dice against the refusing Commander for the rest of the battle.",
        "Specialists MUST accept Challenges from other Specialists or Commanders — they cannot refuse. Specialists are duelists by nature; the duel is their purpose.",
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
      overview: "Many units have special Keywords that grant them unique abilities. Here is the complete reference for all Keywords used in Shardborne.",
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
        { name: "Double Strike", description: "May attack twice in a single Combat Phase. Both attacks may target the same or different enemies within range. Resolve each attack fully (including damage and morale checks) before starting the second attack." },
        { name: "Terror Aura", description: "Enemy units within 3\" suffer −1 MOR on Morale checks." },
        { name: "Guardian", description: "When attacked in melee, this unit counterattacks at full ATK before damage is applied." },
        { name: "Ritual Flow", description: "This unit generates the stated amount of Ritual Flow for the Veilbound Flow Pool each Command Phase." },
        { name: "Blood Drain", description: "When this unit destroys an enemy model in melee, it heals 1 HP. Represents the vampiric feeding of the Nightfang Dominion." },
        { name: "Anti-Air", description: "This unit's ranged attacks gain +1 ATK die against targets with the Fly keyword. Targets with Fly suffer -1 DEF against this unit's ranged attacks." },
        { name: "Fire", description: "This unit's attacks have the Fire type. Fire attacks generate 1 Heat for Emberclaw armies, can create Burning Terrain, and deal +1 damage to targets in flammable terrain." },
        { name: "Breath Weapon", description: "This unit can make a special attack using a cone template (2\" wide at origin, 4\" wide at 6\" range). Breath attacks ignore cover and hit all units (friend and foe) in the area. Can only be used once per turn unless Heat is spent (Emberclaw) or a card allows additional uses." },
        { name: "Corruption Spread", description: "This unit applies Corruption tokens to enemies hit in melee. The number of tokens applied equals the unit's corruption_spread stat (typically 1-4). See Corruption system for threshold effects." },
        { name: "Thrall", description: "This unit is a mindless undead servant of the Nightfang Dominion. Thralls are immune to Morale effects (they have no will to break) but cannot benefit from Commander Aura bonuses. Cards referencing 'Thrall' affect these units." },
        { name: "Expendable", description: "When this unit is destroyed, it does not count toward Hunger Pool kills for the enemy. The unit was considered disposable by its own army. No Injury Roll in campaign mode." },
        { name: "Web-Spinner", description: "This Support unit may place 1 additional Web-Anchor token per turn within 3\" of itself as a free action during the Movement Phase. Thornweft Matriarchy only." },
        { name: "Transport", description: "This War Machine can carry Infantry units. It has a Transport Capacity (usually 3-5). Infantry may embark/disembark during Movement Phase. Embarked units cannot act but are protected. If the Transport is destroyed, embarked units take 1 damage each." },
        { name: "Mobile Fire", description: "This unit may Attack and then Move (reversing the normal activation order). Useful for shoot-and-scoot tactics." },
        { name: "Non-Combatant", description: "This unit has ATK 0 and cannot make attacks. It cannot be forced to attack in melee. If Engaged by an enemy, it may Disengage freely without sacrificing its activation (it offers no meaningful resistance). Non-Combatants exist to provide support abilities, not to fight." },
        { name: "Massive", description: "This unit is enormous. It counts as Towering (can be seen and targeted from anywhere on the table). It cannot benefit from cover. It blocks line of sight for smaller units behind it." },
        { name: "Legendary", description: "Only one unit with this keyword may be included in your army. Legendary units represent unique, lore-defining war machines that are the pinnacle of their faction's power." },
        { name: "Corruption Aura", description: "All enemy units within the stated radius gain 1 Corruption token at the start of each of this unit's activations. Nightfang Dominion only." },
        { name: "Terrifying", description: "Enemy units within 3\" must pass a Morale check (2d6 vs MOR) at the start of their activation or suffer -1 ATK die this turn. Functionally similar to Terror Aura but triggers a check rather than a passive penalty." },
        { name: "Immovable", description: "This unit cannot move. It is placed during deployment and remains stationary for the entire game. Unlike Immobile (which allows choosing move OR attack), Immovable units can never move at all. They should have MOV: 0. They CAN still attack and use abilities normally if they have ATK > 0." },
        { name: "Void Resolve", description: "This unit automatically passes all Morale checks (same as Fearless). Additionally, the controlling player may spend 1 Ritual Flow to grant Void Resolve to one adjacent friendly unit for 1 turn. Veilbound Shogunate only." },
        { name: "Indirect Fire", description: "This unit can fire over intervening models and terrain (it does not need direct line of sight). The attack follows a high arc. Cannot target units in melee engagement." },
        { name: "Armor Piercing", description: "This unit's attacks ignore 1 point of the target's DEF. Stacks with other DEF-reducing effects." },
        { name: "Swarm", description: "Multiple models count as 1 unit for game purposes. Swarm units cannot be targeted by Blast effects (they disperse). They always take only 1 damage from any single source (they reform around losses). Their ATK represents collective attacks from many small creatures." },
        { name: "Heavy Armor", description: "This unit has reinforced protection. It reduces all incoming damage by 1 (minimum 1). However, it suffers -1 MOV penalty due to the weight." },
        { name: "Devastating Charge", description: "When this unit Charges (moves 4\"+ in a straight line into melee), it gains +2 ATK dice instead of the normal +1 from Charge. If the charge attack destroys the target, this unit may make a free 3\" follow-up move." },
        { name: "Veteran", description: "This unit may reroll one failed ATK die per attack. Represents combat experience and superior training." },
        { name: "Skirmish", description: "This unit may shoot and then move (reversing the normal sequence). After attacking, it may move up to half its MOV value. The unit cannot use Skirmish and Charge in the same turn." },
        { name: "Terror", description: "Enemy units must pass a Morale check when this unit Charges them. If failed, the target unit suffers -1 ATK die for this combat round. Different from Terror Aura (passive aura) and Terrifying (activation-triggered check)." },
        { name: "Fire Resistant", description: "This unit takes half damage (rounded down, minimum 1) from Fire-type attacks and ignores Burning Terrain penalties. It does not generate Heat for the enemy when hit by Fire attacks." },
        { name: "Fire Immune", description: "This unit takes no damage from Fire-type attacks and is completely unaffected by Burning Terrain. Stronger than Fire Resistant — total immunity to all fire effects." },
        { name: "Stubborn", description: "This unit may reroll failed Morale checks once. If the reroll also fails, the unit is Routed as normal." },
        { name: "Drake Bond", description: "This unit is bonded to a drake. When one member of the bonded pair activates, the other may activate immediately afterward (shared activation). If the bonded partner is destroyed, this unit suffers -1 to all stats for the rest of the game. Emberclaw Warpack only." },
        { name: "Pack Tactics", description: "When 2 or more friendly units with Pack Tactics attack the same enemy unit in the same Combat Phase, each gains +1 ATK die. Nightfang Dominion only." },
        { name: "Corruption", description: "This unit interacts with the Corruption token system. It can apply, benefit from, or trigger Corruption threshold effects. See Corruption system rules for token thresholds (3: -1 MOV, 6: -1 ATK, 9: -1 DEF, 12: unit destroyed). Nightfang Dominion faction keyword." },
        { name: "Shadow Meld", description: "This unit gains Stealth while in terrain or shadow areas. When attacking from Shadow Meld, the attack applies 1 additional Corruption token to the target. Nightfang Dominion only." },
        { name: "Frenzy", description: "This unit must Charge the nearest enemy if possible. While in Frenzy, it gains +2 ATK dice but cannot disengage voluntarily. A Commander within 6\" can suppress Frenzy for one turn." },
        { name: "Venom Strike", description: "This unit's melee attacks apply Venom tokens to the target. Venom token thresholds: 3 tokens = -1 MOV, 5 tokens = -1 ATK, 7 tokens = target takes 1 damage per End Phase. Venom tokens are removed by Heal/Repair or at a rate of 1 per End Phase. Thornweft Matriarchy only." },
        { name: "Web-Walk", description: "This unit ignores movement penalties from Web terrain and Web-Anchor effects. It treats all Web-covered areas as open ground. Thornweft Matriarchy only." },
        { name: "Wall-Climber", description: "This unit can move vertically up walls and cliff faces at normal speed. It does not need to go around terrain obstacles. Does not grant Fly — the unit still follows surfaces." },
        { name: "Silk-Anchored", description: "While within 3\" of a friendly Web-Anchor, this unit gains +1 DEF and +1 MOR. The web network provides stability and confidence. Thornweft Matriarchy only." },
        { name: "Fate-Bound", description: "This unit automatically passes all Morale checks (similar to Fearless). Narratively, the Fate-Weavers have seen this unit's thread in the Great Web and know its destiny is not to flee. Thornweft Matriarchy only." },
        { name: "Overcharge", description: "This unit may spend 1 Fragment Charge to gain +2 ATK dice for one attack. After the attack, roll d6: on 1-2, the unit suffers 1 damage from mechanical stress. Iron Dominion only." },
        { name: "Stance", description: "Veilbound infantry and cavalry units can switch between combat stances during the Command Phase (free action, before movement). Each stance provides a different stat trade-off. See Veilbound faction rules for available stances. War Machines and Support units cannot use stances." },
        { name: "Commander Bond", description: "This unit gains +1 ATK or +1 DEF (chosen when deployed) while within 6\" of its faction's Commander. The bonus is lost if the Commander is destroyed." },
        { name: "Brace", description: "As a reaction to being Charged, this unit may Brace. A Bracing unit gains +1 DEF against the charging attack but cannot move on its next activation." },
        { name: "Hold Ground", description: "This unit gains +1 DEF when it does not move during its activation. The bonus lasts until the start of its next activation." },
        { name: "Detect Hidden Units", description: "This unit reveals enemy Stealth units within 6\" at the start of each Command Phase. Revealed units lose Stealth until they re-enter concealment conditions." },
        { name: "Relay Commands", description: "Friendly units within 6\" of this unit are considered within the Commander's Aura range, even if the Commander is farther away. Extends effective command range." },
        { name: "Fragment User", description: "This unit can activate Fragments as if it were a Commander (normally only Commanders can activate Fragments). It still costs the normal Fragment Charge." },
        { name: "Dodge", description: "When this unit is hit by a melee attack, roll d6: on 5+, the attack misses entirely. Only one Dodge roll per attack." },
        { name: "Unyielding", description: "This unit cannot be pushed, displaced, or moved by enemy abilities or effects. It holds its ground against all forced movement but can still move normally on its own activation." }
      ]
    },

    // ==========================================
    // SCENARIOS & MISSIONS
    // ==========================================
    scenarios: {
      overview: "Beyond standard victory conditions, Shardborne includes narrative scenarios that create asymmetric, thematic battles. Use these for variety or as part of a campaign.",
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

    // ==========================================
    // FRAGMENT INTERACTION BY FACTION
    // ==========================================
    fragment_system: {
      overview: "Every faction interacts with Fragments differently. Fragments are ancient power sources embedded in the battlefield — raw, volatile, and transformative. Each faction has developed its own method to harness fragment energy, reflecting their culture and combat philosophy. This ensures fragments feel different in every matchup rather than being a generic resource.",
      universal_rules: [
        "Fragments are selected during army building and assigned to your army. Fragment limits by battle size: 2 (Skirmish), 3 (Standard), 5 (Epic).",
        "Each Fragment has an effect, an activation cost, and an instability level (Low / Medium / High / Very High).",
        "The activation cost and instability risk are modified by your faction's fragment interaction method (see below).",
        "Fragments cannot be transferred between factions mid-game. They are bound to the army that brought them.",
        "Fragment effects are resolved during the Command Phase unless a card specifies otherwise.",
        "A fragment can only be activated once per turn unless a card or ability allows additional activations."
      ],
      faction_methods: {
        iron_dominion: {
          resource: "Fragment Charges",
          generation: "Units near War Machines or Support units generate 1 charge/turn. Tech and precision.",
          activation: "Spend charges equal to the fragment's cost tier (Low=1, Medium=2, High=3, Very High=4).",
          instability: "Roll 1d6 after activation. Instability threshold varies by fragment. Backfire deals 1 damage to activating unit and all within 2\".",
          flavor: "The Dominion treats fragments as machines to be calibrated. Reliable but occasionally volatile."
        },
        veilbound_shogunate: {
          resource: "Ritual Flow (from Flow Pool)",
          generation: "Units generate Flow each Command Phase; builds across turns via escalating thresholds.",
          activation: "Spend Flow equal to fragment cost tier × 2 (Low=2, Medium=4, High=6, Very High=8). Higher cost but NO instability.",
          instability: "None — Ritual Flow purifies fragment energy through spiritual discipline. Veilbound never suffer fragment backfires.",
          flavor: "The Shogunate channels fragments through prayer and ritual. Slower to activate but perfectly controlled."
        },
        nightfang_dominion: {
          resource: "Hunger Pool kills",
          generation: "The Hunger Pool grows from enemy kills. Fragments feed on death.",
          activation: "Fragments activate for free once Hunger Pool thresholds are reached (5/10/15). Each threshold permanently unlocks 1 free fragment activation per Command Phase for the rest of the game (e.g., at 15+ kills, you get 3 free activations every turn).",
          instability: "Nightfang fragments always apply 1 Corruption token to the nearest friendly unit when activated (the Blight hungers for all flesh).",
          flavor: "Nightfang don't choose when to use fragments — the fragments awaken when enough blood has been spilled."
        },
        emberclaw_warpack: {
          resource: "Heat Pool",
          generation: "Fire attacks, Breath Weapons, and Drake Bonds generate Heat. Aggressive play fuels the forge.",
          activation: "Spend Heat equal to fragment cost tier (Low=1, Medium=2, High=3, Very High=4). Same costs as Iron Dominion but different generation.",
          instability: "Roll 1d6: on a 1, the fragment ignites — deal 2 damage to all non-Emberclaw units within 3\" (enemies AND allies of other factions in multiplayer). Emberclaw are immune to their own flame.",
          flavor: "Dragonfire forges fragment energy into raw destruction. The Warpack's fragments burn hotter than anyone else's."
        },
        thornweft_matriarchy: {
          resource: "Fate-Threads",
          generation: "Finite pool set at game start (Commander's Command stat). Does not regenerate.",
          activation: "Spend 1 Fate-Thread per activation, regardless of fragment cost tier. Cheap per-use but LIMITED total uses.",
          instability: "None — the Web absorbs chaos. Thornweft fragment activations are 100% reliable but rare.",
          flavor: "The Matriarchy pre-weaves fragment destiny before battle. Each activation was foreseen; each is inevitable."
        },
        design_note: "This system ensures fragment play feels radically different per faction: Iron Dominion is steady and industrial, Veilbound is slow-building and safe, Nightfang is kill-triggered and automatic, Emberclaw is aggressive and fiery, Thornweft is scarce but guaranteed. When designing new factions, give each a unique resource that generates differently and modifies fragment activation cost/risk."
      }
    },

    // ==========================================
    // REACTION SYSTEM
    // ==========================================
    reactions: {
      overview: "The Reaction system gives the non-active player meaningful decisions during their opponent's turn. This prevents the 'sit and watch' problem common in I-go-you-go wargames. Reactions are limited to prevent the game from bogging down — each player gets a small number of interrupts per opponent turn.",
      reaction_points: {
        description: "At the start of each of your opponent's turns, you receive Reaction Points (RP) based on your Commander's Command stat. RP are spent to take Reaction actions during your opponent's turn. Unspent RP are lost when your turn begins.",
        generation: "RP = Commander's Command stat ÷ 2 (rounded up). Typical range: 2-4 RP per opponent turn.",
        loss: "If your Commander is destroyed, you receive only 1 RP per opponent turn (last-ditch survival instinct)."
      },
      reaction_actions: [
        {
          name: "Overwatch",
          cost: "1 RP",
          trigger: "An enemy unit moves within range of one of your ranged units.",
          effect: "Your ranged unit immediately makes a ranged attack against the moving unit with -1 ATK die (hasty shot). This does not prevent the unit from attacking normally on your turn.",
          restriction: "Each unit can Overwatch only once per opponent turn."
        },
        {
          name: "Defensive Stance",
          cost: "1 RP",
          trigger: "One of your units is targeted by an attack.",
          effect: "The targeted unit gains +1 DEF against this attack only. Declare before the attacker rolls.",
          restriction: "Cannot be used if the unit is Shaken."
        },
        {
          name: "Counter-Charge",
          cost: "2 RP",
          trigger: "An enemy unit Charges one of your units.",
          effect: "Your charged unit meets the enemy halfway — both units gain the Charge bonus (+1 ATK die). Neither unit counts as flanked regardless of angle.",
          restriction: "Your unit must not be Engaged with any other enemy."
        },
        {
          name: "Brace for Impact",
          cost: "1 RP",
          trigger: "One of your units is about to be hit by a Blast or AoE attack.",
          effect: "Your unit goes prone: -1 to incoming damage (minimum 0 per hit) but the unit cannot move on its next activation.",
          restriction: "Only Infantry units can brace."
        },
        {
          name: "Play a Reaction Card",
          cost: "1 RP + card's CP cost (paid from CP retained from your last turn)",
          trigger: "As specified on the card (cards with 'Any Phase' or 'Reaction' timing).",
          effect: "Play a card from your hand during your opponent's turn. You must pay the card's CP cost from CP you retained from your last turn (CP carries through your opponent's turn and is only lost at the start of your next Command Phase).",
          restriction: "You must have both RP and CP available. Maximum 2 Reaction Cards per opponent turn."
        },
        {
          name: "Emergency Retreat",
          cost: "2 RP",
          trigger: "One of your units is about to be attacked in melee.",
          effect: "Your unit immediately disengages and moves up to 3\" away from the attacker. The attacker's activation is not wasted — they may redirect to another target within range or forfeit their attack.",
          restriction: "Cannot be used if the unit is surrounded (enemies on 3+ sides within 2\")."
        }
      ],
      timing_rules: [
        "Reactions are declared BEFORE the triggering action resolves (e.g., Defensive Stance before dice are rolled, Overwatch before the move completes).",
        "Only one Reaction may be declared per triggering action. No stacking Reactions on the same event.",
        "If both players want to use an ability at the same time (e.g., a Reaction Card vs. an attacking card), the defending player's Reaction resolves first (defender's advantage).",
        "Reactions cannot trigger other Reactions. No chain reactions.",
        "Faction-specific abilities that trigger 'when attacked' are NOT Reactions — they are passive abilities and do not cost RP. They resolve alongside (not instead of) Reactions."
      ],
      design_note: "The Reaction system is intentionally simple — 2-4 interrupts per opponent turn, from a short menu. This solves 'I just sit here for 10 minutes' without creating the complexity nightmare of unlimited interrupt chains. If players want a faster-paced experience, see Alternating Activation variant in Multiplayer rules."
    },

    // ==========================================
    // STATUS EFFECTS REFERENCE
    // ==========================================
    status_effects: {
      overview: "Consolidated reference for all status effects in Shardborne. Bring this page to the table. Each effect has clear start/end conditions so there's never ambiguity about what a status does or when it ends.",
      effects: [
        {
          name: "Shaken",
          icon: "😰",
          effect: "-1 ATK die (minimum 1). Cannot Charge.",
          applied: "Failed Morale check (roll 2d6 > MOR after taking damage).",
          removed: "Rally in End Phase: roll 2d6 ≤ MOR when the unit was NOT damaged this turn. Or by card/ability.",
          stacking: "Does NOT stack. A Shaken unit that fails another Morale check stays at -1, not -2.",
          notes: "Shaken represents wavering confidence — the unit fights poorly but is still on the field."
        },
        {
          name: "Routed",
          icon: "🏃",
          effect: "Unit is immediately destroyed and removed from play.",
          applied: "Morale check result exceeds MOR by 3 or more.",
          removed: "N/A — unit is gone.",
          stacking: "N/A",
          notes: "Routing represents complete collapse. The unit breaks and flees the battlefield. In campaign mode, Routed units are NOT subject to the Injury Roll table — they automatically return at full stats next game (they fled, not died). However, a Routed unit cannot be fielded in the very next game (recovering morale — skip one game, then return)."
        },
        {
          name: "Engaged",
          icon: "⚔️",
          effect: "Unit cannot make ranged attacks. Cannot move away without Disengaging (sacrifice turn). Must attack an Engaged enemy in melee.",
          applied: "A unit moves within 1\" of an enemy, or an enemy moves within 1\" of it.",
          removed: "All enemies within 1\" are destroyed, or the unit successfully Disengages.",
          stacking: "A unit can be Engaged with multiple enemies simultaneously.",
          notes: "Engagement is the melee lock. Getting stuck in melee when you don't want to be is a core tactical challenge."
        },
        {
          name: "Burning",
          icon: "🔥",
          effect: "Takes 1 damage at the start of each of its activations. -1 DEF (fire disrupts coordination).",
          applied: "Fire attacks, Burning Terrain, specific Emberclaw abilities.",
          removed: "Roll 1d6 at end of each of your turns: on 4+, the fire goes out. Or spend a full activation doing nothing (stop, drop, roll).",
          stacking: "Does NOT stack. Already-Burning units do not take double fire damage.",
          notes: "Emberclaw's signature debuff. Dangerous over time but not immediately lethal."
        },
        {
          name: "Corrupted",
          icon: "☠️",
          effect: "Varies by Corruption token count: 3 tokens = -1 ATK/-1 MOR; 6 tokens = -2 ATK/-1 DEF/-2 MOR; 9 tokens = -3 ATK/-2 DEF/-3 MOR plus roll d6 at start (1-2: cannot act).",
          applied: "Nightfang melee hits (Corruption Spread stat), Corruption cards, destroyed corrupted units spreading tokens.",
          removed: "Only by specific cards or abilities. Corruption is persistent and terrifying.",
          stacking: "Tokens accumulate up to 9 maximum. Thresholds at 3/6/9.",
          notes: "Nightfang's attrition weapon. Even units you don't kill become useless under enough Corruption."
        },
        {
          name: "Grounded",
          icon: "📍",
          effect: "Unit with Fly loses the Fly keyword temporarily. -2 MOR (disoriented by the fall). Treated as a ground unit.",
          applied: "Flying unit takes 3+ damage in a single attack and rolls 1-2 on 1d6.",
          removed: "End of the unit's next turn (it takes off again).",
          stacking: "Does NOT stack.",
          notes: "Anti-air counterplay. Gives ground armies a way to deal with Emberclaw flyers."
        },
        {
          name: "Staggered",
          icon: "💫",
          effect: "-2 MOV and -1 ATK die. Unit cannot Charge.",
          applied: "Crushing Blow cards, specific heavy-weapon attacks.",
          removed: "End of the affected unit's next turn (they recover their footing).",
          stacking: "Does NOT stack.",
          notes: "A short-duration debuff representing being knocked back or dazed by a heavy hit."
        },
        {
          name: "Immovable",
          icon: "🪨",
          effect: "Unit cannot be pushed, displaced, or forced to retreat by any effect. Cannot be moved by enemy abilities.",
          applied: "Specific cards (Immovable Wall, Endurance Fragment, etc.).",
          removed: "End of the turn it was applied, unless stated otherwise.",
          stacking: "N/A — binary state.",
          notes: "A defensive buff. Good for holding objectives."
        },
        {
          name: "Stealthed",
          icon: "👻",
          effect: "Cannot be targeted by ranged attacks from more than 6\" away. Does not appear on opponent's threat assessment until revealed.",
          applied: "Stealth keyword (innate), cards (Stealth Field, Veil Shroud), or abilities.",
          removed: "The unit makes an attack, moves within 3\" of an enemy, or an ability reveals it (Veil Sight, Marrowlight). Also removed by Burning Terrain.",
          stacking: "N/A — binary state.",
          notes: "Stealth is about positioning, not invisibility. Once you attack, you're visible."
        },
        {
          name: "Vengeful",
          icon: "😤",
          effect: "+2 ATK dice, Fearless, +2\" MOV. Permanent for the rest of the game.",
          applied: "Emberclaw Drake Bond — when one half of a bonded pair is destroyed.",
          removed: "Does not end. Permanent.",
          stacking: "N/A — can only trigger once (you only have one Bond partner).",
          notes: "Emberclaw's grief-fueled rage. Losing a drake is devastating but the survivor becomes terrifying."
        },
        {
          name: "Severed",
          icon: "✂️",
          effect: "-1 ATK die, -1 MOR. Unit is cut off from faction network.",
          applied: "Thornweft units with no Web-Anchor within 8\". Affects only Thornweft units.",
          removed: "A Web-Anchor is placed or moved within 8\" of the unit, or the unit moves within 8\" of an existing Anchor.",
          stacking: "N/A — binary state.",
          notes: "The cost of the Thornweft's Web dependency. Destroy their Anchors and their army crumbles."
        },
        {
          name: "Fearless",
          icon: "🦁",
          effect: "Automatically passes all Morale checks. Cannot be Shaken or Routed.",
          applied: "Keyword (innate), cards, abilities, Vengeful status.",
          removed: "Permanent if innate; end of turn if granted by a card.",
          stacking: "N/A — binary state.",
          notes: "The gold standard of morale immunity. Some elite units have it innately; others earn it."
        }
      ]
    },

    // ==========================================
    // WAR MACHINE RULES
    // ==========================================
    war_machines: {
      overview: "War Machines are the heaviest assets on the battlefield — siege engines, titans, golems, and mechanical monstrosities. They are powerful but slow, expensive, and subject to unique risks. This section consolidates all War Machine-specific rules.",
      core_rules: [
        "War Machines are always single models — you cannot buy duplicates of the same War Machine.",
        "War Machines cannot be Engaged in melee by Infantry or Scout units — those units are too small to threaten them. However, a War Machine CAN move into contact with Infantry/Scouts and attack them normally (it is stomping ants). The restriction is one-directional: Infantry cannot initiate Engagement with a War Machine, but the War Machine can initiate against them. Only Cavalry, Specialist, other War Machines, and Commanders can Engage a War Machine in melee from their side.",
        "War Machines with the Immobile keyword must choose: Move OR Attack each turn. Not both.",
        "War Machines cannot Charge (too slow to build momentum). They gain no Charge bonus.",
        "War Machines are Grid Anchors for Iron Dominion (count as 2 units for Grid adjacency).",
        "War Machines cannot use Web-Network Teleport (Thornweft — too large for the silk roads).",
        "War Machines cannot change Stance (Veilbound — they are too rigid for spiritual posturing).",
        "War Machines cannot benefit from Blood Tithe (Nightfang — they have no blood to give).",
        "War Machines CAN generate and benefit from faction resources (Heat, Fragment Charges, Flow, etc.) unless specifically noted."
      ],
      malfunction: {
        description: "War Machines are complex and temperamental. When pushed too hard or damaged, they can malfunction. Malfunction rules add risk to these powerful units without making them feel unreliable.",
        trigger: "A War Machine must roll for Malfunction when: (1) it is reduced to half HP or below for the first time, (2) a card or ability causes it to Overclock/push beyond limits, or (3) a critical hit is scored against it.",
        resolution: [
          "Roll 1d6 when a Malfunction trigger occurs.",
          "1: Catastrophic Failure — The War Machine cannot attack or use abilities next turn. It may only move (limping).",
          "2-3: Minor Fault — The War Machine suffers -1 ATK die until repaired (Repair ability or card clears this).",
          "4-6: Systems Nominal — No malfunction. The machine holds together.",
          "A War Machine that has already malfunctioned this game rolls Malfunction checks at -1 (cumulative wear)."
        ]
      },
      destruction_effects: {
        description: "When a War Machine is destroyed, it doesn't just disappear — it collapses, explodes, or leaves wreckage. This creates mid-battle terrain and tactical opportunities.",
        rules: [
          "When destroyed, a War Machine leaves a Wreckage token at its position. Wreckage counts as Difficult Terrain and Heavy Cover.",
          "If the War Machine had the Unstable keyword, it explodes on death: all units within 2\" take 2 damage.",
          "Wreckage persists for the rest of the game. It can be a defensive position for surviving infantry.",
          "Iron Dominion War Machine wreckage generates 1 Fragment Charge per turn for ID units within 3\" (residual energy).",
          "Emberclaw War Machine wreckage becomes Burning Terrain for 2 turns, then becomes normal wreckage."
        ]
      },
      transport: {
        description: "Some War Machines have the Transport keyword, allowing them to carry Infantry units across the battlefield.",
        rules: [
          "A Transport War Machine has a Transport Capacity (usually 3-5 models).",
          "Infantry units may embark onto a Transport by moving into base contact during the Movement Phase (free action). The embarked unit is removed from the table.",
          "During the Transport's Movement Phase, it may Disembark units: place them within 3\" of the Transport. Disembarked units may act normally this turn.",
          "If a Transport is destroyed, all embarked units are placed within 3\" and each takes 1 damage (crash landing). They may not act this turn.",
          "Embarked units cannot attack, be targeted, or use abilities. They are safe but inactive."
        ]
      }
    },

    // ==========================================
    // CAMPAIGN RULES
    // ==========================================
    campaign: {
      overview: "Campaign mode transforms Shardborne from one-off battles into multi-session narratives. Commanders gain experience, evolve, and unlock new abilities. Units carry damage between battles. Choices have lasting consequences. A campaign is typically 5-10 games.",
      campaign_setup: {
        steps: [
          "Each player chooses a Commander and faction. These are locked for the entire campaign.",
          "Each player starts with a Campaign Roster — their available unit pool between games. Roster size equals the largest agreed battle size × 1.5 (e.g., 300-point games → 450-point roster).",
          "Commanders start at Level 1 with 0 XP.",
          "Each player begins with 3 Fragments in their collection. New fragments may be earned through missions.",
          "Designate a Campaign Master (can be one of the players or a neutral party) to track results and run narrative events.",
          "Agree on campaign length: Short (5 games), Standard (8 games), Long (12 games)."
        ]
      },
      xp_table: {
        overview: "XP is awarded after each battle based on your performance. XP is earned by your Commander regardless of victory — even a brilliant defeat teaches something. Good play is rewarded more than steamrolling.",
        awards: [
          { action: "Win the battle", xp: 50 },
          { action: "Lose the battle", xp: 25 },
          { action: "Draw", xp: 35 },
          { action: "Enemy Commander killed", xp: 25 },
          { action: "Your Commander survived", xp: 15 },
          { action: "Each objective controlled at game end", xp: 10 },
          { action: "Each enemy unit destroyed", xp: 5 },
          { action: "Each friendly unit surviving at game end", xp: 3 },
          { action: "Activated a fragment (once per game)", xp: 10 },
          { action: "Won with fewer total points than opponent", xp: 20 },
          { action: "Completed a scenario-specific objective", xp: 15 },
          { action: "First blood (destroyed the first enemy unit)", xp: 5 }
        ],
        design_note: "XP is deliberately generous for losers (25 XP) and rewards underdogs (20 bonus XP for winning with fewer points). This prevents snowballing — a player who loses early games levels up fast and claws back. It also discourages sandbagging."
      },
      leveling: {
        overview: "Commanders level up by accumulating XP. Each level grants a skill choice from the Skill Tree. At Level 10, the commander undergoes Evolution — a permanent transformation based on their skill path.",
        xp_requirements: [
          { level: 2, total_xp: 50, note: "First skill choice" },
          { level: 3, total_xp: 120, note: "" },
          { level: 4, total_xp: 200, note: "" },
          { level: 5, total_xp: 300, note: "Unlock 2 new cards for card pool" },
          { level: 6, total_xp: 420, note: "" },
          { level: 7, total_xp: 560, note: "Unlock 2 new cards for card pool" },
          { level: 8, total_xp: 720, note: "" },
          { level: 9, total_xp: 900, note: "Unlock 2 new cards for card pool" },
          { level: 10, total_xp: 1100, note: "EVOLUTION — choose Knowledge, Chaos, or Hybrid based on your skill path" }
        ]
      },
      skill_tree: {
        overview: "At each level (2-10), you choose one skill from three paths: Knowledge, Chaos, or Tactical. Each skill grants a permanent passive bonus to your Commander. At Level 10, your Evolution path is determined by which path you chose the most skills from. If tied, you become Hybrid.",
        paths: {
          knowledge: {
            theme: "Control, precision, defense, and reliability. Knowledge commanders reduce randomness and out-think their opponents.",
            skills: [
              { name: "Calculated Strike", effect: "Once per turn, reroll up to 2 ATK dice on any one friendly unit's attack." },
              { name: "Tactical Foresight", effect: "+1 RP (Reaction Point) during opponent's turn." },
              { name: "Efficient Command", effect: "+1 CP per turn." },
              { name: "Precision Aura", effect: "Friendly units within 6\" of Commander crit on 5+ instead of only 6." },
              { name: "Fortified Mind", effect: "Commander gains +1 DEF and is immune to Morale penalties." },
              { name: "Analytical Engine", effect: "At the start of each game, look at the top 3 cards of your opponent's deck and return them in any order." },
              { name: "Master Strategist", effect: "Once per game, you may take 2 consecutive turns (skip your opponent's turn once). Declare at start of your Command Phase." },
              { name: "Knowledge Ascendant", effect: "Unlock all Knowledge-locked cards in your card pool. All Fragment activations have no instability risk." },
              { name: "Supreme Coordination", effect: "All friendly units within 8\" of Commander may activate in any order you choose (ignore normal activation sequence)." }
            ]
          },
          chaos: {
            theme: "Aggression, risk, power, and unpredictability. Chaos commanders hit hard but accept collateral damage.",
            skills: [
              { name: "Reckless Assault", effect: "Once per turn, give one friendly unit +3 ATK dice for one attack. That unit takes 1 damage after." },
              { name: "Blood Frenzy", effect: "When your Commander kills an enemy unit in melee, it gains +1 ATK die permanently (max +3 over base)." },
              { name: "Unstable Power", effect: "Gain +2 CP per turn, but roll 1d6 at start of turn: on a 1, lose all CP this turn." },
              { name: "Chaotic Surge", effect: "Once per game, double ALL damage dealt by ALL units (yours and your opponent's) for one full turn." },
              { name: "Terror Presence", effect: "Commander gains Terror Aura: enemy units within 3\" suffer -1 MOR." },
              { name: "Volatile Core", effect: "When your Commander is damaged, it deals 1 damage to all units within 2\" (friend and foe). Includes your own units." },
              { name: "Death or Glory", effect: "If your Commander is reduced to 1 HP, it gains +4 ATK dice and Fearless permanently (no going back)." },
              { name: "Chaos Ascendant", effect: "Unlock all Chaos-locked cards in your card pool. All your Fragment activations trigger twice (but instability roll applies to both)." },
              { name: "Annihilation Aura", effect: "Once per game, every unit within 6\" of Commander (friend and foe) takes damage equal to Commander's ATK stat." }
            ]
          },
          tactical: {
            theme: "Mobility, adaptability, and versatility. Tactical commanders can pivot strategies mid-game.",
            skills: [
              { name: "Quick Deployment", effect: "One friendly unit may deploy via alternative deployment (6\" from any table edge) instead of normal deployment." },
              { name: "Adaptive Tactics", effect: "Once per turn, discard 1 card to draw 2 cards." },
              { name: "Field Promotion", effect: "Once per game, if your Commander dies, designate a Specialist unit as your new Commander. It gains Command 3 and may play your remaining cards." },
              { name: "Forced March", effect: "All friendly Infantry units gain +1\" MOV permanently." },
              { name: "Overwatch Expert", effect: "Your Overwatch Reactions are at full ATK dice instead of -1." },
              { name: "Combat Medic", effect: "During the End Phase, heal 1 HP to all friendly units within 6\" of Commander that did NOT attack this turn." },
              { name: "Combined Arms", effect: "When both a ranged and melee unit attack the same target in the same turn, both gain +1 ATK die." },
              { name: "Tactical Ascendant", effect: "Unlock all Tactical-locked cards in your card pool. Draw 3 cards per turn instead of 2." },
              { name: "Perfect Plan", effect: "Once per game, during your Command Phase, you may rearrange the positions of up to 3 of your units anywhere on the table (not within 1\" of enemies)." }
            ]
          }
        },
        skill_selection_rules: [
          "At each level-up, choose ONE skill from any of the three paths. You are NOT locked to one path.",
          "You cannot take the same skill twice.",
          "Some skills are marked as 'Level 5+' or 'Level 8+' — you must be that level to select them. Skills listed 1-3 in each path are always available; 4-6 require Level 5+; 7-9 require Level 8+.",
          "At Level 10, count your skills: if you have more Knowledge skills, you become Knowledge Evolution. More Chaos = Chaos Evolution. More Tactical = Tactical Evolution. If tied, you become Hybrid (gains a weaker version of both tied paths' Ascendant skills).",
          "Evolution is permanent and irreversible. It defines your Commander for the rest of the campaign."
        ]
      },
      between_games: {
        overview: "After each battle, resolve these steps in order. This is where campaign management happens — treating injuries, rebuilding your roster, and planning for the next fight.",
        steps: [
          {
            step: 1,
            name: "Award XP",
            description: "Calculate XP using the XP table. Add it to your Commander's running total. Resolve any level-ups."
          },
          {
            step: 2,
            name: "Injury Rolls",
            description: "Each unit that was destroyed during the battle must roll on the Injury Table. This determines if they recover or suffer lasting penalties for the next game. Roll 1d6: 1 = Unit dies permanently (removed from roster); 2 = Crippled (unit has -1 HP and -1 ATK next game, then recovers); 3-4 = Walking Wounded (unit starts next game at -1 HP, then fully heals); 5-6 = Full Recovery (unit returns at full stats)."
          },
          {
            step: 3,
            name: "Commander Injury",
            description: "If your Commander was destroyed, roll on the Commander Injury Table: 1 = Grievous injury — Commander misses the next game. A substitute Commander (Level 1, Command 3, no skills) leads your army; 2-3 = Shaken confidence — Commander starts next game at -1 Command; 4-6 = Battle-hardened — Commander recovers fully and starts next game at +1 HP (this bonus does not stack)."
          },
          {
            step: 4,
            name: "Resupply",
            description: "You may purchase new units for your roster using Resupply Points. Each player earns Resupply Points: 10 for a win, 15 for a loss, 12 for a draw. 1 Resupply Point buys 1 army-building point of units. This 'catch-up' system gives losers more rebuilding resources."
          },
          {
            step: 5,
            name: "Fragment Discovery",
            description: "After each game, roll 1d6: on a 5-6, you discover a new random Fragment (draw from the Fragment pool). The winner may choose which fragment; the loser draws randomly. Max Fragments in your collection: 5 (Skirmish), 7 (Standard), 10 (Epic)."
          },
          {
            step: 6,
            name: "Record & Prepare",
            description: "Update your Campaign Sheet with current XP, level, skills, roster, fragments, and win/loss record. Select your army for the next game from your roster (you don't have to bring everything). Agree on the next scenario."
          }
        ]
      },
      commander_death_campaign: {
        overview: "Losing your Commander in a campaign game is painful but not campaign-ending. Shardborne is designed so you can recover.",
        rules: [
          "Your Commander is never permanently killed in campaign mode (they are too narratively important). Even a roll of 1 on the Commander Injury Table means they miss ONE game, not all future games.",
          "When your Commander misses a game due to injury, you play with a Substitute Commander: Level 1, Command 3, generic card pool (20 basic cards from all types), no skills. This is intentionally weakened to make Commander survival matter — but still allows you to play.",
          "Your injured Commander still earns 10 XP (minimum) from the game they missed (they're recovering and reflecting).",
          "If somehow your Commander dies in every single game (extremely unlikely), after 3 consecutive injuries, they gain a permanent +1 DEF (scar tissue and caution)."
        ]
      },
      campaign_endings: {
        description: "Campaigns end based on the agreed length. At the final game, total campaign scores to determine the Campaign Victor.",
        scoring: [
          "Each win: 3 Campaign Points",
          "Each draw: 1 Campaign Point",
          "Each loss: 0 Campaign Points",
          "Bonus: +1 Campaign Point for each game where your Commander survived",
          "Bonus: +1 Campaign Point if your Commander reached Level 10 (Evolution)",
          "Bonus: +2 Campaign Points for the Commander with the most total XP earned (regardless of wins)",
          "The player with the most Campaign Points is the Campaign Victor."
        ]
      }
    },

    // ==========================================
    // MULTIPLAYER & TEAM BATTLES
    // ==========================================
    multiplayer: {
      overview: "Shardborne is designed for 2 players but supports team and free-for-all play with minor modifications. These rules handle turn order, alliances, and cross-faction interactions for 3-6 players.",
      team_battles: {
        description: "2v2 or 3v3 battles. Each player brings a full army with their own Commander. Teams share a victory condition.",
        rules: [
          "Each player builds a separate army list using standard army building rules. Teammates CAN be different factions.",
          "Team members share a table side / deployment zone, splitting it evenly between them.",
          "Turn order alternates between teams, not individual players. Within a team, players decide their own activation order.",
          "Cross-Faction Synergy: Allied Commanders' Auras do NOT stack (you don't get +2 MOR for two Commanders nearby). Only the closest allied Commander's Aura applies.",
          "Cards can only affect your own units, not your teammate's. Exception: cards that say 'friendly' affect all allied units; cards that say 'your' only affect yours.",
          "Each player draws from their own deck and spends their own CP independently.",
          "Victory/defeat is determined as a team. If one player's Commander dies, that player loses cards — but their teammate can still play cards normally.",
          "Points budget: each player on a team gets 75% of the agreed total (e.g., in a 300-point 2v2, each player gets 225 points). This prevents teams from simply doubling the units on the table."
        ]
      },
      free_for_all: {
        description: "3-4 players, each for themselves. Pure chaos. Play time increases significantly — recommended for experienced groups.",
        rules: [
          "Each player deploys in a table corner (4 players) or along table edges (3 players, each gets one-third of one long edge and the adjacent short edge).",
          "Turn order: Roll 1d6 at the start of each round. Highest goes first; reroll ties. Turn order changes every round (this prevents first-turn advantage from becoming permanent).",
          "Backstab Rule: When you attack a unit that is currently Engaged with someone else's unit, you gain +1 ATK die (opportunistic strike). This incentivizes waiting for others to fight and then striking — which mirrors free-for-all politics.",
          "King-Making Prevention: If a player is eliminated (all units and Commander destroyed), their remaining card hand is shuffled and dealt evenly to all surviving players. This prevents one player's elimination from solely benefiting the player who killed them.",
          "Reduced army sizes: Each player gets 60% of the agreed total (e.g., 300-point FFA → 180 points each). Games should still be 6 or fewer turns.",
          "Victory: Last Commander standing wins. If multiple Commanders survive at turn limit, most enemy points destroyed wins."
        ]
      },
      alternating_activation_variant: {
        description: "An optional rule for ANY player count. Instead of each player completing a full turn, players alternate activating single units. This drastically reduces downtime and makes reactive play the norm. Recommended for casual play and new players.",
        rules: [
          "Remove the Movement Phase and Combat Phase as separate phases. Replace with an Activation Phase.",
          "Players alternate activating one unit at a time. When you activate a unit, it may Move and then Attack (or Attack and then Move if it has the Mobile Fire keyword).",
          "Command Phase remains intact: both players complete their Command Phase simultaneously at the start of each round (generate CP, draw cards, play Command Phase cards).",
          "End Phase remains intact: resolve morale, fragment effects, repairs, etc. simultaneously.",
          "Reaction Points are not used in this variant (the constant alternation already provides interactivity).",
          "Cards with 'Movement Phase' or 'Combat Phase' timing can be played during the activation of the relevant unit.",
          "Turn order within a round: the player with fewer surviving units activates first each round (the underdog gets to react). If tied, roll off."
        ]
      }
    },

    // ==========================================
    // ANTI-FRUSTRATION & BALANCE DESIGN
    // ==========================================
    balance_design: {
      overview: "Shardborne is built to avoid common wargame frustrations. These aren't optional rules — they are baked into the core experience. If something feels unfair, check here first.",
      first_turn_restrictions: {
        description: "Turn 1 is a positioning turn, not an alpha-strike turn. This prevents the player who goes first from crippling the opponent before they've had a chance to play.",
        rules: [
          "Turn 1: No Charging. Units may move but cannot declare Charges.",
          "Turn 1: Ranged attacks suffer -1 ATK die (shaking off deployment fog). This doesn't apply to Artillery.",
          "Turn 1: No Fragment activations (the battlefield hasn't destabilized enough yet). Cards are NOT restricted on Turn 1.",
          "These restrictions apply to BOTH players on their respective first turns."
        ]
      },
      underdog_mechanics: {
        description: "Players who are losing get small, meaningful boosts. This creates comeback potential without gifting them the win.",
        rules: [
          "Desperation Rally: A player who has lost 50% or more of their starting army points gains +1 CP per turn (their Commander fights harder when backed into a corner).",
          "Last Stand Protocol: If you have 3 or fewer units remaining (including Commander), all surviving units gain +1 MOR (they know it's do-or-die).",
          "Underdog RP: The player with fewer surviving total army points gains +1 RP during the opponent's turn (heightened vigilance).",
          "These bonuses are checked at the start of each turn and apply immediately."
        ]
      },
      commander_death_safety: {
        description: "Losing your Commander is devastating but not game-ending. This prevents the feel-bad of having 60% of your army alive but being unable to do anything meaningful.",
        rules: [
          "When your Commander dies, you retain your current hand of cards — you just can't play them or draw new ones.",
          "Your units still fight at full effectiveness. They don't forget how to swing a sword because their boss died.",
          "You still generate 1 RP per opponent turn (basic survival instinct).",
          "In Annihilation mode, Commander death IS the loss condition — that's the point. In other modes, losing your Commander is a huge setback but the game continues.",
          "Design philosophy: Commander death should feel like losing your queen in chess — catastrophic and often decisive, but not an automatic forfeit."
        ]
      },
      rules_disputes: {
        description: "Measurement arguments and rules-lawyering kill fun. These rules exist to prevent them.",
        rules: [
          "The 1-Inch Rule: If a measurement is close enough to argue about (within ~0.5\"), it counts in favor of the active player. Don't argue over millimeters — this is a game, not engineering.",
          "LOS Disputes: If LOS is ambiguous, each player rolls 1d6. Higher roll decides. This is final for that situation.",
          "Rules Conflicts: If two rules contradict, the more specific rule wins. If both are equally specific, the active player chooses which applies.",
          "Timing Ties: If both players want to use an ability at the exact same time, the defending player resolves first.",
          "Spirit of the Game: If players agree that a rule interaction produces a result that's clearly broken or unfun, they may jointly house-rule it for that game and report it for FAQ consideration."
        ]
      },
      anti_stalling: {
        description: "Preventing players from running out the clock by hiding or avoiding engagement.",
        rules: [
          "Turn Limit: All games have a maximum turn count (Skirmish: 5, Standard: 6, Epic: 7). If neither player has won by the last turn, use the Attrition tiebreaker (most enemy points destroyed).",
          "Passive Play Penalty: Starting Turn 3, if a player has not made any attacks or moved any unit toward an enemy for 2 consecutive turns, their opponent gains +2 VP at end of game (Attrition tiebreaker adjustment).",
          "Shrinking Battlefield (Optional): For tournament play, at the start of Turn 4, all table edges push inward by 6\". Units caught outside the new boundary must immediately move to the nearest legal position. This forces engagement in EP+ games."
        ]
      },
      new_faction_design_guidelines: {
        description: "Guidelines for designing new factions that maintain the game's balance philosophy. Each faction should feel radically different to play without being objectively stronger.",
        principles: [
          "One Resource, One Passive: Each faction gets exactly ONE unique resource/pool (Heat, Corruption, Flow, etc.) and ONE passive ability (Nocturnal Predators, Drake Bond, Silk Shroud, etc.). This is the ceiling.",
          "Mirror Weakness: Every faction strength must have a corresponding weakness. Emberclaw are dominant in the air but vulnerable to massed ranged fire. Thornweft are untouchable on a completed web but slow to set up. Nightfang snowball kills but have poor early-game output. Iron Dominion are steady but predictable. Veilbound are unstoppable late-game but weak early.",
          "Fragment Interface: Every new faction must define how it interacts with Fragments — what resource pays for activation, what the instability risk is, and how it thematically fits.",
          "No Auto-Wins: No faction ability should guarantee an outcome. Everything should be interaction-based (can be countered, limited, or mitigated by opponent actions).",
          "Distinct Clock: Each faction should have a natural 'clock' — a pace at which they want the game to end. Rush factions want short games; control factions want long games. This inherent tension creates dynamic matchups.",
          "Three-Mechanic Maximum: A faction's unique rules (not counting universal rules like morale, movement, etc.) should fit on ONE reference card. If you need more than 3 faction-specific subsystems, you've over-designed.",
          "Playtest Metric: A new faction is balanced when it wins roughly 40-60% of games against every existing faction in internal playtesting. Outside that range, adjust."
        ]
      }
    },

    // ==========================================
    // QUICK REFERENCE
    // ==========================================
    quick_reference: {
      turn_summary: [
        "1. COMMAND PHASE — Generate CP (= Commander's Command stat; any CP from last turn is lost). Draw 2 cards (max hand 7). Play Command/Fragment cards. Unspent CP carries into opponent's turn for Reactions.",
        "2. MOVEMENT PHASE — Activate each unit. Move up to MOV stat in inches. Declare Charges (4\"+ straight = +1 ATK). Engaged units must Disengage (sacrifice turn) to leave.",
        "3. COMBAT PHASE — Activate attack units one at a time (you choose order). Ranged first (RNG > 1, not Engaged). Then Melee (Engaged units). Roll d6 = ATK stat; hits on ≥ DEF; 6 = crit (always hits, 2 dmg). Destroyed units don't attack back.",
        "4. END PHASE — Morale (damaged units roll 2d6 > MOR = Shaken; MOR+3 = Rout). Rally (Shaken + no dmg: 2d6 ≤ MOR). Fragment effects. Repair. Check victory. Discard to 7."
      ],
      combat_cheat_sheet: {
        hit: "Roll d6 ≥ target's DEF (6 always hits as crit even vs DEF 7+)",
        crit: "Natural 6 = 2 damage, unblockable",
        flanking: "+1 ATK die (from side)",
        rear: "+2 ATK dice (from behind)",
        charging: "+1 ATK die (moved 4\"+ straight into melee)",
        light_cover: "+1 DEF vs ranged",
        heavy_cover: "+2 DEF vs ranged",
        shaken: "-1 ATK die",
        commander_aura: "+1 MOR within 6\""
      },
      morale_quick: {
        test: "Damaged this turn → roll 2d6",
        shaken: "Result > MOR → Shaken (-1 ATK die)",
        rout: "Result > MOR+3 → Routed (destroyed)",
        rally: "End Phase, not damaged, roll 2d6 ≤ MOR → remove Shaken",
        commander_death: "All units check at MOR-2 immediately"
      },
      faction_resource_summary: {
        iron_dominion: "Fragment Charges — generate near War Machines/Support. Spend to activate Fragments. Instability roll after.",
        veilbound: "Ritual Flow — builds over turns via Flow Pool thresholds (5/12/20/30). Powers abilities and fragments. No instability.",
        nightfang: "Hunger Pool — grows from kills (thresholds 5/10/15). Auto-activates fragments. Corruption spreads via melee.",
        emberclaw: "Heat Pool — builds from fire attacks/abilities. Max 15 before Overheat. Loses 3/turn. Powers fragments and fire abilities.",
        thornweft: "Fate-Threads — finite (= Command stat). Spend for rerolls and fragment activations. No instability. Non-renewable."
      },
      card_timing_reference: {
        command_phase: "Command cards, Fragment cards",
        movement_phase: "Command cards, Tech cards with movement timing",
        combat_phase: "Tactical cards (pre-roll or post-roll), Tech cards with combat timing",
        any_phase: "Tech cards with 'Any Phase', Reaction cards (cost RP + CP on opponent's turn)",
        end_phase: "Repair/Heal abilities, end-of-turn Tech cards"
      }
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
    "Nightfang Siege Command": {
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
    "Nightfang Silent Kill": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Your commander or 1 Stealth unit within 12\" may make an immediate melee attack against an adjacent enemy. If attacking from Stealth, gain +3 ATK for this attack. If the target is destroyed, the attacker re-enters Stealth."
    },
    "Nightfang Fragment Surge": {
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
    "Nightfang Precision Strike": {
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

    // ===================== EMBERCLAW WARPACK CARDS =====================

    // --- Scorchcaller Vex ---
    "Coordinated Dive": {
      type: "command",
      cp: 3,
      timing: "Movement Phase",
      effect: "Select up to 3 friendly flying units within 12\" of your commander. Each may immediately make a free dive move (up to their MOV) toward a single enemy unit. If 2+ divers reach engagement range, they each gain +1 ATK die."
    },
    "Breath Barrage": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect: "All friendly drake units within 12\" of your commander may use their Breath Weapon this turn even if they already attacked. Each breath attack gains +1 ATK die. Breath attacks this turn ignore cover."
    },
    "Drake Formation": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "All friendly flying units within 8\" of your commander gain +1 ATK die and +1 DEF when within 3\" of another friendly flying unit. Lasts until End Phase."
    },
    "Thermal Positioning": {
      type: "tech",
      cp: 1,
      timing: "Movement Phase",
      effect: "One friendly flying unit within 8\" gains +4\" MOV this turn by riding thermal updrafts. If the unit ends its move at a higher elevation than its target, it gains +1 ATK die."
    },
    "Flame Amplification": {
      type: "fragment",
      cp: 2,
      timing: "Combat Phase",
      effect: "Activate a fire fragment: all friendly units with Breath Weapon within 8\" gain +2 ATK dice on breath attacks this turn. Breath attacks create burning terrain at their impact point."
    },
    "Sky Strike": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect: "One friendly flying unit makes a diving attack with +3 ATK dice. If the attack destroys the target, the unit may immediately fly 6\" to safety without provoking reactions."
    },

    // --- Flamewarden Kora ---
    "Phoenix Rally": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "All friendly units within 8\" of your commander heal 2 HP. Units that were Shaken rally immediately. If any unit was at 1 HP, it gains +1 ATK die until End Phase from renewed vigor."
    },
    "Flame Renewal": {
      type: "command",
      cp: 2,
      timing: "End Phase",
      effect: "Choose up to 3 friendly units within 8\" of your commander. Each heals 1 HP. One destroyed friendly Infantry unit may be revived at 1 HP within 3\" of your commander (once per game)."
    },
    "Cauterize Wounds": {
      type: "tech",
      cp: 1,
      timing: "Any Phase",
      effect: "One friendly unit within 6\" of your commander immediately heals 2 HP. The healed unit gains Fire Resistant until End Phase. May be played as a reaction when a unit takes damage."
    },
    "Fireheart Blessing": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Choose up to 3 friendly units within 8\". Each gains +1 DEF and Phoenix Spark this turn. Phoenix Spark: if the unit would be destroyed, roll d6 — on 5+, it survives with 1 HP instead."
    },
    "Cleansing Fire": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect: "Activate a fire fragment: all friendly units within 6\" are cleansed of all negative status effects (Shaken, Corruption tokens, debuffs). Each cleansed unit heals 1 HP."
    },
    "Burning Martyr": {
      type: "tactical",
      cp: 2,
      timing: "Any Phase",
      effect: "Your commander takes 3 damage. In return, all friendly units within 6\" heal 2 HP and gain +1 ATK die until End Phase. If your commander would be destroyed by this, she survives at 1 HP (once per game)."
    },

    // --- Ashborn Ryx ---
    "Pyroclasm": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect: "Choose a point within 10\" of your commander. All units (friend and foe) within 3\" suffer a 5-dice fire attack. Creates burning terrain in the area. Emberclaw units with Fire Resistant take half damage."
    },
    "Unbonded Fury": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "All friendly Unbonded and Infantry units within 8\" of your commander gain +2 ATK dice and Fearless until End Phase. These units may use fragment abilities without instability risk this turn."
    },
    "Fragment Ignition": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Activate up to 2 fragments within 8\" of your commander simultaneously. Both gain +1 to their effects. Roll d6 per fragment: on 1, the fragment takes 1 instability damage."
    },
    "Fire Shaping": {
      type: "tech",
      cp: 1,
      timing: "Any Phase",
      effect: "Reshape one burning terrain zone within 12\" of your commander: move it up to 4\" in any direction, or expand its radius by 2\". Enemy units caught in the reshaped zone take 1 fire damage."
    },
    "Unstable Overcharge": {
      type: "fragment",
      cp: 2,
      timing: "Combat Phase",
      effect: "Overcharge a fragment within 8\": one friendly unit gains +4 ATK dice for one attack. After the attack, roll d6: on 1-2, the unit takes 2 damage from fragment instability. On 6, the fragment detonates harmlessly for +1 bonus damage."
    },
    "Flash Fire": {
      type: "tactical",
      cp: 1,
      timing: "Combat Phase",
      effect: "One friendly Pyromancer or fire-wielding unit makes an immediate ranged attack at RNG 8\" with +2 ATK dice. The attack creates a 2\" patch of burning terrain at the target's location."
    },

    // --- Wyrmlord Tzarak ---
    "Cataclysm Dive": {
      type: "command",
      cp: 4,
      timing: "Movement Phase",
      effect: "Your commander's Wyrm makes a devastating landing: move up to full MOV, then all enemy units within 4\" of the landing point suffer a 4-dice attack and are pushed 2\" away. The area becomes difficult terrain."
    },
    "Wyrm's Command": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "All friendly drake and War Machine units within 12\" of your commander gain +1 ATK die and +1 MOR until End Phase. Enemy units within 6\" of your commander must pass a Morale check or become Shaken."
    },
    "Earthquake Landing": {
      type: "tech",
      cp: 2,
      timing: "Movement Phase",
      effect: "When your commander or a friendly War Machine lands or charges this turn, all enemy units within 3\" of the impact point suffer -2 MOV and -1 ATK die next turn from seismic shock."
    },
    "Ancient Power": {
      type: "tech",
      cp: 3,
      timing: "Command Phase",
      effect: "Your commander gains +3 ATK dice and +2 DEF until End Phase. All friendly units within 6\" gain +1 MOR from the Wyrm's awe-inspiring presence. Your commander may not move this turn."
    },
    "Titan's Flame": {
      type: "fragment",
      cp: 3,
      timing: "Combat Phase",
      effect: "Activate a fire fragment: your commander's next breath attack gains +4 ATK dice and its cone extends by 6\". The breath creates burning terrain along its entire length. Fragment loses 2 charges."
    },
    "Devastating Presence": {
      type: "tactical",
      cp: 2,
      timing: "Command Phase",
      effect: "All enemy units within 8\" of your commander must make an immediate Morale check at -2. Units that fail become Shaken and suffer -1 ATK die until End Phase. Terrifying units are immune."
    },

    // --- Skydancer Lyss ---
    "Triple Dive": {
      type: "command",
      cp: 3,
      timing: "Movement Phase",
      effect: "Your commander and up to 2 friendly flying units within 6\" each make a free dive move of up to 8\" toward different enemy units. Each gains +1 ATK die if they reach engagement range."
    },
    "Airstream Riding": {
      type: "tech",
      cp: 1,
      timing: "Movement Phase",
      effect: "All friendly flying units within 8\" of your commander gain +3\" MOV this turn. Units that move their full MOV gain +1 DEF vs ranged attacks until End Phase (dodge bonus from speed)."
    },
    "Evasive Maneuvers": {
      type: "tech",
      cp: 1,
      timing: "Any Phase",
      effect: "One friendly flying unit within 8\" gains +2 DEF against the next attack targeting it. If the attack misses entirely, the unit may immediately move 3\". May be played as a reaction."
    },
    "Velocity Shards": {
      type: "fragment",
      cp: 2,
      timing: "Movement Phase",
      effect: "Activate a speed fragment: up to 3 friendly units within 8\" gain +4\" MOV this turn. Units that move 10\"+ this turn gain +1 ATK die from momentum on their next attack."
    },
    "Hit and Run": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect: "One friendly unit makes an attack with +1 ATK die. After resolving the attack (hit or miss), the unit may immediately move up to 6\" away from the target. This move does not provoke reactions."
    },

    // --- Embersmith Torvan ---
    "Forge Blessing": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Choose up to 4 friendly units within 8\" of your commander. Each gains +1 ATK die from enhanced weapons until End Phase. Units with the Fragment keyword also gain +1 DEF from reinforced equipment."
    },
    "Equipment Distribution": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "All friendly units within 10\" of your commander gain one of the following (your choice per unit): +1 ATK die, +1 DEF, or +1\" MOV. The bonus lasts until End Phase."
    },
    "Fragment Forging": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Forge a fragment into equipment: one friendly unit within 6\" permanently gains +1 ATK die for the rest of the game. The fragment loses 1 charge. Only one unit may benefit per game."
    },
    "Weapon Enhancement": {
      type: "tech",
      cp: 1,
      timing: "Combat Phase",
      effect: "One friendly unit within 6\" of your commander gains +2 ATK dice and Armor Piercing (reduce target DEF by 1) for one attack this turn."
    },
    "Stabilization Field": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect: "Create a stabilization field within 6\" of your commander: all fragments within the field have no instability risk this turn. All friendly units within 4\" gain +1 DEF from fragment-reinforced shielding."
    },
    "Supply Line": {
      type: "tactical",
      cp: 1,
      timing: "Command Phase",
      effect: "Draw 1 extra card. One friendly Support unit within 8\" may immediately use its repair or enhancement ability as a free action. Generate 1 CP."
    },

    // --- Pyroclaw Drenna ---
    "Berserk Charge": {
      type: "command",
      cp: 2,
      timing: "Movement Phase",
      effect: "Your commander and up to 2 friendly melee units within 6\" gain +4\" MOV and +2 ATK dice on charge attacks this turn. These units suffer -1 DEF until End Phase from reckless aggression."
    },
    "Flame Aura": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Your commander emanates searing heat: all enemy units within 3\" take 1 fire damage at the start of each phase this turn. Friendly Fire Resistant units within 3\" gain +1 ATK die from the heat."
    },
    "Immolation Field": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Create a 4\" radius immolation zone centered on your commander. All non-Fire Resistant units entering or starting their turn in the zone take 1 fire damage. Lasts 2 turns. Your commander is immune."
    },
    "Fire  Touch": {
      type: "tech",
      cp: 1,
      timing: "Combat Phase",
      effect: "One friendly melee unit's attacks deal +1 fire damage per hit this turn. Targets hit gain a burn token: they take 1 additional fire damage at the start of their next activation."
    },
    "Overburn": {
      type: "fragment",
      cp: 2,
      timing: "Combat Phase",
      effect: "Overcharge your commander with fire: gain +4 ATK dice for one attack this turn. After the attack, your commander takes 2 fire damage from internal overheating. Creates burning terrain at the target's location."
    },
    "Raging Inferno": {
      type: "tactical",
      cp: 3,
      timing: "Combat Phase",
      effect: "Your commander makes a devastating melee attack against all enemy units within 2\" simultaneously, rolling full ATK dice against each. Each hit target catches fire (1 damage per turn for 2 turns)."
    },

    // --- Skywatcher Orin ---
    "Perfect Intel": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Reveal all enemy Stealth and hidden units within 18\" of your commander. All friendly units gain +1 ATK die against revealed targets this turn. You may look at the top 2 cards of the enemy's deck."
    },
    "Ambush Coordination": {
      type: "command",
      cp: 3,
      timing: "Movement Phase",
      effect: "Select up to 3 friendly units within 12\" of your commander. Each may immediately redeploy anywhere on the table more than 8\" from enemies. These units gain +2 ATK dice on their first attack this turn."
    },
    "Stealth Flight": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect: "One friendly flying unit within 8\" gains Stealth until it attacks or ends its move within 3\" of an enemy. The unit also gains +2\" MOV from high-altitude repositioning."
    },
    "Reconnaissance": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect: "Choose one enemy unit visible to your commander. Until End Phase, all friendly units gain +1 ATK die when attacking that target. If the target moves, your commander tracks its new position."
    },
    "Vision Shards": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect: "Activate a vision fragment: gain true sight within 18\" — ignore Stealth, cover, and concealment. All friendly ranged units gain +1 ATK die and +2\" RNG this turn."
    },

    // --- Clutchmaster Vayne ---
    "Clutch Call": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Spawn 1d3 Fledgling Swarm units (2 pts each, full HP) within 6\" of your commander. Fledglings activate immediately this turn. If a friendly Drake Handler is within 6\", spawn 1 additional Fledgling."
    },
    "Hatchling Swarm": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "All friendly Fledgling and Swarm units within 12\" of your commander gain +1 ATK die, +1 MOV, and Pack Tactics (gain +1 ATK die when 2+ swarm units are engaged with the same target) until End Phase."
    },
    "Rapid Maturation": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "One friendly Fledgling Swarm unit within 8\" of your commander immediately matures: it gains +2 ATK dice, +1 DEF, and +3 HP permanently. Can only be used once per Fledgling."
    },
    "Nest Protection": {
      type: "tech",
      cp: 1,
      timing: "Any Phase",
      effect: "One friendly unit within 6\" of your commander gains +2 DEF until End Phase. If the unit is a Fledgling or Swarm, it also gains Fearless. May be played as a reaction when a swarm unit is attacked."
    },
    "Growth Acceleration": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect: "Activate a growth fragment: all friendly Fledgling and Swarm units within 8\" gain +1 ATK die and +1 HP permanently. Fragment generates 1 additional Fledgling Swarm within 3\"."
    },
    "Protective Fury": {
      type: "tactical",
      cp: 2,
      timing: "Any Phase",
      effect: "When a friendly Fledgling or Swarm unit within 8\" of your commander is destroyed, your commander and all friendly drake units within 6\" gain +2 ATK dice until End Phase from protective rage. May be played as a reaction."
    },

    // --- Cinderfist Brok ---
    "Breach and Burn": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect: "Your commander makes a siege attack against a terrain piece, fortification, or heavily-armored unit within 2\". The attack deals double damage and ignores all DEF bonuses from cover and armor. Creates difficult terrain."
    },
    "Armor Shatter": {
      type: "command",
      cp: 2,
      timing: "Combat Phase",
      effect: "Choose one enemy unit within 4\" of your commander. That unit permanently loses 1 DEF (minimum 2) as its armor is shattered. All friendly units attacking it gain +1 ATK die this turn."
    },
    "Fragment Fist": {
      type: "tech",
      cp: 2,
      timing: "Combat Phase",
      effect: "Your commander's next melee attack gains +3 ATK dice and ignores all DEF bonuses. On a critical hit (6), the target is knocked back 3\" and loses 1 additional DEF."
    },
    "Structure Collapse": {
      type: "tech",
      cp: 2,
      timing: "Combat Phase",
      effect: "Destroy one terrain piece (wall, barricade, fortification) within 4\" of your commander. All units within 2\" of the collapsed structure take 2 damage. Creates difficult terrain in a 3\" radius."
    },
    "Impact Shards": {
      type: "fragment",
      cp: 2,
      timing: "Combat Phase",
      effect: "Activate a force fragment: your commander's melee attacks this turn deal +2 damage per hit and have Armor Piercing 2 (reduce target DEF by 2). On a kill, the shockwave pushes enemy units within 2\" back 2\"."
    },
    "Demolition Focus": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect: "All friendly units within 8\" of your commander gain Siege keyword this turn: their attacks deal double damage to terrain, fortifications, and War Machines. +1 ATK die against targets with DEF 5+."
    },

    // --- Flameheart Syrax ---
    "Divine Vision": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Your commander receives a prophetic vision: you may look at the top 3 cards of your deck and rearrange them in any order. All friendly units within 8\" may reroll one failed die this turn."
    },
    "Tyrant's Wrath": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect: "Channel the Crimson Tyrant's fury: choose one enemy unit within 12\" of your commander. It suffers a 5-dice divine fire attack that ignores cover and DEF bonuses. If it destroys the target, all friendly units gain +1 MOR."
    },
    "Prophecy Weaving": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Your commander enters a prophetic trance: all friendly units within 10\" gain the ability to reroll one attack die each this turn. Your commander cannot move or attack this turn."
    },
    "Morale Dominance": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "All friendly units within 8\" of your commander gain +2 MOR and auto-pass Morale checks this turn. Enemy units within 8\" suffer -1 MOR. Shaken friendly units rally immediately."
    },
    "Divine Channeling": {
      type: "fragment",
      cp: 3,
      timing: "Command Phase",
      effect: "Activate a divine fragment: your commander gains +2 to all base stats until End Phase. All friendly units within 6\" gain +1 ATK die and Fearless. Roll d6: on 1, the vision overwhelms — commander takes 2 damage."
    },
    "Faithful Fury": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect: "All friendly units within 6\" of your commander that have Fearless or auto-passed Morale this turn gain +2 ATK dice for their next attack. Units with the Faithful keyword gain +3 ATK dice instead."
    },

    // --- Skullcrusher Threx ---
    "Blood Challenge": {
      type: "command",
      cp: 2,
      timing: "Combat Phase",
      effect: "Issue a formal Challenge to an enemy Commander or Specialist within 8\". The challenge must be accepted. Your commander gains +3 ATK dice and crits on 5+ for the duel. The loser's army suffers -1 MOR."
    },
    "Melee Superiority": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "All friendly melee units within 8\" of your commander gain +1 ATK die and +1 DEF in melee combat this turn. Charging units gain an additional +1 ATK die. Enemy units cannot disengage from these units."
    },
    "Claw and Fang": {
      type: "tech",
      cp: 2,
      timing: "Combat Phase",
      effect: "Your commander's drake attacks with both claws and fangs: make 2 separate melee attacks this turn, each with full ATK dice. The second attack gains +1 ATK die if the first scored at least 1 hit."
    },
    "Close Combat Mastery": {
      type: "tech",
      cp: 1,
      timing: "Combat Phase",
      effect: "One friendly melee unit within 6\" gains +2 ATK dice and may reroll all misses once. If every die hits, deal +2 bonus damage from perfect technique."
    },
    "Fury Shards": {
      type: "fragment",
      cp: 2,
      timing: "Combat Phase",
      effect: "Activate a fury fragment: your commander gains Frenzy (+3 ATK dice) until End Phase. Each kill heals 1 HP from bloodlust. If your commander takes damage while frenzied, gain +1 additional ATK die."
    },

    // --- Tidescar the Exiled ---
    "Forbidden Power": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Tap into corrupted fragment energy: your commander gains +4 ATK dice and all attacks deal +1 damage until End Phase. At End Phase, your commander takes 2 damage from corruption backlash."
    },
    "Corrupt the Flame": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "All fire attacks by friendly units within 8\" gain Corruption this turn: targets hit gain 2 Corruption tokens in addition to normal damage. Corrupted burning terrain applies 1 Corruption token to units entering it."
    },
    "Dark Fragment Mastery": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "All fragment activations within 8\" of your commander have their effects doubled this turn. Roll d6 per activation: on 1, the fragment becomes corrupted and deals 1 damage to all units within 2\"."
    },
    "Corruption Spread": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Choose one enemy unit with Corruption tokens within 12\". Spread 2 Corruption tokens to each enemy unit within 3\" of it. Units reaching 4+ tokens suffer -1 ATK die and -1 DEF until cleansed."
    },
    "Tainted Ember": {
      type: "fragment",
      cp: 2,
      timing: "Combat Phase",
      effect: "Activate a corrupted fire fragment: one friendly unit's attacks deal +2 damage and apply 2 Corruption tokens per hit this turn. The unit takes 1 damage from handling tainted energy."
    },
    "Sacrificial Gambit": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect: "Sacrifice one friendly unit within 4\" of your commander (destroy it). Your commander gains ATK dice equal to the destroyed unit's remaining HP (max +6). This bonus lasts for one attack only."
    },

    // ===================== THORNWEFT MATRIARCHY CARDS =====================

    // --- Loom-Mother Vethiss ---
    "Grand Weaving": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Place up to 3 Web-Anchor tokens within 12\" of your commander. All friendly units within 3\" of any Web-Anchor gain +1 DEF and may teleport to any other Web-Anchor as a free move action this turn."
    },
    "Network Expansion": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Connect all Web-Anchor tokens within 18\" of your commander into a network. All friendly units standing on the network gain +1 ATK die and +2\" MOV. Enemy units on the network suffer -2\" MOV."
    },
    "Anchor Deployment": {
      type: "tech",
      cp: 1,
      timing: "Movement Phase",
      effect: "Place 1 Web-Anchor token within 6\" of any friendly unit. The Anchor counts as Light Cover. Friendly units within 2\" may use it as a teleport node during subsequent turns."
    },
    "Web-Surge": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "All Web-Anchor tokens within 12\" pulse with energy: friendly units within 3\" of any Anchor heal 1 HP. Enemy units within 3\" of any Anchor suffer -1 ATK die until End Phase."
    },
    "Fate-Thread Amplification": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect: "Activate a fate fragment: all friendly units within 8\" gain 1 additional Fate-Thread this turn. Fate-Threads may be spent to force enemy rerolls or grant friendly rerolls."
    },
    "Mass Redeployment": {
      type: "tactical",
      cp: 3,
      timing: "Movement Phase",
      effect: "Up to 4 friendly units within 12\" of your commander may instantly teleport to any Web-Anchor token on the battlefield. Each teleported unit gains +1 ATK die on its next attack this turn."
    },

    // --- Thread-Seer Kythara ---
    "Fate Shatter": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect: "Choose one enemy unit within 12\". Force it to reroll ALL successful attack dice on its next attack. Additionally, its Morale stat counts as 2 lower until End Phase as its fate-threads unravel."
    },
    "Thread Manipulation": {
      type: "command",
      cp: 2,
      timing: "Any Phase",
      effect: "Spend 1 Fate-Thread: force one enemy to reroll any single die result, OR grant one friendly unit a reroll on any single die. May be played as a reaction. Draw 1 card."
    },
    "Probability Storm": {
      type: "tech",
      cp: 3,
      timing: "Command Phase",
      effect: "Create a 4\" probability storm centered on a point within 10\". All dice rolled within the storm have their results inverted (1→6, 2→5, 3→4, etc.) until End Phase. Affects friend and foe alike."
    },
    "Reroll Cascade": {
      type: "tech",
      cp: 2,
      timing: "Combat Phase",
      effect: "One friendly unit may reroll ALL missed attack dice. If the rerolls produce more hits than the original roll, a cascade triggers: one additional friendly unit within 6\" may also reroll misses."
    },
    "Causality Shards": {
      type: "fragment",
      cp: 2,
      timing: "Any Phase",
      effect: "Activate a causality fragment: for the rest of this turn, whenever an enemy rolls a natural 6, your commander may spend 1 Fate-Thread to change it to a 1. Usable up to 3 times."
    },
    "Fate Strike": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect: "One friendly unit makes an attack where all dice automatically hit (no roll needed — fate ensures it). The attack deals normal damage per hit. Costs 2 Fate-Threads in addition to CP."
    },

    // --- Silk-Marshal Draven ---
    "Venom Cascade": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "All enemy units within 8\" of your commander gain 2 Venom tokens. At End Phase, each enemy unit takes 1 damage per 2 Venom tokens it carries. Venom tokens persist until cleansed."
    },
    "Toxic Offensive": {
      type: "command",
      cp: 2,
      timing: "Combat Phase",
      effect: "All friendly units within 8\" of your commander apply 1 Venom token on each successful hit this turn. Targets with 3+ Venom tokens suffer -1 ATK die and -1 DEF."
    },
    "Poison Engineering": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Choose up to 3 friendly units within 8\". Their weapons are coated with refined venom: hits apply 2 Venom tokens instead of 1 until End Phase. Ranged attacks leave toxic terrain at impact."
    },
    "Venom Refinement": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect: "All Venom tokens on enemies within 12\" of your commander become Refined Venom: they now deal 1 damage per token at End Phase instead of per 2 tokens. Lasts 1 turn."
    },
    "Toxin Amplification": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect: "Activate a toxin fragment: double the number of Venom tokens on all enemies within 8\" of your commander (max 8 per unit). Each enemy with 4+ tokens also suffers -1 MOV."
    },
    "Debilitating Strike": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect: "One friendly unit makes an attack with -1 ATK die, but each hit applies 3 Venom tokens and reduces the target's ATK by 1 (cumulative, min 1) until the tokens are cleansed."
    },

    // --- Thread-Cutter Nyx ---
    "Thread Severance": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect: "Your commander makes a melee attack against a target within 2\". If the attack deals damage, sever one of the target's abilities (your choice — the ability is disabled until End Phase). Commanders lose 1 CP instead."
    },
    "Silent Approach": {
      type: "command",
      cp: 2,
      timing: "Movement Phase",
      effect: "Your commander and up to 2 friendly Stealth units within 8\" gain Infiltrate: they may move through enemy units and terrain freely, and their next attack from Stealth gains +3 ATK dice."
    },
    "Invisibility Silk": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "One friendly unit within 6\" becomes completely invisible: it cannot be targeted by ranged attacks and gains Stealth. The invisibility lasts until End Phase or until the unit attacks."
    },
    "Fate Assassination": {
      type: "tech",
      cp: 2,
      timing: "Combat Phase",
      effect: "Spend 2 Fate-Threads: your commander's next melee attack crits on 4+ and deals +2 damage per crit. If the target is an enemy commander, crits deal +3 damage instead."
    },
    "Void Thread": {
      type: "fragment",
      cp: 3,
      timing: "Combat Phase",
      effect: "Activate a void fragment: your commander's next attack ignores ALL defenses — DEF, cover, shields, abilities, and damage reduction. The attack deals +1 damage per hit. Fragment loses 2 charges."
    },
    "Precision Kill": {
      type: "tactical",
      cp: 3,
      timing: "Combat Phase",
      effect: "Your commander makes a precision assassination attack from Stealth: +4 ATK dice, crits on 4+, and if the target is reduced to 0 HP, your commander automatically re-enters Stealth."
    },

    // --- Brood-Warden Thessari ---
    "Brood Surge": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Spawn 1d3+1 Spiderling Swarm units (1 pt each, 2 HP) within 6\" of your commander. Swarms activate immediately. If a friendly Brood Nest is within 8\", spawn 2 additional Spiderlings."
    },
    "Hatching Swarm": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "All friendly Spiderling and Swarm units within 12\" of your commander gain +1 ATK die and +2\" MOV until End Phase. Swarm units engaged with the same target gain Pack Tactics (+1 ATK die per additional swarm)."
    },
    "Accelerated Spawning": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "One friendly Spiderling Swarm within 8\" immediately splits into 2 swarm units, each with half HP (rounded up). Both may act normally this turn. Only usable on swarms with 3+ HP."
    },
    "Overwhelm": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect: "Select one enemy unit engaged with 2+ friendly Swarm units. All engaged swarms attack simultaneously with +1 ATK die each. The target cannot counterattack and suffers -1 DEF from being overwhelmed."
    },

    // --- Silk-Warden Morthis ---
    "Grand Trap": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Place a Grand Gossamer Trap within 8\" of your commander (4\" radius). Enemy units entering the trap area lose all remaining movement and suffer -2 ATK dice on their next attack. Lasts 2 turns."
    },
    "Web Fortress": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Create a web fortress within 6\" of your commander: a 4\" radius zone of Heavy Cover that blocks enemy movement. Friendly units inside gain +2 DEF. The fortress lasts 3 turns."
    },
    "Gossamer Engineering": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Enhance all trap tokens within 12\": they now also deal 1 damage to enemy units that trigger them and their slowing effect is increased to -4\" MOV. Traps gain Invisible (enemies cannot see them)."
    },
    "Trap Refinement": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect: "One existing Gossamer Trap within 12\" has its radius doubled and duration extended by 1 turn. Enemy units already inside the trap take 1 immediate damage as it tightens."
    },
    "Silk Reinforcement": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect: "Activate a silk fragment: all web structures, traps, and fortifications within 12\" gain +1 DEF (if targetable) and their effects are enhanced by +1. Friendly units within web structures heal 1 HP."
    },
    "Ambush Architecture": {
      type: "tactical",
      cp: 2,
      timing: "Movement Phase",
      effect: "Deploy 3 hidden Gossamer Trap tokens within 12\" of your commander. When an enemy unit moves within 2\" of a trap, it triggers: the enemy stops, takes 1 damage, and is Entangled (-3\" MOV for 1 turn)."
    },

    // --- Loom-Mother Silivex ---
    "Whisper Web": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Your commander weaves a psychic web: reveal all enemy units within 14\". You may look at 2 random cards in the enemy's hand. All friendly units gain +1 ATK die against revealed targets this turn."
    },
    "Secrets Stolen": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Choose one enemy unit within 12\". Steal one of its keywords or abilities (your choice) — your commander gains that ability until End Phase, and the enemy loses it. Cannot steal innate abilities."
    },
    "Shadow Weaving": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Up to 3 friendly units within 8\" gain Shadow Cloak: enemies can only target them from within 6\". Ranged attacks against cloaked units suffer -1 ATK die. Lasts until End Phase."
    },
    "Morale Collapse": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Choose one enemy unit within 10\". It suffers -3 MOR until End Phase and must immediately make a Morale check. If failed, all enemy units within 4\" of it also suffer -1 MOR from spreading panic."
    },
    "Fear Silk": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect: "Activate a fear fragment: all enemy units within 8\" must make an immediate Morale check at -1. Units that fail become Shaken and suffer -1 ATK die. Units that critically fail (by 3+) Rout immediately."
    },
    "Psychological Strike": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect: "One friendly unit attacks with -1 ATK die, but regardless of damage dealt, the target must make an immediate Morale check at -2. If the target was already Shaken, it automatically Routs."
    },

    // --- Spindle-Knight Varek ---
    "Silk Shield Wall": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Your commander and all friendly units within 4\" form a Silk Shield Wall: +2 DEF, immune to flanking, and any damage dealt to units in the wall is shared equally among them. Lasts until End Phase."
    },
    "Stand Your Ground": {
      type: "command",
      cp: 2,
      timing: "Any Phase",
      effect: "One friendly unit within 6\" becomes Immovable: it cannot be pushed, displaced, or forced to retreat. It gains +2 DEF and auto-passes Morale until End Phase. May be played as a reaction."
    },
    "Chitin Reinforcement": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Up to 3 friendly units within 8\" gain chitin-reinforced armor: +1 DEF permanently (max once per unit per game). Units that already have DEF 5+ instead gain +1 HP."
    },
    "Bodyguard Protocol": {
      type: "tech",
      cp: 1,
      timing: "Any Phase",
      effect: "Your commander intercepts an attack targeting a friendly unit within 3\": redirect the attack to your commander instead. Your commander gains +2 DEF for this redirected attack. May be played as a reaction."
    },
    "Silk Armor": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect: "Activate a silk fragment: your commander and up to 2 friendly units within 4\" gain Silk Armor (+2 DEF, absorb the first 2 points of damage from each attack). Lasts until End Phase."
    },
    "Immovable Defense": {
      type: "tactical",
      cp: 2,
      timing: "Any Phase",
      effect: "One friendly unit reduces all damage from one attack to 0 (completely negated). The unit gains +1 ATK die on its next counterattack from absorbing the impact. May be played as a reaction."
    },

    // --- Web-Walker Ithris ---
    "Phase Walk": {
      type: "command",
      cp: 2,
      timing: "Movement Phase",
      effect: "Your commander and up to 2 friendly units within 6\" gain Phase: they may move through terrain, walls, and enemy units freely this turn. Phase units gain +1 ATK die on their first attack after phasing."
    },
    "Between-Step": {
      type: "command",
      cp: 3,
      timing: "Any Phase",
      effect: "Instantly teleport your commander to any point within 12\" that is not in base contact with an enemy. Your commander may immediately make an attack with +2 ATK dice at the destination. May be played as a reaction."
    },
    "Reality Slip": {
      type: "tech",
      cp: 1,
      timing: "Any Phase",
      effect: "One friendly unit within 8\" briefly slips between realities: negate one attack targeting it (the attack passes through). The unit may then teleport 4\" in any direction. May be played as a reaction."
    },
    "Spatial Manipulation": {
      type: "tech",
      cp: 2,
      timing: "Movement Phase",
      effect: "Warp the space around your commander: swap the positions of 2 units (friendly or enemy) within 8\". Swapped units become disoriented — enemy units suffer -1 ATK die next attack."
    },
    "Phase Silk": {
      type: "fragment",
      cp: 2,
      timing: "Movement Phase",
      effect: "Activate a phase fragment: up to 3 friendly units within 8\" gain Phase (move through all obstacles and enemies) and +3\" MOV this turn. Phase units cannot be targeted by reactions during movement."
    },
    "Teleport Strike": {
      type: "tactical",
      cp: 3,
      timing: "Combat Phase",
      effect: "Your commander teleports up to 10\" to a target, makes a melee attack with +3 ATK dice, then immediately teleports back to the original position. The target cannot react to this attack."
    },

    // --- Cocoon-Keeper Rathis ---
    "Mass Harvest": {
      type: "command",
      cp: 3,
      timing: "End Phase",
      effect: "All destroyed enemy units this turn are Harvested: gain 2 CP per harvested unit. Up to 2 harvested units may be converted into Spiderling Swarms (placed within 6\" of your commander)."
    },
    "Resource Surge": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Generate 3 bonus CP this turn. Additionally, all friendly Support units within 8\" may use their abilities twice this turn. Draw 1 extra card."
    },
    "Efficient Processing": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect: "One friendly unit within 6\" may convert 1 enemy model it destroyed last turn into resources: heal 2 HP or gain 1 CP or spawn 1 Spiderling within 3\"."
    },
    "Cocoon Engineering": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Place a Cocoon token within 6\" of your commander. Friendly units within 2\" of the Cocoon heal 1 HP at the start of each turn. After 2 turns, the Cocoon hatches a free Spiderling Swarm."
    },
    "Conversion Silk": {
      type: "fragment",
      cp: 2,
      timing: "End Phase",
      effect: "Activate a conversion fragment: all enemy casualties within 8\" this turn generate additional resources. Gain 1 Fragment Charge and 1 CP per enemy destroyed. One casualty may become a Spiderling."
    },
    "Economy of Violence": {
      type: "tactical",
      cp: 1,
      timing: "Combat Phase",
      effect: "One friendly unit makes an attack. If it destroys the target, gain resources equal to the target's points cost: 1 CP per 2 points. If the unit is a Swarm, it also gains +1 permanent HP from feeding."
    },

    // --- Silk-Mender Yalith ---
    "Mending Weave": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "All friendly units within 8\" of your commander heal 2 HP. Units at full HP instead gain +1 DEF until End Phase. One friendly unit may have a single negative status effect (Shaken, Venom, etc.) removed."
    },
    "Silk Shield": {
      type: "command",
      cp: 2,
      timing: "Any Phase",
      effect: "Create a protective silk barrier around up to 2 friendly units within 6\". Each shielded unit reduces damage from the next attack against it by 3 (minimum 0). May be played as a reaction."
    },
    "Restorative Silk": {
      type: "tech",
      cp: 1,
      timing: "End Phase",
      effect: "One friendly unit within 6\" heals 3 HP and is cleansed of all Venom tokens, Corruption tokens, and negative status effects. The healed unit gains +1 MOR until End Phase."
    },
    "Cleansing Thread": {
      type: "tech",
      cp: 1,
      timing: "Any Phase",
      effect: "Remove all negative status effects (Shaken, Venom, Corruption, debuffs) from all friendly units within 6\" of your commander. Each cleansed unit gains +1 ATK die for its next attack."
    },
    "Life-Weave Resonance": {
      type: "fragment",
      cp: 3,
      timing: "Command Phase",
      effect: "Activate a life fragment: all friendly units within 10\" heal 2 HP and gain Regeneration (heal 1 HP at the start of each turn) for 2 turns. Units below half HP heal 3 HP instead."
    },

    // --- Fang-Rider Kaelyx ---
    "Thundering Charge": {
      type: "command",
      cp: 3,
      timing: "Movement Phase",
      effect: "All friendly Cavalry and mounted units within 10\" of your commander gain +4\" MOV and +2 ATK dice on charge attacks this turn. Targets of charges must make Morale checks from the impact."
    },
    "Flanking Orders": {
      type: "command",
      cp: 2,
      timing: "Movement Phase",
      effect: "Up to 3 friendly Cavalry units within 8\" may immediately make a free 6\" move. Units that end this move flanking an enemy gain +2 ATK dice on their next attack."
    },
    "Spider-Bond Tactics": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "All friendly spider-mounted Cavalry within 8\" gain Spider-Bond: +1 ATK die, +1 DEF, and the ability to move over terrain freely. Spider mounts may climb walls and move vertically."
    },
    "Silk Saddle Reinforcement": {
      type: "tech",
      cp: 1,
      timing: "Command Phase",
      effect: "One friendly Cavalry unit within 6\" gains +1 DEF and immunity to being dismounted or knocked prone. Its charge damage bonus increases by +1 ATK die."
    },
    "Stampede Resonance": {
      type: "fragment",
      cp: 2,
      timing: "Movement Phase",
      effect: "Activate a stampede fragment: all friendly Cavalry within 8\" gain +3\" MOV and their charge attacks deal +1 damage per hit this turn. Enemy units in the charge path take 1 trampling damage."
    },
    "Cavalry Wedge": {
      type: "tactical",
      cp: 2,
      timing: "Movement Phase",
      effect: "Up to 3 friendly Cavalry units form a wedge formation: they charge as one unit, each gaining +1 ATK die per additional unit in the wedge. The lead unit gains +2 DEF from the formation."
    },

    // --- Loom-Shaper Quileth ---
    "Raise Silk Wall": {
      type: "command",
      cp: 2,
      timing: "Command Phase",
      effect: "Place a Silk Wall (6\" long, counts as Heavy Cover) within 8\" of your commander. The wall blocks enemy movement but friendly Thornweft units may pass through freely. Lasts 3 turns."
    },
    "Web Flood": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Flood a 6\" radius area within 10\" of your commander with web terrain. Enemy units in the area suffer -3\" MOV and -1 ATK die. Friendly Thornweft units treat the area as normal terrain. Lasts 2 turns."
    },
    "Terrain Engineering": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Reshape one terrain piece within 12\" of your commander: move it up to 4\" in any direction, convert its type (open→difficult, cover→heavy cover), or create a new elevation. Lasts until destroyed."
    },
    "Web Architecture": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Create a web bridge or ramp within 8\" of your commander: friendly units may move over gaps, between elevations, or across water freely this turn. The structure also provides Light Cover."
    },
    "Earth-Silk Resonance": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect: "Activate a terrain fragment: all friendly units standing on web terrain or within 2\" of a Silk Wall gain +1 ATK die and +1 DEF until End Phase. Web terrain expands by 1\" in all directions."
    },
    "Chokepoint Creation": {
      type: "tactical",
      cp: 2,
      timing: "Command Phase",
      effect: "Create an impassable web barrier blocking a 4\" wide gap or passage. Enemy units cannot pass through for 2 turns (they must go around). Friendly Thornweft units may pass freely."
    },

    // --- Shared / Additional Thornweft cards ---
    "Growth Silk": {
      type: "fragment",
      cp: 2,
      timing: "Command Phase",
      effect: "Activate a growth fragment: all friendly Spiderling and Swarm units within 8\" gain +1 ATK die and +2 HP permanently. One Spiderling within range grows into a Spider Warrior (gains +2 ATK, +1 DEF)."
    },

    // --- Additional Veilbound Shogunate cards ---
    "Veil Command": {
      type: "command",
      cp: 3,
      timing: "Command Phase",
      effect: "Issue a supreme command through the Veil: up to 3 friendly units within 12\" of your commander may immediately change Stance (free action) and gain +1 ATK die this turn. Generate +2 Ritual Flow."
    },
    "Spirit Link": {
      type: "tech",
      cp: 2,
      timing: "Command Phase",
      effect: "Link your commander's spirit to up to 2 friendly units within 8\". Linked units share Ritual Flow generation (+1 each) and gain +1 DEF until End Phase. If a linked unit would be destroyed, the commander may spend 3 Flow to reduce the damage to 0 (once per turn)."
    },
    "Decisive Strike": {
      type: "tactical",
      cp: 2,
      timing: "Combat Phase",
      effect: "Your commander or 1 friendly unit within 6\" makes an attack with +2 ATK that cannot be reacted to. If the attack destroys the target, generate +3 Ritual Flow."
    },
    "Inkstep": {
      type: "tech",
      cp: 2,
      timing: "Movement Phase",
      effect: "Your commander or 1 friendly unit within 6\" may teleport up to 4\" in any direction, ignoring terrain and intervening models. The unit may still act normally after teleporting. Veilbound Shogunate only."
    },
    "Inkwave": {
      type: "command",
      cp: 3,
      timing: "Combat Phase",
      effect: "Your commander unleashes a wave of spirit ink in a 6\" cone. All enemy units in the area suffer -1 ATK die and -1 MOV until End Phase. Friendly units in the area generate +1 Ritual Flow. Veilbound Shogunate only."
    },
    "Repositioning": {
      type: "tactical",
      cp: 2,
      timing: "Movement Phase",
      effect: "Move up to 3 friendly units within 8\" of your commander up to 3\" each out of sequence. These units may not charge this turn but may shoot normally. Veilbound Shogunate only."
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
