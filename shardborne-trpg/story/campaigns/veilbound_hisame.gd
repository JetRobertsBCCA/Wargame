class_name VeilboundHisameCampaign
## Cmdr Hisame — "The Rain of Needles"
## Ranged support, Artillery. ATK 12, DEF 3, HP 27, MOV 8, RNG 6, CMD 7.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_hisame",
		"commander": "Cmdr Hisame",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "The Rain of Needles",
		"description": "Commander Hisame commands the Shogunate's ranged divisions. Dreampiercer Archers, Void Bolt Crossbowmen, and Celestial Slingers — precision firepower that falls like needlepoint rain.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Cmdr Hisame", "Hisame — fine rain. The kind that soaks you before you realize it's falling. My archers are the same: a hundred arrows that arrive before the sound. The Shogunate's ranged doctrine is not about volume — that is the Emberclaw way, all fire and no finesse. Our way is PRECISION. Every arrow aimed. Every bolt calibrated. Every sling stone placed exactly where it will do the most damage. When the rain of needles falls, every needle finds its mark.", "precise"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Arrow Rain",
		"objectives_text": "Establish fire superiority against an Emberclaw advance using massed ranged fire.",
		"pre_story": [ShardLore.dialogue("Cmdr Hisame", "The Emberclaw charge. That is what they do. And I SHOOT. That is what I do. Dreampiercer Archers on the high ground, Void Bolt Crossbowmen in the second rank, Temple Defenders screening. When they start running toward us, every step forward is a step through arrow rain. By the time they reach our line — if they reach our line — there won't be enough of them to matter.", "matter_of_fact")],
		"post_story": [ShardLore.dialogue("Cmdr Hisame", "Arrow count: four hundred and twelve. Kill count: proportional. The Emberclaw are brave — genuinely, fearlessly brave. They charged into the rain and kept charging. But bravery doesn't deflect arrows. The survivors who reached our Temple Defenders were too few and too wounded to break through. Precision defeats courage. Every time.", "professional")],
		"defeat_story": [ShardLore.dialogue("Cmdr Hisame", "They closed too fast. Their fastest berserkers reached our archers before we could establish fire superiority. Need better screening troops.", "frustration")],
		"player_army": ["Cmdr Hisame", "Dreampiercer Archers", "Void Bolt Crossbowmen", "Temple Defenders", "Shrine Wardens"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Skullcrusher Threx", "Unbonded Berserkers", "Emberclaw Warriors", "Emberforged Blades"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["Hisame commands ranged units. Keep distance.", "Dreampiercer Archers have Phase Arrows — ignore some cover.", "Void Bolt Crossbowmen are Armor Piercing — target heavy units.", "Temple Defenders screen your archers from melee attackers.", "Maintain firing lanes. Don't let melee units close the gap."],
		"battle_modifiers": {"label": "Arrow Rain", "description": "Ranged superiority. All ranged units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Siege Needles",
		"objectives_text": "Use combined ranged firepower to crack an Iron Dominion fortified position.",
		"pre_story": [ShardLore.dialogue("Cmdr Hisame", "Artillery against fortifications is usually a slow process — bombardment, wait, bombardment, wait. I don't wait. My doctrine is CONCENTRATED fire on structural weak points. Shadow Marksmen identify the critical joints. Void Bolt Crossbowmen deliver armor-piercing bolts to those exact points. Celestial Slingers blast the weakened sections with Flow-infused stones. One coordinated volley to the right place does more than a hundred random bombardments.", "efficient")],
		"post_story": [ShardLore.dialogue("Cmdr Hisame", "The wall section collapsed on the third volley. Three. Not thirty, not three hundred — three. Because every bolt, every arrow, every sling stone hit the same structural joint. The Iron Dominion builds excellent fortifications. But excellent fortifications have excellent stress points — and Shadow Marksmen can find stress points at eight hundred meters. The rain of needles never misses.", "clinical")],
		"defeat_story": [ShardLore.dialogue("Cmdr Hisame", "Their walls are self-repairing. The structural damage healed between volleys. Need continuous fire capability.", "impressed")],
		"player_army": ["Cmdr Hisame", "Dreampiercer Archers", "Void Bolt Crossbowmen", "Celestial Slingers", "Shadow Marksmen", "Spirit Javelin Skirmishers", "Temple Defenders"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Piston", "Steam Heavy Guards", "Infantry Regiment", "Clockwork Infantry", "Gearwright Artillery", "Clockwork Cavalry"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Concentrated ranged fire — hit structural weak points.", "Shadow Marksmen have Commander Hunter — target enemy leaders.", "Celestial Slingers have Blast — use against grouped enemies.", "Void Bolt Crossbowmen pierce heavy armor.", "Spirit Javelin Skirmishers harass mobile units.", "Focus fire on one target at a time. Destroy, then shift."],
		"battle_modifiers": {"label": "Siege Needles", "description": "Concentrated fire. All ranged units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Sniper's Veil",
		"objectives_text": "Use Shadow Marksmen and precision archery to eliminate Nightfang leadership without a pitched battle.",
		"pre_story": [ShardLore.dialogue("Cmdr Hisame", "The Nightfang army is led by its vampires — ancient, powerful, and arrogant enough to expose themselves. Shadow Marksmen will target their leadership specifically. Decapitation strategy: eliminate the commanders, and the thrall hordes collapse into disorganized mobs. We don't need to fight their army. We need to shoot their BRAINS. Every vampire lord that falls to a sniper's bolt takes a thousand thralls out of the equation.", "cold_logic")],
		"post_story": [ShardLore.dialogue("Cmdr Hisame", "Three vampire officers eliminated by sniper fire before the battle proper even began. Their thrall hordes instantly became aimless — shambling without direction, attacking randomly, breaking formation. The Shadow Marksmen earned their pay today. One bolt per target. Three commanders eliminated. Three thousand thralls neutralized. The mathematics of precision: one perfect shot outweighs a thousand mediocre ones.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Cmdr Hisame", "The vampires sensed our snipers. Supernatural awareness — they can feel the killing intent before the arrow flies. Need spiritually cloaked ammunition.", "recalculating")],
		"player_army": ["Cmdr Hisame", "Shadow Marksmen", "Dreampiercer Archers", "Void Bolt Crossbowmen", "Ink Shadow Scouts", "Spirit Javelin Skirmishers", "Veiled Ashigaru"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Nightclaw Vex", "Plague Knights", "Corrupted Militia", "Blood Reavers", "Blight Hound Pack", "Thrall Riders", "Plague Horde"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["Sniper doctrine — eliminate leadership from range.", "Shadow Marksmen have Commander Hunter — bonus vs leaders.", "Ink Shadow Scouts reveal hidden enemy positions.", "Dreampiercer Archers use Phase Arrows against concealed targets.", "Keep infantry screens between snipers and enemy melee.", "Kill the leaders. The army collapses without them."],
		"battle_modifiers": {"label": "The Sniper's Veil", "description": "Precision sniping. All ranged units gain +1 ATK.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Rain of Needles",
		"objectives_text": "Deploy the full Veilbound ranged arsenal in a definitive display of precision firepower.",
		"pre_story": [
			ShardLore.dialogue("Cmdr Hisame", "Every arrow. Every bolt. Every sling stone. Every spirit javelin. Everything that can be launched, thrown, or propelled from range — assembled together for the first time. This is the Rain of Needles: the complete ranged capability of the Veilbound Shogunate, unified under one command. The sky will darken. Not with darkness — with PRECISION. Every projectile aimed, every trajectory calculated, every impact point chosen. This is not bombardment. This is ART.", "final_pride"),
			ShardLore.narration("The first volley was beautiful. Hundreds of projectiles arcing through the air in mathematical precision — each one aimed, each one purposeful, each one lethal. Dreampiercer arrows phased through cover. Void bolts punched through armor. Celestial stones exploded on impact. And Shadow Marksmen bolts found commanders with unerring, terrifying accuracy."),
		],
		"post_story": [
			ShardLore.narration("The Rain of Needles fell for thirty minutes. In that time, Commander Hisame's ranged divisions delivered more precision firepower than most armies see in a year. The enemy army — brave, determined, well-led — never got within sword range. The rain simply... continued. Needle by needle. Arrow by arrow. Until there was nothing left to shoot at."),
			ShardLore.dialogue("Cmdr Hisame", "They will say it was not honorable — killing from range without crossing blades. They are wrong. The precision required to place every arrow exactly where it must go — THAT is discipline. THAT is mastery. THAT is honor expressed through perfect execution. The Rain of Needles is not cowardice. It is the highest form of martial art: the art of not needing to fight at all.", "final_precision"),
		],
		"defeat_story": [ShardLore.dialogue("Cmdr Hisame", "They closed through our fire. Absorbed our volleys and kept coming. Superior numbers with sufficient armor will eventually close any range gap. I need more screening infantry.", "analytical")],
		"player_army": ["Cmdr Hisame", "Dreampiercer Archers", "Void Bolt Crossbowmen", "Celestial Slingers", "Shadow Marksmen", "Spirit Javelin Skirmishers", "Temple Defenders", "Eclipse Manta Riders", "Shrine Dragon"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Marshal Draven", "Fang Guard Elite", "Thread-Warden Infantry", "Silk-Rider Lancers", "Phase-Silk Cavalry", "Venom Dancers", "Silk Colossus", "Venom Mortar"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Total ranged warfare. The sky fills with projectiles.", "Shrine Dragon provides devastating Dragon Breath support.", "Eclipse Manta Riders deliver aerial suppression.", "All four ranged unit types covering different roles.", "Temple Defenders are your only ground screen — position wisely.", "Focus fire. Concentrated precision defeats dispersed volume."],
		"battle_modifiers": {"label": "The Rain of Needles", "description": "Full ranged arsenal. All units gain +2 ATK at range.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Cmdr Hisame", "Hisame — fine rain. Not the dramatic thunderstorm. Not the overwhelming flood. Just the quiet, persistent, precision rain that soaks the world one needle at a time. I am that rain. My archers are that rain. And the Rain of Needles never stops falling. Because precision never goes out of fashion, and a well-aimed arrow never loses its edge.", "final"),
	]
