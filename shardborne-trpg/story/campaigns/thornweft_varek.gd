class_name ThornweftVarekCampaign
## Spindle-Knight Varek — "The Immovable"
## Tank, Bodyguard, Immovable, ATK 15, DEF 7, HP 42, MOV 5, CMD 7.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_varek",
		"commander": "Spindle-Knight Varek",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "The Immovable",
		"description": "Spindle-Knight Varek has DEF 7 and HP 42. He is encased in silk-reinforced chitin armor, and nothing — NOTHING — moves him from where he stands.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Spindle-Knight Varek", "I am the shield. The Loom-Mother weaves. Kythara reads. Draven commands. Nyx kills. And I? I STAND. Between the Matriarchy and everything that would harm it. I have stood against charges, sieges, assassinations, and gods. I am still standing. That is all you need to know about me.", "immovable"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Shield Holds",
		"objectives_text": "Varek holds a chokepoint against overwhelming Emberclaw forces.",
		"pre_story": [ShardLore.dialogue("Spindle-Knight Varek", "The Loom-Mother retreats through this pass. I hold the rear. The Emberclaw have three times our numbers — berserkers, war-drakes, fire-breathers. It doesn't matter. They have to come through ME. And I don't move.", "simple_truth")],
		"post_story": [ShardLore.dialogue("Spindle-Knight Varek", "They charged seven times. Seven times they broke against my shield. The silk-chitin armor held against fire, against claws, against a drake's full weight. The Loom-Mother is safe. That is all that matters.", "duty_done")],
		"defeat_story": [ShardLore.dialogue("Spindle-Knight Varek", "They went AROUND me. I held the pass but they climbed the walls. I'm immovable, not omnipresent. I need troops to cover the flanks.", "honest")],
		"player_army": ["Spindle-Knight Varek", "Anchor Guard", "Gossamer Guard", "Web-Anchor Engineers", "Silk Surgeons"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Yukimaru", "Oni Mask Executioners", "Dreampiercer Archers"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["Varek has DEF 7 and HP 42. He's the ultimate tank.", "Keep Varek at the chokepoint. NOTHING gets past him.", "Anchor Guard supports the flanks. They hold ground too.", "Silk Surgeons heal the frontline. Keep the wall intact."],
		"battle_modifiers": {"label": "Shield Holds", "description": "Immovable defense. Varek gains +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Bodyguard",
		"objectives_text": "Protect Thread-Seer Kythara — Varek's bodyguard duty against Nightfang assassins.",
		"pre_story": [ShardLore.dialogue("Spindle-Knight Varek", "Thread-Seer Kythara reads the Pattern at the convergence point. She will be vulnerable — deep in trance, unable to defend herself. The Nightfang have sent Shadowfang Kreev. An assassin. ATK 18, MOV 7. Fast, lethal, invisible. It doesn't matter. Let him come. I'll be standing between him and the Seer. And I don't move. Ever.", "resolute")],
		"post_story": [ShardLore.dialogue("Spindle-Knight Varek", "Kreev struck three times. Silent blade, perfect technique, lethal intent. my armor held all three strikes. Then I hit back. Once. He didn't get up. Speed kills, they say. But armor kills speed.", "understated")],
		"defeat_story": [ShardLore.dialogue("Spindle-Knight Varek", "Kreev... he didn't attack me. He went around me. Under me. THROUGH me. Assassins don't fight tanks. They avoid them. I need faster escorts.", "learning")],
		"player_army": ["Spindle-Knight Varek", "Fang Guard Elite", "Gossamer Guard", "Silk Surgeons", "Vibration Drummers", "Tremor Sentinels"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Shadowfang Kreev", "Midnight Assassin", "Shadow Stalkers", "Nightveil Infiltrators", "Shadow Claw Infantry", "Blood Runners"],
		"battle_size": "standard",
		"scenario": "shardstorm",
		"round_limit": 7,
		"tutorial_tips": ["Bodyguard mission — protect the seer (center objective).", "Varek stays with the objective. He IS the shield.", "Tremor Sentinels detect hidden assassins. Critical against stealth.", "Fang Guard Elite handles what gets past Varek.", "Vibration Drummers reveal positions through web vibrations."],
		"battle_modifiers": {"label": "The Bodyguard", "description": "Protection duty. Varek gains +3 DEF, +10 HP.", "player_def_bonus": 3},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Anvil",
		"objectives_text": "Varek is the anvil. The cavalry is the hammer. Crush the Iron Dominion between them.",
		"pre_story": [ShardLore.dialogue("Spindle-Knight Varek", "Draven's plan: I hold the center. The enemy commits against me because I'm the obvious target — big, slow, impossible to ignore. While they focus on trying to break me, Silk-Rider Lancers and Matriarch Riders sweep both flanks. Hammer and anvil. The oldest tactic in warfare. I'm the anvil. I'm ALWAYS the anvil. And I never break.", "accepting")],
		"post_story": [ShardLore.dialogue("Spindle-Knight Varek", "They committed everything against me. Artillery, infantry, even their Clockwork Titan. It hurt. I won't pretend otherwise. But I held. And while they wasted everything on trying to break the unbreakable, the cavalry shattered their flanks. The anvil's purpose is not to win. It is to ENDURE long enough for the hammer to strike.", "wisdom")],
		"defeat_story": [ShardLore.dialogue("Spindle-Knight Varek", "The cavalry was intercepted before reaching the flanks. I held, but without the hammer, the anvil is just... a punching bag. Coordination failed. Not my fault, but not my victory either.", "pragmatic")],
		"player_army": ["Spindle-Knight Varek", "Silk-Rider Lancers", "Matriarch Riders", "Anchor Guard", "Gossamer Guard", "Cocoon Wardens", "Web-Anchor Engineers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Piston", "Clockwork Titan", "Infantry Regiment", "Steam Heavy Guards", "Clockwork Infantry", "Steam Artillery Crew"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Hammer and anvil. Varek holds; cavalry flanks.", "Varek draws fire. That's his JOB.", "Silk-Rider Lancers and Matriarch Riders hit flanks simultaneously.", "Anchor Guard supports Varek. Web-Anchor Engineers fortify his position.", "When the cavalry hits, the enemy crumbles between hammer and anvil."],
		"battle_modifiers": {"label": "The Anvil", "description": "Hammer and anvil. Cavalry gains +2 ATK on flank charges.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Immovable",
		"objectives_text": "Everything the enemy has vs Varek's absolute defense. The unstoppable force meets the immovable object.",
		"pre_story": [
			ShardLore.dialogue("Spindle-Knight Varek", "They bring their strongest. Their champions, their titans, their monsters. They think force will break what guile could not. DEF 7. HP 42. Silk-chitin armor reinforced with web-steel and fate-blessed threads. I have been hit by everything — fire, steel, venom, corruption, aether, and pure rage. I am still standing. I will ALWAYS be standing. Because the Matriarchy needs a shield. And I am their shield. Unbreaking. Unbending. Immovable.", "absolute"),
		],
		"post_story": [
			ShardLore.narration("When the battle ended, Spindle-Knight Varek was still standing exactly where he had been at the start. His armor was scarred, dented, scorched, and cracked. But it held. He held. Around him, the bodies of those who had tried to move him lay in a semicircle — a testament to the fundamental truth that some things simply cannot be broken."),
			ShardLore.dialogue("Spindle-Knight Varek", "They asked me once what it's like to be invincible. I told them: lonely. Because when nothing can hurt you, nothing can touch you either. But loneliness is a small price to pay for the safety of those I protect. I am the shield. I am the wall. I am immovable. And I am enough.", "quiet_strength"),
		],
		"defeat_story": [ShardLore.dialogue("Spindle-Knight Varek", "They didn't try to break me. They buried me. Tons of rubble, collapsing the terrain itself. You can't fight a landslide. Even I can't. But I'm still alive under here. And when I dig myself out... they'll wish they'd finished the job.", "buried_alive")],
		"player_army": ["Spindle-Knight Varek", "Silk Colossus", "Anchor Guard", "Fang Guard Elite", "Gossamer Guard", "Silk Surgeons", "Web-Anchor Engineers", "Cocoon Processors", "Web-Fortress"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Wyrmlord Tzarak", "Grounded Wyrm", "Emberforged Blades", "Unbonded Berserkers", "Mature War Drake", "Emberclaw Warriors", "Pyromancer Adepts", "Immolation Bombers"],
		"battle_size": "epic",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["The Immovable. Nothing gets past Varek.", "Silk Colossus reinforces the defensive line.", "Web-Fortress anchors one flank. Varek anchors the other.", "Silk Surgeons keep the defenders alive.", "Cocoon Processors repair damaged units.", "This is pure endurance. Outlast the fire."],
		"battle_modifiers": {"label": "The Immovable", "description": "Absolute defense. All units gain +3 DEF. Varek gains +5 HP.", "player_def_bonus": 3},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Spindle-Knight Varek", "I am not the greatest warrior. I am not the cleverest commander. I am not the fastest, the deadliest, or the most inspiring. But I am immovable. And sometimes, that is all you need. A shield that never breaks. A wall that never falls. A knight that never yields. I am Varek. I am the Immovable. And I am exactly where I need to be.", "final"),
	]
