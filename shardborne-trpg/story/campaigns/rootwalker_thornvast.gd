class_name RootwalkerThornvastCampaign
## Thornvast the Advancing — "March of the Forest"
## Slow inevitable advance campaign, attrition.
## 4 missions. Teaches forward pressure, territory conversion, the grind.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_thornvast",
		"commander": "Thornvast the Advancing",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "March of the Forest",
		"description": "Thornvast moves at the pace of a glacier. He has been advancing across the reclaimed territory for forty years at one rate and has never deviated. He will reach the enemy position. He will reach it the way a tide reaches the shore — slowly, absolutely, with complete indifference to what the shore thinks about it.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
		"defeat_story": _defeat_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The advance had been ongoing for forty years."),
		ShardLore.narration("Not a dramatic advance — Thornvast moved at approximately three meters per day when conditions were favorable, and conditions were rarely favorable. But three meters per day, for forty years, added up to an enormous amount of advanced grove, and the edge of the controlled territory was considerably further from the deep grove than it had been when he started."),
		ShardLore.dialogue("Thornvast the Advancing", "Three meters today. Three meters tomorrow. The enemy positions are seven kilometers away. At three meters per day, I reach them in approximately six years. This is acceptable. I have time.", "completely unhurried"),
		ShardLore.narration("The Shardstorm had disrupted the advance by depositing a large army between Thornvast and his current three-meter goal. He regarded this with the equanimity of someone who had been advancing for forty years and had seen disruptions before."),
		ShardLore.dialogue("Thornvast the Advancing", "Three meters today.", "unchanged"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Three Meters",
		"objectives_text": "Advance the line three meters. The enemy holds the territory ahead. Advance anyway.",
		"pre_story": [
			ShardLore.narration("The Iron Dominion had established a fortified line directly in the path of Thornvast's advance. Their engineering was sound, their positioning well-considered, their defenses designed to stop a charge or a siege in equal measure."),
			ShardLore.narration("They had not designed them to stop a slow advance."),
			ShardLore.dialogue("Thornvast the Advancing", "They have built a wall. The wall is in the way. I will advance through the wall. This is not a metaphor. I will advance, physically, through or around the wall, at the standard rate. The wall does not change the rate. Nothing changes the rate.", "matter-of-fact"),
		],
		"post_story": [
			ShardLore.dialogue("Thornvast the Advancing", "Three meters gained. The wall has been partially incorporated. The roots are growing through the foundation. Give the root-web a week and the fortification will be a trellis. This is a reasonable outcome for the first day of engagement with this obstacle.", "satisfied"),
		],
		"defeat_story": [ShardLore.dialogue("Thornvast the Advancing", "The advance was stopped today. Tomorrow the advance will not be stopped. The day after that, the advance will also not be stopped. Eventually, the sum of forward progress exceeds the obstacle. This is mathematics, not strategy.", "certain of the outcome regardless")],
		"player_army": ["Thornvast the Advancing", "Thornwood Sentinels", "Deeproot Hulks", "Root Crawlers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Steam Sentinels", "Gearwright Engineers"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 9,
		"tutorial_tips": [
			"Thornvast's Slow Advance ability converts ground to forest terrain as he moves forward.",
			"Each converted tile gives +1 ATK to all Rootwalker units on forest terrain.",
			"Deeproot Hulks break through fortified positions — send them at walls and bunkers.",
			"Advance methodically. Don't rush. The territory you convert stays converted.",
		],
		"battle_modifiers": {"label": "The Advance", "description": "Three meters today. All forward movement converts terrain to forest. Each converted tile heals adjacent units.", "player_hp_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Grinding Line",
		"objectives_text": "Maintain pressure across the full advance line. Grind the enemy down. Let attrition be the victory condition.",
		"pre_story": [
			ShardLore.narration("The enemy had adapted to the advance. A reasonable response — stop treating it as a one-time assault and start treating it as a sustained pressure requiring sustained resistance. They had established a full defensive line and were rotating troops to maintain it."),
			ShardLore.dialogue("Thornvast the Advancing", "They are maintaining a defensive line. This requires resources — personnel, supplies, the sustained will to remain in an uncomfortable position indefinitely. I have indefinitely. Do they?", "genuine question"),
		],
		"post_story": [
			ShardLore.dialogue("Thornvast the Advancing", "Their defensive rotation is showing strain at the left flank. Three days ago it was showing strain at the center. The strain rotates as the rotation rotates. They are not getting stronger from maintaining this line. They are getting tired. I am not getting tired. I am a tree. I do not get tired.", "observing the asymmetry"),
		],
		"defeat_story": [ShardLore.dialogue("Thornvast the Advancing", "The advance stalled. The grinding did not produce enough attrition. Their supply lines are more efficient than I estimated. I will need to pressure the supply lines. The grind continues. I have no deadline.", "adjusting")],
		"player_army": ["Thornvast the Advancing", "Thornwood Sentinels", "Deeproot Hulks", "Root Crawlers", "Bramblethorn Archers", "Sporecloud Drifters"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Masked Lord Kurohane", "Shrine Wardens", "Temple Defenders", "Starblade Samurai", "Veiled Ashigaru"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 9,
		"tutorial_tips": [
			"Shard Clash attrition: hold nodes and let the round limit work for you.",
			"Sporecloud Drifters on the flanks harass the enemy rotation, disrupting their defensive rhythm.",
			"Bramblethorn Archers pick off injured units from range to accelerate attrition.",
			"Thornvast's Patience Advance: bonus ATK for each consecutive round he moves forward.",
		],
		"battle_modifiers": {"label": "The Grind", "description": "Attrition is a weapon. Each round of sustained combat, enemy units lose 1 HP from root pressure.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Forests Don't Negotiate",
		"objectives_text": "The enemy has sent negotiators. They want the advance to stop. The advance does not stop. Demonstrate this.",
		"pre_story": [
			ShardLore.narration("A delegation arrived under truce flag. They had a detailed proposal — territorial boundaries, a cessation of hostilities, a negotiated settlement that would give the grove significant land concessions in exchange for halting the advance."),
			ShardLore.narration("Thornvast received the delegation at the current advance line."),
			ShardLore.dialogue("Thornvast the Advancing", "Your proposal asks me to stop moving forward. I have been moving forward for forty years. The advance is not a strategy. The advance is not a tactic. The advance is not a negotiating position. The advance is what I do. I do not have an alternative advance speed to offer you. I advance at three meters per day. This is not a condition. This is a fact of nature.", "entirely sincere"),
			ShardLore.narration("The delegation attempted to explain the terms more fully. Thornvast listened carefully."),
			ShardLore.dialogue("Thornvast the Advancing", "Three meters today.", "gentle"),
		],
		"post_story": [
			ShardLore.dialogue("Thornvast the Advancing", "The negotiation did not produce an agreement. This is not a failure of negotiation. Forests do not negotiate. Tides do not negotiate. Things that advance inevitably do not negotiate because negotiation implies the possibility of not advancing, and for me there is no such possibility. I am sorry this is confusing. The advance continues.", "genuinely apologetic"),
		],
		"defeat_story": [ShardLore.dialogue("Thornvast the Advancing", "They used the negotiation as cover for a flanking action. This was clever. I will not be this naive about negotiation-as-tactic again. The advance continues. I will be more suspicious of delegations.", "noting the lesson")],
		"player_army": ["Thornvast the Advancing", "Thornwood Sentinels", "Deeproot Hulks", "Root Crawlers", "Grove Wardens", "Thornwall Bastion"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Loom-Mother Vethiss", "Silk-Warden Regulars", "Gossamer Guard", "Thread-Seer Kythara", "Cocoon Wardens", "Spiderling Swarm"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 8,
		"tutorial_tips": [
			"Advance through broken ground — Thornvast converts it to forest as he moves.",
			"Thornweft will set web traps ahead of the advance route. Root Crawlers detect and clear them.",
			"Thornwall Bastion seals the flanks of the advance corridor against web-flanking.",
			"Maintain the advance speed — bonus ATK continues as long as Thornvast moved this round.",
		],
		"battle_modifiers": {"label": "The Inevitable", "description": "Nothing stops the advance. Terrain penalties are halved for all Rootwalker units.", "player_mov_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "March of the Forest",
		"objectives_text": "The final push. Forty years of advance reaching its destination. Reach the target point. Hold it. Let the forest grow around it.",
		"pre_story": [
			ShardLore.narration("The target was not a city, not a fortress, not a strategic resource point. It was a particular place — a high ground site that the root-web's deep reading identified as a pre-Shardstorm grove nexus, a place where the grove had once concentrated its deepest anchors before the catastrophe. Thornvast had been advancing toward it for forty years. He was, depending on the rate, approximately four days away."),
			ShardLore.dialogue("Thornvast the Advancing", "Four days. The advance will reach the nexus in four days at standard rate. Everything between here and there is occupied by forces that will need to be moved. They will be moved. At three meters per day. Approximately.", "absolutely steady"),
			ShardLore.narration("The enemy had gathered everything they had. They had understood, finally, what was happening."),
			ShardLore.dialogue("Thornvast the Advancing", "They are here. All of them. Good. This means they are not somewhere else, being difficult. The advance continues.", "implacable"),
		],
		"post_story": [
			ShardLore.narration("Thornvast reached the nexus on the fourth day, as projected. The route there had been contested every meter, and every meter had been converted to forest, and the forest grew behind him as he moved, so that by the time he arrived, the approach was two hundred meters of dense grove that had not been there a week before."),
			ShardLore.dialogue("Thornvast the Advancing", "The nexus. I am here. The advance is complete.", "quiet, arriving"),
			ShardLore.narration("He stood at the nexus and felt the deep anchors beneath him — ancient, dormant, but present. He sent his roots down and touched them. They recognized him. The grove sighed, deep in the earth."),
			ShardLore.dialogue("Thornvast the Advancing", "Forty years. Three meters per day. The mathematics were always correct. I was always going to reach this place. The only question was when, and that question had only one answer: eventually. Everything I have ever advanced toward, I have eventually reached. The march does not stop. The forest does not stop. These are the same thing.", "complete"),
		],
		"defeat_story": [ShardLore.dialogue("Thornvast the Advancing", "The nexus was not reached today. The advance continues tomorrow. The nexus will be reached. The advance has never failed to reach its destination. This is the first time it has not reached a destination in forty years. There will not be a second time.", "certain of the resumption")],
		"player_army": ["Thornvast the Advancing", "Thornwood Sentinels", "Deeproot Hulks", "Root Crawlers", "Grove Wardens", "Thornwall Bastion", "Ancient Rootwarden", "Grove Colossus", "Bramblethorn Archers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Wyrmlord Tzarak", "Emberclaw Warriors", "Ashborn Infantry", "Pyromancer Adepts", "Mature War Drake", "Emberknight Riders"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 10,
		"tutorial_tips": [
			"King of the Hill: the nexus is the destination. Thornvast must reach and hold it.",
			"The advance converts terrain as Thornvast moves — the enemy will lose footing as you advance.",
			"Grove Colossus holds the nexus once Thornvast arrives — Thornvast can continue clearing.",
			"This battle rewards patience. Each round of sustained advance increases all stats by 1 (stacks).",
		],
		"battle_modifiers": {"label": "March of the Forest", "description": "Forty years of advance. All Rootwalker units gain +1 ATK, +1 DEF, and +1 MOV for each shard node converted to forest terrain.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("The advance reached the nexus. The forest grew around it. Thornvast stood at the center and sent his roots into the ancient deep anchors and felt the grove connect to something it had been disconnected from since the Shardstorm."),
		ShardLore.dialogue("Thornvast the Advancing", "The advance is complete. For the first time in forty years, I am not advancing. I am arrived.", "still, wondering what this means"),
		ShardLore.narration("A long pause."),
		ShardLore.dialogue("Thornvast the Advancing", "There is a secondary nexus approximately eleven kilometers northeast. The root-web suggests it was also part of the old grove network. Three meters per day, that is approximately a ten-year advance.", "resuming"),
		ShardLore.narration("He began moving northeast."),
	]

static func _defeat_story() -> Array:
	return [
		ShardLore.dialogue("Thornvast the Advancing", "The advance was stopped. This has happened before, in forty years, approximately eleven times. Each time, the advance resumed. The advance has never been permanently stopped. The advance will resume. Three meters tomorrow. Then three meters the day after. The mathematics are patient. So am I.", "returning to baseline"),
	]
