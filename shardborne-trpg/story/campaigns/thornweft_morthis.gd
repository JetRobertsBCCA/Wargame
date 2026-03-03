class_name ThornweftMorthisCampaign
## Silk-Warden Morthis — "The Living Wall"
## Defensive web, Terrain control, ATK 9, DEF 6, HP 33, MOV 4, CMD 8.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_morthis",
		"commander": "Silk-Warden Morthis",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "The Living Wall",
		"description": "Silk-Warden Morthis transforms terrain into fortification. His web barriers are impenetrable, his defensive positions are living architecture, and nothing moves through his domain without his permission.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Silk-Warden Morthis", "The best fortress is one the enemy doesn't realize exists until they're already inside it. Web barriers, silk fortifications, gossamer traps — I don't build walls. I grow them. And once my web is woven, nothing enters or leaves without my knowledge. The Matriarchy's territory is sacred. I am the wall that keeps it so.", "stoic"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Barrier",
		"objectives_text": "Establish web fortifications and repel the Nightfang assault.",
		"pre_story": [ShardLore.dialogue("Silk-Warden Morthis", "The Nightfang press against our border. Hunger drives them. They'll come at night, in waves, with throats full of war-cries and bellies full of nothing. Let them come. The web barriers are set. The gossamer traps are primed. The Anchor Guard holds the center. They will break upon us like water on stone.", "steady")],
		"post_story": [ShardLore.dialogue("Silk-Warden Morthis", "Eleven waves. They sent eleven waves against our position. The web barriers held against every one. The gossamer traps snared their cavalry. The Anchor Guard didn't yield a single foot. DEF 6 isn't a number. It's a promise: NOTHING gets through.", "immovable")],
		"defeat_story": [ShardLore.dialogue("Silk-Warden Morthis", "They found a gap. One small gap in the web barrier, and they poured through like water. I must close every possible breach before the next assault.", "methodical")],
		"player_army": ["Silk-Warden Morthis", "Anchor Guard", "Gossamer Guard", "Web-Anchor Engineers", "Gossamer Trap Layers", "Cocoon Wardens"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Asagiri", "Temple Defenders", "Shadow Marksmen"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["Last Stand — hold the position. Do not retreat.", "Web-Anchor Engineers create web terrain. It slows enemies.", "Gossamer Trap Layers place traps. Enemies trigger them.", "Anchor Guard holds ground. They gain bonuses when stationary.", "Morthis has DEF 6. He IS the wall."],
		"battle_modifiers": {"label": "First Barrier", "description": "Fortified position. All units gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Web Grows",
		"objectives_text": "Expand web territory to control key supply points.",
		"pre_story": [ShardLore.dialogue("Silk-Warden Morthis", "Defense is not passive. The best defense is to control more territory. I'm expanding our web network to cover the three supply points in this sector. Once webbed, they become part of our fortress — reinforced, trapped, and under constant surveillance. The Emberclaw contest these points. Let them. Web-walk means my forces move through webbed terrain instantly. They don't.", "strategic")],
		"post_story": [ShardLore.dialogue("Silk-Warden Morthis", "Three supply points. Three web-fortified positions. The Emberclaw tried to burn through the barriers — partially successful, but the web self-repairs. That's the advantage of living fortification. Stone cracks. Steel rusts. Web HEALS. Every supply point is now a node in a growing fortress network. The territory is ours.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Silk-Warden Morthis", "Fire. Fire everywhere. They specifically targeted the web barriers with incendiary agents. Silk burns. I need fire-resistant web structures.", "problem_solving")],
		"player_army": ["Silk-Warden Morthis", "Web-Anchor Engineers", "Silk-Warden Regulars", "Anchor Guard", "Gossamer Trap Layers", "Tremor Sentinels", "Web-Fortress"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Embersmith Torvan", "Emberclaw Warriors", "Unbonded Berserkers", "Ashwalker Skirmishers", "Pyromancer Adepts", "Ashrider Scouts"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply Lines — hold supply points. Web them for defense.", "Web-Fortress is immovable but impenetrable. Place it on a supply point.", "Tremor Sentinels detect hidden enemies. Anti-stealth.", "Web-Anchor Engineers expand the web network each round.", "Fire counters web. Prioritize Flame Shamans."],
		"battle_modifiers": {"label": "Web Grows", "description": "Expanding fortification. Web terrain grants +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Unassailable",
		"objectives_text": "The Iron Dominion launches a full assault. Morthis holds the line with living walls.",
		"pre_story": [ShardLore.dialogue("Silk-Warden Morthis", "The Iron Dominion brings their siege engines. Steam artillery, clockwork titans, concentrated firepower designed to shatter fortifications. They've studied our web barriers and developed countermeasures. Good. I've studied their countermeasures and developed counter-countermeasures. The web is not static — it learns, it adapts, it evolves. Like the spiders that weave it.", "prepared")],
		"post_story": [ShardLore.dialogue("Silk-Warden Morthis", "Their siege engines were impressive. The Clockwork Titan nearly breached the outer barrier. But the web regenerated behind it, trapping it INSIDE the fortification. The largest threat became the most confined prisoner. That is the beauty of living architecture — the walls close around you.", "strategic_pride")],
		"defeat_story": [ShardLore.dialogue("Silk-Warden Morthis", "Concentrated aether fire. They overwhelmed the regeneration. The web couldn't heal fast enough. I need deeper layers.", "learning")],
		"player_army": ["Silk-Warden Morthis", "Web-Fortress", "Anchor Guard", "Gossamer Guard", "Fang Guard Elite", "Silk Catapult", "Web-Anchor Engineers", "Cocoon Processors"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["General Steamjaw", "Clockwork Titan", "Steam Heavy Guards", "Infantry Regiment", "Steam Artillery Crew", "Aether Marksmen"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["The Unassailable — nothing gets through.", "Web-Fortress holds the center. It cannot move but cannot be moved.", "Silk Catapult bombards from behind the web barriers.", "Cocoon Processors field-repair damaged units.", "Fang Guard Elite counter-attacks when the enemy is trapped in web."],
		"battle_modifiers": {"label": "The Unassailable", "description": "Living walls. All units gain +3 DEF.", "player_def_bonus": 3},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Living Wall",
		"objectives_text": "Morthis deploys the ultimate web fortification against the strongest army the enemy can field.",
		"pre_story": [
			ShardLore.dialogue("Silk-Warden Morthis", "The Nightfang send everything. Lord Sanguinar himself leads the assault. The Blood Patriarch, the oldest vampire, the lord of hunger and darkness. He has breached every fortress, conquered every kingdom, consumed every civilization that stood against him for ten thousand years. Today he meets a wall he cannot break. Because my wall IS. NOT. STONE. It is alive. It heals. It grows. It FIGHTS BACK.", "defiant"),
		],
		"post_story": [
			ShardLore.narration("The web fortress was a living thing — walls of silk rising and falling, traps springing and resetting, barriers healing as fast as they were torn. Sanguinar's forces crashed against it like a crimson tide against a reef, and like a reef, the living wall endured. When the tide finally receded, Silk-Warden Morthis stood atop the highest web-tower, unmoved, unharmed, unbowed."),
			ShardLore.dialogue("Silk-Warden Morthis", "Ten thousand years of conquest ends here. At my wall. Because walls are not built of stone or steel or even silk. Walls are built of WILL. And my will is as strong as the web that surrounds us. The Living Wall stands. The Living Wall ENDURES.", "eternal"),
		],
		"defeat_story": [ShardLore.dialogue("Silk-Warden Morthis", "Sanguinar... he's beyond anything I've faced. His hunger dissolved the web itself. The silk rotted at his touch. Ancient power vs living architecture. I need something older than web to stop him.", "shaken")],
		"player_army": ["Silk-Warden Morthis", "Web-Fortress", "Silk Colossus", "Anchor Guard", "Fang Guard Elite", "Gossamer Guard", "Silk Catapult", "Gossamer Trap Layers", "Web-Anchor Engineers"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Lord Sanguinar", "Crimson Behemoth", "Bloodsworn Templars", "Tiger Fang Elite", "Blood Reavers", "Nightfang Warriors", "Blood Shamans", "Blood Champion"],
		"battle_size": "epic",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["The ultimate defense. Hold against Sanguinar's full army.", "Silk Colossus creates web terrain and acts as mobile fortress.", "Web-Fortress holds the center. Nothing moves it.", "Gossamer Trap Layers create kill zones around the fortification.", "Silk Catapult bombards the approach. Slow the horde.", "Sanguinar himself is the threat. Everything else is expendable."],
		"battle_modifiers": {"label": "The Living Wall", "description": "Ultimate fortification. All units gain +3 DEF and regenerate.", "player_def_bonus": 3},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Silk-Warden Morthis", "Some build empires. Some weave destinies. I build walls. And my walls have never fallen. Not to fire, not to steel, not to hunger, not to time. The Living Wall stands because the Matriarchy needs protecting. And I will stand as long as it does. Stone crumbles. Steel rusts. Silk endures.", "final"),
	]
