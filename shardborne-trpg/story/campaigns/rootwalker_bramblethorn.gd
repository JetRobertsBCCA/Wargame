class_name RootwalkerBramblethornCampaign
## Bramblethorn the Unrooted — "Crown of Thorns"
## Aggressive, thorn-warrior, charges into battle unlike other Rootwalkers.
## 4 missions. Teaches aggressive Rootwalker play, shock tactics, the outlier.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_bramblethorn",
		"commander": "Bramblethorn the Unrooted",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "Crown of Thorns",
		"description": "Rootwalkers are patient. Bramblethorn is not. His kin stand deep and reach slow and let the world come to them. Bramblethorn rips his roots free and charges into it — an explosion of thorns and fury that horrifies both his enemies and his allies. It works. That is the part no one likes to admit.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
		"defeat_story": _defeat_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The other Rootwalkers had a word for what Bramblethorn did."),
		ShardLore.narration("The word, loosely translated from the deep-root communication that served as Rootwalker language, meant something like 'the thing young saplings do before they develop proper bark and depth.' It was not a compliment."),
		ShardLore.narration("Bramblethorn did not care. The Shardstorm had shattered the sky and poisoned the earth and deposited five confused, violent civilizations in his forest, and standing still while they burned things seemed like an insufficient response."),
		ShardLore.dialogue("Bramblethorn the Unrooted", "I know, I know. 'Patience is a weapon.' 'The roots endure.' 'Let them come to us.' They ARE here. They are here NOW. They are burning things. While we wait, they burn. I choose not to wait.", "fierce"),
		ShardLore.narration("He ripped his roots free of the soil with a sound like a small earthquake and began moving toward the nearest army at a speed that had never been recorded for a Rootwalker in the history of the grove."),
		ShardLore.dialogue("Bramblethorn the Unrooted", "Thorns first. Questions later. This is my philosophy.", "committed"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Running Root",
		"objectives_text": "Charge into enemy territory and break the forward position before they can fortify it.",
		"pre_story": [
			ShardLore.narration("The Iron Dominion scouts had identified a gap in the grove's natural defenses and were moving to exploit it, methodically and at the measured pace of creatures that trusted their plans. They had not accounted for the possibility that a large tree would charge them at speed."),
			ShardLore.dialogue("Bramblethorn the Unrooted", "They are building a fortified position. If it is built, it will need to be dismantled. I prefer to prevent the construction. Motion now, fortification never.", "direct"),
			ShardLore.narration("He was already running by the time he finished the sentence."),
		],
		"post_story": [
			ShardLore.narration("The fortification was not built. The scouts had not anticipated being hit by something that moved like a cavalry charge and hit like a trebuchet. The forward position was broken before it was established."),
			ShardLore.dialogue("Bramblethorn the Unrooted", "See? Motion. Prevention. Clean outcome. No one builds a fortification in the ruins of a fortification. This is efficient.", "satisfied"),
		],
		"defeat_story": [ShardLore.dialogue("Bramblethorn the Unrooted", "I charged too soon. They had more reserves than I saw. Fine. Next charge, I check reserves first. Or I charge faster so the reserves don't have time to matter.", "deciding")],
		"player_army": ["Bramblethorn the Unrooted", "Thornwood Sentinels", "Root Crawlers", "Bramblethorn Archers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Mechanized Scouts", "Gearwright Engineers"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 6,
		"tutorial_tips": [
			"Bramblethorn's Thorn Rush ability grants +2 ATK and +2 MOV on the turn he charges from forest into open terrain.",
			"Unlike other Rootwalkers, Bramblethorn fights well in open terrain — his bonus applies everywhere.",
			"Root Crawlers pre-position behind enemy lines before Bramblethorn charges through.",
			"Win fast — Bramblethorn's offensive play is strongest early before enemies establish formation.",
		],
		"battle_modifiers": {"label": "The Charge", "description": "Aggression rewarded. Bramblethorn gains +2 ATK on turn 1 of combat.", "player_atk_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Into the Blood",
		"objectives_text": "Assault the Nightfang position directly. Break through their line before they can feed.",
		"pre_story": [
			ShardLore.narration("The blood-drinkers had set up a feeding ground near the grove's edge — a position where they waited for prey to come to them, sustained by the Shardstorm's disruption of the prey's usual caution. Bramblethorn found this philosophy of waiting aesthetically unpleasant."),
			ShardLore.dialogue("Bramblethorn the Unrooted", "They wait for things to come to them. I am a thing. I will come to them. At speed. With thorns. I suspect this is not what they anticipated.", "cheerful"),
			ShardLore.narration("The Nightfang sentinels saw him coming and had, perhaps, five seconds to reconsider their defensive positioning before he arrived."),
		],
		"post_story": [
			ShardLore.narration("The feeding ground was disrupted. Thoroughly. The blood-drinkers were fast and vicious, but they were predators built for hunting retreating prey, and Bramblethorn's tactic of charging directly at them — with no retreat, no hesitation, and an apparent indifference to their counter-attacks — left them without the right framework for response."),
			ShardLore.dialogue("Bramblethorn the Unrooted", "Predators expect prey. I am not prey. This confuses them. I enjoy this.", "openly pleased"),
		],
		"defeat_story": [ShardLore.dialogue("Bramblethorn the Unrooted", "The blood-drinkers are faster than I gave them credit for. And their bites carry something that slows the roots. Noted. I will charge harder next time to get through before the slow takes effect.", "tactical")],
		"player_army": ["Bramblethorn the Unrooted", "Thornwood Sentinels", "Root Crawlers", "Deeproot Hulks", "Bramblethorn Archers"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Blood Reavers", "Nightfang Warriors", "Blood Thralls", "Shadow Stalkers", "Tiger Berserkers"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": [
			"Shard Clash: charging to claim nodes is Bramblethorn's specialty — he can take nodes faster than anyone.",
			"Deeproot Hulks follow the charge and hold captured positions while Bramblethorn moves to the next.",
			"Shadow Stalkers can intercept Root Crawlers — watch flanks during the charge.",
		],
		"battle_modifiers": {"label": "Thorn Assault", "description": "Offensive momentum. Units that charged this round gain +1 DEF (thorns protect while moving).", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "What Patience Misses",
		"objectives_text": "Deep inside enemy territory — strike fast, break their supply line, and extract. Speed over endurance.",
		"pre_story": [
			ShardLore.narration("The other Rootwalkers had a strategy: wait, endure, let the enemy exhaust itself against the grove's defenses, and then slowly reclaim the ground. It was a good strategy. Bramblethorn did not dispute this."),
			ShardLore.dialogue("Bramblethorn the Unrooted", "Patience wins the long war. I agree. But while we are being patient, they are digging in. Reinforcing. Bringing more. Patience wins in ten years — aggression wins in ten days. I prefer ten days.", "blunt"),
			ShardLore.narration("He had identified the supply line — the logistical chain that kept the enemy forces in the field fed and armed. Cut it, and the slow attrition of their position became a fast collapse. The other Rootwalkers were skeptical. Bramblethorn was already moving."),
		],
		"post_story": [
			ShardLore.narration("The supply line was broken in a single night raid. The forward positions, stripped of resupply, began to crumble within days — exactly as Bramblethorn had calculated. The other Rootwalkers observed the result with the careful attention of beings who had not expected this to work."),
			ShardLore.dialogue("Bramblethorn the Unrooted", "Patience wins in ten years. Aggression wins in ten days. I said this before the raid and it has now been demonstrated. I will say it again at a later date when it is relevant. Which it will be.", "comfortable with being right"),
		],
		"defeat_story": [ShardLore.dialogue("Bramblethorn the Unrooted", "They anticipated a raid. They set a trap. It was a good trap — better than I expected from creatures that move this slowly. I was caught. I escaped. The supply line is intact. Patience will have to win this one. I hate this.", "honest")],
		"player_army": ["Bramblethorn the Unrooted", "Root Crawlers", "Bramblethorn Archers", "Sporecloud Drifters"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Marshal Draven", "Silk-Warden Regulars", "Gossamer Guard", "Venom Dancers"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 5,
		"tutorial_tips": [
			"Fast win condition — eliminate priority targets quickly and extract before reinforcements arrive.",
			"Sporecloud Drifters create obscuring terrain to cover your retreat route.",
			"Bramblethorn Archers fire on the move — use them to harass while Bramblethorn breaks the supply chain.",
			"Thornweft web slows movement — Root Crawlers are immune to web-slow.",
		],
		"battle_modifiers": {"label": "Raid Momentum", "description": "Speed and surprise. All units gain +2 MOV on turn 1.", "player_mov_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Crown of Thorns",
		"objectives_text": "Lead the assault on the enemy stronghold. Break the gate. Bramblethorn goes first.",
		"pre_story": [
			ShardLore.narration("The enemy stronghold was the last serious organized resistance in the reclaimed territory — a fortified position that had withstood siege, skirmish, and the patient pressure of the grove's slow advance. The other Rootwalkers were prepared to wait it out. The roots would reach the foundations eventually."),
			ShardLore.dialogue("Bramblethorn the Unrooted", "Eventually. Yes. Also we could charge the gate.", "reasonable tone"),
			ShardLore.narration("There was a very long silence in the root-web."),
			ShardLore.dialogue("Bramblethorn the Unrooted", "The gate is wood. I am older than the wood. I am harder than the wood. I am significantly more motivated than the wood. The mathematics of this are in my favor.", "patient explanation"),
			ShardLore.narration("He charged the gate. He went first. He always went first."),
		],
		"post_story": [
			ShardLore.narration("The gate held for approximately four seconds. The stronghold fell within the hour. Bramblethorn stood in the center of the collapsed fortifications with what could only be described as satisfaction, brushing splinters from his bark."),
			ShardLore.dialogue("Bramblethorn the Unrooted", "Crown of thorns. The aggressive thing leads. The sharp thing goes first. The grove follows after, when the path has been broken open. This is my function. I understand now that other Rootwalkers are the defense — the slow, certain, inexorable defense. I am not the defense. I am the reason the offense stops working before the defense is needed.", "understanding his place"),
			ShardLore.narration("He looked at the broken gate and the cleared stronghold and the open ground that the grove could now reclaim."),
			ShardLore.dialogue("Bramblethorn the Unrooted", "Also I enjoyed this. I am allowed to enjoy this. The roots understand me. Mostly.", "unapologetic"),
		],
		"defeat_story": [ShardLore.dialogue("Bramblethorn the Unrooted", "The gate held. The gate has never held against me before. I am impressed and furious in equal measure. I will come back with more fury and less impression.", "recalibrating")],
		"player_army": ["Bramblethorn the Unrooted", "Thornwood Sentinels", "Root Crawlers", "Deeproot Hulks", "Bramblethorn Archers", "Sporecloud Drifters", "Ancient Rootwarden"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Wyrmlord Tzarak", "Emberclaw Warriors", "Ashborn Infantry", "Emberknight Riders", "Pyromancer Adepts", "Mature War Drake"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": [
			"Last Stand assault: Bramblethorn leads the gate breach. Position him to hit the gate turn 1.",
			"Ancient Rootwarden converts captured breach points to forest, denying enemy retaking.",
			"Deeproot Hulks are your second wave — they reinforce the breach Bramblethorn creates.",
			"Sporecloud Drifters cover the assault approach, denying enemy ranged fire lanes.",
		],
		"battle_modifiers": {"label": "Crown of Thorns", "description": "The assault is led from the front. Bramblethorn gains +3 ATK on the first round of combat.", "player_atk_bonus": 3},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Bramblethorn stood in the cleared territory and watched the grove begin to reclaim it — the slow, patient, inexorable process of roots reaching and bark growing and the land remembering what it was supposed to be."),
		ShardLore.dialogue("Bramblethorn the Unrooted", "I opened the door. The grove walked in. This is how it is supposed to work. I am the thorn at the front of the root. The root is patient. The thorn does not need to be.", "at peace with this"),
		ShardLore.narration("He looked at the horizon, where the Shardstorm's fractures still lit the sky."),
		ShardLore.dialogue("Bramblethorn the Unrooted", "There is more to do. There is always more to do. Good.", "eager"),
	]

static func _defeat_story() -> Array:
	return [
		ShardLore.dialogue("Bramblethorn the Unrooted", "I lost. Charging into things does not always work. I knew this in theory. I know it in practice now. The theory was right. The practice hurt. I will charge again. The next charge will be better. It is always the next charge that works.", "undeterred"),
	]
