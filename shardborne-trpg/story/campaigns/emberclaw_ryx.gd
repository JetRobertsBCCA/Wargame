class_name EmberclawRyxCampaign
## Ashborn Ryx — "Shards of the Old World"
## Fragment specialist and ranged fire expert. Hunts shards to find a way home.
## 4 missions. Teaches ranged tactics, fragment mechanics, artillery play.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_ryx",
		"commander": "Ashborn Ryx",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "Shards of the Old World",
		"description": "Ashborn Ryx was the Emberclaw's foremost fragment scholar. In the Shardlands, every shard whispers of Ignareth. She will collect them all — or die trying.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("While others raged, Ryx studied. The shards scattered across the Shardlands were not mere crystals — they were fragments of collapsed realities, each one containing an echo of the world it came from. And some of them echoed with the volcanic harmonics of Ignareth."),
		ShardLore.dialogue("Ashborn Ryx", "These shards... they are pieces of our home. I can feel the Burning Peaks inside them. If I can collect enough, if I can reassemble the pattern, perhaps I can find a path back.", "driven"),
		ShardLore.fhah_zolg("The scholar. She picks up the shattered pieces of my board and tries to read the rules. Adorable."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Fragment Harvest",
		"objectives_text": "Secure the shard deposits before rival scavengers claim them.",
		"pre_story": [
			ShardLore.dialogue("Ashborn Ryx", "Three shard deposits detected — volcanic resonance confirmed. These are Ignareth shards. Every one we collect is a piece of the puzzle. Move fast, collect everything.", "analytical"),
		],
		"post_story": [
			ShardLore.narration("The shards hummed in Ryx's hands, and for a moment she saw Ignareth — the Burning Peaks, the Crimson Caldera, the sky painted in eternal sunset. Then it faded."),
			ShardLore.dialogue("Ashborn Ryx", "Fourteen shards. Enough to confirm my theory — these fragments contain spatial coordinates. Ignareth is not destroyed. It is displaced. Like us.", "excited"),
		],
		"defeat_story": [
			ShardLore.dialogue("Ashborn Ryx", "The deposits are lost. But the data I gathered during the approach is still valuable. We will find more.", "pragmatic"),
		],
		"player_army": ["Ashborn Ryx", "Ashwalker Skirmishers", "Pyromancer Adepts", "Fragment Shapers"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Ritual Cpt Akikaze", "Veiled Ashigaru", "Celestial Slingers"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["Ryx excels at range. Keep her behind your front line.", "Fragment Shapers buff fragment-using units. Keep them near Ryx.", "Pyromancer Adepts have Fire Bolt — use them to soften targets at range."],
		"battle_modifiers": {"label": "Fragment Resonance", "description": "Shards amplify ranged attacks. Your ranged units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Scholar's War",
		"objectives_text": "Defend the shard research camp against Nightfang raiders.",
		"pre_story": [
			ShardLore.dialogue("Ashborn Ryx", "I need time to study the fragments. Which means someone needs to keep the blood-drinkers away from my research equipment. Form a perimeter. If anything gets through, aim for the eyes.", "matter_of_fact"),
		],
		"post_story": [
			ShardLore.narration("The research yielded terrifying results. The shards from different worlds could be combined — fused together in ways that created entirely new materials. Materials that responded to thought. Materials that seemed almost... alive."),
			ShardLore.dialogue("Ashborn Ryx", "The shards want to be recombined. They seek each other out, resonating at frequencies that pull them together. Someone designed them this way. These are not random fragments — they are components.", "disturbed"),
		],
		"defeat_story": [
			ShardLore.dialogue("Ashborn Ryx", "Research equipment destroyed. Months of work lost. But the knowledge remains in my head. They cannot burn that.", "bitter"),
		],
		"player_army": ["Ashborn Ryx", "Ashborn Infantry", "Pyromancer Adepts", "Fragment Shapers", "Fragment Artillery Crew", "Fragment Launcher"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Blood Reavers", "Nightfang Warriors", "Tiger Berserkers", "Shadow Stalkers", "Blood Shamans"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["Fragment Launcher has extreme range and variable effects. Use it to control approaches.", "Fragment Artillery Crew operate war machines — keep them near the Fragment Launcher.", "Ryx's Fragment Specialist ability makes her deadly at range. Position her centrally."],
		"battle_modifiers": {"label": "Research Priority", "description": "Losing positions means losing research. Defend all three points.", "enemy_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Ignareth Fragment",
		"objectives_text": "Reach the massive shard deposit that resonates with Ignareth's volcanic frequency. Contest it against Iron Dominion forces.",
		"pre_story": [
			ShardLore.dialogue("Ashborn Ryx", "A shard the size of a house. Volcanic frequency off the scale. This is not just a fragment of Ignareth — this is a piece of the Crimson Caldera itself. If I can attune it, I may be able to open a window home.", "breathless"),
		],
		"post_story": [
			ShardLore.narration("The shard attuned. For three blazing seconds, Ryx saw through it — a window into Ignareth, the Burning Peaks still standing, still erupting, still alive. Her people were not destroyed. Just displaced."),
			ShardLore.narration("Then the window showed something else: the absence. The space where Ignareth's fragment had been torn away. A wound in reality, slowly healing, slowly closing."),
			ShardLore.dialogue("Ashborn Ryx", "The window is closing. Ignareth is healing the wound we left behind. If we wait too long, there will be nothing to return to. No gap in reality to slip through. We have to act.", "desperate"),
		],
		"defeat_story": [
			ShardLore.dialogue("Ashborn Ryx", "The machine-lord's forces secured the shard. But they do not know what they have. I will get it back.", "cold"),
		],
		"player_army": ["Ashborn Ryx", "Emberclaw Warriors", "Pyromancer Adepts", "Pyromancer Circle", "Fragment Shapers", "Fragment Launcher", "Skytalon Lancers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Infantry Regiment", "Steam Sentinels", "Steam-Powered Sharpshooters", "Gearwright Engineers", "Steam Artillery Crew"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["This is a race for the central mega-shard. Contest it early.", "Skytalon Lancers can fly over defensive lines to reach distant objectives.", "Pyromancer Circle provides ranged area damage — devastating against clustered Iron Dominion formations."],
		"battle_modifiers": {"label": "Volcanic Resonance", "description": "The Ignareth shard empowers fire. Your units gain +1 ATK near shard nodes.", "player_atk_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Window Home",
		"objectives_text": "Hold the Ignareth Fragment against all comers while Ryx attunes the resonance. Control the convergence point.",
		"pre_story": [
			ShardLore.dialogue("Ashborn Ryx", "The attunement will take the entire battle. I need the convergence point held while I work. Everything we have fought for comes down to this — if the fragment fully attunes, we will have a permanent window to Ignareth. A way home.", "focused"),
		],
		"post_story": [
			ShardLore.narration("The fragment attuned. The window opened — permanent, stable, a blazing doorway of volcanic light that connected the Shardlands to the Burning Peaks of Ignareth."),
			ShardLore.narration("Ryx stared through it. Home. Real home. The sky was red and the air tasted of sulfur and everything was exactly as she remembered."),
			ShardLore.narration("Then she looked back at the Shardlands. At the broken world. At the coalition forming. At the evidence of something vast and lonely manipulating them all."),
			ShardLore.dialogue("Ashborn Ryx", "I found the way home. But I am not going through it. Not yet. Not while the others are still trapped. Not while Fhah-Zolg still plays his game. The window stays open. When we are all ready — when the coalition has won — we all go home. Together. Or not at all.", "resolve"),
		],
		"defeat_story": [
			ShardLore.dialogue("Ashborn Ryx", "The attunement failed. But I know it is possible now. We will secure the fragment and try again.", "unbroken"),
		],
		"player_army": ["Ashborn Ryx", "Emberclaw Warriors", "Flameborn Guard", "Pyromancer Adepts", "Pyromancer Circle", "Fragment Shapers", "Fragment Launcher", "Ember Ballista"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Thread-Seer Kythara", "Silk-Warden Regulars", "Gossamer Guard", "Venom Dancers", "Silk-Rider Lancers", "Fate-Thread Weavers", "Silk Catapult"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["King of the Hill: hold the convergence while Ryx attunes.", "Ember Ballista provides anti-air and armor piercing — useful against Silk-Riders.", "Fragment Launcher's extreme range can hit from the hilltop. Keep it central."],
		"battle_modifiers": {"label": "Home Calls", "description": "The Ignareth Fragment inspires the Emberclaw. All units gain +1 MOR.", "player_mor_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("The window to Ignareth blazed at the heart of the Emberclaw camp — a permanent reminder that home was real, that home was reachable, and that the choice to stay was exactly that: a choice."),
		ShardLore.dialogue("Ashborn Ryx", "I am a scholar. I solve problems. And the greatest problem in the Shardlands is not finding home — it is finding the truth. The shards are components. The factions are threads. And Fhah-Zolg is the weaver. If we understand the design, we can change it.", "certain"),
	]
