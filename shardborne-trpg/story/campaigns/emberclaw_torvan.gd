class_name EmberclawTorvanCampaign
## Embersmith Torvan — "Forge of the Fallen"
## Equipment crafting, War machine buffs. Engineering/siege campaign.
## 4 missions. Teaches war machine play, support buffs, defensive positioning.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_torvan",
		"commander": "Embersmith Torvan",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "Forge of the Fallen",
		"description": "Embersmith Torvan is the greatest weaponsmith the Emberclaw have ever produced. In the Shardlands, without a proper forge, he must build one from shard-metal and alien fire — or the warpack's weapons will crumble to rust.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The last blade snapped."),
		ShardLore.narration("Torvan held the two halves of what had been the finest obsidian-steel sword in the Emberclaw arsenal. The shard-air was corroding the metal — oxidizing it from the inside, turning legendary weapons into brittle rust."),
		ShardLore.dialogue("Embersmith Torvan", "The air here eats metal. Our weapons are dying. Give me ore, give me heat, give me a week — I'll build a forge that can work shard-metal. Without that, we're fighting with sticks inside a month.", "matter-of-fact"),
		ShardLore.narration("Torvan was not dramatic. He was not inspirational. He was a smith — broad-shouldered, calloused, quiet — and he solved problems with hammers and heat. The warpack needed inspiration from its other commanders. From Torvan, it needed functioning weapons."),
		ShardLore.fhah_zolg("The tinker. Not the flashiest piece on the board, but remove him and the whole army falls apart. I respect infrastructure."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Ore Run",
		"objectives_text": "Secure the shard-ore deposit before the Iron Dominion claims it for their own forges.",
		"pre_story": [
			ShardLore.dialogue("Embersmith Torvan", "Shard-ore. Rich vein, surface-level, easy extraction. The machine-folk want it too. Difference is, I'll make weapons. They'll make more machines to make more machines. We get there first.", "practical"),
		],
		"post_story": [
			ShardLore.narration("Torvan was already assaying the ore before the last Iron Dominion unit retreated. He crushed a sample between his fingers, tasted it (a habit that horrified everyone), and nodded."),
			ShardLore.dialogue("Embersmith Torvan", "Good carbon content. High fragment density. This ore will accept enchantment. I can work with this. Get me charcoal and a windbreak, and I'll have a field-forge running by morning.", "satisfied"),
		],
		"defeat_story": [
			ShardLore.dialogue("Embersmith Torvan", "They took the ore. Fine. There are other veins. But our weapons won't last much longer without new stock.", "worried"),
		],
		"player_army": ["Embersmith Torvan", "Emberclaw Warriors", "Embersmith Apprentices", "Bonfire Keepers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Clockwork Pioneers", "Clockwork Infantry", "Steam Sentinels"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Shard Clash: control the ore deposit (shard) to win.", "Torvan's Equipment Mastery special buffs nearby units' performance.", "Embersmith Apprentices support war machines. Keep them near your heavy units."],
		"battle_modifiers": {"label": "Field Repairs", "description": "Torvan can repair equipment mid-battle. Your units regain 1 HP per round.", "player_regen": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Shard-Forge",
		"objectives_text": "Defend the new forge site while Torvan completes construction. Hold for the full battle.",
		"pre_story": [
			ShardLore.dialogue("Embersmith Torvan", "The forge needs six hours to set. The foundation-stones must cool in sequence, the bellows need calibration, the quench-tank needs proper shard-water. Hold the perimeter while I work. Don't bother me unless something is on fire. Intentionally on fire, I mean.", "focused"),
		],
		"post_story": [
			ShardLore.narration("The Shard-Forge blazed to life — a column of blue-white flame fed by fragment energy, hot enough to work any metal in the Shardlands. Torvan tested it with a raw bar of shard-ore, and in twenty minutes produced a blade that sang when it cut the air."),
			ShardLore.dialogue("Embersmith Torvan", "First blade. Shard-steel. Stronger than anything I ever made in Ignareth. This place is eating our old weapons, but the new ones... the new ones are better. Funny how that works.", "wonder"),
		],
		"defeat_story": [
			ShardLore.dialogue("Embersmith Torvan", "They cracked the foundation-stones. Two days wasted. Get me new ones and more guards.", "irritated"),
		],
		"player_army": ["Embersmith Torvan", "Emberclaw Warriors", "Flameborn Guard", "Bonfire Keepers", "Pyroclast Catapult", "Ember Ballista"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Masked Lord Kurohane", "Kintsugi Blademasters", "Shrine Wardens", "Void Crane Riders", "Celestial Slingers", "Ink Sigil Crafters"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Last Stand: survive all rounds to win.", "Position the Pyroclast Catapult and Ember Ballista to cover approaches.", "Bonfire Keepers maintain morale. Position them centrally.", "Torvan buffs war machines — keep him near your artillery."],
		"battle_modifiers": {"label": "Forge Heat", "description": "The forge radiates heat. Your units gain +1 DEF near the center.", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "War Machine",
		"objectives_text": "Field-test Torvan's new war machines against the Thornweft siege force.",
		"pre_story": [
			ShardLore.dialogue("Embersmith Torvan", "I've built three new war machines from shard-steel. They need field testing. The spider-folk are obliging enough to provide targets. Everything is calibrated in theory — now we find out if theory survives contact with giant spiders.", "dry"),
		],
		"post_story": [
			ShardLore.narration("The war machines performed beyond specifications. The Fragment Launcher's range exceeded estimates by thirty percent. The Ember Ballista's penetration punched through Brood-Mother chitin. The Pyroclast Catapult's area effect turned web-fortifications into infernos."),
			ShardLore.dialogue("Embersmith Torvan", "All three machines functional. Two modifications needed — the Launcher's recoil dampener and the Ballista's elevation gear. Give me a day and they'll be perfect. Well. Closer to perfect. Nothing is ever perfect.", "almost-smiling"),
		],
		"defeat_story": [
			ShardLore.dialogue("Embersmith Torvan", "The recoil shattered the mounting. My calculations were off. Back to the forge.", "analytical"),
		],
		"player_army": ["Embersmith Torvan", "Embersmith Apprentices", "Pyroclast Catapult", "Fragment Launcher", "Ember Ballista", "Flameborn Guard", "Emberclaw Warriors"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Warden Regulars", "Gossamer Guard", "Spiderling Swarm", "Brood-Mother Spider", "Vibration Drummers", "Web-Anchor Engineers"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["This battle is about your war machines. Protect them at all costs.", "Embersmith Apprentices repair and boost war machines. Position them adjacent.", "Fragment Launcher has extreme range. Place it in the back and rain fire.", "The Ember Ballista pierces armor. Target the Brood-Mother Spider."],
		"battle_modifiers": {"label": "Master Smith", "description": "Torvan's war machines are enhanced. All war machines gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Arsenal",
		"objectives_text": "Deliver the new shard-steel weapons to the coalition forces. Protect the supply convoy against all attackers.",
		"pre_story": [
			ShardLore.dialogue("Embersmith Torvan", "Two hundred shard-steel blades. Fifty sets of armor. Three war machines. Everything the coalition needs to arm their combined force. This convoy reaches the meeting point, or the coalition fights with sticks. No pressure.", "deadpan"),
		],
		"post_story": [
			ShardLore.narration("The convoy arrived intact. Two hundred blades distributed across five factions — each one bearing Torvan's maker's mark, each one stronger than anything the Shardlands had seen."),
			ShardLore.dialogue("Embersmith Torvan", "The weapons are delivered. Every faction is armed. The shard-steel holds. My forge works. My machines work. My blades work. That is my contribution to this coalition. Not speeches, not prophecies. Working steel.", "quiet_pride"),
			ShardLore.narration("Vex clasped Torvan's shoulder. 'Without you, we fight with our teeth.' Torvan shrugged. 'Teeth break too. I could make you some in shard-steel, if you want.'"),
		],
		"defeat_story": [
			ShardLore.dialogue("Embersmith Torvan", "The convoy is lost. Months of work, scattered across the wasteland. I'll rebuild. It's what I do.", "resigned"),
		],
		"player_army": ["Embersmith Torvan", "Flameborn Guard", "Scorched Veterans", "Pyroclast Catapult", "Fragment Launcher", "Ember Ballista", "Embersmith Apprentices", "Ashrider Scouts"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Grand Fang Voraxis", "Blood Reavers", "Tiger Berserkers", "Shadow Stalkers", "Nightfang Warriors", "Nightfang Dragon", "Blood Shamans"],
		"battle_size": "epic",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply Lines: get the convoy (your units) across the map.", "Grand Fang Voraxis is a dangerous enemy commander. Avoid direct engagement.", "Use war machines to clear the path from range, ground units to escort.", "Ashrider Scouts can screen enemy flankers."],
		"battle_modifiers": {"label": "Shard-Steel", "description": "All units equipped with Torvan's new weapons. Everyone gains +1 ATK.", "player_atk_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Torvan sat by his forge, filing the imperfections from a blade that most smiths would call flawless. Behind him, the Shard-Forge hummed — a permanent installation now, the beating heart of the Emberclaw war effort."),
		ShardLore.dialogue("Embersmith Torvan", "People ask me if I'm happy here. What kind of question is that? I have ore, I have fire, I have work. A smith doesn't need happiness. A smith needs a problem and a hammer. This world has plenty of both.", "content"),
		ShardLore.narration("He returned to his filing. The blade would be ready by morning. As would the next one. And the one after that. Wars were won by the soldiers who fought them — but they were sustained by the smiths who armed them."),
	]
