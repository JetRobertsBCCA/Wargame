class_name IronDominionSteamjawCampaign
## General Steamjaw — "The Iron Fist"
## Melee powerhouse, Morale, Leadership. ATK 18, DEF 5, CMD 9. Frontline general.

static func get_campaign() -> Dictionary:
	return {
		"id": "iron_dominion_steamjaw",
		"commander": "General Steamjaw",
		"faction_enum": CombatantDefinition.Faction.IRON_DOMINION,
		"title": "The Iron Fist",
		"description": "General Steamjaw doesn't command from the rear. He fights in the front line, leading every charge, taking every hit, daring every enemy to face him. His troops would follow him into hell. Several already have.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.dialogue("General Steamjaw", "I don't give speeches. I give orders. And the most important order I ever give is 'Follow me.' Not 'go there.' Not 'attack that.' FOLLOW. ME. If I'm asking my soldiers to fight, I fight with them. If I'm asking them to die, I die first.", "blunt"),
		ShardLore.narration("His mechanical jaw — a steam-powered replacement for the one he lost at the Battle of Iron Gate — clicked and hissed as he spoke. The sound was distinctive. His enemies recognized it. They ran."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "Lead From the Front",
		"objectives_text": "Break through the Emberclaw raiding party. Steamjaw leads.",
		"pre_story": [ShardLore.dialogue("General Steamjaw", "Raiders on the eastern approach. Infantry, form on me. We're going through them, not around them. Anyone who falls behind gets left behind. Anyone who charges ahead of me gets court-martialed. We advance together or not at all.", "commanding")],
		"post_story": [ShardLore.dialogue("General Steamjaw", "Eighteen casualties. I visited every one. Remembered every name. That's what command means — not victories. Names.", "solemn")],
		"defeat_story": [ShardLore.dialogue("General Steamjaw", "I couldn't hold them. MY failure, not theirs. The soldiers fought well. I positioned them badly. Won't happen again.", "self_critical")],
		"player_army": ["General Steamjaw", "Elite Vanguard", "Infantry Regiment", "Clockwork Infantry", "Steam Heavy Guards"],
		"enemy_faction": CombatantDefinition.Faction.EMBERCLAW,
		"enemy_army": ["Emberclaw Warriors", "Emberforged Blades", "Unbonded Berserkers", "Ashrider Scouts"],
		"battle_size": "skirmish",
		"scenario": "broken_ground",
		"round_limit": 6,
		"tutorial_tips": ["Steamjaw has ATK 18 and DEF 5. He IS your best weapon.", "His Leadership and Morale specials buff nearby units. Keep them close.", "Elite Vanguard synergizes with his aggressive style."],
		"battle_modifiers": {"label": "Lead From the Front", "description": "Steamjaw's presence inspires. All units gain +1 ATK.", "player_atk_bonus": 1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Hold Until Relieved",
		"objectives_text": "The supply depot is surrounded. Hold out until reinforcements arrive.",
		"pre_story": [ShardLore.dialogue("General Steamjaw", "Nightfang all around us. No retreat possible. Reinforcements in... six hours? Maybe eight? Doesn't matter. We hold. I've held worse positions with fewer soldiers. Dig in. Stack the barricades. And when they come — and they WILL come — we hit them so hard they wish they'd stayed in whatever hole they crawled out of.", "grim_resolve")],
		"post_story": [
			ShardLore.narration("Eight hours. Fourteen waves. General Steamjaw fought every one of them, his mechanical jaw crunching through the darkness, his soldiers forming an iron wall behind him. When reinforcements finally arrived, they found the General standing atop a pile of Nightfang dead, his armor rent in a dozen places, his jaw clicking arrhythmically."),
			ShardLore.dialogue("General Steamjaw", "What took you so long? We were getting bored.", "dark_humor"),
		],
		"defeat_story": [ShardLore.dialogue("General Steamjaw", "Fall back to the secondary position. Keep formation! KEEP FORMATION! We don't break, not while I'm standing.", "desperate")],
		"player_army": ["General Steamjaw", "Steam Heavy Guards", "Infantry Regiment", "Siege Infantry", "Steam Medic Corps", "Steam Sentinels"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Hoshikami", "Inkblade Initiates", "Starblade Samurai", "Dreambound Riders", "Celestial Slingers", "Spirit Healer Monks"],
		"battle_size": "standard",
		"scenario": "the_last_stand",
		"round_limit": 8,
		"tutorial_tips": ["Last Stand scenario — survive all rounds.", "Steam Medic Corps keeps your troops in the fight. Protect them.", "Steamjaw's CMD 9 helps maintain formation under pressure."],
		"battle_modifiers": {"label": "Hold Until Relieved", "description": "Defensive resolve. All units gain +2 DEF.", "player_def_bonus": 2},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Charge of the Iron Brigade",
		"objectives_text": "Launch a full frontal assault on the Thornweft web-fortress. Take the hill.",
		"pre_story": [ShardLore.dialogue("General Steamjaw", "The hill is fortified. Webs, barricades, spider-nests. Lord Piston would siege it. Lady Brassveil would infiltrate it. I'm going to take four hundred soldiers and walk straight up that hill and plant the Dominion flag on the summit. Sometimes the direct approach is the only honest one.", "decisive")],
		"post_story": [ShardLore.dialogue("General Steamjaw", "Flag's planted. Hill's ours. Cost us — won't pretend it didn't. But the soldiers need to see that some things are still possible through pure courage and iron discipline. We walked up that hill and we took it. No tricks, no subtlety. Just the Iron Brigade and the general who'd die for them.", "proud")],
		"defeat_story": [ShardLore.dialogue("General Steamjaw", "The hill was too well-defended. My stubbornness nearly killed us all. Even I have to learn when the direct approach won't work.", "humbled")],
		"player_army": ["General Steamjaw", "Elite Vanguard", "Clockwork Vanguard", "Steam Shock Infantry", "Infantry Regiment", "Steam Grenadiers", "Gearwright Engineers"],
		"enemy_faction": CombatantDefinition.Faction.THORNWEFT,
		"enemy_army": ["Silk-Marshal Draven", "Gossamer Guard", "Silk-Warden Regulars", "Web-Anchor Engineers", "Spiderling Swarm", "Cocoon Wardens"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["King of the Hill — take and hold the center.", "Steamjaw should lead the charge — his ATK 18 clears defenders.", "Steam Shock Infantry are perfect for breaching fortified positions."],
		"battle_modifiers": {"label": "Iron Brigade", "description": "The Brigade charges together. All units gain +1 ATK and +1 DEF.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "The Iron Fist",
		"objectives_text": "Break the Nightfang siege. Total war — destroy everything that moves.",
		"pre_story": [
			ShardLore.dialogue("General Steamjaw", "Lord Calculon gave me one order: break the siege. He didn't say how. He didn't need to. He knows how I work. The entire Iron Dominion expeditionary force, every unit I can muster, every soldier who can carry a weapon — we're going to hit them with everything we have. The Iron Fist doesn't open. It only closes.", "fierce"),
			ShardLore.narration("His jaw clicked. His soldiers roared. And the Iron Fist closed."),
		],
		"post_story": [
			ShardLore.narration("The battlefield was silent. The Nightfang siege was broken — not just beaten, but shattered beyond any hope of reconstruction. General Steamjaw walked through the wreckage, mechanical jaw clicking steadily, checking on every soldier, learning every injury, remembering every name."),
			ShardLore.dialogue("General Steamjaw", "War isn't about killing. It's about protecting the people behind you. Every life I take is a life that would have taken one of mine. Every battle I win is a battle my soldiers survived. That's what the Iron Fist means. Not rage. Not cruelty. Protection. Through overwhelming, devastating, unstoppable force.", "philosophical"),
		],
		"defeat_story": [ShardLore.dialogue("General Steamjaw", "Not enough. I wasn't enough. I need more soldiers, more machines, more of everything. And I'll get them. The siege isn't over. It's just beginning.", "determined")],
		"player_army": ["General Steamjaw", "Elite Vanguard", "Steam Heavy Guards", "Infantry Regiment", "Clockwork Infantry", "Steam Grenadiers", "Clockwork Titan", "Steam Medic Corps"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Grand Fang Voraxis", "Blood Reavers", "Tiger Berserkers", "Nightfang Warriors", "Shadow Stalkers", "Blood Shamans", "Crimson Behemoth", "Nightfang Dragon"],
		"battle_size": "epic",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Total War — destroy the enemy army.", "Steamjaw's ATK 18, DEF 5, CMD 9 make him the centerpiece.", "The Clockwork Titan provides heavy fire support. Use it.", "Grand Fang Voraxis is a dangerous melee opponent. Engage carefully."],
		"battle_modifiers": {"label": "The Iron Fist", "description": "Total commitment. All units gain +2 ATK.", "player_atk_bonus": 2},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.dialogue("General Steamjaw", "They'll write this campaign in the histories. 'Steamjaw's Shardlands Campaign.' They'll talk about the battles, the victories, the strategies. But they won't write about Private Jenner, who held the line at the supply depot with a broken arm. Or Corporal Voss, who carried three wounded soldiers to safety. Or Sergeant Brightforge, who died holding a doorway so others could retreat. Those are the real stories. Those are the names that matter.", "emotional"),
		ShardLore.narration("His jaw clicked. Once. Twice. Then was silent. General Steamjaw turned and walked back to his soldiers. There was always more to do. More lines to hold. More soldiers to protect. More names to remember."),
	]
