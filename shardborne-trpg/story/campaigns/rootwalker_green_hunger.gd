class_name RootwalkerGreenHungerCampaign
## The Green Hunger — "Feed the Roots"
## Most aggressive Rootwalker, the forest has teeth.
## 4 missions. Teaches high-aggression, consumption mechanics, the dark forest.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_green_hunger",
		"commander": "The Green Hunger",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "Feed the Roots",
		"description": "The other Rootwalkers speak of patience and growth and the long memory of the forest. The Green Hunger speaks of teeth. The forest has always had teeth. Most forests choose not to show them. The Green Hunger has decided that the time for showing them is now, and it is not going to stop until the roots are satisfied.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
		"defeat_story": _defeat_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The forest has always had teeth."),
		ShardLore.narration("This is something most people who enter forests prefer not to think about: that the canopy above, the undergrowth around, the root systems beneath are not passive background. They are organisms, with the needs of organisms, and some of those needs are nutritive, and nutrition is what things become when they stop moving."),
		ShardLore.narration("Most of the grove maintained a careful separation between 'defense' and 'consumption.' The Green Hunger did not."),
		ShardLore.dialogue("The Green Hunger", "They came here. They brought blood and iron and the smell of meat into a place that has been hungry for a very long time. I am not going to pretend the roots do not want to feed. The roots want to feed. I am going to let them.", "deep and slow, something wrong about the sound of it"),
		ShardLore.narration("Something moved in the undergrowth that was not the wind."),
		ShardLore.narration("The forest had teeth."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Forest Feeds",
		"objectives_text": "Consume the invading force. Every fallen enemy feeds the roots. Feed the roots.",
		"pre_story": [
			ShardLore.narration("The Emberclaw scouts moved into the forest following standard protocol for dense vegetation — spread formation, clear sightlines maintained, regular communication between squads. Protocol developed specifically for terrain that might hide ambushes."),
			ShardLore.narration("Protocol developed by beings who thought of forests as collections of trees."),
			ShardLore.dialogue("The Green Hunger", "They know about ambushes. They do not know about appetite. These are different things.", "low"),
		],
		"post_story": [
			ShardLore.narration("The scouts did not return. The grove was denser in the area where they had entered than it had been before they arrived. This was not a coincidence."),
			ShardLore.dialogue("The Green Hunger", "The roots are stronger. The scouts were warm and carried iron that the roots found useful. The forest does not waste. The forest has never wasted. Everything that enters becomes part of what is here. This is the oldest law of old growth.", "satisfied"),
		],
		"defeat_story": [ShardLore.dialogue("The Green Hunger", "The scouts escaped. The roots did not feed. The hunger continues. Hunger is a motivator. I will not fail to feed the roots again.", "displeased, but driven")],
		"player_army": ["The Green Hunger", "Thornwood Sentinels", "Root Crawlers", "Rootmaw Devourer"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Ashwalker Skirmishers", "Ashborn Infantry", "Emberclaw Warriors"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": [
			"The Green Hunger's Consume ability: enemies defeated adjacent to him are absorbed, healing him.",
			"Rootmaw Devourer has the highest consumption rate — position it where enemies cluster.",
			"Root Crawlers drag enemy units into consumption range by surfacing beneath them.",
			"Each unit consumed adds to the Hunger meter — at max Hunger, all units gain +2 ATK.",
		],
		"battle_modifiers": {"label": "Feed the Roots", "description": "The forest is hungry. Each eliminated enemy unit heals all Rootwalker units by 1 HP.", "player_hp_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Blood and Bark",
		"objectives_text": "Hunt the Nightfang blood-drinkers. The forest drinks blood too — and it has been doing it longer.",
		"pre_story": [
			ShardLore.narration("The Nightfang had moved into the deep forest, drawn by the energy concentrations that followed consumption events. Predators recognized the scent of predation."),
			ShardLore.narration("What they had not anticipated was that the predator in the forest was older than they were, larger than they were, and had no particular interest in the etiquette of inter-predator relations."),
			ShardLore.dialogue("The Green Hunger", "They drink blood. The roots drink everything. Blood is nutritious. Blood-drinkers are also nutritious. The Nightfang have made a tactical miscalculation by entering the old-growth territory. They will discover this.", "calm about it"),
		],
		"post_story": [
			ShardLore.dialogue("The Green Hunger", "The blood-drinkers discovered that the forest is also a predator and is not interested in respecting their claimed territory. Blood-drinkers hunt what has blood. The forest hunts everything. We are not equivalent. They have retreated. The roots are very full.", "satisfied"),
		],
		"defeat_story": [ShardLore.dialogue("The Green Hunger", "The blood-drinkers are faster than the roots could reach. They struck and withdrew before the consumption could complete. Quick predators are difficult prey. I will need to move faster — or lure them closer. Luring is preferable. They are used to being the ones doing the luring.", "thinking")],
		"player_army": ["The Green Hunger", "Thornwood Sentinels", "Root Crawlers", "Rootmaw Devourer", "Deeproot Hulks"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Grand Fang Voraxis", "Nightfang Warriors", "Blood Reavers", "Tiger Berserkers", "Shadow Stalkers"],
		"battle_size": "skirmish",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": [
			"Broken Ground: the Green Hunger gains bonus Consume range in rough terrain.",
			"Rootmaw Devourer is slower but can consume multiple adjacent targets — use it on grouped enemies.",
			"Tiger Berserkers are fast and hit hard — Root Crawlers can intercept them underground.",
			"The Hunger meter — watch it. At max, the Green Hunger gains abilities that make him genuinely terrifying.",
		],
		"battle_modifiers": {"label": "The Forest Hunts", "description": "Old-growth appetite. The Green Hunger gains +1 ATK for each unit previously consumed this campaign.", "player_atk_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "What the Forest Becomes",
		"objectives_text": "The consumption has changed the forest. The roots are more aggressive. Hold the transformed territory against those who want to burn it back.",
		"pre_story": [
			ShardLore.narration("The grove around the Green Hunger's territory had changed. Not subtly — the trees were larger, darker, the undergrowth denser with an aggressive growth that reached toward passing creatures rather than away from them. The root systems had developed in ways that hadn't been documented in the grove's memory-rings."),
			ShardLore.narration("Other factions had noticed. Several of them had decided this was a problem that needed to be addressed."),
			ShardLore.dialogue("The Green Hunger", "They want to burn the changed forest. They are frightened of what the roots have become. They should be frightened. The roots have been fed well. The roots have become something appropriate.", "unconcerned"),
			ShardLore.narration("The Sylvara had sent a message through the root-web. It arrived as a sensation, not words."),
			ShardLore.narration("The sensation was: be careful."),
			ShardLore.dialogue("The Green Hunger", "I am careful. I am simply careful about different things than she is.", "direct"),
		],
		"post_story": [
			ShardLore.dialogue("The Green Hunger", "The territory held. The transformed forest defended itself as forests defend themselves — from below, from within, from every direction simultaneously. The burning-force found that fire applied to wood that has absorbed significant nutritive energy burns back. This surprised them. It did not surprise me.", "measuring the outcome"),
		],
		"defeat_story": [ShardLore.dialogue("The Green Hunger", "The transformed forest was damaged. The roots pulled back to a more defensible depth. The hunger fades when the forest is injured. But the roots remember being fed. The hunger will return. The transformation will resume.", "certain of this")],
		"player_army": ["The Green Hunger", "Thornwood Sentinels", "Root Crawlers", "Rootmaw Devourer", "Deeproot Hulks", "Sporecloud Drifters"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Pyromancer Adepts", "Immolation Bombers", "Emberclaw Warriors", "Ashborn Infantry", "Pyromancer Circle"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": [
			"Last Stand: the transformed forest is what you are defending.",
			"Sporecloud Drifters are enhanced in transformed forest — their clouds are toxic, not just obscuring.",
			"Rootmaw Devourer in transformed terrain heals faster from consumption.",
			"Fire clears transformed terrain — Root Crawlers intercept Immolation Bombers before they throw.",
		],
		"battle_modifiers": {"label": "Transformed Territory", "description": "The fed forest fights back. Rootwalker units in transformed terrain gain +1 ATK and regenerate.", "player_atk_bonus": 1, "player_hp_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Feed the Roots",
		"objectives_text": "The roots are hungry. The combined assault is large. Feed the roots. Let the forest have what it wants.",
		"pre_story": [
			ShardLore.narration("Three factions had coordinated. It was the largest force that had been assembled against any single Rootwalker since the Shardstorm. They had clearly compared notes about what the transformed territory had become and reached a collective conclusion that it needed to not be allowed to continue."),
			ShardLore.dialogue("The Green Hunger", "They are afraid. They are right to be afraid. This is the correct response to a forest that is actively hunting. Their fear is recognition of an accurate threat assessment. I appreciate the acknowledgment.", "flat"),
			ShardLore.narration("The roots stirred beneath the approaching armies. Very deep, very old, very patient roots, made stronger by months of feeding, remembering what roots were like when the world was young and the thing that would eventually become fear had not yet been named."),
			ShardLore.dialogue("The Green Hunger", "Feed the roots.", "final"),
		],
		"post_story": [
			ShardLore.narration("The combined assault broke against the transformed forest. Not all at once — it broke in stages, the way things break when they encounter something that fights differently than expected, something that answers cavalry charges with root systems and infantry advances with undergrowth that reached upward rather than downward."),
			ShardLore.narration("When the last of the assault force had withdrawn, the forest was denser than it had been before the battle."),
			ShardLore.dialogue("The Green Hunger", "The roots are satisfied. For now. The forest is what it should have been. The old forest — the forest before names and borders and the concept of territory — was like this. Large and dark and not interested in the smallness of the things that walked on its floor. That forest is here again. In this place. The Shardstorm woke something that the long peace had quieted. I am that thing. The forest has its teeth back.", "deep and slow"),
		],
		"defeat_story": [ShardLore.dialogue("The Green Hunger", "The combined force was enough to drive the roots back. The hunger is not satisfied. The transformation is incomplete. But the roots are still there, beneath the cleared ground, still carrying the memory of what they ate. They will be hungry again. The hunger never completely stops.", "deep and patient")],
		"player_army": ["The Green Hunger", "Thornwood Sentinels", "Root Crawlers", "Rootmaw Devourer", "Deeproot Hulks", "Sporecloud Drifters", "Ancient Rootwarden", "Grove Colossus"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Lord Sanguinar", "Blood Reavers", "Nightfang Warriors", "Corruption Guard", "Tiger Berserkers", "Crimson Behemoth", "Blood Shamans", "Hunger Priests"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 9,
		"tutorial_tips": [
			"King of the Hill: the transformed forest core must be held. Retreat means losing the transformation.",
			"Grove Colossus at the center creates an impassable consumption zone — nothing escapes it.",
			"The Green Hunger at max Hunger gains Apex Predator: enemies in his zone of control cannot retreat.",
			"Ancient Rootwarden accelerates transformation — every round he holds, the territory deepens.",
		],
		"battle_modifiers": {"label": "Full Hunger", "description": "The roots are hungry and strong. All Rootwalker units gain +2 ATK. Consumed enemies give +2 HP instead of +1.", "player_atk_bonus": 2, "player_hp_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("The forest was full."),
		ShardLore.narration("Not quiet — the old-growth forest was never quiet. But the particular hunger that had been driving the roots for months was, for now, satisfied. The territory was claimed. The roots were strong. The transformation had settled into something that the grove's older members looked at with a mixture of respect and unease."),
		ShardLore.dialogue("The Green Hunger", "The forest has always had teeth. The teeth were always there. The teeth will always be there. I have not created something new. I have remembered something very old.", "certain"),
		ShardLore.narration("A pause. Something moved in the undergrowth, somewhere, that was not quite the wind."),
		ShardLore.dialogue("The Green Hunger", "The roots will need feeding again. Eventually. This is not a threat. This is the nature of old things. They are always hungry. They are always patient. When they stop being patient, the world is reminded of what old means.", "certain and final"),
	]

static func _defeat_story() -> Array:
	return [
		ShardLore.dialogue("The Green Hunger", "The roots were not fed today. The hunger continues. Unsatisfied hunger is not a defeat — it is a condition that produces motivation. I am very motivated. The forest will feed. The roots will be satisfied. This is not a possibility. This is a certainty expressed as a future tense.", "deep patience"),
	]
