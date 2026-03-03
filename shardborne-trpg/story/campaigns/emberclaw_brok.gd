class_name EmberclawBrokCampaign
## Cinderfist Brok — "Walls Fall Down"
## Anti-armor, Siege, Demolition. ATK 21, DEF 6. Tank/siege specialist.
## 4 missions. Teaches siege tactics, demolition, anti-armor play.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_brok",
		"commander": "Cinderfist Brok",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "Walls Fall Down",
		"description": "Cinderfist Brok punches through walls. Literally. In the Shardlands, the Iron Dominion is building fortifications, and there is only one Emberclaw response: send Brok.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("Brok was not complicated."),
		ShardLore.narration("He was eight feet tall, his fists were wrapped in permanent cinder-flame, and he had never met a wall he couldn't break. In Ignareth, he had reduced fortress gates to splinters, castle walls to rubble, and one particularly stubborn mountain to a valley. The mountain had started it."),
		ShardLore.dialogue("Cinderfist Brok", "Wall. *points* Where?", "simple"),
		ShardLore.narration("His soldiers loved him. His enemies feared him. His commanders... managed him. Brok didn't do complicated. Brok did demolition."),
		ShardLore.fhah_zolg("The bulldozer. No subtlety, no strategy, just raw force applied to the problem of 'that thing exists and I want it not to.' Refreshingly honest."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "First Punch",
		"objectives_text": "Destroy the Iron Dominion forward outpost. Leave nothing standing.",
		"pre_story": [
			ShardLore.dialogue("Cinderfist Brok", "Machine-folk built a fort. In OUR territory. Rude. I'm going to un-build it.", "offended"),
		],
		"post_story": [
			ShardLore.narration("The outpost lasted fourteen minutes. Brok walked through the front gate — literally through it, the reinforced steel crumpling around his cinder-fists like tin foil. His demolition teams followed, methodically reducing every structure to its component parts."),
			ShardLore.dialogue("Cinderfist Brok", "No more fort. Problem solved. Next wall?", "satisfied"),
		],
		"defeat_story": [
			ShardLore.dialogue("Cinderfist Brok", "Wall too thick. Need bigger fists. Or... smaller wall. Can we make the wall smaller?", "confused"),
		],
		"player_army": ["Cinderfist Brok", "Emberclaw Warriors", "Unbonded Berserkers", "Immolation Bombers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Clockwork Infantry", "Steam Sentinels"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 6,
		"tutorial_tips": ["Brok has ATK 21 and DEF 6 — he's a wrecking ball. Point him at the strongest target.", "Immolation Bombers are single-use explosive units. Time them for maximum damage.", "Cinder Berserkers gain strength as they take damage. Let them absorb hits."],
		"battle_modifiers": {"label": "Demolition Charge", "description": "Brok's fists are supercharged. He gains +3 ATK against fortified targets.", "player_atk_bonus": 3},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Siege Line",
		"objectives_text": "Break through the Iron Dominion siege line to relieve the trapped Emberclaw scouts.",
		"pre_story": [
			ShardLore.dialogue("Cinderfist Brok", "Friends stuck behind wall. Wall made by machine-folk. I break wall. Friends come out. Simple plan. Best plan.", "determined"),
		],
		"post_story": [
			ShardLore.narration("Brok hit the siege line at full charge, his cinder-fists blazing white-hot. The first barricade disintegrated. The second crumpled. The third — reinforced with shard-steel and backed by steam cannons — lasted almost three seconds before Brok punched through it like it was made of paper."),
			ShardLore.narration("The trapped scouts emerged, blinking, to find a Brok-shaped hole in what had been an impenetrable siege line."),
			ShardLore.dialogue("Cinderfist Brok", "Made door. You're welcome.", "helpful"),
		],
		"defeat_story": [
			ShardLore.dialogue("Cinderfist Brok", "Too many guns. Need to break guns first, THEN wall. Strategy! I did a strategy!", "proud_of_thinking"),
		],
		"player_army": ["Cinderfist Brok", "Emberclaw Warriors", "Flameborn Guard", "Unbonded Berserkers", "Pyroclast Catapult", "Scorched Veterans"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Asagiri", "Starblade Samurai", "Shrine Wardens", "Star Serpent Lancers", "Dreampiercer Archers", "Banner of Silent Prayer"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply Lines: break through to the other side.", "Brok is your battering ram. Send him straight down the middle.", "The Pyroclast Catapult can soften fortifications before Brok charges.", "Commander Ironweld is a tough enemy. Avoid or overwhelm."],
		"battle_modifiers": {"label": "Unstoppable Force", "description": "Brok cannot be slowed or stopped. He ignores movement penalties.", "player_mov_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Shard-Breaker",
		"objectives_text": "A corrupted shard-pillar is generating dangerous energies. Demolish it before it destabilizes the region.",
		"pre_story": [
			ShardLore.dialogue("Cinderfist Brok", "Big crystal. Bad crystal. Makes ground shake, makes air hurt. Orin says 'destabilizing regional shard-harmonics.' I say 'thing that needs punching.' Same thing.", "practical"),
		],
		"post_story": [
			ShardLore.narration("Brok stood before the shard-pillar — thirty meters of crystallized reality, pulsing with enough energy to level a city. He cracked his knuckles. His cinder-fists blazed."),
			ShardLore.narration("He hit it once. The pillar cracked. He hit it twice. The crack spread. He hit it a third time, putting everything he had — every ounce of Emberclaw fury, every degree of cinder-heat, every pound of his eight-foot frame — into one devastating blow."),
			ShardLore.narration("The pillar shattered. Brok stood in the rain of crystal fragments, nursing a bruised fist and grinning like a child."),
			ShardLore.dialogue("Cinderfist Brok", "Big crystal broke. Fist hurts. Worth it.", "grinning"),
		],
		"defeat_story": [
			ShardLore.dialogue("Cinderfist Brok", "Crystal too hard. First time a crystal beat a fist. Don't like it. Need hotter fists.", "indignant"),
		],
		"player_army": ["Cinderfist Brok", "Unbonded Berserkers", "Flameborn Guard", "Immolation Bombers", "Pyroclast Catapult", "Emberforged Blades"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Brood-Warden Thessari", "Silk-Warden Regulars", "Gossamer Guard", "Spiderling Swarm", "Cocoon Wardens", "Web-Anchor Engineers"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Shard Clash: reach the corrupted pillar (shard) at the center.", "The Thornweft are defending the pillar — they want its energy for their web.", "Brok's demolition ability makes him ideal for destroying terrain objectives.", "Immolation Bombers can clear a path through the web-defenses."],
		"battle_modifiers": {"label": "Shard-Breaker", "description": "Brok's fists resonate with shard-energy. He gains +2 ATK against structures.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Walls Fall Down",
		"objectives_text": "The Iron Dominion's main fortress blocks the coalition advance. Brok's job: make it not a fortress anymore.",
		"pre_story": [
			ShardLore.dialogue("Cinderfist Brok", "Biggest wall. Thickest wall. Machine-folk's best wall. Everyone says 'can't break it.' Everyone wrong. I break every wall. This wall is just... the most wall. More wall means more punching. I like punching.", "excited"),
		],
		"post_story": [
			ShardLore.narration("The Iron Dominion fortress — three rings of shard-steel walls, forty steam cannons, and a garrison of five hundred clockwork soldiers — fell in one hour."),
			ShardLore.narration("Brok didn't just breach the walls. He dismantled them. Section by section, punch by punch, turning the Iron Dominion's greatest engineering achievement into the Shardlands' most expensive gravel pile."),
			ShardLore.narration("When he was done, he sat on a pile of rubble that had been the main gatehouse and ate an apple."),
			ShardLore.dialogue("Cinderfist Brok", "Wall fell down. All walls fall down. Just need the right fist. I am the right fist.", "philosophical_for_brok"),
		],
		"defeat_story": [
			ShardLore.dialogue("Cinderfist Brok", "Wall still standing. Wall MOCKING me. I will come back. I will bring BIGGER friends. Wall will REGRET.", "furious"),
		],
		"player_army": ["Cinderfist Brok", "Unbonded Berserkers", "Flameborn Guard", "Scorched Veterans", "Immolation Bombers", "Pyroclast Catapult", "Fragment Launcher", "Ember Ballista"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lady Brassveil", "Infantry Regiment", "Steam Sentinels", "Steam Artillery Crew", "Clockwork Titan", "Aether Blasters", "Clockwork Pioneers", "Clockwork Infantry"],
		"battle_size": "epic",
		"scenario": "king_of_the_hill",
		"round_limit": 8,
		"tutorial_tips": ["King of the Hill: the fortress center is the objective. Demolish everything in the way.", "Use all three war machines (Pyroclast, Fragment Launcher, Ember Ballista) to soften defenses.", "Brok is your siege engine. Nothing in the game has higher raw destruction.", "Lady Brassveil is a defensive commander. She'll try to outlast you. Don't let her."],
		"battle_modifiers": {"label": "Demolition Master", "description": "Brok's legendary assault. All your units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Brok sat on his favorite rubble pile — the remains of the fortress gatehouse — watching the sunset and eating his third apple. His soldiers had learned not to sit on rubble he considered 'his.'"),
		ShardLore.dialogue("Cinderfist Brok", "People think I'm stupid. Maybe. But I know one thing nobody else knows: every wall falls down. Every fort crumbles. Every gate breaks. Time does it slow. I do it fast. Same result. Just more punching.", "surprisingly_deep"),
		ShardLore.narration("He finished his apple and stood up. Somewhere in the distance, someone was probably building another wall. Brok grinned. Job security."),
	]
