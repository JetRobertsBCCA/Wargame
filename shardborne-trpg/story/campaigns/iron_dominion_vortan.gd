class_name IronDominionVortanCampaign
## High Engineer Vortan — "The Machine Ascendant"
## War machine specialist, Repairs. Engineering/heavy metal campaign.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_vortan",
		"commander": "High Engineer Vortan",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Machine Ascendant",
		"description": "High Engineer Vortan builds the biggest, most powerful war machines in the Dominion. In the Shardlands, he has new materials and no safety regulations.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("High Engineer Vortan", "The Titan Engine Imperius was my masterwork. Three years to design, two years to build, one year to calibrate. It survived the transit intact. The ONLY thing that survived intact. This tells me something: my engineering is better than reality-shattering catastrophe. I find this satisfying.", "smug"),
		ShardLore.fhah_zolg("The toymaker. He builds bigger and bigger machines, each one more impressive than the last, never asking who the machines are ultimately fighting for. Me. They're fighting for me."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Field Test",
		"objectives_text": "Deploy the Overclocked Automaton for its first field test. Prove it works.",
		"pre_story": [ShardLore.dialogue("High Engineer Vortan", "The Automaton is ready. Theoretical performance: excellent. Actual performance: unknown. That's why we field test. If it works, the Dominion gains a new weapon. If it doesn't, I learn something valuable about failure modes.", "scientific")],
		"post_story": [ShardLore.dialogue("High Engineer Vortan", "Automaton performed at 94% theoretical efficiency. Six minor issues identified, two critical ones. I'll have fixes in by morning. The core design is sound. We can build more.", "pleased")],
		"defeat_story": [ShardLore.dialogue("High Engineer Vortan", "The Automaton overheated and shut down. Critical failure in the cooling system. Fixable, but embarrassing.", "embarrassed")],
		"player_army": ["High Engineer Vortan", "Overclocked Automaton", "Gearwright Engineers", "Infantry Regiment", "Clockwork Infantry"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberclaw Warriors", "Emberforged Blades", "Ashrider Scouts"],
		"battle_size": "skirmish",
		"scenario": "shardstorm",
		"round_limit": 6,
		"tutorial_tips": ["The Overclocked Automaton has Double Strike but can Overheat. Manage it.", "Gearwright Engineers repair war machines. Keep them adjacent to the Automaton.", "Vortan's Repairs special lets him fix damage mid-battle."],
		"battle_modifiers": {"label": "Field Test", "description": "Vortan monitors performance. The Automaton gains +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Assembly Line",
		"objectives_text": "Defend the mobile foundry while Vortan constructs a Clockwork Titan from salvaged parts.",
		"pre_story": [ShardLore.dialogue("High Engineer Vortan", "Enough salvage from three battles to build a Titan. I need six hours and no interruptions. The foundry has its own forge, its own assembly gantry, its own quality control. Everything I need except peace and quiet. Provides those.", "demanding")],
		"post_story": [
			ShardLore.narration("The Clockwork Titan rose from the assembly gantry — thirty feet of shard-steel and steam-powered servos, its central gear-heart thrumming with power. Vortan circled it with a critical eye, tightened three bolts, and nodded."),
			ShardLore.dialogue("High Engineer Vortan", "Mark VII Clockwork Titan. Shard-steel chassis, steam-hydraulic actuators, fragment-enhanced sensory array. Superior to the Mark VI in every measurable dimension. My best work. So far.", "creative_satisfaction"),
		],
		"defeat_story": [ShardLore.dialogue("High Engineer Vortan", "The foundry was damaged. Assembly interrupted at 73% completion. I need to restart from the torso-mount stage.", "frustrated")],
		"player_army": ["High Engineer Vortan", "Gearwright Engineers", "Overclocked Engineers", "Steam Sentinels", "Clockwork Infantry", "Clockwork Pioneers"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Asagiri", "Starblade Samurai", "Shrine Wardens", "Star Serpent Lancers", "Dreampiercer Archers", "Banner of Silent Prayer"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Last Stand: protect the foundry (center) for all rounds.", "Overclocked Engineers have Rapid Repair. Use them to fix damaged defenses.", "Clockwork Pioneers can build barricades around the foundry perimeter."],
		"battle_modifiers": {"label": "Assembly Line", "description": "Vortan's foundry energizes the area. All units gain +1 DEF.", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Titan Walk",
		"objectives_text": "Deploy the full war machine column. Crush the Thornweft fortified position.",
		"pre_story": [ShardLore.dialogue("High Engineer Vortan", "Three Titans, two Colossi, and a Gargoyle. The most concentrated war machine force the Dominion has ever fielded. The spider-folk's web-fortress is impressive engineering — for organic technology. Let's show them what REAL engineering looks like.", "confident")],
		"post_story": [ShardLore.dialogue("High Engineer Vortan", "Web-fortress reduced to mulch. All war machines operational. The Clockwork Titan Mark VII exceeded specifications by twelve percent. I am... extremely pleased. The machines are the future. Everything else is just organic lag.", "triumphant")],
		"defeat_story": [ShardLore.dialogue("High Engineer Vortan", "The web-fortress adapted to our assault pattern. Organic engineering that learns from experience. Fascinating. Terrifying, but fascinating.", "grudging_respect")],
		"player_army": ["High Engineer Vortan", "Clockwork Titan", "Steam Colossus", "Steam Gargoyle", "Gearwright Engineers", "Overclocked Engineers", "Infantry Regiment"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Spindle-Knight Varek", "Silk-Warden Regulars", "Gossamer Guard", "Brood-Mother Spider", "Web-Anchor Engineers", "Cocoon Wardens"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Your war machines are your primary weapons. Everything else supports them.", "Gearwright Engineers MUST stay adjacent to war machines for repairs.", "The Steam Gargoyle can fly over web terrain. Use it to strike from behind."],
		"battle_modifiers": {"label": "Titan Commander", "description": "Vortan enhances all war machines. They gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Machine Ascendant",
		"objectives_text": "Deploy the Titan Engine Imperius — the ultimate war machine — against the massed Nightfang horde.",
		"pre_story": [ShardLore.dialogue("High Engineer Vortan", "The Imperius walks. Sixty feet tall, twin cannons, reactor core, supreme Grid integration. It is the pinnacle of everything the Iron Dominion has ever built. Today, it fights for the first time. And the Nightfang horde — every blood-drinker, every beast, every horror they can muster — will learn what it means to face the Machine Ascendant.", "reverent")],
		"post_story": [
			ShardLore.narration("The Titan Engine Imperius strode across the battlefield like a god of metal. Its twin cannons obliterated formations. Its footsteps cratered the ground. Its reactor core blazed with enough power to light a city."),
			ShardLore.narration("The Nightfang horde scattered. Not from fear — from mathematics. Nothing in their arsenal could damage the Imperius. Nothing in anyone's arsenal could. It was, simply and utterly, the most powerful thing in the Shardlands."),
			ShardLore.dialogue("High Engineer Vortan", "The Imperius performed at 103% of theoretical maximum. That should be impossible. The shard-energy in the reactor core is enhancing its output beyond design specifications. The machine is... growing. Adapting. Becoming more than I built it to be. This is either the greatest achievement in engineering history or the beginning of something I can't control.", "awed_and_worried"),
		],
		"defeat_story": [ShardLore.dialogue("High Engineer Vortan", "The Imperius took damage to the reactor core. Emergency shutdown. If the core had breached... I don't want to think about that. It needs repairs. Major repairs.", "shaken")],
		"player_army": ["High Engineer Vortan", "Titan Engine Imperius", "Clockwork Titan", "Gearwright Engineers", "Overclocked Engineers", "Steam Sentinels", "Infantry Regiment", "Aether Blasters"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Lord Sanguinar", "Blood Reavers", "Tiger Berserkers", "Nightfang Warriors", "Shadow Stalkers", "Blood Shamans", "Crimson Behemoth", "Nightfang Dragon"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["The Titan Engine Imperius is the most powerful unit in the game. Protect its engineers.", "Twin Cannons devastate at range. Reactor Core powers the Grid.", "Engineers are CRITICAL. If the Imperius takes damage, only they can repair it.", "Lord Sanguinar is dangerous even to the Imperius. Don't underestimate the Blood Patriarch."],
		"battle_modifiers": {"label": "Imperius Protocol", "description": "The ultimate machine walks. All units gain +2 ATK and +2 DEF.", "player_atk_bonus": 2, "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("High Engineer Vortan", "The machines I build are not weapons. They are statements. They say: 'We can build something greater than any of us.' A Titan is not one person's strength — it is a thousand engineers' knowledge, forged into steel. The Machine Ascendant is the Iron Dominion's soul made manifest: order, precision, and the absolute conviction that anything can be built.", "philosophical"),
		ShardLore.narration("Behind him, the Titan Engine Imperius stood silent and magnificent — the greatest machine ever built, waiting patiently for the next battle. Vortan patted its leg — a gesture of affection that looked absurd but felt entirely natural. The machine hummed in response. Just a resonance vibration. Probably."),
	]
