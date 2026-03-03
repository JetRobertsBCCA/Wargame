class_name NightfangNyxaraCampaign
## Countess Nyxara — "The Shadow Court"
## Shadow magic, Debuffs, CMD 9. Political manipulator, court intrigue.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_nyxara",
		"commander": "Countess Nyxara",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Shadow Court",
		"description": "Countess Nyxara prefers manipulation to murder. Her shadow magic weakens enemies before battle begins, and her court politics are deadlier than any sword.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Countess Nyxara", "Power isn't held in the fist. It's held in the whisper. In the hesitation. In the moment your enemy realizes they've already lost and don't know why. Sanguinar rules through fear. I rule through inevitability.", "languid"),
		ShardLore.narration("The shadows around Countess Nyxara moved with purpose — not cast by any light source, but woven from darkness itself, reaching, listening, reporting back. Her court was everywhere and nowhere."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Weakening",
		"objectives_text": "Debuff the Iron Dominion patrol until they can barely fight, then destroy them.",
		"pre_story": [ShardLore.dialogue("Countess Nyxara", "The Dominion patrol thinks they're safe in their metal shells. My shadows are already inside — whispering doubt, draining strength, turning their Grid connections to static. By the time we engage, they'll be fighting at half strength and won't understand why.", "amused")],
		"post_story": [ShardLore.dialogue("Countess Nyxara", "They surrendered. Not from wounds — from despair. My shadow magic drained their will to fight. Much more efficient than killing. Dead soldiers tell no tales. Broken soldiers tell the tales I want them to.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Countess Nyxara", "Their Grid protected them from my shadows. Interesting. I need a different frequency of darkness.", "intrigued")],
		"player_army": ["Countess Nyxara", "Shadow Stalkers", "Shadow Claw Infantry", "Nightveil Infiltrators", "Blood Shamans"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Kagero", "Mask Bearers", "Ink Shadow Scouts"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["Nyxara's shadow magic debuffs enemies. Weaken before engaging.", "Shadow Claw Infantry can Shadow Meld — use it for ambushes.", "Nightveil Infiltrators bypass enemy lines. Strike the rear."],
		"battle_modifiers": {"label": "Shadow Curse", "description": "Nyxara's shadows weaken enemies. Enemy units suffer -1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Divide and Rule",
		"objectives_text": "Turn the Emberclaw and Thornweft against each other while you profit.",
		"pre_story": [ShardLore.dialogue("Countess Nyxara", "The Emberclaw and Thornweft are already hostile. A few whispers, a few staged provocations, and they'll destroy each other. We collect the fragments from the battlefield afterward. War without fighting. My favorite kind.", "delighted")],
		"post_story": [ShardLore.dialogue("Countess Nyxara", "They fought beautifully. And we collected every fragment they were fighting over while they were too busy killing each other to notice. Information warfare. The only war worth waging.", "purring")],
		"defeat_story": [ShardLore.dialogue("Countess Nyxara", "They saw through the manipulation. Someone in the Thornweft is clever. I need to find out who.", "annoyed")],
		"player_army": ["Countess Nyxara", "Shadow Stalkers", "Nightveil Infiltrators", "Midnight Assassin", "Blood Shamans", "Shadow Pounce Cavalry"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberforged Blades", "Emberclaw Warriors", "Unbonded Berserkers", "Ashrider Scouts", "Mature War Drake"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Shard Clash — collect fragments while fighting.", "Use assassins and infiltrators to grab distant shards.", "Nyxara's debuffs weaken whoever you're currently fighting."],
		"battle_modifiers": {"label": "Shadow Manipulation", "description": "Court politics. All units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Puppet Master",
		"objectives_text": "Use thralls and controlled enemies to fight the Thornweft while Nyxara directs from safety.",
		"pre_story": [ShardLore.dialogue("Countess Nyxara", "Why risk my own forces when I can use theirs? The thralls are expendable — sorry, 'strategically deployed.' And these Iron Dominion prisoners I've... recruited... will serve as the vanguard. One doesn't get one's hands dirty when one has perfectly good puppets.", "aristocratic")],
		"post_story": [ShardLore.dialogue("Countess Nyxara", "Not a single casualty among my core forces. The thralls did their job. The puppets did theirs. And I sipped blood-wine from a safe distance. This is how wars should be fought.", "decadent")],
		"defeat_story": [ShardLore.dialogue("Countess Nyxara", "The puppets broke free of my control. The Thornweft have some manner of anti-shadow weaving. How irritating.", "vexed")],
		"player_army": ["Countess Nyxara", "Thrall Conscripts", "Blood Thralls", "Thrall Masters", "Shadow Stalkers", "Midnight Assassin", "Blood Shamans"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Thread-Seer Kythara", "Gossamer Guard", "Silk-Warden Regulars", "Spiderling Swarm", "Cocoon Wardens", "Web-Spinner Sappers"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["Thralls are expendable. Use them to absorb damage.", "Thrall Masters boost thrall effectiveness. Keep them safe.", "Nyxara and the Midnight Assassin are your real weapons."],
		"battle_modifiers": {"label": "Puppet Strings", "description": "Shadow control. Thralls gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Shadow Court",
		"objectives_text": "Nyxara establishes her shadow court over the Shardlands. Crush all resistance.",
		"pre_story": [
			ShardLore.dialogue("Countess Nyxara", "Sanguinar rules through blood. I shall rule through shadow. Every mind in the Shardlands will hear my whispers. Every dream will carry my commands. The Shadow Court convenes, and all shall kneel — not from fear, but because they've forgotten how to stand.", "imperial"),
			ShardLore.narration("The darkness deepened around her, spreading outward like ink in water, reaching for every corner of the battlefield. Where her shadows touched, will crumbled. Where her whispers reached, resistance died."),
		],
		"post_story": [
			ShardLore.narration("The Iron Dominion forces didn't retreat. They simply... stopped. Stood motionless, eyes glazed, weapons lowered. Countess Nyxara walked among them like a queen among statues, adjusting a collar here, tilting a chin there. Her Shadow Court was complete."),
			ShardLore.dialogue("Countess Nyxara", "Sanguinar will rage when he hears. But what can he do? Kill me? My shadows are in his court too. He just hasn't noticed yet. The Shadow Court was never about territory. It was about influence. And influence, darling, is forever.", "triumphant"),
		],
		"defeat_story": [ShardLore.dialogue("Countess Nyxara", "They resisted. ALL of them resisted. How? No matter. Every shadow retreats before dawn. But darkness always returns.", "cold_fury")],
		"player_army": ["Countess Nyxara", "Shadow Claw Infantry", "Nightveil Infiltrators", "Midnight Assassin", "Nightstalker Cavalry", "Shadow Pounce Cavalry", "Blood Shamans", "Shadow Leviathan"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Elite Vanguard", "Infantry Regiment", "Clockwork Infantry", "Steam Heavy Guards", "Clockwork Titan", "Steam Artillery Crew", "Aether Marksmen"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Shadow army — all units have stealth or ambush abilities.", "The Shadow Leviathan is your ultimate weapon. It can Shadow Meld.", "Lord Calculon's Grid resists shadow magic. Focus fire on him.", "Use Nightstalker Cavalry for decisive flanking strikes."],
		"battle_modifiers": {"label": "The Shadow Court", "description": "Total shadow dominance. All units gain +2 ATK and Shadow Meld.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Countess Nyxara", "They think the Nightfang Dominion is about blood and violence. How... limited. Blood is just a currency. Violence is just a tool. The REAL power is in the whisper that makes you doubt everything you believe. The shadow that makes you question every ally. The dream that rewrites your loyalty while you sleep. That is the Shadow Court. And it never, ever closes.", "final"),
		ShardLore.narration("She vanished into the darkness — not dramatically, not theatrically, but simply... fading, like a whisper at the edge of hearing. The Shadow Court was in session. It would always be in session."),
	]
