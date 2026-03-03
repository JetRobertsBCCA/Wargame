class_name IronDominionGearbaneCampaign
## Archmagister Gearbane — "The Aether Equation"
## Aether magic, Fragment specialist. Science-magic hybrid commander.
## 4 missions. Teaches fragment mechanics, aether attacks, support specialization.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_gearbane",
		"commander": "Archmagister Gearbane",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Aether Equation",
		"description": "Archmagister Gearbane studies the intersection of technology and fragment-magic. In the Shardlands, that intersection is everywhere — and dangerously unstable.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Archmagister Gearbane", "The Shardlands are not merely a place. They are an equation — a vast, complex equation describing the relationship between fragments, aether, reality, and consciousness. I intend to solve it.", "academic"),
		ShardLore.narration("Gearbane was the Iron Dominion's chief theoretician — part engineer, part philosopher, part something that defied categorization. Where Calculon saw data, Gearbane saw meaning. Where others saw fragments, he saw variables in an equation that could rewrite reality."),
		ShardLore.fhah_zolg("The scientist. He's trying to derive the rules of my game from inside it. Clever, but the axioms he's working from are incomplete. The most interesting axiom is the one he'll never discover: me."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Fragment Hypothesis",
		"objectives_text": "Collect three pure fragments to test Gearbane's unified field theory.",
		"pre_story": [ShardLore.dialogue("Archmagister Gearbane", "Three fragments, each from a different resonance zone. If my theory is correct, they'll form a harmonic triad that reveals the underlying structure of shard-space. If I'm wrong, they'll explode. Either way, we learn something.", "excited_about_explosions")],
		"post_story": [ShardLore.dialogue("Archmagister Gearbane", "The triad formed. The harmonics are coherent. Shard-space has structure — it follows rules, even if those rules are nothing like the physics we knew. This isn't chaos. This is a system. And systems can be understood.", "revelatory")],
		"defeat_story": [ShardLore.dialogue("Archmagister Gearbane", "Lost the fragments to enemy interference. Science requires controlled conditions. Battlefields are not controlled conditions.", "irritable")],
		"player_army": ["Archmagister Gearbane", "Arcane Tinkerers", "Aether Infused Soldiers", "Gearwright Engineers"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Warden Regulars", "Spiderling Swarm", "Phase-Silk Infiltrators"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["Gearbane is a Fragment specialist. Position him near shard zones for maximum effect.", "Arcane Tinkerers amplify fragment energy. Keep them adjacent to Gearbane.", "Aether Infused Soldiers have ranged attacks. Use them as a screen."],
		"battle_modifiers": {"label": "Fragment Resonance", "description": "Gearbane amplifies nearby fragments. +2 ATK near shard zones.", "player_atk_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Aether Engine",
		"objectives_text": "Defend the prototype Aether Engine while Gearbane calibrates it.",
		"pre_story": [ShardLore.dialogue("Archmagister Gearbane", "The Aether Engine converts fragment energy into a usable power source. If it works, we free the Dominion from dependence on steam. If it doesn't, we have a very expensive paperweight. I need four hours of uninterrupted calibration.", "focused")],
		"post_story": [
			ShardLore.narration("The Aether Engine hummed to life — a column of blue-white energy that illuminated the camp like a second sun. Gearbane stood before it, calculations confirmed, theory vindicated."),
			ShardLore.dialogue("Archmagister Gearbane", "It works. Fragment energy, converted to stable aether, distributed through the Grid. Unlimited power. Clean, efficient, beautiful. Calculon will be pleased. Well, Calculon will acknowledge marginal improvement over existing systems. Same thing.", "beaming"),
		],
		"defeat_story": [ShardLore.dialogue("Archmagister Gearbane", "The calibration failed under combat stress. I need better isolation. Science and warfare are incompatible neighbors.", "determined")],
		"player_army": ["Archmagister Gearbane", "Arcane Tinkerers", "Arcane Tinker Battalion", "Steam Sentinels", "Aether Infused Soldiers", "Clockwork Pioneers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberclaw Warriors", "Unbonded Berserkers", "Emberforged Blades", "Pyromancer Circle", "Ashrider Scouts"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["Last Stand: survive all rounds while protecting the Aether Engine.", "Steam Sentinels have Shield Wall. Use them as the front line.", "Clockwork Pioneers can build barricades. Fortify the Engine's position."],
		"battle_modifiers": {"label": "Aether Field", "description": "The Engine's energy field provides +1 DEF to all units near center.", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Reality Equation",
		"objectives_text": "Test the Aether Engine's offensive capability against the Nightfang corruption nexus.",
		"pre_story": [ShardLore.dialogue("Archmagister Gearbane", "The Engine doesn't just generate power — it generates ORDERED power. Structured aether that imposes mathematical precision on local reality. Against corruption, which is fundamentally disordered, it should be devastating. Let's find out.", "theoretical_excitement")],
		"post_story": [ShardLore.dialogue("Archmagister Gearbane", "The corruption collapsed under structured aether like a house of cards in a hurricane. Order defeats chaos — not through force, but through coherence. The equation balances. Reality wins.", "profoundly_satisfied")],
		"defeat_story": [ShardLore.dialogue("Archmagister Gearbane", "The corruption adapted to structured aether faster than expected. It's not truly chaotic — it has its own order, one I don't yet understand.", "fascinated")],
		"player_army": ["Archmagister Gearbane", "Arcane Tinkerers", "Aether Infused Soldiers", "Aether Marksmen", "Fragment Swarm Units", "Aether Blasters"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Ritual Cpt Tsukihana", "Starblade Samurai", "Inkblade Initiates", "Star Serpent Lancers", "Celestial Slingers", "Spirit Healer Monks"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Gearbane's aether attacks are especially effective against corrupted units.", "Fragment Swarm Units are expendable but powerful. Use them aggressively.", "Aether Marksmen have extreme range. Position them for long-range support."],
		"battle_modifiers": {"label": "Ordered Aether", "description": "Structured energy empowers all. Ranged units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Unified Theory",
		"objectives_text": "Deploy the Aether Engine at full power to stabilize a shard-rift. The final test of Gearbane's theory.",
		"pre_story": [ShardLore.dialogue("Archmagister Gearbane", "The rift is tearing local reality apart. If I can project structured aether into it, I can stabilize the breach — prove that fragment-science can repair the damage the Shardfall caused. This is the experiment that justifies everything. Every equation, every theory, every sleepless night. Let's make reality whole.", "awe")],
		"post_story": [
			ShardLore.narration("The Aether Engine projected a beam of pure mathematical order into the shard-rift. Reality rippled, flexed, and for one terrifying moment, seemed about to tear further—"),
			ShardLore.narration("Then it stabilized. The rift sealed. Not closed — stabilized, converted from a wound into a door. A door that went... somewhere."),
			ShardLore.dialogue("Archmagister Gearbane", "The equation balances. Reality can be repaired. The rift is stable — it's still a portal, but it's no longer tearing. And what it leads to... I need more data. But I believe the unified theory is correct: fragment-science can heal what the Shardfall broke. We CAN go home.", "trembling"),
		],
		"defeat_story": [ShardLore.dialogue("Archmagister Gearbane", "The rift destabilized. My equations were incomplete. I need more variables. I need more data. I need... more time.", "devastated")],
		"player_army": ["Archmagister Gearbane", "Arcane Tinkerers", "Arcane Tinker Battalion", "Aether Infused Soldiers", "Aether Marksmen", "Fragment Swarm Units", "Aether Blasters", "Arcane Steam Golem"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Plague Herald Mortivex", "Blood Reavers", "Blood Shamans", "Nightfang Warriors", "Shadow Stalkers", "Tiger Berserkers", "Nightfang Dragon", "Crimson Behemoth"],
		"battle_size": "epic",
		"scenario": "shardstorm",
		"round_limit": 8,
		"tutorial_tips": ["Shardstorm: reality is unstable. The battlefield shifts with fragment energy.", "The Arcane Steam Golem is your heavy support. Its Fragment Aura boosts allies.", "Focus on keeping Gearbane alive near the rift. He's the key.", "This is the culmination of everything. Every unit matters."],
		"battle_modifiers": {"label": "Unified Field", "description": "The Aether Engine empowers everything. All units gain +1 ATK and +1 DEF.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Archmagister Gearbane", "Lord Calculon processes data. I process meaning. The data says 'we are trapped in a broken world.' The meaning says 'every broken thing can be repaired, if you understand the equation.' I understand the equation now. The rest is engineering.", "confident"),
		ShardLore.narration("The Aether Engine hummed in the background — a monument to the power of pure thought applied to impossible problems. Archmagister Gearbane had proven that the Shardlands were not beyond understanding. They were merely a very complex equation, waiting to be solved."),
	]
