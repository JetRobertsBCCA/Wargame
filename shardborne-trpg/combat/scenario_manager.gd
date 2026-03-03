extends Node
## ScenarioManager — Manages objectives, VP scoring, and win conditions during combat.

signal scenario_ended(winner_side: int, player_vp: int, enemy_vp: int)

var active_scenario: Dictionary = {}
var scenario_key: String = ""
var vp: Array = [0, 0]  # [player_vp, enemy_vp]
var objectives: Array = []  # Array of {position, owner, type, vp_value, marker}
var max_rounds: int = 6
var current_round: int = 0
var _ended: bool = false
var _next_shard_pos: Vector2i = Vector2i(-1, -1)  # Shardstorm forecast: next spawn location
var _map_width: int = 36   # Grid width for ratio-based placement
var _map_height: int = 21  # Grid height for ratio-based placement

# Objective marker colors by type
const OBJECTIVE_COLORS := {
	"center": Color(1.0, 0.85, 0.0, 0.9),   # Gold
	"side": Color(0.4, 0.8, 1.0, 0.8),       # Cyan
	"defend": Color(0.2, 0.7, 0.3, 0.8),     # Green
	"cache": Color(1.0, 0.6, 0.1, 0.8),      # Orange
	"objective": Color(0.7, 0.5, 1.0, 0.8),  # Purple
	"fragment": Color(1.0, 0.9, 0.3, 0.9),   # Bright gold
}

# Reference to combat node (set externally)
var combat: Combat = null

func setup(key: String, combat_ref: Combat, round_limit: int = 6):
	scenario_key = key
	combat = combat_ref
	max_rounds = round_limit
	vp = [0, 0]
	objectives.clear()
	current_round = 0

	if GameRules.SCENARIOS.has(key):
		active_scenario = GameRules.SCENARIOS[key]
	else:
		active_scenario = GameRules.SCENARIOS["total_war"]
		scenario_key = "total_war"

	_place_objectives()
	_visualize_objectives()

func _place_objectives():
	# Use map-relative ratios for dynamic placement (#18)
	var cx: int = _map_width / 2   # Center X
	var cy: int = _map_height / 2  # Center Y
	match scenario_key:
		"king_of_the_hill":
			# Center + 2 side objectives at 25%/75% positions
			objectives.append({"position": Vector2i(cx, cy), "owner": -1, "type": "center", "vp_value": 2})
			objectives.append({"position": Vector2i(cx - cx / 2, cy / 2), "owner": -1, "type": "side", "vp_value": 1})
			objectives.append({"position": Vector2i(cx + cx / 2, cy + cy / 2), "owner": -1, "type": "side", "vp_value": 1})

		"shardstorm":
			# Pre-generate first shard forecast so players can see it
			_next_shard_pos = Vector2i(randi_range(5, _map_width - 6), randi_range(3, _map_height - 4))

		"the_last_stand":
			# 3 defender objectives on player side (left 1/6 of map)
			var def_x: int = _map_width / 6
			objectives.append({"position": Vector2i(def_x, cy / 2), "owner": 0, "type": "defend", "vp_value": 2})
			objectives.append({"position": Vector2i(def_x, cy), "owner": 0, "type": "defend", "vp_value": 2})
			objectives.append({"position": Vector2i(def_x, cy + cy / 2), "owner": 0, "type": "defend", "vp_value": 2})

		"total_war":
			pass  # No placed objectives — VP from kills only

		"supply_lines":
			# 4 caches along center column, evenly spaced
			var spacing: int = (_map_height - 4) / 3
			for i in range(4):
				var y = 2 + i * spacing
				objectives.append({"position": Vector2i(cx, y), "owner": -1, "type": "cache", "vp_value": 1})

		"broken_ground":
			# 5 scattered objectives using ratio-based positions
			var positions = [
				Vector2i(cx - cx / 2, cy / 2),
				Vector2i(cx, cy),
				Vector2i(cx + cx / 2, cy + cy / 2),
				Vector2i(cx - cx / 3, cy + cy / 3),
				Vector2i(cx + cx / 3, cy - cy / 3)
			]
			for pos in positions:
				objectives.append({"position": pos, "owner": -1, "type": "objective", "vp_value": 1})

		"shard_clash":
			# 3 shard deposits: one center, two flanking
			objectives.append({"position": Vector2i(cx, cy), "owner": -1, "type": "fragment", "vp_value": 2})
			objectives.append({"position": Vector2i(cx - cx / 2, cy - cy / 3), "owner": -1, "type": "fragment", "vp_value": 2})
			objectives.append({"position": Vector2i(cx + cx / 2, cy + cy / 3), "owner": -1, "type": "fragment", "vp_value": 2})

func get_scenario_name() -> String:
	return active_scenario.get("name", "Total War")

func get_scenario_description() -> String:
	return active_scenario.get("description", "Destroy the enemy army.")


# ══════════════════════════════════════════════════════════════
# OBJECTIVE VISUALIZATION
# ══════════════════════════════════════════════════════════════

## Create visual markers for all objectives on the tilemap
func _visualize_objectives() -> void:
	if combat == null:
		return
	var tilemap = combat.get_node_or_null("../Terrain/TileMap")
	if tilemap == null:
		return
	for obj in objectives:
		_create_objective_marker(obj, tilemap)

## Create a single objective marker sprite on the tilemap
func _create_objective_marker(obj: Dictionary, tilemap: Node) -> void:
	var marker_script = load("res://combat/objective_marker.gd")
	if marker_script == null:
		return
	var marker := Node2D.new()
	marker.set_script(marker_script)
	marker.position = Vector2(obj.position * 32) + Vector2(16, 16)
	marker.z_index = 0  # Below units but visible on tiles
	marker.set_meta("obj_type", obj.type)
	marker.set_meta("obj_color", OBJECTIVE_COLORS.get(obj.type, Color.WHITE))
	tilemap.add_child(marker)
	obj["marker"] = marker

## Update objective marker colors based on who controls them
func _update_objective_markers() -> void:
	for obj in objectives:
		var marker = obj.get("marker")
		if marker == null or not is_instance_valid(marker):
			continue
		if obj.owner == 0:
			marker.set_meta("obj_color", Color(0.3, 0.7, 1.0, 0.9))  # Player blue
		elif obj.owner == 1:
			marker.set_meta("obj_color", Color(1.0, 0.35, 0.25, 0.9))  # Enemy red
		else:
			marker.set_meta("obj_color", OBJECTIVE_COLORS.get(obj.type, Color.WHITE))
		marker.queue_redraw()


# ══════════════════════════════════════════════════════════════
# ROUND SCORING
# ══════════════════════════════════════════════════════════════

## Called at the end of each round by Combat.gd
func on_round_end(round_num: int):
	if _ended:
		return
	current_round = round_num

	match scenario_key:
		"king_of_the_hill", "broken_ground", "supply_lines", "shard_clash":
			_score_controlled_objectives()

		"shardstorm":
			_score_controlled_objectives()  # Score existing fragments first
			_spawn_shard_fragment()          # Then spawn a new one

		"the_last_stand":
			_check_last_stand()

		"total_war":
			pass  # VP only from kills

	# Check win by round limit (only if not already ended by scenario logic)
	if not _ended and current_round >= max_rounds:
		_end_scenario(0 if vp[0] >= vp[1] else 1)

func _score_controlled_objectives():
	if combat == null:
		return
	for obj in objectives:
		var controller_side = _get_objective_controller(obj.position)
		if controller_side >= 0:
			obj.owner = controller_side
			vp[controller_side] += obj.vp_value
			if controller_side == 0:
				AudioManager.play_sfx("objective_scored")
			# Supply Lines: controlled caches grant +1 CP per round
			if scenario_key == "supply_lines" and obj.type == "cache":
				combat.command_points[controller_side] += 1
				combat.update_information.emit("[color=orange]Supply cache at (%d,%d) grants +1 CP to %s![/color]\n" % [
					obj.position.x, obj.position.y,
					"Player" if controller_side == 0 else "Enemy"])
	_update_objective_markers()

func _get_objective_controller(pos: Vector2i) -> int:
	# Contested objectives: both sides present within 2 tiles = no controller (#19)
	# Side must outnumber the other to claim control
	var side_counts := [0, 0]
	for comb in combat.combatants:
		if not comb.alive:
			continue
		var dist = absi(comb.position.x - pos.x) + absi(comb.position.y - pos.y)
		if dist <= 2:
			side_counts[comb.side] += 1
	# Must strictly outnumber to control; tie = contested (no one scores)
	if side_counts[0] > side_counts[1] and side_counts[0] > 0:
		return 0
	elif side_counts[1] > side_counts[0] and side_counts[1] > 0:
		return 1
	return -1  # Contested or empty — no VP

func _objective_type_name(obj: Dictionary) -> String:
	match obj.type:
		"center": return "the Hill"
		"side": return "side objective"
		"defend": return "defense point"
		"cache": return "supply cache"
		"objective": return "objective"
		_: return "point"

func _spawn_shard_fragment():
	# Limit total shard fragments on the field to 5
	var fragment_count := 0
	for obj in objectives:
		if obj.type == "fragment":
			fragment_count += 1
	if fragment_count >= 5:
		return
	# Use forecasted position if available, otherwise random (#20)
	var pos: Vector2i
	if _next_shard_pos != Vector2i(-1, -1):
		pos = _next_shard_pos
	else:
		pos = Vector2i(randi_range(5, _map_width - 6), randi_range(3, _map_height - 4))
	var obj = {"position": pos, "owner": -1, "type": "fragment", "vp_value": 2}
	objectives.append(obj)
	# Visualize the new fragment on the map
	if combat:
		var tilemap = combat.get_node_or_null("../Terrain/TileMap")
		if tilemap:
			_create_objective_marker(obj, tilemap)
		combat.update_information.emit("[color=gold]A Shard Fragment materializes at (%d, %d)![/color]\n" % [pos.x, pos.y])
	# Forecast: generate next spawn location and announce it 1 round early
	_next_shard_pos = Vector2i(randi_range(5, _map_width - 6), randi_range(3, _map_height - 4))
	if combat:
		combat.update_information.emit("[color=yellow]⚡ Shardstorm forecast: next fragment at (%d, %d) next round![/color]\n" % [_next_shard_pos.x, _next_shard_pos.y])

func _check_last_stand():
	var captured := 0
	for obj in objectives:
		var controller_side = _get_objective_controller(obj.position)
		if controller_side == 1:
			captured += 1
	if captured >= 2:
		vp[1] += 10
		_end_scenario(1)
	elif current_round >= max_rounds:
		vp[0] += 10
		_end_scenario(0)


func _end_scenario(winner_side: int):
	if _ended:
		return
	_ended = true
	scenario_ended.emit(winner_side, vp[0], vp[1])


# ══════════════════════════════════════════════════════════════
# KILL SCORING
# ══════════════════════════════════════════════════════════════

## Called when any combatant dies
func on_unit_killed(killer_side: int, killed_def: CombatantDefinition):
	match scenario_key:
		"total_war":
			if killed_def.is_commander():
				vp[killer_side] += 5
			else:
				vp[killer_side] += 1
		_:
			# All scenarios give 1 VP per kill
			vp[killer_side] += 1


# ══════════════════════════════════════════════════════════════
# STATUS
# ══════════════════════════════════════════════════════════════

func get_vp_text() -> String:
	return "VP: Player %d — Enemy %d" % [vp[0], vp[1]]
