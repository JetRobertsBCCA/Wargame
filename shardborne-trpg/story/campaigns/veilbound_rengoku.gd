class_name VeilboundRengokuCampaign
## Elite Cmdr Rengoku — "The Purgatory Charge"
## Aggressive cavalry, Charges. ATK 15, DEF 4, HP 33, MOV 8, CMD 8.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_rengoku",
		"commander": "Elite Cmdr Rengoku",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "The Purgatory Charge",
		"description": "Elite Commander Rengoku charges with the fury of purgatory itself. Crimson Oni Riders at his back, Veilbound cavalry at his flanks — the charge that purifies through destruction.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Elite Cmdr Rengoku", "In Reishima, purgatory was the realm between life and death — a place of purification through ordeal. My cavalry charges carry that same purpose. We do not simply kill. We PURIFY the battlefield through overwhelming force. The Crimson Oni Riders at my back are the fury of ancestral spirits given horse and lance. When we charge, the ground itself confesses. NOTHING stands before the Purgatory Charge.", "burning_intensity"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Purgatory's Gate",
		"objectives_text": "Execute a devastating cavalry charge to shatter an Emberclaw warband formation.",
		"pre_story": [ShardLore.dialogue("Elite Cmdr Rengoku", "The Emberclaw think they understand charges. Their berserkers run screaming into enemy lines. That is not a charge — that is a tantrum. A TRUE charge is disciplined fury — lances aligned, momentum calculated, impact point chosen for maximum devastation. Star Serpent Lancers form the spearhead. Crimson Oni Riders on the flanks. We hit them in one PERFECT moment of concentrated violence. Then we ride through and hit them again from behind.", "contemptuous")],
		"post_story": [ShardLore.dialogue("Elite Cmdr Rengoku", "The Emberclaw formation shattered like glass under a hammer. One charge — precisely aimed at the junction between their infantry and their flanking berserkers. The impact broke them in two, and then the Crimson Oni Riders swept through the gap. Purgatory's Gate opened. Their army fell through.", "fierce_satisfaction")],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Rengoku", "Their war-beasts absorb charges better than infantry. The impact that shatters a line merely ANNOYS a salamander. Need heavier lances.", "frustrated")],
		"player_army": ["Elite Cmdr Rengoku", "Star Serpent Lancers", "Crimson Oni Riders", "Thunder Kirin Cavalry", "Void Crane Riders"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Cinderfist Brok", "Unbonded Berserkers", "Emberclaw Warriors", "Fledgling Swarm"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 5,
		"tutorial_tips": ["Rengoku commands cavalry. Charge to win.", "Star Serpent Lancers have Momentum Chain — charges build power.", "Crimson Oni Riders break formations with Yokai Presence.", "Thunder Kirin Cavalry cascades impact through enemy lines.", "Don't get bogged down in melee. Charge, disengage, charge again."],
		"battle_modifiers": {"label": "Purgatory's Gate", "description": "Cavalry charge bonus. All cavalry gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Cavalry Hammer",
		"objectives_text": "Use combined cavalry to break through Iron Dominion defensive lines.",
		"pre_story": [ShardLore.dialogue("Elite Cmdr Rengoku", "The Iron Dominion builds walls of steel and hides behind artillery. They think defense defeats cavalry. They've never faced the Purgatory Charge. My Dreambound Riders phase through their first wall. Crimson Oni Riders break their second. And I come through the gap they leave with every lance I have. Three waves of cavalry against three layers of defense. Mathematics says they should hold. Purgatory disagrees.", "aggressive")],
		"post_story": [ShardLore.dialogue("Elite Cmdr Rengoku", "Three walls breached in sequence. The Dreambound Riders appeared INSIDE their first perimeter — Dream Walk carries no regard for physical barriers. While their defenders turned to face the phantoms, the Crimson Oni Riders hit their outer wall with the weight of ancestral fury. And I... I came through the center like judgment itself. The Purgatory Charge respects no fortification.", "exultant")],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Rengoku", "Their walls held. Triple-reinforced steel with anti-cavalry traps between layers. Smart engineering. I hate smart engineering.", "grudging_respect")],
		"player_army": ["Elite Cmdr Rengoku", "Star Serpent Lancers", "Crimson Oni Riders", "Dreambound Riders", "Thunder Kirin Cavalry", "Void Crane Riders", "Spirit Dragon Cohort"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Commander Ironweld", "Steam Heavy Guards", "Infantry Regiment", "Clockwork Infantry", "Gearwright Artillery", "Clockwork Cavalry"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 6,
		"tutorial_tips": ["Break their defenses with layered cavalry charges.", "Dreambound Riders can Dream Walk through terrain and walls.", "Crimson Oni Riders are Formation Breakers — use against tight groups.", "Spirit Dragon Cohort amplifies nearby cavalry.", "Void Crane Riders have Spirit Descent — unmatched striking power.", "Momentum is everything. Never stop charging."],
		"battle_modifiers": {"label": "The Cavalry Hammer", "description": "Hammerblow. All cavalry gain +1 ATK, +1 MOV.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Demon Riders",
		"objectives_text": "Shatter a Nightfang army with the fury of Crimson Oni Riders — demonic cavalry against undead hordes.",
		"pre_story": [ShardLore.dialogue("Elite Cmdr Rengoku", "The Nightfang think they corner the market on terror. Undead cavalry, bat swarms, vampiric dread. They haven't seen the Crimson Oni Riders in full fury. My riders wear the masks of purgatory's demons — not illusions, but INVOCATIONS of ancestral wrath. When they ride, the spirits ride with them. The undead fear nothing? Then they've never faced what's WORSE than death. They've never faced PURIFICATION.", "dark_determination")],
		"post_story": [ShardLore.dialogue("Elite Cmdr Rengoku", "The undead broke. BROKE. Creatures that fear nothing — that have no hearts to fail, no morale to shatter — turned and ran. Because the Oni Masks carry something beyond fear: spiritual judgment. The undead fled not from death, but from TRUTH. The truth that their existence is corruption, and Rengoku's charge is purification. Today, purgatory rode. And purgatory JUDGED.", "terrible_joy")],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Rengoku", "Their ancient vampires are beyond purgatory's reach. Millennia of undeath have made them immune to spiritual judgment. I need deeper invocations.", "humbled")],
		"player_army": ["Elite Cmdr Rengoku", "Crimson Oni Riders", "Star Serpent Lancers", "Dreambound Riders", "Thunder Kirin Cavalry", "Shrine Lion Riders", "Moonlit Duelists"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Blood Duchess Lysara", "Plague Knights", "Thrall Riders", "Blood Reavers", "Blight Hound Pack", "Elder Tiger Horror", "Shadow Stalkers"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": ["Demon cavalry vs undead. Spiritual fury defeats corruption.", "Crimson Oni Riders' Yokai Presence terrifies even undead.", "Shrine Lion Riders have Guardian Aura — protect key cavalry.", "Dreambound Riders Dream Walk into enemy rear.", "Total war. Crush them with relentless charges.", "Moonlit Duelists challenge enemy champions while cavalry circles."],
		"battle_modifiers": {"label": "The Demon Riders", "description": "Oni fury. All cavalry gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Purgatory Charge",
		"objectives_text": "Lead the ultimate cavalry charge — the charge that ends all charges, the charge that purifies the Shardlands.",
		"pre_story": [
			ShardLore.dialogue("Elite Cmdr Rengoku", "Every charge before was preparation. Every broken line was practice. Every scattered formation was rehearsal. THIS is the performance. Every Veilbound rider assembled. Every lance ready. Every Oni mask lit from within by ancestral fire. The Thornweft have woven their greatest web-fortress across the valley. Silk walls, trap corridors, adhesive barriers. They think their web will stop us. Let them think that. Purgatory does not negotiate with obstacles. Purgatory BURNS THROUGH.", "absolute_fury"),
			ShardLore.narration("The ground shook. Five hundred hooves and six hundred spirit-construct legs hit the earth in thunderous unison. At their head, Rengoku blazed like a comet — his Oni mask burning with the light of a thousand ancestral spirits. The Crimson Oni Riders formed a wedge of demonic fury. The Dreambound Riders flickered between realities. The Komainu Guardian Colossus rumbled forward like a divine beast caged too long. This was not a cavalry charge. This was an apocalypse in formation."),
		],
		"post_story": [
			ShardLore.narration("The web-fortress lasted four seconds. The Purgatory Charge hit it like a spiritual tsunami — silk walls dissolving, trap corridors collapsing, adhesive barriers burning away in the heat of ancestral fury. The Thornweft army behind the fortress never had a chance to engage in their defensive doctrine. The charge carried THROUGH the fortress, THROUGH the defender positions, and THROUGH the enemy reserves without breaking formation."),
			ShardLore.dialogue("Elite Cmdr Rengoku", "The charge ended. The fortress was gone. Their army was scattered across three miles of valley. And Rengoku's riders were already reforming for the SECOND pass. That is the Purgatory Charge. Not a single impact. A ROLLING PURIFICATION. It does not stop when it hits the enemy. It stops when there is nothing left to purify. And in purgatory, there is ALWAYS something left to purify. FORWARD!", "transcendent_rage"),
		],
		"defeat_story": [ShardLore.dialogue("Elite Cmdr Rengoku", "The web-fortress held. Silk absorbed our momentum like a net absorbs a thrown spear. The charge... stopped. And cavalry that stops is just infantry on horses. Purgatory does not accept this result. We ride again.", "defiant")],
		"player_army": ["Elite Cmdr Rengoku", "Crimson Oni Riders", "Star Serpent Lancers", "Dreambound Riders", "Void Crane Riders", "Thunder Kirin Cavalry", "Komainu Guardian Colossus", "Lunar Kitsune Riders", "Spirit Dragon Cohort"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Warden Morthis", "Web-Fortress", "Silk Colossus", "Fang Guard Elite", "Thread-Warden Infantry", "Gossamer Guard", "Gossamer Trap Layers", "Venom Dancers"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["The ultimate cavalry charge. Hold nothing back.", "Komainu Guardian Colossus breaks through heavy obstacles.", "Dreambound Riders bypass the web-fortress entirely.", "Star Serpent Lancers build Momentum Chain through the charge.", "Lunar Kitsune Riders create diversionary illusions.", "Spirit Dragon Cohort amplifies every rider. Stay together. Stay fast."],
		"battle_modifiers": {"label": "The Purgatory Charge", "description": "Unstoppable charge. All units gain +2 ATK, +1 MOV.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Elite Cmdr Rengoku", "The charge does not end. It NEVER ends. So long as there is wrong to purify, corruption to cleanse, enemies to scatter — Rengoku charges. The thunder of hooves is the song of purgatory. The flash of lances is the light of judgment. And the Crimson Oni Masks are the faces of the spirits who refuse to rest until the world is clean. I am Rengoku. I am the charge. FORWARD. ALWAYS FORWARD.", "final"),
	]
