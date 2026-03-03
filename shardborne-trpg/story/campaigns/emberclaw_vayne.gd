class_name EmberclawVayneCampaign
## Clutchmaster Vayne — "Brood War"
## Drake spawning, Swarm tactics. Swarm/creature campaign.
## 4 missions. Teaches swarm play, creature management, overwhelm tactics.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_vayne",
		"commander": "Clutchmaster Vayne",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "Brood War",
		"description": "Clutchmaster Vayne breeds war drakes — not the majestic beasts of Tzarak's lineage, but fast-breeding, expendable swarmlings. In the Shardlands, the drakes are mutating, and Vayne must decide: control the mutations or embrace them.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The eggs were wrong."),
		ShardLore.narration("Vayne had been breeding war-drakes for fifteen years. She knew what a healthy clutch looked like — smooth shells, steady heat, predictable incubation. These eggs were crystalline, shot through with shard-veins, and they pulsed with a light that drakes were not supposed to produce."),
		ShardLore.dialogue("Clutchmaster Vayne", "The shard-energy is changing the brood. The hatchlings are... different. Faster. Tougher. But they don't respond to the standard commands. They're evolving beyond our control protocols. I need to establish new ones before we lose the swarm entirely.", "concerned"),
		ShardLore.fhah_zolg("The breeder. She thinks she's creating life. She's creating game pieces. I approve."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The New Clutch",
		"objectives_text": "Protect the mutated hatchlings as they emerge. Defend the nesting pit from scavengers.",
		"pre_story": [
			ShardLore.dialogue("Clutchmaster Vayne", "Twelve eggs hatching simultaneously — the shard-mutants. I need to be here for imprinting. If the hatchlings don't imprint on an Emberclaw handler, they'll go feral. And feral shard-drakes are nobody's friend.", "urgent"),
		],
		"post_story": [
			ShardLore.narration("Twelve hatchlings emerged — each one subtly different from standard war-drakes. Sharper claws, crystalline scales, and eyes that glowed with fragment-light. They imprinted on Vayne immediately, following her like ducklings made of fire and crystal."),
			ShardLore.dialogue("Clutchmaster Vayne", "They took the imprint. Good. They're responding to voice commands, threat displays, feeding cues. The shard-mutation hasn't damaged their social bonding. If anything, they're smarter than baseline drakes. We can work with this.", "relieved"),
		],
		"defeat_story": [
			ShardLore.dialogue("Clutchmaster Vayne", "The hatchlings scattered! I need to track them before they go feral. Every hour matters for imprinting.", "panicked"),
		],
		"player_army": ["Clutchmaster Vayne", "Drake Handlers", "Fledgling Swarm", "Hatchery Guard"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Spiderling Swarm", "Phase-Silk Infiltrators", "Venom Dancers"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["Protect the nesting pit — if enemies reach it, hatchlings die.", "Fledgling Swarm are expendable screens. Use them to absorb attacks.", "Drake Handlers boost all drake units. Keep them near the Fledgling Swarm."],
		"battle_modifiers": {"label": "Clutch Bond", "description": "Vayne's presence calms the brood. Drake units gain +1 DEF.", "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Swarm Tactics",
		"objectives_text": "Test the new shard-drakes in combat. Overwhelm the Iron Dominion patrol with numbers and speed.",
		"pre_story": [
			ShardLore.dialogue("Clutchmaster Vayne", "The shard-drakes are three weeks old — combat-ready by drake standards. Time to see what the mutations actually do in a fight. The machine-folk's patrol is the perfect test: predictable, methodical, and not expecting to fight a swarm of crystal-scaled fire-lizards.", "anticipation"),
		],
		"post_story": [
			ShardLore.narration("The shard-drakes were devastating. They moved as a coordinated swarm — not through Vayne's commands, but through some kind of natural hive-communication that standard drakes had never exhibited. They flanked, they surrounded, they struck simultaneously from multiple angles."),
			ShardLore.dialogue("Clutchmaster Vayne", "They're communicating. Not through the Bond, not through handler signals — through something else. The shard-mutation gave them a hive-mind. Limited, instinctive, but real. This changes everything about drake warfare.", "astonished"),
		],
		"defeat_story": [
			ShardLore.dialogue("Clutchmaster Vayne", "The swarm lost cohesion. The hive-mind fractured under stress. I need to train them harder before the next engagement.", "disappointed"),
		],
		"player_army": ["Clutchmaster Vayne", "Fledgling Swarm", "Fledgling Swarm", "Drake Handlers", "Ashrider Scouts", "Emberclaw Warriors"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Clockwork Infantry", "Steam Sentinels", "Clockwork Pioneers", "Aether Blasters"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["You have two Fledgling Swarm units — that's a LOT of drakes. Overwhelm with numbers.", "Swarm tactics: send drakes from multiple angles to surround isolated units.", "Drake Handlers boost ALL drake units. One handler improves both swarms."],
		"battle_modifiers": {"label": "Hive-Mind", "description": "The shard-drakes coordinate instinctively. Drakes gain +1 ATK when adjacent to another drake unit.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Alpha",
		"objectives_text": "A massive feral shard-drake has emerged from the deep wastes. Capture or destroy it before it threatens the camp.",
		"pre_story": [
			ShardLore.dialogue("Clutchmaster Vayne", "Something big came through a shard-rift last night. Drake — but not like any I've bred. Five meters tall, crystalline scales, fragment-breath. It's an alpha — a breeding-dominant. If I can imprint it, it becomes the foundation of a new bloodline. If I can't... we kill it before it kills us.", "calculating"),
		],
		"post_story": [
			ShardLore.narration("Vayne approached the alpha alone. Her swarm-drakes surrounded it, not attacking but displaying — the drake equivalent of diplomacy. The alpha, confused by creatures that smelled like drakes but moved like soldiers, hesitated."),
			ShardLore.narration("Vayne held out a shard-fragment. The alpha's eyes locked on it. She fed it from her hand. It nuzzled her palm. The imprint took."),
			ShardLore.dialogue("Clutchmaster Vayne", "His name is Cinderfang. And he is the future of the Emberclaw drake program. Every hatchling from his bloodline will be shard-enhanced from birth. We're not just breeding war-drakes anymore. We're breeding something new.", "triumphant"),
		],
		"defeat_story": [
			ShardLore.dialogue("Clutchmaster Vayne", "The alpha is too wild. I couldn't reach it. I need the bond-herbs from Ignareth — or something equivalent from the Shardlands.", "frustrated"),
		],
		"player_army": ["Clutchmaster Vayne", "Fledgling Swarm", "Drake Handlers", "Mature War Drake", "Hatchery Guard", "Emberclaw Warriors"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Ritual Cpt Akikaze", "Inkblade Initiates", "Lotus Ascetics", "Thunder Kirin Cavalry", "Dreampiercer Archers", "Spirit Healer Monks"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Shard Clash: the alpha is near the shard. Reach it before the Nightfang.", "The Mature War Drake is your strongest combat unit — use it to clear a path.", "The Nightfang want to kill the alpha, not capture it. You must reach it first."],
		"battle_modifiers": {"label": "Pack Instinct", "description": "The swarm-drakes sense the alpha. All drake units gain +2 MOV.", "player_mov_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Brood War",
		"objectives_text": "Deploy the full drake swarm against the Nightfang siege. Demonstrate the power of the new breed.",
		"pre_story": [
			ShardLore.dialogue("Clutchmaster Vayne", "The blood-drinkers are besieging Vex's position with their full strength. She's asked for reinforcements. I'm sending everything — every shard-drake, every war-drake, every fledgling old enough to bite. The skies will darken with wings. The ground will shake with claws. This is what a Clutchmaster does. This is brood war.", "fierce"),
		],
		"post_story": [
			ShardLore.narration("The drake swarm hit the Nightfang siege like a living avalanche. Shard-drakes from above, war-drakes from the flanks, fledglings swarming through the gaps — a coordinated assault driven by hive-mind, handler signals, and Vayne's unerring instinct for drake behavior."),
			ShardLore.narration("The siege broke in twenty minutes. The Nightfang forces, accustomed to fighting humanoid armies, had no answer for a swarm that attacked from every direction simultaneously."),
			ShardLore.dialogue("Clutchmaster Vayne", "Fifty-three drakes deployed. Forty-eight survived. Two new battlefield imprints established. The brood is growing, evolving, adapting. The Shardlands tried to mutate our drakes into monsters. Instead, it made them into something better.", "proud"),
		],
		"defeat_story": [
			ShardLore.dialogue("Clutchmaster Vayne", "The swarm scattered — too many hostile signals, too much noise. I need better coordination protocols.", "devastated"),
		],
		"player_army": ["Clutchmaster Vayne", "Fledgling Swarm", "Fledgling Swarm", "Mature War Drake", "Drake Handlers", "Hatchery Guard", "Emberknight Riders", "Scorchcaller Elites"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Thrallmaster Ghul", "Blood Reavers", "Tiger Berserkers", "Shadow Stalkers", "Nightfang Warriors", "Blood Shamans", "Nightfang Dragon", "Crimson Behemoth"],
		"battle_size": "epic",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Last Stand: survive the siege and destroy the attackers.", "Your drake swarm is massive. Use hive-mind coordination to surround enemies.", "The Corruption Dragon is the enemy's answer to your drakes. Prioritize it.", "Scorchcaller Elites can rally broken drake units. Keep them in reserve."],
		"battle_modifiers": {"label": "Swarm Alpha", "description": "Cinderfang leads the swarm. All drake units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Vayne sat among her drakes, hand-feeding shard-fragments to the hatchlings while Cinderfang — the massive alpha — dozed beside her. The nesting pit was full of crystalline eggs, each one a new generation of shard-enhanced war-drakes."),
		ShardLore.dialogue("Clutchmaster Vayne", "Tzarak has his bond with Obsidax — one wyrm, one rider, one legend. I have something different. I have a brood. Dozens of drakes, each one connected to the next, each one connected to me. Not through an ancient bond — through something new. Something the Shardlands gave us. The old drakes of Ignareth were weapons. The new drakes of the Shardlands are an army.", "maternal"),
		ShardLore.narration("A hatchling nuzzled her hand, its crystal scales warm against her skin. Vayne smiled. Life persisted, adapted, evolved. And the Clutchmaster was there to guide it."),
	]
