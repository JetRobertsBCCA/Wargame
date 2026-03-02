extends Node
class_name Combat

## Shardborne TRPG Combat Manager
## Full implementation: d6 dice pool combat, faction mechanics, cards, morale, phases.

const UnitLabel = preload("res://ui/unit_label.gd")

signal register_combat(combat_node: Node)
signal turn_advanced(combatant: Dictionary)
signal combatant_added(combatant: Dictionary)
signal combatant_died(combatant: Dictionary)
signal update_turn_queue(combatants: Array, turn_queue: Array)
signal update_information(text: String)
signal update_combatants(combatants: Array)
signal combat_finished()

var combatants = []

enum Group { PLAYERS, ENEMIES }

var groups = [
	[], # players
	[], # enemies
]

var current_combatant = 0
var turn = 0
var turn_queue = []
var round_number = 1

@export var game_ui: Control
@export var controller: CController

# ══════════════════════════════════════════════════════════════
# FACTION STATE
# ══════════════════════════════════════════════════════════════

## Per-side faction state (index 0 = player, 1 = enemy)
var faction_state = [{}, {}]

## Track which factions each side is using
var side_faction = [-1, -1]

## Command Points per side
var command_points = [0, 0]

# ══════════════════════════════════════════════════════════════
# CARD SYSTEM STATE
# ══════════════════════════════════════════════════════════════

var card_decks = [[], []]  # Per-side draw piles
var card_hands = [[], []]  # Per-side hands
var card_discard = [[], []]  # Per-side discard piles

# ══════════════════════════════════════════════════════════════
# SCENARIO SYSTEM
# ══════════════════════════════════════════════════════════════

var scenario_manager: Node = null

## Guard flag to prevent double combat_finish / advance after game ends
var _combat_over := false

# ══════════════════════════════════════════════════════════════
# INITIALIZATION
# ══════════════════════════════════════════════════════════════

func _ready():
	emit_signal("register_combat", self)
	randomize()

	# Handle end-of-combat
	combat_finished.connect(_on_combat_finished)

	# Check for army builder / BattleConfig data
	if BattleConfig.has_custom_armies:
		_setup_from_battle_config()
	else:
		_setup_demo_battle()

	# Generate initial CP from commanders
	_generate_command_points(0)
	_generate_command_points(1)

	# Build and draw starting cards
	_build_deck(0)
	_build_deck(1)
	_draw_cards(0, GameRules.STARTING_HAND_SIZE)
	_draw_cards(1, GameRules.STARTING_HAND_SIZE)

	# Announce battle start
	var p_faction = FactionDatabase.FACTIONS.get(side_faction[0], {}).get("name", "Player")
	var e_faction = FactionDatabase.FACTIONS.get(side_faction[1], {}).get("name", "Enemy")
	update_information.emit("[color=gold]═══ SHARDBORNE: %s vs %s ═══[/color]\n" % [p_faction, e_faction])

	# Setup scenario
	scenario_manager = preload("res://combat/scenario_manager.gd").new()
	add_child(scenario_manager)
	var scenario_type = BattleConfig.scenario_type if BattleConfig.has_custom_armies else "total_war"
	var round_limit = BattleConfig.round_limit if BattleConfig.has_custom_armies else 6
	scenario_manager.setup(scenario_type, self, round_limit)
	scenario_manager.scenario_ended.connect(_on_scenario_ended)
	update_information.emit("[color=silver]Scenario: %s[/color]\n" % scenario_manager.get_scenario_name())
	update_information.emit("[color=silver]%s[/color]\n" % scenario_manager.get_scenario_description())

	update_information.emit("Round %d begins.\n" % round_number)

	emit_signal("update_turn_queue", combatants, turn_queue)
	controller.set_controlled_combatant(combatants[turn_queue[0]])
	game_ui.set_skill_list(combatants[turn_queue[0]].skill_list)

	# Update UI with faction state and card hand
	if game_ui.has_method("update_faction_resources"):
		game_ui.update_faction_resources(faction_state[0])
	if game_ui.has_method("update_card_hand"):
		game_ui.update_card_hand(card_hands[0])

	# Clear BattleConfig so Quick Battle from menu works normally next time
	BattleConfig.clear()

## Setup from Army Builder selections
func _setup_from_battle_config():
	side_faction[0] = BattleConfig.player_faction
	side_faction[1] = BattleConfig.enemy_faction
	_init_faction_state(0, side_faction[0])
	_init_faction_state(1, side_faction[1])

	# Place player units on left side, avoiding collisions
	var occupied_cells: Array[Vector2i] = []
	for unit_name in BattleConfig.player_army:
		var pos = _find_open_cell(Vector2i(2, 2), Vector2i(5, 18), occupied_cells)
		occupied_cells.append(pos)
		_add_unit_by_name(unit_name, 0, pos)

	# Place enemy units on right side
	for unit_name in BattleConfig.enemy_army:
		var pos = _find_open_cell(Vector2i(11, 2), Vector2i(14, 18), occupied_cells)
		occupied_cells.append(pos)
		_add_unit_by_name(unit_name, 1, pos)

## Find an open cell in the given rectangle, avoiding occupied_cells
func _find_open_cell(start: Vector2i, end: Vector2i, occupied: Array[Vector2i]) -> Vector2i:
	for y in range(start.y, end.y + 1, 2):
		for x in range(start.x, end.x + 1):
			var pos = Vector2i(x, y)
			if pos not in occupied:
				return pos
	# Fallback: scan odd rows
	for y in range(start.y + 1, end.y + 1, 2):
		for x in range(start.x, end.x + 1):
			var pos = Vector2i(x, y)
			if pos not in occupied:
				return pos
	# Last resort
	return Vector2i(start.x, start.y)

## Fallback demo battle (Quick Battle from menu)
func _setup_demo_battle():
	side_faction[0] = CombatantDefinition.Faction.EMBERCLAW
	side_faction[1] = CombatantDefinition.Faction.IRON_DOMINION
	_init_faction_state(0, side_faction[0])
	_init_faction_state(1, side_faction[1])

	# Player side — Emberclaw
	_add_unit_by_name("Scorchcaller Vex", 0, Vector2i(3, 5))
	_add_unit_by_name("Flameborn Guard", 0, Vector2i(4, 7))
	_add_unit_by_name("Emberclaw Warriors", 0, Vector2i(4, 3))
	_add_unit_by_name("Pyromancer Adepts", 0, Vector2i(2, 5))

	# Enemy side — Iron Dominion
	_add_unit_by_name("Commander Ironweld", 1, Vector2i(12, 5))
	_add_unit_by_name("Elite Vanguard", 1, Vector2i(11, 3))
	_add_unit_by_name("Clockwork Infantry", 1, Vector2i(11, 7))
	_add_unit_by_name("Steam-Powered Sharpshooters", 1, Vector2i(13, 5))

func _add_unit_by_name(unit_name: String, side: int, pos: Vector2i) -> void:
	var def := FactionDatabase.get_unit(unit_name)
	if def == null:
		push_warning("Unit not found in FactionDatabase: " + unit_name)
		return
	add_combatant(create_combatant(def), side, pos)

# ══════════════════════════════════════════════════════════════
# FACTION STATE INITIALIZATION
# ══════════════════════════════════════════════════════════════

func _init_faction_state(side: int, faction: int) -> void:
	match faction:
		CombatantDefinition.Faction.EMBERCLAW:
			faction_state[side] = {
				"heat": 0,
				"heat_max": GameRules.HEAT_MAX,
				"overheat_this_round": false,
			}
		CombatantDefinition.Faction.IRON_DOMINION:
			faction_state[side] = {
				"grid_cohesion": 0,  # Recalculated per unit
				"fragments_placed": 0,
			}
		CombatantDefinition.Faction.NIGHTFANG:
			faction_state[side] = {
				"hunger": 0,
				"hunger_tier": "peckish",  # peckish, ravenous, gorged
			}
		CombatantDefinition.Faction.THORNWEFT:
			faction_state[side] = {
				"fate_threads": 0,
				"web_anchors": [],  # Positions of deployed anchors
				"teleports_used": 0,
			}
		CombatantDefinition.Faction.VEILBOUND:
			faction_state[side] = {
				"flow": 0,
				"flow_max": GameRules.FLOW_MAX,
				"flow_tier": "none",
				"active_stance": "balanced",  # balanced, honor, revelation
			}
		_:
			faction_state[side] = {}


# ══════════════════════════════════════════════════════════════
# COMBATANT CREATION
# ══════════════════════════════════════════════════════════════

func create_combatant(definition: CombatantDefinition, override_name: String = "") -> Dictionary:
	var skill_list: Array[String] = []
	# All units get melee attack
	skill_list.append("attack_melee")
	# Ranged units also get ranged attack
	if definition.rng > 1:
		skill_list.append("attack_ranged")
	# Fragment users / magic
	if definition.has_special("Fragment User") or definition.has_special("Magic"):
		skill_list.append("basic_magic")
	# Commanders get Rally
	if definition.is_commander():
		skill_list.append("rally")
	# Ranged units get Overwatch (optional)
	if definition.rng > 1:
		skill_list.append("overwatch")
	# Append faction-specific skills based on specials
	_assign_faction_skills(definition, skill_list)
	# Append any skills from definition
	if definition.skills.size() > 0:
		for sk in definition.skills:
			if sk not in skill_list:
				skill_list.append(sk)

	var comb = {
		"name": definition.unit_name if override_name.is_empty() else override_name,
		"definition": definition,
		# ── Core Shardborne Stats ──
		"atk": definition.atk,
		"defense": definition.defense,
		"max_hp": definition.max_hp,
		"hp": definition.max_hp,
		"mov": definition.mov,
		"rng": definition.rng,
		"mor": definition.mor,
		"cmd": definition.cmd,
		"pts": definition.pts,
		# ── Combat State ──
		"alive": true,
		"shaken": false,
		"turn_taken": false,
		"has_charged": false,
		"atk_modifier": 0,
		"def_modifier": 0,
		"mor_modifier": 0,
		# ── Faction-Specific State ──
		"corruption_tokens": 0,  # Nightfang: corruption on this unit
		"overwatch_active": false,
		"stance": "balanced",    # Veilbound stance
		"guarding": "",          # Honor Guard: name of unit being guarded
		"guarded_by": "",        # Honor Guard: name of unit guarding this one
		# ── Status Effects ──
		"status_effects": [],    # Array of active status effect keys
		# ── Legacy Compatibility ──
		"class": definition.class_t,
		"movement_class": definition.class_m,
		"movement": definition.movement,
		"initiative": definition.initiative,
		"skill_list": skill_list,
		# ── Visual ──
		"icon": definition.icon,
		"map_sprite": definition.map_sprite,
	}
	return comb

func _assign_faction_skills(def: CombatantDefinition, skills: Array) -> void:
	match def.faction:
		CombatantDefinition.Faction.EMBERCLAW:
			if def.has_special("Breath Weapon"):
				skills.append("flame_burst")
			if def.has_special("Fire"):
				skills.append("stoke_flames")
			if def.unit_type == CombatantDefinition.UnitType.CAVALRY:
				skills.append("inferno_charge")
			if def.is_commander():
				skills.append("heat_vent")

		CombatantDefinition.Faction.IRON_DOMINION:
			if def.has_special("Grid Node") or def.has_special("Shield Wall"):
				skills.append("shield_wall")
			if def.has_special("Fragment User"):
				skills.append("fragment_overload")
			if def.rng > 1 and def.has_special("Grid Node"):
				skills.append("coordinated_fire")
			if def.has_special("Repair") or def.unit_type == CombatantDefinition.UnitType.SUPPORT:
				skills.append("repair")
			if def.unit_type == CombatantDefinition.UnitType.ARTILLERY:
				skills.append("artillery_barrage")

		CombatantDefinition.Faction.NIGHTFANG:
			if def.has_special("Corruption Spread") or def.corruption_spread > 0:
				skills.append("corrupt_bite")
			if def.has_special("Blood") or def.is_commander():
				skills.append("blood_tithe")
			if def.has_special("Shadow Meld") or def.has_special("Mist Form"):
				skills.append("shadow_step")
			if def.has_special("Blood Drain"):
				skills.append("feast")
			if def.has_special("Terror"):
				skills.append("terror_shriek")

		CombatantDefinition.Faction.THORNWEFT:
			if def.has_special("Web-Walk") or def.rng > 1:
				skills.append("web_snare")
			if def.is_commander() or def.unit_type == CombatantDefinition.UnitType.SUPPORT:
				skills.append("fate_weave")
			if def.has_special("Silk Camouflage"):
				skills.append("gossamer_trap")
			if def.is_commander():
				skills.append("anchor_pulse")

		CombatantDefinition.Faction.VEILBOUND:
			if def.has_special("Stance"):
				skills.append("stance_strike")
			if def.unit_type == CombatantDefinition.UnitType.SUPPORT or def.is_commander():
				skills.append("ritual_channel")
			if def.has_special("Spirit Glide") or def.has_special("Void Resolve"):
				skills.append("phase_strike")
			if def.is_commander():
				skills.append("veil_walk")
			if def.has_special("Temple Vow"):
				skills.append("honor_guard")


# ══════════════════════════════════════════════════════════════
# TURN MANAGEMENT
# ══════════════════════════════════════════════════════════════

func sort_turn_queue(a, b):
	return combatants[b].initiative < combatants[a].initiative

func add_combatant(combatant: Dictionary, side: int, position: Vector2i):
	combatant["position"] = position
	combatant["side"] = side
	combatants.append(combatant)
	groups[side].append(combatants.size() - 1)

	var new_combatant_sprite = Sprite2D.new()
	new_combatant_sprite.texture = combatant.map_sprite
	$"../Terrain/TileMap".add_child(new_combatant_sprite)
	new_combatant_sprite.position = Vector2(position * 32.0) + Vector2(16, 16)
	new_combatant_sprite.z_index = 1
	new_combatant_sprite.hframes = 2
	if side == 0:
		new_combatant_sprite.flip_h = true
	else:
		combatant["initiative"] -= 1
	combatant["sprite"] = new_combatant_sprite

	# Floating name + HP bar
	var label_node = Node2D.new()
	label_node.set_script(UnitLabel)
	label_node.combatant = combatant
	label_node.side_color = Color(0.4, 0.8, 1.0) if side == 0 else Color(1.0, 0.45, 0.35)
	new_combatant_sprite.add_child(label_node)

	turn_queue.append(combatants.size() - 1)
	turn_queue.sort_custom(sort_turn_queue)
	emit_signal("combatant_added", combatant)

func get_current_combatant():
	return combatants[current_combatant]

func get_distance(attacker: Dictionary, target: Dictionary) -> int:
	var p1 = attacker.position
	var p2 = target.position
	return absi(p1.x - p2.x) + absi(p1.y - p2.y)

func set_next_combatant():
	turn += 1
	if turn >= turn_queue.size():
		# ── New Round ──
		round_number += 1
		# Reset modifiers BEFORE round-start effects so corruption/buffs stick
		for comb in combatants:
			comb.turn_taken = false
			comb.has_charged = false
			comb.atk_modifier = 0
			comb.def_modifier = 0
			comb.mor_modifier = 0
			comb.overwatch_active = false
		_on_round_start()
		turn = 0
	current_combatant = turn_queue[turn]

func advance_turn():
	if _combat_over:
		return
	combatants[current_combatant].turn_taken = true
	set_next_combatant()
	while !combatants[current_combatant].alive:
		set_next_combatant()
	var comb = combatants[current_combatant]

	# Per-unit turn start effects (may skip turn via return, but never recurse)
	if _on_unit_turn_start(comb):
		return  # Unit's turn was consumed (e.g. corruption); _on_unit_turn_start calls advance_turn itself

	emit_signal("turn_advanced", comb)
	emit_signal("update_combatants", combatants)

	# Update faction UI for active side
	if game_ui.has_method("update_faction_resources"):
		game_ui.update_faction_resources(faction_state[comb.side])

	if comb.side == 1:
		await get_tree().create_timer(0.6).timeout
		ai_process(comb)


# ══════════════════════════════════════════════════════════════
# ROUND EVENTS
# ══════════════════════════════════════════════════════════════

func _on_round_start():
	update_information.emit("\n[color=gold]═══ Round %d ═══[/color]\n" % round_number)

	# Score objectives from previous round
	if scenario_manager and round_number > 1:
		scenario_manager.on_round_end(round_number - 1)
		update_information.emit("[color=silver]%s[/color]\n" % scenario_manager.get_vp_text())

	# Generate CP for both sides
	_generate_command_points(0)
	_generate_command_points(1)

	# Draw cards
	_draw_cards(0, GameRules.DRAW_PER_TURN)
	_draw_cards(1, GameRules.DRAW_PER_TURN)

	# Update card hand UI for player
	if game_ui and game_ui.has_method("update_card_hand"):
		game_ui.update_card_hand(card_hands[0])

	# Faction-specific round start
	for side in [0, 1]:
		_faction_round_start(side)

	# Update phase indicator
	if game_ui.has_method("update_phase"):
		game_ui.update_phase("Round %d" % round_number)

func _generate_command_points(side: int):
	var cp := 0
	for idx in groups[side]:
		var comb = combatants[idx]
		if comb.alive and comb.cmd > 0:
			cp += comb.cmd
	command_points[side] += cp
	if cp > 0:
		update_information.emit("Side %d generates %d CP (total: %d)\n" % [side, cp, command_points[side]])

func _faction_round_start(side: int):
	var faction = side_faction[side]
	var state = faction_state[side]
	match faction:
		CombatantDefinition.Faction.EMBERCLAW:
			# Heat cooldown
			var cooldown = mini(state.heat, GameRules.HEAT_COOLDOWN_PER_TURN)
			state.heat = maxi(0, state.heat - cooldown)
			state.overheat_this_round = false
			# Generate heat from Fire units
			var fire_heat = 0
			for idx in groups[side]:
				var comb = combatants[idx]
				if comb.alive and comb.definition.has_special("Fire"):
					fire_heat += GameRules.HEAT_GENERATION.get("fire_unit", 1)
			state.heat = mini(state.heat + fire_heat, state.heat_max)
			if cooldown > 0 or fire_heat > 0:
				update_information.emit("[color=orange]Emberclaw Heat: -%d cooldown, +%d fire units = %d[/color]\n" % [
					cooldown, fire_heat, state.heat])

		CombatantDefinition.Faction.IRON_DOMINION:
			# Recalculate grid cohesion for all units
			_recalculate_grid_cohesion(side)

		CombatantDefinition.Faction.NIGHTFANG:
			# Process corruption on enemy units
			_process_corruption_effects()

		CombatantDefinition.Faction.THORNWEFT:
			# Generate Fate Threads
			var threads = mini(GameRules.MAX_FATE_THREADS_PER_TURN, _count_web_anchors(side))
			state.fate_threads += threads
			state.teleports_used = 0
			if threads > 0:
				update_information.emit("[color=green]Thornweft gains %d Fate Threads (total: %d)[/color]\n" % [
					threads, state.fate_threads])

		CombatantDefinition.Faction.VEILBOUND:
			# Generate Flow from units
			var flow_gain := 0
			for idx in groups[side]:
				var comb = combatants[idx]
				if comb.alive and comb.definition.flow_value > 0:
					flow_gain += comb.definition.flow_value
			state.flow = mini(state.flow + flow_gain, state.flow_max)
			# Update flow tier
			_update_flow_tier(side)
			if flow_gain > 0:
				update_information.emit("[color=cyan]Veilbound gains %d Flow (total: %d — %s)[/color]\n" % [
					flow_gain, state.flow, state.flow_tier])

## Returns true if the unit's turn was consumed (skip further processing).
func _on_unit_turn_start(comb: Dictionary) -> bool:
	if _combat_over:
		return true
	# Burning damage
	if "burning" in comb.status_effects:
		update_information.emit("[color=orange]%s burns for 1 damage![/color]\n" % comb.name)
		apply_damage(comb, 1)
		if _combat_over:
			return true
		if not comb.alive:
			# Unit died from burn — advance is handled by caller checking alive status
			advance_turn()
			return true

	# Corruption effects
	if comb.corruption_tokens >= 9:
		# Consumed: roll d6, on 1-2 cannot act
		var roll = randi_range(1, 6)
		if roll <= 2:
			update_information.emit("[color=purple]%s is Consumed by corruption and cannot act! (rolled %d)[/color]\n" % [
				comb.name, roll])
			advance_turn()
			return true

	return false


# ══════════════════════════════════════════════════════════════
# SHARDBORNE COMBAT — d6 Dice Pool
# ══════════════════════════════════════════════════════════════

## auto_advance: if true (default), calls advance_turn() at end. Set false for overwatch.
func attack(attacker: Dictionary, target: Dictionary, attack_key: String, auto_advance: bool = true):
	if _combat_over:
		return
	var distance = get_distance(attacker, target)

	# Determine range based on attack type
	var max_range: int = 1
	if attack_key == "attack_ranged":
		max_range = attacker.rng
	elif attack_key == "basic_magic":
		max_range = maxi(attacker.rng, 6)
	# Melee is always range 1

	if distance > max_range:
		update_information.emit("Target out of range (%d / %d).\n" % [distance, max_range])
		if attacker.side == 1:
			advance_turn()
		return

	if distance > 1 and attack_key == "attack_melee":
		update_information.emit("Target too far for melee.\n")
		if attacker.side == 1:
			advance_turn()
		return

	# ── Calculate modifiers ──
	var atk_mod: int = attacker.atk_modifier
	var def_mod: int = target.def_modifier

	# Shaken attacker penalty
	if attacker.shaken:
		atk_mod -= 1

	# Charging bonus
	if attacker.has_charged and attack_key == "attack_melee":
		atk_mod += GameRules.COMBAT_MODIFIERS.get("charging", {}).get("atk_mod", 1)

	# Corruption penalty on target's DEF
	if target.corruption_tokens > 0:
		var corruption_def_pen = _get_corruption_def_penalty(target.corruption_tokens)
		def_mod += corruption_def_pen  # Negative value = easier to hit

	# Faction-specific attack modifiers
	atk_mod += _get_faction_attack_bonus(attacker, target, attack_key)
	def_mod += _get_faction_defense_bonus(target)

	# ── Roll dice ──
	var dice_count: int = maxi(1, attacker.atk + atk_mod)
	var target_def: int = maxi(2, target.defense + def_mod)
	var result = _roll_attack_dice(dice_count, target_def)

	# ── Format roll output ──
	var rolls_str = ""
	for r in result.rolls:
		if r == 6:
			rolls_str += "[color=gold]%d[/color] " % r
		elif r >= target_def:
			rolls_str += "[color=lime]%d[/color] " % r
		else:
			rolls_str += "[color=gray]%d[/color] " % r

	update_information.emit("[color=yellow]%s[/color] attacks [color=red]%s[/color] — [%dd6 vs DEF %d]\n" % [
		attacker.name, target.name, dice_count, target_def])
	update_information.emit("Rolls: %s→ [color=lime]%d hits[/color], [color=gold]%d crits[/color]\n" % [
		rolls_str, result.hits, result.crits])

	# ── Apply damage ──
	if result.total_damage > 0:
		var actual_target = target
		# Honor Guard: redirect damage to guardian if present
		if target.guarded_by != "":
			for c in combatants:
				if c.alive and c.name == target.guarded_by:
					update_information.emit("[color=cyan]%s intercepts the blow for %s![/color]\n" % [c.name, target.name])
					actual_target = c
					# Clear guard after use
					c.guarding = ""
					target.guarded_by = ""
					break
		apply_damage(actual_target, result.total_damage)

		# Post-hit effects
		_on_attack_hit(attacker, actual_target, result, attack_key)
	else:
		update_information.emit("No damage dealt.\n")

	# Post-attack faction effects
	_on_attack_complete(attacker, target, attack_key)

	if _check_combat_over():
		return

	if auto_advance:
		advance_turn()

func _check_combat_over() -> bool:
	if _combat_over:
		return true
	if groups[Group.ENEMIES].size() < 1 or groups[Group.PLAYERS].size() < 1:
		combat_finish()
		return true
	return false

func _roll_attack_dice(dice_count: int, target_def: int) -> Dictionary:
	var hits := 0
	var crits := 0
	var rolls: Array = []
	for i in range(dice_count):
		var roll := randi_range(1, 6)
		rolls.append(roll)
		if roll == 6:
			crits += 1
			hits += 1
		elif roll >= target_def:
			hits += 1
	var total_damage: int = (hits - crits) + (crits * 2)
	return {"hits": hits, "crits": crits, "total_damage": total_damage, "rolls": rolls}

func apply_damage(target: Dictionary, damage: int) -> void:
	target.hp -= damage
	update_combatants.emit(combatants)
	update_information.emit("[color=red]%s[/color] takes [color=gray]%d damage[/color] (%d/%d HP)\n" % [
		target.name, damage, maxi(0, target.hp), target.max_hp])
	if target.hp <= 0:
		combatant_die(target)
	elif target.hp <= target.max_hp / 2:
		# Check morale when below half HP
		check_morale(target)

# Named attack shortcuts for UI skill buttons
func attack_melee(attacker: Dictionary, target: Dictionary):
	attack(attacker, target, "attack_melee")

func attack_ranged(attacker: Dictionary, target: Dictionary):
	attack(attacker, target, "attack_ranged")

func basic_magic(attacker: Dictionary, target: Dictionary):
	attack(attacker, target, "basic_magic")


# ══════════════════════════════════════════════════════════════
# FACTION COMBAT MODIFIERS
# ══════════════════════════════════════════════════════════════

func _get_faction_attack_bonus(attacker: Dictionary, target: Dictionary, attack_key: String) -> int:
	var bonus := 0
	var def: CombatantDefinition = attacker.definition

	match def.faction:
		CombatantDefinition.Faction.EMBERCLAW:
			# Superheated strikes from Heat Pool
			var state = faction_state[attacker.side]
			if state.heat >= 8:  # High Heat bonus
				bonus += 1

		CombatantDefinition.Faction.IRON_DOMINION:
			# Grid Cohesion bonus
			var grid_tier = _get_grid_tier(attacker)
			bonus += grid_tier.get("atk_mod", 0)

		CombatantDefinition.Faction.NIGHTFANG:
			# Pack Tactics
			if def.has_special("Pack Tactics"):
				var nearby_pack = _count_nearby_with_special(attacker, "Pack Tactics", 3)
				if nearby_pack >= 2:
					bonus += 1
			# Blood-Drunk
			if def.has_special("Blood-Drunk") and attacker.hp <= attacker.max_hp / 2:
				bonus += 1

		CombatantDefinition.Faction.VEILBOUND:
			# Stance modifiers
			if attacker.stance == "revelation":
				bonus += 1
			elif attacker.stance == "honor":
				bonus -= 1

		CombatantDefinition.Faction.THORNWEFT:
			# Venom strikes
			if def.has_special("Venom Strike"):
				bonus += 0  # Venom applies tokens, not ATK bonus

	return bonus

func _get_faction_defense_bonus(target: Dictionary) -> int:
	var bonus := 0
	var def: CombatantDefinition = target.definition

	match def.faction:
		CombatantDefinition.Faction.IRON_DOMINION:
			var grid_tier = _get_grid_tier(target)
			bonus += grid_tier.get("def_mod", 0)

		CombatantDefinition.Faction.VEILBOUND:
			if target.stance == "honor":
				bonus += 1
			elif target.stance == "revelation":
				bonus -= 1

		CombatantDefinition.Faction.THORNWEFT:
			# Web tier defense bonus
			var web_tier = _get_web_tier(target)
			bonus += web_tier.get("def_mod", 0)

	return bonus

func _on_attack_hit(attacker: Dictionary, target: Dictionary, result: Dictionary, attack_key: String):
	var a_def: CombatantDefinition = attacker.definition

	# Emberclaw: Generate Heat on fire attacks
	if a_def.faction == CombatantDefinition.Faction.EMBERCLAW:
		if a_def.has_special("Fire") or a_def.has_special("Breath Weapon"):
			var state = faction_state[attacker.side]
			state.heat = mini(state.heat + GameRules.HEAT_GENERATION.get("breath_weapon", 2), state.heat_max)

	# Nightfang: Apply corruption tokens
	if a_def.faction == CombatantDefinition.Faction.NIGHTFANG:
		if attack_key == "attack_melee" and a_def.corruption_spread > 0:
			var tokens = a_def.corruption_spread
			target.corruption_tokens = mini(target.corruption_tokens + tokens, GameRules.MAX_CORRUPTION_TOKENS)
			update_information.emit("[color=purple]%s applies %d corruption to %s (total: %d)[/color]\n" % [
				attacker.name, tokens, target.name, target.corruption_tokens])

	# Nightfang: Blood Drain
	if a_def.has_special("Blood Drain") and not target.alive:
		attacker.hp = mini(attacker.hp + 1, attacker.max_hp)
		update_information.emit("[color=crimson]%s drains blood — heals 1 HP![/color]\n" % attacker.name)
		update_combatants.emit(combatants)

	# Nightfang: Feed Hunger Pool on kill
	if a_def.faction == CombatantDefinition.Faction.NIGHTFANG and not target.alive:
		var state = faction_state[attacker.side]
		state.hunger += 1
		_update_hunger_tier(attacker.side)

func _on_attack_complete(attacker: Dictionary, target: Dictionary, attack_key: String):
	# Emberclaw: Generate heat on fire kill
	if attacker.definition.faction == CombatantDefinition.Faction.EMBERCLAW and not target.alive:
		if attacker.definition.has_special("Fire"):
			var state = faction_state[attacker.side]
			state.heat = mini(state.heat + GameRules.HEAT_GENERATION.get("fire_kill", 1), state.heat_max)

	# Veilbound: Revelation stance generates flow
	if attacker.definition.faction == CombatantDefinition.Faction.VEILBOUND:
		if attacker.stance == "revelation":
			var state = faction_state[attacker.side]
			state.flow = mini(state.flow + 1, state.flow_max)


# ══════════════════════════════════════════════════════════════
# FACTION SKILL IMPLEMENTATIONS
# ══════════════════════════════════════════════════════════════

## Emberclaw: Flame Burst breath weapon
func flame_burst(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	state.heat = mini(state.heat + 2, state.heat_max)
	update_information.emit("[color=orange]%s unleashes Flame Burst! (+2 Heat → %d)[/color]\n" % [
		attacker.name, state.heat])
	# Treat as enhanced melee/ranged attack
	attacker.atk_modifier += 2
	attack(attacker, target, "attack_melee")
	attacker.atk_modifier -= 2

## Emberclaw: Stoke Flames — ATK buff persists until next round reset
func stoke_flames(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	state.heat = mini(state.heat + 3, state.heat_max)
	# Buff ALL friendly Emberclaw units (like stoking the warband's fire)
	for idx in groups[attacker.side]:
		var ally = combatants[idx]
		if ally.alive and get_distance(attacker, ally) <= 4:
			ally.atk_modifier += 1
	update_information.emit("[color=orange]%s Stokes Flames! (Nearby allies +1 ATK, +3 Heat → %d)[/color]\n" % [
		attacker.name, state.heat])
	advance_turn()

## Emberclaw: Inferno Charge
func inferno_charge(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	state.heat = mini(state.heat + 2, state.heat_max)
	update_information.emit("[color=orange]%s launches Inferno Charge![/color]\n" % attacker.name)
	attacker.atk_modifier += 3
	attack(attacker, target, "attack_melee")
	attacker.atk_modifier -= 3

## Emberclaw: Heat Vent
func heat_vent(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	if state.heat < 5:
		update_information.emit("Not enough Heat (need 5, have %d).\n" % state.heat)
		if attacker.side == 1:
			advance_turn()
		return
	state.heat -= 5
	update_information.emit("[color=red]%s vents Heat (-5 → %d)! AoE damage![/color]\n" % [
		attacker.name, state.heat])
	# Damage all enemies within 3 tiles
	var enemy_side = 1 if attacker.side == 0 else 0
	for idx in groups[enemy_side].duplicate():
		var enemy = combatants[idx]
		if enemy.alive and get_distance(attacker, enemy) <= 3:
			apply_damage(enemy, 2)
			if _combat_over:
				return
	if _check_combat_over():
		return
	advance_turn()

## Emberclaw: Pyroclasm
func pyroclasm(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	if state.heat < 3:
		update_information.emit("Not enough Heat (need 3, have %d).\n" % state.heat)
		if attacker.side == 1:
			advance_turn()
		return
	state.heat -= 3
	update_information.emit("[color=red]%s casts Pyroclasm! (-3 Heat → %d)[/color]\n" % [
		attacker.name, state.heat])
	attacker.atk_modifier += 2
	attack(attacker, target, "attack_ranged")
	attacker.atk_modifier -= 2

## Iron Dominion: Shield Wall
func shield_wall(attacker: Dictionary, target: Dictionary):
	# Boost DEF of adjacent allies
	for idx in groups[attacker.side]:
		var ally = combatants[idx]
		if ally.alive and ally != attacker and get_distance(attacker, ally) <= 1:
			ally.def_modifier += 1
			update_information.emit("[color=steel_blue]%s boosts %s DEF via Shield Wall![/color]\n" % [
				attacker.name, ally.name])
	advance_turn()

## Iron Dominion: Fragment Overload
func fragment_overload(attacker: Dictionary, target: Dictionary):
	update_information.emit("[color=steel_blue]%s overloads a Fragment! AoE blast![/color]\n" % attacker.name)
	var enemy_side = 1 if attacker.side == 0 else 0
	for idx in groups[enemy_side].duplicate():
		var enemy = combatants[idx]
		if enemy.alive and get_distance(target, enemy) <= 2:
			apply_damage(enemy, 3)
			if _combat_over:
				return
	if _check_combat_over():
		return
	advance_turn()

## Iron Dominion: Coordinated Fire
func coordinated_fire(attacker: Dictionary, target: Dictionary):
	var adj_count = _count_adjacent_allies(attacker)
	var bonus = 2 if adj_count >= 2 else 0
	update_information.emit("[color=steel_blue]%s fires with coordination (+%d ATK from %d allies)![/color]\n" % [
		attacker.name, bonus, adj_count])
	attacker.atk_modifier += bonus
	attack(attacker, target, "attack_ranged")
	attacker.atk_modifier -= bonus

## Iron Dominion: Field Repair
func repair(attacker: Dictionary, target: Dictionary):
	if target.side != attacker.side:
		update_information.emit("Can only repair allies.\n")
		if attacker.side == 1:
			advance_turn()
		return
	var heal_amount = mini(2, target.max_hp - target.hp)
	target.hp += heal_amount
	update_information.emit("[color=steel_blue]%s repairs %s for %d HP![/color]\n" % [
		attacker.name, target.name, heal_amount])
	update_combatants.emit(combatants)
	advance_turn()

## Iron Dominion: Artillery Barrage
func artillery_barrage(attacker: Dictionary, target: Dictionary):
	var distance = get_distance(attacker, target)
	if distance < 4:
		update_information.emit("Artillery minimum range is 4 tiles.\n")
		if attacker.side == 1:
			advance_turn()
		return
	update_information.emit("[color=steel_blue]%s fires an Artillery Barrage![/color]\n" % attacker.name)
	attacker.atk_modifier += 4
	attack(attacker, target, "attack_ranged")
	attacker.atk_modifier -= 4

## Nightfang: Corrupt Bite
func corrupt_bite(attacker: Dictionary, target: Dictionary):
	update_information.emit("[color=purple]%s delivers a Corrupt Bite![/color]\n" % attacker.name)
	# Higher corruption application than normal melee
	var old_corruption = attacker.definition.corruption_spread
	attacker.definition.corruption_spread = maxi(old_corruption, 2)
	attack(attacker, target, "attack_melee")
	attacker.definition.corruption_spread = old_corruption

## Nightfang: Blood Tithe — Buff ALL nearby Nightfang allies instead of just self
func blood_tithe(attacker: Dictionary, target: Dictionary):
	if attacker.hp <= 1:
		update_information.emit("Not enough HP for Blood Tithe.\n")
		if attacker.side == 1:
			advance_turn()
		return
	attacker.hp -= 1
	var state = faction_state[attacker.side]
	state.hunger += 1
	_update_hunger_tier(attacker.side)
	# Buff nearby allies ATK (persists until round reset)
	for idx in groups[attacker.side]:
		var ally = combatants[idx]
		if ally.alive and get_distance(attacker, ally) <= 3:
			ally.atk_modifier += 1
	update_information.emit("[color=crimson]%s performs Blood Tithe (-1 HP, nearby allies +1 ATK, +1 Hunger → %d)[/color]\n" % [
		attacker.name, state.hunger])
	update_combatants.emit(combatants)
	advance_turn()

## Nightfang: Shadow Step — Teleport to a tile adjacent to target
func shadow_step(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	# Find an empty adjacent tile near the target
	var target_pos = target.position
	var directions = [Vector2i(1,0), Vector2i(-1,0), Vector2i(0,1), Vector2i(0,-1)]
	var teleported := false
	for dir in directions:
		var dest = target_pos + dir
		var occupied := false
		for c in combatants:
			if c.alive and c.position == dest:
				occupied = true
				break
		if not occupied:
			var old_pos = attacker.position
			attacker.position = dest
			attacker.sprite.position = Vector2(dest.x * 32 + 16, dest.y * 32 + 16)
			update_information.emit("[color=purple]%s shadow steps from (%d,%d) to (%d,%d)![/color]\n" % [
				attacker.name, old_pos.x, old_pos.y, dest.x, dest.y])
			teleported = true
			break
	if not teleported:
		update_information.emit("[color=red]No open tile adjacent to target for Shadow Step.[/color]\n")
	update_combatants.emit(combatants)
	advance_turn()

## Nightfang: Feast
func feast(attacker: Dictionary, target: Dictionary):
	if target.alive:
		update_information.emit("Can only feast on destroyed units.\n")
		if attacker.side == 1:
			advance_turn()
		return
	var heal = mini(3, attacker.max_hp - attacker.hp)
	attacker.hp += heal
	var state = faction_state[attacker.side]
	state.hunger += 3
	_update_hunger_tier(attacker.side)
	update_information.emit("[color=crimson]%s feasts! +%d HP, +3 Hunger → %d[/color]\n" % [
		attacker.name, heal, state.hunger])
	update_combatants.emit(combatants)
	advance_turn()

## Nightfang: Terror Shriek
func terror_shriek(attacker: Dictionary, target: Dictionary):
	update_information.emit("[color=purple]%s unleashes a Terror Shriek![/color]\n" % attacker.name)
	var enemy_side = 1 if attacker.side == 0 else 0
	for idx in groups[enemy_side]:
		var enemy = combatants[idx]
		if enemy.alive and get_distance(attacker, enemy) <= 4:
			check_morale(enemy)
	advance_turn()

## Thornweft: Web Snare
func web_snare(attacker: Dictionary, target: Dictionary):
	var distance = get_distance(attacker, target)
	if distance > 8:
		update_information.emit("Target out of web range.\n")
		if attacker.side == 1:
			advance_turn()
		return
	target.status_effects.append("engaged")
	update_information.emit("[color=green]%s snares %s in web! (Engaged for 1 turn)[/color]\n" % [
		attacker.name, target.name])
	advance_turn()

## Thornweft: Fate Weave
func fate_weave(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	if state.fate_threads < 1:
		update_information.emit("No Fate Threads available.\n")
		if attacker.side == 1:
			advance_turn()
		return
	state.fate_threads -= 1
	update_information.emit("[color=green]%s weaves fate for %s! (Reroll failed dice next attack)[/color]\n" % [
		attacker.name, target.name])
	advance_turn()

## Thornweft: Gossamer Trap — Debuffs enemies in area, reduces MOV
func gossamer_trap(attacker: Dictionary, target: Dictionary):
	var trap_radius := 3
	var enemy_side = 1 if attacker.side == 0 else 0
	var caught := 0
	for idx in groups[enemy_side]:
		var enemy = combatants[idx]
		if enemy.alive and get_distance(target, enemy) <= trap_radius:
			enemy.status_effects.append("trapped")
			enemy.atk_modifier -= 1
			caught += 1
	if caught > 0:
		update_information.emit("[color=green]%s places a Gossamer Trap! %d enemies caught (-1 ATK, trapped)[/color]\n" % [
			attacker.name, caught])
	else:
		update_information.emit("[color=green]%s places a Gossamer Trap but no enemies are nearby.[/color]\n" % attacker.name)
	advance_turn()

## Thornweft: Anchor Pulse
func anchor_pulse(attacker: Dictionary, target: Dictionary):
	update_information.emit("[color=green]%s activates Anchor Pulse! +1 DEF to nearby allies.[/color]\n" % attacker.name)
	for idx in groups[attacker.side]:
		var ally = combatants[idx]
		if ally.alive and get_distance(attacker, ally) <= 4:
			ally.def_modifier += 1
	advance_turn()

## Thornweft: Nature's Wrath
func natures_wrath(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	if state.fate_threads < 2:
		update_information.emit("Not enough Fate Threads (need 2).\n")
		if attacker.side == 1:
			advance_turn()
		return
	state.fate_threads -= 2
	update_information.emit("[color=green]%s channels Nature's Wrath![/color]\n" % attacker.name)
	attacker.atk_modifier += 3
	attack(attacker, target, "basic_magic")
	attacker.atk_modifier -= 3

## Veilbound: Stance Strike
func stance_strike(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	if state.flow < 1:
		update_information.emit("Not enough Flow.\n")
		if attacker.side == 1:
			advance_turn()
		return
	state.flow -= 1
	update_information.emit("[color=cyan]%s performs Stance Strike (%s stance)![/color]\n" % [
		attacker.name, attacker.stance])
	attack(attacker, target, "attack_melee")

## Veilbound: Ritual Channel
func ritual_channel(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	state.flow = mini(state.flow + 3, state.flow_max)
	_update_flow_tier(attacker.side)
	# MOR boost to nearby allies
	for idx in groups[attacker.side]:
		var ally = combatants[idx]
		if ally.alive and get_distance(attacker, ally) <= 3:
			ally.mor_modifier += 1
	update_information.emit("[color=cyan]%s channels ritual energy! +3 Flow → %d, nearby allies +1 MOR[/color]\n" % [
		attacker.name, state.flow])
	advance_turn()

## Veilbound: Phase Strike
func phase_strike(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	if state.flow < 2:
		update_information.emit("Not enough Flow (need 2).\n")
		if attacker.side == 1:
			advance_turn()
		return
	state.flow -= 2
	update_information.emit("[color=cyan]%s phases through the Veil to strike![/color]\n" % attacker.name)
	attack(attacker, target, "attack_melee")

## Veilbound: Veil Walk — Teleport to any allied unit's position (+1 tile offset)
func veil_walk(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	if state.flow < 3:
		update_information.emit("Not enough Flow (need 3).\n")
		if attacker.side == 1:
			advance_turn()
		return
	state.flow -= 3
	# Teleport adjacent to a friendly target
	var dirs = [Vector2i(1,0), Vector2i(-1,0), Vector2i(0,1), Vector2i(0,-1)]
	var moved := false
	for dir in dirs:
		var dest = target.position + dir
		var occupied := false
		for c in combatants:
			if c.alive and c.position == dest:
				occupied = true
				break
		if not occupied:
			var old_pos = attacker.position
			attacker.position = dest
			attacker.sprite.position = Vector2(dest.x * 32 + 16, dest.y * 32 + 16)
			update_information.emit("[color=cyan]%s walks through the Veil from (%d,%d) to (%d,%d)![/color]\n" % [
				attacker.name, old_pos.x, old_pos.y, dest.x, dest.y])
			moved = true
			break
	if not moved:
		update_information.emit("[color=red]No open tile near target for Veil Walk.[/color]\n")
	_update_flow_tier(attacker.side)
	update_combatants.emit(combatants)
	advance_turn()

## Veilbound: Honor Guard — Marks attacker as guarding target; next attack on target redirects to guard
func honor_guard(attacker: Dictionary, target: Dictionary):
	var state = faction_state[attacker.side]
	if state.flow < 1:
		update_information.emit("Not enough Flow.\n")
		if attacker.side == 1:
			advance_turn()
		return
	state.flow -= 1
	# Mark the guard relationship
	attacker.guarding = target.name
	target.guarded_by = attacker.name
	update_information.emit("[color=cyan]%s guards %s with honor! (Next attack redirected to guard)[/color]\n" % [attacker.name, target.name])
	advance_turn()

## Rally (universal commander ability)
func rally(attacker: Dictionary, target: Dictionary):
	if target.side != attacker.side:
		update_information.emit("Can only rally allies.\n")
		if attacker.side == 1:
			advance_turn()
		return
	if not target.shaken:
		update_information.emit("%s is not Shaken.\n" % target.name)
		if attacker.side == 1:
			advance_turn()
		return
	var result = roll_morale(target)
	if result.passed:
		target.shaken = false
		update_information.emit("[color=lime]%s rallies %s! Shaken removed.[/color]\n" % [
			attacker.name, target.name])
	else:
		update_information.emit("[color=orange]%s fails to rally %s (rolled %d vs MOR %d)[/color]\n" % [
			attacker.name, target.name, result.total, result.mor])
	advance_turn()

## Overwatch
func overwatch(attacker: Dictionary, target: Dictionary):
	attacker.overwatch_active = true
	update_information.emit("[color=steel_blue]%s sets Overwatch — will fire at next enemy in range.[/color]\n" % attacker.name)
	advance_turn()


# ══════════════════════════════════════════════════════════════
# FACTION HELPERS
# ══════════════════════════════════════════════════════════════

func _get_grid_tier(comb: Dictionary) -> Dictionary:
	var allies_in_range := 0
	var has_support := false
	for idx in groups[comb.side]:
		var ally = combatants[idx]
		if ally != comb and ally.alive and get_distance(comb, ally) <= GameRules.GRID_RANGE:
			allies_in_range += 1
			if ally.definition.unit_type == CombatantDefinition.UnitType.SUPPORT:
				has_support = true
	if allies_in_range >= 3 and has_support:
		return GameRules.GRID_TIERS["fortified"]
	elif allies_in_range >= 2:
		return GameRules.GRID_TIERS["active"]
	elif allies_in_range >= 1:
		return GameRules.GRID_TIERS["connected"]
	else:
		return GameRules.GRID_TIERS["isolated"]

func _recalculate_grid_cohesion(side: int):
	var total_connected := 0
	for idx in groups[side]:
		var comb = combatants[idx]
		if comb.alive:
			var tier = _get_grid_tier(comb)
			if tier.get("atk_mod", 0) > 0:
				total_connected += 1
	faction_state[side].grid_cohesion = total_connected

func _get_corruption_def_penalty(tokens: int) -> int:
	if tokens >= 9:
		return GameRules.CORRUPTION_THRESHOLDS["consumed"]["def_mod"]
	elif tokens >= 6:
		return GameRules.CORRUPTION_THRESHOLDS["corrupted"]["def_mod"]
	elif tokens >= 3:
		return GameRules.CORRUPTION_THRESHOLDS["tainted"]["def_mod"]
	return 0

func _process_corruption_effects():
	for comb in combatants:
		if comb.alive and comb.corruption_tokens > 0:
			var threshold = ""
			if comb.corruption_tokens >= 9:
				threshold = "consumed"
			elif comb.corruption_tokens >= 6:
				threshold = "corrupted"
			elif comb.corruption_tokens >= 3:
				threshold = "tainted"
			if threshold != "":
				var effects = GameRules.CORRUPTION_THRESHOLDS[threshold]
				comb.atk_modifier += effects.get("atk_mod", 0)
				comb.mor_modifier += effects.get("mor_mod", 0)

func _update_hunger_tier(side: int):
	var state = faction_state[side]
	var config = GameRules.BATTLE_SIZES["standard"]["hunger_thresholds"]
	if state.hunger >= config.get("gorged", 15):
		state.hunger_tier = "gorged"
	elif state.hunger >= config.get("ravenous", 10):
		state.hunger_tier = "ravenous"
	else:
		state.hunger_tier = "peckish"

func _count_web_anchors(side: int) -> int:
	return faction_state[side].get("web_anchors", []).size() + GameRules.STARTING_ANCHORS

func _get_web_tier(comb: Dictionary) -> Dictionary:
	var anchor_count = _count_web_anchors(comb.side)
	if anchor_count >= 3:
		return GameRules.WEB_TIERS["enthroned"]
	elif anchor_count >= 2:
		return GameRules.WEB_TIERS["woven"]
	elif anchor_count >= 1:
		return GameRules.WEB_TIERS["threaded"]
	else:
		return GameRules.WEB_TIERS["severed"]

func _update_flow_tier(side: int):
	var state = faction_state[side]
	if state.flow >= 30:
		state.flow_tier = "ascendant"
	elif state.flow >= 20:
		state.flow_tier = "overflowing"
	elif state.flow >= 12:
		state.flow_tier = "surging"
	elif state.flow >= 5:
		state.flow_tier = "stirring"
	else:
		state.flow_tier = "none"

func _count_adjacent_allies(comb: Dictionary) -> int:
	var count := 0
	for idx in groups[comb.side]:
		var ally = combatants[idx]
		if ally != comb and ally.alive and get_distance(comb, ally) <= 1:
			count += 1
	return count

func _count_nearby_with_special(comb: Dictionary, special: String, range_tiles: int) -> int:
	var count := 0
	for idx in groups[comb.side]:
		var ally = combatants[idx]
		if ally != comb and ally.alive and get_distance(comb, ally) <= range_tiles:
			if ally.definition.has_special(special):
				count += 1
	return count


# ══════════════════════════════════════════════════════════════
# MORALE (Shardborne)
# ══════════════════════════════════════════════════════════════

func roll_morale(comb: Dictionary) -> Dictionary:
	var d1 := randi_range(1, 6)
	var d2 := randi_range(1, 6)
	var total := d1 + d2
	var mor: int = comb.mor + comb.mor_modifier
	var aura_applied := false
	# Commander aura: +1 MOR if commander within 8 tiles
	for idx in groups[comb.side]:
		var ally = combatants[idx]
		if ally != comb and ally.alive and ally.definition.is_commander():
			if get_distance(comb, ally) <= 8:
				mor += 1
				aura_applied = true
				break
	if aura_applied:
		update_information.emit("[color=silver]  (%s gains +1 MOR from commander aura)[/color]\n" % comb.name)
	var passed := total <= mor
	var margin := mor - total
	return {"passed": passed, "d1": d1, "d2": d2, "total": total, "mor": mor, "margin": margin}

func check_morale(comb: Dictionary) -> void:
	if comb.mor >= 10:
		return  # Fearless
	if comb.definition.has_special("Fearless"):
		return
	if comb.definition.has_special("Thrall") or comb.definition.has_special("Expendable"):
		return  # No morale check needed

	var result = roll_morale(comb)
	if result.passed:
		update_information.emit("[color=lime]%s[/color] passes morale (%d vs MOR %d)\n" % [
			comb.name, result.total, result.mor])
	else:
		if comb.shaken:
			update_information.emit("[color=red]%s[/color] ROUTED! (failed morale while Shaken)\n" % [comb.name])
			combatant_die(comb)
		else:
			comb.shaken = true
			update_information.emit("[color=orange]%s[/color] is SHAKEN (%d vs MOR %d)\n" % [
				comb.name, result.total, result.mor])


# ══════════════════════════════════════════════════════════════
# DEATH & COMPLETION
# ══════════════════════════════════════════════════════════════

func combatant_die(combatant: Dictionary):
	var comb_id = combatants.find(combatant)
	if comb_id != -1:
		combatant.alive = false
		groups[combatant.side].erase(comb_id)
		update_information.emit("[color=red]%s[/color] destroyed.\n" % [combatant.name])

		# Score kill VP
		var killer_side = 1 if combatant.side == 0 else 0
		if scenario_manager:
			scenario_manager.on_unit_killed(killer_side, combatant.definition)

	combatant.sprite.frame = 1
	combatant_died.emit(combatant)

	# Check if combat is over
	if groups[Group.PLAYERS].size() < 1 or groups[Group.ENEMIES].size() < 1:
		combat_finish()

func combat_finish():
	if _combat_over:
		return
	_combat_over = true
	var winner = "Players" if groups[Group.PLAYERS].size() > 0 else "Enemies"
	update_information.emit("\n[color=gold]══ Combat Over — %s win! ══[/color]\n" % winner)
	if scenario_manager:
		update_information.emit("[color=silver]Final %s[/color]\n" % scenario_manager.get_vp_text())
	emit_signal("combat_finished")

func _on_scenario_ended(winner_side: int, player_vp: int, enemy_vp: int):
	if _combat_over:
		return
	var winner_name = "Players" if winner_side == 0 else "Enemies"
	update_information.emit("\n[color=gold]══ Scenario Complete — %s win by objectives! ══[/color]\n" % winner_name)
	update_information.emit("[color=silver]Final VP: Player %d — Enemy %d[/color]\n" % [player_vp, enemy_vp])
	_combat_over = true
	emit_signal("combat_finished")

func _on_combat_finished():
	# Disable further input
	if controller:
		controller.player_turn = false
	if game_ui and game_ui.has_method("set_skill_list"):
		game_ui.set_skill_list([])

	# Gather results data
	var winner = "Players" if groups[Group.PLAYERS].size() > 0 else "Enemies"
	var player_surviving := 0
	var player_lost := 0
	var enemy_surviving := 0
	var enemy_lost := 0
	for comb in combatants:
		if comb.side == 0:
			if comb.alive:
				player_surviving += 1
			else:
				player_lost += 1
		else:
			if comb.alive:
				enemy_surviving += 1
			else:
				enemy_lost += 1
	var player_vp := 0
	var enemy_vp := 0
	var scenario_name := "Total War"
	if scenario_manager:
		player_vp = scenario_manager.vp[0]
		enemy_vp = scenario_manager.vp[1]
		scenario_name = scenario_manager.get_scenario_name()

	var p_faction = FactionDatabase.FACTIONS.get(side_faction[0], {}).get("name", "Player")
	var e_faction = FactionDatabase.FACTIONS.get(side_faction[1], {}).get("name", "Enemy")

	var results := {
		"winner": winner,
		"scenario": scenario_name,
		"round": round_number,
		"player_faction": p_faction,
		"enemy_faction": e_faction,
		"player_vp": player_vp,
		"enemy_vp": enemy_vp,
		"player_surviving": player_surviving,
		"player_lost": player_lost,
		"enemy_surviving": enemy_surviving,
		"enemy_lost": enemy_lost,
	}

	if game_ui and game_ui.has_method("show_results_screen"):
		game_ui.show_results_screen(results)
	else:
		# Fallback: wait and return to menu
		await get_tree().create_timer(4.0).timeout
		get_tree().change_scene_to_file("res://scenes/main_menu.tscn")


# ══════════════════════════════════════════════════════════════
# CARD SYSTEM
# ══════════════════════════════════════════════════════════════

func _build_deck(side: int):
	# Generate a basic card deck for the faction
	var faction = side_faction[side]
	var deck = []

	# Command cards (spend CP for effects)
	deck.append(_make_card("Tactical Advance", "command", "All units +1 MOV this turn.", {"mov_bonus": 1}))
	deck.append(_make_card("Inspire", "command", "Remove Shaken from 1 unit.", {"remove_shaken": true}))
	deck.append(_make_card("Reinforce", "command", "1 unit heals 2 HP.", {"heal": 2}))
	deck.append(_make_card("War Cry", "command", "All units +1 ATK this turn.", {"atk_bonus": 1}))
	deck.append(_make_card("Fortify", "command", "All units +1 DEF this turn.", {"def_bonus": 1}))

	# Tactical cards (reactive effects)
	deck.append(_make_card("Counter Strike", "tactical", "After being attacked, immediately attack back.", {"counter": true}))
	deck.append(_make_card("Evasion", "tactical", "1 unit gains +2 DEF against next attack.", {"def_bonus": 2}))
	deck.append(_make_card("Ambush", "tactical", "1 ranged unit fires without provoking.", {"ambush": true}))

	# Faction-specific cards
	match faction:
		CombatantDefinition.Faction.EMBERCLAW:
			deck.append(_make_card("Firestorm", "fragment", "Spend 5 Heat: 2 dmg to all enemies in 4 tiles.", {"aoe_damage": 2, "heat_cost": 5}))
			deck.append(_make_card("Drake Fury", "fragment", "1 Fire unit +3 ATK this turn.", {"atk_bonus": 3}))
			deck.append(_make_card("Thermal Surge", "tactical", "All Fire units generate +1 Heat.", {"heat_gain": 1}))
		CombatantDefinition.Faction.IRON_DOMINION:
			deck.append(_make_card("Grid Override", "fragment", "All Grid units gain Fortified tier.", {"grid_override": true}))
			deck.append(_make_card("Fragment Charge", "fragment", "1 Fragment User fires at +3 ATK.", {"atk_bonus": 3}))
			deck.append(_make_card("Mechanical March", "tactical", "All War Machines +2 MOV.", {"wm_mov": 2}))
		CombatantDefinition.Faction.NIGHTFANG:
			deck.append(_make_card("Blood Frenzy", "fragment", "All units +1 ATK. Commander takes 1 dmg.", {"atk_bonus": 1, "cmd_damage": 1}))
			deck.append(_make_card("Corruption Wave", "fragment", "+2 Corruption to all enemies within 6\".", {"corruption_aoe": 2}))
			deck.append(_make_card("Shadow Shroud", "tactical", "All Nightfang units gain Stealth this turn.", {"stealth": true}))
		CombatantDefinition.Faction.THORNWEFT:
			deck.append(_make_card("Web Expansion", "fragment", "Place 2 Web-Anchors.", {"anchors": 2}))
			deck.append(_make_card("Fate Sever", "fragment", "Spend 3 Fate Threads: negate enemy card.", {"negate": true, "fate_cost": 3}))
			deck.append(_make_card("Nature's Shield", "tactical", "All units near Anchors +2 DEF.", {"def_bonus": 2}))
		CombatantDefinition.Faction.VEILBOUND:
			deck.append(_make_card("Stance Shift", "fragment", "All Stance units switch stance for free + bonus.", {"stance_shift": true}))
			deck.append(_make_card("Veil Rift", "fragment", "Spend 5 Flow: teleport 1 unit anywhere.", {"teleport": true, "flow_cost": 5}))
			deck.append(_make_card("Spirit Surge", "tactical", "+3 Flow. 1 unit attacks at +2 ATK.", {"flow_gain": 3, "atk_bonus": 2}))

	# Pad to deck size
	while deck.size() < GameRules.DECK_SIZE:
		deck.append(_make_card("Tactical Reserve", "tactical", "Draw 1 extra card.", {"draw": 1}))

	deck.shuffle()
	card_decks[side] = deck

func _make_card(card_name: String, card_type: String, desc: String, effects: Dictionary, cp_cost: int = 1) -> Dictionary:
	return {
		"name": card_name,
		"type": card_type,
		"description": desc,
		"effects": effects,
		"cp_cost": cp_cost,
	}

func _draw_cards(side: int, count: int):
	for i in range(count):
		if card_hands[side].size() >= GameRules.MAX_HAND_SIZE:
			break
		if card_decks[side].is_empty():
			# Shuffle discard back
			card_decks[side] = card_discard[side].duplicate()
			card_discard[side].clear()
			card_decks[side].shuffle()
		if not card_decks[side].is_empty():
			card_hands[side].append(card_decks[side].pop_back())

## Play a card from hand (called from UI)
func play_card(card: Dictionary):
	var side = 0  # Player side
	if card not in card_hands[side]:
		return
	# Check CP cost
	var cp_cost = card.get("cp_cost", 1)
	if command_points[side] < cp_cost:
		update_information.emit("[color=red]Not enough Command Points (%d needed, have %d)[/color]\n" % [cp_cost, command_points[side]])
		return
	command_points[side] -= cp_cost
	card_hands[side].erase(card)
	card_discard[side].append(card)
	var effects = card.get("effects", {})

	update_information.emit("[color=gold]Card played: %s (-%d CP)[/color]\n" % [card.name, cp_cost])

	# Apply card effects
	if effects.has("atk_bonus"):
		for idx in groups[side]:
			combatants[idx].atk_modifier += effects.atk_bonus

	if effects.has("def_bonus"):
		for idx in groups[side]:
			combatants[idx].def_modifier += effects.def_bonus

	if effects.has("mov_bonus"):
		for idx in groups[side]:
			combatants[idx].mov += effects.mov_bonus

	if effects.has("heal"):
		# Heal the current combatant
		var comb = get_current_combatant()
		comb.hp = mini(comb.hp + effects.heal, comb.max_hp)
		update_combatants.emit(combatants)

	if effects.has("remove_shaken"):
		for idx in groups[side]:
			if combatants[idx].shaken:
				combatants[idx].shaken = false
				update_information.emit("%s rallied by card!\n" % combatants[idx].name)
				break

	if effects.has("draw"):
		_draw_cards(side, effects.draw)

	# Update hand in UI
	if game_ui.has_method("update_card_hand"):
		game_ui.update_card_hand(card_hands[side])


# ══════════════════════════════════════════════════════════════
# AI
# ══════════════════════════════════════════════════════════════

func ai_process(comb: Dictionary):
	if _combat_over:
		return

	# AI plays a card at start of its first unit's turn each round
	_ai_try_play_card()

	var nearest_target: Dictionary
	var nearest_dist := INF

	for target_idx in groups[Group.PLAYERS]:
		var target = combatants[target_idx]
		var dist = get_distance(comb, target)
		if dist < nearest_dist:
			nearest_dist = dist
			nearest_target = target

	if nearest_target.is_empty():
		advance_turn()
		return

	var attack_key := "attack_melee"
	if comb.rng > 1 and nearest_dist <= comb.rng and nearest_dist > 1:
		attack_key = "attack_ranged"

	if nearest_dist <= 1:
		attack(comb, nearest_target, "attack_melee")
		return

	if comb.rng > 1 and nearest_dist <= comb.rng:
		attack(comb, nearest_target, "attack_ranged")
		return

	# Move toward target then attack if in range
	await controller.ai_process(nearest_target.position)

	# Check for overwatch from player units
	_check_overwatch(comb)

	if not comb.alive:
		return  # Killed by overwatch

	if get_distance(comb, nearest_target) <= 1:
		attack(comb, nearest_target, "attack_melee")
	elif comb.rng > 1 and get_distance(comb, nearest_target) <= comb.rng:
		attack(comb, nearest_target, "attack_ranged")
	else:
		advance_turn()

## Check if any enemies with overwatch can fire at a unit that just moved.
## Uses auto_advance=false so it does NOT consume a turn.
func _check_overwatch(mover: Dictionary):
	if _combat_over:
		return
	var enemy_side = 1 if mover.side == 0 else 0
	for idx in groups[enemy_side]:
		var watcher = combatants[idx]
		if watcher.alive and watcher.overwatch_active:
			var dist = get_distance(watcher, mover)
			if dist <= watcher.rng and dist > 0:
				watcher.overwatch_active = false
				update_information.emit("[color=steel_blue]%s fires Overwatch at %s![/color]\n" % [watcher.name, mover.name])
				# Overwatch attack at -1 ATK, auto_advance=false to not skip turns
				watcher.atk_modifier -= 1
				attack(watcher, mover, "attack_ranged" if watcher.rng > 1 else "attack_melee", false)
				watcher.atk_modifier += 1
				break  # Only one overwatch per move

## AI card play — plays one useful card per round if it has CP
func _ai_try_play_card():
	var side := 1
	if card_hands[side].is_empty() or command_points[side] <= 0:
		return
	# Prioritize: War Cry > Fortify > Reinforce > Tactical Reserve
	var priority_names = ["War Cry", "Fortify", "Reinforce", "Tactical Reserve"]
	for pname in priority_names:
		for card in card_hands[side]:
			if card.name == pname:
				var cp_cost = card.get("cp_cost", 1)
				if command_points[side] >= cp_cost:
					command_points[side] -= cp_cost
					card_hands[side].erase(card)
					card_discard[side].append(card)
					var effects = card.get("effects", {})
					update_information.emit("[color=red]Enemy plays: %s[/color]\n" % card.name)
					if effects.has("atk_bonus"):
						for idx in groups[side]:
							combatants[idx].atk_modifier += effects.atk_bonus
					if effects.has("def_bonus"):
						for idx in groups[side]:
							combatants[idx].def_modifier += effects.def_bonus
					if effects.has("heal"):
						# Heal lowest HP enemy unit
						var lowest_hp_comb = null
						var lowest_ratio := 1.0
						for idx in groups[side]:
							var c = combatants[idx]
							if c.alive and c.hp < c.max_hp:
								var ratio = float(c.hp) / float(c.max_hp)
								if ratio < lowest_ratio:
									lowest_ratio = ratio
									lowest_hp_comb = c
						if lowest_hp_comb:
							lowest_hp_comb.hp = mini(lowest_hp_comb.hp + effects.heal, lowest_hp_comb.max_hp)
					if effects.has("draw"):
						_draw_cards(side, effects.draw)
					return  # Play at most 1 card per AI activation
