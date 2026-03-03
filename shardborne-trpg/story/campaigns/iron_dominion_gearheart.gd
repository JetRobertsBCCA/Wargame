class_name IronDominionGearheartCampaign
## Lord Gearheart — "The Combined Arms Doctrine"
## Combined arms, Versatile, CMD 7. Every unit type, all coordinated.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_gearheart",
		"commander": "Lord Gearheart",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Combined Arms Doctrine",
		"description": "Lord Gearheart is not a specialist. He commands everything — infantry, cavalry, artillery, war machines, scouts, engineers. His doctrine: no single arm wins alone. Together, they are unstoppable.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Lord Gearheart", "Steamjaw sees war as punching. Aetheris sees it as shooting. Cogsworth sees it as riding very fast. They're all correct — and all incomplete. War is ALL of those things, at the same time, coordinated by someone who understands how they fit together. That someone is me.", "matter_of_fact"),
		ShardLore.narration("Lord Gearheart's command tent had five separate communication arrays, each linked to a different arm of his forces. He moved between them like a conductor among instruments, orchestrating a symphony of steel, steam, and gun-smoke."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Combined Arms Exercise",
		"objectives_text": "Coordinate infantry, cavalry, and artillery against a Thornweft skirmish force.",
		"pre_story": [ShardLore.dialogue("Lord Gearheart", "Simple combined arms drill. Artillery softens the position, cavalry flanks, infantry advances through the gap. Every unit has its role. Every role is essential. No one fights alone, no one claims glory alone. We win because we work together.", "instructive")],
		"post_story": [ShardLore.dialogue("Lord Gearheart", "Textbook execution. The cavalry hit at the exact moment the artillery ceased fire. The infantry advanced through smoke perfectly. Six units, three arms, one outcome. This is what coordination looks like.", "pleased")],
		"defeat_story": [ShardLore.dialogue("Lord Gearheart", "Timing was off. The cavalry arrived before the artillery finished. Friendly fire. My fault — I miscalculated the cavalry's speed across web-terrain.", "accountable")],
		"player_army": ["Lord Gearheart", "Infantry Regiment", "Clockwork Cavalry", "Steam Artillery Crew", "Mechanized Scouts", "Gearwright Engineers"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Gossamer Guard", "Silk-Warden Regulars", "Spiderling Swarm", "Web-Spinner Sappers"],
		"battle_size": "skirmish",
		"scenario": "shardstorm",
		"round_limit": 6,
		"tutorial_tips": ["Combined arms: use each unit type for its strength.", "Artillery softens targets, cavalry flanks, infantry holds ground.", "Scouts provide targeting data. Move them ahead of your main force.", "Gearheart's Versatile special lets him buff any unit type."],
		"battle_modifiers": {"label": "Combined Arms", "description": "Coordinated warfare. All units gain +1 ATK and +1 DEF.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "All Arms Advance",
		"objectives_text": "Secure the supply corridor using all five combat arms simultaneously.",
		"pre_story": [ShardLore.dialogue("Lord Gearheart", "Five objectives, five arms. Scouts map the route. Infantry secures the corridor. Artillery provides overwatch. Cavalry screens the flanks. Engineers build supply stations. Everyone moves, everyone fights, everyone contributes. That's the doctrine.", "focused")],
		"post_story": [ShardLore.dialogue("Lord Gearheart", "Corridor secured. All five arms performed at peak efficiency. This is the model for every future operation. Calculon wants specialists? Fine. But he also needs someone who can command everything at once. That's my value.", "confident")],
		"defeat_story": [ShardLore.dialogue("Lord Gearheart", "The arms couldn't coordinate across this terrain. The supply corridor was too dispersed. I need better communication relays.", "problem_solving")],
		"player_army": ["Lord Gearheart", "Elite Vanguard", "Steam Lancers", "Steam Artillery Crew", "Mechanized Scouts", "Clockwork Pioneers", "Steam Medic Corps"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Yukimaru", "Oni Mask Executioners", "Veiled Ashigaru", "Crimson Oni Riders", "Dreampiercer Archers", "Banner of Silent Prayer"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply Lines — secure the supply points along the corridor.", "Steam Lancers can rapidly reposition. Use them to respond to threats.", "Supply Lines: hold the points. Every arm has a role."],
		"battle_modifiers": {"label": "All Arms Advance", "description": "Every arm contributes. +1 ATK to all units.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Grand Maneuver",
		"objectives_text": "Execute a complex five-phase maneuver to encircle the Emberclaw warband.",
		"pre_story": [ShardLore.dialogue("Lord Gearheart", "Phase one: scouts fix the enemy position. Phase two: artillery pins them. Phase three: infantry advances to contact. Phase four: cavalry envelops from both flanks. Phase five: war machines advance through the center. Five phases, five arms, one encirclement. They'll be surrounded before they realize what's happening. The Grand Maneuver.", "strategic")],
		"post_story": [ShardLore.dialogue("Lord Gearheart", "Complete encirclement. Every unit exactly where it should be, exactly when it should be there. Steamjaw would have just charged them. Aetheris would have just shot them. But this — this is ART. The Iron Dominion's military doctrine, executed flawlessly. Calculon will want to study this for the war college.", "pride")],
		"defeat_story": [ShardLore.dialogue("Lord Gearheart", "The Emberclaw broke through phase four before the cavalry completed the envelopment. Drakes are faster than I projected. Need to adjust the timing for airborne threats.", "analyzing")],
		"player_army": ["Lord Gearheart", "Elite Vanguard", "Aether Dragoons", "Gearwright Artillery", "Steam Recon Flyers", "Clockwork Titan", "Clockwork Pioneers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Skydancer Lyss", "Emberforged Blades", "Emberclaw Warriors", "Unbonded Berserkers", "Mature War Drake", "Ashrider Scouts"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Execute the five phases in order for maximum effect.", "Steam Recon Flyers can scout the entire map. Move them first.", "Aether Dragoons are your mobile cavalry strike force.", "Clockwork Titan anchors the center advance."],
		"battle_modifiers": {"label": "Grand Maneuver", "description": "Five-phase coordination. All units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Combined Arms Doctrine",
		"objectives_text": "Full-scale combined arms battle against the Nightfang main force. Every arm, every weapon, every soldier.",
		"pre_story": [
			ShardLore.dialogue("Lord Gearheart", "This is the battle that proves the doctrine. Every arm of the Iron Dominion, coordinated under one command. Infantry, cavalry, artillery, war machines, engineers, scouts, specialists — all of them, all at once, all working as one. This isn't just my battle. This is the future of warfare.", "visionary"),
			ShardLore.narration("Lord Gearheart's army was the most diverse force in the Shardlands — not the largest, not the strongest, but the most complete. Every capability, every specialization, every possible response to every possible threat. Where other commanders were hammers, Lord Gearheart was an entire toolbox."),
		],
		"post_story": [
			ShardLore.narration("The battle was a masterpiece of coordination. Infantry held the line while cavalry flanked. Artillery suppressed while scouts directed fire. War machines advanced while engineers maintained. Every arm supported every other arm in an interlocking matrix of military capability that left the Nightfang with no weak point to exploit, no gap to exploit, no strategy that wasn't already countered."),
			ShardLore.dialogue("Lord Gearheart", "The Combined Arms Doctrine: no specialization, no weakness, no single point of failure. Every arm compensates for every other arm's limitations. Infantry can't charge? Cavalry charges. Cavalry can't hold? Infantry holds. Nobody can breach? War machines breach. Nothing works alone. Everything works together. THAT is how the Iron Dominion fights. THAT is how we win.", "definitive"),
		],
		"defeat_story": [ShardLore.dialogue("Lord Gearheart", "Too many threats, too many directions. Even combined arms has limits when you're outnumbered four to one. The doctrine works. The numbers didn't.", "honest")],
		"player_army": ["Lord Gearheart", "Elite Vanguard", "Iron Stampede", "Steam Artillery Crew", "Clockwork Titan", "Mechanized Scouts", "Gearwright Engineers", "Aether Marksmen"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Grand Fang Voraxis", "Blood Reavers", "Tiger Berserkers", "Nightfang Warriors", "Shadow Stalkers", "Blood Shamans", "Crimson Behemoth", "Nightfang Dragon"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Full combined arms. Use EVERY unit type's specialty.", "Iron Stampede is your heavy cavalry. Use for decisive charges.", "Aether Marksmen provide precision ranged support.", "Grand Fang Voraxis is brutal. Coordinate all arms against him."],
		"battle_modifiers": {"label": "Combined Arms Doctrine", "description": "Full coordination. All units gain +2 ATK and +2 DEF.", "player_atk_bonus": 2, "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Lord Gearheart", "They'll ask: 'What made Lord Gearheart special?' And the answer is: nothing. I'm not the best fighter. Not the best engineer. Not the best strategist. But I'm the only one who can command all of them at the same time and make them work together. Specialization is a luxury. Coordination is a necessity. And I am very, very good at coordination.", "humble_confidence"),
		ShardLore.narration("Lord Gearheart returned to his command tent, five communication arrays chirping simultaneously. He adjusted his monocle, cracked his knuckles, and began orchestrating the next operation. Five arms. One commander. The Combined Arms Doctrine, in practice and in person."),
	]
