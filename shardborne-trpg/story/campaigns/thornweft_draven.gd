class_name ThornweftDravenCampaign
## Silk-Marshal Draven — "Venom and Silk"
## Venom warfare, Combined arms, ATK 15, DEF 4, HP 27, MOV 7, CMD 7.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_draven",
		"commander": "Silk-Marshal Draven",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "Venom and Silk",
		"description": "Silk-Marshal Draven is the Matriarchy's finest battlefield commander. Combined arms, venom warfare, and silk-reinforced formations — war as a craft, honed to lethal perfection.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Silk-Marshal Draven", "The Loom-Mother weaves the great pattern. The Thread-Seers read fate. I? I make war. That is my craft. Every unit in my command knows its role — infantry screens, cavalry flanks, artillery softens, and the venom does the rest. The Matriarchy is not just webs and spiders. It is a MILITARY, and I am its marshal.", "professional"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Venom Doctrine",
		"objectives_text": "Deploy the Silk-Marshal's combined arms doctrine against Emberclaw raiders.",
		"pre_story": [ShardLore.dialogue("Silk-Marshal Draven", "Emberclaw raiders strike fast and burn hot. Counter-doctrine: web barriers slow their charge, venom saps their strength, silk-fortified positions deny them ground. Let the fire-breathers throw themselves against prepared positions. Fire burns bright but silk endures.", "tactical")],
		"post_story": [ShardLore.dialogue("Silk-Marshal Draven", "Textbook engagement. The web barriers held, the venom accumulated, and by the time they reached our lines, they were too weakened to break through. Combined arms is not glamorous. It's effective. That's all that matters.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Silk-Marshal Draven", "They burned through the web barriers faster than anticipated. Fire is the counter to silk. I knew this. I should have deployed more Venom Alchemists to offset the fire advantage. Tactical error. Mine.", "self_critical")],
		"player_army": ["Silk-Marshal Draven", "Silk-Warden Regulars", "Gossamer Guard", "Venom Alchemists", "Web-Anchor Engineers", "Silk-Shot Skirmishers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Flamewarden Kora", "Unbonded Berserkers", "Emberclaw Warriors", "Ashrider Scouts", "Ashwalker Skirmishers"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["Combined arms: web barriers slow, venom weakens, infantry holds.", "Venom Alchemists coat weapons. Venom stacks over time.", "Web-Anchor Engineers create web terrain. It slows the enemy.", "Silk-Shot Skirmishers harass at range. Keep the pressure on."],
		"battle_modifiers": {"label": "Venom Doctrine", "description": "Prepared positions. All units gain +1 DEF behind web terrain.", "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Silk Offensive",
		"objectives_text": "Draven launches an offensive against Iron Dominion fortifications using combined arms.",
		"pre_story": [ShardLore.dialogue("Silk-Marshal Draven", "The Iron Dominion has fortified their position — steam turrets, infantry trenches, artillery behind walls. A conventional assault would be suicidal. But I'm not conventional. Venom Mortars suppress the artillery. Silk-Rider Lancers flank from the webbed forest. And the Gossamer Guard marches straight up the middle, because sometimes you need a hammer as well as a scalpel.", "planning")],
		"post_story": [ShardLore.dialogue("Silk-Marshal Draven", "Their fortifications fell in sequence. The venom softened the garrison. The cavalry hit the flanks. The infantry charged when the moment was right. Every element worked together. THAT is the Silk-Marshal's art — coordination. Not one thing done brilliantly. Everything done WELL.", "pride")],
		"defeat_story": [ShardLore.dialogue("Silk-Marshal Draven", "Their layered defense absorbed our flanking. The venom wasn't concentrated enough to break the center. I need heavier artillery for fortified targets.", "analytical")],
		"player_army": ["Silk-Marshal Draven", "Gossamer Guard", "Silk-Rider Lancers", "Venom Mortar", "Venom Alchemists", "Silk-Blade Duelists", "Web-Anchor Engineers"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Kagero", "Moonlit Wanderers", "Shrine Wardens", "Lunar Kitsune Riders", "Shadow Marksmen", "Ink Sigil Crafters"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["Broken Ground — terrain is varied. Use web to reshape it.", "Venom Mortar softens fortified positions. Fire at clusters.", "Silk-Rider Lancers flank. Their spider-pounce hits hard.", "Silk-Blade Duelists excel in melee. Let them duel enemy elites."],
		"battle_modifiers": {"label": "Silk Offensive", "description": "Combined arms coordination. All units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Marshal's Gambit",
		"objectives_text": "Draven faces a superior Nightfang force. He must win with discipline, not numbers.",
		"pre_story": [ShardLore.dialogue("Silk-Marshal Draven", "We're outnumbered. The Nightfang have more bodies — they always do. Thralls, beasts, vampires, all pressing forward in a tide of hunger. But numbers are meaningless against doctrine. Our web barriers channel their charge. Our venom weakens their elite. Our formations hold because they're TRAINED to hold. Let them come with their horde. I'll break it on silk and discipline.", "determined")],
		"post_story": [ShardLore.dialogue("Silk-Marshal Draven", "The horde broke on our lines. Exactly as planned. The web barriers channeled them into kill zones. The venom sapped their strength. The Gossamer Guard held the center like a wall. And when the moment was right, the cavalry hit their flanks and shattered them. Discipline defeats numbers. Always.", "validated")],
		"defeat_story": [ShardLore.dialogue("Silk-Marshal Draven", "Too many. Even discipline has limits against overwhelming force. I needed more artillery, more web barriers, more TIME. The Nightfang don't give you time.", "grim")],
		"player_army": ["Silk-Marshal Draven", "Gossamer Guard", "Fang Guard Elite", "Anchor Guard", "Venom Mortar", "Silk Catapult", "Venom Alchemists", "Gossamer Trap Layers"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Thrallmaster Ghul", "Thrall Conscripts", "Plague Horde", "Blood Thralls", "Blood Reavers", "Fang Guard", "Tiger Berserkers"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["Last Stand — survive the Nightfang horde.", "Web barriers and traps channel the enemy. Place them wisely.", "Double artillery: Venom Mortar + Silk Catapult. Devastate the horde.", "Anchor Guard holds ground. They don't move, they don't break.", "Gossamer Trap Layers create kill zones. Lure enemies in."],
		"battle_modifiers": {"label": "Marshal's Gambit", "description": "Prepared defense. All units gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Venom and Silk",
		"objectives_text": "Full combined arms engagement. Every element of the Matriarchy's military at Draven's command.",
		"pre_story": [
			ShardLore.dialogue("Silk-Marshal Draven", "Today we deploy the full doctrine. Infantry, cavalry, artillery, scouts, specialists, war machines — every element working as one. The Iron Dominion believes their machines are the pinnacle of warfare. Let me show them what organic combined arms looks like when wielded by a master. Venom and silk, fang and web, discipline and artistry.", "commanding"),
		],
		"post_story": [
			ShardLore.narration("The battlefield was a masterpiece of military art. Web barriers channeled the Iron Dominion into kill zones where venom accumulated and silk-fortified positions held firm. Cavalry struck at precisely the right moment. Artillery found its targets with mathematical precision. And at the center of it all, Silk-Marshal Draven directed every element with the calm authority of a conductor leading a symphony of war."),
			ShardLore.dialogue("Silk-Marshal Draven", "The Loom-Mother weaves destiny. The Thread-Seers read fate. But someone must translate vision into violence. That is the Silk-Marshal's purpose. Venom and silk. Discipline and death. The Matriarchy's blade, honed to perfection.", "satisfied"),
		],
		"defeat_story": [ShardLore.dialogue("Silk-Marshal Draven", "Their combined arms outmatched ours. Calculon's coordination was... superior. I hate to admit it, but the Grid outperformed my doctrine today. I will study, I will adapt, and the next engagement will have a different outcome.", "honest")],
		"player_army": ["Silk-Marshal Draven", "Fang Guard Elite", "Gossamer Guard", "Silk-Rider Lancers", "Matriarch Riders", "Venom Mortar", "Silk Catapult", "Venom Engine", "Venom Alchemists"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Clockwork Titan", "Elite Vanguard", "Steam Heavy Guards", "Aether Marksmen", "Infantry Regiment", "Steam Artillery Crew", "Steam Colossus"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Full combined arms. Every unit has a purpose.", "Venom Engine creates poison cloud areas. Control the board.", "Double cavalry: Silk-Rider Lancers and Matriarch Riders flank both sides.", "Double artillery softens before engagement.", "Fang Guard Elite and Gossamer Guard are your anvil. Cavalry is your hammer."],
		"battle_modifiers": {"label": "Venom and Silk", "description": "Perfect doctrine. All units gain +1 ATK and +1 DEF.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Silk-Marshal Draven", "Generals win battles. Marshals win wars. The difference is patience, logistics, and the willingness to do the unglamorous work that makes victory possible. I am not a hero. I am a craftsman. And my craft is war. Venom and silk — the Matriarchy's military doctrine, refined across a hundred engagements and a thousand lessons. It works. Not because it's brilliant. Because it's THOROUGH.", "final"),
	]
