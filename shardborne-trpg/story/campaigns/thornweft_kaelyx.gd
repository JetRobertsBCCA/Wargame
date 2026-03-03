class_name ThornweftKaelyxCampaign
## Fang-Rider Kaelyx — "The Spider's Charge"
## Cavalry charges, Spider-mount, ATK 18, DEF 4, HP 27, MOV 10, CMD 8.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_kaelyx",
		"commander": "Fang-Rider Kaelyx",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "The Spider's Charge",
		"description": "Fang-Rider Kaelyx leads from the saddle of her war-spider, a blur of fangs and silk across the battlefield. Speed kills — and Kaelyx is the fastest thing on eight legs.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Fang-Rider Kaelyx", "The infantry march. The artillery fires. The commanders pontificate. And I RIDE. My war-spider crosses terrain that would break cavalry horses. Vertical walls. Dense web-forests. Open plains at full gallop. While the foot soldiers are still forming up, I've already flanked the enemy, struck their supply line, and returned for seconds. Speed is not just an advantage. Speed IS the weapon.", "fierce"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "First Charge",
		"objectives_text": "Strike the Emberclaw vanguard before they can establish their battle line.",
		"pre_story": [ShardLore.dialogue("Fang-Rider Kaelyx", "Emberclaw berserkers are forming up at the canyon mouth. They expect to charge US. They don't know we're already behind them. All riders — wedge formation. We hit them from the flank before their war-drums even start beating. Speed of the spider, fury of the fang. CHARGE!", "battle_cry")],
		"post_story": [ShardLore.dialogue("Fang-Rider Kaelyx", "They never saw us coming. That's the point. A charge from the expected direction is just momentum. A charge from BEHIND — that's psychology. The Emberclaw are brave against frontal assault. They're not so brave when eight-legged death appears where it shouldn't be. Ninety seconds from first contact to rout. A new personal best.", "grinning")],
		"defeat_story": [ShardLore.dialogue("Fang-Rider Kaelyx", "Too narrow a canyon. My riders couldn't spread into proper formation. Need more room to maneuver next time.", "frustrated")],
		"player_army": ["Fang-Rider Kaelyx", "Silk-Rider Lancers", "Spiderling Scouts", "Phase-Silk Cavalry", "Silk-Shadow Scouts"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Tsuyukusa", "Lotus Ascetics", "Void Bolt Crossbowmen"],
		"battle_size": "skirmish",
		"scenario": "supply_lines",
		"round_limit": 5,
		"tutorial_tips": ["Kaelyx is a cavalry commander. Speed is everything.", "MOV 10 means Kaelyx strikes first. Always.", "Silk-Rider Lancers and Phase-Silk Cavalry — your hammer.", "Spiderling Scouts reveal enemy positions for charges.", "Don't get bogged down. Hit and move. Hit and move."],
		"battle_modifiers": {"label": "First Charge", "description": "Spider cavalry strike. All cavalry gain +1 ATK on charge.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Spider Hunt",
		"objectives_text": "Use spider-mounted cavalry to outmaneuver and destroy Iron Dominion mechanized forces.",
		"pre_story": [ShardLore.dialogue("Fang-Rider Kaelyx", "The Iron Dominion thinks their Mechanized Scouts are fast. They've never raced a war-spider through web-forest. Their machines need flat terrain and maintenance. My spiders need nothing but prey. Today we hunt their scouts, their supply lines, their forward positions. We strike from every direction at once. When they turn to face one charge, a second hits their flank. When they face that, a third hits their rear. War-spiders don't attack in lines. We attack in WEBS.", "predatory")],
		"post_story": [ShardLore.dialogue("Fang-Rider Kaelyx", "Their machines are fast on roads. My spiders are fast EVERYWHERE. That's the difference. The Iron Dominion's mobility is terrain-dependent. Mine is absolute. I rode my spider up a cliff face to strike their artillery from above. Try doing THAT with a steam engine.", "exhilarated")],
		"defeat_story": [ShardLore.dialogue("Fang-Rider Kaelyx", "Their Steam Cavalry had shock weapons. My spiders panicked. Need to train them against electrical attacks.", "angry")],
		"player_army": ["Fang-Rider Kaelyx", "Silk-Rider Lancers", "Matriarch Riders", "Phase-Silk Cavalry", "Spiderling Scouts", "Thread-Reader Outriders"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Archmagister Gearbane", "Mechanized Scouts", "Steam Heavy Guards", "Clockwork Infantry", "Clockwork Cavalry", "Gearwright Artillery"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 6,
		"tutorial_tips": ["Broken ground favors spiders over machines.", "Matriarch Riders carry the heaviest punch. Save them for key targets.", "Phase-Silk Cavalry can move through terrain obstacles.", "Thread-Reader Outriders extend your vision range.", "Focus on eliminating their mobile units first, then the static ones."],
		"battle_modifiers": {"label": "Spider Hunt", "description": "Terrain mastery. All cavalry units gain +1 MOV.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Ride the Web",
		"objectives_text": "Execute a full web-cavalry assault to cut off a Nightfang army from reinforcement.",
		"pre_story": [ShardLore.dialogue("Fang-Rider Kaelyx", "The Nightfang Blood Reavers are advancing on three axes. If they converge, our infantry will be overwhelmed. But they're NOT going to converge — because my riders will cut every route. Spider cavalry on every road, every path, every trail. We don't need to defeat all three forces. We just need to keep them SEPARATED while our infantry deals with them one at a time. Ride the web, block the routes, keep them fragmented.", "tactical")],
		"post_story": [ShardLore.dialogue("Fang-Rider Kaelyx", "Three enemy forces, three separate engagements, zero reinforcements reaching any of them. My riders were everywhere at once — blocking, flanking, harassing, disrupting. The Nightfang commander must have thought he was facing five times our number. He was facing ONE Fang-Rider who understands that speed multiplies force. One fast rider in the right place is worth ten slow soldiers in the wrong one.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Fang-Rider Kaelyx", "They broke through my screen. Not enough riders to cover all routes. Needed more reserve to plug the gaps.", "regretful")],
		"player_army": ["Fang-Rider Kaelyx", "Silk-Rider Lancers", "Matriarch Riders", "Phase-Silk Cavalry", "Queen-Spawn War-mount", "Spiderling Scouts", "Fang Guard Elite"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Fang General Zharak", "Blood Reavers", "Plague Knights", "Corrupted Militia", "Blight Hound Pack", "Elder Tiger Horror", "Thrall Riders"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Supply lines — control routes and cut off the enemy.", "Queen-Spawn War-mount is your heaviest cavalry unit.", "Phase-Silk Cavalry can pass through enemy lines.", "Fang Guard Elite holds a key position while cavalry operates.", "Mobility wins this battle. Keep moving, keep disrupting."],
		"battle_modifiers": {"label": "Ride the Web", "description": "Full cavalry deployment. All mounted units gain +1 ATK/DEF.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Spider's Charge",
		"objectives_text": "Lead the greatest spider cavalry charge in Matriarchy history against a combined enemy force.",
		"pre_story": [
			ShardLore.dialogue("Fang-Rider Kaelyx", "Every rider I have. Every war-spider that can carry weight. Every lance, every fang, every thread of silk-armor. This is the charge that breaks armies. The Emberclaw have brought their heaviest units — War Salamanders, Wyvern Riders, flame artillery. They expect to burn us from range. They don't know what a full Matriarchy cavalry charge looks like. THEY'RE ABOUT TO FIND OUT.", "manic_excitement"),
			ShardLore.narration("The ground trembled. Not from earthquake or artillery, but from six hundred and forty spider-legs striking earth in unison. Fang-Rider Kaelyx sat at the head of the formation — not the safest position, never the safest — and raised her silk-lance to catch the morning light."),
		],
		"post_story": [
			ShardLore.narration("The charge of Spider's Ridge was spoken of for generations. Kaelyx's riders hit the Emberclaw line like a silk-wrapped avalanche — fast, silent, and utterly devastating. War-spiders leapt over barricades. Silk-lances punched through flame-hardened armor. Phase-Silk Cavalry appeared and disappeared like ghosts inside the enemy formation."),
			ShardLore.dialogue("Fang-Rider Kaelyx", "They called me reckless. Said cavalry charges were obsolete. Said speed couldn't beat fire, steel, or the undead. They were wrong about everything. The charge is eternal. The spider is supreme. And I am Fang-Rider Kaelyx — the fastest, the fiercest, the FIRST to the fight, the last to leave the saddle. The Spider's Charge never ends. It just finds new targets.", "triumphant"),
		],
		"defeat_story": [ShardLore.dialogue("Fang-Rider Kaelyx", "The charge broke against their line like a wave against a seawall. Too many flame-barriers. My spiders couldn't close. A rider who can't reach the enemy is just a target.", "devastated")],
		"player_army": ["Fang-Rider Kaelyx", "Silk-Rider Lancers", "Matriarch Riders", "Phase-Silk Cavalry", "Queen-Spawn War-mount", "Phase-Silk Wraith Spider", "Spiderling Scouts", "Fang Guard Elite", "Thread-Reader Outriders"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Emberforged Blades", "Unbonded Berserkers", "Mature War Drake", "Immolation Bombers", "Fledgling Swarm", "Pyromancer Adepts", "Ashrider Scouts"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Greatest cavalry charge. All riders, full speed, total commitment.", "Phase-Silk Wraith Spider leads the charge — heaviest cavalry unit.", "Queen-Spawn War-mount follows and exploits breaches.", "Phase-Silk Cavalry flanks while heavy cavalry pins.", "Spiderling Scouts and Thread-Reader Outriders identify weak points.", "This is all-or-nothing. Charge hard. Charge fast. Win or die."],
		"battle_modifiers": {"label": "The Spider's Charge", "description": "Ultimate cavalry charge. All units gain +2 ATK on charge.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Fang-Rider Kaelyx", "Give me a spider, an open plain, and a target — I'll give you a victory. Not a careful victory, not a calculated victory, but a FAST one. Because speed doesn't just win battles. Speed defines them. By the time the enemy understands what happened, it's already over. That's the Spider's Charge. That's my legacy. Eight legs, one lance, infinite velocity.", "final"),
	]
