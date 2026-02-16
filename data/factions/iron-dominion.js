// Iron Dominion — Faction Data
(function() {
  // Faction definition
  gameData.factions.push(    {
      id: "iron-dominion",
      name: "Iron Dominion",
      icon: "⚙️",
      color: "#e94560",
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
    });

  // Commanders
  const commanders = [
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
        Health: 300,
      },
      battle_stats: { ATK: 15, DEF: 4, HP: 30, MOV: 5, RNG: 6, MOR: 9 },
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
        Health: 270,
      },
      battle_stats: { ATK: 15, DEF: 4, HP: 27, MOV: 9, RNG: 3, MOR: 10 },
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
        Health: 255,
      },
      battle_stats: { ATK: 12, DEF: 3, HP: 27, MOV: 6, RNG: 6, MOR: 9 },
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
        Health: 330,
      },
      battle_stats: { ATK: 18, DEF: 5, HP: 33, MOV: 4, RNG: 3, MOR: 10 },
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
        Health: 240,
      },
      battle_stats: { ATK: 15, DEF: 3, HP: 24, MOV: 8, RNG: 6, MOR: 9 },
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
        Health: 285,
      },
      battle_stats: { ATK: 15, DEF: 4, HP: 30, MOV: 5, RNG: 6, MOR: 9 },
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
        Health: 360,
      },
      battle_stats: { ATK: 18, DEF: 5, HP: 36, MOV: 6, RNG: 1, MOR: 10 },
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
        Health: 255,
      },
      battle_stats: { ATK: 15, DEF: 3, HP: 27, MOV: 7, RNG: 6, MOR: 9 },
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
        Health: 300,
      },
      battle_stats: { ATK: 15, DEF: 4, HP: 30, MOV: 4, RNG: 3, MOR: 10 },
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
        Health: 390,
      },
      battle_stats: { ATK: 15, DEF: 5, HP: 39, MOV: 5, RNG: 3, MOR: 10 },
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
        Health: 270,
      },
      battle_stats: { ATK: 15, DEF: 4, HP: 27, MOV: 7, RNG: 6, MOR: 9 },
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
        Health: 300,
      },
      battle_stats: { ATK: 15, DEF: 4, HP: 30, MOV: 6, RNG: 3, MOR: 10 },
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
        Health: 300,
      },
      battle_stats: { ATK: 15, DEF: 4, HP: 30, MOV: 7, RNG: 3, MOR: 9 },
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
  ];
  commanders.forEach(c => gameData.commanders.push(c));

  // Units
  const units = [
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
      stats: { ATK: 6, DEF: 3, HP: 3, MOV: 5, RNG: 1, MOR: 6 },
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
      stats: { ATK: 6, DEF: 4, HP: 6, MOV: 5, RNG: 1, MOR: 10 },
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
      stats: { ATK: 9, DEF: 3, HP: 6, MOV: 6, RNG: 1, MOR: 7 },
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
      stats: { ATK: 3, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 7 },
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
      stats: { ATK: 12, DEF: 4, HP: 6, MOV: 5, RNG: 1, MOR: 8 },
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
      stats: { ATK: 3, DEF: 3, HP: 3, MOV: 8, RNG: 8, MOR: 5 },
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
      stats: { ATK: 12, DEF: 3, HP: 6, MOV: 3, RNG: 24, MOR: 7 },
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
      stats: { ATK: 9, DEF: 4, HP: 9, MOV: 4, RNG: 1, MOR: 8 },
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
      stats: { ATK: 9, DEF: 4, HP: 6, MOV: 5, RNG: 1, MOR: 7 },
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
      stats: { ATK: 9, DEF: 4, HP: 6, MOV: 6, RNG: 1, MOR: 8 },
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
      stats: { ATK: 12, DEF: 3, HP: 9, MOV: 5, RNG: 1, MOR: 10 },
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
      stats: { ATK: 6, DEF: 3, HP: 3, MOV: 5, RNG: 18, MOR: 6 },
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
      stats: { ATK: 3, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 7 },
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
      stats: { ATK: 3, DEF: 3, HP: 6, MOV: 5, RNG: 12, MOR: 7 },
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
      stats: { ATK: 3, DEF: 3, HP: 3, MOV: 4, RNG: 1, MOR: 5 },
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
      stats: { ATK: 3, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 7 },
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
      stats: { ATK: 9, DEF: 3, HP: 6, MOV: 5, RNG: 8, MOR: 7 },
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
      stats: { ATK: 9, DEF: 4, HP: 6, MOV: 9, RNG: 1, MOR: 7 },
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
      stats: { ATK: 9, DEF: 3, HP: 3, MOV: 5, RNG: 18, MOR: 7 },
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
      stats: { ATK: 3, DEF: 3, HP: 3, MOV: 5, RNG: 1, MOR: 7 },
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
      stats: { ATK: 6, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 7 },
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
      stats: { ATK: 6, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 7 },
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
      stats: { ATK: 3, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 7 },
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
      stats: { ATK: 9, DEF: 3, HP: 6, MOV: 5, RNG: 10, MOR: 7 },
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
      stats: { ATK: 6, DEF: 3, HP: 6, MOV: 10, RNG: 8, MOR: 7 },
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
      stats: { ATK: 6, DEF: 3, HP: 6, MOV: 7, RNG: 1, MOR: 7 },
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
      stats: { ATK: 12, DEF: 3, HP: 6, MOV: 6, RNG: 1, MOR: 7 },
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
      stats: { ATK: 6, DEF: 5, HP: 9, MOV: 4, RNG: 1, MOR: 8 },
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
      stats: { ATK: 15, DEF: 2, HP: 6, MOV: 6, RNG: 3, MOR: 10 },
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
      stats: { ATK: 9, DEF: 3, HP: 6, MOV: 4, RNG: 16, MOR: 7 },
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
      stats: { ATK: 3, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 7 },
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
      stats: { ATK: 6, DEF: 5, HP: 9, MOV: 3, RNG: 1, MOR: 8 },
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
      stats: { ATK: 6, DEF: 3, HP: 3, MOV: 5, RNG: 20, MOR: 7 },
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
      stats: { ATK: 6, DEF: 3, HP: 6, MOV: 8, RNG: 8, MOR: 7 },
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
      stats: { ATK: 15, DEF: 3, HP: 9, MOV: 3, RNG: 24, MOR: 7 },
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
      stats: { ATK: 12, DEF: 3, HP: 6, MOV: 6, RNG: 1, MOR: 7 },
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
      stats: { ATK: 9, DEF: 4, HP: 9, MOV: 5, RNG: 1, MOR: 9 },
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
      stats: { ATK: 3, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 7 },
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
      stats: { ATK: 3, DEF: 3, HP: 3, MOV: 5, RNG: 1, MOR: 6 },
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
      stats: { ATK: 6, DEF: 4, HP: 6, MOV: 5, RNG: 1, MOR: 7 },
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
      stats: { ATK: 3, DEF: 3, HP: 6, MOV: 5, RNG: 1, MOR: 7 },
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
      stats: { ATK: 21, DEF: 5, HP: 30, MOV: 4, RNG: 1, MOR: 10 },
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
      stats: { ATK: 18, DEF: 5, HP: 24, MOV: 3, RNG: 24, MOR: 10 },
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
      stats: { ATK: 21, DEF: 4, HP: 24, MOV: 4, RNG: 20, MOR: 10 },
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
      stats: { ATK: 21, DEF: 4, HP: 24, MOV: 6, RNG: 1, MOR: 10 },
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
      stats: { ATK: 24, DEF: 5, HP: 36, MOV: 4, RNG: 3, MOR: 10 },
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
      stats: { ATK: 18, DEF: 4, HP: 21, MOV: 7, RNG: 1, MOR: 10 },
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
      stats: { ATK: 18, DEF: 4, HP: 24, MOV: 10, RNG: 8, MOR: 10 },
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
      stats: { ATK: 18, DEF: 5, HP: 27, MOV: 3, RNG: 18, MOR: 10 },
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
      stats: { ATK: 18, DEF: 5, HP: 27, MOV: 4, RNG: 1, MOR: 10 },
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
      stats: { ATK: 15, DEF: 5, HP: 30, MOV: 5, RNG: 12, MOR: 10 },
      special: [
        "Grid Anchor",
        "Time Warp (once per game: take an extra full turn immediately after this one)",
        "Temporal Shield (+2 DEF for 1 turn, then 0 DEF next turn)",
        "Fearless",
        "Unstable",
      ],
    },

  ];
  units.forEach(u => gameData.units.push(u));

  // Fragments
  const fragments = [
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
  ];
  fragments.forEach(f => gameData.fragments.push(f));
})();
