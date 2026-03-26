class_name RootwalkerVerdantPatriarchCampaign
## The Verdant Patriarch — "The Living Wall"
## Fortification campaign, becomes the wall.
## 4 missions. Teaches terrain fortification, living barrier play, area denial.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_verdant_patriarch",
		"commander": "The Verdant Patriarch",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "The Living Wall",
		"description": "The Verdant Patriarch is not a commander who builds walls. He is a commander who becomes one. Where he stands, the grove thickens. Where he roots, the terrain closes. Armies have broken against him for three centuries. He has never needed to attack. He has only ever needed to stand there.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
		"defeat_story": _defeat_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("Three hundred years ago, an army had attempted to pass through the valley at the grove's northern edge. The Verdant Patriarch had stood in the valley mouth and declined to let them."),
		ShardLore.narration("The army had attacked. The Patriarch had stood. The army had attacked from the flanks. The flanks had been root-covered terrain that was, by the time the flanking force arrived, considerably more overgrown than it had been an hour before. The army had waited three days, then left."),
		ShardLore.narration("The Patriarch had not moved from the valley mouth in those three days. He was waiting to see if they would come back. They did not come back."),
		ShardLore.dialogue("The Verdant Patriarch", "The wall does not pursue. The wall does not need to pursue. What cannot pass the wall does not need to be pursued.", "measured"),
		ShardLore.narration("The Shardstorm had relocated the valley. The Patriarch relocated himself accordingly and resumed standing."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Wall",
		"objectives_text": "Establish a defensive line across the approach corridor. Let the enemy come to you. Let nothing through.",
		"pre_story": [
			ShardLore.narration("The Iron Dominion had identified the approach corridor as strategically valuable and were moving to occupy it. Their assessment was correct. Their timing was poor."),
			ShardLore.dialogue("The Verdant Patriarch", "They are moving quickly. Quick-moving forces commit to their approach before they understand what they are approaching. They will not understand what they are approaching until they are already committed. This is their disadvantage and my preference.", "patient"),
		],
		"post_story": [
			ShardLore.dialogue("The Verdant Patriarch", "The corridor is closed. The Dominion found that the approach that had been passable three hours ago was no longer passable. This is accurate. It is no longer passable because I am standing in it. This situation is not temporary. This situation is permanent as long as I choose it to be.", "immovable"),
		],
		"defeat_story": [ShardLore.dialogue("The Verdant Patriarch", "They flanked too quickly for the root-walls to close. I need more time before the assault arrives. I will establish the position earlier next time.", "noting")],
		"player_army": ["The Verdant Patriarch", "Thornwood Sentinels", "Thornwall Bastion", "Grove Wardens"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Steam Sentinels", "Mechanized Scouts"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": [
			"The Verdant Patriarch's Living Wall ability creates impassable root terrain in a line when he stands still.",
			"Thornwall Bastion fills gaps in the root-wall line — use it to seal flanking routes.",
			"Grove Wardens sustain the Patriarch and the Sentinels holding the wall.",
			"The wall is strongest in the center. Anchor on the Patriarch and extend outward.",
		],
		"battle_modifiers": {"label": "The Living Wall", "description": "The Patriarch becomes terrain. Enemies must spend double movement to enter his zone of control.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Root and Stone",
		"objectives_text": "Seal the entire approach network. Hold every chokepoint simultaneously.",
		"pre_story": [
			ShardLore.narration("The Dominion had brought engineers. This was a reasonable response to finding their primary approach blocked — find secondary approaches, evaluate them, map a path through the least-defended chokepoints. A sound tactical assessment."),
			ShardLore.dialogue("The Verdant Patriarch", "They have identified four alternate approach routes. This is thorough. I will need to be in four places simultaneously. This is possible. Roots are everywhere. I am, in a meaningful sense, everywhere that my roots are.", "patient"),
		],
		"post_story": [
			ShardLore.dialogue("The Verdant Patriarch", "Four chokepoints held. They tested all four simultaneously — a coordinated probe. The probes found root-walls in every corridor. The engineers are reassessing. Their reassessment will conclude that the approach network is closed. It is closed.", "flat and final"),
		],
		"defeat_story": [ShardLore.dialogue("The Verdant Patriarch", "They found the fifth approach vector. I did not know about the fifth approach vector. My root-web was not complete. I am completing it now.", "systematic")],
		"player_army": ["The Verdant Patriarch", "Thornwood Sentinels", "Thornwall Bastion", "Grove Wardens", "Root Crawlers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["High Engineer Vortan", "Infantry Regiment", "Gearwright Engineers", "Mechanized Scouts", "Steam Sentinels"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 8,
		"tutorial_tips": [
			"Shard Clash with multiple chokepoints — each node is an approach route to seal.",
			"Root Crawlers are your rapid response. Use them to plug gaps before they become breaches.",
			"Thornwall Bastion creates permanent terrain. Each placement closes an approach permanently.",
			"The Patriarch at center extends his root-wall to all nodes within range.",
		],
		"battle_modifiers": {"label": "Root and Stone", "description": "The wall extends everywhere. Thornwall Bastion creates twice as much blocking terrain per use.", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "What Walls Grow",
		"objectives_text": "As the wall expands, the grove expands with it. Hold the growing perimeter.",
		"pre_story": [
			ShardLore.narration("The wall had been standing for two weeks, and in those two weeks, the grove had begun to grow behind it. This was the part that the Iron Dominion's tactical assessments had missed — the wall was not static. It was alive. Every day it stood, it grew wider, deeper, more entrenched. The approach corridors that had been merely obstructed were becoming forest."),
			ShardLore.dialogue("The Verdant Patriarch", "A wall made of stone requires maintenance. A wall made of roots requires only time. I have time. The roots have time. Every day the wall stands, it becomes more wall. The Dominion's engineers can dismantle stone. They cannot dismantle growth.", "certain"),
		],
		"post_story": [
			ShardLore.dialogue("The Verdant Patriarch", "The perimeter held. The grove expanded twelve meters during the engagement. This is twelve more meters that cannot be un-groved. The approach is narrower now than it was at the beginning of this battle. By the end of the campaign, there will be no approach left. There will be only grove.", "measured satisfaction"),
		],
		"defeat_story": [ShardLore.dialogue("The Verdant Patriarch", "They broke through the perimeter. The grove was pushed back. But not destroyed — the roots are still there, beneath the cleared ground. Give them a season. The grove will reclaim what was cleared. The breach is temporary. My patience is not.", "certain")],
		"player_army": ["The Verdant Patriarch", "Thornwood Sentinels", "Deeproot Hulks", "Thornwall Bastion", "Grove Wardens", "Root Crawlers", "Ancient Rootwarden"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Lord Sanguinar", "Blood Reavers", "Nightfang Warriors", "Corruption Guard", "Blood Shamans"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 8,
		"tutorial_tips": [
			"Broken Ground: the Patriarch turns broken terrain to forest terrain — your growth is accelerated.",
			"Ancient Rootwarden converts terrain each round — prioritize clearing broken tiles near chokepoints.",
			"Deeproot Hulks are immune to terrain effects — deploy them as assault blockers.",
			"The Nightfang have corruption abilities — Grove Wardens cleanse corruption from Patriarch's zone.",
		],
		"battle_modifiers": {"label": "The Wall Grows", "description": "The living wall expands. Each round, root terrain extends one tile in all directions from held positions.", "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Living Wall",
		"objectives_text": "Seal the final approach permanently. When the last corridor closes, the territory is the grove's. Hold.",
		"pre_story": [
			ShardLore.narration("There was one approach remaining — a wide-valley transit route that the root-walls had been converging on for weeks but had not yet fully sealed. The enemy forces knew this. They had pulled everything they had and were committed to forcing the corridor while it remained open."),
			ShardLore.dialogue("The Verdant Patriarch", "The last approach. They are correct that I have not closed it yet. They are incorrect that this represents an opportunity for them. The closing is not complete. The closing is also inevitable. They cannot get through in the time they have available. They may not know this yet. They will know it eventually.", "unhurried"),
			ShardLore.narration("He moved to the corridor mouth. The roots moved with him. The grove thickened at his back."),
		],
		"post_story": [
			ShardLore.narration("The corridor closed on the twenty-second day of the assault, midway through a battle that the enemy forces had been winning by most conventional metrics. The walls didn't close dramatically — they grew, the way walls made of living things grow, increment by increment until the increments added up to solid."),
			ShardLore.narration("When the last gap sealed, the enemy forces found themselves in a space that no longer had an exit and was getting smaller."),
			ShardLore.dialogue("The Verdant Patriarch", "The wall is complete. The territory is grove. There are no approaches remaining. There will be no approaches remaining. The grove does not leave gaps.", "absolute"),
		],
		"defeat_story": [ShardLore.dialogue("The Verdant Patriarch", "They forced the corridor. The last approach remains open. I will close it. The roots are still there. The root-walls are still growing. A single battle does not determine the outcome. Three centuries of standing determined the outcome. I will stand until it is determined correctly.", "patient and immovable")],
		"player_army": ["The Verdant Patriarch", "Thornwood Sentinels", "Deeproot Hulks", "Thornwall Bastion", "Grove Wardens", "Root Crawlers", "Ancient Rootwarden", "Grove Colossus"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Wyrmlord Tzarak", "Unbonded Berserkers", "Emberclaw Warriors", "Ashborn Infantry", "Pyromancer Adepts", "Emberknight Riders", "Immolation Bombers"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 9,
		"tutorial_tips": [
			"King of the Hill: the corridor center is the final sealing point. Hold it until the roots close.",
			"Grove Colossus combined with Thornwall Bastion creates an impassable double-layer at the corridor.",
			"The Patriarch's Corridor Close ability accelerates sealing while he holds the center.",
			"Emberclaw will try to burn the root-walls — Ancient Rootwarden regrows them faster than fire clears them.",
		],
		"battle_modifiers": {"label": "The Final Wall", "description": "The closing is inevitable. Each round the Patriarch holds the center, the corridor seals by 20%. At 100%, enemies cannot retreat.", "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("The last corridor sealed, and the territory became grove, and the Verdant Patriarch stood at the center of the closed perimeter for three days before anyone thought to ask if he intended to move."),
		ShardLore.dialogue("The Verdant Patriarch", "No.", "clear"),
		ShardLore.narration("He had been standing in one place or another for three hundred years. The specific place had changed. The standing had not."),
		ShardLore.dialogue("The Verdant Patriarch", "The wall is the grove. The grove is the wall. This is what the others sometimes fail to understand — the defense is not separate from the growth. The wall grows. The grove defends. These are the same thing. I am both. I always have been.", "settled"),
	]

static func _defeat_story() -> Array:
	return [
		ShardLore.dialogue("The Verdant Patriarch", "The wall fell. In three hundred years, no wall I have been part of has fallen. One has fallen now. The wall was made of living things, and living things can be killed. The roots are still there. The wall will grow again. Slower this time. Stronger. Walls learn from falling. So do I.", "incorporating"),
	]
