class_name NightfangRathkaCampaign
## Warlord Rathka — "The Blood Fortress"
## Defensive, Fortress tactics, ATK 15, DEF 5, HP 33, CMD 10. Defensive vampire.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_rathka",
		"commander": "Warlord Rathka",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Blood Fortress",
		"description": "Warlord Rathka is not like other Nightfang. He doesn't hunt — he fortifies. His positions are legendary: bone walls, blood moats, and defenders who never tire. The defensive vampire.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Warlord Rathka", "Sanguinar charges. Voraxis hunts. Kreev sneaks. And when they're all bleeding, retreating, broken — where do they fall back to? MY fortress. MY walls. MY defenses. Attack is glamorous. Defense wins wars.", "gruff"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Build the Walls",
		"objectives_text": "Establish a defensive position with bone barricades and blood moats.",
		"pre_story": [ShardLore.dialogue("Warlord Rathka", "Bone for the barricades. Blood for the moats. Corruption for the ward-lines. A Nightfang fortress isn't built with stone — it's built with what we are. Every wall remembers the creature that gave its bones. Every moat carries the hunger of the blood within.", "grim_craft")],
		"post_story": [ShardLore.dialogue("Warlord Rathka", "Fortress established. Three walls, two moats, one killing field. Let them come. They'll learn what 'impregnable' means when the walls bite back.", "satisfied")],
		"defeat_story": [ShardLore.dialogue("Warlord Rathka", "They hit before the walls were finished. Sloppy timing on my part. Build faster next time.", "self_critical")],
		"player_army": ["Warlord Rathka", "Fang Guard", "Corruption Guard", "Bloodsworn Templars", "Blood Shamans"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Midorikaze", "Moonlit Duelists", "Spirit Javelin Skirmishers"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["Rathka has DEF 5 and HP 33 — he holds the line.", "Corruption Guard create corruption zones that debuff attackers.", "Bloodsworn Templars are your heavy defensive infantry."],
		"battle_modifiers": {"label": "Blood Fortress", "description": "Walls of bone. All units gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Siege Endures",
		"objectives_text": "Hold the fortress against a sustained Iron Dominion siege.",
		"pre_story": [ShardLore.dialogue("Warlord Rathka", "Dominion siege engines. Clockwork artillery. Steam-powered rams. Impressive hardware. But they're attacking a fortress defended by vampires who don't need food, don't need sleep, and regenerate from blood. How long can they siege us? How long can WE siege THEM? I know the answer. They don't.", "dark_confidence")],
		"post_story": [ShardLore.dialogue("Warlord Rathka", "Fourteen days. They threw everything — artillery, Titans, infantry assaults. Fourteen days and they didn't breach a single wall. My defenders fed from the attackers and grew stronger. A vampire fortress doesn't weaken under siege. It STRENGTHENS.", "iron_pride")],
		"defeat_story": [ShardLore.dialogue("Warlord Rathka", "The Titans punched through the western wall. Never faced something that strong. Need thicker walls. Much thicker.", "grudging")],
		"player_army": ["Warlord Rathka", "Bloodsworn Templars", "Fang Guard", "Plague Knights", "Blood Shamans", "Crimson Chanters", "Blood Mortar Team"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["General Steamjaw", "Infantry Regiment", "Steam Heavy Guards", "Clockwork Titan", "Steam Artillery Crew", "Siege Infantry"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Survive all rounds. Your fortress is your advantage.", "Blood Mortar Team provides counter-fire from inside the walls.", "Rathka's CMD 10 keeps morale high. Stay close to him."],
		"battle_modifiers": {"label": "Fortress Endures", "description": "Invincible walls. All units gain +3 DEF.", "player_def_bonus": 3},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Counter-Attack",
		"objectives_text": "The enemy is weakened. Rathka sallies forth from the fortress to crush them.",
		"pre_story": [ShardLore.dialogue("Warlord Rathka", "They think defense means passivity. Fools. Defense means choosing WHEN to attack. The Thornweft have exhausted themselves against my walls. Now — NOW is when we strike. Not from desperation, but from strength. A rested garrison against an exhausted enemy. That's not a battle. That's arithmetic.", "strategic")],
		"post_story": [ShardLore.dialogue("Warlord Rathka", "The counter-attack crushed them. Fresh troops against exhausted attackers, with a fortress to retreat to if things went wrong. Things didn't go wrong. Defense doesn't mean hiding. It means fighting from a position of absolute advantage.", "vindicated")],
		"defeat_story": [ShardLore.dialogue("Warlord Rathka", "Overextended. Went too far from the walls. Should have stayed within retreat distance. Even I make mistakes when I go on offense.", "chagrined")],
		"player_army": ["Warlord Rathka", "Tiger Berserkers", "Blood Reavers", "Nightfang Warriors", "Blood Fanged Riders", "Crimson Halberdiers", "Blood Champion"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Spindle-Knight Varek", "Gossamer Guard", "Silk-Warden Regulars", "Spiderling Swarm", "Web-Anchor Engineers", "Gossamer Trap Layers"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Rathka sallies from defense. Use his ATK 15 aggressively.", "Blood Fanged Riders are fast cavalry — flank the exhausted enemy.", "Blood Champion is your elite duelist. Send him after their commander."],
		"battle_modifiers": {"label": "Counter-Attack", "description": "Fresh and rested. All units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Blood Fortress",
		"objectives_text": "The ultimate siege. All enemies converge on Rathka's fortress. Hold against everything.",
		"pre_story": [
			ShardLore.dialogue("Warlord Rathka", "This is what I was built for. Every wall reinforced. Every defender in position. Every moat filled, every trap set, every killing field calculated. They're sending everything — and I mean EVERYTHING. Good. Let them. The Blood Fortress doesn't fall. The Blood Fortress has NEVER fallen. And this army, this position, these walls — they will make that record ETERNAL.", "absolute_resolve"),
		],
		"post_story": [
			ShardLore.narration("The Blood Fortress held. Against steam-powered artillery, clockwork titans, berserker charges, and aerial assaults — it held. Warlord Rathka stood on the highest wall, blood-soaked and grinning, watching the enemy retreat across a killing field littered with their dead."),
			ShardLore.dialogue("Warlord Rathka", "They'll write about this siege for centuries. The day every faction in the Shardlands tried to break the Blood Fortress and FAILED. Sanguinar gets the glory. Nyxara gets the politics. I get the one thing that actually matters: an unbroken wall and living soldiers behind it.", "triumph"),
		],
		"defeat_story": [ShardLore.dialogue("Warlord Rathka", "The fortress fell. First time. But I'm still standing. And I'll build another one. Stronger. The next one won't fall.", "bloody_determination")],
		"player_army": ["Warlord Rathka", "Bloodsworn Templars", "Corruption Guard", "Fang Guard", "Tiger Fang Elite", "Blood Shamans", "Blood Mortar Team", "Crimson Behemoth"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Emberforged Blades", "Unbonded Berserkers", "Emberclaw Warriors", "Mature War Drake", "Grounded Wyrm", "Obsidax", "Ashrider Scouts"],
		"battle_size": "epic",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["The ultimate Last Stand. Survive ALL rounds.", "Crimson Behemoth blocks the main approach. Nothing gets past it.", "Blood Shamans heal Rathka and the Behemoth. Critical role.", "Fire Wyrm is devastating. Blood Mortar Team should focus it."],
		"battle_modifiers": {"label": "Blood Fortress", "description": "Ultimate defense. All units gain +3 DEF and +1 ATK.", "player_def_bonus": 3, "player_atk_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Warlord Rathka", "They never understand. Defense isn't boring. Defense is the hardest, most demanding, most important thing a commander can do. Anyone can charge. It takes a special kind of strength to stand still while everything tries to knock you down. The Blood Fortress is that strength. And it will never, ever fall.", "quiet_certainty"),
	]
