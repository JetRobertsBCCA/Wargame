class_name EmberclawLyssCampaign
## Skydancer Lyss — "Wind and Flame"
## Fastest unit in the Emberclaw roster (MOV 14). Aerial acrobatics, evasion, speed.
## 4 missions. Teaches mobility, flanking, hit-and-run tactics.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_lyss",
		"commander": "Skydancer Lyss",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "Wind and Flame",
		"description": "Skydancer Lyss is the fastest flyer the Emberclaw have ever produced. In the Shardlands, where the air currents are wrong and the sky is broken, she must relearn everything she knew about flight.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("Lyss fell."),
		ShardLore.narration("Not gracefully, not in the controlled diving-roll she was famous for — she fell like a stone, her wings refusing to catch the alien wind, the air currents of the Shardlands nothing like the thermal updrafts of Ignareth."),
		ShardLore.dialogue("Skydancer Lyss", "The air is wrong here. It tastes like metal and broken promises. The thermals are inverted. The wind shear comes from below. Everything I know about flight is backwards. Which means I get to learn it again.", "excited"),
		ShardLore.narration("She was grinning. Of course she was grinning. Lyss was the youngest commander in the Emberclaw ranks — seventeen and already the fastest flyer anyone had seen. She didn't see problems. She saw opportunities to go faster."),
		ShardLore.fhah_zolg("The hummingbird. She doesn't know she's a piece on a board. She thinks she's a bird in a sky. How delightfully wrong."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Learning to Fall",
		"objectives_text": "Recon the enemy position. Strike fast, withdraw before they can respond.",
		"pre_story": [
			ShardLore.dialogue("Skydancer Lyss", "Scout mission. In and out, fast as flame. I need to learn these thermals anyway — best way to learn is under pressure. Who's with me?", "eager"),
		],
		"post_story": [
			ShardLore.narration("Lyss mapped three new thermal columns, two wind-shear zones, and the complete Nightfang patrol pattern — all in six minutes. Her scouts struggled to keep up."),
			ShardLore.dialogue("Skydancer Lyss", "The air here doesn't follow Ignareth rules. The thermals come from the shard-fragments, not the ground. Which means I can find updrafts anywhere there's a fragment cluster. Which means I can fly routes nobody expects. This is going to be FUN.", "thrilled"),
		],
		"defeat_story": [
			ShardLore.dialogue("Skydancer Lyss", "Too slow. I was too slow. These thermals tricked me. Won't happen twice.", "frustrated"),
		],
		"player_army": ["Skydancer Lyss", "Silent Wing Scouts", "Ashrider Scouts", "Sky Watchers"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Kagero", "Mask Bearers", "Ink Shadow Scouts"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 5,
		"tutorial_tips": ["Lyss has MOV 14 — the highest in the game. She can reach anywhere on the map.", "Silent Wing Scouts have the Scout special — they can see further.", "Hit-and-run: engage, deal damage, then retreat before the enemy can retaliate."],
		"battle_modifiers": {"label": "Wind Reader", "description": "Lyss reads the Shardlands' alien thermals. Flying units gain +2 MOV.", "player_mov_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Gauntlet",
		"objectives_text": "Race through the Iron Dominion blockade to deliver reinforcements to Vex's main force.",
		"pre_story": [
			ShardLore.dialogue("Skydancer Lyss", "Vex needs reinforcements — her main force is pinned down three valleys east. The machine-lord's blockade covers the ground routes. But they can't blockade the sky. Not my sky. We fly over, we drop the reinforcements, we fly back. Simple.", "confident"),
		],
		"post_story": [
			ShardLore.dialogue("Skydancer Lyss", "Through the blockade in four minutes flat. The machine guns couldn't track me — I was using the shard-thermals to change direction mid-flight. They can calculate trajectories all day, but they can't predict thermals they don't know exist.", "triumphant"),
			ShardLore.narration("Vex's force received their reinforcements. The Iron Dominion blockade, designed to stop ground assault, had no answer for Emberclaw air superiority."),
		],
		"defeat_story": [
			ShardLore.dialogue("Skydancer Lyss", "Their anti-air is better than I thought. I need to find blind spots in their coverage grid.", "reassessing"),
		],
		"player_army": ["Skydancer Lyss", "Skytalon Lancers", "Emberknight Riders", "Silent Wing Scouts", "Swift Talon Outriders"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Steam-Powered Sharpshooters", "Steam Artillery Crew", "Aether Blasters", "Clockwork Infantry"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 6,
		"tutorial_tips": ["Supply Lines: you need to get units from one side to the other.", "Flying units ignore terrain — use them to bypass fortified positions.", "Swift Talon Outriders are your fastest ground unit. They can escort the flyers."],
		"battle_modifiers": {"label": "Thermal Mastery", "description": "Lyss has mapped every thermal. Flying units gain +1 ATK on charge.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Sky Siege",
		"objectives_text": "Assault the Thornweft sky-web from above. Destroy the anchor points to free the airspace.",
		"pre_story": [
			ShardLore.dialogue("Skydancer Lyss", "The spiders have strung a web between two shard-pillars — a sky-web that blocks our air corridor. We can't fly through it, we can't fly around it. So we burn through it. Full aerial assault, maximum speed. They can't web what they can't catch.", "fierce"),
		],
		"post_story": [
			ShardLore.narration("The sky-web collapsed in sheets of burning silk. Lyss's aerial formation cut through the anchor lines with surgical precision, each pass faster than the last, each turn tighter than anything the Thornweft sentries could track."),
			ShardLore.dialogue("Skydancer Lyss", "Three anchor points. Three passes. Twelve seconds. I timed it. Personal best. The sky belongs to the Emberclaw. Always has, always will.", "exhilarated"),
		],
		"defeat_story": [
			ShardLore.dialogue("Skydancer Lyss", "The web is stickier than I expected. Lost a wing-panel. Need to repair and come back with incendiary loads.", "grounded"),
		],
		"player_army": ["Skydancer Lyss", "Skytalon Lancers", "Emberknight Riders", "Swift Talon Outriders", "Silent Wing Scouts", "Pyroclast Catapult"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Gossamer Guard", "Tremor Sentinels", "Web-Anchor Engineers", "Spiderling Swarm", "Brood-Mother Spider"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["King of the Hill: control the central sky-web anchor to win.", "Skytalon Lancers have Inferno Charge — perfect for destroying web structures.", "The Pyroclast Catapult can bombard web-anchors from range."],
		"battle_modifiers": {"label": "Air Superiority", "description": "Lyss controls the sky. Enemy ranged attacks against flying units suffer -1 ATK.", "enemy_atk_penalty": -1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Fastest Thing Alive",
		"objectives_text": "Outrun the Nightfang ambush to warn the coalition forces. Lyss must reach the far edge of the map.",
		"pre_story": [
			ShardLore.dialogue("Skydancer Lyss", "Massive Nightfang force — three times our size — flanking the coalition's supply lines. If they hit unwarned, it's over. I need to get a message through. The thermals are wild tonight — storm interference. Going to be the hardest flight of my life. Good.", "grinning"),
		],
		"post_story": [
			ShardLore.narration("She flew through a shard-storm. Lightning cracked around her, wind shear tried to rip her wings off, and three Nightfang Corruption Drakes tried to intercept. She outran them all."),
			ShardLore.narration("Lyss arrived at the coalition camp seven seconds before the Nightfang vanguard. Seven seconds that saved three hundred lives."),
			ShardLore.dialogue("Skydancer Lyss", "Seven seconds. I'll do better next time. But the warning got through. The coalition held. And every faction in that camp now knows — when the Emberclaw say 'fast,' we mean it.", "breathless"),
		],
		"defeat_story": [
			ShardLore.dialogue("Skydancer Lyss", "They were faster than me. How were they faster than me? Nobody is faster than me!", "shocked"),
		],
		"player_army": ["Skydancer Lyss", "Skytalon Lancers", "Silent Wing Scouts", "Swift Talon Outriders", "Sky Watchers", "Ashrider Scouts"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Blood Reavers", "Shadow Stalkers", "Nightfang Warriors", "Nightfang Dragon", "Nightstalker Cavalry", "Tiger Berserkers"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 5,
		"tutorial_tips": ["Supply Lines with a twist: you need ONE unit to reach the far edge.", "Lyss is fastest — protect her path even if it means sacrificing other units.", "Sky Watchers can spot enemy ambushes before they trigger."],
		"battle_modifiers": {"label": "Storm Runner", "description": "The shard-storm empowers Lyss. She gains +4 MOV this battle.", "player_mov_bonus": 4},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Skydancer Lyss perched atop the highest shard-pillar in the region, watching the alien sunset paint the broken sky in colors that didn't exist in Ignareth."),
		ShardLore.dialogue("Skydancer Lyss", "I miss home. I miss real thermals, real winds, real sunsets. But this sky... this sky has challenges Ignareth never had. And I've never been faster than I am right now. When we find a way back, I'm going to miss these impossible thermals.", "wistful"),
		ShardLore.narration("She dove off the pillar, caught an inverted thermal, and vanished into the shard-storm — the fastest thing alive in a world where everything was trying to slow her down."),
	]
