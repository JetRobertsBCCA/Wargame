class_name RootwalkerFernwhisperCampaign
## Fernwhisper — "Whispers in the Deep"
## Stealth/scout campaign, heard but never seen.
## 4 missions. Teaches scouting, ambush, information denial, invisible play.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_fernwhisper",
		"commander": "Fernwhisper",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "Whispers in the Deep",
		"description": "They have not seen Fernwhisper. They have felt her — the rustle in the undergrowth that precedes a flanking strike, the silence that falls just before the ambush, the knowledge that something ancient is watching them and choosing, for now, not to be seen. When she stops choosing, it will be too late.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
		"defeat_story": _defeat_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The ferns move when there is no wind."),
		ShardLore.narration("This is the first thing the Emberclaw scouts reported. The second thing they reported was the ambush. The third report — the one that would have described Fernwhisper in detail — was never filed because the scouts who would have filed it were, by that point, on their way back to their camp with a clear message that they were not welcome in the deep forest, and that the deep forest was watching them, and that the deep forest did not need to reveal itself to make this known."),
		ShardLore.dialogue("Fernwhisper", "They are loud. All of them. Every faction. They crash through the undergrowth and breathe too hard and step on every dry leaf. I have been moving through this forest for two hundred years without disturbing a single branch. It is not difficult. They simply do not try.", "barely audible"),
		ShardLore.narration("She dissolved back into the undergrowth. The forest went still."),
		ShardLore.narration("She was still there. She was always still there."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Unheard",
		"objectives_text": "Scout the enemy position and eliminate key targets without revealing your main force. Strike from concealment.",
		"pre_story": [
			ShardLore.narration("The Iron Dominion had established a forward observation post that was feeding coordinates back to their artillery. The artillery was precise, the coordination was efficient, and the Rootwalker positions were suffering as a result. Someone needed to address the observation post quietly."),
			ShardLore.dialogue("Fernwhisper", "Quietly. Yes. This is what I do.", "almost not there"),
			ShardLore.narration("She moved toward the post at the pace of someone who understood that the most dangerous thing was not the post's defenders but the post's communications back to the artillery. She needed to break the relay first. The defenders second. Ideally, the defenders would not know they had a first problem until it was too late to address the second."),
		],
		"post_story": [
			ShardLore.narration("The relay broke at midnight. The defenders noticed the silence and spent fifteen minutes investigating the wrong area. By the time they looked in the right area, Fernwhisper had been gone for ten minutes, and the observation post was a memory."),
			ShardLore.dialogue("Fernwhisper", "They looked everywhere I was not. This is the skill. Not invisibility. Redirection. The rustle in the wrong place. The shadow in the wrong corner. They see what I want them to see. Which is never me.", "quiet satisfaction"),
		],
		"defeat_story": [ShardLore.dialogue("Fernwhisper", "They spotted me. I was not where I should have been. I moved too slowly in the gap between the ferns. The light was wrong. I will remember this light angle.", "clinical")],
		"player_army": ["Fernwhisper", "Root Crawlers", "Bramblethorn Archers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Mechanized Scouts", "Aether Marksmen", "Gearwright Engineers"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 6,
		"tutorial_tips": [
			"Fernwhisper begins each mission in Deepwood Stealth — she is invisible until she attacks.",
			"Root Crawlers are also stealthy — they move underground and can surface anywhere.",
			"Bramblethorn Archers in forest terrain gain Canopy Cover — enemies cannot target them directly.",
			"Strike priority targets first. Eliminate their scouts before their main force can react.",
		],
		"battle_modifiers": {"label": "Heard But Unseen", "description": "The grove watches. All Rootwalker units begin concealed. Enemies cannot target them before line-of-sight is established.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Listening Ground",
		"objectives_text": "Intercept the enemy messenger column. Take the intelligence. Leave no trace.",
		"pre_story": [
			ShardLore.narration("The Nightfang were moving a courier — carrying detailed intelligence about the grove's defensive positions, compiled over weeks of careful observation. If the courier reached the main Nightfang force, the grove's concealment advantage would be nullified."),
			ShardLore.dialogue("Fernwhisper", "They think they have been watching. They have been watched. The distinction matters.", "quiet"),
			ShardLore.narration("The courier's route ran through a section of forest that Fernwhisper had been tending for sixty years. She knew every root, every branch, every patch of soft ground that did not announce a footstep. The courier did not."),
		],
		"post_story": [
			ShardLore.narration("The courier did not arrive. The intelligence did not reach the Nightfang command. Three days later, the Nightfang launched an assault on the grove using outdated information, and the ambush was waiting exactly where they had least expected one."),
			ShardLore.dialogue("Fernwhisper", "Information is terrain. I do not only control the physical terrain. I control what the enemy knows about the terrain. A battlefield the enemy understands correctly is a battlefield that costs blood. A battlefield the enemy misunderstands is a trap. I prefer traps.", "patient"),
		],
		"defeat_story": [ShardLore.dialogue("Fernwhisper", "The courier had a second route I did not know about. I had not fully mapped their intelligence network. This is a gap. I will fill this gap before the next engagement.", "noting the failure")],
		"player_army": ["Fernwhisper", "Root Crawlers", "Bramblethorn Archers", "Sporecloud Drifters"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Nightfang Warriors", "Shadow Stalkers", "Blood Thralls"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": [
			"Shard Clash: the nodes represent interception points along the courier route.",
			"Sporecloud Drifters create vision-obscuring terrain to hide your approach.",
			"Fernwhisper can intercept moving units — use her to cut off the courier directly.",
			"Shadow Stalkers can detect stealth — eliminate them first to maintain concealment.",
		],
		"battle_modifiers": {"label": "Intelligence Control", "description": "The grove controls information. Enemy units have reduced sightlines in forest terrain.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Deep Ambush",
		"objectives_text": "Draw the enemy deep into the grove and spring the ambush. Let them come. Let them think they are hunting.",
		"pre_story": [
			ShardLore.narration("The Thornweft had been tracking something in the deep forest — following a thread of readings that suggested a Rootwalker concentration, mapping out a route that would let them encircle and trap whatever was there."),
			ShardLore.narration("They were following the readings Fernwhisper wanted them to follow. She had been laying the trail for nine days."),
			ShardLore.dialogue("Fernwhisper", "They think they are hunting. They are being guided. The hunter who does not know they are prey is the most dangerous kind of prey — they commit completely, they do not hold reserves, they come deep where they cannot be reinforced. This is what I wanted.", "very quiet, very certain"),
		],
		"post_story": [
			ShardLore.narration("The Thornweft entered the prepared zone and found it empty. Two seconds passed while they processed the absence of their quarry. In the third second, everything around them moved."),
			ShardLore.dialogue("Fernwhisper", "They came exactly where I wanted them. They walked into the trap I built for them. This required nine days of preparation. It was worth nine days of preparation. This is always worth the preparation.", "precise satisfaction"),
		],
		"defeat_story": [ShardLore.dialogue("Fernwhisper", "They suspected the trail was false and stopped before the ambush zone. Their thread-readers are more sensitive than I estimated. I will set a more convincing trail next time. More details. The false trail needs to be indistinguishable from the real one.", "calibrating")],
		"player_army": ["Fernwhisper", "Root Crawlers", "Bramblethorn Archers", "Thornwood Sentinels", "Sporecloud Drifters"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Thread-Seer Kythara", "Silk-Warden Regulars", "Gossamer Guard", "Venom Dancers"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": [
			"Your forces begin surrounding the enemy. Converge from all sides simultaneously.",
			"Fernwhisper triggers the ambush signal — when she attacks, all concealed units reveal and strike.",
			"Broken Ground favors your concealed units — the Thornweft cannot see through terrain obscurement.",
			"Eliminate the Thread-Seer first — she can detect concealed units if given time.",
		],
		"battle_modifiers": {"label": "The Prepared Ground", "description": "The ambush is perfect. All Rootwalker units gain +3 ATK on the first round of combat.", "player_atk_bonus": 3},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Whispers in the Deep",
		"objectives_text": "Disappear. Let the enemy commander search. Be the forest. Let the forest be the weapon.",
		"pre_story": [
			ShardLore.narration("The enemy commander had decided on a direct approach: flood the forest with troops, saturate the undergrowth with search parties, deny Fernwhisper any hiding place. A logical strategy. Also, a losing one."),
			ShardLore.dialogue("Fernwhisper", "They are bringing everyone. Every soldier they have. They believe numbers compensate for the inability to see what they are fighting. They are not entirely wrong. Numbers do help with most problems.", "almost gentle"),
			ShardLore.narration("A pause."),
			ShardLore.dialogue("Fernwhisper", "I am not most problems.", "final"),
			ShardLore.narration("She dissolved into the undergrowth. The ferns moved once. Then everything was still."),
		],
		"post_story": [
			ShardLore.narration("The search lasted four days. By the end of the first day, three search parties had been eliminated without witnesses. By the end of the second day, the remaining parties were refusing to enter the undergrowth alone. By the end of the third day, they were refusing to enter the forest at all. On the fourth day, they began to retreat."),
			ShardLore.narration("Fernwhisper watched them go from the canopy of a tree she had been standing in for two days, silent as bark."),
			ShardLore.dialogue("Fernwhisper", "They searched for something that did not want to be found. The forest is very large. I am very patient. They are not. That is the arithmetic of stealth — it does not matter how many you send. It only matters how long you can keep sending them. They reached their limit. The forest never reaches its limit.", "quiet and vast"),
		],
		"defeat_story": [ShardLore.dialogue("Fernwhisper", "Too many eyes. Too many search parties. They saturated the forest with observation until there was no gap to move through. I was found. I will not be found again. The lesson: saturation is a counter to concealment. The counter to saturation is patience longer than they can maintain the search.", "adjusting")],
		"player_army": ["Fernwhisper", "Root Crawlers", "Bramblethorn Archers", "Thornwood Sentinels", "Sporecloud Drifters", "Ancient Rootwarden"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Skywatcher Orin", "Ashwalker Skirmishers", "Emberclaw Warriors", "Emberknight Riders", "Ashborn Infantry"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 9,
		"tutorial_tips": [
			"King of the Hill: hold the forest heart while denying the enemy observation of your positions.",
			"Ancient Rootwarden at center extends forest terrain — more forest means more concealment.",
			"Fernwhisper's Forest Meld ability makes her effectively immune to detection while in forest terrain.",
			"Skywatcher Orin has extended vision range — eliminate him early to restore your concealment advantage.",
		],
		"battle_modifiers": {"label": "The Forest Is the Weapon", "description": "The forest fights for Fernwhisper. All units in forest terrain are treated as concealed until they attack.", "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("The enemy forces withdrew, and the forest went quiet, and Fernwhisper stood in the center of the deep grove and became very still."),
		ShardLore.dialogue("Fernwhisper", "They came with numbers and light and noise and the certainty that presence equals power. They left with the understanding that what they cannot see cannot be fought. The forest does not need to reveal itself to win. It only needs to endure. And the forest always endures.", "very soft"),
		ShardLore.narration("The ferns moved, briefly, in a windless space."),
		ShardLore.narration("Then everything was still."),
		ShardLore.narration("She was still there."),
	]

static func _defeat_story() -> Array:
	return [
		ShardLore.dialogue("Fernwhisper", "I was found. I was found three times. Each time, the problem was a different variable I had not accounted for. I am accounting for them now. The fourth time, they will not find me. They will never find me again.", "precise and quiet"),
	]
