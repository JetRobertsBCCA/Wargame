class_name EmberclawSyraxCampaign
## Flameheart Syrax — "The Prophet's Flame"
## Prophecy, Morale, Divine channel. RNG 12. Religious/prophetic campaign.
## 4 missions. Teaches morale management, ranged divine attacks, support play.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_syrax",
		"commander": "Flameheart Syrax",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "The Prophet's Flame",
		"description": "Flameheart Syrax is the high priestess of the Emberclaw fire-faith. In the Shardlands, the divine flame speaks in new tongues, and Syrax must interpret its alien prophecies.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The sacred flame had changed."),
		ShardLore.narration("In Ignareth, the Emberclaw fire-faith was simple: the flame is life, the flame is truth, the flame reveals. Syrax had served as high priestess for twenty years, reading the future in the dance of sacred fire, interpreting the will of the burning gods."),
		ShardLore.narration("In the Shardlands, the fire spoke differently. It spoke in riddles. It spoke in warnings. And sometimes, in the deep watch of the night, it spoke in a voice that was not divine at all."),
		ShardLore.dialogue("Flameheart Syrax", "The flame shows me visions I cannot interpret. A stage. An audience. A game being played with living pieces. I do not understand these images. But I feel their weight. Something vast is watching us. The flame is trying to warn us.", "troubled"),
		ShardLore.fhah_zolg("The priestess can hear me through the fire. How inconvenient. I shall have to be more careful with my whispers."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Burning Sermon",
		"objectives_text": "Rally the demoralized Emberclaw settlers against the Nightfang raiders. Morale is the weapon.",
		"pre_story": [
			ShardLore.dialogue("Flameheart Syrax", "The people are afraid. Lost, broken, faithless. The fire still burns — I can feel it, even in this alien world. Let me speak to them. Let me remind them what we are. Then let me bring that fire to the enemy.", "compassionate"),
		],
		"post_story": [
			ShardLore.narration("Syrax's sermon was simple: 'The flame followed us here. Across the void between worlds, through the breaking of reality itself, the sacred flame endured. If the fire survives, so do we. If we survive, we fight. If we fight, we win.'"),
			ShardLore.narration("The settlers took up weapons. The retreat became a stand. The stand became a victory."),
			ShardLore.dialogue("Flameheart Syrax", "Faith is not belief without evidence. Faith is action in spite of fear. Today, the Emberclaw remembered their faith. The Nightfang learned our conviction.", "serene"),
		],
		"defeat_story": [
			ShardLore.dialogue("Flameheart Syrax", "My words were not enough. I need to show them the flame, not just speak of it.", "disappointed"),
		],
		"player_army": ["Flameheart Syrax", "Divine Acolytes", "Flameheart Clerics", "Flame Prophets"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Blood Thralls", "Corruption Scouts", "Blood Reavers"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["Syrax has RNG 12 — enormous ranged divine attacks. Keep her behind the front line.", "Divine Acolytes and Flameheart Clerics boost morale. Position them to cover your army.", "Flame Prophets can reveal enemy positions. Use them every round."],
		"battle_modifiers": {"label": "Burning Faith", "description": "Syrax's sermon inspires all. Your units gain +2 MOR.", "player_mor_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "The Oracle's War",
		"objectives_text": "The flame has shown the Iron Dominion's attack plan. Use the prophecy to set a perfect ambush.",
		"pre_story": [
			ShardLore.dialogue("Flameheart Syrax", "The flame revealed their plan three days before they made it. Every movement, every formation, every contingency. The machine-lord thinks in patterns. The flame reads patterns. We know exactly where they will be and when. All we must do is be there first.", "knowing"),
		],
		"post_story": [
			ShardLore.narration("The ambush was flawless. Every prediction exact, every positioning perfect. The Iron Dominion force walked into a kill-box that Syrax had seen in her flames three days prior."),
			ShardLore.dialogue("Flameheart Syrax", "The flame does not lie. It does not guess. It SEES. And what it sees, I act upon. Lord Calculon calculates the future. I see it. There is a difference between calculation and sight.", "confident"),
		],
		"defeat_story": [
			ShardLore.dialogue("Flameheart Syrax", "The vision was incomplete. The flame showed what would happen, not what COULD happen. I misread the prophecy. I must pray for clarity.", "humbled"),
		],
		"player_army": ["Flameheart Syrax", "Flameheart Clerics", "Flame Prophets", "Emberclaw Warriors", "Fragment-Blade Assassins", "Scorched Veterans"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Steam Sentinels", "Clockwork Infantry", "Steam-Powered Sharpshooters", "Aether Blasters"],
		"battle_size": "standard",
		"scenario": "total_war",
		"round_limit": 6,
		"tutorial_tips": ["You have prophecy advantage. Your units start in optimal positions.", "Fragment-Blade Assassins should strike from the flanks immediately.", "Syrax's ranged divine attacks can devastate the enemy before they close."],
		"battle_modifiers": {"label": "Prophetic Vision", "description": "Syrax foresaw everything. Your units gain +1 ATK and start in ambush positions.", "player_atk_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Whispering Flame",
		"objectives_text": "The sacred flame is speaking in a voice that is not divine. Investigate the corrupted shrine.",
		"pre_story": [
			ShardLore.dialogue("Flameheart Syrax", "Something is using the flame to speak. Not our gods — something else. Something that knows my name. It whispers about stages and audiences and games. I must find the source of these whispers. The corrupted shrine to the north — the flame burns green there. That is where the voice is loudest.", "wary"),
		],
		"post_story": [
			ShardLore.narration("The corrupted shrine pulsed with green flame — a color that should not exist in the Emberclaw fire-faith. Syrax approached it in full ritual regalia, her own sacred flame blazing gold in counterpoint."),
			ShardLore.narration("The green flame spoke. Not in words, but in impressions: a vast intelligence, ancient and alone, watching everything through windows of fire and crystal and thread—"),
			ShardLore.fhah_zolg("Clever priestess. You can hear me through the fire because fire is the closest metaphor your mind has for what I actually am. I am not a god. I am something sadder. Continue your war, prophet. Your faith is... beautiful. Even if the thing you pray to is just the echo of your own conviction."),
			ShardLore.dialogue("Flameheart Syrax", "The voice is not a god. It is not a demon. It is... lonely. And it is watching us with the attention of someone who has nothing else to watch. I do not fear it. I pity it.", "compassionate"),
		],
		"defeat_story": [
			ShardLore.dialogue("Flameheart Syrax", "The green flame was too strong. It drowned out my own sacred fire. I must strengthen my faith before I can face it again.", "shaken"),
		],
		"player_army": ["Flameheart Syrax", "Divine Acolytes", "Flameheart Clerics", "Flame Prophets", "Phoenix Guard", "Bonfire Keepers"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Elite Cmdr Rengoku", "Oni Mask Executioners", "Temple Defenders", "Crimson Oni Riders", "Void Bolt Crossbowmen", "Spirit Healer Monks"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": ["Shard Clash: reach the corrupted shrine (shard) at the center.", "The Crimson Prophet is the Nightfang's religious leader. A battle of faiths.", "Phoenix Guard can resurrect. Use them as the vanguard.", "Bonfire Keepers maintain morale. Essential against Nightfang terror tactics."],
		"battle_modifiers": {"label": "Sacred Fire", "description": "Syrax's faith blazes bright. All units gain +1 MOR and +1 DEF.", "player_mor_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Light in the Dark",
		"objectives_text": "The Nightfang are performing a mass corruption ritual. Only Syrax's sacred flame can counter it. Lead the crusade.",
		"pre_story": [
			ShardLore.dialogue("Flameheart Syrax", "They are trying to corrupt the fragment-nexus — turn it into a source of blood-magic. If they succeed, the entire region falls to darkness. The flame has shown me: this is my purpose. This is why the sacred fire followed us to the Shardlands. Not for war. For THIS. One light, standing against the dark.", "absolute_conviction"),
		],
		"post_story": [
			ShardLore.narration("Syrax's golden flame met the Nightfang's crimson corruption and the world held its breath. Light against dark, faith against hunger, life against death."),
			ShardLore.narration("The golden flame won. Not through greater power — through greater conviction. Syrax's faith was not in gods or prophecy. It was in the people behind her. The settlers, the soldiers, the lost and frightened refugees of a broken world who needed to believe that light endured."),
			ShardLore.dialogue("Flameheart Syrax", "The flame does not fight the dark. The flame does not conquer the dark. The flame simply burns. And as long as one of us holds it, the dark cannot win. This is the truth the Shardlands taught me. This is the prophecy I choose to fulfill.", "radiant"),
		],
		"defeat_story": [
			ShardLore.dialogue("Flameheart Syrax", "The corruption is stronger than my flame alone. I need the other factions. I need the coalition's combined light. No single fire can dispel this darkness.", "reaching_out"),
		],
		"player_army": ["Flameheart Syrax", "Divine Acolytes", "Flameheart Clerics", "Flame Prophets", "Phoenix Guard", "Bonfire Keepers", "Scorched Veterans", "Flameborn Guard"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Lord Sanguinar", "Blood Reavers", "Blood Shamans", "Tiger Berserkers", "Shadow Stalkers", "Nightfang Warriors", "Crimson Behemoth", "Nightfang Dragon"],
		"battle_size": "epic",
		"scenario": "king_of_the_hill",
		"round_limit": 8,
		"tutorial_tips": ["King of the Hill: control the fragment-nexus to prevent the corruption ritual.", "Syrax's RNG 12 divine attacks are your main damage source. Protect her.", "Phoenix Guard can hold the center — they resurrect once.", "This is a crusade. Morale is your advantage. Don't let it break."],
		"battle_modifiers": {"label": "Sacred Crusade", "description": "The flame burns brightest. All units gain +2 MOR and +1 ATK.", "player_mor_bonus": 2, "player_atk_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Syrax knelt before the eternal flame — the sacred fire that burned on every Emberclaw shrine, every camp, every hearth. In the Shardlands, it burned a little differently. A little brighter. A little more aware."),
		ShardLore.dialogue("Flameheart Syrax", "I came here as a prophet of fire-gods. I leave as something else. The gods may or may not exist. The flame certainly does. And the flame is not divine — it is ours. It is the warmth we carry inside us, the light we refuse to let die, the conviction that tomorrow will be better than today. That is the true prophecy: not what will happen, but what we choose to make happen.", "transcendent"),
		ShardLore.narration("The eternal flame pulsed — gold, warm, steadfast. And somewhere in the spaces between worlds, a lonely observer watched this tiny, fierce light with something that, in a being without a heart, might have been hope."),
	]
