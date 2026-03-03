class_name VeilboundHoshikamiCampaign
## Cmdr Hoshikami — "The Star Sigils"
## Fragment specialist, Sigils. ATK 12, DEF 3, HP 27, MOV 7, RNG 6, CMD 9.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_hoshikami",
		"commander": "Cmdr Hoshikami",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "The Star Sigils",
		"description": "Commander Hoshikami is the Shogunate's foremost fragment scholar. ATK 12, RNG 6 — she fights not with blade but with sigils of starlight, channeling shard fragments into devastating ritual patterns.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Cmdr Hoshikami", "Hoshikami — Star Spirit. The name was given to me by my master when I first drew a sigil in the air and the stars answered. Most warriors fight with weapons forged from metal. I fight with weapons forged from meaning — sigils, glyphs, patterns drawn from shard fragments that resonate with the celestial frequencies above. Each fragment carries a frequency. Each sigil amplifies that frequency into force. And the stars... the stars are the original sigils, written before language existed, before meaning was invented. I read them. And through them, I write the future.", "mystical"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The First Sigil",
		"objectives_text": "Recover ancient shard fragments from Emberclaw territory and activate star sigils.",
		"pre_story": [ShardLore.dialogue("Cmdr Hoshikami", "The Emberclaw territory holds fragment deposits — raw, unrefined, pulsing with Heat energy. They use them as fuel for their forges, wasting potential that could reshape reality. I need three specific fragments: the Eye of Dawn, the Nail of Dusk, and the Thread of Midnight. Together, they form the Constellation Sigil — the first of the great star patterns. The Emberclaw won't surrender them willingly. But they don't understand what they're holding. To them, fragments are fuel. To me, they are sentences in the language of creation.", "determined")],
		"post_story": [ShardLore.dialogue("Cmdr Hoshikami", "Three fragments recovered. Three frequencies harmonized. The Constellation Sigil blazes — not with fire, but with MEANING. It spells something too vast for words, a sentence written before language, a truth that predates knowledge. The Emberclaw saw only the light. They didn't see the WORDS. The stars speak, and I am learning their grammar.", "wonder")],
		"defeat_story": [ShardLore.dialogue("Cmdr Hoshikami", "The fragments' Heat frequency interfered with sigil resonance. Emberclaw fire disrupts celestial harmonics. Need shielded sigil arrays.", "frustrated")],
		"player_army": ["Cmdr Hoshikami", "Veilbound Sigil Bearers", "Ink Sigil Crafters", "Flow Adepts", "Shrine Wardens"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Pyroclaw Drenna", "Emberclaw Warriors", "Silent Wing Scouts", "Flameborn Guard", "Bonfire Keepers"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["Fragment recovery mission. Secure shard objectives.", "Veilbound Sigil Bearers amplify fragment power.", "Ink Sigil Crafters inscribe protective wards.", "Flow Adepts channel Ritual Flow to power sigils.", "Shrine Wardens protect the fragment sites.", "Hoshikami fights at range with sigil projections."],
		"battle_modifiers": {"label": "The First Sigil", "description": "Fragment resonance. Shard objectives give bonus resources.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Sigil War",
		"objectives_text": "Counter Iron Dominion grid technology with star sigil interference.",
		"pre_story": [ShardLore.dialogue("Cmdr Hoshikami", "The Grid. The Iron Dominion's communication and command network runs on crystallized computation — logic made manifest in infrastructure. My sigils operate on a fundamentally different principle: they channel MEANING, not logic. Logic can be computed. Meaning must be UNDERSTOOD. I hypothesize that star sigil interference will disrupt grid frequencies because meaning cannot be processed by pure logic — it requires consciousness, context, interpretation. The grid has none of these. Therefore: sigil frequencies should cause grid errors that no amount of redundancy can fix.", "academic")],
		"post_story": [ShardLore.dialogue("Cmdr Hoshikami", "The hypothesis was correct. Star sigil frequencies injected meaning-patterns into the grid, and the grid's logical processors couldn't parse them. Not errors — PARADOXES. Sentences that were simultaneously true and false, commands that required subjective interpretation, instructions that only consciousness could decode. The grid froze. Not from damage — from CONFUSION. I didn't break their technology. I asked it a question it couldn't answer.", "triumphant")],
		"defeat_story": [ShardLore.dialogue("Cmdr Hoshikami", "They adapted. The grid isolated my sigil frequencies and treated them as noise — filtering meaning like static. Pure logic is immune to philosophy if it refuses to engage with it.", "puzzled")],
		"player_army": ["Cmdr Hoshikami", "Veilbound Sigil Bearers", "Ink Sigil Crafters", "Spirit Monolith", "Lantern Bearers", "Phantom Ward Constructs"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Lady Aetheris", "Clockwork Infantry", "Aether Engineers", "Gearwright Artillery", "Steam Sentinels", "Clockwork Grenadiers"],
		"battle_size": "standard",
		"scenario": "supply_lines",
		"round_limit": 6,
		"tutorial_tips": ["Sigil interference mission. Disrupt enemy infrastructure.", "Spirit Monolith broadcasts sigil frequencies across the field.", "Ink Sigil Crafters inscribe disruption patterns on terrain.", "Lantern Bearers illuminate Grid nodes for targeting.", "Phantom Ward Constructs shield your sigil emitters.", "Veilbound Sigil Bearers are your primary disruptors."],
		"battle_modifiers": {"label": "Sigil War", "description": "Sigil interference. All support units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "Stars Against Shadow",
		"objectives_text": "Use star sigils to purify Nightfang corruption from a sacred site.",
		"pre_story": [ShardLore.dialogue("Cmdr Hoshikami", "The Shrine of Reflected Stars — one of our most sacred sites. Now corrupted by Nightfang blood magic, its reflection pools showing only darkness, its sigil stones defaced with blood runes. Corruption operates on the frequency of hunger — it consumes, distorts, absorbs. Star sigils operate on the frequency of clarity — they illuminate, define, REVEAL. Corruption depends on obscuring truth. My sigils strip away all obscurity. This is not a battle of power. It is a battle of TRUTH against LIES, of starlight against shadow.", "solemn")],
		"post_story": [ShardLore.dialogue("Cmdr Hoshikami", "The corruption burned away like fog before sunrise. Not because my sigils were stronger — because corruption IS a lie, and star sigils reveal truth. Every blood rune, when illuminated by starlight, showed its true nature: not power, but PARASITISM. And parasitism cannot survive exposure. The reflection pools clear. The sigil stones shine. The stars are reflected once more, and in their reflection, the future becomes readable again.", "reverent")],
		"defeat_story": [ShardLore.dialogue("Cmdr Hoshikami", "The corruption was not lies — it was a DIFFERENT truth. Hunger is real. Consumption is real. The Nightfang do not corrupt reality — they reveal an aspect of it I refuse to accept.", "shaken")],
		"player_army": ["Cmdr Hoshikami", "Veilbound Sigil Bearers", "Ink Sigil Crafters", "Hollow Shrine Guardians", "Spirit Healer Monks", "Lotus Ascetics", "Banner of Silent Prayer"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["The Crimson Prophet", "Blood Thralls", "Corruption Spreaders", "Hunger Priests", "Blood Reavers", "Plague Horde"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Purification mission. Hold the shrine and cleanse it.", "Hollow Shrine Guardians defend the sacred site.", "Ink Sigil Crafters cleanse corruption with purification sigils.", "Spirit Healer Monks remove corruption debuffs.", "Lotus Ascetics meditate to amplify sigil power.", "Banner of Silent Prayer boosts morale near the shrine.", "Hold the hill. Purify. The stars will do the rest."],
		"battle_modifiers": {"label": "Stars Against Shadow", "description": "Purification aura. All units gain +1 DEF near objectives.", "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Constellation Complete",
		"objectives_text": "Activate the complete Constellation Sigil against a Thornweft army and reshape the battlefield with star patterns.",
		"pre_story": [
			ShardLore.dialogue("Cmdr Hoshikami", "The Constellation Sigil is complete. All twelve star-patterns aligned, all frequencies harmonized, all meanings resolved into a single coherent sentence in the language of creation. When I activate it, reality itself will hear the sentence and OBEY. Not through force — through MEANING. The stars wrote the rules of reality. My sigil READS those rules aloud, and reality remembers what it's supposed to be. The Thornweft weave fate. I READ what fate is MADE of.", "transcendent"),
			ShardLore.narration("Hoshikami drew the final constellation in the air with her fragment-inscribed brush. Twelve points of starlight connected by lines of pure meaning — not light, not energy, but SIGNIFICANCE. The pattern was beautiful in a way that had nothing to do with aesthetics and everything to do with truth. It was the shape of something that had always been true but had never been SAID."),
		],
		"post_story": [
			ShardLore.narration("The Constellation Sigil activated, and reality listened. Not dramatic — no explosion, no shockwave, no cataclysm. Just... CLARITY. Everything became exactly what it was. Lies dissolved. Distortions straightened. Corruptions purified. The battlefield became a place of absolute truth, and in that truth, the Veilbound stood revealed as what they were: guardians of meaning, keepers of significance, readers of the stars."),
			ShardLore.dialogue("Cmdr Hoshikami", "The stars wrote the world. The fragments remember the words. The sigils speak them aloud. And I... I am just the reader. The one who learned to see what was always written above us, in the language of light and distance and time. Hoshikami — Star Spirit. Not because I command the stars. Because the stars... chose to speak through me.", "peaceful"),
		],
		"defeat_story": [ShardLore.dialogue("Cmdr Hoshikami", "The Thornweft fate-threads interfered with constellation alignment. Their weaving isn't separate from reality — it IS reality, in a form I didn't account for. The stars wrote the world, but the spiders REWOVE it.", "profound_doubt")],
		"player_army": ["Cmdr Hoshikami", "Veilbound Sigil Bearers", "Ink Sigil Crafters", "Spirit Monolith", "Hollow Shrine Guardians", "Lotus Ascendant Monolith", "Flow Adepts", "Spirit Healer Monks", "Lantern Bearers", "Shrine Artificers"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Thread-Seer Kythara", "Thread-Warden Infantry", "Gossamer Guard", "Tremor Sentinels", "Fate-Thread Weavers", "Web-Anchor Engineers", "Reality Weavers", "Spiderling Swarm"],
		"battle_size": "epic",
		"scenario": "shardstorm",
		"round_limit": 7,
		"tutorial_tips": ["Activate the Constellation Sigil. Control shard storms.", "Spirit Monolith and Lotus Ascendant Monolith amplify sigils.", "Veilbound Sigil Bearers are your assault mystics.", "Ink Sigil Crafters inscribe defensive wards across the field.", "Hollow Shrine Guardians protect key sigil positions.", "Lantern Bearers illuminate targets for sigil strikes.", "Flow Adepts maximize Ritual Flow for sigil activation.", "This is your masterwork. Every sigil, every fragment, every star."],
		"battle_modifiers": {"label": "The Constellation Complete", "description": "Star Sigil mastery. All units gain +2 ATK, +1 DEF.", "player_atk_bonus": 2, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Cmdr Hoshikami", "The stars are patient teachers. They have been writing their lessons for longer than worlds have existed, and they will continue after worlds end. I am a student — perhaps the first in this age to read their script, certainly not the last. The Star Sigils are not weapons. They are WORDS — and words, spoken with understanding, can reshape anything. Hoshikami looks up, and the stars look back, and between us flows a conversation older than time and more enduring than stone.", "eternal"),
	]
