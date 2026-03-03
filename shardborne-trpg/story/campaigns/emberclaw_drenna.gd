class_name EmberclawDrennaCampaign
## Pyroclaw Drenna — "Fury Unchained"
## ATK 24 melee berserker. Fire claws, rage, close combat devastation.
## 4 missions. Teaches aggressive play, berserker tactics, morale pressure.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_drenna",
		"commander": "Pyroclaw Drenna",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "Fury Unchained",
		"description": "Pyroclaw Drenna fights with claws of living flame. She is rage given form — the Emberclaw berserker tradition taken to its terrifying extreme. In the Shardlands, her fury threatens to consume her.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("Drenna didn't speak. She hadn't spoken since the transit. The shard-fire in her veins was screaming, amplified by the alien energies of this broken world, turning her constant low-level rage into something volcanic."),
		ShardLore.narration("Her claws — extensions of her own skeleton, coated in living flame — had grown three inches since arriving. They burned hotter. They burned brighter. And they burned all the time now, even in her sleep."),
		ShardLore.dialogue("Pyroclaw Drenna", "...the fire talks to me here. It says things it never said in Ignareth. It says 'more.' It says 'everything.' It says 'burn it all and start over.' I am trying not to listen.", "strained"),
		ShardLore.fhah_zolg("Ah, the berserker. All that fury bottled in flesh. Let's see what happens when I take the cork out."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Red Hour",
		"objectives_text": "Channel Drenna's fury into something useful. Destroy the Nightfang raiding party before they reach the camp.",
		"pre_story": [
			ShardLore.dialogue("Pyroclaw Drenna", "Nightfang. Blood-drinkers. Coming for our camp. Good. I need something to hit that deserves it.", "dangerous_calm"),
		],
		"post_story": [
			ShardLore.narration("The Nightfang raiding party ceased to exist. Drenna moved through them like a fire through dry grass — her claws leaving trails of white-hot flame in the air, her berserker rage precisely channeled into maximum lethality."),
			ShardLore.narration("When it was over, she stood in the center of the devastation, breathing hard, her claws dimming from white to orange. She had not lost control. Not this time."),
			ShardLore.dialogue("Pyroclaw Drenna", "Still me. Still in control. The fire wanted more. I told it 'enough.' It listened. This time.", "shaking"),
		],
		"defeat_story": [
			ShardLore.dialogue("Pyroclaw Drenna", "They were faster than my rage. That shouldn't be possible.", "confused"),
		],
		"player_army": ["Pyroclaw Drenna", "Emberclaw Warriors", "Unbonded Berserkers", "Emberforged Blades"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Masked Lord Kurohane", "Veiled Ashigaru", "Inkblade Initiates"],
		"battle_size": "skirmish",
		"scenario": "shardstorm",
		"round_limit": 5,
		"tutorial_tips": ["Drenna has ATK 24 — one of the highest in the game. She kills almost anything in one engagement.", "Cinder Berserkers gain ATK when they take damage. Let them get hit, then charge.", "Flameclaw Ravagers have Rend — they ignore some enemy DEF."],
		"battle_modifiers": {"label": "Berserker Fury", "description": "Drenna's rage is contagious. All melee units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Burning Point",
		"objectives_text": "The fire is growing too strong. Fight through the Iron Dominion patrol while keeping Drenna's rage contained.",
		"pre_story": [
			ShardLore.dialogue("Pyroclaw Drenna", "The shard-energy is feeding the fire. Making it stronger. Making ME stronger. I can feel my bones heating up. If I fight today, I may not be able to stop. But if I don't fight today, the machine-folk take the pass and cut us off from Vex.", "conflicted"),
			ShardLore.narration("She chose to fight. She always chose to fight."),
		],
		"post_story": [
			ShardLore.narration("Drenna's claws burned blue during the battle — a color that Emberclaw fire shouldn't reach. Blue fire was divine fire, prophecy-fire, the sacred flame of the highest rituals. Coming from a berserker's claws, it was unprecedented."),
			ShardLore.dialogue("Pyroclaw Drenna", "I saw something in the blue fire. A shape. A figure. It was watching me from inside the flame. It smiled. I don't think fires are supposed to smile.", "haunted"),
		],
		"defeat_story": [
			ShardLore.dialogue("Pyroclaw Drenna", "The rage broke loose. I couldn't aim it. I hit everything — including our own. I need help. I need someone to teach me to leash this.", "desperate"),
		],
		"player_army": ["Pyroclaw Drenna", "Unbonded Berserkers", "Emberforged Blades", "Emberclaw Warriors", "Flameheart Clerics"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Steam Sentinels", "Infantry Regiment", "Clockwork Pioneers", "Clockwork Titan", "Steam-Powered Sharpshooters"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["Broken Ground: the terrain shifts. Melee units must adapt positioning.", "Flameheart Clerics can heal and stabilize Drenna. Keep them close.", "The Clockwork Titan is heavily armored — Drenna's raw ATK can punch through it."],
		"battle_modifiers": {"label": "Blue Fire", "description": "Drenna's fire burns hotter. She gains +3 ATK but -1 DEF.", "player_atk_bonus": 3, "player_def_penalty": -1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Beast Within",
		"objectives_text": "Something in the Shardlands is calling to Drenna's fire. Find it and decide: feed the rage or master it.",
		"pre_story": [
			ShardLore.dialogue("Pyroclaw Drenna", "The shard-fragment is calling me. I can feel it in my claws — a vibration, a resonance. It wants my fire. It's offering something in return. More power. More fury. The question is whether I take it.", "trembling"),
		],
		"post_story": [
			ShardLore.narration("Drenna found the fragment — a jagged piece of pure rage-energy, crystallized into solid form. It pulsed with her heartbeat. It burned with her fire. It was, in some way she couldn't articulate, her."),
			ShardLore.narration("She could have absorbed it. Become something more than mortal — a living weapon, a fire that never stopped. She held it in her burning claws for a long moment."),
			ShardLore.dialogue("Pyroclaw Drenna", "No. I am not a fire. I am a person who fights with fire. There is a difference, and I will not forget it.", "resolute"),
			ShardLore.narration("She set the fragment down. Her claws dimmed to a steady, controlled orange. For the first time since arriving in the Shardlands, the fire was quiet."),
		],
		"defeat_story": [
			ShardLore.dialogue("Pyroclaw Drenna", "The fragment... it's in me now. I couldn't resist. The fire is so LOUD. Help me. Someone help me.", "losing_control"),
		],
		"player_army": ["Pyroclaw Drenna", "Unbonded Berserkers", "Emberforged Blades", "Immolation Bombers", "Phoenix Guard", "Flameheart Clerics"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Thread-Cutter Nyx", "Venom Dancers", "Silk-Warden Regulars", "Cocoon Wardens", "Phase-Silk Infiltrators", "Brood-Mother Spider"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Shard Clash: reach the rage-fragment at the center.", "Drenna's fury makes her devastating but vulnerable. Screen her with Phoenix Guard.", "Immolation Bombers are one-use — time their sacrifice for maximum impact."],
		"battle_modifiers": {"label": "Rage Resonance", "description": "The fragment amplifies rage. All berserker units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Fury Unchained",
		"objectives_text": "The Nightfang have unleashed a Crimson Behemoth. Only Drenna's controlled fury can stop it.",
		"pre_story": [
			ShardLore.dialogue("Pyroclaw Drenna", "A Behemoth. The biggest thing the blood-drinkers have. They've pointed it at the coalition camp. Everyone is running. I am not everyone. The fire is quiet now — controlled, focused, mine. Let's see what controlled fury can do to a monster.", "calm_for_the_first_time"),
		],
		"post_story": [
			ShardLore.narration("Drenna fought the Crimson Behemoth for twenty-seven minutes. Not in a berserk frenzy — in precise, calculated strikes. Her claws found the joints in its armor, the gaps in its regeneration, the rhythm of its heartbeat. She fought like a surgeon. A surgeon made of fire."),
			ShardLore.narration("When the Behemoth fell, Drenna stood on its chest and looked at her claws. Steady. Orange. Controlled. The fire purred like a satisfied cat."),
			ShardLore.dialogue("Pyroclaw Drenna", "I used to think rage was power. It's not. Rage is noise. Power is choosing when to be loud and when to be quiet. Today, I was quiet. And I killed a god.", "peaceful"),
		],
		"defeat_story": [
			ShardLore.dialogue("Pyroclaw Drenna", "The Behemoth is too strong. I need... I need to be smarter, not just angrier. There has to be a way.", "thinking_for_once"),
		],
		"player_army": ["Pyroclaw Drenna", "Unbonded Berserkers", "Emberforged Blades", "Phoenix Guard", "Scorched Veterans", "Immolation Bombers", "Flameheart Clerics"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Warlord Rathka", "Crimson Behemoth", "Blood Reavers", "Tiger Berserkers", "Blood Shamans", "Nightfang Warriors", "Shadow Stalkers"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["The Crimson Behemoth is the toughest enemy in this campaign. Focus fire.", "Drenna's controlled fury gives her ATK 24 — she can trade blows with anything.", "Phoenix Guard can resurrect once. Time their sacrifice carefully.", "Immolation Bombers deal massive area damage. Use them against clusters."],
		"battle_modifiers": {"label": "Controlled Burn", "description": "Drenna's mastered fury. She gains +2 ATK and +2 DEF.", "player_atk_bonus": 2, "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Drenna stood in the rain — the Shardlands' rare, mineral-heavy rain that hissed on contact with her skin. Her claws were retracted, folded against her forearms, dormant for the first time since she was twelve years old."),
		ShardLore.dialogue("Pyroclaw Drenna", "I spent my life being angry. At the world, at the enemy, at myself. The Shardlands tried to make me angrier. Instead, they taught me something: fury without purpose is just suffering. Fury with purpose is a weapon. And a weapon decides when to be drawn.", "at_peace"),
		ShardLore.narration("She opened her hands. The claws stayed retracted. The fire stayed quiet. Pyroclaw Drenna — the rage of the Emberclaw, the fury unchained — had finally found her leash. And it was her own."),
	]
