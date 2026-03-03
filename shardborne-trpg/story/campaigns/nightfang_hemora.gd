class_name NightfangHemoraCampaign
## Lady Hemora — "The Blood Garden"
## Blood rituals, Healing, CMD 9. Dark healer, blood medicine.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_hemora",
		"commander": "Lady Hemora",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Blood Garden",
		"description": "Lady Hemora is the Nightfang's greatest healer — her blood rituals can mend wounds that would kill lesser beings. Her garden grows things that should not grow, fed by blood that should not flow.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Lady Hemora", "Blood is not just sustenance. It is medicine. It is memory. It is the thread that connects all living things. I am a healer — the only healer in the Nightfang Dominion. Lord Sanguinar thinks healing is weakness. I think surviving is the ultimate strength.", "gentle_but_firm"),
		ShardLore.narration("Her garden was impossible — crimson flowers blooming in eternal twilight, vines that pulsed with stolen heartbeats, soil dark with ancient blood. Lady Hemora moved through it with the care of a surgeon and the love of a mother."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Triage",
		"objectives_text": "Rescue wounded Nightfang soldiers from the battlefield. Heal them. Save them.",
		"pre_story": [ShardLore.dialogue("Lady Hemora", "The wounded are scattered across the field. Sanguinar has already moved on — he considers the injured unworthy. I do not. Every life has value. Every soldier can be healed, restored, made whole again. My blood rituals require proximity. I need to reach them.", "urgent")],
		"post_story": [ShardLore.dialogue("Lady Hemora", "Forty-seven wounded recovered. Thirty-nine healed to combat readiness. Eight in critical condition but stable. Sanguinar will scoff. Let him. I saved forty-seven soldiers he was willing to abandon. They remember that.", "defiant")],
		"defeat_story": [ShardLore.dialogue("Lady Hemora", "I couldn't reach them all. Some died while I was fighting instead of healing. The cruelest irony of war — the healer must kill to save.", "anguished")],
		"player_army": ["Lady Hemora", "Blood Shamans", "Blood Collectors", "Crimson Chanters", "Nightfang Warriors", "Bloodsworn Templars"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Masked Lord Kurohane", "Veiled Ashigaru", "Inkblade Initiates"],
		"battle_size": "skirmish",
		"scenario": "supply_lines",
		"round_limit": 6,
		"tutorial_tips": ["Lady Hemora heals adjacent allies. Position her centrally.", "Blood Shamans provide additional healing. Double up on wounded units.", "Supply Lines — reach each 'wounded soldier' (supply point) to heal them."],
		"battle_modifiers": {"label": "Triage Protocol", "description": "Healing energy flows. All units regenerate +1 HP per round.", "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Blood Harvest",
		"objectives_text": "Collect shard-infused blood samples from the battlefield. Hemora needs them for new medicines.",
		"pre_story": [ShardLore.dialogue("Lady Hemora", "The shard energy changes blood. Makes it... more. More potent, more responsive, more alive. If I can collect enough samples, I can develop treatments for conditions we've never been able to cure. Corruption sickness. Fragment poisoning. Even age. But I need the samples fresh. The Blood Collectors will gather while the warriors protect them.", "scientific_passion")],
		"post_story": [ShardLore.dialogue("Lady Hemora", "Seventeen distinct blood-shard variants collected. Each one a potential breakthrough. The garden will bloom with new medicines by week's end. Lord Sanguinar sees blood as food. I see it as the key to immortality — REAL immortality, not the cursed half-life we endure.", "hope")],
		"defeat_story": [ShardLore.dialogue("Lady Hemora", "The samples were corrupted in the fighting. Contaminated. I'll need to start over with a fresh collection.", "heartbroken")],
		"player_army": ["Lady Hemora", "Blood Shamans", "Blood Collectors", "Blood Reavers", "Plague Apothecaries", "Fang Guard"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Thread-Cutter Nyx", "Gossamer Guard", "Silk-Warden Regulars", "Spiderling Swarm", "Gossamer Trap Layers"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Shard Clash — collect fragments (blood samples).", "Blood Collectors are fragile but fast. Use them to gather.", "Hemora heals anyone who takes damage during collection."],
		"battle_modifiers": {"label": "Blood Harvest", "description": "Hemora's rituals empower. All units gain +1 ATK from blood magic.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Cure",
		"objectives_text": "A corruption plague threatens the Nightfang camp. Hemora must fight through to deliver the cure.",
		"pre_story": [ShardLore.dialogue("Lady Hemora", "The corruption plague is spreading through the camp — even vampires aren't immune when the corruption reaches critical levels. I've synthesized an antidote from shard-blood, but I need to reach the quarantine zone to administer it. The Iron Dominion is between me and my patients. They will move, or I will move them.", "fierce_determination")],
		"post_story": [
			ShardLore.narration("Lady Hemora burst into the quarantine zone, her antidote vials intact, her escort battered but alive. She administered the cure to two hundred plague victims in three hours, her hands never shaking, her blood rituals flowing with practiced grace."),
			ShardLore.dialogue("Lady Hemora", "All patients stable. The cure works. The corruption plague can be treated. Sanguinar will call this a waste of resources. I call it saving our people. Let history judge which matters more.", "exhausted_but_triumphant"),
		],
		"defeat_story": [ShardLore.dialogue("Lady Hemora", "I can't reach the quarantine zone. People are dying while I fight. This is unacceptable. I need another route.", "desperate")],
		"player_army": ["Lady Hemora", "Bloodsworn Templars", "Blood Shamans", "Plague Doctor", "Crimson Chanters", "Nightfang Warriors", "Blood Reavers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Captain Ironclad", "Infantry Regiment", "Steam Heavy Guards", "Clockwork Infantry", "Steam Sentinels", "Mechanized Scouts"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Hemora must reach the far supply point (quarantine zone).", "Plague Doctor can purge corruption from infected allies.", "Bloodsworn Templars are tanky enough to escort Hemora."],
		"battle_modifiers": {"label": "Desperate Medicine", "description": "Hemora's healing is amplified. All units regenerate HP.", "player_def_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Blood Garden",
		"objectives_text": "Defend Hemora's garden — the source of all her medicines — against a massive Emberclaw assault.",
		"pre_story": [
			ShardLore.dialogue("Lady Hemora", "They're coming for the garden. Of course they are. The Emberclaw see it as an abomination — blood-fed plants, corruption-resistant medicines, all of it 'unnatural.' They want to burn it. Everything I've built. Everything I've grown. Every life-saving medicine in the Nightfang Dominion, grown in this soil, fed by this blood. They. Will. Not. Touch. My. Garden.", "cold_rage"),
			ShardLore.narration("For the first time, Lady Hemora picked up a weapon — not to heal, but to kill. Not for territory or politics or hunger, but for the only thing she truly loved: the garden that saved every life she could reach."),
		],
		"post_story": [
			ShardLore.narration("The garden survived. Its crimson flowers still bloomed, its blood-vines still pulsed, its soil still dark with ancient vitality. Lady Hemora walked through the rows, checking each plant, murmuring to them, her hands still trembling from battle."),
			ShardLore.dialogue("Lady Hemora", "They call me the Blood Gardener. They mean it as an insult. But what is a garden if not life sustained through sacrifice? Blood feeds the soil. The soil grows the medicine. The medicine saves the living. It is a cycle. A beautiful, terrible, necessary cycle. And I will protect it with everything I am.", "passionate"),
		],
		"defeat_story": [ShardLore.dialogue("Lady Hemora", "The garden burns. Years of work. Thousands of potential cures. Gone. I will regrow it. I will ALWAYS regrow it. Fire kills flowers, but it cannot kill roots.", "grieving_but_resolute")],
		"player_army": ["Lady Hemora", "Blood Shamans", "Bloodsworn Templars", "Fang Guard", "Nightfang Warriors", "Blood Reavers", "Blood Champion", "Crimson Behemoth"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Pyroclaw Drenna", "Emberforged Blades", "Unbonded Berserkers", "Emberclaw Warriors", "Mature War Drake", "Grounded Wyrm", "Ashrider Scouts", "Ashrider Scouts"],
		"battle_size": "epic",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Defend the garden (center). Hemora heals from there.", "Crimson Behemoth is your wall — place it between enemies and the garden.", "Blood Shamans provide constant healing to damaged defenders.", "Pyroclaw Drenna's fire is devastating. Neutralize her quickly."],
		"battle_modifiers": {"label": "The Blood Garden", "description": "Garden's power sustains. All units gain +2 DEF and heal each round.", "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Lady Hemora", "Sanguinar destroys. Voraxis hunts. Nyxara manipulates. I heal. In a dominion of predators, I am the one who puts them back together afterward. They think this makes me weak. But when they're bleeding, broken, dying — who do they call for? Not the predator. Not the politician. The healer. Always the healer.", "serene"),
		ShardLore.narration("Lady Hemora returned to her garden, washed the blood from her hands, and began tending the new seedlings — each one a potential cure, each one watered with sacrifice, each one proof that even in the darkest dominion, something can grow."),
	]
