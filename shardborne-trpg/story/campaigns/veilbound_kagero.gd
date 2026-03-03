class_name VeilboundKageroCampaign
## Cmdr Kagero — "The Heat Haze"
## Assassin, Stealth. ATK 18, DEF 3, HP 24, MOV 10, CMD 6.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_kagero",
		"commander": "Cmdr Kagero",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "The Heat Haze",
		"description": "Commander Kagero is the Shogunate's deadliest assassin. ATK 18, MOV 10 — she shimmers like a heat haze and strikes like a phantom blade. Targets die without knowing who killed them.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Cmdr Kagero", "Kagero — heat haze. The shimmer above hot ground that makes the air itself lie. You see me, but I am not there. You look where I was, and I am already behind you. The Shogun does not speak my name publicly. He does not acknowledge my missions. I do not exist in the official records. But the Shogun's enemies die with precision, and no one knows how. That is Kagero. That is me.", "whisper"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Phantom Blade",
		"objectives_text": "Eliminate an Emberclaw war-chief through stealth infiltration.",
		"pre_story": [ShardLore.dialogue("Cmdr Kagero", "The Emberclaw war-chief coordinates raids against our supply lines. The Shogun wants this stopped. Not through battle — through REMOVAL. I go with Silent Ink Assassins. We enter their camp as shadows, find the chief, and remove the problem. Clean. Quiet. Final. The heat haze does not fight armies. She kills the one person whose death unravels everything.", "cold_precision")],
		"post_story": [ShardLore.dialogue("Cmdr Kagero", "The chief fell between one heartbeat and the next. His guards saw nothing. His sentries heard nothing. By the time the body was discovered, I was three miles away, already planning the next withdrawal. An assassination is not a battle. It is a statement: you are not safe. Nowhere is safe. The heat haze reaches everywhere.", "ghost_voice")],
		"defeat_story": [ShardLore.dialogue("Cmdr Kagero", "He sensed me. Animal instinct — the Emberclaw have that. Their senses are sharp enough to detect killing intent. Need to suppress intent itself.", "frustrated")],
		"player_army": ["Cmdr Kagero", "Silent Ink Assassins", "Ink Shadow Scouts", "Moonlit Wanderers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Cinderfist Brok", "Emberclaw Warriors", "Silent Wing Scouts", "Fledgling Swarm"],
		"battle_size": "skirmish",
		"scenario": "supply_lines",
		"round_limit": 5,
		"tutorial_tips": ["Kagero is an assassin. Target elimination is the goal.", "Silent Ink Assassins cloak and phase — perfect for infiltration.", "Ink Shadow Scouts reveal enemy patrol patterns.", "Moonlit Wanderers cause diversion and disengage freely.", "Kill the commander. Everything else is secondary."],
		"battle_modifiers": {"label": "The Phantom Blade", "description": "Assassination doctrine. All stealth units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Haze and Mirrors",
		"objectives_text": "Sabotage Iron Dominion command infrastructure through stealth operations.",
		"pre_story": [ShardLore.dialogue("Cmdr Kagero", "The Iron Dominion's command network is centralized — a vulnerability they don't recognize because they've never faced a proper assassin. Their grid relays, their communication nodes, their command constructs — all connected, all dependent. Cut the connections and the grid fragments. I don't need to fight their army. I need to make their army unable to fight ITSELF. Haze obscures. Mirrors deceive. And in the confusion, the blade falls.", "calculating")],
		"post_story": [ShardLore.dialogue("Cmdr Kagero", "Seven relay nodes destroyed. Their grid fragmented into isolated clusters — each one functional, none of them coordinated. The Dominion army went from a single unified force to seven confused detachments in twelve minutes of targeted sabotage. I didn't fight a single soldier. I fought their INFRASTRUCTURE. And infrastructure doesn't fight back.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Cmdr Kagero", "Redundant systems. They had backup relays for every primary. Cut one, another activates. Their paranoia about system failure saved them from sabotage.", "impressed")],
		"player_army": ["Cmdr Kagero", "Silent Ink Assassins", "Lotus Phantom Assassins", "Ink Shadow Scouts", "Ink Messengers", "Moonlit Wanderers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lady Brassveil", "Clockwork Infantry", "Mechanized Scouts", "Steam Heavy Guards", "Infantry Regiment", "Gearwright Artillery"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 6,
		"tutorial_tips": ["Sabotage mission. Destroy infrastructure, not soldiers.", "Lotus Phantom Assassins teleport to relay nodes.", "Ink Messengers are fast couriers — use for repositioning intel.", "Silent Ink Assassins eliminate guards at each target.", "Ink Shadow Scouts locate relay nodes for targeting.", "Avoid pitched battles. If you're in melee, you've already failed."],
		"battle_modifiers": {"label": "Haze and Mirrors", "description": "Sabotage operations. All stealth units gain +1 ATK, +1 MOV.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Shadow Dance",
		"objectives_text": "Conduct a shadow war against Nightfang assassins — predator against predator.",
		"pre_story": [ShardLore.dialogue("Cmdr Kagero", "The Nightfang have their own assassin — Shadowfang Kreev. We've been circling each other for weeks. Tonight, we meet. Not by chance — by design. I've mapped his patrol patterns, studied his kills, analyzed his methodology. He's good. Silent, fast, lethal. But he lacks something I have: ARTISTRY. Kreev kills efficiently. Kagero kills BEAUTIFULLY. The shadow dance begins.", "intense")],
		"post_story": [ShardLore.dialogue("Cmdr Kagero", "We fought in silence — not a word, not a cry, not a wasted breath. Blade against blade in the dark. His technique was pure instinct — animal reflexes honed to supernatural speed. Mine was trained art — every movement rehearsed ten thousand times until it became something beyond technique. Art defeated instinct. Barely. The heat haze danced, and Kreev's shadow... RETREATED, for the first time in his existence.", "breathless")],
		"defeat_story": [ShardLore.dialogue("Cmdr Kagero", "He reversed my own technique against me. Kreev doesn't just fight — he ABSORBS styles. Every pattern I showed him became his weapon. Must use formless technique.", "shaken")],
		"player_army": ["Cmdr Kagero", "Silent Ink Assassins", "Lotus Phantom Assassins", "Moonlit Duelists", "Void Serpent Harriers", "Ink Shadow Scouts"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Shadowfang Kreev", "Shadow Stalkers", "Blight Hound Pack", "Blood Reavers", "Plague Knights", "Corruption Spreaders"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Shadow war — assassin vs assassin.", "Moonlit Duelists challenge enemy champions with Riposte.", "Lotus Phantom Assassins can teleport behind Kreev.", "Void Serpent Harriers phase through to flank.", "Focus on Kreev. The rest of the army is secondary.", "This is a shadow dance. Strike from where they don't expect."],
		"battle_modifiers": {"label": "Shadow Dance", "description": "Assassin duel. All melee units gain +1 ATK.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Heat Haze",
		"objectives_text": "Execute the ultimate assassination — eliminate an enemy commander surrounded by an entire army.",
		"pre_story": [
			ShardLore.dialogue("Cmdr Kagero", "The target is Loom-Mother Silivex — the Thornweft intelligence commander. She knows everything. She sees everything. She has predicted every conventional approach and prepared for each one. But she has not predicted ME. Because the heat haze does not exist in her probability models. I am statistically impossible — an assassin so skilled that the web cannot track her, so fast that the fate-threads cannot bind her, so silent that the vibrations sensors cannot detect her. Silivex sees the future. I am the future she CANNOT see.", "absolute_confidence"),
			ShardLore.narration("Kagero vanished. Not metaphorically — she literally disappeared from every detection system the Thornweft had deployed. Web-vibration sensors fell silent. Fate-thread prediction models returned null values. Reality itself seemed to forget she existed. The heat haze shimmer — the distortion of air that makes distant objects waver — spread across the battlefield, and within that shimmer, Kagero moved like a ghost through a dream."),
		],
		"post_story": [
			ShardLore.narration("Silivex later admitted that she never saw Kagero coming. Not once. Not at any point. Her web detected every other threat — cavalry charges, infantry advances, artillery bombardments. But Kagero moved through a space that the web simply... couldn't perceive. The heat haze was not stealth. It was ABSENCE — the ability to be so perfectly nothing that even omniscient intelligence couldn't find her."),
			ShardLore.dialogue("Cmdr Kagero", "They will never know my name. They will never see my face. They will know only that threats disappear and problems are solved. That is enough. The heat haze does not seek recognition. It seeks precision — and having achieved it, it fades. Like heat. Like haze. Like a memory of something that might never have happened at all.", "final_ghost"),
		],
		"defeat_story": [ShardLore.dialogue("Cmdr Kagero", "She saw me. Somehow, through the haze, through the shimmer, through the probability void — she SAW me. The Whispering Web is... more than intelligence. It is awareness itself. And against total awareness, even the heat haze has limits.", "honest_defeat")],
		"player_army": ["Cmdr Kagero", "Silent Ink Assassins", "Lotus Phantom Assassins", "Moonlit Duelists", "Void Serpent Harriers", "Ink Shadow Scouts", "Dreambound Riders", "Lunar Kitsune Riders", "Moonlit Wanderers"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Loom-Mother Silivex", "Thread-Warden Infantry", "Silk-Shadow Scouts", "Tremor Sentinels", "Gossamer Guard", "Fate-Thread Weavers", "Web-Anchor Engineers", "Reality Weavers"],
		"battle_size": "epic",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["Ultimate assassination. One target surrounded by an army.", "Dreambound Riders Dream Walk past outer defenses.", "Lunar Kitsune Riders create diversions with illusions.", "Lotus Phantom Assassins teleport to strike positions.", "Kagero is MOV 10, ATK 18 — she reaches ANY target.", "Kill Silivex. Everything else is distraction. Focus."],
		"battle_modifiers": {"label": "The Heat Haze", "description": "Perfect assassination. All stealth units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Cmdr Kagero", "The heat haze. The shimmer above hot ground. The distortion that makes reality uncertain. That is what I am — uncertainty given form, doubt given a blade. I am the Shogun's last resort: the option that doesn't exist, the warrior who was never there, the kill that never happened. Kagero. Heat haze. Nothing and everything, everywhere and nowhere. Gone.", "final"),
	]
