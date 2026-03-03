class_name ThornweftSilivexCampaign
## Loom-Mother Silivex — "The Whispering Web"
## Intelligence, Psychic warfare, ATK 9, DEF 3, HP 24, MOV 7, RNG 12, CMD 9.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_silivex",
		"commander": "Loom-Mother Silivex",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "The Whispering Web",
		"description": "Loom-Mother Silivex wages war through whispers, psychic manipulation, and intelligence networks that span the entire Shardlands. She knows everything. And knowledge is the deadliest weapon.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Loom-Mother Silivex", "I don't command armies. I command INFORMATION. Every vibration in the web carries data — troop movements, supply counts, morale assessments, even private conversations between enemy officers. The whispering web hears everything. And what I hear, I use. War is won before the first blade is drawn, darlings. It's won in the information space.", "knowing"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Listening Post",
		"objectives_text": "Establish psychic intelligence gathering positions against the Iron Dominion.",
		"pre_story": [ShardLore.dialogue("Loom-Mother Silivex", "The Iron Dominion communicates through their Grid — encrypted, efficient, and supposedly secure. But psychic resonance doesn't care about encryption. Every thought their officers have ripples through the aether, and my Thread-Seer Acolytes can feel those ripples. We're setting up listening posts. Within an hour, I'll know their deployment, their plans, and what their commander had for breakfast.", "amused")],
		"post_story": [ShardLore.dialogue("Loom-Mother Silivex", "Fascinating. Calculon thinks in NUMBERS. Pure mathematics. His Grid is a symphony of calculation. Beautiful, actually. And completely transparent to psychic observation. He plans to reinforce the northern approach. He's calculated three contingency plans. I know all three. Knowledge is power, and right now, I have ALL the power.", "pleased")],
		"defeat_story": [ShardLore.dialogue("Loom-Mother Silivex", "Grid Cohesion creates psychic noise — static that drowns out individual thoughts. Calculon may not know he's doing it, but the Grid functions as a psychic countermeasure. Clever machine.", "intrigued")],
		"player_army": ["Loom-Mother Silivex", "Thread-Seer Acolytes", "Silk-Shadow Scouts", "Tremor Sentinels", "Fear-Weavers"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Rengoku", "Starblade Samurai", "Flow Adepts"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["Silivex fights with information. She knows enemy positions.", "Thread-Seer Acolytes detect hidden units. Perfect intelligence.", "Fear-Weavers project terror. They break morale before combat.", "Tremor Sentinels provide anti-stealth. Nothing hides from Silivex."],
		"battle_modifiers": {"label": "Listening Post", "description": "Perfect intelligence. All enemies are revealed. Player gains +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Mind War",
		"objectives_text": "Silivex wages psychic warfare against the Nightfang's blood-mages.",
		"pre_story": [ShardLore.dialogue("Loom-Mother Silivex", "The Nightfang's blood magic creates a psychic resonance — hunger, rage, primal drives amplified to weaponized levels. Their Blood Shamans project terror as a tactical tool. How QUAINT. I do the same thing — but better. My Fear-Weavers project visions of the future. Not fear of death. Fear of IRRELEVANCE. That's far worse for vampire nobility.", "superior")],
		"post_story": [ShardLore.dialogue("Loom-Mother Silivex", "The Nightfang commander broke. Not physically — psychically. I showed her every future where she failed, every timeline where she was forgotten, every possibility where her precious blood-lineage ended in obscurity. The mind is the battlefield I prefer. And on MY battlefield, I am undefeated.", "serene")],
		"defeat_story": [ShardLore.dialogue("Loom-Mother Silivex", "The hunger... their hunger overwhelmed my psychic projections. Primal drives are harder to manipulate than rational minds. The Nightfang don't THINK — they FEED. That makes them resistant to psychic warfare.", "thoughtful")],
		"player_army": ["Loom-Mother Silivex", "Fear-Weavers", "Thread-Seer Acolytes", "Fate-Thread Weavers", "Reality Weavers", "Silk-Warden Regulars", "Venom Alchemists"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Countess Nyxara", "Blood Shamans", "Shadow Stalkers", "Nightfang Warriors", "Blood Reavers", "Hunger Priests"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["Psychic warfare — Fear-Weavers break enemy morale.", "Reality Weavers reshape terrain. Control the battlefield.", "Fate-Thread Weavers manipulate probability. Stack the odds.", "Thread-Seer Acolytes provide intelligence. Know before they act.", "Silivex has RNG 12. She attacks from extreme range."],
		"battle_modifiers": {"label": "Mind War", "description": "Psychic dominance. Enemy units suffer -2 MOR.", "enemy_def_bonus": -1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Intelligence Web",
		"objectives_text": "Deploy a full intelligence network across the battlefield. Total information dominance.",
		"pre_story": [ShardLore.dialogue("Loom-Mother Silivex", "Today we deploy the complete intelligence web. Every scout, every sensor, every psychic relay working in concert. I will know the position, condition, morale, and intentions of every enemy unit on the field in real-time. The Emberclaw fight with passion. I counter with OMNISCIENCE. It's difficult to surprise someone who already knows you're coming.", "confident")],
		"post_story": [ShardLore.dialogue("Loom-Mother Silivex", "Perfect intelligence state achieved. I saw every charge before it began, every flanking maneuver before it started, every retreat before the order was given. My forces moved to counter each action with seconds to spare. The Emberclaw commander was screaming about 'witchcraft.' Darling, it's not witchcraft. It's ESPIONAGE.", "smug")],
		"defeat_story": [ShardLore.dialogue("Loom-Mother Silivex", "The Emberclaw were too chaotic. They didn't PLAN — they just charged wherever the fire took them. You can't predict chaos. You can only prepare for it.", "frustrated")],
		"player_army": ["Loom-Mother Silivex", "Silk-Shadow Scouts", "Thread-Reader Outriders", "Tremor Sentinels", "Fear-Weavers", "Fate-Blessed Veterans", "Phase-Silk Infiltrators", "Fate-Loom Siege Engine"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Emberforged Blades", "Unbonded Berserkers", "Emberclaw Warriors", "Mature War Drake", "Ashwalker Skirmishers", "Pyromancer Adepts"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["Total intelligence dominance. You see everything.", "Fate-Loom Siege Engine disrupts enemy coordination at range.", "Phase-Silk Infiltrators strike behind lines with perfect intel.", "Fate-Blessed Veterans are your reliable combat force.", "Fear-Weavers break morale. Intelligence + terror = victory."],
		"battle_modifiers": {"label": "Intelligence Web", "description": "Omniscience. All units gain +2 ATK and +1 DEF from perfect information.", "player_atk_bonus": 2, "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Whispering Web",
		"objectives_text": "Silivex achieves total psychic-intelligence dominance. The web hears all, knows all, controls all.",
		"pre_story": [
			ShardLore.dialogue("Loom-Mother Silivex", "The whispering web is complete. Every thread a channel, every node a psychic relay. I can hear a soldier's heartbeat from three miles away. I can feel a commander's doubt from across the battlefield. I can project visions of defeat so vivid that enemy units surrender before contact. This is not war. This is a demonstration. Let the Iron Dominion see what happens when you fight an enemy who knows your every thought.", "transcendent"),
		],
		"post_story": [
			ShardLore.narration("The Whispering Web pulsed with intelligence — millions of data points, thousands of psychic impressions, hundreds of tactical insights flowing through Silivex's consciousness simultaneously. She sat motionless at the center of her web, eyes closed, eight minds processing information at superhuman speed. Her forces moved like extensions of her will — perfectly coordinated, perfectly informed, perfectly lethal."),
			ShardLore.dialogue("Loom-Mother Silivex", "They asked why I don't fight on the front lines. Why I sit in the back, eyes closed, while others bleed. Because, darlings, I AM the front lines. I am every scout, every sensor, every whisper in the web. I don't need to swing a blade when I can see every blade swinging and tell my forces exactly how to dodge. The whispering web knows all. And knowing is all you need.", "paradigm"),
		],
		"defeat_story": [ShardLore.dialogue("Loom-Mother Silivex", "Information overload. Too many inputs. The Grid generated so much data that my web couldn't process it all. Calculon didn't fight my web — he OVERWHELMED it. Brute force information warfare. Inelegant but effective.", "overwhelmed")],
		"player_army": ["Loom-Mother Silivex", "Fate-Loom Engine", "Fear-Weavers", "Thread-Seer Acolytes", "Fate-Thread Weavers", "Reality Weavers", "Fate-Blessed Veterans", "Matriarch Riders", "Silk Colossus"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Clockwork Titan", "Elite Vanguard", "Steam Heavy Guards", "Aether Marksmen", "Infantry Regiment", "Steam Artillery Crew", "Steam Colossus"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Total psychic dominance. You know everything.", "Fate-Loom Engine amplifies psychic warfare. Devastating at range.", "Silk Colossus is your anchor. Living fortress.", "Reality Weavers reshape the battlefield to your advantage.", "Matriarch Riders are your mobile strike force.", "Calculon's Grid vs Silivex's Web. Data vs intuition."],
		"battle_modifiers": {"label": "The Whispering Web", "description": "Perfect omniscience. All units gain +2 ATK and +2 DEF.", "player_atk_bonus": 2, "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Loom-Mother Silivex", "The sword is the weapon of the warrior. The web is the weapon of the weaver. But INFORMATION is the weapon of the wise. And in a world of broken patterns and uncertain fates, the one who knows the most controls the most. The Whispering Web endures — listening, learning, whispering. Always whispering.", "final"),
	]
