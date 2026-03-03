class_name EmberclawKoraCampaign
## Flamewarden Kora — "Ashes and Renewal"
## A healer-commander who must learn that resurrection has a cost.
## 4 missions. Teaches support play, Phoenix mechanics, and sacrifice.

static func get_campaign() -> Dictionary:
	return {
		"id": "emberclaw_kora",
		"commander": "Flamewarden Kora",
		"faction_enum": CombatantDefinition.Faction.EMBERCLAW,
		"title": "Ashes and Renewal",
		"description": "Flamewarden Kora carries the Phoenix Flame — the sacred fire that can bring the dead back to life. But in the Shardlands, resurrection draws the attention of something ancient and hungry.",
		"opening_story": _opening_story(),
		"missions": _missions(),
		"ending_story": _ending_story(),
	}

static func _opening_story() -> Array:
	return [
		ShardLore.narration("The Phoenix Flame guttered."),
		ShardLore.narration("In all her years as Flamewarden, Kora had never seen it falter. The sacred fire — passed from healer to healer in an unbroken chain since the founding of the Emberclaw — burned in her chest like a second heart. It healed. It mended. In the direst moments, it could even bring the fallen back from the threshold of death."),
		ShardLore.narration("But here, in this broken world, the flame flickered."),
		ShardLore.dialogue("Flamewarden Kora", "The Phoenix Flame is weakened. Whatever tore us from Ignareth damaged the connection to the source. I can still heal — but resurrection... each time I reach for that power, something reaches back.", "troubled"),
		ShardLore.narration("She gathered her flock — Flameheart Clerics, Divine Acolytes, warriors who fought not for glory but for those beside them — and prepared to do what healers have always done: keep the living alive."),
		ShardLore.fhah_zolg("The healer. How sweet. She thinks her sacred fire can undo what I have done. Let her try. Every resurrection in my domain costs something she hasn't learned to count yet."),
	]

static func _missions() -> Array:
	return [_mission_1(), _mission_2(), _mission_3(), _mission_4()]

static func _mission_1() -> Dictionary:
	return {
		"title": "The Wounded Flame",
		"objectives_text": "Rescue the scattered Emberclaw survivors. Keep Kora alive — she is the only healer.",
		"pre_story": [
			ShardLore.narration("Scattered across the alien terrain, Emberclaw warriors lay wounded and dying. Without the Phoenix Flame, they would be lost."),
			ShardLore.dialogue("Flamewarden Kora", "I can feel them — dozens of fire-souls fading. Move quickly. Every moment we delay, someone dies who could have been saved.", "urgent"),
		],
		"post_story": [
			ShardLore.narration("Kora worked through the night, her hands blazing with Phoenix fire, mending wounds that should have been fatal. Seventeen warriors saved. Three beyond even her power."),
			ShardLore.dialogue("Flamewarden Kora", "The flame still answers. Weakened, yes. Changed, yes. But it answers. We will endure.", "relieved"),
		],
		"defeat_story": [
			ShardLore.dialogue("Flamewarden Kora", "I cannot heal what I cannot reach. Regroup — we approach from a safer angle.", "pained"),
		],
		"player_army": ["Flamewarden Kora", "Ashborn Infantry", "Faithful Guard", "Flameheart Clerics"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Thrall Conscripts", "Thrall Conscripts", "Blood Thralls"],
		"battle_size": "skirmish",
		"scenario": "total_war",
		"round_limit": 8,
		"tutorial_tips": ["Kora is a support commander — her value is healing, not fighting.", "Keep Flameheart Clerics near wounded units for Phoenix Mend.", "Faithful Guard have War Chant of Ash — they bolster morale."],
		"battle_modifiers": {"label": "Flickering Flame", "description": "The Phoenix Flame is weakened. Kora has -1 ATK but heals allies each round.", "player_atk_bonus": -1},
	}

static func _mission_2() -> Dictionary:
	return {
		"title": "Blood and Phoenix",
		"objectives_text": "Defend the field hospital against Nightfang raiders. Protect the wounded.",
		"pre_story": [
			ShardLore.narration("The blood-hunters found the wounded. Of course they did — predators always find the weak."),
			ShardLore.dialogue("Flamewarden Kora", "They come for the wounded. They come for the easy prey. Stand firm — the Phoenix Flame does not abandon its charges.", "fierce"),
		],
		"post_story": [
			ShardLore.narration("The raiders broke against the Flamewarden's line. But in the battle's climax, when a warrior fell with a mortal wound, Kora reached for the deepest power — the Resurrection. The warrior rose, whole and burning. And in the moment of resurrection, Kora felt something watching her from beyond reality. Something fascinated."),
			ShardLore.dialogue("Flamewarden Kora", "The resurrection... it worked. But something noticed. Something vast. When I pulled that soul back from death, something on the other side of death looked at me.", "shaken"),
		],
		"defeat_story": [
			ShardLore.dialogue("Flamewarden Kora", "Too many wounded, too few defenders. We must establish better defenses before healing.", "anguished"),
		],
		"player_army": ["Flamewarden Kora", "Ashborn Infantry", "Faithful Guard", "Flameheart Clerics", "Reborn Phalanx", "Phoenix Guard"],
		"enemy_faction": CombatantDefinition.Faction.VEILBOUND,
		"enemy_army": ["Cmdr Hisame", "Shrine Wardens", "Dreampiercer Archers"],
		"battle_size": "skirmish",
		"scenario": "the_last_stand",
		"round_limit": 7,
		"tutorial_tips": ["Last Stand: defend your hospital positions.", "Phoenix Guard have Phoenix Rebirth — they resurrect once when killed.", "Reborn Phalanx are your toughest infantry. Anchor your line on them."],
		"battle_modifiers": {"label": "Predator's Scent", "description": "The wounded attract predators. Enemy units gain +1 MOV.", "enemy_mov_bonus": 1},
	}

static func _mission_3() -> Dictionary:
	return {
		"title": "The Price of Rebirth",
		"objectives_text": "Push through the Iron Dominion blockade to reach the Phoenix Shrine — a shard nexus that can restore the flame.",
		"pre_story": [
			ShardLore.narration("The Phoenix Shrine called to Kora — a nexus of shard energy that resonated with the sacred flame. If she could reach it, the flame would be restored. But the machine-lord's forces held the approach."),
			ShardLore.dialogue("Flamewarden Kora", "The shrine is our only hope of restoring the Phoenix Flame to full power. The machine-folk stand in the way. They do not understand what they guard.", "determined"),
		],
		"post_story": [
			ShardLore.narration("The shrine blazed with Phoenix fire — the sacred flame restored, doubled, tripled in power. Kora stood at its center, overwhelmed by the intensity, and understood: the Shardlands were not just draining the Phoenix Flame. They were feeding it. Every death in this broken world added fuel to the resurrection fire."),
			ShardLore.dialogue("Flamewarden Kora", "The flame grows stronger with every death in the Shardlands. That is why resurrection draws attention — the more death, the more power, the more that thing beyond the veil notices. The Phoenix Flame was never meant to burn this bright.", "horrified"),
		],
		"defeat_story": [
			ShardLore.dialogue("Flamewarden Kora", "The machines are too well-positioned. We need to find another path to the shrine.", "frustrated"),
		],
		"player_army": ["Flamewarden Kora", "Flameborn Guard", "Reborn Phalanx", "Flameheart Clerics", "Pyromancer Adepts", "Emberknight Riders", "Phoenix Guard"],
		"enemy_faction": CombatantDefinition.Faction.IRON_DOMINION,
		"enemy_army": ["Infantry Regiment", "Infantry Regiment", "Steam Sentinels", "Steam-Powered Sharpshooters", "Gearwright Engineers", "Steam Artillery Crew"],
		"battle_size": "standard",
		"scenario": "shard_clash",
		"round_limit": 6,
		"tutorial_tips": ["Shard Clash: capture nodes to secure the path to the shrine.", "Emberknight Riders can fly over Iron Dominion lines to contest far nodes.", "Phoenix Guard resurrect once — use them aggressively on objectives."],
		"battle_modifiers": {"label": "Phoenix Rising", "description": "The shrine amplifies healing. Your units gain +1 HP.", "player_hp_bonus": 1},
	}

static func _mission_4() -> Dictionary:
	return {
		"title": "Sacred Fire",
		"objectives_text": "Defend the Phoenix Shrine against the combined Nightfang/Thornweft assault. The flame must not fall.",
		"pre_story": [
			ShardLore.narration("They came from both directions — blood-drinkers drawn by the resurrection energy, spider-folk drawn by the fate-threads the Phoenix Flame was weaving. The shrine blazed like a beacon, and every predator in the Shardlands converged."),
			ShardLore.dialogue("Flamewarden Kora", "The flame draws them all. Fire, blood, silk — everything in this world is drawn to the power of resurrection. Very well. Let them come. The Phoenix does not fear death. The Phoenix IS death — and what comes after.", "transcendent"),
		],
		"post_story": [
			ShardLore.narration("The shrine held. The Phoenix Flame burned so brightly that the attackers could not approach — a wall of sacred fire that purified corruption and burned through silk alike. Kora stood at its heart, no longer flickering, no longer uncertain. The flame had found its purpose."),
			ShardLore.dialogue("Flamewarden Kora", "I understand now. The Phoenix Flame is not just healing. It is renewal — the power to take what is broken and make it whole. Not as it was, but as it could be. This world is broken, but it can be made whole. That is my calling. That is why the flame burns.", "certain"),
		],
		"defeat_story": [
			ShardLore.dialogue("Flamewarden Kora", "The flame endures even if the shrine falls. We carry it within us. Retreat — and burn brighter next time.", "resolute"),
		],
		"player_army": ["Flamewarden Kora", "Flameborn Guard", "Reborn Phalanx", "Scorched Veterans", "Flameheart Clerics", "Phoenix Guard", "Pyromancer Circle", "Pyroclast Catapult"],
		"enemy_faction": CombatantDefinition.Faction.NIGHTFANG,
		"enemy_army": ["Blood Reavers", "Nightfang Warriors", "Tiger Berserkers", "Blood Shamans", "Shadow Stalkers", "Crimson Behemoth"],
		"battle_size": "standard",
		"scenario": "king_of_the_hill",
		"round_limit": 7,
		"tutorial_tips": ["King of the Hill: hold the shrine at the center.", "Scorched Veterans are nearly unkillable with Kora's healing support.", "Use Pyroclast Catapult to create burning terrain in approach lanes."],
		"battle_modifiers": {"label": "Phoenix Ascendant", "description": "The shrine fully empowers Kora. Your units gain +1 ATK and +1 DEF near the shrine.", "player_atk_bonus": 1, "player_def_bonus": 1},
	}

static func _ending_story() -> Array:
	return [
		ShardLore.narration("Flamewarden Kora stood before the Phoenix Shrine and made her choice."),
		ShardLore.dialogue("Flamewarden Kora", "The Phoenix Flame burns for renewal — not just of flesh, but of worlds. I will carry this fire to wherever Vex leads, and when the coalition meets, I will offer what no army can provide: the promise that what is lost can be reborn.", "purposeful"),
		ShardLore.narration("The sacred fire blazed outward, a beacon of hope in a world built for despair. And beyond the veil, something ancient and lonely watched the flame with an expression that might, in another reality, have been called longing."),
	]
