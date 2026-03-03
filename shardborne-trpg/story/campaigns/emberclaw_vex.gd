class_name EmberclawVexCampaign
## Scorchcaller Vex — "Trial by Fire"
## The first Emberclaw campaign. Teaches aggressive tactics, Heat management,
## movement, and positioning through 6 escalating battles.
##
## Story: Vex awakens in the Shardlands with fragments of her warband.
## She must rally her forces, confront hostile factions, and discover why
## her people were torn from the Burning Peaks.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_vex",
		"commander": "Scorchcaller Vex",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "Trial by Fire",
		"description": "Scorchcaller Vex awakens in the Shardlands with her warband scattered and her drakes restless. Learn the ways of fire, speed, and overwhelming force.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

# ══════════════════════════════════════════════════════════════
# OPENING STORY — Shown when player first starts the campaign
# ══════════════════════════════════════════════════════════════

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The sky was wrong."),
		ShardLore.narration("Where the crimson haze of Ignareth should have painted the horizon, there was only a sickly grey — shot through with veins of light that pulsed like a dying heartbeat."),
		ShardLore.dialogue("Scorchcaller Vex", "On your feet! All of you — NOW!", "commanding"),
		ShardLore.narration("Scorchcaller Vex pulled herself from the rubble of what had been the Caldera's eastern gate. Around her, warriors groaned, drakes hissed in confusion, and the ground beneath them was... wrong. Too cold. Too still."),
		ShardLore.dialogue("Scorchcaller Vex", "Where is the fire? Where is the mountain? Someone tell me what happened to my sky!", "angry"),
		ShardLore.narration("No one could answer. The Emberclaw warband — what remained of it — lay scattered across an alien landscape of broken stone and crystallized air. The volcanoes of home were gone. The nesting grounds were gone. Everything was gone."),
		ShardLore.narration("But Vex was not a commander because she wept. She was a commander because she burned."),
		ShardLore.dialogue("Scorchcaller Vex", "...Fine. We don't know where we are. We don't know what happened. But we are Emberclaw, and the Emberclaw do not lie down and wait for death. Gather the survivors. Find the drakes. We move in five minutes.", "determined"),
		ShardLore.narration("In the distance, something howled — not a drake, not any beast Vex recognized. Something that belonged to this broken world."),
		ShardLore.fhah_zolg("Ah, the fire-queen wakes. Good. She has such a temper. This should be... entertaining."),
	]

# ══════════════════════════════════════════════════════════════
# MISSIONS — 6 escalating battles
# ══════════════════════════════════════════════════════════════

static func _missions() -> Array:
	return [
		_mission_1_first_flame(),
		_mission_2_foreign_ground(),
		_mission_3_shard_hunt(),
		_mission_4_the_grid_breaks(),
		_mission_5_hunger_in_the_dark(),
		_mission_6_trial_by_fire(),
	]

# ────────────────────────────────────────────────────────
# MISSION 1: First Flame
# Tutorial: Basic movement, attacking, winning a fight
# ────────────────────────────────────────────────────────

static func _mission_1_first_flame() -> Dictionary:
	return {
		"title": "First Flame",
		"objectives_text": "Destroy all enemy units. Learn to move and attack with your warband.",
		"pre_story": [
			ShardLore.narration("The first day in the Shardlands was chaos. Vex's scouts reported hostile creatures — twisted things born from the broken land itself — closing on their position."),
			ShardLore.dialogue("Scorchcaller Vex", "At last — something I can burn. Warriors, to me! Show these abominations what Emberclaw fire tastes like!", "fierce"),
			ShardLore.narration("It was a small band of corrupted beasts — nothing that should trouble an Emberclaw warband. But it was a chance to test their strength in this strange new world."),
		],
		"post_story": [
			ShardLore.narration("The creatures fell quickly. Emberclaw fire was as lethal here as it was in Ignareth. That, at least, was a comfort."),
			ShardLore.dialogue("Scorchcaller Vex", "Good. Our flames still burn true. But those things — they weren't natural. Something twisted this land. Something powerful.", "cautious"),
			ShardLore.narration("Among the fallen, Vex found a crystalline fragment — warm to the touch, humming with familiar energy. It reminded her of home."),
			ShardLore.dialogue("Scorchcaller Vex", "A shard... it feels like the caldera. Like volcanic glass, but alive. We need to find more of these.", "curious"),
		],
		"defeat_story": [
			ShardLore.narration("The warband scattered. Even Emberclaw pride could not sustain them against the confusion of this alien world."),
			ShardLore.dialogue("Scorchcaller Vex", "No! Rally to me — we are NOT done! Fall back to the ridge. We try again.", "defiant"),
		],
		"player_army": [
			"Scorchcaller Vex",
			"Ashborn Infantry",
			"Ashborn Infantry",
			"Emberclaw Warriors",
		],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": [
			"Thrall Conscripts",
			"Thrall Conscripts",
			"Thrall Conscripts",
		],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": [
			"Click a unit to select it, then click a highlighted tile to move.",
			"Move units adjacent to enemies to attack in melee range.",
			"Vex is your commander — she generates Command Points each turn.",
			"Destroy all enemy units to win this battle.",
		],		"battle_modifiers": {
			"label": "Alien Terrain",
			"description": "The unfamiliar ground slows everyone. All units -1 MOV.",
			"player_mov_bonus": -1,
			"enemy_mov_bonus": -1,
		},	}

# ────────────────────────────────────────────────────────
# MISSION 2: Foreign Ground
# Tutorial: Heat mechanics, using abilities, terrain
# ────────────────────────────────────────────────────────

static func _mission_2_foreign_ground() -> Dictionary:
	return {
		"title": "Foreign Ground",
		"objectives_text": "Defeat the enemy warband. Use your Heat abilities to overwhelm them.",
		"pre_story": [
			ShardLore.narration("Two days of marching through the Shardlands brought Vex's warband to a ridge overlooking a valley of shattered crystal. Below, figures moved — not beasts this time, but soldiers. Organized. Armed."),
			ShardLore.dialogue("Scorchcaller Vex", "That's not possible. Those are... people. Warriors with banners and formations. Where did they come from?", "shocked"),
			ShardLore.narration("A scout returned, breathless."),
			ShardLore.dialogue("Scorchcaller Vex", "Report.", "commanding"),
			ShardLore.narration("The scout described pale soldiers in dark armor — not machines, not beasts, but something ancient and cold. They carried weapons that seemed to drink the light."),
			ShardLore.dialogue("Scorchcaller Vex", "Another faction. Another people torn from their world, just like us? No matter. If they stand between us and those shards, they burn. Stoke the Heat — I want every warrior's blood boiling before we charge.", "determined"),
		],
		"post_story": [
			ShardLore.narration("Victory, but not without cost. These soldiers — Nightfang, some of them whispered before dying — fought with a desperate hunger that unnerved even Emberclaw veterans."),
			ShardLore.dialogue("Scorchcaller Vex", "They fought like they were starving. Like the battle itself was feeding them somehow. What kind of warriors find nourishment in death?", "troubled"),
			ShardLore.narration("The Heat had served them well. Vex felt the familiar surge of fire in her blood — that burning energy that connected all Emberclaw to their drakes, to their volcanic homeland. Even here, in this cold and broken place, the Heat answered her call."),
			ShardLore.dialogue("Scorchcaller Vex", "The fire remembers us, even if the world does not. Let that be enough for now.", "resolved"),
		],
		"defeat_story": [
			ShardLore.narration("The foreign soldiers' hunger was too great. They fell upon the Emberclaw with a ferocity that even fire could not match."),
			ShardLore.dialogue("Scorchcaller Vex", "Fall back! There's no shame in retreating from something you don't understand — yet. We'll learn. And then we'll burn them all.", "furious"),
		],
		"player_army": [
			"Scorchcaller Vex",
			"Ashborn Infantry",
			"Emberclaw Warriors",
			"Emberclaw Warriors",
			"Pyromancer Adepts",
		],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": [
			"Thrall Conscripts",
			"Thrall Conscripts",
			"Blood Reavers",
			"Blood Reavers",
		],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": [
			"Heat builds as your units fight. Higher Heat = more damage but more risk.",
			"Use Vex's Breath Weapon ability to deal area damage.",
			"Pyromancer Adepts can attack from range — keep them behind your front line.",
			"Watch your Heat gauge — if it gets too high, units may take self-damage.",
		],		"battle_modifiers": {
			"label": "Nightfang Hunger",
			"description": "The enemy feeds on death. Enemy units have +1 ATK from bloodlust.",
			"enemy_atk_bonus": 1,
		},	}

# ────────────────────────────────────────────────────────
# MISSION 3: Shard Hunt
# Tutorial: Objectives, capturing points, Command Points
# ────────────────────────────────────────────────────────

static func _mission_3_shard_hunt() -> Dictionary:
	return {
		"title": "Shard Hunt",
		"objectives_text": "Capture and hold the shard objectives. Control more objectives than the enemy when time runs out.",
		"pre_story": [
			ShardLore.narration("The scouts found it — a cluster of shards embedded in a plateau of fused glass, pulsing with warmth. But the Emberclaw were not the only ones who had noticed."),
			ShardLore.dialogue("Scorchcaller Vex", "How many?", "tense"),
			ShardLore.narration("Too many to count from this distance. An organized force — metal and clockwork — was already establishing positions around the shard field."),
			ShardLore.dialogue("Scorchcaller Vex", "Machines. Soldiers made of steel and purpose. They're fortifying — digging in around the shards like they own them.", "angry"),
			ShardLore.narration("Vex studied the terrain. The shards were scattered across several key positions. She couldn't take them all at once — she'd need to prioritize, to command, to think."),
			ShardLore.dialogue("Scorchcaller Vex", "We don't need to destroy them all. We just need to hold more ground than they do. Commanders — this is what your training was for. We move fast, we hit hard, and we hold what we take. That's the Emberclaw way.", "strategic"),
		],
		"post_story": [
			ShardLore.narration("The Iron Dominion — that's what the captured soldiers called themselves — proved to be disciplined but slow. Emberclaw speed had won the day, securing three of five shard deposits before the clockwork warriors could react."),
			ShardLore.dialogue("Scorchcaller Vex", "These 'Iron Dominion' fight like they're following a script. Precise, coordinated, but predictable. They can't adapt when the fire moves faster than their calculations.", "satisfied"),
			ShardLore.narration("The shards were extraordinary. Each one hummed with an energy that resonated with the Heat — amplifying it, focusing it. With enough of these, Vex realized, she could—"),
			ShardLore.dialogue("Scorchcaller Vex", "Wait. These shards... they're not random. They're pieces of something. Something that was broken on purpose.", "realization"),
			ShardLore.fhah_zolg("She's beginning to see the edges of the board. Delightful. But seeing the board and understanding the game are very different things."),
		],
		"defeat_story": [
			ShardLore.narration("The clockwork soldiers held their positions with mechanical precision. Every advance met organized resistance. Every flanking maneuver was anticipated."),
			ShardLore.dialogue("Scorchcaller Vex", "Damn their discipline! We need more warriors — or a new plan. Regroup at the ridge. We're not done with those shards.", "frustrated"),
		],
		"player_army": [
			"Scorchcaller Vex",
			"Ashborn Infantry",
			"Ashborn Infantry",
			"Emberclaw Warriors",
			"Flameborn Guard",
			"Pyromancer Adepts",
			"Ashwalker Skirmishers",
		],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": [
			"Infantry Regiment",
			"Infantry Regiment",
			"Steam Sentinels",
			"Steam Sentinels",
			"Steam-Powered Sharpshooters",
		],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": [
			"This battle uses objectives — move units onto shard markers to capture them.",
			"You score Victory Points each turn for each objective you control.",
			"Use Command Points wisely — spend them on unit abilities and commander orders.",
			"Speed is your advantage. Capture objectives early while the enemy is still moving.",
		],		"battle_modifiers": {
			"label": "Shard Resonance",
			"description": "The shards amplify Emberclaw Heat. Your units gain +1 ATK.",
			"player_atk_bonus": 1,
		},	}

# ────────────────────────────────────────────────────────
# MISSION 4: The Grid Breaks
# Tutorial: Combined arms, using different unit types together
# ────────────────────────────────────────────────────────

static func _mission_4_the_grid_breaks() -> Dictionary:
	return {
		"title": "The Grid Breaks",
		"objectives_text": "Seize and hold the shard nexus at the center. Break through the Iron Dominion's Grid and claim the hill.",
		"pre_story": [
			ShardLore.narration("The Iron Dominion did not forgive the loss of their shards. Within days, a larger force arrived — led by a commander of cold intelligence and mechanical precision."),
			ShardLore.dialogue("Scorchcaller Vex", "They brought war machines. Actual siege engines. And that commander — Calculon, the prisoners called him — he's not like the rank and file. He thinks.", "wary"),
			ShardLore.narration("Vex studied the enemy positions from the ridge. The Iron Dominion had established a defensive perimeter around a shard nexus — a convergence point where multiple shard lines met. Heavy armor in front. Artillery behind. The Grid holding everything together with inhuman coordination."),
			ShardLore.dialogue("Scorchcaller Vex", "We can't just charge into that. Not head-on. We need every tool we have — infantry to hold, cavalry to flank, artillery to crack their armor, and drakes to break their formations. This is a real battle. Finally.", "grim_smile"),
			ShardLore.narration("She turned to her officers."),
			ShardLore.dialogue("Scorchcaller Vex", "I want Emberforged Blades on the left. Drakes high — they dive on my signal. Pyromancers support from the ridge. And I will be at the front, because that's where the fire burns hottest. Questions? Good. Move.", "commanding"),
		],
		"post_story": [
			ShardLore.narration("Lord Calculon's Grid finally broke when Vex's drakes punched through the artillery line. Without their ranged support, the Iron Dominion's defenses crumbled — slowly, grudgingly, but inevitably."),
			ShardLore.dialogue("Scorchcaller Vex", "There it is. That's what happens when you trust machines more than fire. Machines can be broken. Fire? Fire always comes back.", "triumphant"),
			ShardLore.narration("But the victory felt hollow. As Vex walked through the wreckage of the Iron Dominion's camp, she found something disturbing — maps. Not of the Shardlands, but of the spaces between. Calculations. Equations. And at the center of every equation, a symbol she didn't recognize."),
			ShardLore.dialogue("Scorchcaller Vex", "Calculon was trying to figure out how we got here. He wasn't just fighting us — he was researching. He knew this wasn't natural.", "disturbed"),
			ShardLore.narration("She pocketed the maps. Something was wrong with this world — more wrong than she'd thought."),
		],
		"defeat_story": [
			ShardLore.narration("The Grid's coordination proved too perfect. Every Emberclaw assault was absorbed, analyzed, and countered with mathematical precision."),
			ShardLore.dialogue("Scorchcaller Vex", "They're learning from us! Every time we attack, their pattern adapts. We need a new approach — something they can't calculate.", "frustrated"),
		],
		"player_army": [
			"Scorchcaller Vex",
			"Ashborn Infantry",
			"Emberclaw Warriors",
			"Flameborn Guard",
			"Emberforged Blades",
			"Pyromancer Adepts",
			"Ashwalker Skirmishers",
			"Emberknight Riders",
			"Pyroclast Catapult",
		],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": [
			"Lord Calculon",
			"Infantry Regiment",
			"Infantry Regiment",
			"Steam Sentinels",
			"Steam Sentinels",
			"Steam-Powered Sharpshooters",
			"Clockwork Titan",
			"Steam Artillery Crew",
		],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": [
			"This is King of the Hill — control the center objective for 2 VP per round!",
			"Use different unit types together — infantry holds, cavalry flanks, artillery softens.",
			"Target the enemy commander to deal a devastating blow to morale.",
			"Drake Riders can fly over terrain and enemy units. Use them to reach the back line.",
		],		"battle_modifiers": {
			"label": "Iron Grid Defense",
			"description": "The Iron Dominion has fortified. Enemy units start with +1 DEF.",
			"enemy_def_bonus": 1,
			"player_cp_bonus": 1,
		},	}

# ────────────────────────────────────────────────────────
# MISSION 5: Hunger in the Dark
# Tutorial: Morale, managing Shaken status, fighting Nightfang
# ────────────────────────────────────────────────────────

static func _mission_5_hunger_in_the_dark() -> Dictionary:
	return {
		"title": "Hunger in the Dark",
		"objectives_text": "Defend your three camp positions against the Nightfang ambush! If they capture 2 of 3, you lose.",
		"pre_story": [
			ShardLore.narration("The Nightfang came at dusk — if the Shardlands even had a proper dusk. One moment the camp was quiet. The next, shadows moved."),
			ShardLore.dialogue("Scorchcaller Vex", "CONTACT! ALL STATIONS — LIGHT THE PERIMETER!", "alarmed"),
			ShardLore.narration("They poured from the darkness like a tide of teeth and hunger. Led by Lord Sanguinar — the Blood Patriarch himself — the Nightfang assault was nothing like the disciplined march of the Iron Dominion. This was predation. Pure, ancient, and merciless."),
			ShardLore.dialogue("Lord Sanguinar", "Scorchcaller... your fire smells delicious. My children have been so very hungry since we arrived in this wretched place. Surely you can spare a few?", "mocking"),
			ShardLore.dialogue("Scorchcaller Vex", "You want fire, vampire? I'll give you more than you can stomach. EMBERCLAW — SHOW THEM WHAT WE ARE!", "enraged"),
			ShardLore.narration("This battle would be different. The Nightfang fought to break spirits as much as bodies. Terror was their weapon. Morale would be as important as steel."),
		],
		"post_story": [
			ShardLore.narration("Sanguinar withdrew as abruptly as he'd attacked — not defeated, but satisfied. He'd fed. His warriors had fed. And he'd learned what he needed."),
			ShardLore.dialogue("Scorchcaller Vex", "He wasn't trying to destroy us. He was... testing us. Tasting us. That thing — that creature — he's been doing this for centuries.", "shaken"),
			ShardLore.narration("Vex tended to her wounded. The Nightfang's corruption lingered — a cold feeling in the blood, a whisper at the edge of hearing. Some warriors reported nightmares. Others reported... appetites they'd never had before."),
			ShardLore.dialogue("Scorchcaller Vex", "Burn it out. Whatever that corruption is, fire will purge it. We are Emberclaw. We do not succumb to shadows.", "resolute"),
			ShardLore.narration("But in the quiet moments, alone with the captured maps from Calculon's camp, Vex began to wonder: five factions, from five different worlds, all brought to the same broken place at the same time. This wasn't random. This was... designed."),
			ShardLore.fhah_zolg("She's close now. So close to the truth. Will she shatter when she sees it? Or will she burn brighter? That's the question that makes this worth watching."),
		],
		"defeat_story": [
			ShardLore.narration("The terror was too much. One by one, Emberclaw warriors broke — shaken by the Nightfang's howls, overwhelmed by the hunger that seemed to drain their very will to fight."),
			ShardLore.dialogue("Scorchcaller Vex", "No... NO! Light the fires — all of them! Drive back the dark! We are NOT prey!", "desperate"),
			ShardLore.dialogue("Lord Sanguinar", "You are what I say you are, fire-child. But don't worry. I'll let you try again. The hunt is always better when the prey has spirit.", "amused"),
		],
		"player_army": [
			"Scorchcaller Vex",
			"Ashborn Infantry",
			"Ashborn Infantry",
			"Emberclaw Warriors",
			"Flameborn Guard",
			"Emberforged Blades",
			"Pyromancer Adepts",
			"Hatchery Guard",
			"Emberknight Riders",
			"Pyroclast Catapult",
		],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": [
			"Lord Sanguinar",
			"Thrall Conscripts",
			"Thrall Conscripts",
			"Thrall Conscripts",
			"Blood Reavers",
			"Blood Reavers",
			"Shadow Stalkers",
			"Crimson Behemoth",
			"Blood Shamans",
		],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": [
			"This is a Last Stand — defend your 3 positions! If the enemy captures 2, you lose.",
			"The Nightfang use Terror abilities — watch your units' Morale.",
			"Keep units close to defense points — you need to outnumber to hold them.",
			"Fire your artillery early to thin out the Thrall horde before they reach your lines.",
		],		"battle_modifiers": {
			"label": "Night Ambush",
			"description": "Darkness falls. Ranged units suffer -1 ATK. Enemy starts with +2 CP from surprise.",
			"player_atk_bonus": -1,
			"enemy_cp_bonus": 2,
		},
	}	}

# ────────────────────────────────────────────────────────
# MISSION 6: Trial by Fire
# Final battle — hardest fight, open-ended conclusion
# ────────────────────────────────────────────────────────

static func _mission_6_trial_by_fire() -> Dictionary:
	return {
		"title": "Trial by Fire",
		"objectives_text": "Seize the Shard Nexus and hold it against all opposition. This is your moment, Scorchcaller.",
		"pre_story": [
			ShardLore.narration("Vex stood on the ridge above the Shard Nexus — the largest concentration of shard energy discovered in the Shardlands. Below, two enemy forces converged from opposite directions. The Thornweft, with their skittering forces and impossible webbing. And something else — scouts couldn't identify them, but they moved like ghosts."),
			ShardLore.dialogue("Scorchcaller Vex", "Two armies. Both heading for the nexus. Both bigger than what we've faced before.", "grim"),
			ShardLore.narration("She should have felt fear. Instead, she felt something else entirely — certainty. Whatever had brought them here, whatever game was being played with their lives, this was the moment that mattered. Take the nexus, and the shards might show her the way home."),
			ShardLore.dialogue("Scorchcaller Vex", "I've been burned, frozen, starved, ambushed, and bled dry by every nightmare this broken world has thrown at me. And I am still standing. I am still BURNING.", "fierce"),
			ShardLore.narration("She turned to face her warband — survivors, all of them. Veterans of the Shardlands. Emberclaw, forged in a fire they never asked for."),
			ShardLore.dialogue("Scorchcaller Vex", "This is what it comes down to. Every battle, every loss, every shard we've bled for — it all leads here. The nexus is ours. The way home is ours. And if anyone — ANYONE — wants to take it from us, they'll have to walk through fire to do it.", "inspiring"),
			ShardLore.narration("The warband roared. Drakes screamed. The air itself began to shimmer with Heat."),
			ShardLore.dialogue("Scorchcaller Vex", "EMBERCLAW — ADVANCE!", "battle_cry"),
		],
		"post_story": [
			ShardLore.narration("The nexus fell. Not easily — never easily — but it fell."),
			ShardLore.narration("Vex stood at its center, surrounded by the shards of a broken god, and felt something she hadn't felt since arriving in the Shardlands: warmth. Real warmth. The warmth of Ignareth."),
			ShardLore.dialogue("Scorchcaller Vex", "I can feel it. Home. The caldera. The nesting grounds. It's still there — somewhere beyond this broken sky.", "emotional"),
			ShardLore.narration("The shards resonated with her Heat, and for a brief, shining moment, Vex saw through the veil of the Shardlands. She saw Ignareth — burning, beautiful, waiting. And she saw something else."),
			ShardLore.narration("A face. Vast and terrible. Made of nothing and everything. Watching. Smiling."),
			ShardLore.dialogue("Scorchcaller Vex", "...What are you?", "horrified"),
			ShardLore.fhah_zolg("I am the one who set the board. I am the one who chose the pieces. And you, little flame... you are my favorite."),
			ShardLore.narration("The vision collapsed. The warmth faded. Vex was back in the Shardlands, surrounded by her warriors, clutching a shard that still hummed with the echo of home."),
			ShardLore.dialogue("Scorchcaller Vex", "...Someone brought us here. Something. Not fate, not chance — a will. A mind. And it's watching us right now.", "cold_fury"),
			ShardLore.narration("She looked at the shard in her hand. Then at her warband. Then at the horizon, where other factions' campfires flickered like stars."),
			ShardLore.dialogue("Scorchcaller Vex", "We're not going home yet. Not until I find whatever did this and burn it so badly that reality itself remembers the heat. Emberclaw don't run from a fight. We never have. We never will.", "resolute"),
			ShardLore.narration("The campaign was over. The war was just beginning."),
			ShardLore.narration("And somewhere beyond the veil, Fhah-Zolg laughed."),
		],
		"defeat_story": [
			ShardLore.narration("The combined forces proved too much. Vex's warband — brave, bloodied, and exhausted — could not hold the nexus against two armies."),
			ShardLore.dialogue("Scorchcaller Vex", "Pull back. We're not done — we are NEVER done. We'll lick our wounds, we'll gather our strength, and we'll take that nexus. This is a trial. And I have never failed a trial.", "defiant"),
			ShardLore.narration("The Emberclaw retreated into the broken hills. Behind them, the shard nexus pulsed — waiting."),
		],
		"player_army": [
			"Scorchcaller Vex",
			"Ashborn Infantry",
			"Ashborn Infantry",
			"Emberclaw Warriors",
			"Flameborn Guard",
			"Emberforged Blades",
			"Pyromancer Adepts",
			"Hatchery Guard",
			"Emberknight Riders",
			"Pyroclast Catapult",
			"Reborn Phalanx",
			"Scorched Veterans",
		],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": [
			"Loom-Mother Vethiss",
			"Spiderling Swarm",
			"Spiderling Swarm",
			"Silk-Warden Regulars",
			"Silk-Warden Regulars",
			"Shuttle-Consort Militia",
			"Shuttle-Consort Militia",
			"Fate-Thread Weavers",
			"Silk Colossus",
			"Fate-Loom Engine",
		],
		"battle_size": "epic",
		"scenario": "shard_clash",
		"round_limit": 8,
		"tutorial_tips": [
			"This is the final battle — use everything you've learned.",
			"Prioritize the shard objectives to win on points.",
			"Keep Vex alive — losing your commander severely impacts morale.",
			"Use your veteran units to anchor the line while drakes and cavalry flank.",
		],		"battle_modifiers": {
			"label": "Shard Nexus Convergence",
			"description": "The nexus empowers all. Every unit gains +1 HP. The stakes have never been higher.",
			"player_hp_bonus": 1,
			"enemy_hp_bonus": 1,
		},	}

# ══════════════════════════════════════════════════════════════
# ENDING STORY — Shown after completing all missions
# ══════════════════════════════════════════════════════════════

static func _ending_story() -> Array:
	return [
		ShardLore.narration("===  CAMPAIGN COMPLETE: TRIAL BY FIRE  ==="),
		ShardLore.narration("Scorchcaller Vex has survived the Shardlands. She has fought beasts, machines, vampires, and spider-queens. She has gathered shards, won battles, and earned the loyalty of a warband forged in alien fire."),
		ShardLore.narration("But the greatest trial lies ahead. Now she knows the truth — the Shardlands are a game board, and something ancient is playing with their lives."),
		ShardLore.narration("The question is: what will she do about it?"),
		ShardLore.dialogue("Scorchcaller Vex", "I'll find the other commanders. The Iron Dominion lord — Calculon — he was researching this. Maybe he has answers. And Sanguinar... the vampire knew something. I could see it in his eyes. Even monsters fear what brought them here.", "determined"),
		ShardLore.narration("Vex looked east, where the campfires of the Veilbound flickered with spiritual light."),
		ShardLore.dialogue("Scorchcaller Vex", "We need allies. Even temporary ones. Because whatever Fhah-Zolg is... it's bigger than any single faction. And I intend to burn it.", "resolute"),
		ShardLore.narration("The fire-queen marched east. Behind her, the Emberclaw followed — scarred, stronger, and no longer afraid of the dark."),
		ShardLore.narration("Somewhere, Fhah-Zolg watched. And for the first time in an eternity, something almost like respect flickered across a face that had forgotten how to feel it."),
		ShardLore.fhah_zolg("Oh, Vex. You beautiful, furious creature. You think you can burn a god? ...I sincerely hope you try."),
	]
