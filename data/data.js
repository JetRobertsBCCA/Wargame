const gameData = {
    "factions": [
        {
            "id": "iron-dominion",
            "name": "Iron Dominion",
            "theme": "Human/clockwork hybrid, steampunk, fragment-infused",
            "flavor_text": "The Iron Dominion marches to the rhythm of pistons and steam. Each soldier, each machine, is a cog in a greater design—yet within the fragments they have harnessed lies the unpredictable pulse of the cosmos. Those who master Knowledge bend the battlefield to their will; those who embrace Chaos let fragments carve new realities. Few survive to see which path will prevail.",
            "motif_description": "Human/clockwork hybrid steampunk faction. Industrial, mechanical, cold, and precise. Integrates fragment technology into weapons, armor, and constructs.",
            "core_philosophy": "Focused on Knowledge vs Chaos mechanics. Highly disciplined, tactical, and strategic, but fragment tech introduces risk/reward mechanics.",
            "faction_bonuses": [
                "All mechanical units gain +1 durability",
                "War machines cost 1 less point when led by a Knowledge commander",
                "Fragment instability effects reduced by 10% faction-wide",
                "Engineers can repair 1 HP per turn to adjacent units"
            ],
            "playstyle_notes": "The Iron Dominion excels at combined arms tactics, mixing durable infantry with devastating war machines. Choose your evolution path carefully—Knowledge provides stability and control, while Chaos unlocks raw power at great risk."
        }
    ],
    "commanders": [
        {
            "name": "Lord Calculon",
            "faction": "iron-dominion",
            "title": "The Gear-Hearted",
            "flavor_text": "Once a man of flesh, now a being of perfect logic and cold steel. His heart ticks with the precision of a thousand gears, and his mind calculates victory before the battle begins.",
            "theme": "Cold, calculated, tactical genius",
            "personality": "Emotionless, methodical, speaks in precise terms. Values efficiency above all else.",
            "playstyle": "Command-heavy, regiment coordination, war machine efficiency",
            "base_stats": { "Command": 8, "Knowledge": 10, "Leadership": 7, "Agility": 5, "Health": 100 },
            "level_1_deck": {
                "command": ["Strategic Advance", "Coordinated Assault"],
                "tech": ["Gear Synchronization", "Precision Calibration"],
                "fragment": ["Stable Core Activation"],
                "tactical": ["Calculated Strike"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Enhanced Calculations (+1 Command)", "chaos": "Fragment Surge (risk: +2 attack, -1 stability)", "tactical": "Quick Deployment"},
                "level_3": {"knowledge": "Predictive Algorithms", "chaos": "Unstable Amplification", "tactical": "Flanking Protocols"},
                "level_4": {"knowledge": "Master Tactician", "chaos": "Chaos Conduit", "tactical": "Rapid Response"},
                "level_5": {"knowledge": "Perfect Formation", "chaos": "Reality Bend", "tactical": "Multi-Front Assault"},
                "level_6": {"knowledge": "Clockwork Precision", "chaos": "Fragment Storm", "tactical": "Tactical Superiority"},
                "level_7": {"knowledge": "War Machine Mastery", "chaos": "Unstable Overcharge", "tactical": "Combined Arms"},
                "level_8": {"knowledge": "Strategic Dominance", "chaos": "Chaotic Empowerment", "tactical": "Battlefield Control"},
                "level_9": {"knowledge": "Analytical Perfection", "chaos": "Fragment Overload", "tactical": "Supreme Command"},
                "level_10": {"knowledge": "Ascended Calculator", "chaos": "Chaos Avatar", "tactical": "Grand Strategist"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Master Strategist",
                    "description": "Precise command, stable fragment boosts. All units gain +1 to hit, war machines activate with 100% reliability.",
                    "abilities": ["Perfect Coordination", "Stable Fragment Aura", "Calculated Victory"],
                    "fragment_interaction": "All fragment effects are predictable and maximized without instability",
                    "unit_synergy": "Gearwright Engineers repair twice as fast; Elite Vanguard gain guaranteed critical hits"
                },
                "chaos": {
                    "name": "Fragment Conduit",
                    "description": "Risky fragment effects, battlefield warping. High variance but devastating potential.",
                    "abilities": ["Reality Warp", "Unstable Surge", "Chaos Unleashed"],
                    "fragment_interaction": "Fragment effects are doubled but have 30% chance of backfire",
                    "unit_synergy": "Experimental Constructs gain +3 attack; Fragment Swarm Units multiply unpredictably"
                },
                "hybrid": {
                    "name": "Hybrid Architect",
                    "description": "Balanced command and fragment manipulation. Moderate power with occasional surprises.",
                    "abilities": ["Adaptive Strategy", "Controlled Chaos", "Balanced Approach"],
                    "fragment_interaction": "Fragment effects are 75% strength with only 10% instability chance",
                    "unit_synergy": "All units gain minor buffs; no penalties but no exceptional bonuses"
                }
            },
            "signature_units": ["Gearwright Engineers"],
            "strategic_notes": "Lord Calculon excels in large-scale battles where coordination matters. Pair him with artillery and war machines for optimal results. Avoid chaos evolution unless you enjoy gambling.",
            "tags": ["knowledge-heavy", "strategic", "war-machine-focus"]
        },
        {
            "name": "Lady Cogsworth",
            "faction": "iron-dominion",
            "title": "The Swiftblade",
            "flavor_text": "Speed is her doctrine, surprise her sacrament. Where others see a battlefield, she sees a chessboard—and she's already three moves ahead.",
            "theme": "Rapid deployment & battlefield mobility",
            "personality": "Quick-witted, impatient, thrives on momentum. Prefers to strike before enemies can react.",
            "playstyle": "Fast assaults, scouts/recon, fragment-assisted flanking",
            "base_stats": { "Command": 7, "Knowledge": 6, "Leadership": 8, "Agility": 9, "Health": 90 },
            "level_1_deck": {
                "command": ["Swift Advance", "Flanking Maneuver"],
                "tech": ["Speed Boost Module", "Rapid Deployment"],
                "fragment": ["Aether Pulse Activation"],
                "tactical": ["Lightning Strike"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Predictive Movement", "chaos": "Unstable Speed Burst", "tactical": "Scout Enhancement"},
                "level_3": {"knowledge": "Precision Flanking", "chaos": "Chaotic Charge", "tactical": "Hit and Run"},
                "level_4": {"knowledge": "Calculated Assault", "chaos": "Fragment Sprint", "tactical": "Ambush Tactics"},
                "level_5": {"knowledge": "Strategic Mobility", "chaos": "Warp Speed", "tactical": "Multi-Pronged Attack"},
                "level_6": {"knowledge": "Perfect Positioning", "chaos": "Reality Dash", "tactical": "Cavalry Mastery"},
                "level_7": {"knowledge": "Controlled Speed", "chaos": "Unstable Momentum", "tactical": "Blitz Assault"},
                "level_8": {"knowledge": "Master Scout", "chaos": "Fragment Surge", "tactical": "Rapid Dominance"},
                "level_9": {"knowledge": "Swift Precision", "chaos": "Chaos Velocity", "tactical": "Lightning War"},
                "level_10": {"knowledge": "Precision Tactician", "chaos": "Unstable Skirmisher", "tactical": "Supreme Mobility"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Precision Tactician",
                    "description": "Predictive strikes, stable boosts. Always knows where to be.",
                    "abilities": ["Predictive Strike", "Stable Speed Aura", "Perfect Timing"],
                    "fragment_interaction": "Aether Pulse effects are 100% reliable",
                    "unit_synergy": "Clockwork Cavalry gain +2 movement; scouts reveal entire battlefield"
                },
                "chaos": {
                    "name": "Unstable Skirmisher",
                    "description": "High-speed, random AoE effects. Unpredictable but devastating charges.",
                    "abilities": ["Chaotic Sprint", "Random Strike Zone", "Unstable Blitz"],
                    "fragment_interaction": "Speed fragments can teleport units but destination is random",
                    "unit_synergy": "Steam Recon Flyers can attack twice but may crash"
                },
                "hybrid": {
                    "name": "Adaptive Commander",
                    "description": "Moderate mobility + fragment effects. Good overall flexibility.",
                    "abilities": ["Adaptive Movement", "Controlled Burst", "Flexible Tactics"],
                    "fragment_interaction": "Speed boosts are reliable with occasional bonus effects",
                    "unit_synergy": "All mobile units gain +1 movement"
                }
            },
            "signature_units": ["Clockwork Cavalry", "Steam Recon Flyers"],
            "strategic_notes": "Lady Cogsworth excels at flanking and disruption. Use her to strike weak points and withdraw before enemies can respond. Ideal for smaller, mobile armies.",
            "tags": ["chaos-heavy", "mobility", "flanking"]
        },
        {
            "name": "Archmagister Gearbane",
            "faction": "iron-dominion",
            "title": "The Fragment Whisperer",
            "flavor_text": "They call him mad. He prefers 'enlightened.' The fragments speak to him in languages the sane cannot comprehend.",
            "theme": "Fragment manipulation & experimental tech",
            "personality": "Eccentric, brilliant, obsessed with fragment research. Sees instability as opportunity.",
            "playstyle": "Risk/reward fragment specialist, high chaos potential",
            "base_stats": { "Command": 5, "Knowledge": 10, "Leadership": 6, "Agility": 6, "Health": 85 },
            "level_1_deck": {
                "command": ["Fragment Command"],
                "tech": ["Experimental Protocol", "Unstable Enhancement"],
                "fragment": ["Fragment Surge", "Reality Manipulation", "Chaos Tap"],
                "tactical": ["Calculated Risk"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Fragment Study", "chaos": "Unstable Experiment", "tactical": "Risk Assessment"},
                "level_3": {"knowledge": "Controlled Experimentation", "chaos": "Wild Fragment", "tactical": "Tactical Instability"},
                "level_4": {"knowledge": "Fragment Mastery", "chaos": "Chaos Infusion", "tactical": "Calculated Chaos"},
                "level_5": {"knowledge": "Stable Manipulation", "chaos": "Reality Tear", "tactical": "Strategic Risk"},
                "level_6": {"knowledge": "Perfect Control", "chaos": "Fragment Storm", "tactical": "Balanced Instability"},
                "level_7": {"knowledge": "Scientific Method", "chaos": "Unbridled Power", "tactical": "Controlled Explosion"},
                "level_8": {"knowledge": "Fragment Harmony", "chaos": "Chaos Ascension", "tactical": "Risk Mastery"},
                "level_9": {"knowledge": "Unified Theory", "chaos": "Reality Break", "tactical": "Strategic Chaos"},
                "level_10": {"knowledge": "Controlled Technomancer", "chaos": "Fragment Overlord", "tactical": "Chaotic Engineer"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Controlled Technomancer",
                    "description": "Maximum fragment power with zero instability. The scientist's dream.",
                    "abilities": ["Perfect Fragment Control", "Stable Experimentation", "Predictable Power"],
                    "fragment_interaction": "All fragments operate at 150% power with no risk",
                    "unit_synergy": "Experimental Constructs become reliable; Arcane Tinkerers boost all nearby fragments"
                },
                "chaos": {
                    "name": "Fragment Overlord",
                    "description": "Embraces instability for devastating power. The battlefield becomes his laboratory.",
                    "abilities": ["Reality Shatter", "Fragment Cascade", "Chaos Overload"],
                    "fragment_interaction": "Fragment effects can chain to multiple targets but are completely unpredictable",
                    "unit_synergy": "All fragment-touched units deal 2x damage but may explode"
                },
                "hybrid": {
                    "name": "Chaotic Engineer",
                    "description": "Balances experimentation with reliability. Takes calculated risks.",
                    "abilities": ["Controlled Experiment", "Managed Chaos", "Scientific Risk"],
                    "fragment_interaction": "Fragment power is enhanced with only moderate instability",
                    "unit_synergy": "Experimental units gain +1 to all stats with 15% instability"
                }
            },
            "signature_units": ["Experimental Constructs", "Fragment Swarm Units"],
            "strategic_notes": "Archmagister Gearbane is the most fragment-focused commander. Build around fragment interactions and accept that some battles will go very right or very wrong.",
            "tags": ["chaos-heavy", "fragment-specialist", "experimental"]
        },
        {
            "name": "Commander Ironweld",
            "faction": "iron-dominion",
            "title": "The Colossus Handler",
            "flavor_text": "Where Ironweld walks, titans follow. His war machines are not mere tools—they are extensions of his iron will.",
            "theme": "Heavy mechanized assaults, war machine mastery",
            "personality": "Patient, methodical, speaks rarely but with authority. Treats war machines like children.",
            "playstyle": "Slow but devastating, area control, high-point war machine focus",
            "base_stats": { "Command": 9, "Knowledge": 5, "Leadership": 8, "Agility": 4, "Health": 110 },
            "level_1_deck": {
                "command": ["War Machine Command", "Heavy Assault Order"],
                "tech": ["Titan Maintenance", "Overclock Protocol", "Armor Enhancement"],
                "fragment": ["Overclock Node Activation"],
                "tactical": ["Crushing Advance"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Machine Efficiency", "chaos": "Overclock Risk", "tactical": "Heavy Support"},
                "level_3": {"knowledge": "Stable Engines", "chaos": "Power Surge", "tactical": "Titan Tactics"},
                "level_4": {"knowledge": "Perfect Maintenance", "chaos": "Unstable Core", "tactical": "Combined Arms"},
                "level_5": {"knowledge": "War Machine Mastery", "chaos": "Fragment Overload", "tactical": "Siege Warfare"},
                "level_6": {"knowledge": "Efficient Operation", "chaos": "Chaotic Power", "tactical": "Area Denial"},
                "level_7": {"knowledge": "Reliability", "chaos": "Double Output", "tactical": "Battlefield Control"},
                "level_8": {"knowledge": "Machine Perfection", "chaos": "Maximum Overdrive", "tactical": "Strategic Deployment"},
                "level_9": {"knowledge": "Titan Bond", "chaos": "Chaos Engines", "tactical": "Iron Wall"},
                "level_10": {"knowledge": "Mechanized Strategist", "chaos": "Overclocked Destroyer", "tactical": "Iron Juggernaut"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Mechanized Strategist",
                    "description": "Stable war machines with perfect reliability. Maximum efficiency.",
                    "abilities": ["Perfect Machine Bond", "Stable Overclock", "Efficient Destruction"],
                    "fragment_interaction": "Overclock effects never misfire and last twice as long",
                    "unit_synergy": "All war machines gain +2 durability and cost 2 fewer points"
                },
                "chaos": {
                    "name": "Overclocked Destroyer",
                    "description": "High-risk AoE devastation. War machines become unstable death dealers.",
                    "abilities": ["Maximum Overclock", "Unstable Titan", "Explosive Finale"],
                    "fragment_interaction": "War machines deal 2x damage but have 25% chance to malfunction each turn",
                    "unit_synergy": "Clockwork Titan gains AoE explosion on death; all war machines ignore armor"
                },
                "hybrid": {
                    "name": "Iron Juggernaut",
                    "description": "Balanced power and reliability. The safest heavy approach.",
                    "abilities": ["Reinforced Chassis", "Controlled Power", "Steady Advance"],
                    "fragment_interaction": "Overclock effects are enhanced with only 10% risk",
                    "unit_synergy": "War machines gain +1 attack and +1 durability"
                }
            },
            "signature_units": ["Clockwork Titan", "Steam Colossus"],
            "strategic_notes": "Commander Ironweld is THE war machine commander. Invest heavily in titans and use infantry only as screens. Slow but unstoppable when built correctly.",
            "tags": ["war-machine-focus", "heavy", "slow"]
        },
        {
            "name": "Lady Brassveil",
            "faction": "iron-dominion",
            "title": "The Shadow Mechanic",
            "flavor_text": "In the fog of war, she is the fog. Her enemies see nothing until it's far too late.",
            "theme": "Tactical deception & sabotage",
            "personality": "Mysterious, calculating, speaks in riddles. Enjoys watching carefully laid plans unfold.",
            "playstyle": "Stealth units, traps, fragment sabotage",
            "base_stats": { "Command": 6, "Knowledge": 8, "Leadership": 7, "Agility": 8, "Health": 80 },
            "level_1_deck": {
                "command": ["Hidden Deployment", "Sabotage Order"],
                "tech": ["Trap Mechanism", "Stealth Field"],
                "fragment": ["Reality Lens Activation", "Disruption Pulse"],
                "tactical": ["Ambush Strike"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Precision Sabotage", "chaos": "Random Disruption", "tactical": "Trap Enhancement"},
                "level_3": {"knowledge": "Calculated Ambush", "chaos": "Chaotic Interference", "tactical": "Stealth Mastery"},
                "level_4": {"knowledge": "Perfect Timing", "chaos": "Wild Sabotage", "tactical": "Infiltration"},
                "level_5": {"knowledge": "Strategic Disruption", "chaos": "Fragment Corruption", "tactical": "Deep Strike"},
                "level_6": {"knowledge": "Master Planner", "chaos": "Unstable Traps", "tactical": "Covert Operations"},
                "level_7": {"knowledge": "Predictive Sabotage", "chaos": "Chaos Bombs", "tactical": "Shadow War"},
                "level_8": {"knowledge": "Perfect Disruption", "chaos": "Random Devastation", "tactical": "Total Infiltration"},
                "level_9": {"knowledge": "Surgical Precision", "chaos": "Explosive Chaos", "tactical": "Master Infiltrator"},
                "level_10": {"knowledge": "Master Saboteur", "chaos": "Fragment Trickster", "tactical": "Covert Architect"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Master Saboteur",
                    "description": "Precise disruption at the perfect moment. Nothing is left to chance.",
                    "abilities": ["Perfect Sabotage", "Predictive Ambush", "Calculated Disruption"],
                    "fragment_interaction": "Can disable enemy fragment effects for 2 turns",
                    "unit_synergy": "Infiltrators always succeed; traps deal 2x damage"
                },
                "chaos": {
                    "name": "Fragment Trickster",
                    "description": "Unpredictable sabotage that even she can't fully control.",
                    "abilities": ["Random Disruption Field", "Chaotic Trap", "Fragment Corruption"],
                    "fragment_interaction": "Can redirect fragment effects to random targets",
                    "unit_synergy": "Sappers may plant extra traps randomly; infiltrators cause chain reactions"
                },
                "hybrid": {
                    "name": "Covert Architect",
                    "description": "Mixed effects with reliable core sabotage.",
                    "abilities": ["Controlled Chaos", "Reliable Infiltration", "Strategic Traps"],
                    "fragment_interaction": "Sabotage effects are enhanced with controlled randomness",
                    "unit_synergy": "All stealth units gain +1 attack; traps have 75% chance of bonus effect"
                }
            },
            "signature_units": ["Aether Infiltrators", "Mechanical Sappers"],
            "strategic_notes": "Lady Brassveil excels at disrupting enemy plans. Use her when facing stronger armies—she can level the playing field through sabotage.",
            "tags": ["stealth", "sabotage", "defensive"]
        },
        {
            "name": "High Engineer Vortan",
            "faction": "iron-dominion",
            "title": "The Fortifier",
            "flavor_text": "Give him time, and he will build a fortress from scrap. Give him more time, and that fortress will have cannons.",
            "theme": "Battlefield engineers & fortifications",
            "personality": "Thoughtful, creative, always planning the next improvement. Never satisfied with 'good enough.'",
            "playstyle": "Defensive bonuses, unit synergy, fragment-enhanced repair",
            "base_stats": { "Command": 7, "Knowledge": 8, "Leadership": 7, "Agility": 5, "Health": 95 },
            "level_1_deck": {
                "command": ["Fortification Order", "Engineer Deployment"],
                "tech": ["Rapid Construction", "Repair Protocol", "Defensive Enhancement"],
                "fragment": ["Steam Core Activation"],
                "tactical": ["Defensive Posture"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Efficient Construction", "chaos": "Unstable Structures", "tactical": "Quick Fortify"},
                "level_3": {"knowledge": "Stable Foundations", "chaos": "Explosive Materials", "tactical": "Field Repairs"},
                "level_4": {"knowledge": "Perfect Defense", "chaos": "Chaotic Construction", "tactical": "Mobile Fortifications"},
                "level_5": {"knowledge": "Engineering Excellence", "chaos": "Fragment-Infused Walls", "tactical": "Tactical Barriers"},
                "level_6": {"knowledge": "Master Builder", "chaos": "Unstable Upgrades", "tactical": "Defensive Network"},
                "level_7": {"knowledge": "Fortress Protocol", "chaos": "Chaos Engineering", "tactical": "Combined Defense"},
                "level_8": {"knowledge": "Perfect Repairs", "chaos": "Explosive Defenses", "tactical": "Strategic Fortification"},
                "level_9": {"knowledge": "Ultimate Fortification", "chaos": "Reality-Bent Walls", "tactical": "Defensive Mastery"},
                "level_10": {"knowledge": "Fortress Architect", "chaos": "Unstable Builder", "tactical": "Tactical Innovator"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Fortress Architect",
                    "description": "Creates impenetrable defenses. Enemies break against his walls.",
                    "abilities": ["Perfect Fortification", "Instant Repair", "Unbreakable Walls"],
                    "fragment_interaction": "Steam Core fragments provide permanent armor bonuses",
                    "unit_synergy": "Engineers build twice as fast; all structures have 2x HP"
                },
                "chaos": {
                    "name": "Unstable Builder",
                    "description": "Creates powerful but unpredictable structures. May explode spectacularly.",
                    "abilities": ["Explosive Walls", "Chaotic Repair", "Unstable Enhancement"],
                    "fragment_interaction": "Fortifications can explode when destroyed, damaging nearby enemies",
                    "unit_synergy": "Structures may randomly upgrade or collapse"
                },
                "hybrid": {
                    "name": "Tactical Innovator",
                    "description": "Balanced construction with moderate enhancements.",
                    "abilities": ["Adaptive Construction", "Controlled Enhancement", "Flexible Defense"],
                    "fragment_interaction": "Structures gain random minor bonuses safely",
                    "unit_synergy": "All constructions gain +1 to a random stat"
                }
            },
            "signature_units": ["Clockwork Engineers", "Overclocked Engineers"],
            "strategic_notes": "High Engineer Vortan is the premier defensive commander. Use him to hold objectives or deny terrain. Combine with artillery for a fortress-and-fire strategy.",
            "tags": ["defensive", "engineering", "fortification"]
        },
        {
            "name": "General Steamjaw",
            "faction": "iron-dominion",
            "title": "The Brass Fist",
            "flavor_text": "Subtlety is for cowards. Steamjaw believes the shortest path to victory is through the enemy's front line.",
            "theme": "Brutal aggression & direct assault",
            "personality": "Loud, aggressive, leads from the front. Respects only strength and courage.",
            "playstyle": "Frontline heavy hitter, fragment boosts melee, smaller tactical flexibility",
            "base_stats": { "Command": 9, "Knowledge": 4, "Leadership": 9, "Agility": 6, "Health": 120 },
            "level_1_deck": {
                "command": ["Charge Order", "Brutal Assault"],
                "tech": ["Melee Enhancement", "Adrenaline Surge"],
                "fragment": ["Infused Cog Activation"],
                "tactical": ["All-Out Attack", "Overwhelming Force"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Efficient Assault", "chaos": "Reckless Charge", "tactical": "Shock Tactics"},
                "level_3": {"knowledge": "Controlled Aggression", "chaos": "Berserk Rage", "tactical": "Breakthrough"},
                "level_4": {"knowledge": "Precise Strike", "chaos": "Wild Swing", "tactical": "Momentum"},
                "level_5": {"knowledge": "Strategic Assault", "chaos": "Fragment Fury", "tactical": "Shock and Awe"},
                "level_6": {"knowledge": "Calculated Brutality", "chaos": "Unstable Rage", "tactical": "Front Line Mastery"},
                "level_7": {"knowledge": "Disciplined Force", "chaos": "Chaos Rampage", "tactical": "Iron Will"},
                "level_8": {"knowledge": "Perfect Assault", "chaos": "Maximum Destruction", "tactical": "Unstoppable Advance"},
                "level_9": {"knowledge": "Master Warrior", "chaos": "Fragment Berserker", "tactical": "Legendary Charge"},
                "level_10": {"knowledge": "Efficient Warlord", "chaos": "Rampaging Conduit", "tactical": "Balanced Enforcer"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Efficient Warlord",
                    "description": "Controlled aggression with maximum efficiency. Every blow counts.",
                    "abilities": ["Precision Assault", "Calculated Charge", "Efficient Destruction"],
                    "fragment_interaction": "Melee fragments provide stable +3 attack bonus",
                    "unit_synergy": "Elite Vanguard gain guaranteed criticals; Infantry never flee"
                },
                "chaos": {
                    "name": "Rampaging Conduit",
                    "description": "Uncontrollable destruction. Allies and enemies alike should fear.",
                    "abilities": ["Berserk Rage", "Fragment Fury", "Unstoppable Rampage"],
                    "fragment_interaction": "Melee damage doubled but may hit friendly units",
                    "unit_synergy": "All melee units gain +3 attack but -2 defense"
                },
                "hybrid": {
                    "name": "Balanced Enforcer",
                    "description": "Aggressive but controlled. A fist in an iron glove.",
                    "abilities": ["Controlled Power", "Disciplined Assault", "Balanced Aggression"],
                    "fragment_interaction": "Melee boosts are enhanced with minimal risk",
                    "unit_synergy": "Melee units gain +2 attack with no penalties"
                }
            },
            "signature_units": ["Elite Vanguard", "Steam Shock Infantry"],
            "strategic_notes": "General Steamjaw is the aggressive melee commander. Use him with elite infantry and charge straight at the enemy. Not subtle, but effective.",
            "tags": ["aggressive", "melee", "frontline"]
        },
        {
            "name": "Lady Aetheris",
            "faction": "iron-dominion",
            "title": "The Fragment Sage",
            "flavor_text": "She walks between worlds, one foot in reality and one in the aether. The fragments are not tools to her—they are friends.",
            "theme": "Aether/fragment manipulation expert",
            "personality": "Serene, mysterious, speaks of fragments as living things. Seems to know things before they happen.",
            "playstyle": "Enhances fragment units, mid-tier destabilization",
            "base_stats": { "Command": 6, "Knowledge": 9, "Leadership": 7, "Agility": 7, "Health": 85 },
            "level_1_deck": {
                "command": ["Aether Command"],
                "tech": ["Fragment Attunement", "Aether Enhancement"],
                "fragment": ["Aether Pulse", "Fragment Harmony", "Resonance Field"],
                "tactical": ["Aether Strike"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Fragment Attunement", "chaos": "Aether Surge", "tactical": "Energy Manipulation"},
                "level_3": {"knowledge": "Stable Aether", "chaos": "Wild Resonance", "tactical": "Tactical Aether"},
                "level_4": {"knowledge": "Perfect Harmony", "chaos": "Chaotic Aether", "tactical": "Energy Control"},
                "level_5": {"knowledge": "Fragment Mastery", "chaos": "Unstable Power", "tactical": "Aether Tactics"},
                "level_6": {"knowledge": "Sage Wisdom", "chaos": "Fragment Storm", "tactical": "Energy Network"},
                "level_7": {"knowledge": "Perfect Control", "chaos": "Chaos Wave", "tactical": "Aether Mastery"},
                "level_8": {"knowledge": "Fragment Unity", "chaos": "Reality Tear", "tactical": "Strategic Energy"},
                "level_9": {"knowledge": "Aether Perfection", "chaos": "Chaotic Ascension", "tactical": "Energy Dominance"},
                "level_10": {"knowledge": "Aether Strategist", "chaos": "Fragment Catalyst", "tactical": "Aether Architect"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Aether Strategist",
                    "description": "Perfect control over fragment energy. Stability and efficiency personified.",
                    "abilities": ["Fragment Harmony", "Stable Aether Field", "Predictive Manipulation"],
                    "fragment_interaction": "All fragment effects are 50% stronger with zero instability",
                    "unit_synergy": "Aether Infused Soldiers become elite; all fragment units heal 1 HP per turn"
                },
                "chaos": {
                    "name": "Fragment Catalyst",
                    "description": "Amplifies fragment instability for devastating effects.",
                    "abilities": ["Aether Explosion", "Unstable Cascade", "Reality Warp"],
                    "fragment_interaction": "Can trigger fragment chain reactions across the battlefield",
                    "unit_synergy": "Fragment units deal AoE damage on death; may spawn fragment anomalies"
                },
                "hybrid": {
                    "name": "Aether Architect",
                    "description": "Balanced fragment manipulation with controlled enhancement.",
                    "abilities": ["Controlled Enhancement", "Stable Surge", "Balanced Power"],
                    "fragment_interaction": "Fragment effects are moderately enhanced with low risk",
                    "unit_synergy": "All aether units gain +1 to all stats"
                }
            },
            "signature_units": ["Aether Infused Soldiers", "Aether Blasters"],
            "strategic_notes": "Lady Aetheris is the fragment enhancement specialist. Use her when you want to maximize fragment effects without Archmagister Gearbane's extreme risks.",
            "tags": ["fragment-specialist", "aether", "balanced"]
        },
        {
            "name": "Lord Piston",
            "faction": "iron-dominion",
            "title": "The Bombardier King",
            "flavor_text": "Every problem can be solved with sufficient explosive force. Lord Piston has plenty to spare.",
            "theme": "Heavy artillery & siege master",
            "personality": "Boisterous, loves explosions, takes pride in precision destruction. Surprisingly caring about his crews.",
            "playstyle": "Long-range control, war machines, fragment-enhanced artillery",
            "base_stats": { "Command": 8, "Knowledge": 7, "Leadership": 8, "Agility": 4, "Health": 100 },
            "level_1_deck": {
                "command": ["Artillery Barrage Order", "Siege Command"],
                "tech": ["Enhanced Ammunition", "Range Extension", "Reload Optimization"],
                "fragment": ["Arcane Spark Activation"],
                "tactical": ["Precision Strike"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Precision Targeting", "chaos": "Wild Bombardment", "tactical": "Quick Reload"},
                "level_3": {"knowledge": "Calculated Barrage", "chaos": "Explosive Chaos", "tactical": "Fire Support"},
                "level_4": {"knowledge": "Perfect Aim", "chaos": "Fragment Shells", "tactical": "Suppression Fire"},
                "level_5": {"knowledge": "Artillery Mastery", "chaos": "Unstable Munitions", "tactical": "Coordinated Fire"},
                "level_6": {"knowledge": "Master Gunner", "chaos": "Chaos Bombardment", "tactical": "Area Denial"},
                "level_7": {"knowledge": "Long Range Precision", "chaos": "Reality Shells", "tactical": "Siege Mastery"},
                "level_8": {"knowledge": "Perfect Barrage", "chaos": "Maximum Destruction", "tactical": "Strategic Bombardment"},
                "level_9": {"knowledge": "Artillery Legend", "chaos": "Cataclysmic Fire", "tactical": "Total Suppression"},
                "level_10": {"knowledge": "Siege Commander", "chaos": "Cataclysmic Artificer", "tactical": "Tactical Bombardier"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Siege Commander",
                    "description": "Perfect artillery precision. Never misses, never wastes ammunition.",
                    "abilities": ["Perfect Aim", "Efficient Bombardment", "Precision Destruction"],
                    "fragment_interaction": "Fragment shells always hit and deal bonus damage",
                    "unit_synergy": "Artillery gains +3 range and +2 damage; can target specific units"
                },
                "chaos": {
                    "name": "Cataclysmic Artificer",
                    "description": "Unstable ammunition for maximum destruction.",
                    "abilities": ["Explosive Chaos", "Fragment Detonation", "Unpredictable Barrage"],
                    "fragment_interaction": "Artillery shells can warp terrain and cause fragment cascades",
                    "unit_synergy": "Artillery AoE is doubled but may hit friendly units"
                },
                "hybrid": {
                    "name": "Tactical Bombardier",
                    "description": "Balanced firepower with controlled enhancement.",
                    "abilities": ["Calculated Fire", "Stable Enhancement", "Strategic Destruction"],
                    "fragment_interaction": "Artillery gains bonus effects with minimal risk",
                    "unit_synergy": "Artillery gains +1 range and +1 damage with 10% bonus effect chance"
                }
            },
            "signature_units": ["Gearwright Artillery", "Steam Artillery Crew"],
            "strategic_notes": "Lord Piston specializes in ranged destruction. Keep him protected and rain fire from afar. Combine with defensive units for a classic artillery fortress.",
            "tags": ["artillery", "ranged", "siege"]
        },
        {
            "name": "Captain Ironclad",
            "faction": "iron-dominion",
            "title": "The Unbreakable Wall",
            "flavor_text": "He has never retreated. He has never broken. Some say he cannot be killed—only delayed.",
            "theme": "Defensive frontline commander",
            "personality": "Stoic, protective, speaks little. Values his soldiers' lives above victory.",
            "playstyle": "Buffs durable units, protects elite regiments, slows enemy",
            "base_stats": { "Command": 8, "Knowledge": 6, "Leadership": 9, "Agility": 5, "Health": 130 },
            "level_1_deck": {
                "command": ["Defensive Formation", "Hold the Line"],
                "tech": ["Armor Enhancement", "Shield Protocol"],
                "fragment": ["Steam Core Activation"],
                "tactical": ["Stalwart Defense", "Iron Will"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Efficient Defense", "chaos": "Unstable Shield", "tactical": "Quick Guard"},
                "level_3": {"knowledge": "Perfect Formation", "chaos": "Chaotic Resistance", "tactical": "Mobile Defense"},
                "level_4": {"knowledge": "Iron Constitution", "chaos": "Fragment Shield", "tactical": "Tactical Retreat"},
                "level_5": {"knowledge": "Unbreakable", "chaos": "Unstable Armor", "tactical": "Defensive Mastery"},
                "level_6": {"knowledge": "Master Guardian", "chaos": "Chaos Barrier", "tactical": "Area Protection"},
                "level_7": {"knowledge": "Perfect Protection", "chaos": "Reality Shield", "tactical": "Combined Defense"},
                "level_8": {"knowledge": "Legendary Defense", "chaos": "Fragment Barrier", "tactical": "Strategic Guard"},
                "level_9": {"knowledge": "Ultimate Guardian", "chaos": "Chaos Fortress", "tactical": "Total Protection"},
                "level_10": {"knowledge": "Master Defender", "chaos": "Fragment Bulwark", "tactical": "Balanced Sentinel"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Master Defender",
                    "description": "Perfect defensive capabilities. Nothing gets through.",
                    "abilities": ["Unbreakable Wall", "Perfect Guard", "Absolute Protection"],
                    "fragment_interaction": "Defensive fragments never fail and provide extra HP",
                    "unit_synergy": "All units in formation gain +3 armor; morale never breaks"
                },
                "chaos": {
                    "name": "Fragment Bulwark",
                    "description": "Creates unpredictable defensive barriers.",
                    "abilities": ["Unstable Shield", "Chaos Guard", "Fragment Wall"],
                    "fragment_interaction": "Defensive fragments can reflect damage back at attackers",
                    "unit_synergy": "Shields may expand randomly; damage reflection possible"
                },
                "hybrid": {
                    "name": "Balanced Sentinel",
                    "description": "Solid defense with moderate enhancement.",
                    "abilities": ["Reliable Guard", "Controlled Protection", "Balanced Defense"],
                    "fragment_interaction": "Defensive bonuses are enhanced with low risk",
                    "unit_synergy": "All defensive units gain +1 armor and +1 HP"
                }
            },
            "signature_units": ["Steam Heavy Guards", "Clockwork Vanguard"],
            "strategic_notes": "Captain Ironclad is the ultimate defensive commander. Use him to hold objectives against superior numbers. Nearly impossible to break through.",
            "tags": ["defensive", "tank", "protective"]
        },
        {
            "name": "Engineer Brassforge",
            "faction": "iron-dominion",
            "title": "The Rapid Prototype",
            "flavor_text": "His inventions are brilliant. His survival rate is concerning. Worth the risk? Usually.",
            "theme": "Rapid tech deployment & experimental constructs",
            "personality": "Enthusiastic, creative, always covered in grease. Treats failures as learning opportunities.",
            "playstyle": "Mid-tier units, fragment-powered engineering, risk/reward setups",
            "base_stats": { "Command": 6, "Knowledge": 8, "Leadership": 7, "Agility": 7, "Health": 90 },
            "level_1_deck": {
                "command": ["Rapid Deployment"],
                "tech": ["Quick Construction", "Prototype Testing", "Emergency Repair"],
                "fragment": ["Experimental Node Activation", "Gear Infusion"],
                "tactical": ["Field Innovation"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Stable Prototyping", "chaos": "Wild Innovation", "tactical": "Quick Build"},
                "level_3": {"knowledge": "Controlled Experimentation", "chaos": "Explosive Prototypes", "tactical": "Field Engineering"},
                "level_4": {"knowledge": "Reliable Design", "chaos": "Unstable Creation", "tactical": "Rapid Iteration"},
                "level_5": {"knowledge": "Engineering Excellence", "chaos": "Chaotic Invention", "tactical": "Tactical Engineering"},
                "level_6": {"knowledge": "Master Designer", "chaos": "Fragment Fusion", "tactical": "Mobile Workshop"},
                "level_7": {"knowledge": "Perfect Efficiency", "chaos": "Unstable Genius", "tactical": "Combat Engineering"},
                "level_8": {"knowledge": "Reliable Innovation", "chaos": "Chaos Engineering", "tactical": "Strategic Design"},
                "level_9": {"knowledge": "Engineering Legend", "chaos": "Reality Forge", "tactical": "Supreme Innovation"},
                "level_10": {"knowledge": "Stable Engineer", "chaos": "Unstable Innovator", "tactical": "Tactical Constructor"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Stable Engineer",
                    "description": "Reliable experimentation with consistent results.",
                    "abilities": ["Perfect Prototype", "Stable Innovation", "Reliable Creation"],
                    "fragment_interaction": "Experimental effects always work as intended",
                    "unit_synergy": "All constructs gain +2 to all stats; no malfunctions"
                },
                "chaos": {
                    "name": "Unstable Innovator",
                    "description": "Brilliant but unpredictable creations.",
                    "abilities": ["Wild Invention", "Chaotic Creation", "Fragment Fusion"],
                    "fragment_interaction": "Constructs gain random powerful abilities but may explode",
                    "unit_synergy": "Experimental units can gain 2x power or self-destruct"
                },
                "hybrid": {
                    "name": "Tactical Constructor",
                    "description": "Balanced innovation with controlled risk.",
                    "abilities": ["Calculated Innovation", "Controlled Experiment", "Balanced Design"],
                    "fragment_interaction": "Experiments are enhanced with moderate risk",
                    "unit_synergy": "Constructs gain +1 to all stats with 15% bonus chance"
                }
            },
            "signature_units": ["Arcane Tinker Battalion", "Experimental Constructs"],
            "strategic_notes": "Engineer Brassforge is the experimental tech commander. Embrace the chaos of innovation or stabilize for reliable results. Good for players who like variety.",
            "tags": ["experimental", "engineering", "innovative"]
        },
        {
            "name": "Lady Mechana",
            "faction": "iron-dominion",
            "title": "The War Machine Whisperer",
            "flavor_text": "She doesn't command war machines. She communes with them. And they respond with devastating loyalty.",
            "theme": "Specialized war machine strategist",
            "personality": "Calm, focused, has an almost spiritual connection to machines. Speaks to constructs as equals.",
            "playstyle": "Focused war machines, boosts efficiency, combines with fragment powers",
            "base_stats": { "Command": 7, "Knowledge": 7, "Leadership": 8, "Agility": 6, "Health": 100 },
            "level_1_deck": {
                "command": ["Machine Command", "Coordinated Machines"],
                "tech": ["Machine Enhancement", "Efficiency Protocol", "Repair Link"],
                "fragment": ["Overclock Node Activation"],
                "tactical": ["Machine Strike"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Machine Bond", "chaos": "Overclock Surge", "tactical": "Quick Activation"},
                "level_3": {"knowledge": "Stable Connection", "chaos": "Wild Power", "tactical": "Tactical Machines"},
                "level_4": {"knowledge": "Perfect Harmony", "chaos": "Unstable Link", "tactical": "Combined Operations"},
                "level_5": {"knowledge": "Machine Mastery", "chaos": "Fragment Overclock", "tactical": "Strategic Machines"},
                "level_6": {"knowledge": "Unity", "chaos": "Chaos Surge", "tactical": "Machine Network"},
                "level_7": {"knowledge": "Perfect Control", "chaos": "Maximum Power", "tactical": "Coordinated Assault"},
                "level_8": {"knowledge": "Machine Legend", "chaos": "Unstable Maximum", "tactical": "Strategic Control"},
                "level_9": {"knowledge": "Ultimate Harmony", "chaos": "Chaos Machines", "tactical": "Total Coordination"},
                "level_10": {"knowledge": "Mechanical Virtuoso", "chaos": "Fragmented Behemoth", "tactical": "Adaptive Mechana"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Mechanical Virtuoso",
                    "description": "Perfect war machine efficiency and reliability.",
                    "abilities": ["Machine Harmony", "Perfect Efficiency", "Stable Power"],
                    "fragment_interaction": "All machine-related fragments are 100% reliable",
                    "unit_synergy": "War machines cost 3 less points and never malfunction"
                },
                "chaos": {
                    "name": "Fragmented Behemoth",
                    "description": "Unstable but devastating war machine power.",
                    "abilities": ["Overclock Overload", "Unstable Power", "Maximum Force"],
                    "fragment_interaction": "War machines deal 3x damage but have 30% malfunction chance",
                    "unit_synergy": "War machines gain AoE attacks; may damage nearby allies"
                },
                "hybrid": {
                    "name": "Adaptive Mechana",
                    "description": "Balanced war machine optimization.",
                    "abilities": ["Flexible Control", "Adaptive Power", "Balanced Machines"],
                    "fragment_interaction": "Machine fragments are enhanced with low risk",
                    "unit_synergy": "War machines gain +2 damage and +1 armor"
                }
            },
            "signature_units": ["Chrono Walker", "Arcane Steam Golem"],
            "strategic_notes": "Lady Mechana is the precision war machine commander. While Ironweld focuses on raw power, she focuses on efficiency. Ideal for point-efficient war machine armies.",
            "tags": ["war-machine-focus", "efficiency", "balanced"]
        },
        {
            "name": "Lord Gearheart",
            "faction": "iron-dominion",
            "title": "The Universal Cog",
            "flavor_text": "Jack of all trades, master of adaptation. Where others specialize, he synthesizes.",
            "theme": "Balanced commander, adaptive tactics",
            "personality": "Pragmatic, flexible, sees value in all approaches. Never commits fully to one strategy.",
            "playstyle": "Versatile, hybrid of fragments, standard units, and war machines",
            "base_stats": { "Command": 7, "Knowledge": 7, "Leadership": 7, "Agility": 7, "Health": 100 },
            "level_1_deck": {
                "command": ["Adaptive Command", "Flexible Orders"],
                "tech": ["Universal Enhancement", "Balanced Protocol"],
                "fragment": ["Core Fragment Activation", "Adaptive Energy"],
                "tactical": ["Strategic Flexibility"]
            },
            "skill_tree": {
                "level_2": {"knowledge": "Calculated Approach", "chaos": "Random Strategy", "tactical": "Adaptability"},
                "level_3": {"knowledge": "Stable Balance", "chaos": "Chaotic Adaptation", "tactical": "Flexible Tactics"},
                "level_4": {"knowledge": "Perfect Balance", "chaos": "Wild Strategy", "tactical": "Universal Training"},
                "level_5": {"knowledge": "Strategic Balance", "chaos": "Unpredictable", "tactical": "Combined Arms Mastery"},
                "level_6": {"knowledge": "Master of Balance", "chaos": "Chaos Flexibility", "tactical": "Adaptive Mastery"},
                "level_7": {"knowledge": "Perfect Synthesis", "chaos": "Random Mastery", "tactical": "Universal Command"},
                "level_8": {"knowledge": "Balanced Legend", "chaos": "Chaos Legend", "tactical": "Strategic Synthesis"},
                "level_9": {"knowledge": "Ultimate Balance", "chaos": "Ultimate Chaos", "tactical": "Total Adaptation"},
                "level_10": {"knowledge": "Tactical Genius", "chaos": "Chaotic Conduit", "tactical": "Universal Architect"}
            },
            "evolution_paths": {
                "knowledge": {
                    "name": "Tactical Genius",
                    "description": "Perfect strategic balance and adaptability.",
                    "abilities": ["Strategic Synthesis", "Perfect Adaptation", "Balanced Excellence"],
                    "fragment_interaction": "Can choose fragment effects each turn for maximum flexibility",
                    "unit_synergy": "All units gain +1 to their primary stat"
                },
                "chaos": {
                    "name": "Chaotic Conduit",
                    "description": "Embraces randomness for unexpected advantages.",
                    "abilities": ["Random Excellence", "Chaotic Adaptation", "Unpredictable Genius"],
                    "fragment_interaction": "Fragment effects are random but always beneficial",
                    "unit_synergy": "Units gain random bonuses each turn"
                },
                "hybrid": {
                    "name": "Universal Architect",
                    "description": "The ultimate balanced commander.",
                    "abilities": ["Total Flexibility", "Adaptive Excellence", "Universal Strategy"],
                    "fragment_interaction": "Fragments provide stable moderate bonuses to all stats",
                    "unit_synergy": "All units gain +1 to all stats; no weaknesses"
                }
            },
            "signature_units": ["Elite Vanguard", "Experimental Constructs"],
            "strategic_notes": "Lord Gearheart is the most flexible commander. He lacks peak performance in any area but has no weaknesses. Ideal for new players learning the game.",
            "tags": ["balanced", "flexible", "versatile"]
        }
    ],
    "units": [
        {"name": "Infantry Regiment", "faction": "iron-dominion", "points_cost": 1, "role": "Core combat", "fragment_interactions": "Minor fragment buffs optional", "flavor_text": "Standard human troops; disciplined formation", "type": "Infantry"},
        {"name": "Clockwork Infantry", "faction": "iron-dominion", "points_cost": 2, "role": "Durable core", "fragment_interactions": "Fragment boosts attack slightly", "flavor_text": "Soldiers with mechanized limbs; immune to morale effects", "type": "Infantry"},
        {"name": "Aether Infused Soldiers", "faction": "iron-dominion", "points_cost": 3, "role": "Mid-tier", "fragment_interactions": "Fragment implants enhance speed/attack; risk of instability", "flavor_text": "Humans with glowing fragment augmentations", "type": "Infantry"},
        {"name": "Gearwright Engineers", "faction": "iron-dominion", "points_cost": 3, "role": "Support", "fragment_interactions": "Repair war machines; fragment manipulation", "flavor_text": "Can build temporary traps or structures", "type": "Support"},
        {"name": "Elite Vanguard", "faction": "iron-dominion", "points_cost": 4, "role": "Heavy hitter", "fragment_interactions": "Fragment boosts tactical strike", "flavor_text": "Small elite unit with high damage output", "type": "Infantry"},
        {"name": "Scouts / Recon", "faction": "iron-dominion", "points_cost": 1, "role": "Fast", "fragment_interactions": "Trigger fragment events; weak in combat", "flavor_text": "Quick, mobile units for exploration", "type": "Scout"},
        {"name": "Steam Artillery Crew", "faction": "iron-dominion", "points_cost": 5, "role": "Ranged support", "fragment_interactions": "Fragment increases AoE damage", "flavor_text": "Operates long-range cannons powered by fragments", "type": "Artillery"},
        {"name": "Siege Infantry", "faction": "iron-dominion", "points_cost": 4, "role": "Breach", "fragment_interactions": "Fragment may cause small area tremors", "flavor_text": "Break walls and fortifications", "type": "Infantry"},
        {"name": "Mechanized Infantry", "faction": "iron-dominion", "points_cost": 3, "role": "Hybrid", "fragment_interactions": "Minor fragment buff", "flavor_text": "Human + small mechanical suit; balanced durability & attack", "type": "Infantry"},
        {"name": "Specialist Hero", "faction": "iron-dominion", "points_cost": 3, "role": "Tier 2", "fragment_interactions": "Fragment ability tied to commander", "flavor_text": "Elite unit triggering tactical zoom-ins", "type": "Specialist"},
        {"name": "Experimental Construct", "faction": "iron-dominion", "points_cost": 4, "role": "Risk/Reward", "fragment_interactions": "May warp battlefield", "flavor_text": "Unstable fragment-driven mechanical constructs", "type": "Infantry"},
        {"name": "Steam-Powered Sharpshooters", "faction": "iron-dominion", "points_cost": 2, "role": "Precision", "fragment_interactions": "Fragment can increase critical chance", "flavor_text": "Long-range rifles, overclockable with fragment energy", "type": "Infantry"},
        {"name": "Clockwork Pioneers", "faction": "iron-dominion", "points_cost": 2, "role": "Utility", "fragment_interactions": "Fragment boosts construction speed", "flavor_text": "Build barricades, traps, and battlefield improvements", "type": "Support"},
        {"name": "Aether Hackers", "faction": "iron-dominion", "points_cost": 3, "role": "Tech / Specialist", "fragment_interactions": "Can manipulate enemy mechanical units", "flavor_text": "Fragment boosts hacking success", "type": "Specialist"},
        {"name": "Steam Miners", "faction": "iron-dominion", "points_cost": 1, "role": "Resource / Support", "fragment_interactions": "Fragment absorption improves efficiency", "flavor_text": "Extract battlefield materials; support units", "type": "Support"},
        {"name": "Arcane Tinkerers", "faction": "iron-dominion", "points_cost": 3, "role": "Fragment Specialists", "fragment_interactions": "Amplify fragment effects nearby; risk of instability", "flavor_text": "Engineers who harness fragments creatively", "type": "Specialist"},
        {"name": "Steam Grenadiers", "faction": "iron-dominion", "points_cost": 3, "role": "AoE", "fragment_interactions": "Fragment increases explosion radius", "flavor_text": "Throw explosive steam grenades", "type": "Infantry"},
        {"name": "Clockwork Cavalry", "faction": "iron-dominion", "points_cost": 4, "role": "Fast assault", "fragment_interactions": "Fragment grants temporary speed boost; risk misfire", "flavor_text": "Mounted mechanical units", "type": "Cavalry"},
        {"name": "Aether Marksmen", "faction": "iron-dominion", "points_cost": 3, "role": "Long-range", "fragment_interactions": "Fragment targeting enhancements", "flavor_text": "Precision rifle units", "type": "Infantry"},
        {"name": "Steam Medic Corps", "faction": "iron-dominion", "points_cost": 2, "role": "Support", "fragment_interactions": "Fragment stabilizes units during healing", "flavor_text": "Heal or repair units and constructs", "type": "Support"},
        {"name": "Gear-Linked Infantry", "faction": "iron-dominion", "points_cost": 2, "role": "Synergy", "fragment_interactions": "Fragment increases coordination", "flavor_text": "Units linked via mechanical network", "type": "Infantry"},
        {"name": "Mechanical Sappers", "faction": "iron-dominion", "points_cost": 3, "role": "Sabotage", "fragment_interactions": "Fragment may trigger unexpected explosions", "flavor_text": "Plant traps or explosives on battlefield", "type": "Support"},
        {"name": "Overclocked Engineers", "faction": "iron-dominion", "points_cost": 3, "role": "Specialist", "fragment_interactions": "Fragment overload increases repair speed", "flavor_text": "Rapid repair at risk of accidental hazards", "type": "Support"},
        {"name": "Clockwork Grenadiers", "faction": "iron-dominion", "points_cost": 3, "role": "AoE", "fragment_interactions": "Fragment may expand blast radius", "flavor_text": "Explosive devices powered by fragments", "type": "Infantry"},
        {"name": "Steam Recon Flyers", "faction": "iron-dominion", "points_cost": 3, "role": "Scout", "fragment_interactions": "Fragment may temporarily warp battlefield vision", "flavor_text": "Mechanical flying units", "type": "Scout"},
        {"name": "Aether Infiltrators", "faction": "iron-dominion", "points_cost": 3, "role": "Stealth", "fragment_interactions": "Fragment may backfire", "flavor_text": "Disable enemy units or traps", "type": "Specialist"},
        {"name": "Gearstorm Infantry", "faction": "iron-dominion", "points_cost": 3, "role": "Shock troops", "fragment_interactions": "Fragment boosts attack, risk of self-damage", "flavor_text": "Aggressive assault units", "type": "Infantry"},
        {"name": "Steam Heavy Guards", "faction": "iron-dominion", "points_cost": 4, "role": "Defensive", "fragment_interactions": "Fragment adds temporary armor", "flavor_text": "Protect elite units or commanders", "type": "Infantry"},
        {"name": "Fragment Swarm Units", "faction": "iron-dominion", "points_cost": 4, "role": "Experimental", "fragment_interactions": "Mini clockwork swarm; high risk/reward", "flavor_text": "Fragment-controlled swarms", "type": "Infantry"},
        {"name": "Aether Blasters", "faction": "iron-dominion", "points_cost": 3, "role": "Ranged", "fragment_interactions": "Fragment-powered cannon", "flavor_text": "Portable fragment cannons; unstable but powerful", "type": "Artillery"},
        {"name": "Clockwork Engineers", "faction": "iron-dominion", "points_cost": 2, "role": "Utility", "fragment_interactions": "Minor fragment interactions", "flavor_text": "Repair and fortify units", "type": "Support"},
        {"name": "Steam Sentinels", "faction": "iron-dominion", "points_cost": 4, "role": "Heavy defense", "fragment_interactions": "Fragment grants temporary AoE shield", "flavor_text": "Slow, but area control", "type": "Infantry"},
        {"name": "Arcane Steam Marksmen", "faction": "iron-dominion", "points_cost": 3, "role": "Snipers", "fragment_interactions": "Fragment may add critical bonus", "flavor_text": "Precision long-range attacks", "type": "Infantry"},
        {"name": "Mechanized Scouts", "faction": "iron-dominion", "points_cost": 3, "role": "Fast / Utility", "fragment_interactions": "Fragment boosts mobility", "flavor_text": "Traverse difficult terrain quickly", "type": "Scout"},
        {"name": "Gearwright Artillery", "faction": "iron-dominion", "points_cost": 5, "role": "Ranged support", "fragment_interactions": "Fragment amplifies shots", "flavor_text": "Heavy cannons powered by fragments", "type": "Artillery"},
        {"name": "Steam Shock Infantry", "faction": "iron-dominion", "points_cost": 3, "role": "Assault", "fragment_interactions": "Fragment energy increases melee damage", "flavor_text": "Aggressive assault units", "type": "Infantry"},
        {"name": "Clockwork Vanguard", "faction": "iron-dominion", "points_cost": 4, "role": "Frontline", "fragment_interactions": "Fragment boosts nearby morale", "flavor_text": "Durable, disciplined frontline unit", "type": "Infantry"},
        {"name": "Aether Engineers", "faction": "iron-dominion", "points_cost": 3, "role": "Tech", "fragment_interactions": "Fragment can trigger traps", "flavor_text": "Manipulate battlefield hazards", "type": "Support"},
        {"name": "Steam Reclaimers", "faction": "iron-dominion", "points_cost": 2, "role": "Support", "fragment_interactions": "Fragment improves salvage rate", "flavor_text": "Recover destroyed units or machines", "type": "Support"},
        {"name": "Gear Infused Infantry", "faction": "iron-dominion", "points_cost": 2, "role": "Balanced", "fragment_interactions": "Minor fragment boosts", "flavor_text": "Standard troops with minor mechanical augmentation", "type": "Infantry"},
        {"name": "Arcane Tinker Battalion", "faction": "iron-dominion", "points_cost": 3, "role": "Experimental", "fragment_interactions": "Amplifies fragment energy", "flavor_text": "Small group that enhances fragment effects", "type": "Specialist"},
        {"name": "Clockwork Titan", "faction": "iron-dominion", "points_cost": 12, "role": "War Machine", "fragment_interactions": "AoE melee; fragment boosts radius", "flavor_text": "Massive humanoid construct, slow but devastating", "type": "War Machine"},
        {"name": "Steam Colossus", "faction": "iron-dominion", "points_cost": 10, "role": "War Machine", "fragment_interactions": "Fragment enhances long-range damage", "flavor_text": "Siege & artillery hybrid", "type": "War Machine"},
        {"name": "Aether Cannon Walker", "faction": "iron-dominion", "points_cost": 11, "role": "War Machine", "fragment_interactions": "Fires massive fragment blasts; unstable terrain effects", "flavor_text": "Huge fragment-powered artillery unit", "type": "War Machine"},
        {"name": "Gear-Beast Construct", "faction": "iron-dominion", "points_cost": 10, "role": "War Machine", "fragment_interactions": "Fragment boosts melee; risk of malfunction", "flavor_text": "Multi-legged mechanical war machine", "type": "War Machine"},
        {"name": "Experimental Leviathan", "faction": "iron-dominion", "points_cost": 15, "role": "War Machine", "fragment_interactions": "Fragment may warp battlefield; extremely high risk", "flavor_text": "Half-mechanical, half-living construct", "type": "War Machine"},
        {"name": "Overclocked Automaton", "faction": "iron-dominion", "points_cost": 10, "role": "War Machine", "fragment_interactions": "Fragment grants temporary double activation", "flavor_text": "Fast mechanical unit with explosive attacks", "type": "War Machine"},
        {"name": "Steam Gargoyle", "faction": "iron-dominion", "points_cost": 12, "role": "War Machine", "fragment_interactions": "Fragment adds unpredictable AoE attacks", "flavor_text": "Flying mechanical scout/assault unit", "type": "War Machine"},
        {"name": "Mechanized Siege Engine", "faction": "iron-dominion", "points_cost": 10, "role": "War Machine", "fragment_interactions": "Fragment can collapse terrain", "flavor_text": "Slow, massive damage output", "type": "War Machine"},
        {"name": "Arcane Steam Golem", "faction": "iron-dominion", "points_cost": 11, "role": "War Machine", "fragment_interactions": "Increases nearby unit effectiveness; unstable", "flavor_text": "Fragment-powered giant construct", "type": "War Machine"},
        {"name": "Chrono Walker", "faction": "iron-dominion", "points_cost": 14, "role": "War Machine", "fragment_interactions": "Fragment can reorder units; high instability", "flavor_text": "Time-manipulation-themed war machine", "type": "War Machine"}
    ],
    "fragments": [
        {"name": "Core Fragment", "faction": "iron-dominion", "effects": "Basic energy boost; minor attack & defense buff", "risk_instability": "Low", "interaction_evolution": "Stable across all evolutions; good for Knowledge commanders"},
        {"name": "Aether Pulse", "faction": "iron-dominion", "effects": "Increases unit movement and speed", "risk_instability": "Medium", "interaction_evolution": "Chaos evolutions amplify unpredictably; Knowledge stabilizes speed"},
        {"name": "Reality Shard", "faction": "iron-dominion", "effects": "Alters battlefield terrain slightly", "risk_instability": "High", "interaction_evolution": "Chaos amplifies terrain warping; Knowledge reduces effect magnitude"},
        {"name": "Overclock Node", "faction": "iron-dominion", "effects": "Temporarily boosts war machine activation", "risk_instability": "Medium", "interaction_evolution": "Best used by Ironweld or Mechana; Knowledge stabilizes, Chaos risks misfire"},
        {"name": "Fragment Conduit", "faction": "iron-dominion", "effects": "Amplifies fragment effects nearby", "risk_instability": "High", "interaction_evolution": "Chaos commanders can trigger AoE anomalies; Knowledge keeps effects precise"},
        {"name": "Temporal Chip", "faction": "iron-dominion", "effects": "Allows minor reordering of unit activation", "risk_instability": "High", "interaction_evolution": "Best for Chrono Walker; Knowledge commanders gain controlled timing, Chaos risks disruption"},
        {"name": "Arcane Spark", "faction": "iron-dominion", "effects": "Enhances ranged attacks", "risk_instability": "Medium", "interaction_evolution": "Synergizes with Aether Blasters and Steam Artillery; Chaos may cause accidental explosions"},
        {"name": "Steam Core", "faction": "iron-dominion", "effects": "Buffs mechanical unit durability", "risk_instability": "Low", "interaction_evolution": "Knowledge commanders benefit most; Chaos may slightly destabilize units"},
        {"name": "Infused Cog", "faction": "iron-dominion", "effects": "Boosts elite unit damage", "risk_instability": "Medium", "interaction_evolution": "Works with Vanguard and Shock Infantry; Chaos adds random crits, Knowledge stabilizes output"},
        {"name": "Fragment Swarm", "faction": "iron-dominion", "effects": "Summons temporary mini constructs", "risk_instability": "High", "interaction_evolution": "Risk/reward mechanic; Chaos makes swarm aggressive but erratic"},
        {"name": "Reality Lens", "faction": "iron-dominion", "effects": "Reveals hidden or stealth units", "risk_instability": "Medium", "interaction_evolution": "Best for stealth detection; Knowledge stabilizes accuracy, Chaos may misidentify"},
        {"name": "Flux Matrix", "faction": "iron-dominion", "effects": "Minor AoE fragment pulse", "risk_instability": "High", "interaction_evolution": "Can destabilize battlefield; Chaos amplifies, Knowledge reduces erratic effects"},
        {"name": "Resonance Core", "faction": "iron-dominion", "effects": "Improves fragment-linked unit coordination", "risk_instability": "Medium", "interaction_evolution": "Knowledge commanders maximize efficiency, Chaos may cause coordination glitches"},
        {"name": "Experimental Node", "faction": "iron-dominion", "effects": "Random fragment effect", "risk_instability": "Very High", "interaction_evolution": "Risk/reward; Chaos evolutions increase unpredictability, Knowledge reduces magnitude"},
        {"name": "Gear Infusion", "faction": "iron-dominion", "effects": "Boosts mechanical unit speed & power", "risk_instability": "Medium", "interaction_evolution": "Synergizes with Clockwork Cavalry & Mechanized Infantry; Knowledge stabilizes, Chaos risks misfire"}
    ]
};

// Helper functions to filter by faction
function getCommandersByFaction(factionId) {
    return gameData.commanders.filter(c => c.faction === factionId);
}

function getUnitsByFaction(factionId) {
    return gameData.units.filter(u => u.faction === factionId);
}

function getFragmentsByFaction(factionId) {
    return gameData.fragments.filter(f => f.faction === factionId);
}

function getFactionById(factionId) {
    return gameData.factions.find(f => f.id === factionId);
}
