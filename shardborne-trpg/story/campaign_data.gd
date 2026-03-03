class_name CampaignData
## CampaignData — Defines the structure for story-driven campaigns.
## Each campaign is tied to a specific commander and teaches that commander's playstyle.
##
## Campaign flow: Overview → Pre-Story → Battle → Post-Story → ... → Final Battle → Ending
##
## All campaign definitions are registered in CAMPAIGNS dict below.
## Individual campaign data lives in story/campaigns/<faction>_<commander>.gd

# ══════════════════════════════════════════════════════════════
# CAMPAIGN REGISTRY
# ══════════════════════════════════════════════════════════════

## Master list of all available campaigns, keyed by campaign_id
## Each entry references a data script that returns the full campaign definition
static var _campaign_cache: Dictionary = {}

static func get_all_campaigns() -> Array:
	"""Returns array of campaign summary dicts (id, commander, faction, title, description)."""
	var campaigns := []
	# Emberclaw campaigns
	campaigns.append({
		"id": "emberclaw_vex",
		"commander": "Scorchcaller Vex",
		"faction_id": "emberclaw_warpack",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "Trial by Fire",
		"description": "Scorchcaller Vex awakens in the Shardlands with her warband scattered and her drakes restless. Learn the ways of fire, speed, and overwhelming force as you carve a path through this broken world.",
		"mission_count": 6,
		"difficulty": "Beginner",
		"teaches": "Aggressive tactics, Heat management, movement and positioning",
	})
	# Iron Dominion campaigns
	campaigns.append({
		"id": "iron_dominion_calculon",
		"commander": "Lord Calculon",
		"faction_id": "iron_dominion",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Grid Remembers",
		"description": "Lord Calculon's Grid is shattered. Fragments of shared consciousness flicker like dying signals in the dark. Restore the network, analyze the anomaly, and impose order on chaos.",
		"mission_count": 6,
		"difficulty": "Intermediate",
		"teaches": "Defensive doctrine, Grid Cohesion, ranged support and positioning",
	})
	# Nightfang campaigns
	campaigns.append({
		"id": "nightfang_sanguinar",
		"commander": "Lord Sanguinar",
		"faction_id": "nightfang_dominion",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Eternal Hunger",
		"description": "Lord Sanguinar's court awakens in the Shardlands — starving, fractured, and caged in an alien world. The Blood Patriarch has ruled for ten thousand years. He will not be prey.",
		"mission_count": 6,
		"difficulty": "Advanced",
		"teaches": "Terror tactics, Hunger management, corruption spreading, Blood Drain sustain",
	})
	# Thornweft campaigns
	campaigns.append({
		"id": "thornweft_vethiss",
		"commander": "Loom-Mother Vethiss",
		"faction_id": "thornweft_matriarchy",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "The Pattern Unbroken",
		"description": "The Great Web is severed. Loom-Mother Vethiss and her weavers hang suspended in emergency cocoons between dead threads. Reweave the world. Study the pattern. Become the pattern.",
		"mission_count": 6,
		"difficulty": "Expert",
		"teaches": "Web terrain control, Fate-Thread manipulation, venom attrition, patience-based defense",
	})
	# Veilbound campaigns
	campaigns.append({
		"id": "veilbound_shogun",
		"commander": "The Shrouded Shogun",
		"faction_id": "veilbound_shogunate",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "Beyond the Veil",
		"description": "The Veil is shattered. The Shrouded Shogun stands between worlds — the living who fight and the dead who whisper. Reishima is lost. The ancestors speak in fragments. Honor demands he listen.",
		"mission_count": 6,
		"difficulty": "Master",
		"teaches": "Stance discipline, Ritual Flow management, spiritual warfare, honor-based tactics",
	})

	# ── Emberclaw Secondary Commanders ──
	campaigns.append({"id": "emberclaw_kora", "commander": "Flamewarden Kora", "faction_id": "emberclaw_warpack", "faction_enum": CombatantDefinition.Faction.EMBERCLAW, "title": "Ashes and Renewal", "description": "Flamewarden Kora's phoenix flame is dying. In the Shardlands, she must reignite it — or discover what fire means when the ashes refuse to stay cold.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Support play, healing, resurrection timing"})
	campaigns.append({"id": "emberclaw_ryx", "commander": "Ashborn Ryx", "faction_id": "emberclaw_warpack", "faction_enum": CombatantDefinition.Faction.EMBERCLAW, "title": "Shards of the Old World", "description": "Ashborn Ryx studies fragments that contain coordinates to Ignareth. The scholar-warrior must fight for knowledge in a world that values only survival.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Ranged fire, fragment collection, artillery play"})
	campaigns.append({"id": "emberclaw_tzarak", "commander": "Wyrmlord Tzarak", "faction_id": "emberclaw_warpack", "faction_enum": CombatantDefinition.Faction.EMBERCLAW, "title": "The Last Wyrm", "description": "Wyrmlord Tzarak is bonded to Obsidax, the last Obsidian Wyrm. Protect the remaining drake eggs, establish a new nesting ground, and keep the ancient bond alive.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Melee powerhouse, drake synergies, war machine play"})
	campaigns.append({"id": "emberclaw_lyss", "commander": "Skydancer Lyss", "faction_id": "emberclaw_warpack", "faction_enum": CombatantDefinition.Faction.EMBERCLAW, "title": "Wind and Flame", "description": "Skydancer Lyss is the fastest flyer the Emberclaw have ever produced. In the Shardlands, she must relearn flight itself — and outrun everything that hunts her.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Mobility, flanking, hit-and-run, aerial play"})
	campaigns.append({"id": "emberclaw_torvan", "commander": "Embersmith Torvan", "faction_id": "emberclaw_warpack", "faction_enum": CombatantDefinition.Faction.EMBERCLAW, "title": "Forge of the Fallen", "description": "Embersmith Torvan must build a new forge from shard-metal and alien fire — or the warpack's weapons will crumble to rust.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "War machine play, support buffs, defensive positioning"})
	campaigns.append({"id": "emberclaw_drenna", "commander": "Pyroclaw Drenna", "faction_id": "emberclaw_warpack", "faction_enum": CombatantDefinition.Faction.EMBERCLAW, "title": "Fury Unchained", "description": "Pyroclaw Drenna fights with claws of living flame. The Shardlands amplify her rage to volcanic levels — she must master it or be consumed.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Aggressive melee, berserker tactics, morale pressure"})
	campaigns.append({"id": "emberclaw_orin", "commander": "Skywatcher Orin", "faction_id": "emberclaw_warpack", "faction_enum": CombatantDefinition.Faction.EMBERCLAW, "title": "Eyes Above", "description": "Skywatcher Orin must rebuild the Emberclaw intelligence network from scratch. In the Shardlands, knowledge is the most dangerous weapon.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Scouting, ranged support, intel advantage, ambush play"})
	campaigns.append({"id": "emberclaw_vayne", "commander": "Clutchmaster Vayne", "faction_id": "emberclaw_warpack", "faction_enum": CombatantDefinition.Faction.EMBERCLAW, "title": "Brood War", "description": "Clutchmaster Vayne's drakes are mutating in the Shardlands. She must decide: control the mutations or embrace a new breed of shard-enhanced war-drakes.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Swarm play, creature management, overwhelm tactics"})
	campaigns.append({"id": "emberclaw_brok", "commander": "Cinderfist Brok", "faction_id": "emberclaw_warpack", "faction_enum": CombatantDefinition.Faction.EMBERCLAW, "title": "Walls Fall Down", "description": "Cinderfist Brok punches through walls. The Iron Dominion is building fortifications. Send Brok.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Siege tactics, demolition, anti-armor play"})
	campaigns.append({"id": "emberclaw_syrax", "commander": "Flameheart Syrax", "faction_id": "emberclaw_warpack", "faction_enum": CombatantDefinition.Faction.EMBERCLAW, "title": "The Prophet's Flame", "description": "Flameheart Syrax is the high priestess of the Emberclaw fire-faith. In the Shardlands, the divine flame speaks in alien tongues and whispers of a vast, lonely observer.", "mission_count": 4, "difficulty": "Advanced", "teaches": "Morale management, ranged divine attacks, support play"})
	campaigns.append({"id": "emberclaw_threx", "commander": "Skullcrusher Threx", "faction_id": "emberclaw_warpack", "faction_enum": CombatantDefinition.Faction.EMBERCLAW, "title": "The Challenge", "description": "Skullcrusher Threx fights for honor. He issues challenges, fights duels, and insists that even in a broken world, the warrior's code endures.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Dueling, challenge mechanics, honor combat, melee positioning"})
	campaigns.append({"id": "emberclaw_tidescar", "commander": "Tidescar the Exiled", "faction_id": "emberclaw_warpack", "faction_enum": CombatantDefinition.Faction.EMBERCLAW, "title": "The Exile's Gambit", "description": "Tidescar the Exiled was cast out for using corrupted shard-fire. In the Shardlands, his forbidden knowledge becomes the warpack's most dangerous — and necessary — asset.", "mission_count": 4, "difficulty": "Advanced", "teaches": "Risk/reward, fragment corruption, high-power unstable play"})

	# ── Iron Dominion Secondary Commanders ──
	campaigns.append({"id": "iron_dominion_cogsworth", "commander": "Lady Cogsworth", "faction_id": "iron_dominion", "faction_enum": CombatantDefinition.Faction.IRON_DOMINION, "title": "The Clockwork Charge", "description": "Lady Cogsworth commands the Dominion's clockwork cavalry. Speed, precision, and devastating flank charges — she rides at the head of a mechanical stampede.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Cavalry tactics, flanking, mobility play"})
	campaigns.append({"id": "iron_dominion_gearbane", "commander": "Archmagister Gearbane", "faction_id": "iron_dominion", "faction_enum": CombatantDefinition.Faction.IRON_DOMINION, "title": "The Aether Equation", "description": "Archmagister Gearbane chases the unified theory of shard-energy. His experiments push the boundaries of aether science — and occasionally blow things up.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Fragment collection, aether magic, experimental warfare"})
	campaigns.append({"id": "iron_dominion_ironweld", "commander": "Commander Ironweld", "faction_id": "iron_dominion", "faction_enum": CombatantDefinition.Faction.IRON_DOMINION, "title": "The Iron Line", "description": "Commander Ironweld has never lost a defensive position in thirty years. In the Shardlands, he intends to keep that record intact.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Infantry defense, holding positions, defensive doctrine"})
	campaigns.append({"id": "iron_dominion_brassveil", "commander": "Lady Brassveil", "faction_id": "iron_dominion", "faction_enum": CombatantDefinition.Faction.IRON_DOMINION, "title": "The Shadow Protocol", "description": "Lady Brassveil runs the Dominion's intelligence network. Espionage, sabotage, and information warfare are her weapons.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Stealth, sabotage, intelligence warfare"})
	campaigns.append({"id": "iron_dominion_vortan", "commander": "High Engineer Vortan", "faction_id": "iron_dominion", "faction_enum": CombatantDefinition.Faction.IRON_DOMINION, "title": "The Machine Ascendant", "description": "High Engineer Vortan builds the biggest, most powerful war machines the Dominion has ever fielded. In the Shardlands, he has new materials and no safety regulations.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "War machine command, heavy armor play, engineering support"})
	campaigns.append({"id": "iron_dominion_steamjaw", "commander": "General Steamjaw", "faction_id": "iron_dominion", "faction_enum": CombatantDefinition.Faction.IRON_DOMINION, "title": "The Iron Fist", "description": "General Steamjaw leads from the front. His soldiers follow him because he fights harder, takes more hits, and remembers every name.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Frontline leadership, morale, aggressive infantry"})
	campaigns.append({"id": "iron_dominion_aetheris", "commander": "Lady Aetheris", "faction_id": "iron_dominion", "faction_enum": CombatantDefinition.Faction.IRON_DOMINION, "title": "The Aether Weave", "description": "Lady Aetheris commands the Dominion's aether-ranged divisions. Concentrated reality-warping firepower at extreme range.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Ranged superiority, artillery play, fire support"})
	campaigns.append({"id": "iron_dominion_piston", "commander": "Lord Piston", "faction_id": "iron_dominion", "faction_enum": CombatantDefinition.Faction.IRON_DOMINION, "title": "The Fortress Walks", "description": "Lord Piston builds fortresses that move. Every position he holds becomes an impregnable bastion of Dominion power.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Fortification, defensive engineering, mobile defense"})
	campaigns.append({"id": "iron_dominion_ironclad", "commander": "Captain Ironclad", "faction_id": "iron_dominion", "faction_enum": CombatantDefinition.Faction.IRON_DOMINION, "title": "The Shield of the Dominion", "description": "Captain Ironclad has never lost a person he was protecting. HP 39, DEF 5 — the ultimate bodyguard.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Bodyguard play, damage absorption, escort tactics"})
	campaigns.append({"id": "iron_dominion_brassforge", "commander": "Engineer Brassforge", "faction_id": "iron_dominion", "faction_enum": CombatantDefinition.Faction.IRON_DOMINION, "title": "Improvise, Adapt, Overcome", "description": "Engineer Brassforge builds miracles from junk. Behind enemy lines with no supplies, he builds an army from salvage and sheer ingenuity.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Field engineering, improvisation, salvage mechanics"})
	campaigns.append({"id": "iron_dominion_mechana", "commander": "Lady Mechana", "faction_id": "iron_dominion", "faction_enum": CombatantDefinition.Faction.IRON_DOMINION, "title": "The Construct Swarm", "description": "Lady Mechana commands no soldiers — only constructs. Autonomous machines that recycle, adapt, and may be developing consciousness.", "mission_count": 4, "difficulty": "Advanced", "teaches": "Construct warfare, recycling, autonomous army management"})
	campaigns.append({"id": "iron_dominion_gearheart", "commander": "Lord Gearheart", "faction_id": "iron_dominion", "faction_enum": CombatantDefinition.Faction.IRON_DOMINION, "title": "The Combined Arms Doctrine", "description": "Lord Gearheart commands every type of unit simultaneously. Infantry, cavalry, artillery, war machines, scouts — all coordinated as one.", "mission_count": 4, "difficulty": "Advanced", "teaches": "Combined arms, coordination, multi-unit-type tactics"})

	# ── Nightfang Secondary Commanders ──
	campaigns.append({"id": "nightfang_nyxara", "commander": "Countess Nyxara", "faction_id": "nightfang_dominion", "faction_enum": CombatantDefinition.Faction.NIGHTFANG, "title": "The Shadow Court", "description": "Countess Nyxara wages war through shadow, manipulation, and debilitating curses. Her enemies crumble before her forces ever engage.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Shadow magic, debuffs, political manipulation"})
	campaigns.append({"id": "nightfang_voraxis", "commander": "Grand Fang Voraxis", "faction_id": "nightfang_dominion", "faction_enum": CombatantDefinition.Faction.NIGHTFANG, "title": "The Beast Unchained", "description": "Grand Fang Voraxis hunts with the tiger packs. ATK 21, pure melee dominance, and an unbreakable bond with the greatest predators in the Dominion.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Melee powerhouse, tiger synergy, aggressive assault"})
	campaigns.append({"id": "nightfang_ghul", "commander": "Thrallmaster Ghul", "faction_id": "nightfang_dominion", "faction_enum": CombatantDefinition.Faction.NIGHTFANG, "title": "The Endless Tide", "description": "Thrallmaster Ghul commands the expendable — thralls by the hundred, each one a disposable soldier in an unending tide of bodies.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Thrall swarm, expendable units, summoning, attrition"})
	campaigns.append({"id": "nightfang_hemora", "commander": "Lady Hemora", "faction_id": "nightfang_dominion", "faction_enum": CombatantDefinition.Faction.NIGHTFANG, "title": "The Blood Garden", "description": "Lady Hemora heals through blood rituals — dark medicine that sustains her forces at terrible cost to the enemy.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Blood healing, sustain, dark support play"})
	campaigns.append({"id": "nightfang_kreev", "commander": "Shadowfang Kreev", "faction_id": "nightfang_dominion", "faction_enum": CombatantDefinition.Faction.NIGHTFANG, "title": "The Silent Fang", "description": "Shadowfang Kreev never speaks. He kills. ATK 18, MOV 7 — the Dominion's deadliest assassin conducts warfare through silence and blades.", "mission_count": 4, "difficulty": "Advanced", "teaches": "Assassination, stealth operations, targeted elimination"})
	campaigns.append({"id": "nightfang_crimson_prophet", "commander": "The Crimson Prophet", "faction_id": "nightfang_dominion", "faction_enum": CombatantDefinition.Faction.NIGHTFANG, "title": "Corruption's Gospel", "description": "The Crimson Prophet spreads corruption as gospel. CMD 10, zealot preacher who corrupts territory and converts enemies through sheer fanaticism.", "mission_count": 4, "difficulty": "Advanced", "teaches": "Corruption spread, area denial, prophecy, zealot warfare"})
	campaigns.append({"id": "nightfang_rathka", "commander": "Warlord Rathka", "faction_id": "nightfang_dominion", "faction_enum": CombatantDefinition.Faction.NIGHTFANG, "title": "The Blood Fortress", "description": "Warlord Rathka builds fortresses of bone and blood. DEF 5, CMD 10 — the defensive vampire who holds ground against all comers.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Defensive tactics, fortress building, counter-attack"})
	campaigns.append({"id": "nightfang_lysara", "commander": "Blood Duchess Lysara", "faction_id": "nightfang_dominion", "faction_enum": CombatantDefinition.Faction.NIGHTFANG, "title": "The Crimson Court", "description": "Blood Duchess Lysara wages war as she hosts dinner parties — with elegance, precision, and Blood Drain that makes her nearly unkillable.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Blood Drain sustain, aristocratic warfare, elegant aggression"})
	campaigns.append({"id": "nightfang_mortivex", "commander": "Plague Herald Mortivex", "faction_id": "nightfang_dominion", "faction_enum": CombatantDefinition.Faction.NIGHTFANG, "title": "The Blighted Path", "description": "Plague Herald Mortivex cultivates biological warfare. Every battlefield is a laboratory, every enemy a test subject for his latest strain.", "mission_count": 4, "difficulty": "Advanced", "teaches": "Plague spreading, area denial, debuff warfare, biological attrition"})
	campaigns.append({"id": "nightfang_zharak", "commander": "Fang General Zharak", "faction_id": "nightfang_dominion", "faction_enum": CombatantDefinition.Faction.NIGHTFANG, "title": "The Tiger's Roar", "description": "Fang General Zharak is the Nightfang's finest military mind. Combined arms doctrine with tiger units — infantry, cavalry, and predators working as one.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Combined arms, tiger tactics, military doctrine"})
	campaigns.append({"id": "nightfang_hollow_king", "commander": "The Hollow King", "faction_id": "nightfang_dominion", "faction_enum": CombatantDefinition.Faction.NIGHTFANG, "title": "The Crown Endures", "description": "The Hollow King has reigned for a thousand years. DEF 6, HP 39 — the unkillable ancient monarch endures everything the Shardlands throw at him.", "mission_count": 4, "difficulty": "Advanced", "teaches": "Tank play, endurance, defensive anchoring, ancient power"})
	campaigns.append({"id": "nightfang_nightclaw_vex", "commander": "Nightclaw Vex", "faction_id": "nightfang_dominion", "faction_enum": CombatantDefinition.Faction.NIGHTFANG, "title": "The Red Blur", "description": "Nightclaw Vex is the fastest killer in the Dominion. ATK 21, MOV 8 — pure speed, pure lethality, pure aggression.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Speed play, assassination, hit-and-run, blitz tactics"})

	# ── Thornweft Secondary Commanders ──
	campaigns.append({"id": "thornweft_kythara", "commander": "Thread-Seer Kythara", "faction_id": "thornweft_matriarchy", "faction_enum": CombatantDefinition.Faction.THORNWEFT, "title": "The Pattern's Eye", "description": "Thread-Seer Kythara reads probability itself. Her ranged support and fate manipulation let her see the battle's outcome before it begins.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Fate reading, probability control, ranged support"})
	campaigns.append({"id": "thornweft_draven", "commander": "Silk-Marshal Draven", "faction_id": "thornweft_matriarchy", "faction_enum": CombatantDefinition.Faction.THORNWEFT, "title": "Venom and Silk", "description": "Silk-Marshal Draven is the Matriarchy's finest combined-arms tactician. Venom, silk, and steel wielded in perfect coordination.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Combined arms, venom warfare, tactical coordination"})
	campaigns.append({"id": "thornweft_nyx", "commander": "Thread-Cutter Nyx", "faction_id": "thornweft_matriarchy", "faction_enum": CombatantDefinition.Faction.THORNWEFT, "title": "The Severed Thread", "description": "Thread-Cutter Nyx severs fate itself. ATK 21, stealth, and assassination — she cuts the threads that hold reality together.", "mission_count": 4, "difficulty": "Advanced", "teaches": "Assassination, stealth, fate-severing, targeted elimination"})
	campaigns.append({"id": "thornweft_thessari", "commander": "Brood-Warden Thessari", "faction_id": "thornweft_matriarchy", "faction_enum": CombatantDefinition.Faction.THORNWEFT, "title": "The Mother's Brood", "description": "Brood-Warden Thessari commands the spider-beasts. Spiderling swarms, Brood-Mother Spiders, and war-creatures answer her call.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Beast command, spider spawning, swarm tactics"})
	campaigns.append({"id": "thornweft_morthis", "commander": "Silk-Warden Morthis", "faction_id": "thornweft_matriarchy", "faction_enum": CombatantDefinition.Faction.THORNWEFT, "title": "The Living Wall", "description": "Silk-Warden Morthis is the Matriarchy's immovable defender. DEF 6, HP 33, and web terrain control — nothing passes her wall.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Defensive web, terrain control, attrition defense"})
	campaigns.append({"id": "thornweft_silivex", "commander": "Loom-Mother Silivex", "faction_id": "thornweft_matriarchy", "faction_enum": CombatantDefinition.Faction.THORNWEFT, "title": "The Whispering Web", "description": "Loom-Mother Silivex wages war through intelligence. RNG 12, CMD 9, psychic web-reading — she knows what the enemy will do before they do.", "mission_count": 4, "difficulty": "Advanced", "teaches": "Intelligence warfare, psychic control, information advantage"})
	campaigns.append({"id": "thornweft_varek", "commander": "Spindle-Knight Varek", "faction_id": "thornweft_matriarchy", "faction_enum": CombatantDefinition.Faction.THORNWEFT, "title": "The Immovable", "description": "Spindle-Knight Varek is the ultimate tank. DEF 7, HP 42 — an unbreakable silk-armored knight who holds every position assigned.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Tank play, chokepoint defense, bodyguard tactics"})
	campaigns.append({"id": "thornweft_ithris", "commander": "Web-Walker Ithris", "faction_id": "thornweft_matriarchy", "faction_enum": CombatantDefinition.Faction.THORNWEFT, "title": "Between the Threads", "description": "Web-Walker Ithris phases through reality. MOV 16 — she appears everywhere at once, striking from between the threads of existence.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Phase movement, teleportation, hit-and-run, extreme mobility"})
	campaigns.append({"id": "thornweft_rathis", "commander": "Cocoon-Keeper Rathis", "faction_id": "thornweft_matriarchy", "faction_enum": CombatantDefinition.Faction.THORNWEFT, "title": "The Harvest", "description": "Cocoon-Keeper Rathis is the Matriarchy's resource master. Harvesting, processing, recycling — she turns every battlefield into a silk economy.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Resource management, economy warfare, recycling tactics"})
	campaigns.append({"id": "thornweft_yalith", "commander": "Silk-Mender Yalith", "faction_id": "thornweft_matriarchy", "faction_enum": CombatantDefinition.Faction.THORNWEFT, "title": "The Mender's Touch", "description": "Silk-Mender Yalith heals what is broken. Warriors, webs, and spirits — she fights by keeping everyone alive long enough to win.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Healing, support play, endurance, restoration"})
	campaigns.append({"id": "thornweft_kaelyx", "commander": "Fang-Rider Kaelyx", "faction_id": "thornweft_matriarchy", "faction_enum": CombatantDefinition.Faction.THORNWEFT, "title": "The Spider's Charge", "description": "Fang-Rider Kaelyx leads from the saddle of her war-spider. Speed kills — and Kaelyx is the fastest thing on eight legs.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Cavalry charges, spider-mount combat, flanking, speed play"})
	campaigns.append({"id": "thornweft_quileth", "commander": "Loom-Shaper Quileth", "faction_id": "thornweft_matriarchy", "faction_enum": CombatantDefinition.Faction.THORNWEFT, "title": "The Architect's Web", "description": "Loom-Shaper Quileth builds the battlefield itself. Web walls, silk barriers, terrain that serves the Matriarchy — she creates victory through architecture.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Terrain creation, web architecture, defensive engineering"})

	# ── Veilbound Secondary Commanders ──
	campaigns.append({"id": "veilbound_kurohane", "commander": "Masked Lord Kurohane", "faction_id": "veilbound_shogunate", "faction_enum": CombatantDefinition.Faction.VEILBOUND, "title": "The Shadow Blade", "description": "Masked Lord Kurohane is the Shogunate's deadliest bodyguard. ATK 18, DEF 5 — he fights as the Shogun's shadow, eliminating threats before they materialize.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Elite melee, bodyguard play, honor combat"})
	campaigns.append({"id": "veilbound_asagiri", "commander": "Elite Cmdr Asagiri", "faction_id": "veilbound_shogunate", "faction_enum": CombatantDefinition.Faction.VEILBOUND, "title": "The Morning Mist", "description": "Elite Commander Asagiri moves like morning mist. MOV 10, scouting and mobility — she appears, strikes, and vanishes before the enemy can respond.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Mobility, scouting, reconnaissance, hit-and-run"})
	campaigns.append({"id": "veilbound_hoshimaru", "commander": "Elite Cmdr Hoshimaru", "faction_id": "veilbound_shogunate", "faction_enum": CombatantDefinition.Faction.VEILBOUND, "title": "The Star Shield", "description": "Elite Commander Hoshimaru commands the Shogunate's infantry core. DEF 5, HP 33 — the immovable shield that protects the realm.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Infantry defense, formation holding, shield wall tactics"})
	campaigns.append({"id": "veilbound_akikaze", "commander": "Ritual Cpt Akikaze", "faction_id": "veilbound_shogunate", "faction_enum": CombatantDefinition.Faction.VEILBOUND, "title": "The Autumn Wind", "description": "Ritual Captain Akikaze channels Ritual Flow into devastating wind attacks. CMD 10 — the autumn wind strips leaves and enemies alike.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Ritual Flow, support play, wind magic, Flow management"})
	campaigns.append({"id": "veilbound_tsukihana", "commander": "Ritual Cpt Tsukihana", "faction_id": "veilbound_shogunate", "faction_enum": CombatantDefinition.Faction.VEILBOUND, "title": "The Moon Blossom", "description": "Ritual Captain Tsukihana manipulates Flow to heal and purify. Her moon blossom technique restores warriors and cleanses corruption.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Flow healing, purification, defensive support"})
	campaigns.append({"id": "veilbound_rengoku", "commander": "Elite Cmdr Rengoku", "faction_id": "veilbound_shogunate", "faction_enum": CombatantDefinition.Faction.VEILBOUND, "title": "The Purgatory Charge", "description": "Elite Commander Rengoku leads with fire and fury. ATK 15, MOV 8 — his cavalry charges break any line.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Cavalry charges, aggressive tactics, breakthrough warfare"})
	campaigns.append({"id": "veilbound_yukimaru", "commander": "Elite Cmdr Yukimaru", "faction_id": "veilbound_shogunate", "faction_enum": CombatantDefinition.Faction.VEILBOUND, "title": "The Snow Strike", "description": "Elite Commander Yukimaru strikes like a winter blizzard. MOV 9 — fast flanking strikes that overwhelm from unexpected angles.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Flanking, speed play, winter tactics, hit-and-run"})
	campaigns.append({"id": "veilbound_hisame", "commander": "Cmdr Hisame", "faction_id": "veilbound_shogunate", "faction_enum": CombatantDefinition.Faction.VEILBOUND, "title": "The Rain of Needles", "description": "Commander Hisame rains arrows like needles from the sky. RNG 6 — the Shogunate's foremost artillery commander.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Ranged warfare, artillery coordination, fire support"})
	campaigns.append({"id": "veilbound_midorikaze", "commander": "Cmdr Midorikaze", "faction_id": "veilbound_shogunate", "faction_enum": CombatantDefinition.Faction.VEILBOUND, "title": "The Green Wind", "description": "Commander Midorikaze heals with the Green Wind. CMD 10 — spiritual healing through nature's breath sustains the army.", "mission_count": 4, "difficulty": "Beginner", "teaches": "Healing, defensive support, sustain play"})
	campaigns.append({"id": "veilbound_kagero", "commander": "Cmdr Kagero", "faction_id": "veilbound_shogunate", "faction_enum": CombatantDefinition.Faction.VEILBOUND, "title": "The Heat Haze", "description": "Commander Kagero is the Shogunate's deadliest assassin. ATK 18, MOV 10 — she shimmers like a heat haze and strikes like a phantom blade.", "mission_count": 4, "difficulty": "Advanced", "teaches": "Assassination, stealth operations, targeted elimination"})
	campaigns.append({"id": "veilbound_tsuyukusa", "commander": "Cmdr Tsuyukusa", "faction_id": "veilbound_shogunate", "faction_enum": CombatantDefinition.Faction.VEILBOUND, "title": "The Flowing Blade", "description": "Commander Tsuyukusa is the Shogunate's most versatile officer. ATK 15, RNG 6 — equally skilled at range and in melee, she adapts to any battlefield.", "mission_count": 4, "difficulty": "Intermediate", "teaches": "Versatile tactics, combined arms, adaptability"})
	campaigns.append({"id": "veilbound_hoshikami", "commander": "Cmdr Hoshikami", "faction_id": "veilbound_shogunate", "faction_enum": CombatantDefinition.Faction.VEILBOUND, "title": "The Star Sigils", "description": "Commander Hoshikami channels shard fragments into star sigils. RNG 6 — she fights with patterns of starlight that reshape the battlefield.", "mission_count": 4, "difficulty": "Advanced", "teaches": "Fragment collection, sigil magic, spiritual warfare"})

	return campaigns

static func get_campaign(campaign_id: String) -> Dictionary:
	"""Returns the full campaign definition for the given campaign ID."""
	if _campaign_cache.has(campaign_id):
		return _campaign_cache[campaign_id]

	var data: Dictionary = {}
	match campaign_id:
		"emberclaw_vex":
			data = EmberclawVexCampaign.get_campaign()
		"emberclaw_kora":
			data = EmberclawKoraCampaign.get_campaign()
		"emberclaw_ryx":
			data = EmberclawRyxCampaign.get_campaign()
		"emberclaw_tzarak":
			data = EmberclawTzarakCampaign.get_campaign()
		"emberclaw_lyss":
			data = EmberclawLyssCampaign.get_campaign()
		"emberclaw_torvan":
			data = EmberclawTorvanCampaign.get_campaign()
		"emberclaw_drenna":
			data = EmberclawDrennaCampaign.get_campaign()
		"emberclaw_orin":
			data = EmberclawOrinCampaign.get_campaign()
		"emberclaw_vayne":
			data = EmberclawVayneCampaign.get_campaign()
		"emberclaw_brok":
			data = EmberclawBrokCampaign.get_campaign()
		"emberclaw_syrax":
			data = EmberclawSyraxCampaign.get_campaign()
		"emberclaw_threx":
			data = EmberclawThrexCampaign.get_campaign()
		"emberclaw_tidescar":
			data = EmberclawTidescarCampaign.get_campaign()
		"iron_dominion_calculon":
			data = IronDominionCalculonCampaign.get_campaign()
		"iron_dominion_cogsworth":
			data = IronDominionCogsworthCampaign.get_campaign()
		"iron_dominion_gearbane":
			data = IronDominionGearbaneCampaign.get_campaign()
		"iron_dominion_ironweld":
			data = IronDominionIronweldCampaign.get_campaign()
		"iron_dominion_brassveil":
			data = IronDominionBrassveilCampaign.get_campaign()
		"iron_dominion_vortan":
			data = IronDominionVortanCampaign.get_campaign()
		"iron_dominion_steamjaw":
			data = IronDominionSteamjawCampaign.get_campaign()
		"iron_dominion_aetheris":
			data = IronDominionAetherisCampaign.get_campaign()
		"iron_dominion_piston":
			data = IronDominionPistonCampaign.get_campaign()
		"iron_dominion_ironclad":
			data = IronDominionIroncladCampaign.get_campaign()
		"iron_dominion_brassforge":
			data = IronDominionBrassforgeCampaign.get_campaign()
		"iron_dominion_mechana":
			data = IronDominionMechanaCampaign.get_campaign()
		"iron_dominion_gearheart":
			data = IronDominionGearheartCampaign.get_campaign()
		"nightfang_sanguinar":
			data = NightfangSanguinarCampaign.get_campaign()
		"nightfang_nyxara":
			data = NightfangNyxaraCampaign.get_campaign()
		"nightfang_voraxis":
			data = NightfangVoraxisCampaign.get_campaign()
		"nightfang_ghul":
			data = NightfangGhulCampaign.get_campaign()
		"nightfang_hemora":
			data = NightfangHemoraCampaign.get_campaign()
		"nightfang_kreev":
			data = NightfangKreevCampaign.get_campaign()
		"nightfang_crimson_prophet":
			data = NightfangCrimsonProphetCampaign.get_campaign()
		"nightfang_rathka":
			data = NightfangRathkaCampaign.get_campaign()
		"nightfang_lysara":
			data = NightfangLysaraCampaign.get_campaign()
		"nightfang_mortivex":
			data = NightfangMortivexCampaign.get_campaign()
		"nightfang_zharak":
			data = NightfangZharakCampaign.get_campaign()
		"nightfang_hollow_king":
			data = NightfangHollowKingCampaign.get_campaign()
		"nightfang_nightclaw_vex":
			data = NightfangNightclawVexCampaign.get_campaign()
		"thornweft_kythara":
			data = ThornweftKytharaCampaign.get_campaign()
		"thornweft_draven":
			data = ThornweftDravenCampaign.get_campaign()
		"thornweft_nyx":
			data = ThornweftNyxCampaign.get_campaign()
		"thornweft_thessari":
			data = ThornweftThessariCampaign.get_campaign()
		"thornweft_morthis":
			data = ThornweftMorthisCampaign.get_campaign()
		"thornweft_silivex":
			data = ThornweftSilivexCampaign.get_campaign()
		"thornweft_varek":
			data = ThornweftVarekCampaign.get_campaign()
		"thornweft_ithris":
			data = ThornweftIthrisCampaign.get_campaign()
		"thornweft_rathis":
			data = ThornweftRathisCampaign.get_campaign()
		"thornweft_yalith":
			data = ThornweftYalithCampaign.get_campaign()
		"thornweft_kaelyx":
			data = ThornweftKaelyxCampaign.get_campaign()
		"thornweft_quileth":
			data = ThornweftQuilethCampaign.get_campaign()
		"thornweft_vethiss":
			data = ThornweftVethissCampaign.get_campaign()
		"veilbound_kurohane":
			data = VeilboundKurohaneCampaign.get_campaign()
		"veilbound_asagiri":
			data = VeilboundAsagiriCampaign.get_campaign()
		"veilbound_hoshimaru":
			data = VeilboundHoshimaruCampaign.get_campaign()
		"veilbound_akikaze":
			data = VeilboundAkikazeCampaign.get_campaign()
		"veilbound_tsukihana":
			data = VeilboundTsukihanaCampaign.get_campaign()
		"veilbound_rengoku":
			data = VeilboundRengokuCampaign.get_campaign()
		"veilbound_yukimaru":
			data = VeilboundYukimaruCampaign.get_campaign()
		"veilbound_hisame":
			data = VeilboundHisameCampaign.get_campaign()
		"veilbound_midorikaze":
			data = VeilboundMidorikazeCampaign.get_campaign()
		"veilbound_kagero":
			data = VeilboundKageroCampaign.get_campaign()
		"veilbound_tsuyukusa":
			data = VeilboundTsuyukusaCampaign.get_campaign()
		"veilbound_hoshikami":
			data = VeilboundHoshikamiCampaign.get_campaign()
		"veilbound_shogun":
			data = VeilboundShogunCampaign.get_campaign()
		_:
			push_error("CampaignData: Unknown campaign '%s'" % campaign_id)
			return {}

	_campaign_cache[campaign_id] = data
	return data

# ══════════════════════════════════════════════════════════════
# DATA STRUCTURE REFERENCE
# ══════════════════════════════════════════════════════════════

## A full campaign definition dictionary has this shape:
## {
##   "id": String,                    # Unique campaign identifier
##   "commander": String,             # Commander unit name (must match faction data)
##   "faction_enum": int,             # CombatantDefinition.Faction enum value
##   "title": String,                 # Campaign display title
##   "description": String,           # Campaign overview text
##   "opening_story": Array[Dict],    # Array of dialogue entries (shown before mission 1)
##   "missions": Array[MissionDef],   # Array of mission definitions (see below)
##   "ending_story": Array[Dict],     # Array of dialogue entries (shown after final mission)
## }
##
## A MissionDef dictionary:
## {
##   "title": String,                 # Mission display name
##   "pre_story": Array[Dict],        # Dialogue shown before battle
##   "post_story": Array[Dict],       # Dialogue shown after winning
##   "defeat_story": Array[Dict],     # Dialogue shown if player loses (optional retry prompt)
##   "player_army": Array[String],    # Unit names for the player's army
##   "enemy_faction": int,            # Enemy faction enum
##   "enemy_army": Array[String],     # Unit names for the enemy army
##   "battle_size": String,           # "skirmish", "standard", or "epic"
##   "scenario": String,              # Scenario type from GameRules.SCENARIOS
##   "round_limit": int,              # Max rounds for this battle
##   "tutorial_tips": Array[String],  # Optional tutorial text shown during battle
##   "objectives_text": String,       # Shown on mission briefing screen
## }
##
## A dialogue entry dictionary:
## {
##   "speaker": String,   # Character name, "NARRATOR", or "FHAH-ZOLG"
##   "text": String,      # The line of dialogue
##   "mood": String,      # "neutral", "angry", "determined", "amused", etc.
## }

# ══════════════════════════════════════════════════════════════
# ARMY BUILDING HELPERS
# ══════════════════════════════════════════════════════════════

## Standard army templates for enemies at different difficulty levels
## Used by campaign scripts to quickly build opposition armies

static func small_army(faction_enum: int) -> Array:
	"""Returns a basic 4-unit army for easy early battles."""
	var units := FactionDatabase.faction_units.get(faction_enum, [])
	var army: Array[String] = []
	for u in units:
		if u.unit_type == CombatantDefinition.UnitType.INFANTRY and army.size() < 4:
			army.append(u.unit_name)
	return army

static func medium_army(faction_enum: int, commander_name: String = "") -> Array:
	"""Returns a 6-8 unit army with optional commander for mid-campaign battles."""
	var units := FactionDatabase.faction_units.get(faction_enum, [])
	var army: Array[String] = []
	if commander_name != "":
		army.append(commander_name)
	for u in units:
		if u.unit_type != CombatantDefinition.UnitType.COMMANDER and army.size() < 7:
			army.append(u.unit_name)
	return army

static func large_army(faction_enum: int, commander_name: String) -> Array:
	"""Returns a full 10-12 unit army with commander for hard battles."""
	var units := FactionDatabase.faction_units.get(faction_enum, [])
	var army: Array[String] = [commander_name]
	var type_counts := {}
	for u in units:
		if u.unit_type == CombatantDefinition.UnitType.COMMANDER:
			continue
		var t = u.unit_type
		type_counts[t] = type_counts.get(t, 0) + 1
		if type_counts[t] <= 2 and army.size() < 11:
			army.append(u.unit_name)
	return army

# ══════════════════════════════════════════════════════════════
# FACTION COLORS FOR DIALOGUE UI
# ══════════════════════════════════════════════════════════════

const SPEAKER_COLORS := {
	"NARRATOR": Color(0.7, 0.7, 0.8),
	"FHAH-ZOLG": Color(0.8, 0.2, 0.9),
	# Emberclaw speakers
	"Scorchcaller Vex": Color(0.95, 0.35, 0.15),
	"Flamewarden Kora": Color(0.95, 0.55, 0.20),
	"Wyrmlord Tzarak": Color(0.85, 0.20, 0.10),
	"Ashborn Ryx": Color(0.90, 0.45, 0.15),
	"Skydancer Lyss": Color(0.95, 0.65, 0.30),
	"Embersmith Torvan": Color(0.80, 0.40, 0.15),
	"Pyroclaw Drenna": Color(1.0, 0.25, 0.10),
	"Skywatcher Orin": Color(0.85, 0.50, 0.25),
	"Clutchmaster Vayne": Color(0.90, 0.30, 0.15),
	"Cinderfist Brok": Color(0.85, 0.30, 0.10),
	"Flameheart Syrax": Color(1.0, 0.75, 0.20),
	"Skullcrusher Threx": Color(0.80, 0.25, 0.10),
	"Tidescar the Exiled": Color(0.60, 0.30, 0.50),
	# Iron Dominion speakers
	"Lord Calculon": Color(0.55, 0.62, 0.70),
	"Commander Ironweld": Color(0.50, 0.55, 0.65),
	"Lady Cogsworth": Color(0.60, 0.55, 0.45),
	"Archmagister Gearbane": Color(0.45, 0.55, 0.75),
	"Lady Brassveil": Color(0.40, 0.45, 0.55),
	"High Engineer Vortan": Color(0.55, 0.60, 0.55),
	"General Steamjaw": Color(0.65, 0.55, 0.50),
	"Lady Aetheris": Color(0.50, 0.60, 0.80),
	"Lord Piston": Color(0.55, 0.55, 0.60),
	"Captain Ironclad": Color(0.50, 0.50, 0.55),
	"Engineer Brassforge": Color(0.60, 0.55, 0.40),
	"Lady Mechana": Color(0.45, 0.60, 0.65),
	"Lord Gearheart": Color(0.55, 0.58, 0.65),
	# Nightfang speakers
	"Lord Sanguinar": Color(0.65, 0.15, 0.20),
	"Countess Nyxara": Color(0.50, 0.20, 0.55),
	"Grand Fang Voraxis": Color(0.70, 0.15, 0.15),
	"Thrallmaster Ghul": Color(0.45, 0.25, 0.35),
	"Lady Hemora": Color(0.60, 0.10, 0.25),
	"Shadowfang Kreev": Color(0.30, 0.15, 0.30),
	"The Crimson Prophet": Color(0.75, 0.10, 0.20),
	"Warlord Rathka": Color(0.55, 0.20, 0.20),
	"Blood Duchess Lysara": Color(0.65, 0.10, 0.30),
	"Plague Herald Mortivex": Color(0.40, 0.50, 0.20),
	"Fang General Zharak": Color(0.60, 0.20, 0.15),
	"The Hollow King": Color(0.35, 0.25, 0.40),
	"Nightclaw Vex": Color(0.70, 0.10, 0.15),
	# Thornweft speakers
	"Loom-Mother Vethiss": Color(0.25, 0.70, 0.25),
	"Thread-Seer Kythara": Color(0.20, 0.60, 0.50),
	"Silk-Marshal Draven": Color(0.30, 0.65, 0.30),
	"Thread-Cutter Nyx": Color(0.15, 0.50, 0.35),
	"Brood-Warden Thessari": Color(0.35, 0.60, 0.25),
	"Silk-Warden Morthis": Color(0.25, 0.55, 0.30),
	"Loom-Mother Silivex": Color(0.20, 0.65, 0.45),
	"Spindle-Knight Varek": Color(0.30, 0.50, 0.25),
	"Web-Walker Ithris": Color(0.15, 0.55, 0.50),
	"Cocoon-Keeper Rathis": Color(0.35, 0.55, 0.20),
	"Silk-Mender Yalith": Color(0.25, 0.65, 0.35),
	"Fang-Rider Kaelyx": Color(0.30, 0.55, 0.15),
	"Loom-Shaper Quileth": Color(0.20, 0.60, 0.40),
	# Veilbound speakers
	"The Shrouded Shogun": Color(0.20, 0.50, 0.85),
	"Masked Lord Kurohane": Color(0.15, 0.40, 0.75),
	"Elite Cmdr Asagiri": Color(0.25, 0.55, 0.80),
	"Elite Cmdr Hoshimaru": Color(0.20, 0.45, 0.75),
	"Ritual Cpt Akikaze": Color(0.30, 0.50, 0.70),
	"Ritual Cpt Tsukihana": Color(0.25, 0.55, 0.85),
	"Elite Cmdr Rengoku": Color(0.35, 0.40, 0.70),
	"Elite Cmdr Yukimaru": Color(0.20, 0.50, 0.80),
	"Cmdr Hisame": Color(0.25, 0.45, 0.75),
	"Cmdr Midorikaze": Color(0.15, 0.55, 0.70),
	"Cmdr Kagero": Color(0.20, 0.40, 0.80),
	"Cmdr Tsuyukusa": Color(0.25, 0.50, 0.75),
	"Cmdr Hoshikami": Color(0.30, 0.55, 0.85),
	"The Ancestors": Color(0.60, 0.70, 0.90),
}

static func get_speaker_color(speaker: String) -> Color:
	if SPEAKER_COLORS.has(speaker):
		return SPEAKER_COLORS[speaker]
	# Default color for unknown speakers
	return Color(0.8, 0.8, 0.8)
