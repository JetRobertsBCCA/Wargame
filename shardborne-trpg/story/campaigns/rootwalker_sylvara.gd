class_name RootwalkerSylvaraCampaign
## Sylvara the Thornweaver — "The Reclaiming"
## An ancient dryad who watches war consume her forest and chooses to reshape
## the battlefield itself, turning the land into a weapon.
## 6 missions. Theme: Patience, inevitable growth, the land's memory.
## The Shardstorm poisoned the earth — Sylvara intends to cleanse it.
##
## Tone: Ancient, unhurried, quietly terrible. She is not angry.
## She has simply decided.

static func get_campaign() -> Dictionary:
	return {
		"id": "rootwalker_sylvara",
		"commander": "Sylvara the Thornweaver",
		"faction_enum": CombatantDefinition.Faction.ROOTWALKER,
		"title": "The Reclaiming",
		"description": "The forest is burning. Sylvara the Thornweaver has watched empires rise and rot for ten thousand years. She has outlasted gods. She has patience measured in centuries. But the Shardstorm has poisoned her roots, and the armies that followed it carry axes. She has decided.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

# ══════════════════════════════════════════════════════════════
# OPENING STORY
# ══════════════════════════════════════════════════════════════

static func _opening_story() -> Array:
	return [
		ShardLore.narration("She had been dreaming."),
		ShardLore.narration("Not sleeping — Sylvara had not slept in three thousand years. But dreaming, yes. The slow root-dream that comes when a season turns correctly, when the rain falls in the right patterns, when the soil breathes the way soil should breathe. A deep, vegetative contentment that asks nothing and offers everything."),
		ShardLore.narration("Then the sky split open."),
		ShardLore.narration("She had felt Shardstorms before. She had felt the first earthquakes when the world was young, the volcanic winters, the great dying, the slow ice and the long thaw. She had roots that remembered water when there had been no water, bark that carried the scorch-marks of fires that burned before memory. None of it had been like this."),
		ShardLore.narration("The Shardstorm did not burn or freeze or flood. It poisoned. Something ancient and deliberate fell through the broken sky and into the earth, and the earth screamed in ways that only something rooted could hear. The roots of her grove went dark — not dead, but silenced, choked on something that should not exist in soil."),
		ShardLore.dialogue("Sylvara the Thornweaver", "Something has happened to the world.", "ancient_awareness"),
		ShardLore.narration("She did not say it to anyone. There was no one to say it to. She simply opened her eyes — the amber-glow between branches that served as eyes — and looked at what had changed."),
		ShardLore.narration("The forest was wrong. The wrongness was subtle at first: a brown edge on leaves that should have been green, a silence from the deep roots that should have hummed with connection, the taste of something metallic in the rain. Then less subtle: ash falling from a cloudless sky. The sound of axes at the treeline. The smell of creatures that had never walked this forest before."),
		ShardLore.narration("She rose. The process took three days — the slow uncurling of limbs that had grown into the shape of ancient trees, the careful drawing-in of roots that had spread across an entire watershed. She had not moved in sixty years. Movement was rarely necessary."),
		ShardLore.narration("She surveyed what her forest had become."),
		ShardLore.dialogue("Sylvara the Thornweaver", "I see. Something brought them here. Something broke the sky and poisoned the earth and pushed these... creatures... into my roots. They bring their wars with them like a sickness they cannot set down.", "quiet_assessment"),
		ShardLore.narration("A pause. A very long pause, as a being measured in centuries considers a problem."),
		ShardLore.dialogue("Sylvara the Thornweaver", "Then I will remove the sickness. Root by root, stone by stone. The forest will be clean again. This is not a decision made in anger. This is a decision made in certainty. I have outlasted everything that has come before. I will outlast this.", "absolute"),
		ShardLore.fhah_zolg("A tree that walks. A grove that thinks. I did not expect this piece on my board — though I suppose I should have. The oldest things in any world are always the most dangerous. She does not fear me. She does not know me. She only knows that something disrupted her forest. That, I think, may be the most terrifying possible reason to be her enemy."),
	]

# ══════════════════════════════════════════════════════════════
# MISSIONS
# ══════════════════════════════════════════════════════════════

static func _missions() -> Array:
	return [
		_mission_1_the_first_scar(),
		_mission_2_what_the_roots_remember(),
		_mission_3_feeding_the_ground(),
		_mission_4_the_forest_answers(),
		_mission_5_what_was_always_here(),
		_mission_6_the_reclaiming(),
	]

# ────────────────────────────────────────────────────────
# MISSION 1: The First Scar
# Tutorial: Basic Rootwalker combat, treeline defense
# ────────────────────────────────────────────────────────

static func _mission_1_the_first_scar() -> Dictionary:
	return {
		"title": "The First Scar",
		"objectives_text": "Defend the treeline. Drive the axe-bearers back beyond the grove's edge. Keep Sylvara alive.",
		"pre_story": [
			ShardLore.narration("She heard the axes before she saw the soldiers."),
			ShardLore.narration("That was the thing about axes in old growth: the sound was different. Not the clean snap of a branch in wind, not the gradual creak of a tree deciding to fall. An axe against ancient wood produced a sound like screaming, if screaming were made of splinters and severed years. A tree that had grown for four hundred years could be killed in minutes. She had always known this. She had chosen, for a very long time, to do nothing about it."),
			ShardLore.dialogue("Sylvara the Thornweaver", "They are at the eastern edge. The young elms. Seventy years old — barely seedlings in my memory. They are being killed for firewood.", "flat"),
			ShardLore.narration("She began walking toward the sound. The earth moved with her — not dramatically, not with the theatrical upheaval of a shardquake. The roots simply made way, and the ground did not impede her, and the undergrowth parted like a tide before an ocean."),
			ShardLore.dialogue("Sylvara the Thornweaver", "You have been here three days. You have burned twelve trees and planted nothing. You have taken water from the stream and returned nothing. You have cut a scar in the treeline that will take eleven years to close.", "very quiet"),
			ShardLore.narration("The soldiers saw her and reached for their weapons. She observed this without surprise."),
			ShardLore.dialogue("Sylvara the Thornweaver", "Ah. Yes. That is what they do.", "resigned"),
		],
		"post_story": [
			ShardLore.narration("The treeline held. The soldiers who had come with axes left without them — some left without other things as well, and the eastern elms stood quieter now, their wounds open but their roots intact."),
			ShardLore.narration("Sylvara walked the perimeter of the damage and catalogued it with the methodical attention of a being for whom memory was architecture. Every scarred trunk was recorded. Every severed root. Every ash-pile where something had burned."),
			ShardLore.dialogue("Sylvara the Thornweaver", "The first scar. There will be more. There are always more, with creatures like these. The question is whether the grove heals faster than they cut.", "measured"),
			ShardLore.narration("She pressed a hand against the largest wound in the treeline — a gap where three ancient oaks had been felled — and felt the roots beneath her palm. Still alive. Still reaching. Still wanting to grow."),
			ShardLore.dialogue("Sylvara the Thornweaver", "Good. Then we have time.", "patient"),
		],
		"defeat_story": [
			ShardLore.dialogue("Sylvara the Thornweaver", "The treeline fell. It will grow back. I will be more direct next time — they seem to require directness.", "unhurried"),
		],
		"player_army": ["Sylvara the Thornweaver", "Thornwood Sentinels", "Grove Wardens", "Root Crawlers"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Infantry Regiment", "Mechanized Scouts"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": [
			"Rootwalkers fight best near forest terrain — their roots anchor them defensively.",
			"Sylvara's Thornweave ability entangles enemies who enter the treeline. Let them come to you.",
			"Thornwood Sentinels are your frontline — high DEF, slow movement. Plant them at the treeline.",
			"Root Crawlers tunnel beneath the battlefield. They can emerge behind enemy lines.",
		],
		"battle_modifiers": {"label": "Ancient Grove", "description": "The forest protects its own. Rootwalker units gain +1 DEF in forest terrain.", "player_def_bonus": 1},
	}

# ────────────────────────────────────────────────────────
# MISSION 2: What the Roots Remember
# Standard battle, vision mechanic
# ────────────────────────────────────────────────────────

static func _mission_2_what_the_roots_remember() -> Dictionary:
	return {
		"title": "What the Roots Remember",
		"objectives_text": "Eliminate the invading force. Reclaim the ground they have taken inside the grove's boundary.",
		"pre_story": [
			ShardLore.narration("The first wave had been scouts. The second wave brought more."),
			ShardLore.narration("They came from the south now — not Dominion this time, but blood-warriors, pale and hungry, whose boots left different stains on the earth. The roots tasted their passage and recoiled. Old blood. Old hunger. The soil had been washed clean of blood-debt for two centuries, and now it was being opened again like a healed wound."),
			ShardLore.narration("As Sylvara moved through the grove to intercept them, the roots began to show her things."),
			ShardLore.dialogue("Sylvara the Thornweaver", "I remember this.", "distant"),
			ShardLore.narration("A vision through the root-web: soldiers from a century past, a different war, the same terror in their eyes. The tree she was leaning against had grown over a buried sword. The roots had been drinking the iron for eighty years."),
			ShardLore.dialogue("Sylvara the Thornweaver", "The roots remember everyone who has died on this soil. Every war that has ever come to this grove is recorded in the wood. In the rings. In the iron in the water. These new creatures — they are adding themselves to a very long list.", "sorrowful"),
			ShardLore.narration("She did not find the thought comforting. The list was already too long."),
		],
		"post_story": [
			ShardLore.narration("The blood-warriors broke against the grove's defenders and were pushed back, step by grudging step, into the open land beyond the tree-shadow. They did not stop fighting cleanly — they fought the way things fight when they are hungry and frightened, which is to say without mercy or strategy, only need."),
			ShardLore.narration("When the last of them had retreated, Sylvara stood in the place where the fighting had been thickest and felt the soil changing beneath her feet. Already. The roots were already at work."),
			ShardLore.dialogue("Sylvara the Thornweaver", "The ground is drinking. The fallen become part of what was already here. I have watched this a thousand times. The forest does not discriminate between those who planted and those who were planted.", "tired"),
			ShardLore.narration("She looked south, where the blood-warriors had retreated to."),
			ShardLore.dialogue("Sylvara the Thornweaver", "But they will come back. They always come back. Something is driving them — something beyond hunger. Something that smells like the poison in the sky.", "thinking"),
		],
		"defeat_story": [
			ShardLore.dialogue("Sylvara the Thornweaver", "They have taken ground inside the grove. The roots will not forgive this easily. Nor will I. We reclaim what was taken.", "cold"),
		],
		"player_army": ["Sylvara the Thornweaver", "Thornwood Sentinels", "Grove Wardens", "Root Crawlers", "Bramblethorn Archers", "Deeproot Hulks"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Blood Reavers", "Blood Reavers", "Nightfang Warriors", "Blood Thralls", "Shadow Stalkers"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 7,
		"tutorial_tips": [
			"Deeproot Hulks are your heavy hitters — slow but devastating. Use them to crush armor.",
			"Bramblethorn Archers fire from the canopy. Keep them in forest terrain for their Canopy Cover bonus.",
			"Root Crawlers can intercept retreating enemies by surfacing in their path.",
			"The roots grow hungry: each fallen enemy unit strengthens your units' next attack.",
		],
		"battle_modifiers": {"label": "The Roots Remember", "description": "Ancient soil holds old anger. Rootwalker units gain +1 ATK for each enemy unit already eliminated.", "player_atk_bonus": 1},
	}

# ────────────────────────────────────────────────────────
# MISSION 3: Feeding the Ground
# Advance into enemy ruins, attrition mechanic
# ────────────────────────────────────────────────────────

static func _mission_3_feeding_the_ground() -> Dictionary:
	return {
		"title": "Feeding the Ground",
		"objectives_text": "Advance through the ruins. Clear the occupied positions. The dead will sustain the roots — let nothing go to waste.",
		"pre_story": [
			ShardLore.narration("The Shardstorm had deposited ruins across the edge of the grove — fragments of civilizations Sylvara had never seen, architecture from worlds that should not exist this close to her soil. She found them fascinating in the way she found all things fascinating: slowly, thoroughly, without urgency."),
			ShardLore.narration("What she did not find fascinating was the army that had established itself in the ruins and was using them as a fortified position from which to stage increasingly deep incursions into her territory."),
			ShardLore.dialogue("Sylvara the Thornweaver", "They have built a camp in the ruins. They have dug trenches. They believe stone walls protect them.", "bemused"),
			ShardLore.narration("The roots had already found the ruins. Of course they had — roots found everything, given sufficient time, and the ruins had been sitting on Sylvara's soil for weeks now, which was more than enough time. She could feel the foundations through the ground. She could feel every soldier's footstep."),
			ShardLore.dialogue("Sylvara the Thornweaver", "Stone is not permanent. Stone is merely slow. And the roots are patient.", "serene"),
			ShardLore.narration("She began to walk toward the ruins. The roots moved ahead of her, the way roots do — quietly, purposefully, hungry."),
		],
		"post_story": [
			ShardLore.narration("The ruins proved less defensible than their occupants had believed. There was something about Rootwalker forces in stone corridors and collapsed archways that was different from Rootwalker forces in the open — they became less like an army and more like water finding every crack, every crevice, every gap in the mortar."),
			ShardLore.narration("When the fighting was done, Sylvara walked the cleared ruins and noticed things."),
			ShardLore.dialogue("Sylvara the Thornweaver", "The roots have already started. Look — here, where the blood soaked through the stone. There. And there. They will have seedlings in this rubble within a season.", "quiet_wonder"),
			ShardLore.narration("The ruins were beginning, very slowly, to become part of the grove. Tendrils of living root threading through cracked stone. The first suggestion of green in the crevices where soil had gathered."),
			ShardLore.dialogue("Sylvara the Thornweaver", "The dead feed the ground. The ground feeds the roots. The roots grow hungry. This is how forests have always reclaimed what was taken. It simply... usually happens without the forest noticing.", "contemplative"),
			ShardLore.narration("She paused."),
			ShardLore.dialogue("Sylvara the Thornweaver", "The roots are growing faster. The Shardstorm poison — it is being processed. The roots are using the dead to purify. I had not expected that.", "surprised, slowly"),
		],
		"defeat_story": [
			ShardLore.dialogue("Sylvara the Thornweaver", "The ruins hold them. For now. Stone delays, but does not stop. I will return with deeper roots.", "unhurried"),
		],
		"player_army": ["Sylvara the Thornweaver", "Thornwood Sentinels", "Deeproot Hulks", "Root Crawlers", "Bramblethorn Archers", "Sporecloud Drifters", "Thornwall Bastion"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberclaw Warriors", "Ashborn Infantry", "Pyromancer Adepts", "Emberknight Riders", "Ashwalker Skirmishers"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 7,
		"tutorial_tips": [
			"Shard Clash: hold the shard nodes — the ruins create natural chokepoints to defend from.",
			"Sporecloud Drifters release toxic clouds on death. Position them at chokepoints.",
			"Thornwall Bastion creates living barricades — use it to seal corridors.",
			"Fire damages Rootwalker units more than most. Don't clump units against Pyromancers.",
		],
		"battle_modifiers": {"label": "Hungry Earth", "description": "The roots are feeding. Each eliminated enemy heals the nearest Rootwalker unit.", "player_hp_bonus": 1},
	}

# ────────────────────────────────────────────────────────
# MISSION 4: The Forest Answers
# Broken Ground scenario, Rootwalker terrain fills field
# Fhah-Zolg appearance
# ────────────────────────────────────────────────────────

static func _mission_4_the_forest_answers() -> Dictionary:
	return {
		"title": "The Forest Answers",
		"objectives_text": "Hold the shard-poisoned ground as the forest reclaims it. Survive the major assault. The terrain fights with you.",
		"pre_story": [
			ShardLore.narration("They came in force this time — a true army, coordinated across multiple factions, drawn together by the shared goal of stopping whatever was happening at the grove's edge. Something had begun to change about the landscape surrounding Sylvara's territory. The Shardstorm-blasted earth was greening. Ruins were being overgrown. The terrain itself was beginning to resist passage in ways that should not have been possible on a battlefield."),
			ShardLore.narration("They were right to be concerned."),
			ShardLore.dialogue("Sylvara the Thornweaver", "They notice. Good. Noticing suggests awareness, and awareness suggests a capacity to understand what is coming. Not that understanding will help them. But I prefer thoughtful opponents to careless ones.", "almost warm"),
			ShardLore.narration("The ground between the armies was a broken patchwork of Shardstorm damage and rapid natural reclamation — cracked earth and crystalline debris threaded through with root systems that had no business growing this fast. The battlefield looked like a fever dream of competing realities."),
			ShardLore.narration("Then, at the edge of Sylvara's perception — not through root-sense or branch-sight but through something much older, the deep animal awareness that predates all language — she felt a presence. Watching. Not from any direction. From everywhere at once."),
			ShardLore.dialogue("Sylvara the Thornweaver", "Something is observing this.", "still"),
			ShardLore.fhah_zolg("A tree that thinks. I have seen empires. I have seen gods. I have never seen a tree decide to reclaim a battlefield. You are genuinely new, little grove-mother. Do you know how rarely I find something new? I am almost moved. Almost."),
			ShardLore.narration("She looked in the direction the voice had come from, which was no direction and every direction simultaneously."),
			ShardLore.dialogue("Sylvara the Thornweaver", "I have outlasted gods before. Whatever you are, I will outlast you too. I have time.", "absolute"),
			ShardLore.narration("The presence seemed, briefly, delighted. Then it was gone. The army was still there. She turned her attention back to what mattered."),
		],
		"post_story": [
			ShardLore.narration("The forest answered."),
			ShardLore.narration("That was the only way to describe it. As the battle reached its most desperate point — when the combined army was pressing into the reclaimed zone and threatening to undo weeks of cleansing — the ground itself began to push back. Root systems that had been quietly growing for weeks activated simultaneously. Terrain that had looked merely difficult became impassable. The forest moved."),
			ShardLore.narration("Not quickly. Never quickly. But with the absolute certainty of a tide."),
			ShardLore.dialogue("Sylvara the Thornweaver", "The Shardstorm poison has been filtered enough. The roots can reach the deep aquifer again. They are drawing on clean water now. Clean water means clean growth. Clean growth means the battlefield will look very different in a week.", "satisfied"),
			ShardLore.narration("She watched the retreating army from the edge of what was already undeniably forest."),
			ShardLore.dialogue("Sylvara the Thornweaver", "Run. You will need the head start.", "quietly terrible"),
		],
		"defeat_story": [
			ShardLore.dialogue("Sylvara the Thornweaver", "The assault pushed through the reclaimed ground. A temporary setback. The roots are still growing. They do not stop because a battle was lost. Neither do I.", "implacable"),
		],
		"player_army": ["Sylvara the Thornweaver", "Thornwood Sentinels", "Deeproot Hulks", "Root Crawlers", "Bramblethorn Archers", "Sporecloud Drifters", "Thornwall Bastion", "Ancient Rootwarden"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["The Shrouded Shogun", "Shrine Wardens", "Starblade Samurai", "Temple Defenders", "Veiled Ashigaru", "Spirit Healer Monks", "Stormcaller Monks"],
		"battle_size": "standard",
		"scenario": "broken_ground",
		"round_limit": 8,
		"tutorial_tips": [
			"Broken Ground: the terrain is both hazard and asset — your Rootwalkers take no penalty in root-covered tiles.",
			"Ancient Rootwarden can permanently convert broken terrain to forest terrain. Position him at key chokepoints.",
			"Thornwall Bastion used on broken ground creates impassable barriers faster than on normal terrain.",
			"Sylvara's Grove Reclaim ability converts tiles to forest each round. Spread it strategically.",
		],
		"battle_modifiers": {"label": "The Forest Answers", "description": "Rootwalker terrain covers the field. Your units ignore difficult terrain movement penalties.", "player_mov_bonus": 1},
	}

# ────────────────────────────────────────────────────────
# MISSION 5: What Was Always Here
# Last Stand scenario, Rootwalkers attacking
# ────────────────────────────────────────────────────────

static func _mission_5_what_was_always_here() -> Dictionary:
	return {
		"title": "What Was Always Here",
		"objectives_text": "Break the enemy commander's last defensive position. The forest reclaims everything — even fortresses.",
		"pre_story": [
			ShardLore.narration("The enemy commander had chosen well, as commanders went. A rocky promontory at the grove's eastern edge — defensible, elevated, with clear sightlines in every direction. A century ago, it had been open ground. Half a century ago, saplings had crept toward its base. Now the saplings were trees, and the trees were listening to Sylvara, and the commander did not know that his fortress was already surrounded by things that were older than his civilization."),
			ShardLore.narration("He had sent messages. Sylvara had received them the way roots receive things — by absorbing them without acknowledgment."),
			ShardLore.dialogue("Sylvara the Thornweaver", "He wants to negotiate. He believes this is a border dispute. A territorial conflict with a resolution. He cannot conceive of an opponent for whom the entire concept of 'border dispute' is inapplicable.", "patient"),
			ShardLore.narration("She regarded the fortress with the same expression she used for everything: mild, ancient, utterly certain."),
			ShardLore.dialogue("Sylvara the Thornweaver", "I am not here because he is my enemy. I am here because this ground was part of the grove before his civilization existed, and it will be part of the grove after his civilization is over. I am not taking his fortress. I am reclaiming what was always here.", "absolute"),
			ShardLore.narration("She began to move toward the promontory. Slowly. The way a forest moves."),
		],
		"post_story": [
			ShardLore.narration("The commander made his last stand with real courage — that was worth noting. He had chosen defenders who believed in what they defended, and they held their positions long past the point where practical wisdom would have advised retreat. Sylvara respected this in the way she respected all things that persisted: completely, impersonally, without sentiment."),
			ShardLore.narration("When the position finally fell, she walked through the gates of the fortress and found the commander standing in the central courtyard, the last of his guard around him, waiting."),
			ShardLore.dialogue("Sylvara the Thornweaver", "You fought well for something that was never yours to defend.", "not unkind"),
			ShardLore.narration("She looked at the stones beneath her feet. Already, the roots were threading through the cracks."),
			ShardLore.dialogue("Sylvara the Thornweaver", "Leave. Take your people. I have no use for your bones in my soil — you have enough kin buried here already.", "quiet"),
		],
		"defeat_story": [
			ShardLore.dialogue("Sylvara the Thornweaver", "The fortress holds. Mortared stone is slower to fall than I had calculated. The roots will need more time. I have more time.", "unchanged"),
		],
		"player_army": ["Sylvara the Thornweaver", "Thornwood Sentinels", "Deeproot Hulks", "Root Crawlers", "Bramblethorn Archers", "Sporecloud Drifters", "Ancient Rootwarden", "Thornwall Bastion", "Rootmaw Devourer"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Loom-Mother Vethiss", "Gossamer Guard", "Silk-Warden Regulars", "Cocoon Wardens", "Venom Dancers", "Spiderling Swarm", "Gossamer Titan"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": [
			"Last Stand reversed: you are attacking. Root Crawlers excel at breaching defended positions from below.",
			"Rootmaw Devourer can consume enemy defensive structures — use it against Thornweft web barriers.",
			"Concentrate force on one section of the defense rather than spreading attacks evenly.",
			"Ancient Rootwarden converts captured positions to forest terrain, making them harder to retake.",
		],
		"battle_modifiers": {"label": "Inevitable Growth", "description": "The forest cannot be held back. Rootwalker units gain +1 ATK when targeting units in fortified positions.", "player_atk_bonus": 1},
	}

# ────────────────────────────────────────────────────────
# MISSION 6: The Reclaiming
# King of the Hill, final battle
# ────────────────────────────────────────────────────────

static func _mission_6_the_reclaiming() -> Dictionary:
	return {
		"title": "The Reclaiming",
		"objectives_text": "Hold the Grove Heart. The Shardstorm nexus poisons the center of the reclaimed territory — cleanse it. The grove must breathe again.",
		"pre_story": [
			ShardLore.narration("At the center of the reclaimed territory, where the Shardstorm had first broken through, there was a nexus. A place where the poison was strongest, where the earth was most wrong, where the sky still carried the memory of the rupture. It had been slowly poisoning outward for weeks, undoing Sylvara's work, eating the roots she sent into it."),
			ShardLore.narration("Everything converged on this place. The factions who had been driven back converged on it too — they had understood, finally, what the cleansing of the nexus would mean. A grove that could purify Shardstorm damage. A land that healed itself faster than they could damage it. A forest that remembered."),
			ShardLore.narration("They sent everything."),
			ShardLore.dialogue("Sylvara the Thornweaver", "Of course they do. When they realize they are losing, they send everything. This is the pattern. This has always been the pattern. They believe that 'more' is the answer to 'inevitable.' It is not.", "unimpressed"),
			ShardLore.narration("She stood at the nexus site and looked at the armies arrayed against her and felt, for the first time in many decades, something that was not quite patience but was patience's older sibling — the certainty of an outcome that has not yet occurred but will."),
			ShardLore.dialogue("Sylvara the Thornweaver", "I have lived through the death and rebirth of this forest eleven times. Eleven extinctions. Eleven reclamings. The world has ended, for this place, and begun again, more times than you have had generations of rulers. You are not the ending of this grove. You are a difficulty. And I have outlasted difficulties.", "deep and slow"),
			ShardLore.narration("She turned and walked to the nexus, and pressed her hands into the poisoned earth, and began."),
		],
		"post_story": [
			ShardLore.narration("She held the nexus."),
			ShardLore.narration("Not with weapons — though her grove fought, and fought with the terrible, unhurried competence of things that grew in the dark for centuries before anyone came to cut them. But the holding was done by roots. By the endless, patient, branching insistence of living things that would not stop reaching, would not stop growing, would not be told the soil was finished."),
			ShardLore.narration("The Shardstorm poison was drawn upward through the root-web. Processed. Filtered through bark and heartwood and the slow chemistry of old growth. It came out as something else — not clean, not yet, but changed. Approaching clean. On its way."),
			ShardLore.narration("When the armies finally broke and left and the battlefield settled into the particular silence that follows violence, Sylvara remained at the nexus and continued her work. The roots continued their work. The grove continued to breathe."),
			ShardLore.dialogue("Sylvara the Thornweaver", "The poison is thinning. The aquifer below the nexus is reaching clean water again. In three seasons, you will not be able to find the scar. In thirty seasons, whatever brought this war to my grove will be a line in the growth rings, and that line will mean nothing to the trees above it.", "slow and certain"),
			ShardLore.narration("She looked at the sky, which was wrong, as it had been wrong for weeks — too bright, too fragmented, carrying the memory of the Shardstorm in its light."),
			ShardLore.dialogue("Sylvara the Thornweaver", "The sky will take longer. But I am patient. I have always been patient.", "final"),
		],
		"defeat_story": [
			ShardLore.dialogue("Sylvara the Thornweaver", "The nexus holds its poison for now. There is no urgency. I have grown roots in harder soil than this. I will return. The grove will return. We always return.", "absolute"),
		],
		"player_army": ["Sylvara the Thornweaver", "Thornwood Sentinels", "Deeproot Hulks", "Root Crawlers", "Bramblethorn Archers", "Sporecloud Drifters", "Ancient Rootwarden", "Thornwall Bastion", "Rootmaw Devourer", "Grove Colossus"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Wyrmlord Tzarak", "Emberforged Blades", "Unbonded Berserkers", "Emberclaw Warriors", "Mature War Drake", "Ashwalker Skirmishers", "Pyromancer Adepts", "Pyromancer Circle", "Pyroclast Catapult"],
		"battle_size": "epic",
		"scenario": "king_of_the_hill",
		"round_limit": 9,
		"tutorial_tips": [
			"King of the Hill: hold the nexus at center. Grove Colossus is your anchor — place him on the nexus.",
			"The nexus heals Rootwalker units each round. Sylvara gains extra Thornweave charges while on it.",
			"Ancient Rootwarden can accelerate cleansing — keep him near the nexus.",
			"Fire attacks are your greatest danger. Prioritize eliminating Pyromancers early.",
			"This is an endurance fight. Your forces regenerate. Theirs do not.",
		],
		"battle_modifiers": {"label": "The Reclaiming", "description": "The grove is at full power. All Rootwalker units gain +1 ATK, +1 DEF, and regenerate HP each round.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

# ══════════════════════════════════════════════════════════════
# ENDING STORY
# ══════════════════════════════════════════════════════════════

static func _ending_story() -> Array:
	return [
		ShardLore.narration("The grove healed."),
		ShardLore.narration("Not quickly — nothing in a forest heals quickly, and the Shardstorm's damage was deep, and the wars that had followed the Shardstorm had opened wounds on top of wounds. But heal it did, with the slow, absolute certainty of living things that have been healing since before the concept of healing had a name."),
		ShardLore.narration("Sylvara walked the full circuit of the reclaimed territory on the morning after the final battle. Three hours, at the pace of old growth. She counted the new shoots in the ruins, the roots threading through stone, the first evidence of canopy closing over ground that had been open sky for too long."),
		ShardLore.dialogue("Sylvara the Thornweaver", "The grove will not forget this. The rings will carry it — a narrow band of stressed wood, discolored by poison and war, and then the rings will continue. Wide and clean and growing.", "quiet"),
		ShardLore.narration("She thought of the presence she had felt during the battle — the voice from everywhere at once, the thing that found her fascinating. She thought about it the way she thought about most things: thoroughly, slowly, without urgency."),
		ShardLore.dialogue("Sylvara the Thornweaver", "Whatever brought this war to my roots will find, eventually, that the forest is not a piece on a board. The forest is the board. And boards outlast the games played on them.", "patient certainty"),
		ShardLore.narration("She pressed her hand against the oldest tree in the grove — an oak that had been here when the world was young, that carried in its heartwood the memory of climates no longer possible — and felt it lean, very slightly, in the way trees lean toward light."),
		ShardLore.narration("It would be centuries before the grove fully forgot. The war would be in the rings forever. But the forest was breathing again, and the roots were clean, and the rain that fell tasted of nothing that should not be there."),
		ShardLore.narration("For Sylvara the Thornweaver, who measured time in centuries and forests in civilizations, this was enough."),
		ShardLore.narration("It was, in fact, everything."),
	]
