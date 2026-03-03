class_name IronDominionBrassveilCampaign
## Lady Brassveil — "The Shadow Protocol"
## Espionage, Sabotage, Stealth. Intelligence/infiltration campaign.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_brassveil",
		"commander": "Lady Brassveil",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Shadow Protocol",
		"description": "Lady Brassveil runs the Dominion's intelligence operations. She prefers battles that are won before they begin.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Lady Brassveil", "The best battle is the one the enemy doesn't know they've already lost. Sabotage their supplies, compromise their communications, turn their allies. By the time swords are drawn, the outcome is already determined.", "silky"),
		ShardLore.narration("Nobody was entirely sure what Lady Brassveil did. Her official title was 'Diplomatic Attaché.' Her actual role involved ciphers, dead drops, poison, and a network of informants that spanned every faction in the Shardlands."),
		ShardLore.fhah_zolg("The spy. She plays the game within the game. I appreciate that. She'd appreciate knowing I exist — if I let her, which I won't."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Dead Drop",
		"objectives_text": "Plant intelligence assets behind enemy lines. Avoid direct engagement.",
		"pre_story": [ShardLore.dialogue("Lady Brassveil", "Three agents into Nightfang territory. Quiet insertion, no combat footprint. If they know we were here, we've already failed.", "precise")],
		"post_story": [ShardLore.dialogue("Lady Brassveil", "Three agents placed. Zero detection. First intelligence reports expected within forty-eight hours. The blood-drinkers won't know they're compromised until it's far too late.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Lady Brassveil", "Compromised. They detected the insertion team. I need better cover protocols.", "cold")],
		"player_army": ["Lady Brassveil", "Aether Infiltrators", "Scouts/Recon", "Mechanized Scouts"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Ritual Cpt Tsukihana", "Inkblade Initiates", "Void Bolt Crossbowmen"],
		"battle_size": "skirmish",
		"scenario": "supply_lines",
		"round_limit": 5,
		"tutorial_tips": ["Brassveil has Stealth. She can move without being detected.", "Aether Infiltrators have Sabotage. They can disable enemy units.", "Supply Lines: get your agents to the other side. Avoid, don't fight."],
		"battle_modifiers": {"label": "Shadow Operations", "description": "Stealth mission. Your units cannot be targeted until they attack.", "player_stealth": true},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Saboteur",
		"objectives_text": "Sabotage the Emberclaw war machine depot before they can deploy their artillery.",
		"pre_story": [ShardLore.dialogue("Lady Brassveil", "The fire-folk are building war machines. Three catapults, two ballistas. If those deploy, our eastern positions become untenable. Solution: they don't deploy. I'm sending a sabotage team. By morning, those machines will be very expensive scrap metal.", "businesslike")],
		"post_story": [ShardLore.dialogue("Lady Brassveil", "Five war machines rendered inoperable. Total engagement: zero combatants detected our presence. Total cost: three explosive charges and one lockpick set. Compare that to the cost of a frontal assault. Espionage isn't just effective — it's economical.", "pleased")],
		"defeat_story": [ShardLore.dialogue("Lady Brassveil", "They had guards I didn't account for. My intelligence was outdated. Unacceptable.", "furious_quietly")],
		"player_army": ["Lady Brassveil", "Aether Infiltrators", "Mechanical Sappers", "Aether Engineers", "Scouts/Recon"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberclaw Warriors", "Hatchery Guard", "Bonfire Keepers", "Drake Handlers", "Scorched Veterans"],
		"battle_size": "standard",
		"scenario": "shardstorm",
		"round_limit": 6,
		"tutorial_tips": ["Mechanical Sappers plant charges. Get them close to high-value targets.", "Aether Engineers can set traps. Place them in enemy movement paths.", "Brassveil's Sabotage special can disable enemy units temporarily."],
		"battle_modifiers": {"label": "Sabotage Protocol", "description": "Your saboteurs are prepared. Enemy war machines start with -2 ATK.", "enemy_atk_penalty": -2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Double Agent",
		"objectives_text": "Extract a double agent from Thornweft territory before their cover is blown.",
		"pre_story": [ShardLore.dialogue("Lady Brassveil", "Agent Seventeen has been embedded in the Thornweft web-network for three weeks. Their cover is compromised — the spiders can taste deception in their web-vibrations. Extraction team deploys now. If we lose Seventeen, we lose our only inside view of the Thornweft command structure.", "urgent")],
		"post_story": [ShardLore.dialogue("Lady Brassveil", "Agent Seventeen extracted with full intelligence package. The Thornweft command structure, web-anchor network, and expansion timeline — all documented. Three weeks of risk, repaid in a single data-dump. This is how wars are won: not with swords, but with information.", "triumphant")],
		"defeat_story": [ShardLore.dialogue("Lady Brassveil", "Seventeen didn't make it to the extraction point. I need a rescue team. Real soldiers, not spies. Sometimes subtlety isn't enough.", "admitting_weakness")],
		"player_army": ["Lady Brassveil", "Aether Infiltrators", "Mechanized Scouts", "Elite Vanguard", "Clockwork Infantry", "Scouts/Recon"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Thread-Cutter Nyx", "Gossamer Guard", "Phase-Silk Infiltrators", "Venom Dancers", "Web-Anchor Engineers", "Spiderling Swarm"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 6,
		"tutorial_tips": ["King of the Hill: reach the extraction point (center) and hold it.", "Elite Vanguard provide muscle for the extraction. Use them to clear a path.", "Thread-Cutter Nyx is an enemy assassin. Watch for flanking attacks."],
		"battle_modifiers": {"label": "Cover Blown", "description": "The enemy knows you're coming. But you know their positions too. +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Shadow Protocol",
		"objectives_text": "Execute the ultimate intelligence operation: compromise the Nightfang command network and feed false orders.",
		"pre_story": [ShardLore.dialogue("Lady Brassveil", "The Shadow Protocol. The operation I've been building toward since we arrived. We compromise the Nightfang communication network and feed false orders to their field commanders. When they attack, they'll attack where we want them, when we want them, in the formation we choose. The battle will be over before it begins.", "masterful")],
		"post_story": [
			ShardLore.narration("The Nightfang army attacked exactly where Brassveil predicted — because she told them to. False orders, delivered through compromised runners, guided the entire assault force into a prepared kill-box."),
			ShardLore.dialogue("Lady Brassveil", "Seven hundred enemy combatants neutralized. Coalition casualties: sixteen. The Shadow Protocol works. Information warfare isn't supplementary to military operations — it IS military operations. The sword is just cleanup.", "ice_queen"),
		],
		"defeat_story": [ShardLore.dialogue("Lady Brassveil", "They detected the false orders. Someone in the Nightfang intelligence network is better than I expected. I need to find them.", "respect_for_opponent")],
		"player_army": ["Lady Brassveil", "Aether Infiltrators", "Aether Hackers", "Mechanical Sappers", "Elite Vanguard", "Steam Sentinels", "Aether Engineers", "Clockwork Vanguard"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Shadowfang Kreev", "Blood Reavers", "Nightfang Warriors", "Tiger Berserkers", "Shadow Stalkers", "Blood Shamans", "Blood Thralls", "Corruption Scouts"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Total Intelligence: every enemy position is revealed.", "Aether Hackers can disable enemy Grid-equivalent communications.", "The kill-box is set. Use it — concentrate fire on the trapped enemies.", "Brassveil's value is making this battle easy. Capitalize on it."],
		"battle_modifiers": {"label": "Shadow Protocol", "description": "Total information dominance. All units gain +2 ATK and +1 DEF.", "player_atk_bonus": 2, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Lady Brassveil", "Calculon processes. Ironweld holds. Cogsworth charges. I ensure they each have what they need: information. The right information, at the right time, to the right person. Wars aren't won on battlefields. They're won in the shadows behind them.", "final"),
		ShardLore.narration("Lady Brassveil vanished into the evening — as she always did, as nobody noticed, as was precisely the point. The Shadow Protocol was active. The coalition's enemies would never know how thoroughly they were compromised."),
	]
