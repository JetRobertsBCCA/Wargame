class_name IronDominionAetherisCampaign
## Lady Aetheris — "The Aether Weave"
## Aether technology, Ranged support. Fragment-enhanced ranged warfare.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_aetheris",
		"commander": "Lady Aetheris",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Aether Weave",
		"description": "Lady Aetheris commands the Dominion's aether-ranged divisions. She believes shard energy can be woven into new frequencies — if only she had enough fragments to experiment with.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Lady Aetheris", "Conventional ranged weapons fire projectiles. Primitive. Aether weapons fire concentrated reality. Every shot I design doesn't just damage the target — it rewrites the local physics around it. The question isn't 'how much damage?' The question is 'how much reality do you want to erase?'", "intellectual"),
		ShardLore.narration("Lady Aetheris carried no visible weapons. She didn't need to. The aether field around her crackled with potential energy, bending the light into rainbow fractures. She WAS the weapon."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Long-Range Engagement",
		"objectives_text": "Establish fire superiority. Destroy the Emberclaw raiding column before they close range.",
		"pre_story": [ShardLore.dialogue("Lady Aetheris", "Emberclaw forces detected at maximum range. They're fast — built for closing distance. We need to destroy them before they reach us. Marksmen, Sharpshooters — staggered firing lines. Aether Blasters on the flanks. Give them nothing but death from a distance they can't cross.", "tactical")],
		"post_story": [ShardLore.dialogue("Lady Aetheris", "They never got within a hundred yards. Perfect. War should be clinical, precise, and concluded before the enemy can respond. Anything else is just theater.", "cold_satisfaction")],
		"defeat_story": [ShardLore.dialogue("Lady Aetheris", "They closed faster than projected. Our firing solutions couldn't compensate. I need better predictive algorithms.", "analytical")],
		"player_army": ["Lady Aetheris", "Steam-Powered Sharpshooters", "Aether Marksmen", "Arcane Steam Marksmen", "Aether Blasters"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberforged Blades", "Emberclaw Warriors", "Unbonded Berserkers", "Ashrider Scouts"],
		"battle_size": "skirmish",
		"scenario": "supply_lines",
		"round_limit": 6,
		"tutorial_tips": ["This is a ranged-focused army. Maintain distance from the enemy.", "Aether Blasters are artillery — extreme range but slow to reposition.", "Lady Aetheris enhances nearby ranged units. Keep the formation tight."],
		"battle_modifiers": {"label": "Aether Superiority", "description": "Enhanced targeting. All units gain +2 ATK at range.", "player_atk_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Fragment Frequency",
		"objectives_text": "Capture shard fragments while defending the aether resonance array.",
		"pre_story": [ShardLore.dialogue("Lady Aetheris", "These fragments vibrate at a frequency I've never encountered. If I can tune the resonance array to match, we can amplify our aether weapons by an order of magnitude. Standard fragment collection protocol — secure the shards, protect the array, and keep the Nightfang away from both.", "excited")],
		"post_story": [ShardLore.dialogue("Lady Aetheris", "Frequency captured. Resonance array calibrated. Our aether weapons are now operating at 340% baseline efficiency. The fragments aren't just power sources — they're frequency modulators. This changes everything about aether theory.", "breakthrough")],
		"defeat_story": [ShardLore.dialogue("Lady Aetheris", "The array was damaged before calibration completed. Partial data recovered, but the frequency remains imprecise.", "disappointed")],
		"player_army": ["Lady Aetheris", "Aether Marksmen", "Aether Engineers", "Steam-Powered Sharpshooters", "Infantry Regiment", "Mechanized Scouts"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Hisame", "Moonlit Duelists", "Veiled Ashigaru", "Lunar Kitsune Riders", "Shadow Marksmen", "Flow Adepts"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Shard Clash — collect fragments while fighting.", "Aether Engineers boost fragment collection efficiency.", "Mechanized Scouts can grab distant fragments quickly."],
		"battle_modifiers": {"label": "Fragment Frequency", "description": "Resonance amplification. +1 ATK to all ranged units.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Aether Cannon",
		"objectives_text": "Deploy the Aether Cannon Walker and field-test the new frequency-tuned ammunition.",
		"pre_story": [ShardLore.dialogue("Lady Aetheris", "The Aether Cannon Walker has been retrofitted with frequency-tuned ammunition. In theory, each shot will resonate with the shard-energy in the target area, creating a cascading disruption effect. In practice... well. That's why we're testing it. Against the Thornweft, specifically — their web-structures are saturated with shard-energy. Perfect targets.", "scientific_anticipation")],
		"post_story": [
			ShardLore.narration("The first shot from the upgraded Aether Cannon Walker didn't just hit its target — it sang. A high, keening note that shattered crystal, dissolved web-silk, and made the ground itself vibrate in sympathy. The cascading disruption effect propagated through the shard-saturated terrain for three hundred yards in every direction."),
			ShardLore.dialogue("Lady Aetheris", "Results exceed all projections. The frequency-tuned ammunition creates a harmonic disruption field that propagates through any shard-enhanced material. We haven't just built a weapon. We've built a new kind of physics.", "awed"),
		],
		"defeat_story": [ShardLore.dialogue("Lady Aetheris", "The cascading effect was unpredictable. Some shots amplified too far, damaging our own positions. I need better containment protocols.", "concerned")],
		"player_army": ["Lady Aetheris", "Aether Cannon Walker", "Aether Marksmen", "Arcane Steam Marksmen", "Steam-Powered Sharpshooters", "Gearwright Engineers", "Clockwork Infantry"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Thread-Seer Kythara", "Gossamer Guard", "Silk-Warden Regulars", "Web-Anchor Engineers", "Brood-Mother Spider", "Cocoon Wardens"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["The Aether Cannon Walker is your heavy hitter. Protect it with infantry.", "Keep Gearwright Engineers adjacent for repairs.", "Frequency-tuned shots deal bonus damage to shard-enhanced enemies."],
		"battle_modifiers": {"label": "Frequency Tuning", "description": "Harmonic disruption. All ranged attacks gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Aether Weave",
		"objectives_text": "Activate the full aether weapons array. Destroy the Nightfang army through pure ranged supremacy.",
		"pre_story": [
			ShardLore.dialogue("Lady Aetheris", "Every aether weapon in the Dominion arsenal, tuned to the shard-frequency, linked through the resonance array, firing in coordinated sequence. The Aether Weave — a network of ranged fire so dense that nothing survives within its kill zone. Not vampires, not behemoths, not dragons. Nothing.", "clinical"),
			ShardLore.narration("The air itself began to hum. Every aether weapon in Lady Aetheris's command was charging, the blue-white glow of concentrated reality painting the battlefield in stark, beautiful light. The Nightfang army advanced into a killing field the likes of which the Shardlands had never seen."),
		],
		"post_story": [
			ShardLore.narration("The Aether Weave was beautiful and terrible. Coherent beams of reality-warping energy crisscrossed the battlefield, each one precisely calibrated, each one lethal. The Nightfang died in light — clean, surgical, absolute."),
			ShardLore.dialogue("Lady Aetheris", "War without waste. Destruction without chaos. Every shot placed, every beam calibrated, every death a mathematical certainty. This is what the Iron Dominion should be — not crude machines smashing crude enemies, but precision elevated to an art form. The Aether Weave is that art.", "reverent"),
		],
		"defeat_story": [ShardLore.dialogue("Lady Aetheris", "The Weave overloaded. Too many weapons, too much resonance, too little control. I pushed the physics too far. Even I have limits, it seems.", "humbled")],
		"player_army": ["Lady Aetheris", "Aether Cannon Walker", "Aether Blasters", "Aether Marksmen", "Arcane Steam Marksmen", "Steam-Powered Sharpshooters", "Gearwright Artillery", "Aether Engineers"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Countess Nyxara", "Blood Reavers", "Tiger Berserkers", "Shadow Stalkers", "Blood Shamans", "Crimson Behemoth", "Feral Skinchanger", "Nightfang Dragon"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Maximum ranged firepower. Keep the enemy at distance.", "The Aether Weave army has weak melee — don't let enemies close.", "Gearwright Artillery provides indirect fire over obstacles.", "Countess Nyxara is fast and deadly. Focus fire on her early."],
		"battle_modifiers": {"label": "The Aether Weave", "description": "Full resonance network active. All units gain +3 ATK.", "player_atk_bonus": 3},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Lady Aetheris", "The other commanders build machines that walk and fight. I build machines that think and aim. General Steamjaw calls it 'hiding behind your guns.' I call it 'winning before the enemy reaches you.' Which philosophy do you think Lord Calculon prefers?", "wry"),
		ShardLore.narration("She turned back to her resonance array, already designing the next generation of aether weapons. In the distance, the battlefield glowed faintly blue — the residual energy of the Aether Weave, slowly fading. Lady Aetheris smiled. The glow would last for days. A reminder of what precision could achieve."),
	]
