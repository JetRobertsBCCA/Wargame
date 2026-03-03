class_name NightfangNightclawVexCampaign
## Nightclaw Vex — "The Red Blur"
## Fast striker, Melee assassin, ATK 21, DEF 3, HP 30, MOV 8, CMD 9. Pure speed and lethality.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_nightclaw_vex",
		"commander": "Nightclaw Vex",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Red Blur",
		"description": "Nightclaw Vex is the fastest killer in the Nightfang Dominion. ATK 21, MOV 8 — she hits like a thunderbolt and moves like the wind. By the time you see her, you're already dead.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Nightclaw Vex", "Speed kills. That's not a metaphor — that's a tactical doctrine. Hit first, hit hardest, be gone before the body hits the ground. Sanguinar calls me reckless. Zharak calls me undisciplined. But my kill count is higher than both of theirs combined. Results, darlings. Results.", "cocky"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "First Blood",
		"objectives_text": "Lightning raid on Emberclaw positions. Strike fast, hit hard, don't stop.",
		"pre_story": [ShardLore.dialogue("Nightclaw Vex", "Emberclaw outpost. Six guards, one commander, supply cache behind the main tent. I'll be in and out before their fire-breathers can even inhale. Blood Runners with me — if you can't keep up, you stay behind. And if you CAN keep up, try not to trip over the bodies I leave.", "eager")],
		"post_story": [ShardLore.dialogue("Nightclaw Vex", "Twelve seconds from first contact to last kill. New personal record. The Blood Runners managed to keep pace — barely. The supply cache is secured, the commander is drained, and we're already three miles away before they sound the alarm. THAT is how a Nightclaw operates.", "exhilarated")],
		"defeat_story": [ShardLore.dialogue("Nightclaw Vex", "They were FAST. I didn't expect fire-blooded lizards to match my speed. Lesson learned — even I can be outpaced if I'm cocky. And I'm always cocky. Might be a problem.", "rueful")],
		"player_army": ["Nightclaw Vex", "Blood Runners", "Shadow Stalkers", "Midnight Assassin", "Shadow Claw Infantry"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Skydancer Lyss", "Ashwalker Skirmishers", "Emberclaw Warriors", "Ashrider Scouts"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 5,
		"tutorial_tips": ["Vex has ATK 21 and MOV 8. She's a missile.", "Blood Runners are speed scouts. They find targets for Vex.", "Midnight Assassin takes high-value targets.", "Short round limit — end this fast. You're a raiding force, not an army."],
		"battle_modifiers": {"label": "Lightning Raid", "description": "Speed kills. All units gain +2 MOV.", "player_atk_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Impossible Run",
		"objectives_text": "Race through Iron Dominion defensive lines to seize supply points behind their positions.",
		"pre_story": [ShardLore.dialogue("Nightclaw Vex", "The Iron Dominion has layered defenses — infantry lines, turret emplacements, minefields. A conventional force would take days to break through. I'm not conventional. My plan: maximum speed, minimum contact. We don't FIGHT through — we RUN through. The gaps between their formations are tight but they exist. And I can thread a needle at MOV 8.", "manic_grin")],
		"post_story": [ShardLore.dialogue("Nightclaw Vex", "Three defensive lines. Four checkpoints. Two minefields. We ran straight through all of them in under five minutes. The Iron Dominion's turrets were still turning to track us when we hit their supply depot. By the time Calculon computed our trajectory, we were already looting his warehouse. Speed. Beats. EVERYTHING.", "triumphant")],
		"defeat_story": [ShardLore.dialogue("Nightclaw Vex", "Aether trip-wires. Invisible. My scouts hit them at full speed and the detonation stopped the whole column dead. Calculon planned for speed. The one thing I thought nobody could counter.", "frustrated")],
		"player_army": ["Nightclaw Vex", "Blood Runners", "Shadow Pounce Cavalry", "Nightstalker Cavalry", "Nightveil Infiltrators", "Shadow Stalkers", "Midnight Assassin"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Midorikaze", "Temple Defenders", "Mask Bearers", "Dreambound Riders", "Void Bolt Crossbowmen", "Lantern Bearers"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 6,
		"tutorial_tips": ["Supply Lines — grab and hold supply points.", "Your entire army is fast. Use speed to outmaneuver.", "Don't fight the defenders — run past them to objectives.", "Shadow Pounce Cavalry can strike behind enemy lines.", "Midnight Assassin kills their artillery. One strike."],
		"battle_modifiers": {"label": "The Impossible Run", "description": "Breakthrough speed. All units gain +2 MOV and +1 ATK on the charge.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Kill Count",
		"objectives_text": "Vex hunts the Thornweft's elite. Every commander kill proves her supremacy.",
		"pre_story": [ShardLore.dialogue("Nightclaw Vex", "Kreev thinks he's the best assassin in the Dominion. Please. Kreev is STEALTHY. There's a difference between stealth and speed. Kreev takes thirty minutes to set up a kill. I take thirty SECONDS. Today I prove it — Thornweft commander kills, recorded and witnessed. Let's see Kreev match THIS body count.", "competitive")],
		"post_story": [ShardLore.dialogue("Nightclaw Vex", "Four Thornweft officers. Three in melee. One while running. Average engagement time: eight seconds. Kreev can take his 'perfect silent kills' and frame them. I'll take messy, fast, and effective any day. Speed isn't just a tactic — it's a philosophy. Life is short. Make it count.", "breathless")],
		"defeat_story": [ShardLore.dialogue("Nightclaw Vex", "Web traps. Silk snares. Venom nets. Everything designed to SLOW. And slow is death for me. I can't operate at half speed. I need to find a way to counter Thornweft entanglement.", "analyzing")],
		"player_army": ["Nightclaw Vex", "Shadow Pounce Cavalry", "Blood Runners", "Nightstalker Cavalry", "Tiger Chargers", "Midnight Assassin", "Shadow Claw Infantry"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Fang-Rider Kaelyx", "Gossamer Guard", "Silk-Warden Regulars", "Venom Dancers", "Spiderling Swarm", "Cocoon Wardens", "Venom Alchemists"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Kill Count — eliminate enemy commanders and elites.", "Vex dives straight at priority targets. ATK 21 kills fast.", "Support with Tiger Chargers for flank overruns.", "Shadow Pounce Cavalry pursues routing enemies.", "Speed army against a defensive faction. Don't get bogged down."],
		"battle_modifiers": {"label": "The Kill Count", "description": "Hunting instinct. Vex gains +3 ATK against commanders.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Red Blur",
		"objectives_text": "Vex leads the fastest army in the Dominion against the Iron Dominion's best. Pure speed vs pure steel.",
		"pre_story": [
			ShardLore.dialogue("Nightclaw Vex", "Calculon calls me 'tactically unsound.' Says my approach is 'statistically suboptimal.' Says speed without strategy is just fast dying. Well, here's my strategy, calculator-brain: hit you so fast that your precious Grid can't process the inputs. MOV 8, ATK 21, and a complete disregard for anything resembling caution. Let's see your algorithms handle THAT.", "defiant"),
		],
		"post_story": [
			ShardLore.narration("They called her the Red Blur — a crimson streak across the battlefield, leaving bodies in her wake like a comet trailing debris. Nightclaw Vex moved so fast that the Iron Dominion's targeting systems couldn't track her. She struck so hard that their heaviest armor crumpled. And when it was over, she stood atop the wreckage of a Clockwork Titan, breathing hard, grinning like a maniac, covered head to toe in blood that wasn't hers."),
			ShardLore.dialogue("Nightclaw Vex", "Zharak will write a report about how my tactics were 'unsound.' Lysara will say I lack elegance. Sanguinar will barely notice. But the soldiers — MY soldiers — they know. They know that when Nightclaw Vex hits the field, the enemy dies fast and we go home alive. Speed kills. I'm the proof.", "breathless_triumph"),
		],
		"defeat_story": [ShardLore.dialogue("Nightclaw Vex", "They slowed me down. Entanglement fields, suppressive fire, overlapping kill zones — everything designed to kill speed. And without speed, I'm just a vampire with a big sword and no armor. I need to be FASTER. Always faster.", "determined")],
		"player_army": ["Nightclaw Vex", "Shadow Pounce Cavalry", "Nightstalker Cavalry", "Tiger Chargers", "Blood Runners", "Shadow Stalkers", "Midnight Assassin", "Shadow Leviathan"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Clockwork Titan", "Elite Vanguard", "Steam Heavy Guards", "Aether Marksmen", "Infantry Regiment", "Steam Artillery Crew", "Steam Colossus"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Speed army vs heavy armor. Don't trade blows — hit and move.", "Shadow Leviathan is your heaviest hitter. Send it at the Titan.", "Vex goes straight for Calculon. ATK 21 vs Grid Cohesion.", "Nightstalker Cavalry flanks wide. Shadow Pounce hits the rear.", "Short round limit — this is a blitz. Win fast or not at all.", "Tiger Chargers break formations. Blood Runners mop up."],
		"battle_modifiers": {"label": "The Red Blur", "description": "Maximum velocity. All units gain +3 MOV and +2 ATK.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Nightclaw Vex", "They'll write songs about the Hollow King's endurance. About Sanguinar's hunger. About Zharak's tactics. Nobody writes songs about speed. Speed doesn't make for good stories — it's over too fast. But I don't fight for stories. I fight because moving at MOV 8 with a blade in my hand is the closest thing to flying I've ever felt. And because the look on their faces when I appear RIGHT IN FRONT OF THEM, already swinging — THAT is worth more than any song. The Red Blur. Remember the name. Or don't. You won't have time.", "final_rush"),
	]
