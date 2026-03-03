class_name VeilboundYukimaruCampaign
## Elite Cmdr Yukimaru — "The Snow Strike"
## Fast strike, Flanking. ATK 15, DEF 4, HP 30, MOV 9, CMD 7.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_yukimaru",
		"commander": "Elite Cmdr Yukimaru",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "The Snow Strike",
		"description": "Elite Commander Yukimaru strikes like snow falling — silent, beautiful, and devastating in accumulation. The fastest flanker in the Shogunate.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Elite Cmdr Yukimaru", "Snow does not announce itself. It arrives in silence. A single flake is nothing — but ten thousand flakes in the right place become an avalanche. My strikes are the same: each one light, precise, seemingly insignificant. But I strike from every angle, every approach, every blind spot. And eventually, the weight of accumulated cuts brings down even the mightiest warrior. The Snow Strike is not about power. It is about inevitability.", "quiet_intensity"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "First Snowfall",
		"objectives_text": "Use flanking strikes to destabilize an Iron Dominion patrol without direct engagement.",
		"pre_story": [ShardLore.dialogue("Elite Cmdr Yukimaru", "The Iron Dominion patrol follows its programmed route with clockwork precision. Which means I know EXACTLY where they'll be at every moment. My Void Serpent Harriers will hit their flanks. Moonlit Wanderers will strike and fade. I myself will appear from the direction they least expect. Three simultaneous strikes from three angles — each too light to justify pursuit, too damaging to ignore. The snow begins to fall.", "calm")],
		"post_story": [ShardLore.dialogue("Elite Cmdr Yukimaru", "Fourteen flanking strikes in twelve minutes. No single strike inflicted critical damage, but the cumulative effect was devastating — disrupted formations, scattered morale, confused command chains. They tried to respond to each strike individually and exhausted themselves chasing shadows. The first snowfall is always light. It's the accumulation that buries.", "understated")],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Yukimaru", "They maintained cohesion through every flanking strike. Their discipline is... admirable. Need to find gaps in their adaptation cycles.", "thoughtful")],
		"player_army": ["Elite Cmdr Yukimaru", "Void Serpent Harriers", "Moonlit Wanderers", "Spirit Wolf Packs", "Inkblade Initiates"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lady Cogsworth", "Clockwork Infantry", "Mechanized Scouts", "Infantry Regiment"],
		"battle_size": "skirmish",
		"scenario": "supply_lines",
		"round_limit": 5,
		"tutorial_tips": ["Yukimaru flanks. Never attack from the front.", "Void Serpent Harriers phase through terrain for flanking.", "Moonlit Wanderers disengage freely after striking.", "Spirit Wolf Packs gain Flank Bonus when surrounding enemies.", "Strike, fade, reposition, strike again. Accumulate damage."],
		"battle_modifiers": {"label": "First Snowfall", "description": "Flanking doctrine. All units gain +1 ATK from flank.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Blizzard",
		"objectives_text": "Execute a full blizzard offensive — simultaneous flanking strikes from every direction.",
		"pre_story": [ShardLore.dialogue("Elite Cmdr Yukimaru", "A blizzard is a snowstorm that attacks from every direction at once. That is my plan today against the Emberclaw. They've set up a defensive camp — fires burning, sentries watching the obvious approaches. I have units hidden on EVERY approach. North, south, east, west, above, below. When the blizzard strikes, there IS no safe direction. Every facing is a flank. Every direction is a threat. In a blizzard, the concept of 'front' ceases to exist.", "predatory_calm")],
		"post_story": [ShardLore.dialogue("Elite Cmdr Yukimaru", "Total confusion. Their sentries reported attacks from all directions simultaneously — because attacks came from ALL DIRECTIONS simultaneously. They couldn't face one threat without turning their back on another. That's the blizzard: not individual strikes, but the TOTALITY of threat. When every direction is dangerous, no defensive formation is valid. And when no formation is valid, even the bravest warriors become lost in the snow.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Yukimaru", "They formed a circle defense — all directions covered equally. Simple, effective, and it negated the blizzard. Need to find ways to break the circle.", "recalculating")],
		"player_army": ["Elite Cmdr Yukimaru", "Void Serpent Harriers", "Moonlit Wanderers", "Spirit Wolf Packs", "Lunar Kitsune Riders", "Spirit Javelin Skirmishers", "Silent Ink Assassins"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Skywatcher Orin", "Emberclaw Warriors", "Unbonded Berserkers", "Silent Wing Scouts", "Fledgling Swarm", "Pyromancer Adepts"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 6,
		"tutorial_tips": ["The Blizzard — attacks from every direction.", "Lunar Kitsune Riders create illusory threats to confuse.", "Silent Ink Assassins eliminate sentries and spotters.", "Spirit Javelin Skirmishers harass at range while melee flanks.", "Spread your forces to surround, then strike simultaneously.", "The broken ground provides cover for repositioning."],
		"battle_modifiers": {"label": "The Blizzard", "description": "All-direction assault. All units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Winter's Edge",
		"objectives_text": "Use precision flanking to systematically dismantle a Thornweft web-defense from the outside in.",
		"pre_story": [ShardLore.dialogue("Elite Cmdr Yukimaru", "The Thornweft web-defense is layered — outer traps, middle barriers, inner strongpoints. A frontal assault would get tangled in the first layer. But the snow doesn't attack defenses. It goes AROUND them. Between them. Under them. My units will infiltrate the gaps in their web, striking the connections between layers rather than the layers themselves. Cut the threads that hold the web together, and the entire structure collapses. Winter's edge is sharp — and it cuts silk.", "precise")],
		"post_story": [ShardLore.dialogue("Elite Cmdr Yukimaru", "The web collapsed inward. Not from overwhelming force — from precisely targeted cuts at structural weak points. Seventeen threads cut in sequence, each one weakening the next section's support. The Thornweft built their defense as a unified web. That meant a unified web could be UNRAVELED — one thread at a time, from the outside in. Winter's edge: patient, precise, final.", "clinical_satisfaction")],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Yukimaru", "The web self-healed. The threads I cut were replaced faster than I could sever them. Their web is alive. You cannot kill what regenerates. Need to find the SOURCE of the regeneration.", "analytical")],
		"player_army": ["Elite Cmdr Yukimaru", "Void Serpent Harriers", "Silent Ink Assassins", "Lotus Phantom Assassins", "Moonlit Wanderers", "Spirit Wolf Packs", "Ink Shadow Scouts"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Thread-Seer Kythara", "Thread-Warden Infantry", "Gossamer Guard", "Web-Spinner Sappers", "Gossamer Trap Layers", "Silk-Shadow Scouts", "Web-Anchor Engineers"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Precision flanking — cut the web from outside in.", "Lotus Phantom Assassins teleport to structural weak points.", "Silent Ink Assassins eliminate web-builders and engineers.", "Ink Shadow Scouts locate the critical connection points.", "Void Serpent Harriers phase through web barriers.", "Patience. Cut one thread at a time."],
		"battle_modifiers": {"label": "Winter's Edge", "description": "Precision strikes. All flanking units gain +1 ATK, +1 DEF.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Snow Strike",
		"objectives_text": "Execute the ultimate flanking offensive — the Snow Strike that buries an army.",
		"pre_story": [
			ShardLore.dialogue("Elite Cmdr Yukimaru", "The avalanche begins with a single snowflake. Today, I am that snowflake. And behind me, an entire mountain of Veilbound warriors waits to descend. The Nightfang army thinks they're pursuing a raiding force. They don't know that every step forward takes them deeper into my kill zone. When the Snow Strike falls, it falls from ABOVE — the weight of a mountain, the silence of snow, the finality of winter. There is no surviving an avalanche. There is only the question of how deep you're buried.", "winter_fury"),
			ShardLore.narration("They moved like snowflakes — each warrior independent, each path unique, but all falling in the same direction. Yukimaru had positioned thirty units across seven elevation points, creating a cascade of flanking strikes that would flow downhill like an avalanche. The Nightfang, drawn into the valley by the retreating scouts, looked up too late."),
		],
		"post_story": [
			ShardLore.narration("The Snow Strike was documented in strategic treatises for generations afterward as the perfect flanking operation. No enemy unit was attacked from the front. Every strike came from a blind spot. The cascade of attacks flowed from high ground to low like snowmelt — each strike channeling enemies into the next. The Nightfang army didn't fall in battle. It was BURIED."),
			ShardLore.dialogue("Elite Cmdr Yukimaru", "A single snowflake is nothing. A blizzard is inconvenient. But an avalanche is GEOLOGICAL. That is the Snow Strike — not individual flanking maneuvers, but the accumulated weight of a hundred perfectly positioned strikes all releasing at once. Snow is patient. Snow is quiet. And when snow MOVES, nothing in the world can stop it. I am Yukimaru. I am the Snow Strike. And winter has come.", "final_serenity"),
		],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Yukimaru", "They scattered before the avalanche could form. Ran in eight directions. My cascade had no single target. Snow cannot bury what has already dissolved. Next time, I seal the exits FIRST.", "grudging")],
		"player_army": ["Elite Cmdr Yukimaru", "Void Serpent Harriers", "Moonlit Wanderers", "Spirit Wolf Packs", "Silent Ink Assassins", "Lotus Phantom Assassins", "Lunar Kitsune Riders", "Dreambound Riders", "Void Crane Riders"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Grand Fang Voraxis", "Plague Knights", "Blood Reavers", "Elder Tiger Horror", "Thrall Riders", "Blight Hound Pack", "Shadow Stalkers", "Corrupted Militia"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["The ultimate flanking offensive. Every unit attacks from a different angle.", "Dreambound Riders Dream Walk into the enemy's deepest rear.", "Void Crane Riders perform Spirit Descent strikes from above.", "Lunar Kitsune Riders create phantom diversions.", "Lotus Phantom Assassins teleport to high-value targets.", "Never let the enemy face you. ALWAYS flank."],
		"battle_modifiers": {"label": "The Snow Strike", "description": "Perfect avalanche. All units gain +2 ATK from flanking.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Elite Cmdr Yukimaru", "The snow falls in silence. It accumulates in patience. And when the weight is sufficient, it descends in inevitability. I am Yukimaru — the Snow Strike — and my warfare is winter itself. Not the howling blizzard. Not the dramatic frost. Just the quiet, patient, inevitable snow. Falling. Accumulating. Burying. Forever.", "final"),
	]
