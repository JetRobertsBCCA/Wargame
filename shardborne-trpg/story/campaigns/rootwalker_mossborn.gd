class_name RootwalkerMossbornCampaign
## Mossborn the Remembering — "The Long Memory"
## Healer/support campaign, remembers every being that lived in the forest.
## 4 missions. Teaches support play, zone healing, the weight of memory.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_mossborn",
		"commander": "Mossborn the Remembering",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "The Long Memory",
		"description": "Mossborn remembers everything. Every creature that has lived and died in the forest — their names, their seasons, their final moments, preserved in the moss that covers every surface of her ancient form. In the Shardlands, new memories are being made at terrible speed. She will remember all of them. She is determined to save as many as possible first.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
		"defeat_story": _defeat_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The moss holds memory the way water holds salt — dissolved into the substance of it, inseparable, permanent."),
		ShardLore.narration("Mossborn had grown over the oldest graves in the forest — had grown through them, had absorbed the bone-dust and leaf-rot of a thousand generations of living things, had carried their residual awareness through centuries in which they were otherwise entirely gone. She was a living archive of everything that had ever been."),
		ShardLore.narration("The Shardstorm brought new beings. The wars that followed added them, rapidly and violently, to her collection."),
		ShardLore.dialogue("Mossborn the Remembering", "I remember a soldier from the western force. He was twenty-three years old. He had never seen a forest. He stopped to look at a mushroom the morning he died. He thought it was beautiful. I remember this. I will remember this. His name was Orvath Dann.", "sorrowful"),
		ShardLore.narration("She began to move through the battle-scarred territory, and where she moved, things grew back — not quickly, not dramatically, but inexorably."),
		ShardLore.dialogue("Mossborn the Remembering", "I remember them all. The least I can do is save the ones who are still alive to be remembered.", "quietly determined"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Living Record",
		"objectives_text": "Protect your allied units. Keep the Rootwalker warband alive through the engagement.",
		"pre_story": [
			ShardLore.narration("The first skirmish was brutal and chaotic in the way that early Shardlands engagements tended to be — confusion, terrain that didn't match any strategy, creatures encountering each other for the first time and responding with the instinctive aggression of things that did not understand what they were seeing."),
			ShardLore.dialogue("Mossborn the Remembering", "They are frightened. They are all frightened. The Emberclaw, the blood-drinkers, my own grove-kin. Frightened things fight badly. They also die easily. I will try to prevent the latter.", "calm focus"),
			ShardLore.narration("She moved to the center of the Rootwalker formation and began to radiate the soft, green warmth that old moss radiates in the morning — the healing aura that replenished bark and root and the living systems that war strained to breaking."),
		],
		"post_story": [
			ShardLore.narration("The engagement ended. The Rootwalkers were alive. Mossborn stood among them and counted the survivors with the focused attention of someone taking an inventory."),
			ShardLore.dialogue("Mossborn the Remembering", "All present. All alive. This is what success looks like for me. Not territory held or enemies defeated. Everyone alive at the end.", "relieved"),
		],
		"defeat_story": [ShardLore.dialogue("Mossborn the Remembering", "I lost one. I remember them now. I will remember them forever. This is the cost of failure for me — not the battle, but the memory I must carry. I will fail less.", "grieving")],
		"player_army": ["Mossborn the Remembering", "Thornwood Sentinels", "Grove Wardens", "Root Crawlers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Ashborn Infantry", "Emberclaw Warriors", "Ashwalker Skirmishers"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": [
			"Mossborn's Memory Bloom heals all friendly units within 3 tiles at the start of each round.",
			"Grove Wardens stack with Mossborn's aura — place them near the most wounded units.",
			"Mossborn has low ATK but can sustain through almost any fight. Keep her in the center.",
			"Protecting Mossborn protects your entire army. She is the most important unit on the field.",
		],
		"battle_modifiers": {"label": "Living Memory", "description": "The moss remembers health. All units gain +2 HP from Mossborn's healing aura.", "player_hp_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Voices in the Bark",
		"objectives_text": "Reach the war-damaged grove and cleanse the corruption before the memories are lost forever.",
		"pre_story": [
			ShardLore.narration("The Nightfang had passed through a section of old forest and left something behind — not just damage, but a corruption that was spreading through the root-web, a necromantic residue that turned the memories stored in the bark into something wrong."),
			ShardLore.dialogue("Mossborn the Remembering", "The trees are screaming. No one can hear them but me. They are being made to remember incorrectly — the corruption is rewriting the memory-rings with something that should not be there. If I cannot reach them, the records will be lost. The lives those trees were holding will be lost. Not dead. Erased. This is worse than death.", "urgent"),
		],
		"post_story": [
			ShardLore.narration("Mossborn reached the corrupted grove and spent three hours in contact with the infected trees, pulling the necromantic residue out through the root connection and processing it through her own bark until it was neutralized."),
			ShardLore.dialogue("Mossborn the Remembering", "The memories are preserved. I have them now — the fourteen generations that the corrupted trees were holding. The creatures of the Nightfang do not understand what they do when they corrupt the wood. They destroy history. Not just life. History.", "sorrowful and steady"),
		],
		"defeat_story": [ShardLore.dialogue("Mossborn the Remembering", "The corruption spread too far. The memories are gone. I could not reach them in time. I know their absence. That is its own memory. A space where something was and no longer is. I will carry the shape of the loss.", "grieving steadily")],
		"player_army": ["Mossborn the Remembering", "Thornwood Sentinels", "Grove Wardens", "Root Crawlers", "Deeproot Hulks"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Blood Reavers", "Nightfang Warriors", "Blood Thralls", "Blood Shamans"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": [
			"Shard Clash: the nodes are the corrupted trees — reach them and hold them for cleansing.",
			"Mossborn's Purifying Bloom cleanses corruption from adjacent terrain tiles.",
			"Deeproot Hulks tank the Nightfang blood-drinkers so Mossborn can reach the trees.",
			"Speed matters here — get to the outer nodes before the corruption spreads.",
		],
		"battle_modifiers": {"label": "Memory Preservation", "description": "The moss reaches for the infected wood. Mossborn gains +2 MOV this mission.", "player_mov_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Weight of Names",
		"objectives_text": "Protect the survivors of the Emberclaw assault — enemy soldiers wounded and left behind. They need healing. The forest remembers the ones it saved.",
		"pre_story": [
			ShardLore.narration("The Emberclaw had attacked and retreated and left their wounded behind. This was not unusual — fast-moving warbands sacrificed tactical support for speed. The wounded were now dying in the ruins of the battle, enemy combatants whose faction had not considered them worth retrieving."),
			ShardLore.dialogue("Mossborn the Remembering", "They are fire-creatures. They wounded my grove-kin. Their warband burned three trees I had been tending for two hundred years. I remember all of this.", "honest"),
			ShardLore.narration("A pause."),
			ShardLore.dialogue("Mossborn the Remembering", "I also remember the one who stopped to look at a mushroom. I remember the young ones who had not chosen to be soldiers and chose badly regardless. I remember everything. Including that the forest does not discriminate between those who need saving.", "decided"),
			ShardLore.narration("She moved toward the wounded."),
		],
		"post_story": [
			ShardLore.narration("She healed eleven Emberclaw soldiers over the course of the night. Three died before she reached them. She remembered their names. She added them to the collection."),
			ShardLore.dialogue("Mossborn the Remembering", "The eight who survived will carry something back to their warpack. A knowledge that the forest sometimes saves the enemies of the forest. I do not know what they will do with this information. I know only that I have done what the forest requires. The rest is theirs.", "quiet"),
		],
		"defeat_story": [ShardLore.dialogue("Mossborn the Remembering", "I could not protect them all. The battle drove me back before I reached the furthest wounded. They died alone in the ruins. I remember them now. That is all I can do, and it is not enough.", "quietly broken")],
		"player_army": ["Mossborn the Remembering", "Grove Wardens", "Thornwood Sentinels", "Root Crawlers", "Bramblethorn Archers"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Marshal Draven", "Gossamer Guard", "Venom Dancers", "Spiderling Swarm"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": [
			"Protect the wounded positions against the Thornweft secondary assault.",
			"Mossborn can heal friendly and neutral units — position her near the rescue points.",
			"Grove Wardens create a healing corridor between Mossborn and the furthest wounded.",
			"Bramblethorn Archers suppress approaching Thornweft to buy time for the heals.",
		],
		"battle_modifiers": {"label": "The Remembering", "description": "The moss extends its healing to the wounded of all factions. Mossborn's healing range is doubled.", "player_hp_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Long Memory",
		"objectives_text": "Reach the heart of the Shardstorm's damage and preserve the memory of what was here before. Stand witness.",
		"pre_story": [
			ShardLore.narration("The Shardstorm's initial impact point was a graveyard — not metaphorically. It had landed on a place where three hundred years of forest life had been buried and remembered, and the impact had violated the memory-ground in ways that Mossborn could feel from miles away. The records were incomplete now. The lives that had been stored there were fragmenting."),
			ShardLore.dialogue("Mossborn the Remembering", "I need to reach the impact point and hold it long enough to absorb what is left. The memories are scattering. I can gather them if I can get there before they are entirely gone.", "urgent, grieving"),
			ShardLore.narration("Every faction had sent forces to the same site. The Shardstorm impact point was a nexus of energy — valuable, contested, fought over. None of them knew what Mossborn was trying to preserve. None of them would have cared."),
			ShardLore.dialogue("Mossborn the Remembering", "Then I will make them irrelevant.", "flat and certain"),
		],
		"post_story": [
			ShardLore.narration("She reached the impact point and held it against everything the Shardlands sent, and absorbed the scattering memories through the soles of her root-feet. Hours passed. The battle raged around her. She did not move."),
			ShardLore.narration("When it was done, she stood — heavier than she had arrived, carrying more than she had carried before — and stood very still for a long time."),
			ShardLore.dialogue("Mossborn the Remembering", "I have them. Three hundred years of lives, the lives of everyone who lived and died on this ground before the storm came. They are in the bark now. They are in the moss. They will not be lost.", "slow and full"),
			ShardLore.narration("She looked at the impact crater — scoured clean, the memory-ground violated — and felt the absence of what had been there."),
			ShardLore.dialogue("Mossborn the Remembering", "The ground remembers the shape of the loss. I remember the loss itself. We will grow over it together, and the growth will be informed by what was there before, and something new will come that is also something very old. This is how memory works. This is how forests work. This is enough.", "sorrowful and complete"),
		],
		"defeat_story": [ShardLore.dialogue("Mossborn the Remembering", "The memories scattered entirely before I reached them. They are gone. The lives they held are gone. Not dead — erased. This is the worst thing the Shardstorm has done. I will not allow it to happen again. I will be faster. I will be earlier. I will be there before the loss.", "resolved through grief")],
		"player_army": ["Mossborn the Remembering", "Thornwood Sentinels", "Grove Wardens", "Root Crawlers", "Deeproot Hulks", "Ancient Rootwarden", "Sporecloud Drifters"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Emberclaw Warriors", "Ashborn Infantry", "Pyromancer Adepts", "Emberknight Riders", "Mature War Drake"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 8,
		"tutorial_tips": [
			"King of the Hill: Mossborn must hold the impact point. Her healing aura sustains the defense.",
			"Ancient Rootwarden at the center amplifies Mossborn's healing range to the entire field.",
			"Sporecloud Drifters create approach denial around the impact point.",
			"Mossborn's Memory Surge — activated when she holds an objective — heals all units to full HP.",
		],
		"battle_modifiers": {"label": "The Long Memory", "description": "The moss holds everything. Mossborn's healing is doubled while she holds the central position.", "player_hp_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Mossborn stood in the recovered territory and felt the weight of everything she carried."),
		ShardLore.narration("Fourteen generations of forest creatures. The names of soldiers from four different civilizations. The memory-rings of trees that no longer stood. The final thoughts of beings who had died in a war they had not chosen. She carried all of it, and the weight was enormous, and she bore it without complaint because that was what memory required."),
		ShardLore.dialogue("Mossborn the Remembering", "The Shardlands are creating memories very fast. Too fast for any one being to hold. But I will hold what I can. And the ones I cannot hold — they will be in the soil. They will be in the water. The forest forgets nothing, in the end. It just moves slower than we do.", "certain"),
		ShardLore.narration("She spread her roots into the newly cleaned soil and began, with enormous patience, to remember."),
	]

static func _defeat_story() -> Array:
	return [
		ShardLore.dialogue("Mossborn the Remembering", "I lost. Things died that I could have saved. I carry this. I will carry this longer than any living thing in this world. That is my function and my burden and the reason I cannot afford to lose again.", "heavy with purpose"),
	]
