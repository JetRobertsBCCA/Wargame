class_name NightfangHollowKingCampaign
## The Hollow King — "The Crown Endures"
## Undying tank, Ancient power, ATK 12, DEF 6, HP 39, CMD 10. The unkillable ancient monarch.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_hollow_king",
		"commander": "The Hollow King",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Crown Endures",
		"description": "The Hollow King has ruled for a thousand years. He has been stabbed, burned, dismembered, buried, and forgotten. He endures. He always endures. And now he walks again.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The throne room was empty. It had been empty for three centuries — since the last siege, when the fortress fell and the Hollow King was buried beneath ten thousand tons of rubble. Everyone assumed he was dead. They were wrong."),
		ShardLore.dialogue("The Hollow King", "I remember the sun. I remember when it didn't burn. I remember when the blood-hunger was new and terrible and I wept at what I had become. That was a thousand years ago. I do not weep anymore. I do not feel anymore. I only endure. And the crown... the crown demands that I continue.", "ancient_weariness"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Grave Opens",
		"objectives_text": "The Hollow King emerges from centuries of burial. Reclaim the approaches to his fortress.",
		"pre_story": [
			ShardLore.narration("The rubble shifted. Stones that had lain still for three hundred years began to move. Something beneath them pushed — slowly, patiently, with the same unstoppable force as a glacier. A gauntleted hand emerged. Then a helm. Then eyes that had seen the world when it was whole."),
			ShardLore.dialogue("The Hollow King", "Emberclaw. They build their camps on my doorstep. They burn MY forests. They hunt MY prey. This is... unacceptable. I was old when their great-great-grandsires were eggs. They will learn what it means to trespass on the domain of a king.", "cold_authority"),
		],
		"post_story": [ShardLore.dialogue("The Hollow King", "They fought hard. Brave, even. Their fire burned my flesh and I felt nothing. Their blades cut my armor and I healed. They retreated when they realized they could not kill me. Wise. Most enemies take longer to learn.", "matter_of_fact")],
		"defeat_story": [ShardLore.dialogue("The Hollow King", "They collapsed the tunnel behind them. Buried me again. It will not hold. Nothing holds me forever. I have patience measured in centuries.", "patient")],
		"player_army": ["The Hollow King", "Fang Guard", "Corruption Guard", "Blood Thralls", "Blood Shamans"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Hisame", "Shrine Wardens", "Dreampiercer Archers"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["The Hollow King has DEF 6 and HP 39. He is nearly unkillable.", "Let the King anchor the center. He absorbs everything.", "Fang Guard and Corruption Guard support the flanks.", "Blood Shamans keep the troops healthy. The King handles himself."],
		"battle_modifiers": {"label": "The Grave Opens", "description": "Ancient resilience. The Hollow King regenerates HP each round.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Unbreakable",
		"objectives_text": "The Iron Dominion sends a kill team to destroy the Hollow King. They will fail.",
		"pre_story": [ShardLore.dialogue("The Hollow King", "Calculon has computed that I am a threat. He has sent assassins. Engineers. A Clockwork Titan designed specifically to destroy undying targets. He does not understand. I have been struck by weapons that made his machines look like children's toys. I survived the Shattering. I survived the Blood Wars. I survived being buried alive for three centuries. A clockwork toy will not be my end.", "contempt")],
		"post_story": [
			ShardLore.narration("The Clockwork Titan lay in pieces across the battlefield, its aether core dark, its limbs scattered. Standing amid the wreckage, barely scratched, the Hollow King looked down at the broken machine with an expression that might have been boredom."),
			ShardLore.dialogue("The Hollow King", "Is that all? I expected more from the Iron Dominion. Tell Calculon his 'optimal solution' has been found... wanting.", "unimpressed"),
		],
		"defeat_story": [ShardLore.dialogue("The Hollow King", "The aether weapons. They disrupt the binding that keeps me... intact. Interesting. I did not know that technology existed. I will remember. I always remember.", "considering")],
		"player_army": ["The Hollow King", "Bloodsworn Templars", "Crimson Halberdiers", "Fang Guard", "Blood Champion", "Blood Shamans", "Hunger Priests"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["High Engineer Vortan", "Clockwork Titan", "Elite Vanguard", "Steam Heavy Guards", "Aether Marksmen", "Mechanized Scouts"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["The Hollow King tanks everything. Use him as the anvil.", "Bloodsworn Templars are the hammer. They hit hard.", "Crimson Halberdiers deal with the Clockwork Titan.", "Blood Champion engages their commander. Hunger Priests sustain.", "Aether Marksmen are dangerous at range. Close quickly."],
		"battle_modifiers": {"label": "The Unbreakable", "description": "Ancient power. The Hollow King gains +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Old Alliance",
		"objectives_text": "The Thornweft invade ancient Nightfang territory. The Hollow King remembers old borders — and old grudges.",
		"pre_story": [ShardLore.dialogue("The Hollow King", "The Thornweft. I remember when their queen was young — when their web-cities were just camps in the forest. They have grown ambitious in my absence. They've taken territories that were MINE before their civilization existed. The young always forget. The old always remember. And I am very, very old.", "ancient_grudge")],
		"post_story": [ShardLore.dialogue("The Hollow King", "The ancient borders are restored. The Thornweft's queen will send diplomats. She will offer peace. And I will accept, because an old king knows that wars have costs, even wars you win. But she will remember that this territory is MINE. As it was before her grandmother's grandmother was hatched.", "magnanimous")],
		"defeat_story": [ShardLore.dialogue("The Hollow King", "The web traps held even me. Interesting — their craft has improved since last I encountered it. I shall need to adjust my approach. One does not survive a millennium without adapting.", "thoughtful")],
		"player_army": ["The Hollow King", "Crimson Behemoth", "Fang Guard", "Nightfang Warriors", "Tiger Fang Elite", "Crimson Halberdiers", "Blood Mortar Team"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Marshal Draven", "Gossamer Guard", "Silk-Warden Regulars", "Venom Dancers", "Spiderling Swarm", "Gossamer Titan", "Cocoon Wardens"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["King of the Hill — the ancient border marker.", "The Hollow King holds the center. Nothing moves him.", "Crimson Behemoth breaks web barriers.", "Blood Mortar Team bombards spider nests from range.", "Tiger Fang Elite flanks while the King holds."],
		"battle_modifiers": {"label": "Ancient Claim", "description": "Territorial imperative. All units fight harder on claimed ground.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Crown Endures",
		"objectives_text": "The final defense. Every enemy faction sends forces against the Hollow King's domain. He endures.",
		"pre_story": [
			ShardLore.dialogue("The Hollow King", "They come. All of them. A coalition against the ancient king. They think numbers will succeed where technology and nature failed. They are wrong. I have stood against armies larger than this. I have watched empires rise and crumble around my ankles. I have survived the death of the old world and the birth of the new. And I will survive this.", "ancient_resolve"),
			ShardLore.fhah_zolg("...interesting. A mortal who refuses to die. How... familiar. I approve, little king. ENDURE."),
		],
		"post_story": [
			ShardLore.narration("When the dust settled, the Hollow King stood exactly where he had stood at the battle's beginning. Around him, the battlefield was littered with the broken remnants of three armies. His own forces had taken heavy casualties — but they were casualties that could be replaced. The King could not. And the King still stood."),
			ShardLore.dialogue("The Hollow King", "A thousand years. I have worn this crown for a thousand years. I have buried friends, enemies, kingdoms, and gods. And still I stand. Not because I am strong. Not because I am clever. But because I ENDURE. That is the lesson of the Hollow King. Not power. Not cunning. Endurance. The crown endures. And so do I.", "eternal"),
		],
		"defeat_story": [ShardLore.dialogue("The Hollow King", "They... broke me. Truly broke me. For the first time in centuries, I understand what it means to fall. But the crown still rests on my brow. And where there is a crown, there is a king. I will rise again. I always rise.", "broken_but_rising")],
		"player_army": ["The Hollow King", "Crimson Behemoth", "Corruption Colossus", "Bloodsworn Templars", "Fang Guard", "Crimson Halberdiers", "Blood Shamans", "Hunger Priests", "Blood Mortar Team"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Wyrmlord Tzarak", "Emberforged Blades", "Unbonded Berserkers", "Emberclaw Warriors", "Mature War Drake", "Ashwalker Skirmishers", "Pyromancer Adepts", "Immolation Bombers"],
		"battle_size": "epic",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Last Stand — survive everything they throw at you.", "The Hollow King is your anchor. DEF 6, HP 39. He does not fall.", "Crimson Behemoth and Corruption Colossus absorb damage.", "Bloodsworn Templars counter-attack when the enemy overextends.", "Blood Shamans and Hunger Priests sustain the defense.", "This is an endurance fight. Outlast them."],
		"battle_modifiers": {"label": "The Crown Endures", "description": "Millennia of defiance. All units gain +2 DEF and regenerate.", "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("The Hollow King returned to his throne — the same throne he had sat upon when the world was whole. The stone was weathered, the hall was ruined, but the throne endured. As he always endured. And in the silence of his ancient fortress, the oldest vampire in the Shardlands closed his eyes and remembered what it felt like to be alive."),
		ShardLore.dialogue("The Hollow King", "The crown endures.", "final"),
	]
