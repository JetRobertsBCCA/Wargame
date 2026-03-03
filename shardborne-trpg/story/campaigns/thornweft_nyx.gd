class_name ThornweftNyxCampaign
## Thread-Cutter Nyx — "The Severed Thread"
## Assassination, Fate-severing, ATK 21, DEF 2, HP 18, MOV 9, CMD 6. Glass cannon assassin.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_nyx",
		"commander": "Thread-Cutter Nyx",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "The Severed Thread",
		"description": "Thread-Cutter Nyx severs fate itself. ATK 21, MOV 9 — the deadliest assassin in the Matriarchy cuts enemies from the Pattern before they can even act.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Thread-Cutter Nyx", "I don't make war. I make corpses. The Loom-Mother points. I cut. No speeches, no strategy, no grandiose campaign plans. Just a blade, a target, and a severed fate-thread. Clean. Quick. Efficient. The Matriarchy's most elegant solution to its most persistent problems.", "cold"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Cut",
		"objectives_text": "Eliminate the Emberclaw commander. One target. One cut. One severed thread.",
		"pre_story": [ShardLore.dialogue("Thread-Cutter Nyx", "Target: Emberclaw commander. Camp is guarded — patrols, fire-wards, drake sentries. Irrelevant. I can see their fate-thread from here. One cut, and they cease to exist. The Thread-Cutter Assassins will distract the guards. I will handle the commander. Time from first contact to completion: ninety seconds.", "clinical")],
		"post_story": [ShardLore.dialogue("Thread-Cutter Nyx", "Seventy-three seconds. Faster than estimated. The guards didn't even see me. The commander's fate-thread was... thick. Important. Cutting it felt like severing a rope under tension — the snap was satisfying. The Matriarchy's enemies should fear the silence between heartbeats. That's where I live.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Thread-Cutter Nyx", "The fire. Their fire cauterizes fate-threads. I couldn't get a clean cut. I need to find a way to sever threads that have been flame-sealed.", "frustrated")],
		"player_army": ["Thread-Cutter Nyx", "Thread-Cutter Assassins", "Phase-Silk Infiltrators", "Silk-Shadow Scouts", "Silk Wraiths"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Skywatcher Orin", "Ashwalker Skirmishers", "Emberclaw Warriors", "Pyromancer Adepts"],
		"battle_size": "skirmish",
		"scenario": "broken_ground",
		"round_limit": 5,
		"tutorial_tips": ["Nyx has ATK 21 and MOV 9. She's a scalpel, not a hammer.", "DEF 2 and HP 18 — she's fragile. Don't let her get surrounded.", "Thread-Cutter Assassins assassinate priority targets.", "Silk Wraiths are ethereal. Use them to scout and distract.", "Short round limit — kill the commander fast."],
		"battle_modifiers": {"label": "The First Cut", "description": "Assassination mission. Nyx gains +3 ATK vs commanders.", "player_atk_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Fate-Severed",
		"objectives_text": "Sever the Iron Dominion's Grid connections by cutting fate-threads.",
		"pre_story": [ShardLore.dialogue("Thread-Cutter Nyx", "The Iron Dominion's Grid Cohesion is a network of connections — not unlike fate-threads. Calculon would disagree. He'd say it's 'data architecture.' Same thing, different language. Cut the threads, the network fails. Cut enough threads, and their precious Grid collapses into noise. My Thread-Cutter Assassins will target the communication nodes. I'll handle the officers.", "analytical")],
		"post_story": [ShardLore.dialogue("Thread-Cutter Nyx", "Their Grid flickered, stuttered, and died. Without coordination, the Iron Dominion fights like individuals — competent individuals, but individuals. They couldn't compensate for the severed connections fast enough. Fate-severing works on technology too. Because everything, even machines, has a thread in the Pattern. And threads can be CUT.", "dark_satisfaction")],
		"defeat_story": [ShardLore.dialogue("Thread-Cutter Nyx", "Redundant systems. They had backup communication lines I didn't detect. The Grid regenerated faster than I could cut. Calculon prepared for thread-severing specifically. He's learning.", "grudging_respect")],
		"player_army": ["Thread-Cutter Nyx", "Thread-Cutter Assassins", "Phase-Silk Infiltrators", "Silk Wraiths", "Venom Dancers", "Silk-Shadow Scouts"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Tsuyukusa", "Lotus Ascetics", "Mask Bearers", "Void Crane Riders", "Dreampiercer Archers", "Lantern Bearers"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply Lines — cut the Grid's communication nodes.", "Thread-Cutter Assassins sever connections. Target support units.", "Silk Wraiths teleport behind lines. Disrupt and vanish.", "Venom Dancers are agile melee. They dodge and counter.", "Phase-Silk Infiltrators assassinate high-value targets."],
		"battle_modifiers": {"label": "Fate-Severed", "description": "Grid disruption. Enemy units lose -2 DEF from broken coordination.", "enemy_def_bonus": -2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Kill List",
		"objectives_text": "Multiple targets. Multiple assassinations. Nyx moves through the Nightfang like a ghost.",
		"pre_story": [ShardLore.dialogue("Thread-Cutter Nyx", "The Nightfang have five officers coordinating this sector. The Loom-Mother wants them all dead. Not routed. Not captured. DEAD. Their fate-threads severed permanently. I've studied each one. Their habits, their guards, their vulnerabilities. Five targets. One night. This is what I was born for.", "eager")],
		"post_story": [ShardLore.dialogue("Thread-Cutter Nyx", "Five targets. Five severed threads. Three hours. The Nightfang didn't even realize they'd lost their command structure until dawn. By then, their forces were directionless — easy prey for the Silk-Marshal's conventional forces following behind me. This is the Thread-Cutter's art: we don't fight armies. We remove the minds that direct them.", "matter_of_fact")],
		"defeat_story": [ShardLore.dialogue("Thread-Cutter Nyx", "Sanguinar's blood-wards. They detected me through the shadows. Vampiric senses are... problematic for an assassin. I need countermeasures.", "frustrated")],
		"player_army": ["Thread-Cutter Nyx", "Thread-Cutter Assassins", "Silk Wraiths", "Phase-Silk Cavalry", "Venom Dancers", "Phase-Silk Infiltrators"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Shadowfang Kreev", "Midnight Assassin", "Shadow Stalkers", "Nightfang Warriors", "Blood Reavers", "Shadow Claw Infantry"],
		"battle_size": "standard",
		"scenario": "shardstorm",
		"round_limit": 7,
		"tutorial_tips": ["Assassin vs assassin — Nyx vs Kreev.", "Both sides have stealth units. First strike wins.", "Phase-Silk Cavalry provides fast flanking support.", "Silk Wraiths scout and reveal hidden enemies.", "ATK 21 vs ATK 18. Nyx hits harder but is more fragile."],
		"battle_modifiers": {"label": "Kill List", "description": "Assassin's focus. Nyx gains +2 ATK and +2 MOV.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Severed Thread",
		"objectives_text": "Nyx leads a full assassination force to sever the Iron Dominion's command structure.",
		"pre_story": [
			ShardLore.dialogue("Thread-Cutter Nyx", "Calculon. The final thread on my list. The Grid's architect. The mind behind the Iron Dominion's resurrection. Severing his thread would cripple their entire faction. I've assembled every assassin, every phase-walker, every shadow-blade in the Matriarchy. We go in hard, we go in fast, and we don't stop until Calculon's thread is cut. This isn't just an assassination. It's SURGERY on the Pattern itself.", "intense"),
		],
		"post_story": [
			ShardLore.narration("Thread-Cutter Nyx moved through the Iron Dominion's command post like a whisper through steel corridors. Her Thread-Cutter blade — a weapon that severs not flesh but FATE — found its target. Calculon's thread trembled, frayed, and nearly snapped. But he was tenacious — his Grid rerouted his destiny through a thousand backup threads, each one a contingency plan. The thread held. But it was damaged. And Nyx never forgets a target."),
			ShardLore.dialogue("Thread-Cutter Nyx", "The thread frayed but didn't break. Calculon lives. For now. His contingencies saved him — this time. But I've mapped his thread structure. I know where the backups are. Next time, there will be no net to catch him. The Thread-Cutter is patient. The Thread-Cutter is inevitable.", "promising"),
		],
		"defeat_story": [ShardLore.dialogue("Thread-Cutter Nyx", "They expected me. Every approach was covered. Every shadow was watched. Calculon didn't just predict my coming — he CALCULATED my exact entry vector. His fate-thread is armored in mathematics. I need a new approach entirely.", "coldly_determined")],
		"player_army": ["Thread-Cutter Nyx", "Thread-Cutter Assassins", "Silk Wraiths", "Phase-Silk Cavalry", "Phase-Silk Infiltrators", "Venom Dancers", "Spiderling Swarm", "Phase-Silk Wraith Spider"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Clockwork Titan", "Elite Vanguard", "Steam Heavy Guards", "Aether Marksmen", "Infantry Regiment", "Steam Artillery Crew", "Mechanized Scouts"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Assassination force vs heavy armor. Speed and precision.", "Phase-Silk Wraith Spider teleports behind lines. Major disruption.", "Thread-Cutter Assassins are your scalpels. Hit then vanish.", "Nyx goes for Calculon. ATK 21 vs Grid defenses.", "Spiderling Swarm distracts. Phase-Silk units exploit openings.", "Short round limit — this is a raid, not a war."],
		"battle_modifiers": {"label": "The Severed Thread", "description": "Assassination protocol. All units gain +2 ATK and +2 MOV.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Thread-Cutter Nyx", "I don't make speeches. I don't lead armies. I don't weave fate or read the Pattern. I just cut. One thread at a time. One target at a time. Until the Matriarchy's enemies are extinct and the Pattern runs clean. That's all. That's enough.", "final"),
	]
