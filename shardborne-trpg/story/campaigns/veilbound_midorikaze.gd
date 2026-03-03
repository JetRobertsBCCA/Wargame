class_name VeilboundMidorikazeCampaign
## Cmdr Midorikaze — "The Green Wind"
## Healing, Defensive support. ATK 9, DEF 4, HP 30, CMD 7.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_midorikaze",
		"commander": "Cmdr Midorikaze",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "The Green Wind",
		"description": "Commander Midorikaze heals and defends — the green wind that carries life to the wounded and strength to the weary. Where she stands, the army endures.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Cmdr Midorikaze", "The green wind carries seeds. It brings life after winter, renewal after destruction. That is my role in the Shogunate — not to destroy, but to sustain. I stand behind the warriors and I keep them alive. I stand beside the wounded and I mend them. I stand at the heart of the army and I am the reason it endures. Midorikaze: the wind of continuing. The wind of NOT giving up.", "gentle_resolve"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Seeds of Resilience",
		"objectives_text": "Sustain the defensive line through healing while the army weathers an Emberclaw storm.",
		"pre_story": [ShardLore.dialogue("Cmdr Midorikaze", "The Emberclaw hit hard and fast. Warriors will fall. Morale will waver. Burns will spread. And I will be there — with Spirit Healer Monks at every critical point, with Flow healing running through the formation like green wind through a forest. Every wound mended before it becomes fatal. Every wavering spirit bolstered before it breaks. Fire burns, but the green wind carries rain.", "calm_compassion")],
		"post_story": [ShardLore.dialogue("Cmdr Midorikaze", "Forty-three warriors would have fallen without healing intervention. Forty-three lives preserved. Forty-three soldiers who continued fighting, continued holding, continued ENDURING. The Emberclaw burned hot, but the green wind cooled every burn. That is what healing does — it doesn't win battles. It prevents LOSING them.", "warm_satisfaction")],
		"defeat_story": [ShardLore.dialogue("Cmdr Midorikaze", "The fire was too intense, too widespread. I couldn't reach everyone. Some wounds... I couldn't mend. The green wind failed them today.", "grief")],
		"player_army": ["Cmdr Midorikaze", "Spirit Healer Monks", "Flow Adepts", "Temple Defenders", "Shrine Wardens"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Pyroclaw Drenna", "Unbonded Berserkers", "Emberclaw Warriors", "Pyromancer Adepts"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["Midorikaze is a defender and healer — not an attacker.", "Spirit Healer Monks directly heal adjacent wounded units.", "Flow Adepts amplify healing range.", "Temple Defenders form the shield wall; Midorikaze keeps them alive.", "Endure. Outlast. The green wind carries resilience."],
		"battle_modifiers": {"label": "Seeds of Resilience", "description": "Healing aura. All units regenerate each round.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Green Barrier",
		"objectives_text": "Establish a defensive support position that makes the entire Veilbound line nearly impenetrable.",
		"pre_story": [ShardLore.dialogue("Cmdr Midorikaze", "Defense is not just walls and weapons. Defense is SPIRIT — the will to hold, the strength to endure, the knowledge that someone behind you is keeping you alive. I create that knowledge. Banner carriers inspire. Healers mend. Support constructs absorb. And at the center, I channel the green wind through every defensive position. The Iron Dominion will bring their precise, grinding offense. We will offer them the Green Barrier: a defense that mends faster than they can damage.", "determined")],
		"post_story": [ShardLore.dialogue("Cmdr Midorikaze", "Seven assaults repelled. The Iron Dominion dealt significant damage with each push — but between pushes, my healing infrastructure restored everything. Their commander must have been baffled: accurate damage reports showing cumulative destruction, yet every new assault faced FRESH defenders. The Green Barrier doesn't just hold. It REGENERATES.", "quiet_triumph")],
		"defeat_story": [ShardLore.dialogue("Cmdr Midorikaze", "Their sustained fire never paused between assaults. Continuous pressure gave my healers no window to mend. We need healing that works UNDER fire, not between fires.", "learning")],
		"player_army": ["Cmdr Midorikaze", "Spirit Healer Monks", "Flow Adepts", "Banner of Silent Prayer", "Temple Defenders", "Phantom Ward Constructs", "Shrine Wardens", "Lantern Bearers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["General Steamjaw", "Steam Heavy Guards", "Infantry Regiment", "Clockwork Infantry", "Gearwright Artillery", "Clockwork Cavalry"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["The Green Barrier — defense that heals itself.", "Phantom Ward Constructs are immovable walls — place at chokepoints.", "Banner of Silent Prayer boosts morale and Flow across the line.", "Lantern Bearers inspire nearby troops and push back darkness.", "Spirit Healer Monks and Flow Adepts create a healing network.", "Hold and heal. The green wind sustains everything it touches."],
		"battle_modifiers": {"label": "The Green Barrier", "description": "Regenerating defense. All units gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Life Against Death",
		"objectives_text": "Counter Nightfang corruption with green healing — life force against undeath.",
		"pre_story": [ShardLore.dialogue("Cmdr Midorikaze", "The Nightfang corruption is the opposite of everything I am. They spread death, decay, and spiritual rot. I spread life, healing, and spiritual renewal. Today these forces meet directly. My Spirit Healer Monks will push back the corruption with positive energy. Flow Adepts will create cleansing barriers. And I — the green wind — will blow through the corrupted zone and GROW LIFE where death has taken root. This is not a battle. This is a GARDENING operation.", "fierce_gentleness")],
		"post_story": [ShardLore.dialogue("Cmdr Midorikaze", "The corruption receded. Where it touched my healing aura, it dissolved — not defeated, but TRANSFORMED. Corruption is merely life energy twisted wrong. The green wind doesn't destroy corruption. It STRAIGHTENS it. Returns it to its natural flow. The Nightfang don't understand this: their power and my power are the SAME force, moving in different directions. I simply redirect it.", "enlightened")],
		"defeat_story": [ShardLore.dialogue("Cmdr Midorikaze", "The corruption was too concentrated, too ancient. My healing couldn't redirect it — it was too deeply entrenched. Old corruption requires deeper roots.", "humbled")],
		"player_army": ["Cmdr Midorikaze", "Spirit Healer Monks", "Flow Adepts", "Ritual Captains", "Temple Defenders", "Starblade Samurai", "Banner of Silent Prayer"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Plague Herald Mortivex", "Corruption Spreaders", "Corrupted Militia", "Plague Horde", "Blood Reavers", "Blight Hound Pack"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Life vs death. Healing counters corruption.", "Spirit Healer Monks cleanse corruption in their healing radius.", "Ritual Captains create Flow Nexus zones that resist corruption.", "Banner of Silent Prayer boosts morale against terror effects.", "Hold the center — push healing outward from there.", "Starblade Samurai provide the counter-offense while healers work."],
		"battle_modifiers": {"label": "Life Against Death", "description": "Green healing. All units gain +1 DEF and corruption resistance.", "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Green Wind",
		"objectives_text": "Channel the full power of healing and defensive support to sustain the Shogunate through its greatest trial.",
		"pre_story": [
			ShardLore.dialogue("Cmdr Midorikaze", "They come from all sides — fire from the east, silk from the west, corruption from the north. Every enemy the Shogunate has faced, converging on our central shrine. Many would despair. I plant seeds. Not literal seeds — seeds of ENDURANCE. Spirit Healer Monks at every position. Flow Adepts connecting them in a healing network. The Spirit Temple Walker radiating life across the entire formation. And at the heart, the Lotus Ascendant Monolith — blooming with enough healing power to sustain an entire army indefinitely. The green wind blows. And while it blows, NOTHING falls.", "ultimate_compassion"),
			ShardLore.narration("Green light spread through the Veilbound formation like dawn spreading across a forest — touching every warrior, healing every wound, filling every wavering spirit with resolve. Commander Midorikaze stood at the center of the web of life she had woven, eyes closed, hands raised, channeling the green wind through every healer, every support unit, every sacred construct in her command."),
		],
		"post_story": [
			ShardLore.narration("The Battle of the Green Wind lasted twelve hours. In twelve hours, the Veilbound formation took damage equivalent to three full armies — and Midorikaze's healing network restored every point of it. Warriors who fell were mended and returned. Walls that cracked were reinforced. Morale that wavered was restored. The green wind blew without ceasing, and the shrine stood unbroken."),
			ShardLore.dialogue("Cmdr Midorikaze", "They ask why I fight, since I carry no weapon. I tell them: I carry the most powerful weapon in existence — the refusal to let my people fall. The green wind does not attack. It SUSTAINS. It carries life where death creeps. It grows hope where despair takes root. I am Midorikaze, the Green Wind, and so long as I breathe, the Shogunate endures.", "final_peace"),
		],
		"defeat_story": [ShardLore.dialogue("Cmdr Midorikaze", "The green wind... faltered. Too much destruction from too many sources. Even the strongest healer eventually reaches a limit. I reached mine today. But tomorrow, the wind will blow again.", "broken_hope")],
		"player_army": ["Cmdr Midorikaze", "Spirit Healer Monks", "Flow Adepts", "Ritual Captains", "Spirit Temple Walker", "Lotus Ascendant Monolith", "Temple Defenders", "Phantom Ward Constructs", "Banner of Silent Prayer", "Starblade Samurai"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Emberforged Blades", "Unbonded Berserkers", "Mature War Drake", "Immolation Bombers", "Emberclaw Warriors", "Pyromancer Adepts", "Ashrider Scouts"],
		"battle_size": "epic",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Ultimate healing and defense. Sustain through anything.", "Lotus Ascendant Monolith is the healing heart. Protect it absolutely.", "Spirit Temple Walker extends healing across the entire formation.", "Phantom Ward Constructs block approaches to the healers.", "Banner of Silent Prayer keeps morale from cracking.", "You don't need to win fast. You need to NOT LOSE. Ever."],
		"battle_modifiers": {"label": "The Green Wind", "description": "Full healing power. All units regenerate massively and gain +2 DEF.", "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Cmdr Midorikaze", "The green wind carries seeds across barren ground and tells them: GROW. I carry the same message to every warrior in the Shogunate: ENDURE. Not forever — just one more moment. And then one more. And then one more. Because that is all healing is — the gift of one more moment. And one more moment, repeated infinitely, becomes forever.", "final"),
	]
