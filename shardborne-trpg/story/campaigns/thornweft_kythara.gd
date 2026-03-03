class_name ThornweftKytharaCampaign
## Thread-Seer Kythara — "The Pattern's Eye"
## Fate reading, Probability control, ATK 15, DEF 3, HP 24, MOV 7, RNG 12, CMD 8.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_kythara",
		"commander": "Thread-Seer Kythara",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "The Pattern's Eye",
		"description": "Thread-Seer Kythara reads the fate-threads of the Shardlands. She sees probabilities, manipulates outcomes, and knows where every arrow will fall before it's loosed.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Thread-Seer Kythara", "The Pattern speaks in probabilities. Every thread a life, every knot a choice, every severed strand a death. I do not predict the future — I calculate it. And my calculations are rarely wrong. The Shardlands have tangled the Pattern terribly. There are threads here that should not exist. Probabilities that defy mathematics. Something has broken the loom of fate itself.", "contemplative"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Reading the Threads",
		"objectives_text": "Use fate-reading to anticipate enemy movements and strike with perfect timing.",
		"pre_story": [ShardLore.dialogue("Thread-Seer Kythara", "The Emberclaw approach from the northeast. I read their fate-threads thirty minutes ago — their commander is impulsive, predictable. She will charge the left flank at dawn. We will be waiting. Position the Gossamer Guard at the treeline, the Silk-Shot Skirmishers on the ridge. When they charge, we spring the web.", "precise")],
		"post_story": [ShardLore.dialogue("Thread-Seer Kythara", "Exactly as the Pattern predicted. The Emberclaw commander charged the left flank. Our ambush caught them perfectly. The Fate-Thread Weavers disrupted their morale before the first arrow flew. Reading the Pattern is not magic — it is mathematics. Beautiful, living mathematics.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Thread-Seer Kythara", "Impossible. The threads showed... no. SOMETHING interfered with the reading. An outside variable. The Pattern never lies, but it can be... obscured.", "disturbed")],
		"player_army": ["Thread-Seer Kythara", "Gossamer Guard", "Silk-Shot Skirmishers", "Fate-Thread Weavers", "Thread-Reader Outriders"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Pyroclaw Drenna", "Unbonded Berserkers", "Emberclaw Warriors", "Ashwalker Skirmishers"],
		"battle_size": "skirmish",
		"scenario": "broken_ground",
		"round_limit": 6,
		"tutorial_tips": ["Kythara reads fate. She gains intelligence advantage.", "Silk-Shot Skirmishers harass at range. RNG 8 keeps enemies at bay.", "Fate-Thread Weavers manipulate probability. They buff your odds.", "Thread-Reader Outriders scout. Perfect information wins wars."],
		"battle_modifiers": {"label": "Pattern Reading", "description": "Fate foreseen. All units gain +1 DEF from foreknowledge.", "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Probability Engine",
		"objectives_text": "Secure a shard fragment that amplifies fate-reading to strategic scale.",
		"pre_story": [ShardLore.dialogue("Thread-Seer Kythara", "There is a fragment here that resonates with the fate-threads — a probability amplifier. With it, I could read the Pattern across entire battlefields, predicting every enemy action hours in advance. The Iron Dominion wants it too. Calculon's analytical mind has already computed its value. We must reach it first.", "urgent")],
		"post_story": [ShardLore.dialogue("Thread-Seer Kythara", "The fragment is ours. Its resonance is... extraordinary. I can now read fate-threads at ten times the range. The Dominion forces moved exactly as the Pattern predicted. Calculon is dangerous — his mathematics approach my own. But mathematics without fate-sight is just numbers. I have context.", "elated")],
		"defeat_story": [ShardLore.dialogue("Thread-Seer Kythara", "Calculon secured the fragment. His Grid Cohesion somehow... dampened the fate-threads. I could not read his forces clearly. Machine minds are harder to predict than organic ones. I must account for this variable.", "analytical")],
		"player_army": ["Thread-Seer Kythara", "Fate-Blessed Veterans", "Silk-Warden Regulars", "Fate-Thread Weavers", "Thread-Seer Acolytes", "Silk-Shadow Scouts", "Venom Mortar"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Hoshimaru", "Temple Defenders", "Kintsugi Blademasters", "Thunder Kirin Cavalry", "Void Bolt Crossbowmen", "Flow Adepts"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Shard Clash — secure the probability fragment.", "Fate-Blessed Veterans reroll 1s. Probability is your weapon.", "Venom Mortar provides indirect fire support.", "Thread-Seer Acolytes use fragments. Protect and empower them.", "Calculon's Grid disrupts fate-reading. Expect surprises."],
		"battle_modifiers": {"label": "Probability Engine", "description": "Fate resonance. Player units reroll one failed die per round.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Tangled Skein",
		"objectives_text": "Navigate a region where fate-threads are hopelessly tangled. Multiple enemy factions converge.",
		"pre_story": [ShardLore.dialogue("Thread-Seer Kythara", "The fate-threads here are knotted beyond anything I've seen. Multiple factions converge on this point — the Nightfang from the north, driven by hunger. The Pattern is screaming contradictions. I see victory and defeat simultaneously. BOTH outcomes are equally probable. This should be impossible. Unless... unless someone is DELIBERATELY tangling the threads.", "alarmed")],
		"post_story": [ShardLore.dialogue("Thread-Seer Kythara", "We survived the tangle. The Nightfang fought like cornered animals — unpredictable, chaotic, beautiful in their own monstrous way. But I found the source of the tangling. The shard-energy itself is interfering with fate-threads. The Shardlands don't just break the world — they break DESTINY.", "shaken_but_intrigued")],
		"defeat_story": [ShardLore.dialogue("Thread-Seer Kythara", "The tangle consumed us. I couldn't read ANY threads clearly. Fighting blind — it was like being mortal again. Terrifying.", "humbled")],
		"player_army": ["Thread-Seer Kythara", "Fate-Blessed Veterans", "Gossamer Guard", "Silk-Rider Lancers", "Fate-Thread Weavers", "Venom Alchemists", "Thread-Cutter Assassins"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Countess Nyxara", "Nightfang Warriors", "Blood Reavers", "Shadow Stalkers", "Shadow Claw Infantry", "Blood Shamans", "Blood Champion"],
		"battle_size": "standard",
		"scenario": "shardstorm",
		"round_limit": 7,
		"tutorial_tips": ["Tangled fate — your prediction advantage is reduced here.", "Thread-Cutter Assassins sever enemy fate-threads. Devastating.", "Silk-Rider Lancers charge flanks while infantry holds.", "Venom Alchemists coat weapons. Venom accumulates."],
		"battle_modifiers": {"label": "Tangled Skein", "description": "Fate disrupted. Both sides suffer -1 DEF from unpredictability.", "player_def_bonus": -1, "enemy_def_bonus": -1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Pattern's Eye",
		"objectives_text": "Kythara achieves perfect fate-sight. Command the battlefield with absolute foreknowledge.",
		"pre_story": [
			ShardLore.dialogue("Thread-Seer Kythara", "I understand now. The Pattern is not broken — it has EVOLVED. The Shardlands have added new variables, new threads, new possibilities. And I can read them ALL. Today I demonstrate what it means to fight an enemy who knows your every move before you make it. The Iron Dominion believes in data. Let me show them what REAL information superiority looks like.", "transcendent"),
		],
		"post_story": [
			ShardLore.narration("Thread-Seer Kythara stood at the center of the web, her eight eyes glowing with probability light. Around her, the fate-threads of every combatant on the field were visible — golden strands of destiny stretching into infinite futures. She plucked one. The enemy commander stumbled. She cut another. A supply line failed. She wove two together. Her own forces surged forward with impossible coordination."),
			ShardLore.dialogue("Thread-Seer Kythara", "The Pattern's Eye sees all. Not the future — futures. Every possible outcome, every branching probability, every choice unmade. I don't predict. I SELECT. And today, I selected victory.", "serene"),
		],
		"defeat_story": [ShardLore.dialogue("Thread-Seer Kythara", "Too many variables. Even perfect sight cannot account for chaos on this scale. The Pattern shows me a thousand futures, and in too many of them, I fail. I must learn to choose better.", "reflective")],
		"player_army": ["Thread-Seer Kythara", "Fate-Blessed Veterans", "Gossamer Guard", "Silk-Rider Lancers", "Matriarch Riders", "Fate-Thread Weavers", "Thread-Cutter Assassins", "Fate-Loom Siege Engine"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Clockwork Titan", "Elite Vanguard", "Steam Heavy Guards", "Aether Marksmen", "Infantry Regiment", "Steam Artillery Crew", "Steam Colossus"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Perfect fate-sight. You know every enemy move.", "Fate-Loom Siege Engine disrupts enemy coordination at range.", "Thread-Cutter Assassins eliminate key targets.", "Matriarch Riders and Silk-Rider Lancers dominate the flanks.", "Calculon's Grid vs Kythara's Pattern. Math vs destiny."],
		"battle_modifiers": {"label": "The Pattern's Eye", "description": "Perfect foreknowledge. All units gain +2 ATK and +2 DEF.", "player_atk_bonus": 2, "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Thread-Seer Kythara", "The Loom-Mother weaves the Great Web. I read what she weaves. Together, we are the mind and the eye of the Matriarchy. She shapes destiny — I interpret it. And in a world of broken patterns and tangled threads, an interpreter is worth more than an army. The Pattern endures. And so does the eye that reads it.", "final"),
	]
