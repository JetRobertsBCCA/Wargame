class_name VeilboundTsuyukusaCampaign
## Cmdr Tsuyukusa — "The Flowing Blade"
## Versatile, Balanced. ATK 15, DEF 4, HP 27, MOV 7, RNG 6, CMD 9.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_tsuyukusa",
		"commander": "Cmdr Tsuyukusa",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "The Flowing Blade",
		"description": "Commander Tsuyukusa is the Shogunate's most versatile officer. ATK 15, DEF 4, RNG 6 — equally skilled at range and in melee, she adapts to any battlefield condition like a dayflower bending with the wind.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Cmdr Tsuyukusa", "Tsuyukusa — the dayflower. It blooms at dawn and closes by noon. Brief, beautiful, perfectly adapted. People mistake adaptability for indecisiveness. They think a commander who does everything does nothing well. They are wrong. The dayflower does not choose between sun and shade — it THRIVES in both. I do not choose between sword and bow, between defense and attack, between caution and aggression. I choose VICTORY, and I use whatever the moment demands to achieve it.", "confident"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Adaptable Edge",
		"objectives_text": "Defeat an Emberclaw raiding force using versatile combined arms.",
		"pre_story": [ShardLore.dialogue("Cmdr Tsuyukusa", "The Emberclaw commit everything to aggression. They charge in flame and fury. Against a specialist, this works — their overwhelming force breaks any single approach. But against ME, they face a problem: I have no approach to break. When they charge, I defend. When they hold, I strike. When they spread, I concentrate. When they mass, I disperse. The dayflower does not resist the wind — she moves WITH it, and when the wind passes, she still stands.", "tactical")],
		"post_story": [ShardLore.dialogue("Cmdr Tsuyukusa", "They charged three times. Each time, I shifted — from ranged defense to melee counterattack to flanking maneuver. They couldn't predict my next move because I didn't HAVE a next move planned. I reacted to what they showed me, and what they showed me was always an opening. Versatility is not weakness. It is the ultimate strength.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Cmdr Tsuyukusa", "Their aggression was so relentless that I never had time to adapt. Adaptation requires a moment of assessment — and they gave me none.", "reflective")],
		"player_army": ["Cmdr Tsuyukusa", "Shrine Wardens", "Dreampiercer Archers", "Spirit Javelin Skirmishers", "Star Serpent Lancers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Embersmith Torvan", "Emberclaw Warriors", "Unbonded Berserkers", "Flameborn Guard", "Fledgling Swarm"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["Tsuyukusa is balanced. Use her at range OR melee.", "Shrine Wardens hold the line while archers fire.", "Spirit Javelin Skirmishers harass at range, then engage.", "Star Serpent Lancers flank when the enemy commits.", "Adapt to what the enemy gives you. Be water."],
		"battle_modifiers": {"label": "The Adaptable Edge", "description": "Versatile tactics. All units gain +1 to their lowest stat.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "All Seasons Warfare",
		"objectives_text": "Break an Iron Dominion defensive position using every tool available.",
		"pre_story": [ShardLore.dialogue("Cmdr Tsuyukusa", "The Dominion fortress is layered defense — artillery outside, infantry walls within, heavy armor at the core. A pure melee force dies to artillery. A pure ranged force can't breach walls. A cavalry charge stalls on fortifications. No SINGLE approach works. But all approaches TOGETHER?" , "grinning"), ShardLore.dialogue("Cmdr Tsuyukusa", "Archers suppress artillery. Infantry engages walls. Cavalry flanks the core. Scouts find gaps. Support heals losses. War machines breach fortifications. Every tool, every role, every capability — used at the right moment, in the right combination. THAT is combined arms. THAT is why versatility wins wars.", "teaching")],
		"post_story": [ShardLore.dialogue("Cmdr Tsuyukusa", "Twelve different unit types, twelve different roles, one unified purpose. The Dominion commander later told me he couldn't figure out my strategy because I didn't have ONE strategy — I had twelve, all happening simultaneously. He couldn't counter all of them because he was designed to counter one type of threat. And I am every type of threat.", "proud")],
		"defeat_story": [ShardLore.dialogue("Cmdr Tsuyukusa", "Their defenses were too well-integrated. Each layer supported every other layer, and my combined arms couldn't isolate any single element. They built an army that was MORE versatile than mine.", "impressed")],
		"player_army": ["Cmdr Tsuyukusa", "Temple Defenders", "Dreampiercer Archers", "Void Bolt Crossbowmen", "Star Serpent Lancers", "Spirit Healer Monks", "Ink Dragon Scouts"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lady Cogsworth", "Clockwork Infantry", "Steam Heavy Guards", "Gearwright Artillery", "Steam Sentinels", "Arcane Steam Golem"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Combined arms assault. Use every unit type cooperatively.", "Dreampiercer Archers suppress enemy artillery first.", "Temple Defenders advance under archer cover.", "Star Serpent Lancers flank once the front is engaged.", "Spirit Healer Monks sustain your advancing infantry.", "Ink Dragon Scouts reveal weak points in defenses."],
		"battle_modifiers": {"label": "All Seasons Warfare", "description": "Combined arms doctrine. Mixed unit types gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Dayflower Gambit",
		"objectives_text": "Outmaneuver Nightfang forces through tactical flexibility.",
		"pre_story": [ShardLore.dialogue("Cmdr Tsuyukusa", "The Nightfang adapt too — but through evolution, through mutation, through becoming something new with each feeding. My adaptation is faster. I don't need to TRANSFORM to change tactics. I simply... CHANGE. The dayflower doesn't become a different plant to face drought — she adjusts. Opens wider, conserves water, shifts toward light. Same flower, infinite responses. The Nightfang commander expects me to fight the same way twice. I never fight the same way ONCE.", "focused")],
		"post_story": [ShardLore.dialogue("Cmdr Tsuyukusa", "I changed formation seven times in seven minutes. Defense, offense, withdrawal, flanking, encirclement, dispersal, concentration. The Nightfang couldn't evolve fast enough to match each shift — by the time they adapted to formation three, I was already on formation six. Speed of adaptation beats depth of adaptation. The dayflower wins not by being the strongest — but by being the first to adjust.", "elated")],
		"defeat_story": [ShardLore.dialogue("Cmdr Tsuyukusa", "They adapted faster than I shifted. Their biological flexibility outpaced my tactical flexibility. When the enemy morphs mid-combat... I need pre-planned responses, not improvisation.", "chastened")],
		"player_army": ["Cmdr Tsuyukusa", "Starblade Samurai", "Kintsugi Blademasters", "Celestial Slingers", "Void Crane Riders", "Flow Adepts", "Spirit Javelin Skirmishers"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Lady Hemora", "Blood Thralls", "Blood Reavers", "Corruption Spreaders", "Blight Hound Pack", "Hunger Priests"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 6,
		"tutorial_tips": ["Flexibility wins. Change tactics every round.", "Starblade Samurai are elite melee — anchor your formations.", "Celestial Slingers provide ranged harassment.", "Void Crane Riders dart in and out for strikes.", "Flow Adepts boost Ritual Flow for tactical options.", "Kintsugi Blademasters become STRONGER when damaged."],
		"battle_modifiers": {"label": "The Dayflower Gambit", "description": "Tactical flexibility. All units gain +1 ATK, +1 DEF.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Bloom and Fade",
		"objectives_text": "Lead a Veilbound combined arms force against a Thornweft army in a decisive engagement.",
		"pre_story": [
			ShardLore.dialogue("Cmdr Tsuyukusa", "The Thornweft Matriarchy sends their full web against us. Fate-threads to predict, web-anchors to entrap, silk-warriors to execute. A comprehensive, integrated force. This is the test I've been preparing for: versatility against totality. The web covers everything. But can it cover everything SIMULTANEOUSLY? Can prediction handle unpredictability? Can entrapment handle constant movement? Can execution handle a target that is everywhere and nowhere?", "serious"),
			ShardLore.narration("Tsuyukusa arranged her army like a garden — each element positioned for maximum synergy, each unit capable of filling multiple roles, the whole formation breathing with organic flexibility. The dayflower blooms. And when the bloom fades, the seeds have already spread."),
		],
		"post_story": [
			ShardLore.narration("The battle became the Shogunate's textbook example of combined arms warfare. Tsuyukusa used every unit in at least three different roles during the engagement — infantry becoming screens, screens becoming flankers, flankers becoming reserves, reserves becoming infantry. The Thornweft web couldn't model an army that refused to have a fixed structure."),
			ShardLore.dialogue("Cmdr Tsuyukusa", "The dayflower blooms at dawn and fades by noon. Brief, beautiful, adapted. Some see the fading as weakness — the flower doesn't last. But they miss the point. The dayflower CHOOSES when to bloom. It doesn't waste energy on permanence. It uses everything on ONE perfect moment of beauty, of effectiveness, of purpose. And in that moment, it is more alive than any eternal fortress could ever be. That is what versatility MEANS. Not doing everything forever. Doing the right thing RIGHT NOW.", "philosophical"),
		],
		"defeat_story": [ShardLore.dialogue("Cmdr Tsuyukusa", "Their web was more versatile than me. The fate-threads predicted my adaptations before I made them. Against an enemy who can see EVERY possible response... versatility becomes predictability. I need to find the response that doesn't exist in their models.", "humbled")],
		"player_army": ["Cmdr Tsuyukusa", "Starblade Samurai", "Oni Mask Executioners", "Dreampiercer Archers", "Shadow Marksmen", "Star Serpent Lancers", "Thunder Kirin Cavalry", "Spirit Healer Monks", "Flow Adepts", "Shrine Artificers"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Thread-Seer Kythara", "Thread-Warden Infantry", "Silk-Shadow Scouts", "Gossamer Guard", "Tremor Sentinels", "Fate-Thread Weavers", "Web-Anchor Engineers", "Spiderling Swarm"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Full combined arms. Use EVERY unit in multiple roles.", "Dreampiercer Archers and Shadow Marksmen provide fire support.", "Starblade Samurai and Oni Mask Executioners anchor melee.", "Star Serpent Lancers and Thunder Kirin Cavalry flank.", "Spirit Healer Monks keep your core alive.", "Shrine Artificers repair equipment — sustained warfare.", "Tsuyukusa commands from wherever she's needed most."],
		"battle_modifiers": {"label": "Bloom and Fade", "description": "Perfect combined arms. All units gain +1 ATK, +1 DEF.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Cmdr Tsuyukusa", "They ask me what kind of warrior I am. Swordsman? Archer? Cavalry? Commander? I answer: I am the dayflower. I bloom when the moment is right, in whatever form the moment demands. And when the battle is over, I fade — not from weakness, but from completion. The dayflower does not endure. She ACHIEVES. And that is enough.", "wisdom"),
	]
