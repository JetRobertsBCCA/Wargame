(function() {
  // ================================
  // THORNWEFT MATRIARCHY FACTION
  // ================================

  gameData.factions.push({
    id: "thornweft-matriarchy",
    name: "The Thornweft Matriarchy",
    icon: "🕸️",
    color: "#6b21a8",
    theme: "Spider-worshipping fate-weavers who spin silk roads that rewrite geography and redeploy armies through web-network teleportation",
    flavor_text: "The Thornweft do not march to war — they weave it. From the Gossamer Depths, where silk-cathedrals hang between canyon walls and the Loom-Mothers spin threads of causality itself, the Matriarchy reaches outward through an ever-growing web of fate, territory, and hunger. Enemies do not see the Thornweft coming. They see the world rearranging itself to accommodate its new owners, and by then, the silk is already around their throat.",
    motif_description: "Spider-silk armor layered in geometric web-patterns. Officers wear masks of woven chitin with too many eye-lenses. Banners are living webs that pulse with trapped light. Weapons trail gossamer filaments. The army moves with unsettling coordination, as though directed by a single vast intelligence pulling invisible strings.",
    core_philosophy: "Fate is not written — it is woven. The Matriarchy does not believe in destiny as a fixed path but as a tapestry constantly being woven and unwoven. The Loom-Mothers shape the threads of causality through ritual, silk-magic, and patient manipulation. Every battlefield is a loom; every soldier is a thread. The Thornweft do not fight wars — they re-weave reality until the war was always going to end in their favor.",

    faction_bonuses: [
      "Web-Network Teleport: Thornweft units can redeploy between any two friendly Web-Anchor points instead of moving normally",
      "Fate-Threads: Once per turn, the Thornweft player may force one enemy unit to reroll a successful die roll",
      "Gossamer Trap: Web terrain placed by Thornweft units counts as impassable for enemies and open ground for Thornweft",
      "Silk Shroud: All Thornweft units gain Light Cover (+1 DEF) when within 6\" of web terrain"
    ],

    playstyle_notes: "The Thornweft Matriarchy controls the battlefield through terrain manipulation and redeployment. Place Web-Anchors to create a teleportation network, then shift your army across the board to exploit weak points. Fate-Threads punish enemy dice rolls, and Gossamer Traps reshape movement lanes. The Matriarchy rewards patient, positional play — build your web in the early game, then strangle the enemy in the mid-to-late game. Weakness: slow to set up, fragile individual units, and vulnerable to armies that rush before the web is complete.",

    worldview: [
      "All things are connected by threads invisible to the unenlightened — tug one thread, and a kingdom unravels",
      "Patience is the supreme virtue; the spider does not chase the fly",
      "The individual is a single thread — meaningless alone, essential within the pattern",
      "To see the web is to see truth; those who cannot see it are already caught in it",
      "Consumption is not cruelty — the fly feeds the spider, the spider feeds the web, the web feeds the world"
    ],

    political_structure: "The Thornweft Matriarchy is governed by the Loom Council — seven Loom-Mothers who each oversee a sacred aspect of the Great Web. Above them sits the Weave-Queen, a figure so deeply enmeshed in the Web of Fate that she no longer distinguishes between her own thoughts and the vibrations of causality itself. Rank is determined by sensitivity to the Web — those who can read the most threads command the most authority. Males serve as Thread-Wardens (warriors) and Shuttle-Consorts (administrators), respected but never permitted on the Loom Council. Political disputes are settled through Weave-Duels, where opponents attempt to unravel each other's fate-threads without damaging the greater pattern.",

    silk_doctrine: {
      overview: "The Silk Doctrine is the Thornweft Matriarchy's foundational philosophy — three tenets that govern warfare, governance, and the use of their reality-weaving silk-magic. Every soldier, weaver, and spider-bonded warrior internalizes these tenets as sacred law.",
      tenets: [
        {
          name: "The Tenet of the Loom",
          concept: "Reality is a tapestry being woven in real time; those who can see the threads can reshape the pattern.",
          implications: [
            "Loom-Mothers constantly read the Web of Fate, adjusting strategy before events unfold",
            "Battles are pre-planned through fate-reading — the Thornweft fight wars they've already 'seen' winning",
            "Disruption of enemy fate-threads is as important as physical combat",
            "Every Thornweft action is deliberate — there are no coincidences, only unread threads"
          ],
          mechanics: [
            "Fate-Thread Manipulation: force enemy rerolls or grant friendly rerolls",
            "Pre-battle scrying allows partial deployment knowledge of enemy army",
            "Web-Anchor placement creates the strategic framework for the entire battle"
          ],
          symbol: "🕸️ The Infinite Loom — a web with no center and no edge, representing the boundless nature of fate"
        },
        {
          name: "The Tenet of the Silk",
          concept: "Connection is strength; isolation is death. Every thread in the web supports every other thread.",
          implications: [
            "Thornweft units fight best when networked through Web-Anchors, sharing information and support",
            "Isolated units are considered 'severed threads' — tactically and spiritually dead",
            "The web is sacred infrastructure — damaging it is the highest crime",
            "Alliances, trade routes, and spy networks are all extensions of the Great Web"
          ],
          mechanics: [
            "Web-Network Teleport allows instant repositioning between Anchor points",
            "Units within the web gain cumulative bonuses based on network density",
            "Severed units (outside web range) suffer morale and stat penalties"
          ],
          symbol: "🧵 The Unbroken Thread — a single silk strand looping back on itself endlessly"
        },
        {
          name: "The Tenet of the Fang",
          concept: "The spider is patient, but when it strikes, there is no escape. Mercy is a thread the Thornweft do not weave.",
          implications: [
            "Enemies are ensnared before they are attacked — traps, terrain control, and web-zones precede violence",
            "Killing blows are delivered with precision, not brute force — waste is anathema",
            "Captured enemies are cocooned and drained, their essence feeding the Web",
            "The Matriarchy never pursues fleeing enemies — if they escape the web, they were never truly caught"
          ],
          mechanics: [
            "Gossamer Trap terrain restricts enemy movement and grants Thornweft bonuses",
            "Venomstrike units apply poison tokens that degrade enemy stats over time",
            "Cocoon mechanic: destroyed enemies can be harvested for resource tokens"
          ],
          symbol: "🦷 The Silk Fang — a spider's chelicera dripping venom onto a web-wrapped prey"
        }
      ],
      doctrine_in_practice: {
        training: "Thornweft warriors are raised from birth surrounded by spider-silk. Initiates undergo the Threading — a ritual where a Loom-Spider bonds with the candidate, spinning silk directly into their nervous system. This grants heightened spatial awareness, tremor-sense through web structures, and a permanent connection to the Great Web's information network. Failed Threadings leave candidates catatonic; their bodies are woven into the Web as anchor-points.",
        hierarchy_integration: "Rank is determined by Web-Sensitivity — the ability to read and manipulate fate-threads. A warrior who can sense vibrations across an entire battlefield outranks one who can only feel adjacent threads. Loom-Mothers can sense the Web across continents.",
        combat_philosophy: "Never fight on ground that isn't yours. Lay web, establish anchors, build the network, then redeploy into position and strike. If the web isn't ready, retreat and rebuild. The Thornweft have never lost a battle fought on a completed web — and they never fight on anything else."
      },
      keywords: ["Fate-Weaving", "Web Warfare", "Silk Magic", "Patient Predation", "Network Supremacy"]
    },

    hierarchy: {
      overview: "The Thornweft hierarchy mirrors a spider's web — concentric rings of authority radiating outward from the Weave-Queen at the center. Each ring represents a level of Web-Sensitivity and responsibility. Authority flows inward, not downward; decisions are made at the center and transmitted through vibrations in the Web itself.",
      ranks: [
        {
          title: "The Weave-Queen",
          role: "Supreme authority; living nexus of the Great Web",
          responsibilities: [
            "Reads the deepest threads of fate across the world",
            "Directs the Loom Council's grand strategy through whispered web-vibrations",
            "Maintains the Great Web's structural integrity — without her, the network collapses",
            "Performs the Grand Weaving once per century, reshaping regional geography"
          ],
          characteristics: [
            "Has not moved from her throne in 200 years — her body is fused with the Web's central nexus",
            "Speaks through vibrations transmitted by silk strands, heard as whispers in every Thornweft warrior's skull",
            "Her eight eyes have been replaced by web-lenses that see fate-threads instead of light",
            "More silk than flesh; her heartbeat sends pulses through the entire Web"
          ]
        },
        {
          title: "Loom-Mother",
          role: "Council member; oversees a domain of the Web (War, Prophecy, Harvest, Growth, Shadow, Poison, or Architecture)",
          responsibilities: [
            "Commands armies within her domain",
            "Weaves fate-threads on a strategic level, redirecting wars before they begin",
            "Trains and evaluates Thread-Seers for promotion",
            "Maintains the Web-Anchors within her territory"
          ],
          characteristics: [
            "Spider-bonded since childhood; their spider-partner has grown to monstrous size",
            "Wear robes of living silk that shift color and pattern with mood and intent",
            "Can read fate-threads within a 50-mile radius",
            "Each carries a Loom-Staff — a spindle that can weave or unravel reality"
          ]
        },
        {
          title: "Thread-Seer",
          role: "Senior officer; commands battalions and reads battlefield fate-threads",
          responsibilities: [
            "Tactical command of Thornweft forces in the field",
            "Reads short-range fate-threads to anticipate enemy movement",
            "Manages Web-Anchor deployment and network expansion",
            "Conducts Weave-Duels to resolve command disputes"
          ],
          characteristics: [
            "Wear multi-lensed masks revealing web-patterns invisible to others",
            "Bonded to medium-sized Loom-Spiders that sit on their shoulders or backs",
            "Can sense tremors in the Web across an entire battlefield",
            "Scarred hands from decades of thread-manipulation — their fingertips are calloused silk"
          ]
        },
        {
          title: "Silk-Marshal",
          role: "Mid-level officer; coordinates squad-level web-warfare",
          responsibilities: [
            "Leads squads of 10-20 warriors in web-building and combat",
            "Deploys Gossamer Traps and maintains local Web-Anchors",
            "Coordinates teleportation movements through the web-network",
            "Reports thread-readings to Thread-Seers"
          ],
          characteristics: [
            "Wear silk-woven armor reinforced with chitin plates harvested from spider-molts",
            "Carry Spindle-Blades — weapons that trail cutting silk filaments",
            "Bonded to smaller combat-spiders that fight alongside them",
            "Promoted through Weave-Trials: must weave a functioning Web-Anchor under combat conditions"
          ]
        },
        {
          title: "Thread-Warden",
          role: "Standard warrior; the silk-armored soldiers of the Matriarchy",
          responsibilities: [
            "Hold web-lines and defend Web-Anchors",
            "Fight in silk-coordinated formations",
            "Lay basic web terrain and gossamer traps during advance",
            "Serve as living conduits for Web vibrations"
          ],
          characteristics: [
            "Wear spider-silk bodygloves under chitin plate; light but strong",
            "Weapons coated in spider-venom; each wound weakens over time",
            "Can feel vibrations through the Web, giving them preternatural awareness of nearby threats",
            "The bulk of the Matriarchy's fighting force"
          ]
        },
        {
          title: "Shuttle-Consort",
          role: "Male administrative and logistical staff",
          responsibilities: [
            "Manage supply lines, web-construction crews, and civilian infrastructure",
            "Serve as diplomatic envoys (considered expendable)",
            "Maintain the Great Web's physical silk-strands between Anchors",
            "Coordinate harvesting and cocoon-processing"
          ],
          characteristics: [
            "Wear simpler silk uniforms without chitin armor",
            "Highly organized and fiercely loyal to their assigned Loom-Mother",
            "Some Consorts develop limited web-sensitivity through decades of service",
            "Respected for their role but not permitted to command combat forces"
          ]
        }
      ],
      titles_table: [
        { title: "Web-Blessed", significance: "Survived the Threading ritual with exceptional sensitivity", notes: "Fast-tracked for Thread-Seer evaluation" },
        { title: "Silk-Tongue", significance: "Diplomat who has successfully ensnared three or more enemy factions in treaties", notes: "Allowed to speak on behalf of the Loom Council" },
        { title: "Venom-Kissed", significance: "Warrior who has survived a Spider-Queen's bite and gained venom-immunity", notes: "Can handle the deadliest toxins bare-handed" },
        { title: "Thread-Cutter", significance: "Assassin who has severed an enemy commander's fate-thread, killing them from a distance", notes: "Feared and revered; operates alone" },
        { title: "Loom-Sworn", significance: "Has woven a Web-Anchor that persisted for a full year", notes: "Permanent mark of engineering skill" },
        { title: "The Cocooned", significance: "Warrior who was wrapped in silk and reborn with enhanced Web-sensitivity", notes: "Unsettling; their eyes reflect light like a spider's" }
      ],
      hierarchy_notes: [
        "Web-Sensitivity is everything — a Thread-Warden who suddenly manifests high sensitivity will be promoted immediately",
        "Loom-Mothers who lose their spider-partner enter a mourning-cocoon for one year; some never emerge",
        "The Weave-Queen has not appointed a successor; the Loom Council fears what happens when she finally dies",
        "Males can achieve high status as Shuttle-Consorts but are spiritually barred from the Loom — the Web 'rejects' male weavers"
      ],
      keywords: ["Web-Sensitivity", "Matriarchal Rule", "Loom Council", "Fate Authority", "Silk Hierarchy"]
    },

    weave_queen: {
      title: "The Weave-Queen Arachessa",
      role: "The living center of the Great Web — supreme ruler and oracle of the Thornweft Matriarchy",
      faction_rank: "Absolute authority; the Web itself obeys her",
      aliases: [
        "The Still Center",
        "Mother of All Threads",
        "She Who Sits and Sees",
        "The Patient One"
      ],
      summary: "Arachessa has sat at the center of the Great Web for over two centuries, her body slowly fusing with the silk-nexus until it is impossible to tell where the Queen ends and the Web begins. She does not rule through edicts or force — she rules through the Web. Every vibration, every tremor, every shift in fate passes through her before reaching anyone else. She is omniscient within her domain and nearly so beyond it. Her patience is legendary and terrifying; she has been known to wait forty years for a single thread to come into alignment before acting.",
      appearance: [
        "Her lower body has merged with a throne of living silk, eight legs of woven gossamer supporting a torso that is still recognizably humanoid",
        "Eight eyes — four biological, four silk-lens implants — each seeing a different spectrum of fate",
        "Hair has been replaced by thousands of fine silk strands that extend into the Web itself, each one a nerve ending",
        "When she moves her hands, the Web moves with her — threads across the world shift in response",
        "Her skin is translucent in places, revealing a circulatory system that pumps liquid silk instead of blood"
      ],
      personality: [
        { trait: "Infinitely Patient", description: "Can wait decades for a single thread to align. Her concept of urgency is measured in years, not minutes." },
        { trait: "Coldly Loving", description: "Loves the Web and all its components the way a spider loves its creation — protective, possessive, and willing to consume parts of it to preserve the whole." },
        { trait: "Omniscient Within the Web", description: "Knows everything happening within the Web's reach. Outside it, she is merely very well-informed." },
        { trait: "Subtly Cruel", description: "Does not rage or threaten. Simply adjusts a thread and watches an enemy's life unravel over months. Her punishments are elegant, invisible, and inevitable." }
      ],
      abilities: [
        { name: "The Grand Weaving", description: "Once per century, Arachessa can physically reshape geography within a 100-mile radius — moving rivers, raising hills, sinking roads — by reweaving the land's fate-threads." },
        { name: "Omniscient Web", description: "Senses everything within the Great Web's reach. No ambush, no secret movement, no hidden deployment is unknown to her." },
        { name: "Thread Severance", description: "Can kill a single mortal by severing their fate-thread. Requires immense concentration and a clear Web-path to the target." },
        { name: "Web Pulse", description: "Sends a command-vibration through the entire Web simultaneously, allowing instant coordination of all Thornweft forces globally." }
      ],
      faction_role: [
        { area: "Strategy", detail: "Arachessa does not plan battles — she plans the conditions under which battles become inevitable and unlosable." },
        { area: "Religion", detail: "Worshipped as the living incarnation of the Spider-Goddess Thessara. Prayers are sent as vibrations through silk strands." },
        { area: "Governance", detail: "Rules through the Loom Council, who interpret her web-vibrations as policy. Direct orders are rare and always obeyed instantly." }
      ],
      lore_notes: [
        "No one alive has seen Arachessa's face in person — her throne-chamber is accessible only through the deepest Web tunnels",
        "She is believed to be immortal as long as the Web exists; severing the Web would kill her instantly",
        "Three assassination attempts have been made; each assassin found themselves walking in circles for days before collapsing at Arachessa's feet",
        "Some Loom-Mothers secretly believe Arachessa is no longer truly sentient — that she is merely a conduit through which the Web itself thinks"
      ],
      keywords: ["Living Nexus", "Fate Incarnate", "Web-Omniscience", "Infinite Patience", "Spider-Goddess Avatar"]
    },

    spider_bonds: {
      overview: "Every Thornweft warrior bonds with a Loom-Spider during the Threading ritual. These spiders are not mere animals — they are semi-sentient silk-weavers bred across centuries for intelligence, obedience, and Web-sensitivity. The bond links warrior and spider neurologically through silk-nerve filaments, granting shared senses and instinctive coordination.",
      stages: [
        {
          stage_number: 1,
          name: "Spiderling Bond (0-3 years)",
          overview: "A newly Threaded warrior bonds with a young Loom-Spider the size of a fist. The bond is forming — instinctive but clumsy.",
          physical: [
            "Spider is 4-8 inches across; rides on the warrior's shoulder or helmet",
            "Silk production is minimal — enough for basic tripwires and personal webbing",
            "Spider is fragile; if killed, the warrior can re-bond within months"
          ],
          abilities: [
            "Tremor-Sense: warrior can feel vibrations in web terrain within 6\"",
            "Basic silk-spinning: lay tripwire traps in adjacent squares",
            "Shared senses: warrior gains 360-degree spatial awareness when spider is deployed"
          ],
          behavior: [
            "Spider is curious and occasionally disobedient",
            "Bond is emotional; warrior becomes protective of their spider",
            "Frequent silk-grooming is required to prevent tangling"
          ]
        },
        {
          stage_number: 2,
          name: "Weaver Bond (3-15 years)",
          overview: "The spider has grown to dog-size and produces structural-grade silk. The bond is mature — warrior and spider act as one.",
          physical: [
            "Spider is 2-4 feet across; can carry small loads and fight independently",
            "Silk production is significant — can build Web-Anchor foundations in minutes",
            "Chitin plates harden enough to deflect arrows; spider becomes combat-viable"
          ],
          abilities: [
            "Web-Anchor Construction: spider can build functional Anchor points for the network",
            "Combat Silk: launch binding strands at enemies within 8\" (immobilize on hit)",
            "Enhanced Tremor-Sense: warrior can feel vibrations across the entire local web"
          ],
          behavior: [
            "Spider and warrior communicate through web-vibrations — a private language",
            "Spider displays tactical intelligence: flanks, retreats, and ambushes independently",
            "Bond is strong enough that the spider will sacrifice itself for the warrior"
          ]
        },
        {
          stage_number: 3,
          name: "Matriarch Bond (15-50 years)",
          overview: "The spider is horse-sized and produces fate-grade silk capable of minimal reality manipulation. The bond is transcendent — warrior and spider share thoughts.",
          physical: [
            "Spider is 5-8 feet across; can be ridden as a mount or serve as a mobile Anchor",
            "Silk production is extraordinary — can weave full Web-Anchors in seconds and Gossamer Traps on the move",
            "Chitin armor is dense enough to stop crossbow bolts; fangs can pierce plate armor"
          ],
          abilities: [
            "Fate-Silk: spider's silk can tug on minor fate-threads, granting rerolls to nearby allies",
            "Web-Walking: warrior and spider can teleport between Anchors at will",
            "Venomstrike: spider's bite applies paralytic venom (target loses 1 activation)",
            "Living Anchor: spider itself counts as a mobile Web-Anchor point"
          ],
          behavior: [
            "Spider and warrior are neurologically inseparable — killing one causes psychic trauma to the other",
            "Spider displays strategic intelligence: can command lesser spiders independently",
            "Their shared presence stabilizes the local Web, granting a passive buff aura"
          ]
        },
        {
          stage_number: 4,
          name: "Queen-Spawn Bond (50+ years)",
          overview: "The spider has grown to monstrous proportions and its silk can physically reweave local geography. Only Loom-Mothers achieve this bond. The warrior and spider are effectively one being in two bodies.",
          physical: [
            "Spider is 12-20 feet across; a living siege engine wreathed in silk",
            "Silk production is reality-grade — weaving physical terrain alterations into the world",
            "Chitin armor stops siege weaponry; fangs inject venom that dissolves stone"
          ],
          abilities: [
            "Reality Weaving: physically reshape terrain within 12\" — raise walls, lower ground, create bridges",
            "Web Dominion: all Web-Anchors within 24\" are enhanced, granting bonus teleportation and faster redeployment",
            "Silk Storm: launch a barrage of cutting silk filaments in a 12\" cone (AoE damage + immobilize)",
            "Fate Command: directly manipulate enemy fate-threads to force re-rolls on all dice within range"
          ],
          behavior: [
            "Spider and warrior have merged consciousness; they think as one and feel as one",
            "The spider lays eggs that hatch into lesser Loom-Spiders for bonding — the warrior becomes a mother of generations",
            "Their death would tear a hole in the Web, causing localized fate-collapse"
          ]
        }
      ],
      progression_notes: [
        "Spider growth depends on silk-consumption — spiders must eat web-material to grow, including enemy silk and even their own shed strands",
        "Not all warriors progress beyond Weaver Bond; it requires deepening Web-Sensitivity",
        "Killing a bonded spider causes permanent psychological scarring — many warriors never recover",
        "Queen-Spawn Bonds are so rare that only seven exist at any time — one per Loom-Mother"
      ],
      keywords: ["Spider Bond", "Loom-Spider", "Silk Evolution", "Web-Sensitivity", "Neural Link"]
    },

    military_doctrine: {
      overview: "Thornweft warfare is not combat — it is architecture. Every battle begins with construction: Web-Anchors are placed, silk-roads are spun, traps are woven, and the network is tested. Only when the web is ready does the killing begin. The Matriarchy fights like a spider: patient preparation followed by sudden, inescapable violence.",
      core_principles: [
        {
          name: "Web First, Blood Second",
          details: [
            "The first 2-3 turns of every battle should be spent deploying Web-Anchors and establishing the network",
            "No offensive action is taken until at least three Anchor points are operational",
            "Rushing an unprepared web is the single most common cause of Thornweft defeat"
          ]
        },
        {
          name: "Redeployment Supremacy",
          details: [
            "The web-network allows instant teleportation between Anchors — Thornweft can appear anywhere on the battlefield in a single movement",
            "Use teleportation to mass forces at weak points, then disperse before counterattack",
            "Enemy forces cannot predict where Thornweft will strike because they can redeploy faster than any other faction"
          ]
        },
        {
          name: "Terrain is a Weapon",
          details: [
            "Gossamer Traps turn the battlefield against the enemy — web terrain is impassable for foes and open ground for Thornweft",
            "Advanced units can physically reshape terrain through silk-weaving, creating walls, bridges, and pitfalls",
            "The ideal Thornweft battlefield is a maze of web-terrain that only its forces can navigate"
          ]
        },
        {
          name: "Death by Attrition",
          details: [
            "Thornweft units apply poison and debuffs that degrade enemies over time",
            "Venom tokens accumulate on wounded enemies, reducing their combat effectiveness each turn",
            "The Matriarchy doesn't need to destroy the enemy — just weaken them until they can't fight back"
          ]
        },
        {
          name: "Fate Manipulation",
          details: [
            "Thread-Seers and Loom-Mothers can force enemy rerolls, negating critical successes",
            "Fate-reading abilities grant partial foreknowledge of enemy plans",
            "The psychological impact of seeing your dice betray you is as devastating as any weapon"
          ]
        }
      ],
      battlefield_behavior: [
        {
          name: "Opening Phase: The Weaving",
          details: [
            "Deploy Web-Spinners and Anchor units forward under light cover",
            "Lay web terrain across key chokepoints and objective areas",
            "Establish at least three Web-Anchor points for basic teleportation network",
            "Screen forward with expendable Spiderling Swarms to delay enemy advance"
          ]
        },
        {
          name: "Mid-Game: The Tightening",
          details: [
            "Web-network is operational; begin teleporting strike units to flanks and rear",
            "Gossamer Traps channel enemy movement into kill zones",
            "Venomstrike units engage in hit-and-run, applying poison tokens",
            "Thread-Seers begin fate-manipulation to degrade enemy command rolls"
          ]
        },
        {
          name: "End-Game: The Consumption",
          details: [
            "The web is complete — enemies are surrounded, debuffed, and unable to maneuver",
            "Elite units teleport in for the killing blow on weakened targets",
            "Destroyed enemies are cocooned for resource harvesting",
            "Any enemy that breaks through the web is allowed to flee — pursuit is beneath the Matriarchy"
          ]
        }
      ],
      strategic_notes: [
        "Thornweft struggles against alpha-strike armies that close before the web is ready — Emberclaw drakes are a nightmare matchup",
        "Weather and fire counter the web — burning web terrain removes the entire network advantage",
        "The Matriarchy's greatest weakness is the Weave-Queen dependency — if strategic coordination is disrupted, the army falters"
      ],
      keywords: ["Web Architecture", "Teleport Warfare", "Terrain Control", "Fate Manipulation", "Patient Predation"]
    },

    war_machines_lore: {
      overview: "Thornweft war machines are living constructs — massive spiders, silk-woven golems, and web-catapults crewed by bonded weavers. They are grown, not built; each machine is a biological marvel of chitin, silk, and venom.",
      general_characteristics: [
        { trait: "Organic Construction", detail: "War machines are grown from spider-egg sacs infused with fate-silk; they take months to mature but are self-repairing" },
        { trait: "Web-Integrated", detail: "All war machines function as mobile Web-Anchors, extending the teleportation network wherever they advance" },
        { trait: "Venom-Armed", detail: "Weapons systems deliver paralytic, necrotic, or psychic venoms tailored to the target" }
      ],
      tactical_role: [
        "War machines anchor the flanks of the web-network, providing Anchor points in forward positions",
        "Massive spiders serve as both mounts and siege engines, climbing walls and spinning structural web",
        "Silk-catapults launch web-bombs that create instant trap terrain in enemy positions"
      ],
      keywords: ["Organic Machines", "Living Constructs", "Web-Anchor Platforms", "Venom Delivery"]
    },

    signature_weapons: {
      overview: "Thornweft weapons are extensions of the web — silk-edged blades, venom-coated darts, and thread-spindles that bind and cut simultaneously. Every weapon trails gossamer filaments that connect the wielder to the Web.",
      core_traits: [
        { trait: "Silk-Forged", detail: "Blades are woven from compressed spider-silk harder than steel but lighter than cloth — they flex instead of breaking" },
        { trait: "Venom-Coated", detail: "All melee weapons are coated in spider-venom that degrades enemy performance over time" },
        { trait: "Thread-Linked", detail: "Weapons trail invisible silk strands that connect back to the Web — strikes carry information as well as damage" }
      ],
      weapons: [
        {
          name: "Spindle-Blade",
          type: "One-Handed Sword",
          wielder: "Thread-Wardens and Silk-Marshals",
          properties: "Melee attacks apply 1 Venom token; trailing silk allows the wielder to sense the target's next move (reroll 1 defense die)",
          lore: "A curved blade woven from compressed silk-steel alloy. The edge is monomolecular silk — it cuts through armor like a razor through web. The hilt trails gossamer thread that connects to the Web, reporting each kill."
        },
        {
          name: "Web-Caster",
          type: "Ranged Weapon",
          wielder: "Web-Spinners and combat spiders",
          properties: "8\" range; target hit is immobilized for 1 turn; can target terrain to create web zones",
          lore: "A wrist-mounted spinnerette that fires coils of adhesive silk. Can pin enemies in place, create improvised bridges, or seal doorways. The silk dissolves after 24 hours unless reinforced."
        },
        {
          name: "Fang-Glaive",
          type: "Polearm",
          wielder: "Thread-Seer bodyguards",
          properties: "Reach weapon; venom applies -1 ATK to target for 2 turns; cleaving strikes can hit two adjacent enemies",
          lore: "A long-hafted weapon tipped with a preserved Spider-Queen fang. The venom gland is intact, secreting paralytic toxin with each thrust. The haft is wrapped in vibration-sensitive silk that warns of incoming attacks."
        },
        {
          name: "Silk-Shot Darts",
          type: "Thrown Weapon",
          wielder: "Skirmishers and scouts",
          properties: "6\" range; apply 1 Venom token; can be coated in different venoms for different effects",
          lore: "Hollow chitin needles filled with concentrated spider venom. Near-silent in flight. A full bandolier carries 12, each dipped in a cocktail specialized for the expected enemy — paralytic for heavy infantry, psychic for mages, necrotic for the undead."
        },
        {
          name: "Loom-Staff",
          type: "Command Artifact",
          wielder: "Loom-Mothers only",
          properties: "12\" range; can weave or unravel fate-threads (force 2 rerolls per turn); creates Web-Anchor at wielder's position",
          lore: "A spindle-topped staff carved from the leg-bone of a Queen-Spawn Spider. Silk threads trail from its tip like a cloud of gossamer. When planted in the earth, it becomes a Web-Anchor that stabilizes the local fate-field and connects to the Great Web."
        },
        {
          name: "Cocoon Grenades",
          type: "Thrown Explosive",
          wielder: "Silk-Marshals and specialists",
          properties: "4\" blast template; all models hit are immobilized for 1 turn and count as web terrain",
          lore: "Compressed silk-balls that explode on impact into a web of adhesive strands. The silk is fast-hardening and sticky enough to stop a charging warhorse. Victims must cut themselves free or be wrapped tighter by responding spider units."
        },
        {
          name: "The Weave-Queen's Thread",
          type: "Legendary Artifact",
          wielder: "The Weave-Queen only",
          properties: "Infinite range; sever one fate-thread per battle (instant-kill one model, no save); maintaining the thread costs the Queen 1 activation",
          lore: "A single thread of pure fate-silk, so fine it is invisible to the naked eye. It extends from the Weave-Queen's spinnerette and can reach across the world. When wrapped around a target's fate-thread, a single tug severs their connection to existence."
        }
      ],
      tactical_notes: [
        "Thornweft weapons are designed for attrition, not burst damage — stacking venom tokens is the primary kill mechanism",
        "Immobilization weapons are critical for setting up kill zones — pin the enemy, then concentrate fire",
        "The Web-Caster is as useful for terrain creation as it is for combat — always have Web-Spinners laying web"
      ],
      keywords: ["Silk-Forged", "Venom Weapons", "Immobilization", "Thread-Linked", "Fate-Cutting"]
    },

    fragment_source: {
      overview: "The Thornweft's fragment source is the Gossamer Nexus — a vast crystallized web deep beneath the Loom-Caverns where fate-threads visibly intersect. It was here that the first Loom-Spider was born, spinning silk from raw causality.",
      primary_name: "The Gossamer Nexus",
      aliases: [
        "The First Web",
        "Thessara's Cradle",
        "The Thread-Heart"
      ],
      nature: [
        { trait: "Fate Crystallization", detail: "Where enough fate-threads converge, they crystallize into solid silk-crystal — fragments of pure causality that can be woven into spells or weapons" },
        { trait: "Living Web", detail: "The Nexus is not static — it grows, shifts, and responds to events in the world. New threads appear as new fates emerge; old ones fade as possibilities collapse" },
        { trait: "Spider Origin", detail: "Legend says the first Loom-Spider hatched from a cocoon woven from three fate-threads: Past, Present, and Future. The Nexus is her nest." }
      ],
      relationship: [
        {
          aspect: "Harvesting",
          details: [
            "Loom-Mothers descend into the Nexus during the Silk Solstice to harvest crystallized fate-threads",
            "Harvesting requires extreme care — pulling the wrong thread can unravel local causality, causing paradox events",
            "Harvested fragments are woven into Loom-Staffs, Web-Anchors, and the armor of elite warriors"
          ]
        },
        {
          aspect: "Fragment Type",
          details: [
            "Thornweft fragments are Fate-aspected: they manipulate probability, weave terrain, and grant foresight",
            "Unstable fragments can cause 'fate-tangles' — paradox zones where events occur out of order",
            "The Matriarchy believes fragments are literal crystallized destiny — using them changes the future"
          ]
        }
      ],
      lore_notes: [
        "Every Thornweft fragment hums with a faint vibration — a captured moment of probability still resonating",
        "Using too many fragments at once creates 'web-noise' — overlapping fate-threads that blind Thread-Seers",
        "Enemy factions have attempted to reach the Nexus; all became hopelessly lost in the Loom-Caverns, their fate-threads quietly redirected into dead ends",
        "The Nexus expands slightly each century — some Loom-Mothers believe it is slowly weaving itself into reality itself"
      ],
      influence_on_philosophy: [
        "The Nexus proves that fate is physical, tangible, and manipulable — not divine or abstract",
        "The difficulty of harvesting reinforces the Thornweft value of patience and precision",
        "Fragments are sacred infrastructure — wasting their power is structural sabotage against the Great Web"
      ],
      keywords: ["Gossamer Nexus", "Fate Fragments", "Causality Crystals", "Thread-Heart", "Silk Solstice"]
    },

    historical_background: {
      origins: "The Thornweft Matriarchy began 1,200 years ago when a nomadic weaver named Thessara discovered the Gossamer Nexus deep within the Loom-Caverns. Bitten by the first Loom-Spider, she survived and emerged able to see the threads of fate. She taught her daughters to weave not just cloth, but destiny. Within three generations, the Thessaran Weavers had become the Thornweft Matriarchy — a civilization that didn't conquer territory so much as absorb it into their ever-expanding web.",
      rise_to_power: "The Matriarchy expanded through patience, not war. They wove trade routes, spy networks, and alliances, each thread connecting more territory to the Great Web. By the time rival factions realized they were surrounded, the web was already complete. Four kingdoms were peacefully absorbed when their rulers woke to find that all roads, all trade, and all communication had been rerouted through Thornweft-controlled silk-roads. The Matriarchy didn't invade — they simply became the infrastructure.",
      major_conflicts: [
        {
          name: "The Burning of the First Web",
          description: "600 years ago, the Emberclaw Warpack launched a devastating aerial assault on the Loom-Caverns, burning 40% of the Great Web. The Matriarchy nearly collapsed. The Weave-Queen of that era sacrificed herself to re-spin the core threads, dying as the new web stabilized. This event created the Thornweft's deep hatred of fire and their obsessive need to rebuild and expand."
        },
        {
          name: "The Iron Entanglement",
          description: "300 years ago, the Iron Dominion attempted to analyze and replicate silk-technology. The resulting 'clockwork web' created a fate-paradox that nearly unraveled reality in a 50-mile radius. The Matriarchy intervened, sealing the paradox in a cocoon of fate-silk that still hangs in the Nexus, vibrating with trapped impossibility."
        },
        {
          name: "The Nightfang Infiltration",
          description: "100 years ago, Nightfang Dominion plague-spies attempted to corrupt the Web by introducing Scarlet Blight into Web-Anchor silk. The resulting 'Blighted Web' created thrall-spiders that tried to devour the network from within. The Matriarchy purged the infection through controlled web-burning — the first time they willingly used fire — and developed venom-immunity protocols that persist today."
        }
      ]
    },

    culture_philosophy: {
      overview: "Thornweft culture is inseparable from the Web. Art is weaving. Music is vibration patterns in silk. Architecture is web-construction. History is recorded in thread-patterns that can be read by the sensitive. The Matriarchy doesn't have a culture alongside the Web — the Web IS their culture.",
      three_pillars_expanded: [
        { pillar: "The Loom", focus: "Creation through patience — the greatest works are woven one thread at a time" },
        { pillar: "The Web", focus: "Connection through structure — isolation is death, integration is strength" },
        { pillar: "The Fang", focus: "Precision through silence — the spider strikes once, and once is enough" }
      ],
      cultural_practices: [
        "The Threading: At age 10, initiates are placed in a cocoon with a Spiderling. Over 72 hours, the spider bonds with their nervous system through silk-nerve filaments. 1 in 5 do not survive.",
        "The Silk Festival: Annual celebration where communities compete to weave the most beautiful and structurally sound web-structures. Winners earn the right to mate with the Weave-Queen's lineage.",
        "Vibration-Song: Loom-Mothers play the Web itself as an instrument, plucking threads to create subsonic harmonics that soothe or agitate. War-songs can be felt in the bones.",
        "Cocoon Burial: The dead are wrapped in silk and suspended in the Great Web, their last fate-threads preserved for future reading. To be buried in earth is the worst possible dishonor."
      ],
      symbols: [
        "The Infinite Web (concentric silk rings with no center) — the Matriarchy's authority has no single point of failure",
        "The Eight-Fold Eye (eight overlapping circles) — representing complete awareness",
        "The Silk Road (a thread connecting two distant points) — trade, communication, and the inevitability of connection",
        "The Cocoon (a wrapped form, empty inside) — transformation through patience"
      ]
    },

    military_traditions: {
      battlefield_philosophy: [
        "The web is the weapon; the warriors are merely its venom",
        "Fight on your web or do not fight at all",
        "The enemy who enters the web is already dead — they simply haven't stopped moving",
        "Patience kills more surely than poison"
      ],
      rites_of_warfare: [
        "Before battle, Loom-Mothers read the fate-threads and declare whether the web can support engagement. If not, the army retreats without shame.",
        "The First Anchor: every battle begins with the ceremonial placement of the first Web-Anchor. This is done by the highest-ranking Thread-Seer present.",
        "The Silencing: when the web is complete and the enemy is trapped, all Thornweft warriors go silent. The only sound is the vibration of the Web tightening.",
        "The Harvest: after battle, enemy dead are cocooned and their equipment is dissolved in silk-acid. Nothing is left for scavengers — the Matriarchy takes everything."
      ],
      unit_naming_conventions: [
        "Spider names: multi-syllabic, sibilant (Thessara, Skithari, Silkness, Vethiss)",
        "Warrior titles: function-based (Thread-Warden, Silk-Marshal, Web-Spinner, Venom-Dancer)",
        "Companies named after web-structures (The Spiral Company, The Radial Guard, The Anchor Cohort)",
        "Assassins are simply called 'Thread-Cutters' — their names are severed from the record"
      ]
    },

    geography_strongholds: {
      overview: "The Thornweft Matriarchy occupies the Gossamer Depths — a vast canyon system choked with spider-silk. Bridges, towers, and entire cities hang suspended between cliff walls, connected by the Great Web. The sky is veiled by layers of silk, creating a perpetual twilight.",
      sacred_sites: [
        { name: "The Loom-Caverns", description: "The deepest caves, where the Gossamer Nexus pulses with crystallized fate. Only Loom-Mothers may enter. The walls are living silk that responds to thought." },
        { name: "The Weave-Throne", description: "Arachessa's sanctum at the absolute center of the Great Web. The chamber's walls are woven from thousands of fate-threads, each one representing a living soul connected to the Matriarchy." },
        { name: "The Threading Halls", description: "Where initiates undergo the bonding ritual. The halls are lined with cocoons — some empty (successes), some still occupied (failures preserved as warnings)." },
        { name: "The Burning Scar", description: "The charred canyon where the Emberclaw burned 40% of the First Web. Left unrepaired as a memorial and a reminder of the Matriarchy's vulnerability to fire." }
      ],
      battlefield_features: [
        "Web-Terrain: Silk-covered ground that functions as open terrain for Thornweft and impassable for enemies",
        "Anchor Points: Glowing silk-pillars that serve as teleportation nodes for the Web-Network",
        "Gossamer Bridges: Elevated silk walkways that Thornweft units can use for high-ground advantage",
        "Cocoon Clusters: Web-wrapped terrain features that block LoS and can conceal ambush units"
      ]
    },

    unique_phenomena: {
      overview: "The Gossamer Depths are home to strange silk-based phenomena that the Thornweft have learned to exploit as tactical assets.",
      phenomena: [
        {
          name: "Fate-Echoes",
          description: "In areas of high fate-thread density, events sometimes repeat — a sword swing that already happened will happen again a split second later, striking a different target. The Thornweft exploit this to double their effective attacks.",
          gameplay_effect: "Once per turn, a Thornweft unit within 6\" of a Web-Anchor may repeat one attack action for free."
        },
        {
          name: "The Silk Tide",
          description: "Periodically, waves of loose silk billow through the Gossamer Depths, coating everything in adhesive gossamer. Enemies are slowed; Thornweft warriors ride the tide like surfers.",
          gameplay_effect: "At the start of each turn, roll 1d6. On a 5-6, all non-Thornweft units suffer -2 MOV this turn as silk-tide passes through."
        },
        {
          name: "Thread-Collapse",
          description: "When too many fate-threads are manipulated at once, local causality frays. Objects teleport randomly, gravity shifts, and events happen out of temporal order. Terrifying for enemies; merely inconvenient for trained Thread-Seers.",
          gameplay_effect: "If the Thornweft player uses more than 3 fate-manipulation abilities in a single turn, a Thread-Collapse occurs: all units within 12\" of the triggering unit are randomly repositioned within 6\" of their current location."
        }
      ]
    },

    faction_keywords: [
      "Fate-Weaving",
      "Web-Network",
      "Silk Magic",
      "Spider-Bonds",
      "Teleportation",
      "Terrain Control"
    ]
  });

  // ===========================
  // COMMANDERS (10)
  // ===========================

  gameData.commanders.push(
    {
      name: "Loom-Mother Vethiss",
      faction: "thornweft-matriarchy",
      title: "The War-Weaver",
      flavor_text: "Bonded to Skithari, a Queen-Spawn Spider of terrifying intelligence. Vethiss has woven more war-webs than any living commander, and none of them have ever been breached.",
      theme: "Web-architecture commander; network specialist",
      personality: "Calculating, methodical, speaks in metaphors about weaving",
      playstyle: "Web-Anchor deployment, teleportation mastery, terrain control",
      base_stats: { Command: 10, Knowledge: 9, Leadership: 8, Agility: 5, Health: 255 },
      battle_stats: { ATK: 12, DEF: 5, HP: 30, MOV: 6, RNG: 8, MOR: 9 },
      points_cost: 24,
      level_1_deck: {
        command: ["Grand Weaving", "Network Expansion"],
        tech: ["Anchor Deployment", "Web-Surge"],
        fragment: ["Fate-Thread Amplification"],
        tactical: ["Mass Redeployment"]
      },
      skill_tree: {
        level_2: { knowledge: "Efficient Anchoring (+1 Anchor per turn)", chaos: "Chaotic Web (risk: random teleportation)", tactical: "Quick Deploy" },
        level_3: { knowledge: "Perfect Network", chaos: "Unstable Nodes", tactical: "Tactical Teleport" },
        level_4: { knowledge: "Web Mastery", chaos: "Fate-Tangle", tactical: "Strategic Positioning" },
        level_5: { knowledge: "Anchor Supremacy", chaos: "Paradox Web", tactical: "Coordinated Redeployment" },
        level_6: { knowledge: "Perfect Architecture", chaos: "Reality Shear", tactical: "Total Network Control" },
        level_7: { knowledge: "Ancient Patterns", chaos: "Fragment Storm Web", tactical: "Battlefield Domination" },
        level_8: { knowledge: "Strategic Web Mastery", chaos: "Uncontrolled Weaving", tactical: "Network Supremacy" },
        level_9: { knowledge: "Master War-Weaver", chaos: "Apocalyptic Web", tactical: "Perfect Architecture" },
        level_10: { knowledge: "Eternal Loom-Mother", chaos: "Chaos Web Incarnate", tactical: "Grand War-Weaver" }
      },
      evolution_paths: {
        knowledge: {
          name: "Perfect Architect",
          description: "Vethiss builds flawless web-networks that cover the entire battlefield. Teleportation is instant and free for all allies.",
          abilities: ["Instant Network", "Perfect Anchoring", "Web Omnipresence"],
          fragment_interaction: "Fate fragments extend web range to cover the entire board",
          unit_synergy: "All Thornweft units can teleport for free each turn; web terrain is doubled"
        },
        chaos: {
          name: "Reality Weaver",
          description: "Vethiss weaves so aggressively that reality buckles — the battlefield itself becomes a weapon.",
          abilities: ["Reality Tear", "Paradox Nodes", "Chaotic Geography"],
          fragment_interaction: "Fragments cause terrain to shift randomly — devastating but unpredictable",
          unit_synergy: "All terrain within the web shifts each turn; enemy positioning is randomized"
        },
        hybrid: {
          name: "Tactical Web-Commander",
          description: "Balanced network control with selective reality manipulation",
          abilities: ["Adaptive Web", "Selective Teleportation", "Controlled Terrain Shift"],
          fragment_interaction: "Can choose between stable network extension or chaotic terrain disruption",
          unit_synergy: "Allies teleport freely; selected terrain features shift to advantage"
        }
      },
      signature_units: ["Skithari (Queen-Spawn Spider)", "Web-Architecture Corps", "Anchor Guard"],
      strategic_notes: "Vethiss is THE web-network commander. Build your entire strategy around her Anchors and teleportation. She's fragile in combat but devastating in positioning. Get 4+ Anchors operational by turn 3 and the game is yours. Her weakness is fire — any opponent who burns web terrain cripples her entire strategy. Bring fireproofing support.",
      tags: ["Architect", "Teleportation", "Terrain Control", "Network"]
    },

    {
      name: "Thread-Seer Kythara",
      faction: "thornweft-matriarchy",
      title: "The Fate-Ripper",
      flavor_text: "Kythara doesn't read fate — she tears it apart and reassembles it to her liking. Other Thread-Seers consider her brilliant, reckless, and terrifying in equal measure.",
      theme: "Aggressive fate-manipulation; dice control specialist",
      personality: "Intense, impatient, contemptuous of caution",
      playstyle: "Fate-thread manipulation, forced rerolls, probability warfare",
      base_stats: { Command: 8, Knowledge: 10, Leadership: 6, Agility: 7, Health: 225 },
      battle_stats: { ATK: 15, DEF: 3, HP: 24, MOV: 7, RNG: 12, MOR: 8 },
      points_cost: 22,
      level_1_deck: {
        command: ["Fate Shatter", "Thread Manipulation"],
        tech: ["Probability Storm", "Reroll Cascade"],
        fragment: ["Causality Shards"],
        tactical: ["Fate Strike"]
      },
      skill_tree: {
        level_2: { knowledge: "Precise Manipulation (+1 reroll)", chaos: "Wild Fate (risk: random rerolls for all)", tactical: "Targeted Thread-Pull" },
        level_3: { knowledge: "Perfect Control", chaos: "Fate Storm", tactical: "Probability Targeting" },
        level_4: { knowledge: "Thread Mastery", chaos: "Causality Collapse", tactical: "Strategic Manipulation" },
        level_5: { knowledge: "Fate Command", chaos: "Paradox Strike", tactical: "Coordinated Rerolls" },
        level_6: { knowledge: "Perfect Probability", chaos: "Reality Break", tactical: "Total Fate Control" },
        level_7: { knowledge: "Ancient Threads", chaos: "Fragment Paradox", tactical: "Battlefield Probability" },
        level_8: { knowledge: "Strategic Fate Control", chaos: "Uncontrolled Destiny", tactical: "Probability Supremacy" },
        level_9: { knowledge: "Master Thread-Seer", chaos: "Apocalyptic Fate", tactical: "Perfect Probability" },
        level_10: { knowledge: "Eternal Fate-Ripper", chaos: "Chaos Fate Incarnate", tactical: "Grand Thread-Seer" }
      },
      evolution_paths: {
        knowledge: {
          name: "Fate Architect",
          description: "Kythara controls probability with surgical precision. Every dice roll bends to her will.",
          abilities: ["Perfect Probability", "Guaranteed Outcomes", "Thread Authority"],
          fragment_interaction: "Fate fragments grant automatic successes instead of rerolls",
          unit_synergy: "All friendly units within 12\" reroll all failed attacks; enemy units reroll all successes"
        },
        chaos: {
          name: "Causality Storm",
          description: "Kythara tears fate apart so violently that probability ceases to function normally for everyone.",
          abilities: ["Random Outcomes", "Paradox Field", "Fate Annihilation"],
          fragment_interaction: "All dice in range become random — even enemy dice-modifiers stop working",
          unit_synergy: "All rolls within 18\" are randomized — helps if you're losing, hurts if you're winning"
        },
        hybrid: {
          name: "Tactical Fate-Weaver",
          description: "Selective probability control with aggressive thread-pulling",
          abilities: ["Adaptive Fate", "Selective Rerolls", "Controlled Chaos"],
          fragment_interaction: "Choose per roll whether to stabilize or randomize",
          unit_synergy: "Allies gain 1 reroll per turn; enemies lose 1 reroll per turn"
        }
      },
      signature_units: ["Fate-Ripper Guard", "Probability Dancers", "Thread-Seer Initiates"],
      strategic_notes: "Kythara is the most frustrating commander in the game to play against. Her forced rerolls can neutralize enemy critical hits and clutch saves. She's a scalpel, not a hammer — use her to surgically deny key enemy rolls while enabling your own. Very fragile; keep her behind bodyguards. Her Chaos path is a coin-flip equalizer — great when you're the underdog, terrible when you're winning.",
      tags: ["Fate", "Dice Control", "Probability", "Denial"]
    },

    {
      name: "Silk-Marshal Draven",
      faction: "thornweft-matriarchy",
      title: "The Venom King",
      flavor_text: "The highest-ranking male in the Matriarchy's military history. Draven earned his title by developing seventeen new combat venoms, each more exquisitely painful than the last.",
      theme: "Poison/attrition specialist; venom warfare",
      personality: "Quiet, precise, clinically interested in suffering",
      playstyle: "Venom token stacking, DoT warfare, attrition",
      base_stats: { Command: 7, Knowledge: 9, Leadership: 7, Agility: 8, Health: 240 },
      battle_stats: { ATK: 15, DEF: 4, HP: 27, MOV: 7, RNG: 8, MOR: 8 },
      points_cost: 20,
      level_1_deck: {
        command: ["Venom Cascade", "Toxic Offensive"],
        tech: ["Poison Engineering", "Venom Refinement"],
        fragment: ["Toxin Amplification"],
        tactical: ["Debilitating Strike"]
      },
      skill_tree: {
        level_2: { knowledge: "Precision Venom (+1 venom token)", chaos: "Wild Toxin (risk: random venom effects)", tactical: "Targeted Poisoning" },
        level_3: { knowledge: "Perfect Toxicology", chaos: "Unstable Venoms", tactical: "Venom Tactics" },
        level_4: { knowledge: "Venom Mastery", chaos: "Mutation Toxin", tactical: "Strategic Poisoning" },
        level_5: { knowledge: "Master Toxicologist", chaos: "Plague Venom", tactical: "Coordinated Toxin Warfare" },
        level_6: { knowledge: "Perfect Attrition", chaos: "Chaos Venom", tactical: "Total Debilitation" },
        level_7: { knowledge: "Ancient Poisons", chaos: "Fragment Toxin", tactical: "Battlefield Poisoning" },
        level_8: { knowledge: "Strategic Venom Control", chaos: "Uncontrolled Plague", tactical: "Toxin Supremacy" },
        level_9: { knowledge: "Master Venom King", chaos: "Apocalyptic Toxin", tactical: "Perfect Attrition" },
        level_10: { knowledge: "Eternal Toxicologist", chaos: "Chaos Venom Incarnate", tactical: "Grand Poison Master" }
      },
      evolution_paths: {
        knowledge: {
          name: "Master Toxicologist",
          description: "Draven's venoms are perfectly calibrated — each dose does exactly what's needed.",
          abilities: ["Precision Toxins", "Selective Debilitation", "Perfect Dosage"],
          fragment_interaction: "Venom fragments apply 3 tokens instead of 1; no friendly-fire risk",
          unit_synergy: "All venom-coated weapons apply +1 token; venom tokens degrade 2 stats instead of 1"
        },
        chaos: {
          name: "Plague Weaver",
          description: "Draven's venoms mutate and spread uncontrollably, infecting entire armies.",
          abilities: ["Spreading Plague", "Mutating Toxins", "Venom Storm"],
          fragment_interaction: "Venom becomes contagious — spreads from target to adjacent units each turn",
          unit_synergy: "All venom spreads to adjacent enemies but also has 20% chance to infect nearby allies"
        },
        hybrid: {
          name: "Tactical Poisoner",
          description: "Controlled venom deployment with selective contagion",
          abilities: ["Adaptive Toxins", "Selective Contagion", "Strategic Debilitation"],
          fragment_interaction: "Can choose between precision single-target venom or spreading AoE toxin",
          unit_synergy: "Venom units gain +1 ATK; venom tokens last 1 extra turn"
        }
      },
      signature_units: ["Venom Dancers", "Toxin Specialists", "Plague-Silk Weavers"],
      strategic_notes: "Draven wins through attrition — keep stacking venom tokens and watch the enemy army crumble. He's not a burst-damage commander; plan for turns 4-6 when accumulated poison has degraded enemy stats to nothing. Weak against armies with cleanse or heal mechanics. His Chaos path is devastating but risky — spreading venom can backfire if your own units are too close.",
      tags: ["Poison", "Attrition", "Debuff", "DoT"]
    },

    {
      name: "Thread-Cutter Nyx",
      faction: "thornweft-matriarchy",
      title: "She Who Severs",
      flavor_text: "No one knows what Nyx looks like. Her spider-bond is with an invisible Loom-Spider that wraps her in light-bending silk. She kills by severing fate-threads — her victims simply cease to have ever existed.",
      theme: "Assassin commander; stealth and instant-kill specialist",
      personality: "Silent, efficient, possibly inhuman",
      playstyle: "Stealth deployment, assassination, commander-hunting",
      base_stats: { Command: 6, Knowledge: 8, Leadership: 5, Agility: 10, Health: 195 },
      battle_stats: { ATK: 21, DEF: 2, HP: 18, MOV: 9, RNG: 4, MOR: 9 },
      points_cost: 19,
      level_1_deck: {
        command: ["Thread Severance", "Silent Approach"],
        tech: ["Invisibility Silk", "Fate Assassination"],
        fragment: ["Void Thread"],
        tactical: ["Precision Kill"]
      },
      skill_tree: {
        level_2: { knowledge: "Silent Movement (+2 stealth)", chaos: "Wild Severance (risk: cut wrong thread)", tactical: "Targeted Kill" },
        level_3: { knowledge: "Perfect Stealth", chaos: "Chaotic Erasure", tactical: "Assassination Mastery" },
        level_4: { knowledge: "Thread Mastery", chaos: "Fate Annihilation", tactical: "Strategic Assassination" },
        level_5: { knowledge: "Master Assassin", chaos: "Existence Erasure", tactical: "Coordinated Kills" },
        level_6: { knowledge: "Perfect Invisibility", chaos: "Chaos Severance", tactical: "Total Stealth" },
        level_7: { knowledge: "Ancient Shadow Arts", chaos: "Fragment Annihilation", tactical: "Battlefield Assassination" },
        level_8: { knowledge: "Strategic Elimination", chaos: "Uncontrolled Erasure", tactical: "Stealth Supremacy" },
        level_9: { knowledge: "Master Thread-Cutter", chaos: "Apocalyptic Severance", tactical: "Perfect Kill" },
        level_10: { knowledge: "Eternal Shadow", chaos: "Chaos Erasure Incarnate", tactical: "Grand Assassin" }
      },
      evolution_paths: {
        knowledge: {
          name: "Perfect Assassin",
          description: "Nyx strikes with absolute precision — one cut, one kill, no trace.",
          abilities: ["Guaranteed Kill", "Perfect Stealth", "Thread Mastery"],
          fragment_interaction: "Void fragments make her undetectable permanently; kills leave no evidence",
          unit_synergy: "All assassin units gain permanent stealth and +2 ATK on first strike"
        },
        chaos: {
          name: "Existential Annihilator",
          description: "Nyx cuts so many threads that reality frays around her — people forget their own names in her presence.",
          abilities: ["Mass Existence Erosion", "Reality Fray Aura", "Chaotic Severance"],
          fragment_interaction: "Fragments cause nearby enemies to forget abilities, stats, and even their own faction bonuses",
          unit_synergy: "All enemies within 12\" lose 1 random ability per turn; allies within 6\" risk losing abilities too"
        },
        hybrid: {
          name: "Tactical Shadow",
          description: "Selective assassination with controlled stealth",
          abilities: ["Adaptive Stealth", "Selective Thread-Cutting", "Strategic Elimination"],
          fragment_interaction: "Can choose to kill silently or dramatically (silent = no detection; dramatic = AoE morale damage)",
          unit_synergy: "Assassin units can choose targets freely; gain +1 ATK per turn they remain hidden"
        }
      },
      signature_units: ["Shadow-Silk Assassins", "Invisible Spider-Scouts", "Thread-Cutter Acolytes"],
      strategic_notes: "Nyx is a scalpel — she kills commanders and key units with surgical precision. Deploy her behind enemy lines via the web-network and pick off isolated targets. She dies instantly in a fair fight (2 DEF, 6 HP), so never let her be caught. Best in games where eliminating the enemy commander is a win condition. Her Chaos path is devastating but friendly-fire prone.",
      tags: ["Assassin", "Stealth", "Commander-Hunter", "Glass Cannon"]
    },

    {
      name: "Brood-Warden Thessari",
      faction: "thornweft-matriarchy",
      title: "Mother of Ten Thousand",
      flavor_text: "Thessari is bonded to a brood-mother spider that lays eggs in the heat of battle. Her armies grow while the enemy watches in horror as spiderlings boil from cocoons mid-combat.",
      theme: "Swarm/summoner commander; spider spawning",
      personality: "Nurturing, patient, disturbingly affectionate toward her spiders",
      playstyle: "Spawn spider-swarms mid-battle, overwhelm with numbers",
      base_stats: { Command: 7, Knowledge: 8, Leadership: 9, Agility: 5, Health: 270 },
      battle_stats: { ATK: 9, DEF: 5, HP: 30, MOV: 5, RNG: 4, MOR: 9 },
      points_cost: 21,
      level_1_deck: {
        command: ["Brood Surge", "Hatching Swarm"],
        tech: ["Accelerated Spawning", "Nest Protection"],
        fragment: ["Growth Silk"],
        tactical: ["Overwhelm"]
      },
      skill_tree: {
        level_2: { knowledge: "Efficient Hatching (+1 spiderling)", chaos: "Uncontrolled Breeding (risk: random mutations)", tactical: "Quick Spawn" },
        level_3: { knowledge: "Perfect Brood", chaos: "Mutant Swarm", tactical: "Swarm Tactics" },
        level_4: { knowledge: "Accelerated Growth", chaos: "Chaos Spawning", tactical: "Strategic Numbers" },
        level_5: { knowledge: "Brood Mastery", chaos: "Unstable Mutations", tactical: "Coordinated Swarm" },
        level_6: { knowledge: "Perfect Generation", chaos: "Fragment Mutation", tactical: "Total Swarm" },
        level_7: { knowledge: "Ancient Breeding", chaos: "Chaos Hatchery", tactical: "Battlefield Spawning" },
        level_8: { knowledge: "Strategic Population", chaos: "Uncontrolled Evolution", tactical: "Swarm Supremacy" },
        level_9: { knowledge: "Master Brood-Warden", chaos: "Apocalyptic Swarm", tactical: "Perfect Numbers" },
        level_10: { knowledge: "Eternal Brood-Mother", chaos: "Chaos Breeding Incarnate", tactical: "Grand Swarm Commander" }
      },
      evolution_paths: {
        knowledge: {
          name: "Mother Superior",
          description: "Thessari breeds spiders with perfect efficiency — reliable, numerous, and well-coordinated.",
          abilities: ["Controlled Hatching", "Selective Breeding", "Perfect Swarms"],
          fragment_interaction: "Growth fragments mature spiderlings instantly to combat-ready",
          unit_synergy: "Spawn 2 Spiderling Swarms for free each turn; they grow faster than normal"
        },
        chaos: {
          name: "Mutation Mother",
          description: "Thessari's brood mutates unpredictably — some are useless, some are monstrous nightmares.",
          abilities: ["Random Mutations", "Explosive Hatching", "Chaos Evolution"],
          fragment_interaction: "Spawned spiders have randomized stats ±3 and random special abilities",
          unit_synergy: "Each spawn roll could produce anything from useless runts to monstrous war-spiders"
        },
        hybrid: {
          name: "Tactical Breeder",
          description: "Controlled spawning with selective specialization",
          abilities: ["Adaptive Breeding", "Selective Spawning", "Strategic Swarms"],
          fragment_interaction: "Choose spider-type to spawn based on battlefield needs (combat, web, venom, speed)",
          unit_synergy: "Spawn 1d3 spiders per turn; can pay extra to spawn larger varieties"
        }
      },
      signature_units: ["Brood-Mother Spider (unique)", "Spiderling Swarms", "Cocoon Guard"],
      strategic_notes: "Thessari plays the long game. Survive the early turns, spawn relentlessly, and drown the enemy in bodies and silk. She's vulnerable to early rushes before the swarm builds. Protect her for turns 1-3, then unleash the tide. Her Knowledge path is reliable; Chaos path is wildly entertaining but inconsistent.",
      tags: ["Summoner", "Swarm", "Spider Spawning", "Late Game"]
    },

    {
      name: "Silk-Warden Morthis",
      faction: "thornweft-matriarchy",
      title: "The Living Trap",
      flavor_text: "Morthis doesn't fight — he builds the battlefield into a killing floor. Enemies walk into his webs and never walk out. His patience is legendary; he once waited nine hours for a single enemy commander to step on the right square.",
      theme: "Trap/defensive specialist; terrain denial",
      personality: "Obsessively patient, meticulous, enjoys the moment of realization in his prey's eyes",
      playstyle: "Gossamer Trap deployment, area denial, defensive web-building",
      base_stats: { Command: 8, Knowledge: 9, Leadership: 7, Agility: 4, Health: 285 },
      battle_stats: { ATK: 9, DEF: 6, HP: 33, MOV: 4, RNG: 6, MOR: 9 },
      points_cost: 20,
      level_1_deck: {
        command: ["Grand Trap", "Web Fortress"],
        tech: ["Gossamer Engineering", "Trap Refinement"],
        fragment: ["Silk Reinforcement"],
        tactical: ["Ambush Architecture"]
      },
      skill_tree: {
        level_2: { knowledge: "Efficient Trapping (+1 trap per turn)", chaos: "Chaotic Traps (risk: random trap effects)", tactical: "Quick Trap" },
        level_3: { knowledge: "Perfect Trapping", chaos: "Wild Webbing", tactical: "Trap Mastery" },
        level_4: { knowledge: "Web Fortress", chaos: "Chaos Architecture", tactical: "Strategic Denial" },
        level_5: { knowledge: "Master Trapper", chaos: "Unstable Constructs", tactical: "Coordinated Ambush" },
        level_6: { knowledge: "Perfect Denial", chaos: "Reality Traps", tactical: "Total Lockdown" },
        level_7: { knowledge: "Ancient Designs", chaos: "Fragment Traps", tactical: "Battlefield Prison" },
        level_8: { knowledge: "Strategic Fortification", chaos: "Uncontrolled Trapping", tactical: "Trap Supremacy" },
        level_9: { knowledge: "Master Silk-Warden", chaos: "Apocalyptic Trapping", tactical: "Perfect Lockdown" },
        level_10: { knowledge: "Eternal Fortress", chaos: "Chaos Trap Incarnate", tactical: "Grand Warden" }
      },
      evolution_paths: {
        knowledge: {
          name: "Perfect Fortress",
          description: "Morthis builds web-fortresses that are literally impregnable.",
          abilities: ["Indestructible Web", "Perfect Trap Placement", "Absolute Denial"],
          fragment_interaction: "Silk fragments create permanent terrain features that cannot be destroyed",
          unit_synergy: "All defensive units gain +2 DEF within web terrain; traps deal +2 damage"
        },
        chaos: {
          name: "Reality Prison",
          description: "Morthis's traps don't just catch bodies — they trap minds, time, and space.",
          abilities: ["Temporal Traps", "Spatial Locks", "Mind Snares"],
          fragment_interaction: "Traps have random additional effects: time-freeze, spatial displacement, memory erasure",
          unit_synergy: "Trapped enemies suffer random debilitating effects each turn they remain caught"
        },
        hybrid: {
          name: "Tactical Warden",
          description: "Controlled trap deployment with selective effects",
          abilities: ["Adaptive Trapping", "Selective Denial", "Strategic Fortress"],
          fragment_interaction: "Choose trap type per placement: immobilize, damage, debuff, or conceal",
          unit_synergy: "Traps can be triggered remotely; allies pass through them unharmed"
        }
      },
      signature_units: ["Trap-Spinner Engineers", "Gossamer Guard", "Ambush Spiders"],
      strategic_notes: "Morthis turns the battlefield into a no-go zone for enemies. Deploy traps in chokepoints and around objectives. He's terrible on offense — 3 ATK and 4 MOV means he's going nowhere fast. Build defensively around objectives and let the enemy come to you. His Knowledge path creates an unbreakable castle; his Chaos path creates a nightmare maze.",
      tags: ["Trapper", "Defensive", "Terrain Denial", "Fortress"]
    },

    {
      name: "Loom-Mother Silivex",
      faction: "thornweft-matriarchy",
      title: "The Whispering Weave",
      flavor_text: "Silivex oversees the Domain of Shadow within the Loom Council. Her spiders are invisible, her warriors are silent, and her web is woven from stolen secrets.",
      theme: "Espionage and psychological warfare commander",
      personality: "Secretive, manipulative, finds truth in lies",
      playstyle: "Information warfare, morale attacks, hidden deployment",
      base_stats: { Command: 9, Knowledge: 10, Leadership: 8, Agility: 7, Health: 210 },
      battle_stats: { ATK: 9, DEF: 3, HP: 24, MOV: 7, RNG: 12, MOR: 9 },
      points_cost: 22,
      level_1_deck: {
        command: ["Whisper Web", "Secrets Stolen"],
        tech: ["Shadow Weaving", "Morale Collapse"],
        fragment: ["Fear Silk"],
        tactical: ["Psychological Strike"]
      },
      skill_tree: {
        level_2: { knowledge: "Deep Intel (+1 secret revealed)", chaos: "Paranoia Web (risk: allies affected too)", tactical: "Targeted Demoralization" },
        level_3: { knowledge: "Perfect Espionage", chaos: "Mass Hysteria", tactical: "Morale Warfare" },
        level_4: { knowledge: "Secret Mastery", chaos: "Chaotic Whispers", tactical: "Strategic Dread" },
        level_5: { knowledge: "Information Dominance", chaos: "Madness Aura", tactical: "Coordinated Fear" },
        level_6: { knowledge: "Perfect Manipulation", chaos: "Chaos Whispers", tactical: "Total Psychological Control" },
        level_7: { knowledge: "Ancient Secrets", chaos: "Fragment Madness", tactical: "Battlefield Demoralization" },
        level_8: { knowledge: "Strategic Espionage", chaos: "Uncontrolled Terror", tactical: "Morale Supremacy" },
        level_9: { knowledge: "Master Whisperer", chaos: "Apocalyptic Fear", tactical: "Perfect Dread" },
        level_10: { knowledge: "Eternal Shadow Weaver", chaos: "Chaos Fear Incarnate", tactical: "Grand Manipulator" }
      },
      evolution_paths: {
        knowledge: {
          name: "Shadow Architect",
          description: "Silivex knows everything — every enemy plan, every hidden unit, every secret.",
          abilities: ["Total Intelligence", "Perfect Espionage", "Revealed Plans"],
          fragment_interaction: "Fear fragments reveal all enemy cards, deployment, and planned actions",
          unit_synergy: "All allies gain +1 to hit (perfect intel); enemy deployment is fully revealed pre-game"
        },
        chaos: {
          name: "Terror Incarnate",
          description: "Silivex weaponizes fear so completely that enemies forget why they're fighting.",
          abilities: ["Mass Terror", "Existential Dread Aura", "Panic Cascade"],
          fragment_interaction: "Fear fragments cause chain-routing — one broken unit breaks adjacent units",
          unit_synergy: "Enemy units within 18\" suffer -2 MOR; breaking one unit triggers morale checks in all nearby"
        },
        hybrid: {
          name: "Tactical Whisperer",
          description: "Balanced intelligence gathering with selective fear deployment",
          abilities: ["Adaptive Espionage", "Selective Terror", "Strategic Manipulation"],
          fragment_interaction: "Choose between intel gathering or fear projection per fragment",
          unit_synergy: "Allies gain +1 to hit; enemies within 12\" suffer -1 MOR"
        }
      },
      signature_units: ["Shadow-Silk Operatives", "Whisper Spiders", "Fear-Weavers"],
      strategic_notes: "Silivex wins games without fighting them. Her morale warfare can break enemy armies from across the board. Pair her with units that benefit from routing enemies — if the enemy flees, you don't need ATK. Her weakness is low personal combat ability; she's a puppeteer, not a warrior. Best against high-morale factions where breaking MOR is a meaningful victory.",
      tags: ["Espionage", "Morale Warfare", "Psychology", "Intel"]
    },

    {
      name: "Spindle-Knight Varek",
      faction: "thornweft-matriarchy",
      title: "The Silk Bulwark",
      flavor_text: "Varek defied tradition by becoming the first male Thornweft to bond with a Matriarch-stage spider. His chitin-plate armor and silk-woven tower shield make him the Matriarchy's most durable frontline commander.",
      theme: "Tank/bodyguard commander; defensive melee",
      personality: "Stubborn, honorable, quietly rebellious against gender norms",
      playstyle: "Defensive melee, bodyguard mechanics, damage absorption",
      base_stats: { Command: 7, Knowledge: 5, Leadership: 9, Agility: 4, Health: 360 },
      battle_stats: { ATK: 15, DEF: 7, HP: 42, MOV: 5, RNG: 1, MOR: 10 },
      points_cost: 23,
      level_1_deck: {
        command: ["Silk Shield Wall", "Stand Your Ground"],
        tech: ["Chitin Reinforcement", "Bodyguard Protocol"],
        fragment: ["Silk Armor"],
        tactical: ["Immovable Defense"]
      },
      skill_tree: {
        level_2: { knowledge: "Perfect Defense (+1 DEF)", chaos: "Reckless Guard (risk: damage allies to protect)", tactical: "Tactical Shield" },
        level_3: { knowledge: "Silk Fortress", chaos: "Wild Defense", tactical: "Shield Mastery" },
        level_4: { knowledge: "Perfect Bodyguard", chaos: "Chaos Armor", tactical: "Strategic Defense" },
        level_5: { knowledge: "Master Guardian", chaos: "Unstable Shielding", tactical: "Coordinated Defense" },
        level_6: { knowledge: "Perfect Protection", chaos: "Fragment Shield", tactical: "Total Defense" },
        level_7: { knowledge: "Ancient Techniques", chaos: "Chaos Bulwark", tactical: "Battlefield Shielding" },
        level_8: { knowledge: "Strategic Guarding", chaos: "Uncontrolled Defense", tactical: "Defense Supremacy" },
        level_9: { knowledge: "Master Silk Bulwark", chaos: "Apocalyptic Shield", tactical: "Perfect Guardian" },
        level_10: { knowledge: "Eternal Shield", chaos: "Chaos Defense Incarnate", tactical: "Grand Bulwark" }
      },
      evolution_paths: {
        knowledge: {
          name: "Perfect Guardian",
          description: "Varek becomes an immovable fortress that protects everything around him.",
          abilities: ["Absolute Defense", "Shield Aura", "Damage Redirect"],
          fragment_interaction: "Silk fragments grant regenerating armor; he never stays damaged",
          unit_synergy: "All units within 6\" gain +2 DEF; Varek can absorb hits meant for adjacent allies"
        },
        chaos: {
          name: "Living Fortress",
          description: "Varek's armor grows wild, becoming a walking fortress of chitin and silk that crushes anything nearby.",
          abilities: ["Crushing Armor", "Expanding Fortress", "Reactive Chitin"],
          fragment_interaction: "Fragments cause his armor to grow outward, dealing damage to adjacent enemies",
          unit_synergy: "Varek occupies a larger area each turn; enemies in his space take automatic damage"
        },
        hybrid: {
          name: "Tactical Bulwark",
          description: "Balanced defense with selective protection",
          abilities: ["Adaptive Shield", "Selective Protection", "Strategic Tankiness"],
          fragment_interaction: "Choose between healing self or buffing allies per fragment",
          unit_synergy: "Allies within 6\" gain +1 DEF; Varek gains +1 ATK per ally he's protecting"
        }
      },
      signature_units: ["Silk Shield Guard", "Chitin-Plate Infantry", "Bulwark Spiders"],
      strategic_notes: "Varek is your anvil. Put him on an objective and dare the enemy to take it. 7 DEF, 14 HP, and bodyguard mechanics make him incredibly hard to remove. He's slow and offensively weak, so pair him with mobile striking units that use him as a rally point. Best in objective-based games where holding ground wins.",
      tags: ["Tank", "Bodyguard", "Defensive", "Objective Holder"]
    },

    {
      name: "Web-Walker Ithris",
      faction: "thornweft-matriarchy",
      title: "The Between-Step",
      flavor_text: "Ithris exists in two places simultaneously — physically present and web-phased. She walks between the strands of reality, appearing and disappearing mid-stride. Her enemies can never be sure which version of her is real.",
      theme: "Phase/teleportation specialist; reality-slipping",
      personality: "Dreamy, disoriented, speaks as if addressing people who aren't there (they might be)",
      playstyle: "Instant teleportation, phase-shifting, spatial manipulation",
      base_stats: { Command: 7, Knowledge: 8, Leadership: 6, Agility: 10, Health: 210 },
      battle_stats: { ATK: 15, DEF: 2, HP: 21, MOV: 16, RNG: 6, MOR: 8 },
      points_cost: 20,
      level_1_deck: {
        command: ["Phase Walk", "Between-Step"],
        tech: ["Reality Slip", "Spatial Manipulation"],
        fragment: ["Phase Silk"],
        tactical: ["Teleport Strike"]
      },
      skill_tree: {
        level_2: { knowledge: "Controlled Phase (+2 teleport range)", chaos: "Wild Phase (risk: random destination)", tactical: "Precision Teleport" },
        level_3: { knowledge: "Perfect Phasing", chaos: "Unstable Shifting", tactical: "Tactical Blink" },
        level_4: { knowledge: "Phase Mastery", chaos: "Chaos Displacement", tactical: "Strategic Teleportation" },
        level_5: { knowledge: "Master Walker", chaos: "Reality Fracture", tactical: "Coordinated Phase" },
        level_6: { knowledge: "Perfect Displacement", chaos: "Fragment Phase", tactical: "Total Mobility" },
        level_7: { knowledge: "Ancient Walking", chaos: "Chaos Phasing", tactical: "Battlefield Displacement" },
        level_8: { knowledge: "Strategic Phasing", chaos: "Uncontrolled Displacement", tactical: "Phase Supremacy" },
        level_9: { knowledge: "Master Web-Walker", chaos: "Apocalyptic Phase", tactical: "Perfect Displacement" },
        level_10: { knowledge: "Eternal Between-Step", chaos: "Chaos Phase Incarnate", tactical: "Grand Walker" }
      },
      evolution_paths: {
        knowledge: {
          name: "Perfect Phase",
          description: "Ithris teleports with absolute precision — anywhere on the board, anytime, with no error or risk.",
          abilities: ["Unlimited Teleport", "Phase Armor (50% miss chance)", "Spatial Awareness"],
          fragment_interaction: "Phase fragments allow her to teleport other units as well as herself",
          unit_synergy: "All units within 6\" can teleport instead of moving normally; no Web-Anchor required"
        },
        chaos: {
          name: "Reality Fracture",
          description: "Ithris phases so violently that space itself cracks around her.",
          abilities: ["Spatial Shattering", "Displacement Field", "Phase Explosion"],
          fragment_interaction: "Every teleport leaves a rift behind — dealing damage to anything near the departure point",
          unit_synergy: "All nearby units (friend and foe) are randomly displaced when she teleports"
        },
        hybrid: {
          name: "Tactical Walker",
          description: "Controlled phasing with selective spatial effects",
          abilities: ["Adaptive Phasing", "Selective Teleport", "Controlled Rifts"],
          fragment_interaction: "Choose between silent teleport or explosive displacement per use",
          unit_synergy: "Allies can teleport once per turn; enemies near departure points take minor damage"
        }
      },
      signature_units: ["Phase-Silk Dancers", "Reality Walkers", "Between-Space Scouts"],
      strategic_notes: "Ithris is the ultimate mobility commander — 16 MOV plus teleportation means she can be anywhere. Use her to grab objectives, escape encirclement, and appear behind enemy lines for devastating strikes. She's extremely fragile (2 DEF, 7 HP), so never let her get caught in a sustained fight. Hit, teleport, hit again from a different angle.",
      tags: ["Teleporter", "Phase", "Mobility", "Hit and Run"]
    },

    {
      name: "Cocoon-Keeper Rathis",
      faction: "thornweft-matriarchy",
      title: "The Harvester",
      flavor_text: "Rathis sees the battlefield as a pantry. Every enemy is future resources — she wraps them in silk, processes them, and feeds the Web. Her efficiency is admired. Her enthusiasm is concerning.",
      theme: "Resource/harvesting commander; recycling enemies",
      personality: "Cheerful, industrial, disturbingly excited about 'processing'",
      playstyle: "Cocoon harvesting, resource generation, economy warfare",
      base_stats: { Command: 7, Knowledge: 8, Leadership: 7, Agility: 6, Health: 255 },
      battle_stats: { ATK: 12, DEF: 4, HP: 27, MOV: 6, RNG: 6, MOR: 8 },
      points_cost: 18,
      level_1_deck: {
        command: ["Mass Harvest", "Resource Surge"],
        tech: ["Efficient Processing", "Cocoon Engineering"],
        fragment: ["Conversion Silk"],
        tactical: ["Economy of Violence"]
      },
      skill_tree: {
        level_2: { knowledge: "Efficient Harvest (+1 resource per kill)", chaos: "Wasteful Processing (risk: excess becomes toxic)", tactical: "Quick Harvest" },
        level_3: { knowledge: "Perfect Processing", chaos: "Chaotic Conversion", tactical: "Harvest Tactics" },
        level_4: { knowledge: "Resource Mastery", chaos: "Unstable Conversion", tactical: "Strategic Economy" },
        level_5: { knowledge: "Master Harvester", chaos: "Chaos Recycling", tactical: "Coordinated Processing" },
        level_6: { knowledge: "Perfect Economy", chaos: "Fragment Conversion", tactical: "Total Harvest" },
        level_7: { knowledge: "Ancient Techniques", chaos: "Chaos Economy", tactical: "Battlefield Harvesting" },
        level_8: { knowledge: "Strategic Processing", chaos: "Uncontrolled Conversion", tactical: "Harvest Supremacy" },
        level_9: { knowledge: "Master Cocoon-Keeper", chaos: "Apocalyptic Harvest", tactical: "Perfect Economy" },
        level_10: { knowledge: "Eternal Harvester", chaos: "Chaos Harvest Incarnate", tactical: "Grand Keeper" }
      },
      evolution_paths: {
        knowledge: {
          name: "Perfect Processor",
          description: "Rathis turns every dead enemy into maximum value — reinforcements, repairs, and buffs.",
          abilities: ["Perfect Conversion", "Zero Waste", "Resource Dominance"],
          fragment_interaction: "Harvested resources can be converted into fragments for immediate use",
          unit_synergy: "Every enemy killed generates 2 resource tokens; tokens heal, buff, or spawn units"
        },
        chaos: {
          name: "Ravenous Recycler",
          description: "Rathis's harvesting becomes frenzied — she cocoons living enemies mid-battle.",
          abilities: ["Live Harvesting", "Cocoon Storm", "Ravenous Processing"],
          fragment_interaction: "Living enemies can be partially cocooned, draining stats into your resource pool in real time",
          unit_synergy: "All melee attacks have a chance to partially cocoon the target, reducing their stats by 1"
        },
        hybrid: {
          name: "Tactical Harvester",
          description: "Controlled resource extraction with selective processing",
          abilities: ["Adaptive Harvesting", "Selective Conversion", "Strategic Recycling"],
          fragment_interaction: "Choose what to convert resources into: reinforcements, fragments, or stat buffs",
          unit_synergy: "Kills generate 1 resource token; can stockpile for bigger effects or spend immediately"
        }
      },
      signature_units: ["Cocoon Processors", "Harvest Spiders", "Resource Guard"],
      strategic_notes: "Rathis is the economy commander — she turns dead enemies into fuel for your army. The more you kill, the more you get. She's mid-range in combat stats, so she can hold her own but isn't a frontline fighter. Build aggressive armies that kill fast and use her harvesting to sustain the assault. Her Chaos path is terrifying — live harvesting drains enemies mid-fight.",
      tags: ["Economy", "Harvesting", "Resource", "Recycling"]
    },

    // COMMANDER 11 — Healer/Buffer Support
    {
      name: "Silk-Mender Yalith",
      faction: "thornweft-matriarchy",
      title: "The Living Suture",
      flavor_text: "Yalith's hands never stop moving — silk threads pour from her fingertips, stitching torn flesh, binding shattered chitin, weaving protective cocoons around the wounded. She walks the battlefield like a surgeon walks an operating theater: calm, deliberate, already planning the next save.",
      theme: "Restoration/support; silk-based healing and protective buffs",
      personality: "Serene, clinical, quietly furious when allies die needlessly",
      playstyle: "Healing, cleansing debuffs, buffing allied defenses. Yalith keeps your army alive through attrition wars. She has low personal combat stats but transforms every unit near her into a durable threat. Pair with tanky infantry and grind the opponent down.",
      base_stats: { Command: 6, Knowledge: 10, Leadership: 8, Agility: 6, Health: 210 },
      battle_stats: { ATK: 9, DEF: 5, HP: 24, MOV: 5, RNG: 4, MOR: 9 },
      points_cost: 18,
      level_1_deck: {
        command: ["Mending Weave", "Silk Shield"],
        tech: ["Restorative Silk", "Cleansing Thread"],
        fragment: ["Life-Weave Resonance"],
        tactical: ["Protective Formation"]
      },
      skill_tree: {
        level_2: { knowledge: "Precision Mending (+1 HP healed)", chaos: "Frenzied Stitching (heal 2 targets, risk pulling thread from one)", tactical: "Triage Protocols" },
        level_3: { knowledge: "Silk Cocoon Shield", chaos: "Parasitic Healing (drain enemy HP to heal ally)", tactical: "Field Hospital Formation" },
        level_4: { knowledge: "Regenerative Web", chaos: "Blood-Silk Transfusion", tactical: "Strategic Restoration" },
        level_5: { knowledge: "Master Surgeon", chaos: "Life-Steal Threads", tactical: "Coordinated Healing" },
        level_6: { knowledge: "Purification Weave", chaos: "Corrupted Regeneration", tactical: "Mobile Aid Station" },
        level_7: { knowledge: "Silk Armor Blessing", chaos: "Unstable Regeneration", tactical: "Defensive Weave Doctrine" },
        level_8: { knowledge: "Perfect Restoration", chaos: "Resurrection Thread (risk: undead puppet)", tactical: "Sustained Operations" },
        level_9: { knowledge: "Grand Mender", chaos: "Necro-Silk Mastery", tactical: "Total Theater Healing" },
        level_10: { knowledge: "Eternal Suture", chaos: "Life-Death Weaver", tactical: "Supreme Restoration" }
      },
      evolution_paths: {
        knowledge: {
          name: "Grand Silk-Mender",
          description: "Yalith's healing silk is perfected — every thread mends exactly what's needed, leaving units stronger than before the wound.",
          abilities: ["Perfect Mending (heal 3 HP per turn to 2 units within 6\")", "Cleanse All (remove all debuffs from friendly units within 8\")", "Silk Fortification (+1 DEF to all friendly units within 6\" permanently when first healed)"],
          fragment_interaction: "Healing fragments affect all units within 8\" instead of single target; +2 HP healed",
          unit_synergy: "All friendly infantry within 8\" regenerate 1 HP per turn; healed units gain +1 MOR"
        },
        chaos: {
          name: "Blood-Silk Revenant",
          description: "Yalith has learned to steal life from enemies to fuel her healing — and to animate the dead with puppet-silk.",
          abilities: ["Life Drain Thread (deal 3 damage to enemy within 8\", heal an ally for that amount)", "Silk Puppet (once per game, reanimate a destroyed friendly unit at half stats)", "Parasitic Cocoon (enemy within 6\" loses 1 HP/turn, allies gain it)"],
          fragment_interaction: "Healing fragments also deal 2 damage to nearest enemy; revived units count as Fragment carriers",
          unit_synergy: "Destroyed friendly units have 25% chance to stand back up at 3 HP; enemy kills within aura heal nearest ally for 2"
        },
        hybrid: {
          name: "Battlefield Surgeon",
          description: "Controlled life-transfer with selective revivification — Yalith saves who matters most.",
          abilities: ["Adaptive Healing (heal 2 or drain 2, choose each turn)", "Triage Priority (choose one unit: it cannot be reduced below 1 HP this turn)", "Restorative Aura"],
          fragment_interaction: "Choose: healing fragment heals 3 to allies, or drains 2 from enemy and heals ally for 2",
          unit_synergy: "Healed units gain +1 ATK for 1 turn; destroyed units drop a healing cocoon (any ally can pick up for +3 HP)"
        }
      },
      signature_units: ["Gossamer Guard", "Cocoon Wardens", "Thread-Seer Acolytes"],
      strategic_notes: "Yalith is the answer to attrition matchups. She can't kill anything quickly, but she makes your army nearly impossible to grind down. Pair her with high-DEF infantry like Gossamer Guard and Anchor Guard — her healing turns their durability into inevitability. Weak against burst-damage alpha strikes that kill before she can heal. Her Chaos path adds offensive teeth but risks raising units that might not be fully loyal.",
      tags: ["Healer", "Support", "Buffer", "Restoration", "Defensive"]
    },

    // COMMANDER 12 — Cavalry/Spider-Mount Commander
    {
      name: "Fang-Rider Kaelyx",
      faction: "thornweft-matriarchy",
      title: "The Silk Tempest",
      flavor_text: "Kaelyx rides a Matriarch-stage spider named Skein — a creature so massive its legs leave furrows in stone. Together they lead the Thornweft's mounted host in charges that sound like a thunderstorm made of chitin and screaming silk.",
      theme: "Mounted combat; spider-cavalry charges, flanking warfare",
      personality: "Wild, laughing, addicted to speed and the thrill of the charge",
      playstyle: "Aggressive cavalry commander. Kaelyx buffs all mounted/cavalry units with charge bonuses, speed, and flanking power. She hits hard and fast, dismantling enemy flanks before they can consolidate. Pair with Spiderling Scouts, Silk-Rider Lancers, and Matriarch Riders for a devastating mobile army.",
      base_stats: { Command: 8, Knowledge: 6, Leadership: 7, Agility: 10, Health: 225 },
      battle_stats: { ATK: 18, DEF: 4, HP: 27, MOV: 10, RNG: 2, MOR: 8 },
      points_cost: 22,
      level_1_deck: {
        command: ["Thundering Charge", "Flanking Orders"],
        tech: ["Spider-Bond Tactics", "Silk Saddle Reinforcement"],
        fragment: ["Stampede Resonance"],
        tactical: ["Cavalry Wedge"]
      },
      skill_tree: {
        level_2: { knowledge: "Precise Charge Timing (+1 ATK on charge)", chaos: "Berserker Charge (double charge bonus, can't retreat)", tactical: "Flanking Discipline" },
        level_3: { knowledge: "Spider-Bond Mastery", chaos: "Frenzy Gallop", tactical: "Pincer Formation" },
        level_4: { knowledge: "Mounted Coordination", chaos: "Wild Stampede", tactical: "Cavalry Dominance" },
        level_5: { knowledge: "Perfect Rider", chaos: "Unstoppable Charge", tactical: "Mobile Strike Force" },
        level_6: { knowledge: "Wall-Climb Charge", chaos: "Rampage", tactical: "Encirclement Tactics" },
        level_7: { knowledge: "Silk-Lasso Mastery", chaos: "Mounted Fury", tactical: "Deep Flanking" },
        level_8: { knowledge: "Strategic Mobility", chaos: "Stampede Carnage", tactical: "Cavalry Supremacy" },
        level_9: { knowledge: "Grand Rider", chaos: "Apocalyptic Charge", tactical: "Perfect Mobile Warfare" },
        level_10: { knowledge: "Eternal Tempest", chaos: "Silk Storm Incarnate", tactical: "Supreme Cavalry Master" }
      },
      evolution_paths: {
        knowledge: {
          name: "Master Rider",
          description: "Kaelyx and Skein move as one organism. Every charge is timed perfectly, every flank executed with surgical precision.",
          abilities: ["Perfect Charge (+3 ATK on charge for all cavalry within 8\")", "Spider-Climb Assault (cavalry can charge through/over terrain)", "Coordinated Flank (cavalry attacking the same target as Kaelyx gain +2 ATK)"],
          fragment_interaction: "Charge fragments buff entire cavalry wing; +2 MOV to all cavalry within 10\"",
          unit_synergy: "All cavalry gain Wall-Climber; Silk-Rider Lancers gain +1 DEF; Spiderling Scouts gain +1 ATK"
        },
        chaos: {
          name: "Stampede Incarnate",
          description: "Kaelyx has become pure momentum — she cannot stop, will not stop, and anything in her path is trampled to paste.",
          abilities: ["Unstoppable Stampede (charge does not end on contact — plow through enemy units dealing damage to each)", "Frenzy (cannot voluntarily stop moving; +4 ATK on charge)", "Trample (all units Kaelyx moves through take ATK/2 damage)"],
          fragment_interaction: "Charge fragments trigger automatic charge on nearest enemy; trample damage applies corruption",
          unit_synergy: "Cavalry gain +3 MOV but cannot hold objectives; all charges are mandatory (cannot choose not to charge if in range)"
        },
        hybrid: {
          name: "Silk Tempest",
          description: "Controlled aggression — Kaelyx charges devastatingly but can rein in when needed.",
          abilities: ["Adaptive Charge (choose: controlled +2 ATK or wild +4 ATK with overshoot risk)", "Silk Lasso (after charge, drag one enemy model 4\" toward friendly lines)", "Mobile Rally (cavalry that charges this turn are immune to MOR checks)"],
          fragment_interaction: "Choose: charge fragment gives +3 ATK to one unit, or +1 ATK to all cavalry within 8\"",
          unit_synergy: "Cavalry gain +1 MOV and +1 ATK on charge; Phase-Silk Cavalry can charge after teleporting"
        }
      },
      signature_units: ["Silk-Rider Lancers", "Matriarch Riders", "Spiderling Scouts"],
      strategic_notes: "Kaelyx is the aggressor's choice. She turns the Thornweft cavalry wing from a flanking support element into the primary damage dealer. Her army wants to charge turn 2 and never stop. Weak against castle/turtle strategies with overlapping arcs of fire — she needs to reach the enemy quickly or her glass-cannon cavalry gets picked apart. Her Chaos path is terrifyingly powerful but removes tactical flexibility.",
      tags: ["Cavalry", "Charge", "Flanking", "Mobility", "Aggressive"]
    },

    // COMMANDER 13 — Terrain Shaper / Living Web Commander
    {
      name: "Loom-Shaper Quileth",
      faction: "thornweft-matriarchy",
      title: "The Living Loom",
      flavor_text: "Quileth doesn't fight battles — she reshapes them. Walls of hardened silk erupt from nothing. Bridges of gossamer span chasms. The ground itself becomes web, and the web becomes whatever Quileth needs it to be. By the end of a battle, the terrain belongs to her.",
      theme: "Aggressive terrain manipulation; dynamic battlefield reshaping",
      personality: "Patient, architectural, sees the battlefield as raw material to sculpt",
      playstyle: "Terrain creation and manipulation. Quileth grows web terrain, raises silk walls, creates chokepoints, and weaponizes the environment itself. She turns open fields into Thornweft fortresses and enemy fortifications into web-choked killing grounds. Pair with Web-Spinner Sappers and Anchor Guard for total terrain domination.",
      base_stats: { Command: 7, Knowledge: 10, Leadership: 8, Agility: 5, Health: 210 },
      battle_stats: { ATK: 12, DEF: 4, HP: 24, MOV: 5, RNG: 8, MOR: 9 },
      points_cost: 20,
      level_1_deck: {
        command: ["Raise Silk Wall", "Web Flood"],
        tech: ["Terrain Engineering", "Web Architecture"],
        fragment: ["Earth-Silk Resonance"],
        tactical: ["Chokepoint Creation"]
      },
      skill_tree: {
        level_2: { knowledge: "Precision Shaping (choose exact wall placement)", chaos: "Wild Growth (terrain erupts randomly in 8\" radius)", tactical: "Tactical Terrain" },
        level_3: { knowledge: "Silk Fortification", chaos: "Living Web (web moves each turn)", tactical: "Chokepoint Mastery" },
        level_4: { knowledge: "Web Bridge Construction", chaos: "Devouring Terrain", tactical: "Strategic Reshaping" },
        level_5: { knowledge: "Master Architect", chaos: "Chaotic Overgrowth", tactical: "Battlefield Control" },
        level_6: { knowledge: "Hardened Silk Walls", chaos: "Predatory Terrain", tactical: "Mobile Fortification" },
        level_7: { knowledge: "Labyrinth Weaving", chaos: "Terrain Corruption", tactical: "Adaptive Architecture" },
        level_8: { knowledge: "Perfect Terrain Control", chaos: "Living Battlefield", tactical: "Supreme Shaping" },
        level_9: { knowledge: "Grand Architect", chaos: "Apocalyptic Overgrowth", tactical: "Total Terrain Dominance" },
        level_10: { knowledge: "Eternal Loom", chaos: "World-Weaver", tactical: "Supreme Terrain Master" }
      },
      evolution_paths: {
        knowledge: {
          name: "Grand Architect",
          description: "Quileth's terrain manipulation is absolute — she builds perfect fortifications, optimal chokepoints, and silk structures that last the entire battle.",
          abilities: ["Raise Fortress (create a 6\" silk wall with DEF 6 and 18 HP — blocks movement and line of sight)", "Web Highway (create a 12\" silk road — friendly units on it gain +3 MOV)", "Chokepoint Mastery (enemies entering web terrain Quileth created lose 1 MOV and suffer -1 ATK)"],
          fragment_interaction: "Terrain fragments create permanent structures; walls gain +6 HP; web zones last entire game",
          unit_synergy: "Web-Spinner Sappers create double-size web zones; Anchor Guard gain +2 DEF in Quileth's terrain; all friendly units gain Web-Walk"
        },
        chaos: {
          name: "Living Loom",
          description: "Quileth's web has become alive — it grows, hunts, and devours. The battlefield itself turns predatory.",
          abilities: ["Predatory Web (web terrain deals 2 damage to enemy units that start their turn in it)", "Animated Silk (once per turn, move one web zone 4\" in any direction)", "Devouring Wall (silk walls can attack adjacent enemy units with ATK 9)"],
          fragment_interaction: "Terrain fragments spawn hostile web zones on enemy deployment; web zones spread 2\" per turn automatically",
          unit_synergy: "Web terrain heals friendly units for 1 HP/turn but also has 10% chance to entangle them (-2 MOV for 1 turn)"
        },
        hybrid: {
          name: "Tactical Shaper",
          description: "Controlled terrain manipulation with selective weaponization — Quileth builds what's needed and arms it when necessary.",
          abilities: ["Adaptive Terrain (choose: defensive wall or offensive web zone each turn)", "Silk Snare (web zone can be triggered to immobilize all units in it for 1 turn, friend or foe)", "Mobile Architecture (walls can be dissolved and rebuilt elsewhere)"],
          fragment_interaction: "Choose: terrain fragment creates permanent fortification or temporary offensive web that deals damage",
          unit_synergy: "Web-Spinner Sappers gain +1 web zone per turn; all friendly units in web terrain gain +1 DEF"
        }
      },
      signature_units: ["Web-Spinner Sappers", "Anchor Guard", "Gossamer Guard"],
      strategic_notes: "Quileth is the control commander — she reshapes the battlefield until it's unrecognizable. She excels in any game with objectives, as she can wall off enemy approaches and create highways for her own forces. She's slow and methodical; don't try to rush with her. Let her build for 2-3 turns, then watch the enemy try to navigate a labyrinth of silk while your troops move freely. Weak against flyers and teleporters who bypass terrain entirely. Her Chaos path creates a terrifying living battlefield but risks friendly entanglement.",
      tags: ["Terrain", "Control", "Architecture", "Web", "Defensive"]
    }
  );

  // ===========================
  // UNITS (~50)
  // ===========================

  gameData.units.push(
    // INFANTRY (15 units)
    { name: "Thread-Warden Infantry", faction: "thornweft-matriarchy", points_cost: 1, role: "Core troops", fragment_interactions: "Minor web buffs", flavor_text: "Silk-armored warriors with venom-coated blades", description: "The lowest rank of the Matriarchy's standing army, Thread-Wardens wear lightweight silk hauberks and carry short blades coated in paralytic spider venom. They fight in tight, interlocking formations, each warrior trained to sense vibrations in nearby web terrain and relay enemy positions to their sisters. Cheap and numerous, they form the expendable front line that funnels enemies into prepared kill-zones.", type: "Infantry", stats: { ATK: 6, DEF: 3, HP: 3, MOV: 5, RNG: 1, MOR: 6 }, special: ["Venom Strike (1 token on hit)", "Web-Sensitive"] },
    { name: "Silk-Warden Regulars", faction: "thornweft-matriarchy", points_cost: 2, role: "Standard infantry", fragment_interactions: "Web buffs", flavor_text: "Standard Thornweft soldiers with spindle-blades and chitin shields", description: "The backbone of any Thornweft battle-line, Silk-Warden Regulars carry spindle-blades forged around a core of spider-fang and bear shields of layered chitin laminate. They can erect silk barricades mid-battle, transforming open ground into defensible chokepoints, and their web-walking training lets them cross sticky terrain without slowing. Reliable and versatile, they anchor the Matriarchy's formations while more specialized units maneuver around them.", type: "Infantry", stats: { ATK: 9, DEF: 3, HP: 3, MOV: 5, RNG: 1, MOR: 7 }, special: ["Venom Strike", "Silk Barricade (+1 DEF; +2 DEF in web terrain; attackers may become entangled)", "Web-Walk (ignore web terrain)"] },
    { name: "Gossamer Guard", faction: "thornweft-matriarchy", points_cost: 3, role: "Elite infantry", fragment_interactions: "Defensive web synergy", flavor_text: "Elite warriors in silk-plate armor woven from Matriarch spider-molt", description: "Clad head-to-toe in silk-plate — layered gossamer hardened with alchemical resins until it rivals steel — the Gossamer Guard are the Matriarchy's elite heavy infantry. Their armor resonates with nearby web terrain, granting them preternatural reflexes when fighting within the strands. They hold critical positions with unyielding discipline, their venom-edged halberds punishing any who breach the silk line.", type: "Infantry", stats: { ATK: 12, DEF: 5, HP: 6, MOV: 5, RNG: 1, MOR: 8 }, special: ["Silk-Anchored (reroll failed MOR checks; +1 DEF when within 3\" of Web-Anchor)", "Silk Armor (+1 DEF in web terrain)", "Venom Strike"] },
    { name: "Venom Dancers", faction: "thornweft-matriarchy", points_cost: 3, role: "Skirmish infantry", fragment_interactions: "Poison enhancement", flavor_text: "Agile fighters who coat every strike in layered toxins", description: "Part warrior, part performance artist, Venom Dancers fight with a fluid, spinning style that coats every strike in layered toxins far more potent than standard venom blades. They dodge incoming blows with uncanny grace and disengage by snaring pursuers in quick-spun webs before pirouetting away. Commanders deploy them as flankers and duelists, where their stacking poisons can bring down even the most heavily armored foes.", type: "Infantry", stats: { ATK: 12, DEF: 2, HP: 3, MOV: 7, RNG: 1, MOR: 7 }, special: ["Venom Strike (2 tokens on hit)", "Dodge (+1 DEF vs melee)", "Web Snare Retreat (attack then retreat 4\"; leave web terrain at departure point)"] },
    { name: "Web-Spinner Sappers", faction: "thornweft-matriarchy", points_cost: 2, role: "Engineering infantry", fragment_interactions: "Web creation", flavor_text: "Combat engineers who lay web terrain while fighting", description: "These combat engineers carry portable spinnerets and silk-extruders, racing ahead of the main force to blanket the battlefield in adhesive web terrain. They work in pairs — one spinning while the other anchors — and can erect a full web-anchor control point in minutes. Sappers are lightly armed but indispensable; the Matriarchy's entire tactical doctrine depends on the terrain they create.", type: "Infantry", stats: { ATK: 6, DEF: 3, HP: 3, MOV: 5, RNG: 1, MOR: 7 }, special: ["Lay Web Terrain (create 3\" web zone)", "Anchor Construction"] },
    { name: "Silk-Shot Skirmishers", faction: "thornweft-matriarchy", points_cost: 2, role: "Ranged infantry", fragment_interactions: "Venom delivery", flavor_text: "Dart-blowers firing silk-wrapped venom needles", description: "Armed with ironwood blow-tubes and silk-wrapped venom needles, Silk-Shot Skirmishers harass enemy formations from range, delivering venom tokens without ever closing to melee. They operate in loose, skirmishing formations, darting between cover and using their light silk armor for speed over protection. A volley from a full skirmisher line can leave an advancing regiment sluggish and dying before a single blade is drawn.", type: "Infantry", stats: { ATK: 9, DEF: 2, HP: 3, MOV: 6, RNG: 8, MOR: 6 }, special: ["Venom Darts (apply 1 venom token at range)", "Skirmish"] },
    { name: "Cocoon Wardens", faction: "thornweft-matriarchy", points_cost: 3, role: "Harvesting infantry", fragment_interactions: "Resource generation", flavor_text: "Specialists who wrap dead enemies for resource extraction", description: "Battlefield recyclers of grim efficiency, Cocoon Wardens follow in the wake of combat, wrapping fallen enemies in quick-hardening silk to be processed for resources. Each cocoon yields alchemical reagents, chitin for armor repair, and organic material the Matriarchy wastes nothing of. Anchored to web terrain for rapid movement, they ensure that every enemy casualty fuels the Thornweft war machine.", type: "Infantry", stats: { ATK: 9, DEF: 4, HP: 6, MOV: 4, RNG: 1, MOR: 7 }, special: ["Cocoon Harvest (generate 1 resource per adjacent dead enemy)", "Silk-Anchored (reroll failed MOR checks; +1 DEF when within 3\" of Web-Anchor)"] },
    { name: "Phase-Silk Infiltrators", faction: "thornweft-matriarchy", points_cost: 4, role: "Elite stealth infantry", fragment_interactions: "Phase abilities", flavor_text: "Assassins wrapped in light-bending silk", description: "Draped in phase-silk that bends light around their forms, these assassins are nearly invisible until the killing stroke falls. They can step through the silk-between — teleporting short distances along web-threads — to bypass guards and fortifications entirely. With blades honed for commander-killing, a single Infiltrator behind enemy lines can decapitate a chain of command in seconds.", type: "Infantry", stats: { ATK: 15, DEF: 2, HP: 3, MOV: 7, RNG: 1, MOR: 8 }, special: ["Silk Camouflage (invisible in web terrain; attacking reveals but creates web zone)", "Assassinate (+3 ATK vs commanders)", "Silk-Step (teleport 6\" through web network; arrive in any connected web terrain)"] },
    { name: "Thread-Seer Acolytes", faction: "thornweft-matriarchy", points_cost: 4, role: "Fate-reading infantry", fragment_interactions: "Fate manipulation", flavor_text: "Apprentice fate-readers who grant minor probability buffs", description: "Junior novitiates of the Thread-Seer orders, these Acolytes have learned to read the shimmering fate-threads that connect all living things but lack the power to rewrite them. Once per engagement they can glimpse probable futures, granting nearby allies a crucial reroll at the moment of decision. They also bear minor Fragments — shards of crystallized fate — making them versatile support pieces whose true power is yet to bloom.", type: "Infantry", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 5, RNG: 8, MOR: 8 }, special: ["Fate-Read (1 free reroll per turn for nearby allies)", "Fragment User"] },
    { name: "Fang Guard Elite", faction: "thornweft-matriarchy", points_cost: 5, role: "Heavy elite infantry", fragment_interactions: "All buffs", flavor_text: "Personal guard units carrying Fang-Glaives and chitin greatshields", description: "The personal retinue of high-ranking Thread-Seers, Fang Guard Elite wield massive Fang-Glaives — polearms tipped with the fangs of elder Loom-Spiders — and fight with a bond so deep their movements mirror their mistress's will. Every strike delivers a double dose of venom, and they can erect silk barricades to shield their charge. Fate itself bends around them, making them unnervingly difficult to kill through conventional means.", type: "Infantry", stats: { ATK: 15, DEF: 5, HP: 9, MOV: 5, RNG: 1, MOR: 9 }, special: ["Venom Strike (2 tokens)", "Silk Barricade (+1 DEF; +2 DEF in web terrain; attackers may become entangled)", "Thread-Bond (connected to commander via silk; intercept attacks and share damage equally)", "Fate-Bound (auto-pass MOR; this unit's death was not foreseen in the web)"] },
    { name: "Shuttle-Consort Militia", faction: "thornweft-matriarchy", points_cost: 1, role: "Cheap screening troops", fragment_interactions: "Minimal", flavor_text: "Male administrative staff armed for desperation defense", description: "In Thornweft society, males serve administrative and domestic roles, but when a brood-hold faces annihilation, the Shuttle-Consorts take up arms. Armed with repurposed tools and scraps of silk armor, they fight with desperate courage, serving as screens and expendable blockers to buy time for the true warriors. They are not expected to survive — and they know it.", type: "Infantry", stats: { ATK: 6, DEF: 2, HP: 3, MOV: 5, RNG: 1, MOR: 5 }, special: ["Expendable", "Screen (block charge lanes)"] },
    { name: "Silk-Blade Duelists", faction: "thornweft-matriarchy", points_cost: 4, role: "Melee specialists", fragment_interactions: "Combat buffs", flavor_text: "Master swordswomen wielding paired spindle-blades", description: "Master swordswomen who have devoted decades to the spindle-blade forms, Silk-Blade Duelists fight with paired weapons in a weaving, thread-like style that seems to anticipate every incoming blow. They riposte with venom-laced counters that punish aggressive opponents, and their thread-dancer footwork makes them nightmarishly difficult to pin down. They are often deployed as champions, sent to challenge and destroy enemy heroes in single combat.", type: "Infantry", stats: { ATK: 15, DEF: 3, HP: 6, MOV: 6, RNG: 1, MOR: 8 }, special: ["Thread-Dancer (reroll 1 ATK die in melee; each hit applies 1 venom token)", "Venom Strike", "Venom Riposte (counterattack applies 2 venom tokens; can't be blocked)"] },
    { name: "Anchor Guard", faction: "thornweft-matriarchy", points_cost: 3, role: "Objective holders", fragment_interactions: "Web-Anchor defense", flavor_text: "Defenders sworn to protect Web-Anchor points at all costs", description: "Sworn protectors of the Matriarchy's Web-Anchor points, the Anchor Guard plant themselves at these critical network nodes and refuse to yield. Their armor and fighting style are optimized for static defense, granting them formidable bonuses when holding ground near an anchor. Destroying a Web-Anchor while its Guard still stands is a task few enemy commanders relish.", type: "Infantry", stats: { ATK: 9, DEF: 5, HP: 6, MOV: 4, RNG: 1, MOR: 9 }, special: ["+2 DEF when within 3\" of Web-Anchor", "Silk-Anchored (reroll failed MOR checks; +1 DEF when within 3\" of Web-Anchor)", "Hold Ground"] },
    { name: "Fear-Weavers", faction: "thornweft-matriarchy", points_cost: 4, role: "Morale warfare", fragment_interactions: "Psychological debuffs", flavor_text: "Warriors who emit subsonic web-vibrations that induce dread", description: "These specialists vibrate web-strands at subsonic frequencies tuned to trigger primal dread in humanoid minds, projecting an aura of creeping terror that erodes enemy morale. Soldiers near a Fear-Weaver find their hands shaking, their resolve crumbling, and their discipline fraying — often breaking before the real assault even begins. Fate-bound and difficult to silence, they are the Matriarchy's answer to superior enemy numbers.", type: "Infantry", stats: { ATK: 9, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 9 }, special: ["Terror Aura (-1 MOR to enemies within 6\")", "Fate-Bound (auto-pass MOR; this unit's death was not foreseen in the web)"] },
    { name: "Fate-Blessed Veterans", faction: "thornweft-matriarchy", points_cost: 5, role: "Elite core", fragment_interactions: "All buffs", flavor_text: "Survivors of a hundred webs, their fate-threads hardened by experience", description: "Survivors of dozens of campaigns, these grizzled warriors have been touched by fate so many times that probability bends gently in their favor at all times. Their strikes carry venom born of long experience, their footwork crosses web terrain effortlessly, and their dice — metaphorically speaking — never betray them. They form a reliable elite core that younger warriors aspire to join, assuming they live long enough.", type: "Infantry", stats: { ATK: 15, DEF: 5, HP: 9, MOV: 5, RNG: 1, MOR: 9 }, special: ["Veteran", "Venom Strike", "Reroll 1s", "Web-Walk"] },

    // CAVALRY (5 units)
    { name: "Spiderling Scouts", faction: "thornweft-matriarchy", points_cost: 2, role: "Light cavalry", fragment_interactions: "Speed/web buffs", flavor_text: "Riders on young Loom-Spiders, fast and skittish", description: "Bonded to juvenile Loom-Spiders barely larger than warhorses, Spiderling Scouts range far ahead of the main force, their mounts' web-sense detecting enemy movement through vibrations in the earth. They lay thin trails of web terrain as they patrol, gradually extending the Matriarchy's area of control before battle is even joined. Fast, expendable, and surprisingly effective, they are the Matriarchy's eyes.", type: "Cavalry", stats: { ATK: 9, DEF: 2, HP: 6, MOV: 10, RNG: 4, MOR: 6 }, special: ["Web-Sense Patrol (deploy 6\" ahead; detect all movement through web terrain)", "Web-Walk", "Lay Web Terrain while moving"] },
    { name: "Silk-Rider Lancers", faction: "thornweft-matriarchy", points_cost: 5, role: "Medium cavalry", fragment_interactions: "Charge buffs", flavor_text: "Warriors mounted on Weaver-stage spiders, armed with Fang-Glaives", description: "Mounted on weaver-stage Loom-Spiders large enough to scale fortress walls, Silk-Rider Lancers are the Matriarchy's shock cavalry. They charge with Fang-Glaives lowered, their spiders pouncing with terrifying force, and every lance-strike delivers a payload of concentrated venom. No wall or formation is safe from troops that can attack from any angle, including straight down.", type: "Cavalry", stats: { ATK: 15, DEF: 4, HP: 9, MOV: 8, RNG: 2, MOR: 8 }, special: ["Wall-Climber", "Spider-Pounce (+2 ATK on charge; may charge from walls/ceilings)", "Venom Lance (charge applies 2 venom tokens)"] },
    { name: "Matriarch Riders", faction: "thornweft-matriarchy", points_cost: 8, role: "Heavy cavalry", fragment_interactions: "Elite web synergy", flavor_text: "Thread-Seers mounted on Matriarch-stage spiders", description: "Thread-Seers mounted on massive Matriarch-stage Loom-Spiders, these are mobile command platforms of terrifying power. They can cast webs that immobilize targets at range, project web-anchor networks from their mount's spinnerets, and read the fate-threads of the battlefield in real time. Each Matriarch Rider is a one-spider army, combining the roles of commander, caster, and heavy cavalry into a single, wall-climbing nightmare.", type: "Cavalry", stats: { ATK: 18, DEF: 5, HP: 12, MOV: 8, RNG: 4, MOR: 9 }, special: ["Wall-Climber", "Web-Caster (8\" immobilize)", "Mobile Web-Anchor", "Fate-Read (1 reroll/turn)"] },
    { name: "Phase-Silk Cavalry", faction: "thornweft-matriarchy", points_cost: 6, role: "Fast cavalry", fragment_interactions: "Phase abilities", flavor_text: "Riders on spiders wrapped in light-bending silk — they shimmer and teleport", description: "Spider-riders clad in the same light-bending phase-silk worn by the Infiltrators, Phase-Silk Cavalry appear and vanish across the battlefield like predatory mirages. They teleport through web-strands to strike exposed flanks, then snare pursuers in sticky retreat-webs before blinking away again. Opponents describe fighting them as trying to catch smoke with a sword.", type: "Cavalry", stats: { ATK: 12, DEF: 3, HP: 9, MOV: 12, RNG: 4, MOR: 8 }, special: ["Silk-Step (teleport 8\" through web network; arrive in connected web terrain)", "Web Snare Retreat (attack then retreat 4\"; leave web terrain at departure point)", "Silk Camouflage (invisible in web terrain; attacking reveals but creates web zone)"] },
    { name: "Queen-Spawn War-mount", faction: "thornweft-matriarchy", points_cost: 10, role: "Elite cavalry", fragment_interactions: "All buffs", flavor_text: "Loom-Mother mounted on a Queen-Spawn Spider — a walking web-fortress", description: "Only the most powerful Loom-Mothers ride Queen-Spawn Spiders — gargantuan arachnids whose very presence warps the fabric of reality. The beast's silk storm can blanket an enormous area in choking, ensnaring threads, while the Loom-Mother atop it rewrites fate itself. A mobile web-anchor, a siege engine, and a command platform in one, the Queen-Spawn is the apex of Thornweft military might short of the legendary Gossamer Titan.", type: "Cavalry", stats: { ATK: 21, DEF: 6, HP: 15, MOV: 7, RNG: 6, MOR: 10 }, special: ["Wall-Climber", "Mobile Web-Anchor", "Silk Storm (12\" cone AoE)", "Reality Weaving (reshape terrain within 6\")"] },

    // SUPPORT (8 units)
    { name: "Web-Anchor Engineers", faction: "thornweft-matriarchy", points_cost: 4, role: "Network construction", fragment_interactions: "Anchor creation", flavor_text: "Dedicated engineers who deploy and maintain Web-Anchors", description: "Specialists who deploy, calibrate, and maintain the Web-Anchor points that form the backbone of Thornweft battlefield control. Each anchor extends the web-network, granting nearby allies enhanced movement, communication, and tactical options. Engineers are lightly armed but critically important — a force without its anchors is a spider without its web.", type: "Support", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 7 }, special: ["Deploy Web-Anchor (takes 1 activation)", "Repair Anchor", "Web-Walk"] },
    { name: "Venom Alchemists", faction: "thornweft-matriarchy", points_cost: 4, role: "Debuff support", fragment_interactions: "Enhanced poisons", flavor_text: "Poison specialists who coat allied weapons and brew combat toxins", description: "Part battlefield pharmacist, part walking war crime, Venom Alchemists brew concentrated toxins from harvested spider venom and coat allied weapons with enhanced poisons mid-battle. They also carry venom bombs — glass spheres of pressurized toxin that shatter into clouds of caustic mist. Wherever they walk, the Matriarchy's already-potent venom strikes become truly devastating.", type: "Support", stats: { ATK: 6, DEF: 2, HP: 6, MOV: 5, RNG: 8, MOR: 7 }, special: ["Coat Weapons (+1 venom token to nearby allies' attacks)", "Venom Bomb (6\" blast, 1 token to all hit)"] },
    { name: "Silk Surgeons", faction: "thornweft-matriarchy", points_cost: 3, role: "Healers", fragment_interactions: "Healing silk", flavor_text: "Medics who bind wounds with healing silk bandages", description: "Trained in the art of healing silk — gossamer bandages infused with coagulants, antiseptics, and regenerative compounds harvested from spider glands — Silk Surgeons keep the Matriarchy's warriors fighting. They can also cleanse allied troops of enemy venoms and poisons, making them a critical counter to mirror-matched Thornweft forces. Their gentle hands belie the brutal war they serve.", type: "Support", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 5, RNG: 4, MOR: 7 }, special: ["Heal (restore 1d3 HP with silk binding)", "Cleanse Venom (remove venom tokens from allies)"] },
    { name: "Fate-Thread Weavers", faction: "thornweft-matriarchy", points_cost: 5, role: "Fate support", fragment_interactions: "Fate manipulation", flavor_text: "Ritual weavers who manipulate probability threads on the battlefield", description: "Where Acolytes read fate-threads, full Fate-Thread Weavers can pluck and tangle them, forcing enemy actions to go awry at the worst possible moment. They carry Fragments of crystallized probability and can issue prophecies that guide allied strategy. A Weaver behind the lines makes the entire army luckier, the enemy clumsier, and the battle feel subtly, maddeningly rigged.", type: "Support", stats: { ATK: 6, DEF: 2, HP: 6, MOV: 5, RNG: 12, MOR: 8 }, special: ["Fate Manipulation (force 1 enemy reroll per turn)", "Fragment User", "Prophecy"] },
    { name: "Gossamer Trap Layers", faction: "thornweft-matriarchy", points_cost: 3, role: "Terrain control", fragment_interactions: "Trap creation", flavor_text: "Specialists who deploy adhesive web-traps across the battlefield", description: "These specialists deploy adhesive gossamer traps — near-invisible zones of sticky silk that immobilize anything that blunders into them. They work ahead of the main force or alongside sappers, creating kill-zones where enemies are held fast for venom-armed sisters to dispatch. Their web-walking ability lets them navigate their own trap-fields with ease, dancing through death-zones that paralyze everyone else.", type: "Support", stats: { ATK: 6, DEF: 3, HP: 3, MOV: 5, RNG: 1, MOR: 6 }, special: ["Lay Gossamer Trap (3\" zone: enemies immobilized for 1 turn)", "Web-Walk"] },
    { name: "Vibration Drummers", faction: "thornweft-matriarchy", points_cost: 3, role: "Morale support", fragment_interactions: "Web-vibration", flavor_text: "Play silk-drums that send tactical commands through the Web", description: "Beating silk-membrane drums stretched over hollow spider-chitin frames, Vibration Drummers send coded tactical commands rippling through the web-network and bolster morale with driving, resonant rhythms. The vibrations pulse through connected web terrain, coordinating units across the entire battlefield faster than any courier. Their music is felt more than heard — a thrumming in the bones that steels the heart.", type: "Support", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 8 }, special: ["Inspiring Vibration (+1 MOR to nearby allies)", "Web Pulse (extend command range through Anchors)"] },
    { name: "Spider Handlers", faction: "thornweft-matriarchy", points_cost: 3, role: "Beast support", fragment_interactions: "Spider buffs", flavor_text: "Trainers who command unbonded combat spiders", description: "Not every Loom-Spider bonds with a rider; unbonded spiders are corralled and commanded by the Matriarchy's Handlers, who use pheromone glands and subsonic clicking to direct feral arachnids in battle. They can calm panicked beasts, redirect aggressive ones, and in dire need, trigger a spawning frenzy that produces a burst of combat spiderlings. They are part beast-master, part conductor of eight-legged chaos.", type: "Support", stats: { ATK: 6, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 7 }, special: ["Command Spiders", "Calm Beast (prevent frenzy)", "Spawn Spiderling (once per game)"] },
    { name: "Cocoon Processors", faction: "thornweft-matriarchy", points_cost: 4, role: "Resource extraction", fragment_interactions: "Harvesting", flavor_text: "Process cocooned enemies into usable resources", description: "Operating mobile processing stations, Cocoon Processors break down the silk-wrapped packages delivered by Cocoon Wardens into usable resource tokens — alchemical reagents, repair materials, and raw silk. They can also perform field repairs on damaged silk constructs and war machines. The grim efficiency with which they render enemies into logistics would disturb any observer not raised in the Matriarchy.", type: "Support", stats: { ATK: 6, DEF: 4, HP: 6, MOV: 4, RNG: 1, MOR: 7 }, special: ["Process Cocoon (convert 1 cocooned enemy into 2 resource tokens)", "Field Repairs (use resources to heal)"] },

    // SCOUTS (3 units)
    { name: "Silk-Shadow Scouts", faction: "thornweft-matriarchy", points_cost: 3, role: "Reconnaissance", fragment_interactions: "Detection", flavor_text: "Spider-mounted scouts in light-bending silk cloaks", description: "Mounted on nimble spiders and wrapped in light-bending cloaks, Silk-Shadow Scouts deploy far ahead of the main army, scaling terrain features and mapping enemy positions while remaining virtually invisible. Their web-sense patrols detect hidden units and ambushes, relaying intelligence back through the web-network. By the time an enemy realizes they've been watched, the Matriarchy's battle plan is already complete.", type: "Scout", stats: { ATK: 9, DEF: 2, HP: 6, MOV: 10, RNG: 6, MOR: 7 }, special: ["Silk Camouflage (invisible in web terrain; attacking reveals but creates web zone)", "Web-Sense Patrol (deploy 6\" ahead; detect all movement through web terrain)", "Wall-Climber", "Forward Deploy"] },
    { name: "Tremor Sentinels", faction: "thornweft-matriarchy", points_cost: 2, role: "Detection", fragment_interactions: "Vibration sensing", flavor_text: "Web-sensitives who detect movement through ground vibrations", description: "These specialist sentries press sensitive palps against the ground, reading vibrations through the earth and web-network to detect hidden or stealthed units within a wide radius. They need no line of sight — movement itself betrays the enemy to their tremor-sense. Paired with web-walking mobility, they ensure that nothing approaches a Thornweft position undetected.", type: "Scout", stats: { ATK: 6, DEF: 2, HP: 3, MOV: 5, RNG: 1, MOR: 7 }, special: ["Detect Hidden Units (12\" tremor-sense)", "Web-Walk", "Anti-Stealth"] },
    { name: "Thread-Reader Outriders", faction: "thornweft-matriarchy", points_cost: 4, role: "Intel gathering", fragment_interactions: "Fate reading", flavor_text: "Fast spider-riders who read enemy fate-threads from a distance", description: "Fast spider-riders trained in both reconnaissance and fate-reading, Thread-Reader Outriders can glimpse an enemy unit's capabilities by studying the fate-threads woven around them. They relay this intelligence through the web-network, allowing Thornweft commanders to tailor their response before battle is joined. Knowledge, the Matriarchy teaches, is the first strand of any web.", type: "Scout", stats: { ATK: 9, DEF: 3, HP: 6, MOV: 9, RNG: 8, MOR: 8 }, special: ["Fate-Read (reveal enemy unit stats and abilities)", "Wall-Climber", "Relay Commands"] },

    // ARTILLERY (3 units)
    { name: "Silk Catapult", faction: "thornweft-matriarchy", points_cost: 6, role: "Web artillery", fragment_interactions: "Web ammo", flavor_text: "Launches compressed web-bombs that create instant trap terrain", description: "A crew-served weapon that launches compressed silk-bombs in high arcs over obstacles and fortifications. On impact, each bomb erupts into a blast of adhesive web terrain, denying ground and trapping soldiers in place. The Silk Catapult doesn't kill — it creates the conditions for killing, converting open ground into the Matriarchy's preferred hunting terrain.", type: "Artillery", stats: { ATK: 12, DEF: 3, HP: 9, MOV: 3, RNG: 24, MOR: 7 }, special: ["Indirect Fire", "Web-Bomb (6\" blast creates web terrain)", "Terrain Denial"] },
    { name: "Venom Mortar", faction: "thornweft-matriarchy", points_cost: 7, role: "Poison artillery", fragment_interactions: "Venom delivery", flavor_text: "Fires shells of concentrated spider-venom", description: "Lobbing shells of concentrated, pressurized venom in arcing trajectories, the Venom Mortar saturates target areas with clouds of caustic toxin that linger as a poisonous haze. Troops caught in the blast suffer heavy venom token accumulation, and the poison cloud persists, denying the area long after the initial bombardment. It turns enemy positions into death-zones without ever engaging directly.", type: "Artillery", stats: { ATK: 15, DEF: 3, HP: 9, MOV: 3, RNG: 24, MOR: 7 }, special: ["Indirect Fire", "Venom Blast (4\" blast, all hit gain 2 venom tokens)", "Poison Cloud (persists 1 turn)"] },
    { name: "Fate-Loom Siege Engine", faction: "thornweft-matriarchy", points_cost: 8, role: "Fate artillery", fragment_interactions: "Fate manipulation", flavor_text: "A mobile loom that weaves and unweaves fate-threads at range", description: "A mobile battlefield loom attended by a cadre of Thread-Seers, this arcane engine weaves and unweaves fate-threads on a massive scale. It can strip abilities from enemy units by severing their threads, or tangle probability so thoroughly that enemies are forced to reroll their successes. Slow and heavily guarded, it is nonetheless one of the most strategically devastating weapons in the Thornweft arsenal.", type: "Artillery", stats: { ATK: 9, DEF: 3, HP: 12, MOV: 3, RNG: 30, MOR: 8 }, special: ["Fate Disruption (target unit loses 1 random ability for 2 turns)", "Thread Tangle (target must reroll all successes for 1 turn)"] },

    // SPECIALIST (5 units)
    { name: "Spiderling Swarm", faction: "thornweft-matriarchy", points_cost: 2, role: "Cheap screening", fragment_interactions: "Growth", flavor_text: "Swarms of young spiders that overwhelm through numbers", description: "A skittering, writhing tide of juvenile spiders, individually fragile but terrifying in aggregate. They pour over obstacles, climb walls, and deliver countless tiny venom bites that accumulate into lethal doses. Expendable by design — the Matriarchy breeds them in vast numbers — swarms serve to overwhelm screening units, clog chokepoints, and simply horrify the enemy into breaking formation.", type: "Specialist", stats: { ATK: 9, DEF: 1, HP: 3, MOV: 8, RNG: 1, MOR: 5 }, special: ["Swarm (3 models count as 1 unit)", "Wall-Climber", "Venom Bite (1 token)", "Expendable"] },
    { name: "Cocoon Bombers", faction: "thornweft-matriarchy", points_cost: 4, role: "Immobilization", fragment_interactions: "Web capture", flavor_text: "Specialist units that lob cocoon grenades to immobilize enemies", description: "Lobbing grenades filled with quick-hardening silk compound, Cocoon Bombers can immobilize clusters of enemies in a single volley, wrapping them in constricting cocoons that tighten with every struggle. The grenades burst on impact, spraying adhesive strands in a wide radius. Victims must be cut free by allies or slowly suffocate — neither option is attractive under fire.", type: "Specialist", stats: { ATK: 9, DEF: 3, HP: 6, MOV: 6, RNG: 8, MOR: 7 }, special: ["Cocoon Grenade (4\" blast, immobilize for 1 turn)", "Web-Walk"] },
    { name: "Thread-Cutter Assassins", faction: "thornweft-matriarchy", points_cost: 5, role: "Assassination", fragment_interactions: "Fate-cutting", flavor_text: "Elite killers who sever enemy fate-threads with silk garrotes", description: "The Matriarchy's most feared killers, Thread-Cutters carry blades ritually attuned to sever fate-threads — the metaphysical lifelines connecting living beings to probability itself. A commander struck by a Thread-Cutter finds their luck evaporating, their plans unraveling, and their survival suddenly, terrifyingly uncertain. Cloaked in phase-silk and trained for single-target elimination, they are the Matriarchy's ultimate answer to enemy heroes.", type: "Specialist", stats: { ATK: 18, DEF: 2, HP: 6, MOV: 8, RNG: 1, MOR: 9 }, special: ["Silk Camouflage (invisible in web terrain; attacking reveals but creates web zone)", "Assassinate (+3 ATK vs commanders)", "Fate-Sever (killed targets cannot be resurrected)"] },
    { name: "Reality Weavers", faction: "thornweft-matriarchy", points_cost: 6, role: "Terrain manipulation", fragment_interactions: "Reality alteration", flavor_text: "Elite silk-mages who physically reshape the battlefield", description: "Powerful Thread-Seers who have transcended mere fate-reading to reshape the physical battlefield itself, moving terrain features, raising silk walls, and even creating new obstacles from raw probability. They carry potent Fragments and walk web terrain with ease, their mere presence warping the landscape into configurations favorable to the Matriarchy. Enemies who fight a Reality Weaver find the ground itself conspiring against them.", type: "Specialist", stats: { ATK: 9, DEF: 3, HP: 6, MOV: 5, RNG: 8, MOR: 8 }, special: ["Terrain Weaving (move or create terrain features within 8\")", "Fragment User", "Web-Walk"] },
    { name: "Silk Wraiths", faction: "thornweft-matriarchy", points_cost: 5, role: "Phase assault", fragment_interactions: "Phase abilities", flavor_text: "Warriors so deeply bonded to the Web they're only partially real", description: "Warriors who have undergone the Silk-Between ritual, existing partially outside reality, their bodies wrapped in phase-silk that renders them intermittently intangible. Strikes pass through them half the time, and they can teleport instantly between any Web-Anchor points on the battlefield. Fighting a Silk Wraith is an exercise in frustration — they are there, and then they are not, and then their blade is in your back.", type: "Specialist", stats: { ATK: 15, DEF: 1, HP: 6, MOV: 8, RNG: 1, MOR: 8 }, special: ["Silk-Step (50% miss chance; exists between web dimensions)", "Teleport (move to any Web-Anchor)", "Ethereal (ignore terrain)"] },

    // WAR MACHINES (11 units)
    { name: "Brood-Mother Spider", faction: "thornweft-matriarchy", points_cost: 12, role: "Spawner/heavy", fragment_interactions: "Spawns spiders", flavor_text: "A massive spider that lays eggs mid-battle, spawning combat reinforcements", description: "A massive Loom-Spider of the elder matriarch brood-stage, large enough to carry a howdah and still birth combat-ready spiderlings mid-battle. It functions as a mobile Web-Anchor, its spinnerets constantly reinforcing the web-network, while its fangs deliver venom strikes that can fell cavalry. The steady stream of spiderlings it produces makes it a self-replenishing threat that only grows more dangerous the longer it is left unchecked.", type: "War Machine", stats: { ATK: 21, DEF: 6, HP: 30, MOV: 6, RNG: 4, MOR: 10 }, special: ["Spawn Spiderlings (1d3 per turn)", "Wall-Climber", "Venomstrike (paralytic bite)", "Mobile Web-Anchor"] },
    { name: "Silk Colossus", faction: "thornweft-matriarchy", points_cost: 14, role: "Super-heavy siege spider", fragment_interactions: "Web creation", flavor_text: "An enormous spider wrapped in layers of reinforced silk, walking fortress", description: "An enormous spider-construct wrapped in layers of hardened silk armor thick enough to garrison troops inside its thorax, the Silk Colossus is a walking fortress. Its silk storm can blanket an entire battlefield quarter in web terrain, and its every step creates adhesive ground that slows pursuers and enables allies. Bringing one down requires concentrated siege fire — which is difficult when the ground beneath your artillery is turning to glue.", type: "War Machine", stats: { ATK: 24, DEF: 7, HP: 36, MOV: 5, RNG: 6, MOR: 10 }, special: ["Massive", "Silk Storm (18\" cone AoE + immobilize)", "Creates Web Terrain while moving", "Living Fortress (garrison 3 infantry inside)"] },
    { name: "Gossamer Titan", faction: "thornweft-matriarchy", points_cost: 15, role: "Reality weaver", fragment_interactions: "Fate manipulation", flavor_text: "A Queen-Spawn Spider of staggering proportions — its silk can rewrite geography", description: "The largest Queen-Spawn ever recorded, a Gossamer Titan is a creature of legend made flesh — a spider of staggering proportions whose reality-weaving aura reshapes the battlefield in a vast radius. Thread-Seers mounted atop it command fate itself, issuing multiple rerolls per turn, while the beast scales any terrain feature regardless of size. When a Gossamer Titan takes the field, the Matriarchy's enemies know true despair.", type: "War Machine", stats: { ATK: 27, DEF: 6, HP: 39, MOV: 4, RNG: 8, MOR: 10 }, special: ["Reality Weaving (reshape terrain within 12\")", "Fate Command (force 2 rerolls/turn)", "Wall-Climber", "Legendary"] },
    { name: "Venom Engine", faction: "thornweft-matriarchy", points_cost: 9, role: "Poison war machine", fragment_interactions: "Venom delivery", flavor_text: "A spider-construct that sprays concentrated venom across wide areas", description: "A spider-shaped construct of chitin and silk, the Venom Engine carries pressurized venom reservoirs connected to a wide-angle spray nozzle that drenches entire formations in caustic toxin. A lingering poison cloud surrounds it at all times, and its web-walking chassis lets it navigate the Matriarchy's own terrain with ease. It is less a war machine and more a mobile ecological disaster.", type: "War Machine", stats: { ATK: 18, DEF: 5, HP: 24, MOV: 5, RNG: 12, MOR: 10 }, special: ["Venom Spray (12\" cone, 2 venom tokens to all hit)", "Poison Cloud Aura (3\")", "Web-Walk"] },
    { name: "Web-Fortress", faction: "thornweft-matriarchy", points_cost: 10, role: "Defensive structure", fragment_interactions: "Network hub", flavor_text: "A semi-permanent silk structure that serves as a fortified Web-Anchor hub", description: "A semi-permanent structure of hardened silk and chitin, the Web-Fortress serves as an immobile but incredibly durable Web-Anchor hub, extending and strengthening the network across a vast area. It can garrison a full squad within its reinforced walls, and its self-repairing silk structure slowly knits damage between engagements. Where a Web-Fortress stands, the Matriarchy's control is absolute.", type: "War Machine", stats: { ATK: 12, DEF: 8, HP: 30, MOV: 0, RNG: 12, MOR: 10 }, special: ["Immobile", "Enhanced Web-Anchor (double teleport range)", "Garrison 5 infantry", "Self-Repairing (heal 1 HP/turn)"] },
    { name: "Fate-Loom Engine", faction: "thornweft-matriarchy", points_cost: 11, role: "Command engine", fragment_interactions: "Fate amplification", flavor_text: "A massive silk-loom operated by Thread-Seers, weaving fate in real time", description: "The largest and most powerful fate-manipulation device the Matriarchy fields, the Fate-Loom Engine is a massive silk loom attended by a full coven of Thread-Seers, weaving and unweaving probability in real time. It can force multiple enemy rerolls per turn, amplifying the fate-manipulation of nearby allies, but its fragile core makes it vulnerable to direct assault. Protecting the Engine is as important as deploying it.", type: "War Machine", stats: { ATK: 12, DEF: 5, HP: 27, MOV: 3, RNG: 30, MOR: 10 }, special: ["Fate Weaving (force 3 enemy rerolls per turn)", "Thread Amplification (all friendly fate abilities +1)", "Fragile Core"] },
    { name: "Crawler Siege Engine", faction: "thornweft-matriarchy", points_cost: 8, role: "Mobile siege", fragment_interactions: "Web delivery", flavor_text: "An armored spider-construct that scales walls and delivers web-bombs", description: "An armored spider-construct designed for fortress assault, the Crawler scales walls that would stop conventional siege engines and launches web-bombs that entangle defenders on their own battlements. Its siege-rated mandibles can tear through stone and timber with terrifying efficiency. Where other armies must breach gates, the Thornweft simply climb over — or through — the walls.", type: "War Machine", stats: { ATK: 18, DEF: 5, HP: 21, MOV: 6, RNG: 8, MOR: 10 }, special: ["Wall-Climber", "Web-Bomb Launcher", "Siege (double damage vs structures)"] },
    { name: "Skithari (Unique Queen-Spawn)", faction: "thornweft-matriarchy", points_cost: 25, role: "Named monster", fragment_interactions: "Legendary web synergy", flavor_text: "Loom-Mother Vethiss's spider partner — the most intelligent non-humanoid in the Matriarchy", description: "The bonded partner of Loom-Mother Vethiss herself, Skithari is a Queen-Spawn of singular intelligence and terrifying power. Her reality-weaving warps the battlefield in an enormous radius, her silk storm can engulf entire army wings, and she serves as a mobile fortress-anchor around which the Matriarchy's web-network crystallizes. Skithari is not merely a mount — she is a legend, and where she treads, fate itself bows to the Matriarchy's will.", type: "War Machine", stats: { ATK: 36, DEF: 8, HP: 60, MOV: 8, RNG: 10, MOR: 10 }, special: ["Wall-Climber", "Reality Weaving", "Silk Storm (24\" cone)", "Mobile Fortress Web-Anchor", "Legendary (Vethiss only)"] },
    { name: "Phase-Silk Wraith Spider", faction: "thornweft-matriarchy", points_cost: 9, role: "Phase construct", fragment_interactions: "Phase abilities", flavor_text: "A spider that exists between dimensions — semi-transparent and nearly impossible to hit", description: "A Loom-Spider subjected to the Silk-Between ritual, this construct exists half in the material world and half in the dimension of threads. Strikes phase through its flickering form, it teleports freely between web-anchor points, and its wall-climbing ability means no position is safe from its ethereal approach. Engaging one is like fighting a shadow cast by a spider that may or may not exist.", type: "War Machine", stats: { ATK: 18, DEF: 3, HP: 18, MOV: 10, RNG: 4, MOR: 10 }, special: ["Silk-Step (50% miss chance; partially between web dimensions)", "Teleport", "Wall-Climber", "Ethereal"] },
    { name: "Cocoon Harvester", faction: "thornweft-matriarchy", points_cost: 7, role: "Resource war machine", fragment_interactions: "Harvesting", flavor_text: "A massive spider-construct that wraps and processes enemies in industrial volumes", description: "A hulking spider-construct optimized for rapid mass-cocooning, the Harvester wades into melee and wraps multiple adjacent enemies per turn in quick-hardening silk. The cocooned victims are then processed on the spot, yielding an enormous bounty of resource tokens that fuel the Matriarchy's war effort. Fate-bound and relentless, it transforms enemy infantry from a threat into a logistics windfall.", type: "War Machine", stats: { ATK: 15, DEF: 5, HP: 21, MOV: 5, RNG: 4, MOR: 10 }, special: ["Mass Cocoon (wrap 1d3 adjacent enemies per turn)", "Process (convert cocoons to 3 resource tokens)", "Fate-Bound (auto-pass MOR; this unit's death was not foreseen in the web)"] },
    { name: "Trap-Layer Construct", faction: "thornweft-matriarchy", points_cost: 6, role: "Terrain construct", fragment_interactions: "Trap deployment", flavor_text: "An automated spider-construct that scatters Gossamer Traps while patrolling", description: "An automated spider-construct that skitters across the battlefield, extruding gossamer traps from its rear spinnerets at a steady, mechanical pace. It requires no crew and no orders — simply wind it up and release it to scatter immobilizing traps across the enemy's approach routes. Its wall-climbing chassis lets it seed traps in unexpected locations, turning flanking routes into adhesive nightmares.", type: "War Machine", stats: { ATK: 9, DEF: 4, HP: 15, MOV: 6, RNG: 1, MOR: 10 }, special: ["Auto-Trap (lay 1 Gossamer Trap per turn for free)", "Wall-Climber", "Web-Walk"] }
  );

  // ===========================
  // FRAGMENTS (15)
  // ===========================

  gameData.fragments.push(
    { name: "Thread-Spool", faction: "thornweft-matriarchy", effects: "Basic fate buff; grant 1 reroll to a friendly unit", risk_instability: "Low", activation_cost: 1, interaction_evolution: "Stable across all evolutions; reliable probability manipulation" },
    { name: "Fate Crystal", faction: "thornweft-matriarchy", effects: "Major fate manipulation; force 2 enemy rerolls this turn", risk_instability: "Medium", activation_cost: 2, interaction_evolution: "Knowledge: no instability. Chaos: force 4 rerolls but 1 friendly reroll forced too" },
    { name: "Gossamer Bomb", faction: "thornweft-matriarchy", effects: "Create 8\" web terrain zone anywhere within 12\"", risk_instability: "Low", activation_cost: 1, interaction_evolution: "Terrain commanders like Morthis double the radius" },
    { name: "Venom Heart", faction: "thornweft-matriarchy", effects: "Apply 3 venom tokens to one target within 12\"", risk_instability: "Medium", activation_cost: 2, interaction_evolution: "Draven reduces cost to 1; Chaos commanders risk venom spreading to allies" },
    { name: "Phase Silk Shard", faction: "thornweft-matriarchy", effects: "Teleport one unit to any Web-Anchor point instantly", risk_instability: "Low", activation_cost: 1, interaction_evolution: "Ithris can teleport 3 units simultaneously" },
    { name: "Web-Anchor Seed", faction: "thornweft-matriarchy", effects: "Deploy a Web-Anchor instantly at any point within 8\"", risk_instability: "None", activation_cost: 1, interaction_evolution: "Vethiss gains double-strength Anchors from seeds" },
    { name: "Chitin Ward", faction: "thornweft-matriarchy", effects: "Defense; +2 DEF and poison immunity for 1 unit", risk_instability: "Low", activation_cost: 2, interaction_evolution: "Varek can stack multiple wards on himself" },
    { name: "Tremor Shard", faction: "thornweft-matriarchy", effects: "Detection; reveal all hidden units within 18\"", risk_instability: "None", activation_cost: 1, interaction_evolution: "Silivex gains full enemy intel for 2 turns" },
    { name: "Brood Crystal", faction: "thornweft-matriarchy", effects: "Spawn 1d6 Spiderlings at any Web-Anchor", risk_instability: "Medium", activation_cost: 2, interaction_evolution: "Thessari guarantees maximum spawns; Chaos may spawn mutants" },
    { name: "Silk Storm Gem", faction: "thornweft-matriarchy", effects: "12\" cone AoE: immobilize all targets for 1 turn", risk_instability: "High", activation_cost: 3, interaction_evolution: "Can hit allies if misused; powerful area denial" },
    { name: "Thread-Cutter Wire", faction: "thornweft-matriarchy", effects: "Assassination; one attack this turn auto-wounds (no roll needed)", risk_instability: "High", activation_cost: 3, interaction_evolution: "Nyx reduces cost to 1; others risk cutting their own threads" },
    { name: "Reality Loom Shard", faction: "thornweft-matriarchy", effects: "Reshape terrain: move 1 terrain feature up to 6\"", risk_instability: "Medium", activation_cost: 2, interaction_evolution: "Terrain manipulation; create cover or remove it" },
    { name: "Fear Silk", faction: "thornweft-matriarchy", effects: "One enemy unit takes -3 MOR this turn", risk_instability: "Low", activation_cost: 1, interaction_evolution: "Silivex can apply to all enemy units within 12\"" },
    { name: "Cocoon Charm", faction: "thornweft-matriarchy", effects: "Wrap one destroyed enemy model in cocoon for harvesting (3 resource tokens)", risk_instability: "None", activation_cost: 1, interaction_evolution: "Rathis auto-generates cocoons without spending fragments" },
    { name: "Web-Queen's Blessing", faction: "thornweft-matriarchy", effects: "All Web-Anchors double teleportation range for 2 turns", risk_instability: "Very High", activation_cost: 4, interaction_evolution: "Massive network buff; if mishandled, all Anchors overload and collapse" }
  );

})();
