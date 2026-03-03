class_name NightfangVoraxisCampaign
## Grand Fang Voraxis — "The Beast Unchained"
## Melee beast, Tiger bond, ATK 21, DEF 5, HP 36, MOV 6, CMD 10. Pack master.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_voraxis",
		"commander": "Grand Fang Voraxis",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Beast Unchained",
		"description": "Grand Fang Voraxis is more beast than vampire. He runs with the great tigers, hunts by scent, and destroys everything in his path. The Shardlands are his hunting ground.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Grand Fang Voraxis", "HUNT. The word is the world. Everything else — politics, diplomacy, strategy — is just noise between hunts. The Shardlands smell of blood and crystal. Good hunting ground. My tigers agree.", "primal"),
		ShardLore.narration("Grand Fang Voraxis dropped to all fours and sniffed the air, his massive frame low to the ground. Around him, six great shadow-tigers did the same, their movements perfectly synchronized with his. He was their alpha. They were his family."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Hunt",
		"objectives_text": "Hunt the Emberclaw warband. Voraxis leads the pack.",
		"pre_story": [ShardLore.dialogue("Grand Fang Voraxis", "Emberclaw. Fire-lizards. Fast prey, hot blood. Good hunt. Tigers — form the crescent. We drive them into the rocks. I take the biggest one personally.", "eager")],
		"post_story": [ShardLore.dialogue("Grand Fang Voraxis", "Good hunt. The fire-lizards fight well. Their blood tastes of ash and determination. The tigers are fed. The pack is pleased.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Grand Fang Voraxis", "The prey escaped. The fire burned too hot. We hunt again. Smarter this time.", "growling")],
		"player_army": ["Grand Fang Voraxis", "Tiger Berserkers", "Tiger Scout Pack", "Tiger Chargers", "Blood Reavers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberforged Blades", "Emberclaw Warriors", "Ashrider Scouts", "Mature War Drake"],
		"battle_size": "skirmish",
		"scenario": "shardstorm",
		"round_limit": 6,
		"tutorial_tips": ["Voraxis has ATK 21 and MOV 6 — he charges hard.", "Tiger units have Pack Tactics. Keep them within 2 tiles of each other.", "Tiger Chargers deal devastating charge damage. Don't waste it."],
		"battle_modifiers": {"label": "Pack Hunt", "description": "The pack hunts together. All tiger units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Alpha Challenge",
		"objectives_text": "A rival predator threatens the pack's territory. Voraxis must assert dominance.",
		"pre_story": [ShardLore.dialogue("Grand Fang Voraxis", "Something else hunts here. Something big. The tigers are nervous — they smell a predator that isn't ME. Unacceptable. This is MY territory. MY pack. Whatever this thing is, it dies, or it submits. No other options.", "territorial")],
		"post_story": [
			ShardLore.narration("The Elder Tiger Horror lay subdued — not dead, but defeated, its massive head bowed before Grand Fang Voraxis. The Grand Fang placed one clawed hand on its skull and roared. The sound shook the crystal formations for a mile in every direction."),
			ShardLore.dialogue("Grand Fang Voraxis", "This one is strong. Too strong to waste. It joins the pack. I am the alpha of ALL predators here. ALL of them.", "commanding"),
		],
		"defeat_story": [ShardLore.dialogue("Grand Fang Voraxis", "It's... stronger than me. For now. I will train. I will hunt. And I WILL come back.", "humbled")],
		"player_army": ["Grand Fang Voraxis", "Tiger Berserkers", "Tiger Fang Elite", "Tiger Alpha", "Tiger Chargers", "Tiger Scout Pack"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Brood-Warden Thessari", "Brood-Mother Spider", "Spiderling Swarm", "Gossamer Guard", "Gossamer Trap Layers", "Web-Spinner Sappers"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["All-tiger army. Pack Tactics is your key advantage.", "Tiger Alpha's Alpha Roar buffs nearby tiger units.", "King of the Hill — take the center to assert territorial dominance."],
		"battle_modifiers": {"label": "Alpha Challenge", "description": "Territory at stake. All units gain +1 ATK and +1 MOV.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Great Hunt",
		"objectives_text": "Voraxis leads the entire pack on a massive hunt through Iron Dominion territory.",
		"pre_story": [ShardLore.dialogue("Grand Fang Voraxis", "The metal-men build walls. Walls annoy me. My tigers can't hunt when there are walls. Solution: remove the walls. Remove the machines behind the walls. Remove everything that isn't hunt-worthy prey. The Great Hunt begins.", "simple_logic")],
		"post_story": [ShardLore.dialogue("Grand Fang Voraxis", "Walls broken. Machines smashed. Prey scattered. The hunting ground is clear for miles. The tigers are happy. Simple problem, simple solution. Nyxara would have spent three weeks scheming. I spent three hours charging.", "blunt_pride")],
		"defeat_story": [ShardLore.dialogue("Grand Fang Voraxis", "Too many walls. Too many machines. Can't charge what I can't reach. Need... a plan. I hate plans.", "reluctant")],
		"player_army": ["Grand Fang Voraxis", "Tiger Berserkers", "Tiger Fang Elite", "Tiger Chargers", "Nightstalker Cavalry", "Blood Reavers", "Elder Tiger Horror"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Ritual Cpt Tsukihana", "Starblade Samurai", "Inkblade Initiates", "Star Serpent Lancers", "Celestial Slingers", "Spirit Healer Monks"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply Lines — disrupt the Iron Dominion supply chain.", "The Elder Tiger Horror is your siege-breaker. Use it on fortifications.", "Tiger Chargers can bypass infantry lines with their charge."],
		"battle_modifiers": {"label": "The Great Hunt", "description": "Hunting frenzy. All units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Beast Unchained",
		"objectives_text": "Total war. Voraxis and the full pack against everything the Shardlands can throw at them.",
		"pre_story": [
			ShardLore.dialogue("Grand Fang Voraxis", "Sanguinar talks about ruling. Nyxara talks about controlling. I don't talk about anything. I HUNT. This world, these shards, these enemies — they're all prey. And tonight, the greatest predator in the Nightfang Dominion hunts without restraint. The Beast is Unchained.", "savage_joy"),
			ShardLore.narration("He threw his head back and roared. The sound was not the refined, theatrical roar of a vampire lord. It was the raw, primal scream of the apex predator, calling its pack to the hunt. And from every shadow, every cave, every dark place in the Shardlands, the tigers answered."),
		],
		"post_story": [
			ShardLore.narration("The battlefield was a charnel house. Grand Fang Voraxis stood in the center, covered in blood — not all of it his enemies' — surrounded by his tigers, breathing hard, grinning with teeth that were very, very sharp."),
			ShardLore.dialogue("Grand Fang Voraxis", "Sanguinar asks me: 'Don't you want more? Power? Territory? Influence?' I tell him: I have my pack. I have the hunt. I have the kill. What MORE could there POSSIBLY be?", "content"),
		],
		"defeat_story": [ShardLore.dialogue("Grand Fang Voraxis", "Too many. Even for me. Even for the pack. We retreat. We heal. We hunt again. The beast is patient when it needs to be.", "wounded_but_unbowed")],
		"player_army": ["Grand Fang Voraxis", "Tiger Berserkers", "Tiger Fang Elite", "Tiger Alpha", "Tiger Chargers", "Elder Tiger Horror", "Blood Reavers", "Nightstalker Cavalry"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Elite Vanguard", "Clockwork Titan", "Steam Colossus", "Infantry Regiment", "Steam Artillery Crew", "Clockwork Cavalry", "Aether Marksmen"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Voraxis with ATK 21, HP 36, CMD 10 is your ultimate weapon.", "Tiger Fang Elite are your elite melee strikers.", "Pack Tactics on every tiger unit — keep the pack together.", "Lord Calculon will try to counter your aggression with positioning."],
		"battle_modifiers": {"label": "Beast Unchained", "description": "No restraints. All units gain +3 ATK.", "player_atk_bonus": 3},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Grand Fang Voraxis", "The scholars write about me. They use words like 'savage' and 'bestial.' They don't understand. The beast isn't the opposite of civilization. It's the truth that civilization is built on. Underneath every treaty, every alliance, every political compromise — there is a predator deciding who lives and who dies. I just skip the pretense.", "wise_in_his_way"),
		ShardLore.narration("He turned and loped into the darkness, his pack beside him, moving as one, hunting as one, living as one. The Beast Unchained, and the world that trembled before him."),
	]
