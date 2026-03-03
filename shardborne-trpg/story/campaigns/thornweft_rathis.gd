class_name ThornweftRathisCampaign
## Cocoon-Keeper Rathis — "The Harvest"
## Resource harvesting, Economy, ATK 12, DEF 4, HP 27, MOV 6, CMD 7.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_rathis",
		"commander": "Cocoon-Keeper Rathis",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "The Harvest",
		"description": "Cocoon-Keeper Rathis turns battlefields into resources. Every fallen enemy becomes raw material — processed, recycled, and fed back into the Matriarchy's war machine. Nothing is wasted.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Cocoon-Keeper Rathis", "War is WASTE. Bodies, equipment, materials — all left rotting on the battlefield. Barbaric. Inefficient. In the Matriarchy, every fallen enemy is cocooned, processed, and converted into resources. Silk. Chitin. Biomass. The enemy feeds us. Literally. I don't fight for glory. I fight for the HARVEST.", "pragmatic"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Harvest",
		"objectives_text": "Engage the Emberclaw and harvest their fallen for the Matriarchy's cocoon processors.",
		"pre_story": [ShardLore.dialogue("Cocoon-Keeper Rathis", "The Emberclaw leave their casualties behind. Criminal waste. Those bodies contain minerals, proteins, shard-resonance. My Cocoon Wardens will harvest everything. Fight first, harvest second. Every body that falls — theirs OR ours — gets cocooned and processed. War has costs. I minimize them.", "efficient")],
		"post_story": [ShardLore.dialogue("Cocoon-Keeper Rathis", "Excellent yield. Emberclaw biomass is rich in heat-minerals. The cocoon processors extracted enough material to reinforce three battalions' armor. The cost of this battle? Negative. We PROFITED. That is the Harvest doctrine: war that pays for itself.", "pleased")],
		"defeat_story": [ShardLore.dialogue("Cocoon-Keeper Rathis", "They burned their own dead. BURNED them. All that material — wasted. The Emberclaw are culturally opposed to efficiency.", "horrified")],
		"player_army": ["Cocoon-Keeper Rathis", "Cocoon Wardens", "Cocoon Processors", "Silk-Warden Regulars", "Web-Spinner Sappers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Embersmith Torvan", "Emberclaw Warriors", "Ashwalker Skirmishers", "Pyromancer Adepts"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["Cocoon Wardens harvest fallen enemies. Resources win wars.", "Cocoon Processors refine the harvest. Keep them safe.", "Web-Spinner Sappers create web terrain for movement advantage.", "Fight smart — every enemy that falls is a resource gain."],
		"battle_modifiers": {"label": "First Harvest", "description": "Harvest economics. Player gains resources from fallen enemies.", "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Supply War",
		"objectives_text": "Contest supply points while harvesting the battlefield for maximum efficiency.",
		"pre_story": [ShardLore.dialogue("Cocoon-Keeper Rathis", "The Iron Dominion understands logistics. They have supply lines, depots, resource management. But they WASTE. They abandon broken machines, discard spent ammunition casings, leave battlefield debris. I see treasure in everything they discard. My Cocoon Harvesters will strip their supply points AND their casualties. We don't just win the supply war — we ABSORB it.", "calculating")],
		"post_story": [ShardLore.dialogue("Cocoon-Keeper Rathis", "Their supply point yielded remarkable materials. Iron, copper, aether-crystals, processed alloys — the Cocoon Processors converted it all into web-reinforced armor plating. We literally rebuilt our defenses from their discarded equipment. The Matriarchy's economic advantage is simple: we waste NOTHING.", "triumphant")],
		"defeat_story": [ShardLore.dialogue("Cocoon-Keeper Rathis", "They rigged the supply points with explosives. Destroyed everything rather than let us harvest it. Scorched earth. Wasteful. Deliberately, spitefully wasteful.", "disgusted")],
		"player_army": ["Cocoon-Keeper Rathis", "Cocoon Wardens", "Cocoon Harvester", "Silk-Warden Regulars", "Gossamer Guard", "Cocoon Processors", "Cocoon Bombers"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Asagiri", "Starblade Samurai", "Shrine Wardens", "Star Serpent Lancers", "Dreampiercer Archers", "Banner of Silent Prayer"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply Lines — hold supply points AND harvest the battlefield.", "Cocoon Harvester is a mobile processing unit. Key asset.", "Cocoon Bombers use processed cocoons as weapons. Ironic efficiency.", "Gossamer Guard holds supply points while Wardens harvest.", "Every casualty is a resource. The longer the battle, the stronger you get."],
		"battle_modifiers": {"label": "Supply War", "description": "Harvest economics. Player gains +1 ATK from resourced units.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Recycler",
		"objectives_text": "Large-scale battlefield harvesting. Convert a Nightfang horde into Matriarchy resources.",
		"pre_story": [ShardLore.dialogue("Cocoon-Keeper Rathis", "The Nightfang send their thrall hordes. Expendable, poorly equipped, barely trained mass of bodies. To an ordinary commander, this is a nuisance. To ME, it's a feast. Each thrall body yields basic biomass. Volume compensates for quality. A hundred thralls provide enough material to build a Silk Colossus. Let them come with their horde. I'll RECYCLE it.", "excited")],
		"post_story": [ShardLore.dialogue("Cocoon-Keeper Rathis", "Four hundred and twelve thralls harvested. The biomass yield exceeded projections by forty percent. The Cocoon Processors worked at maximum capacity. Result: enough raw material to equip two full battalions and repair the Cocoon Harvester's damage. The Nightfang thought they were attacking us. They were SUPPLYING us.", "deeply_satisfied")],
		"defeat_story": [ShardLore.dialogue("Cocoon-Keeper Rathis", "Too many. The thrall wave overwhelmed the harvesting capacity. We couldn't process fast enough and the live ones kept coming. Volume has its limits — even for me.", "overwhelmed")],
		"player_army": ["Cocoon-Keeper Rathis", "Cocoon Wardens", "Cocoon Harvester", "Cocoon Processors", "Gossamer Guard", "Anchor Guard", "Silk Catapult"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Thrallmaster Ghul", "Thrall Conscripts", "Plague Horde", "Blood Thralls", "Corrupted Militia", "Thrall Riders", "Thrall Masters"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Harvest the horde. Every thrall that falls is a resource.", "Anchor Guard holds the line. Cocoon Wardens harvest behind.", "Cocoon Harvester mass-processes fallen enemies.", "Silk Catapult thins the horde from range.", "Let them come to you. Defensive harvesting is most efficient."],
		"battle_modifiers": {"label": "The Recycler", "description": "Mass harvest. Player gains reinforcements from processed biomass.", "player_def_bonus": 1, "player_atk_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Harvest",
		"objectives_text": "Full harvest operation. Every cocoon processor, every harvester, every resource in the Matriarchy focused on total economic warfare.",
		"pre_story": [
			ShardLore.dialogue("Cocoon-Keeper Rathis", "Today, the Matriarchy demonstrates economic total war. Every unit on this battlefield has a dual function — fight AND harvest. Every casualty feeds the processors. Every broken machine is recycled. Every inch of ground is stripped for resources. The Iron Dominion fights with manufactured weapons. WE fight with recycled weapons — built from THEIR weapons. That isn't just winning. It's COMPOUNDING.", "ultimate_efficiency"),
		],
		"post_story": [
			ShardLore.narration("When the battle ended, Cocoon-Keeper Rathis's forces had not only won the engagement but had harvested so thoroughly that no trace of the Iron Dominion's army remained. Weapons, armor, machines, bodies — all cocooned, processed, and converted into Matriarchy resources. The battlefield was pristine. As if the enemy had never existed."),
			ShardLore.dialogue("Cocoon-Keeper Rathis", "War is an economic activity. It has inputs and outputs. My genius — if I may be immodest — is ensuring the outputs always exceed the inputs. The Matriarchy grows stronger with every battle because I ensure that NOTHING is wasted. Not a body. Not a blade. Not a single drop of blood. The Harvest provides. Always.", "fulfilled"),
		],
		"defeat_story": [ShardLore.dialogue("Cocoon-Keeper Rathis", "Total economic loss. Not only did we fail militarily, but the processing infrastructure was destroyed. Months of construction, gone. I will have to rebuild from raw materials. The irony of the harvester being harvested is not lost on me.", "bitter")],
		"player_army": ["Cocoon-Keeper Rathis", "Cocoon Harvester", "Cocoon Wardens", "Cocoon Processors", "Cocoon Bombers", "Gossamer Guard", "Fang Guard Elite", "Silk Catapult", "Venom Engine"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Clockwork Titan", "Elite Vanguard", "Steam Heavy Guards", "Aether Marksmen", "Infantry Regiment", "Steam Artillery Crew", "Steam Colossus"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Total economic warfare. Fight AND harvest simultaneously.", "Cocoon Harvester processes en masse. Protect it.", "Venom Engine creates denial zones. Slow the approach.", "Fang Guard Elite and Gossamer Guard are your combat force.", "Every enemy that falls makes your army stronger.", "Cocoon Bombers weaponize the harvest itself."],
		"battle_modifiers": {"label": "The Harvest", "description": "Economic total war. Player gains +1 ATK and +1 DEF from harvested resources.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Cocoon-Keeper Rathis", "Heroes win glory. Generals win battles. Economists win WARS. The Matriarchy endures not because of its warriors or its weavers, but because of its EFFICIENCY. Because nothing is wasted. Because every battle makes us stronger. Because the Harvest never ends. That is my legacy: a Matriarchy that grows from every conflict, sustained by the very enemies who would destroy it. The Harvest provides.", "final"),
	]
