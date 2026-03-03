class_name EmberclawOrinCampaign
## Skywatcher Orin — "Eyes Above"
## Reconnaissance, Intel, Ranged support. Scouting/intelligence campaign.
## 4 missions. Teaches scouting, ranged support, intel advantage.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_orin",
		"commander": "Skywatcher Orin",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "Eyes Above",
		"description": "Skywatcher Orin sees everything from above but acts from the shadows. In the Shardlands, the sky is wrong, the maps are useless, and the old intelligence networks are gone. Orin must build new ones.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("Orin didn't speak loudly. That was the first thing people noticed — and the last thing enemies noticed, usually too late."),
		ShardLore.narration("He had been the Emberclaw intelligence chief for nine years, running a network of scouts, watchers, and informants across three continents of Ignareth. All of that was gone. The contacts, the dead drops, the signal fires, the courier routes — all erased when the world shattered."),
		ShardLore.dialogue("Skywatcher Orin", "We are blind. In Ignareth, I knew every patrol route, every guard change, every supply line within five hundred miles. Here, I know nothing. That is unacceptable. I will fix it.", "quiet_intensity"),
		ShardLore.fhah_zolg("The spymaster. He thinks knowledge is power. He's right, of course. Which makes him dangerous."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Listening Post",
		"objectives_text": "Establish the first observation post overlooking enemy territory. Hold the high ground.",
		"pre_story": [
			ShardLore.dialogue("Skywatcher Orin", "That ridge. Perfect sightlines to the Nightfang territory, the Thornweft border, and the Iron Dominion approach. If I control that ridge, I see three factions at once. Take it quietly.", "calculating"),
		],
		"post_story": [
			ShardLore.narration("The listening post was established — camouflaged against the shard-rock, equipped with Orin's custom signal mirrors, and staffed by his best Sky Watchers. Within hours, the intelligence began flowing."),
			ShardLore.dialogue("Skywatcher Orin", "Nightfang patrol: twelve units, northeast route, six-hour rotation. Thornweft web-expansion: three new anchor points, northwest, growing at two meters per day. Iron Dominion supply convoy: fourteen wagons, due east, arrives tomorrow. Knowledge, my friends. Knowledge wins wars.", "pleased"),
		],
		"defeat_story": [
			ShardLore.dialogue("Skywatcher Orin", "They spotted us before we spotted them. Humiliating. I need better concealment equipment.", "mortified"),
		],
		"player_army": ["Skywatcher Orin", "Silent Wing Scouts", "Sky Watchers", "Thermal Trackers"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Midorikaze", "Moonlit Duelists", "Spirit Javelin Skirmishers"],
		"battle_size": "skirmish",
		"scenario": "king_of_the_hill",
		"round_limit": 6,
		"tutorial_tips": ["King of the Hill: hold the ridge (center) to win.", "Sky Watchers have excellent range — position them on the high ground first.", "Orin's Intel special reveals enemy positions. Use it every round."],
		"battle_modifiers": {"label": "High Ground", "description": "Elevation advantage. Your ranged units gain +2 RNG.", "player_rng_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Shadow War",
		"objectives_text": "Intercept the Thornweft spy-web before they complete their intelligence network around the Emberclaw camp.",
		"pre_story": [
			ShardLore.dialogue("Skywatcher Orin", "The spider-folk are building a surveillance web around our camp. Subtle — almost undetectable. Web-lines that vibrate when our patrols cross them, giving the Thornweft real-time movement data. Clever. But I noticed. And now we dismantle it.", "admiring"),
		],
		"post_story": [
			ShardLore.dialogue("Skywatcher Orin", "Fourteen web-sensors destroyed. The spider-folk's intelligence on our movement patterns is now worthless. But I learned something from their technique — vibration-detection. I can adapt that. Our own sensor network will be better than theirs.", "inspired"),
		],
		"defeat_story": [
			ShardLore.dialogue("Skywatcher Orin", "They know we're coming before we arrive. Their intelligence network is better than I realized. I need new tactics.", "grudging_respect"),
		],
		"player_army": ["Skywatcher Orin", "Silent Wing Scouts", "Thermal Trackers", "Fragment-Blade Assassins", "Ashrider Scouts"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Gossamer Guard", "Web-Anchor Engineers", "Phase-Silk Infiltrators", "Spiderling Swarm", "Silk-Warden Regulars"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["This is a counter-intelligence mission. Destroy web-anchor units first.", "Fragment-Blade Assassins can strike from stealth. Use them to eliminate key targets.", "Thermal Trackers can detect hidden units. Use them to reveal ambushes."],
		"battle_modifiers": {"label": "Counter-Intel", "description": "Orin's scouts have mapped the spy-web. Enemy Stealth units are revealed.", "enemy_stealth_negated": true},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Cipher",
		"objectives_text": "Capture an Iron Dominion signal station to decode their communications. Take it intact.",
		"pre_story": [
			ShardLore.dialogue("Skywatcher Orin", "The machine-folk communicate via encoded light pulses — machine-cipher, theoretically unbreakable. But they need relay stations to transmit. If I capture one intact — with its codebooks — I can read every message they send. surgical strike. No heavy weapons. I need the station undamaged.", "precise"),
		],
		"post_story": [
			ShardLore.narration("The signal station fell in twelve minutes. Orin's team moved like smoke — Silent Wing Scouts disabling the exterior guards, Fragment-Blade Assassins neutralizing the interior crew, Orin himself walking through the front door to collect the cipher-books."),
			ShardLore.dialogue("Skywatcher Orin", "Got them. Three cipher-books, two codex-wheels, and a complete set of frequency tables. Every Iron Dominion message for the next month is mine to read. Lord Calculon is going to be very upset when he realizes his 'secure' communications are transparent.", "quietly_triumphant"),
		],
		"defeat_story": [
			ShardLore.dialogue("Skywatcher Orin", "They destroyed the codebooks before we could capture them. Anticipated our approach. That means they have counter-intelligence too. Interesting.", "thoughtful"),
		],
		"player_army": ["Skywatcher Orin", "Silent Wing Scouts", "Fragment-Blade Assassins", "Thermal Trackers", "Ashrider Scouts", "Sky Watchers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Clockwork Infantry", "Steam-Powered Sharpshooters", "Infantry Regiment", "Aether Blasters", "Steam Sentinels"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 6,
		"tutorial_tips": ["King of the Hill: capture the signal station (center) intact.", "Orin's team is fast but fragile. Avoid prolonged melee engagements.", "Fragment-Blade Assassins have First Strike — they attack before the enemy."],
		"battle_modifiers": {"label": "Silent Approach", "description": "Orin's team moves silently. Your units have +2 MOV on the first round.", "player_mov_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The All-Seeing Eye",
		"objectives_text": "Use the complete intelligence network to coordinate a coalition ambush on the Nightfang main force.",
		"pre_story": [
			ShardLore.dialogue("Skywatcher Orin", "I have eyes on every faction. I have codes for the machine-folk, web-maps for the spider-folk, patrol routes for the blood-drinkers. For the first time since we arrived, we know what the enemy will do before they do it. Time to use that advantage. Full coalition ambush — three factions' forces hitting the Nightfang supply column simultaneously. My intelligence, their muscle.", "commanding"),
		],
		"post_story": [
			ShardLore.narration("The ambush was perfect. Three coalition forces striking from three directions, each timing coordinated by Orin's signal network, each hitting a vulnerability he had identified weeks in advance."),
			ShardLore.narration("The Nightfang supply column was annihilated. Lord Sanguinar would go hungry this month."),
			ShardLore.dialogue("Skywatcher Orin", "Information wins wars. Swords and fire and spiders and machines — those are just the tools. The mind that directs them — that is the weapon. And my mind sees everything now. Everything.", "satisfied"),
		],
		"defeat_story": [
			ShardLore.dialogue("Skywatcher Orin", "They had counter-intelligence I didn't detect. Someone is feeding them our plans. I need to find the leak.", "alarmed"),
		],
		"player_army": ["Skywatcher Orin", "Silent Wing Scouts", "Sky Watchers", "Thermal Trackers", "Ashrider Scouts", "Fragment-Blade Assassins", "Ember Ballista", "Scorched Veterans"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Countess Nyxara", "Blood Reavers", "Nightfang Warriors", "Tiger Berserkers", "Blood Thralls", "Shadow Stalkers", "Nightstalker Cavalry", "Blood Shamans"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["You have complete intel — use it. Every enemy position is revealed.", "Coordinate ranged fire from Sky Watchers and Ember Ballista to soften targets.", "Fragment-Blade Assassins should hit high-value targets: the commander and Blood Shamans.", "Orin excels at support — keep him alive to maintain the intelligence advantage."],
		"battle_modifiers": {"label": "Total Intelligence", "description": "Complete battlefield awareness. All your units gain +1 ATK and +1 DEF.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Orin stood in the center of his intelligence network — a web of informants, observation posts, signal stations, and decoded ciphers spanning the entire region. He knew where every faction was, what they were doing, and what they planned to do next."),
		ShardLore.dialogue("Skywatcher Orin", "Vex fights. Drenna rages. Lyss flies. Torvan builds. They are the visible Emberclaw — the fire and fury the world sees. I am the invisible Emberclaw — the eyes that see everything, the mind that knows everything. The coalition will never be blindsided. I won't allow it.", "certain"),
		ShardLore.narration("He adjusted a signal mirror, redirecting a beam of coded light to a listening post twelve miles away. Information flowed. The coalition's eyes stayed open. And Skywatcher Orin — quiet, patient, all-seeing — kept watch over a world that didn't know he was watching."),
	]
