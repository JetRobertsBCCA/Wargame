class_name VeilboundHoshimaruCampaign
## Elite Cmdr Hoshimaru — "The Star Shield"
## Infantry command, Defense. ATK 15, DEF 5, HP 33, CMD 8.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_hoshimaru",
		"commander": "Elite Cmdr Hoshimaru",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "The Star Shield",
		"description": "Elite Commander Hoshimaru commands the Shogunate's infantry with unwavering discipline. His shield wall has never been broken. In the Shardlands, that record will be tested.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Elite Cmdr Hoshimaru", "A line held is a battle won. A formation unbroken is an army undefeated. I command infantry — the foundation of every army, the bedrock upon which victory is built. My Temple Defenders have stood against cavalry charges, artillery barrages, and arcane devastation. They held. That is what I teach, what I demand, what I EMBODY: the line holds. Always.", "iron_discipline"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Line Holds",
		"objectives_text": "Establish and hold a defensive line against Emberclaw assault waves.",
		"pre_story": [ShardLore.dialogue("Elite Cmdr Hoshimaru", "Emberclaw berserkers will hit our position in three waves — each stronger than the last. My Temple Defenders will anchor the center. Shrine Wardens on the flanks. Veiled Ashigaru in reserve. The formation is simple because simplicity survives chaos. When the fire comes, we brace. When the charge comes, we hold. When the third wave comes, they'll break against us like water against stone. The line holds. It ALWAYS holds.", "commanding")],
		"post_story": [ShardLore.dialogue("Elite Cmdr Hoshimaru", "Three waves. Three holds. Not a single position lost. The Emberclaw are brave warriors — I respect their fury. But fury breaks against discipline like flame against stone. They exhausted themselves against our shields while our reserves waited fresh and ready. That is the infantry doctrine: patience, position, and the unbreakable line.", "professional_pride")],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Hoshimaru", "The line broke on the third wave. Too many berserkers at one point. Must reinforce the center with a second rank next time.", "analysis")],
		"player_army": ["Elite Cmdr Hoshimaru", "Temple Defenders", "Shrine Wardens", "Veiled Ashigaru", "Starblade Samurai"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Skullcrusher Threx", "Unbonded Berserkers", "Emberclaw Warriors", "Emberforged Blades"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["Hoshimaru commands infantry. Hold the line.", "Temple Defenders have Shield Wall and Brace — use both.", "Shrine Wardens hold objectives with defensive stance.", "Veiled Ashigaru screen the flanks against fast units.", "Starblade Samurai provide the counter-attack once enemies exhaust."],
		"battle_modifiers": {"label": "The Line Holds", "description": "Infantry doctrine. All infantry gain +1 DEF.", "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Shield Wall Advance",
		"objectives_text": "Push forward with a disciplined shield wall, taking ground methodically against Iron Dominion defenses.",
		"pre_story": [ShardLore.dialogue("Elite Cmdr Hoshimaru", "The Iron Dominion has fortified the bridge crossing. We must take it — not by reckless charge, but by disciplined advance. Shield wall formation, steady pace, covering fire from our skirmishers. Every step forward is a step HELD. We do not retreat. We do not rush. We advance at the pace of our shields, and NOTHING stops the advance of Hoshimaru's infantry.", "methodical")],
		"post_story": [ShardLore.dialogue("Elite Cmdr Hoshimaru", "The bridge is ours. Four hundred meters of controlled advance under sustained fire, and not a single formation break. The Iron Dominion respects discipline — today they saw discipline that surpasses their machines. Clockwork precision is predictable. Samurai discipline is ADAPTIVE. We adjusted to every salvo, every counter-attack, every trap. The Iron Dominion calculates. We persevere.", "earned_respect")],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Hoshimaru", "Their artillery was too concentrated. The shield wall held against projectiles but not against the blast concussions. Need anti-artillery countermeasures.", "analytical")],
		"player_army": ["Elite Cmdr Hoshimaru", "Temple Defenders", "Hollow Lord Phalanx", "Shrine Wardens", "Starblade Samurai", "Spirit Javelin Skirmishers", "Lantern Bearers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Piston", "Steam Heavy Guards", "Infantry Regiment", "Clockwork Infantry", "Gearwright Artillery", "Clockwork Cavalry"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Controlled advance. Move the shield wall forward each turn.", "Hollow Lord Phalanx is your heavy infantry anchor.", "Spirit Javelin Skirmishers provide ranged cover.", "Lantern Bearers inspire nearby troops.", "Take ground methodically. Each position taken becomes your new line."],
		"battle_modifiers": {"label": "Shield Wall Advance", "description": "Advancing shield wall. All infantry gain +1 DEF.", "player_def_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Unbreakable",
		"objectives_text": "Hold a shrine position against overwhelming Nightfang numbers. Do not yield a single step.",
		"pre_story": [ShardLore.dialogue("Elite Cmdr Hoshimaru", "The Nightfang come with numbers we cannot match — thrall hordes, undead cavalry, war-beasts. Our shrine position has three approaches. I have units for each. The Phantom Ward Constructs block the western approach. Temple Defenders hold the eastern gate. I stand at the center. The shrine must not fall. Not because of its strategic value — though that is considerable — but because the Shogun placed it in my keeping. And what Hoshimaru keeps, Hoshimaru HOLDS.", "absolute_resolve")],
		"post_story": [ShardLore.dialogue("Elite Cmdr Hoshimaru", "Eight assaults. Eight holds. The thralls piled against our shield wall like driftwood against a seawall. We did not waver. We did not yield. We did not even BEND. The Nightfang commander — a creature of ancient cunning — tried every approach, every trick, every combination. And the answer was always the same: the line holds. The shrine stands. Hoshimaru endures.", "iron_triumph")],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Hoshimaru", "They corrupted the ground beneath us. The defensive position itself became hostile. I can hold a line against any army, but I cannot hold a line that dissolves beneath my feet.", "bitter")],
		"player_army": ["Elite Cmdr Hoshimaru", "Temple Defenders", "Hollow Lord Phalanx", "Phantom Ward Constructs", "Shrine Wardens", "Kintsugi Blademasters", "Spirit Healer Monks", "Banner of Silent Prayer"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Thrallmaster Ghul", "Corrupted Militia", "Blood Reavers", "Thrall Riders", "Plague Knights", "Elder Tiger Horror", "Plague Horde"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Ultimate defense. Hold every position.", "Phantom Ward Constructs are immovable walls — place them wisely.", "Spirit Healer Monks keep your warriors fighting.", "Banner of Silent Prayer boosts morale across the army.", "Kintsugi Blademasters grow stronger when damaged — the last line.", "The shrine must not fall. Every position matters."],
		"battle_modifiers": {"label": "The Unbreakable", "description": "Fortress defense. All infantry gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Star Shield",
		"objectives_text": "Command the largest Veilbound infantry force ever assembled to hold the line in a decisive battle.",
		"pre_story": [
			ShardLore.dialogue("Elite Cmdr Hoshimaru", "The Shogun has placed the entire eastern front under my command. Every infantry formation, every defensive construct, every shield and spear. This is the battle that determines whether the Shogunate survives in the Shardlands. I will not fail. The Star Shield — the formation I've trained my entire career to execute — places every unit in mutual supporting distance. Every soldier covers two neighbors. Every position reinforces three others. The formation does not need to be invincible. It needs to be UNBREAKABLE. And it is.", "final_resolve"),
			ShardLore.narration("The Star Shield formation blazed with ritual light — each unit's position aligned with celestial patterns that amplified their defensive stance. From above, the formation resembled a five-pointed star, each point a strongpoint, each ray a line of shields. At the center, Hoshimaru stood like an iron pillar — unflinching, unmoving, absolute."),
		],
		"post_story": [
			ShardLore.narration("The Battle of the Star Shield entered the spirit scrolls as a masterwork of defensive warfare. Commander Hoshimaru's formation held against six consecutive assaults across a twelve-hour battle. Not a single breach. Not a single rout. Not a single moment of hesitation. The Star Shield simply... held. And in holding, won."),
			ShardLore.dialogue("Elite Cmdr Hoshimaru", "They ask how I do it — how the line always holds, how the shield never breaks, how the infantry never wavers. The answer is simple: I do not hold the line. The line holds ME. Every soldier in that formation believes — KNOWS — that I will not abandon them. And so they do not abandon the position. The Star Shield is not a formation. It is a promise. And Hoshimaru keeps every promise.", "final_honor"),
		],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Hoshimaru", "The Star Shield broke. For the first time in my career, the line did not hold. I must rebuild — not just the formation, but the trust of every soldier who believed in me.", "devastated")],
		"player_army": ["Elite Cmdr Hoshimaru", "Temple Defenders", "Hollow Lord Phalanx", "Shrine Wardens", "Kintsugi Blademasters", "Starblade Samurai", "Phantom Ward Constructs", "Walking Torii Gate", "Spirit Healer Monks", "Banner of Silent Prayer"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Emberforged Blades", "Unbonded Berserkers", "Mature War Drake", "Immolation Bombers", "Emberclaw Warriors", "Pyromancer Adepts", "Ashrider Scouts"],
		"battle_size": "epic",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["The Star Shield — ultimate infantry defense.", "Walking Torii Gate anchors the center with Gate Anchor.", "Phantom Ward Constructs block key approaches.", "Spirit Healer Monks keep the line fighting indefinitely.", "Every unit supports two neighbors. Stay in formation.", "This is not about winning. It is about NOT LOSING. Hold."],
		"battle_modifiers": {"label": "The Star Shield", "description": "Perfect formation. All infantry gain +2 DEF, +1 ATK.", "player_def_bonus": 2, "player_atk_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Elite Cmdr Hoshimaru", "The star has many points, but one center. That center is duty. My soldiers hold the line because duty demands it, and I am the embodiment of that demand. The Star Shield will endure as long as there are samurai who believe that holding a position — truly, absolutely HOLDING — is the highest form of courage. Not the glory of the charge. Not the cunning of the ambush. The quiet, eternal courage of the shield that never yields.", "final"),
	]
