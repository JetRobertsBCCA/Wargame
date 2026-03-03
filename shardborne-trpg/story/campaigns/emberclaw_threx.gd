class_name EmberclawThrexCampaign
## Skullcrusher Threx — "The Challenge"
## Melee duelist, Drake melee, Challenge mechanic. ATK 24.
## 4 missions. Teaches dueling, challenge mechanics, honor combat.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_threx",
		"commander": "Skullcrusher Threx",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "The Challenge",
		"description": "Skullcrusher Threx fights for honor. Every battle is a challenge, every enemy a potential duel. In the Shardlands, where the rules of war are forgotten, Threx insists on keeping them.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The challenge-skull hung from Threx's belt — forty-seven notches, one for every commander he had defeated in single combat. He had not lost a duel since he was fourteen."),
		ShardLore.dialogue("Skullcrusher Threx", "In Ignareth, war had rules. You challenged, you fought, you won or lost with honor. Here? The blood-drinkers fight like animals. The machine-folk fight like furniture. The spider-folk fight like traps. Nobody knows how to fight with honor anymore. I will teach them.", "disgusted"),
		ShardLore.narration("Threx was old-fashioned, stubborn, and utterly convinced that the Emberclaw code of honor was the only thing separating warriors from murderers. His soldiers adored him. His enemies respected him. Even the ones he crushed."),
		ShardLore.fhah_zolg("The honorable one. He fights by rules nobody agreed to. In a world where the rules don't exist, he invents them. That's either the noblest thing I've ever seen or the most delusional."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Challenge",
		"objectives_text": "Issue the traditional Emberclaw challenge. Defeat the Nightfang war-leader in single combat to force their raiding party to withdraw.",
		"pre_story": [
			ShardLore.dialogue("Skullcrusher Threx", "I will challenge their leader. One-on-one, fire-circle rules. If they have any honor at all, they will accept. If they don't... well, I'll fight them all. Same result, more work.", "formal"),
		],
		"post_story": [
			ShardLore.narration("The Nightfang war-leader accepted the challenge — driven by pride, by territory instinct, or perhaps by the simple fact that Threx was standing alone in front of their warband, arms folded, waiting."),
			ShardLore.narration("The duel lasted ninety seconds. Threx's skull-headed mace connected once, twice, and the war-leader crumpled. The raiding party, leaderless, withdrew."),
			ShardLore.dialogue("Skullcrusher Threx", "Notch forty-eight. Not a worthy fight — too fast, too easy. But the raiders are gone and nobody else had to die. That is the point of the challenge: to replace a battle with a duel, and save a hundred lives with one.", "teaching"),
		],
		"defeat_story": [
			ShardLore.dialogue("Skullcrusher Threx", "I lost? I LOST? This has not happened since... I need to train harder. The Shardlands have made me soft.", "outraged"),
		],
		"player_army": ["Skullcrusher Threx", "Emberclaw Warriors", "Scorched Veterans", "Unbonded Berserkers"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Tsuyukusa", "Lotus Ascetics", "Void Bolt Crossbowmen"],
		"battle_size": "skirmish",
		"scenario": "shardstorm",
		"round_limit": 5,
		"tutorial_tips": ["Threx has ATK 24 — send him straight at the enemy commander.", "Challenge: when Threx engages a commander, it's effectively a duel.", "Scorched Veterans have Stubborn. They hold the line while Threx duels."],
		"battle_modifiers": {"label": "Challenge Issued", "description": "Threx's challenge inspires his troops. All your units gain +1 MOR.", "player_mor_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Honor Guard",
		"objectives_text": "Defend the civilian convoy from the Thornweft ambush. Threx's honor demands it.",
		"pre_story": [
			ShardLore.dialogue("Skullcrusher Threx", "Civilians. Non-combatants. The spider-folk are targeting them — not for territory, not for resources, but for the web-cocoons. They wrap living people in silk and drain them. There is no honor in this. There is no strategy in this. There is only evil. And evil is what I was made to fight.", "righteous_fury"),
		],
		"post_story": [
			ShardLore.narration("Threx stood between the convoy and the Thornweft ambush force, his mace in one hand, his shield-drake snarling beside him. He did not charge. He did not retreat. He simply stood — an immovable wall of honor and fury — and dared them to come through him."),
			ShardLore.narration("They tried. They failed."),
			ShardLore.dialogue("Skullcrusher Threx", "The civilians are safe. Every one of them. I will not allow non-combatants to be taken. Not while I draw breath. This is not a rule of the Emberclaw code — this is a rule of decency.", "fierce"),
		],
		"defeat_story": [
			ShardLore.dialogue("Skullcrusher Threx", "They took civilians on my watch. I have failed the most basic duty of a warrior. This shame will drive me until I set it right.", "anguished"),
		],
		"player_army": ["Skullcrusher Threx", "Scorched Veterans", "Flameborn Guard", "Emberclaw Warriors", "Hatchery Guard", "Ashrider Scouts"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Marshal Draven", "Gossamer Guard", "Phase-Silk Infiltrators", "Venom Dancers", "Spiderling Swarm", "Web-Anchor Engineers"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["Last Stand: protect the convoy by surviving all rounds.", "Threx's Challenge draws enemies toward him. Use it to pull threats away from civilians.", "Hatchery Guard have Hold Ground — place them as defensive anchors.", "Flameborn Guard can screen the convoy from flanking attacks."],
		"battle_modifiers": {"label": "Protector's Oath", "description": "Threx fights to protect. He gains +2 DEF when near allied units.", "player_def_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Trial of Champions",
		"objectives_text": "The Iron Dominion's champion has accepted Threx's challenge. Winner takes the disputed territory.",
		"pre_story": [
			ShardLore.dialogue("Skullcrusher Threx", "The machine-folk's champion — a walking fortress called the Clockwork Titan. It has accepted my challenge. Single combat, winner takes the valley. The machine-lord calculates I will lose — my organic body against their mechanical perfection. He has miscalculated. Machines do not have heart. I do.", "anticipation"),
		],
		"post_story": [
			ShardLore.narration("The duel between Threx and the Clockwork Titan shook the ground. Machine-steel against living fire, calculated strikes against instinctive fury. The Titan was stronger. The Titan was tougher. The Titan fought with mathematical precision."),
			ShardLore.narration("Threx fought with something the Titan's programming couldn't account for: the absolute refusal to fall down."),
			ShardLore.narration("After forty-seven minutes — the longest duel of his career — Threx found the gap. His mace struck the Titan's central gear-heart. Once. The machine staggered. Twice. It stumbled. Three times. It fell."),
			ShardLore.dialogue("Skullcrusher Threx", "Notch forty-nine. The hardest fight of my life. The machine had every advantage — strength, armor, endurance. But it fought to win. I fought to not lose. There's a difference, and it matters.", "bloodied_but_unbowed"),
		],
		"defeat_story": [
			ShardLore.dialogue("Skullcrusher Threx", "The machine is too strong. Its armor absorbs everything I throw. I need to find its weakness. Every champion has one.", "studying"),
		],
		"player_army": ["Skullcrusher Threx", "Scorched Veterans", "Emberforged Blades", "Unbonded Berserkers", "Emberclaw Warriors", "Bonfire Keepers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lady Cogsworth", "Clockwork Titan", "Infantry Regiment", "Steam Sentinels", "Aether Blasters", "Clockwork Pioneers"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["King of the Hill: the dueling ground is the center.", "Threx vs. the Clockwork Titan is the key matchup. Build your strategy around it.", "Bonfire Keepers maintain morale during the long fight.", "Flameclaw Ravagers have Rend — they can damage even the Titan's armor."],
		"battle_modifiers": {"label": "Champion's Right", "description": "Threx fights with honor. He gains +2 ATK against commander and war machine units.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Fiftieth Notch",
		"objectives_text": "The greatest warriors of every faction have answered Threx's open challenge. Defeat them all to earn the fiftieth notch.",
		"pre_story": [
			ShardLore.dialogue("Skullcrusher Threx", "I have issued the Open Challenge — the greatest honor an Emberclaw warrior can offer. Any champion of any faction may answer. This is not about territory or politics. This is about honoring the warrior's code in a world that has forgotten it. Win or lose, the code endures.", "solemn"),
		],
		"post_story": [
			ShardLore.narration("They came from every faction. Nightfang berserkers, Iron Dominion champions, Thornweft blade-dancers, Veilbound duelists. Each one fought Threx's forces with everything they had. Each one was met with honor, respect, and devastating melee skill."),
			ShardLore.narration("When the last champion fell, Threx carved the fiftieth notch into his challenge-skull with deliberate care. Fifty victories. Fifty duels fought with honor."),
			ShardLore.dialogue("Skullcrusher Threx", "Fifty. Not fifty kills — fifty challenges answered. Fifty opportunities for the enemy to show their best and my warriors to rise above it. The code is not about winning. The code is about the fight being worth having. Every one of these was.", "reverent"),
		],
		"defeat_story": [
			ShardLore.dialogue("Skullcrusher Threx", "I fell short. Forty-nine notches. But the code says: you may challenge again. And I will. As many times as it takes.", "determined"),
		],
		"player_army": ["Skullcrusher Threx", "Scorched Veterans", "Unbonded Berserkers", "Emberforged Blades", "Flameborn Guard", "Emberclaw Warriors", "Phoenix Guard", "Bonfire Keepers"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Grand Fang Voraxis", "Tiger Berserkers", "Blood Reavers", "Nightfang Warriors", "Tiger Alpha", "Shadow Stalkers", "Blood Shamans", "Crimson Behemoth"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Grand Fang Voraxis is one of the toughest enemy commanders. Threx must face him.", "Phoenix Guard can resurrect once — use them as backup for Threx.", "Bonfire Keepers prevent morale breaks. Critical in a long fight.", "This is the ultimate test of melee combat. Position and timing are everything."],
		"battle_modifiers": {"label": "Warrior's Code", "description": "The Open Challenge empowers all. Both sides gain +1 ATK (honor demands it).", "player_atk_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Threx sat by the fire, carving the fiftieth notch with meticulous care. Around him, warriors from multiple factions — former enemies, now reluctant allies — shared a meal in the neutral ground of the challenge-circle."),
		ShardLore.dialogue("Skullcrusher Threx", "People ask why I fight with honor in a dishonorable world. The answer is simple: the world does not decide what I am. I do. I choose honor. I choose the code. I choose to treat every enemy as a worthy opponent, every battle as a sacred rite, every victory as a gift, and every defeat as a lesson. The world may be broken. I am not.", "absolute"),
		ShardLore.narration("The challenge-skull gleamed in the firelight — fifty notches, each one a story of courage, skill, and the stubborn insistence that even in a broken world, some things were still sacred."),
	]
