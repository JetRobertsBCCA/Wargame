class_name VeilboundTsukihanaCampaign
## Ritual Cpt Tsukihana — "The Moon Blossom"
## Flow manipulation, Healing. ATK 15, DEF 4, HP 27, CMD 7.

static func get_campaign() -> Dictionary:
	return {
		"id": "veilbound_tsukihana",
		"commander": "Ritual Cpt Tsukihana",
		"faction_enum": CombatantDefinition.Faction.VEILBOUND,
		"title": "The Moon Blossom",
		"description": "Ritual Captain Tsukihana heals through Flow — mending not just flesh but spirit. The moon blossom opens at night, when the world needs light most.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("Ritual Cpt Tsukihana", "Healing is not the absence of war. Healing is war's truest purpose — for what use is victory if nothing survives to enjoy it? I learned Flow healing in the moonlit gardens of Reishima, where wounds of body and spirit were mended beneath blossoming trees. In the Shardlands, there are no gardens. But the moon still shines, the Flow still mends, and Tsukihana still heals.", "gentle_strength"),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Healer's First Lesson",
		"objectives_text": "Keep the warband alive through sustained Emberclaw pressure using Flow healing.",
		"pre_story": [ShardLore.dialogue("Ritual Cpt Tsukihana", "Burns. The Emberclaw deal burns. Spirit Healer Monks can mend flesh, but fire-damaged spirit channels require Flow restoration — something only a ritual specialist can provide. I position myself with the healers behind the front line. Every wound that reaches us returns to the fight mended and Flow-reinforced. The Emberclaw will discover that their fire creates wounds that heal STRONGER than the original tissue.", "compassionate")],
		"post_story": [ShardLore.dialogue("Ritual Cpt Tsukihana", "Not one warrior lost. Every wound mended, every spirit channel restored, every fighter returned to their position. The Emberclaw hit our line with everything they had and our strength GREW. Because healing is not just restoration — it is IMPROVEMENT. A mended warrior understands their vulnerability. A Flow-healed warrior understands their strength.", "warm")],
		"defeat_story": [ShardLore.dialogue("Ritual Cpt Tsukihana", "Too many casualties too quickly. My healing capacity was overwhelmed. I need more Spirit Healer Monks — and better positioning.", "saddened")],
		"player_army": ["Ritual Cpt Tsukihana", "Spirit Healer Monks", "Flow Adepts", "Temple Defenders", "Shrine Wardens"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Flamewarden Kora", "Emberclaw Warriors", "Unbonded Berserkers", "Pyromancer Adepts"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 6,
		"tutorial_tips": ["Tsukihana heals through Flow manipulation.", "Spirit Healer Monks provide direct healing to wounded units.", "Flow Adepts amplify Tsukihana's healing range.", "Temple Defenders absorb damage; Tsukihana keeps them fighting.", "Don't try to kill the enemy fast. Keep your army alive. The enemy tires."],
		"battle_modifiers": {"label": "The Healer's First Lesson", "description": "Flow healing active. All units regenerate each round.", "player_def_bonus": 2},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Moonlit Restoration",
		"objectives_text": "Heal a corrupted shrine and its defenders while fending off continued Nightfang incursion.",
		"pre_story": [ShardLore.dialogue("Ritual Cpt Tsukihana", "The shrine has been touched by Nightfang corruption — not destroyed, but TAINTED. The spirit channels that flow through it are choked with dark energy. I can cleanse it, but I need time. The warriors hold the perimeter while I work my rituals. Flow healing cleanses corruption the way moonlight cleanses shadow — slowly, gently, thoroughly. There is no shortcut for proper healing. There is only patience and care.", "focused_calm")],
		"post_story": [ShardLore.dialogue("Ritual Cpt Tsukihana", "The shrine blooms again. Clean Flow courses through restored channels. The corruption is not just removed — it is REPLACED with positive energy that will resist future contamination. That is the difference between cleansing and healing. Cleansing removes the bad. Healing grows the good. The Moon Blossom doesn't fight darkness. She grows light.", "radiant")],
		"defeat_story": [ShardLore.dialogue("Ritual Cpt Tsukihana", "The corruption was too deep. It had bonded with the shrine's foundations. My surface-level Flow healing couldn't reach the roots. I need deeper ritual techniques.", "determined_sadness")],
		"player_army": ["Ritual Cpt Tsukihana", "Spirit Healer Monks", "Flow Adepts", "Ritual Captains", "Temple Defenders", "Shrine Wardens", "Lantern Bearers"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Lady Hemora", "Blood Reavers", "Corrupted Militia", "Corruption Spreaders", "Blight Hound Pack", "Corruption Guard"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["Heal the shrine while defending it.", "Lantern Bearers provide Lantern Light — pushes back corruption.", "Spirit Healer Monks heal both warriors and the shrine.", "Flow Adepts amplify healing range and intensity.", "Focus on cleansing the center. Hold the perimeter against incursion."],
		"battle_modifiers": {"label": "Moonlit Restoration", "description": "Healing aura. All units gain +1 DEF and regenerate.", "player_def_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Spirit Garden",
		"objectives_text": "Establish a healing station that sustains the entire Veilbound army through a protracted battle.",
		"pre_story": [ShardLore.dialogue("Ritual Cpt Tsukihana", "The Thornweft attrition warfare seeks to wear us down — venom, traps, slow constriction. They think time is their ally. They haven't met Tsukihana's Spirit Garden. I'm establishing a multi-layered healing infrastructure: Spirit Healer Monks for direct wounds, Flow Adepts for spiritual restoration, and at the center, the Spirit Temple Walker — a walking shrine that radiates healing across the entire formation. Let the Thornweft try their slow war. We'll outlast the spiders.", "confident")],
		"post_story": [ShardLore.dialogue("Ritual Cpt Tsukihana", "Three hours of continuous engagement, and our fighting strength at the end was HIGHER than at the beginning. The Spirit Garden grew throughout the battle — each healing cycle making the next one more efficient. The Thornweft expected attrition to wear us down. Instead, attrition made us stronger. Because that is the nature of Flow healing: it doesn't just restore. It grows.", "blooming")],
		"defeat_story": [ShardLore.dialogue("Ritual Cpt Tsukihana", "Their venom poisoned the Flow channels themselves. My healing became toxic. I was hurting my own warriors. The Thornweft understand spiritual infrastructure on a level I must study.", "horrified")],
		"player_army": ["Ritual Cpt Tsukihana", "Spirit Healer Monks", "Flow Adepts", "Spirit Temple Walker", "Temple Defenders", "Starblade Samurai", "Lotus Ascetics", "Banner of Silent Prayer"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Warden Morthis", "Thread-Warden Infantry", "Venom Dancers", "Web-Spinner Sappers", "Gossamer Trap Layers", "Venom Alchemists", "Venom Mortar"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Spirit Garden — layered healing keeps the army fighting.", "Spirit Temple Walker is the healing anchor. Protect it.", "Flow Adepts extend healing range across the formation.", "Temple Defenders hold the line; healing keeps them indefinitely.", "Banner of Silent Prayer boosts morale against venom attrition.", "Outlast the attrition. Your healing outpaces their damage."],
		"battle_modifiers": {"label": "The Spirit Garden", "description": "Full healing infrastructure. All units regenerate significantly.", "player_def_bonus": 2},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Moon Blossom",
		"objectives_text": "Channel the full power of Flow healing in a decisive battle that proves preservation defeats destruction.",
		"pre_story": [
			ShardLore.dialogue("Ritual Cpt Tsukihana", "The moon blossom opens only at night, when the world is darkest. It blooms not despite the darkness, but BECAUSE of it — drawing strength from the need for light. Today is the Shogunate's darkest hour. Our eastern flank is pressed by the combined forces of our enemies. Many would despair. I bloom. Every Flow channel in this region answers to my ritual. Every spirit healer receives my amplification. Every wounded warrior is touched by the Moon Blossom's light. We will not just survive this battle. We will be TRANSFORMED by it.", "transcendent_compassion"),
			ShardLore.narration("The Moon Blossom opened. Not a literal flower, but a Flow construct so beautiful that even combatants paused to watch — a cascading pattern of silver light that spread from Tsukihana's position across the entire battlefield. Where it touched Veilbound warriors, wounds closed and spirits lifted. The Spirit Temple Walker amplified the effect until the entire army glowed with lunar radiance."),
		],
		"post_story": [
			ShardLore.narration("After the battle, warriors described a feeling of absolute well-being — not just healed, but WHOLE. Scars from previous battles had faded. Chronic injuries were resolved. Even spiritual damage from corruption exposure was cleansed. Ritual Captain Tsukihana had not merely healed an army. She had healed an ARMY'S SOUL."),
			ShardLore.dialogue("Ritual Cpt Tsukihana", "The moon does not fight the darkness. It simply shines, and the darkness recedes on its own. That is my way. I do not fight our enemies. I heal our warriors so completely, so thoroughly, so absolutely, that fighting becomes unnecessary. A perfectly healed army is an invincible army. And the Moon Blossom's healing is perfect. Not because I am perfect — but because the need for healing is perfect. And I answer every need.", "final_peace"),
		],
		"defeat_story": [ShardLore.dialogue("Ritual Cpt Tsukihana", "Even the Moon Blossom has limits. The destruction was overwhelming — faster than any healing could match. Some wounds... cannot be mended. I must accept this truth.", "grief")],
		"player_army": ["Ritual Cpt Tsukihana", "Spirit Healer Monks", "Flow Adepts", "Ritual Captains", "Spirit Temple Walker", "Lotus Ascendant Monolith", "Temple Defenders", "Starblade Samurai", "Kintsugi Blademasters", "Banner of Silent Prayer"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Lord Sanguinar", "Plague Knights", "Blood Reavers", "Corruption Spreaders", "Elder Tiger Horror", "Corrupted Militia", "Plague Horde", "Thrall Riders"],
		"battle_size": "epic",
		"scenario": "shardstorm",
		"round_limit": 8,
		"tutorial_tips": ["The Moon Blossom — ultimate healing power.", "Lotus Ascendant Monolith provides massive Flow regeneration.", "Spirit Temple Walker heals everything in its aura.", "Kintsugi Blademasters grow stronger when damaged — heal them after.", "Shardstorm adds chaos. Your healing counters the storm damage.", "You cannot be destroyed faster than you can heal. Test that."],
		"battle_modifiers": {"label": "The Moon Blossom", "description": "Total Flow healing. All units regenerate and gain +2 DEF.", "player_def_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("Ritual Cpt Tsukihana", "The blossom opens. The blossom closes. The blossom opens again. That is the cycle — not of war, but of healing. Every wound is an invitation to mend. Every darkness is an invitation to bloom. I am Tsukihana — the Moon Blossom — and I will heal this broken world one warrior, one spirit, one flower at a time.", "final"),
	]
