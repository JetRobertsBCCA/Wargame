class_name RootwalkerIvywardenCampaign
## Ivywarden the Creeping — "Creeping Conquest"
## Territory control, every inch claimed.
## 4 missions. Teaches zone control, incremental capture, territorial denial.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_ivywarden",
		"commander": "Ivywarden the Creeping",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "Creeping Conquest",
		"description": "Ivywarden does not take territory. She claims it. The distinction is important: taking is fast and unstable. Claiming is slow and permanent. Every tile her ivy covers belongs to the grove. Every wall her tendrils reach belongs to the grove. By the time you notice what she is doing, she is already doing it somewhere you have not looked yet.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
		"defeat_story": _defeat_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("Ivy moves approximately twelve centimeters per day under ideal conditions."),
		ShardLore.narration("This seems slow. It is not slow if you have not checked the wall in three weeks and suddenly find it green from foundation to parapet, the mortar between stones replaced by root systems, the windows framed by tendrils that have worked their way through every gap and are now structurally load-bearing. It is especially not slow if the wall belongs to your fortress."),
		ShardLore.dialogue("Ivywarden the Creeping", "They defend what they can see. Twelve centimeters is invisible. Twelve centimeters, every day, for three hundred and sixty-five days, is over forty-three meters. They did not see me coming.", "quiet and satisfied"),
		ShardLore.narration("The Shardstorm had brought new structures, new territories, new surfaces that had never been covered. Ivywarden looked at them with the focused attention of someone who had been waiting for exactly this."),
		ShardLore.dialogue("Ivywarden the Creeping", "So much unclaimed territory. I will begin immediately. In three years, none of this will be unclaimed.", "certain"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Claim",
		"objectives_text": "Establish ivy coverage across the forward territory. Hold nodes. Let the claim spread.",
		"pre_story": [
			ShardLore.narration("The Thornweft had moved into the unclaimed territory first — their web-building instincts responding to the same uncovered surfaces that attracted Ivywarden, but at a much faster pace. The web was spreading across the territory at a rate that would claim it completely within weeks."),
			ShardLore.dialogue("Ivywarden the Creeping", "They are fast. Webs are fast. Ivy is slower than web. But ivy grows through web. Ivy grows through everything. Give the web something to hold onto and eventually the ivy will reclaim the thing the web was holding. I am patient. The web is also patient. We will see which patience is longer.", "calm assessment"),
		],
		"post_story": [
			ShardLore.dialogue("Ivywarden the Creeping", "Four nodes claimed. The ivy is established in the forward positions. The Thornweft web is still present — but the ivy is growing through it. Give it two weeks. The web will be a trellis for the ivy. Then the claim is mine.", "slow satisfaction"),
		],
		"defeat_story": [ShardLore.dialogue("Ivywarden the Creeping", "The web spread faster than the ivy. The nodes are silk-claimed, not root-claimed. A temporary situation. The ivy is at the base of every silk structure. It will take the structures from below. I need only time, and I have time.", "unperturbed")],
		"player_army": ["Ivywarden the Creeping", "Root Crawlers", "Grove Wardens", "Thornwood Sentinels"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Warden Regulars", "Gossamer Guard", "Spiderling Swarm"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 9,
		"tutorial_tips": [
			"Ivywarden's Ivy Spread ability covers adjacent tiles in ivy terrain at the end of each round.",
			"Ivy terrain gives Rootwalker units +1 DEF. Ivy on shard nodes counts as holding them.",
			"Root Crawlers spread underground quickly — they lay root tendrils for Ivywarden to follow.",
			"Hold nodes by covering them. The ivy claim stays even if Ivywarden moves away.",
		],
		"battle_modifiers": {"label": "The Creeping Claim", "description": "Ivy covers everything. Held nodes generate +1 ivy tile per round in all adjacent directions.", "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Every Wall Belongs",
		"objectives_text": "Claim the Iron Dominion fortifications. Take the walls from inside, not outside.",
		"pre_story": [
			ShardLore.narration("The Iron Dominion had built impressive fortifications — stone and metal, mechanically reinforced, designed to withstand direct assault. Their defensive positioning was excellent."),
			ShardLore.narration("They had not designed the fortifications to withstand being gradually eaten from the inside over a period of weeks."),
			ShardLore.dialogue("Ivywarden the Creeping", "The foundation drainage system provides access to the interior. The drainage runs under the courtyard. The ivy is already in the drainage system. This took eleven days. From the drainage system, the ivy can reach the interior walls. From the interior walls, the ivy can reach everything. The defenders do not know yet that their fortress is already partially mine.", "detached satisfaction"),
		],
		"post_story": [
			ShardLore.dialogue("Ivywarden the Creeping", "The fortifications were structurally weakened at the load-bearing points before the assault began. The walls fell easier than the Iron Dominion expected. They thought the walls were theirs. The walls had been mine for eight days. They just did not know it yet.", "precise"),
		],
		"defeat_story": [ShardLore.dialogue("Ivywarden the Creeping", "They found the ivy in the drainage system and sealed it. Thorough. They are thorough engineers. I will find a different entry point. There are always entry points. Everything has cracks.", "noting")],
		"player_army": ["Ivywarden the Creeping", "Root Crawlers", "Thornwood Sentinels", "Deeproot Hulks", "Grove Wardens"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Piston", "Infantry Regiment", "Steam Sentinels", "Gearwright Engineers", "Steam Heavy Guards"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": [
			"Last Stand assault: the ivy has already weakened the defenses — fortifications have reduced DEF.",
			"Deeproot Hulks complete the structural breach the ivy started.",
			"Ivywarden's Interior Claim ability: if she reaches the center structure, it is claimed permanently.",
			"Root Crawlers can surface inside the fortification — coordinate their emergence with the assault.",
		],
		"battle_modifiers": {"label": "Already Claimed", "description": "The ivy was already inside. Fortified positions have -2 DEF at the start of this mission.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Reclaim the Reclaimed",
		"objectives_text": "Push back the forces that cleared the ivy. Every cleared tile must be re-claimed. No territory stays lost.",
		"pre_story": [
			ShardLore.narration("The Nightfang had found the ivy. They had, with the methodical destruction of predators, begun systematically clearing it — burning it out of the structures they occupied, pulling it from the walls, treating the tendrils with something that inhibited regrowth."),
			ShardLore.dialogue("Ivywarden the Creeping", "They are clearing the claim. They are using fire and suppression chemicals. This is the most aggressive response to ivy I have experienced in two hundred years.", "impressed and annoyed"),
			ShardLore.narration("A pause."),
			ShardLore.dialogue("Ivywarden the Creeping", "The claim does not disappear because the surface was cleared. The roots are in the soil below the cleared tiles. The chemicals suppress growth for approximately six weeks. After six weeks, the growth returns. But I would prefer not to wait six weeks.", "decided"),
		],
		"post_story": [
			ShardLore.dialogue("Ivywarden the Creeping", "The cleared territory is re-claimed. The roots that the chemicals suppressed were not destroyed — they were dormant. When the Nightfang were removed, the dormant roots resumed growing. The claim was always there. It was simply waiting for the suppression to end.", "satisfied"),
		],
		"defeat_story": [ShardLore.dialogue("Ivywarden the Creeping", "The Nightfang's suppression chemicals are more durable than I calculated. The territory remains cleared for now. But the roots are still below the cleared soil. They are not destroyed. They are dormant. I will return when the chemicals degrade.", "patient")],
		"player_army": ["Ivywarden the Creeping", "Root Crawlers", "Thornwood Sentinels", "Deeproot Hulks", "Grove Wardens", "Bramblethorn Archers"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Countess Nyxara", "Blood Reavers", "Nightfang Warriors", "Shadow Stalkers", "Blood Shamans"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": [
			"Reclaiming cleared territory: Ivywarden's Resilient Root ability restores ivy claim to cleared tiles.",
			"Bramblethorn Archers target the Nightfang shamans who carry the suppression compounds.",
			"Grove Wardens accelerate ivy recovery in their healing zone.",
			"Clear suppressed tiles from the edge inward — restore the full claim systematically.",
		],
		"battle_modifiers": {"label": "The Persistent Claim", "description": "The claim cannot be erased. Cleared ivy tiles automatically re-claim after 2 rounds.", "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Creeping Conquest",
		"objectives_text": "Claim the final unconquered territory. Every tile. Leave nothing uncovered. This is the last unclaimed ground.",
		"pre_story": [
			ShardLore.narration("There was one section of the reclaimed territory that had resisted Ivywarden's claim for months — a barren expanse of Shardstorm-poisoned ground that the ivy could not penetrate because the soil was too toxic for root growth. The enemy forces had been using it as a staging ground, correctly gambling that she could not reach through the poisoned zone."),
			ShardLore.dialogue("Ivywarden the Creeping", "The poison is thinning. Two months ago it would have killed the roots. Last month it would have stunted them. This month, I believe, is the month it becomes claimable. The enemy does not know the poison is thinning. They think they are still safe on the far side of it.", "quiet certainty"),
			ShardLore.narration("She sent a root tendril into the poisoned zone and waited."),
			ShardLore.dialogue("Ivywarden the Creeping", "Yes. The root survives. The claim begins today.", "settled"),
		],
		"post_story": [
			ShardLore.narration("The final territory was claimed in fourteen days. The enemy forces retreated from the poisoned zone as the ivy advanced through it — slowly, but advancing — and found that the territory they had retreated to was already covered from a different approach they had not been watching."),
			ShardLore.dialogue("Ivywarden the Creeping", "Everything is claimed. The full territory. Every tile. There is no unclaimed ground remaining in the reclaimed zone. The conquest is complete. It took two years and four months. This is a satisfactory rate for complete territorial saturation.", "complete"),
			ShardLore.narration("She looked at the covered landscape — every surface green, every wall wrapped, every ruin threaded through with living root."),
			ShardLore.dialogue("Ivywarden the Creeping", "It belongs to the grove now. It will always belong to the grove now. The claim does not expire. The claim does not negotiate. The claim simply persists, forever, because the roots are always growing. Always creeping. Always reaching the next unclaimed thing.", "certain and satisfied"),
		],
		"defeat_story": [ShardLore.dialogue("Ivywarden the Creeping", "Unclaimed territory remains. The roots did not reach everywhere. The claim is incomplete. A temporary condition. The roots are still growing. The claim will complete. Nothing stays uncovered forever.", "patient certainty")],
		"player_army": ["Ivywarden the Creeping", "Root Crawlers", "Thornwood Sentinels", "Deeproot Hulks", "Grove Wardens", "Bramblethorn Archers", "Ancient Rootwarden", "Sporecloud Drifters"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Emberclaw Warriors", "Ashborn Infantry", "Pyromancer Adepts", "Ashwalker Skirmishers", "Emberknight Riders"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 9,
		"tutorial_tips": [
			"King of the Hill: claim the center and let the ivy spread outward from it.",
			"Ancient Rootwarden accelerates claim speed — every round he holds the center, the claim radius doubles.",
			"Ivywarden's Total Claim ability: if she holds all nodes simultaneously, the mission ends immediately.",
			"Emberclaw fire clears ivy — Ancient Rootwarden restores it faster than fire clears it.",
		],
		"battle_modifiers": {"label": "The Final Claim", "description": "Every tile belongs to the grove. Each ivy-covered tile gives all Rootwalker units +1 ATK.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Ivywarden stood in the center of the completely claimed territory and felt the ivy beneath her — every surface, every wall, every stone, every tile, all of it connected to her through the endless patient net of tendrils and roots and the slow green insistence of living things that do not ask permission."),
		ShardLore.dialogue("Ivywarden the Creeping", "This is what ownership means. Not flags. Not declarations. Not armies. Roots. Things grow here that are mine. They will be mine when I am gone, and they will be mine a thousand years from now, because the grove does not give things back. The grove claims and keeps. This is what conquest actually is.", "final"),
	]

static func _defeat_story() -> Array:
	return [
		ShardLore.dialogue("Ivywarden the Creeping", "The conquest is incomplete. Tiles remain unclaimed. This is temporary. The ivy is still growing. The roots are still spreading. The claim will complete. I have two hundred years of patience and the ivy grows twelve centimeters per day. The mathematics are in my favor. They have always been in my favor.", "returning to the work"),
	]
