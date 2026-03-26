class_name RootwalkerAshenBarkCampaign
## Ashenbark the Scarred — "Burned and Reborn"
## Scarred by Emberclaw fire, revenge/resilience arc.
## 4 missions. Teaches damage absorption, counter-fire, the cost of survival.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_ashenbark",
		"commander": "Ashenbark the Scarred",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "Burned and Reborn",
		"description": "Ashenbark carries the fire. Not literally — the Emberclaw made sure of that, burning half the grove she had tended and scarring her bark from root to crown. But the fire is still in her — transformed, contained, the knowledge of what it feels like and the absolute refusal to feel it again. She is not pursuing revenge. She is preventing a recurrence. The distinction matters to her.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
		"defeat_story": _defeat_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The fire had come quickly and without warning, which was how fire always came."),
		ShardLore.narration("Ashenbark had been tending the eastern grove — fifty years of careful management, the balance of light and shade and the careful pruning that kept old growth healthy rather than merely large — when the Emberclaw warband crested the ridge and began burning."),
		ShardLore.narration("She had not fled. That was the important part of the story. She had not fled, and as a result, she had stopped the fire at the boundary of the deep grove, but only after it had consumed half of everything she had been tending. The burns on her bark ran from shoulder to root, and they would never fully heal, and she wore them the way a soldier wears scars — without shame, without show, simply as a record of what had happened."),
		ShardLore.dialogue("Ashenbark the Scarred", "I know what fire does. I know how it moves. I know its heat signature and its spread patterns and its weaknesses. I know these things the way you know a thing that has marked you. This knowledge cost me half my grove. I intend to make the cost worthwhile.", "flat and certain"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "What Fire Left Behind",
		"objectives_text": "Reclaim the burned ground. Clear the Emberclaw from the territory they destroyed.",
		"pre_story": [
			ShardLore.narration("The burned section of the grove was not dead. That was the first thing she checked — every morning, pressing her hands into the scorched soil, reading the root-network for any sign of surviving systems. The fire had gone deep, but not deep enough. The deep roots still lived. They were injured, suppressed, struggling — but alive."),
			ShardLore.dialogue("Ashenbark the Scarred", "The Emberclaw believe that fire ends things. It does not end things. It creates ash, and ash is extraordinary growing material. They have fertilized my grove. I doubt they intended this. I will make the most of it.", "dry"),
			ShardLore.narration("She turned and looked at the Emberclaw encampment at the edge of the burned zone."),
			ShardLore.dialogue("Ashenbark the Scarred", "Clear the fire-bringers first. Then the grove can begin recovery.", "businesslike"),
		],
		"post_story": [
			ShardLore.narration("The Emberclaw forward camp was dismantled. Not destroyed — dismantled, with the particular attention to completeness that characterized Ashenbark's approach to everything. Thorough. No loose ends. No survivors who could report back with useful tactical information."),
			ShardLore.dialogue("Ashenbark the Scarred", "The burned ground is clear. The ash will enrich the soil. The deep roots have already started moving upward again. I expect the first new shoots in three weeks. The grove will be slow to forgive this scar. So will I.", "measured"),
		],
		"defeat_story": [ShardLore.dialogue("Ashenbark the Scarred", "The fire-bringers held their position. My burns slowed me where they did not slow the unscathed. I am accounting for this. The burns are a limitation. I will work around the limitation.", "honest")],
		"player_army": ["Ashenbark the Scarred", "Thornwood Sentinels", "Grove Wardens", "Root Crawlers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Ashborn Infantry", "Emberclaw Warriors", "Ashwalker Skirmishers"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": [
			"Ashenbark's Scorched Bark grants her +2 DEF against fire damage — the burns hardened her.",
			"Her Ash Reclamation ability heals her HP when fire terrain is present. Fire is now her ally.",
			"Root Crawlers are immune to fire terrain — use them to flank through burned areas.",
			"Prioritize eliminating Pyromancers before they can create fire terrain zones.",
		],
		"battle_modifiers": {"label": "Scorched and Standing", "description": "The fire made her stronger. Ashenbark is immune to fire damage and gains +1 ATK from fire terrain.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Counter-Burn",
		"objectives_text": "Hit the Emberclaw supply line. Eliminate their fire-starters before they can burn anything else.",
		"pre_story": [
			ShardLore.narration("The Emberclaw had a supply network that kept their Pyromancers in the field — components for their fire-tools, the alchemical materials that let them sustain controlled burning at scale. Ashenbark had spent three weeks mapping it."),
			ShardLore.dialogue("Ashenbark the Scarred", "Remove the supply. Reduce the fire. The burning stops when the things that make burning possible are no longer available. This is logical. I have confirmed it is achievable. I am acting on it.", "precise"),
			ShardLore.narration("She had spent the time she was mapping the supply line also growing new bark over the worst of her burns. Not healed — the charcoal had too deeply penetrated — but reinforced. The scar tissue was harder than the original bark had been. She found this appropriate."),
		],
		"post_story": [
			ShardLore.dialogue("Ashenbark the Scarred", "The supply cache is ash. I found some irony in this. I do not usually notice irony. The burns must be affecting my perception. Or possibly the forest is developing a sense of humor. Either way: no supplies, fewer fires, more time for the grove to heal.", "dryly satisfied"),
		],
		"defeat_story": [ShardLore.dialogue("Ashenbark the Scarred", "The supply line was better protected than my intelligence suggested. They anticipated the raid. They may have a spy in the grove's root-network. I will investigate this.", "concerned but systematic")],
		"player_army": ["Ashenbark the Scarred", "Thornwood Sentinels", "Root Crawlers", "Bramblethorn Archers", "Sporecloud Drifters"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Pyromancer Adepts", "Ashborn Infantry", "Ashwalker Skirmishers", "Emberknight Riders"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": [
			"Shard Clash: the nodes are supply cache positions. Destroy them all.",
			"Sporecloud Drifters create cover for the approach — Emberclaw cannot fire through smoke effectively.",
			"Bramblethorn Archers harass from range while Ashenbark closes to melee range.",
			"Pyromancer Adepts are your priority targets — eliminate them before supply caches.",
		],
		"battle_modifiers": {"label": "Ash Memory", "description": "The burned know how to burn back. Ashenbark's attacks deal bonus damage to fire-type units.", "player_atk_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Scar Remembers",
		"objectives_text": "Hold the burned zone against the Emberclaw attempt to reignite it. The grove cannot survive another fire.",
		"pre_story": [
			ShardLore.narration("Intelligence from the root-web: the Emberclaw were planning to reignite the burned zone. The scorched ground was, paradoxically, highly flammable — the old fire had dried the deep soil without extinguishing it, leaving a terrain that could burn hotter and faster than the original grove."),
			ShardLore.dialogue("Ashenbark the Scarred", "If they burn it again, the deep roots will not survive. A single fire injures. A double fire kills. I will not allow a double fire.", "absolute"),
			ShardLore.narration("She positioned her forces at the edge of the burned zone and felt the deep roots below her — injured, reaching, struggling toward the surface. Counting on her."),
			ShardLore.dialogue("Ashenbark the Scarred", "The scar is mine. It was made in me by them. I will not let them make it again.", "hard and final"),
		],
		"post_story": [
			ShardLore.narration("The Emberclaw assault was broken at the edge of the burned zone. Ashenbark herself took direct fire from three Pyromancers simultaneously and did not move — did not retreat, did not flinch, stood in the fire and let the hardened scar tissue absorb what would have killed a younger tree and then counter-attacked with the methodical fury of something that had already survived the worst they could do."),
			ShardLore.dialogue("Ashenbark the Scarred", "I have already burned. I have already survived burning. Your fire is not new information to me. I know exactly how much of it I can withstand, and you have not reached that limit.", "standing in the smoke"),
		],
		"defeat_story": [ShardLore.dialogue("Ashenbark the Scarred", "The second fire came. The deep roots — some of them did not survive. I stood where I should have stood and was not enough. I am still here. They are still here. This is not over. But the grove has paid twice for what should have cost once, and this is my fault, and I will carry this.", "bearing it")],
		"player_army": ["Ashenbark the Scarred", "Thornwood Sentinels", "Deeproot Hulks", "Grove Wardens", "Root Crawlers", "Thornwall Bastion"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Pyromancer Adepts", "Emberclaw Warriors", "Ashborn Infantry", "Immolation Bombers"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": [
			"Last Stand defense: hold the burned zone edge. Do not let Emberclaw units enter the zone.",
			"Thornwall Bastion at the boundary creates a firebreak that slows Emberclaw advance.",
			"Ashenbark's Fireproof Stance: when she hasn't moved, she absorbs fire damage for adjacent allies.",
			"Immolation Bombers are area fire-setters — prioritize them above all others.",
		],
		"battle_modifiers": {"label": "The Line of Ash", "description": "The burned ground will not burn twice. All units at the ash boundary gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Burned and Reborn",
		"objectives_text": "Drive the Emberclaw from the territory completely. End their presence in the grove's watershed. Finish this.",
		"pre_story": [
			ShardLore.narration("The Emberclaw had been adapting — withdrawing from scorched-zone tactics and attempting new approaches, new angles, new strategies that didn't rely on direct fire against a target that had proven functionally immune to fire."),
			ShardLore.narration("This was, Ashenbark recognized, tactically correct. It was also, she thought, beside the point."),
			ShardLore.dialogue("Ashenbark the Scarred", "They are trying to find an approach that works against something they burned. They do not understand what they made. The fire did not weaken me. The fire is information about weakness that I no longer have. I am not what I was before they burned me. I am what survived the burning. Those are very different things.", "steady"),
			ShardLore.narration("She turned toward the final Emberclaw position."),
			ShardLore.dialogue("Ashenbark the Scarred", "I am not preventing a recurrence anymore. I am ending the possibility of one.", "final"),
		],
		"post_story": [
			ShardLore.narration("The Emberclaw withdrew from the watershed entirely. Their final commander paused at the tree line and looked back at Ashenbark, standing in the center of the cleansed territory — half her bark still the charcoal-gray of the original burn, the other half the dark green of new growth pushing through the scar tissue."),
			ShardLore.dialogue("Ashenbark the Scarred", "The grove burned. The grove survived. The grove grew new bark over the wound. This is what trees do. This is what trees have always done. Fire takes what it can reach, and what it cannot reach survives, and what survives grows stronger over the scar. You cannot kill a forest with fire. You can only delay it.", "quiet authority"),
			ShardLore.narration("The new shoots were already coming up through the ash."),
		],
		"defeat_story": [ShardLore.dialogue("Ashenbark the Scarred", "Not yet over. I have faced worse than this and survived it. I will face this again. The grove has not finished burning — but the grove has also not finished growing, and the growth will outlast the fire. It always does.", "undefeated")],
		"player_army": ["Ashenbark the Scarred", "Thornwood Sentinels", "Deeproot Hulks", "Grove Wardens", "Root Crawlers", "Thornwall Bastion", "Bramblethorn Archers", "Ancient Rootwarden"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Wyrmlord Tzarak", "Emberclaw Warriors", "Ashborn Infantry", "Unbonded Berserkers", "Emberknight Riders", "Pyromancer Circle", "Mature War Drake"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": [
			"Final assault: Ashenbark leads from the front. Her fire resistance makes her the best forward commander.",
			"Ancient Rootwarden converts fire terrain to forest terrain — use him to counter their Pyromancers.",
			"Ashenbark's Resilience Surge: each time she takes fire damage, her ATK increases by 1 (stacks 5 times).",
			"Secure all territory before the round limit — drive every Emberclaw unit off the map.",
		],
		"battle_modifiers": {"label": "Burned and Reborn", "description": "The scarred are the strongest. Ashenbark gains +1 ATK and +1 DEF for each burn scar she carries.", "player_atk_bonus": 2, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Ashenbark stood at the boundary of the reclaimed territory and looked at what remained of the original burn scar — a narrow band of charcoal-gray running through the center of the grove, the new growth on either side already beginning to close the gap."),
		ShardLore.dialogue("Ashenbark the Scarred", "In eleven years, the canopy will have closed. In twenty years, you will not be able to see the scar from above. In fifty years, the only record of the fire will be in the wood itself — a thin dark ring in every tree that grew here after the burning. The ring will mean 'fire came once, and the forest survived.' The trees that grow over this scar will be stronger for having grown over it.", "steady"),
		ShardLore.narration("She pressed her hand against her own bark — the charcoal-scored half, the hardened scar tissue."),
		ShardLore.dialogue("Ashenbark the Scarred", "I am the same as the grove. The fire is in my rings now. It is part of what I am. I am not less for it. I am more. The fire taught me what I can endure. The endurance was always there. The fire only proved it.", "settled"),
	]

static func _defeat_story() -> Array:
	return [
		ShardLore.dialogue("Ashenbark the Scarred", "I have lost before. I have been on fire before. Neither killed me. This will not kill me either. The grove grows back. The bark grows over the wound. I will try again and I will not be defeated twice by the same approach.", "implacable"),
	]
