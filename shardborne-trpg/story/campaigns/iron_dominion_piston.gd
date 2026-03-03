class_name IronDominionPistonCampaign
## Lord Piston — "The Fortress Walks"
## Defensive engineering, Fortification, CMD 8. Mobile fortress builder.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_piston",
		"commander": "Lord Piston",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Fortress Walks",
		"description": "Lord Piston builds fortresses. In the Shardlands, where territory shifts and conventional walls crumble, he builds fortresses that move. Each position he establishes becomes a mobile bastion of Dominion power.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Lord Piston", "A fortress is not a building. It is a statement of intent: 'This ground is ours. Come and take it.' In the Shardlands, the ground itself is unreliable, so our fortresses must be... adaptable. I have designs for mobile barricade platforms, deployable shield walls, and automated turret systems. The enemy will find that every position I hold is a fortress — and every fortress I build can move.", "methodical"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Establishing the Perimeter",
		"objectives_text": "Build a fortified position and defend it against Thornweft probing attacks.",
		"pre_story": [ShardLore.dialogue("Lord Piston", "We establish the perimeter here. Barricades at the cardinal points, engineers at each junction, overlapping fields of fire. The Thornweft will send scouts first — spiders, crawlers, things that creep. Let them come. Every probe tells us their patterns. Every pattern gives us targeting data.", "patient")],
		"post_story": [ShardLore.dialogue("Lord Piston", "Perimeter holds. Their probes revealed seven distinct attack vectors. I've strengthened all seven and left three apparent weaknesses — which are traps. Let them think they've learned something.", "cunning")],
		"defeat_story": [ShardLore.dialogue("Lord Piston", "They breached the southern barricade. Design flaw — I didn't account for tunneling. Note: Thornweft can dig.", "learning")],
		"player_army": ["Lord Piston", "Clockwork Pioneers", "Mechanical Sappers", "Infantry Regiment", "Steam Sentinels"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Spiderling Swarm", "Gossamer Guard", "Silk-Warden Regulars", "Web-Spinner Sappers"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["Lord Piston's Fortification special strengthens nearby positions.", "Clockwork Pioneers can build barricades. Use them before wave 1.", "Mechanical Sappers set traps on approach routes."],
		"battle_modifiers": {"label": "Fortified Position", "description": "Piston's defenses. All units gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Mobile Bastion",
		"objectives_text": "Advance toward the supply point while maintaining a mobile defensive formation.",
		"pre_story": [ShardLore.dialogue("Lord Piston", "We can't stay static. The supplies are three miles north, through contested ground. So: mobile bastion formation. Engineers build forward barricades, infantry advances to the new position, then the engineers leapfrog forward again. Slow? Yes. Safe? Extremely. We don't lose soldiers. We don't take risks. We advance like a wall.", "meticulous")],
		"post_story": [ShardLore.dialogue("Lord Piston", "Three miles in four hours. Steamjaw would have covered it in one hour and lost half his troops. I took four hours and lost none. Which is better generalship? I know my answer.", "smug")],
		"defeat_story": [ShardLore.dialogue("Lord Piston", "They flanked the mobile bastion. I was too focused on forward defense. A fortress needs walls on all sides.", "self_aware")],
		"player_army": ["Lord Piston", "Clockwork Pioneers", "Clockwork Engineers", "Steam Heavy Guards", "Infantry Regiment", "Siege Infantry"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Tsuyukusa", "Lotus Ascetics", "Mask Bearers", "Void Crane Riders", "Dreampiercer Archers", "Lantern Bearers"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 8,
		"tutorial_tips": ["Supply Lines — secure the supply points while advancing.", "Build barricades at each supply point before moving on.", "Steam Heavy Guards form the core of your mobile wall."],
		"battle_modifiers": {"label": "Mobile Bastion", "description": "Moving fortress. All units gain +1 DEF and +1 ATK.", "player_def_bonus": 1, "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Siege and Counter-Siege",
		"objectives_text": "Break a Nightfang siege by building a counter-siege position.",
		"pre_story": [ShardLore.dialogue("Lord Piston", "Ironic — the Nightfang are besieging our forward base, so I'm going to besiege THEM. Counter-siege: build fortified positions around the besiegers, cutting off their reinforcements and supplies while our garrison holds from inside. Trapped between two fortresses. I almost feel sorry for them. Almost.", "dark_amusement")],
		"post_story": [ShardLore.dialogue("Lord Piston", "Counter-siege complete. The Nightfang are caught between our garrison and our encirclement. No retreat, no resupply, no hope. This is what happens when you siege something protected by Lord Piston — you become the besieged.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Lord Piston", "Counter-siege positions weren't completed before they broke through. I needed more time. More engineers. More everything.", "frustrated")],
		"player_army": ["Lord Piston", "Clockwork Pioneers", "Mechanical Sappers", "Overclocked Engineers", "Steam Sentinels", "Siege Infantry", "Mechanized Siege Engine"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Thrallmaster Ghul", "Blood Reavers", "Nightfang Warriors", "Tiger Berserkers", "Blood Thralls", "Plague Horde"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["Broken Ground — terrain is treacherous. Build barricades to create safe zones.", "Mechanized Siege Engine provides heavy fire from fortified positions.", "Piston's engineers are his real weapons. Protect them."],
		"battle_modifiers": {"label": "Counter-Siege", "description": "Double fortification. All units gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Fortress Walks",
		"objectives_text": "Deploy the full mobile fortress against the combined Emberclaw assault.",
		"pre_story": [
			ShardLore.dialogue("Lord Piston", "The Emberclaw are massing for a full assault. Fire-drakes, war-beasts, berserkers — everything they have, coming straight at us. Perfect. I've spent three weeks building the Mobile Fortress — barricade platforms, shield generators, automated turrets, overlapping kill zones. They can bring all the fire they want. Fire meets iron. I know which wins.", "absolute_confidence"),
			ShardLore.narration("The Mobile Fortress was unlike anything the Shardlands had seen — a moving city of steel and gears, bristling with weapons, surrounded by concentric rings of barricades. It didn't advance so much as it consumed ground, converting open terrain into fortified territory with mechanical efficiency."),
		],
		"post_story": [
			ShardLore.narration("The Emberclaw assault broke against the Mobile Fortress like waves against a cliff. Fire washed over the barricades and dissipated. War-beasts charged into kill zones and were cut down. Berserkers screamed and died against automated turret fire. The fortress walked on, implacable and unstoppable, crushing the ashes of the enemy beneath its treads."),
			ShardLore.dialogue("Lord Piston", "The Fortress Walks. That's not just a title — it's a promise. Every inch of ground I cross becomes fortified ground. Every battle I fight is fought from a position of strength. The Iron Dominion doesn't need to be the strongest. It needs to be the most prepared. And I am ALWAYS prepared.", "definitive"),
		],
		"defeat_story": [ShardLore.dialogue("Lord Piston", "The fire was too intense. Even the Mobile Fortress has limits. But it held long enough for evacuation. My soldiers survived. The fortress can be rebuilt. Soldiers can't.", "pragmatic")],
		"player_army": ["Lord Piston", "Mechanized Siege Engine", "Steam Colossus", "Clockwork Pioneers", "Overclocked Engineers", "Steam Heavy Guards", "Siege Infantry", "Steam Artillery Crew"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Wyrmlord Tzarak", "Emberforged Blades", "Unbonded Berserkers", "Emberclaw Warriors", "Mature War Drake", "Obsidax", "Ashrider Scouts", "Grounded Wyrm"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["The Mobile Fortress is a defensive army that advances slowly.", "Build barricades, advance, build more barricades. Leapfrog forward.", "Steam Artillery Crew provides fire support from behind your walls.", "Wyrmlord Tzarak is a fierce melee opponent. Let him come to your defenses."],
		"battle_modifiers": {"label": "The Fortress Walks", "description": "Complete mobile fortification. All units gain +3 DEF.", "player_def_bonus": 3},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Lord Piston", "Steamjaw fights. Brassveil infiltrates. Cogsworth charges. I build. And building endures. Long after the charges and the fights and the infiltrations are forgotten, the fortresses remain. That is my legacy — not victories, but positions that will never fall.", "quiet_pride"),
		ShardLore.narration("Behind him, the Mobile Fortress hummed with mechanical contentment, its gears turning slowly, its barricades gleaming. It would keep walking. It would keep building. And the Shardlands would learn that some things, once fortified, could never be taken."),
	]
