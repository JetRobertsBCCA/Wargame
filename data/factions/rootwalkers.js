(function() {
  // ================================
  // THE ROOTWALKERS FACTION
  // ================================

  gameData.factions.push({
    id: "rootwalkers",
    name: "The Rootwalkers",
    icon: "🌿",
    color: "#2D8B27",
    accent: "#C8A040",
    motto: "We do not march. We grow.",
    theme: "Ancient forest spirits who seed Root terrain as they move, snowballing into an immovable late-game fortress of living wood and entangling vines",
    flavor_text: "The Rootwalkers are not a civilization — they are the land's memory made manifest. When the Shardstorm shattered the sky and poisoned the earth, the oldest trees did not die. They woke. Their roots, starved for clean soil, learned to reach further. Their branches, seeking clean air, learned to grasp. What walks on two legs now is older than any faction's written history. They do not hate their enemies. They simply remember a time before them — and intend to remember a time after.",
    motif_description: "Bark-skin armor layered in moss and lichen. Officers wear masks carved from ancient heartwood. Banners are living boughs that flower and shed in battle-rhythm. Weapons are shaped root and thorn — grown, not forged. The army moves with the patience of seasons, each footfall leaving verdant earth behind.",
    core_philosophy: "Growth is not speed — it is inevitability. The Rootwalkers do not race to victory; they make the ground itself hostile to all but their own. Every tile of Root terrain planted is a step closer to the world remembering who it belongs to. They do not conquer territory — they reclaim it.",

    faction_bonuses: [
      "Root-Walk: Rootwalker units move through Root terrain with no movement cost penalty (+0 cost instead of the normal +2 for difficult terrain)",
      "Verdant Defense: All Rootwalker units gain +1 DEF while standing on a Root tile",
      "Ancient Growth (Passive): At the start of each round, 1 existing Root tile spreads to an adjacent empty tile (chosen by the Rootwalker player)",
      "Deep Roots: A unit that skips its movement action plants a permanent Deep Root at its tile, gaining +2 DEF and 1 HP regen per turn while it remains on that tile",
      "Entangle Terrain: Enemies entering Root terrain for the first time each turn must pass a MOR check (2d6 ≤ MOR) or become Entangled (cannot move next turn)"
    ],

    faction_mechanics: {
      name: "Root Spread",
      resource: "Root Tiles",
      description: "Rootwalker units passively plant Root tiles as they move. Every tile a Rootwalker unit moves through during the Movement Phase becomes a Root tile at the end of that movement. Root tiles persist for the entire battle — they never decay. The board becomes increasingly hostile to enemies and favorable to Rootwalkers as the game progresses, rewarding slow deliberate play and punishing aggressive enemies who advance into the growing forest.",
      root_tile_rules: [
        "Root tiles are placed on every tile a Rootwalker unit moves through during Movement Phase. The tile the unit started on also counts as a Root tile if it wasn't already.",
        "Root tiles are permanent — they do not decay and cannot be removed except by Reclaim.",
        "Rootwalker allies on Root tiles: +1 DEF, no movement cost penalty.",
        "Enemies on Root tiles: +2 movement cost per tile, must pass MOR check (2d6 ≤ MOR) on first entry per turn or become Entangled (cannot move on next activation).",
        "Root tiles provide +1 DEF to any Rootwalker unit standing on them (in addition to other bonuses).",
        "Units with Root-Walk keyword treat Root tiles as Open Ground (no cost, no check)."
      ],
      deep_roots: {
        description: "A unit that sacrifices its movement action plants a permanent Deep Root at its current tile. Deep Root grants significant defensive bonuses and passive regeneration as long as the unit remains on that tile.",
        rules: [
          "Declare Deep Root Stance during the Movement Phase instead of moving. The unit does not move this turn.",
          "Place a Deep Root marker on the unit's tile. This tile becomes a Root tile if it wasn't already.",
          "While on a Deep Root tile: +2 DEF (instead of the normal +1 for Root tiles), 1 HP regen per End Phase.",
          "Deep Root is permanent — the tile retains Deep Root status even if the unit moves away, granting the standard +1 DEF bonus to any Rootwalker that occupies it later.",
          "A unit can deepen its roots by using Deep Root Stance again on the same tile — no additional effect, but the commitment is noted by allies (flavor only).",
          "Deep Root Stance is a free action that replaces movement. The unit can still attack normally."
        ]
      },
      ancient_growth_passive: {
        description: "The living root network breathes and grows even without direct action. At the start of each round (before either player's Command Phase), 1 Root tile spreads naturally to an adjacent empty tile.",
        rules: [
          "At round start, the Rootwalker player chooses any 1 existing Root tile on the board.",
          "That tile's growth spreads to 1 adjacent tile (orthogonally or diagonally adjacent). The chosen tile must be unoccupied by a unit and not already a Root tile.",
          "This is free, automatic, and not optional — the roots grow whether the Rootwalker player wants them to or not.",
          "In rounds 1-3, Ancient Growth spreads 1 tile. In rounds 4+, if the Rootwalker player has 20+ Root tiles on the board, Ancient Growth spreads 2 tiles per round instead of 1."
        ]
      },
      tiers: [
        { name: "Dormant", threshold: 0, effect: "Fewer than 3 Root tiles on the board. Rootwalkers fight without their terrain advantage — slower units at full cost." },
        { name: "Taking Hold", threshold: 3, effect: "3–9 Root tiles. Rootwalker units on Root tiles gain +1 DEF. The roots are finding their grip." },
        { name: "Spreading", threshold: 10, effect: "10–19 Root tiles. Ancient Growth spreads 1 tile per round start. Root Pulse gains +2 tile radius. The forest is waking." },
        { name: "Deep-Rooted", threshold: 20, effect: "20–29 Root tiles. Ancient Growth spreads 2 tiles per round start. Enemies entering Root terrain must make MOR checks. The land remembers its masters." },
        { name: "Ancient Dominion", threshold: 30, effect: "30+ Root tiles. All Rootwalker units gain +1 ATK die while on Root tiles. The battlefield has become a forest — and the Rootwalkers are its oldest trees." }
      ],
      skills: {
        ancient_growth: {
          id: "ancient_growth",
          name: "Ancient Growth",
          type: "Support",
          available_to: "Commanders and Support units",
          description: "Place 3 Root tiles in a cross pattern around the caster. Commanders and Support only. Cost: free action."
        },
        entangle: {
          id: "entangle",
          name: "Entangle",
          type: "Ranged",
          available_to: "Ranged-capable units",
          description: "Ranged shot (range 5\"). Target becomes Entangled: immobile for 1 turn and takes +1 damage from all sources."
        },
        bark_surge: {
          id: "bark_surge",
          name: "Bark Surge",
          type: "Melee",
          available_to: "Melee units on Root terrain",
          description: "Melee attack. If standing on a Root tile: +2 ATK dice and +1 DEF until next turn."
        },
        root_pulse: {
          id: "root_pulse",
          name: "Root Pulse",
          type: "Special (AoE)",
          available_to: "Commanders and heavy units",
          description: "Once per round. All Root tiles within 6\" of this unit deal 1 damage to every enemy adjacent to them."
        },
        deep_root_stance: {
          id: "deep_root_stance",
          name: "Deep Root Stance",
          type: "Special",
          available_to: "Most units",
          description: "Skip movement this turn. Plant a Deep Root at this tile (+2 DEF, 1 HP regen per turn). Effect persists while the unit remains on that tile."
        },
        thorn_volley: {
          id: "thorn_volley",
          name: "Thorn Volley",
          type: "Ranged (AoE)",
          available_to: "Artillery and ranged units",
          description: "Ranged blast (range 8\", Blast 2). Deals ATK dice damage. All tiles hit are converted to Root terrain."
        },
        ancient_call: {
          id: "ancient_call",
          name: "Ancient Call",
          type: "Special (Once per battle)",
          available_to: "Legendary commanders only (Deepwood Eldest)",
          description: "Once per battle. Summon a Sapling unit on any Root tile within 8\". Legendary commander only."
        },
        reclaim: {
          id: "reclaim",
          name: "Reclaim",
          type: "Special (Commander only)",
          available_to: "Commanders",
          description: "Commander only. Consume 5 Root tiles within a 4\" radius. Convert the area to Dense Root: enemies suffer +4 MOV cost, Rootwalker allies gain +2 DEF while inside."
        }
      }
    },

    playstyle_notes: "The Rootwalkers are the slowest faction in Shardborne — most units have MOV 2-3 — but they become nearly unstoppable once they have established their Root terrain network. The early game is about seeding Root tiles with scouts, Root Runners, and Thorn Volley bombardment. The mid-game is holding ground and letting Ancient Growth do its work. The late game is a living fortress the enemy cannot navigate. Key synergies: Deep Root Stance + Root Pulse creates devastating stationary artillery; Thorn Volley + Ancient Growth fills the board with hostile terrain; Entangle locks enemies in place for focused fire. Weakness: extremely vulnerable to fast-moving aggressive armies in the first two rounds before the Root network is established. Protect your Scouts and Root Runners early — they are the foundation of your late-game dominance.",

    worldview: [
      "We do not march. We grow.",
      "The earth remembers everything. We are the earth's memory.",
      "Speed is a mortal obsession. Permanence is divine.",
      "Every enemy that enters our roots feeds them. Every step they take plants the seeds of their defeat.",
      "We do not hate what we destroy. We simply remember a world before it, and intend to remember a world after."
    ],

    political_structure: "The Rootwalkers have no council, no king, no hierarchy of authority as lesser factions understand it. They have Eldest — ancient trees that have walked long enough to remember the world before the Shardstorm. The Eldest do not command; they remember. Their memories carry the weight of centuries, and younger Rootwalkers orient around them as saplings orient toward light. Sylvara the Thornweaver speaks for the Eldest in battle — not because she was appointed, but because she has walked long enough to understand what they remember.",

    root_doctrine: {
      overview: "The Root Doctrine is not written — it is grown. It exists in the pattern of bark-rings, in the chemical signals exchanged through root-networks, in the shared memory of soil that has absorbed ten thousand years of seasons. Three truths form its core.",
      tenets: [
        {
          name: "The Tenet of Permanence",
          concept: "What is planted endures. What is rushed dies. The roots that grow slowly grow deepest.",
          implications: [
            "Rootwalkers do not retreat — to retreat is to abandon root-work that cannot be replaced in a generation",
            "Every battlefield is a seed-bed; even in defeat, the roots planted there outlast the victors",
            "Speed is a symptom of fear; patience is the expression of certainty"
          ],
          mechanics: [
            "Root tiles are permanent — they never decay regardless of time elapsed",
            "Deep Root Stance: units that sacrifice movement gain permanent defensive anchors",
            "Ancient Growth ensures the terrain tilts in the Rootwalkers' favor every round regardless of action"
          ],
          symbol: "🌱 The Deep Seed — a root growing downward through stone"
        },
        {
          name: "The Tenet of Reclamation",
          concept: "The land was ours before there were words for ownership. To fight is to remind the earth who planted it.",
          implications: [
            "Territory taken by enemies is not lost — it is temporarily occupied soil that will be reclaimed",
            "The Rootwalkers do not distinguish between sacred and profane ground — all ground is theirs by right of age",
            "What the Shardstorm poisoned, the roots will cleanse — given enough time"
          ],
          mechanics: [
            "Reclaim ability: consume existing Root tiles to create Dense Root zones of impenetrable defensive terrain",
            "Root Pulse punishes enemies who occupy Root tiles with damage channeled through the root network",
            "Ancient Growth spreads the root network passively, reclaiming the board regardless of combat outcome"
          ],
          symbol: "🌲 The Standing Ancient — a great tree whose roots have cracked and split stone"
        },
        {
          name: "The Tenet of Memory",
          concept: "We remember everything. We forget nothing. Our enemies fight us; we fight every war that has been fought on this ground since the first tree fell.",
          implications: [
            "The Rootwalkers carry the accumulated tactical memory of thousands of battles fought on every terrain type",
            "They do not fear death as humans do — their memories pass into the root network when they fall",
            "Ancient Rootwalkers (the Eldest) have tactical knowledge that predates written history by millennia"
          ],
          mechanics: [
            "Ancient Call: legendary commanders summon reinforcements directly from the root network's memory",
            "Deepwood Eldest: immovable anchor with access to all faction skills — the walking library of war",
            "Root Pulse reveals the web of roots beneath the enemy's feet — they cannot hide their positions from the network"
          ],
          symbol: "🍂 The Fallen Leaf — a leaf that feeds the root even in its death"
        }
      ],
      doctrine_in_practice: {
        training: "There is no training among the Rootwalkers. There is awakening. A sapling that has grown for a century has already learned patience. The roots know how to fight — they have been fighting since before there was anything worth calling war. New Rootwalkers are not taught; they are reminded of what they already know.",
        hierarchy_integration: "Authority among the Rootwalkers flows toward age. The older the wood, the harder the heart, the deeper the roots — the more the younger Rootwalkers orient toward that presence. Sylvara is young by Eldest standards (a mere four hundred years) but old enough to remember three wars and speak for the deep forest.",
        combat_philosophy: "Do not chase. Do not pursue. Plant. Hold. Let the enemy come to you through the roots you have grown. Every step they take through Root terrain is a MOR check, a movement penalty, a moment of hesitation. Patience is not passive — it is the most aggressive posture available to a being that cannot be hurried."
      },
      keywords: ["Permanence", "Ancient Memory", "Root Network", "Reclamation", "Living Terrain", "The Long Game"]
    },

    hierarchy: {
      overview: "Rootwalker hierarchy is not rank — it is age. The older the wood, the more the young orient toward it. Combat roles are determined by physical form, not appointment.",
      ranks: [
        {
          title: "The Eldest",
          role: "Ancient Rootwalkers who have walked for centuries; the living memory of the faction",
          responsibilities: [
            "Remember the battles fought on the soil being contested, granting tactical foreknowledge",
            "Channel the Ancient Growth — the deep root-network that connects all Rootwalker units",
            "Stand as immovable anchors at the heart of every Root network"
          ],
          characteristics: [
            "Wood so old it has become closer to stone than living bark",
            "Their footsteps permanently alter terrain — Deep Root wherever they stand",
            "They do not speak in words — they speak in the chemical signals of the root network"
          ]
        },
        {
          title: "Thornweaver",
          role: "Senior commanders who shape the battlefield's Root network",
          responsibilities: [
            "Direct the seeding pattern of Root terrain to maximize board control",
            "Coordinate Entangle attacks with allied strikes to eliminate locked enemies",
            "Speak for the Eldest in battle when tactical clarity is needed"
          ],
          characteristics: [
            "Bark-skin laced with living thorns that tighten under stress",
            "Able to sense the extent of the Root network beneath their feet",
            "Command with patience — their orders arrive slowly but are never rescinded"
          ]
        },
        {
          title: "Ancient",
          role: "Veterans who have grown beyond their original form",
          responsibilities: [
            "Hold the Root network's anchors — Deep Root Stance specialists",
            "Serve as living siege engines in the late game when Root tiers reach Deep-Rooted",
            "Absorb enemy attention while the Root network spreads behind enemy lines"
          ],
          characteristics: [
            "Massive, slow, nearly indestructible when deeply rooted",
            "Their presence raises morale in surrounding Rootwalkers",
            "Have long since forgotten what urgency feels like"
          ]
        },
        {
          title: "Grove Warden",
          role: "Mid-tier defenders and Root-terrain guardians",
          responsibilities: [
            "Protect Root tiles from enemy disruption",
            "Support healing and terrain seeding across the line",
            "Hold flanks and redirect enemy movement into Root-heavy zones"
          ],
          characteristics: [
            "Disciplined, steady, unflappable under pressure",
            "Their bark thickens in proportion to Root tiles nearby",
            "Serve as the reliable backbone between the Eldest and the young scouts"
          ]
        },
        {
          title: "Spriggan",
          role: "Young scouts and fast Root-seeders",
          responsibilities: [
            "Range ahead of the main force, planting Root tiles",
            "Ambush isolated enemy units and retreat into Root terrain",
            "Mark enemy positions for the root network's awareness"
          ],
          characteristics: [
            "Fastest Rootwalkers; still small enough to move with urgency",
            "Their excitement about movement is considered slightly embarrassing by the Eldest",
            "High survivability in Root terrain; fragile in open ground"
          ]
        }
      ],
      titles_table: [
        { title: "Root-Born", significance: "A Rootwalker who can plant Root tiles passively through movement (all units possess this)", notes: "Standard designation" },
        { title: "Deep-Rooted", significance: "A unit that has used Deep Root Stance 3+ times in a single battle", notes: "Gains recognition from the Eldest" },
        { title: "The Standing", significance: "A unit that has never retreated across its entire campaign record", notes: "Extremely high honor" },
        { title: "Heartwood", significance: "A Rootwalker whose bark has hardened to near-stone consistency from age", notes: "Usually denotes Eldest tier" },
        { title: "The Reclaimer", significance: "A commander who has used Reclaim to deny enemy-held ground", notes: "Tactical honor; used in after-battle acknowledgment" }
      ]
    },

    deepwood_eldest_lore: {
      title: "Deepwood Eldest",
      role: "The oldest walking thing in the Rootwalker roster — a tree that woke before the Shardstorm and has walked since",
      aliases: ["The First Walker", "Root-That-Remembers", "The Immovable"],
      summary: "The Deepwood Eldest is not a creature in any conventional sense — it is a forest that chose to walk. Its root network extends dozens of feet in every direction when it stands still. Its bark has absorbed the chemical memory of soil from seventeen different continents. It does not hurry. It does not deviate. When the Eldest sets a course, the ground it walks becomes root-territory before the first enemy sees it coming.",
      appearance: [
        "A tree the height of a siege tower walking on a tangle of exposed roots",
        "Its canopy is alive — flowers open and close in battle-rhythm, shedding seeds that sprout Root tiles",
        "Ancient carvings visible in its bark: runes left by civilizations that no longer exist"
      ],
      abilities: [
        { name: "Ancient Call", description: "Once per battle, summon a Sapling unit on any Root tile within 8\" — calling a younger tree up from the root network" },
        { name: "Root Pulse", description: "All Root tiles within 6\" deal 1 damage to adjacent enemies — the network strikes through the ground" },
        { name: "Deep Root Stance", description: "Skips movement to plant a permanent Deep Root: +3 DEF total, 1 HP regen/turn" }
      ],
      faction_role: [
        { area: "Terrain", detail: "Every tile the Eldest moves through becomes permanent Root terrain" },
        { area: "Command", detail: "Its CMD 9 means it generates massive action economy from its root network" },
        { area: "Anchor", detail: "At 54 HP, DEF 8, Fearless — it is designed to stand in the center of the board and not move" }
      ],
      lore_notes: [
        "The Deepwood Eldest is, technically, older than the Shardstorm it survived",
        "It does not remember its own name — names are a young species' affectation",
        "Enemies who stand in its shadow for more than a turn report feeling uneasy, as though being watched by something that has seen everything",
        "When it finally stops walking and takes Deep Root Stance, surrounding Rootwalkers visibly grow more confident — as though the forest itself has decided the battle is already won"
      ]
    }
  });

  // ===========================
  // COMMANDERS (13)
  // ===========================

  gameData.commanders.push(
    {
      name: "Sylvara the Thornweaver",
      faction: "rootwalkers",
      title: "Voice of the Deep Forest",
      flavor_text: "She does not command. She reminds the land what it wants to do.",
      theme: "Primary campaign commander; terrain seeder and battlefield entangler",
      personality: "Patient, certain, unsentimental — she speaks rarely and in the language of the root network rather than words",
      playstyle: "Root terrain seeding, Entangle control, battlefield setup for allied units",
      base_stats: { Command: 10, Knowledge: 9, Leadership: 12, Agility: 3, Health: 420 },
      battle_stats: { ATK: 12, DEF: 6, HP: 42, MOV: 3, RNG: 1, MOR: 12 },
      points_cost: 28,
      cmd: 10,
      skills: ["ancient_growth", "entangle", "deep_root_stance"],
      specials: ["Root-Born", "Thornweave Aura"],
      level_1_deck: {
        command: ["Root Advance", "Verdant Surge"],
        tech: ["Thornweave Protocol", "Ancient Seeding"],
        fragment: ["Root Core"],
        tactical: ["Entangle Field"]
      },
      skill_tree: {
        level_2: { knowledge: "Expanded Root Network (+2 Ancient Growth spread)", patience: "Rooted Fortress (Deep Root Stance costs 0 CP)", tactical: "Verdant Web" },
        level_3: { knowledge: "Mass Entangle (Entangle hits 2 targets)", patience: "Immovable (unit cannot be displaced)", tactical: "Root Ambush" },
        level_4: { knowledge: "Ancient Seeding (place 5 Root tiles free/turn)", patience: "Heartwood (ignore first wound each battle)", tactical: "Thorn Cage" },
        level_5: { knowledge: "Thornweave Mastery", patience: "The Standing (Sylvara cannot Rout)", tactical: "Forest's Wrath" }
      },
      evolution_paths: {
        knowledge: {
          name: "Architect of the Forest",
          description: "Sylvara becomes the supreme Root-terrain engineer, filling the board with an impenetrable network.",
          abilities: ["Mass Seeding", "Entangle Web", "Ancient Lattice"],
          unit_synergy: "All Root-Born units plant Root tiles when standing still, not just when moving"
        },
        patience: {
          name: "The Standing Ancient",
          description: "Sylvara evolves toward immovability — a living fortress at the heart of the Root network.",
          abilities: ["Heartwood Armor", "Immovable", "The Last Root"],
          unit_synergy: "All allies within 6\" of Sylvara gain +1 DEF while she is in Deep Root Stance"
        },
        hybrid: {
          name: "The Thornweave",
          description: "Balanced control — Sylvara shapes the battlefield with Root terrain while holding the line herself.",
          abilities: ["Adaptive Seeding", "Precise Entangle", "Verdant Pulse"],
          unit_synergy: "Root tiles placed by Sylvara count as Deep Root tiles for allies (but not enemies)"
        }
      },
      signature_units: ["Root Runner", "Spriggan Scout", "Grove Keeper"],
      strategic_notes: "Sylvara is your early-game engine. She should be seeding Root tiles aggressively in turns 1-3 while her scouts race ahead. Her Entangle is a premium control tool — use it to lock down enemy threats while your slower heavy units close the gap. Her Deep Root Stance in rounds 4+ turns her into a fortress commander. Weakest against fast-cavalry armies that can reach her before the Root network is established.",
      tags: ["Control", "Terrain", "Commander", "Root Network"]
    },

    {
      name: "Deepwood Eldest",
      faction: "rootwalkers",
      title: "The First Walker",
      flavor_text: "It was old when the first stone was laid. It will be walking when the last stone falls.",
      theme: "Legendary ancient; immovable late-game anchor and Root network heart",
      personality: "Not a personality — a geological presence",
      playstyle: "Deep Root Stance anchor, Root Pulse area denial, Ancient Call summoning",
      base_stats: { Command: 9, Knowledge: 14, Leadership: 15, Agility: 2, Health: 540 },
      battle_stats: { ATK: 15, DEF: 8, HP: 54, MOV: 2, RNG: 1, MOR: 14 },
      points_cost: 35,
      cmd: 9,
      legendary: true,
      skills: ["ancient_call", "root_pulse", "deep_root_stance"],
      specials: ["Ancient", "Towering", "Fearless"],
      level_1_deck: {
        command: ["Ancient Authority", "The Forest Speaks"],
        tech: ["Heartwood Resilience", "Root Conduit"],
        fragment: ["Living Core"],
        tactical: ["Pulse of the Deep"]
      },
      skill_tree: {
        level_2: { memory: "Expanded Ancient Call (summon 2 Saplings)", permanence: "The Immovable (immune to displacement and knockback)", tactical: "Ancient Pulse" },
        level_3: { memory: "Root Conduit (Root Pulse range +3\")", permanence: "Stone Bark (reduce all damage taken by 1)", tactical: "The Deep Network" },
        level_4: { memory: "Summon Ancient (call a full unit, not just a Sapling)", permanence: "Eternal Roots (Deep Root bonus applies to all allies within 4\")", tactical: "Ancient Dominion" },
        level_5: { memory: "The Living Forest (the Eldest IS the network — all Root tiles within 10\" pulse)", permanence: "Cannot Be Felled (reduce damage below 1/turn max)", tactical: "Transcendence" }
      },
      evolution_paths: {
        memory: {
          name: "The Walking Library",
          description: "The Eldest becomes the sum of all battles fought on this soil — Ancient Call becomes mass summoning.",
          abilities: ["Mass Ancient Call", "Root Memory", "The Long Recall"],
          unit_synergy: "All allied units gain +1 MOR when within 12\" of the Eldest (the forest knows it cannot lose)"
        },
        permanence: {
          name: "Stone and Root",
          description: "The Eldest's bark becomes practically invulnerable — a living wall in the center of the battlefield.",
          abilities: ["Stone Bark", "The Immovable", "Eternal Deep Root"],
          unit_synergy: "The Eldest's Deep Root bonus (+2 DEF, 1 HP regen) applies to all Rootwalker units within 4\""
        },
        hybrid: {
          name: "The Ancient Network",
          description: "The Eldest channels both memory and permanence — calling reinforcements while holding the line.",
          abilities: ["Network Pulse", "Ancient Recall", "Root Fortress"],
          unit_synergy: "Root tiles within 8\" of the Eldest deal +1 damage when Root Pulse activates"
        }
      },
      signature_units: ["Ancient Shambler", "Grove Hulk", "Ancient Grove Walker"],
      strategic_notes: "The Deepwood Eldest is a campaign unit — it rewards investment. At base, it is the most defensively durable commander in the game. Take Deep Root Stance by turn 3 and never move again. Root Pulse from its position becomes the engine that wins the late game. Ancient Call should be saved for a critical moment — one Sapling on a key Root tile can deny an objective. Legendaries only: it must be paired with the Deepwood Eldest commander to field Deepwood Elder (War Machine).",
      tags: ["Legendary", "Anchor", "Ancient", "Root Network"]
    },

    {
      name: "Greyroot the Patient",
      faction: "rootwalkers",
      title: "The Immovable",
      flavor_text: "He has stood in this valley before. He intends to stand here again.",
      theme: "Defensive fortress commander; Root anchor specialist",
      personality: "Calm to the point of geological — says nothing that doesn't need saying",
      playstyle: "Hold ground, Deep Root Stance, Root Pulse defensive anchor",
      base_stats: { Command: 8, Knowledge: 12, Leadership: 12, Agility: 2, Health: 420 },
      battle_stats: { ATK: 12, DEF: 7, HP: 42, MOV: 2, RNG: 1, MOR: 12 },
      points_cost: 25,
      cmd: 8,
      skills: ["deep_root_stance", "root_pulse"],
      specials: ["Stubborn", "Immovable"],
      strategic_notes: "Greyroot is the archetypal Rootwalker anchor. Deploy him in the center of your projected Root network and never move him. His CMD 8 generates respectable action economy and his Deep Root Stance makes him nearly impenetrable late-game. Best paired with Root Pulse to punish clustered enemies.",
      tags: ["Defensive", "Anchor", "Commander"]
    },

    {
      name: "Bramblethorn",
      faction: "rootwalkers",
      title: "The Briarsurge",
      flavor_text: "The forest does not always wait. Sometimes it charges.",
      theme: "Aggressive melee striker; the faction's fastest commander",
      personality: "Impatient by Rootwalker standards — still slower than most faction cavalry",
      playstyle: "Charge and Bark Surge, forward Root seeding, aggressive pressure",
      base_stats: { Command: 7, Knowledge: 8, Leadership: 15, Agility: 4, Health: 360 },
      battle_stats: { ATK: 15, DEF: 5, HP: 36, MOV: 4, RNG: 1, MOR: 10 },
      points_cost: 22,
      cmd: 7,
      skills: ["bark_surge", "entangle"],
      specials: ["Charge", "Thorn Aura"],
      strategic_notes: "Bramblethorn is the outlier of the Rootwalker commander roster — MOV 4 lets him actually apply early-game pressure. Use him to seed Root tiles along advance routes while threatening enemy frontlines with his Charge/Bark Surge combo. Fragile by Rootwalker standards at DEF 5; don't overextend.",
      tags: ["Aggressive", "Melee", "Commander"]
    },

    {
      name: "Mossborn Elder",
      faction: "rootwalkers",
      title: "The Healer of the Deep Grove",
      flavor_text: "What bleeds can be mended, given time. What is rooted cannot be moved.",
      theme: "Healing and Root-spreading ranged support commander",
      personality: "Nurturing, patient, concerned primarily with the survival of the root network",
      playstyle: "Healing, Ancient Growth terrain seeding, Root Pulse support",
      base_stats: { Command: 7, Knowledge: 13, Leadership: 9, Agility: 2, Health: 360 },
      battle_stats: { ATK: 9, DEF: 6, HP: 36, MOV: 2, RNG: 4, MOR: 13 },
      points_cost: 20,
      cmd: 7,
      skills: ["ancient_growth", "root_pulse"],
      specials: ["Healer", "Verdant Aura"],
      strategic_notes: "Mossborn Elder is the faction's primary sustain commander. Keep her centrally positioned to heal front-line units while her Ancient Growth ability seeds Root tiles in the backfield. Root Pulse makes her dangerous in a deep Root network — what looks like a healer becomes a damage engine by turn 5.",
      tags: ["Support", "Healer", "Commander"]
    },

    {
      name: "Fernwhisper",
      faction: "rootwalkers",
      title: "The Unseen Branch",
      flavor_text: "You don't see her. But the roots do.",
      theme: "Stealth scout-leader; forward Root seeder and ambush specialist",
      personality: "Quiet even by Rootwalker standards — communicates through the root network rather than any audible signal",
      playstyle: "Stealth advance, forward Root seeding, Entangle ambush",
      base_stats: { Command: 6, Knowledge: 11, Leadership: 9, Agility: 4, Health: 300 },
      battle_stats: { ATK: 9, DEF: 5, HP: 30, MOV: 4, RNG: 6, MOR: 11 },
      points_cost: 19,
      cmd: 6,
      skills: ["entangle", "ancient_growth"],
      specials: ["Stealth", "Scout", "Silk Camouflage"],
      strategic_notes: "Fernwhisper is your early-game Root network architect. She deploys ahead and seeds Root tiles before the enemy can establish their own position. Her Stealth keeps her safe long enough to do meaningful terrain work. Entangle from stealth is a premium control opener.",
      tags: ["Scout", "Stealth", "Commander", "Root Seeding"]
    },

    {
      name: "Ashenbark",
      faction: "rootwalkers",
      title: "The Wrathborn",
      flavor_text: "The forest burns. Then the forest returns. And it is angry.",
      theme: "Fire-resistant melee berserker; triggered aggression on ally death",
      personality: "The most volatile Rootwalker — his bark is charred from a battle with Emberclaw forces he refuses to forget",
      playstyle: "Fire-resistant frontline, Bark Surge striker, triggered aggression",
      base_stats: { Command: 7, Knowledge: 6, Leadership: 15, Agility: 3, Health: 360 },
      battle_stats: { ATK: 15, DEF: 6, HP: 36, MOV: 3, RNG: 1, MOR: 10 },
      points_cost: 22,
      cmd: 7,
      skills: ["bark_surge", "root_pulse"],
      specials: ["Fire Resistant", "Wrathborn (triggered on ally death)"],
      strategic_notes: "Ashenbark punishes enemies who kill your units. His Wrathborn trigger gives him +2 ATK for the rest of the battle when any ally within 6\" is destroyed. Stack multiple trigger events by placing fragile Expendable/Thrall units near him — let them die, let Ashenbark become a storm.",
      tags: ["Melee", "Aggressive", "Commander", "Fire Resistant"]
    },

    {
      name: "Verdant Patriarch",
      faction: "rootwalkers",
      title: "The Bulwark",
      flavor_text: "He does not advance. He does not retreat. He decides where the line is and becomes it.",
      theme: "Defensive anchor and Reclaim specialist",
      personality: "Immovable in philosophy as in body — once he has decided something, the world accommodates him",
      playstyle: "Bulwark defense, Deep Root Stance, Reclaim territory control",
      base_stats: { Command: 8, Knowledge: 13, Leadership: 12, Agility: 2, Health: 420 },
      battle_stats: { ATK: 12, DEF: 8, HP: 42, MOV: 2, RNG: 1, MOR: 13 },
      points_cost: 24,
      cmd: 8,
      skills: ["deep_root_stance", "ancient_growth", "reclaim"],
      specials: ["Bulwark", "Towering"],
      strategic_notes: "Verdant Patriarch is the Rootwalker's most powerful territorial commander. Deploy him where you intend to hold and use Reclaim to convert a wide area of Root tiles into Dense Root — a zone even aggressive cavalry cannot navigate efficiently. His Bulwark keyword means he intercepts attacks on adjacent allies.",
      tags: ["Defensive", "Commander", "Reclaim", "Territory"]
    },

    {
      name: "Thornvast",
      faction: "rootwalkers",
      title: "The Thorn Hammer",
      flavor_text: "Anti-armor is simple. You find something harder than their armor. Fortunately, there is nothing harder than ancient heartwood.",
      theme: "Anti-armor melee striker with heavy Bark Surge and Thorn Volley",
      personality: "Practical, deliberate — evaluates every problem as a structural challenge",
      playstyle: "Anti-Armor melee, Bark Surge on Root tiles, Thorn Volley bombardment setup",
      base_stats: { Command: 8, Knowledge: 9, Leadership: 15, Agility: 3, Health: 420 },
      battle_stats: { ATK: 15, DEF: 7, HP: 42, MOV: 3, RNG: 1, MOR: 11 },
      points_cost: 26,
      cmd: 8,
      skills: ["bark_surge", "thorn_volley"],
      specials: ["Massive", "Anti-Armor"],
      strategic_notes: "Thornvast is the Rootwalkers' answer to heavy war machines and armored cavalry. His Anti-Armor keyword ignores DEF bonuses from armor (not terrain). On Root terrain with Bark Surge active, he hits at ATK 17 — one of the highest damage output values in the faction. Pair with Thorn Volley to seed Root tiles in the path of incoming armor.",
      tags: ["Anti-Armor", "Melee", "Commander"]
    },

    {
      name: "Ivywarden",
      faction: "rootwalkers",
      title: "The Root-Walker",
      flavor_text: "She moves through Root terrain like thought moves through memory — instantly, silently, completely.",
      theme: "Root-Walk stealth ranger; Root network mobility specialist",
      personality: "Fluid, adaptive — the most tactically flexible of the Rootwalker commanders",
      playstyle: "Root-Walk mobility, stealth in Root terrain, Entangle harassment",
      base_stats: { Command: 7, Knowledge: 12, Leadership: 9, Agility: 3, Health: 360 },
      battle_stats: { ATK: 9, DEF: 6, HP: 36, MOV: 3, RNG: 5, MOR: 12 },
      points_cost: 20,
      cmd: 7,
      skills: ["entangle", "ancient_growth"],
      specials: ["Root-Walk", "Stealth in Root terrain"],
      strategic_notes: "Ivywarden becomes dramatically more powerful as the Root network grows. Her Root-Walk keyword means the entire Root-covered board is Open Ground to her. By mid-game she can reposition across the battlefield in a single turn, appearing behind enemy lines. Entangle from stealth in Root terrain is nearly impossible to prevent.",
      tags: ["Mobility", "Stealth", "Commander", "Root Network"]
    },

    {
      name: "The Green Hunger",
      faction: "rootwalkers",
      title: "The Devourer",
      flavor_text: "Something went wrong with its awakening. It is hungry in a way that has no word in any language that grew after it did.",
      theme: "Glass-cannon regenerating striker; high risk/reward aggressor",
      personality: "Not a personality — a consuming force with the memory of vegetation",
      playstyle: "Blood-Drunk aggression, Bark Surge all-in, Regeneration sustain",
      base_stats: { Command: 6, Knowledge: 5, Leadership: 18, Agility: 4, Health: 360 },
      battle_stats: { ATK: 18, DEF: 5, HP: 36, MOV: 4, RNG: 1, MOR: 9 },
      points_cost: 23,
      cmd: 6,
      skills: ["bark_surge", "entangle"],
      specials: ["Blood-Drunk", "Regeneration"],
      strategic_notes: "The Green Hunger is the faction's most aggressive commander — but fragile by Rootwalker standards at DEF 5. Its Regeneration (1 HP/End Phase) and Blood-Drunk (+1 ATK die per wound received) means it gets deadlier as it takes damage. Play it as a sacrificial striker — charge it into elite enemy units and let it regenerate while tearing them apart.",
      tags: ["Aggressive", "Melee", "Commander", "High Risk"]
    },

    {
      name: "Sapwood Seer",
      faction: "rootwalkers",
      title: "The Root Oracle",
      flavor_text: "She does not see the future. She reads it from the soil — and the soil never lies.",
      theme: "Indirect fire and Root network artillery coordinator",
      personality: "Distant, prophetic — her battlefield assessments arrive as certainties rather than predictions",
      playstyle: "Indirect Fire support, Ancient Growth mass seeding, Root Pulse coordination",
      base_stats: { Command: 7, Knowledge: 13, Leadership: 9, Agility: 2, Health: 300 },
      battle_stats: { ATK: 9, DEF: 5, HP: 30, MOV: 2, RNG: 8, MOR: 13 },
      points_cost: 19,
      cmd: 7,
      skills: ["ancient_growth", "root_pulse"],
      specials: ["Non-Combatant", "Indirect Fire", "Prophecy Aura"],
      strategic_notes: "Sapwood Seer is a pure backfield commander — deploy her in cover and never move her. Her Indirect Fire RNG 8 combined with Root Pulse can clear half the board of enemies by mid-game. Ancient Growth seeds 3 Root tiles per use in a cross pattern — by turn 4 she can have planted a dozen Root tiles without moving.",
      tags: ["Artillery", "Support", "Commander", "Indirect Fire"]
    },

    {
      name: "Rootmaw",
      faction: "rootwalkers",
      title: "The Terror",
      flavor_text: "The Rootwalkers do not speak of it. They simply note, with quiet certainty, that it is heading in that direction.",
      theme: "Terror melee striker with Devour healing",
      personality: "Nothing that could be called personality — an apex predator of the root network",
      playstyle: "Terror morale attacks, Bark Surge strikes, Devour HP sustain on kills",
      base_stats: { Command: 6, Knowledge: 5, Leadership: 18, Agility: 4, Health: 360 },
      battle_stats: { ATK: 18, DEF: 5, HP: 36, MOV: 4, RNG: 1, MOR: 9 },
      points_cost: 24,
      cmd: 6,
      skills: ["bark_surge", "ancient_call"],
      specials: ["Terror", "Void Resolve", "Devour (heals 2 on kill)"],
      strategic_notes: "Rootmaw combines Terror (forces enemy MOR checks on its activation) with Devour (heals 2 HP per kill). It is the faction's most psychologically effective commander — enemies near it spend actions failing morale checks rather than attacking. Ancient Call gives it a surprising late-game utility: summon a Sapling to block escape routes while Rootmaw closes in.",
      tags: ["Terror", "Melee", "Commander", "Control"]
    }
  );

  // ===========================
  // UNITS (50 non-commander)
  // ===========================

  gameData.units.push(

    // INFANTRY (15 units)
    { name: "Vine Walker", faction: "rootwalkers", points_cost: 2, role: "Basic Root-seeder infantry", fragment_interactions: "Root tiles", flavor_text: "The first step is always root. The second step is never the same ground.", description: "The most basic Rootwalker infantry unit — bark-skinned humanoids who leave a thin trail of Root terrain wherever they walk. Individually fragile, Vine Walkers exist to seed the Root network early and absorb initial enemy pressure. Their Root-Walk keyword means they navigate their own Root terrain with zero movement penalty, allowing them to reposition quickly once Root tiles are established. Expendable but essential.", type: "Infantry", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 3, RNG: 1, MOR: 7 }, special: ["Root-Walk"] },
    { name: "Bark Warrior", faction: "rootwalkers", points_cost: 3, role: "Stubborn melee line holder", fragment_interactions: "Bark Surge", flavor_text: "Their bark has absorbed a hundred blows. It remembers each one.", description: "Veteran infantry whose bark-skin has thickened over years of combat into a genuine armor layer. Bark Warriors are the reliable backbone of any Rootwalker ground force — Stubborn means they never rout from morale failure, and Bark Surge on Root terrain gives them a combat output well above their points cost. Position them on Root tiles and let the enemy come to them.", type: "Infantry", stats: { ATK: 9, DEF: 5, HP: 9, MOV: 2, RNG: 1, MOR: 8 }, special: ["Stubborn"], skills: ["bark_surge"] },
    { name: "Thornguard", faction: "rootwalkers", points_cost: 4, role: "Defensive Root-terrain anchor", fragment_interactions: "Deep Root Stance", flavor_text: "They have been standing in that position since before this battle began.", description: "Elite defensive infantry who specialize in Deep Root Stance — skipping movement to become near-immovable anchors with +2 DEF and passive HP regeneration. Thornguard are the patient core of the Rootwalker battle line, holding objectives and key terrain while more mobile units seed the wider Root network. Their Brace keyword allows them to brace against incoming charges, negating the charge bonus entirely.", type: "Infantry", stats: { ATK: 9, DEF: 6, HP: 9, MOV: 2, RNG: 1, MOR: 9 }, special: ["Brace"], skills: ["deep_root_stance"] },
    { name: "Root Sentinel", faction: "rootwalkers", points_cost: 4, role: "Fearless objective holder", fragment_interactions: "Root terrain", flavor_text: "It has been asked what they fear. They have never answered.", description: "Ancient Rootwalker infantry who have been walking long enough to remember what fear felt like — and forget it entirely. Root Sentinels are Stubborn and Fearless: they never fail morale checks, never rout, and hold their position regardless of casualties around them. They are the ideal objective-capping unit, planting Root tiles on the objective and refusing to leave.", type: "Infantry", stats: { ATK: 9, DEF: 5, HP: 12, MOV: 2, RNG: 1, MOR: 10 }, special: ["Stubborn", "Fearless"] },
    { name: "Ancient Shambler", faction: "rootwalkers", points_cost: 5, role: "Massive regenerating heavy infantry", fragment_interactions: "All Root synergies", flavor_text: "It was here before the road. It will be here after the army that built the road.", description: "A towering ancient Rootwalker that has grown so large it barely qualifies as infantry anymore. Ancient Shamblers are Massive (cannot be displaced, ignored for charge lane purposes), Fearless, and possess passive Regeneration (1 HP per End Phase). They are the heaviest non-War Machine unit in the faction — slow at MOV 1, but each one that reaches the enemy line represents an enormous tactical problem.", type: "Infantry", stats: { ATK: 12, DEF: 6, HP: 15, MOV: 1, RNG: 1, MOR: 10 }, special: ["Massive", "Regeneration", "Fearless"] },
    { name: "Briarbane", faction: "rootwalkers", points_cost: 3, role: "Root-terrain stealth skirmisher", fragment_interactions: "Entangle", flavor_text: "The safest place for an enemy is nowhere near Root terrain. There is no second safest place.", description: "Aggressive skirmishers whose thorned hide provides natural camouflage in Root terrain. Briarbane are Stealthed whenever they stand on Root tiles — invisible to enemy ranged attacks, able to move freely through the root network. Their Entangle ability locks enemies in place for allied follow-up. A Briarbane in deep Root terrain is almost impossible to dig out.", type: "Infantry", stats: { ATK: 9, DEF: 4, HP: 9, MOV: 3, RNG: 1, MOR: 8 }, special: ["Stealth in Root terrain"], skills: ["entangle"] },
    { name: "Sporeborn", faction: "rootwalkers", points_cost: 2, role: "Expendable thrall cannon fodder", fragment_interactions: "Root tiles on death", flavor_text: "They emerged from the root network three days ago. They have served their purpose.", description: "Semi-conscious Rootwalker drones produced by the root network in times of stress — more mushroom than tree, more instinct than intelligence. Sporeborn are Expendable and Thrall: they follow orders from the nearest active Root network signal and cost almost nothing. Their real value is as Root-tile seeders who die productively — when destroyed, their spores convert their tile to Root terrain.", type: "Infantry", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 2, RNG: 1, MOR: 7 }, special: ["Thrall", "Expendable"] },
    { name: "Wraithwood", faction: "rootwalkers", points_cost: 4, role: "Phase-capable infiltrator", fragment_interactions: "Entangle", flavor_text: "They found it in the deep forest. It was not there the day before.", description: "Rootwalkers who have grown so deeply intertwined with the living root network that they can partially phase through physical terrain. Wraithwood have the Phase keyword (can move through units, not through walls) and Mist Form (cannot be targeted by ranged attacks while on Root tiles). They exist to infiltrate enemy positions and apply Entangle from unexpected angles.", type: "Infantry", stats: { ATK: 9, DEF: 5, HP: 9, MOV: 2, RNG: 1, MOR: 9 }, special: ["Phase", "Mist Form"], skills: ["entangle"] },
    { name: "Mirewalker", faction: "rootwalkers", points_cost: 3, role: "Amphibious Root-seeder", fragment_interactions: "Root terrain in water", flavor_text: "The swamp is not difficult terrain. The swamp is home.", description: "Rootwalker infantry adapted to aquatic and marsh environments. Mirewalkers have Aquatic (treat water and marsh terrain as Open Ground) and Root-Walk. Their real value is seeding Root tiles in terrain types other factions find challenging to navigate — a Root-tiled marsh is nearly impassable for most enemies.", type: "Infantry", stats: { ATK: 9, DEF: 4, HP: 9, MOV: 3, RNG: 1, MOR: 8 }, special: ["Aquatic", "Root-Walk"] },
    { name: "Thornblade", faction: "rootwalkers", points_cost: 3, role: "Charge-capable aggressive infantry", fragment_interactions: "Root tiles on advance", flavor_text: "They are not patient. Not yet. Give them a few more centuries.", description: "Younger Rootwalker infantry who have not yet learned the faction's signature patience. Thornblades charge with genuine enthusiasm, using Charge (+1 ATK die) and Momentum Strike (additional hit on a 6 in melee) to punch above their weight class. They seed Root tiles along their charge path, combining aggression with terrain control.", type: "Infantry", stats: { ATK: 12, DEF: 4, HP: 9, MOV: 3, RNG: 1, MOR: 8 }, special: ["Charge", "Momentum Strike"] },
    { name: "Rootbound Warrior", faction: "rootwalkers", points_cost: 3, role: "Reliable melee generalist", fragment_interactions: "Bark Surge", flavor_text: "Nothing fancy. Just roots and patience and the knowledge that you were here first.", description: "Standard Rootwalker melee infantry with no exotic abilities — just solid stats and Bark Surge. Rootbound Warriors are the faction's workhorse infantry: take them in multiples, seed Root tiles with their movement, and use Bark Surge when they reach combat. Their reliability and low cost make them the answer to every army-building question.", type: "Infantry", stats: { ATK: 9, DEF: 5, HP: 9, MOV: 2, RNG: 1, MOR: 8 }, special: [], skills: ["bark_surge"] },
    { name: "Ancient Foot", faction: "rootwalkers", points_cost: 4, role: "Fearless Immovable heavy infantry", fragment_interactions: "Root terrain anchor", flavor_text: "It has not moved in six hundred years. Today is no different.", description: "Infantry so old and so deeply connected to the Root network that they are literally difficult to displace. Ancient Foot are Fearless and Immovable: they cannot be pushed back, knocked down, or displaced by any ability. Combined with their DEF 6 and HP 12, they are among the hardest units in the game to clear from an objective.", type: "Infantry", stats: { ATK: 9, DEF: 6, HP: 12, MOV: 2, RNG: 1, MOR: 10 }, special: ["Fearless", "Immovable"] },
    { name: "Grove Warden", faction: "rootwalkers", points_cost: 4, role: "Bulwark objective defender", fragment_interactions: "Root terrain defense", flavor_text: "The grove has a warden because some things do not guard themselves.", description: "Defensive infantry who specialize in protecting Root-tile objectives and shielding key units. Grove Wardens have Bulwark (intercept attacks on adjacent allies) and Stubborn. They are cheaper than Verdant Patriarch but fill the same role at the unit level: stand in front of something valuable and refuse to die.", type: "Infantry", stats: { ATK: 9, DEF: 5, HP: 12, MOV: 2, RNG: 1, MOR: 9 }, special: ["Bulwark", "Stubborn"] },
    { name: "Verdant Thrall", faction: "rootwalkers", points_cost: 2, role: "Expendable cannon fodder", fragment_interactions: "Root tiles", flavor_text: "The roots needed something to fill the gap. This was what the roots grew.", description: "The most basic Rootwalker unit — drones extruded by the Root network to fill numerical gaps. Like Sporeborn, Verdant Thralls are Expendable and Thrall. Unlike Sporeborn, they are marginally better at combat. Use them to screen more valuable units and seed Root tiles with their movement before they are inevitably consumed.", type: "Infantry", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 2, RNG: 1, MOR: 7 }, special: ["Expendable", "Thrall"] },
    { name: "Thorn Creeper", faction: "rootwalkers", points_cost: 3, role: "Burrowing stealth infiltrator", fragment_interactions: "Surprise Root tiles", flavor_text: "The enemy checked the map. The map did not include the thorn creeper.", description: "Infantry capable of burrowing through the Root network below ground, emerging from any existing Root tile. Thorn Creepers have Burrowing (can start their movement from any Root tile within 6\" instead of their current position) and Stealth. They are the faction's infiltration unit, appearing in unexpected locations to apply Entangle and cut off escape routes.", type: "Infantry", stats: { ATK: 9, DEF: 4, HP: 9, MOV: 2, RNG: 1, MOR: 8 }, special: ["Burrowing", "Stealth"] },

    // CAVALRY (5 units)
    { name: "Ancient Stag Rider", faction: "rootwalkers", points_cost: 6, role: "Charge cavalry", fragment_interactions: "Root terrain advance", flavor_text: "The stag is older than its rider. They came to an arrangement centuries ago.", description: "Rootwalker cavalry mounted on ancient stags whose antlers are laced with living thorns. Ancient Stag Riders are the faction's standard cavalry — Charge gives them +1 ATK die on a charge attack. They seed Root tiles along their charge path, creating Root terrain even in the most aggressive advancement lanes.", type: "Cavalry", stats: { ATK: 12, DEF: 5, HP: 12, MOV: 5, RNG: 1, MOR: 9 }, special: ["Charge"] },
    { name: "Vine Rider", faction: "rootwalkers", points_cost: 5, role: "Momentum cavalry", fragment_interactions: "Root terrain momentum", flavor_text: "The vines carry them. They simply choose the direction.", description: "Cavalry who ride living vine constructs that surge forward using the Root network's energy. Vine Riders have Momentum Strike (additional hit on 6 in melee) and produce Root tiles along their full movement path. They are slightly cheaper than Stag Riders and better at sustained pressure than alpha-strike charges.", type: "Cavalry", stats: { ATK: 12, DEF: 4, HP: 9, MOV: 5, RNG: 1, MOR: 8 }, special: ["Momentum Strike"] },
    { name: "Thornback Elk", faction: "rootwalkers", points_cost: 7, role: "Heavy charge cavalry with Thorn Aura", fragment_interactions: "Bark Surge on charge", flavor_text: "Its back is thorns. Its charge is thorns. Everything about it is thorns.", description: "The heaviest cavalry unit in the roster — massive thorned elk whose bodies are walking Root-tile factories and whose charge leaves a wake of thorned terrain. Thornback Elk have Charge, Thorn Aura (adjacent enemies take 1 damage per activation), and Bark Surge. On Root terrain with Bark Surge, these are the highest-damage cavalry in the faction.", type: "Cavalry", stats: { ATK: 15, DEF: 5, HP: 15, MOV: 5, RNG: 1, MOR: 9 }, special: ["Charge", "Thorn Aura"], skills: ["bark_surge"] },
    { name: "Canopy Drake Rider", faction: "rootwalkers", points_cost: 8, role: "Flying Root-seeder cavalry", fragment_interactions: "Aerial Root placement", flavor_text: "The sky has roots too. You just can't see them yet.", description: "The only flying cavalry in the Rootwalker roster — riders on ancient canopy drakes who seed Root tiles from the air. Canopy Drake Riders have Fly and Spirit Glide (ignore terrain cost during movement entirely). They can seed Root tiles in locations otherwise inaccessible, creating Root terrain behind enemy lines without engaging directly.", type: "Cavalry", stats: { ATK: 15, DEF: 5, HP: 12, MOV: 5, RNG: 1, MOR: 9 }, special: ["Fly", "Spirit Glide"] },
    { name: "Root Cavalry", faction: "rootwalkers", points_cost: 6, role: "Stubborn defensive cavalry", fragment_interactions: "Deep Root Stance on horse", flavor_text: "They do not break. Not even cavalry breaks the deep roots.", description: "Heavy cavalry who combine the mobility of mounted units with the Rootwalker's signature stubborn refusal to give ground. Root Cavalry are Stubborn and can use Deep Root Stance even while mounted — a rare ability that allows them to act as mounted anchors on key terrain. Seed Root tiles on advance, then take Deep Root Stance on the objective.", type: "Cavalry", stats: { ATK: 12, DEF: 5, HP: 12, MOV: 4, RNG: 1, MOR: 9 }, special: ["Stubborn"], skills: ["deep_root_stance"] },

    // SUPPORT (8 units)
    { name: "Grove Keeper", faction: "rootwalkers", points_cost: 4, role: "Healer and Root-tender", fragment_interactions: "Ancient Growth seeding", flavor_text: "She tends the grove. In battle, the grove is everywhere she stands.", description: "Dedicated healer and Root-tile tender. The Grove Keeper has Healer (restore 2 HP to an adjacent ally per activation instead of attacking) and Non-Combatant (cannot be targeted while adjacent to a friendly unit). Her Ancient Growth ability makes her a passive Root-seeder even when she's healing — she tends both her allies and the terrain simultaneously.", type: "Support", stats: { ATK: 6, DEF: 4, HP: 9, MOV: 2, RNG: 1, MOR: 10 }, special: ["Healer", "Non-Combatant"], skills: ["ancient_growth"] },
    { name: "Dryad", faction: "rootwalkers", points_cost: 3, role: "Stealth support with Entangle", fragment_interactions: "Entangle control", flavor_text: "You see a tree. The tree is watching you.", description: "Ancient spirits who appear as young trees until they move. Dryads have Stealth and Silk Camouflage (cannot be spotted by scouts or scrying — they genuinely look like non-threatening foliage). Their Entangle ability applied from stealth is one of the most effective opening plays available to the faction.", type: "Support", stats: { ATK: 6, DEF: 4, HP: 9, MOV: 3, RNG: 4, MOR: 9 }, special: ["Stealth", "Silk Camouflage"], skills: ["entangle"] },
    { name: "Root Tender", faction: "rootwalkers", points_cost: 3, role: "Basic healer", fragment_interactions: "Ancient Growth seeding", flavor_text: "The roots need tending. So do the fighters. She does both.", description: "The most basic healing unit in the roster. Root Tenders are Healer and Non-Combatant with very low ATK but reliable HP restoration. They seed Root tiles with Ancient Growth while the front line holds. An army without Root Tenders is an army that loses units it could have kept.", type: "Support", stats: { ATK: 3, DEF: 4, HP: 9, MOV: 2, RNG: 1, MOR: 10 }, special: ["Healer", "Non-Combatant"], skills: ["ancient_growth"] },
    { name: "Sapwood Oracle", faction: "rootwalkers", points_cost: 4, role: "Indirect fire support", fragment_interactions: "Thorn Volley seeding", flavor_text: "She reads the soil. The soil says the enemy will be there. The thorns agree.", description: "A ranged support unit who combines Indirect Fire capability with Thorn Volley — each shot seeds Root terrain wherever the thorns land. Sapwood Oracle provides indirect bombardment while simultaneously expanding the Root network. Position her in cover and let her rain thorns on enemy-held ground.", type: "Support", stats: { ATK: 9, DEF: 4, HP: 9, MOV: 2, RNG: 8, MOR: 10 }, special: ["Indirect Fire"], skills: ["thorn_volley"] },
    { name: "Ancient Seed", faction: "rootwalkers", points_cost: 3, role: "Root-caller and network anchor", fragment_interactions: "Ancient Growth and Ancient Call", flavor_text: "Everything the Rootwalkers are was once a seed. This one has not finished yet.", description: "A slow-growing Rootwalker spirit who serves as both terrain anchor and conduit for the Ancient Call. Ancient Seeds are Non-Combatant but possess both Ancient Growth (seed 3 Root tiles per use) and Ancient Call (summon Saplings from the network). They are expensive for their combat value but create enormous long-term terrain advantage.", type: "Support", stats: { ATK: 3, DEF: 3, HP: 6, MOV: 2, RNG: 1, MOR: 9 }, special: ["Non-Combatant"], skills: ["ancient_growth", "ancient_call"] },
    { name: "Moss Shaper", faction: "rootwalkers", points_cost: 4, role: "Healer and terrain specialist", fragment_interactions: "Deep Root Stance support", flavor_text: "She shapes the ground beneath them. Their feet remember where to stand.", description: "A hybrid healer and terrain specialist who can both restore HP and enhance Root tiles. Moss Shapers have Healer and can use Deep Root Stance on behalf of adjacent units — granting the Deep Root bonus to an allied unit without requiring that unit to skip its own movement.", type: "Support", stats: { ATK: 6, DEF: 4, HP: 9, MOV: 2, RNG: 3, MOR: 10 }, special: ["Healer"], skills: ["deep_root_stance", "ancient_growth"] },
    { name: "Thornweave Initiate", faction: "rootwalkers", points_cost: 3, role: "Basic support with Entangle access", fragment_interactions: "Entangle control", flavor_text: "They are learning. The roots are patient teachers.", description: "Junior Rootwalker support units who are still developing their connection to the Root network. Thornweave Initiates have access to Entangle despite their junior status — a premium control skill. They are the cheapest way to get Entangle into your army. Use them to lock down enemy threats while veterans move in.", type: "Support", stats: { ATK: 6, DEF: 4, HP: 9, MOV: 2, RNG: 3, MOR: 9 }, special: [], skills: ["entangle"] },
    { name: "Verdant Shepherd", faction: "rootwalkers", points_cost: 4, role: "Movement aura support", fragment_interactions: "Ancient Growth seeding", flavor_text: "She does not lead. She simply makes the path easier to walk.", description: "A unique support unit whose Aura (+1 MOV to adjacent allies on Root tiles) partially compensates for the faction's normally ponderous speed. On a board covered in Root tiles, Verdant Shepherd's aura allows adjacent slow units to move at nearly normal faction speeds. Essential for any Root-heavy strategy that needs its line to reposition mid-battle.", type: "Support", stats: { ATK: 6, DEF: 4, HP: 9, MOV: 3, RNG: 1, MOR: 10 }, special: ["Aura: +1 MOV to adjacent allies on Root tiles"], skills: ["ancient_growth"] },

    // SCOUTS (3 units)
    { name: "Spriggan Scout", faction: "rootwalkers", points_cost: 3, role: "Forward ambush scout", fragment_interactions: "Root tile seeding on advance", flavor_text: "You look at the forest and see forest. The spriggan sees angles of attack.", description: "The youngest and most enthusiastic Rootwalkers — small enough to move with actual urgency. Spriggan Scouts have Scout (deploy 8\" ahead), Stealth, and Ambush (count as charging on first attack from stealth). They race ahead of the main force, seed Root tiles in enemy-approach routes, and set up ambush positions for allied units to exploit.", type: "Scout", stats: { ATK: 9, DEF: 3, HP: 6, MOV: 5, RNG: 4, MOR: 8 }, special: ["Scout", "Stealth", "Ambush"] },
    { name: "Root Runner", faction: "rootwalkers", points_cost: 4, role: "Root network expander and forward seeder", fragment_interactions: "Plants Roots while moving", flavor_text: "It does not run from anything. It runs toward everything worth planting.", description: "The single most important early-game unit in the Rootwalker roster. Root Runners plant Root tiles with every tile of movement AND have Root-Walk (no movement cost on Root terrain). They also have the Scout keyword, deploying 8\" ahead. In turns 1-2, a Root Runner at MOV 6 can seed 6 Root tiles per turn — establishing the Taking Hold tier before the enemy reaches combat range.", type: "Scout", stats: { ATK: 9, DEF: 4, HP: 9, MOV: 6, RNG: 1, MOR: 8 }, special: ["Scout", "Root-Walk", "Plants Roots while moving"] },
    { name: "Thornling", faction: "rootwalkers", points_cost: 2, role: "Cheap stealth ambusher", fragment_interactions: "Root tiles", flavor_text: "It is too young to be patient. It is learning.", description: "The smallest Rootwalker unit — barely more than an aggressive shrub with ambitions. Thornlings have Stealth and Ambush, making them cheap stealth harassers that can disrupt enemy positioning. Their low cost makes them acceptable losses when used to distract or screen, while their Stealth keeps them alive longer than their fragile stats suggest.", type: "Scout", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 4, RNG: 3, MOR: 7 }, special: ["Stealth", "Ambush"] },

    // ARTILLERY (3 units)
    { name: "Thornball Hurler", faction: "rootwalkers", points_cost: 8, role: "Indirect fire root-seeder", fragment_interactions: "Thorn Volley", flavor_text: "It does not aim at soldiers. It aims at ground that might later have soldiers on it.", description: "A biological artillery piece that hurls compressed thorn-masses at high arcs. Each impact creates both damage and Root terrain — the Thornball Hurler seeds Root tiles at extreme range through its Thorn Volley ability. It has Indirect Fire (ignores LoS) and Blast 2 (hits all units in a 2\" radius). Essential for establishing Root terrain in areas the main force hasn't reached.", type: "Artillery", stats: { ATK: 12, DEF: 4, HP: 18, MOV: 1, RNG: 10, MOR: 8 }, special: ["Indirect Fire", "Blast 2"], skills: ["thorn_volley"] },
    { name: "Ancient Catapult Tree", faction: "rootwalkers", points_cost: 10, role: "Heavy Root-seeder siege piece", fragment_interactions: "Thorn Volley mass", flavor_text: "It grew here. It will siege here. It will still be here.", description: "The heaviest conventional artillery in the faction — a living ancient tree that has learned to throw. Its Blast 3 radius makes it the faction's most effective area-denial piece, and its Thorn Volley converts every impact zone into Root terrain. The Ancient Catapult Tree moves at MOV 1 but rarely needs to — its RNG 10 and Siege keyword (ignores cover for targeting purposes) cover almost any relevant range.", type: "Artillery", stats: { ATK: 15, DEF: 5, HP: 21, MOV: 1, RNG: 10, MOR: 9 }, special: ["Indirect Fire", "Blast 3", "Siege"], skills: ["thorn_volley"] },
    { name: "Root Mortar", faction: "rootwalkers", points_cost: 7, role: "Light indirect fire piece", fragment_interactions: "Thorn Volley seeding", flavor_text: "Smaller than its siblings. No less patient.", description: "The lighter artillery option — cheaper than the Thornball Hurler but with shorter range and no Blast radius. Root Mortars seed Root tiles with each Thorn Volley shot and provide Indirect Fire coverage for the backline. Their low cost makes them viable in Skirmish games where expensive artillery pieces consume too much of the budget.", type: "Artillery", stats: { ATK: 9, DEF: 4, HP: 15, MOV: 1, RNG: 8, MOR: 8 }, special: ["Indirect Fire"], skills: ["thorn_volley"] },

    // SPECIALISTS (5 units)
    { name: "Root Shaper", faction: "rootwalkers", points_cost: 5, role: "Terrain manipulation specialist", fragment_interactions: "Ancient Growth and Reclaim", flavor_text: "She does not fight the ground. She asks it to cooperate.", description: "A specialist unit focused entirely on terrain manipulation. Root Shapers can use both Ancient Growth (seed 3 Root tiles) and Reclaim (consume Root tiles to create Dense Root zones). They are the most powerful terrain-manipulation unit available outside the commander level — a Root Shaper who gets one Reclaim off can create an impenetrable zone that wins the late game.", type: "Specialist", stats: { ATK: 9, DEF: 5, HP: 12, MOV: 2, RNG: 3, MOR: 9 }, special: [], skills: ["ancient_growth", "reclaim"] },
    { name: "Entangler", faction: "rootwalkers", points_cost: 4, role: "Ranged control specialist", fragment_interactions: "Entangle", flavor_text: "It does not need to reach them. The roots reach them for it.", description: "A long-range Entangle specialist with Sharpshot (reduces cover bonuses to 0 when attacking). Entanglers provide premium ranged crowd control at RNG 8 — the longest Entangle range in the faction. Their Sharpshot keyword means Entangle applies regardless of cover, making it impossible for enemies to shelter safely.", type: "Specialist", stats: { ATK: 9, DEF: 4, HP: 9, MOV: 3, RNG: 8, MOR: 8 }, special: ["Sharpshot"], skills: ["entangle"] },
    { name: "Bark Hulk", faction: "rootwalkers", points_cost: 6, role: "Immovable melee anchor", fragment_interactions: "Deep Root Stance", flavor_text: "It does not move. Anything that approaches it discovers this is not a choice — it is physics.", description: "A massive Rootwalker specialist whose bark has thickened to near-stone consistency. Bark Hulks are Massive and Immovable — they cannot be displaced, pushed back, or affected by any knockback effect. Combined with Deep Root Stance, a Bark Hulk becomes one of the most difficult units in the game to remove from a position. DEF 7 with Deep Root Stance active brings it to DEF 9.", type: "Specialist", stats: { ATK: 12, DEF: 7, HP: 18, MOV: 2, RNG: 1, MOR: 9 }, special: ["Massive", "Immovable"], skills: ["deep_root_stance"] },
    { name: "Briar Witch", faction: "rootwalkers", points_cost: 5, role: "Magical control specialist", fragment_interactions: "Entangle and Root Pulse", flavor_text: "She does not cast spells. She asks the briar what it wants to do.", description: "A magical specialist who combines Ward (reduce incoming magic damage by 1) with both Entangle and Root Pulse. Briar Witches provide magical anti-magic defense while also contributing to Root-network damage output through Root Pulse. They are the faction's answer to magic-heavy opponents.", type: "Specialist", stats: { ATK: 9, DEF: 4, HP: 9, MOV: 3, RNG: 5, MOR: 9 }, special: ["Ward"], skills: ["entangle", "root_pulse"] },
    { name: "Ancient Vine", faction: "rootwalkers", points_cost: 4, role: "Entangle and terrain specialist", fragment_interactions: "Entangle and Ancient Growth", flavor_text: "It is old enough to remember when this ground had no name. It will grow over the name carved into it now.", description: "A hybrid specialist who provides both terrain expansion and Entangle control. Ancient Vines access both Entangle (range 5, immobile + vulnerable) and Ancient Growth (seed 3 Root tiles). They are the most efficient dual-purpose unit in the faction — every activation either locks down an enemy or grows the Root network.", type: "Specialist", stats: { ATK: 9, DEF: 5, HP: 12, MOV: 2, RNG: 4, MOR: 8 }, special: [], skills: ["entangle", "ancient_growth"] },

    // WAR MACHINES (11 units)
    { name: "Living Siege Tree", faction: "rootwalkers", points_cost: 80, role: "Siege artillery war machine", fragment_interactions: "All Root synergies", flavor_text: "It grew over seven hundred years to this height. It learned to throw last winter.", description: "A titanic living tree repurposed — by its own decision — as a siege weapon. The Living Siege Tree is Towering (blocking terrain for shooting purposes), Siege (ignores cover when targeting), and Blast 2 (hits 2\" radius). Its Root tiles spread from every movement tile, and its sheer presence forces the enemy to either destroy it or work around the growing forest it represents.", type: "War Machine", stats: { ATK: 21, DEF: 8, HP: 42, MOV: 2, RNG: 6, MOR: 10 }, special: ["Towering", "Siege", "Blast 2"] },
    { name: "Thornwall Construct", faction: "rootwalkers", points_cost: 90, role: "Immovable bulwark fortress", fragment_interactions: "Deep Root Stance", flavor_text: "It was placed there. It has decided to remain there. These are not separate events.", description: "The ultimate defensive war machine — an Immovable, Bulwark, Towering construct of living thorn-wood that cannot be displaced by any means. The Thornwall Construct is the faction's supreme objective-defender. Its Deep Root Stance brings it to DEF 12 (base 10 + 2 from Deep Root) — effectively impenetrable except to massed focused fire. Nothing short of concentrated army-level damage will dislodge it.", type: "War Machine", stats: { ATK: 15, DEF: 10, HP: 45, MOV: 1, RNG: 1, MOR: 11 }, special: ["Immovable", "Bulwark", "Towering"], skills: ["deep_root_stance"] },
    { name: "Ancient Grove Walker", faction: "rootwalkers", points_cost: 100, role: "Massive regenerating assault engine", fragment_interactions: "Root Pulse", flavor_text: "The grove walks. The grove is going somewhere specific. Something is about to be very unhappy.", description: "A massive ambulatory grove — a cluster of ancient trees that have fused into a single enormous organism and learned to advance. Ancient Grove Walkers are Massive, Regeneration (2 HP per End Phase at this scale), and possess Root Pulse. Their movement plants Root tiles across enormous swaths of the board. They are the faction's premier offensive war machine — not fast, but absolutely devastating when they arrive.", type: "War Machine", stats: { ATK: 21, DEF: 7, HP: 48, MOV: 3, RNG: 1, MOR: 10 }, special: ["Massive", "Regeneration"], skills: ["root_pulse"] },
    { name: "Root Colossus", faction: "rootwalkers", points_cost: 120, role: "Super-heavy immovable fortress engine", fragment_interactions: "All Root synergies", flavor_text: "You cannot fight the ground. The Root Colossus is the ground.", description: "The heaviest standard war machine in the faction — a Root Colossus is Massive, Towering, Fearless, and Immovable. It cannot be moved, pushed, or displaced. At ATK 24 and DEF 8 with 54 HP, it is a win condition in itself — the enemy must either destroy it (extremely difficult) or route around it (losing all territory behind it to Root tiles). Take Deep Root Stance by turn 3 and never move again.", type: "War Machine", stats: { ATK: 24, DEF: 8, HP: 54, MOV: 2, RNG: 1, MOR: 11 }, special: ["Massive", "Towering", "Fearless", "Immovable"] },
    { name: "Verdant Engine", faction: "rootwalkers", points_cost: 95, role: "Heavy indirect fire engine", fragment_interactions: "Thorn Volley", flavor_text: "It has learned the range to every point on this map. It will now demonstrate this knowledge.", description: "A massive organic artillery engine combining heavy ATK, long range, Indirect Fire, and Blast 3. The Verdant Engine seeds Root terrain with every Thorn Volley shot, converting impact zones and dramatically expanding the Root network at range. By mid-game, a Verdant Engine that has fired every turn has seeded Root tiles across most of the enemy-side board.", type: "War Machine", stats: { ATK: 18, DEF: 8, HP: 42, MOV: 2, RNG: 8, MOR: 10 }, special: ["Indirect Fire", "Blast 3"], skills: ["thorn_volley"] },
    { name: "Briarthorn Siege", faction: "rootwalkers", points_cost: 85, role: "Anti-armor siege war machine", fragment_interactions: "Root terrain advance", flavor_text: "It was designed to break walls. It has not been told the difference between walls and armies.", description: "A dedicated siege-breaking and anti-armor war machine. The Briarthorn Siege has Anti-Armor (ignores DEF bonuses from armor), Siege (ignores cover for targeting), and Blast 2. Its seeds Root tiles along its movement path. Designed to crack open fortified positions and War Machine clusters, it is the counter-unit answer to heavily armored opponents.", type: "War Machine", stats: { ATK: 18, DEF: 7, HP: 36, MOV: 2, RNG: 5, MOR: 9 }, special: ["Anti-Armor", "Siege", "Blast 2"] },
    { name: "Sapwood Titan", faction: "rootwalkers", points_cost: 110, role: "Regenerating heavy anchor", fragment_interactions: "Root terrain and regeneration", flavor_text: "It heals faster than you can wound it. This is not a metaphor.", description: "The faction's most resilient standard war machine. The Sapwood Titan has Regeneration (2 HP per End Phase), Massive, and Stubborn. Its HP recovery rate makes focused fire inefficient — you need to destroy it in a single concentrated effort or it will regenerate back to fighting condition. Combined with Root terrain bonuses, the Sapwood Titan is nearly unkillable in a Deep-Rooted board state.", type: "War Machine", stats: { ATK: 21, DEF: 9, HP: 48, MOV: 2, RNG: 1, MOR: 11 }, special: ["Regeneration", "Massive", "Stubborn"] },
    { name: "Grove Hulk", faction: "rootwalkers", points_cost: 75, role: "Heavy melee defensive engine", fragment_interactions: "Deep Root Stance", flavor_text: "It is large. It is slow. These are not weaknesses. These are the terms of engagement.", description: "A massive Rootwalker war machine designed for defensive anchoring. The Grove Hulk has the Massive keyword and Deep Root Stance access. At DEF 9 in Deep Root Stance, it becomes one of the hardest units to kill in any army. It exists to hold objectives and absorb enemy attention while the Root network expands around it.", type: "War Machine", stats: { ATK: 15, DEF: 9, HP: 36, MOV: 2, RNG: 1, MOR: 10 }, special: ["Massive"], skills: ["deep_root_stance"] },
    { name: "Ancient Oak Sentinel", faction: "rootwalkers", points_cost: 65, role: "Immovable objective sentinel", fragment_interactions: "Deep Root Stance", flavor_text: "It has been standing guard since before there was anything to guard against.", description: "A cheaper Immovable war machine that combines Immovable, Stubborn, and Bulwark with Deep Root Stance. The Ancient Oak Sentinel is the faction's most cost-efficient objective-holding war machine — it cannot be displaced, it intercepts attacks on adjacent allies, and its Deep Root Stance brings it to a respectable DEF 12. Cheaper than the Thornwall Construct but less devastating.", type: "War Machine", stats: { ATK: 12, DEF: 10, HP: 36, MOV: 1, RNG: 1, MOR: 11 }, special: ["Immovable", "Stubborn", "Bulwark"], skills: ["deep_root_stance"] },
    { name: "Thornspire", faction: "rootwalkers", points_cost: 70, role: "Long-range indirect thorn artillery", fragment_interactions: "Thorn Volley", flavor_text: "Range 10. Everything within range 10 is aware of this fact.", description: "A specialized long-range thorn artillery piece that combines RNG 10, Indirect Fire, and Blast 2 with Thorn Volley terrain seeding. The Thornspire is the faction's longest-range Root-seeder — it can plant Root terrain in any corner of a standard-size board from a protected backfield position. Its ATK 18 makes its actual damage output surprisingly respectable.", type: "War Machine", stats: { ATK: 18, DEF: 7, HP: 30, MOV: 1, RNG: 10, MOR: 9 }, special: ["Indirect Fire", "Blast 2"], skills: ["thorn_volley"] },
    { name: "Deepwood Elder", faction: "rootwalkers", points_cost: 150, role: "Legendary apex war machine", fragment_interactions: "All Root synergies at maximum scale", flavor_text: "It was walking before the oldest Rootwalker commander was a seed. It has not hurried since.", description: "The Legendary war machine of the Rootwalker faction — only available when Deepwood Eldest is your commander. The Deepwood Elder is Towering, Fearless, Massive, Regeneration, and Legendary (one per army). At ATK 27, DEF 10, and 60 HP, it is the single most durable unit in the faction. Its Ancient Call, Root Pulse, and Deep Root Stance combination makes every turn it survives a further deterioration of the enemy's tactical position. It is not a unit. It is a campaign.", type: "War Machine", stats: { ATK: 27, DEF: 10, HP: 60, MOV: 2, RNG: 1, MOR: 13 }, special: ["Towering", "Fearless", "Massive", "Regeneration", "Legendary (Deepwood Eldest only)"], skills: ["ancient_call", "root_pulse", "deep_root_stance"], legendary: true, legendary_cmdr: "Deepwood Eldest" }

  );

  // ===========================
  // FRAGMENTS (12)
  // ===========================

  gameData.fragments.push(
    { name: "Root Core", faction: "rootwalkers", effects: "Seed 2 Root tiles at any point within 6\" (free action, once per turn)", risk_instability: "None", activation_cost: 1, interaction_evolution: "Sylvara doubles the Root tile placement count" },
    { name: "Living Bark", faction: "rootwalkers", effects: "+2 DEF to one unit this turn; if on a Root tile, +3 DEF instead", risk_instability: "Low", activation_cost: 1, interaction_evolution: "Greyroot and Verdant Patriarch can extend the bonus through the next turn" },
    { name: "Ancient Seed Fragment", faction: "rootwalkers", effects: "At round start, Ancient Growth spreads 2 tiles this round instead of 1", risk_instability: "None", activation_cost: 1, interaction_evolution: "Stackable: two Ancient Seed Fragments spread 4 tiles per round" },
    { name: "Thornwall Shard", faction: "rootwalkers", effects: "Create a 4\" length of blocking Root terrain anywhere on the board (costs 1 tile to place)", risk_instability: "Low", activation_cost: 2, interaction_evolution: "Verdant Patriarch's Reclaim can convert the wall into Dense Root" },
    { name: "Entangle Web", faction: "rootwalkers", effects: "Apply Entangle to all enemies currently adjacent to Root tiles (no attack roll required)", risk_instability: "Medium", activation_cost: 3, interaction_evolution: "Mass-Entangle; devastating when Root tiles surround enemy formations" },
    { name: "Verdant Surge", faction: "rootwalkers", effects: "+1 MOV to all Rootwalker units this turn; Root-Walk units treat all terrain as Open Ground this turn", risk_instability: "Low", activation_cost: 2, interaction_evolution: "With Verdant Shepherd's aura, the total MOV bonus stacks to +2 for adjacent allies" },
    { name: "Deep Root Crystal", faction: "rootwalkers", effects: "One unit gains Deep Root bonus (+2 DEF, 1 HP regen) without skipping movement this turn", risk_instability: "None", activation_cost: 2, interaction_evolution: "Commanders can use this fragment to maintain Deep Root bonuses while still repositioning" },
    { name: "Root Pulse Amplifier", faction: "rootwalkers", effects: "Root Pulse range increases by +4\" this turn; damage increased to 2 per root tile", risk_instability: "Medium", activation_cost: 3, interaction_evolution: "Combined with Sapwood Seer or Mossborn Elder's Root Pulse, can deal 2+ damage across the entire board" },
    { name: "Ancient Memory Shard", faction: "rootwalkers", effects: "One commander may use a skill they do not normally have access to (from the faction skill list) for this turn only", risk_instability: "High", activation_cost: 3, interaction_evolution: "Allows any commander to use Ancient Call once — effective for emergency summons" },
    { name: "Verdant Armor", faction: "rootwalkers", effects: "One unit ignores all morale check failures this turn and gains Fire Resistant for 1 round", risk_instability: "None", activation_cost: 2, interaction_evolution: "Essential against Emberclaw; protects Root terrain defenders from fire terrain effects" },
    { name: "Living Root Network", faction: "rootwalkers", effects: "Teleport one Rootwalker unit to within 2\" of any Root tile on the board (Root-Walk only)", risk_instability: "Low", activation_cost: 2, interaction_evolution: "The faction's limited mobility answer; Ivywarden can use this to cross the board in one action" },
    { name: "Bark of the Eldest", faction: "rootwalkers", effects: "One unit gains Legendary-tier resilience for 1 turn: ignore first wound, all damage reduced by 1", risk_instability: "Very High", activation_cost: 4, interaction_evolution: "High instability risk — but on the Deepwood Eldest or Root Colossus, the survivability becomes nearly absolute for that turn" }
  );

})();
