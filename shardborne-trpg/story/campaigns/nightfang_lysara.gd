class_name NightfangLysaraCampaign
## Blood Duchess Lysara — "The Crimson Court"
## Blood drain, Aristocratic warfare, ATK 15, CMD 10. Elegant noble warrior.

static func get_campaign() -> Dictionary:
	return {
		"id": "nightfang_lysara",
		"commander": "Blood Duchess Lysara",
		"faction_enum": CombatantDefinition.Faction.NIGHTFANG,
		"title": "The Crimson Court",
		"description": "Blood Duchess Lysara wages war as she hosts dinner parties — with elegance, precision, and the absolute certainty that she is better than everyone in the room.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Blood Duchess Lysara", "War is a social engagement, darling. It has rules, etiquette, and a guest list. The trick is ensuring your enemies are too polite to notice they're dying. Blood Drain is so much more elegant than stabbing — one drains, one sustains, and the victim barely feels a thing. At least, not at first.", "aristocratic"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Invitation",
		"objectives_text": "Engage the Thornweft with aristocratic precision. Drain their forces elegantly.",
		"pre_story": [ShardLore.dialogue("Blood Duchess Lysara", "I've sent the Thornweft a formal invitation to surrender. They won't accept, of course — those dreadful spider-folk have no breeding. But the gesture matters. One must maintain standards, even in the wilderness. Especially in the wilderness.", "disdainful_grace")],
		"post_story": [ShardLore.dialogue("Blood Duchess Lysara", "They fought well, for savages. I drained their commander personally — her blood tasted of silk and fear. Quite the vintage. My forces sustained minimal casualties, because why die when you can simply drink the enemy's life force? Warfare as it was meant to be: refined.", "pleased")],
		"defeat_story": [ShardLore.dialogue("Blood Duchess Lysara", "How... gauche. They fought without style. Without form. Without MANNERS. I shall have to reconsider my approach. One cannot fight artistically against barbarians.", "offended")],
		"player_army": ["Blood Duchess Lysara", "Blood Reavers", "Bloodsworn Templars", "Blood Champion", "Blood Shamans"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Gossamer Guard", "Silk-Warden Regulars", "Spiderling Swarm", "Cocoon Wardens"],
		"battle_size": "skirmish",
		"scenario": "broken_ground",
		"round_limit": 6,
		"tutorial_tips": ["Blood Drain units heal when they deal damage. Sustain through fighting.", "Lysara's Blood Drain makes her nearly unkillable in melee.", "Blood Champion engages their strongest unit. Drain and sustain."],
		"battle_modifiers": {"label": "Aristocratic Warfare", "description": "Blood sustains. All Blood Drain units heal when attacking.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Ball",
		"objectives_text": "Lysara hosts a 'diplomatic reception' — actually a trap for the Iron Dominion envoy.",
		"pre_story": [ShardLore.dialogue("Blood Duchess Lysara", "I've arranged a meeting with the Iron Dominion. A diplomatic reception — wine, conversation, the exchange of pleasantries. They'll send an envoy with guards. I'll send an invitation with assassins. The difference between diplomacy and war, darling, is merely one of tableware.", "lethal_charm")],
		"post_story": [ShardLore.dialogue("Blood Duchess Lysara", "The envoy died at the dessert course. Unfortunately, his guards were more persistent — they actually fought back. So uncivilized. But the intelligence he carried is now mine, and his blood was... well, let's say the Iron Dominion seasons their officers with interesting minerals.", "dark_humor")],
		"defeat_story": [ShardLore.dialogue("Blood Duchess Lysara", "The envoy escaped! With the guards covering his retreat. Most annoying. I shall have to host a second reception. The catering costs alone...", "irritated")],
		"player_army": ["Blood Duchess Lysara", "Midnight Assassin", "Blood Reavers", "Nightveil Infiltrators", "Shadow Claw Infantry", "Blood Shamans"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Ritual Cpt Akikaze", "Inkblade Initiates", "Lotus Ascetics", "Thunder Kirin Cavalry", "Dreampiercer Archers", "Spirit Healer Monks"],
		"battle_size": "standard",
		"scenario": "shardstorm",
		"round_limit": 7,
		"tutorial_tips": ["Lady Brassveil is an intelligence commander — she may have prepared.", "Midnight Assassin targets priority enemies. Eliminate the leader.", "Blood Drain makes your army self-sustaining. Press aggressively."],
		"battle_modifiers": {"label": "The Ball", "description": "Trap sprung. First-strike bonus. All units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Duchess's Duel",
		"objectives_text": "Lysara versus the Emberclaw champion. Honor demands a personal contest.",
		"pre_story": [ShardLore.dialogue("Blood Duchess Lysara", "The Emberclaw have sent a champion to challenge me personally. How delightful! A formal duel. Sanguinar would have the champion killed by thralls. Nyxara would have them poisoned. But I? I accept the challenge. Because style MATTERS, darling. And I am going to drain that fire-lizard dry while maintaining perfect posture.", "delighted")],
		"post_story": [ShardLore.dialogue("Blood Duchess Lysara", "The champion fought admirably. Strong. Fast. Full of fire and fury. But Blood Drain is insidious — each strike I landed drew life from them and gave it to me. By the end, they were too weak to lift their blade, and I hadn't broken a sweat. THAT is aristocratic warfare. Winning so elegantly that even the loser applauds.", "triumphant")],
		"defeat_story": [ShardLore.dialogue("Blood Duchess Lysara", "They... they were too fast. The fire cauterized the wounds before I could drain them. Clever beast. I shall need to reconsider my technique.", "shaken_dignity")],
		"player_army": ["Blood Duchess Lysara", "Blood Champion", "Bloodsworn Templars", "Blood Fanged Riders", "Crimson Chanters", "Blood Reavers"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Skullcrusher Threx", "Emberforged Blades", "Emberclaw Warriors", "Unbonded Berserkers", "Mature War Drake", "Ashrider Scouts"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["The duel — Lysara vs Threx at the center.", "Blood Drain sustains Lysara. Keep her fighting.", "Crimson Chanters boost morale. Blood Reavers swarm the flanks."],
		"battle_modifiers": {"label": "The Duchess's Duel", "description": "Honor and blood. Lysara gains +3 ATK in melee.", "player_atk_bonus": 3},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Crimson Court",
		"objectives_text": "The Duchess assembles her full court for total war. Elegance and annihilation.",
		"pre_story": [
			ShardLore.dialogue("Blood Duchess Lysara", "The Crimson Court convenes. Every noble of the blood, every champion, every warrior of breeding and distinction. We go to war not as savages, but as ARISTOCRACY. Let the Iron Dominion bring their machines. Let them bring their Grid, their calculations, their sterile, loveless efficiency. We bring PASSION. We bring HUNGER. We bring the eternal truth that blood is thicker than steel.", "regal"),
		],
		"post_story": [
			ShardLore.narration("The Crimson Court swept across the battlefield like a crimson tide — elegant, devastating, and utterly unstoppable. Blood Duchess Lysara led from the front, her blade dancing, her Blood Drain sustaining her through wounds that would have killed any mortal a dozen times over. She fought with the grace of a dancer and the cruelty of a predator, and when the Iron Dominion retreated, she curtsied after them."),
			ShardLore.dialogue("Blood Duchess Lysara", "Now THAT was a proper war. Heroism, drama, blood, and a satisfying conclusion. I do hope they'll return for a rematch. It would be so dreadfully boring without enemies of quality. One must have standards, even in the apocalypse.", "content"),
		],
		"defeat_story": [ShardLore.dialogue("Blood Duchess Lysara", "The Court... fell. My nobles, my champions, my beautiful crimson warriors. But a true Duchess does not cry. She rebuilds. She recruits. And she ensures that the next engagement is even more spectacular.", "composure_in_defeat")],
		"player_army": ["Blood Duchess Lysara", "Blood Champion", "Bloodsworn Templars", "Tiger Fang Elite", "Blood Fanged Riders", "Crimson Chanters", "Blood Shamans", "Nightfang Dragon"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lord Calculon", "Clockwork Titan", "Elite Vanguard", "Steam Heavy Guards", "Steam Artillery Crew", "Aether Marksmen", "Infantry Regiment", "Steam Colossus"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["The Crimson Court — elite Blood Drain army.", "Nightfang Dragon is your air superiority. It devastates ranged units.", "Blood Drain keeps your army alive. Press the attack.", "Lord Calculon is dangerous. Drain him before the Grid compensates."],
		"battle_modifiers": {"label": "The Crimson Court", "description": "Noble blood. All Blood Drain units gain +2 ATK and heal on hit.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Blood Duchess Lysara", "They call us monsters. Predators. Parasites. But what is a noble without blood? What is a court without drama? What is an empire without style? The Nightfang Dominion is not a nightmare. It is a masquerade — beautiful, dangerous, and absolutely divine. And the Crimson Court will host the grandest masquerade the Shardlands have ever seen.", "final_flourish"),
	]
