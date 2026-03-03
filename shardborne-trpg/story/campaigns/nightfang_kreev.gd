class_name NightfangKreevCampaign
## Shadowfang Kreev — "The Silent Fang"
## Assassin, Stealth, Ambush. ATK 18, MOV 7, CMD 9. Master assassin.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_kreev",
		"commander": "Shadowfang Kreev",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Silent Fang",
		"description": "Shadowfang Kreev doesn't fight battles. He ends them before they begin — one precise kill at a time. The greatest assassin in the Nightfang Dominion.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Shadowfang Kreev", "...", "silent"),
		ShardLore.narration("Kreev said nothing. He never said anything. His reputation spoke for him — forty-seven confirmed kills, all commanders or high-value targets, all in a single strike, all without being detected. The Silent Fang was less a title than a description."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Mark",
		"objectives_text": "Eliminate the Emberclaw commander. One kill. In and out.",
		"pre_story": [ShardLore.narration("Kreev studied the target through shard-glass: an Emberclaw war-chief, surrounded by bodyguards, protected by drakes. He noted the patrol patterns, the guard rotations, the blind spots. Three entries. Two exits. One kill. He chose the silence.")],
		"post_story": [ShardLore.narration("The war-chief fell without a sound. By the time the bodyguards noticed, Kreev was gone — a shadow that had never been there. The Emberclaw camp erupted into panic, searching for an assassin who was already miles away, cleaning his blade.")],
		"defeat_story": [ShardLore.narration("Kreev withdrew. The target was too well-protected. He would return. He always returned.")],
		"player_army": ["Shadowfang Kreev", "Shadow Stalkers", "Midnight Assassin", "Nightveil Infiltrators", "Shadow Claw Infantry"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Skywatcher Orin", "Emberclaw Warriors", "Emberforged Blades", "Ashrider Scouts"],
		"battle_size": "skirmish",
		"scenario": "king_of_the_hill",
		"round_limit": 5,
		"tutorial_tips": ["Kreev has ATK 18, MOV 7, and Stealth. He strikes first.", "Focus on killing the enemy commander — that's the mission.", "Shadow Claw Infantry have Shadow Meld. Use it for positioning."],
		"battle_modifiers": {"label": "Assassination Protocol", "description": "Stealth approach. Kreev gains +3 ATK on first strike.", "player_atk_bonus": 3},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Sabotage",
		"objectives_text": "Infiltrate the Iron Dominion supply depot. Destroy their war machines from the inside.",
		"pre_story": [ShardLore.narration("Kreev's plan was drawn in the dirt with one finger: infiltrate, sabotage the fuel lines, detonate the ammunition stores, escape in the confusion. Simple. Effective. Silent. His team of infiltrators watched with the reverence of students before a master.")],
		"post_story": [ShardLore.narration("The explosion lit the sky for miles. Three war machines destroyed, a month of ammunition detonated, and the depot reduced to twisted metal. Kreev watched from a hilltop, expressionless, already planning the next operation.")],
		"defeat_story": [ShardLore.narration("The Grid detected the infiltration. Alarms. Lights. Dogs. Kreev retreated — the first time in eleven years. He did not like the feeling.")],
		"player_army": ["Shadowfang Kreev", "Nightveil Infiltrators", "Midnight Assassin", "Shadow Stalkers", "Shadow Pounce Cavalry", "Blood Runners"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Masked Lord Kurohane", "Kintsugi Blademasters", "Shrine Wardens", "Void Crane Riders", "Celestial Slingers", "Ink Sigil Crafters"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply Lines — reach the supply points (sabotage targets).", "Every unit has stealth or infiltration. Use it.", "Lady Brassveil is a counter-intelligence specialist. Be careful."],
		"battle_modifiers": {"label": "Sabotage Op", "description": "Infiltration bonuses. All units gain +2 ATK from ambush.", "player_atk_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Kill List",
		"objectives_text": "Three high-value targets in the Thornweft command structure. Eliminate all three.",
		"pre_story": [ShardLore.narration("The kill list was short: a Thornweft weaver-commander, a brood-warden, and a web-engineer. Three kills that would cripple the Thornweft's northern operation. Kreev divided his assassins into three strike teams. He would take the hardest target himself. He always took the hardest target.")],
		"post_story": [ShardLore.narration("Three targets. Three kills. Three different locations, all within the same hour. Kreev's coordination was inhuman — each strike team hit simultaneously, preventing any warning, any escape, any response. The Thornweft northern command simply ceased to exist.")],
		"defeat_story": [ShardLore.narration("Two out of three. One target escaped into a web-tunnel. Kreev stared at the empty cocoon for a long time. Ninety-three percent success rate. For anyone else, excellent. For Kreev, failure.")],
		"player_army": ["Shadowfang Kreev", "Midnight Assassin", "Nightveil Infiltrators", "Shadow Stalkers", "Shadow Claw Infantry", "Nightstalker Cavalry", "Blood Champion"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Brood-Warden Thessari", "Gossamer Guard", "Silk-Warden Regulars", "Cocoon Wardens", "Web-Spinner Sappers", "Gossamer Trap Layers"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["Multiple high-value targets. Prioritize the commanders.", "Nightstalker Cavalry can rapidly reposition for flanking.", "Blood Champion engages enemy bodyguards while Kreev strikes."],
		"battle_modifiers": {"label": "Kill List", "description": "Assassination focus. Commander-killers gain +3 ATK.", "player_atk_bonus": 3},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Silent Fang",
		"objectives_text": "Lord Calculon himself is the target. The most protected commander in the Shardlands. One kill to end the war.",
		"pre_story": [
			ShardLore.narration("The ultimate target: Lord Calculon. Protected by the Grid, surrounded by machines, analyzed by a mind that predicted probability with mathematical precision. Every other assassin had failed. Every approach had been anticipated. Every strategy had been countered."),
			ShardLore.narration("But Kreev had studied Calculon for months. He knew the Grid's blind spots. He knew the patrol patterns. He knew the one moment — sixty seconds, once per day — when the Grid cycled to a new frequency and the sensors were briefly dark. Sixty seconds. It was enough. It was always enough."),
		],
		"post_story": [
			ShardLore.narration("Lord Calculon lived. Kreev's blade stopped one inch from his throat — not because Kreev missed, but because he chose to stop. The message was clear: 'I can reach you anywhere. I chose not to kill you today. Remember that.'"),
			ShardLore.narration("Kreev vanished into the darkness, leaving behind a single fang — his calling card — embedded in Calculon's command console. Lord Calculon stared at it for a long time, then quietly ordered every Grid sensor protocol redesigned from scratch."),
			ShardLore.dialogue("Lord Calculon", "Probability of successful infiltration was 0.003%. The assassin did it anyway. Recalculating... everything.", "shaken"),
		],
		"defeat_story": [ShardLore.narration("The Grid caught him. For the first time in his career, Kreev was detected before the strike. Calculon's new predictive algorithms were... better than expected. Kreev retreated, already planning the next attempt. There was always a next attempt.")],
		"player_army": ["Shadowfang Kreev", "Midnight Assassin", "Nightveil Infiltrators", "Shadow Stalkers", "Shadow Claw Infantry", "Shadow Pounce Cavalry", "Nightstalker Cavalry", "Hunger Wraith"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Elite Vanguard", "Steam Heavy Guards", "Clockwork Titan", "Steam Sentinels", "Aether Marksmen", "Mechanized Scouts", "Clockwork Infantry"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["The ultimate assassination mission. Calculon is heavily protected.", "Hunger Wraith can phase through defenses with Ethereal.", "Create diversions with cavalry while Kreev flanks.", "This battle tests pure stealth and positioning mastery."],
		"battle_modifiers": {"label": "The Silent Fang", "description": "Maximum stealth. All units gain +2 ATK and first-strike.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Shadowfang Kreev cleaned his blade, sheathed it, and disappeared. No speech. No declaration. No farewell. He was the Silent Fang — a title earned through forty-eight confirmed kills and zero words. Somewhere in the Shardlands, a target slept uneasily, knowing that silence was the last thing they would ever hear."),
	]
