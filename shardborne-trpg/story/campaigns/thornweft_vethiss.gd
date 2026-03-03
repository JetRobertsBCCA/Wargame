class_name ThornweftVethissCampaign
## Loom-Mother Vethiss — "The Pattern Unbroken"
## The first Thornweft Matriarchy campaign. Teaches web-based terrain control,
## Fate-Thread manipulation, venom attrition, and patient tactical dominance
## through 6 escalating battles.
##
## Story: Loom-Mother Vethiss awakens in the Shardlands with the Great Web
## severed and her people cocooned in emergency silk. She must reweave what was
## lost, study the other factions as threads in a new pattern, and confront the
## terrible truth that the greatest Weaver in reality is not her.
##
## Note: Mission 3 depicts the same conflict as Calculon's Mission 3
## ("Grid Expansion") — from Vethiss's perspective.

static func get_campaign() -> Dictionary:
	return {
		"id": "thornweft_vethiss",
		"commander": "Loom-Mother Vethiss",
		"faction_enum": CombatantDefinition.Faction.THORNWEFT,
		"title": "The Pattern Unbroken",
		"description": "The Great Web is severed. Loom-Mother Vethiss and her weavers hang suspended in emergency cocoons between dead threads. Reweave the world. Study the pattern. Become the pattern.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

# ══════════════════════════════════════════════════════════════
# OPENING STORY — Shown when player first starts the campaign
# ══════════════════════════════════════════════════════════════

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The thread broke."),
		ShardLore.narration("Not a thread — THE Thread. The core-line that held Silthara together, the anchor from which the Great Web radiated in every direction, connecting billions of minds, billions of lives, billions of interwoven destinies into a single, breathtaking tapestry of living civilization."),
		ShardLore.narration("It snapped like a spider-silk in a hurricane."),
		ShardLore.dialogue("Loom-Mother Vethiss", "...Interesting.", "calm"),
		ShardLore.narration("That was her first word in this new world. Not a scream. Not a prayer. Not even surprise. Loom-Mother Vethiss, Premier Weaver of the Thornweft Matriarchy, observed the death of everything she had ever known with the clinical fascination of a scientist watching a particularly instructive experiment."),
		ShardLore.narration("Around her, emergency cocoons split open one by one. Her weavers tumbled out — disoriented, frightened, their many-legged companions chittering in confusion. The landscape was wrong. Volcanic glass fused with crystal. Metal fragments embedded in organic stone. Five different biomes stitched together without rhyme or reason."),
		ShardLore.dialogue("Loom-Mother Vethiss", "Thread-Seer Kythara. Status of the Web.", "measured"),
		ShardLore.dialogue("Thread-Seer Kythara", "Gone, Loom-Mother. The Great Web is... severed. All primary threads, all secondary connections, all fate-lines — cut. We are isolated. Completely isolated.", "devastated"),
		ShardLore.narration("Vethiss was silent for a long moment. Her six eyes — arranged in a crescent across her brow — scanned the alien terrain with a weaver's precision, reading the invisible threads of causality that connected every object to every other object."),
		ShardLore.dialogue("Loom-Mother Vethiss", "Not cut. Kythara, look more carefully. The threads were not severed — they were collected. Someone gathered them. Someone took the raw material of our Web and wove it into... this.", "revelation"),
		ShardLore.narration("She gestured at the Shardlands — the impossible patchwork of stolen worlds."),
		ShardLore.dialogue("Loom-Mother Vethiss", "This landscape is a tapestry. A crude, violent, artless tapestry — but a tapestry nonetheless. Someone wove five worlds together into a single arena. And that someone is, by definition, a greater Weaver than I am.", "quiet_fury"),
		ShardLore.narration("She stood. All eight of her silk-generating appendages unfolded, and the first new thread — thin, experimental, exploratory — spun out into the alien air."),
		ShardLore.dialogue("Loom-Mother Vethiss", "Begin the emergency protocol. Establish anchor points. Spin shelters. Map the local fate-lines. And prepare the weavers for contact — I can feel other minds out there. Other civilizations, torn from their own worlds. Other threads in this new pattern.", "commanding"),
		ShardLore.dialogue("Thread-Seer Kythara", "And what are we to the pattern, Loom-Mother?", "uncertain"),
		ShardLore.dialogue("Loom-Mother Vethiss", "That is what we are here to discover. But I will tell you this, Kythara: I have been weaving for three hundred years. I have woven cities, woven futures, woven reality itself into shapes that pleased me. And I have never — never — encountered a pattern I could not understand, unravel, or improve.", "determined"),
		ShardLore.fhah_zolg("The spider-queen. Oh, she is the clever one. The others rage, compute, or hunt. Vethiss? She weaves. She studies. She understands. Of all my pieces, she is the one most likely to see the full pattern. And that makes her the most dangerous."),
	]

# ══════════════════════════════════════════════════════════════
# MISSIONS — 6 escalating battles
# ══════════════════════════════════════════════════════════════

static func _missions() -> Array:
	return [
		_mission_1_first_threads(),
		_mission_2_the_burning_tangle(),
		_mission_3_rival_weavers(),
		_mission_4_the_blood_tithe(),
		_mission_5_the_spirit_loom(),
		_mission_6_the_pattern_unbroken(),
	]

# ────────────────────────────────────────────────────────
# MISSION 1: First Threads
# Tutorial: Basic combat, web terrain, venom mechanics
# ────────────────────────────────────────────────────────

static func _mission_1_first_threads() -> Dictionary:
	return {
		"title": "First Threads",
		"objectives_text": "Destroy all hostile entities. Establish your first web-anchor point in this alien terrain.",
		"pre_story": [
			ShardLore.narration("The first anchor point took three days to establish. Vethiss wove it personally — a column of living silk that hummed with fate-thread resonance, connecting the survivors in a fragile local web. It was nothing compared to the Great Web of Silthara, but it was something. Enough to share information. Enough to coordinate."),
			ShardLore.narration("Then the creatures came."),
			ShardLore.dialogue("Thread-Seer Kythara", "Loom-Mother — hostile signatures approaching from the north. Corrupted organics. No recognizable fate-lines. They move as if drawn by the anchor's resonance.", "alert"),
			ShardLore.dialogue("Loom-Mother Vethiss", "Of course they do. The anchor vibrates at a frequency that anything with aetheric sensitivity can detect. We have announced our presence to whatever lives here.", "unsurprised"),
			ShardLore.narration("Through the fractured terrain, shadows moved — pale, hungry figures with too-sharp teeth and eyes that glowed with stolen vitality."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Corrupted predators. Blood-fueled. Hmm — their fate-threads are tangled, knotted beyond natural patterns. Something has twisted them. Interesting. Silk-Wardens, standard defensive web. Thread-Wardens to the perimeter. Let us see what this world has to teach us.", "clinical"),
		],
		"post_story": [
			ShardLore.narration("The creatures fell to venom and silk with gratifying efficiency. Vethiss studied the fallen — corrupted bodies wrapped in dissolving web, twitching with residual blood magic."),
			ShardLore.dialogue("Loom-Mother Vethiss", "As I suspected. These are not natural predators — they are symptoms. Their corruption originates from a foreign aetheric signature. Someone made them. Or something.", "fascinated"),
			ShardLore.narration("Among the wreckage, her weavers found something else: shard fragments. Small crystals that resonated with the same frequency as the anchor point — and, more crucially, with the same frequency as the Great Web's core threads."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Kythara. Come here. Touch this shard and tell me what you feel.", "intent"),
			ShardLore.dialogue("Thread-Seer Kythara", "It feels like... Silthara. Like the Great Web. Like home. Loom-Mother — these shards are made of the same substance as our Web. How is that possible?", "astonished"),
			ShardLore.dialogue("Loom-Mother Vethiss", "Because the Web and the shards were part of the same original pattern. Whatever entity wove this world used the same thread that we use — the same fundamental material of reality. We are not in a foreign land, Kythara. We are inside a larger Web. And we have not yet seen the spider.", "ominous"),
		],
		"defeat_story": [
			ShardLore.narration("The creatures overwhelmed the anchor position. Without a fully established web, the Thornweft fought as individuals — and individuals were not what the Matriarchy excelled at."),
			ShardLore.dialogue("Loom-Mother Vethiss", "The anchor was premature. We must weave more carefully — establish redundant connections before drawing attention. Fall back to the cocoon site. We begin again.", "patient"),
		],
		"player_army": [
			"Loom-Mother Vethiss",
			"Thread-Warden Infantry",
			"Silk-Warden Regulars",
			"Shuttle-Consort Militia",
		],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": [
			"Thrall Conscripts",
			"Thrall Conscripts",
			"Blood Thralls",
		],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": [
			"Thornweft units can deploy Web terrain that slows enemies and boosts allies.",
			"Venom Strike poisons enemies over time — let attrition do the work.",
			"Keep your Silk-Warden Regulars together. Thornweft strength is in the web, not isolation.",
			"Shuttle-Consort Militia are expendable screens — sacrifice them to protect your weavers.",
		],
		"battle_modifiers": {
			"label": "Severed Web",
			"description": "Without the Great Web, coordination falters. All Thornweft units -1 MOV.",
			"player_mov_bonus": -1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 2: The Burning Tangle
# Tutorial: Defensive play, terrain control, fighting aggressive enemies
# ────────────────────────────────────────────────────────

static func _mission_2_the_burning_tangle() -> Dictionary:
	return {
		"title": "The Burning Tangle",
		"objectives_text": "Defend your web-anchor network against the Emberclaw assault. Hold at least 2 of 3 anchor positions.",
		"pre_story": [
			ShardLore.narration("The fire came without warning."),
			ShardLore.narration("Vethiss felt it in the web — a disturbance so violent that it burned the peripheral threads, sending cascading damage through the network like flame through dry silk. And behind the disturbance: an army of rage and heat."),
			ShardLore.dialogue("Thread-Seer Kythara", "Loom-Mother — fire-blooded warriors approaching on three vectors. They are burning everything. The western anchor is already compromised — the silk is charring.", "panicked"),
			ShardLore.dialogue("Loom-Mother Vethiss", "I can feel them, Kythara. Their fate-threads burn so brightly they are almost blinding. Fascinating — this species runs hot. Literally. Their aetheric output is thermal, driven by passion and fury. No subtlety whatsoever.", "intrigued"),
			ShardLore.narration("The Emberclaw warband crashed through the crystalline forest like a wildfire — their commander, a drake-bonded warrior wreathed in impossible heat, leading from the front with reckless bravery."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Their commander leads with her heart. A fire-queen in an alien land, terrified but converting that fear into violence. How beautifully simple. How devastatingly effective.", "analytical"),
			ShardLore.narration("She paused, reading the fate-threads of the approaching army."),
			ShardLore.dialogue("Loom-Mother Vethiss", "She will burn herself out. Fire always does. Our role is to survive the initial blaze and then weave the ashes into something useful. All units — defensive web. Cocoon protocol. Let them charge. Let them burn. And when the fire dies, we will still be here.", "serene"),
		],
		"post_story": [
			ShardLore.narration("The Emberclaw assault was spectacular — a tsunami of flame and fury that tested every web-anchor to its limit. Three charges, each more violent than the last, wave after wave of warriors who fought as if death were a minor inconvenience."),
			ShardLore.narration("But Vethiss was right. Fire burns fast. The third charge faltered. The heat dissipated. And the Emberclaw retreated, leaving behind scorched earth and valuable intelligence."),
			ShardLore.dialogue("Loom-Mother Vethiss", "The fire-queen — Vex, the captives called her — fights like a cornered animal. All instinct, no patience. She is dangerous, but predictable. Fire always moves upward. Fire always seeks fuel. Point it at something flammable and it will inevitably charge.", "satisfied"),
			ShardLore.dialogue("Thread-Seer Kythara", "The western anchor is destroyed, Loom-Mother. The silk won't hold — the heat fractured the crystalline substrate.", "reporting"),
			ShardLore.dialogue("Loom-Mother Vethiss", "Then we weave a new one. That is what weavers do, Kythara. We do not mourn destroyed patterns — we improve them. The next anchor will be heat-resistant. The fire-queen taught us that. Every enemy is a teacher, if you are patient enough to learn the lesson.", "philosophical"),
			ShardLore.narration("She held up a shard recovered from the battlefield. In its facets, fire still danced — Emberclaw heat captured in crystalline structure."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Five factions. Five elements. Fire, blood, iron, silk, spirit. Five threads in a pattern that I have not yet fully read. But I am beginning to see the edges. And the edges... concern me.", "troubled"),
		],
		"defeat_story": [
			ShardLore.narration("The fire consumed everything. Every web-anchor, every silk barricade, every carefully woven defensive pattern — burned to ash in the Emberclaw's relentless assault."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Fire defeats silk. A basic material truth that I should have accounted for. Adjust the weave — incorporate fireproof mineral threads. We learn. We adapt. We reweave.", "philosophical"),
		],
		"player_army": [
			"Loom-Mother Vethiss",
			"Thread-Warden Infantry",
			"Silk-Warden Regulars",
			"Silk-Warden Regulars",
			"Gossamer Guard",
			"Shuttle-Consort Militia",
		],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": [
			"Ashborn Infantry",
			"Ashborn Infantry",
			"Emberclaw Warriors",
			"Pyromancer Adepts",
			"Emberknight Riders",
		],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": [
			"Last Stand: defend your 3 anchor positions! The Emberclaw will try to overrun them.",
			"Gossamer Guard have Silk Armor — use them as your anchor defenders.",
			"Web terrain slows the Emberclaw charge. Lay it in their approach lanes.",
			"Shuttle-Consort Militia can screen your valuable weavers. They are expendable — use them.",
		],
		"battle_modifiers": {
			"label": "Fire Season",
			"description": "The Emberclaw's Heat scorches the web. Enemy units gain +1 ATK from thermal fury.",
			"enemy_atk_bonus": 1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 3: Rival Weavers
# Tutorial: Objective control, competing for territory
# Cross-campaign: This battle mirrors Calculon's Mission 3 ("Grid Expansion")
# ────────────────────────────────────────────────────────

static func _mission_3_rival_weavers() -> Dictionary:
	return {
		"title": "Rival Weavers",
		"objectives_text": "Capture and hold shard relay nodes. These nodes can extend your Web — or the enemy's Grid. Control more than the opponent.",
		"pre_story": [
			ShardLore.narration("The shard nodes pulsed with invitation. Three concentrations of crystallized fate — each one a potential web-anchor of extraordinary power, capable of extending the local Web from meters to kilometers. Vethiss felt them singing to her through the silk, resonating with the deep harmonic of Silthara itself."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Three nodes. Three potential anchors. If we attune them, the Web extends to cover this entire plateau. We would have a territory. A real territory, not just a camp.", "eager"),
			ShardLore.dialogue("Thread-Seer Kythara", "Loom-Mother — the machine faction is converging from the north. They have... scouts. Clicking things that move on treads and broadcast electromagnetic signals.", "warning"),
			ShardLore.narration("Vethiss studied the approaching Iron Dominion force through the fate-threads. Their commander — a half-machine intelligence of unsettling precision — was deploying units with mathematical exactness, occupying optimal positions with an efficiency that bordered on the artistic."),
			ShardLore.dialogue("Loom-Mother Vethiss", "The clockwork lord. Calculon. I have been reading his fate-thread since he arrived in the Shardlands — it is the most rigidly structured thread I have ever encountered. No knots, no tangles, no imperfections. Pure mathematical logic woven into a living creature. Beautiful. And competing with us for the same nodes.", "admiring"),
			ShardLore.narration("She turned to her war council."),
			ShardLore.dialogue("Loom-Mother Vethiss", "His Grid and our Web want the same thing — to connect. To extend. To bring order to chaos through networked intelligence. We are more alike than either of us would care to admit. But these nodes are ours. The Web was weaving worlds together when his clockwork was still learning to count. Deploy the forward weavers. Spin silk-lines to all three nodes. We will outweave the machine.", "competitive"),
		],
		"post_story": [
			ShardLore.narration("The nodes attuned — two of three, enough for a significant territorial Web. Vethiss felt the expansion like a deep breath after suffocation. Information flowed. Connections formed. The Shardlands, for the first time, began to feel knowable."),
			ShardLore.dialogue("Loom-Mother Vethiss", "The Grid retreated. Calculon withdrew in good order — mathematically optimal retreat patterns, minimal casualties. He is an excellent general. Cold. Precise. And far too similar to me for comfort.", "reflective"),
			ShardLore.narration("Through the newly expanded Web, Vethiss felt something she had not expected: resonance. The shard nodes were not just power sources — they were memory. Each one contained fragments of information, echoes of a pattern so vast that even her weaver's mind could only perceive fragments."),
			ShardLore.dialogue("Thread-Seer Kythara", "Loom-Mother — the nodes are broadcasting. Not to us. Through us. Something is using our Web as a conduit for a signal we cannot decode.", "alarmed"),
			ShardLore.dialogue("Loom-Mother Vethiss", "Not cannot, Kythara. Not yet. The signal is woven in a dialect we have not learned. But the structure... the structure is familiar. It is thread-logic. Someone — something — wove this signal using the same principles as the Great Web of Silthara.", "stunned"),
			ShardLore.narration("She closed her six eyes and listened to the signal — really listened, with every weaver's sense she possessed."),
			ShardLore.dialogue("Loom-Mother Vethiss", "The Shardlands are not a broken world. They are a loom. A vast, incomprehensible loom, and the factions — all five of us — are the threads. Someone is weaving us into a pattern. And the pattern is not yet complete.", "dawning_horror"),
			ShardLore.fhah_zolg("She hears the loom. She feels the shuttle. Of all my threads, Vethiss is the one most attuned to the weave. She understands what is being made, even if she cannot yet see who is making it. How poetic. The spider, caught in a larger Spider's web."),
		],
		"defeat_story": [
			ShardLore.narration("The Iron Dominion's Grid outpaced the Web. Calculon's mathematical deployment secured the nodes before the Thornweft could establish silk-lines — pure efficiency defeating organic adaptability."),
			ShardLore.dialogue("Loom-Mother Vethiss", "His Grid deploys faster than our Web weaves. An unexpected deficit. We must develop rapid-deployment anchors — pre-woven nodes that can be activated instantly. The pattern adapts.", "contemplative"),
		],
		"player_army": [
			"Loom-Mother Vethiss",
			"Silk-Warden Regulars",
			"Silk-Warden Regulars",
			"Gossamer Guard",
			"Silk-Shot Skirmishers",
			"Fate-Thread Weavers",
			"Spiderling Swarm",
			"Silk-Shadow Scouts",
		],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": [
			"Lord Calculon",
			"Infantry Regiment",
			"Infantry Regiment",
			"Steam Sentinels",
			"Steam Sentinels",
			"Steam-Powered Sharpshooters",
			"Gearwright Engineers",
		],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": [
			"Shard Clash: capture and hold the shard nodes. Each controlled node earns VP each round.",
			"Spiderling Swarms are fast — send them ahead to contest nodes while infantry advances.",
			"Silk-Shadow Scouts can deploy forward. Use them to grab an early node.",
			"Fate-Thread Weavers can manipulate outcomes. Keep them near objectives for maximum impact.",
		],
		"battle_modifiers": {
			"label": "Web Resonance",
			"description": "The shard nodes resonate with silk. Your units gain +1 DEF near captured objectives.",
			"player_def_bonus": 1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 4: The Blood Tithe
# Tutorial: Offensive operations, fighting terror-based enemies
# Cross-campaign: Sanguinar's forces attack — connects to his Mission 5
# ────────────────────────────────────────────────────────

static func _mission_4_the_blood_tithe() -> Dictionary:
	return {
		"title": "The Blood Tithe",
		"objectives_text": "Defend your supply web against the Nightfang assault. Protect the cocoon-processing nodes — if they fall, your people starve.",
		"pre_story": [
			ShardLore.narration("They came in the dark. Of course they came in the dark."),
			ShardLore.narration("Vethiss felt them before she saw them — cold threads tangling with the Web's edge, corrupted fate-lines that spread like ink through clean water. The predators had found her supply network."),
			ShardLore.dialogue("Thread-Seer Kythara", "Nightfang signatures, Loom-Mother. Many. Their commander — the old one, the ancient one — is with them personally. Lord Sanguinar.", "tense"),
			ShardLore.dialogue("Loom-Mother Vethiss", "Sanguinar. The blood patriarch. I have been studying his fate-thread for weeks. Ten thousand years old, Kythara. Ten thousand years of predation compressed into a single consciousness. His thread is not merely ancient — it is... heavy. Dense with consumed destinies.", "measured"),
			ShardLore.narration("The Nightfang moved like liquid shadow, surrounding the supply web with practiced predatory grace. At their center, Lord Sanguinar radiated an aetheric signature so cold and ancient that the Web recoiled from it."),
			ShardLore.dialogue("Lord Sanguinar", "Loom-Mother Vethiss. I have been weaving your fate-thread since you arrived. Do you know what it looks like?", "taunting"),
			ShardLore.dialogue("Loom-Mother Vethiss", "You are quoting me, Blood Lord. I said those exact words to the clockwork lord three weeks ago. How flattering that you study my patterns.", "amused"),
			ShardLore.dialogue("Lord Sanguinar", "Study? No. I taste patterns, Loom-Mother. And yours tastes... complicated. Ancient. Patient. Like wine that has been fermenting since before my court was founded. I find myself curious what you look like when you bleed.", "predatory"),
			ShardLore.dialogue("Loom-Mother Vethiss", "Everything bleeds, Sanguinar. Even you. The question is whether you can reach the veins through the silk. Weavers — cocoon protocol. Full defensive web. The vampire wants a meal? Let us see if he can stomach the venom.", "iron_calm"),
		],
		"post_story": [
			ShardLore.narration("The Nightfang withdrew — not routed, but satiated. Sanguinar had fought with the cold efficiency of an apex predator, probing every weak point in the web, testing every anchor, taking precisely what he needed and no more."),
			ShardLore.narration("Vethiss surveyed the damage. Three cocoon-processing nodes damaged. Sixteen shuttles lost. But the web held. The pattern survived."),
			ShardLore.dialogue("Loom-Mother Vethiss", "He was not trying to destroy us. He was feeding. The entire assault was a harvesting operation — precise, surgical, almost respectful. Lord Sanguinar is many terrible things, but wasteful is not among them.", "grudging_respect"),
			ShardLore.dialogue("Thread-Seer Kythara", "Loom-Mother, something troubles me. His corruption — the blood magic — it interacted with our silk in ways I have never seen. The threads didn't reject it. They... incorporated it. As if the Web recognized the corruption as a valid thread-type.", "disturbed"),
			ShardLore.narration("Vethiss went very still."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Show me.", "sharp"),
			ShardLore.narration("The contaminated silk pulsed with a hybrid energy — silk and blood intertwined, creating something that was neither corruption nor web but a fusion of both. A thread that carried both information AND hunger."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Five factions. Five thread-types. Fire, iron, blood, silk, spirit. Each one a different expression of the same underlying force. And they are compatible. They can be woven together.", "revelation"),
			ShardLore.narration("She stared at the hybrid thread."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Whatever wove the Shardlands didn't bring five random civilizations. It selected five complementary threads. Five components of a single, unified pattern. We were chosen because we fit together. The question is: what is the pattern making?", "deeply_troubled"),
		],
		"defeat_story": [
			ShardLore.narration("The predator was too fast, too ancient, too efficient. Sanguinar's court stripped the supply web like surgeons dissecting a patient — each incision precise, each bite calculated."),
			ShardLore.dialogue("Loom-Mother Vethiss", "He has been hunting for ten thousand years. I have been weaving for three hundred. The mathematics are not in my favor — yet. Withdraw to secondary positions. Reweave the supply web with deeper anchors. We will not be so easily harvested a second time.", "resolute"),
		],
		"player_army": [
			"Loom-Mother Vethiss",
			"Silk-Warden Regulars",
			"Gossamer Guard",
			"Venom Dancers",
			"Fang Guard Elite",
			"Silk-Rider Lancers",
			"Fate-Thread Weavers",
			"Venom Alchemists",
			"Silk Catapult",
		],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": [
			"Lord Sanguinar",
			"Blood Reavers",
			"Blood Reavers",
			"Nightfang Warriors",
			"Tiger Berserkers",
			"Shadow Stalkers",
			"Blood Shamans",
			"Tiger Alpha",
		],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 7,
		"tutorial_tips": [
			"Supply Lines: defend both corridor endpoints to maintain your cocoon-processing chain.",
			"Venom Dancers counter melee attackers with Venom Strike and Dodge — place them at chokepoints.",
			"Fang Guard Elite are your strongest infantry. Anchor your defense around them.",
			"The Silk Catapult's Web-Bomb creates terrain that slows the Nightfang advance. Use it in approach lanes.",
		],
		"battle_modifiers": {
			"label": "Hunger in the Dark",
			"description": "The Nightfang hunt at twilight. Enemy units gain +1 MOV from predatory instinct.",
			"enemy_mov_bonus": 1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 5: The Spirit Loom
# Tutorial: Complex terrain, fighting spiritual enemies, adapting doctrine
# First cross-faction connection with Veilbound from Thornweft's perspective
# ────────────────────────────────────────────────────────

static func _mission_5_the_spirit_loom() -> Dictionary:
	return {
		"title": "The Spirit Loom",
		"objectives_text": "Secure the shard convergence at the center of the Spirit Ruins. Control the hill — it holds the key to the pattern.",
		"pre_story": [
			ShardLore.narration("The ruins were beautiful."),
			ShardLore.narration("Vethiss had expected another desolate landscape — more volcanic glass, more fractured crystal. Instead, the Web led her to something extraordinary: the remains of a temple complex, built by no faction she recognized, covered in writings that pulsed with spiritual energy. And at its center, a convergence of shard lines that formed a pattern she could almost read."),
			ShardLore.dialogue("Loom-Mother Vethiss", "This was a loom. An ancient, colossal loom — built to weave something far larger than silk. Something metaphysical. Something that connects the seen and the unseen.", "awed"),
			ShardLore.dialogue("Thread-Seer Kythara", "Loom-Mother — the fifth faction. They are here. The spirit-warriors.", "warning"),
			ShardLore.narration("The Veilbound Shogunate emerged from the ruins like ghosts given flesh — disciplined, reverent, carrying weapons that hummed with ancestral resonance. They moved through the temple as if it belonged to them — honoring each shrine, blessing each passage."),
			ShardLore.dialogue("Loom-Mother Vethiss", "The spirit-folk. Their threads are... extraordinary. Half physical, half ethereal — woven through two realities simultaneously. Their ancestors walk with them. Literally. I can see the ghost-threads twining with the living ones.", "fascinated"),
			ShardLore.narration("A figure emerged at the center of the Veilbound formation — armored, purposeful, radiating an authority that came not from rank but from the weight of a thousand generations standing behind him."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Masked Lord Kurohane. Their warrior-poet. He treats combat as a ritual. Every strike is a prayer. Every formation is a mandala. How... familiar. We weave patterns into war. They weave spirit. Two perspectives on the same truth.", "contemplative"),
			ShardLore.narration("But contemplation was a luxury. Both factions had converged on the same convergence point. Negotiation required time, and the shard-lines were destabilizing."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Regrettable. I would have preferred to study them longer. But the convergence is destabilizing, and I will not let it fall to a faction that treats the pattern as sacred rather than knowable. Deploy for assault. But Kythara — tell the weavers: no killing their commander if it can be avoided. I want to speak with him after.", "strategic"),
		],
		"post_story": [
			ShardLore.narration("The convergence fell — not through overwhelming force, but through patience and positioning. The Veilbound fought with spectacular discipline, but the Thornweft's web denied them mobility, denied them flanking routes, denied them the flowing combat their doctrine required."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Their commander survived. Good. He withdrew with dignity — the Veilbound do not rout, they simply decide that the battle's purpose has been fulfilled and leave. Remarkable culture. Deeply inconvenient to fight.", "appreciative"),
			ShardLore.narration("At the convergence's heart, Vethiss found what she had been seeking: a loom interface. Not Thornweft technology — something older, grander, more fundamental. A device — or an organism — designed to weave the fabric of reality itself."),
			ShardLore.dialogue("Thread-Seer Kythara", "Loom-Mother, I can read it. Some of it. These symbols — they are instructions. Weaving instructions, written in a language that predates Silthara. It describes a pattern. A vast pattern, using five different thread-types to create—", "excited"),
			ShardLore.dialogue("Loom-Mother Vethiss", "To create what, Kythara?", "intent"),
			ShardLore.dialogue("Thread-Seer Kythara", "I... I am not sure. The instructions are incomplete. But the five thread-types — they correspond to the five factions. Fire, iron, blood, silk, spirit. When woven together in the correct pattern, they create something the text calls... 'the God-Thread.' A strand of reality so dense, so complex, that it could anchor an entirely new world.", "astonished"),
			ShardLore.dialogue("Loom-Mother Vethiss", "Or reconstruct an old one.", "whisper"),
			ShardLore.narration("She stood in the ancient loom, surrounded by the weaving instructions of a dead god, and understood — finally, completely — what the Shardlands were for."),
			ShardLore.dialogue("Loom-Mother Vethiss", "We are not prisoners. We are raw material. Five types of thread, collected by a Weaver who wants to create something. The question is whether we consent to be woven.", "quiet_fury"),
			ShardLore.fhah_zolg("She sees it. The full pattern. The complete design. Of all my threads, she is the first to truly understand what is being woven. And now comes the moment I have been waiting for: will she resist the pattern? Or will she try to reweave it? Because a Weaver who sees the loom... is the most dangerous thread of all."),
		],
		"defeat_story": [
			ShardLore.narration("The Veilbound's spiritual power proved overwhelming. Their ancestral spirits disrupted the Web at a fundamental level — ghost-hands severing silk-lines, spectral blades cutting through web-anchors as if they were smoke."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Their spirits exist in the same layer as our Web. We are fighting on two planes simultaneously, and they have the advantage in the unseen one. I need to develop counter-weaving for spiritual interference. The pattern must adapt.", "determined"),
		],
		"player_army": [
			"Loom-Mother Vethiss",
			"Silk-Warden Regulars",
			"Gossamer Guard",
			"Venom Dancers",
			"Fang Guard Elite",
			"Silk-Blade Duelists",
			"Silk-Rider Lancers",
			"Fate-Thread Weavers",
			"Venom Alchemists",
			"Silk Catapult",
		],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": [
			"Masked Lord Kurohane",
			"Shrine Wardens",
			"Starblade Samurai",
			"Temple Defenders",
			"Moonlit Duelists",
			"Dreampiercer Archers",
			"Spirit Healer Monks",
			"Star Serpent Lancers",
		],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": [
			"King of the Hill: control the central convergence point for 2 VP per round.",
			"Silk-Blade Duelists can hold the center with Venom Riposte — attackers take poison damage.",
			"Fate-Thread Weavers can manipulate outcomes near the convergence. Keep them close to the hill.",
			"The Veilbound are disciplined but slow to reposition. Use your Web to restrict their movement paths.",
		],
		"battle_modifiers": {
			"label": "Ancient Loom",
			"description": "The spirit loom amplifies weaving. Your units gain +1 ATK near the convergence.",
			"player_atk_bonus": 1,
			"enemy_def_bonus": 1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 6: The Pattern Unbroken
# Final battle — hardest fight, the Weaver confronts the Loom
# ────────────────────────────────────────────────────────

static func _mission_6_the_pattern_unbroken() -> Dictionary:
	return {
		"title": "The Pattern Unbroken",
		"objectives_text": "Seize the Grand Convergence — the heart of the Shardlands' pattern. Control the shard nexus and hold it against the Emberclaw/Nightfang combined force.",
		"pre_story": [
			ShardLore.narration("Loom-Mother Vethiss stood before the Grand Convergence and wept."),
			ShardLore.narration("Not from grief. Not from fear. From recognition. The convergence was the most beautiful thing she had ever seen — a nexus of shard energy so vast and so perfectly structured that it made the Great Web of Silthara look like a child's first weaving. Every shard-line in the Shardlands converged here. Every fate-thread. Every possible future."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Kythara. I can see it. The full pattern. Every thread, every knot, every intersection. Five factions woven together — not randomly, not cruelly, but with a purpose so elegant it breaks my heart to behold it.", "awed"),
			ShardLore.dialogue("Thread-Seer Kythara", "What is the purpose, Loom-Mother?", "breathless"),
			ShardLore.dialogue("Loom-Mother Vethiss", "Creation. Pure creation. The Architect — Fhah-Zolg — is not destroying worlds. He is building one. A new world, woven from the threads of five civilizations. Fire for energy. Iron for structure. Blood for vitality. Silk for connection. Spirit for meaning. A world that has all five, woven into a single, self-sustaining pattern.", "wonder"),
			ShardLore.narration("She paused. The wonder drained from her face, replaced by something harder."),
			ShardLore.dialogue("Loom-Mother Vethiss", "But he is weaving it without our consent. He is using us as raw material — living, thinking, suffering raw material. And that... that I cannot allow. A Weaver who uses living threads without consent is not an artist. She is a butcher.", "cold"),
			ShardLore.narration("From across the convergence, armies converged. The Emberclaw, incandescent with fury. Nightfang outriders, hungry and precise. Both had sensed the convergence's activation and moved to claim it."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Two armies. Both want the convergence. Both believe force will secure their futures. They are wrong. The convergence does not respond to force — it responds to pattern. To weaving. To the art of connecting things that were not meant to be connected.", "measured"),
			ShardLore.narration("She unfolded all eight silk-spinners. Threads of pure fate-energy cascaded from her body, connecting to the convergence's crystalline pillars, lighting up shard-lines that had been dark for millennia."),
			ShardLore.dialogue("Loom-Mother Vethiss", "I am Loom-Mother Vethiss. I am the greatest Weaver alive in five worlds. And today, I will prove it — not by destroying the pattern, but by reweaving it. On my terms. With my design. Thornweft Matriarchy — to the Loom!", "battle_cry"),
		],
		"post_story": [
			ShardLore.narration("The convergence blazed."),
			ShardLore.narration("Vethiss, connected to the grand loom by a hundred silk-threads, felt the entire pattern of the Shardlands flow through her consciousness. Every shard. Every faction. Every thread of every destiny in this broken world — she held them all, balanced on spinners that shook with the effort of containing so much reality."),
			ShardLore.narration("And then she saw him."),
			ShardLore.narration("Not a face. Not a form. A pattern. The largest, most complex, most terrifyingly beautiful pattern she had ever perceived — stretching from the convergence and outward across dimensions, across realities, across the vast emptiness between worlds. Fhah-Zolg was not a being. He was a Web. And the Shardlands were a single knot in a tapestry that spanned everything."),
			ShardLore.dialogue("Loom-Mother Vethiss", "...Oh.", "stunned"),
			ShardLore.fhah_zolg("You see it now. The full design. Tell me, little Weaver — do you like what you see?"),
			ShardLore.dialogue("Loom-Mother Vethiss", "You are not a god. You are a Loom. A self-aware, self-sustaining Loom that weaves worlds together. You are not the spider in the web — you ARE the web.", "revelation"),
			ShardLore.fhah_zolg("Close enough. I was, once, a Weaver — like you. The greatest Weaver in the history of all realities. And I wove so much, for so long, that I became the pattern itself. Now I am the Loom. I am the Thread. I am the design and the designer."),
			ShardLore.dialogue("Loom-Mother Vethiss", "And you brought us here to be woven into your pattern. To be consumed. To stop being ourselves and become part of you.", "cold"),
			ShardLore.fhah_zolg("Not consumed. Incorporated. You would not cease to exist, Vethiss. You would become part of something infinitely greater. Five civilizations, five thread-types, woven into a single tapestry of such beauty that reality itself weeps to behold it. Is that not what every Weaver dreams of? The perfect pattern?"),
			ShardLore.narration("Silence. The convergence hummed. The pattern waited."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Yes.", "quiet"),
			ShardLore.narration("Fhah-Zolg's web rippled with satisfaction."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Yes, it is what every Weaver dreams of. The perfect pattern. The ultimate design. I have dreamed of it for three hundred years. But I have also learned something in those three hundred years — something that separates the Thornweft from your cold, beautiful, monstrous perfection.", "building"),
			ShardLore.narration("She stood in the heart of the loom, connected to every fate-thread in the Shardlands, and spoke with the conviction of a Weaver who had finally found a pattern worth rejecting."),
			ShardLore.dialogue("Loom-Mother Vethiss", "A pattern is only beautiful if the threads choose to be woven. A tapestry made from captive threads is not art — it is a prison with a pretty frame. And I will not — I will NEVER — participate in a weaving that does not respect the autonomy of its threads.", "fierce"),
			ShardLore.fhah_zolg("...You would refuse perfection?"),
			ShardLore.dialogue("Loom-Mother Vethiss", "I would refuse YOUR perfection. And offer my own. One where the threads choose their own pattern. Where fire and iron and blood and silk and spirit weave together because they want to, not because something older and crueler forces them.", "resolute"),
			ShardLore.narration("The vision shattered. The convergence dimmed. Vethiss stood alone in the grand loom, shaking, her silk-spinners still trailing threads that connected her to every shard in the Shardlands."),
			ShardLore.dialogue("Thread-Seer Kythara", "Loom-Mother? What happened? What did you see?", "worried"),
			ShardLore.dialogue("Loom-Mother Vethiss", "Everything, Kythara. I saw everything. And now I know what we must do. Not fight. Not conquer. Weave. But not his pattern — ours. A pattern made by five factions choosing to connect, choosing to cooperate, choosing to be woven together on their own terms.", "visionary"),
		],
		"defeat_story": [
			ShardLore.narration("The combined assault overwhelmed even the Thornweft's legendary patience. Fire and blood, working in terrible concert, tore through web-anchors and silk barricades alike."),
			ShardLore.dialogue("Loom-Mother Vethiss", "Two predator factions attacking simultaneously. The pattern could not hold — too many threads cutting at once. We retreat, but we do not abandon the convergence. I have seen its heart. I know what it contains. And I will return.", "unbroken"),
		],
		"player_army": [
			"Loom-Mother Vethiss",
			"Silk-Warden Regulars",
			"Gossamer Guard",
			"Fang Guard Elite",
			"Fate-Blessed Veterans",
			"Silk-Blade Duelists",
			"Silk-Rider Lancers",
			"Matriarch Riders",
			"Fate-Thread Weavers",
			"Venom Alchemists",
			"Silk Catapult",
			"Silk Colossus",
		],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": [
			"Scorchcaller Vex",
			"Ashborn Infantry",
			"Ashborn Infantry",
			"Emberclaw Warriors",
			"Flameborn Guard",
			"Emberforged Blades",
			"Pyromancer Adepts",
			"Emberknight Riders",
			"Hatchery Guard",
			"Pyroclast Catapult",
		],
		"battle_size": "epic",
		"scenario": "shard_clash",
		"round_limit": 8,
		"tutorial_tips": [
			"This is the final battle. Use every tool the Web provides.",
			"The Silk Colossus is your centerpiece. Position it on the most contested shard objective.",
			"Matriarch Riders can create mobile web-anchors. Use them to extend your control zone.",
			"Focus on shard objectives — VP wins this battle, not kills. Outweave them.",
		],
		"battle_modifiers": {
			"label": "Grand Convergence",
			"description": "The Loom amplifies all. Every unit gains +1 HP. The pattern determines the future.",
			"player_hp_bonus": 1,
			"enemy_hp_bonus": 1,
		},
	}

# ══════════════════════════════════════════════════════════════
# ENDING STORY — Shown after completing all missions
# ══════════════════════════════════════════════════════════════

static func _ending_story() -> Array:
	return [
		ShardLore.narration("===  CAMPAIGN COMPLETE: THE PATTERN UNBROKEN  ==="),
		ShardLore.narration("Loom-Mother Vethiss has survived the Shardlands. She has woven through fire, endured the predator's harvest, outpaced the machine's Grid, and touched the heart of the ancient loom. She has seen the Architect — not as a god, but as a fellow Weaver gone wrong — and she has refused his pattern."),
		ShardLore.narration("More importantly, she has found an alternative. Not war. Not conquest. Not escape. Cooperation. A new pattern, woven from five threads that choose to be woven."),
		ShardLore.dialogue("Loom-Mother Vethiss", "Kythara, prepare a message. Encode it in silk-thread harmonics — every faction has at least rudimentary aetheric sensitivity. They will hear it.", "purposeful"),
		ShardLore.dialogue("Thread-Seer Kythara", "What message, Loom-Mother?", "ready"),
		ShardLore.dialogue("Loom-Mother Vethiss", "The clockwork lord has been broadcasting on all frequencies — proposing a meeting. He has data. I have understanding. Together, we have truth. Tell the other factions this: I have seen the Loom. I know what Fhah-Zolg is weaving. And I know how to reweave it. Not his pattern. Ours.", "broadcast"),
		ShardLore.narration("She paused, considering her next words carefully."),
		ShardLore.dialogue("Loom-Mother Vethiss", "To Lord Calculon: your Grid and my Web are the same technology expressed through different substrates. Together, they form a network powerful enough to interface with the grand loom. I accept your proposal. To Scorchcaller Vex: your fire is the energy the pattern needs. Stop burning blindly and choose what to ignite. To Lord Sanguinar: your hunger is not a curse — it is a connection. The blood-thread binds. Use it to bind us together, not apart.", "broadcast"),
		ShardLore.narration("She looked south, where distant spirit-light flickered from the Veilbound's temple-camps."),
		ShardLore.dialogue("Loom-Mother Vethiss", "And to the Shrouded Shogun: your spirits walk between the seen and the unseen. That is where the Loom exists. You are the thread that connects the physical to the metaphysical. Without you, the new pattern has no meaning. Without you, we are weaving a tapestry with no soul.", "invitation"),
		ShardLore.narration("The message spun outward through the silk — a web of communication that reached every corner of the Shardlands. Fire-folk and machine-lords and blood-courts and spirit-warriors all paused, feeling something vibrate at the edge of their consciousness."),
		ShardLore.narration("A thread. An invitation. A pattern waiting to be woven."),
		ShardLore.dialogue("Loom-Mother Vethiss", "Fhah-Zolg watches. Let him. He thinks he is the only Weaver in the Shardlands. He is wrong. And when five Weavers work together — when five threads consent to be woven — the pattern they create is stronger than any cage.", "certain"),
		ShardLore.narration("Somewhere beyond the veil, Fhah-Zolg reviewed his design. For the third time in an eternity, the pattern was not unfolding as predicted."),
		ShardLore.fhah_zolg("...Four of them now. Four threads pulling in the same direction. The fire-queen, the clockwork lord, the blood patriarch, and now the spider-queen. They are becoming something I did not intend. Something that was not in the original design."),
		ShardLore.fhah_zolg("They are becoming a pattern of their own."),
		ShardLore.fhah_zolg("I should be concerned. Instead, I find myself... curious. What will five consenting threads weave that five captive threads could not? Is voluntary cooperation stronger than forced unity? That is a question even I do not know the answer to."),
		ShardLore.fhah_zolg("Perhaps this experiment is more interesting than I realized."),
	]
