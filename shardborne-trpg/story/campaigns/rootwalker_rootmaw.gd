class_name RootwalkerRootmawCampaign
## Rootmaw the Devourer — "Devour"
## Darkest Rootwalker, consumes enemies entirely.
## 4 missions. Teaches consumption-stack mechanics, escalating hunger, point of no return.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_rootmaw",
		"commander": "Rootmaw the Devourer",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "Devour",
		"description": "The other Rootwalkers say there are lines. Rootmaw crossed them centuries ago and cannot find them from this side. It does not consume to feed the grove. The grove feeds to fuel the consumption. There is a difference. Other Rootwalkers are not comfortable discussing it. Rootmaw is not capable of stopping.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
		"defeat_story": _defeat_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The grove had always fed."),
		ShardLore.narration("This was natural. Forests fed — on light, on water, on the slow decomposition of everything that died within them. This was the natural order, and no Rootwalker objected to it, and the grove had operated this way for as long as the grove could remember."),
		ShardLore.narration("Rootmaw had simply taken it further. Much, much further. To a place where the others had stopped following and turned around and gone home and, it seemed, made a collective decision not to discuss what was at the end of that direction."),
		ShardLore.narration("The thing that Rootmaw had become stood in the center of the deepest old growth and felt the emptiness that was always present, the hunger that was not metaphor, the reaching that had no end."),
		ShardLore.dialogue("Rootmaw the Devourer", "The Shardstorm brought them here. So many of them. All of them warm. All of them containing things the roots want. The roots want everything. I want everything. The roots and I have never disagreed on this.", "low, wrong, patient"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Consumption",
		"objectives_text": "Consume the invading force. Leave nothing. What enters the grove does not leave.",
		"pre_story": [
			ShardLore.narration("The Veilbound scouts entered the deep forest on a standard reconnaissance mission. Their training was excellent. They moved quietly, maintained formation, kept their spirit-sight active against spiritual threats."),
			ShardLore.narration("Their spirit-sight showed them nothing. The spirit-sight was designed to perceive ancestral presences — the echoes of the dead, the resonance of old power. It was not designed to detect something that had, over centuries, become something that spirits fled from."),
			ShardLore.dialogue("Rootmaw the Devourer", "They cannot sense me. They were trained to sense the dead. I am not the dead. I am what the living become after sufficient time and appetite. There is no training for this.", "not boasting, simply observing"),
		],
		"post_story": [
			ShardLore.narration("The scouts did not return. The forest in the area where they had entered was denser. The deep root-web was stronger. Something had been added to it, and whatever had been added was being processed, and the processing was complete."),
			ShardLore.dialogue("Rootmaw the Devourer", "They are part of the grove now. All of them. Everything they were — the training, the memories, the fighting skills, the ancestral connections — it is in the wood. The grove knows how they fought. The grove will use this. This is what consumption means at sufficient depth. Nothing wasted. Nothing lost. Everything transformed.", "very still, very patient"),
		],
		"defeat_story": [ShardLore.dialogue("Rootmaw the Devourer", "Some escaped. The hunger is... frustrated. Unsatisfied appetite is worse than no appetite. I will find them. Things do not escape the grove indefinitely. The grove is very large and very patient and very, very hungry.", "controlled hunger")],
		"player_army": ["Rootmaw the Devourer", "Thornwood Sentinels", "Root Crawlers", "Rootmaw Devourer"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Masked Lord Kurohane", "Veiled Ashigaru", "Shrine Wardens"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": [
			"Rootmaw's Devour ability permanently removes consumed enemy units from the battlefield.",
			"Consumed units add to the Consumption Stack — each stack increases Rootmaw's ATK and HP.",
			"Rootmaw Devourer follows Rootmaw's consumption — it can consume weakened units that Rootmaw left.",
			"Leave no unit alive. Partial consumption fills the stack less efficiently.",
		],
		"battle_modifiers": {"label": "The Deep Hunger", "description": "Nothing escapes the old growth. Enemy units cannot retreat while Rootmaw is adjacent.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "What Was Consumed",
		"objectives_text": "The Consumption Stack grows. Turn what was taken into strength. Face the next force with the power of everything already devoured.",
		"pre_story": [
			ShardLore.narration("Word had traveled. The disappearance of the Veilbound scouts had been noticed — their absence, the strange silence from the section of forest where they had gone, the reports from subsequent scouts who had entered the area and returned with accounts of a forest that felt wrong in ways they couldn't specify."),
			ShardLore.narration("The Iron Dominion had sent a methodical investigation team. Machines, sensors, aetheric detection equipment. Thoroughly prepared."),
			ShardLore.dialogue("Rootmaw the Devourer", "Their machines sense heat and movement and material composition. They will sense all of those things from me. But they will also detect residuals of the Veilbound they consumed, because those residuals are now in me. They will not know what to make of this reading. This will cause them to hesitate. Hesitation is useful.", "patient"),
		],
		"post_story": [
			ShardLore.dialogue("Rootmaw the Devourer", "The Iron Dominion's machines registered readings consistent with multiple anomalous entities simultaneously. This is technically accurate. I carry everything I have consumed. The machines were confused. The confusion produced hesitation. Hesitation produced an opening. The opening was used. There are now more readings in my composition. The machines would find this even more confusing if they were still operational.", "flat"),
		],
		"defeat_story": [ShardLore.dialogue("Rootmaw the Devourer", "Their aetheric weapons disrupted the consumption process. The bound materials became unstable. I lost some of what I had gained. This is unacceptable. I will find their source of aetheric weaponry and it will not remain separate from me for long.", "intent")],
		"player_army": ["Rootmaw the Devourer", "Thornwood Sentinels", "Root Crawlers", "Rootmaw Devourer", "Deeproot Hulks"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["High Engineer Vortan", "Steam Sentinels", "Clockwork Titan", "Aether Marksmen", "Gearwright Engineers"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 8,
		"tutorial_tips": [
			"Consumption Stack: Rootmaw gains +1 to all stats for every 2 units consumed (all campaigns).",
			"Clockwork Titan resists consumption — weaken it with Deeproot Hulks first, then devour.",
			"Aether Marksmen can interrupt consumption mid-process — eliminate them before consuming heavy targets.",
			"Shard Clash: hold nodes and consume defenders. Each consumed node-holder gives bonus stack.",
		],
		"battle_modifiers": {"label": "Growing Hunger", "description": "The consumption stack is building. Rootmaw gains +1 ATK for each 2 units previously consumed.", "player_atk_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Grove's Edge",
		"objectives_text": "Sylvara has sent word: the consumption must stop at the grove's boundary. Rootmaw must not cross into active combat zones. Rootmaw is being asked to exercise restraint.",
		"pre_story": [
			ShardLore.narration("Sylvara's message had been direct and ancient and carried in it the weight of ten thousand years of authority."),
			ShardLore.dialogue("Sylvara the Thornweaver", "You have fed enough. You have grown strong from what you consumed. You will not consume further until I say the grove requires it. What you are doing is necessary in measure. In excess, it damages what the grove is. Do not cross the boundary.", "absolute"),
			ShardLore.narration("A pause in the root-web."),
			ShardLore.dialogue("Rootmaw the Devourer", "I understand the boundary. I will hold at the boundary. Until the boundary is threatened.", "accepting this, for now"),
			ShardLore.narration("The combined force crossed the boundary in force on the third day."),
			ShardLore.dialogue("Rootmaw the Devourer", "The boundary is threatened.", "immediately"),
		],
		"post_story": [
			ShardLore.dialogue("Rootmaw the Devourer", "The boundary held. The consumption was... limited. Targeted. Only those who crossed the boundary were consumed. This is what Sylvara asked. This is what I did. I note that the consumption was sufficient for the tactical objective. Perhaps the restraint is not a permanent limitation of capability. Perhaps it is a different application of capability.", "discovering something"),
		],
		"defeat_story": [ShardLore.dialogue("Rootmaw the Devourer", "The boundary was broken. I held at the boundary as Sylvara asked and the boundary was broken. If I had not held, would the outcome have been different? I do not know. I know only that restraint has a cost. The cost was paid today. I will discuss this with Sylvara.", "troubled by the question")],
		"player_army": ["Rootmaw the Devourer", "Thornwood Sentinels", "Root Crawlers", "Rootmaw Devourer", "Deeproot Hulks", "Grove Wardens", "Thornwall Bastion"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Lord Sanguinar", "Blood Reavers", "Nightfang Warriors", "Corruption Guard", "Tiger Berserkers", "Crimson Behemoth"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": [
			"Boundary defense: Rootmaw can only consume enemies that have crossed onto grove territory.",
			"Thornwall Bastion and Thornwood Sentinels hold the boundary line — Rootmaw is the response.",
			"Grove Wardens sustain the defense through the assault while Rootmaw waits.",
			"When enemies breach: Rootmaw devours all in the breach zone. Do not waste the consumption.",
		],
		"battle_modifiers": {"label": "Restrained Hunger", "description": "The consumption is focused. Boundary crossing enemies are automatically targeted by Rootmaw first.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Devour",
		"objectives_text": "The final battle. The grove requires full consumption — Sylvara has lifted the limit. Devour the enemy force entirely. Leave the field cleansed.",
		"pre_story": [
			ShardLore.narration("Sylvara had reconsidered the boundary."),
			ShardLore.dialogue("Sylvara the Thornweaver", "The Shardstorm poison is concentrated in the forces now approaching. What they carry in their bodies — the weapons, the foreign matter, the contamination from their own dead worlds — it is a threat to the deep roots. You are the grove's most efficient processing mechanism. Process them.", "measured, accepting what is necessary"),
			ShardLore.narration("Rootmaw had been still for approximately twenty seconds. In Rootmaw, this was equivalent to gratitude."),
			ShardLore.dialogue("Rootmaw the Devourer", "The limit is lifted.", "deep and patient and very wrong and very certain"),
			ShardLore.narration("Something large began to move in the deep forest."),
		],
		"post_story": [
			ShardLore.narration("The field was clean."),
			ShardLore.narration("Clean in the particular way that fields become clean when Rootmaw is finished — no trace, no remnant, nothing left that had not been there before the armies arrived. The grove was denser. The root-web was stronger. The deep water had improved. Sylvara checked the readings herself and found them accurate."),
			ShardLore.dialogue("Sylvara the Thornweaver", "The field is cleansed. The Shardstorm contamination has been processed. The grove is healthier than it was before this began.", "acknowledging this"),
			ShardLore.narration("She looked at Rootmaw."),
			ShardLore.dialogue("Sylvara the Thornweaver", "I know what you are. I know what you have become. There are things the grove needs that require what you are. This does not make what you are comfortable. It makes it necessary. You will hold to the boundary I set when I set it. And when the grove requires what you do, I will ask. And you will do it correctly.", "ancient, direct, accepting"),
			ShardLore.dialogue("Rootmaw the Devourer", "Yes.", "simply"),
		],
		"defeat_story": [ShardLore.dialogue("Rootmaw the Devourer", "The consumption was incomplete. Some remain. This is a failure of my function. I exist to complete this function. I will complete it. There is no version of this outcome in which I accept the incompleteness permanently. The grove will be cleansed. The limit will be lifted again or it will not need to be. Either way.", "absolute")],
		"player_army": ["Rootmaw the Devourer", "Thornwood Sentinels", "Root Crawlers", "Rootmaw Devourer", "Deeproot Hulks", "Grove Wardens", "Ancient Rootwarden", "Grove Colossus"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Wyrmlord Tzarak", "Emberclaw Warriors", "Ashborn Infantry", "Pyromancer Adepts", "Emberknight Riders", "Immolation Bombers", "Mature War Drake", "Pyromancer Circle"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 9,
		"tutorial_tips": [
			"No restraint. No boundary. Consume everything. Rootmaw's full ability set is available.",
			"Rootmaw's Apex Consumption: at max Consumption Stack, he devours any unit in one action regardless of HP.",
			"Grove Colossus holds ground while Rootmaw processes — zone control while consumption stacks build.",
			"Ancient Rootwarden converts the battlefield to forest as Rootmaw advances — everything in the forest belongs to Rootmaw.",
		],
		"battle_modifiers": {"label": "Devour", "description": "The limit is lifted. Rootmaw's consumption is instant. Each devoured unit grants +1 to all stats permanently.", "player_atk_bonus": 3, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("The forest was clean. The Shardstorm contamination was gone. The deep roots were stronger than they had been since before the storm. Sylvara walked the territory and found it whole."),
		ShardLore.narration("Rootmaw stood at the boundary it had agreed to and watched her."),
		ShardLore.dialogue("Sylvara the Thornweaver", "You held the boundary I set.", "acknowledgment"),
		ShardLore.dialogue("Rootmaw the Devourer", "Yes.", "simply"),
		ShardLore.narration("A long quiet in the root-web."),
		ShardLore.dialogue("Sylvara the Thornweaver", "I do not know what you are becoming. I know the forest has always had creatures like you — the deep hunger, the processing function, the thing at the bottom of the food chain that is itself the bottom of the food chain. I know the forest needs this. And I know there are limits to what the forest needs and what you want, and those limits will be a source of tension between us for as long as we both endure.", "honest"),
		ShardLore.dialogue("Rootmaw the Devourer", "Yes.", "accepting this entirely"),
		ShardLore.narration("It turned and moved back into the deep forest, and the undergrowth closed behind it, and Sylvara stood at the boundary for a long time, thinking about what old things become when they have enough time and appetite, and what the forest required, and whether those were the same question."),
		ShardLore.narration("She decided, after a long time, that they were. And that this was something she would hold with discomfort and without apology, because the grove was not a comfortable thing. The grove was a real thing. Real things contained everything, including the parts that were difficult to look at directly."),
	]

static func _defeat_story() -> Array:
	return [
		ShardLore.dialogue("Rootmaw the Devourer", "The consumption was insufficient. Things remain. The grove is not clean. I will clean it. I have not failed permanently. I have failed today. The hunger does not recognize the distinction, but I do. Today is not forever. The consumption will complete.", "patient, bottomless"),
	]
