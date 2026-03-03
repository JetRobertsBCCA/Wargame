class_name ThornweftThessariCampaign
## Brood-Warden Thessari — "The Mother's Brood"
## Spider spawning, Beast command, ATK 9, DEF 5, HP 30, MOV 5, CMD 7.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_thessari",
		"commander": "Brood-Warden Thessari",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "The Mother's Brood",
		"description": "Brood-Warden Thessari commands the living weapons of the Matriarchy — spiders, spawn, and the massive brood-mothers that birth armies on the battlefield.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Brood-Warden Thessari", "Every spider is my child. Every brood-mother an extension of my will. The others command soldiers — I command LIFE. My brood grows, adapts, evolves with every generation. The Shardlands have accelerated this process. New mutations appear daily. New breeds, new capabilities, new horrors. The Matriarchy's enemies should be terrified. My children are hungry.", "maternal_menace"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Clutch",
		"objectives_text": "Establish a brood-nest and spawn enough spiderlings to overwhelm the Emberclaw scouts.",
		"pre_story": [ShardLore.dialogue("Brood-Warden Thessari", "The first nest must be established in secure ground. Once the brood-mother begins spawning, we'll have an army within hours. The Emberclaw have scouts in the area — they must be cleared before the nest is vulnerable. Spider Handlers, secure the perimeter. Spiderling Swarms, sweep the approaches. Mother is working.", "protective")],
		"post_story": [ShardLore.dialogue("Brood-Warden Thessari", "The nest is established. The first clutch is hatching. Two hundred spiderlings in the first generation, each one carrying venom glands adapted for Shardlands prey. The Emberclaw scouts have been consumed — their biomass will nourish the second generation. Nature provides. Mother provides.", "nurturing_terror")],
		"defeat_story": [ShardLore.dialogue("Brood-Warden Thessari", "They burned the nest. My children... the eggs... all gone. Fire. Always fire. I will need a fire-resistant generation. The Shardlands will provide the mutations I need.", "grieving")],
		"player_army": ["Brood-Warden Thessari", "Spiderling Swarm", "Spider Handlers", "Spiderling Scouts", "Web-Anchor Engineers"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Ritual Cpt Tsukihana", "Inkblade Initiates", "Void Bolt Crossbowmen"],
		"battle_size": "skirmish",
		"scenario": "king_of_the_hill",
		"round_limit": 6,
		"tutorial_tips": ["King of the Hill — the brood-nest. Hold it at all costs.", "Spiderling Swarms are expendable. Use them to screen.", "Spider Handlers spawn more spiderlings mid-battle.", "Web-Anchor Engineers create web terrain around the nest."],
		"battle_modifiers": {"label": "First Clutch", "description": "Brood spawning. Player gains reinforcement spiderlings.", "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Brood Grows",
		"objectives_text": "Deploy the Brood-Mother Spider in combat for the first time. Watch it spawn mid-battle.",
		"pre_story": [ShardLore.dialogue("Brood-Warden Thessari", "The Brood-Mother Spider is ready for her first battlefield deployment. She's magnificent — twenty feet of chitin, venom, and maternal fury. She spawns spiderlings mid-battle, each generation more adapted to the current enemy. The Iron Dominion won't know what hit them. Actually, they'll know exactly what hit them. It's the THOUSANDS of spiderlings that follow that will surprise them.", "proud_mother")],
		"post_story": [ShardLore.dialogue("Brood-Warden Thessari", "Three generations spawned during the battle. The first generation scouted. The second generation attacked. The third generation? They had ARMOR. Adapted chitin that turned aside bayonet strikes. Three generations of evolution in thirty minutes. The Brood-Mother is beyond any weapon I've seen. She doesn't just fight — she ADAPTS.", "awestruck")],
		"defeat_story": [ShardLore.dialogue("Brood-Warden Thessari", "They targeted the Brood-Mother exclusively. Every gun, every soldier, every machine — all aimed at her. They understood. Kill the mother, the brood dies. I need better protection for her.", "protective_rage")],
		"player_army": ["Brood-Warden Thessari", "Brood-Mother Spider", "Spiderling Swarm", "Spider Handlers", "Gossamer Guard", "Cocoon Wardens", "Silk-Warden Regulars"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["High Engineer Vortan", "Clockwork Infantry", "Steam Heavy Guards", "Steam Artillery Crew", "Mechanized Scouts", "Aether Marksmen"],
		"battle_size": "standard",
		"scenario": "shardstorm",
		"round_limit": 7,
		"tutorial_tips": ["Brood-Mother Spider spawns spiderlings each round.", "Protect the Brood-Mother. She's the army generator.", "Gossamer Guard screens her from direct attacks.", "Spider Handlers boost spawn rate. Keep them near the Brood-Mother.", "Every round she survives, your army grows larger."],
		"battle_modifiers": {"label": "Brood Grows", "description": "Spawning war. Brood-Mother generates units. +1 DEF for all spider units.", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Swarm War",
		"objectives_text": "Thessari's brood vs the Nightfang's beast hordes. Nature red in tooth and claw.",
		"pre_story": [ShardLore.dialogue("Brood-Warden Thessari", "The Nightfang send their tigers. Their beasts. Their creatures of hunger and blood. They think themselves the masters of nature's violence? They breed PREDATORS. I breed SWARMS. One tiger can kill ten spiderlings. But I have a THOUSAND spiderlings. And each one carries enough venom to paralyze an elephant. The math is simple. The violence will be spectacular.", "grim_math")],
		"post_story": [ShardLore.dialogue("Brood-Warden Thessari", "The tigers fought magnificently. Truly. But they were outnumbered fifty to one. The swarm covered them like a living carpet. Venom from a thousand tiny fangs. Even the Elder Tiger Horror fell — not to one great wound, but to ten thousand small ones. The Nightfang understood predators. I understand ECOLOGY. And in any ecosystem, the swarm defeats the predator.", "naturalist")],
		"defeat_story": [ShardLore.dialogue("Brood-Warden Thessari", "The tigers were too fast. They broke through the swarm before it could mass. Predator speed vs swarm numbers... the equation isn't as simple as I thought.", "reconsidering")],
		"player_army": ["Brood-Warden Thessari", "Brood-Mother Spider", "Spiderling Swarm", "Spiderling Scouts", "Spider Handlers", "Queen-Spawn War-mount", "Cocoon Wardens"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Grand Fang Voraxis", "Tiger Berserkers", "Tiger Chargers", "Tiger Scout Pack", "Tiger Alpha", "Elder Tiger Horror"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["Swarm vs predators. Use numbers to overwhelm.", "Queen-Spawn War-mount is your apex predator. It matches their tigers.", "Brood-Mother Spider generates reinforcements. Time is your ally.", "Spiderling Swarms are expendable. Sacrifice them to protect key units.", "Cocoon Wardens harvest the fallen. Nothing is wasted."],
		"battle_modifiers": {"label": "Swarm War", "description": "Ecological warfare. Spider units gain +1 ATK from venom saturation.", "player_atk_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Mother's Brood",
		"objectives_text": "Deploy the full brood. Every spider, every swarm, every horror Thessari has bred.",
		"pre_story": [
			ShardLore.dialogue("Brood-Warden Thessari", "The full brood deploys today. Every spider I've bred, every horror I've nurtured, every mutation I've cultivated. The Emberclaw think fire defeats webs. They're right — fire defeats WEBS. But fire does not defeat a thousand armored spiders pouring from every shadow, every crack, every dark corner. My children are everywhere. And they are SO hungry.", "ultimate_mother"),
		],
		"post_story": [
			ShardLore.narration("The battlefield disappeared beneath a living carpet of chitin and legs. Thessari's brood covered everything — the ground, the walls, the sky, the enemy. The Emberclaw fought with fire and fury, but for every spider they burned, ten more emerged from the Brood-Mother's endless spawning. In the end, even fire runs out. Spiders don't."),
			ShardLore.dialogue("Brood-Warden Thessari", "My children. My beautiful, terrible children. They grow, they adapt, they EVOLVE. Every battle makes them stronger. Every generation improves on the last. The Matriarchy doesn't need soldiers. It needs MOTHERS. And I am the greatest mother the Web has ever known.", "fulfilled"),
		],
		"defeat_story": [ShardLore.dialogue("Brood-Warden Thessari", "They burned everything. The brood, the nest, the eggs. All of it. But I survived. And as long as I survive, the brood can be rebuilt. One egg at a time. One generation at a time. A mother's patience is infinite.", "undaunted")],
		"player_army": ["Brood-Warden Thessari", "Brood-Mother Spider", "Queen-Spawn War-mount", "Spiderling Swarm", "Spider Handlers", "Gossamer Guard", "Cocoon Wardens", "Cocoon Harvester", "Venom Engine"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Emberforged Blades", "Unbonded Berserkers", "Emberclaw Warriors", "Mature War Drake", "Immolation Bombers", "Pyromancer Adepts", "Ashrider Scouts"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Full brood deployment. Spider apocalypse.", "Brood-Mother Spider and Queen-Spawn War-mount are your linchpins.", "Cocoon Harvester processes fallen enemies for resources.", "Venom Engine creates poison zones. Area denial.", "Spiderling Swarms screen everything. They're expendable; your war machines aren't.", "Fire is the counter. Keep your key units away from Flame Shamans."],
		"battle_modifiers": {"label": "The Mother's Brood", "description": "Full swarm. Spider units gain +2 ATK and regenerate.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Brood-Warden Thessari", "The others fight for territory, for power, for the Pattern. I fight for my children. Every egg, every hatchling, every generation is a promise — a promise that life continues, that the web grows, that the Matriarchy endures through BIOLOGY. Not fate. Not silk. Not venom. Life. Simple, hungry, unstoppable life. That is my legacy. That is my brood.", "maternal_finale"),
	]
