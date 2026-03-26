class_name RootwalkerSapwoodSeerCampaign
## Sapwood the Seer — "What the Roots See"
## Prophecy/support, sees outcomes before they happen.
## 4 missions. Teaches anticipation tactics, counter-positioning, foreknowledge.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_sapwood_seer",
		"commander": "Sapwood the Seer",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "What the Roots See",
		"description": "The roots reach everywhere. They feel every footstep, every vibration, every intention that becomes physical movement. Sapwood has been reading root-sense for four centuries and has developed the ability to see not just where enemies are, but where they will be — and, worse, why. She does not see the future. She sees the present so clearly that the future becomes obvious.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
		"defeat_story": _defeat_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The root-web registers everything that touches the ground."),
		ShardLore.narration("This is something most creatures forget, if they ever knew it. Every step taken on soil sends a signal downward — weight, direction, speed, the pressure distribution of a particular gait. Sapwood had spent four centuries learning to read these signals, and four centuries of reading had produced a skill that looked, to outside observers, very much like prophecy."),
		ShardLore.dialogue("Sapwood the Seer", "It is not prophecy. It is inference. They will attack from the left flank in approximately four minutes because the leftmost unit commander is frustrated with the stalemate at center and has been pacing in the direction of the left flank for the last twenty minutes, which is what frustrated commanders do before they order something impulsive.", "precise"),
		ShardLore.narration("Four minutes later, the left flank attack began. Sapwood had already repositioned to meet it."),
		ShardLore.dialogue("Sapwood the Seer", "I do not predict. I simply pay attention.", "patient"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "What the Ground Knows",
		"objectives_text": "Anticipate the Iron Dominion assault. Position to meet each approach before it develops.",
		"pre_story": [
			ShardLore.narration("The Iron Dominion was planning a multi-vector assault. Their commanders were professional, their timing precise, their approach vectors calculated for maximum disruption. They had done the planning well."),
			ShardLore.dialogue("Sapwood the Seer", "They are planning a three-vector assault. The primary approach will come from the north because the northern approach commander has higher operational confidence than her counterparts — she has been walking the northern route twice daily for reconnaissance. The secondary approach will be east — the eastern unit is the freshest and will be used as exploitation force after the northern breakthrough they expect. The western approach is a feint. Their commander in the west is moving too deliberately to be sincere.", "reading the ground"),
			ShardLore.narration("She moved her forces to the north and waited."),
		],
		"post_story": [
			ShardLore.dialogue("Sapwood the Seer", "Northern approach met, eastern exploitation denied, western feint ignored. The Iron Dominion's operational plan was sound in theory. In practice, it was visible in the root-web for three days before they executed it. Knowing the plan is better than having a better plan.", "satisfied"),
		],
		"defeat_story": [ShardLore.dialogue("Sapwood the Seer", "Their pattern changed at the last moment. Something intervened between the planning phase and the execution. The root-web readings were accurate — the plan changed. I did not see the change. I will watch for plan-changes more carefully. They indicate either intelligence on their side or chaos, both of which I need to track.", "learning")],
		"player_army": ["Sapwood the Seer", "Thornwood Sentinels", "Root Crawlers", "Grove Wardens"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Infantry Regiment", "Mechanized Scouts", "Gearwright Engineers"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": [
			"Sapwood's Foresight ability shows enemy movement intentions one round before they execute.",
			"Pre-position your units to intercept. Arrival at the same time as the enemy is winning.",
			"Root Crawlers can be placed in advance at enemy approach routes based on Foresight data.",
			"Grove Wardens sustain your force through repeated repositioning — stamina matters in a dynamic defense.",
		],
		"battle_modifiers": {"label": "The Roots See All", "description": "Sapwood reads the ground. Enemy unit positions are revealed at the start of each round.", "player_def_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Reading the Silk",
		"objectives_text": "The Thornweft moves through the root-web strangely. Learn their pattern. Then counter it.",
		"pre_story": [
			ShardLore.narration("The Thornweft were difficult to read. Their movements did not produce the same root-web signatures as other factions — something about the silk they wove absorbed vibration in ways that muddied the readings. Sapwood found this genuinely interesting."),
			ShardLore.dialogue("Sapwood the Seer", "The silk is vibration-absorbent. My root-sense is compromised in silk-covered terrain. This is the first time in four centuries I have encountered a form of movement that I cannot read correctly. I am going to have to think about this differently.", "focused, curious"),
			ShardLore.narration("She was quiet for several minutes."),
			ShardLore.dialogue("Sapwood the Seer", "The silk absorbs vibration, but it does not absorb weight. The ground beneath the silk still registers their presence. I cannot read direction or intention through the silk, but I can read position. Partial sight is better than no sight.", "solving it"),
		],
		"post_story": [
			ShardLore.dialogue("Sapwood the Seer", "I cannot read their intentions through the silk. I can read their positions. Position reading with four centuries of pattern knowledge is sufficient. I know where they are. I know the set of actions available from any given position. I eliminated the actions that would not serve their current state. What remained was their actual action. Close enough to prophecy for practical purposes.", "satisfied with the adaptation"),
		],
		"defeat_story": [ShardLore.dialogue("Sapwood the Seer", "The silk confused me completely at the critical moment. A Thread-Seer was actively manipulating the vibration patterns — she was creating false root-web readings. This is a counter-measure specifically designed against root-sense. They know what I can do. I need to know what they know.", "recalibrating")],
		"player_army": ["Sapwood the Seer", "Thornwood Sentinels", "Root Crawlers", "Grove Wardens", "Deeproot Hulks"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Thread-Seer Kythara", "Silk-Warden Regulars", "Gossamer Guard", "Venom Dancers", "Spiderling Swarm"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": [
			"Thread-Seer Kythara disrupts Foresight in silk terrain — eliminate her to restore clarity.",
			"Deeproot Hulks are immune to silk web — they can advance through woven terrain without penalty.",
			"Sapwood's alternate ability Root Pulse maps enemy positions even through silk coverage.",
			"Shard Clash: secure open-ground nodes first where Sapwood's Foresight functions normally.",
		],
		"battle_modifiers": {"label": "Partial Sight", "description": "The silk interferes but does not blind. Sapwood reveals enemy positions (not intentions) each round.", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Shape of What Comes",
		"objectives_text": "A major assault is building. Read the entire enemy operational plan and position for every stage of it.",
		"pre_story": [
			ShardLore.narration("The combined force had been assembling for two weeks, and the root-web had been reading their preparations for two weeks, and Sapwood had spent two weeks doing nothing except reading root-web data and thinking."),
			ShardLore.dialogue("Sapwood the Seer", "I know the entire assault plan. I know the timing, the vectors, the reserve positions, the contingency responses they have prepared for three scenarios they anticipate encountering. I know which commander will hesitate and which will overextend. I have pre-positioned for each phase of their plan. When the assault begins, it will find that every move it intends to make has already been countered by a move made three days ago.", "certain and calm"),
			ShardLore.narration("A long pause while she checked the root-web one final time."),
			ShardLore.dialogue("Sapwood the Seer", "Unless I have made an error. I may have made an error. Four centuries of accuracy has not produced certainty. It has produced high confidence. High confidence and certainty are not the same thing. I hold this in mind.", "honest"),
		],
		"post_story": [
			ShardLore.dialogue("Sapwood the Seer", "No errors. The assault unfolded exactly as the root-web predicted. Every counter-position was correct. The enemy commanders experienced what I suspect felt like a battle against something that could see through walls — because reading root-vibration across a two-week preparation period is, functionally, equivalent to seeing through walls. I do not think they will recover quickly from this defeat.", "measured satisfaction"),
		],
		"defeat_story": [ShardLore.dialogue("Sapwood the Seer", "I made an error. I prepared for the plan they had constructed. They changed it. Not all of it — one element. One element I could not see changing because it was decided at a level above root-vibration range. The one element I missed was the critical one. I will track higher-level decision signals in the future. Everything leaves a mark. I will find the marks.", "learning")],
		"player_army": ["Sapwood the Seer", "Thornwood Sentinels", "Root Crawlers", "Grove Wardens", "Deeproot Hulks", "Bramblethorn Archers", "Sporecloud Drifters"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["The Shrouded Shogun", "Shrine Wardens", "Starblade Samurai", "Temple Defenders", "Veiled Ashigaru", "Spirit Healer Monks"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 8,
		"tutorial_tips": [
			"Sapwood's Battle Anticipation: at mission start, she reveals the enemy's first three moves.",
			"Pre-position Bramblethorn Archers to catch enemy units mid-repositioning.",
			"Sporecloud Drifters placed along anticipated approach routes disrupt the plan's timing.",
			"The Shogun is a counter-sensor — he can feel Sapwood's root-web readings. Focus him early.",
		],
		"battle_modifiers": {"label": "Two Weeks of Reading", "description": "The plan was read completely. All Rootwalker units begin the mission in optimal counter-positions (+2 DEF).", "player_def_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "What the Roots See",
		"objectives_text": "The Shardstorm nexus is the information center of the entire conflict. Read it. Hold it. See everything it shows.",
		"pre_story": [
			ShardLore.narration("The Shardstorm nexus pulsed with energy, and in that energy, the root-web was registering something extraordinary — a signal not of footsteps or weight or movement, but of intention itself. A compression of tactical information at a scale that Sapwood had never encountered. As if every decision made in the Shardlands was, in some form, leaving a residue here."),
			ShardLore.dialogue("Sapwood the Seer", "The nexus is an information reservoir. Every engagement in the Shardlands has deposited data here — tactical signatures, decision patterns, the accumulated strategic intelligence of five factions fighting for months. If I can hold this nexus long enough to read it fully, I will understand the Shardlands better than anything that has been in them.", "careful excitement"),
			ShardLore.narration("Everything converged on the nexus. Of course it did."),
			ShardLore.dialogue("Sapwood the Seer", "I knew they would come. I have had the positions pre-set for six hours. The question is whether the reading completes before the assault does.", "final"),
		],
		"post_story": [
			ShardLore.narration("The nexus reading completed in the fourth hour of the assault. What Sapwood downloaded from it would take years to fully process. But the immediate summary was clear."),
			ShardLore.dialogue("Sapwood the Seer", "The Shardlands are not random. The chaos is organized. There is a pattern at a scale above what any single faction can observe — a strategic architecture that none of the commanders have perceived because none of them can see all of it at once. The nexus can. I can now. Something put the five factions here on purpose, and the purpose is to watch them respond to each other, and the something is watching from above the root-web, above the Veil, from a position that is not in the Shardlands at all.", "changed by the knowledge"),
			ShardLore.narration("A long pause."),
			ShardLore.dialogue("Sapwood the Seer", "I do not like this. But I like knowing it. The roots see everything. Now they see this.", "certain"),
		],
		"defeat_story": [ShardLore.dialogue("Sapwood the Seer", "The nexus was taken before the reading completed. I have partial data. The partial data is more than I had before. It suggests a pattern I cannot yet see fully. I will find another access point. The roots reach everywhere. They will reach this information again.", "patient")],
		"player_army": ["Sapwood the Seer", "Thornwood Sentinels", "Root Crawlers", "Grove Wardens", "Deeproot Hulks", "Bramblethorn Archers", "Ancient Rootwarden", "Sporecloud Drifters"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Scorchcaller Vex", "Emberclaw Warriors", "Ashborn Infantry", "Pyromancer Adepts", "Emberknight Riders", "Mature War Drake"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 9,
		"tutorial_tips": [
			"King of the Hill: Sapwood must hold the nexus to complete the reading — don't let her be displaced.",
			"Ancient Rootwarden extends Sapwood's sensing range while she channels the nexus.",
			"Sapwood's Nexus Read ability: while on the objective, she predicts all enemy actions for the next round.",
			"Protect the reading — each round Sapwood holds the nexus, she unlocks additional foreknowledge.",
		],
		"battle_modifiers": {"label": "Nexus Reading", "description": "The Shardstorm knows all. While Sapwood holds the nexus, all enemy movements are revealed.", "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Sapwood stood at the nexus long after the battle ended, still reading."),
		ShardLore.dialogue("Sapwood the Seer", "The roots see everything. I have been saying this for four centuries. I did not know, until now, that it was literally true — that the root-web extends beyond the Shardlands, beyond the soil, into whatever framework holds the worlds together. I have been reading the ground. I did not know the ground went this deep.", "absorbing"),
		ShardLore.narration("She withdrew from the nexus and began the long walk back to the grove, carrying the weight of everything she had learned."),
		ShardLore.dialogue("Sapwood the Seer", "There is something watching us. Something that put us here to be watched. I know this now. I do not know what to do with this knowledge yet. Four centuries of reading have always produced actionable intelligence. This is the first intelligence I have read that I do not know how to act on. I will think about it. The roots will help me think. The roots see everything. Perhaps they will see this too.", "certain, but humble before the scale of it"),
	]

static func _defeat_story() -> Array:
	return [
		ShardLore.dialogue("Sapwood the Seer", "I did not see it in time. Four centuries of foresight and there was something I missed. This is the most important lesson I have learned: perfect sight is impossible. Close to perfect sight, correctly interpreted, is the best available position. I will pursue that. I have always pursued that. I will pursue it more carefully.", "learning"),
	]
