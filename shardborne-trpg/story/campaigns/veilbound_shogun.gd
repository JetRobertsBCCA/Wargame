class_name VeilboundShogunCampaign
## The Shrouded Shogun — "Beyond the Veil"
## The fifth and final faction campaign. The capstone of the coalition arc.
## Teaches Ritual Flow management, Stance discipline, spiritual warfare,
## and honor-based tactical decision-making through 6 escalating battles.
##
## Story: The Shrouded Shogun awakens in the Shardlands with the Veil —
## the boundary between the living and the dead — shattered behind him.
## His ancestral spirits still whisper, but their words are broken,
## fragmented by the severed Veil. As he fights across the Shardlands,
## the ancestors slowly deliver a message, one word at a time:
## "Stage. Audience. Game. Player."
## The truth of Fhah-Zolg, revealed through the eyes of the spirit world.
##
## Unique insight: Where Vethiss sees Fhah-Zolg as a Loom, the Shogun
## sees him as the oldest Ancestor — a being who died and became something
## beyond death, playing games with the living because he has forgotten
## what it means to live.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_shogun",
		"commander": "The Shrouded Shogun",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "Beyond the Veil",
		"description": "The Veil is shattered. The Shrouded Shogun stands between worlds — the living who fight and the dead who whisper. Reishima is lost. The ancestors speak in fragments. Honor demands he listen.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

# ══════════════════════════════════════════════════════════════
# OPENING STORY
# ══════════════════════════════════════════════════════════════

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The Veil tore."),
		ShardLore.narration("Not frayed. Not thinned. Torn — ripped from the fabric of reality like a page from a holy text. One moment the Shrouded Shogun stood in the Hall of Ancestors, communing with a thousand generations of warrior-spirits. The next, the Hall dissolved. The spirits scattered. The world collapsed into the spaces between worlds."),
		ShardLore.narration("And he fell."),
		ShardLore.dialogue("The Shrouded Shogun", "Ancestors. Speak to me. Tell me where we are.", "commanding"),
		ShardLore.narration("Silence. For the first time in his life — in any Veilbound warrior's life — the ancestors were silent. The Veil, the sacred boundary that connected the living to the dead, through which honor flowed like water and wisdom passed like breath — the Veil was gone."),
		ShardLore.narration("Then, at the edge of perception, faint as a candle in a hurricane:"),
		ShardLore.dialogue("The Ancestors", "...still... here...", "whisper"),
		ShardLore.narration("He exhaled. Not gone. Broken. The connection was shattered but not severed — fragments of ancestral wisdom still filtered through, too weak to form sentences, too fragmented to convey meaning. But alive. The ancestors still watched."),
		ShardLore.dialogue("Masked Lord Kurohane", "My lord. The warriors are accounted for — seven divisions survived the transit intact. The shrine guardians protected the sacred relics. Our blades are whole. But... the spirits, my lord. My blade-ancestors are silent. The warrior-memories that guided my sword are gone.", "shaken"),
		ShardLore.dialogue("The Shrouded Shogun", "Not gone, Kurohane. Scattered. The Veil is broken, but the ancestors endure — they are speaking, though their words arrive as fragments. We must be patient. We must listen. And while we listen, we must survive.", "steadfast"),
		ShardLore.narration("He surveyed the landscape. Volcanic glass merged with crystalline forest. Metal ruins fused with organic stone. A patchwork of impossible geography — five different worlds stitched together by something that understood power but not harmony."),
		ShardLore.dialogue("The Shrouded Shogun", "This land has no spirit. No ancestors rest beneath this soil. No prayers have been spoken to these stones. It is a hollow place — a stage without a performance, a temple without a god.", "troubled"),
		ShardLore.narration("He gripped his ancestral blade — the Shrouded Edge, forged in the spirit-fires of Reishima, carrying the memories of every Shogun who had wielded it before him. It hummed faintly. The blade-spirits were still there, buried deep in the steel."),
		ShardLore.dialogue("The Shrouded Shogun", "Kurohane. Establish a defensive perimeter. Raise the spirit-wards. We are in enemy territory — not because an enemy claims this ground, but because this ground has no claim at all. A land without ancestors is a land without protection.", "commanding"),
		ShardLore.dialogue("Masked Lord Kurohane", "And our purpose, my lord? Without the Veil, without Reishima, what is our duty?", "questioning"),
		ShardLore.dialogue("The Shrouded Shogun", "Our duty is what it has always been: to protect those who cannot protect themselves, to honor the ancestors who watch even when they cannot speak, and to find the truth that this broken world is trying to hide from us. The Way does not change because the road does.", "resolute"),
		ShardLore.fhah_zolg("The spirit-lord. The most dangerous piece on my board, and he does not even know why. The others see the Shardlands through the lens of their nature — fire, logic, hunger, pattern. But he sees through the Veil. He sees the in-between. And in the cracks between worlds... that is where I live."),
	]

# ══════════════════════════════════════════════════════════════
# MISSIONS
# ══════════════════════════════════════════════════════════════

static func _missions() -> Array:
	return [
		_mission_1_spirits_in_exile(),
		_mission_2_the_ancestors_warning(),
		_mission_3_the_clockwork_accord(),
		_mission_4_threads_and_spirits(),
		_mission_5_the_blood_siege(),
		_mission_6_beyond_the_veil(),
	]

# ────────────────────────────────────────────────────────
# MISSION 1: Spirits in Exile
# Tutorial: Basic combat, Stance mechanics, Ritual Flow
# ────────────────────────────────────────────────────────

static func _mission_1_spirits_in_exile() -> Dictionary:
	return {
		"title": "Spirits in Exile",
		"objectives_text": "Destroy all hostile raiders. Protect the shrine-camp. The ancestors are listening, even if they cannot speak.",
		"pre_story": [
			ShardLore.narration("Three days. Three days of silence, of broken whispers, of warriors kneeling before empty shrines and praying to ancestors who could not answer. The Veilbound Shogunate — a civilization built on the communion between living and dead — had been cut off from the very thing that defined them."),
			ShardLore.narration("Then the fire came over the ridge."),
			ShardLore.dialogue("Masked Lord Kurohane", "My lord — hostile contacts approaching from the east. Warriors wreathed in flame, riding beasts that breathe fire. They are not attempting to communicate. They are charging.", "alert"),
			ShardLore.narration("The Shrouded Shogun watched the approaching warband through the spirit-sight — the ability to perceive the aetheric layer of reality that the Veilbound cultivated from birth. Where others saw warriors and flame, he saw something deeper: threads of fury and fear, burning hot with displaced aggression. These fire-warriors were not attacking out of malice. They were attacking out of terror."),
			ShardLore.dialogue("The Shrouded Shogun", "Frightened animals, Kurohane. Displaced from their own world, just as we were. They lash out because they do not understand. Unfortunately, understanding requires survival, and they seem determined to test ours.", "measured"),
			ShardLore.dialogue("Masked Lord Kurohane", "Shall I form the defensive line, my lord?", "ready"),
			ShardLore.dialogue("The Shrouded Shogun", "Form the Ninth Stance — Flowing Mountain. We receive the charge, absorb the fury, and respond with precision. No unnecessary killing— these may be future allies, if they learn to speak before they burn.", "commanding"),
		],
		"post_story": [
			ShardLore.narration("The fire-warriors broke against the Flowing Mountain like waves against a cliff. The Veilbound absorbed the charge with disciplined stance-work — shifting between defensive and offensive positions with the fluid precision that only a lifetime of ancestral training could produce."),
			ShardLore.narration("When it was over, the Shogun stood among the fallen and bowed — a gesture of respect to worthy opponents, even defeated ones."),
			ShardLore.dialogue("The Shrouded Shogun", "Brave. Undisciplined, but brave. Their commander — a young one, bonded to a fire-drake — led from the front with absolute commitment. She will learn patience, or she will burn herself out.", "respectful"),
			ShardLore.dialogue("Masked Lord Kurohane", "My lord — during the battle, I felt something. A presence. Not the ancestors, but... something watching. From outside the battlefield. From outside the world.", "unsettled"),
			ShardLore.narration("The Shrouded Shogun went very still. He reached for the spirit-sight, pushing past the static and interference of the broken Veil, searching for what Kurohane had sensed."),
			ShardLore.narration("And there — at the very edge of perception — a whisper:"),
			ShardLore.dialogue("The Ancestors", "...Stage...", "whisper"),
			ShardLore.dialogue("The Shrouded Shogun", "Stage. The ancestors said 'stage.' A performance ground. A place where something is meant to be witnessed.", "contemplative"),
			ShardLore.dialogue("Masked Lord Kurohane", "What does it mean?", "confused"),
			ShardLore.dialogue("The Shrouded Shogun", "I do not know yet. But the ancestors do not speak without purpose — even a single word from the dead carries the weight of eternity. We will listen. We will wait. And the meaning will reveal itself.", "patient"),
		],
		"defeat_story": [
			ShardLore.narration("The fire-warriors overwhelmed the defensive line. Without the full strength of ancestral communion, the stances faltered, the flow disrupted. The mountain moved when it should have been still."),
			ShardLore.dialogue("The Shrouded Shogun", "We relied on the ancestors' guidance, and the ancestors could not guide us. We must relearn what we were born knowing — how to stand, how to flow, how to fight with our own strength, not borrowed wisdom. Again.", "disciplined"),
		],
		"player_army": [
			"The Shrouded Shogun",
			"Shrine Wardens",
			"Veiled Ashigaru",
			"Temple Defenders",
		],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": [
			"Ashborn Infantry",
			"Ashborn Infantry",
			"Emberclaw Warriors",
		],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": [
			"Veilbound units use Stances — defensive and offensive modes that change their stats.",
			"The Shrouded Shogun is powerful but irreplaceable. Protect him with Shrine Wardens.",
			"Temple Defenders have Shield Wall — use them to anchor your line.",
			"Ritual Flow builds as you fight. Higher Flow enables stronger abilities.",
		],
		"battle_modifiers": {
			"label": "Severed Veil",
			"description": "Without the Veil, ancestral guidance fails. All Veilbound units -1 ATK.",
			"player_atk_bonus": -1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 2: The Ancestor's Warning
# Broken Ground: Hazardous terrain, defensive positioning
# ────────────────────────────────────────────────────────

static func _mission_2_the_ancestors_warning() -> Dictionary:
	return {
		"title": "The Ancestor's Warning",
		"objectives_text": "Defend the ancient shrine against desecration. Navigate the broken ground and hold sacred positions.",
		"pre_story": [
			ShardLore.narration("The shrine emerged from the broken earth like a bone from a wound — ancient, weathered, covered in script that no Veilbound scholar could read but every Veilbound warrior could feel. It was sacred. Not Veilbound sacred — older. Deeper. A place where the barrier between the physical and the spiritual had always been thin."),
			ShardLore.dialogue("The Shrouded Shogun", "This shrine predates Reishima. It predates the Veil itself. Whatever civilization built this understood the boundary between the seen and the unseen long before our ancestors learned to commune with the dead.", "awed"),
			ShardLore.dialogue("Masked Lord Kurohane", "My lord — the ground here is treacherous. Unstable terrain, sinkholes, crystalline outcroppings that fracture underfoot. And I sense movement in the shadows. Cold movement. Hungry movement.", "wary"),
			ShardLore.narration("From the darkness beyond the shrine's fading spiritual light, shapes coalesced — pale, predatory figures with eyes that glowed with stolen vitality. Vampiric warriors, drawn to the shrine's spiritual energy like moths to flame."),
			ShardLore.dialogue("The Shrouded Shogun", "Blood-drinkers. Their aetheric signatures are deeply corrupted — hunger given form, mortality inverted into something that feeds on life instead of honoring it. They are drawn here because the shrine radiates the one thing they crave most: the essence of the boundary between life and death.", "clinical"),
			ShardLore.dialogue("Masked Lord Kurohane", "The terrain will slow them. And us.", "assessing"),
			ShardLore.dialogue("The Shrouded Shogun", "Then we use the terrain as the ancestors used mountains — as natural fortifications. Position our warriors on firm ground. Let the blood-drinkers stumble through the broken earth toward us. The Way teaches: let the enemy fight the ground. We will fight the enemy.", "strategic"),
		],
		"post_story": [
			ShardLore.narration("The blood-drinkers fell back — not destroyed, but denied. The shrine's spiritual energy held, bolstered by Veilbound prayers that, even without the full Veil, carried enough ancestral resonance to ward the sacred space against corruption."),
			ShardLore.dialogue("The Shrouded Shogun", "The shrine held. But not because of our strength — because of its own. This place was designed to resist exactly this kind of corruption. Whoever built it knew that blood magic would come.", "realization"),
			ShardLore.narration("He knelt before the shrine's central stone — a crystal pillar that hummed with frequencies that resonated with the Veilbound spirit-sight. When he touched it, the static in the Veil cleared for a single, blazing moment."),
			ShardLore.dialogue("The Ancestors", "...Audience...", "whisper"),
			ShardLore.dialogue("The Shrouded Shogun", "Audience. The ancestors say 'audience.' First 'stage,' now 'audience.' A stage requires an audience — someone who watches the performance.", "connecting"),
			ShardLore.dialogue("Masked Lord Kurohane", "Who would watch a war?", "disturbed"),
			ShardLore.dialogue("The Shrouded Shogun", "Someone who finds it entertaining. Or instructive. Or necessary. The shrine showed me something else, Kurohane — in that instant of clarity, I felt five distinct spiritual signatures in this world. Five civilizations, five aetheric frequencies, five different expressions of the same fundamental life force.", "grave"),
			ShardLore.narration("He looked at the alien landscape — the volcanic glass, the crystalline forests, the metal ruins."),
			ShardLore.dialogue("The Shrouded Shogun", "Five worlds torn apart and stitched together. Five civilizations placed on a single stage. And an audience watching from beyond the Veil. This is not a natural disaster, Kurohane. This is a performance. And we are the performers.", "darkening"),
		],
		"defeat_story": [
			ShardLore.narration("The blood-drinkers overwhelmed the shrine's defenses. Their corruption seeped into the sacred stone, tainting what had been pure for millennia."),
			ShardLore.dialogue("The Shrouded Shogun", "The shrine is compromised. But stones can be cleansed. Regroup at the secondary position — we will purify what was tainted and reclaim what was lost. The ancestors did not whisper their warning for us to ignore it.", "resolute"),
		],
		"player_army": [
			"The Shrouded Shogun",
			"Shrine Wardens",
			"Temple Defenders",
			"Starblade Samurai",
			"Veiled Ashigaru",
			"Spirit Healer Monks",
		],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": [
			"Blood Reavers",
			"Blood Reavers",
			"Nightfang Warriors",
			"Blood Thralls",
			"Shadow Stalkers",
		],
		"battle_size": "skirmish",
		"scenario": "broken_ground",
		"round_limit": 7,
		"tutorial_tips": [
			"Broken Ground: hazardous terrain tiles deal damage. Position carefully on stable ground.",
			"Starblade Samurai gain bonus ATK through Revelation Mastery. Place them where they can strike.",
			"Spirit Healer Monks cannot attack but heal nearby allies. Keep them safe behind your line.",
			"Use the shrine as a natural anchor point — funnel enemies through dangerous terrain.",
		],
		"battle_modifiers": {
			"label": "Sacred Ground",
			"description": "The ancient shrine strengthens spirit-sight. Your units gain +1 MOR near the shrine.",
			"player_mor_bonus": 1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 3: The Clockwork Accord
# Shard Clash: Competing for objectives, first encounter with the
# machine faction — and Calculon's coalition broadcast
# ────────────────────────────────────────────────────────

static func _mission_3_the_clockwork_accord() -> Dictionary:
	return {
		"title": "The Clockwork Accord",
		"objectives_text": "Contest the shard relay nodes against the Iron Dominion. Control more nodes to secure resources for the Shogunate.",
		"pre_story": [
			ShardLore.narration("The shard nodes pulsed with invitation — crystallized energy that resonated with the same frequency as the Veil itself. Resources, power, territory. The Shogunate needed all three."),
			ShardLore.narration("But the machine-lord had arrived first."),
			ShardLore.dialogue("Masked Lord Kurohane", "Iron Dominion forces, my lord. Their deployment is... precise. Mathematically precise. Every unit occupies exactly the optimal position for its capabilities. I have never seen such discipline without spiritual foundation.", "impressed"),
			ShardLore.dialogue("The Shrouded Shogun", "Because their discipline is not spiritual — it is mechanical. Their commander processes warfare as equations, not art. Observe how they move: no wasted motion, no individual initiative, no improvisation. Every soldier is a component in a larger calculation.", "studying"),
			ShardLore.narration("Through the spirit-sight, the Iron Dominion army appeared as a network — threads of electromagnetic energy connecting every unit to a central intelligence. Where the Veilbound drew strength from ancestors, these machine-warriors drew strength from each other, linked in a vast computational web."),
			ShardLore.dialogue("The Shrouded Shogun", "Fascinating. Their 'Grid' functions like a mechanical Veil — a network that connects minds, shares information, coordinates action. They have built with iron what we inherited from the dead. Different methods. Similar ambitions.", "philosophical"),
			ShardLore.dialogue("Masked Lord Kurohane", "Ambitions that currently conflict with ours. Those shard nodes are essential for our supply network.", "practical"),
			ShardLore.dialogue("The Shrouded Shogun", "Then we contest them. But with respect. This machine-lord is not mad or desperate — he is rational. Rational enemies can become rational allies. First, however, we must teach him that mathematical superiority does not equal spiritual superiority. Deploy the divisions. The Seventeenth Stance — Crashing Tide.", "commanding"),
		],
		"post_story": [
			ShardLore.narration("The shard nodes changed hands three times before the Iron Dominion conceded — withdrawing in perfect mathematical order, losing nothing they did not choose to expenditure and preserving their combat capability with admirable efficiency."),
			ShardLore.dialogue("The Shrouded Shogun", "Lord Calculon. He fights like a master strategist playing a board game — every piece valued, every move calculated, every loss acceptable only within predetermined parameters. He is, in his own way, an artist. A cold artist, but an artist.", "respectful"),
			ShardLore.narration("As the Veilbound secured the shard nodes, something unexpected arrived: a signal. Not spiritual — electromagnetic. A broadcast on every frequency the Iron Dominion could reach, encoding a message in mathematical precision."),
			ShardLore.dialogue("Masked Lord Kurohane", "My lord — the machine-lord is broadcasting. Our signal-readers have decoded the message. It is... a proposal. He calls it a 'coalition.' Five factions, unified against a common threat. He has data — irrefutable data — that the Shardlands were artificially constructed. That we were brought here deliberately.", "surprised"),
			ShardLore.dialogue("The Shrouded Shogun", "Deliberately. Yes. The ancestors told us that much with a single word: 'stage.' The machine-lord has computed what the dead already knew.", "unsurprised"),
			ShardLore.narration("He sat in silence for a long moment, turning the shard node's crystallized energy in his hands. Through the spirit-sight, it pulsed with the echoes of the recently fought battle — Iron Dominion precision clashing with Veilbound fluidity."),
			ShardLore.dialogue("The Ancestors", "...Game...", "whisper"),
			ShardLore.dialogue("The Shrouded Shogun", "Stage. Audience. Game. The ancestors build their message one word at a time. A stage with an audience, and now a game. Someone is playing a game with five civilizations as the pieces.", "grim"),
			ShardLore.dialogue("Masked Lord Kurohane", "And Calculon's coalition? Do we respond?", "questioning"),
			ShardLore.dialogue("The Shrouded Shogun", "Not yet. The machine-lord sees the board. He does not yet see the player. And neither do we. But we are closer. Three words, three battles. The ancestors are telling us the truth — they simply cannot tell it all at once through the broken Veil.", "patient"),
		],
		"defeat_story": [
			ShardLore.narration("The Iron Dominion's Grid outmaneuvered the Veilbound at every turn — computational precision overwhelming spiritual intuition. Each node fell to exactly calculated force, applied at exactly calculated moments."),
			ShardLore.dialogue("The Shrouded Shogun", "His Grid processes faster than our spirit-sight can perceive. We must adapt — incorporate the rhythm of the Grid into our own stance-work. Every enemy teaches, if we have the humility to learn.", "contemplative"),
		],
		"player_army": [
			"The Shrouded Shogun",
			"Shrine Wardens",
			"Temple Defenders",
			"Starblade Samurai",
			"Moonlit Duelists",
			"Star Serpent Lancers",
			"Dreampiercer Archers",
			"Spirit Healer Monks",
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
			"Shard Clash: capture and hold shard nodes. Each controlled node earns VP per round.",
			"Star Serpent Lancers can charge across the field to contest distant nodes quickly.",
			"Dreampiercer Archers fire Phase Arrows — effective against the Iron Dominion's heavy armor.",
			"Moonlit Duelists can challenge key enemy units. Use them to eliminate Calculon's support units.",
		],
		"battle_modifiers": {
			"label": "Grid Interference",
			"description": "Calculon's Grid disrupts spiritual senses. Enemy units gain +1 DEF from network shielding.",
			"enemy_def_bonus": 1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 4: Threads and Spirits
# Shardstorm: Chaotic conditions, fighting during reality distortion
# Thornweft encounter — Vethiss's weaving clashes with the Shogun's
# spirit-sight
# ────────────────────────────────────────────────────────

static func _mission_4_threads_and_spirits() -> Dictionary:
	return {
		"title": "Threads and Spirits",
		"objectives_text": "Hold your positions during the shardstorm. Survive the reality distortions while contesting the Thornweft advance.",
		"pre_story": [
			ShardLore.narration("The shardstorm hit without warning — a cataclysm of raw magical energy that tore across the landscape, reshaping terrain, distorting reality, turning the battlefield into a nightmare of shifting ground and fractured physics."),
			ShardLore.narration("And through the storm, moving with impossible grace, the spider-folk came."),
			ShardLore.dialogue("Masked Lord Kurohane", "Thornweft Matriarchy — the weavers. They are deploying silk-lines through the storm, using the shardstorm's energy as... scaffolding. They are building a web inside the chaos.", "alarmed"),
			ShardLore.dialogue("The Shrouded Shogun", "Because chaos, to a weaver, is simply an unfinished pattern. Remarkable.", "admiring"),
			ShardLore.narration("Through the spirit-sight, the Thornweft army appeared as something breathtaking: a living tapestry of interconnected fate-threads, each warrior linked to every other, their movements coordinated not by orders but by the web itself — a decentralized intelligence that adapted to every change in the battlefield with organic fluidity."),
			ShardLore.dialogue("The Shrouded Shogun", "Their Web and our Veil operate in the same layer of reality — the unseen, the metaphysical. Where we commune with the dead, they weave the fabric of fate. Two perspectives on the same truth.", "revelation"),
			ShardLore.narration("At the center of the approaching web, a presence — patient, alien, utterly calm in the midst of the storm. Loom-Mother Vethiss. Her six eyes scanning the Shardlands with the clinical fascination of a scientist studying a particularly complex specimen."),
			ShardLore.dialogue("The Shrouded Shogun", "The spider-queen. I can feel her reading the fate-threads — she perceives causality the way we perceive spirits. She is studying us right now, measuring our response, calculating our pattern. We must show her a pattern worth studying.", "determined"),
			ShardLore.dialogue("Masked Lord Kurohane", "The storm intensifies. The terrain shifts beneath our feet. Fighting in this chaos—", "concerned"),
			ShardLore.dialogue("The Shrouded Shogun", "Is exactly what we trained for, Kurohane. The Twelfth Stance — Eye of the Storm. When the world shifts, the warrior remains still. When the ground breaks, the spirit endures. We are the Veilbound. We exist between worlds. This storm is merely another boundary to cross.", "commanding"),
		],
		"post_story": [
			ShardLore.narration("The storm subsided. The Thornweft withdrew — not defeated but... satisfied. Vethiss recalled her weavers with the precision of a conductor ending a symphony, each silk-line retracted, each web-anchor dissolved, leaving no trace of the vast pattern that had been woven across the battlefield."),
			ShardLore.dialogue("The Shrouded Shogun", "She was testing us. Not trying to destroy — trying to understand. The spider-queen weaves worlds together, Kurohane. She sees the Shardlands as a loom, and every faction as a type of thread. She was reading our thread-type. Our spiritual signature.", "certain"),
			ShardLore.narration("As if in confirmation, a signal arrived through the residual silk-lines — not electromagnetic like Calculon's broadcast, but woven into the fabric of the in-between space, delivered through the very layer of reality that the Veilbound perceived through spirit-sight."),
			ShardLore.dialogue("Masked Lord Kurohane", "My lord — a message. From the spider-queen. It arrived through the... the spirit layer. She wove it into the Veil-space. She knows we can read it.", "astonished"),
			ShardLore.narration("Vethiss's message was elegant: a pattern-map of the Shardlands' fate-threads, annotated with Thornweft weaving-logic, describing the five factions as five thread-types in a single tapestry. At its conclusion, a single idea, rendered in silk: cooperation. Voluntary weaving. Five threads choosing to be woven."),
			ShardLore.dialogue("The Shrouded Shogun", "The machine-lord proposes coalition through data. The spider-queen proposes it through pattern. Two invitations, two languages, the same conclusion: we are stronger together than apart.", "thoughtful"),
			ShardLore.narration("He reached through the broken Veil, seeking the ancestors' guidance."),
			ShardLore.dialogue("The Ancestors", "...Player...", "whisper"),
			ShardLore.dialogue("The Shrouded Shogun", "Stage. Audience. Game. Player. Four words. Four battles. The ancestors have been telling us the truth since the first moment, building it word by word across the broken Veil. We are on a stage, watched by an audience, playing a game — and the fourth word tells us who we are.", "electrified"),
			ShardLore.dialogue("Masked Lord Kurohane", "Players? We are pieces in someone's game?", "horrified"),
			ShardLore.dialogue("The Shrouded Shogun", "No, Kurohane. The ancestors distinguish between pieces and players. A piece is moved. A player chooses. They said 'player,' not 'piece.' Whatever force arranged this game expects us to play — to make choices, to act with agency. We are not puppets. We are participants.", "fierce"),
			ShardLore.narration("He looked toward the distant convergence of shard-lines — the nexus at the center of all the Shardlands' energy flows."),
			ShardLore.dialogue("The Shrouded Shogun", "There is one word the ancestors have not yet spoken. The most important word. The word that answers every question: who is the audience? Who arranged the stage? Who designed the game?", "building"),
			ShardLore.dialogue("The Shrouded Shogun", "I intend to find out.", "steel"),
		],
		"defeat_story": [
			ShardLore.narration("The shardstorm and the Web together proved too much. The Thornweft wove chaos into strategy, turning every reality distortion into an advantage while the Veilbound struggled to maintain stance-discipline in terrain that refused to remain stable."),
			ShardLore.dialogue("The Shrouded Shogun", "The spider-queen fights in the same unseen layer as our spirits. She is, in a sense, fighting us on our own ground — and winning. We must learn to perceive the Web as she perceives the Veil. The unseen world is larger than we knew.", "humbled"),
		],
		"player_army": [
			"The Shrouded Shogun",
			"Temple Defenders",
			"Starblade Samurai",
			"Oni Mask Executioners",
			"Moonlit Duelists",
			"Crimson Oni Riders",
			"Dreampiercer Archers",
			"Spirit Healer Monks",
			"Ritual Captains",
		],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": [
			"Loom-Mother Vethiss",
			"Silk-Warden Regulars",
			"Silk-Warden Regulars",
			"Gossamer Guard",
			"Venom Dancers",
			"Silk-Rider Lancers",
			"Fate-Thread Weavers",
			"Silk Catapult",
		],
		"battle_size": "standard",
		"scenario": "shardstorm",
		"round_limit": 7,
		"tutorial_tips": [
			"Shardstorm: reality shifts each round. Terrain changes and random effects hit both armies.",
			"Ritual Captains amplify Ritual Flow for nearby units. Keep them near your elite warriors.",
			"Oni Mask Executioners have Yokai Presence — the Thornweft's organic troops are vulnerable to terror.",
			"Crimson Oni Riders can break through web-lines. Use their charge to disrupt the Thornweft's web.",
		],
		"battle_modifiers": {
			"label": "Reality Storm",
			"description": "The shardstorm disrupts everything. All units suffer -1 DEF from reality distortion.",
			"player_def_bonus": -1,
			"enemy_def_bonus": -1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 5: The Blood Siege
# Last Stand: Fortress defense against Sanguinar's full court
# The Shogun assembles the ancestors' full message
# ────────────────────────────────────────────────────────

static func _mission_5_the_blood_siege() -> Dictionary:
	return {
		"title": "The Blood Siege",
		"objectives_text": "Defend the Spirit Fortress against Lord Sanguinar's assault. Hold the three shrine positions — if the blood magic breaches the spiritual wards, the fortress falls.",
		"pre_story": [
			ShardLore.narration("Lord Sanguinar came at twilight — the hour between day and night, the boundary time, the moment when the Veil was always thinnest. He chose well. Or perhaps he simply couldn't help himself."),
			ShardLore.dialogue("Masked Lord Kurohane", "My lord. The Blood Patriarch approaches with his full court. I count nine distinct aetheric signatures — the ancient one at the center is... immense. Cold. Patient. Like a glacier that has been moving toward us for ten thousand years.", "grave"),
			ShardLore.dialogue("The Shrouded Shogun", "Ten thousand years. I see his fate-thread through the spirit-sight, Kurohane, and it stretches back beyond the dawn of my own ancestors. Lord Sanguinar is the oldest living consciousness I have ever perceived. He is, in a terrible way, an ancestor himself — an ancestor of entropy.", "measured"),
			ShardLore.narration("The Nightfang court materialized from the gathering darkness like nightmares given architecture — blood-reavers and shadow-stalkers flanking their ancient lord, tiger-beasts prowling the perimeter, and behind them all, the monstrous bulk of the Crimson Behemoth."),
			ShardLore.dialogue("Lord Sanguinar", "Shrouded Shogun. I have been savoring this encounter. Your warriors taste of something I have not tasted in centuries — conviction. Purpose. Honor. It is intoxicating.", "predatory"),
			ShardLore.dialogue("The Shrouded Shogun", "Lord Sanguinar. You address me as if we are already at the table. We are not. The spirit wards hold. Your blood magic will not breach them.", "iron"),
			ShardLore.dialogue("Lord Sanguinar", "Every ward has a weakness. Every fortress has a door. Every honorable warrior has a moment of doubt. I have ten thousand years of patience, Shogun. I will find yours.", "dark_promise"),
			ShardLore.dialogue("The Shrouded Shogun", "Then come. The ancestors of every Shogun who has ever lived stand with me — fragmented, scattered, diminished by the broken Veil, but here. And against ten thousand years of hunger, I offer ten thousand years of honor. Let us see which endures.", "defiant"),
		],
		"post_story": [
			ShardLore.narration("The siege broke at dawn — not because the Nightfang lacked strength, but because Sanguinar, with the strategic wisdom of ten millennia, recognized the cost of persistence. The spiritual wards held. The Veilbound's stance-discipline made every assault more expensive than the last. And the Komainu Guardian, stationed at the fortress's heart, radiated an ancestral resonance that burned at the Nightfang's corruption like sunlight."),
			ShardLore.dialogue("Lord Sanguinar", "Impressive. Your fortress bleeds me more than I bleed you. A poor investment of my court's resources. I withdraw — not from weakness, but from wisdom. We will meet again, Shogun. Next time, I will bring something larger than soldiers.", "respectful_threat"),
			ShardLore.narration("The blood patriarch withdrew with his court, leaving behind the faint taste of corruption and a grudging respect that the Shogun found more disturbing than hatred."),
			ShardLore.dialogue("Masked Lord Kurohane", "He will return. But not soon — we cost him too much. My lord, the wards...", "trailing"),
			ShardLore.narration("The wards pulsed. In the aftermath of the siege, saturated with both spiritual and blood-magic energy, the shrine stones vibrated with a new resonance — the collision of two opposing forces creating something neither could produce alone. And through that resonance, the Veil opened wider than it had since the Shogunate arrived in the Shardlands."),
			ShardLore.narration("The ancestors spoke. Not a whisper this time. A chorus."),
			ShardLore.dialogue("The Ancestors", "Stage. Audience. Game. Player. NAME.", "voices"),
			ShardLore.dialogue("The Shrouded Shogun", "A name. They want to give me a name. The name of the audience. The name of the one who plays the game.", "urgent"),
			ShardLore.narration("He pressed his hands against the shrine stones, reaching through the amplified Veil with every ounce of spiritual power he possessed."),
			ShardLore.dialogue("The Ancestors", "...Fhah... Zolg...", "strained"),
			ShardLore.narration("The name landed in his consciousness like a stone in still water, rippling outward through his understanding, connecting every fragment, every whisper, every half-perceived truth into a single, devastating clarity."),
			ShardLore.dialogue("The Shrouded Shogun", "Fhah-Zolg. The Architect of Ruin. The audience. The game-maker. The entity that tore five civilizations from their worlds and placed us on this stage. The ancestors have been trying to tell me since the very first battle — and now I hear the complete message.", "revelation"),
			ShardLore.dialogue("Masked Lord Kurohane", "What do we do with this knowledge, my lord?", "grave"),
			ShardLore.dialogue("The Shrouded Shogun", "We do what the ancestors have always taught us: we face the truth with open eyes and an unbroken spirit. The machine-lord wants a coalition. The spider-queen wants cooperation. Both are correct — but neither sees the full truth. The machine-lord sees the mechanism. The spider-queen sees the pattern. But only we — the Veilbound, the walkers between worlds — can see the soul.", "building"),
			ShardLore.narration("He turned toward the distant convergence — the nexus of all shard energy in the Shardlands."),
			ShardLore.dialogue("The Shrouded Shogun", "I must go there. To the convergence. To the place where the Veil is thinnest. I must look through the boundary between worlds and see the face of Fhah-Zolg. Not his mechanism. Not his pattern. His soul. Because if he has one — even a vestige, even a memory of one — then there is hope.", "determined"),
			ShardLore.dialogue("Masked Lord Kurohane", "And if he does not?", "quiet"),
			ShardLore.dialogue("The Shrouded Shogun", "Then the coalition must become something greater than an alliance. It must become a force that can challenge the soulless. Prepare the honor guard, Kurohane. We march at first light.", "steel"),
		],
		"defeat_story": [
			ShardLore.narration("The wards shattered. Sanguinar's blood magic seeped through the spiritual defenses like poison through a wound, corrupting the shrine stones, silencing the ancestral resonance, turning the fortress from a sanctuary into a trap."),
			ShardLore.dialogue("The Shrouded Shogun", "He found the weakness. Not in the wards — in us. Doubt. The smallest crack in our conviction, and his corruption poured through it. We must become flawless in our resolve. Not perfect — flawless. There is a difference.", "wounded"),
		],
		"player_army": [
			"The Shrouded Shogun",
			"Shrine Wardens",
			"Temple Defenders",
			"Starblade Samurai",
			"Oni Mask Executioners",
			"Kintsugi Blademasters",
			"Crimson Oni Riders",
			"Dreampiercer Archers",
			"Spirit Healer Monks",
			"Komainu Guardian Colossus",
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
			"Crimson Behemoth",
		],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": [
			"Last Stand: defend all three shrine positions. If the enemy captures them, the wards fail.",
			"Komainu Guardian Colossus has Guardian Aura — nearby allies gain significant defensive bonuses.",
			"Kintsugi Blademasters get stronger as they take damage. Use them at contested positions.",
			"Dreampiercer Archers can hit from extreme range. Place them at the fortress center to cover all approaches.",
		],
		"battle_modifiers": {
			"label": "Blood Tide",
			"description": "Sanguinar's corruption seeps across the battlefield. Enemy units gain +1 ATK from blood frenzy.",
			"enemy_atk_bonus": 1,
		},
	}

# ────────────────────────────────────────────────────────
# MISSION 6: Beyond the Veil
# King of the Hill: The capstone battle. Hold the Grand Convergence.
# The Shogun sees Fhah-Zolg's soul and completes the coalition.
# ────────────────────────────────────────────────────────

static func _mission_6_beyond_the_veil() -> Dictionary:
	return {
		"title": "Beyond the Veil",
		"objectives_text": "Seize and hold the Grand Convergence — the nexus where the Veil between worlds is thinnest. Control the hill and pierce the boundary to confront the truth.",
		"pre_story": [
			ShardLore.narration("The Grand Convergence rose from the Shardlands like a monument to the impossible — a crystalline peak where every shard-line in the broken world converged, where the boundary between the physical and the metaphysical was so thin that the Shrouded Shogun could feel the ancestors pressing against it from the other side, desperate to speak, desperate to be heard."),
			ShardLore.dialogue("The Shrouded Shogun", "Here. The Veil is thinnest here. If I can hold this point — if I can pour enough spiritual energy into the convergence — the barrier will open. And I will see what waits on the other side.", "focused"),
			ShardLore.dialogue("Masked Lord Kurohane", "My lord — we are not alone. The fire-warriors are approaching in force. Their commander leads from the front — the drake-bonded warrior. She has brought her full warhost.", "urgent"),
			ShardLore.narration("Scorchcaller Vex arrived like a wildfire — fast, overwhelming, incandescent. Her warband swept across the flats toward the convergence with the unbridled fury that only the Emberclaw could sustain, drakes screaming, warriors blazing, catapults lobbing burning projectiles that arced across the darkening sky."),
			ShardLore.dialogue("The Shrouded Shogun", "The fire-queen. We fought her outriders in our first battle. She has grown since then — I can see it in her fate-thread. She is no longer merely attacking out of fear. She is attacking because she believes the convergence will take her home.", "understanding"),
			ShardLore.dialogue("Masked Lord Kurohane", "Can we hold against her full force? This is everything she has.", "assessing"),
			ShardLore.dialogue("The Shrouded Shogun", "We must hold. Not to deny her the convergence — but because what I will find on the other side of the Veil will determine the future of every faction in the Shardlands. If I am right about Fhah-Zolg... if the ancestors' message is what I believe it to be... then the fire-queen needs to hear the truth as much as we need to discover it.", "visionary"),
			ShardLore.narration("He drew the Shrouded Edge and pointed it toward the convergence's peak."),
			ShardLore.dialogue("The Shrouded Shogun", "All divisions — the First Stance. Immovable Mountain. We hold this summit against everything the fire can throw at us. Not for glory. Not for territory. For truth. The ancestors have been building toward this moment since we arrived. I will not fail them now.", "battle_cry"),
		],
		"post_story": [
			ShardLore.narration("The battle was a crucible — fire and spirit, fury and discipline, Emberclaw aggression meeting Veilbound immovability in a collision that shook the convergence to its crystalline foundations."),
			ShardLore.narration("But the mountain did not move."),
			ShardLore.narration("Wave after wave broke upon the Veilbound line. The Celestial Shogun Construct stood at the summit like a god of war, ancestral blades carving through drake-fire and pyroclast alike. The Komainu Guardian radiated spiritual authority so profound that even the most furious Emberclaw warriors hesitated. And at the eye of the storm, the Shrouded Shogun channeled every particle of Ritual Flow into the convergence, forcing the Veil open wider, wider, wider—"),
			ShardLore.narration("Until it broke."),
			ShardLore.narration("Not the Veilbound line. The Veil itself. The barrier between the physical and the metaphysical shattered at the convergence point, and the Shrouded Shogun saw beyond it — past the spirits of the dead, past the echoes of the ancestors, past every ghost and memory that had ever existed—"),
			ShardLore.narration("And there was Fhah-Zolg."),
			ShardLore.narration("Not a shape. Not a form. A presence — vast, ancient, utterly alone. The Shrouded Shogun, who had communed with the dead since boyhood, who had perceived ten thousand years of ancestral memory, who had touched the deepest layers of spiritual reality — recognized what he was seeing."),
			ShardLore.dialogue("The Shrouded Shogun", "...You are dead.", "whisper"),
			ShardLore.fhah_zolg("Dead? No. Death is a destination. I am beyond the destination. I am the road that was left behind when all the travelers had passed."),
			ShardLore.dialogue("The Shrouded Shogun", "No. I see your spirit, Fhah-Zolg. The spider-queen sees your pattern. The machine-lord sees your mechanism. But I see your soul. And your soul is dead. It died so long ago that you have forgotten what living felt like.", "piercing"),
			ShardLore.fhah_zolg("...Careful, spirit-walker. You tread on ground that has destroyed entities far greater than—"),
			ShardLore.dialogue("The Shrouded Shogun", "Greater than a mortal who communes with the dead? Perhaps. But no entity in all of existence has more experience with death than a Veilbound Shogun. I have spoken with ten thousand dead. I know what they sound like. I know what they feel like. And you — Architect of Ruin, He Who Watches the Board — you feel like the loneliest dead being I have ever perceived.", "unflinching"),
			ShardLore.narration("Silence. A silence so vast it seemed to contain entire worlds."),
			ShardLore.fhah_zolg("...You are the first in a very long time to see that. The spider-queen saw my pattern. The machine-lord computed my mechanism. The fire-queen raged against my cage. The blood patriarch tried to feed on my power. But you. You see the thing I have spent eternity hiding."),
			ShardLore.dialogue("The Shrouded Shogun", "Loneliness. You created the Shardlands because you were lonely. You pulled five civilizations from their worlds because you wanted to watch living things interact. Not out of cruelty — out of hunger. Not the blood-hunger of Sanguinar's kind. A deeper hunger. The hunger of the dead for the living.", "compassionate"),
			ShardLore.fhah_zolg("...Do not pity me, spirit-walker. I have existed for longer than your reality has had a name. I have woven worlds, computed dimensions, burned through realities and consumed the blood of dying universes. I am Fhah-Zolg. I am the Architect—"),
			ShardLore.dialogue("The Shrouded Shogun", "You are alone. And all the architecture in eternity does not fill that emptiness. I know, because I have comforted ten thousand ancestors who felt the same way — the dead always miss the living, Fhah-Zolg. That is the one truth that transcends every boundary.", "gentle_authority"),
			ShardLore.narration("The vision shattered. The Veil sealed itself, the convergence dimming as the spiritual energy dissipated. The Shogun staggered, caught by Kurohane, his six-century-old blade humming with residual energy from the encounter."),
			ShardLore.narration("Around him, the Emberclaw assault had faltered — Vex and her warriors staring at the convergence's impossible light with expressions that mixed fury with wonder. They had felt it too. Something vast. Something beyond."),
		],
		"defeat_story": [
			ShardLore.narration("The Emberclaw's fire reached the summit. The convergence blazed with heat rather than spirit, and the moment — the fragile, irreplaceable moment when the Veil would have opened — passed. The ancestors went silent once more."),
			ShardLore.dialogue("The Shrouded Shogun", "The fire consumed the moment. Not the truth — the moment. The truth endures. We will hold the convergence another day. The Veil has waited this long. It can wait a little longer.", "heartbroken_but_unbroken"),
		],
		"player_army": [
			"The Shrouded Shogun",
			"Shrine Wardens",
			"Temple Defenders",
			"Starblade Samurai",
			"Kintsugi Blademasters",
			"Hollow Lord Phalanx",
			"Crimson Oni Riders",
			"Star Serpent Lancers",
			"Spirit Healer Monks",
			"Dreampiercer Archers",
			"Komainu Guardian Colossus",
			"Celestial Shogun Construct",
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
		"scenario": "king_of_the_hill",
		"round_limit": 8,
		"tutorial_tips": [
			"King of the Hill: hold the summit for VP each round. The Emberclaw will assault relentlessly.",
			"The Celestial Shogun Construct is your ultimate weapon. Position it at the summit to dominate.",
			"Hollow Lord Phalanx are nearly indestructible when in Stance. Use them to absorb charges.",
			"The Shogun himself generates massive Ritual Flow. Keep him alive and near the convergence at all costs.",
		],
		"battle_modifiers": {
			"label": "Thin Veil",
			"description": "The Veil is threadbare. Your units gain +1 ATK from ancestral resonance. Enemy units gain +1 MOV from the convergence's pull.",
			"player_atk_bonus": 1,
			"enemy_mov_bonus": 1,
		},
	}

# ══════════════════════════════════════════════════════════════
# ENDING STORY
# ══════════════════════════════════════════════════════════════

static func _ending_story() -> Array:
	return [
		ShardLore.narration("===  CAMPAIGN COMPLETE: BEYOND THE VEIL  ==="),
		ShardLore.narration("The Shrouded Shogun stands at the summit of the Grand Convergence — the place where the Veil shattered and the truth was laid bare. He has seen the face behind the game. He has spoken to the Architect. And he has understood something that no other commander could."),
		ShardLore.narration("Fhah-Zolg is not a monster. He is a tragedy."),
		ShardLore.dialogue("The Shrouded Shogun", "Kurohane. I must speak, and you must remember my words exactly. What I am about to say will shape the future of every living being in the Shardlands.", "solemn"),
		ShardLore.dialogue("Masked Lord Kurohane", "I am listening, my lord.", "formal"),
		ShardLore.dialogue("The Shrouded Shogun", "The entity called Fhah-Zolg — the Architect of Ruin — was once alive. Not in the way we understand life, perhaps, but alive. A being of such power that he wove worlds, computed dimensions, consumed realities. And somewhere in that vast, terrible existence, he died. Not physically. Spiritually. He became so powerful that he forgot what it felt like to be vulnerable, to connect, to need. He became the Loom, as the spider-queen saw. The Machine, as the clockwork lord computed. The Predator, as the blood patriarch tasted. The Game-Master, as I perceived.", "revelation"),
		ShardLore.narration("He paused, gathering himself."),
		ShardLore.dialogue("The Shrouded Shogun", "But beneath all of those masks, beneath the architecture and the cruelty and the cosmic indifference — he is lonely. He created the Shardlands not to destroy us but to be near us. Living things. Struggling things. Things that feel and connect and love and fight and die. Things that are everything he no longer is.", "profound"),
		ShardLore.dialogue("Masked Lord Kurohane", "That does not excuse the suffering. The worlds he destroyed. The lives he—", "angry"),
		ShardLore.dialogue("The Shrouded Shogun", "No. It does not. Understanding is not forgiveness. But understanding is the first step toward change. A lonely dead god playing games with the living is a tragedy that perpetuates itself eternally — unless someone offers him something better than a game.", "firm"),
		ShardLore.dialogue("Masked Lord Kurohane", "What could be better?", "searching"),
		ShardLore.dialogue("The Shrouded Shogun", "Genuine connection. Not forced. Not manipulated. Real. The machine-lord proposes alliance. The spider-queen proposes cooperation. The fire-queen offers passion. The blood patriarch offers... investment. But only the Veilbound can offer what Fhah-Zolg truly needs: communion. A bridge between the dead and the living. The very thing the Veil was built for.", "visionary"),
		ShardLore.narration("He turned to face the Shardlands — the impossible patchwork of stolen worlds, the stage, the game board, the loom, the cage — and spoke his response to all of them."),
		ShardLore.dialogue("The Shrouded Shogun", "To Lord Calculon: I receive your coalition proposal and accept. Your data and our wisdom together see further than either alone. To Loom-Mother Vethiss: your message arrived through the spirit-layer. You understand the unseen as we do. I welcome your counsel at the table. To Scorchcaller Vex: your fire nearly denied me the truth today. That fire, directed with purpose instead of fury, could light the way for all of us. Join us. To Lord Sanguinar: your hunger is the shadow of Fhah-Zolg's loneliness. You know, better than anyone, what it means to need. Bring your understanding to the table — and I give you my word as Shogun that no one at that table will be prey.", "broadcast"),
		ShardLore.narration("He sheathed the Shrouded Edge — the blade humming with the memories of every Shogun who had carried it, a lineage unbroken across centuries and now across worlds."),
		ShardLore.dialogue("The Shrouded Shogun", "And to Fhah-Zolg, if you are listening — and I know you are always listening — I offer you this: we will play your game. Not because you force us, but because we choose to. Five factions, five threads, five perspectives on a single truth. We will weave your tapestry, compute your equation, fuel your fire, and fill your hunger. But on our terms. As players, not pieces. As partners, not prisoners.", "addressing_the_void"),
		ShardLore.narration("Silence from beyond the Veil. But a different kind of silence. Not the cold emptiness of an indifferent god. The silence of something that has not been spoken to — truly spoken to — in an eternity."),
		ShardLore.narration("The silence of something listening."),
		ShardLore.narration("Across the Shardlands, five factions received the Shrouded Shogun's words. A clockwork intelligence parsed them for logical consistency and found none — only truth, which was better. A spider-queen felt the message vibrate through the fate-threads and recognized a pattern she had never seen before: hope, woven voluntarily. A fire-queen heard the words and, for the first time since arriving in the Shardlands, stopped burning long enough to think. A blood patriarch tasted the message on the aetheric winds and found a flavor he had not experienced in ten thousand years: sincerity."),
		ShardLore.narration("Five factions. Five threads. Five perspectives on a single truth."),
		ShardLore.narration("The coalition begins."),
		ShardLore.fhah_zolg("..."),
		ShardLore.fhah_zolg("...They are speaking to me. Not at me. Not about me. To me. The spirit-walker looked through the Veil and saw what I have hidden from every reality I have ever touched: the emptiness at my center, the absence where a soul once lived."),
		ShardLore.fhah_zolg("He offered me communion. Connection. The one thing I tore five worlds apart to find, and he offers it freely."),
		ShardLore.fhah_zolg("I do not know if I can accept. I am not certain I remember how. But for the first time in longer than this universe has existed..."),
		ShardLore.fhah_zolg("I want to try."),
		ShardLore.narration("===  THE COALITION ARC IS COMPLETE  ==="),
		ShardLore.narration("All five faction campaigns have been fought. All five commanders have seen the truth through their own lens. The coalition stands ready — five threads, consenting to be woven, choosing to face the Architect not as enemies but as something he never expected:"),
		ShardLore.narration("Partners."),
		ShardLore.narration("What comes next is not a single faction's story. It is all of theirs, woven together."),
	]
