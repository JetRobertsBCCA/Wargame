class_name ThornweftIthrisCampaign
## Web-Walker Ithris — "Between the Threads"
## Phase, Teleport, Extreme mobility, ATK 15, DEF 2, HP 21, MOV 16, CMD 7.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_ithris",
		"commander": "Web-Walker Ithris",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "Between the Threads",
		"description": "Web-Walker Ithris has MOV 16 and the ability to teleport through the web. She exists between moments, between spaces, between the threads of reality itself.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Web-Walker Ithris", "The web is not just silk. It's a LATTICE — a structure that connects every point in the Matriarchy's territory. I walk between the nodes. One step here, the next step three miles away. The others call it teleportation. I call it walking. I just take very, very long strides.", "whimsical"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Phase Step",
		"objectives_text": "Demonstrate web-walking in combat. Strike, vanish, strike again from a different direction.",
		"pre_story": [ShardLore.dialogue("Web-Walker Ithris", "The Iron Dominion patrol doesn't know I'm here. Doesn't know I'm ANYWHERE. Because I'm everywhere. Watch: I strike from the east. They turn to face east. I'm already behind them. They turn again. I'm on the left flank. By the time they realize there's only ONE of me, half of them are down. MOV 16 doesn't mean I'm fast. It means I'm INSTANTANEOUS.", "playful")],
		"post_story": [ShardLore.dialogue("Web-Walker Ithris", "Four phase-steps. Four strikes. Four different directions. Their formation broke trying to track me. The sergeant was shouting contradictory orders — 'she's left! No, right! No, behind us!' The beauty of phase-walking is that you're not fast. You're EVERYWHERE. And nowhere. Simultaneously.", "delighted")],
		"defeat_story": [ShardLore.dialogue("Web-Walker Ithris", "Aether traps. They laid TRAPS in the web-lattice. I phase-stepped right into one. First time that's happened. I don't like surprises. I'm usually the one giving them.", "startled")],
		"player_army": ["Web-Walker Ithris", "Phase-Silk Cavalry", "Silk Wraiths", "Phase-Silk Infiltrators", "Silk-Shadow Scouts"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Ritual Cpt Akikaze", "Veiled Ashigaru", "Celestial Slingers"],
		"battle_size": "skirmish",
		"scenario": "supply_lines",
		"round_limit": 5,
		"tutorial_tips": ["Ithris has MOV 16. She crosses the entire battlefield instantly.", "Phase-Silk units teleport. No formation can contain them.", "Silk Wraiths are ethereal. They pass through obstacles.", "Short round limit — speed kills. End it fast.", "DEF 2 — Ithris is fragile. Hit and move, never stay."],
		"battle_modifiers": {"label": "Phase Step", "description": "Web-walking. All phase units gain +3 MOV.", "player_atk_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Everywhere Offensive",
		"objectives_text": "Attack from every direction simultaneously using web-walk logistics.",
		"pre_story": [ShardLore.dialogue("Web-Walker Ithris", "The Emberclaw have a strong position — fortified, garrisoned, well-defended from conventional assault. But they're defending against conventional assault. My forces don't use roads. They use web-lattice. They don't march through valleys. They phase through the spaces between. When I attack, I attack from EVERY DIRECTION AT ONCE. No flanks to defend when the enemy is already inside your perimeter.", "strategic")],
		"post_story": [ShardLore.dialogue("Web-Walker Ithris", "They couldn't defend against omni-directional assault. How do you position your forces when the enemy appears INSIDE your formation? How do you set facing when every direction is the front line? Phase warfare breaks every conventional defensive doctrine. The future of war isn't about who's strongest. It's about who's FASTEST.", "validated")],
		"defeat_story": [ShardLore.dialogue("Web-Walker Ithris", "They collapsed the web-lattice locally. Some kind of fire-based disruption that burned the phase-connections. Without the lattice, my forces were stranded — isolated pockets in the middle of hostile territory. Phase warfare requires an intact web.", "sobered")],
		"player_army": ["Web-Walker Ithris", "Phase-Silk Cavalry", "Phase-Silk Infiltrators", "Silk Wraiths", "Silk-Shadow Scouts", "Phase-Silk Wraith Spider", "Spiderling Swarm"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Cinderfist Brok", "Emberclaw Warriors", "Unbonded Berserkers", "Pyromancer Adepts", "Ashwalker Skirmishers", "Ashrider Scouts"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 6,
		"tutorial_tips": ["Omni-directional attack. Strike from everywhere.", "Phase-Silk Wraith Spider teleports behind lines. Massive disruption.", "Phase-Silk Cavalry strikes and phases away before retaliation.", "Spiderling Swarm is expendable distraction. Phase units are the real threat.", "DEF is low across your army. Never stay engaged. Hit and phase."],
		"battle_modifiers": {"label": "Everywhere Offensive", "description": "Phase warfare. All units gain +3 MOV and can ignore terrain.", "player_atk_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Ghost War",
		"objectives_text": "Web-Walker Ithris vs Nightfang shadow forces. Ghosts vs ghosts.",
		"pre_story": [ShardLore.dialogue("Web-Walker Ithris", "The Nightfang's shadow-walkers think they own the darkness. Cute. They walk through shadows. I walk through REALITY. Their Shadowfang Kreev is invisible? I phase past him. Their Midnight Assassin strikes from nowhere? I'm already somewhere else. Ghost vs ghost, phase vs shadow. Let's see whose reality bends further.", "competitive")],
		"post_story": [ShardLore.dialogue("Web-Walker Ithris", "Shadow-walking is impressive. But it has rules — stay in shadow, stay hidden, stay patient. Phase-walking has ONE rule: be somewhere else. I out-maneuvered their shadows by existing in spaces they can't. The gap between web-nodes. The void between phase-steps. Places shadows can't reach because they're not technically ON the material plane. Ghost war won. Phase beats shadow.", "triumphant")],
		"defeat_story": [ShardLore.dialogue("Web-Walker Ithris", "The shadows... they FOLLOWED me through the phase. How? Shadows don't behave that way! The Nightfang have found a way to project shadow INTO the web-lattice. I need to phase to frequencies they can't follow.", "alarmed")],
		"player_army": ["Web-Walker Ithris", "Silk Wraiths", "Phase-Silk Cavalry", "Phase-Silk Infiltrators", "Thread-Cutter Assassins", "Spiderling Swarm"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Shadowfang Kreev", "Midnight Assassin", "Shadow Stalkers", "Nightveil Infiltrators", "Nightstalker Cavalry", "Shadow Pounce Cavalry"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["Ghost vs ghost. Stealth vs phase.", "Both armies are fragile and fast. First strike matters.", "Thread-Cutter Assassins sever fate-threads — devastating.", "Silk Wraiths are ethereal. They can't be hit by physical attacks.", "Ithris's MOV 16 outpaces even the fastest Nightfang."],
		"battle_modifiers": {"label": "Ghost War", "description": "Phase dominance. All units gain +2 ATK from surprise.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Between the Threads",
		"objectives_text": "Ithris phases her entire army through the web-lattice for a decisive strike on the Iron Dominion's heart.",
		"pre_story": [
			ShardLore.dialogue("Web-Walker Ithris", "I'm going to do something no one has ever done: phase an ENTIRE ARMY through the web-lattice simultaneously. Every unit, every spider, every war machine — all phasing at once, emerging inside the Iron Dominion's command perimeter. They have walls. They have turrets. They have defensive lines. None of it matters when the enemy teleports into the middle of your headquarters. This is the future of war, and the future starts NOW.", "audacious"),
		],
		"post_story": [
			ShardLore.narration("The air shimmered. The web-lattice pulsed. And then, between one heartbeat and the next, Web-Walker Ithris's entire army materialized inside the Iron Dominion's command perimeter. Clockwork infantry spun to face enemies that had appeared from nowhere. Artillery crews found spider-mounted cavalry behind their guns. Calculon's Grid screamed with a thousand simultaneous alerts — because the enemy wasn't approaching. The enemy was already HERE."),
			ShardLore.dialogue("Web-Walker Ithris", "Between the threads. That's where I live. That's where I fight. That's where I WIN. The space between here and there, between now and then, between one phase-step and the next. The others walk ON the web. I walk THROUGH it. And where I walk, armies follow. MOV 16 isn't a speed. It's a philosophy: be exactly where you need to be, exactly when you need to be there. Always.", "transcendent"),
		],
		"defeat_story": [ShardLore.dialogue("Web-Walker Ithris", "The mass phase destabilized. Half my army emerged in the wrong coordinates. Phase-shifting an entire army was too ambitious — too many variables, too many web-threads to navigate simultaneously. I need more lattice anchors. More practice. More... precision.", "humbled")],
		"player_army": ["Web-Walker Ithris", "Phase-Silk Wraith Spider", "Phase-Silk Cavalry", "Silk Wraiths", "Phase-Silk Infiltrators", "Thread-Cutter Assassins", "Spiderling Swarm", "Silk-Rider Lancers", "Matriarch Riders"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Clockwork Titan", "Elite Vanguard", "Steam Heavy Guards", "Aether Marksmen", "Infantry Regiment", "Steam Artillery Crew", "Steam Colossus"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Mass phase deployment. Your army appears inside theirs.", "Phase-Silk Wraith Spider is your heaviest hitter. Teleport strike.", "Speed is everything. Short round limit — end it fast.", "Matriarch Riders provide web-anchors for phase redeployment.", "Every unit can phase. Use it to avoid being pinned.", "Don't stay engaged. Phase-strike, phase-retreat, repeat."],
		"battle_modifiers": {"label": "Between the Threads", "description": "Mass phase. All units gain +3 MOV, +2 ATK, and can teleport.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Web-Walker Ithris", "They see me here. They see me there. They see me everywhere. But they never see me where I ACTUALLY am — which is between. Between the threads, between the moments, between the spaces. That's where the web-walkers live. And that's why we always win: we're never where you expect us to be, but always where we need to be. Between the threads. Always.", "final"),
	]
