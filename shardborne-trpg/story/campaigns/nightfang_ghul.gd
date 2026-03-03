class_name NightfangGhulCampaign
## Thrallmaster Ghul — "The Endless Tide"
## Thrall command, Summoning, CMD 8. Expendable army, overwhelming numbers.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_ghul",
		"commander": "Thrallmaster Ghul",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Endless Tide",
		"description": "Thrallmaster Ghul commands the mindless thrall legions. Where other commanders field elite warriors, Ghul fields infinite expendable bodies. Quantity has a quality all its own.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Thrallmaster Ghul", "People think commanding thralls is easy. 'They're mindless,' they say. 'Just point them at the enemy.' Fools. Commanding ten thousand empty minds requires absolute precision. Each thrall is a thread in my tapestry. Each command must be clear, simple, and absolute. One confused thrall contaminates a hundred. I am not a brute. I am a conductor.", "precise"),
		ShardLore.narration("Behind him, rows upon rows of thralls stood motionless — empty eyes, slack jaws, hands gripping weapons they didn't understand. Waiting for the command that would make them more than flesh. Waiting for Ghul."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Wave",
		"objectives_text": "Send the thrall vanguard against the Iron Dominion. Learn their defenses through sacrifice.",
		"pre_story": [ShardLore.dialogue("Thrallmaster Ghul", "First wave — Thrall Conscripts. Expendable. Their purpose is to reveal the enemy's positions, trigger their traps, and absorb their ammunition. Cruel? Perhaps. But they feel nothing. And the intelligence they provide saves my real forces for the actual battle.", "clinical")],
		"post_story": [ShardLore.dialogue("Thrallmaster Ghul", "Wave one sacrificed. But I now know every gun position, every barricade, every patrol route. The thralls served their purpose. Their sacrifice was not wasted — it was invested.", "calculating")],
		"defeat_story": [ShardLore.dialogue("Thrallmaster Ghul", "The wave was destroyed too quickly. I didn't gather enough intelligence. Need more thralls in the initial wave.", "adjusting")],
		"player_army": ["Thrallmaster Ghul", "Thrall Conscripts", "Blood Thralls", "Thrall Riders", "Thrall Masters", "Blood Runners"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Hoshikami", "Moonlit Wanderers", "Shadow Marksmen"],
		"battle_size": "skirmish",
		"scenario": "shardstorm",
		"round_limit": 6,
		"tutorial_tips": ["Thralls are expendable — sacrifice them to learn enemy positions.", "Blood Runners are scouts. Use them to flank and gather intel.", "Thrall Masters improve thrall combat effectiveness nearby."],
		"battle_modifiers": {"label": "Expendable Vanguard", "description": "Thralls absorb the first strike. All thralls gain +1 HP.", "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Summoning Pits",
		"objectives_text": "Defend the summoning pits while Ghul raises new thralls from the battlefield dead.",
		"pre_story": [ShardLore.dialogue("Thrallmaster Ghul", "The shard energy accelerates reanimation. In the old world, raising a thrall took an hour. Here — minutes. I've established summoning pits near the largest concentrations of dead. The Emberclaw left many bodies here. Each one becomes a soldier. My army grows with every battle they've already fought.", "efficient")],
		"post_story": [ShardLore.dialogue("Thrallmaster Ghul", "Three hundred new thralls raised in four hours. The pits are working at unprecedented efficiency. The shard energy doesn't just reanimate — it strengthens. These new thralls are faster, tougher than normal. The Shardlands are improving my army simply by existing.", "pleased")],
		"defeat_story": [ShardLore.dialogue("Thrallmaster Ghul", "The pits were overrun. The reanimation cycle was interrupted. Hundreds of potential thralls, lost.", "bitter")],
		"player_army": ["Thrallmaster Ghul", "Thrall Conscripts", "Blood Thralls", "Corrupted Militia", "Thrall Masters", "Plague Horde", "Blood Shamans"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberforged Blades", "Emberclaw Warriors", "Unbonded Berserkers", "Ashrider Scouts", "Mature War Drake"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["Defend the summoning pits (center position).", "Thralls die — that's fine. More are being raised.", "Blood Shamans heal your key units. Keep them safe."],
		"battle_modifiers": {"label": "Summoning Pits", "description": "Endless reinforcements. Destroyed thralls return next round.", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Tide Rises",
		"objectives_text": "Overwhelm the Thornweft position through sheer weight of numbers.",
		"pre_story": [ShardLore.dialogue("Thrallmaster Ghul", "The spider-folk are clever. Their webs catch individuals. Their traps kill skilled warriors. But they have never faced an army that doesn't care about casualties. Send a hundred thralls into the web — the web breaks. Send a thousand — the webbing collapses. The tide doesn't care about nets. It simply rises.", "relentless")],
		"post_story": [ShardLore.dialogue("Thrallmaster Ghul", "Casualty report: eight hundred thralls destroyed. Result: Thornweft position overrun. Acceptable ratio. Their webs couldn't hold the tide. Nothing can hold the tide.", "emotionless_efficiency")],
		"defeat_story": [ShardLore.dialogue("Thrallmaster Ghul", "The webs adapted. They're learning from each wave. I need to vary my approach. Even tides have patterns.", "reflective")],
		"player_army": ["Thrallmaster Ghul", "Thrall Conscripts", "Blood Thralls", "Corrupted Militia", "Plague Horde", "Thrall Riders", "Thrall Masters", "Blood Shamans"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Marshal Draven", "Gossamer Guard", "Silk-Warden Regulars", "Spiderling Swarm", "Web-Anchor Engineers", "Cocoon Wardens"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Overwhelming numbers — sacrifice thralls to exhaust enemy resources.", "Each wave weakens the Thornweft defenses. Be patient.", "Thrall Riders provide fast flanking even in a swarm army."],
		"battle_modifiers": {"label": "Rising Tide", "description": "Endless numbers. All thralls gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Endless Tide",
		"objectives_text": "Ghul deploys the full thrall army — every reanimated body, every summoned horror — against the Iron Dominion fortress.",
		"pre_story": [
			ShardLore.dialogue("Thrallmaster Ghul", "Ten thousand thralls. Every body I've raised since we arrived. Every corpse, every reanimation, every failed experiment that still walks. All of them, at once, directed by one mind — mine. The Iron Dominion thinks they can hide behind their walls and their machines. Let them. The tide rises. And the tide is ENDLESS.", "terrible_resolve"),
			ShardLore.narration("The horizon moved. It was not an army — it was a landscape, reshaping itself, flowing forward like water made of teeth and bones. Ten thousand empty faces, one terrible purpose, and behind them all, Thrallmaster Ghul, his eyes blazing with concentration, his mind holding every thread."),
		],
		"post_story": [
			ShardLore.narration("The fortress fell. Not through cleverness or courage or strength — through mathematics. For every thrall the machines destroyed, three more stepped over the corpse. For every wall that held, a thousand hands pushed until it crumbled. The tide was patient. The tide was infinite. The tide was Ghul."),
			ShardLore.dialogue("Thrallmaster Ghul", "They call me a monster. They say I desecrate the dead. Perhaps. But I give purpose to the purposeless. I give direction to the empty. And when the tide recedes, what remains is MINE. Every. Single. Time.", "dark_pride"),
		],
		"defeat_story": [ShardLore.dialogue("Thrallmaster Ghul", "Their machines killed faster than I could raise. For the first time, the tide wasn't enough. I need... bigger thralls. Stronger thralls. The old methods aren't sufficient.", "shaken")],
		"player_army": ["Thrallmaster Ghul", "Thrall Conscripts", "Blood Thralls", "Corrupted Militia", "Plague Horde", "Thrall Riders", "Thrall Masters", "Plague Broodmother"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["High Engineer Vortan", "Clockwork Titan", "Steam Colossus", "Steam Artillery Crew", "Infantry Regiment", "Steam Heavy Guards", "Gearwright Engineers", "Aether Blasters"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Maximum thrall army. Numbers are your weapon.", "Plague Broodmother spawns additional thralls mid-battle.", "Focus the swarm on one enemy at a time. Overwhelm, then move on.", "Vortan's war machines are tough — ignore them and kill the engineers."],
		"battle_modifiers": {"label": "The Endless Tide", "description": "Total swarming. All thralls gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Thrallmaster Ghul", "Lord Sanguinar views thralls as disposable tools. Countess Nyxara views them as conveniences. But I — I see what they truly are. An army without fear, without doubt, without hesitation. Perfect soldiers. And behind every perfect army is a perfect commander. That is my role. Not to fight. To direct. To shape the tide. And the tide — the tide never ends.", "quiet_menace"),
		ShardLore.narration("He turned back to his command array, a thousand psychic threads connecting him to a thousand empty minds, each one waiting for his will. The Endless Tide stood ready. It would always stand ready."),
	]
