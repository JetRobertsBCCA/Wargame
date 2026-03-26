class_name RootwalkerDeepwoodEldestCampaign
## The Deepwood Eldest — "Roots of the World"
## Awakened from ages of sleep, confused by what war has done to the land.
## 4 missions. Teaches basic Rootwalker play through the lens of confusion
## — an ancient being who must relearn what the world has become.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_deepwood_eldest",
		"commander": "The Deepwood Eldest",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "Roots of the World",
		"description": "The Deepwood Eldest has slept for ten thousand years. The world it remembers no longer exists. Its roots reach for clean water and find poison. Its branches seek familiar sky and find a shard-shattered void. It does not know what happened. It knows only that it must understand — and that things with blades keep interrupting the understanding.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
		"defeat_story": _defeat_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The first sensation was wrong water."),
		ShardLore.narration("The Deepwood Eldest had been sleeping — a deep, geological sleep, the kind where seasons passed like heartbeats and centuries barely registered as moments. Its roots had been drinking from an aquifer that had existed since the world's foundations. The water had always tasted of granite and iron and deep time. It had always been correct."),
		ShardLore.narration("Now it tasted of something else. Something that should not be in water. Something that set the oldest memory-rings vibrating with an alarm so old it had no name."),
		ShardLore.dialogue("The Deepwood Eldest", "...wrong. The water is wrong.", "slow_waking"),
		ShardLore.narration("It opened its eyes for the first time in ten thousand years and found a world it did not recognize."),
		ShardLore.dialogue("The Deepwood Eldest", "This is not... this is not how the land was. There was forest, here. There was silence. There was the correct smell of deep rot and slow growth. What has happened to the quiet?", "ancient_confusion"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "What Woke Me",
		"objectives_text": "Drive away the creatures that invaded the Eldest's awakening ground. Protect the ancient sleep-site.",
		"pre_story": [
			ShardLore.narration("The first things it encountered were soldiers — metal-armored creatures whose every movement produced a grinding, rhythmic clatter that offended the Eldest's recently-opened perception deeply."),
			ShardLore.dialogue("The Deepwood Eldest", "What are these. They are very loud. Why are they digging. There was nothing here that required digging. What are they looking for.", "confused"),
			ShardLore.narration("The soldiers saw the Eldest and did what soldiers typically do when they see an enormous awakened forest-entity: they attacked it."),
			ShardLore.dialogue("The Deepwood Eldest", "...ah. I see. This is a thing that is still the same.", "slow recognition"),
		],
		"post_story": [
			ShardLore.narration("The soldiers retreated. The Eldest watched them go with the focused attention of a being that had ten thousand years of catching up to do."),
			ShardLore.dialogue("The Deepwood Eldest", "They came with machines. The machines made the ground smell of oil and burning. This is new. In the old world, machines were not a thing that existed. Much has changed while I slept.", "absorbing"),
		],
		"defeat_story": [ShardLore.dialogue("The Deepwood Eldest", "I am still learning the rules of this new world. The old rules — stand deep, reach wide, endure — they still apply. I simply need to remember them in the right order.", "patient")],
		"player_army": ["The Deepwood Eldest", "Thornwood Sentinels", "Grove Wardens", "Root Crawlers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Infantry Regiment", "Mechanized Scouts"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": [
			"The Deepwood Eldest is extraordinarily durable — DEF 5, HP 42. Use this to anchor your defense.",
			"Root Crawlers are your fastest unit. Use them to cut off enemy flanking routes.",
			"Grove Wardens are support units — keep them behind your front line.",
			"Rootwalkers fight better in forest terrain. Let the enemy come to you.",
		],
		"battle_modifiers": {"label": "Ancient Stirring", "description": "A being of immense age awakens. The Deepwood Eldest gains +2 HP each round from regeneration.", "player_hp_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Reading the Scar",
		"objectives_text": "Investigate the Shardstorm impact site. Hold the poisoned ground long enough to read its history.",
		"pre_story": [
			ShardLore.narration("The Eldest found the impact site by following the wrongness. The wrongness in the water led to a wrongness in the soil, and the wrongness in the soil led to a place where the earth itself had been violated in a way that the Eldest had no name for."),
			ShardLore.dialogue("The Deepwood Eldest", "Something fell here. Something very wrong. The soil remembers the impact the way bone remembers a break — the shape of the wound, the angle of the force, the exact moment of fracture. This is old memory. But it is also new. This happened recently.", "reading"),
			ShardLore.narration("Creatures converged on the site while the Eldest was attempting to read the ground's memory. Blood-drinkers, drawn to the residual energy of the impact. They did not pause to wonder what the enormous thinking tree was doing here. They attacked immediately."),
			ShardLore.dialogue("The Deepwood Eldest", "You are interrupting my reading. This is very inconsiderate.", "genuinely annoyed"),
		],
		"post_story": [
			ShardLore.narration("When the last attacker had been driven off, the Eldest returned its attention to the impact site and completed its reading. What it found took a long time to process."),
			ShardLore.dialogue("The Deepwood Eldest", "Something tore through the sky and landed with intention. Not a natural thing. A thrown thing. The soil knows the difference between a stone that falls and a stone that is cast. This was cast. By something with a hand that could hold a sky.", "slowly horrified"),
		],
		"defeat_story": [ShardLore.dialogue("The Deepwood Eldest", "They prevented the reading. The information is lost. I must find another scar and begin again. There is never only one scar.", "matter-of-fact")],
		"player_army": ["The Deepwood Eldest", "Thornwood Sentinels", "Grove Wardens", "Root Crawlers", "Deeproot Hulks"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Blood Reavers", "Blood Reavers", "Nightfang Warriors", "Blood Thralls"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": [
			"Shard Clash: hold the impact site at center. The Eldest is ideal for anchoring objectives.",
			"Deeproot Hulks absorb heavy damage — position them between the Eldest and the enemy.",
			"Root Crawlers can contest outer shard nodes while your front line holds the center.",
		],
		"battle_modifiers": {"label": "Memory Ground", "description": "The ancient soil speaks. Units near the impact site gain +1 to all stats while the Eldest holds it.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Changed World",
		"objectives_text": "Establish a new deep-root anchor point in territory that was once ancient forest. Push through to claim it.",
		"pre_story": [
			ShardLore.narration("The Eldest was beginning to construct a picture of what had happened. It was an incomplete picture — the gaps were enormous, the missing decades vast — but the shape of the catastrophe was becoming clear."),
			ShardLore.dialogue("The Deepwood Eldest", "The world was taken apart. Other worlds were pressed against it. The creatures from those other worlds are still here, confused, fighting over a territory that belongs to none of them. I understand confusion. I am confused. But my confusion is older than theirs and therefore has more right to the territory.", "earnest logic"),
			ShardLore.narration("It had identified a place to the north where the old deep roots still existed — ancient anchors that predated even the Eldest's sleep, roots that had grown when the world was forming. If it could reach them, it could re-establish the deep-web connection that the Shardstorm had severed."),
			ShardLore.narration("The spider-folk had built structures over the top of those roots. Elaborate silk constructions. The Eldest regarded them with curiosity and then with the quiet decision that they would need to be removed."),
		],
		"post_story": [
			ShardLore.narration("The silk constructions were dismantled by roots that were old enough to remember the ground before silk had been invented. The deep-root anchors were found intact beneath the foundations, patient as only very old roots can be patient."),
			ShardLore.dialogue("The Deepwood Eldest", "The deep roots remember. They have been waiting. In ten thousand years, they have not forgotten which way the water flows or where the clean soil is. I had not known that I missed them until I felt them again.", "slow wonder"),
		],
		"defeat_story": [ShardLore.dialogue("The Deepwood Eldest", "The silk holds the ground better than I expected. The creatures who built it are patient, in their way. I respect patience. I will find a different path to the deep roots.", "considering")],
		"player_army": ["The Deepwood Eldest", "Thornwood Sentinels", "Deeproot Hulks", "Root Crawlers", "Bramblethorn Archers", "Ancient Rootwarden"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Warden Regulars", "Gossamer Guard", "Spiderling Swarm", "Venom Dancers", "Cocoon Wardens"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": [
			"Ancient Rootwarden can cleanse silk terrain — essential against Thornweft web barriers.",
			"Bramblethorn Archers deal bonus damage to silk structures. Use them on Thornweft fortifications.",
			"Deeproot Hulks are immune to web-slow effects. Lead with them.",
		],
		"battle_modifiers": {"label": "Ancient Claim", "description": "The deep roots remember this land. Rootwalker units gain +1 DEF on this ground.", "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Roots of the World",
		"objectives_text": "Reach the world-root nexus. Hold it against the combined assault. Let the roots remember.",
		"pre_story": [
			ShardLore.narration("At the center of everything wrong — the deepest point of the Shardstorm's damage, the place where the poison in the water was strongest and the silence in the deep roots was most absolute — there was a nexus. The Eldest had been circling toward it for weeks, following the wrongness, reading the memory-rings of every dead tree it passed."),
			ShardLore.dialogue("The Deepwood Eldest", "This is where it started. This is the original wound. The world has been bleeding from this place since the sky broke. I am the only thing old enough to remember what was here before the wound. I am the only thing that can close it.", "certain"),
			ShardLore.narration("Every faction in the Shardlands had noticed the nexus. It was a concentration of Shardstorm energy, which meant it was something everyone wanted — for power, for territory, for reasons the Eldest found alien and therefore not interesting. They were all converging."),
			ShardLore.dialogue("The Deepwood Eldest", "They want the wound for themselves. They do not know how to close it — they have never seen a world before it was wounded. I have. I am the memory of the correct world. I will not let them have this.", "deep resolve"),
		],
		"post_story": [
			ShardLore.narration("The Eldest held the nexus for eleven days. Eleven days of continuous assault while the deep roots worked below, pulling the poison upward, processing it through ten thousand years of bark and heartwood that had been designed, by evolution or intention, to survive exactly this."),
			ShardLore.narration("On the twelfth day, the nexus was clean."),
			ShardLore.dialogue("The Deepwood Eldest", "The world remembers what it was. The roots know the correct water again. The soil knows the correct depth. I can feel the land as it was when I first went to sleep — not the same, not whole, but the shape of wholeness is still here. The skeleton of the correct world. It can be rebuilt.", "reverent"),
			ShardLore.narration("The Eldest spread its roots wide — not aggressively, not as a weapon, but in the way of a being that has decided to stay."),
			ShardLore.dialogue("The Deepwood Eldest", "I was asleep for ten thousand years. I have ten thousand years of memory of the correct world stored in my rings. I believe I will stay awake for a while. There is much to remember. And much to do.", "decided"),
		],
		"defeat_story": [ShardLore.dialogue("The Deepwood Eldest", "The nexus is taken. The wound remains open. I remember that even the greatest injuries heal if given enough time. I have enough time. I have always had enough time.", "patient sorrow")],
		"player_army": ["The Deepwood Eldest", "Thornwood Sentinels", "Deeproot Hulks", "Root Crawlers", "Bramblethorn Archers", "Ancient Rootwarden", "Grove Colossus", "Sporecloud Drifters"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Wyrmlord Tzarak", "Emberclaw Warriors", "Ashborn Infantry", "Pyromancer Adepts", "Emberknight Riders", "Immolation Bombers", "Mature War Drake"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 8,
		"tutorial_tips": [
			"King of the Hill: the nexus is your anchor. The Eldest's regeneration makes him ideal for holding it.",
			"Grove Colossus creates a living wall around the nexus. Position him to seal approach corridors.",
			"Fire is your enemy — spread your units to avoid chain fire damage from Emberclaw pyromancers.",
			"Ancient Rootwarden at the nexus doubles cleansing speed. Keep him alive.",
		],
		"battle_modifiers": {"label": "World Memory", "description": "Ten thousand years of growth answer the call. The Deepwood Eldest gains +3 HP and +1 DEF.", "player_hp_bonus": 2, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("The Deepwood Eldest stood in the cleansed nexus and felt, for the first time since waking, the deep hum of clean water in deep roots."),
		ShardLore.dialogue("The Deepwood Eldest", "I have been asleep for ten thousand years. While I slept, many things happened to the world. Some of those things were natural. Some were not. The unnatural things — the things done deliberately to break the sky and poison the water — those I do not forgive. But I am very old, and the oldest thing I know is this: the world heals. Always. Without exception. The question is only how long it takes, and whether anyone remains to see it.", "slow and ancient"),
		ShardLore.narration("It looked at the sky. Still wrong. Still fractured with Shardstorm light."),
		ShardLore.dialogue("The Deepwood Eldest", "I have time. I will wait. And while I wait, I will remember the correct world, and remind the soil what it is supposed to be.", "settled"),
	]

static func _defeat_story() -> Array:
	return [
		ShardLore.dialogue("The Deepwood Eldest", "I lost. I had forgotten that was possible. In the old world, the deep roots did not lose — they simply outlasted everything. I must relearn patience in a world where patience alone is not sufficient. I have time. I will relearn.", "slow, absorbing the lesson"),
	]
