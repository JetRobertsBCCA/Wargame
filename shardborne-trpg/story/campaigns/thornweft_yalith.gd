class_name ThornweftYalithCampaign
## Silk-Mender Yalith — "The Mender's Touch"
## Healing, Silk restoration, ATK 9, DEF 5, HP 24, MOV 5, CMD 6.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_yalith",
		"commander": "Silk-Mender Yalith",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "The Mender's Touch",
		"description": "Silk-Mender Yalith heals what is broken — warriors, webs, and spirits. She fights not by killing, but by keeping everyone else alive long enough to win.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Silk-Mender Yalith", "I am not a warrior. I've never wanted to be. But when the warriors fall and the web tears, someone must mend. That is my calling — not to destroy, but to RESTORE. Every silk-strand I reconnect, every wound I close, every broken spirit I bolster is a victory against entropy. The Shardlands want to break everything. I put it back together.", "gentle_resolve"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "First Aid",
		"objectives_text": "Keep the front line alive against Emberclaw aggression through healing and restoration.",
		"pre_story": [ShardLore.dialogue("Silk-Mender Yalith", "The Emberclaw burn hot and fast. They'll hit our line hard. Warriors will fall. Armor will crack. Morale will waver. That's where I come in. Silk Surgeons behind the front line, mending wounds as fast as the enemy inflicts them. The key isn't to outfight the Emberclaw — it's to outlast them. Fire burns out. Silk mends forever.", "calm")],
		"post_story": [ShardLore.dialogue("Silk-Mender Yalith", "Forty-seven wounds mended during combat. Twelve units that would have fallen, restored and returned to the fight. The Emberclaw couldn't understand why our line wasn't breaking — they were dealing damage, but the damage kept disappearing. That's the mender's advantage: attrition runs in reverse when your healer is better than their fighters.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Silk-Mender Yalith", "Too many burns. Fire cauterizes in ways silk cannot easily mend. I need fireproof restoration techniques.", "concerned")],
		"player_army": ["Silk-Mender Yalith", "Silk Surgeons", "Gossamer Guard", "Anchor Guard", "Vibration Drummers"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Hoshimaru", "Kintsugi Blademasters", "Celestial Slingers"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["Yalith heals. That's her entire purpose.", "Silk Surgeons mend wounds. Position them behind the front line.", "Vibration Drummers boost morale. Healing + morale = endurance.", "Anchor Guard holds the line. Yalith keeps them healthy.", "Outlast the Emberclaw. Their fire burns out; your healing doesn't."],
		"battle_modifiers": {"label": "First Aid", "description": "Active healing. All units regenerate slightly each round.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Field Hospital",
		"objectives_text": "Establish a mending station and sustain the army through a prolonged engagement.",
		"pre_story": [ShardLore.dialogue("Silk-Mender Yalith", "The Iron Dominion presses our position with grinding efficiency. Their doctrine is attrition — steady pressure, accumulating damage, wearing us down. MY doctrine is restoration — mending faster than they can break. I'm establishing a full field hospital behind the front line. Silk Surgeons, cocoon processors, and restoration weavers all working in concert. Every wounded warrior returns to the fight. Every damaged web is restored. We don't just survive — we REGENERATE.", "determined")],
		"post_story": [ShardLore.dialogue("Silk-Mender Yalith", "The Iron Dominion commander couldn't understand his readouts. His forces were dealing consistent damage, but our fighting strength INCREASED over time. Because every unit he wounded came back stronger — silk-reinforced, properly healed, with renewed morale. His attrition doctrine works against enemies that break. We don't break. We MEND.", "quiet_triumph")],
		"defeat_story": [ShardLore.dialogue("Silk-Mender Yalith", "Their artillery destroyed the field hospital. Targeted healing infrastructure specifically. They identified the restoration as our center of gravity and removed it. Smart. Cruel. Effective.", "shaken")],
		"player_army": ["Silk-Mender Yalith", "Silk Surgeons", "Cocoon Processors", "Gossamer Guard", "Fang Guard Elite", "Anchor Guard", "Vibration Drummers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Commander Ironweld", "Infantry Regiment", "Steam Heavy Guards", "Clockwork Infantry", "Steam Artillery Crew", "Mechanized Scouts"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["Field hospital — all healing units work together.", "Silk Surgeons mend wounds. Cocoon Processors repair equipment.", "Vibration Drummers sustain morale. Critical for long engagements.", "Fang Guard Elite rotates through the line — fight, fall back, heal, return.", "The longer the battle runs, the stronger your advantage."],
		"battle_modifiers": {"label": "Field Hospital", "description": "Active restoration. All units heal each round.", "player_def_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Web Restorer",
		"objectives_text": "Repair damaged web infrastructure while defending against Nightfang incursion.",
		"pre_story": [ShardLore.dialogue("Silk-Mender Yalith", "The Nightfang have damaged the web-lattice in this sector. Torn threads, corrupted anchors, dissolved silk barriers. My job today isn't to fight — it's to MEND. The Web-Anchor Engineers will rebuild the infrastructure while I coordinate the restoration. The warriors protect us while we work. Every repaired anchor strengthens the entire web network. Every restored thread reconnects the Matriarchy.", "focused")],
		"post_story": [ShardLore.dialogue("Silk-Mender Yalith", "Twenty-three web anchors restored. Six hundred meters of silk barrier mended. The web-lattice in this sector is stronger than before the damage — because I don't just repair. I IMPROVE. Every mend incorporates lessons from the break. The Matriarchy doesn't just recover from damage. It evolves through it.", "proud")],
		"defeat_story": [ShardLore.dialogue("Silk-Mender Yalith", "They destroyed the anchors faster than I could mend them. The corruption ate through the silk before the restoration could take hold. I need stronger anti-corruption treatments.", "struggling")],
		"player_army": ["Silk-Mender Yalith", "Web-Anchor Engineers", "Silk Surgeons", "Gossamer Guard", "Cocoon Wardens", "Silk-Warden Regulars", "Gossamer Trap Layers"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["The Crimson Prophet", "Corruption Spreaders", "Corrupted Militia", "Blood Reavers", "Corruption Guard", "Plague Horde"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["King of the Hill — hold web anchor points.", "Yalith restores web anchors. Web-Anchor Engineers rebuild.", "Gossamer Guard protects the work crews.", "Corruption enemies damage web terrain. Stop them from reaching anchors.", "Gossamer Trap Layers slow the enemy approach."],
		"battle_modifiers": {"label": "Web Restorer", "description": "Restoration aura. All units gain +1 DEF and heal each round.", "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Mender's Touch",
		"objectives_text": "Total restoration warfare. Yalith proves that healing is more powerful than destruction.",
		"pre_story": [
			ShardLore.dialogue("Silk-Mender Yalith", "They send their destroyers. Their fire-breathers, their steel-clad hammers, their engines of pure destruction. And I answer with silk. With thread. With mending. They think this is weakness. They are WRONG. Destruction is easy — any fool can break things. Creation is hard. Restoration is HARDER. And harder still is doing it while under fire, while the web tears and the warriors fall and the world tries to end us. BUT I DO IT ANYWAY. Because that is what menders DO.", "fierce_compassion"),
		],
		"post_story": [
			ShardLore.narration("The battlefield after Yalith's engagement was unique among battlefields: it was BETTER than before the fighting started. Torn web barriers had been mended stronger. Damaged terrain had been restored. Even the enemy's discarded equipment had been processed and reused to reinforce Matriarchy positions. Silk-Mender Yalith had not just won the battle — she had IMPROVED the world."),
			ShardLore.dialogue("Silk-Mender Yalith", "They will remember the warriors who fought bravely. They will forget the mender who kept them alive. That is the way of things. But the web remembers. Every thread I've mended, every wound I've closed, every spirit I've restored — the web remembers them all. And that is enough. The Mender's Touch: invisible, invaluable, eternal.", "serene"),
		],
		"defeat_story": [ShardLore.dialogue("Silk-Mender Yalith", "I couldn't mend fast enough. The destruction outpaced the restoration. Some things, once broken, cannot be repaired. I must accept this truth and learn from it.", "acceptance")],
		"player_army": ["Silk-Mender Yalith", "Silk Surgeons", "Cocoon Processors", "Web-Anchor Engineers", "Gossamer Guard", "Fang Guard Elite", "Anchor Guard", "Silk Colossus", "Vibration Drummers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Emberforged Blades", "Unbonded Berserkers", "Emberclaw Warriors", "Mature War Drake", "Immolation Bombers", "Pyromancer Adepts", "Ashrider Scouts"],
		"battle_size": "epic",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Total restoration warfare. Outheal their damage.", "Silk Colossus creates web terrain and serves as anchor.", "Triple healing: Yalith + Silk Surgeons + Cocoon Processors.", "Vibration Drummers keep morale up through sustained pressure.", "Fang Guard Elite and Gossamer Guard are your combat force.", "This is endurance. The Emberclaw will burn out. You won't."],
		"battle_modifiers": {"label": "The Mender's Touch", "description": "Full restoration. All units regenerate and gain +2 DEF.", "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Silk-Mender Yalith", "The world breaks. I mend. That is the cycle. That is my purpose. Not to conquer, not to destroy, not to weave grand patterns of fate. Just to mend. Thread by thread. Wound by wound. Spirit by spirit. The Mender's Touch is gentle, but it endures longer than any blade. Long after the warriors are gone and the battles are forgotten, the mends remain. And so do I.", "final"),
	]
