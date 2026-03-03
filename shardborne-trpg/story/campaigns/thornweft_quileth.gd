class_name ThornweftQuilethCampaign
## Loom-Shaper Quileth — "The Architect's Web"
## Terrain creation, Web architecture, ATK 12, DEF 4, HP 24, MOV 5, CMD 7.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_quileth",
		"commander": "Loom-Shaper Quileth",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "The Architect's Web",
		"description": "Loom-Shaper Quileth builds the battlefield itself — web walls, silk barriers, terrain that serves the Matriarchy. She doesn't fight ON terrain. She CREATES it.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Loom-Shaper Quileth", "Before the first arrow flies, before the first charge begins, I have already won or lost the battle. Because I shape the ground. I build the walls. I craft the terrain that determines where armies can and cannot go. Most commanders react to terrain. I CREATE it. Every silk barrier, every web-wall, every trap-lattice — placed by design, not by chance. The battlefield is my canvas. The web is my medium. And victory is my architecture.", "precise"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Foundation Weaving",
		"objectives_text": "Build defensive web terrain to channel the Emberclaw into a killzone.",
		"pre_story": [ShardLore.dialogue("Loom-Shaper Quileth", "The Emberclaw charge straight. Always straight. Predictable. Beautiful. I'm laying web-walls in a funnel pattern — wide at the approach, narrow at the kill zone. Gossamer Trap Layers seed the channel with adhesive snares. When the berserkers charge in, the walls guide them. The traps hold them. The archers finish them. Architecture defeats aggression. ALWAYS.", "methodical")],
		"post_story": [ShardLore.dialogue("Loom-Shaper Quileth", "The funnel performed exactly as designed. Emberclaw warriors packed into the kill zone at three times their intended density. The Silk-Shot Skirmishers barely had to aim. When you control the terrain, you control the range, the density, and the tempo of combat. That's not fighting. That's ENGINEERING.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Loom-Shaper Quileth", "They burned through the web-walls. My architecture is flammable. Must develop fire-resistant silk composites.", "analytical")],
		"player_army": ["Loom-Shaper Quileth", "Web-Anchor Engineers", "Gossamer Trap Layers", "Silk-Shot Skirmishers", "Thread-Warden Infantry"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Flameheart Syrax", "Unbonded Berserkers", "Emberclaw Warriors", "Pyromancer Adepts"],
		"battle_size": "skirmish",
		"scenario": "broken_ground",
		"round_limit": 6,
		"tutorial_tips": ["Quileth shapes terrain. That's her primary value.", "Web-Anchor Engineers build permanent web structures.", "Gossamer Trap Layers create sticky traps that slow enemies.", "Silk-Shot Skirmishers provide ranged firepower.", "Use terrain to funnel enemies into narrow kill zones."],
		"battle_modifiers": {"label": "Foundation Weaving", "description": "Web architecture active. All units gain +1 DEF in web terrain.", "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Living Maze",
		"objectives_text": "Construct a web labyrinth to trap and neutralize an Iron Dominion advance.",
		"pre_story": [ShardLore.dialogue("Loom-Shaper Quileth", "The Iron Dominion column approaches on the main road. Efficient, disciplined, predictable — exactly the kind of army that a labyrinth defeats utterly. I've been building for three days. Web-walls that look like passages but lead to dead ends. Trap-lattices that collapse under weight. Adhesive floors that hold boots and treads in place. They'll enter my maze confident. They'll exit it defeated — if they exit at all. Architecture is patient. Machines are not.", "calm_confidence")],
		"post_story": [ShardLore.dialogue("Loom-Shaper Quileth", "The Dominion column fragmented within the first hundred meters of labyrinth. Their commander tried to maintain formation — impossible in a maze. Units separated, communications broke down, and each isolated group was dealt with individually. The maze didn't kill them. Confusion killed them. The maze just provided the confusion. That's efficient architecture.", "pleased")],
		"defeat_story": [ShardLore.dialogue("Loom-Shaper Quileth", "Their Titan Walker walked THROUGH the walls. Literally crushed the maze flat. Must build stronger barriers or use force-multiplied silk composites.", "recalculating")],
		"player_army": ["Loom-Shaper Quileth", "Web-Anchor Engineers", "Gossamer Trap Layers", "Trap-Layer Construct", "Thread-Warden Infantry", "Silk-Shot Skirmishers", "Tremor Sentinels"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Hoshikami", "Inkblade Initiates", "Starblade Samurai", "Dreambound Riders", "Celestial Slingers", "Spirit Healer Monks"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["The Living Maze — use terrain to fragment the enemy.", "Trap-Layer Construct creates terrain obstacles automatically.", "Web-Anchor Engineers build walls at key intersections.", "Gossamer Trap Layers create adhesive patches.", "Tremor Sentinels detect enemy movement through the maze.", "Let the maze do the work. Don't engage until enemies are isolated."],
		"battle_modifiers": {"label": "The Living Maze", "description": "Labyrinth architecture. All units gain +1 DEF on defensive terrain.", "player_def_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Fortress of Silk",
		"objectives_text": "Build and defend a web-fortress against Nightfang siege.",
		"pre_story": [ShardLore.dialogue("Loom-Shaper Quileth", "The Nightfang are coming in force. Vampires, thralls, war-beasts — everything they have. And I am building the fortress that stops them. Not stone. Not steel. SILK. Web-walls twenty layers deep. Adhesive moats that trap the undead. Anchor-points that channel the web's resonance into defensive barriers. The Web-Fortress is my masterpiece — a structure that isn't just defensible. It's ALIVE. It mends itself. It rebuilds when damaged. It grows stronger under siege. Let them come. My architecture is ready.", "architect_pride")],
		"post_story": [ShardLore.dialogue("Loom-Shaper Quileth", "The siege lasted three days. They threw everything at my fortress. Vampire knights charged the walls. Thrall hordes pushed against the gates. War-beasts tried to tear through the silk barriers. And every morning, the fortress was restored — mended overnight by the same principles that built it. A living fortress doesn't fall to siege. It adapts to siege. By the third day, my walls had LEARNED their attack patterns and repositioned accordingly.", "deep_satisfaction")],
		"defeat_story": [ShardLore.dialogue("Loom-Shaper Quileth", "They undermined the foundations. Dug beneath the web-anchors and collapsed the entire structure from below. Architecture fails when the ground itself betrays you.", "devastated")],
		"player_army": ["Loom-Shaper Quileth", "Web-Anchor Engineers", "Gossamer Trap Layers", "Trap-Layer Construct", "Web-Fortress", "Cocoon Wardens", "Silk-Warden Regulars", "Anchor Guard"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Warlord Rathka", "Plague Knights", "Blood Reavers", "Corrupted Militia", "Thrall Riders", "Blight Hound Pack", "Elder Tiger Horror"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Fortress defense — use Web-Fortress as your anchor.", "Web-Anchor Engineers reinforce walls under attack.", "Gossamer Trap Layers create approach denial zones.", "Cocoon Wardens heal units holding the walls.", "Anchor Guard mans the strongest defensive positions.", "Don't sortie. Hold the fortress. Let them break against your architecture."],
		"battle_modifiers": {"label": "Fortress of Silk", "description": "Fortress architecture. All defenders gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Architect's Web",
		"objectives_text": "Build the ultimate web-architecture — a battlefield-spanning structure that reshapes the war itself.",
		"pre_story": [
			ShardLore.dialogue("Loom-Shaper Quileth", "Everything I've built before was practice. Walls. Mazes. Fortresses. All small. All LIMITED. Today I build something worthy of the Loom-Mothers — a web-architecture that spans the entire battlefield. Every inch of terrain reshaped. Every approach channeled. Every defensive position connected by silk-bridges and web-corridors. The enemy doesn't enter a battlefield. They enter my DESIGN. And my design has no place for their victory.", "visionary"),
			ShardLore.narration("The web-architecture of the Quileth Span — as it came to be called — was visible from the ridgeline two miles distant. A geometric masterwork of silk and thread, rising from the earth like a cathedral made of spider-web. Strategic corridors channeled movement. Elevated silk platforms gave defensive advantage. And at the center, Loom-Shaper Quileth directed the battle from a web-tower that gave her sight lines across the entire construction."),
		],
		"post_story": [
			ShardLore.narration("The Quileth Span stood for decades after the battle. Other commanders studied it, mapped it, tried to replicate it. None succeeded. Because the Span wasn't just architecture — it was art. Every thread placed with purpose. Every wall angled for optimal defense. Every corridor designed for efficient movement. It was a battlefield transformed into a weapon."),
			ShardLore.dialogue("Loom-Shaper Quileth", "Stone crumbles. Steel rusts. Machines break down. But SILK endures. The web-architecture I build today will outlast every army that fought upon it. That is the Architect's truth: we don't build for the battle. We build for FOREVER. Every thread I weave is a vote for permanence against chaos. Every wall I raise says: here, order prevails. Here, design defeats randomness. Here, the Architect's Web holds.", "final_pride"),
		],
		"defeat_story": [ShardLore.dialogue("Loom-Shaper Quileth", "They burned it. All of it. Three days of building, gone in an hour of fire. Architecture is permanent only in the MIND. The next design will be fireproof.", "resolute")],
		"player_army": ["Loom-Shaper Quileth", "Web-Anchor Engineers", "Gossamer Trap Layers", "Trap-Layer Construct", "Web-Fortress", "Fate-Loom Siege Engine", "Silk Colossus", "Anchor Guard", "Silk-Warden Regulars", "Tremor Sentinels"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Clockwork Titan", "Steam Heavy Guards", "Infantry Regiment", "Gearwright Artillery", "Clockwork Infantry", "Clockwork Cavalry", "Mechanized Scouts"],
		"battle_size": "epic",
		"scenario": "shard_clash",
		"round_limit": 8,
		"tutorial_tips": ["The ultimate architecture battle: organic design vs mechanical precision.", "Silk Colossus and Web-Fortress are your structural anchors.", "Fate-Loom Siege Engine provides long-range fire support.", "Web-Anchor Engineers continuously build and reinforce.", "Trap-Layer Construct produces terrain obstacles automatically.", "Control terrain, control movement, control the battle."],
		"battle_modifiers": {"label": "The Architect's Web", "description": "Total web-architecture. All units gain +2 DEF, +1 ATK.", "player_def_bonus": 2, "player_atk_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Loom-Shaper Quileth", "When I am gone, my webs will remain. When the armies are dust and the commanders are forgotten, my architecture will still stand — silk bridges spanning canyons, web-walls channeling wind, fortress foundations anchoring the earth. That is the Architect's gift: permanence. Not the permanence of stone, which is dead. The permanence of silk, which is alive. The Architect's Web grows. It mends. It endures. And it REMEMBERS every thread I ever placed.", "serene"),
	]
