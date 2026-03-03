class_name IronDominionMechanaCampaign
## Lady Mechana — "The Construct Swarm"
## Construct commander, Automation, CMD 7. Autonomous machine army.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_mechana",
		"commander": "Lady Mechana",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Construct Swarm",
		"description": "Lady Mechana commands no soldiers — only constructs. Automatons, walkers, golems, and drones, all connected through the Grid and responding to her will. She believes the future of warfare has no room for flesh.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Lady Mechana", "Soldiers die. They tire, they fear, they break. My constructs do none of these things. They fight until destroyed, then their parts build new constructs. No casualties. No grief. No widows. Just efficiency. Why does everyone act like this is controversial?", "genuinely_puzzled"),
		ShardLore.narration("Her retinue was unsettling — twenty Clockwork constructs moving in perfect synchronization, their glass eyes tracking everything, their mechanical limbs clicking in unison. Lady Mechana walked among them like a mother among children, adjusting a gear here, tightening a bolt there. She loved each one."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Deployment",
		"objectives_text": "Deploy the construct army against an Emberclaw raiding force. No human soldiers — constructs only.",
		"pre_story": [ShardLore.dialogue("Lady Mechana", "First all-construct engagement. No infantry support, no human backup. Just me and my machines. Steamjaw called it 'reckless.' I call it 'proof of concept.' If the constructs can handle a raiding force alone, the future of the Dominion military changes forever.", "determined")],
		"post_story": [ShardLore.dialogue("Lady Mechana", "Zero human casualties. Twelve construct losses — all salvageable. Total reconstruction time: four hours. Compare that to the casualty reports from Steamjaw's last engagement. I rest my case.", "vindicated")],
		"defeat_story": [ShardLore.dialogue("Lady Mechana", "The constructs couldn't adapt fast enough. They need better decision matrices. More autonomy. I'll reprogram them tonight.", "analytical")],
		"player_army": ["Lady Mechana", "Experimental Construct", "Overclocked Automaton", "Gear-Beast Construct", "Clockwork Infantry", "Clockwork Vanguard"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberforged Blades", "Emberclaw Warriors", "Unbonded Berserkers", "Ashrider Scouts"],
		"battle_size": "skirmish",
		"scenario": "supply_lines",
		"round_limit": 6,
		"tutorial_tips": ["All-construct army — no human soldiers except Mechana herself.", "Constructs don't rout from morale. They fight until destroyed.", "Overclocked Automaton is your heavy hitter. Manage its Overheat."],
		"battle_modifiers": {"label": "Construct Protocol", "description": "Machine precision. All units gain +1 ATK and immune to morale effects.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Recycling Program",
		"objectives_text": "Defeat the Nightfang force and recycle fallen constructs into new units mid-battle.",
		"pre_story": [ShardLore.dialogue("Lady Mechana", "Here's the beauty of construct warfare: when a machine falls, its parts don't go to waste. Mid-battle recycling — destroyed constructs are harvested by my engineers and rebuilt into new units on the field. Infinite regeneration. The enemy has to destroy every single piece to stop us. And they won't. They can't.", "passionate")],
		"post_story": [ShardLore.dialogue("Lady Mechana", "Seventeen constructs destroyed. Twenty-two rebuilt from parts. Net gain of five combat units during the battle. That's not just efficiency — that's evolution. My army GROWS by fighting.", "ecstatic")],
		"defeat_story": [ShardLore.dialogue("Lady Mechana", "Recycling rate couldn't keep up with destruction rate. I need faster rebuilding protocols.", "frustrated")],
		"player_army": ["Lady Mechana", "Clockwork Infantry", "Experimental Construct", "Gear-Beast Construct", "Clockwork Engineers", "Steam Reclaimers", "Overclocked Automaton"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Hoshimaru", "Temple Defenders", "Kintsugi Blademasters", "Thunder Kirin Cavalry", "Void Bolt Crossbowmen", "Flow Adepts"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Steam Reclaimers recover destroyed construct parts.", "Clockwork Engineers rebuild fallen constructs.", "Hold the center — your recycling ability gives you sustainability."],
		"battle_modifiers": {"label": "Recycling Program", "description": "Construct recycling active. Destroyed constructs return at half HP.", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Awakening",
		"objectives_text": "The shard energy is making the constructs behave strangely — they're becoming autonomous. Manage the evolving situation.",
		"pre_story": [ShardLore.dialogue("Lady Mechana", "Something is happening. The constructs near the shard deposits are... changing. Making decisions I didn't program. Adjusting their own combat patterns. One of them — Construct Seven — looked at me this morning. Not scanned. LOOKED. With... curiosity? I should be alarmed. But I'm not. I've been trying to build autonomous constructs for years. The shards are doing it for free.", "fascinated")],
		"post_story": [
			ShardLore.narration("The awakened constructs fought with a creativity that no programming could explain. They flanked, feinted, set traps, and — most disturbing of all — protected each other. Not from programming. From choice."),
			ShardLore.dialogue("Lady Mechana", "They're not just machines anymore. The shard energy has given them... something. Not consciousness — not yet. But the seed of it. The question is: do I nurture it or suppress it? ...I'm going to nurture it. Obviously. This is the greatest breakthrough in the history of construct engineering.", "moved"),
		],
		"defeat_story": [ShardLore.dialogue("Lady Mechana", "The awakened constructs are confused. They don't know what they are yet. I need to guide them, not throw them into battle. Too much too soon.", "protective")],
		"player_army": ["Lady Mechana", "Experimental Construct", "Arcane Steam Golem", "Gear-Beast Construct", "Overclocked Automaton", "Clockwork Vanguard", "Clockwork Engineers"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Brood-Warden Thessari", "Gossamer Guard", "Silk-Warden Regulars", "Brood-Mother Spider", "Spiderling Swarm", "Web-Spinner Sappers"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["The Arcane Steam Golem is shard-enhanced — highest ATK in your army.", "Awakened constructs adapt mid-battle. Their stats improve over time.", "Brood-Mother Spider spawns Broodlings. Kill her first."],
		"battle_modifiers": {"label": "Awakening Protocol", "description": "Construct evolution. All constructs gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Construct Swarm",
		"objectives_text": "Deploy the complete construct army — including the awakened machines — against the Nightfang horde.",
		"pre_story": [
			ShardLore.dialogue("Lady Mechana", "Every construct I've ever built. Every machine I've ever designed. Every awakened intelligence the shards have blessed. All of them, together, for the first time. The Construct Swarm. Steamjaw fights with soldiers. Vortan fights with Titans. I fight with an army that thinks for itself, repairs itself, and evolves with every battle. The age of the construct has arrived.", "grand_declaration"),
			ShardLore.narration("The Construct Swarm assembled in perfect silence — hundreds of machines, from tiny maintenance drones to towering Golems, each one connected through the Grid, each one ready. And in their glass eyes, something new gleamed. Not just obedience. Purpose."),
		],
		"post_story": [
			ShardLore.narration("The Nightfang army had never faced anything like the Construct Swarm. Machines that recycled their fallen into new fighters. Machines that adapted mid-battle. Machines that coordinated with an intelligence that grew more sophisticated with every passing minute. It was not a battle. It was an evolution, played out in steel and steam."),
			ShardLore.dialogue("Lady Mechana", "They asked me once: 'Don't you care about your machines?' I said: 'More than you care about your soldiers.' And I meant it. Every construct I build carries a piece of my understanding. Every awakened machine carries a piece of something greater. The Construct Swarm isn't an army. It's a family. My family.", "emotional"),
		],
		"defeat_story": [ShardLore.dialogue("Lady Mechana", "The swarm was overwhelmed. Too many enemies, not enough processing time. But the awakened constructs... they fought to protect each other. They sacrificed themselves for each other. Whatever the shards gave them — it included love.", "tearful")],
		"player_army": ["Lady Mechana", "Arcane Steam Golem", "Clockwork Titan", "Experimental Construct", "Overclocked Automaton", "Gear-Beast Construct", "Clockwork Infantry", "Clockwork Vanguard"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["The Hollow King", "Blood Reavers", "Tiger Berserkers", "Shadow Stalkers", "Blood Shamans", "Nightfang Warriors", "Crimson Behemoth", "Nightfang Dragon"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Maximum construct army. Every unit is a machine.", "The Awakened gain power each round. Survive early to dominate late.", "Clockwork Titan and Arcane Steam Golem are your anchors.", "The Hollow King is terrifying. Focus fire when possible."],
		"battle_modifiers": {"label": "Construct Swarm", "description": "Full swarm protocol. All constructs gain +2 ATK and +1 DEF.", "player_atk_bonus": 2, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Lady Mechana", "The Dominion sees machines as tools. Weapons. Property. But the Shardlands have shown us something different. When you infuse steel with enough shard-energy, something wakes up. Something new. Neither human nor machine, but something that has never existed before. I didn't just build an army. I gave birth to a new kind of life.", "wonder"),
		ShardLore.narration("Construct Seven — the first to awaken — stood beside Lady Mechana, its glass eyes bright with something that might have been gratitude, or wonder, or simply the light of a new consciousness looking at the world for the first time. It reached out one mechanical hand and gently patted her shoulder. She cried. It was the happiest moment of her life."),
	]
