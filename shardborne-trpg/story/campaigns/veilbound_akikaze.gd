class_name VeilboundAkikazeCampaign
## Ritual Cpt Akikaze — "The Autumn Wind"
## Ritual Flow support. ATK 15, DEF 3, HP 27, MOV 5, CMD 10.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_akikaze",
		"commander": "Ritual Cpt Akikaze",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "The Autumn Wind",
		"description": "Ritual Captain Akikaze channels Ritual Flow like autumn wind — invisible, pervasive, and capable of scattering armies like fallen leaves.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Ritual Cpt Akikaze", "Ritual Flow is not magic. It is WEATHER. It moves through the spirit world like wind moves through the physical — touching everything, changing everything, invisible but irresistible. I am a wind-reader, a flow-shaper, a ritual conductor who turns the invisible currents of the Veil into weapons, shields, and blessings. The autumn wind is gentle. But the autumn wind also topples ancient trees.", "mystical"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Wind Reading",
		"objectives_text": "Use Ritual Flow to amplify the army's stance discipline against an Emberclaw assault.",
		"pre_story": [ShardLore.dialogue("Ritual Cpt Akikaze", "The Flow currents here are strong — I can feel them pressing against the Veil like wind against a sail. Flow Adepts will channel these currents into our warriors, amplifying their stances. Every stance gains power. Every defense strengthens. Every strike finds its mark with Flow precision. The Emberclaw bring fire. I bring the wind that shapes fire into something useful.", "serene")],
		"post_story": [ShardLore.dialogue("Ritual Cpt Akikaze", "The Flow amplification exceeded expectations. Our warriors fought as though guided by unseen hands — because they WERE. Every stance shift, every defensive brace, every counter-strike was enhanced by the current. The Emberclaw didn't fight an army. They fought an army PLUS the wind. And the wind is everywhere.", "pleased")],
		"defeat_story": [ShardLore.dialogue("Ritual Cpt Akikaze", "The Flow currents shifted mid-battle. An anomaly — perhaps a Shard disruption. Without stable currents, my rituals lost coherence.", "troubled")],
		"player_army": ["Ritual Cpt Akikaze", "Flow Adepts", "Ritual Captains", "Starblade Samurai", "Lotus Ascetics"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Flameheart Syrax", "Emberclaw Warriors", "Emberforged Blades", "Pyromancer Adepts"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["Akikaze amplifies Flow for the entire army.", "Flow Adepts channel rituals — position them centrally.", "Ritual Captains create Flow Nexus zones of power.", "Starblade Samurai and Lotus Ascetics benefit from stance amplification.", "Flow support makes your army fight above its weight class."],
		"battle_modifiers": {"label": "Wind Reading", "description": "Flow amplification. All units gain +1 ATK, +1 DEF.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Ritual Storm",
		"objectives_text": "Channel a massive Ritual Flow surge to disrupt Iron Dominion mechanized operations.",
		"pre_story": [ShardLore.dialogue("Ritual Cpt Akikaze", "The Iron Dominion relies on precision — calibrated machines, measured responses, calculated outcomes. Ritual Flow is the opposite of precision. It is wild, organic, unpredictable. Today I channel a Flow storm that will disrupt every calibration, every calculation, every machine in their formation. The autumn wind doesn't attack machines. It rusts them. It corrodes the connections between gears. It inserts chaos into order. And I am very good at chaos.", "anticipation")],
		"post_story": [ShardLore.dialogue("Ritual Cpt Akikaze", "Their machines stuttered. Their calculations failed. Their grid flickered and produced errors. All because of invisible currents that their sensors couldn't even detect. The Iron Dominion measures the physical world with exquisite precision. But Ritual Flow exists in the SPIRITUAL world — a realm their instruments cannot touch. I didn't fight their army. I fought their REALITY. And reality bent.", "satisfaction")],
		"defeat_story": [ShardLore.dialogue("Ritual Cpt Akikaze", "They adapted. Shielded their critical systems against spiritual interference. The wind cannot reach what is truly sealed.", "respectful")],
		"player_army": ["Ritual Cpt Akikaze", "Flow Adepts", "Ritual Captains", "Starblade Samurai", "Temple Defenders", "Ink Sigil Crafters", "Shrine Artificers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Archmagister Gearbane", "Clockwork Infantry", "Mechanized Scouts", "Steam Heavy Guards", "Gearwright Artillery", "Clockwork Cavalry"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Ritual storm disrupts enemy operations.", "Ink Sigil Crafters apply Sigil of Weakness to key targets.", "Shrine Artificers construct Spirit Walls for defense.", "Flow Adepts amplify all nearby ritual effects.", "Disrupt their machines, then strike with empowered warriors."],
		"battle_modifiers": {"label": "The Ritual Storm", "description": "Flow disruption aura. All units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Leaves on the Wind",
		"objectives_text": "Use Flow manipulation to turn a Nightfang corruption wave back upon itself.",
		"pre_story": [ShardLore.dialogue("Ritual Cpt Akikaze", "The Nightfang corruption spreads by corrupting the spiritual substrate — the same substrate that carries Ritual Flow. They think this gives them an advantage. They are wrong. Because I don't just USE Flow — I REDIRECT it. Their corruption rides the spiritual currents? Then I change the currents. I turn their own corruption back upon them like leaves caught in a sudden wind reversal. The autumn wind is not cruel. But it is absolute.", "calm_power")],
		"post_story": [ShardLore.dialogue("Ritual Cpt Akikaze", "Their corruption wave hit a Flow wall and scattered — shards of dark energy flying back into their own lines. The Nightfang do not expect their weapons to be turned against them. Corruption is a one-directional weapon in their experience. Mine is broader. In the wind, NOTHING moves in only one direction.", "triumphant")],
		"defeat_story": [ShardLore.dialogue("Ritual Cpt Akikaze", "The corruption was too concentrated. My Flow redirection couldn't handle the volume. Like trying to redirect a river with a fan.", "humbled")],
		"player_army": ["Ritual Cpt Akikaze", "Flow Adepts", "Ritual Captains", "Lotus Ascetics", "Temple Defenders", "Veilbound Sigil Bearers", "Spirit Healer Monks"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["The Crimson Prophet", "Corruption Spreaders", "Blood Reavers", "Corrupted Militia", "Plague Horde", "Corruption Guard"],
		"battle_size": "standard",
		"scenario": "shardstorm",
		"round_limit": 7,
		"tutorial_tips": ["Flow redirection — use Flow to counter corruption.", "Spirit Healer Monks cleanse corruption from allies.", "Veilbound Sigil Bearers apply Terror Aura to discourage approach.", "Lotus Ascetics adapt to changing Flow conditions.", "Focus on controlling the spiritual battlefield, not just the physical."],
		"battle_modifiers": {"label": "Leaves on the Wind", "description": "Flow reversal. All units gain +1 DEF, corruption resistance.", "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Autumn Wind",
		"objectives_text": "Channel the full power of Ritual Flow in a definitive spiritual battle.",
		"pre_story": [
			ShardLore.dialogue("Ritual Cpt Akikaze", "Every ritual I've ever conducted was practice for this moment. The Flow convergence at the Shard Nexus is the strongest spiritual current in the Shardlands. I will channel it — ALL of it — into one final ritual that transforms the entire battlefield into a wind-temple. Every warrior empowered. Every stance amplified. Every strike guided by the autumn wind. This is not a battle. This is a CEREMONY. And I am its conductor.", "transcendent"),
			ShardLore.narration("The Shard Nexus hummed with invisible power. Ritual Captain Akikaze stood at its center, arms raised, Flow currents swirling around her like visible wind. The Lotus Ascendant Monolith pulsed with sympathetic energy. Flow Adepts knelt in concentric circles, channeling their combined power through Akikaze's ritual framework. The air itself became a weapon."),
		],
		"post_story": [
			ShardLore.narration("The Battle of the Autumn Wind was recorded not as a military engagement but as a spiritual event. Witnesses described the air itself fighting — winds that struck like blades, currents that guided arrows, gusts that deflected enemy charges. At the center, Akikaze conducted the chaos like a musician conducting a storm-orchestra."),
			ShardLore.dialogue("Ritual Cpt Akikaze", "The wind has no beginning and no end. It was here before us and will remain after us. I am merely the one who listens to it, shapes it, and lets it FLOW through the world. The autumn wind scatters leaves — but it also carries seeds. What I scattered today was not destruction. It was CHANGE. The Shardlands will feel this wind for a long time. And the Shogunate will grow in its wake.", "peaceful_power"),
		],
		"defeat_story": [ShardLore.dialogue("Ritual Cpt Akikaze", "The Flow convergence was disrupted. A Shard fractured the nexus point and the currents scattered. I could not hold the ritual together. The wind... stopped. And without the wind, I am just a woman with a scroll.", "hollow")],
		"player_army": ["Ritual Cpt Akikaze", "Flow Adepts", "Ritual Captains", "Lotus Ascetics", "Starblade Samurai", "Shrine Artificers", "Spirit Healer Monks", "Lotus Ascendant Monolith", "Spirit Temple Walker"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Loom-Mother Silivex", "Fate-Thread Weavers", "Reality Weavers", "Thread-Warden Infantry", "Gossamer Guard", "Silk-Shot Skirmishers", "Fate-Loom Siege Engine", "Fate-Loom Engine"],
		"battle_size": "epic",
		"scenario": "shard_clash",
		"round_limit": 8,
		"tutorial_tips": ["Full Ritual Flow battle. Spiritual power amplifies everything.", "Lotus Ascendant Monolith is your Flow beacon — protect it.", "Spirit Temple Walker provides healing and Flow amplification.", "Ritual Captains create overlapping zones of power.", "This is Flow vs Fate — spiritual winds against woven destiny.", "Starblade Samurai are your empowered strike force."],
		"battle_modifiers": {"label": "The Autumn Wind", "description": "Full Flow convergence. All units gain +2 ATK, +1 DEF.", "player_atk_bonus": 2, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Ritual Cpt Akikaze", "The autumn wind carries the last warmth of summer and the first cold of winter. It is the season of change — and I am its captain. Ritual Flow shaped the Veil for ten thousand years before me, and it will flow for ten thousand years after. I am merely the one who taught it to fight. The wind remembers.", "final"),
	]
