class_name VeilboundAsagiriCampaign
## Elite Cmdr Asagiri — "The Morning Mist"
## Mobility, Scouting. ATK 15, DEF 4, HP 27, MOV 10, CMD 6.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_asagiri",
		"commander": "Elite Cmdr Asagiri",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "The Morning Mist",
		"description": "Elite Commander Asagiri moves like morning mist — everywhere and nowhere, seen by none until it is too late. Speed, scouting, and the art of the unseen strike.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Elite Cmdr Asagiri", "In Reishima, I was the mist that moved between the mountain shrines — invisible, silent, everywhere at dawn. In the Shardlands, the mist gathers differently, but the principle holds. You cannot fight what you cannot find. You cannot defend what you cannot see coming. I am moving before the enemy knows I exist. By the time they see me, I've already been and gone. The morning mist does not clash with the sun. It simply arrives first.", "serene_confidence"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "First Light",
		"objectives_text": "Scout and map enemy positions before dawn, then strike their most vulnerable point.",
		"pre_story": [ShardLore.dialogue("Elite Cmdr Asagiri", "The Emberclaw camp spreads across the valley — fires burning, sentries posted. They feel safe. Ink Dragon Scouts have mapped every patrol route, every gap in their perimeter, every blind spot in their sentries. I know where they are strong and where they are weak. The mist moves to the weak point. Always the weak point.", "planning")],
		"post_story": [ShardLore.dialogue("Elite Cmdr Asagiri", "We hit three positions in ninety seconds. Each strike timed to the gap between sentry rotations. The Emberclaw never raised an alarm until the third position was already falling. Speed of intelligence — knowing WHERE to strike — is more valuable than speed of movement. Though I have both.", "understated")],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Asagiri", "Their sentries were more alert than our scouts reported. The mist was expected. I must find new approaches.", "thoughtful")],
		"player_army": ["Elite Cmdr Asagiri", "Ink Dragon Scouts", "Ink Shadow Scouts", "Moonlit Wanderers", "Spirit Javelin Skirmishers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Skywatcher Orin", "Emberclaw Warriors", "Silent Wing Scouts", "Fledgling Swarm"],
		"battle_size": "skirmish",
		"scenario": "supply_lines",
		"round_limit": 5,
		"tutorial_tips": ["Asagiri is a scout-commander. Information is power.", "Ink Dragon Scouts and Ink Shadow Scouts reveal enemy positions.", "Moonlit Wanderers can disengage freely — hit and fade.", "Spirit Javelin Skirmishers provide ranged harassment.", "Strike weak points. Never engage enemy strengths head-on."],
		"battle_modifiers": {"label": "First Light", "description": "Scouting advantage. All units gain +1 MOV.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Through the Mist",
		"objectives_text": "Conduct a reconnaissance-in-force through Iron Dominion territory, gathering intelligence while avoiding their main body.",
		"pre_story": [ShardLore.dialogue("Elite Cmdr Asagiri", "The Iron Dominion deploys a grid of sensor constructs across this region. They think their machines see everything. They are wrong. Machines see what they are designed to see — patterns, heat signatures, movement. The mist has no pattern. It moves like water — formless, shapeless, fitting into gaps that machines cannot comprehend. We pass through their net like smoke through a chain-link fence.", "calm")],
		"post_story": [ShardLore.dialogue("Elite Cmdr Asagiri", "Every sensor construct mapped. Every patrol pattern recorded. Their entire defensive layout — a gift to our strategists. And we passed through without triggering a single alert. The Iron Dominion commands machines. I command something older and more subtle: understanding. Understanding of gaps. Understanding of timing. Understanding that the mist is patient, and patience defeats every machine ever built.", "subtle_triumph")],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Asagiri", "Their grid adapted. It LEARNED our movement patterns in real time. Machine intelligence... is unsettling. Must develop counter-adaptive tactics.", "concerned")],
		"player_army": ["Elite Cmdr Asagiri", "Ink Dragon Scouts", "Ink Shadow Scouts", "Spirit Tracker Pack", "Ink Messengers", "Lunar Kitsune Riders", "Moonlit Wanderers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lady Brassveil", "Mechanized Scouts", "Clockwork Infantry", "Steam Heavy Guards", "Infantry Regiment", "Gearwright Artillery"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["Reconnaissance-in-force. Gather intel, avoid pitched battles.", "Lunar Kitsune Riders create illusions to misdirect the enemy.", "Ink Messengers are ultra-fast couriers — MOV 10.", "Spirit Tracker Pack detects hidden enemies.", "Broken ground favors mobile scouts over heavy formations."],
		"battle_modifiers": {"label": "Through the Mist", "description": "Scout doctrine. All scout units gain +1 DEF.", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Vanishing Act",
		"objectives_text": "Extract a Veilbound garrison from behind Nightfang lines without detection.",
		"pre_story": [ShardLore.dialogue("Elite Cmdr Asagiri", "A Veilbound shrine garrison is surrounded by Nightfang forces — three days without resupply, corruption pressing in. The Shogun has ordered their extraction. Not rescue — EXTRACTION. Silent, clean, invisible. The garrison moves through escape routes my scouts have mapped. My units create diversions. The Nightfang look one way while the garrison moves the other. The morning mist covers the retreat. When the Nightfang realize the garrison is gone, we'll be three miles away.", "focused")],
		"post_story": [ShardLore.dialogue("Elite Cmdr Asagiri", "Every soul extracted. Not one casualty. The Nightfang spent six hours searching for a garrison that was already behind our lines sipping tea. That is the art of the mist: not what you DO that matters, but what the enemy THINKS you did. They think the garrison is still hiding. They are STILL searching. And I am already planning the next vanishing act.", "amused")],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Asagiri", "They found us during extraction. The corruption... it senses living spirits. My scouts couldn't mask the garrison's spiritual signatures. I need spiritual countermeasures.", "regretful")],
		"player_army": ["Elite Cmdr Asagiri", "Ink Dragon Scouts", "Ink Shadow Scouts", "Spirit Tracker Pack", "Lunar Kitsune Riders", "Moonlit Wanderers", "Shrine Wardens"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Countess Nyxara", "Blood Reavers", "Corrupted Militia", "Blight Hound Pack", "Shadow Stalkers", "Corruption Guard", "Thrall Riders"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Extraction mission. Get your units to the exit points.", "Lunar Kitsune Riders create illusion diversions.", "Ink Shadow Scouts can cloak to avoid detection.", "Moonlit Wanderers retreat freely — protect the garrison.", "Speed over combat. Every round spent fighting is a round wasted."],
		"battle_modifiers": {"label": "The Vanishing Act", "description": "Stealth extraction. All units gain +1 MOV.", "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Morning Mist",
		"objectives_text": "Execute a full-scale mist offensive — appearing from nowhere to overwhelm a fortified enemy position.",
		"pre_story": [
			ShardLore.dialogue("Elite Cmdr Asagiri", "They've fortified the ridgeline. Walls, sentries, overlapping fields of fire. A conventional approach would cost hundreds. The mist approach costs nothing. My scouts have mapped every approach. My diversionary forces are in position. The main strike force — hidden in the valleys below — will appear as if from thin air when the mist rolls in. LITERAL mist. I've had the Flow Adepts working with weather patterns for three days. At dawn, the valley fills with fog. And in the fog... Asagiri.", "master_plan"),
			ShardLore.narration("The mist rolled up the valley at first light — thick, white, impenetrable. The enemy watched it approach with unease but no alarm. Mist was weather, not warfare. They were wrong. Within the mist moved the entire Veilbound strike force — silent, invisible, and precisely positioned. When the mist reached the ridgeline, it didn't stop. It ATTACKED."),
		],
		"post_story": [
			ShardLore.narration("The ridgeline fell in eleven minutes. The defenders reported that enemies appeared from every direction simultaneously — inside their perimeter, behind their walls, atop their watchtowers. There was no advance to counter, no formation to resist. Just... mist. And within the mist, blades."),
			ShardLore.dialogue("Elite Cmdr Asagiri", "They will say it was magic. It was not. It was preparation, patience, and the understanding that visibility is not reality. What you can see limits what you believe is possible. The mist removes those limits. In the mist, everything is possible — and I am possible in EVERY direction at once. The Morning Mist. The last thing the enemy doesn't see coming.", "serene_final"),
		],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Asagiri", "They anticipated the mist. Thermal detection devices pierced the fog. Technology defeats tradition — unless tradition adapts. I must adapt.", "philosophical")],
		"player_army": ["Elite Cmdr Asagiri", "Ink Dragon Scouts", "Ink Shadow Scouts", "Lunar Kitsune Riders", "Moonlit Wanderers", "Silent Ink Assassins", "Lotus Phantom Assassins", "Void Serpent Harriers", "Dreambound Riders"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Commander Ironweld", "Steam Heavy Guards", "Infantry Regiment", "Clockwork Infantry", "Gearwright Artillery", "Mechanized Scouts", "Clockwork Titan", "Clockwork Cavalry"],
		"battle_size": "epic",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Full mist offensive. Appear from everywhere at once.", "Lotus Phantom Assassins teleport behind enemy lines.", "Dreambound Riders Dream Walk through the mist.", "Lunar Kitsune Riders create illusory diversions.", "Silent Ink Assassins eliminate key targets in the confusion.", "Speed, stealth, and overwhelming simultaneous pressure wins."],
		"battle_modifiers": {"label": "The Morning Mist", "description": "Mist offensive. All units gain +1 ATK, +1 MOV.", "player_atk_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Elite Cmdr Asagiri", "The mist comes every morning. It covers the world in silence, touches everything, and leaves without a trace. That is my warfare. That is my art. I am Asagiri — the morning mist — and like the mist, I am everywhere the enemy is not looking. And nowhere they are.", "final"),
	]
