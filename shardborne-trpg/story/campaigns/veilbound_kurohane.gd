class_name VeilboundKurohaneCampaign
## Masked Lord Kurohane — "The Shadow Blade"
## Elite melee, Bodyguard. ATK 18, DEF 5, HP 36, CMD 10.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_kurohane",
		"commander": "Masked Lord Kurohane",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "The Shadow Blade",
		"description": "Masked Lord Kurohane is the Shogun's shadow — his blade, his shield, his second self. Where the Shogun commands, Kurohane kills. Honor demands nothing less.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Masked Lord Kurohane", "I am the Shogun's mask made manifest. His will given edge and point. Where he cannot go, I am sent. What he cannot say, my blade speaks. The Shardlands are strange and broken, but duty endures. The Shogun's enemies will fall. The Shogun's honor will be upheld. And Kurohane will stand between his lord and every threat — every blade, every claw, every shadow that dares approach.", "formal_resolve"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Shogun's Shield",
		"objectives_text": "Protect Veilbound positions from an Emberclaw raid. No enemy reaches the shrine.",
		"pre_story": [ShardLore.dialogue("Masked Lord Kurohane", "The Emberclaw approach our forward shrine. The Shogun has placed it under my protection. I do not need to defeat the warpack. I need to ensure that not one ember touches the shrine's threshold. The Masked Lord Retinue will form the inner guard. My blade will be the outer. Let them come. They will find that the Shogun's shadow cuts deeper than their fire.", "cold")],
		"post_story": [ShardLore.dialogue("Masked Lord Kurohane", "No enemy crossed the threshold. Seven challenged me directly — seven fell. The shrine stands. The Shogun's will is done. This is what it means to serve: not glory, not conquest, but DUTY. The shrine was entrusted to me. The shrine endures. That is sufficient.", "satisfied_duty")],
		"defeat_story": [ShardLore.dialogue("Masked Lord Kurohane", "They breached the perimeter. Fire touched the shrine. I have failed the Shogun's trust. This dishonor must be corrected.", "shame")],
		"player_army": ["Masked Lord Kurohane", "Masked Lord Retinue", "Temple Defenders", "Shrine Wardens", "Inkblade Masters"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Pyroclaw Drenna", "Unbonded Berserkers", "Emberclaw Warriors", "Fledgling Swarm"],
		"battle_size": "skirmish",
		"scenario": "king_of_the_hill",
		"round_limit": 6,
		"tutorial_tips": ["Kurohane is the Shogun's bodyguard. He excels at defense.", "Masked Lord Retinue fights alongside Kurohane with special synergy.", "Temple Defenders form the shield wall. Kurohane is the blade behind it.", "Inkblade Masters duel enemy champions.", "Hold the shrine. That is the only objective."],
		"battle_modifiers": {"label": "The Shogun's Shield", "description": "Bodyguard duty. All units near Kurohane gain +1 DEF.", "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Blade of Honor",
		"objectives_text": "Lead an elite strike force to eliminate an Iron Dominion command post.",
		"pre_story": [ShardLore.dialogue("Masked Lord Kurohane", "The Iron Dominion has established a command nexus coordinating attacks against three Veilbound positions. The Shogun requires its elimination. I take only the finest warriors — Kintsugi Blademasters, Oni Mask Executioners, and my personal retinue. We do not siege. We do not negotiate. We cut through their perimeter, find their commander, and end this with a single stroke. That is the way of the Shadow Blade.", "determined")],
		"post_story": [ShardLore.dialogue("Masked Lord Kurohane", "The commander fell in a single exchange. His guards were skilled — their formations precise, their response times measured in fractions of seconds. Against conventional forces, they would have held. Against Kurohane, they were too slow by exactly one heartbeat. That is the difference between excellent defense and the Shadow Blade: one heartbeat. Always one heartbeat.", "quiet_pride")],
		"defeat_story": [ShardLore.dialogue("Masked Lord Kurohane", "Their defenses held. Too many layers of steel between me and the target. I must find a way to cut through, not around.", "frustration")],
		"player_army": ["Masked Lord Kurohane", "Masked Lord Retinue", "Kintsugi Blademasters", "Oni Mask Executioners", "Inkblade Masters", "Silent Ink Assassins"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Steam Heavy Guards", "Infantry Regiment", "Clockwork Infantry", "Mechanized Scouts", "Gearwright Artillery"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 6,
		"tutorial_tips": ["Strike force mission. Speed and lethality over numbers.", "Silent Ink Assassins can bypass defenses with stealth.", "Kintsugi Blademasters gain power when damaged — Kintsugi Rage.", "Oni Mask Executioners terrify enemies with Yokai Presence.", "Focus on the commander. Eliminate leadership, collapse the defense."],
		"battle_modifiers": {"label": "Blade of Honor", "description": "Elite strike. All melee units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Duel in the Dark",
		"objectives_text": "Face the Nightfang's deadliest assassin in a battle between shadows.",
		"pre_story": [ShardLore.dialogue("Masked Lord Kurohane", "The Nightfang assassin — Shadowfang Kreev — has been eliminating our scouts. Three patrols lost without a sound. The Shogun has ordered me to end this threat personally. Kreev does not speak, they say. Neither will my blade need words. Two shadows will meet in the dark. Only one will return to the light. This is not war. This is a duel — the oldest form of honor, predator against predator.", "anticipation")],
		"post_story": [ShardLore.dialogue("Masked Lord Kurohane", "Kreev was... worthy. The first opponent in the Shardlands who matched me in speed and silence. Our blades crossed seventeen times before the decisive stroke. I felt his intent the way a mirror feels light — absolute reflection, absolute understanding. In the end, experience exceeded instinct. The Shadow Blade has faced a thousand duels. Kreev, I think, has faced only darkness. Darkness is not enough against Kurohane.", "respect")],
		"defeat_story": [ShardLore.dialogue("Masked Lord Kurohane", "Kreev's silence was... deeper than mine. He struck from an angle I could not predict because there was NO intent to read. He fights without thought. I must learn to counter the thoughtless blade.", "wounded_pride")],
		"player_army": ["Masked Lord Kurohane", "Silent Ink Assassins", "Inkblade Masters", "Moonlit Duelists", "Void Serpent Harriers", "Ink Shadow Scouts"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Shadowfang Kreev", "Corruption Spreaders", "Blood Reavers", "Plague Knights", "Blight Hound Pack", "Shadow Stalkers"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Shadow versus shadow. Seek out Kreev directly.", "Moonlit Duelists can challenge enemy champions with Riposte.", "Void Serpent Harriers phase through terrain to flank.", "Ink Shadow Scouts reveal hidden enemy units.", "This is a duel-focused battle. Champion kills matter most."],
		"battle_modifiers": {"label": "Duel in the Dark", "description": "Shadow combat. All units gain +1 ATK in melee.", "player_atk_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Shadow Blade",
		"objectives_text": "Lead the Shogun's finest in a decisive battle to prove the supremacy of Veilbound martial honor.",
		"pre_story": [
			ShardLore.dialogue("Masked Lord Kurohane", "The Shogun has called upon me one final time. The Thornweft Matriarchy masses against our eastern shrine-fortresses with creatures and constructs beyond counting. I bring every blade under my command — the finest warriors in the Shogunate. Not the largest army. Not the most numerous. But the BEST. One Veilbound samurai is worth ten of any lesser breed. Today, the Shadow Blade proves it.", "fierce_honor"),
			ShardLore.narration("Kurohane drew his mask down — the face of the demon that had ended a hundred duels. Behind him, the Masked Lord Retinue fell into formation with the precision of a single organism. Kintsugi Blademasters showed their gold-scarred arms. Oni Mask Executioners donned the faces of wrath. This was not an army. This was a blade — forged from warriors, tempered in honor, pointed at the enemy's heart."),
		],
		"post_story": [
			ShardLore.narration("The battle of the Eastern Shrine was recorded in the Shogunate's spirit scrolls as 'Kurohane's Perfection.' Not because every warrior survived — war demands sacrifice. But because every warrior fought at their absolute peak, every stroke was necessary, and not a single motion was wasted. It was war elevated to art."),
			ShardLore.dialogue("Masked Lord Kurohane", "The Shogun asked me once what I see when I look through the mask. I told him: clarity. Not the world as it is, but the world as it SHOULD be — ordered, purposeful, every threat identified and eliminated. That is what the Shadow Blade offers. Not violence. CLARITY. The enemies of the Shogunate do not lack courage. They lack purpose. And against purpose, courage shatters.", "final_honor"),
		],
		"defeat_story": [ShardLore.dialogue("Masked Lord Kurohane", "Overrun. Too many of them, not enough of us. Quality met quantity, and quantity prevailed. The Shogun will be... disappointed. As am I.", "bitter")],
		"player_army": ["Masked Lord Kurohane", "Masked Lord Retinue", "Kintsugi Blademasters", "Oni Mask Executioners", "Inkblade Masters", "Moonlit Duelists", "Hollow Lord Phalanx", "Komainu Guardian Colossus", "Silent Ink Assassins"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Loom-Mother Vethiss", "Silk Colossus", "Fang Guard Elite", "Thread-Warden Infantry", "Silk-Rider Lancers", "Gossamer Guard", "Venom Dancers", "Phase-Silk Infiltrators"],
		"battle_size": "epic",
		"scenario": "shard_clash",
		"round_limit": 8,
		"tutorial_tips": ["The finest warriors in the Shogunate, assembled.", "Komainu Guardian Colossus provides Guardian Aura to nearby units.", "Hollow Lord Phalanx transforms — use their Momentum Engine.", "Kintsugi Blademasters grow stronger when damaged.", "Kurohane is the tip of the spear. His retinue is the shaft.", "Quality over quantity. Every kill must count."],
		"battle_modifiers": {"label": "The Shadow Blade", "description": "Martial perfection. All melee units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Masked Lord Kurohane", "Behind the mask, there is no face. Only duty. Only the edge of the blade and the will of the Shogun. I am Kurohane — the shadow that cuts. And so long as the Shogun breathes, the Shadow Blade will never be sheathed.", "final"),
	]
