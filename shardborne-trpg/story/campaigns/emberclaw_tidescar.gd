class_name EmberclawTidescarCampaign
## Tidescar the Exiled — "The Exile's Gambit"
## Corrupted fragments, High-risk power. MOR 7 (low). Dark power campaign.
## 4 missions. Teaches risk/reward, fragment corruption, moral ambiguity.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_tidescar",
		"commander": "Tidescar the Exiled",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "The Exile's Gambit",
		"description": "Tidescar the Exiled was cast out of the Emberclaw for dabbling in corrupted shard-fire. In the Shardlands, where corruption is everywhere, his forbidden knowledge becomes the warpack's most dangerous asset.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("Nobody trusted Tidescar. With good reason."),
		ShardLore.narration("He had been exiled from the warpack seven years ago for using corrupted shard-fragments to amplify his fire-magic — a practice the fire-faith condemned as heresy, the military condemned as reckless, and the medical corps condemned as suicidal. The corruption ate his right eye and half his face, leaving scars that looked like a tide-map of alien continents."),
		ShardLore.dialogue("Tidescar the Exiled", "They exiled me for understanding something they were afraid to look at. The corrupted fragments aren't evil — they're just power without intention. A forge fire burns you if you're careless, but nobody calls forge-fire evil. The corruption is the same. It only needs a steady hand.", "bitter"),
		ShardLore.narration("In the Shardlands, where corruption permeated everything and clean fragments were rare, Tidescar's forbidden expertise was suddenly indispensable. Vex invited him back — provisionally, grudgingly, and with the understanding that one wrong step would end with his head."),
		ShardLore.fhah_zolg("The outcast. He touches the parts of this world the others won't. He sees things the way they actually are, not the way faith and fear paint them. Dangerous. Useful. I should keep an eye on this one."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Corruption Harvest",
		"objectives_text": "Harvest corrupted shard-fragments from the dead zone. The warpack needs them, even if they won't admit it.",
		"pre_story": [
			ShardLore.dialogue("Tidescar the Exiled", "Clean fragments are nearly gone. The warpack's weapons are failing. Torvan's forge needs fuel. But there are corrupted fragments everywhere — piles of them, in the dead zones where nothing grows. I can purify them. Partially. Enough to use. Nobody else can. Nobody else will try.", "pragmatic"),
		],
		"post_story": [
			ShardLore.narration("Tidescar harvested eleven corrupted fragments from the dead zone, handling each one with careful ritual gestures that looked remarkably like the fire-faith prayers he had been excommunicated for corrupting. The irony was not lost on him."),
			ShardLore.dialogue("Tidescar the Exiled", "Eleven fragments. Three fully purified, five partially stabilized, three still hot. Tell Torvan the stabilized ones are safe for forging. The hot ones... I'll handle those personally. They have uses the smith wouldn't approve of.", "calculating"),
		],
		"defeat_story": [
			ShardLore.dialogue("Tidescar the Exiled", "The corruption was deeper than expected. Even I couldn't handle that concentration. Need better containment.", "singed"),
		],
		"player_army": ["Tidescar the Exiled", "Fragment Shapers", "Smoke Weavers", "Emberclaw Warriors"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Asagiri", "Temple Defenders", "Shadow Marksmen"],
		"battle_size": "skirmish",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["Tidescar has high power but low MOR (7). His troops can break easier.", "Fragment Shapers amplify shard-fragment effects. Keep them near Tidescar.", "Smoke Weavers provide concealment. Use them to screen your approach.", "Shard Clash: secure the corrupted fragments at the center."],
		"battle_modifiers": {"label": "Corruption Affinity", "description": "Tidescar thrives in corruption. He gains +3 ATK in dead zones.", "player_atk_bonus": 3},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Forbidden Fire",
		"objectives_text": "Use corrupted fire to destroy the Thornweft web-fortress. The clean fire isn't strong enough.",
		"pre_story": [
			ShardLore.dialogue("Tidescar the Exiled", "Syrax tried to burn the web-fortress with sacred fire. Failed. Too pure — the web absorbs holy energy and converts it to anchor-fuel. But corrupted fire... corrupted fire doesn't convert. It devours. Let me do what I was exiled for. Just this once.", "dark_amusement"),
		],
		"post_story": [
			ShardLore.narration("The corrupted fire was beautiful in a terrible way — black-green flames that consumed everything they touched, not with heat but with entropy. The web-fortress didn't burn. It aged. A thousand years of decay in ten seconds, and the silk crumbled to ancient dust."),
			ShardLore.dialogue("Tidescar the Exiled", "See? Corruption isn't evil. It's just time accelerated. Everything decays eventually. I just... speed it up. The web was going to crumble in a century. I gave it a century in ten seconds. Is that evil? Or is it just efficiency?", "philosophical"),
		],
		"defeat_story": [
			ShardLore.dialogue("Tidescar the Exiled", "The corruption backfired. It always does, eventually. I miscalculated the resonance. Won't happen again. Probably.", "annoyed"),
		],
		"player_army": ["Tidescar the Exiled", "Fragment Shapers", "Smoke Weavers", "Pyromancer Circle", "Immolation Bombers", "Emberclaw Warriors"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Loom-Mother Silivex", "Silk-Warden Regulars", "Gossamer Guard", "Web-Anchor Engineers", "Cocoon Wardens", "Spiderling Swarm"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": ["Tidescar's corrupted fire is devastating but unstable. High risk, high reward.", "Fragment Shapers amplify Tidescar's attacks. Chain them for maximum effect.", "Immolation Bombers are sacrifice units. Use them to breach the outer web."],
		"battle_modifiers": {"label": "Corrupted Fire", "description": "Tidescar unleashes forbidden fire. He gains +3 ATK but -2 MOR.", "player_atk_bonus": 3, "player_mor_penalty": -2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Price",
		"objectives_text": "The corruption is spreading through Tidescar's body. Find the stabilization fragment before it consumes him.",
		"pre_story": [
			ShardLore.dialogue("Tidescar the Exiled", "The corruption is accelerating. My right arm is crystallizing. I have maybe three days before it reaches my heart. I need a pure fragment — the purest I can find — to stabilize the corruption. Without it... well. The warpack gets a very dramatic funeral and loses its corruption expert.", "blackly_humorous"),
		],
		"post_story": [
			ShardLore.narration("Tidescar found the stabilization fragment — a perfectly pure shard-crystal, pulsing with clean energy. He pressed it against his crystallizing arm and screamed as purification and corruption warred inside his body."),
			ShardLore.narration("When it was over, his arm was saved — half organic, half crystal, an amalgamation that should have been impossible. He flexed his fingers. Organic fingers on one hand, crystal fingers on the other. Both responded."),
			ShardLore.dialogue("Tidescar the Exiled", "The corruption isn't gone. It's balanced. Pure and corrupted, coexisting inside one body. I am the proof that the two can work together. That's either a breakthrough or a delayed death sentence. Honestly, I'll take either.", "manic"),
		],
		"defeat_story": [
			ShardLore.dialogue("Tidescar the Exiled", "Couldn't reach the fragment in time. The crystallization is spreading. I'm running out of days. Somebody... help.", "vulnerable"),
		],
		"player_army": ["Tidescar the Exiled", "Fragment Shapers", "Flameheart Clerics", "Smoke Weavers", "Fragment-Blade Assassins", "Ashrider Scouts"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["High Engineer Vortan", "Steam Sentinels", "Clockwork Infantry", "Aether Blasters", "Infantry Regiment", "Steam-Powered Sharpshooters"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["Shard Clash: reach the pure fragment before the enemy claims it.", "Tidescar is weakened — his corruption is fighting him. Be careful with his positioning.", "Flameheart Clerics can slow the corruption. Keep them near Tidescar.", "Fragment-Blade Assassins can bypass enemy lines to reach the shard first."],
		"battle_modifiers": {"label": "Desperation", "description": "Tidescar fights for his life. +2 ATK, but starts at reduced HP.", "player_atk_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Exile's Gambit",
		"objectives_text": "Use Tidescar's unique corruption/purification balance to neutralize the Nightfang corruption nexus. The one thing nobody else can do.",
		"pre_story": [
			ShardLore.dialogue("Tidescar the Exiled", "The corruption nexus is too strong for pure fire and too volatile for raw corruption. But I am both. I am the balance point. Let me walk into the heart of it and do what only a half-corrupted, half-pure, fully-crazy exile can do. Let me save the people who threw me out.", "determined"),
		],
		"post_story": [
			ShardLore.narration("Tidescar walked into the corruption nexus alone. His organic hand blazed with sacred flame. His crystal hand pulsed with corrupted energy. He reached into the nexus and spoke the word that was neither prayer nor curse but something between the two."),
			ShardLore.narration("The nexus collapsed. Not destroyed — neutralized. Corrupted energy became clean. Clean energy stabilized the corrupted. The impossible balance Tidescar held inside his own body, projected outward."),
			ShardLore.narration("He emerged from the collapsing nexus, smoking, bleeding from both organic and crystal, and grinning like a skull."),
			ShardLore.dialogue("Tidescar the Exiled", "They exiled me for understanding corruption. They brought me back because they needed corruption understood. Now I've done something nobody else could do — turned the enemy's greatest weapon into nothing. Maybe 'exile' was never the right word. Maybe 'specialist' was.", "vindicated"),
		],
		"defeat_story": [
			ShardLore.dialogue("Tidescar the Exiled", "The nexus rejected me. The balance failed. I need... I need help. From someone who understands purity. Syrax. I need Syrax.", "broken_pride"),
		],
		"player_army": ["Tidescar the Exiled", "Fragment Shapers", "Smoke Weavers", "Pyromancer Circle", "Immolation Bombers", "Flameheart Clerics", "Emberclaw Warriors", "Fragment-Blade Assassins"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Plague Herald Mortivex", "Blood Shamans", "Blood Reavers", "Shadow Stalkers", "Nightfang Warriors", "Nightfang Dragon", "Tiger Berserkers", "Blood Thralls"],
		"battle_size": "epic",
		"scenario": "shardstorm",
		"round_limit": 8,
		"tutorial_tips": ["Shardstorm: the battlefield shifts with fragment energy. Adapt constantly.", "Tidescar is your key — his balance of corruption and purity is unique.", "Plague Herald Mortivex is a corruption specialist. Your dark mirror.", "Fragment Shapers amplify Tidescar's neutralization. Cluster them near the nexus."],
		"battle_modifiers": {"label": "The Balance", "description": "Tidescar is the balance point. He gains +2 ATK and +2 DEF near fragment zones.", "player_atk_bonus": 2, "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Tidescar sat apart from the campfire, as he always did. Half in light, half in shadow. Half organic, half crystal. Half exile, half hero."),
		ShardLore.dialogue("Tidescar the Exiled", "They'll never fully trust me. That's fair. I dabbled in things that should have killed me and didn't, which means I either got lucky or I understood something they haven't. Either way, I'm not safe. But I'm useful. And in a world where usefulness is survival, that's enough.", "honest"),
		ShardLore.narration("He held up his crystal hand. Corrupted light pulsed through translucent fingers. His organic hand blazed with clean sacred fire. Two forces that should be incompatible, coexisting in one body, one soul, one stubborn, bitter, brilliant outcast."),
		ShardLore.dialogue("Tidescar the Exiled", "The exile's gambit: bet everything on being right, knowing that if you're wrong, you lose everything. I bet. I won. And the warpack has a weapon nobody else has — someone who stands in the space between light and dark, and doesn't flinch.", "quiet"),
	]
