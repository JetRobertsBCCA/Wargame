class_name RootwalkerGreyrootCampaign
## Greyroot the Impassable — "Still Waters"
## Fortress defense, patience as a weapon. The most defensive Rootwalker.
## 4 missions. Teaches fortification, chokepoint control, attrition defense.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_greyroot",
		"commander": "Greyroot the Impassable",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "Still Waters",
		"description": "Greyroot does not attack. Greyroot does not pursue. Greyroot stands. In the Shardlands, where every other force charges and countercharges and dies in the open, Greyroot has chosen a different philosophy: nothing gets through. Nothing has ever gotten through. Nothing ever will.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
		"defeat_story": _defeat_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("Still water runs deep. Still water also drowns you if you fall into it."),
		ShardLore.narration("Greyroot had stood at the edge of the river for four hundred years, and in those four hundred years, nothing had crossed from the far bank without permission. Not armies, not floods, not the three separate invasions that had tried the crossing and found that what looked like a large, still tree was, in fact, a patient, implacable, entirely focused guardian."),
		ShardLore.narration("The Shardstorm had moved the river. This was rude. Greyroot found a new position to stand in and resumed standing."),
		ShardLore.dialogue("Greyroot the Impassable", "The line is here now. Nothing crosses the line.", "flat"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Line",
		"objectives_text": "Hold the defensive line. The enemy will come in waves. None cross.",
		"pre_story": [
			ShardLore.narration("The first force to test Greyroot's new line was a Nightfang raiding party. They had moved fast and confidently, expecting easy crossing."),
			ShardLore.dialogue("Greyroot the Impassable", "They are moving fast. Fast is a commitment. Committed forces cannot change direction. This is their disadvantage.", "observing"),
			ShardLore.narration("Greyroot rooted deeper into the soil and waited."),
		],
		"post_story": [
			ShardLore.dialogue("Greyroot the Impassable", "They ran at the line. The line held. They ran at the line again. The line held again. They attempted a flanking maneuver. I had anticipated flanking maneuvers. The line held. They retreated. This is the expected outcome.", "satisfied"),
		],
		"defeat_story": [ShardLore.dialogue("Greyroot the Impassable", "The line broke. This has not happened in four hundred years. I will establish a new line. The new line will not break.", "determined")],
		"player_army": ["Greyroot the Impassable", "Thornwood Sentinels", "Grove Wardens", "Thornwall Bastion"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Blood Reavers", "Blood Reavers", "Nightfang Warriors", "Shadow Stalkers"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": [
			"Greyroot's Impassable Stance grants +3 DEF when he hasn't moved this round.",
			"Thornwall Bastion creates blocking terrain — use it to funnel enemies into your strongest units.",
			"Grove Wardens provide aura healing to adjacent units. Position them in your defensive cluster.",
			"The line wins defensive scenarios through attrition. Outlast, don't outmaneuver.",
		],
		"battle_modifiers": {"label": "The Impassable Line", "description": "Nothing gets through. All Rootwalker units gain +2 DEF when in defensive formation.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Deep Roots",
		"objectives_text": "Establish secondary defensive anchors across the territory. Hold each position.",
		"pre_story": [
			ShardLore.narration("A single line was effective but limited. The Shardlands were not a single river — they were a patchwork of approaches, and enemies had proven willing to find unconventional ones."),
			ShardLore.dialogue("Greyroot the Impassable", "The Iron Dominion has identified seventeen potential approach vectors to my primary position. This is a thorough assessment. I respect it. It does not change the outcome. I will hold seventeen positions simultaneously if necessary.", "methodical"),
			ShardLore.narration("Grove Wardens positioned across the approaches. Thornwall Bastions sealing the narrow corridors. Greyroot at the center, where patience radiated outward like rings from a stone dropped in still water."),
		],
		"post_story": [
			ShardLore.dialogue("Greyroot the Impassable", "They tested six of the seventeen approaches simultaneously. A good strategy — distributed pressure, looking for the weak point. There was no weak point. The line held. All seventeen are now reinforced. I expect they will not return.", "matter-of-fact"),
		],
		"defeat_story": [ShardLore.dialogue("Greyroot the Impassable", "They found the gap. I had not considered that approach vector. I am considering it now. This will not happen again.", "correcting")],
		"player_army": ["Greyroot the Impassable", "Thornwood Sentinels", "Deeproot Hulks", "Grove Wardens", "Thornwall Bastion", "Root Crawlers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["High Engineer Vortan", "Steam Sentinels", "Infantry Regiment", "Gearwright Engineers", "Mechanized Scouts"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": [
			"Shard Clash with a defensive lens — hold nodes rather than racing for them.",
			"Deeproot Hulks seal chokepoints against armored assault.",
			"Root Crawlers act as rapid response — teleport them to contested nodes.",
			"Greyroot's Patience Pulse ability spreads his defensive bonus to nearby units.",
		],
		"battle_modifiers": {"label": "Still Waters Run Deep", "description": "The defense is patient and total. DEF +1 for all units. Fortified positions gain additional DEF.", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Patient Storm",
		"objectives_text": "A massive assault comes. It will be the largest force yet. Hold.",
		"pre_story": [
			ShardLore.narration("They had been watching. Greyroot knew they had been watching — the scouts, the probing attacks, the careful distance kept by forces that had learned caution. They had been studying the defensive lines, measuring them, calculating weaknesses."),
			ShardLore.dialogue("Greyroot the Impassable", "They will attack in force soon. They have gathered more troops. They believe that enough pressure will break the line. They are wrong. But they do not know they are wrong yet. Let them discover it themselves.", "patient"),
			ShardLore.narration("The attack came at dawn. It was the largest force Greyroot had faced in two centuries. It was not enough."),
		],
		"post_story": [
			ShardLore.narration("The assault broke. It broke the way all things break against a truly patient defense — not with a dramatic reversal, not with a clever counter-attack, but with the slow, grinding arithmetic of an unstoppable force finally exhausting itself against an immovable object."),
			ShardLore.dialogue("Greyroot the Impassable", "Patience is a weapon. Most creatures forget this. Most creatures are young, and young things prefer fast solutions. Fast solutions have a ceiling. Patience does not.", "unbothered"),
		],
		"defeat_story": [ShardLore.dialogue("Greyroot the Impassable", "The line broke. I stood where I have never fallen. I will stand again. The line will be rebuilt stronger. Failure is information. I will use this information.", "absorbing")],
		"player_army": ["Greyroot the Impassable", "Thornwood Sentinels", "Deeproot Hulks", "Grove Wardens", "Thornwall Bastion", "Root Crawlers", "Sporecloud Drifters"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Emberclaw Warriors", "Ashborn Infantry", "Unbonded Berserkers", "Emberknight Riders", "Mature War Drake", "Pyromancer Adepts"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 8,
		"tutorial_tips": [
			"Broken Ground terrain is your ally — Rootwalkers ignore terrain penalties, Emberclaw does not.",
			"Sporecloud Drifters create area denial in the approach lanes — slow the Emberclaw advance.",
			"Greyroot's Immovable Root ability anchors him and grants +4 DEF — use it when surrounded.",
			"Fire damages Rootwalkers — spread your units to prevent chain fire damage.",
		],
		"battle_modifiers": {"label": "Patient Defense", "description": "The impassable defense. Greyroot cannot be displaced from his position. His DEF is treated as doubled.", "player_def_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Still Waters",
		"objectives_text": "A siege force attempts to starve out the defensive position. Hold long enough for the forest to reclaim the approach routes.",
		"pre_story": [
			ShardLore.narration("They had stopped attacking and started waiting. A new tactic — siege instead of assault. Cut off the position, wait it out, starve the defense. It showed an understanding of strategy that Greyroot found genuinely impressive."),
			ShardLore.dialogue("Greyroot the Impassable", "They are trying patience against patience. They think they can wait longer than a tree. They cannot wait longer than a tree. No one can wait longer than a tree.", "untroubled"),
			ShardLore.narration("The siege settled in. It would last exactly as long as it took for the roots to reach the siege lines and begin the process of making those lines uninhabitable. The roots were already growing toward the enemy positions. Greyroot could feel them."),
			ShardLore.dialogue("Greyroot the Impassable", "Still water. Still as a stone. And the river, very slowly, is rising.", "quiet certainty"),
		],
		"post_story": [
			ShardLore.narration("The siege broke on the forty-third day, when the roots reached the forward positions and the ground around the besieging army became unreliable, then impassable, then actively hostile. They retreated in good order. Greyroot watched them go."),
			ShardLore.dialogue("Greyroot the Impassable", "They tested patience against patience. Their patience is measured in weeks. Mine is measured in centuries. The mathematics were never favorable for them. I wish they had known that before they tried. It would have saved time. But then — I have nothing but time.", "settled"),
		],
		"defeat_story": [ShardLore.dialogue("Greyroot the Impassable", "They waited long enough. I did not expect them to wait this long. I will account for this possibility in my future defensive planning. Every defeat teaches something. I have been taught.", "incorporating the lesson")],
		"player_army": ["Greyroot the Impassable", "Thornwood Sentinels", "Deeproot Hulks", "Grove Wardens", "Thornwall Bastion", "Root Crawlers", "Sporecloud Drifters", "Ancient Rootwarden"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["The Shrouded Shogun", "Shrine Wardens", "Starblade Samurai", "Temple Defenders", "Spirit Healer Monks", "Stormcaller Monks", "Dreampiercer Archers"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 9,
		"tutorial_tips": [
			"King of the Hill defensive variant: hold your position while the roots grow outward.",
			"Ancient Rootwarden creates forest terrain around held positions — each round expands your safe zone.",
			"Root Crawlers can harass siege positions from underground to force enemy repositioning.",
			"Greyroot on the hill position gains his Impassable bonus. He is the objective and the defender.",
		],
		"battle_modifiers": {"label": "Eternal Patience", "description": "The defense cannot be broken. Each round Greyroot holds his position, all Rootwalker units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Greyroot stood in the center of the reclaimed territory and surveyed the approach routes, all of which were now dense forest."),
		ShardLore.dialogue("Greyroot the Impassable", "The line is secure. The territory is clean. The approaches are impassable. This is a satisfactory outcome.", "settled"),
		ShardLore.narration("Someone asked whether Greyroot intended to advance, to press the advantage, to push out beyond the defensive perimeter."),
		ShardLore.dialogue("Greyroot the Impassable", "No. The line is here. The line will remain here. If they come, the line will hold. If they do not come, the forest will grow. Either way, the outcome is correct.", "final"),
	]

static func _defeat_story() -> Array:
	return [
		ShardLore.dialogue("Greyroot the Impassable", "I have never lost a defensive position. I have lost one now. This is new information about the world, and about myself. I will incorporate this information and establish a new line. The new line will not fall.", "studying"),
	]
