class_name IronDominionIronweldCampaign
## Commander Ironweld — "The Iron Line"
## Infantry buffing, Defensive doctrine. ATK 18, DEF 5, CMD 9.
## 4 missions. Teaches defensive play, infantry coordination, holding ground.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_ironweld",
		"commander": "Commander Ironweld",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Iron Line",
		"description": "Commander Ironweld holds every line he's ever been given. In the Shardlands, the lines are everywhere and the enemies never stop coming.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Commander Ironweld", "I have never lost a defensive position. Not in thirty years of service. Not against any enemy, in any terrain, under any conditions. I do not intend to start now.", "granite"),
		ShardLore.narration("Commander Ironweld was the Iron Dominion's finest infantry commander — a career soldier who had risen through every rank by the simple virtue of being absolutely, immovably reliable. He didn't innovate. He didn't improvise. He held the line. Every time. Without fail."),
		ShardLore.fhah_zolg("The wall. Every game needs a wall — something immovable that forces the other pieces to go around. This one is my favorite wall. He doesn't know he's a wall, and that's what makes him perfect."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Hold the Pass",
		"objectives_text": "Defend the mountain pass against Emberclaw raiders. Do not yield one inch.",
		"pre_story": [ShardLore.dialogue("Commander Ironweld", "Standard defensive doctrine. Layer the defenses. Three lines: picket, main, reserve. Every soldier knows their position, their firing arc, and their fallback. We hold. That's what we do. We hold.", "steady")],
		"post_story": [ShardLore.dialogue("Commander Ironweld", "Pass held. Zero ground lost. Seven assault waves repulsed. Total casualties: nine percent. Within acceptable parameters. Commend the Steam Sentinels — their shield wall didn't waver once.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Commander Ironweld", "The line broke. First time in thirty years. I will find out where it failed and ensure it never fails again.", "cold_fury")],
		"player_army": ["Commander Ironweld", "Infantry Regiment", "Steam Sentinels", "Steam Heavy Guards", "Gearwright Engineers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberclaw Warriors", "Unbonded Berserkers", "Emberforged Blades", "Ashrider Scouts"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["Ironweld's Infantry buffing makes all infantry stronger when near him.", "Steam Sentinels have Shield Wall and Unyielding. They're your best defensive unit.", "Layer your defense: scouts forward, infantry main line, engineers behind for repairs."],
		"battle_modifiers": {"label": "Defensive Doctrine", "description": "Ironweld's formations are perfect. All infantry gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Fighting Retreat",
		"objectives_text": "Execute a controlled retreat through Nightfang territory. No unit left behind.",
		"pre_story": [ShardLore.dialogue("Commander Ironweld", "We are outnumbered and cut off. The textbook answer is a fighting retreat — maintain formation, rotate the rear guard, yield ground slowly while extracting the column. Every soldier comes home. That is not negotiable.", "absolute")],
		"post_story": [ShardLore.dialogue("Commander Ironweld", "Column extracted. Every soldier accounted for. The blood-drinkers hit our rear guard fourteen times. Fourteen times the guard held, rotated, and fell back in formation. This is what discipline looks like. This is what the Iron Dominion is.", "proud")],
		"defeat_story": [ShardLore.dialogue("Commander Ironweld", "Lost soldiers in the retreat. Unacceptable. I will not leave people behind. We go back.", "steel")],
		"player_army": ["Commander Ironweld", "Infantry Regiment", "Steam Sentinels", "Clockwork Vanguard", "Steam Heavy Guards", "Steam Medic Corps"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Kagero", "Moonlit Wanderers", "Shrine Wardens", "Lunar Kitsune Riders", "Shadow Marksmen", "Ink Sigil Crafters"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply Lines: get your column across the map.", "Rotate your rear guard: fresh units back, tired units forward.", "Steam Medic Corps can heal on the move. Keep them in the middle of the column."],
		"battle_modifiers": {"label": "Fighting Retreat", "description": "Ironweld's discipline keeps formation. All infantry gain +1 MOV and +1 DEF.", "player_mov_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Trench",
		"objectives_text": "Build and defend a trench line against the Thornweft siege force. Hold the position.",
		"pre_story": [ShardLore.dialogue("Commander Ironweld", "Engineering says the trench will take eight hours to dig. I say it takes four, because I'm sending twice the sappers. When the spiders arrive, they'll find a prepared position with interlocking fields of fire. Surprise.", "planning")],
		"post_story": [
			ShardLore.narration("The trench held. The Thornweft siege force — web-spinners, venom-spitters, brood-mothers — broke against the prepared position like waves against a seawall. The interlocking fields of fire left no approach uncontested, no gap unexploited."),
			ShardLore.dialogue("Commander Ironweld", "Trenches. Ancient technology. Ugly, simple, and devastatingly effective. The spider-folk can't web what's below ground level. Sometimes the old ways are best.", "teaching"),
		],
		"defeat_story": [ShardLore.dialogue("Commander Ironweld", "The trench collapsed — undermined from below. The spiders dug under us. I underestimated them. Won't happen again.", "grim")],
		"player_army": ["Commander Ironweld", "Infantry Regiment", "Steam Sentinels", "Clockwork Pioneers", "Mechanical Sappers", "Steam-Powered Sharpshooters", "Steam Artillery Crew"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Marshal Draven", "Silk-Warden Regulars", "Gossamer Guard", "Spiderling Swarm", "Brood-Mother Spider", "Venom Dancers"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Clockwork Pioneers build barricades. Use them to fortify weak points.", "Mechanical Sappers can plant charges on approached enemies.", "Steam Artillery provides fire support from behind the trench line."],
		"battle_modifiers": {"label": "Prepared Position", "description": "Ironweld's trench provides cover. All infantry gain +2 DEF and +1 ATK.", "player_def_bonus": 2, "player_atk_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Iron Line",
		"objectives_text": "Hold the coalition's final defensive position against the massed Nightfang assault. This is where the line is drawn.",
		"pre_story": [ShardLore.dialogue("Commander Ironweld", "This is the line. Behind us: the coalition camp, the civilians, everything we've built. In front of us: everything that wants to destroy it. I have held every line I've ever been given. This one is the most important. And it will be held.", "unbreakable")],
		"post_story": [
			ShardLore.narration("The Iron Line held. Through six hours of continuous assault, through blood and fire and venom, through every horror the Nightfang could throw at it — Commander Ironweld's infantry held their ground. Not one step backward. Not one position yielded. Not one soldier left behind."),
			ShardLore.dialogue("Commander Ironweld", "Thirty-one years of service. Every defensive position held. Every soldier brought home. The record stands. The line holds. That is an Iron Dominion promise, and we do not break promises.", "exhausted_but_unbowed"),
		],
		"defeat_story": [ShardLore.dialogue("Commander Ironweld", "The first line I ever lost. I will carry this shame. But the retreat was orderly and all soldiers were extracted. If we cannot hold, we can endure.", "broken")],
		"player_army": ["Commander Ironweld", "Infantry Regiment", "Steam Sentinels", "Steam Heavy Guards", "Clockwork Vanguard", "Siege Infantry", "Steam-Powered Sharpshooters", "Steam Artillery Crew"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Grand Fang Voraxis", "Blood Reavers", "Tiger Berserkers", "Nightfang Warriors", "Shadow Stalkers", "Blood Shamans", "Tiger Alpha", "Crimson Behemoth"],
		"battle_size": "epic",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["This is the ultimate defensive battle. Layer your lines perfectly.", "Ironweld's CMD 9 makes him one of the best infantry buffers in the game.", "Steam Heavy Guards are your anchor. Steam Sentinels form the main line.", "Grand Fang Voraxis is the enemy's strongest melee commander. Prepare for impact."],
		"battle_modifiers": {"label": "The Iron Line", "description": "Ironweld's masterwork. All infantry gain +2 DEF and +2 ATK.", "player_def_bonus": 2, "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Commander Ironweld", "They call me 'the wall.' It's meant as a compliment. I take it as one. Walls don't need glory. Walls don't need recognition. Walls need to stand. That's all. Stand, and keep standing, until the storm passes. I am the wall. The storm will pass.", "quiet_certainty"),
		ShardLore.narration("He stood on the Iron Line — a permanent defensive position now, manned around the clock, the foundation of the coalition's safety. Behind him, civilians slept soundly for the first time. Because Commander Ironweld held the line. As he always had. As he always would."),
	]
