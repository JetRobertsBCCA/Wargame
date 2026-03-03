class_name NightfangMortivexCampaign
## Plague Herald Mortivex — "The Blighted Path"
## Plague spreading, Area denial, ATK 12, DEF 3, HP 27, MOV 6, CMD 8. Biological warfare specialist.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_mortivex",
		"commander": "Plague Herald Mortivex",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Blighted Path",
		"description": "Plague Herald Mortivex doesn't fight wars — he cultivates them. Every battlefield is a petri dish, every enemy a host for something beautiful and terrible.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Plague Herald Mortivex", "Sanguinar craves blood. Nyxara craves power. I crave only knowledge — the exquisite knowledge of what happens when living tissue meets my latest strain. The plague is not a weapon. It is a THESIS. And the battlefield is my laboratory. Each specimen teaches me something new.", "clinical"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Patient Zero",
		"objectives_text": "Test the new plague strain against the Emberclaw. Observe. Document. Spread.",
		"pre_story": [ShardLore.dialogue("Plague Herald Mortivex", "The Emberclaw are ideal test subjects — high metabolism, rapid healing, excellent circulation. My Strain Seven should propagate beautifully through their ranks. I've positioned the Plague Horde upwind. The Corruption Spreaders are ready. All I need is contact. One touch. One cough. One beautiful, microscopic exchange.", "eager")],
		"post_story": [ShardLore.dialogue("Plague Herald Mortivex", "Fascinating. The strain propagated through body contact as expected, but the fire-blooded ones burned it out faster than predicted. I'll need to adjust the incubation rate. Still, three squads infected from a single carrier. The math is exquisite. Exponential growth — nature's most beautiful equation.", "analytical")],
		"defeat_story": [ShardLore.dialogue("Plague Herald Mortivex", "They burned the infected. Cauterized the spread zones. Crude but effective. I underestimated fire as a countermeasure. Back to the laboratory.", "noting")],
		"player_army": ["Plague Herald Mortivex", "Plague Horde", "Corruption Spreaders", "Plague Apothecaries", "Blightspitter Thralls"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Ashwalker Skirmishers", "Emberclaw Warriors", "Pyromancer Adepts", "Unbonded Berserkers"],
		"battle_size": "skirmish",
		"scenario": "broken_ground",
		"round_limit": 6,
		"tutorial_tips": ["Plague units debilitate enemies over time. Engage and spread.", "Corruption Spreaders weaken enemy groups. Target clusters.", "Plague Apothecaries keep your forces alive. Protect them."],
		"battle_modifiers": {"label": "Patient Zero", "description": "Plague spreads. Enemy units lose -1 ATK each round of contact.", "enemy_atk_bonus": -1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Quarantine Zone",
		"objectives_text": "Hold critical supply points while the plague spreads through Iron Dominion positions.",
		"pre_story": [ShardLore.dialogue("Plague Herald Mortivex", "The Iron Dominion has established supply depots in this sector. Their machines don't breathe, don't bleed, don't HOST. But their operators do. Their mechanics. Their engineers. Cut the operators and the machines stop. My plague doesn't need to infect steel — it just needs to infect the hands that maintain it.", "calculating")],
		"post_story": [ShardLore.dialogue("Plague Herald Mortivex", "The depots are ours. The engineers fell first — coughing, weakening, unable to maintain their precious machines. Without maintenance, the cogwork infantry stumbled. Without fuel, the steam engines cooled. Biology defeats technology. It always does, given sufficient incubation time.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Plague Herald Mortivex", "Sealed environmental suits. Filtered air. They came PREPARED. Someone warned them. I'll need to identify the intelligence leak and... inoculate it.", "cold")],
		"player_army": ["Plague Herald Mortivex", "Plague Knights", "Plague Horde", "Corruption Spreaders", "Blight Weavers", "Bile Cannon Crew", "Plague Doctor"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Hisame", "Moonlit Duelists", "Veiled Ashigaru", "Lunar Kitsune Riders", "Shadow Marksmen", "Flow Adepts"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply Lines — hold the depots to starve the Iron Dominion.", "Bile Cannon Crew creates denial zones. Fire at chokepoints.", "Plague Knights are your frontline. They spread corruption on contact.", "Plague Doctor heals YOUR sick troops. Keep him central."],
		"battle_modifiers": {"label": "Quarantine Zone", "description": "Plague fog. All enemy units suffer -1 DEF.", "enemy_def_bonus": -1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Broodmother Wakes",
		"objectives_text": "Deploy the Plague Broodmother for the first time in open warfare.",
		"pre_story": [ShardLore.dialogue("Plague Herald Mortivex", "She's ready. The Plague Broodmother — my masterwork. A living plague factory, generating new strains in real-time, adapting to enemy countermeasures, producing plague-spawn by the dozen. The Thornweft think THEY understand biological warfare? Their spiders are crude. Natural. My Broodmother is ENGINEERED. Let them see what true plague-craft looks like.", "pride")],
		"post_story": [ShardLore.dialogue("Plague Herald Mortivex", "Magnificent. The Broodmother adapted three times during the battle — each strain more virulent than the last. The Thornweft's web barriers dissolved. Their spore defenses wilted. Even their venomous creatures succumbed. Biology is an arms race, and I have just deployed the ultimate escalation.", "ecstatic")],
		"defeat_story": [ShardLore.dialogue("Plague Herald Mortivex", "The Thornweft... they adapted faster than the Broodmother could match. Natural evolution outpacing my engineering. Humbling. And instructive. I need new genetic material.", "humbled")],
		"player_army": ["Plague Herald Mortivex", "Plague Broodmother", "Plague Horde", "Plague Knights", "Corruption Spreaders", "Blight Weavers", "Plague Catapult Crew"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Brood-Warden Thessari", "Spiderling Swarm", "Gossamer Guard", "Venom Dancers", "Silk-Warden Regulars", "Venom Alchemists"],
		"battle_size": "standard",
		"scenario": "shardstorm",
		"round_limit": 7,
		"tutorial_tips": ["Plague Broodmother is a living factory. Protect her.", "Plague Catapult Crew bombards from range. Soften before engaging.", "Blight Weavers debuff areas. Create plague kill zones.", "The Thornweft adapt — hit hard before they counter your strains."],
		"battle_modifiers": {"label": "Broodmother Awakens", "description": "Living plague. Player gains +1 unit reinforcement each round.", "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Blighted Path",
		"objectives_text": "Unleash total biological warfare. Leave nothing standing.",
		"pre_story": [
			ShardLore.dialogue("Plague Herald Mortivex", "The final experiment. Everything I've learned — every strain, every adaptation, every beautiful mutation — deployed at once. The Iron Dominion has sent their finest to stop me. Calculon himself calculated that I am a 'Class Five Existential Threat.' I'm flattered. Truly. Let them come with their machines and their mathematics. My plagues don't care about equations. They only care about hosts.", "final_lecture"),
		],
		"post_story": [
			ShardLore.narration("The Blighted Path stretched behind Mortivex like a scar across the land — miles of corrupted earth, withered vegetation, and the faint green glow of active plague spores. Nothing lived there that he hadn't designed. Nothing grew that he hadn't engineered. It was, in his professional opinion, his finest work."),
			ShardLore.dialogue("Plague Herald Mortivex", "They called it a wasteland. I call it a garden. Every spore is a seed. Every plague is a flower. And every battlefield is a greenhouse. The Blighted Path is not destruction — it is CREATION. New life. My life. The only kind that matters in the end.", "visionary"),
		],
		"defeat_story": [ShardLore.dialogue("Plague Herald Mortivex", "They sterilized the battlefield entirely. Fire, chemicals, aether purges. My strains... all of them... gone. But I remember. I always remember. And the next generation will be BETTER.", "defiant")],
		"player_army": ["Plague Herald Mortivex", "Plague Broodmother", "Plague Titan", "Plague Horde", "Plague Knights", "Corruption Spreaders", "Blight Weavers", "Bile Cannon Crew", "Plague Catapult Crew"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Clockwork Titan", "Elite Vanguard", "Steam Heavy Guards", "Aether Marksmen", "Infantry Regiment", "Steam Artillery Crew", "Mechanized Scouts"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Full plague army. Every unit spreads corruption.", "Plague Titan anchors the center. Plague Broodmother generates reinforcements.", "Bile Cannon Crew + Plague Catapult Crew bombard from range.", "Calculon's Grid Cohesion resists plague. Overwhelm with volume."],
		"battle_modifiers": {"label": "The Blighted Path", "description": "Total plague warfare. All enemy units suffer -1 ATK and -1 DEF.", "enemy_atk_bonus": -1, "enemy_def_bonus": -1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Plague Herald Mortivex", "Some create empires of stone and steel. I create empires of tissue and mutation. My plagues will outlast every castle, every machine, every civilization. Because in the end, biology is patient. And plague is inevitable. The Blighted Path extends. Always extending. Always growing. Always adapting. That is the beauty of disease — it never stops learning.", "epilogue"),
	]
