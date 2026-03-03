class_name EmberclawTzarakCampaign
## Wyrmlord Tzarak — "The Last Wyrm"
## Bonded to the legendary Obsidax. Melee powerhouse seeking to protect the last drakes.
## 4 missions. Teaches aggressive melee, war machine play, drake synergies.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_tzarak",
		"commander": "Wyrmlord Tzarak",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "The Last Wyrm",
		"description": "Wyrmlord Tzarak is bonded to Obsidax, the last Obsidian Wyrm. In the Shardlands, the nesting grounds are lost, the drakes are scattered, and the ancient bond between wyrm and rider is all that remains.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("Obsidax screamed."),
		ShardLore.narration("Not a battle-cry — a mourning-cry, deep and resonant, shaking the alien ground beneath them. The last Obsidian Wyrm — a creature older than the Emberclaw civilization itself — had felt the nesting grounds vanish. The eggs, the hatchlings, the future of dragonkind — gone."),
		ShardLore.dialogue("Wyrmlord Tzarak", "Easy, old friend. Easy. I feel it too. The Bond aches where the nesting grounds should be. But we are still here. You and I. That means the drakes are not finished. Not while we draw breath.", "soothing"),
		ShardLore.narration("Tzarak was the largest Emberclaw warrior — seven feet of obsidian-scaled muscle, bonded to a wyrm whose wingspan blocked the sun. In Ignareth, they had been the ultimate weapon. Here, they were refugees."),
		ShardLore.fhah_zolg("The dragon-lord and his pet mountain. Oh, this one fights like a natural disaster. I do enjoy natural disasters."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Scattered Clutch",
		"objectives_text": "Locate and protect the surviving drake eggs scattered across the battlefield. Destroy all threats.",
		"pre_story": [
			ShardLore.dialogue("Wyrmlord Tzarak", "Drake eggs survived the transit — I can feel them through the Bond. Scattered, vulnerable, cooling. We move now. Obsidax, with me.", "urgent"),
		],
		"post_story": [
			ShardLore.narration("Seven eggs recovered. Obsidax curled around them protectively, radiating volcanic heat to keep them viable. Tzarak stood guard, his obsidian blade still smoking with the blood of predators."),
			ShardLore.dialogue("Wyrmlord Tzarak", "Seven. Seven eggs from a clutch of forty. It is enough. It must be enough.", "grim"),
		],
		"defeat_story": [
			ShardLore.dialogue("Wyrmlord Tzarak", "The eggs are lost. Obsidax... I am sorry, old friend. We will find more. There must be more.", "devastated"),
		],
		"player_army": ["Wyrmlord Tzarak", "Emberclaw Warriors", "Drake Handlers", "Hatchery Guard"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Rengoku", "Starblade Samurai", "Flow Adepts"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Tzarak is the toughest commander in the Emberclaw roster. Use him as your spearhead.", "Drake Handlers can calm and direct drake units. Keep them near Hatchery Guard.", "Hatchery Guard have Stubborn and Hold Ground — they will not break."],
		"battle_modifiers": {"label": "Wyrm's Fury", "description": "Obsidax's rage empowers Tzarak. He gains +2 ATK this battle.", "player_atk_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Nest of Thorns",
		"objectives_text": "Clear the Thornweft web-nest that has ensnared young drakes. Free the captives.",
		"pre_story": [
			ShardLore.narration("The spider-folk had captured three young drakes — cocooned in web, slowly being drained of heat-energy to fuel the Thornweft's anchor points."),
			ShardLore.dialogue("Wyrmlord Tzarak", "They have taken our young. They wrap them in silk and drink their fire. This ends. Now. Obsidax — BURN IT ALL.", "rage"),
		],
		"post_story": [
			ShardLore.narration("The web-nest burned. Three young drakes, disoriented but alive, stumbled from the melting cocoons and immediately bonded with the nearest Emberclaw handlers. The ancient instinct held — even in an alien world, drakes knew their people."),
			ShardLore.dialogue("Wyrmlord Tzarak", "Three more. Three young ones who will grow into war drakes. The clutch survives. The bond survives. The spiders will learn — you do not cage fire.", "satisfied"),
		],
		"defeat_story": [
			ShardLore.dialogue("Wyrmlord Tzarak", "The web is too thick. We need fire — more fire. Bring the Pyromancers next time.", "frustrated"),
		],
		"player_army": ["Wyrmlord Tzarak", "Emberclaw Warriors", "Flameborn Guard", "Drake Handlers", "Hatchery Guard", "Emberknight Riders"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Warden Regulars", "Gossamer Guard", "Venom Dancers", "Web-Anchor Engineers", "Spiderling Swarm", "Brood-Mother Spider"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Tzarak's melee stats are devastating — charge him into the web-nest center.", "Emberknight Riders can fly over web terrain to strike from behind.", "Drake Handlers boost all drake-type units. Keep them in the formation."],
		"battle_modifiers": {"label": "Burning Web", "description": "Fire destroys web terrain. Your units' attacks clear web-tiles they pass through.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Wyrm's Flight",
		"objectives_text": "Escort Obsidax through hostile airspace to the volcanic shard deposit where drakes can nest.",
		"pre_story": [
			ShardLore.dialogue("Wyrmlord Tzarak", "The volcanic shard deposit to the west — it radiates the same heat as the Burning Peaks. Obsidax could nest there. The eggs could hatch. But the machine-lord's anti-air batteries control the air corridor. We go through them.", "deliberate"),
		],
		"post_story": [
			ShardLore.narration("The volcanic deposit blazed with familiar heat. Obsidax landed, tested the ground, and for the first time since arriving in the Shardlands, made the deep, rumbling sound that drakes only made in one place: home."),
			ShardLore.dialogue("Wyrmlord Tzarak", "She accepts the nest. The eggs will hatch. The drakes will fly again. Whatever else happens in this broken world, the bond between Emberclaw and dragonkind will endure.", "emotional"),
		],
		"defeat_story": [
			ShardLore.dialogue("Wyrmlord Tzarak", "Their guns control the sky. We need to silence the batteries before Obsidax can fly. Ground assault next time.", "tactical"),
		],
		"player_army": ["Wyrmlord Tzarak", "Flameborn Guard", "Emberknight Riders", "Skytalon Lancers", "Drake Handlers", "Mature War Drake"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Steam Sentinels", "Steam-Powered Sharpshooters", "Steam Artillery Crew", "Aether Blasters", "Clockwork Titan"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply Lines: secure the air corridor by controlling both endpoints.", "The Mature War Drake is a flying war machine. It can clear a path.", "Skytalon Lancers have Inferno Charge — devastating against ground targets from the air."],
		"battle_modifiers": {"label": "Wyrm Bond", "description": "Obsidax fights alongside Tzarak. All drake units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Last Wyrm",
		"objectives_text": "Defend the new nesting grounds against the massive Nightfang assault. Obsidax and the eggs must survive.",
		"pre_story": [
			ShardLore.dialogue("Wyrmlord Tzarak", "They have found the nest. Every predator in the Shardlands — drawn by the heat, the life, the vulnerability of unhatched eggs. This is the battle I was born for. Obsidax — spread your wings. Show them why we are called Wyrmlords.", "absolute"),
		],
		"post_story": [
			ShardLore.narration("The nesting grounds held. Obsidax, fully unleashed, was a force of nature — Cataclysm Breath and Earthquake Stomp reducing entire formations to ash and rubble. Tzarak fought at her side, obsidian blade carving through anything that survived the flame."),
			ShardLore.narration("When it was over, the eggs cracked. Seven hatchlings emerged, mewling and fiery, blinking at a world that was not Ignareth but would have to do."),
			ShardLore.dialogue("Wyrmlord Tzarak", "Seven hatchlings. Seven new drakes for a new world. The bond endures. The fire endures. And when the coalition calls, the drakes will answer.", "proud"),
		],
		"defeat_story": [
			ShardLore.dialogue("Wyrmlord Tzarak", "If the nest falls... we retreat with the eggs. The drakes' legacy cannot die here. There will be another nesting ground. There must be.", "desperate"),
		],
		"player_army": ["Wyrmlord Tzarak", "Flameborn Guard", "Hatchery Guard", "Scorched Veterans", "Drake Handlers", "Emberknight Riders", "Obsidax", "Fledgling Swarm"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Lord Sanguinar", "Blood Reavers", "Nightfang Warriors", "Tiger Berserkers", "Shadow Stalkers", "Blood Shamans", "Tiger Alpha", "Crimson Behemoth"],
		"battle_size": "epic",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["This is the hardest Emberclaw battle. Obsidax is your ultimate weapon.", "Obsidax has Cataclysm Breath and Earthquake Stomp — devastating area attacks.", "Fledgling Swarm are expendable screens. Sacrifice them to protect the eggs.", "Tzarak and Obsidax together are nearly unstoppable in melee."],
		"battle_modifiers": {"label": "Mother's Fury", "description": "Obsidax defends her nest. She gains +2 ATK and +1 DEF.", "player_atk_bonus": 2, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("The nesting grounds blazed with new life — seven hatchlings growing stronger every day, bonding with young Emberclaw warriors, learning to fly in alien skies."),
		ShardLore.dialogue("Wyrmlord Tzarak", "Vex leads the war. Kora tends the wounded. Ryx seeks the way home. My duty is simpler and older than any of theirs: I keep the drakes alive. I keep the bond alive. Everything else — politics, coalitions, gods — is secondary to life.", "simple_truth"),
		ShardLore.narration("Obsidax spread her wings over her hatchlings and roared — not in fury, but in triumph. The last Obsidian Wyrm was no longer the last. The species endured. And in the Shardlands, where everything was broken, that was the most profound victory possible."),
	]
