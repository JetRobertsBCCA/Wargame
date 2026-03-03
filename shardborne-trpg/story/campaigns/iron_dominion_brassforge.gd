class_name IronDominionBrassforgeCampaign
## Engineer Brassforge — "Improvise, Adapt, Overcome"
## Field engineering, Improvisation, CMD 6. Scrappy field inventor.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_brassforge",
		"commander": "Engineer Brassforge",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "Improvise, Adapt, Overcome",
		"description": "Engineer Brassforge doesn't build according to specifications. He builds with whatever he can find — junk, salvage, enemy wreckage, things that definitely shouldn't work together but somehow do. Lord Calculon calls it 'irregular engineering.' Brassforge calls it 'making it work.'",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Engineer Brassforge", "Vortan builds the perfect machine. Takes him three months, two hundred engineers, and a budget the size of a small country. I build the machine that WORKS. Takes me an afternoon, some scrap metal, and whatever I find lying around. His machines are better. Mine exist when they're needed.", "cheerful"),
		ShardLore.narration("Engineer Brassforge's workshop — if you could call it that — was organized chaos. Salvaged Nightfang weaponry next to Thornweft web-silk, Emberclaw volcanic glass wired to Dominion steam engines. Every surface held something impossible. Half of it worked. The other half would work as soon as Brassforge hit it with a wrench."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Salvage Operation",
		"objectives_text": "Recover battlefield salvage from the contested zone. Build weapons from what you find.",
		"pre_story": [ShardLore.dialogue("Engineer Brassforge", "There's a wrecked battlefield two miles north. Dominion wreckage, Emberclaw scrap, some Nightfang... things. Parts, basically. Beautiful parts. Give me three hours in that junkyard and I'll build you an army out of other people's garbage.", "excited")],
		"post_story": [ShardLore.dialogue("Engineer Brassforge", "Built four turrets from a wrecked steam engine, reinforced our barricades with spider-silk cable, and made something I'm calling a 'Frankenstein grenade' from Nightfang bone fragments and Dominion gunpowder. Don't tell Vortan about the grenade. He'd have a standards violation seizure.", "gleeful")],
		"defeat_story": [ShardLore.dialogue("Engineer Brassforge", "Didn't get enough salvage. Hard to scavenge when people keep trying to kill you. Need more cover fire next time.", "disappointed")],
		"player_army": ["Engineer Brassforge", "Clockwork Pioneers", "Steam Miners", "Gearwright Engineers", "Infantry Regiment"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberclaw Warriors", "Ashrider Scouts", "Emberforged Blades"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["Shard Clash — collect fragments (salvage). Each one makes your army stronger.", "Steam Miners are fast collectors. Use them to grab fragments.", "Brassforge's Improvisation special gives bonuses from collected salvage."],
		"battle_modifiers": {"label": "Salvage Operation", "description": "Brassforge improvises. Each collected fragment gives +1 ATK globally.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Jury-Rig",
		"objectives_text": "Emergency field repairs — the Clockwork Titan is down and the Nightfang are closing. Fix the Titan before they arrive.",
		"pre_story": [ShardLore.dialogue("Engineer Brassforge", "Titan's down. Severed primary actuator, cracked gear-heart casing, blown steam lines. Vortan would need a week and a factory. I have two hours and a toolbox. Let's see... spider-silk for temporary gaskets, some of that Emberclaw volcanic glass to patch the casing — it's heat-resistant — and I can reroute the actuator through the secondary drivetrain if I bypass the safety interlocks. Yeah. This'll work. Probably.", "manic_focus")],
		"post_story": [
			ShardLore.narration("The Clockwork Titan lurched upright thirty seconds before the Nightfang reached the repair site. It was patched with spider-silk, volcanic glass, and what appeared to be a chair leg. It worked."),
			ShardLore.dialogue("Engineer Brassforge", "It's holding! It's ugly, it's unsafe, it violates about forty engineering standards, but it's HOLDING! Take THAT, specifications!", "triumphant"),
		],
		"defeat_story": [ShardLore.dialogue("Engineer Brassforge", "Couldn't get the Titan online in time. Needed fifteen more minutes. Fifteen lousy minutes. They didn't give them to me.", "bitter")],
		"player_army": ["Engineer Brassforge", "Gearwright Engineers", "Overclocked Engineers", "Clockwork Engineers", "Clockwork Infantry", "Steam Sentinels"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Midorikaze", "Temple Defenders", "Mask Bearers", "Dreambound Riders", "Void Bolt Crossbowmen", "Lantern Bearers"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["Defend the repair site for all rounds.", "Three engineer types — all contribute to the repair.", "If the Titan comes online (round 5), it fights for you!"],
		"battle_modifiers": {"label": "Jury-Rig Special", "description": "Field repairs active. All units gain +1 DEF.", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Invention",
		"objectives_text": "Test Brassforge's latest 'invention' against a Thornweft incursion.",
		"pre_story": [ShardLore.dialogue("Engineer Brassforge", "I call it the Steam-Pulse Disruptor. It uses compressed steam to generate a shockwave that disrupts organic matter — specifically, web-silk. One pulse and every web in a hundred-yard radius dissolves. Will it work? Almost certainly. Will it explode? ...Also almost certainly. The question is which happens first.", "honest_uncertainty")],
		"post_story": [ShardLore.dialogue("Engineer Brassforge", "It worked! And it only exploded a LITTLE! The steam pulse dissolved their webs, shattered their formations, and scared the living daylights out of every spider within half a mile. I'm calling it a success. Vortan would call it 'a lucky accident with an unauthorized device.' Potato, potahto.", "delighted")],
		"defeat_story": [ShardLore.dialogue("Engineer Brassforge", "It exploded before the pulse fired. Which means the reciprocal valve needs a stronger housing. Good data though.", "silver_lining")],
		"player_army": ["Engineer Brassforge", "Steam Miners", "Clockwork Pioneers", "Arcane Tinkerers", "Clockwork Infantry", "Steam Grenadiers"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Thread-Cutter Nyx", "Silk-Warden Regulars", "Gossamer Guard", "Spiderling Swarm", "Web-Anchor Engineers", "Gossamer Trap Layers"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": ["Arcane Tinkerers synergize with Brassforge's improvisation.", "Steam Grenadiers provide area damage against swarms.", "Brassforge's inventions are unpredictable but powerful."],
		"battle_modifiers": {"label": "The Invention", "description": "Steam-Pulse active. All units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Improvise, Adapt, Overcome",
		"objectives_text": "Cut off behind enemy lines with limited resources. Build an army from nothing and fight your way home.",
		"pre_story": [
			ShardLore.dialogue("Engineer Brassforge", "Right. So. Good news: I know exactly where we are. Bad news: it's behind the Nightfang main force. Worse news: we have no supply line, no reinforcements, and about half our equipment. Best news: we have ME. And I have a toolbox, three rolls of copper wire, a sack of Thornweft web-silk, and a very, very good idea.", "unfazed"),
			ShardLore.narration("What followed was the most creative feat of field engineering in Iron Dominion history. In six hours, using nothing but salvage and ingenuity, Engineer Brassforge built fortifications, weapons, traps, and something he called 'the Surprise' — a contraption so improbable that his own soldiers weren't sure it was a weapon."),
		],
		"post_story": [
			ShardLore.narration("'The Surprise' turned out to be a steam-powered catapult launching canisters of pressurized shard-gas. It was inaccurate, unreliable, and terrifying. It won the battle."),
			ShardLore.dialogue("Engineer Brassforge", "Improvise. Adapt. Overcome. That's not just a motto. That's engineering. Real engineering isn't about having the perfect tools and unlimited time. It's about making something work RIGHT NOW with WHATEVER YOU HAVE. Vortan builds masterpieces. I build miracles. And miracles are what you need when everything's gone wrong.", "passionate"),
		],
		"defeat_story": [ShardLore.dialogue("Engineer Brassforge", "Even I can't improvise our way out of this one. We need to retreat and try a different approach. Sometimes the best engineering is knowing when to run.", "realistic")],
		"player_army": ["Engineer Brassforge", "Clockwork Pioneers", "Steam Miners", "Arcane Tinkerers", "Gearwright Engineers", "Clockwork Infantry", "Steam Grenadiers", "Fragment Swarm Units"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Warlord Rathka", "Blood Reavers", "Tiger Berserkers", "Nightfang Warriors", "Shadow Stalkers", "Blood Shamans", "Feral Skinchanger", "Blood Thralls"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Behind enemy lines — every unit counts.", "Fragment Swarm Units are Brassforge's improvised fighters.", "Arcane Tinkerers and engineers are your force multipliers.", "Warlord Rathka is unpredictable. Adapt your tactics round by round."],
		"battle_modifiers": {"label": "Improvise, Adapt, Overcome", "description": "Field ingenuity at maximum. All units gain +2 ATK and +1 DEF.", "player_atk_bonus": 2, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Engineer Brassforge", "Vortan showed me the new Mark VIII Titan blueprints. Beautiful work. Three hundred pages of specifications. Then he asked me what I thought. I said 'What happens if the primary actuator fails in the field and you need to fix it with spider-silk and a chair leg?' He didn't have an answer. I did. That's the difference between us. He plans for perfection. I plan for everything else.", "grinning"),
		ShardLore.narration("He picked up his toolbox — dented, battered, held together with wire and hope — and headed out to fix something. There was always something to fix. And Engineer Brassforge was always ready, with whatever he happened to have in his pockets."),
	]
