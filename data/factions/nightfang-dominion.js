// Nightfang Dominion — Faction Data
(function() {
  // Faction definition
  gameData.factions.push(    {
      id: "nightfang-dominion",
      name: "The Nightfang Dominion",
      icon: "🩸",
      color: "#dc2626",
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
    });

  // Commanders
  const commanders = [
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
        Health: 420
      },
      battle_stats: {
        ATK: 18,
        DEF: 4,
        HP: 33,
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
        Health: 300
      },
      battle_stats: {
        ATK: 12,
        DEF: 3,
        HP: 27,
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
        Health: 450
      },
      battle_stats: {
        ATK: 21,
        DEF: 5,
        HP: 36,
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
        Health: 270
      },
      battle_stats: {
        ATK: 9,
        DEF: 3,
        HP: 24,
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
        Health: 330
      },
      battle_stats: {
        ATK: 12,
        DEF: 4,
        HP: 30,
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
        Health: 285
      },
      battle_stats: {
        ATK: 18,
        DEF: 3,
        HP: 24,
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
        Health: 330
      },
      battle_stats: {
        ATK: 9,
        DEF: 4,
        HP: 30,
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
        Health: 390
      },
      battle_stats: {
        ATK: 15,
        DEF: 5,
        HP: 33,
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
        Health: 315
      },
      battle_stats: {
        ATK: 15,
        DEF: 4,
        HP: 27,
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
        Health: 300
      },
      battle_stats: {
        ATK: 12,
        DEF: 3,
        HP: 27,
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
        Health: 345
      },
      battle_stats: {
        ATK: 15,
        DEF: 4,
        HP: 30,
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
        Health: 450
      },
      battle_stats: {
        ATK: 12,
        DEF: 6,
        HP: 39,
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
        Health: 330
      },
      battle_stats: {
        ATK: 21,
        DEF: 3,
        HP: 30,
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
          chaos: "Apex Predator Form: permanently become a massive tiger — ATK 8, DEF 4, HP 12, MOV 10, Corruption Aura 4\", Terrifying, Fearless, Blood Drain",
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
            "Permanent tiger form: ATK 8, DEF 4, HP 12, MOV 10",
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
  ];
  commanders.forEach(c => gameData.commanders.push(c));

  // Units
  const units = [
    // ===================== NIGHTFANG DOMINION UNITS =====================
    // Stats: ATK (dice), DEF (target#), HP, MOV (inches), RNG (inches, 1=melee), MOR (2d6 threshold)
    {
      name: "Thrall Conscripts",
      faction: "nightfang-dominion",
      points_cost: 1,
      role: "Expendable screen",
      fragment_interactions: "Hunger Pool +1 on death; absorbs hits for elites",
      flavor_text: "Mindless infected humans driven forward by the Blight's hunger. They fight with crude weapons and bare hands.",
      description: "Shambling husks of what were once farmers, merchants, and beggars, these mindless infected are hurled toward the enemy in waves. They feel no pain and follow no strategy—only the dim, insatiable compulsion the Blight has carved into what remains of their minds. Cheap to field and cheaper to lose, they exist to absorb arrows and tie down real threats.",
      type: "Infantry",
      corruption_spread: 0,
      stats: {
        ATK: 3,
        DEF: 3,
        HP: 3,
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
      description: "A seething, moaning tide of rotting flesh and grasping hands, the Plague Horde is less a military unit and more a natural disaster. They stumble forward in such crushing density that enemy formations simply cannot cut through them fast enough. Use them to pin dangerous foes in place while your true killers close in from the flanks.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 3,
        DEF: 2,
        HP: 3,
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
      description: "Once disciplined soldiers, these Blight-turned warriors retain enough muscle memory to swing a blade with purpose. The corruption threading through their veins spreads to anything they wound, seeding infection across enemy lines. They are the workhorse of any Nightfang advance—expendable enough to trade, dangerous enough to respect.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 6,
        DEF: 3,
        HP: 6,
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
      description: "These town guards fell defending walls that could not hold against the Blight. Now they raise those same shields in service to the Dominion, their disciplined formations a grotesque echo of their former duty. Their shield wall anchors the line while the corruption leaking from their wounds poisons everything nearby.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 6,
        DEF: 4,
        HP: 3,
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
      description: "Marked with the sacred tiger sigils of the Dominion, these warriors wield barbed bone glaives that carve through ranks at punishing reach. Each strike spreads the Patriarch's corruption deeper into enemy flesh. They are the fangs of the formation—positioned behind the front line, striking over the heads of lesser thralls.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 9,
        DEF: 3,
        HP: 6,
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
      description: "Forged in the blood-furnaces beneath Nightfang fortresses, their Blight-iron spears are designed to punch through mounted charges. When cavalry thunder toward them, they brace with a discipline that belies the madness in their eyes. Each wound their spears inflict festers with corruption, punishing any rider foolish enough to close.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 6,
        DEF: 4,
        HP: 6,
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
      description: "Stage 2 of the Blight transformation has reshaped these warriors into something between human and predator—clawed hands, elongated canines, and feline reflexes that let them fight in terrifying concert. They coordinate through pack instinct rather than shouted orders, flanking and encircling with animal precision. Every kill fuels the Blood Tithe, feeding the Dominion's war machine.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 12,
        DEF: 3,
        HP: 6,
        MOV: 6,
        RNG: 1,
        MOR: 8
      },
      special: [
        "Corruption",
        "Corruption Spread",
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
      description: "These frenzied warriors have surrendered to the Blight's hunger, fighting in a red-eyed fury that makes them nearly impossible to stop. They drain the lifeblood from their victims mid-combat, each kill driving them deeper into their frenzy. Unleash them into enemy lines and watch them carve a crimson path—just don't expect them to retreat.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 12,
        DEF: 3,
        HP: 6,
        MOV: 6,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Blood Drain (restore 1 HP when this unit destroys an enemy model)"
      ]
    },
    {
      name: "Plague Knights",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Heavy assault infantry",
      fragment_interactions: "Corruption Aura 2\"; Blood Tithe",
      flavor_text: "Heavily armored in Blight-forged plate, these warriors are walking corruption engines. Every step leaves infected ground.",
      description: "Encased in armor fused to their corrupted flesh, these walking engines of pestilence radiate Blight in a visible miasma that wilts banners and corrodes steel. Everything within two inches of them begins to sicken and rot. They are slow, relentless, and nearly impossible to kill—an advancing wall of contagion that feeds the Blood Tithe with every grinding step.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 9,
        DEF: 5,
        HP: 9,
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
      description: "The Stage 2 transformation has consumed these warriors entirely, locking them in a permanent state of tiger-rage that obliterates all reason. They fight with the savage fury of apex predators, drunk on blood and incapable of disengaging once they taste combat. Point them at the enemy and step aside—they will not stop until everything before them is dead, including themselves.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 15,
        DEF: 3,
        HP: 6,
        MOV: 6,
        RNG: 1,
        MOR: 9
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Frenzy (+1 ATK when below half HP)",
        "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"
      ]
    },
    {
      name: "Shadow Claw Infantry",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Stealth melee infantry",
      fragment_interactions: "Corruption Spread; ambush bonus from cover",
      flavor_text: "Night-hunters who strike from shadows. Their Blight-darkened skin makes them nearly invisible in low light.",
      description: "Born from shadow and trained in silence, these night-hunters materialize from darkness to strike where the enemy least expects. They carry the Blight's corruption on blackened blades that leave wounds the healers cannot find until it's too late. Deploy them behind enemy lines through ambush to shatter morale and sow chaos.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 9,
        DEF: 3,
        HP: 6,
        MOV: 5,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Stealth (cannot be targeted by ranged attacks while in cover)"
      ]
    },
    {
      name: "Corruption Guard",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Defensive elite infantry",
      fragment_interactions: "Corruption Aura 2\"; protects Plague Heralds and commanders",
      flavor_text: "The Patriarch's personal guard strain — bred for endurance and loyalty. They form impenetrable walls of corrupted flesh.",
      description: "The Patriarch's own chosen, these warriors radiate such concentrated Blight that the air around them shimmers with corruption. They exist for one purpose: to stand between their lord and death. Their mere presence weakens nearby enemies while they absorb blows meant for their master with fanatical, unwavering devotion.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 9,
        DEF: 5,
        HP: 9,
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
      description: "These grim executioners specialize in harvesting prey already weakened by the Dominion's corruption. Against enemies bearing three or more Corruption tokens, their curved blades strike with devastating, surgical precision. They are the closers—patient, methodical killers who let the Blight do the hard work before they move in to collect.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 12,
        DEF: 3,
        HP: 6,
        MOV: 5,
        RNG: 1,
        MOR: 8
      },
      special: ["Corruption", "Corruption Spread", "Reaper (+2 ATK dice against targets with 3+ Corruption tokens)"]
    },
    {
      name: "Infected Archers",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Ranged Corruption applicator",
      fragment_interactions: "Applies Corruption at range; feeds Hunger Pool",
      flavor_text: "Blight Bow wielders who rain corruption-tipped arrows upon the enemy. Each arrow carries a dose of the Quickening.",
      description: "Their arrows are dipped in concentrated Blight-ichor, ensuring that even a glancing hit begins the slow process of corruption. Volleys of these tainted shafts darken the sky before embedding in shields, flesh, and earth alike, spreading infection across the battlefield at range. They soften formations long before the melee troops arrive.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 9,
        DEF: 3,
        HP: 3,
        MOV: 5,
        RNG: 14,
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
      description: "These wretched thralls have been so thoroughly consumed by the Blight that their bodies produce torrents of infectious bile, which they vomit in arcing streams toward the enemy. The splashing blast radius ensures that even near-misses spread corruption. They are disgusting, expendable, and horrifyingly effective area-denial tools.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 6,
        DEF: 2,
        HP: 3,
        MOV: 5,
        RNG: 6,
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
      description: "The finest non-commander warriors in the Dominion, these killers have mastered both the pack tactics of the Blight-born and the blood-draining arts of the vampire lords. They fight with coordinated, predatory grace, each member of the unit covering another as they systematically drain the life from elite enemy formations. Fielding them is a statement of dominance.",
      type: "Infantry",
      corruption_spread: 3,
      stats: {
        ATK: 15,
        DEF: 4,
        HP: 9,
        MOV: 6,
        RNG: 1,
        MOR: 9
      },
      special: ["Corruption", "Corruption Spread", "Pack Tactics", "Blood Drain"]
    },
    {
      name: "Crimson Halberdiers",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Versatile line infantry",
      fragment_interactions: "Corruption Spread; Reach; solid all-rounder",
      flavor_text: "Disciplined Blight-warriors armed with Crimson Halberds — weapons that combine reach with devastating corruption delivery.",
      description: "Unlike the frenzied berserkers that populate much of the Dominion's ranks, these warriors fight with cold, disciplined precision. Their Blight-forged halberds grant punishing reach, letting them strike over allied lines while spreading corruption with every measured swing. They bring order to the Nightfang's chaos—a steel backbone amid the howling.",
      type: "Infantry",
      corruption_spread: 1,
      stats: {
        ATK: 9,
        DEF: 4,
        HP: 6,
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
      description: "Remnants of an ancient vampire warrior-order predating the Dominion itself, these templars fight wreathed in a miasma of corruption and protected by wards written in their own blood. They are drunk on centuries of accumulated power, radiating Blight with every step. Their Blood Ward absorbs damage meant to destroy them, making them nightmarishly resilient anchors for any battle line.",
      type: "Infantry",
      corruption_spread: 2,
      stats: {
        ATK: 9,
        DEF: 5,
        HP: 9,
        MOV: 4,
        RNG: 1,
        MOR: 9
      },
      special: ["Corruption", "Corruption Aura 2\"", "Blood Ward (+1 DEF when adjacent to another Bloodsworn Templar; gain 1 Corruption token on self)", "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"]
    },
    {
      name: "Thrall Riders",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Cheap fast cavalry",
      fragment_interactions: "Corruption Spread on charge; flanking",
      flavor_text: "Thralls strapped onto corrupted beasts. Neither rider nor mount has much intelligence, but their speed and mass are useful for flanking.",
      description: "Mindless thralls lashed atop corrupted beasts that charge with frothing, uncontrollable fury. There is no finesse here—only a stampede of diseased flesh and snapping jaws crashing into enemy ranks. They are cheap, fast, and utterly disposable cavalry meant to shatter formations through sheer, horrifying momentum.",
      type: "Cavalry",
      corruption_spread: 1,
      stats: {
        ATK: 9,
        DEF: 3,
        HP: 6,
        MOV: 8,
        RNG: 1,
        MOR: 5
      },
      special: ["Corruption", "Corruption Spread", "Frenzy Charge (+1 ATK die; must charge nearest enemy if within range)"]
    },
    {
      name: "Tiger Chargers",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Shock cavalry",
      fragment_interactions: "Corruption Spread; Pack Tactics; devastating charge",
      flavor_text: "Vampire warriors riding massive corrupted tigers into battle. The thundering charge of Tiger Chargers can break any line.",
      description: "Vampire warriors mounted on massive corrupted tigers thunder across the battlefield in coordinated pack formations that would make a cavalry general weep with envy. The ground shakes beneath their charge, and the terrifying sight of their approach has broken veteran regiments before contact is even made. They hit like a landslide of fang and fury.",
      type: "Cavalry",
      corruption_spread: 2,
      stats: {
        ATK: 12,
        DEF: 4,
        HP: 6,
        MOV: 9,
        RNG: 1,
        MOR: 8
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Frenzy Charge (+1 ATK die; must charge nearest enemy if within range)",
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
      description: "The personal cavalry of the Blood Dukes, these riders are the aristocracy of the Dominion's mounted forces. They charge in perfect pack formation, draining the lifeblood from their victims through lance-tips connected to the riders by pulsing, vein-like tubes. Each kill sustains them, making prolonged engagements increasingly one-sided.",
      type: "Cavalry",
      corruption_spread: 2,
      stats: {
        ATK: 15,
        DEF: 4,
        HP: 9,
        MOV: 9,
        RNG: 1,
        MOR: 9
      },
      special: ["Corruption", "Corruption Spread", "Frenzy Charge (+1 ATK die; must charge nearest enemy if within range)", "Blood Drain"]
    },
    {
      name: "Plague Runners",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Fast corruption delivery",
      fragment_interactions: "Corruption Spread; area denial; fast Hunger generation",
      flavor_text: "Swift reptilian mounts carrying plague censers — they lap the battlefield spreading corruption mist in their wake.",
      description: "Mounted on swift, reptilian creatures bred in the Blight-swamps, these riders swing plague censers that leave trails of lingering corruption in their wake. They sweep across the battlefield at blistering speed, poisoning the ground itself as they pass. Use them to cut off retreat routes and cordon areas with choking pestilence.",
      type: "Cavalry",
      corruption_spread: 2,
      stats: {
        ATK: 6,
        DEF: 3,
        HP: 6,
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
      description: "Stage 3 of the Blight has fused rider and mount into a single, monstrous entity—a super-heavy nightmare of muscle, fang, and corruption that radiates Blight in waves. They charge with apocalyptic force, drunk on blood and nearly impossible to bring down. A single unit of Nightstalkers can turn a flank and break an army.",
      type: "Cavalry",
      corruption_spread: 3,
      stats: {
        ATK: 15,
        DEF: 4,
        HP: 9,
        MOV: 10,
        RNG: 1,
        MOR: 9
      },
      special: ["Corruption", "Corruption Aura 2\"", "Frenzy Charge (+1 ATK die; must charge nearest enemy if within range)", "Pack Tactics", "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"]
    },
    {
      name: "Shadow Pounce Cavalry",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Ambush cavalry",
      fragment_interactions: "Stealth + Charge combo; surprise attacks",
      flavor_text: "Darkness-wreathed riders who cannot be seen until they strike. They pounce from concealment with devastating force.",
      description: "Wreathed in supernatural darkness, these riders meld with shadows before erupting into reality with devastating ambush charges. They strike from impossible angles, their mounts leaping through pools of shadow to appear behind enemy lines. By the time the enemy turns to face them, the killing blow has already landed.",
      type: "Cavalry",
      corruption_spread: 2,
      stats: {
        ATK: 12,
        DEF: 3,
        HP: 6,
        MOV: 9,
        RNG: 1,
        MOR: 7
      },
      special: ["Corruption", "Corruption Spread", "Frenzy Charge (+1 ATK die; must charge nearest enemy if within range)", "Shadow Meld (invisible in darkness/terrain; attacking from meld applies 2 Corruption tokens)", "Lurker Strike (+2 ATK on first attack from Shadow Meld; apply 1 Corruption)"]
    },
    {
      name: "Blood Shamans",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Blood Tithe healer",
      fragment_interactions: "Blood Tithe healing; Hunger Pool acceleration",
      flavor_text: "Blight-priests who channel the power of consumed blood to heal wounded warriors. They chant in the language of the Scarlet Wellspring.",
      description: "These twisted priests channel the Blood Tithe into restorative rituals, knitting together the wounds of Nightfang warriors with streams of stolen vitality. Their healing is not gentle—it is violent, burning, and smells of copper—but it keeps the Dominion's elite fighting long past when they should have fallen. Every death nearby fuels their terrible craft.",
      type: "Support",
      corruption_spread: 1,
      stats: {
        ATK: 3,
        DEF: 3,
        HP: 6,
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
      description: "Robed figures swinging heavy plague censers that belch clouds of concentrated Blight-spore, these non-combatants serve a single, vital purpose: to saturate the battlefield with corruption. They march behind the front lines, ensuring that every breath the enemy takes brings them closer to the Patriarch's embrace. Keep them alive and the corruption does your fighting for you.",
      type: "Support",
      corruption_spread: 2,
      stats: {
        ATK: 0,
        DEF: 3,
        HP: 6,
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
      description: "Part alchemist, part plague-priest, these twisted scholars brew concentrated corruption serums that intensify the Blight's effect on already-infected enemies. They cannot fight, but their concoctions can turn a minor infection into a crippling plague in moments. Position them near your corruption-spreading units to accelerate the enemy's collapse.",
      type: "Support",
      corruption_spread: 1,
      stats: {
        ATK: 3,
        DEF: 3,
        HP: 6,
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
      description: "Low-ranking vampires who have been granted dominion over packs of mindless thralls, channeling just enough will into the shambling hordes to make them marginally more effective. Within their command radius, thralls fight with surprising coordination and ferocity. They are the whip-hands of the Dominion—cruel, efficient, and utterly essential to making cheap infantry dangerous.",
      type: "Support",
      corruption_spread: 1,
      stats: {
        ATK: 3,
        DEF: 3,
        HP: 6,
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
      description: "These gaunt, hollow-eyed priests channel the collective hunger of the Blight itself, amplifying every kill made nearby into a surge of energy that floods the Hunger Pool. They cannot fight, but their presence transforms ordinary combat into a feast of resources. Station them where your killers work, and watch the Dominion's power reserves overflow.",
      type: "Support",
      corruption_spread: 1,
      stats: {
        ATK: 0,
        DEF: 3,
        HP: 6,
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
      description: "Hunched, ghoulish figures that scuttle across the battlefield collecting blood from the fallen into crystalline vials, these expendable servants are the Dominion's accountants of death. Every corpse they harvest fuels the Blood Tithe that powers the faction's greater war machines. They are weak, fragile, and absolutely critical to the Nightfang economy of violence.",
      type: "Support",
      corruption_spread: 0,
      stats: {
        ATK: 0,
        DEF: 3,
        HP: 3,
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
      description: "These powerful corruption-mages drive their staffs into the earth and channel raw Blight into the ground, creating zones of permanent corruption that weaken and sicken everything that enters. They cannot fight, but the terrain they create reshapes the battlefield itself. Control the ground, and you control the war.",
      type: "Support",
      corruption_spread: 2,
      stats: {
        ATK: 3,
        DEF: 3,
        HP: 6,
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
      description: "Blood-singers whose eerie, harmonic wailing carries across the battlefield in waves that steel the resolve of Nightfang warriors and unnerve their enemies. Their Blood Song bolsters morale within six inches, while their rally cries can pull routing units back from the edge. They are the heartbeat of the Dominion's battle line—keep them singing.",
      type: "Support",
      corruption_spread: 1,
      stats: {
        ATK: 0,
        DEF: 3,
        HP: 6,
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
      description: "A grotesque living catapult grown from corrupted bone and sinew, this immobile artillery piece hurls masses of concentrated Blight that detonate in festering explosions. The blast radius spreads corruption across wide areas, softening distant formations before the advance. It cannot move once planted, so choose its position with care.",
      type: "Artillery",
      corruption_spread: 1,
      stats: {
        ATK: 12,
        DEF: 3,
        HP: 9,
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
      description: "This Blight-grown mortar lobs arcing shells of clotted blood and corruption over terrain and friendly units alike, raining infection on enemies who thought themselves safe behind cover. Its indirect fire capability makes it invaluable for dislodging entrenched defenders. The corruption spread on impact ensures that even survivors carry the Patriarch's gift.",
      type: "Artillery",
      corruption_spread: 1,
      stats: {
        ATK: 9,
        DEF: 3,
        HP: 6,
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
      description: "A towering crystallized spire of pure, solidified Blight, this immobile emplacement pulses with corruption that it projects across extreme range with terrifying accuracy. Its Predator Eyes targeting allows it to pick out high-value targets with precision, while its Corruption Spread ensures every hit degrades the enemy further. Build your defense around it.",
      type: "Artillery",
      corruption_spread: 2,
      stats: {
        ATK: 15,
        DEF: 3,
        HP: 9,
        MOV: 3,
        RNG: 24,
        MOR: 7
      },
      special: ["Corruption", "Corruption Spread", "Predator Eyes (+1 ATK die vs targets in open; see in darkness)", "Immobile"]
    },
    {
      name: "Bile Cannon Crew",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Short range devastation",
      fragment_interactions: "Massive short-range AoE; corruption saturation",
      flavor_text: "A grotesque living cannon that vomits a torrent of acidic Blight-bile in a wide cone. Short-ranged but devastating.",
      description: "A living cannon formed from a repurposed Blight-beast, this artillery piece vomits torrents of acidic bile in a devastating cone that dissolves armor, flesh, and morale in equal measure. The massive blast radius makes it devastating against tightly packed formations. The crew exists merely to aim the screaming thing and keep it fed.",
      type: "Artillery",
      corruption_spread: 2,
      stats: {
        ATK: 15,
        DEF: 3,
        HP: 6,
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
      description: "This precision bone-weapon fires massive Blight-hardened bolts designed to punch through monsters and large targets with surgical accuracy. Where the catapults and cannons deal in area destruction, the Plague Ballista is a scalpel—patient, precise, and absolutely lethal against the biggest threats on the battlefield.",
      type: "Artillery",
      corruption_spread: 1,
      stats: {
        ATK: 12,
        DEF: 3,
        HP: 6,
        MOV: 4,
        RNG: 20,
        MOR: 7
      },
      special: ["Corruption", "Corruption Spread", "Anti-Large (+2 ATK dice against War Machines and models with 5+ HP)", "Predator Eyes (crits on 5+; see in darkness)"]
    },
    {
      name: "Shadow Stalkers",
      faction: "nightfang-dominion",
      points_cost: 2,
      role: "Cheap expendable scouts",
      fragment_interactions: "Spotting for artillery; early corruption application",
      flavor_text: "Fast-moving thralls with enhanced senses. They are released ahead of the army like hunting hounds to flush out the prey.",
      description: "Fast-moving thralls whose Blight-mutation has granted them eerily enhanced senses, these scouts race ahead of the main force to locate prey through blood-scent alone. They spot targets for the Dominion's artillery and mark enemy positions before melting back into the shadows. Expendable but invaluable, they are the Dominion's eyes.",
      type: "Scout",
      corruption_spread: 0,
      stats: {
        ATK: 3,
        DEF: 3,
        HP: 3,
        MOV: 8,
        RNG: 1,
        MOR: 4
      },
      special: [
        "Corruption",
        "Thrall",
        "Blood Scent Scout (deploy 6\" ahead; wounded enemies within 12\" are revealed)",
        "Spotter (friendly artillery targeting enemies within 6\" of this unit gain +1 ATK)"
      ]
    },
    {
      name: "Tiger Scout Pack",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Fast beast scouts",
      fragment_interactions: "Pack Tactics; early Corruption Spread; flanking",
      flavor_text: "Small corrupted tigers released as a hunting pack. Fast, cunning, and able to take down isolated targets.",
      description: "Small corrupted tigers released in hunting packs, these predators range far ahead of the army, their blood-scent allowing them to track enemies across vast distances. They coordinate through pack instinct, surrounding and harrying targets until the main force arrives. Fast, deadly, and unnervingly intelligent for beasts.",
      type: "Scout",
      corruption_spread: 1,
      stats: {
        ATK: 6,
        DEF: 3,
        HP: 3,
        MOV: 9,
        RNG: 1,
        MOR: 6
      },
      special: ["Corruption", "Corruption Spread", "Blood Scent Scout (deploy 6\" ahead; wounded enemies within 12\" are revealed)", "Pack Tactics"]
    },
    {
      name: "Corruption Scouts",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Ranged scout with corruption",
      fragment_interactions: "Applies Corruption at range while scouting; spotter",
      flavor_text: "Blight Bow-armed scouts who infect targets from concealment. Their arrows carry corruption deep into enemy territory.",
      description: "Armed with Blight Bows that fire corruption-laced shafts, these scouts combine ranged harassment with supernatural stealth. They meld with shadows to reposition unseen, scouting enemy movements while peppering formations with infected arrows. They are the Dominion's most versatile reconnaissance asset—equally comfortable scouting and killing.",
      type: "Scout",
      corruption_spread: 1,
      stats: {
        ATK: 6,
        DEF: 3,
        HP: 3,
        MOV: 8,
        RNG: 8,
        MOR: 5
      },
      special: ["Corruption", "Corruption Spread", "Blood Scent Scout (deploy 6\" ahead; wounded enemies within 12\" are revealed)", "Shadow Meld (invisible in darkness/terrain; attacking from meld applies 2 Corruption tokens)"]
    },
    {
      name: "Blood Runners",
      faction: "nightfang-dominion",
      points_cost: 1,
      role: "Ultra-fast disposable scouts",
      fragment_interactions: "Fastest unit in faction; objective grabbing",
      flavor_text: "Thralls mutated for pure speed — elongated limbs and stripped muscle. They run until they drop.",
      description: "Mutated for pure speed at the cost of everything else, these ultra-fast thralls streak across the battlefield like diseased greyhounds. They are fragile and expendable, but their blood-scent scouting covers ground faster than any other unit in the Dominion. Use them to reveal the battlefield early, and don't mourn them when they fall.",
      type: "Scout",
      corruption_spread: 0,
      stats: {
        ATK: 3,
        DEF: 2,
        HP: 3,
        MOV: 10,
        RNG: 1,
        MOR: 4
      },
      special: ["Corruption", "Thrall", "Expendable", "Blood Scent Scout (deploy 6\" ahead; wounded enemies within 12\" are revealed)"]
    },
    {
      name: "Nightveil Infiltrators",
      faction: "nightfang-dominion",
      points_cost: 4,
      role: "Elite stealth scouts",
      fragment_interactions: "Stealth + Corruption; ambush deployment",
      flavor_text: "Elite vampire scouts who can vanish into shadow and reappear behind enemy lines. Their first strike is always lethal.",
      description: "The Dominion's most elite scouts, these vampire operatives can dissolve into mist, meld with shadows, and strike from ambush with lethal precision. Their blood-scent tracking is supernaturally acute, and their Lurker Strike ensures that the first blow lands with devastating force. By the time the enemy knows they're there, the mission is already complete.",
      type: "Scout",
      corruption_spread: 1,
      stats: {
        ATK: 9,
        DEF: 3,
        HP: 6,
        MOV: 8,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Blood Scent Scout (deploy 6\" ahead; wounded enemies within 12\" are revealed)",
        "Shadow Meld (invisible in darkness/terrain; attacking from meld applies 2 Corruption tokens)",
        "Lurker Strike (+2 ATK on first attack from Shadow Meld; apply 1 Corruption)",
        "Mist Form (become incorporeal; move through units and terrain; take no opportunity attacks)"
      ]
    },
    {
      name: "Blight Hound Pack",
      faction: "nightfang-dominion",
      points_cost: 3,
      role: "Fast scout beast pack",
      fragment_interactions: "Hunt wounded targets; Hunger Pool feeding",
      flavor_text: "Corrupted war-dogs with elongated jaws and glowing crimson eyes. They can smell blood from a mile away.",
      description: "Corrupted war-dogs whose Blight-enhanced noses can smell wounded prey from across the battlefield, these savage beasts gain killing fury against injured targets. They lope ahead of the army in snarling packs, their blood-scent scouting revealing enemy positions while their fangs finish off anything too wounded to run. They are relentless pursuit predators.",
      type: "Scout",
      corruption_spread: 1,
      stats: {
        ATK: 6,
        DEF: 3,
        HP: 3,
        MOV: 9,
        RNG: 1,
        MOR: 5
      },
      special: ["Corruption", "Corruption Spread", "Blood Scent Scout (deploy 6\" ahead; wounded enemies within 12\" are revealed)", "Blood Scent (+1 ATK against targets below half HP)"]
    },
    {
      name: "Blood Champion",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Duelist / character hunter",
      fragment_interactions: "Blood Tithe; gains power from Challenge kills",
      flavor_text: "A Stage 3 warrior whose sole purpose is to hunt and destroy enemy commanders. They live for the Challenge.",
      description: "A Stage 3 Blight-warrior of terrifying power, the Blood Champion exists to hunt enemy commanders. Their Blood Duel ability forces single combat, while their draining strikes siphon the life from their opponent with every blow. They bond to a friendly commander and fight as their sword-arm—a living weapon aimed at the enemy's throat.",
      type: "Specialist",
      corruption_spread: 2,
      stats: {
        ATK: 15,
        DEF: 4,
        HP: 9,
        MOV: 6,
        RNG: 1,
        MOR: 9
      },
      special: [
        "Corruption",
        "Corruption Spread",
        "Blood Duel (+1 ATK and +1 DEF in Challenges; winner heals 2 HP from the kill)",
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
      description: "The dominant predator of the Nightfang war-packs, the Tiger Alpha commands lesser beasts through sheer, overwhelming presence. Its Alpha Roar bolsters nearby pack units while its terrifying aspect breaks enemy courage like glass. Where the Alpha stalks, the entire pack fights harder, faster, and with a coordinated savagery that borders on tactical genius.",
      type: "Specialist",
      corruption_spread: 2,
      stats: {
        ATK: 15,
        DEF: 4,
        HP: 12,
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
      description: "A twisted healer who wields the Blight as both weapon and cure, the Plague Doctor can purge corruption from allies or inject it directly into enemies with a touch. This duality makes them invaluable—they keep your forces clean while accelerating the enemy's decline. Their needle-fingered hands are equally comfortable mending and destroying.",
      type: "Specialist",
      corruption_spread: 1,
      stats: {
        ATK: 6,
        DEF: 3,
        HP: 6,
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
      description: "Shadow-wreathed killers who dissolve into mist and materialize behind enemy lines, these assassins exist for one purpose: to eliminate enemy commanders. Their Lurker Strike hits with ambush precision, and their assassination training grants devastating bonuses against command targets. They are the Patriarch's whispered death sentence made flesh.",
      type: "Specialist",
      corruption_spread: 1,
      stats: {
        ATK: 15,
        DEF: 3,
        HP: 6,
        MOV: 7,
        RNG: 1,
        MOR: 7
      },
      special: [
        "Corruption",
        "Shadow Meld (invisible in darkness/terrain; attacking from meld applies 2 Corruption tokens)",
        "Lurker Strike (+2 ATK on first attack from Shadow Meld; apply 1 Corruption)",
        "Assassination (+2 ATK dice against Commanders)",
        "Mist Form (incorporeal movement; pass through units and terrain)"
      ]
    },
    {
      name: "Hunger Wraith",
      faction: "nightfang-dominion",
      points_cost: 8,
      role: "Ethereal damage specialist",
      fragment_interactions: "Phase; Hunger Pool interaction; hard to kill",
      flavor_text: "A manifestation of pure Blight-hunger that has taken physical form. It passes through walls, armor, and flesh alike.",
      description: "A howling manifestation of pure Blight-hunger given terrible, ethereal form, the Hunger Wraith drifts through solid matter and radiates corruption in waves that wither everything nearby. It cannot be struck by mundane weapons, and its blood-drunk frenzy makes it an indiscriminate engine of consumption. Unleashing one is easy—controlling it is another matter entirely.",
      type: "Specialist",
      corruption_spread: 2,
      stats: {
        ATK: 12,
        DEF: 6,
        HP: 9,
        MOV: 6,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Corruption Aura 2\"",
        "Mist Form (incorporeal movement; pass through units and terrain)",
        "Ethereal (can only be damaged by attacks that score critical hits — natural 6)",
        "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"
      ]
    },
    {
      name: "Feral Skinchanger",
      faction: "nightfang-dominion",
      points_cost: 5,
      role: "Flexible form-shifter",
      fragment_interactions: "Switches between ranged/melee forms; versatile",
      flavor_text: "A warrior who can shift between human form (agile, ranged) and tiger form (brutal, melee) at will. Unpredictable and dangerous.",
      description: "These rare Blight-blessed warriors can shift between human and tiger form at will, adapting their combat style to the moment's need. In human form they fight with cunning and precision; in tiger form they become savage whirlwinds of claw and fang. Their versatility makes them unpredictable assets that can fill whatever role the battle demands.",
      type: "Specialist",
      corruption_spread: 2,
      stats: {
        ATK: 12,
        DEF: 4,
        HP: 9,
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
      description: "A priest of the Crimson Wellspring—the mythical source of all vampiric power—the Blood Hierophant channels Fragment energy through blood rituals that fuel the Dominion's supernatural abilities. They cannot fight, but their Fragment Attunement and Blood Tithe generation make them force multipliers of the highest order. Protect them at all costs.",
      type: "Specialist",
      corruption_spread: 1,
      stats: {
        ATK: 6,
        DEF: 3,
        HP: 6,
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
      description: "A Stage 3 corrupted tiger standing twenty feet at the shoulder, this towering monstrosity radiates corruption in a massive aura while draining the lifeblood from anything unfortunate enough to be caught in its grip. The ground trembles beneath its paws, and veteran soldiers have been known to break and run at the mere sight of its approach. It is the Dominion's wrath made manifest.",
      type: "War Machine",
      corruption_spread: 3,
      stats: {
        ATK: 21,
        DEF: 5,
        HP: 30,
        MOV: 6,
        RNG: 1,
        MOR: 10
      },
      special: ["Corruption", "Corruption Aura 3\"", "Blood Drain", "Towering", "Terrifying", "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"]
    },
    {
      name: "Plague Titan",
      faction: "nightfang-dominion",
      points_cost: 15,
      role: "Walking corruption engine",
      fragment_interactions: "Maximum Corruption Aura; plague saturation; siege breaker",
      flavor_text: "The largest creature in the Nightfang arsenal — a Blight-mutated colossus whose every footstep spreads corruption and whose roar liquefies morale.",
      description: "The largest living creature in the Dominion's arsenal, this mountainous horror radiates corruption in a four-inch aura that can sicken entire battalions. It regenerates through the Blight itself, regrowing severed limbs in moments, and its siege capability lets it tear through fortifications like wet paper. Bringing one down requires an army's concentrated effort.",
      type: "War Machine",
      corruption_spread: 4,
      stats: {
        ATK: 24,
        DEF: 5,
        HP: 36,
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
        "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)",
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
      description: "A pulsing, heart-like construct of crystallized blood and Blight-tissue, the Blood Engine channels the Dominion's collected blood resources into devastating ranged blasts. It beats with a rhythmic, sickening thud that can be heard across the battlefield, and each pulse launches a concussive detonation of pressurized blood. It is as much a symbol of Nightfang power as it is a weapon.",
      type: "War Machine",
      corruption_spread: 2,
      stats: {
        ATK: 18,
        DEF: 4,
        HP: 24,
        MOV: 4,
        RNG: 12,
        MOR: 10
      },
      special: [
        "Corruption",
        "Blood-Powered (for each 1 HP sacrificed from friendly units within 3\", gain +2 ATK dice this turn, max +6)",
        "Blast 2\"",
        "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"
      ]
    },
    {
      name: "Corruption Colossus",
      faction: "nightfang-dominion",
      points_cost: 14,
      role: "Mobile corruption factory",
      fragment_interactions: "Creates Corruption Zones; area denial on legs",
      flavor_text: "A walking factory of plague — it trails corruption in its wake and can projectile-infect entire areas of the battlefield.",
      description: "A towering walking factory of corruption, this lumbering war machine leaves a trail of concentrated Blight in its wake that poisons the earth for generations. Everything it steps on, passes near, or breathes upon begins to corrupt. It doesn't need to fight—its mere passage across the battlefield transforms the terrain into a death zone.",
      type: "War Machine",
      corruption_spread: 3,
      stats: {
        ATK: 15,
        DEF: 5,
        HP: 27,
        MOV: 5,
        RNG: 8,
        MOR: 10
      },
      special: [
        "Corruption",
        "Corruption Trail (creates a 2\" Corruption Zone in every space it moves through)",
        "Corruption Spread",
        "Towering",
        "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"
      ]
    },
    {
      name: "Nightfang Dragon",
      faction: "nightfang-dominion",
      points_cost: 15,
      role: "Flying apex war beast",
      fragment_interactions: "Fly; Corruption Breath; apex predator of the sky",
      flavor_text: "A primordial dragon corrupted by the Blight over millennia. Its breath is concentrated Blight-fire and its shadow causes panic.",
      description: "A primordial dragon corrupted by centuries of Blight exposure, this apex predator takes to the sky on vast, bat-like wings before unleashing torrents of corruption breath that melt armor and dissolve flesh. Its massive blast radius can devastate entire formations in a single pass. It is the Dominion's ultimate terror weapon—ancient, hateful, and nearly unstoppable.",
      type: "War Machine",
      corruption_spread: 4,
      stats: {
        ATK: 24,
        DEF: 4,
        HP: 33,
        MOV: 10,
        RNG: 12,
        MOR: 10
      },
      special: [
        "Corruption",
        "Bat-Wing Flight (silent flight; land in enemy rear arcs without triggering reactions)",
        "Corruption Breath (ranged attack applies 2 Corruption tokens to all targets hit)",
        "Blast 3\"",
        "Towering",
        "Terrifying",
        "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"
      ]
    },
    {
      name: "Bile Wurm",
      faction: "nightfang-dominion",
      points_cost: 12,
      role: "Burrowing war beast",
      fragment_interactions: "Ambush from underground; terrain manipulation",
      flavor_text: "A massive corrupted worm that burrows beneath the battlefield and erupts among enemy formations, spewing bile and corruption.",
      description: "This massive burrowing worm erupts from beneath the earth without warning, showering everything nearby in corrosive bile and spreading corruption through the shattered ground. Its tunneling ability lets it bypass defenses entirely, surfacing in the heart of enemy formations with terrifying, ground-shaking violence. Nothing is safe when the earth itself becomes the enemy.",
      type: "War Machine",
      corruption_spread: 2,
      stats: {
        ATK: 18,
        DEF: 4,
        HP: 24,
        MOV: 6,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Burrow (may deploy anywhere on the battlefield at the start of Turn 2+, counts as charging)",
        "Corruption Spread",
        "Terrifying",
        "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"
      ]
    },
    {
      name: "Blood Harvester Juggernaut",
      faction: "nightfang-dominion",
      points_cost: 13,
      role: "Armored assault war machine",
      fragment_interactions: "Blood Drain on kill; Hunger Pool anchor; siege unit",
      flavor_text: "A massive armored beast bristling with bone-blades and draining tubes. It harvests blood from everything it tramples.",
      description: "An armored Blight-beast fitted with dozens of draining tubes and collection apparatus, this juggernaut tramples through enemy lines while siphoning blood from everything it crushes. Its siege capability lets it smash through walls and fortifications, and the harvested blood flows directly into the Dominion's reserves. It is a mobile slaughterhouse on an industrial scale.",
      type: "War Machine",
      corruption_spread: 2,
      stats: {
        ATK: 18,
        DEF: 5,
        HP: 27,
        MOV: 5,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Blood Drain",
        "Trample (when charging, deal 1 damage to every enemy model it moves over)",
        "Siege",
        "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"
      ]
    },
    {
      name: "Elder Tiger Horror",
      faction: "nightfang-dominion",
      points_cost: 14,
      role: "Ancient apex predator",
      fragment_interactions: "Corruption Aura 3\"; Pack Tactics for all tigers within 6\"",
      flavor_text: "An ancient vampiric tiger, possibly older than the Dominion itself. Its roar commands every tiger on the battlefield.",
      description: "An ancient vampiric tiger of immense size and terrifying intelligence, the Elder Tiger Horror has hunted battlefields for centuries. Its Supreme Alpha ability commands every pack unit on the field, coordinating them with a predator's instinct that surpasses mortal tactics. Where it prowls, the entire Nightfang army moves as one vast, perfect hunting pack.",
      type: "War Machine",
      corruption_spread: 3,
      stats: {
        ATK: 21,
        DEF: 4,
        HP: 30,
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
        "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"
      ]
    },
    {
      name: "Plague Broodmother",
      faction: "nightfang-dominion",
      points_cost: 13,
      role: "Thrall spawner",
      fragment_interactions: "Generates free Thrall units; sustains attrition warfare",
      flavor_text: "A horrifying brood-beast that births new thralls directly onto the battlefield. It is both war machine and factory.",
      description: "This bloated, horrifying creature births fully-formed thralls directly onto the battlefield, vomiting a new mindless soldier into existence every turn. She radiates corruption in a protective aura while her endless offspring swarm outward to overwhelm the enemy through sheer, inexhaustible numbers. Killing her is a priority—but reaching her through the tide of thralls is the real challenge.",
      type: "War Machine",
      corruption_spread: 2,
      stats: {
        ATK: 12,
        DEF: 4,
        HP: 27,
        MOV: 3,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Spawn Thralls (at the start of each friendly turn, place 1 free Thrall Conscripts unit within 3\" of this model; maximum 4 spawns per game)",
        "Corruption Aura 2\"",
        "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"
      ]
    },
    {
      name: "Shadow Leviathan",
      faction: "nightfang-dominion",
      points_cost: 15,
      role: "Supreme apex war beast",
      fragment_interactions: "Stealth war machine; Corruption Aura; devastating ambush",
      flavor_text: "The apex predator of the Nightfang — a shadow-cloaked leviathan that phases in and out of visibility. When it strikes, it is already too late.",
      description: "The apex predator of the Nightfang Dominion, the Shadow Leviathan is a towering nightmare that melds with shadows, dissolves into mist, and strikes from ambush despite its colossal size. It defies reason—something that massive should not be able to simply vanish—and that impossibility is what makes it so terrifying. When it appears, the battle is already over.",
      type: "War Machine",
      corruption_spread: 4,
      stats: {
        ATK: 27,
        DEF: 4,
        HP: 30,
        MOV: 7,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Corruption Aura 3\"",
        "Shadow Meld (invisible in darkness/terrain; attacking from meld applies 2 Corruption tokens)",
        "Mist Form (incorporeal movement; pass through units and terrain)",
        "Ambush (+2 ATK on first attack from Stealth)",
        "Towering",
        "Terrifying",
        "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)"
      ]
    },

    // LEGENDARY WAR MACHINE
    {
      name: "The Patriarch's Avatar",
      faction: "nightfang-dominion",
      points_cost: 25,
      role: "Legendary apex horror",
      fragment_interactions: "Corruption Aura; Hunger Pool apex; supreme corruption engine",
      flavor_text: "A fragment of the Patriarch's own will given monstrous, corporeal form — a towering amalgamation of every corruption strain.",
      description: "When the Patriarch commits his full attention to a battlefield, he projects a fragment of his ancient consciousness into a towering construct of fused flesh, bone, and crystallized Blight. The Avatar is not truly alive — it is a puppet of overwhelming malice, radiating corruption so intense that reality warps around it. Everything it touches withers. Everything near it corrupts. It cannot be reasoned with, demoralized, or stopped by anything less than an army's concentrated fury. Only one may walk the battlefield at a time.",
      type: "War Machine",
      corruption_spread: 5,
      stats: {
        ATK: 27,
        DEF: 6,
        HP: 54,
        MOV: 5,
        RNG: 1,
        MOR: 10
      },
      special: [
        "Corruption",
        "Corruption Aura 4\" (enemies within 4\" gain 2 Corruption tokens at start of your turn)",
        "Blood Harvest (heal 3 HP whenever any unit within 6\" is destroyed)",
        "Apex Terror (all enemy units within 8\" suffer -2 MOR)",
        "Massive",
        "Fearless",
        "Blood-Drunk (auto-pass Morale; cannot voluntarily retreat)",
        "Legendary (one per army)"
      ]
    },
  ];
  units.forEach(u => gameData.units.push(u));

  // Fragments
  const fragments = [
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
  ];
  fragments.forEach(f => gameData.fragments.push(f));
})();
