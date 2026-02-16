(function() {
  // ==========================
  // EMBERCLAW WARPACK FACTION
  // ==========================

  gameData.factions.push({
    id: "emberclaw-warpack",
    name: "Emberclaw Warpack",
    icon: "🐉",
    color: "#ff6b35",
    theme: "Dragon-bonded aerial warriors who wield dragonfire and soar on drake-back",
    flavor_text: "The sky belongs to the Warpack. From burning nests in the Scorched Peaks, drake riders descend with fire and fury, honoring the ancient pact between mortal and dragon.",
    motif_description: "A fusion of draconic majesty and tribal warrior culture — scales, wings, flame breath, and fierce loyalty to the dragon hierarchy.",
    core_philosophy: "Strength through bonding; power through flame; glory through the skies.",
    
    faction_bonuses: [
      "All flying units ignore terrain when moving",
      "Breath Weapon attacks ignore cover",
      "Drake Bond: Riders paired with drakes gain +1 ATK and share wounds",
      "Flame Aura: Units with Fire keyword deal +1 damage to adjacent enemies at the start of each turn"
    ],
    
    playstyle_notes: "Emberclaw excels at aerial dominance and alpha strikes. Use flying units to bypass enemy lines, position breath weapons for devastating templates, and maintain Drake Bonds for resilient shock troops. Vulnerable to massed ranged fire before closing distance.",
    
    worldview: [
      "Dragons are the apex of evolution — perfection given wings and fire",
      "The Bond between rider and drake is sacred; breaking it is the highest crime",
      "Fire cleanses weakness; those who survive the flame are worthy",
      "The sky is the true battlefield — ground combat is for the unbonded"
    ],
    
    political_structure: "The Warpack is led by the Ember Council — five Flamewarden elders who have survived their drakes' deaths and continue to lead. Below them, Nests (clans) compete for hunting rights, prestige, and access to dragon clutches.",
    
    flame_creed: {
      overview: "The Flame Creed teaches that fire is the primordial force of transformation. Only through fire can the weak become strong, the unworthy be purged, and the Bond between drake and rider be forged.",
      tenets: [
        {
          name: "The First Flame",
          concept: "All life began in dragonfire; to return to flame is to return to origin",
          implications: [
            "Emberclaw cremate their dead in ceremonial pyres, believing the smoke carries souls to the First Drake",
            "Fire is never profane — even enemy fire is respected as a distant cousin to dragonflame",
            "To die by fire is honorable; to flee from it is cowardice"
          ],
          mechanics: [
            "Units with the Fire keyword cannot be demoralized by other Fire attacks",
            "Pyromancer abilities cost 1 less activation",
            "Burning terrain counts as friendly for Emberclaw units"
          ],
          symbol: "🔥 The Eternal Ember — a flame that never dies, kept burning in every Nest's hearth"
        },
        {
          name: "The Bond Unbroken",
          concept: "Rider and drake are two halves of one soul; their bond transcends death",
          implications: [
            "Bonded pairs train together from hatchling-hood, developing instinctive coordination",
            "If a drake dies, the rider must survive one year of mourning before bonding again",
            "Unbonded warriors are pitied but respected — they have known loss"
          ],
          mechanics: [
            "Bonded units (rider + drake) share a wound pool and activate simultaneously",
            "If one half dies, the other gains Vengeful (+2 ATK, Fearless) for rest of battle",
            "Bonded units can use each other's special abilities"
          ],
          symbol: "⛓️ The Twin Clasp — interlocking drake-claw and rider-hand"
        },
        {
          name: "The Ascent",
          concept: "The sky is salvation; the ground is suffering; to rise is to become greater",
          implications: [
            "Flight is the ultimate aspiration — even ground troops dream of earning wings",
            "Nests are built in mountains and cliffs; to live below the clouds is shameful",
            "Enemies who cannot fly are inherently inferior and must prove their worth"
          ],
          mechanics: [
            "Flying units gain +1 MOR",
            "Grounded (forced to land) units lose 1 MOR until they fly again",
            "Objectives on high ground are worth double victory points for Emberclaw"
          ],
          symbol: "🪽 The Rising Talon — a drake claw pointed skyward"
        }
      ],
      creed_in_practice: {
        training: "Initiates are paired with drake hatchlings at age seven; they grow together, learning to fight as one. Ground training emphasizes rapid strikes and withdrawal — the Warpack does not hold territory, it claims and abandons with the wind.",
        hierarchy_integration: "Rank is determined by drake size and age — elder drakes command respect regardless of rider status. The Ember Council consists of riders whose drakes died of old age, granting them wisdom beyond the Bond.",
        combat_philosophy: "Strike from above, exhale fire, disengage before retaliation. Repeat until nothing remains. The Warpack does not grind — it ignites and moves on."
      },
      keywords: ["Dragonfire", "The Bond", "Aerial Supremacy", "Scorched Earth", "Flame-Touched"]
    },

    hierarchy: {
      overview: "Emberclaw hierarchy is dual — both the rider's skill and the drake's lineage determine rank. A young rider with an ancient drake outranks a veteran rider with a juvenile.",
      ranks: [
        {
          title: "Flamewarden",
          role: "Ember Council member; unbonded elder who has outlived their drake",
          responsibilities: [
            "Lead the five great Nests and arbitrate disputes over hunting grounds",
            "Oversee the sacred Hatcheries where dragon eggs are incubated",
            "Declare war, negotiate treaties, and speak to the First Drake in visions"
          ],
          characteristics: [
            "Scarred by decades of dragonfire; many bear burn marks as badges of honor",
            "Command respect through wisdom, not strength — they are beyond the Hunt",
            "Maintain the Flame Vaults where ancestral drake-scales are preserved"
          ]
        },
        {
          title: "Scorchcaller",
          role: "Elite drake rider bonded to an Ancient or Wyrm-class drake",
          responsibilities: [
            "Lead warbands of 20-50 riders in coordinated strikes",
            "Execute long-range reconnaissance and hunt enemy commanders",
            "Train the next generation in aerial combat and breath-targeting"
          ],
          characteristics: [
            "Their drakes are 50+ years old, massive and battle-scarred",
            "Wear drake-scale armor harvested from their partner's molted skin",
            "Can communicate with their drake through thought alone"
          ]
        },
        {
          title: "Emberknight",
          role: "Veteran rider bonded to a Mature drake (20-49 years old)",
          responsibilities: [
            "Form the Warpack's core strike force",
            "Patrol Nest territories and enforce Council edicts",
            "Hunt megafauna and enemy war machines"
          ],
          characteristics: [
            "Wear the Ember Cloak — a red-and-gold mantle earned after 50 confirmed kills",
            "Lead squads of 3-5 bonded pairs in synchronized attacks",
            "Entitled to claim a second drake egg if their first partner dies honorably"
          ]
        },
        {
          title: "Skytalon",
          role: "Rider bonded to a Young drake (5-19 years old)",
          responsibilities: [
            "Execute raids, ambushes, and harassment missions",
            "Escort ground forces and provide aerial cover",
            "Complete the Trials of Flame to earn promotion"
          ],
          characteristics: [
            "Most numerous rank; aggressive and eager to prove themselves",
            "Their drakes are agile but smaller, suited for hit-and-run tactics",
            "Must complete 20 successful hunts to be considered for Emberknight"
          ]
        },
        {
          title: "Ashrider",
          role: "Initiated warrior bonded to a Fledgling drake (under 5 years old)",
          responsibilities: [
            "Learn combat fundamentals while their drake matures",
            "Serve as ground support, scouts, and message couriers",
            "Undergo the Branding — a ritual burn to test their pain tolerance"
          ],
          characteristics: [
            "Wear light leather armor; their drakes cannot yet carry full plate",
            "Fight with javelins and shortbows while training for breath weapons",
            "High mortality rate — many fledglings die young, as do their riders"
          ]
        },
        {
          title: "The Unbonded",
          role: "Warriors who lost their drake or never earned one",
          responsibilities: [
            "Serve as ground infantry, beast handlers, and support troops",
            "Maintain the Nests, forge weapons, and tend the Hatcheries",
            "Earn a second chance at bonding through exceptional service"
          ],
          characteristics: [
            "Deeply respected for sacrifice, but excluded from aerial command",
            "Often become pyromancers, weaponizing fire without a drake",
            "Some choose voluntary exile, deeming their loss too shameful to endure"
          ]
        }
      ],
      titles_table: [
        { title: "Dragonblooded", significance: "Rider who has drunk drake blood in the Bonding Rite", notes: "Grants fire resistance" },
        { title: "Skybreaker", significance: "Rider who has killed an enemy flyer mid-air", notes: "Earns right to paint their drake's wings" },
        { title: "Ashborn", significance: "Survivor of a pyre accident or drake fire mishap", notes: "Wears burn scars openly as proof of toughness" },
        { title: "Clutchfather/Clutchmother", significance: "Rider whose drake has successfully hatched offspring", notes: "Granted extra rations and nest priority" },
        { title: "Flamesworn", significance: "Rider who has bonded with three drakes across a lifetime", notes: "Extremely rare; revered as blessed" },
        { title: "The Scorched", significance: "Unbonded warrior serving penance for oath-breaking", notes: "Forbidden from flight until redemption" }
      ],
      hierarchy_notes: [
        "Drakes have their own hierarchy separate from riders — elder drakes command younger ones regardless of rider rank",
        "A rider cannot command a drake older than their own unless in emergencies",
        "The Council can strip a rider of their Bond if they mistreat or neglect their drake",
        "Nest affiliation is stronger than clan or family — riders live and die with their Nest"
      ],
      keywords: ["Drake Bond", "Nest Loyalty", "Sky Honor", "Fire Hierarchy", "Unbonded Penance"]
    },

    dragon_tyrant: {
      title: "The Crimson Tyrant",
      role: "The First Drake — progenitor of all dragons and demi-god of the Emberclaw",
      faction_rank: "Divine ancestor; worshipped but never seen",
      aliases: [
        "The Eternal Flame",
        "Mother of Scales",
        "She-Who-Burns-Forever"
      ],
      summary: "The Crimson Tyrant is the mythic First Drake, said to have ignited the First Flame at the dawn of time. Emberclaw believe she sleeps in the molten core of the world, and that all drakes descend from her bloodline. She appears in visions to the Ember Council, granting prophecy through fever-dreams.",
      appearance: [
        "Descriptions vary — some say she is a serpent of living magma; others say she has wings that blot out the sun",
        "Always depicted with crimson scales and eyes like furnaces",
        "Said to be larger than mountains, her heartbeat causing earthquakes"
      ],
      personality: [
        { trait: "Wrathful", description: "Punishes cowardice and oath-breaking with volcanic eruptions" },
        { trait: "Maternal", description: "Fiercely protective of all drakes; riders who harm drakes suffer her curse" },
        { trait: "Indifferent", description: "Mortals are beneath her notice unless they prove exceptional" }
      ],
      abilities: [
        { name: "The First Breath", description: "Can exhale dragonfire hot enough to melt stone into glass — legends say her breath created the Scorched Peaks" },
        { name: "Eternal Regeneration", description: "Cannot be killed; even if wounded, she retreats into the earth to heal over centuries" },
        { name: "Dream-Voice", description: "Speaks to the Ember Council in visions, granting cryptic guidance" }
      ],
      faction_role: [
        { area: "Religion", detail: "The Tyrant is worshipped through fire — every pyre, every breath weapon, is a prayer" },
        { area: "Law", detail: "Her edicts, delivered through Council visions, are absolute law" },
        { area: "War", detail: "Battles are fought in her name; 'For the Tyrant and the Flame!' is the Warpack warcry" }
      ],
      lore_notes: [
        "No living rider has seen the Tyrant — only the Ember Council claims contact",
        "Some scholars believe the Tyrant is a metaphor, not a literal being",
        "Drake aggression spikes during volcanic activity — Emberclaw interpret this as the Tyrant's stirring",
        "Every century, the Council sends a pilgrimage to the Fireheart Caldera seeking her lair; none return"
      ],
      keywords: ["Divine Progenitor", "Fire Incarnate", "Eternal Wrath", "Dream-Speaker", "Mother of Drakes"]
    },

    drake_stages: {
      overview: "Drakes mature through five life stages, each granting new abilities and size. Riders must adapt to their drake's growth, as tactics change dramatically from fledgling agility to ancient devastation.",
      stages: [
        {
          stage_number: 1,
          name: "Fledgling (0-4 years)",
          overview: "Hatchling drakes barely larger than war dogs; agile but fragile, their fire is weak.",
          physical: [
            "Wingspan: 8-12 feet; length: 6-10 feet",
            "Scales are soft, colorful, and shed frequently",
            "Cannot carry armored riders — maximum 150 lbs"
          ],
          abilities: [
            "Spark Breath — short-range (6\") fire cone, weak damage but sets targets on fire",
            "Agile Flight — can turn mid-move without penalty",
            "Bite and Claw — basic melee attacks"
          ],
          behavior: [
            "Playful, curious, prone to distraction",
            "Bond with rider is forming — not yet instinctive",
            "High mortality — predators, accidents, and disease claim 40% before age 5"
          ]
        },
        {
          stage_number: 2,
          name: "Young Drake (5-19 years)",
          overview: "Adolescent drakes the size of horses; aggressive, volatile, but learning discipline.",
          physical: [
            "Wingspan: 20-30 feet; length: 15-25 feet",
            "Scales harden and darken to adult coloration (reds, golds, blacks)",
            "Can carry armored rider + light gear (up to 300 lbs)"
          ],
          abilities: [
            "Flame Breath — 12\" cone, moderate damage, ignores light cover",
            "Dive Attack — charge from above for +2 ATK on impact",
            "Tail Sweep — melee AoE in rear arc"
          ],
          behavior: [
            "Territorial, competitive with other drakes",
            "Bond deepens — rider can sense drake's emotions",
            "Eager to prove themselves in combat"
          ]
        },
        {
          stage_number: 3,
          name: "Mature Drake (20-49 years)",
          overview: "Prime-age drakes; powerful, disciplined, and lethal. The Warpack's core strength.",
          physical: [
            "Wingspan: 40-60 feet; length: 30-50 feet",
            "Thick scales provide natural armor (DEF 5+)",
            "Can carry full plate rider + weapons + supplies (up to 600 lbs)"
          ],
          abilities: [
            "Inferno Breath — 18\" cone template, heavy damage, destroys cover",
            "Rending Claws — melee attacks ignore 1 point of DEF",
            "Intimidating Roar — AoE morale test for enemies within 12\""
          ],
          behavior: [
            "Calm, focused, obedient to bonded rider",
            "The Bond is complete — rider and drake act as one mind",
            "Protective of their Nest and rider's family"
          ]
        },
        {
          stage_number: 4,
          name: "Ancient Drake (50-99 years)",
          overview: "Elder drakes of immense size and power; living siege engines.",
          physical: [
            "Wingspan: 70-100 feet; length: 60-80 feet",
            "Scarred from decades of battle, scales like iron plates",
            "Can carry two riders or heavy artillery platforms"
          ],
          abilities: [
            "Dragonfire Blast — 24\" cone, massive damage, destroys terrain",
            "Wing Buffet — knock back enemies in 180° arc",
            "Ancient Resilience — ignore first wound each turn"
          ],
          behavior: [
            "Wise, calculating, sometimes independent",
            "Command younger drakes through dominance displays",
            "May outlive their rider — ancient drakes who lose Bonds become reclusive"
          ]
        },
        {
          stage_number: 5,
          name: "Wyrm (100+ years)",
          overview: "Legendary drakes of monstrous size; rare, revered, and nearly unstoppable.",
          physical: [
            "Wingspan: 120+ feet; length: 90+ feet",
            "Scales have fused into armor harder than steel (DEF 7+)",
            "Too large for normal riders — serve as mobile fortresses"
          ],
          abilities: [
            "Cataclysm Breath — entire board quadrant affected by fire",
            "Earthquake Landing — crash-land for AoE damage and difficult terrain",
            "Ancient Cunning — can use tactical abilities normally reserved for commanders"
          ],
          behavior: [
            "Solitary, answer to no one except the Ember Council  ",
            "Their mere presence is a strategic asset",
            "Only 3-5 Wyrms exist at any time across all Nests"
          ]
        }
      ],
      progression_notes: [
        "Drake aging is unpredictable — some mature faster if exposed to heavy combat",
        "Drakes bonded to exceptional riders live longer than unbonded drakes",
        "Stage transitions are marked by molt-shedding and a 'hunger season' where drakes eat constantly"
      ],
      keywords: ["Drake Maturation", "Bonded Growth", "Wingspan", "Fire Evolution", "Ancient Power"]
    },

    military_doctrine: {
      overview: "Emberclaw warfare is built on three principles: speed, fire, and terror. Strike before the enemy can form ranks, burn away their defenses, and scatter them with fear. Never engage in prolonged ground combat — the sky is your fortress.",
      core_principles: [
        {
          name: "Vertical Envelopment",
          details: [
            "Use altitude advantage to bypass enemy frontlines entirely",
            "Deploy directly onto objectives, ignoring chokepoints and fortifications",
            "Force enemies to fight on multiple levels, overwhelming their coordination"
          ]
        },
        {
          name: "Breath Weapon Superiority",
          details: [
            "Breath templates are Emberclaw's primary weapon — position for maximum overlap",
            "Target clusters of infantry; waste no fire on single targets",
            "Layer breath attacks — first wave softens, second wave annihilates"
          ]
        },
        {
          name: "The Scorched Strike",
          details: [
            "Emberclaw does not hold ground; they claim it, burn it, and move on",
            "Leave nothing for the enemy to use — burn supplies, destroy terrain, poison wells with ash",
            "Psychological warfare — the memory of dragonfire lingers longer than wounds"
          ]
        }
      ],
      battlefield_behavior: [
        {
          name: "Opening Phase",
          details: [
            "Fast scouts (Fledgling drakes) identify enemy ranged threats",
            "Main force stays out of range until positioning is optimal",
            "Pyromancers create smoke screens or ignite terrain for cover"
          ]
        },
        {
          name: "Engagement",
          details: [
            "Mature drakes dive from altitude, unleashing breath weapons on approach",
            "Ground troops (Unbonded) surge forward to exploit panic and disarray",
            "Ancient drakes target war machines, commanders, or fortifications"
          ]
        },
        {
          name: "Disengagement",
          details: [
            "Riders withdraw before enemy can counterattack effectively",
            "Leave burning terrain to delay pursuit",
            "Regroup in the air, reassess, strike again from a new angle"
          ]
        }
      ],
      strategic_notes: [
        "Emberclaw struggles against heavily fortified positions with overlapping anti-air",
        "Weather affects breath weapons — rain reduces Fire damage; wind disperses smoke",
        "The Warpack's greatest weakness is overconfidence — riders sometimes pursue glory over victory"
      ],
      keywords: ["Hit and Run", "Aerial Blitz", "Scorched Earth", "Breath Templates", "Terror Tactics"]
    },

    war_machines_lore: {
      overview: "Emberclaw war machines are rare — the Warpack trusts drakes over constructs. However, flightless siege engines exist: mobile ballistae, fire-catapults, and grounded war-drakes too old or injured to fly.",
      general_characteristics: [
        { trait: "Fire-Based Ammunition", detail: "All siege engines use incendiary payloads — burning oil, explosive cinders, or phosphor shells" },
        { trait: "Mobile Platforms", detail: "Designed to redeploy rapidly; static siegeworks are considered cowardly" },
        { trait: "Drake-Blessed", detail: "Each war machine is blessed by a Flamewarden and painted with drake-scale sigils for luck" }
      ],
      tactical_role: [
        "Emberclaw war machines provide heavy firepower when drakes are unavailable or when area denial is needed",
        "Used primarily in defensive scenarios — protecting Nest territory or covering retreats",
        "Operated by Unbonded warriors seeking redemption through service"
      ],
      keywords: ["Incendiary Siege", "Mobile Artillery", "Unbonded Crews", "Fire Support"]
    },

    signature_weapons: {
      overview: "Emberclaw weapons are extensions of the flame — forged in drake-fire, quenched in drake blood, and enchanted with pyromantic runes.",
      core_traits: [
        { trait: "Flame-Forged", detail: "Weapons are made from meteoric iron heated in drake breath until white-hot, then shaped by master smiths" },
        { trait: "Fire Runes", detail: "Pyromantic symbols etched into blades cause weapons to ignite on command" },
        { trait: "Blood-Quench", detail: "Final quenching in drake blood bonds the weapon to fire magic permanently" }
      ],
      weapons: [
        {
          name: "Emberfang Glaive",
          type: "Polearm",
          wielder: "Scorchcaller elites",
          properties: "Reach weapon; can ignite for +1 ATK and Fire keyword; burning blade illuminates darkness",
          lore: "A curved blade mounted on a 10-foot haft, designed for aerial combat. Riders use it to strike from above while maintaining control of their drake."
        },
        {
          name: "Ashclaw Gauntlets",
          type: "Melee Enhancement",
          wielder: "Emberknights and pyromancers",
          properties: "Unarmed attacks gain Fire keyword; can project small flame bursts (6\" range)",
          lore: "Articulated gauntlets with drake-claw tips. Allow the wearer to grasp burning objects without harm and channel fire through their fists."
        },
        {
          name: "Scorchbow",
          type: "Crossbow",
          wielder: "Skytalon scouts",
          properties: "Fires incendiary bolts; targets hit continue burning for 1d3 turns",
          lore: "A lightweight crossbow firing oil-soaked bolts with phosphor tips. Used by riders too young for drakes with strong breath  weapons."
        },
        {
          name: "Flameheart Lance",
          type: "Cavalry Lance",
          wielder: "Elite drake-mounted chargers",
          properties: "Charge attacks deal +2 ATK and set target on fire; shatters on impact",
          lore: "A hollow lance filled with alchemical fire. Designed to pierce armor and inject burning payload directly into the wound. Single-use."
        },
        {
          name: "Pyroclast Grenades",
          type: "Thrown Explosive",
          wielder: "Unbonded ground troops",
          properties: "3\" blast template; sets terrain on fire",
          lore: "Glass spheres filled with concentrated drake bile and powdered magnesium. Explodes on impact into a ball of white-hot flame."
        },
        {
          name: "Drakebone Warblade",
          type: "Two-Handed Sword",
          wielder: "Flamewarden champions",
          properties: "Ignores 1 point of enemy DEF; wielder is immune to Fire damage",
          lore: "Forged from the bones of a Wyrm who died of old age. The blade retains the drake's fire resistance and channels heat into devastating cuts."
        },
        {
          name: "The Ember Crown",
          type: "Command Artifact",
          wielder: "Ember Council members only",
          properties: "Grants +2 Command; allows bearer to command drakes without a Bond",
          lore: "A circlet of intertwined drake fangs, said to contain a fragment of the Crimson Tyrant's first shed scale. Marks the bearer as speaker for the First Drake."
        }
      ],
      tactical_notes: [
        "Most Emberclaw weapons are lightweight for aerial combat — heavy armor is rare",
        "Fire weapons require careful ammunition management — alchemical fuel is expensive",
        "Unbonded troops carry heavier gear since they aren't weight-limited by drake carrying capacity"
      ],
      keywords: ["Flame-Forged", "Pyromantic Runes", "Aerial Weapons", "Incendiary", "Drake-Blessed"]
    },

    fragment_source: {
      overview: "The Emberclaw's fragment source is the Fireheart — a crystallized core of pure thermal energy buried deep beneath the Scorched Peaks. Legends say it is a solidified piece of the Crimson Tyrant's heartbeat.",
      primary_name: "The Fireheart Nexus",
      aliases: [
        "The Eternal Coal",
        "The Tyrant's Pulse",
        "The Burning Core"
      ],
      nature: [
        { trait: "Volcanic Origin", detail: "The Fireheart lies at the convergence of three magma channels; the heat is so intense that metal sublimates instantly" },
        { trait: "Fragment Generation", detail: "Extreme pressure and heat crystallize magma into fire-aspected fragments every few decades" },
        { trait: "Sentience", detail: "The Fireheart pulses in rhythm with volcanic activity; some believe it is alive, a sleeping organ of the Crimson Tyrant" }
      ],
      relationship: [
        {
          aspect: "Harvesting",
          details: [
            "Only the Ember Council knows the Fireheart's exact location",
            "Fragments are retrieved by Unbonded volunteers on suicide missions into the lava depths",
            "Survivors of a Fireheart expedition are granted automatic rebonding with a drake of their choice"
          ]
        },
        {
          aspect: "Fragment Type",
          details: [
            "Emberclaw fragments are Fire-aspected: amplify heat, ignite objects, enhance breath weapons",
            "Unstable fragments can cause spontaneous combustion if  overused",
            "The Warpack believes fragments are literal pieces of the Tyrant's heart"
          ]
        }
      ],
      lore_notes: [
        "Every Emberclaw fragment radiates heat — they glow faintly red even when dormant",
        "Using too many fragments at once can cause heat stroke in the wielder",
        "Enemy factions have attempted to raid the Fireheart; all expeditions have burned alive before reaching it",
        "The Fireheart's pulse-rate accelerates before volcanic eruptions, serving as a natural warning system"
      ],
      influence_on_philosophy: [
        "The Fireheart proves that fire is eternal — it has burned since before mortal memory",
        "The difficulty of harvesting fragments reinforces the Emberclaw value of sacrifice and risk",
        "Fragments are sacred; wasting their power through carelessness is sacrilege"
      ],
      keywords: ["Fireheart", "Volcanic Fragments", "Tyrant's Pulse", "Fire Aspect", "Thermal Nexus"]
    },

    historical_background: {
      origins: "The Emberclaw Warpack originated 800 years ago when the nomadic Ashwalker tribes discovered the first dragon clutch in the Scorched Peaks. A young girl named Seryth bonded with a hatchling, creating the first Drake Bond. Within a generation, the Ashwalkers had transformed from scattered clans into a unified Warpack.",
      rise_to_power: "The Warpack expanded rapidly, conquering neighboring territories through aerial superiority. Their ability to strike anywhere, anytime, made traditional fortifications obsolete. Within 200 years, the Emberclaw controlled the entire Scorched Peaks region and forced even the Iron Dominion to negotiate trade treaties rather than risk open war.",
      major_conflicts: [
        {
          name: "The Skybreaker Rebellion",
          description: "400 years ago, a rogue Flamewarden attempted to claim all Wyrms for his personal Nest, fracturing the Warpack into civil war. Ended when the Crimson Tyrant appeared in a dream-vision, cursing the traitor's bloodline."
        },
        {
          name: "The Siege of Ashfall Citadel",
          description: "The Iron Dominion attempted to invade using anti-air war machines and Grid tactics. Emberclaw lost 200 drakes but held the Peaks. The battle proved that even aerial dominance has limits against prepared ground forces."
        },
        {
          name: "The Clutch Plague",
          description: "50 years ago, a mysterious disease killed 80% of hatchlings across three seasons. The Warpack nearly collapsed. Flamewarden Kora sacrificed herself diving into the Fireheart, emerging with a burning cure that saved the remaining eggs but left her body transformed into living flame."
        }
      ]
    },

    culture_philosophy: {
      overview: "Emberclaw culture revolves around three pillars: Fire, Flight, and the Bond. Every aspect of life is filtered through these values.",
      three_pillars_expanded: [
        { pillar: "Fire", focus: "Transformation through heat — only pressure creates strength" },
        { pillar: "Flight", focus: "Freedom and superiority — the sky is dominion" },
        { pillar: "The Bond", focus: "Partnership transcending individuality — two souls, one purpose" }
      ],
      cultural_practices: [
        "The Bonding Rite: At age 7, initiates drink diluted drake blood mixed with ash, linking their fate to dragonkind",
        "The Shedding Festival: When drakes molt, their discarded scales are forged into armor and weapons in communal workshops",
        "Flame-Speaking: A trance-meditation where pyromancers commune with fire, seeking visions",
        "Sky Burial: The dead are cremated on clifftop pyres; the smoke carries them to the Tyrant"
      ],
      symbols: [
        "The Emberclaw (crossed drake talon and rider fist) — unity between mortal and dragon",
        "The Scorched Peak — endurance through fire",
        "The Rising Sun — dawn raids, when drakes are most aggressive",
        "The Broken Chain — rejection of earthbound limitations"
      ]
    },

    military_traditions: {
      battlefield_philosophy: [
        "The sky is a fortress no enemy can siege",
        "Fire purifies the battlefield — burn the fallen, enemy and ally alike",
        "A single bonded pair is worth ten unbonded soldiers",
        "Victory belongs to the swift — prolonged battles favor the enemy"
      ],
      rites_of_warfare: [
        "Before battle, riders paint their drakes with ash-symbols representing their Nest",
        "The First Breath: Each warband begins combat with a synchronized breath attack to honor the Tyrant",
        "Claiming the Crest: The highest flyer in each battle earns commanding rights for the next engagement",
        "The Pyre Oath: Defeated enemies are offered a choice — join the Warpack as Unbonded, or face the flames"
      ],
      unit_naming_conventions: [
        "Drake names: Single-syllable, harsh consonants (Scorch, Rend, Char, Pyra)",
        "Rider titles: Descriptive and aspirational (Skybreaker, Flameborn, Cloudstrider)",
        "Warbands named after their founding drake lineage (Emberfang Phalanx, Scorchtail Raiders)",
        "Unbonded units use humble names (The Fallen, The Waiting, The Redeemed)"
      ]
    },

    geography_strongholds: {
      overview: "The Emberclaw Warpack controls the Scorched Peaks — a volcanic mountain range perpetually hazed with ash and smoke. The sky is thick with drakes, the mountains honeyed with Nest-caverns.",
      sacred_sites: [
        { name: "The Fireheart Caldera", description: "A massive volcanic crater housing the Fireheart Nexus. Forbidden to all but the Ember Council. The heat is visible as shimmering waves, and lightning crackles in the sulfurous clouds above." },
        { name: "The Bonding Crags", description: "A series of clifftop platforms where riders first meet their drakes. Each platform bears the carved names of thousands of successful Bonds dating back centuries." },
        { name: "Seryth's Roost", description: "The original Nest, where the first Bond was formed. Now a shrine-fortress housing the Ember Council. The walls are fused glass from centuries of dragonfire." },
        { name: "The Mourning Spire", description: "A towering rock pillar where Unbonded riders meditate during their year of mourning. Covered in memorial carvings of lost drakes." }
      ],
      battlefield_features: [
        "Thermal Updrafts: Strong winds rising from volcanic vents; flying units gain +2 MOV when moving upward",
        "Lava Flows: Slow-moving rivers of molten rock; deal fire damage to any unit entering; Emberclaw units immune",
        "Ash Clouds: Blocks line of sight beyond 12\"; breath weapons ignore this penalty",
        "Scorched Ground: Terrain burned by previous battles; counts as difficult terrain for non-Emberclaw"
      ]
    },

    unique_phenomena: {
      overview: "The Scorched Peaks are home to strange volcanic phenomena that the Emberclaw have learned to weaponize.",
      phenomena: [
        {
          name: "Drakewind Storms",
          description: "Sudden, violent windstorms caused by dozens of drakes flying in formation. Grounded units are buffeted and knocked prone; flying units ride the wind for extreme speed.",
          gameplay_effect: "Can be triggered by having 5+ flying units within 6\" of each other. Creates a 12\" radius storm zone: ground units -2 MOV, flyers +3 MOV."
        },
        {
          name: "Magma Geysers",
          description: "Unpredictable eruptions of lava from underground pressure. Devastating but indiscriminate.",
          gameplay_effect: "At the start of each turn, roll 1d6 for each lava flow terrain feature. On a 6, it erupts in a 6\" radius blast, dealing fire damage to ALL units (friend and foe)."
        },
        {
          name: "The Ember Veil",
          description: "A permanent haze of glowing ash hanging over the Peaks. Outsiders choke on it; Emberclaw breathe it like perfume.",
          gameplay_effect: "Non-Emberclaw units fighting in Scorched Peaks terrain suffer -1 MOR from ash inhalation. Emberclaw units gain +1 to spotting rolls due to familiarity."
        }
      ]
    },

    faction_keywords: [
      "Dragonfire",
      "Aerial Supremacy",
      "The Bond",
      "Scorched Tactics",
      "Flame Aspect",
      "Drake Riders"
    ]
  });

  // ===========================
  // COMMANDERS (13)
  // ===========================

  gameData.commanders.push(
    {
      name: "Scorchcaller Vex",
      faction: "emberclaw-warpack",
      title: "Mistress of the Red Sky",
      flavor_text: "Bonded to Pyrathax, an Ancient Drake of legendary ferocity. Vex has led the Emberclaw to victory in thirty major battles and never lost a drake.",
      theme: "Aggressive aerial commander; breath weapon specialist",
      personality: "Fierce, tactical, protective of her riders",
      playstyle: "Breath Weapon supremacy, aerial alpha strikes, drake coordination",
      base_stats: { Command: 9, Knowledge: 7, Leadership: 8, Agility: 7, Health: 285 },
      battle_stats: { ATK: 18, DEF: 5, HP: 33, MOV: 10, RNG: 2, MOR: 9 },
      points_cost: 24,
      level_1_deck: {
        command: ["Coordinated Dive", "Breath Barrage"],
        tech: ["Drake Formation", "Thermal Positioning"],
        fragment: ["Flame Amplification"],
        tactical: ["Sky Strike"]
      },
      skill_tree: {
        level_2: { knowledge: "Breath Precision (+1 RNG)", chaos: "Overburn (risk: +3 ATK breath, -1 HP)", tactical: "Quick Dive" },
        level_3: { knowledge: "Formation Mastery", chaos: "Wild Fire", tactical: "Flanking Dive" },
        level_4: { knowledge: "Perfect Coordination", chaos: "Inferno Heart", tactical: "Multi-Target Breath" },
        level_5: { knowledge: "Drake Network", chaos: "Pyroclastic Surge", tactical: "Alpha Strike Protocol" },
        level_6: { knowledge: "Breath Harmonics", chaos: "Chaotic Flames", tactical: "Devastation Run" },
        level_7: { knowledge: "Ancient Wisdom", chaos: "Fragment Overcharge", tactical: "Total Air Control" },
        level_8: { knowledge: "Strategic Supremacy", chaos: "Uncontrolled Burn", tactical: "Sky Dominance" },
        level_9: { knowledge: "Master of Drakes", chaos: "Living Inferno", tactical: "Perfect Storm" },
        level_10: { knowledge: "Red Sky Ascendant", chaos: "Ember Apocalypse", tactical: "Grand Scorchcaller" }
      },
      evolution_paths: {
        knowledge: {
          name: "Skymaster Tactician",
          description: "Perfect coordination between all bonded pairs. Breath weapons never miss, drakes act with absolute synchronization.",
          abilities: ["Perfect Formation", "Breath Precision Matrix", "Drake Mind-Link"],
          fragment_interaction: "All fire fragments grant stable +2 ATK to breath weapons",
          unit_synergy: "Bonded drake units gain +1 MOV and can use combined breath attacks"
        },
        chaos: {
          name: "Inferno Incarnate",
          description: "Vex and Pyrathax merge consciousness, becoming a single entity of pure flame and fury.",
          abilities: ["Pyroclastic Embodiment", "Unquenchable Fire", "Melt Reality"],
          fragment_interaction: "Fragments burn white-hot, dealing damage to Vex but tripling their effects",
          unit_synergy: "All Emberclaw units deal +1 Fire damage but suffer -1 DEF from proximity to Vex's heat"
        },
        hybrid: {
          name: "Ember Warlord",
          description: "Balances tactical precision with overwhelming firepower",
          abilities: ["Calculated Inferno", "Controlled Chaos", "Adaptive Flames"],
          fragment_interaction: "Can choose per fragment whether to activate stable or overcharged",
          unit_synergy: "Bonded pairs can switch between precision strikes and area bombardment mid-turn"
        }
      },
      signature_units: ["Elite Emberfang Riders", "Pyrathax's Wrath (Ancient Drake)", "Flameborn Sky Guard"],
      strategic_notes: "Vex excels at  alpha-strike armies — load up on Mature and Ancient drakes, position for overlapping breath weapons, unleash devastation turn 2-3. Weak to anti-air artillery if caught out of position. Protect Pyrathax at all costs — if he falls, Vex loses half her abilities for the rest of the battle.",
      tags: ["Aerial", "Breath Weapon", "Alpha Strike", "Drake Commander"]
    },

    {
      name: "Flamewarden Kora",
      faction: "emberclaw-warpack",
      title: "The Burning Survivor",
      flavor_text: "After sacrificing herself to cure the Clutch Plague, Kora returned as something more than mortal — her body flickers between flesh and living flame.",
      theme: "Phoenix archetype; resurrection and fire healing",
      personality: "Maternal, sacrificial, haunted by constant pain",
      playstyle: "Attrition warfare, healing through fire, self-sacrifice mechanics",
      base_stats: { Command: 7, Knowledge: 10, Leadership: 9, Agility: 6, Health: 210 },
      battle_stats: { ATK: 12, DEF: 3, HP: 24, MOV: 6, RNG: 8, MOR: 10 },
      points_cost: 20,
      level_1_deck: {
        command: ["Phoenix Rally", "Flame Renewal"],
        tech: ["Cauterize Wounds", "Fireheart Blessing"],
        fragment: ["Cleansing Fire"],
        tactical: ["Burning Martyr"]
      },
      skill_tree: {
        level_2: { knowledge: "Ember Restoration (+2 healing)", chaos: "Immolation (damage self, damage enemies)", tactical: "Tactical Sacrifice" },
        level_3: { knowledge: "Life from Ash", chaos: "Uncontrolled Regeneration", tactical: "Resurrection Protocol" },
        level_4: { knowledge: "Perfect Rebirth", chaos: "Phoenix Explosion", tactical: "Mass Renewal" },
        level_5: { knowledge: "Clutch Mother", chaos: "Burn to Heal", tactical: "Strategic Martyrdom" },
        level_6: { knowledge: "Eternal Flame", chaos: "Living Pyre", tactical: "Coordinated Sacrifice" },
        level_7: { knowledge: "Ancient Recovery", chaos: "Fragment Immolation", tactical: "Last Stand" },
        level_8: { knowledge: "Strategic Endurance", chaos: "Devouring Flames", tactical: "Battlefield Rebirth" },
        level_9: { knowledge: "Master of Life", chaos: "Phoenix Storm", tactical: "Ultimate Sacrifice" },
        level_10: { knowledge: "Eternal Flamewarden", chaos: "Apocalypse Rebirth", tactical: "Grand Phoenix" }
      },
      evolution_paths: {
        knowledge: {
          name: "Clutch Mother",
          description: "Kora's healing extends to all drakes and riders, making her army nearly unkillable through sustained combat.",
          abilities: ["Mass Phoenix Rebirth", "Flameheart Aura", "Regeneration Field"],
          fragment_interaction: "Fire fragments provide healing instead of damage",
          unit_synergy: "All bonded pairs heal 1 HP per turn while within 12\" of Kora"
        },
        chaos: {
          name: "Living Immolation",
          description: "Kora embraces the pain, becoming a walking inferno that heals allies and burns enemies just by existing.",
          abilities: ["Aura of Agony", "Rebirth Through Fire", "Explosive Resurrection"],
          fragment_interaction: "Fragments detonate when Kora takes damage, healing allies and damaging enemies",
          unit_synergy: "All units within 6\" of Kora deal +2 Fire damage but take 1 damage per turn from her heat"
        },
        hybrid: {
          name: "Phoenix Commander",
          description: "Controlled resurrection and strategic sacrifice",
          abilities: ["Calculated Martyrdom", "Selective Healing", "Tactical Rebirth"],
          fragment_interaction: "Can sacrifice fragments to instantly resurrect fallen units",
          unit_synergy: "Once per battle, can revive one destroyed bonded pair at full HP"
        }
      },
      signature_units: ["Phoenix Guard", "Flameheart Clerics", "Reborn Drake Riders"],
      strategic_notes: "Kora shines in attrition battles where her healing outlasts the enemy's damage output. Build tanky, durable armies and trade hits confidently. Her Chaos evolution can backfire badly — taking too much heat damage in a single turn can kill her outright despite healing. Use her as a mid-board anchor, not a frontline fighter.",
      tags: ["Healer", "Phoenix", "Attrition", "Sacrifice"]
    },

    {
      name: "Ashborn Ryx",
      faction: "emberclaw-warpack",
      title:  "The Twice-Burned",
      flavor_text: "Survived a pyre accident as a child, then lost his drake to enemy fire as a young rider. Now fights unbonded, wielding pyromancy to prove he doesn't need wings to soar.",
      theme: "Unbonded warrior; pyromancer specialist",
      personality: "Bitter, determined, compensating for perceived inadequacy",
      playstyle: "Ground pyromancy, fragment manipulation, high-risk high-reward",
      base_stats: { Command: 6, Knowledge: 9, Leadership: 5, Agility: 8, Health: 255 },
      battle_stats: { ATK: 15, DEF: 4, HP: 27, MOV: 5, RNG: 10, MOR: 7 },
      points_cost: 18,
      level_1_deck: {
        command: ["Pyroclasm", "Unbonded Fury"],
        tech: ["Fragment Ignition", "Fire Shaping"],
        fragment: ["Unstable Overcharge"],
        tactical: ["Flash Fire"]
      },
      skill_tree: {
        level_2: { knowledge: "Fragment Mastery (+1 fragment use)", chaos: "Explosion (risk: AoE, self-damage)", tactical: "Ground Blitz" },
        level_3: { knowledge: "Precision Pyromancy", chaos: "Wild Detonation", tactical: "Unbonded Tactics" },
        level_4: { knowledge: "Perfect Control", chaos: "Chaos Channeling", tactical: "Fire and Maneuver" },
        level_5: { knowledge: "Fragment Network", chaos: "Chain Reaction", tactical: "Strategic Burn" },
        level_6: { knowledge: "Pyromantic Engineer", chaos: "Living Bomb", tactical: "Coordinated Fire" },
        level_7: { knowledge: "Ancient Flames", chaos: "Fragment Storm", tactical: "Total Immolation" },
        level_8: { knowledge: "Strategic Fire Control", chaos: "Uncontrolled Detonation", tactical: "Battlefield Manipulation" },
        level_9: { knowledge: "Master Pyromancer", chaos: "Apocalyptic Chain", tactical: "Perfect Storm" },
        level_10: { knowledge: "Fire Ascendant", chaos: "Living Cataclysm", tactical: "Grand Ashborn" }
      },
      evolution_paths: {
        knowledge: {
          name: "Pyromantic Architect",
          description: "Ryx shapes fire with surgical precision, creating walls, traps, and controlled burns.",
          abilities: ["Fire Sculpting", "Burning Geometry", "Flame Walls"],
          fragment_interaction: "Can reshape fragment effects mid-battle; no instability penalties",
          unit_synergy: "Unbonded units gain +2 ATK with fire weapons; ground troops can use fragments safely"
        },
        chaos: {
          name: "Walking Detonation",
          description: "Ryx weaponizes his own fragmentation instability, becoming a living bomb.",
          abilities: ["Volatile Aura", "Chain Detonation", "Martyrdom Blast"],
          fragment_interaction: "Every fragment used has a chance to detonate for AoE damage to all nearby units",
          unit_synergy: "All units within 6\" deal +2 Fire damage but have -1 HP from fragment instability"
        },
        hybrid: {
          name: "Fire Tactician",
          description: "Balanced pyromancy with tactical insight",
          abilities: ["Controlled Burn", "Strategic Detonation", "Adaptive Flames"],
          fragment_interaction: "Can toggle fragments between stable and volatile modes",
          unit_synergy: "Ground troops can use fragments; aerial units get breath bonuses"
        }
      },
      signature_units: ["Unbonded Pyromancers", "Ashborn Infantry", "Fragment Artillery"],
      strategic_notes: "Ryx is cheap and fragment-heavy. Load your army with fire fragments and let him amp their effects. His Chaos path is a glass cannon — devastating burst damage but you'll lose units to instability. Best in small elite armies where each model counts. Pair with Unbonded troops to maximize his faction synergy.",
      tags: ["Pyromancer", "Unbonded", "Fragmentor", "Glass Cannon"]
    },

    {
      name: "Wyrmlord Tzarak",
      faction: "emberclaw-warpack",
      title: "Rider of the Obsidian Wyrm",
      flavor_text: "Bonded to Obsidax, one of only three Wyrms in existence. Tzarak rarely speaks — his drake's roar says everything necessary.",
      theme: "Legendary creature commander; colossal firepower",
      personality: "Quiet, contemplative, utterly confident",
      playstyle: "Centerpiece monster, terrain devastation, slow but unstoppable",
      base_stats: { Command: 8, Knowledge: 6, Leadership: 10, Agility: 4, Health: 450 },
      battle_stats: { ATK: 27, DEF: 7, HP: 45, MOV: 8, RNG: 3, MOR: 10 },
      points_cost: 35,
      level_1_deck: {
        command: ["Cataclysm Dive", "Wyrm's Command"],
        tech: ["Earthquake Landing", "Ancient Power"],
        fragment: ["Titan's Flame"],
        tactical: ["Devastating Presence"]
      },
      skill_tree: {
        level_2: { knowledge: "Wyrm Tactics (+2 Command)", chaos: "Rampage (lose control, +5 ATK)", tactical: "Mobile Fortress" },
        level_3: { knowledge: "Ancient Wisdom", chaos: "Uncontrollable Fury", tactical: "Strategic Impact" },
        level_4: { knowledge: "Perfect Bond", chaos: "Primal Rage", tactical: "Coordinated Assault" },
        level_5: { knowledge: "Wyrm Network", chaos: "Berserk Flame", tactical: "Unstoppable Advance" },
        level_6: { knowledge: "Legendary Coordination", chaos: "Living Earthquake", tactical: "Total Domination" },
        level_7: { knowledge: "Ancient Power", chaos: "Fragment Fury", tactical: "Battlefield Control" },
        level_8: { knowledge: "Strategic Colossus", chaos: "Unbound Chaos", tactical: "Supreme Command" },
        level_9: { knowledge: "Master of Giants", chaos: "Apocalyptic Wyrm", tactical: "Perfect Devastation" },
        level_10: { knowledge: "Eternal Wyrmlord", chaos: "Chaos Incarnate Wyrm", tactical: "Grand Colossus" }
      },
      evolution_paths: {
        knowledge: {
          name: "Ancient Strategist",
          description: "Tzarak and Obsidax fight with the wisdom of centuries, positioning perfectly for maximum impact.",
          abilities: ["Calculated Devastation", "Perfect Positioning", "Wyrm Tactics"],
          fragment_interaction: "Obsidax can store fragments internally and release them all at once for massive effect",
          unit_synergy: "All friendly drakes gain +2 MOR in  Obsidax's presence; enemy units must pass morale checks to approach"
        },
        chaos: {
          name: "Primal Wyrm",
          description: "Obsidax reverts to instinctive fury, devastating everything in his path.",
          abilities: ["Uncontrolled Rampage", "Earthquake Aura", "Meltdown Breath"],
          fragment_interaction: "Fragments automatically activate and burn out; effects tripled but one-use",
          unit_synergy: "Cannot command other units — they flee or charge randomly. Obsidax deals double damage to terrain and structures"
        },
        hybrid: {
          name: "Wyrm Warlord",
          description: "Controlled power with strategic insight",
          abilities: ["Tactical Devastation", "Adaptive Wyrm", "Calculated Fury"],
          fragment_interaction: "Can choose when to unleash stored fragments for burst or sustained output",
          unit_synergy: "Nearby units gain +1 ATK from Obsidax's intimidation aura"
        }
      },
      signature_units: ["Wyrm Guard Elites", "Obsidax the Obsidian Wyrm (unique unit)", "Legendary Drake Riders"],
      strategic_notes: "Tzarak costs 35 points — nearly 1/6 of a standard 200-pt army. He's an investment, but Obsidax is a walking fortress. Use him to break enemy formations and destroy terrain. His Chaos path is hilarious but uncontrollable — good for narrative games, risky for competitive. Protect him from focused fire in the first two turns; once he closes distance, nothing stops him.",
      tags: ["Wyrm", "Monster", "Centerpiece", "Late Game"]
    },

    {
      name: "Skydancer Lyss",
      faction: "emberclaw-warpack",
      title: "The Swift Talon",
      flavor_text: "Bonded to three drakes simultaneously (a rare feat) — one for reconnaissance, one for combat, one for pure speed. Lyss can't sit still; she's always airborne.",
      theme: "Extreme mobility; hit-and-run specialist",
      personality: "Energetic, reckless, thrill-seeking",
      playstyle: "Speed blitz, harassment, objective grabbing",
      base_stats: { Command: 7, Knowledge: 5, Leadership: 6, Agility: 10, Health: 240 },
      battle_stats: { ATK: 15, DEF: 3, HP: 21, MOV: 14, RNG: 4, MOR: 8 },
      points_cost: 19,
      level_1_deck: {
        command: ["Lightning Strike", "Triple Dive"],
        tech: ["Airstream Riding", "Evasive Maneuvers"],
        fragment: ["Velocity Shards"],
        tactical: ["Hit and Run"]
      },
      skill_tree: {
        level_2: { knowledge: "Speed Tactics (+2 MOV)", chaos: "Reckless Charge (risk: no DEF)", tactical: "Quick Deploy" },
        level_3: { knowledge: "Formation Speed", chaos: "Wild Dive", tactical: "Flanking Master" },
        level_4: { knowledge: "Perfect Evasion", chaos: "Chaos Velocity", tactical: "Multi-Strike" },
        level_5: { knowledge: "Triple Bond Mastery", chaos: "Speed Demon", tactical: "Objective Rush" },
        level_6: { knowledge: "Precision Speed", chaos: "Uncontrolled Dive", tactical: "Total Mobility" },
        level_7: { knowledge: "Ancient Swiftness", chaos: "Fragment Acceleration", tactical: "Supreme Harrier" },
        level_8: { knowledge: "Strategic Velocity", chaos: "Blur of Chaos", tactical: "Speed Dominance" },
        level_9: { knowledge: "Master Skydancer", chaos: "Living Lightning", tactical: "Perfect Mobility" },
        level_10: { knowledge: "Eternal Skydancer", chaos: "Chaos Velocity Avatar", tactical: "Grand Harrier" }
      },
      evolution_paths: {
        knowledge: {
          name: "Tactical Harrier",
          description: "Lyss coordinates lightning-fast strikes with perfect timing.",
          abilities: ["Precision Strikes", "Coordinated Harassment", "Perfect Positioning"],
          fragment_interaction: "Velocity fragments grant extra movement without penalty",
          unit_synergy: "All fast units (MOV 8+) gain +2 MOV and can disengage freely"
        },
        chaos: {
          name: "Speed Incarnate",
          description: "Lyss moves so fast she becomes a blur, striking from impossible angles.",
          abilities: ["Untrackable", "Lightning Assault", "Chaos Speed"],
          fragment_interaction: "Fragments burn out after one use but grant triple movement",
          unit_synergy: "Fast units ignore terrain and enemy engagement; cannot be intercepted"
        },
        hybrid: {
          name: "Swift Warlord",
          description: "Balanced speed with tactical timing",
          abilities: ["Calculated Blitz", "Adaptive Mobility", "Strike and Fade"],
          fragment_interaction: "Can choose between sustained speed or burst acceleration",
          unit_synergy: "All units gain +1 MOV; fast units gain +2 MOV"
        }
      },
      signature_units: ["Swift Talon Scouts", "Triple-Bonded Harriers", "Speed Drake Swarms"],
      strategic_notes: "Lyss is the objective-grabber. Use her extreme mobility to contest multiple points, assassinate isolated enemy units, and disrupt formations. She's fragile — 3 DEF means focused fire kills her fast. Never commit to prolonged combat. Darting in and out is her strength. Pair with fast skirmish armies; avoid slow ground troops.",
      tags: ["Speed", "Mobility", "Harrier", "Objective Control"]
    },

    {
      name: "Embersmith Torvan",
      faction: "emberclaw-warpack",
      title: "Master of the Forge",
      flavor_text: "An Unbonded smith who discovered how to forge fragment-infused weapons. His creations have equipped three generations of riders.",
      theme: "Support commander; equipment and buffing",
      personality: "Practical, gruff, secretly proud of his riders",
      playstyle: "Army-wide buffs, equipment crafting, fragment distribution",
      base_stats: { Command: 8, Knowledge: 10, Leadership: 7, Agility: 5, Health: 270 },
      battle_stats: { ATK: 12, DEF: 5, HP: 30, MOV: 4, RNG: 6, MOR: 9 },
      points_cost: 22,
      level_1_deck: {
        command: ["Forge Blessing", "Equipment Distribution"],
        tech: ["Fragment Forging", "Weapon Enhancement"],
        fragment: ["Stabilization Field"],
        tactical: ["Supply Line"]
      },
      skill_tree: {
        level_2: { knowledge: "Master Forging (+1 equipment quality)", chaos: "Unstable Weapons (risk: +3 ATK, explode on 1s)", tactical: "Quick Repair" },
        level_3: { knowledge: "Fragment Engineering", chaos: "Overcharge Forging", tactical: "Battlefield Workshop" },
        level_4: { knowledge: "Perfect Crafting", chaos: "Chaos Infusion", tactical: "Mass Production" },
        level_5: { knowledge: "Legendary Smith", chaos: "Living Weapons", tactical: "Strategic Supply" },
        level_6: { knowledge: "Fragment Mastery", chaos: "Explosive Forge", tactical: "Total Equipment" },
        level_7: { knowledge: "Ancient Techniques", chaos: "Fragment Storm Forge", tactical: "Battlefield Armory" },
        level_8: { knowledge: "Strategic Enhancement", chaos: "Chaotic Crafting", tactical: "Supply Supremacy" },
        level_9: { knowledge: "Master Embersmith", chaos: "Apocalyptic Forge", tactical: "Perfect Armorer" },
        level_10: { knowledge: "Eternal Forgemaster", chaos: "Chaos Forge Incarnate", tactical: "Grand Armorer" }
      },
      evolution_paths: {
        knowledge: {
          name: "Master Craftsman",
          description: "Torvan's equipment never fails and grants massive bonuses.",
          abilities: ["Perfect Forging", "Reliable Enhancement", "Masterwork Aura"],
          fragment_interaction: "Can forge fragments into equipment; no instability ever",
          unit_synergy: "All units gain +1 ATK and DEF from superior equipment"
        },
        chaos: {
          name: "Chaos Forger",
          description: "Torvan infuses weapons with raw instability for devastating short-term power.",
          abilities: ["Overcharged Weapons", "Explosive Armaments", "Living Fire Arms"],
          fragment_interaction: "Fragments grant triple effect but explode after 3 uses",
          unit_synergy: "All units gain +3 ATK but weapons have 50% chance to break each use"
        },
        hybrid: {
          name: "Tactical Armorer",
          description: "Balanced crafting with options for different situations",
          abilities: ["Adaptive Forging", "Selective Enhancement", "Field Repairs"],
          fragment_interaction: "Can forge stable or volatile equipment per unit",
          unit_synergy: "Units gain +1 ATK and DEF; can swap equipment mid-battle"
        }
      },
      signature_units: ["Forgeborn Warriors", "Fragment-Blade Guard", "Equipment Specialists"],
      strategic_notes: "Torvan is a force multiplier — he makes your whole army better. Build him into elite small-unit armies where each model gets +1/+1 from his buffs. Not a frontline fighter; keep him safe in the backline crafting and distributing gear. His Chaos path is gambling with fire — fun but unreliable. Knowledge path is consistent and powerful for competitive play.",
      tags: ["Support", "Crafter", "Buffer", "Equipment"]
    },

    {
      name: "Pyroclaw Drenna",
      faction: "emberclaw-warpack",
      title: "The Fireborn Berserker",
      flavor_text: "Drenna survived a direct hit from enemy artillery that killed her drake. She absorbed the explosion's fire, transforming into a living flame. Now she fights on foot, burning everything she touches.",
      theme: "Melee berserker; fire aura specialist",
      personality: "Feral, barely controlled rage, speaks in growls",
      playstyle: "Aggressive melee, AoE fire damage, high risk",
      base_stats: { Command: 5, Knowledge: 4, Leadership: 6, Agility: 9, Health: 300 },
      battle_stats: { ATK: 24, DEF: 4, HP: 36, MOV: 7, RNG: 1, MOR: 10 },
      points_cost: 21,
      level_1_deck: {
        command: ["Berserk Charge", "Flame Aura"],
        tech: ["Immolation Field", "Fire  Touch"],
        fragment: ["Overburn"],
        tactical: ["Raging Inferno"]
      },
      skill_tree: {
        level_2: { knowledge: "Controlled Burn (+1 ATK)", chaos: "Total Immolation (risk: +4 ATK, -2 DEF)", tactical: "Berserker Rush" },
        level_3: { knowledge: "Tactical Fury", chaos: "Wild Flames", tactical: "Melee Mastery" },
        level_4: { knowledge: "Perfect Rage", chaos: "Living Fire", tactical: "Coordinated Assault" },
        level_5: { knowledge: "Disciplined Berserker", chaos: "Uncontrolled Inferno", tactical: "Strategic Charge" },
        level_6: { knowledge: "Flame Control", chaos: "Walking Explosion", tactical: "Total Aggression" },
        level_7: { knowledge: "Ancient Fury", chaos: "Fragment Immolation", tactical: "Berserker Command" },
        level_8: { knowledge: "Strategic Wrath", chaos: "Chaos Flame Avatar", tactical: "Melee Supremacy" },
        level_9: { knowledge: "Master Pyroclaw", chaos: "Apocalyptic Berserker", tactical: "Perfect Fury" },
        level_10: { knowledge: "Eternal Fireborn", chaos: "Chaos Incarnate", tactical: "Grand Berserker" }
      },
      evolution_paths: {
        knowledge: {
          name: "Controlled Inferno",
          description: "Drenna harnesses her rage, striking with precision instead of wild abandon.",
          abilities: ["Focused Fury", "Precision Burn", "Calculated Rampage"],
          fragment_interaction: "Fire fragments enhance melee attacks without self-damage",
          unit_synergy: "Melee units gain +2 ATK when charging; benefit from Drenna's aura without taking fire damage"
        },
        chaos: {
          name: "Living Cataclysm",
          description: "Drenna stops fighting her transformation and becomes pure destructive force.",
          abilities: ["Total Immolation", "Explosive Melee", "Burn Everything"],
          fragment_interaction: "Fragments explode on contact for massive AoE but damage all nearby units",
          unit_synergy: "All units within 6\" deal +3 Fire damage but take 1 damage per turn from Drenna's flames"
        },
        hybrid: {
          name: "Tactical Berserker",
          description: "Controlled aggression with tactical timing",
          abilities: ["Adaptive Fury", "Selective Burn", "Strategic Rampage"],
          fragment_interaction: "Can toggle fire aura on/off to protect allies or burn enemies",
          unit_synergy: "Melee units gain +1 ATK; can choose whether to share Drenna's fire aura"
        }
      },
      signature_units: ["Fireborn Berserkers", "Immolation Infantry", "Flame Aura Guard"],
      strategic_notes: "Drenna is your blender — point her at the enemy and watch her carve through infantry. She's vulnerable to ranged focus fire before she closes. Use smoke screens, terrain, or fast drakes to deliver her into melee range. Her Chaos path is hilarious but will kill your own troops if you're not careful. Build armies that can fight at range while she closes, then support her charge.",
      tags: ["Berserker", "Melee", "Fire Aura", "Aggressive"]
    },

    {
      name: "Skywatcher Orin",
      faction: "emberclaw-warpack",
      title: "The Silent Observer",
      flavor_text: "Bonded to a scout drake with perfect camouflage. Orin sees everything from above but speaks only when absolutely necessary. His reports are terrifyingly accurate.",
      theme: "Scout/reconnaissance commander",
      personality: "Quiet, analytical, patient",
      playstyle: "Information warfare, ambushes, positioning",
      base_stats: { Command: 8, Knowledge: 10, Leadership: 7, Agility: 8, Health: 225 },
      battle_stats: { ATK: 12, DEF: 3, HP: 24, MOV: 10, RNG: 8, MOR: 8 },
      points_cost: 17,
      level_1_deck: {
        command: ["Perfect Intel", "Ambush Coordination"],
        tech: ["Stealth Flight", "Reconnaissance"],
        fragment: ["Vision Shards"],
        tactical: ["Hidden Deployment"]
      },
      skill_tree: {
        level_2: { knowledge: "Enhanced Scouting (+2 to spot)", chaos: "Risk Recon (risk: deep intel, spotted)", tactical: "Ambush Master" },
        level_3: { knowledge: "Perfect Information", chaos: "Wild Speculation", tactical: "Flanking Intel" },
        level_4: { knowledge: "Total Awareness", chaos: "Chaotic Predictions", tactical: "Strategic Positioning" },
        level_5: { knowledge: "Omniscient Observer", chaos: "Information Overload", tactical: "Coordinated Ambush" },
        level_6: { knowledge: "Perfect Reconnaissance", chaos: "Unstable Intel", tactical: "Total Surprise" },
        level_7: { knowledge: "Ancient Sight", chaos: "Fragment Scrying", tactical: "Battlefield Control" },
        level_8: { knowledge: "Strategic Omniscience", chaos: "Chaotic Vision", tactical: "Information Supremacy" },
        level_9: { knowledge: "Master Skywatcher", chaos: "Apocalyptic Revelation", tactical: "Perfect Intel" },
        level_10: { knowledge: "Eternal Observer", chaos: "Chaos Sight Incarnate", tactical: "Grand  Scout" }
      },
      evolution_paths: {
        knowledge: {
          name: "Omniscient Commander",
          description: "Orin sees the entire battlefield simultaneously, granting perfect tactical awareness.",
          abilities: ["Total Battlefield Awareness", "Perfect Prediction", "Pre-emptive Strike Coordination"],
          fragment_interaction: "Vision fragments reveal all hidden enemy units permanently",
          unit_synergy: "All friendly units ignore cover and concealment penalties; always strike first"
        },
        chaos: {
          name: "Paranoid Seer",
          description: "Orin sees TOO much — possible futures, alternate timelines, and things that shouldn't exist.",
          abilities: ["Chaotic Foresight", "Random Accurate Predictions", "Maddening Insight"],
          fragment_interaction: "Fragments grant random powerful bonuses based on 'visions'",
          unit_synergy: "Units act on fragmented intelligence — 50% chance for perfect positioning, 50% chance for confusion"
        },
        hybrid: {
          name: "Tactical Overseer",
          description: "Balanced intelligence gathering with actionable tactics",
          abilities: ["Adaptive Reconnaissance", "Selective Information", "Coordinated Ambush"],
          fragment_interaction: "Can share or withhold intel per unit for maximum tactical advantage",
          unit_synergy: "All units gain +1 to hit from Orin's intelligence; scouts gain +2 MOV"
        }
      },
      signature_units: ["Silent Wing Scouts", "Recon Drake Riders", "Ambush Specialists"],
      strategic_notes: "Orin is cheap and transforms your whole army into an ambush force. Deploy scouts aggressively, gather intel, then strike from unexpected angles. He's not a fighter — 4 ATK and 3 DEF means he dies fast in melee. Keep him airborne and away from combat. Best in armies with lots of fast, hard-hitting units that benefit from first-strike advantage.",
      tags: ["Scout", "Recon", "Ambush", "Information Warfare"]
    },

    {
      name: "Clutchmaster Vayne",
      faction: "emberclaw-warpack",
      title: "Guardian of the Hatcheries",
      flavor_text: "Bonded to a Mature female drake who has hatched 47 successful clutches. Vayne protects the next generation with fanatical devotion.",
      theme: "Swarm/summoner commander; drake spawning",
      personality: "Protective, nurturing, ruthless to threats",
      playstyle: "Spawn fledgling drakes mid-battle, swarm tactics",
      base_stats: { Command: 7, Knowledge: 8, Leadership: 9, Agility: 6, Health: 270 },
      battle_stats: { ATK: 15, DEF: 5, HP: 30, MOV: 6, RNG: 4, MOR: 9 },
      points_cost: 20,
      level_1_deck: {
        command: ["Clutch Call", "Hatchling Swarm"],
        tech: ["Rapid Maturation", "Nest Protection"],
        fragment: ["Growth Acceleration"],
        tactical: ["Protective Fury"]
      },
      skill_tree: {
        level_2: { knowledge: "Efficient Hatching (+1 fledgling)", chaos: "Uncontrolled Birth (risk: random drakes)", tactical: "Quick Spawn" },
        level_3: { knowledge: "Perfect Clutch", chaos: "Wild Mutation", tactical: "Swarm Tactics" },
        level_4: { knowledge: "Accelerated Growth", chaos: "Chaos Spawning", tactical: "Strategic Numbers" },
        level_5: { knowledge: "Clutch Mastery", chaos: "Unstable Mutations", tactical: "Coordinated Swarm" },
        level_6: { knowledge: "Perfect Generation", chaos: "Fragment Mutation", tactical: "Total Swarm" },
        level_7: { knowledge: "Ancient Breeding", chaos: "Chaos Hatchery", tactical: "Battlefield Spawning" },
        level_8: { knowledge: "Strategic Population", chaos: "Uncontrolled Breeding", tactical: "Swarm Supremacy" },
        level_9: { knowledge: "Master Clutchmaster", chaos: "Apocalyptic Swarm", tactical: "Perfect Numbers" },
        level_10: { knowledge: "Eternal Hatchery", chaos: "Chaos Breeding Incarnate", tactical: "Grand Swarm Commander" }
      },
      evolution_paths: {
        knowledge: {
          name: "Master Breeder",
          description: "Vayne spawns drakes with perfect efficiency and control.",
          abilities: ["Controlled Hatching", "Selective Breeding", "Perfect Clutch Sizes"],
          fragment_interaction: "Growth fragments accelerate drake maturation by one stage instantly",
          unit_synergy: "Can spawn Fledgling drakes for free each turn; they mature faster than normal"
        },
        chaos: {
          name: "Mutation Mother",
          description: "Vayne's clutches produce unpredictable mutant drakes with random abilities.",
          abilities: ["Random Mutations", "Explosive Hatching", "Chaos Spawning"],
          fragment_interaction: "Fragments cause spontaneous drake mutations — could be amazing or useless",
          unit_synergy: "Spawned drakes have random stats ±3 and random special abilities"
        },
        hybrid: {
          name: "Tactical Hatchery",
          description: "Controlled drake spawning with selective breeding",
          abilities: ["Adaptive Clutches", "Selective Hatching", "Strategic Numbers"],
          fragment_interaction: "Can choose which drake type to spawn based on battlefield needs",
          unit_synergy: "Spawn 1d3 Fledgling drakes per turn; can pay extra points to spawn older drakes"
        }
      },
      signature_units: ["Hatchery Guard", "Fledgling Swarms", "Clutch Defenders"],
      strategic_notes: "Vayne plays the long game — start small, spawn drakes each turn, overwhelm with numbers. She's vulnerable to early aggression before the swarm builds up. Protect her for the first 3-4 turns while she builds your army. Her Chaos path is gambling — you might spawn 10 amazing drakes or 10 useless ones. Knowledge path is reliable and strong for objective-based games.",
      tags: ["Summoner", "Swarm", "Drake Spawning", "Late Game"]
    },

    {
      name: "Cinderfist Brok",
      faction: "emberclaw-warpack",
      title: "The Walking Siege",
      flavor_text: "An Unbonded warrior who bonded with war itself — he wields a fragment-powered gauntlet that punches through walls, armor, and drakes alike.",
      theme: "Anti-armor specialist; structure destruction",
      personality: "Direct, blunt, enjoys breaking things",
      playstyle: "Siege warfare, armor-piercing, fortress-breaking",
      base_stats: { Command: 6, Knowledge: 5, Leadership: 7, Agility: 5, Health: 330 },
      battle_stats: { ATK: 21, DEF: 6, HP: 39, MOV: 5, RNG: 2, MOR: 9 },
      points_cost: 23,
      level_1_deck: {
        command: ["Breach and Burn", "Armor Shatter"],
        tech: ["Fragment Fist", "Structure Collapse"],
        fragment: ["Impact Shards"],
        tactical: ["Demolition Focus"]
      },
      skill_tree: {
        level_2: { knowledge: "Precision Strikes (+1 vs structures)", chaos: "Wild Demolition (risk: collateral damage)", tactical: "Siege Tactics" },
        level_3: { knowledge: "Perfect Breaching", chaos: "Uncontrolled Destruction", tactical: "Anti-Armor Expertise" },
        level_4: { knowledge: "Calculated Demolition", chaos: "Chaos Punch", tactical: "Strategic Breakdown" },
        level_5: { knowledge: "Master Besieger", chaos: "Explosive Fists", tactical: "Total Siege" },
        level_6: { knowledge: "Perfect Destruction", chaos: "Fragment Detonation Fists", tactical: "Coordinated Demolition" },
        level_7: { knowledge: "Ancient Techniques", chaos: "Chaos Siege", tactical: "Battlefield Leveling" },
        level_8: { knowledge: "Strategic Demolition", chaos: "Uncontrollable Destruction", tactical: "Siege Supremacy" },
        level_9: { knowledge: "Master Cinderfist", chaos: "Apocalyptic Demolisher", tactical: "Perfect Breacher" },
        level_10: { knowledge: "Eternal Siege Master", chaos: "Chaos Demolition Incarnate", tactical: "Grand Fortress Breaker" }
      },
      evolution_paths: {
        knowledge: {
          name: "Surgical Breacher",
          description: "Brok demolishes exactly what he targets with perfect efficiency.",
          abilities: ["Precision Demolition", "Calculated Strikes", "Perfect Targeting"],
          fragment_interaction: "Impact fragments ignore all armor and structure bonuses",
          unit_synergy: "All units gain +2 ATK vs structures and heavily armored enemies"
        },
        chaos: {
          name: "Demolition Incarnate",
          description: "Brok doesn't just break structures — he levels the battlefield.",
          abilities: ["Total Destruction", "Collateral Explosions", "Unstoppable Force"],
          fragment_interaction: "Every punch detonates fragments for AoE damage to terrain and units",
          unit_synergy: "All attacks cause terrain damage; battlefield becomes difficult terrain rapidly"
        },
        hybrid: {
          name: "Tactical Demolisher",
          description: "Controlled siege with selective targeting",
          abilities: ["Adaptive Breaching", "Selective Demolition", "Strategic Destruction"],
          fragment_interaction: "Can choose between precision strikes or AoE explosions per attack",
          unit_synergy: "All heavy weapons gain +1 ATK; siege units gain +2 RNG"
        }
      },
      signature_units: ["Siege Breakers", "Fragment Fist Guard", "Demolition Specialists"],
      strategic_notes: "Brok excels against fortified positions and heavy armor. Bring him when the enemy has war machines, bunkers, or lots of plate armor. He's slow and vulnerable to kiting — fast enemies can dance around him. Pair with mobile troops who can screen him or deliver him into melee range. His Chaos path turns the battlefield into rubble, which helps and hurts equally.",
      tags: ["Siege", "Anti-Armor", "Demolition", "Structure Killer"]
    },

    {
      name: "Flameheart Syrax",
      faction: "emberclaw-warpack",
      title: "Voice of the Crimson Tyrant",
      flavor_text: "The youngest Ember Council member in 300 years. Syrax claims the Crimson Tyrant speaks to her directly, granting prophecies and visions. Others aren't sure whether to believe her or fear her.",
      theme: "Divine channeler; prophet commander",
      personality: "Mystical, cryptic, unsettlingly calm",
      playstyle: "Prophecy mechanics, morale warfare, divine intervention",
      base_stats: { Command: 8, Knowledge: 10, Leadership: 10, Agility: 5, Health: 210 },
      battle_stats: { ATK: 9, DEF: 4, HP: 27, MOV: 5, RNG: 12, MOR: 10 },
      points_cost: 22,
      level_1_deck: {
        command: ["Divine Vision", "Tyrant's Wrath"],
        tech: ["Prophecy Weaving", "Morale Dominance"],
        fragment: ["Divine Channeling"],
        tactical: ["Faithful Fury"]
      },
      skill_tree: {
        level_2: { knowledge: "Clear Prophecy (+1 reroll)", chaos: "Maddening Visions (risk: random effects)", tactical: "Divine Tactics" },
        level_3: { knowledge: "Perfect Foresight", chaos: "Chaotic Revelations", tactical: "Prophetic Strike" },
        level_4: { knowledge: "Tyrant's Guidance", chaos: "Mad Prophecy", tactical: "Strategic Vision" },
        level_5: { knowledge: "Divine Coordination", chaos: "Unstable Futures", tactical: "Coordinated Faith" },
        level_6: { knowledge: "Perfect Channel", chaos: "Chaos Prophecy", tactical: "Total Devotion" },
        level_7: { knowledge: "Ancient Wisdom", chaos: "Fragment Madness", tactical: "Battlefield Divination" },
        level_8: { knowledge: "Strategic Prophet", chaos: "Uncontrolled Visions", tactical: "Divine Supremacy" },
        level_9: { knowledge: "Master Prophet", chaos: "Apocalyptic Revelations", tactical: "Perfect Faith" },
        level_10: { knowledge: "Eternal Voice", chaos: "Chaos Incarnate Prophet", tactical: "Grand Channeler" }
      },
      evolution_paths: {
        knowledge: {
          name: "Perfect Prophet",
          description: "Syrax's visions are accurate and actionable, granting perfect tactical foresight.",
          abilities: ["Accurate Prophecy", "Divine Guidance", "Certain Future"],
          fragment_interaction: "Fragments reveal exact future outcomes; no randomness",
          unit_synergy: "All units can reroll one failed roll per turn; morale checks automatically pass"
        },
        chaos: {
          name: "Mad Oracle",
          description: "Syrax sees ALL possible futures simultaneously — her mind fractures under the weight.",
          abilities: ["Chaotic Visions", "Random Miracles", "Maddening Truth"],
          fragment_interaction: "Fragments grant random powerful effects from alternate timelines",
          unit_synergy: "All units gain +2 to one random stat per turn; -2 to another random stat"
        },
        hybrid: {
          name: "Tactical Seer",
          description: "Balanced prophecy with actionable insights",
          abilities: ["Selective Foresight", "Adaptive Prophecy", "Strategic Divination"],
          fragment_interaction: "Can choose which future to manifest from fragment visions",
          unit_synergy: "All units gain +1 MOR; commander gains 1 free reroll per turn"
        }
      },
      signature_units: ["Faithful Guard", "Divine Flame Acolytes", "Prophecy Riders"],
      strategic_notes: "Syrax is a high-skill commander — her Knowledge path grants tactical flexibility through rerolls and prophecy. She's extremely fragile with only 3 ATK and 4 DEF, so keep her far from combat. Best in elite armies where every reroll matters. Her Chaos path is pure gambling and hilarious in casual games. Morale-focused armies love her +MOR and auto-pass morale mechanics.",
      tags: ["Prophet", "Divine", "Morale", "Support"]
    },

    {
      name: "Skullcrusher Threx",
      faction: "emberclaw-warpack",
      title: "The Blood-Winged Terror",
      flavor_text: "Bonded to a drake with a taste for melee combat — Threx taught it to fight with claws and fangs instead of fire. Together they're living nightmares in close combat.",
      theme: "Melee drake specialist; brutal efficiency",
      personality: "Savage, honorable, respects worthy opponents",
      playstyle: "Drake melee builds, challenge duels, close combat",
      base_stats: { Command: 7, Knowledge: 5, Leadership: 8, Agility: 7, Health: 315 },
      battle_stats: { ATK: 24, DEF: 5, HP: 36, MOV: 8, RNG: 1, MOR: 10 },
      points_cost: 24,
      level_1_deck: {
        command: ["Blood Challenge", "Melee Superiority"],
        tech: ["Claw and Fang", "Close Combat Mastery"],
        fragment: ["Fury Shards"],
        tactical: ["Brutal Assault"]
      },
      skill_tree: {
        level_2: { knowledge: "Melee Precision (+1 ATK in melee)", chaos: "Frenzy (risk: +3 ATK, random targets)", tactical: "Challenge Master" },
        level_3: { knowledge: "Perfect Strikes", chaos: "Wild Slaughter", tactical: "Close Quarters Expert" },
        level_4: { knowledge: "Calculated Brutality", chaos: "Uncontrolled Rage", tactical: "Strategic Melee" },
        level_5: { knowledge: "Master Duelist", chaos: "Blood Frenzy", tactical: "Coordinated Assault" },
        level_6: { knowledge: "Perfect Melee", chaos: "Fragment Fury", tactical: "Total Close Combat" },
        level_7: { knowledge: "Ancient Warrior", chaos: "Chaos Berserker", tactical: "Battlefield Dominance" },
        level_8: { knowledge: "Strategic Brutality", chaos: "Unbound Fury", tactical: "Melee Supremacy" },
        level_9: { knowledge: "Master Skullcrusher", chaos: "Apocalyptic Slaughter", tactical: "Perfect Warrior" },
        level_10: { knowledge: "Eternal Blood-Wing", chaos: "Chaos Fury Incarnate", tactical: "Grand Duelist" }
      },
      evolution_paths: {
        knowledge: {
          name: "Perfect Warrior",
          description: "Threx strikes with surgical precision, never wasting an attack.",
          abilities: ["Precision Strikes", "Perfect Dueling", "Calculated Brutality"],
          fragment_interaction: "Fury fragments grant extra attacks without losing control",
          unit_synergy: "All melee units gain +2 ATK and can challenge enemy characters"
        },
        chaos: {
          name: "Blood Avatar",
          description: "Threx surrenders to bloodlust, becoming an unstoppable killing machine.",
          abilities: ["Uncontrolled Frenzy", "Blood Fury", "Slaughter Everything"],
          fragment_interaction: "Fragments trigger berserk rage — attack nearest target regardless of friend or foe",
          unit_synergy: "All melee units gain +4 ATK but attack the nearest unit (friend or foe)"
        },
        hybrid: {
          name: "Tactical Berserker",
          description: "Controlled aggression with strategic targeting",
          abilities: ["Adaptive Fury", "Selective Rage", "Strategic Melee"],
          fragment_interaction: "Can toggle between precision and frenzy modes per combat",
          unit_synergy: "Melee units gain +2 ATK and can choose targets freely"
        }
      },
      signature_units: ["Blood-Wing Melee Riders", "Claw Drake Packs", "Challenge Champions"],
      strategic_notes: "Threx is your answer to enemy melee threats. Use him to challenge and eliminate opposing commanders in single combat. His drake is a close-combat monster — don't waste it on ranged harassment. Build armies around heavy melee presence. His Chaos path is dangerous but devastating if you can isolate him from friendlies. Best in small elite armies where friendly-fire risk is minimal.",
      tags: ["Melee", "Duelist", "Combat", "Aggressive"]
    },

    {
      name: "Tidescar the Exiled",
      faction: "emberclaw-warpack",
      title: "The Ash-Cursed",
      flavor_text: "Once a Council member, Tidescar was exiled for forbidden experiments with corrupted fragments. Now she returns with dark knowledge and a twisted bond to her dying drake.",
      theme: "Corrupted fragment specialist; dark knowledge",
      personality: "Bitter, obsessive, ruthless in pursuit of power",
      playstyle: "High-risk fragment usage, corruption mechanics, forbidden power",
      base_stats: { Command: 6, Knowledge: 10, Leadership: 5, Agility: 6, Health: 240 },
      battle_stats: { ATK: 15, DEF: 3, HP: 27, MOV: 8, RNG: 10, MOR: 7 },
      points_cost: 21,
      level_1_deck: {
        command: ["Forbidden Power", "Corrupt the Flame"],
        tech: ["Dark Fragment Mastery", "Corruption Spread"],
        fragment: ["Tainted Ember"],
        tactical: ["Sacrificial Gambit"]
      },
      skill_tree: {
        level_2: { knowledge: "Fragment Corruption (+2 power, -1 stability)", chaos: "Total Corruption (risk: massive power, self-harm)", tactical: "Calculated Risk" },
        level_3: { knowledge: "Dark Knowledge", chaos: "Embrace the Ash", tactical: "Forbidden Tactics" },
        level_4: { knowledge: "Perfect Corruption", chaos: "Living Blight", tactical: "Strategic Decay" },
        level_5: { knowledge: "Master of Taint", chaos: "Ash Plague", tactical: "Coordinated Corruption" },
        level_6: { knowledge: "Controlled Blight", chaos: "Fragment Madness", tactical: "Total Corruption" },
        level_7: { knowledge: "Ancient Forbidden Lore", chaos: "Chaos Taint", tactical: "Battlefield Corruption" },
        level_8: { knowledge: "Strategic Decay", chaos: "Uncontrolled Blight", tactical: "Corruption Supremacy" },
        level_9: { knowledge: "Master of the Cursed", chaos: "Apocalyptic Corruption", tactical: "Perfect Taint" },
        level_10: { knowledge: "Eternal Corruptor", chaos: "Chaos Blight Incarnate", tactical: "Grand Ash-Cursed" }
      },
      evolution_paths: {
        knowledge: {
          name: "Dark Scholar",
          description: "Tidescar masters corruption without succumbing to it, wielding forbidden power safely.",
          abilities: ["Controlled Corruption", "Safe Taint", "Dark Mastery"],
          fragment_interaction: "Corrupted fragments grant triple power with no instability penalty",
          unit_synergy: "All units can use corrupted fragments safely; gain +2 ATK from tainted power"
        },
        chaos: {
          name: "Ash Plague",
          description: "Tidescar surrenders to corruption, becoming a walking plague that spreads decay.",
          abilities: ["Corruption Aura", "Mass Blight", "Death Touch"],
          fragment_interaction: "All fragments become corrupted; explode for massive AoE on activation",
          unit_synergy: "All nearby units gain +4 ATK but lose 1 HP per turn from corruption"
        },
        hybrid: {
          name: "Tactical Corruptor",
          description: "Selective corruption with strategic targeting",
          abilities: ["Adaptive Taint", "Selective Corruption", "Strategic Blight"],
          fragment_interaction: "Can choose which units receive corruption buffs",
          unit_synergy: "Selected units gain corruption bonuses; others remain clean"
        }
      },
      signature_units: ["Ash-Cursed Guard", "Corrupted Drake Riders", "Blight Specialists"],
      strategic_notes: "Tidescar is extremely high-risk, high-reward. Her corrupted fragments give massive power spikes but can backfire catastrophically. Best in aggressive armies that plan to win fast before corruption kills your own units. Her Knowledge path is the safest bet for competitive play — triple fragment power with no downsides is incredible value. Chaos path is for narrative games where you want dramatic moments.",
      tags: ["Corruption", "Dark Magic", "High Risk", "Forbidden Power"]
    }
  );

  // ===========================
  // UNITS (~50)
  // ===========================

  gameData.units.push(
    // INFANTRY (15 units)
    { name: "Ashborn Infantry", faction: "emberclaw-warpack", points_cost: 1, role: "Core troops", fragment_interactions: "Minor fire buffs", flavor_text: "Unbonded warriors wielding flame-forged spears", type: "Infantry", stats: { ATK: 6, DEF: 3, HP: 3, MOV: 5, RNG: 1, MOR: 6 }, special: ["Fire Resistant"] },
    { name: "Emberclaw Warriors", faction: "emberclaw-warpack", points_cost: 2, role: "Standard infantry", fragment_interactions: "Fire buffs", flavor_text: "Standard ground troops with javelin and shield", type: "Infantry", stats: { ATK: 6, DEF: 3, HP: 3, MOV: 5, RNG: 4, MOR: 7 }, special: ["Fire Resistant", "Javelin Thrower"] },
    { name: "Flameborn Guard", faction: "emberclaw-warpack", points_cost: 3, role: "Elite infantry", fragment_interactions: "Strong fire synergy", flavor_text: "Veterans who have survived the Branding", type: "Infantry", stats: { ATK: 12, DEF: 4, HP: 6, MOV: 5, RNG: 1, MOR: 8 }, special: ["Fire Resistant", "Shield Wall", "Drakeblood Fury (+1 ATK when wounded)"] },
    { name: "Pyromancer Adepts", faction: "emberclaw-warpack", points_cost: 3, role: "Magic infantry", fragment_interactions: "Cast fire spells", flavor_text: "Unbonded warriors who channel flame", type: "Infantry", stats: { ATK: 9, DEF: 2, HP: 3, MOV: 5, RNG: 8, MOR: 7 }, special: ["Fire Bolt (8\" RNG fire attack)", "Fragment User"] },
    { name: "Emberforged Blades", faction: "emberclaw-warpack", points_cost: 4, role: "Melee specialists", fragment_interactions: "Weapon buffs", flavor_text: "Elite warriors with fragment-infused swords", type: "Infantry", stats: { ATK: 15, DEF: 4, HP: 6, MOV: 6, RNG: 1, MOR: 8 }, special: ["Flame Weapons (ignore 1 DEF)", "Counterattack"] },
    { name: "Hatchery Guard", faction: "emberclaw-warpack", points_cost: 3, role: "Defensive infantry", fragment_interactions: "Defensive buffs", flavor_text: "Protectors of the sacred clutches", type: "Infantry", stats: { ATK: 9, DEF: 5, HP: 6, MOV: 4, RNG: 1, MOR: 9 }, special: ["Stubborn", "Hold Ground (+2 DEF if not moving)"] },
    { name: "Unbonded Berserkers", faction: "emberclaw-warpack", points_cost: 3, role: "Shock troops", fragment_interactions: "Fury buffs", flavor_text: "Warriors seeking death with honor", type: "Infantry", stats: { ATK: 15, DEF: 2, HP: 3, MOV: 6, RNG: 1, MOR: 10 }, special: ["Fearless", "Furious Charge (+2 ATK first turn)"] },
    { name: "Fragment Artillery Crew", faction: "emberclaw-warpack", points_cost: 4, role: "Support infantry", fragment_interactions: "Operates artillery", flavor_text: "Unbonded who operate fire-catapults", type: "Infantry", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 4, RNG: 1, MOR: 7 }, special: ["Operates War Machines", "Fragment Specialist"] },
    { name: "Reborn Phalanx", faction: "emberclaw-warpack", points_cost: 5, role: "Heavy infantry", fragment_interactions: "Phoenix buffs", flavor_text: "Warriors blessed by Flamewarden Kora", type: "Infantry", stats: { ATK: 12, DEF: 5, HP: 9, MOV: 4, RNG: 1, MOR: 9 }, special: ["Stubborn", "Phoenix Rebirth (50% chance to revive once)"] },
    { name: "Ashwalker Skirmishers", faction: "emberclaw-warpack", points_cost: 2, role: "Fast infantry", fragment_interactions: "Mobility buffs", flavor_text: "Light troops from the old nomadic clans", type: "Infantry", stats: { ATK: 6, DEF: 2, HP: 3, MOV: 7, RNG: 6, MOR: 6 }, special: ["Skirmish", "Retreat and Fire"] },
    { name: "Forge Acolytes", faction: "emberclaw-warpack", points_cost: 3, role: "Crafters", fragment_interactions: "Equipment creation", flavor_text: "Apprentice smiths who forge on the battlefield", type: "Infantry", stats: { ATK: 6, DEF: 3, HP: 3, MOV: 4, RNG: 1, MOR: 7 }, special: ["Field Repairs (heal 1 HP to adjacent units)", "Fragment Forging"] },
    { name: "Faithful Guard", faction: "emberclaw-warpack", points_cost: 3, role: "Morale support", fragment_interactions: "Divine buffs", flavor_text: "Devotees of the Crimson Tyrant's prophecies", type: "Infantry", stats: { ATK: 9, DEF: 4, HP: 6, MOV: 5, RNG: 1, MOR: 10 }, special: ["Inspiring Presence (+1 MOR to nearby allies)", "Faithful"] },
    { name: "Scorched Veterans", faction: "emberclaw-warpack", points_cost: 5, role: "Elite core", fragment_interactions: "All buffs", flavor_text: "Survivors of a hundred battles", type: "Infantry", stats: { ATK: 15, DEF: 5, HP: 9, MOV: 5, RNG: 1, MOR: 9 }, special: ["Veteran", "Fire Immune", "Reroll 1s"] },
    { name: "Ember Council Honor Guard", faction: "emberclaw-warpack", points_cost: 6, role: "Elite guard", fragment_interactions: "Command buffs", flavor_text: "Personal guards of the Council", type: "Infantry", stats: { ATK: 18, DEF: 6, HP: 9, MOV: 5, RNG: 1, MOR: 10 }, special: ["Bodyguard", "Fearless", "Shield Wall"] },
    { name: "Immolation Infantry", faction: "emberclaw-warpack", points_cost: 4, role: "Suicide troops", fragment_interactions: "Explosion on death", flavor_text: "Carry fire grenades; martyrdom is their weapon", type: "Infantry", stats: { ATK: 12, DEF: 3, HP: 3, MOV: 6, RNG: 6, MOR: 10 }, special: ["Fearless", "Death Explosion (3\" blast on death)"] },

    // CAVALRY (5 units)
    { name: "Ashrider Scouts", faction: "emberclaw-warpack", points_cost: 3, role: "Light cavalry", fragment_interactions: "Speed buffs", flavor_text: "Fast riders on unarmored drakes", type: "Cavalry", stats: { ATK: 12, DEF: 3, HP: 6, MOV: 12, RNG: 4, MOR: 7 }, special: ["Scout", "Fast"] },
    { name: "Skytalon Lancers", faction: "emberclaw-warpack", points_cost: 5, role: "Medium cavalry", fragment_interactions: "Charge buffs", flavor_text: "Young drake riders with flame lances", type: "Cavalry", stats: { ATK: 15, DEF: 4, HP: 9, MOV: 10, RNG: 2, MOR: 8 }, special: ["Flying", "Charge (+2 ATK)", "Fire Lance (one-use +4 ATK)"] },
    { name: "Emberknight Riders", faction: "emberclaw-warpack", points_cost: 8, role: "Heavy cavalry", fragment_interactions: "Elite buffs", flavor_text: "Mature drake riders in drake-scale armor", type: "Cavalry", stats: { ATK: 18, DEF: 5, HP: 12, MOV: 10, RNG: 2, MOR: 9 }, special: ["Flying", "Drake Bond (share wounds with drake)", "Breath Weapon (12\" cone)"] },
    { name: "Swift Talon Outriders", faction: "emberclaw-warpack", points_cost: 4, role: "Fast cavalry", fragment_interactions: "Mobility", flavor_text: "Extreme speed riders for harassment", type: "Cavalry", stats: { ATK: 12, DEF: 3, HP: 6, MOV: 14, RNG: 4, MOR: 8 }, special: ["Flying", "Hit and Run", "Evasion (+1 DEF vs ranged)"] },
    { name: "Scorchcaller Elites", faction: "emberclaw-warpack", points_cost: 10, role: "Elite cavalry", fragment_interactions: "All buffs", flavor_text: "Elite riders on Ancient drakes", type: "Cavalry", stats: { ATK: 21, DEF: 6, HP: 15, MOV: 10, RNG: 3, MOR: 10 }, special: ["Flying", "Drake Bond", "Inferno Breath (18\" cone)", "Ancient Resilience (ignore first wound)"] },

    // SUPPORT (8 units)
    { name: "Pyromancer Circle", faction: "emberclaw-warpack", points_cost: 5, role: "Magic support", fragment_interactions: "Spell casting", flavor_text: "Coordinated spellcasters", type: "Support", stats: { ATK: 9, DEF: 2, HP: 6, MOV: 5, RNG: 12, MOR: 7 }, special: ["Fireball (12\" blast)", "Fragment Manipulation", "Magic Resistance"] },
    { name: "Fragment Shapers", faction: "emberclaw-warpack", points_cost: 4, role: "Fragment specialists", fragment_interactions: "Enhance fragments", flavor_text: "Experts who stabilize or amplify fragments", type: "Support", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 4, RNG: 1, MOR: 7 }, special: ["Fragment Stabilization", "Buff Nearby Fragment Users"] },
    { name: "Flameheart Clerics", faction: "emberclaw-warpack", points_cost: 4, role: "Healers", fragment_interactions: "Healing", flavor_text: "Blessed by Kora's phoenix fire", type: "Support", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 5, RNG: 6, MOR: 8 }, special: ["Heal (restore 1d3 HP)", "Phoenix Blessing"] },
    { name: "Drake Handlers", faction: "emberclaw-warpack", points_cost: 3, role: "Beast support", fragment_interactions: "Drake buffs", flavor_text: "Tend and command unbonded drakes", type: "Support", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 7 }, special: ["Command Drakes", "Calm Beast (prevent frenzy)"] },
    { name: "Embersmith Apprentices", faction: "emberclaw-warpack", points_cost: 4, role: "Equipment support", fragment_interactions: "Crafting", flavor_text: "Field smiths who repair and forge", type: "Support", stats: { ATK: 6, DEF: 4, HP: 6, MOV: 4, RNG: 1, MOR: 7 }, special: ["Field Repairs", "Weapon Enhancement (+1 ATK to nearby units)"] },
    { name: "Smoke Weavers", faction: "emberclaw-warpack", points_cost: 3, role: "Concealment", fragment_interactions: "Smoke creation", flavor_text: "Create ash clouds for cover", type: "Support", stats: { ATK: 6, DEF: 2, HP: 3, MOV: 5, RNG: 8, MOR: 6 }, special: ["Smoke Screen (block LoS)", "Cover Provider"] },
    { name: "Divine Acolytes", faction: "emberclaw-warpack", points_cost: 4, role: "Morale support", fragment_interactions: "Divine buffs", flavor_text: "Prophets who channel the Tyrant's voice", type: "Support", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 9 }, special: ["Inspiring Presence", "Prophecy (reroll one die per turn)"] },
    { name: "Bonfire Keepers", faction: "emberclaw-warpack", points_cost: 3, role: "Area denial", fragment_interactions: "Terrain modification", flavor_text: "Maintain burning zones on the battlefield", type: "Support", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 4, RNG: 6, MOR: 7 }, special: ["Create Burning Terrain", "Fire Immunity"] },

    // SCOUTS (3 units)
    { name: "Silent Wing Scouts", faction: "emberclaw-warpack", points_cost: 3, role: "Reconnaissance", fragment_interactions: "Vision", flavor_text: "Stealth drake riders", type: "Scout", stats: { ATK: 9, DEF: 2, HP: 6, MOV: 12, RNG: 6, MOR: 7 }, special: ["Flying", "Stealth", "Scout", "Forward Deploy"] },
    { name: "Thermal Trackers", faction: "emberclaw-warpack", points_cost: 2, role: "Spotters", fragment_interactions: "Detection", flavor_text: "Sense heat signatures from miles away", type: "Scout", stats: { ATK: 6, DEF: 2, HP: 3, MOV: 6, RNG: 8, MOR: 6 }, special: ["Detect Hidden Units", "Thermal Vision"] },
    { name: "Sky Watchers", faction: "emberclaw-warpack", points_cost: 4, role: "Intel gathering", fragment_interactions: "Information", flavor_text: "Observe everything from altitude", type: "Scout", stats: { ATK: 9, DEF: 3, HP: 6, MOV: 10, RNG: 12, MOR: 8 }, special: ["Flying", "Perfect Vision", "Relay Commands"] },

    // ARTILLERY (3 units)
    { name: "Pyroclast Catapult", faction: "emberclaw-warpack", points_cost: 6, role: "Siege artillery", fragment_interactions: "Fire ammo", flavor_text: "Launches burning oil and fragments", type: "Artillery", stats: { ATK: 18, DEF: 3, HP: 9, MOV: 3, RNG: 24, MOR: 7 }, special: ["Indirect Fire", "Blast Template", "Creates Burning Terrain"] },
    { name: "Fragment Launcher", faction: "emberclaw-warpack", points_cost: 7, role: "Magic artillery", fragment_interactions: "Fragment ammo", flavor_text: "Fires explosive fragments at range", type: "Artillery", stats: { ATK: 21, DEF: 3, HP: 9, MOV: 3, RNG: 30, MOR: 7 }, special: ["Indirect Fire", "Fragment Detonation", "Variable Effect"] },
    { name: "Ember Ballista", faction: "emberclaw-warpack", points_cost: 5, role: "Anti-air", fragment_interactions: "Precision shots", flavor_text: "Designed to bring down drakes and flyers", type: "Artillery", stats: { ATK: 24, DEF: 3, HP: 9, MOV: 3, RNG: 36, MOR: 7 }, special: ["+2 ATK vs Flying", "Armor Piercing"] },

    // SPECIALIST (5 units)
    { name: "Fledgling Swarm", faction: "emberclaw-warpack", points_cost: 2, role: "Cheap flyers", fragment_interactions: "Growth", flavor_text: "Young drakes not yet bonded", type: "Specialist", stats: { ATK: 6, DEF: 2, HP: 3, MOV: 10, RNG: 1, MOR: 6 }, special: ["Flying", "Swarm (multiple count as one unit)", "Spark Breath (6\" weak fire)"] },
    { name: "Immolation Bombers", faction: "emberclaw-warpack", points_cost: 4, role: "Suicide unit", fragment_interactions: "Explosion", flavor_text: "Riders who dive into enemies and detonate", type: "Specialist", stats: { ATK: 18, DEF: 2, HP: 3, MOV: 12, RNG: 1, MOR: 10 }, special: ["Flying", "Fearless", "Kamikaze (6\" blast on contact, unit dies)"] },
    { name: "Phoenix Guard", faction: "emberclaw-warpack", points_cost: 6, role: "Resurrection", fragment_interactions: "Rebirth", flavor_text: "Warriors who rise from their ashes", type: "Specialist", stats: { ATK: 15, DEF: 4, HP: 6, MOV: 5, RNG: 1, MOR: 10 }, special: ["Phoenix Rebirth (auto-revive once)", "Fire Immune", "Inspiring"] },
    { name: "Fragment-Blade Assassins", faction: "emberclaw-warpack", points_cost: 5, role: "Assassins", fragment_interactions: "Stealth kills", flavor_text: "Unbonded killers with fragment daggers", type: "Specialist", stats: { ATK: 18, DEF: 3, HP: 6, MOV: 7, RNG: 1, MOR: 8 }, special: ["Stealth", "Assassinate", "Fragment Blade (ignore armor)"] },
    { name: "Flame Prophets", faction: "emberclaw-warpack", points_cost: 5, role: "Morale warfare", fragment_interactions: "Prophecy", flavor_text: "Madmen who see the future in flames", type: "Specialist", stats: { ATK: 9, DEF: 2, HP: 6, MOV: 5, RNG: 12, MOR: 10 }, special: ["Prophecy (grant rerolls)", "Terror", "Maddening Visions (enemy morale penalty)"] },

    // WAR MACHINES (11 units)
    { name: "Grounded Wyrm", faction: "emberclaw-warpack", points_cost: 15, role: "Super-heavy", fragment_interactions: "Massive fire", flavor_text: "Ancient drake too old to fly", type: "War Machine", stats: { ATK: 27, DEF: 7, HP: 36, MOV: 4, RNG: 3, MOR: 10 }, special: ["Massive", "Cataclysm Breath (24\" cone)", "Earthquake Stomp (AoE melee)"] },
    { name: "Mature War Drake", faction: "emberclaw-warpack", points_cost: 10, role: "Heavy monster", fragment_interactions: "Breath weapon", flavor_text: "Prime-age drake in full power", type: "War Machine", stats: { ATK: 21, DEF: 5, HP: 24, MOV: 10, RNG: 2, MOR: 9 }, special: ["Flying", "Inferno Breath (18\" cone)", "Rending Claws", "Terror"] },
    { name: "Young War Drake", faction: "emberclaw-warpack", points_cost: 7, role: "Medium monster", fragment_interactions: "Fire attacks", flavor_text: "Adolescent drake with volatile fire", type: "War Machine", stats: { ATK: 18, DEF: 4, HP: 18, MOV: 12, RNG: 2, MOR: 8 }, special: ["Flying", "Flame Breath (12\" cone)", "Dive Attack (+2 ATK from altitude)"] },
    { name: "Fire Colossus", faction: "emberclaw-warpack", points_cost: 12, role: "Construct", fragment_interactions: "Fragment powered", flavor_text: "Massive golem animated by fragments", type: "War Machine", stats: { ATK: 24, DEF: 6, HP: 30, MOV: 5, RNG: 6, MOR: 10 }, special: ["Fearless", "Fragment Core (explodes on death)", "Fire Aura (damages nearby enemies)"] },
    { name: "Magma Titan", faction: "emberclaw-warpack", points_cost: 13, role: "Elemental", fragment_interactions: "Lava creation", flavor_text: "Living magma bound to combat", type: "War Machine", stats: { ATK: 24, DEF: 5, HP: 33, MOV: 4, RNG: 8, MOR: 10 }, special: ["Fire Immune", "Creates Lava Terrain", "Magma Blast"] },
    { name: "Drake Nest Mobile", faction: "emberclaw-warpack", points_cost: 9, role: "Spawner", fragment_interactions: "Summons drakes", flavor_text: "Portable hatchery on wheels", type: "War Machine", stats: { ATK: 12, DEF: 6, HP: 24, MOV: 3, RNG: 1, MOR: 10 }, special: ["Spawn Fledglings (1d3 per turn)", "Heavily Armored", "Slow"] },
    { name: "Obsidax (Unique Wyrm)", faction: "emberclaw-warpack", points_cost: 30, role: "Named monster", fragment_interactions: "Legendary", flavor_text: "Tzarak's Obsidian Wyrm partner", type: "War Machine", stats: { ATK: 42, DEF: 9, HP: 72, MOV: 10, RNG: 6, MOR: 10 }, special: ["Flying", "Cataclysm Breath (30\" cone)", "Ancient Power", "Earthquake Landing", "Legendary (one per army)"] },
    { name: "Pyrathax (Unique Ancient)", faction: "emberclaw-warpack", points_cost: 20, role: "Named drake", fragment_interactions: "Commander mount", flavor_text: "Scorchcaller Vex's drake", type: "War Machine", stats: { ATK: 30, DEF: 7, HP: 48, MOV: 12, RNG: 4, MOR: 10 }, special: ["Flying", "Crimson Inferno Breath (20\" cone)", "Ancient Resilience", "Legendary (Vex only)"] },
    { name: "Flame Engine", faction: "emberclaw-warpack", points_cost: 8, role: "Support war machine", fragment_interactions: "Buff aura", flavor_text: "Mobile fragment reactor", type: "War Machine", stats: { ATK: 12, DEF: 5, HP: 21, MOV: 4, RNG: 1, MOR: 10 }, special: ["Fragment Amplification Aura", "Buff Nearby Fire Attacks", "Fragile Core"] },
    { name: "Cinder Golem", faction: "emberclaw-warpack", points_cost: 9, role: "Animated construct", fragment_interactions: "Ash creation", flavor_text: "Golem made from volcanic ash", type: "War Machine", stats: { ATK: 21, DEF: 6, HP: 27, MOV: 5, RNG: 1, MOR: 10 }, special: ["Fearless", "Regeneration (in ash terrain)", "Ash Cloud Aura (blocks LoS)"] },
    { name: "Scorched Titan", faction: "emberclaw-warpack", points_cost: 14, role: "Heavy construct", fragment_interactions: "Demolition", flavor_text: "Massive stone giant wreathed in flame", type: "War Machine", stats: { ATK: 27, DEF: 7, HP: 36, MOV: 4, RNG: 2, MOR: 10 }, special: ["Massive", "Siege Breaker", "Fire Stomp (AoE)", "Slow but Unstoppable"] }
  );

  // ===========================
  // FRAGMENTS (15)
  // ===========================

  gameData.fragments.push(
    { name: "Ember Core", faction: "emberclaw-warpack", effects: "Basic fire boost; +1 ATK to fire attacks", risk_instability: "Low", activation_cost: 1, interaction_evolution: "Stable across all evolutions; reliable damage boost" },
    { name: "Inferno Heart", faction: "emberclaw-warpack", effects: "Major fire boost; +3 ATK to breath weapons", risk_instability: "Medium", activation_cost: 2, interaction_evolution: "Knowledge: no instability. Chaos: +5 ATK but 50% chance to damage user" },
    { name: "Velocity Shard", faction: "emberclaw-warpack", effects: "Speed boost; +3 MOV to flying units", risk_instability: "Low", activation_cost: 1, interaction_evolution: "Movement specialists like Lyss double the effect" },
    { name: "Phoenix Ash", faction: "emberclaw-warpack", effects: "Resurrection; revive one fallen unit at 1 HP", risk_instability: "High", activation_cost: 3, interaction_evolution: "Kora reduces cost to 1; Chaos commanders risk random unit revival" },
    { name: "Pyroclast Stone", faction: "emberclaw-warpack", effects: "Explosion; 6\" blast dealing fire damage", risk_instability: "High", activation_cost: 2, interaction_evolution: "Unstable; can detonate prematurely damaging user" },
    { name: "Thermal Vision Gem", faction: "emberclaw-warpack", effects: "Detection; reveal all hidden units", risk_instability: "None", activation_cost: 1, interaction_evolution: "Orin gains perfect information; Chaos commanders see hallucinations too" },
    { name: "Dragonscale Ward", faction: "emberclaw-warpack", effects: "Defense; +2 DEF and fire immunity", risk_instability: "Low", activation_cost: 2, interaction_evolution: "Defensive commanders can stack multiple wards" },
    { name: "Fury Crystal", faction: "emberclaw-warpack", effects: "Berserker rage; +4 ATK, -2 DEF, Fearless", risk_instability: "Medium", activation_cost: 2, interaction_evolution: "Drenna and Threx can control the rage; others go berserk" },
    { name: "Molten Core", faction: "emberclaw-warpack", effects: "Lava creation; turn terrain into lava", risk_instability: "Medium", activation_cost: 2, interaction_evolution: "Terrain manipulation; helps area denial strategies" },
    { name: "Wind Rider Charm", faction: "emberclaw-warpack", effects: "Flight boost; +2 MOV and ignore terrain", risk_instability: "None", activation_cost: 1, interaction_evolution: "Aerial commanders maximize this; ground commanders waste it" },
    { name: "Tyrant's Blessing", faction: "emberclaw-warpack", effects: "Divine boost; reroll all failed rolls this turn", risk_instability: "Very High", activation_cost: 4, interaction_evolution: "Syrax reduces cost; others risk divine wrath (lose turn)" },
    { name: "Flame Rebirth Token", faction: "emberclaw-warpack", effects: "Auto-revive on death once", risk_instability: "None", activation_cost: 3, interaction_evolution: "Single-use; expensive but guarantees survival" },
    { name: "Breath Amplifier", faction: "emberclaw-warpack", effects: "Breath weapon boost; double cone size", risk_instability: "Medium", activation_cost: 2, interaction_evolution: "Vex specializes in this; breath-heavy armies love it" },
    { name: "Ash Cloud Sphere", faction: "emberclaw-warpack", effects: "Concealment; create 12\" smoke zone blocking LoS", risk_instability: "Low", activation_cost: 1, interaction_evolution: "Blocks firing; helps approach or retreat" },
    { name: "Scorched Earth Rune", faction: "emberclaw-warpack", effects: "Terrain destruction; create difficult terrain zone", risk_instability: "None", activation_cost: 1, interaction_evolution: "Area denial; slows enemy movement" }
  );

})();
