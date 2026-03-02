extends Node
## SkillDatabaseManager — Replaces the old .tscn-based SkillDatabase.
## Creates all Shardborne skill definitions programmatically at startup.
## Accessed via SkillDatabase autoload.

@export var skills: Dictionary = {}

func _ready():
	_register_core_skills()
	_register_faction_skills()
	print("[SkillDatabase] Registered %d skills." % skills.size())

# ══════════════════════════════════════════════════════════════
# CORE COMBAT SKILLS (available to all relevant units)
# ══════════════════════════════════════════════════════════════

func _register_core_skills():
	# ── Melee Attack ──
	var melee = SkillDefinition.new()
	melee.skill_name = "Attack (Melee)"
	melee.skill_type = SkillDefinition.SkillType.MELEE
	melee.target_type = SkillDefinition.TargetType.ENEMY
	melee.description = "Standard melee attack. Roll ATK dice vs target DEF. Hits on >= DEF, 6s are crits (2 dmg)."
	melee.min_range = 1
	melee.max_range = 1
	melee.icon = SpriteGenerator.get_skill_icon("attack_melee")
	skills["attack_melee"] = melee

	# ── Ranged Attack ──
	var ranged = SkillDefinition.new()
	ranged.skill_name = "Attack (Ranged)"
	ranged.skill_type = SkillDefinition.SkillType.RANGED
	ranged.target_type = SkillDefinition.TargetType.ENEMY
	ranged.description = "Ranged attack. Roll ATK dice vs target DEF. Range determined by unit RNG stat."
	ranged.min_range = 2
	ranged.max_range = 12
	ranged.icon = SpriteGenerator.get_skill_icon("attack_ranged")
	skills["attack_ranged"] = ranged

	# ── Basic Magic ──
	var magic = SkillDefinition.new()
	magic.skill_name = "Basic Magic"
	magic.skill_type = SkillDefinition.SkillType.MAGIC
	magic.target_type = SkillDefinition.TargetType.ENEMY
	magic.description = "Magical attack. Roll ATK dice vs target DEF. Ignores cover. Min range 6."
	magic.min_range = 1
	magic.max_range = 6
	magic.ignore_cover = true
	magic.icon = SpriteGenerator.get_skill_icon("basic_magic")
	skills["basic_magic"] = magic

	# ── Rally ──
	var rally = SkillDefinition.new()
	rally.skill_name = "Rally"
	rally.skill_type = SkillDefinition.SkillType.SUPPORT
	rally.target_type = SkillDefinition.TargetType.ALLY
	rally.description = "Rally a Shaken ally within CMD range. Roll 2d6 <= MOR to remove Shaken."
	rally.min_range = 0
	rally.max_range = 6
	rally.icon = SpriteGenerator.get_skill_icon("rally")
	skills["rally"] = rally

	# ── Overwatch ──
	var overwatch = SkillDefinition.new()
	overwatch.skill_name = "Overwatch"
	overwatch.skill_type = SkillDefinition.SkillType.RANGED
	overwatch.target_type = SkillDefinition.TargetType.ENEMY
	overwatch.description = "Set overwatch: shoot at the next enemy that moves into range (half ATK dice)."
	overwatch.min_range = 2
	overwatch.max_range = 12
	overwatch.atk_modifier = -99  # Signals: use half ATK dice (handled in combat)
	overwatch.icon = SpriteGenerator.get_skill_icon("overwatch")
	skills["overwatch"] = overwatch

# ══════════════════════════════════════════════════════════════
# FACTION-SPECIFIC SKILLS
# ══════════════════════════════════════════════════════════════

func _register_faction_skills():
	# ════════════════════ EMBERCLAW WARPACK ════════════════════

	_add_skill("flame_burst", {
		"name": "Flame Burst", "type": SkillDefinition.SkillType.BREATH_WEAPON,
		"desc": "Breath weapon. Cone attack (3 tiles). Roll ATK dice vs all targets. Creates burning terrain.",
		"min_range": 1, "max_range": 3, "is_aoe": true, "cone_length": 3,
		"creates_burning": true, "generates_heat": 2,
		"icon_key": "flame_burst",
	})

	_add_skill("stoke_flames", {
		"name": "Stoke Flames", "type": SkillDefinition.SkillType.SUPPORT,
		"target": SkillDefinition.TargetType.SELF,
		"desc": "Stoke the Heat Pool: +3 Heat. Next melee attack gains +2 ATK dice.",
		"atk_mod": 2, "generates_heat": 3, "heat_cost": 0,
		"icon_key": "stoke_flames",
	})

	_add_skill("inferno_charge", {
		"name": "Inferno Charge", "type": SkillDefinition.SkillType.MELEE,
		"desc": "Devastating charge attack. +3 ATK dice, generates 2 Heat. Must have moved 5+ tiles.",
		"atk_mod": 3, "generates_heat": 2,
		"icon_key": "inferno_charge",
	})

	_add_skill("heat_vent", {
		"name": "Heat Vent", "type": SkillDefinition.SkillType.SPECIAL,
		"target": SkillDefinition.TargetType.AREA,
		"desc": "Vent excess Heat: spend 5 Heat to deal 2 damage to all enemies within 3 tiles.",
		"is_aoe": true, "aoe_radius": 3, "heat_cost": 5,
		"icon_key": "heat_vent",
	})

	_add_skill("pyroclasm", {
		"name": "Pyroclasm", "type": SkillDefinition.SkillType.MAGIC,
		"desc": "Channel fire magic. Spend 3 Heat: deal ATK+2 dice attack at range 8. Creates burning terrain.",
		"min_range": 1, "max_range": 8, "atk_mod": 2, "heat_cost": 3,
		"creates_burning": true,
		"icon_key": "pyroclasm",
	})

	# ════════════════════ IRON DOMINION ════════════════════

	_add_skill("shield_wall", {
		"name": "Shield Wall", "type": SkillDefinition.SkillType.SUPPORT,
		"target": SkillDefinition.TargetType.SELF,
		"desc": "Form Shield Wall. Adjacent allies gain +1 DEF. Requires Grid Cohesion.",
		"def_mod": 1, "charge_cost": 0,
		"icon_key": "shield_wall",
	})

	_add_skill("fragment_overload", {
		"name": "Fragment Overload", "type": SkillDefinition.SkillType.SPECIAL,
		"target": SkillDefinition.TargetType.AREA,
		"desc": "Overload a Fragment. Deal 3 damage to all units within 2 tiles. Destroy the Fragment.",
		"is_aoe": true, "aoe_radius": 2, "charge_cost": 3,
		"icon_key": "fragment_overload",
	})

	_add_skill("coordinated_fire", {
		"name": "Coordinated Fire", "type": SkillDefinition.SkillType.RANGED,
		"desc": "Coordinated volley with Grid Cohesion bonus. +2 ATK dice if 2+ allies adjacent.",
		"min_range": 2, "max_range": 10, "atk_mod": 2,
		"icon_key": "coordinated_fire",
	})

	_add_skill("repair", {
		"name": "Field Repair", "type": SkillDefinition.SkillType.SUPPORT,
		"target": SkillDefinition.TargetType.ALLY,
		"desc": "Repair an allied War Machine or construct. Restore 2 HP.",
		"min_range": 1, "max_range": 1, "heals": 2,
		"icon_key": "repair",
	})

	_add_skill("artillery_barrage", {
		"name": "Artillery Barrage", "type": SkillDefinition.SkillType.RANGED,
		"desc": "Heavy artillery strike. +4 ATK dice, minimum range 4. Can't move and fire.",
		"min_range": 4, "max_range": 16, "atk_mod": 4,
		"icon_key": "artillery_barrage",
	})

	# ════════════════════ NIGHTFANG DOMINION ════════════════════

	_add_skill("corrupt_bite", {
		"name": "Corrupt Bite", "type": SkillDefinition.SkillType.MELEE,
		"desc": "Melee attack that applies Corruption tokens. Corrupted units suffer -1 DEF per token.",
		"corruption_tokens": 2,
		"icon_key": "corrupt_bite",
	})

	_add_skill("blood_tithe", {
		"name": "Blood Tithe", "type": SkillDefinition.SkillType.SPECIAL,
		"target": SkillDefinition.TargetType.SELF,
		"desc": "Sacrifice 1 HP to gain +2 ATK dice on next attack. Feeds the Hunger Pool.",
		"hp_cost": 1, "atk_mod": 2,
		"icon_key": "blood_tithe",
	})

	_add_skill("shadow_step", {
		"name": "Shadow Step", "type": SkillDefinition.SkillType.SPECIAL,
		"target": SkillDefinition.TargetType.SELF,
		"desc": "Teleport to any tile within 6 tiles that is in shadow/darkness terrain.",
		"min_range": 1, "max_range": 6,
		"icon_key": "shadow_step",
	})

	_add_skill("feast", {
		"name": "Feast", "type": SkillDefinition.SkillType.SPECIAL,
		"target": SkillDefinition.TargetType.ENEMY,
		"desc": "Consume a destroyed enemy to restore HP. +3 Hunger Pool. Only on newly killed targets.",
		"heals": 3,
		"icon_key": "feast",
	})

	_add_skill("terror_shriek", {
		"name": "Terror Shriek", "type": SkillDefinition.SkillType.SPECIAL,
		"target": SkillDefinition.TargetType.AREA,
		"desc": "Emit a terrifying shriek. All enemies within 4 tiles must pass MOR check or become Shaken.",
		"is_aoe": true, "aoe_radius": 4, "status_effect": "shaken",
		"icon_key": "terror_shriek",
	})

	# ════════════════════ THORNWEFT MATRIARCHY ════════════════════

	_add_skill("web_snare", {
		"name": "Web Snare", "type": SkillDefinition.SkillType.RANGED,
		"desc": "Ranged web attack. Target is Engaged (can't move) for 1 turn. Creates web terrain.",
		"min_range": 1, "max_range": 8, "creates_web": true, "status_effect": "engaged",
		"icon_key": "web_snare",
	})

	_add_skill("fate_weave", {
		"name": "Fate Weave", "type": SkillDefinition.SkillType.SUPPORT,
		"target": SkillDefinition.TargetType.ALLY,
		"desc": "Spend 1 Fate Thread to reroll all failed attack dice for an ally this turn.",
		"fate_cost": 1,
		"icon_key": "fate_weave",
	})

	_add_skill("gossamer_trap", {
		"name": "Gossamer Trap", "type": SkillDefinition.SkillType.SPECIAL,
		"target": SkillDefinition.TargetType.AREA,
		"desc": "Place a hidden trap at a tile. First enemy to enter takes 2 damage and is Engaged.",
		"min_range": 1, "max_range": 6, "creates_web": true,
		"icon_key": "gossamer_trap",
	})

	_add_skill("anchor_pulse", {
		"name": "Anchor Pulse", "type": SkillDefinition.SkillType.SUPPORT,
		"target": SkillDefinition.TargetType.AREA,
		"desc": "Web-Anchor emits a pulse. All Thornweft units within 4 tiles gain +1 DEF until next turn.",
		"is_aoe": true, "aoe_radius": 4, "def_mod": 1,
		"icon_key": "anchor_pulse",
	})

	_add_skill("natures_wrath", {
		"name": "Nature's Wrath", "type": SkillDefinition.SkillType.MAGIC,
		"desc": "Channel nature magic through the web network. ATK+3 ranged spell. Requires Web-Anchor adjacency.",
		"min_range": 1, "max_range": 10, "atk_mod": 3, "fate_cost": 2,
		"icon_key": "natures_wrath",
	})

	# ════════════════════ VEILBOUND SHOGUNATE ════════════════════

	_add_skill("stance_strike", {
		"name": "Stance Strike", "type": SkillDefinition.SkillType.MELEE,
		"desc": "Melee attack modified by current Stance. Aggressive: +2 ATK. Defensive: +1 DEF. Balanced: +1/+1.",
		"flow_cost": 1,
		"icon_key": "stance_strike",
	})

	_add_skill("ritual_channel", {
		"name": "Ritual Channel", "type": SkillDefinition.SkillType.SUPPORT,
		"target": SkillDefinition.TargetType.SELF,
		"desc": "Channel ritual energy. Generate 3 Flow. All allies within 3 tiles gain +1 MOR until next turn.",
		"generates_flow": 3, "is_aoe": true, "aoe_radius": 3,
		"icon_key": "ritual_channel",
	})

	_add_skill("phase_strike", {
		"name": "Phase Strike", "type": SkillDefinition.SkillType.MELEE,
		"desc": "Strike through the Veil. Ignore cover and terrain penalties. Costs 2 Flow.",
		"ignore_cover": true, "flow_cost": 2,
		"icon_key": "phase_strike",
	})

	_add_skill("veil_walk", {
		"name": "Veil Walk", "type": SkillDefinition.SkillType.SPECIAL,
		"target": SkillDefinition.TargetType.SELF,
		"desc": "Step through the Veil. Teleport up to 8 tiles. Costs 3 Flow.",
		"min_range": 1, "max_range": 8, "flow_cost": 3,
		"icon_key": "veil_walk",
	})

	_add_skill("honor_guard", {
		"name": "Honor Guard", "type": SkillDefinition.SkillType.SUPPORT,
		"target": SkillDefinition.TargetType.ALLY,
		"desc": "Designate an ally as protected. Redirect 1 hit per attack to this unit instead.",
		"min_range": 1, "max_range": 2, "flow_cost": 1,
		"icon_key": "honor_guard",
	})

# ══════════════════════════════════════════════════════════════
# SKILL REGISTRATION HELPER
# ══════════════════════════════════════════════════════════════

func _add_skill(key: String, data: Dictionary):
	var skill = SkillDefinition.new()
	skill.skill_name = data.get("name", key)
	skill.skill_type = data.get("type", SkillDefinition.SkillType.MELEE)
	skill.target_type = data.get("target", SkillDefinition.TargetType.ENEMY)
	skill.description = data.get("desc", "")
	skill.min_range = data.get("min_range", 1)
	skill.max_range = data.get("max_range", 1)
	skill.atk_modifier = data.get("atk_mod", 0)
	skill.def_modifier = data.get("def_mod", 0)
	skill.damage_modifier = data.get("damage_mod", 0)
	skill.ignore_cover = data.get("ignore_cover", false)
	skill.ignore_armor = data.get("ignore_armor", 0)
	skill.is_aoe = data.get("is_aoe", false)
	skill.aoe_radius = data.get("aoe_radius", 0)
	skill.cone_length = data.get("cone_length", 0)
	skill.cp_cost = data.get("cp_cost", 0)
	skill.heat_cost = data.get("heat_cost", 0)
	skill.flow_cost = data.get("flow_cost", 0)
	skill.fate_cost = data.get("fate_cost", 0)
	skill.charge_cost = data.get("charge_cost", 0)
	skill.hp_cost = data.get("hp_cost", 0)
	skill.cooldown = data.get("cooldown", 0)
	skill.uses_per_game = data.get("uses_per_game", -1)
	skill.creates_burning_terrain = data.get("creates_burning", false)
	skill.creates_web_terrain = data.get("creates_web", false)
	skill.corruption_tokens = data.get("corruption_tokens", 0)
	skill.generates_heat = data.get("generates_heat", 0)
	skill.generates_flow = data.get("generates_flow", 0)
	skill.heals = data.get("heals", 0)
	skill.status_effect = data.get("status_effect", "")
	skill.icon = SpriteGenerator.get_skill_icon(data.get("icon_key", key))
	skills[key] = skill
