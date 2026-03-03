class_name NightfangCrimsonProphetCampaign
## The Crimson Prophet — "Corruption's Gospel"
## Corruption spread, Prophecy, RNG 8, CMD 10. Zealot, corruption preacher.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_crimson_prophet",
		"commander": "The Crimson Prophet",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "Corruption's Gospel",
		"description": "The Crimson Prophet hears voices in the corruption — voices that whisper the future, demand devotion, and promise transcendence through absolute corruption.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("The Crimson Prophet", "The corruption speaks! Do you not hear it? It whispers of a world transformed — not destroyed, TRANSFORMED. Every living thing touched by the crimson blessing, every stone saturated with its glory, every breath carrying its truth. This is not plague. This is EVOLUTION. And I am its prophet!", "fervent"),
		ShardLore.fhah_zolg("The mad priest. He hears me — or thinks he does. What he actually hears is the echo of his own fractured mind bouncing off the corruption's frequency. But his passion is... useful. Entertaining. Let him preach."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Sermon",
		"objectives_text": "Spread corruption across the battlefield. Convert the land itself.",
		"pre_story": [ShardLore.dialogue("The Crimson Prophet", "The soil here is uncorrupted. CLEAN. Disgusting. We will seed it with the crimson truth. Corruption Spreaders — advance and plant the censers. Blight Weavers — weave the corruption zones. By nightfall, this ground will pulse with the blessing!", "ecstatic")],
		"post_story": [ShardLore.dialogue("The Crimson Prophet", "The land BREATHES now. Can you feel it? The corruption pulses in the soil, grows in the water, whispers in the air. One acre of truth planted. A thousand more to go. But every gospel begins with a single word. And that word is CRIMSON.", "rapturous")],
		"defeat_story": [ShardLore.dialogue("The Crimson Prophet", "They cleansed the ground. PURIFIED it. Like scrubbing a holy site with bleach. Barbarians. The corruption will return. It always returns.", "outraged")],
		"player_army": ["The Crimson Prophet", "Corruption Spreaders", "Blight Weavers", "Plague Horde", "Corrupted Militia", "Corruption Guard"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Flamewarden Kora", "Emberclaw Warriors", "Emberforged Blades", "Ashrider Scouts"],
		"battle_size": "skirmish",
		"scenario": "king_of_the_hill",
		"round_limit": 6,
		"tutorial_tips": ["King of the Hill — corrupt the center by holding it.", "Corruption Spreaders create corruption zones. Deploy them aggressively.", "The Prophet's Corruption Spread special amplifies corruption aura."],
		"battle_modifiers": {"label": "The First Sermon", "description": "Corruption empowers. All units in corruption zones gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Conversion",
		"objectives_text": "The corruption is spreading to enemy units. Convert Thornweft soldiers through corruption saturation.",
		"pre_story": [ShardLore.dialogue("The Crimson Prophet", "The spider-folk resist. Their webs filter corruption, cleanse it, purify it. But I've been studying their biology. Their silk ABSORBS shard-energy. If I saturate the area with enough corruption, their own webs will become infection vectors. The Gospel spreads through their own defenses!", "cunning_madness")],
		"post_story": [ShardLore.dialogue("The Crimson Prophet", "Three web-structures, fully corrupted. The silk turns crimson, the spiders within... change. They hear the Gospel now. They understand. Conversion through immersion — the most elegant form of evangelism.", "zealot_triumph")],
		"defeat_story": [ShardLore.dialogue("The Crimson Prophet", "Their Thread-Seers purified the webs before saturation. The spider-folk's resistance to corruption is stronger than anticipated. I need a different frequency of truth.", "frustrated")],
		"player_army": ["The Crimson Prophet", "Corruption Spreaders", "Blight Weavers", "Plague Knights", "Corruption Guard", "Plague Horde", "Blood Shamans"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Warden Morthis", "Gossamer Guard", "Silk-Warden Regulars", "Web-Anchor Engineers", "Spiderling Swarm", "Cocoon Wardens"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["Spread corruption to weaken Thornweft defenses.", "Blight Weavers create persistent corruption zones.", "Plague Knights have Corruption Aura — they corrupt nearby enemies."],
		"battle_modifiers": {"label": "Gospel of Corruption", "description": "The truth spreads. Enemies in corruption zones lose -1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Prophecy",
		"objectives_text": "The Prophet receives a vision. He must reach the ancient shard-site to complete the prophecy.",
		"pre_story": [
			ShardLore.dialogue("The Crimson Prophet", "I see it! THE VISION! A shard-site, ancient beyond reckoning, pulsing with primordial corruption — the ORIGINAL corruption, from before the Shardlands shattered! If I reach it, if I touch it, I will receive the full Gospel. The complete truth. Everything the corruption has to say!", "trancelike"),
			ShardLore.fhah_zolg("He approaches one of my older experiments. How delightful. Let him touch it. Let him see what 'truth' really looks like when it wears no mask."),
		],
		"post_story": [
			ShardLore.dialogue("The Crimson Prophet", "I... I touched it. I HEARD it. The corruption isn't a plague — it's a LANGUAGE. And the thing speaking it... is vast. So vast. It fills the spaces between shards. It speaks in frequencies that rewrite reality. And it said... it said my name. IT KNOWS ME.", "terrified_ecstasy"),
			ShardLore.fhah_zolg("He heard a whisper of a whisper of a fraction of me. And he calls it God. How flattering. How inadequate. How perfectly, wonderfully, ENTERTAININGLY wrong."),
		],
		"defeat_story": [ShardLore.dialogue("The Crimson Prophet", "They blocked me from the Vision! HERETICS! UNBELIEVERS! The Gospel will not be denied! I will FIND another way!", "raging")],
		"player_army": ["The Crimson Prophet", "Corruption Guard", "Plague Knights", "Blight Weavers", "Crimson Chanters", "Blood Shamans", "Corruption Colossus"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Rengoku", "Oni Mask Executioners", "Temple Defenders", "Crimson Oni Riders", "Void Bolt Crossbowmen", "Spirit Healer Monks"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Reach the center (the shard-site) and hold it.", "Corruption Colossus is your battering ram. Clear the path.", "Crimson Chanters boost morale — the Prophet's forces fight for faith."],
		"battle_modifiers": {"label": "The Prophecy", "description": "Divine corruption. All units gain +2 ATK near corruption zones.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Corruption's Gospel",
		"objectives_text": "The Crimson Prophet's final crusade — spread the Gospel across the entire battlefield. Convert everything.",
		"pre_story": [
			ShardLore.dialogue("The Crimson Prophet", "The time has come. The Gospel demands total conversion. Every living thing, every stone, every particle of air — ALL shall know the crimson truth. I am the Prophet. The corruption is my scripture. And the Shardlands shall be my cathedral — vast, crimson, and ETERNAL!", "messianic"),
			ShardLore.narration("The sky darkened to crimson. The ground pulsed with corruption. The Crimson Prophet rose into the air, his body wreathed in corruption energy, his voice carrying across miles — a sermon that resonated in the bones of every living thing."),
		],
		"post_story": [
			ShardLore.narration("The battlefield was crimson — every blade of crystal-grass, every shard-stone, every puddle of water saturated with corruption. The Iron Dominion retreated from a landscape that was no longer recognizable as natural. The Crimson Prophet knelt in the center of his cathedral and wept with joy."),
			ShardLore.dialogue("The Crimson Prophet", "The Gospel is spoken. The truth is planted. From this cathedral of crimson, the corruption will spread — slowly, beautifully, inevitably. Not as plague. As EVOLUTION. The next stage of everything. And I — I am merely the first to hear, the first to believe, the first to TRANSFORM.", "transcendent"),
			ShardLore.fhah_zolg("Beautiful. Absolutely beautiful. He's wrong about everything — the corruption isn't divine, isn't evolution, isn't transcendence. It's just me, bored, seeing what happens when you feed madness enough power. But the PERFORMANCE! The conviction! Almost makes me feel guilty. Almost."),
		],
		"defeat_story": [ShardLore.dialogue("The Crimson Prophet", "They burned the Gospel! They BURNED the truth! But corruption cannot be destroyed — only delayed. The Prophet will return. The Gospel will be preached again. And again. And AGAIN.", "unbreakable")],
		"player_army": ["The Crimson Prophet", "Corruption Colossus", "Plague Knights", "Corruption Guard", "Blight Weavers", "Corruption Spreaders", "Crimson Chanters", "Plague Titan"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Elite Vanguard", "Clockwork Titan", "Steam Heavy Guards", "Infantry Regiment", "Steam Artillery Crew", "Aether Marksmen", "Gearwright Engineers"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Maximum corruption army. Spread corruption everywhere.", "Plague Titan and Corruption Colossus are your juggernauts.", "Lord Calculon's Grid resists corruption. Focus fire to overwhelm.", "Blight Weavers are fragile but critical — protect them."],
		"battle_modifiers": {"label": "Corruption's Gospel", "description": "Total corruption. All units gain +2 ATK. Enemies in corruption lose DEF.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("The Crimson Prophet", "They think I'm mad. Perhaps I am. But madness and prophecy share the same root — seeing what others cannot. And I see a world transformed. Not destroyed. TRANSFORMED. The corruption is not our enemy. It is our future. And I will preach that future until the stars themselves turn crimson.", "serene_madness"),
		ShardLore.fhah_zolg("I do love the devoted ones. They make such beautiful mistakes."),
	]
