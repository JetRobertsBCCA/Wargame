class_name IronDominionIroncladCampaign
## Captain Ironclad — "The Shield of the Dominion"
## Heavy armor, Bodyguard, Tank. DEF 5, HP 39, CMD 8. Immovable protector.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_ironclad",
		"commander": "Captain Ironclad",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Shield of the Dominion",
		"description": "Captain Ironclad has never lost a charge he was guarding. Never lost a commander he was protecting. Never retreated from a position he was holding. His armor has been shattered, rebuilt, and reinforced so many times that it's more shard-steel than original metal.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Captain Ironclad", "I don't need to kill anyone. I just need to make sure no one kills the people I'm protecting. My armor absorbs the hits. My shield blocks the blades. My body holds the line. That's the job. Simple. Painful. But simple.", "stoic"),
		ShardLore.narration("Captain Ironclad's armor was three inches thick at the thinnest point. He moved like a walking fortress — slow, deliberate, unstoppable. The scratches and dents on his shield told stories of a hundred battles, each one won by staying exactly where he was while everything else tried to move him."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Bodyguard",
		"objectives_text": "Protect Archmagister Gearbane's research convoy from Nightfang ambush.",
		"pre_story": [
			ShardLore.dialogue("Archmagister Gearbane", "The fragment samples must reach the laboratory intact. Captain, I trust you'll see to the security?", "nervous"),
			ShardLore.dialogue("Captain Ironclad", "Stay behind me. Don't wander. Don't investigate strange noises. Don't pick up anything glowing. Just walk where I walk, stop when I stop, and let me handle everything that wants to kill you. Which will be everything.", "flat"),
		],
		"post_story": [
			ShardLore.dialogue("Archmagister Gearbane", "Remarkable! Not a single sample damaged. Captain, you absorbed hits that would have demolished the convoy.", "impressed"),
			ShardLore.dialogue("Captain Ironclad", "That's the job.", "matter_of_fact"),
		],
		"defeat_story": [ShardLore.dialogue("Captain Ironclad", "Convoy damaged. My fault. Positioned wrong. Won't happen again.", "grim")],
		"player_army": ["Captain Ironclad", "Steam Heavy Guards", "Infantry Regiment", "Steam Medic Corps", "Mechanized Scouts"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Hoshimaru", "Kintsugi Blademasters", "Celestial Slingers"],
		"battle_size": "skirmish",
		"scenario": "supply_lines",
		"round_limit": 6,
		"tutorial_tips": ["Ironclad has HP 39 and DEF 5 — he absorbs enormous damage.", "His Bodyguard special redirects attacks from adjacent allies to him.", "Steam Medic Corps keeps Ironclad alive. They're the key unit."],
		"battle_modifiers": {"label": "Bodyguard Protocol", "description": "Ironclad absorbs damage. All adjacent allies gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Anvil",
		"objectives_text": "Hold the pass while General Steamjaw flanks around. Be the anvil.",
		"pre_story": [
			ShardLore.dialogue("General Steamjaw", "Ironclad, I need you in the pass. Three hours. They'll throw everything at you.", "direct"),
			ShardLore.dialogue("Captain Ironclad", "Three hours. In a chokepoint. Against everything they have. At least I won't need to worry about my flanks.", "dry_humor"),
		],
		"post_story": [
			ShardLore.dialogue("General Steamjaw", "Three hours and twelve minutes and you didn't budge an inch. How?", "marveling"),
			ShardLore.dialogue("Captain Ironclad", "I stood there. They hit me. I didn't move. That's really all there is to it.", "modest"),
		],
		"defeat_story": [ShardLore.dialogue("Captain Ironclad", "They broke through. I held as long as my body could take. My armor failed before my will did.", "defiant")],
		"player_army": ["Captain Ironclad", "Steam Heavy Guards", "Siege Infantry", "Clockwork Infantry", "Steam Medic Corps", "Gearwright Engineers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Pyroclaw Drenna", "Emberforged Blades", "Unbonded Berserkers", "Emberclaw Warriors", "Ashrider Scouts", "Mature War Drake"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Last Stand — you must survive all rounds.", "Ironclad in the center, Steam Heavy Guards on the flanks.", "Gearwright Engineers repair Ironclad's armor mid-battle.", "Pyroclaw Drenna hits hard — focus on staying alive, not killing her."],
		"battle_modifiers": {"label": "The Anvil", "description": "Immovable defense. All units gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Walking Wall",
		"objectives_text": "Escort the refugee column through Thornweft-infested territory.",
		"pre_story": [ShardLore.dialogue("Captain Ironclad", "Civilians. Non-combatants. Workers, families, engineers' apprentices. They need to reach the eastern settlement safely. The Thornweft have webbed every route, infested every clearing. So: Walking Wall formation. I'm point. Heavy Guards on the flanks. Steam Sentinels in the rear. Nothing gets through. Nothing touches the civilians. Nothing.", "absolute_commitment")],
		"post_story": [
			ShardLore.narration("One hundred and forty-seven civilians, safe and unharmed, delivered through twelve miles of Thornweft-infested jungle. Captain Ironclad's armor was webbed, scratched, acid-burned, and punctured in sixteen places. He shrugged off the medics."),
			ShardLore.dialogue("Captain Ironclad", "Armor can be fixed. People can't. The refugees are safe. That's all that matters.", "exhausted_but_satisfied"),
		],
		"defeat_story": [ShardLore.dialogue("Captain Ironclad", "Casualties in the refugee column. My failure. I should have been faster. Stronger. Better positioned.", "anguished")],
		"player_army": ["Captain Ironclad", "Steam Heavy Guards", "Steam Sentinels", "Clockwork Infantry", "Steam Medic Corps", "Mechanical Sappers"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Marshal Draven", "Spiderling Swarm", "Gossamer Guard", "Silk-Warden Regulars", "Gossamer Trap Layers", "Cocoon Wardens"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply Lines — protect the path from start to end.", "Walking Wall: Ironclad leads, Heavy Guards protect flanks.", "Mechanical Sappers clear Thornweft webs from the path.", "Broodling Swarms are weak individually but numerous. AoE is key."],
		"battle_modifiers": {"label": "Walking Wall", "description": "Escort formation. All units gain +1 DEF and +1 HP.", "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Shield of the Dominion",
		"objectives_text": "Final stand against the full Nightfang assault. Ironclad holds the center of the Dominion defense.",
		"pre_story": [
			ShardLore.narration("The Nightfang army swept across the Shardlands like a tide of blood and shadow. Every commander in the Iron Dominion took their position. Lord Calculon commanded from the strategic center. General Steamjaw led the counterattack. Lady Aetheris provided ranged support. And Captain Ironclad — Captain Ironclad stood in the very center of the line. The place where the fighting would be thickest. The place where the most people needed protecting."),
			ShardLore.dialogue("Captain Ironclad", "This is where I belong. Between the enemy and everything I'm sworn to protect. I've stood in this spot a hundred times. I'll stand in it a hundred more. They. Will. Not. Pass.", "iron_will"),
		],
		"post_story": [
			ShardLore.narration("When the battle was over, they had to pry Captain Ironclad's boots from the ground — the force of his stand had driven them three inches into the shard-stone. His armor was destroyed. His shield was cracked in half. His body was a map of wounds. But he was standing. He was always standing."),
			ShardLore.dialogue("Captain Ironclad", "They did not pass.", "quiet"),
			ShardLore.narration("Lord Calculon had the shield repaired and mounted above the entrance to the command bunker. Beneath it, a plaque read: THE SHIELD OF THE DOMINION. Captain Ironclad protested. 'I'm just doing my job,' he said. But the shield remained. And so did he."),
		],
		"defeat_story": [ShardLore.dialogue("Captain Ironclad", "I fell. First time in thirty years. But I fell forward. Toward the enemy. Never backward. Never away from the people I protect.", "broken_but_unbowed")],
		"player_army": ["Captain Ironclad", "Steam Heavy Guards", "Siege Infantry", "Clockwork Infantry", "Infantry Regiment", "Steam Medic Corps", "Gearwright Engineers", "Steam Sentinels"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Lord Sanguinar", "Blood Reavers", "Tiger Berserkers", "Nightfang Warriors", "Shadow Stalkers", "Blood Shamans", "Crimson Behemoth", "Feral Skinchanger"],
		"battle_size": "epic",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Last Stand — survive every round. Ironclad is your shield.", "Steam Medic Corps MUST keep Ironclad alive. He absorbs everything.", "Lord Sanguinar will target Ironclad directly. Heal through the damage.", "This is a pure defense battle. Stand and endure."],
		"battle_modifiers": {"label": "Shield of the Dominion", "description": "Ironclad's final stand. All units gain +3 DEF.", "player_def_bonus": 3},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Captain Ironclad", "They gave me a medal. I put it in a drawer. They painted my portrait. I turned it to face the wall. I don't do this for recognition. I do it because someone has to stand between the people who can't fight and the things that want to kill them. And if that someone is going to be hit... it should be me. I can take it.", "quiet_resolve"),
		ShardLore.narration("He checked his armor — newly repaired, again — picked up his shield — newly welded, again — and walked to his post. The Shield of the Dominion was on duty. The Dominion was safe."),
	]
