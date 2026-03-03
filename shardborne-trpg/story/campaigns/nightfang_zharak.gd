class_name NightfangZharakCampaign
## Fang General Zharak — "The Tiger's Roar"
## Combined arms, Tiger units, ATK 15, DEF 4, HP 30, CMD 9. Military strategist with tiger bond.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_zharak",
		"commander": "Fang General Zharak",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Tiger's Roar",
		"description": "Fang General Zharak believes in combined arms — infantry, cavalry, tigers, and terror, all working in concert. He is the Nightfang's finest military mind, and the tigers obey him like an extension of his will.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Fang General Zharak", "Sanguinar commands through fear. I command through competence. The difference is that fear breaks formations and competence BUILDS them. Every squad has a role, every tiger a target, every assault a purpose. The other commanders throw bodies at problems. I throw doctrine.", "professional"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Tiger Vanguard",
		"objectives_text": "Lead a combined arms assault — infantry plus tiger units working in sync.",
		"pre_story": [ShardLore.dialogue("Fang General Zharak", "Standard doctrine: Tiger Scout Pack identifies targets, Tiger Berserkers pin the flanks, infantry holds the center, Tiger Chargers break the line. Simple. Effective. Repeatable. War isn't about heroics — it's about systems that work every time. The Emberclaw fight with passion. I fight with precision. Let's see which wins.", "briefing")],
		"post_story": [ShardLore.dialogue("Fang General Zharak", "Textbook execution. The scouts found their weak points, the berserkers fixed them in place, the infantry ground them down, and the chargers shattered the remnants. Zero deviations from the plan. This is what discipline looks like — not flashy, but absolutely lethal.", "professional_satisfaction")],
		"defeat_story": [ShardLore.dialogue("Fang General Zharak", "The plan was sound. The execution was lacking. After-action review: the Tiger Berserkers engaged too early, breaking cohesion. I'll retrain them. A general who blames his troops is not a general.", "self_critical")],
		"player_army": ["Fang General Zharak", "Tiger Berserkers", "Tiger Scout Pack", "Tiger Chargers", "Nightfang Warriors", "Fang Guard"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Flamewarden Kora", "Emberclaw Warriors", "Unbonded Berserkers", "Ashwalker Skirmishers", "Mature War Drake"],
		"battle_size": "skirmish",
		"scenario": "shardstorm",
		"round_limit": 6,
		"tutorial_tips": ["Combined arms: scouts find, berserkers pin, chargers break.", "Tiger units are fast. Use their speed to flank.", "Fang Guard holds the center while tigers maneuver."],
		"battle_modifiers": {"label": "Tiger Vanguard", "description": "Combined arms bonus. Tiger units gain +2 MOV.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Iron Line",
		"objectives_text": "Break through Iron Dominion defensive positions with coordinated tiger-infantry assault.",
		"pre_story": [ShardLore.dialogue("Fang General Zharak", "The Iron Dominion has fortified this sector. Steam turrets, infantry lines, artillery support — a classic defensive position. Most Nightfang commanders would throw thralls at it until it breaks. Wasteful. Stupid. MY approach: Tiger Scout Pack identifies the artillery positions, Tiger Alpha leads a deep strike to silence the guns, and then the main force rolls forward against defenders who can no longer shoot back. Combined arms. Simple geometry.", "tactical")],
		"post_story": [ShardLore.dialogue("Fang General Zharak", "The Tiger Alpha took out both artillery positions in under three minutes. Without suppressive fire, the infantry line collapsed in seven. Total operation time: ten minutes. Casualties: minimal. There is no problem that proper reconnaissance and combined arms cannot solve.", "efficient")],
		"defeat_story": [ShardLore.dialogue("Fang General Zharak", "Secondary defensive line. They had LAYERED defenses. My scouts missed the reserve positions. Intelligence failure, not tactical failure. But a general who makes excuses is a general who loses wars. I own this defeat.", "accepting")],
		"player_army": ["Fang General Zharak", "Tiger Alpha", "Tiger Berserkers", "Tiger Chargers", "Tiger Scout Pack", "Crimson Spearmen", "Blood Reavers", "Blood Shamans"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Yukimaru", "Oni Mask Executioners", "Veiled Ashigaru", "Crimson Oni Riders", "Dreampiercer Archers", "Banner of Silent Prayer"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["Tiger Alpha leads the deep strike. Send it after the artillery.", "Tiger Scout Pack spots for the main force.", "Crimson Spearmen anchor the advance. Tiger Chargers exploit gaps.", "Blood Shamans heal the tigers. They're your striking force."],
		"battle_modifiers": {"label": "The Iron Line", "description": "Flanking strike. Tiger units ignore terrain penalties.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Pack Hunts",
		"objectives_text": "Zharak deploys every tiger unit in the Nightfang arsenal for a massive coordinated hunt.",
		"pre_story": [ShardLore.dialogue("Fang General Zharak", "Today we deploy the full tiger complement. Every tiger in the Nightfang Dominion, from the Scout Packs to the Elder Tiger Horror. The Thornweft have been raiding our supply lines with their spider ambushes. Time to show them what a REAL predator looks like. Spiders are ambush hunters. Tigers are pursuit predators. And my tigers don't stop until the prey is dead.", "fierce")],
		"post_story": [ShardLore.dialogue("Fang General Zharak", "The Elder Tiger Horror was magnificent — it tore through their web barriers like paper. The Tiger Fang Elite cleared the flanks. The Tiger Chargers ran down the retreating spiders. This is what the tiger corps was BUILT for. The Thornweft will think twice before raiding our supply lines again.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Fang General Zharak", "The web traps were more extensive than reported. My tigers were tangled, slowed, picked apart. I underestimated the Thornweft's defensive capabilities. Lesson learned.", "analyzing")],
		"player_army": ["Fang General Zharak", "Tiger Alpha", "Tiger Berserkers", "Tiger Chargers", "Tiger Scout Pack", "Tiger Fang Elite", "Elder Tiger Horror", "Shadow Pounce Cavalry"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Loom-Mother Silivex", "Gossamer Guard", "Venom Dancers", "Spiderling Swarm", "Silk-Warden Regulars", "Silk Colossus"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["All-tiger army. Speed and aggression are your advantages.", "Elder Tiger Horror is the battering ram. Point it at the biggest threat.", "Tiger Scout Pack secures supply points. They're fast enough to grab and hold.", "Shadow Pounce Cavalry flanks wide. Hit the Thornweft from behind."],
		"battle_modifiers": {"label": "The Pack Hunts", "description": "Pack tactics. All tiger units gain +1 ATK when adjacent to another tiger.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Tiger's Roar",
		"objectives_text": "Full combined arms operation. Every unit type, perfect coordination.",
		"pre_story": [
			ShardLore.dialogue("Fang General Zharak", "This is the culmination of everything I've built. Infantry, cavalry, tigers, artillery, war machines, scouts, support — every element of the Nightfang military machine working as ONE. The Iron Dominion thinks they have a monopoly on organization. On doctrine. On military science. They're wrong. They have machines. I have LIVING weapons that think, adapt, and hunt. Let Calculon calculate the odds on THAT.", "commanding"),
		],
		"post_story": [
			ShardLore.narration("The battlefield fell silent, save for the rumbling purr of a hundred tigers and the quiet efficiency of Zharak's officers securing the perimeter. No wasted movement. No unnecessary violence. Every action purposeful, every casualty accounted for. It was, by any military standard, a masterclass in combined arms warfare."),
			ShardLore.dialogue("Fang General Zharak", "Sanguinar will claim the victory for the Dominion. The Crimson Prophet will say the gods willed it. Lysara will call it beneath her notice. But the soldiers who fought today — they know. They know it was doctrine. Discipline. Combined arms. The Tiger's Roar isn't about one general. It's about a system that works. And my system just defeated the best the Iron Dominion had to offer.", "quiet_pride"),
		],
		"defeat_story": [ShardLore.dialogue("Fang General Zharak", "Defeat. The word burns, but I accept it. The system failed because I asked too much of it. Overextension. Pride. The same weakness I criticize in others. I will rebuild. I will refine. And the next time the Tiger roars, nothing will survive it.", "resolute")],
		"player_army": ["Fang General Zharak", "Tiger Alpha", "Elder Tiger Horror", "Tiger Fang Elite", "Tiger Chargers", "Fang Guard", "Nightfang Warriors", "Blood Shamans", "Bile Cannon Crew"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Clockwork Titan", "Elite Vanguard", "Steam Heavy Guards", "Aether Marksmen", "Infantry Regiment", "Steam Artillery Crew", "Steam Colossus"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Full combined arms. Every unit has a role.", "Elder Tiger Horror and Tiger Alpha lead the assault.", "Bile Cannon Crew provides fire support. Soften before the charge.", "Fang Guard holds the line. Tigers exploit the gaps.", "Calculon's Grid makes Iron Dominion coordinated. Break the coordination."],
		"battle_modifiers": {"label": "The Tiger's Roar", "description": "Perfect doctrine. All units gain +1 ATK and +1 DEF.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Fang General Zharak", "Heroes win battles. Systems win wars. The Nightfang Dominion has plenty of heroes — Sanguinar with his hunger, Voraxis with his fury, Kreev with his blade. But what it needs is a GENERAL. Someone who builds the machine that wins regardless of who's running it. That's my legacy. Not glory. Not fame. A military system so good that it works even when I'm not here to run it. THAT is true command.", "resolute"),
	]
