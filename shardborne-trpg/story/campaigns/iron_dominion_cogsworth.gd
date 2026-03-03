class_name IronDominionCogsworthCampaign
## Lady Cogsworth — "The Clockwork Charge"
## Clockwork cavalry, Mobility. Fast-moving mechanized commander.
## 4 missions. Teaches cavalry tactics, flanking, rapid deployment.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_cogsworth",
		"commander": "Lady Cogsworth",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Clockwork Charge",
		"description": "Lady Cogsworth commands the fastest machines in the Iron Dominion. In the Shardlands, speed is survival — and she intends to survive at full gallop.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("Lady Cogsworth rode at the head of her cavalry column — not because protocol demanded it, but because she refused to let any machine be faster than her. Her personal mount, a chrome-plated clockwork destrier with articulated legs and steam-driven muscles, was the finest piece of engineering in the Dominion."),
		ShardLore.dialogue("Lady Cogsworth", "The Grid is fragmented. Lord Calculon is rebuilding the network. That takes time. We don't have time. The enemy is moving NOW. So I move faster. That is my function. That has always been my function.", "clipped"),
		ShardLore.fhah_zolg("The cavalrywoman. She thinks speed is the answer to every question. She's wrong, of course. But she's wrong so quickly that it often looks like being right."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "First Contact",
		"objectives_text": "Lead a fast reconnaissance to map enemy positions. Speed is everything.",
		"pre_story": [ShardLore.dialogue("Lady Cogsworth", "Standard recon doctrine: move fast, observe, report, withdraw. Except today we're also going to destroy anything that shoots at us. Modified recon doctrine.", "efficient")],
		"post_story": [ShardLore.dialogue("Lady Cogsworth", "Six enemy positions mapped, two supply caches marked for capture, one ambush neutralized. Total elapsed time: fourteen minutes. Acceptable. Not optimal. I'll be faster next time.", "dissatisfied_with_perfection")],
		"defeat_story": [ShardLore.dialogue("Lady Cogsworth", "Too slow. The machines need recalibration. Or I need better tactics. Probably both.", "analytical")],
		"player_army": ["Lady Cogsworth", "Clockwork Cavalry", "Steam Lancers", "Scouts/Recon"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Yukimaru", "Oni Mask Executioners", "Dreampiercer Archers"],
		"battle_size": "skirmish",
		"scenario": "broken_ground",
		"round_limit": 5,
		"tutorial_tips": ["Cogsworth's cavalry is fast. Use speed to pick off isolated units.", "Steam Lancers have Lance Charge — devastating on the first engagement.", "Scouts/Recon deploy forward. Use them to spot before your cavalry charges."],
		"battle_modifiers": {"label": "Rapid Maneuver", "description": "Cogsworth's mounts are optimized. All cavalry gain +2 MOV.", "player_mov_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Flanking Maneuver",
		"objectives_text": "Circle behind the Emberclaw defensive line and strike their supply depot.",
		"pre_story": [ShardLore.dialogue("Lady Cogsworth", "Direct assault: 67% casualties. Flanking maneuver: 12% casualties. The mathematics of cavalry warfare are simple. Go around, not through.", "lecturing")],
		"post_story": [ShardLore.dialogue("Lady Cogsworth", "Supply depot captured. Enemy defensive line rendered irrelevant by the simple expedient of not being in front of it. Speed defeats walls. Always.", "smug")],
		"defeat_story": [ShardLore.dialogue("Lady Cogsworth", "They anticipated the flank. Adaptable enemies. I need more speed to compensate for predictability.", "frustrated")],
		"player_army": ["Lady Cogsworth", "Clockwork Cavalry", "Gear-Rider Hussars", "Aether Dragoons", "Steam Lancers", "Mechanized Scouts"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberclaw Warriors", "Flameborn Guard", "Hatchery Guard", "Pyroclast Catapult", "Scorched Veterans"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 6,
		"tutorial_tips": ["Supply Lines: get your units across. Cavalry's speed is the advantage.", "Gear-Rider Hussars have Sabre Sweep — they hit multiple adjacent enemies.", "Avoid the Pyroclast Catapult's range. Flank around it."],
		"battle_modifiers": {"label": "Cavalry Doctrine", "description": "Flanking bonus. Cavalry gain +2 ATK when attacking from behind.", "player_atk_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Thunder Run",
		"objectives_text": "Break through the Thornweft web-barrier with a massed cavalry charge.",
		"pre_story": [ShardLore.dialogue("Lady Cogsworth", "Web across the valley. Blocks the trade route. Infantry can't cut through — the silk reforms. But a cavalry charge at maximum speed generates enough kinetic energy to shatter the crystallized web-anchors. One charge. One chance. Full speed.", "calculating")],
		"post_story": [
			ShardLore.narration("The charge hit the web-barrier at forty miles per hour — clockwork destriers at full gallop, steam-driven muscles screaming with power, Lady Cogsworth at the spearhead. The web shattered like glass."),
			ShardLore.dialogue("Lady Cogsworth", "Physics. Kinetic energy equals one-half mass times velocity squared. More speed equals exponentially more force. I told Calculon cavalry was the answer. He said 'to what question?' I said 'all of them.'", "triumphant"),
		],
		"defeat_story": [ShardLore.dialogue("Lady Cogsworth", "The web absorbed the impact. Need more velocity. Or more mass. Or both.", "recalculating")],
		"player_army": ["Lady Cogsworth", "Clockwork Cavalry", "Gear-Rider Hussars", "Iron Stampede", "Steam Lancers", "Aether Dragoons"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Warden Regulars", "Gossamer Guard", "Web-Anchor Engineers", "Spiderling Swarm", "Brood-Mother Spider", "Venom Dancers"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Iron Stampede has Devastating Charge — the most powerful cavalry impact in the game.", "Coordinate charges: hit the web-barrier (center) with multiple cavalry simultaneously.", "Aether Dragoons can fire from horseback. Use them to suppress before the charge."],
		"battle_modifiers": {"label": "Thunder Run", "description": "Massed charge bonus. Cavalry gain +1 ATK for each adjacent cavalry unit.", "player_atk_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Clockwork Charge",
		"objectives_text": "Lead the greatest cavalry charge in Dominion history to break the Nightfang siege.",
		"pre_story": [ShardLore.dialogue("Lady Cogsworth", "Full regiment. Every rider, every mount, every lance. The blood-drinkers are besieging Calculon's position. He calculates he can hold for six more hours. My cavalry will be there in forty minutes. Charge formation ALPHA. Full speed. No stops. No mercy.", "blazing")],
		"post_story": [
			ShardLore.narration("The charge of Lady Cogsworth's cavalry regiment would become the most celebrated moment in Iron Dominion military history. Seventy-two clockwork destriers at full gallop, steam plumes trailing behind them like banners, hitting the Nightfang siege lines like a chrome-plated avalanche."),
			ShardLore.dialogue("Lady Cogsworth", "Siege broken. Casualties: seven percent. Time: twenty-two minutes. Lord Calculon's response: 'Acceptable.' From him, that's practically a standing ovation.", "satisfied"),
		],
		"defeat_story": [ShardLore.dialogue("Lady Cogsworth", "The charge failed. The enemy was too entrenched. I need heavier cavalry. Or a different approach entirely.", "humbled")],
		"player_army": ["Lady Cogsworth", "Clockwork Cavalry", "Iron Stampede", "Gear-Rider Hussars", "Aether Dragoons", "Steam Lancers", "Mechanized Scouts", "Elite Vanguard"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Countess Nyxara", "Blood Reavers", "Nightfang Warriors", "Tiger Berserkers", "Shadow Stalkers", "Blood Shamans", "Tiger Alpha", "Crimson Behemoth"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Epic cavalry battle. Every unit should be mobile and aggressive.", "Iron Stampede breaks through heavy units. Gear-Rider Hussars mop up.", "Countess Nyxara is a dangerous commander. Overwhelm her with speed."],
		"battle_modifiers": {"label": "Full Charge", "description": "Maximum cavalry power. All mounted units gain +2 ATK and +2 MOV.", "player_atk_bonus": 2, "player_mov_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Lady Cogsworth", "Lord Calculon builds the Grid. Commander Ironweld holds the line. I break through it. Every army needs three things: a brain, a wall, and a hammer. I am the hammer. A very fast, very elegant, perfectly calibrated hammer.", "proud"),
		ShardLore.narration("Her destrier stamped and steamed beside her, clockwork legs ticking with readiness. Lady Cogsworth patted its chrome flank and swung into the saddle. There was always another charge. There was always more speed to find."),
	]
