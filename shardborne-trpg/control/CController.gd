extends Node2D
class_name CController
##Class for controlling sprites representing combatants on the tile map

signal movement_changed(movement: int)
signal finished_move
signal target_selection_started()
signal target_selection_finished()

@export var controlled_node : Node2D
@export var combat: Combat

var tile_map : TileMap

var movement = 3:
	set = set_movement,
	get = get_movement

var _astargrid = AStarGrid2D.new()

var player_turn = true

var _attack_target_position
var _blocked_target_position
var _ally_target_position

var _skill_selected = false

var _camera: Camera2D

func _unhandled_input(event):
	# Camera zoom with mouse wheel
	if event is InputEventMouseButton and _camera:
		if event.button_index == MOUSE_BUTTON_WHEEL_UP:
			_camera.zoom = clampf(_camera.zoom.x + 0.2, 1.0, 4.0) * Vector2.ONE
		elif event.button_index == MOUSE_BUTTON_WHEEL_DOWN:
			_camera.zoom = clampf(_camera.zoom.x - 0.2, 1.0, 4.0) * Vector2.ONE

	# Always update hover highlight (even during enemy turns)
	if event is InputEventMouseMotion:
		var mouse_position = get_global_mouse_position()
		var mouse_position_i = tile_map.local_to_map(mouse_position)
		var hover_comb = get_combatant_at_position(mouse_position_i)
		combat.set_hovered_combatant(hover_comb)

	if player_turn == false:
		return
		
	if event is InputEventMouseButton:
		if event.button_index == MOUSE_BUTTON_LEFT:
			if event.is_released():
				if _skill_selected == true:
					var mouse_position = get_global_mouse_position()
					var mouse_position_i = tile_map.local_to_map(mouse_position)
					var needs_dead = _selected_skill == "feast"
					var comb = get_combatant_at_position(mouse_position_i, needs_dead)
					if comb != null and (comb.alive or needs_dead):
						target_selected(comb)
				elif _arrived == true:
					move_player()
	
	if event is InputEventMouseMotion:
		if _arrived == true:
			var mouse_position = get_global_mouse_position()
			var mouse_position_i = tile_map.local_to_map(mouse_position)
			find_path(mouse_position_i)
			var comb = get_combatant_at_position(mouse_position_i)
			var local_map = tile_map.map_to_local(mouse_position_i)
			_ally_target_position = null
			if comb != null:
				if comb.alive and _skill_selected:
					# When skill is selected, allow targeting any alive unit
					if comb.side != combat.get_current_combatant().side:
						_attack_target_position = local_map
					else:
						_ally_target_position = local_map
						_attack_target_position = null
				elif comb.side == 1 and comb.alive:
					_attack_target_position = local_map
				else:
					_attack_target_position = null
					_blocked_target_position = local_map
			elif mouse_position_i in _blocking_spaces[combat.get_current_combatant().movement_class]:
				_blocked_target_position = local_map
			else:
				_attack_target_position = null
				_blocked_target_position = null


func get_combatant_at_position(target_position: Vector2i, include_dead: bool = false):
	for comb in combat.combatants:
		if comb.position == target_position:
			if comb.alive or include_dead:
				return comb
	return null

var _occupied_spaces = []

var _blocking_spaces = [
	[],#Ground
	[],#Flying
	[]#Mounted
]

func _ready():
	tile_map = get_node("../Terrain/TileMap")
	_camera = get_node_or_null("../Terrain/Camera2D")
	_astargrid.region = Rect2i(0, 0, 36, 21)
	_astargrid.cell_size = Vector2i(32, 32)
	_astargrid.offset = Vector2(16, 16)
	_astargrid.default_compute_heuristic = AStarGrid2D.HEURISTIC_MANHATTAN
	_astargrid.diagonal_mode = AStarGrid2D.DIAGONAL_MODE_NEVER
	_astargrid.update()
	
	#build blocking spaces arrays
	for tile in tile_map.get_used_cells(0):
		var tile_blocking = tile_map.get_cell_tile_data(0, tile)
		for block in tile_blocking.get_custom_data("Blocks"):
			_blocking_spaces[block].append(tile)


func combatant_added(combatant):
	_occupied_spaces.append(combatant.position)


func combatant_died(combatant):
	_astargrid.set_point_weight_scale(combatant.position, 1)
	_occupied_spaces.erase(combatant.position)


func set_controlled_combatant(combatant: Dictionary):
	if combatant.side == 0:
		player_turn = true
	else:
		player_turn = false
	controlled_node = combatant.sprite
	var mov = combatant.movement + combatant.get("mov_modifier", 0)
	# Trapped status reduces movement by half (min 1)
	if combatant.get("status_effects", []).has("trapped"):
		mov = maxi(1, mov / 2)
		combatant.status_effects.erase("trapped")  # Wears off after 1 turn

	# Shaken Fall Back: Shaken units must move directly away from nearest enemy
	if combatant.shaken and not combatant.get("status_effects", []).has("engaged"):
		_apply_fall_back(combatant, mov)
		movement = 0  # No further movement after fall back
		update_points_weight()
		_pan_camera_to(combatant.sprite.position)
		return

	# Engaged: Disengage costs full movement. Unit CAN move, but only 1 tile away.
	if combatant.get("status_effects", []).has("engaged"):
		var still_engaged := false
		var pos: Vector2i = combatant.position
		for idx in combat.groups[1 - combatant.side]:
			var enemy = combat.combatants[idx]
			if enemy.alive:
				var dist = absi(pos.x - enemy.position.x) + absi(pos.y - enemy.position.y)
				if dist <= GameRules.ENGAGEMENT_RANGE:
					still_engaged = true
					break
		if still_engaged:
			# Disengage: can only move 1 tile (costs full movement)
			mov = 1
			combatant.status_effects.erase("engaged")
			combat.update_information.emit("[color=yellow]%s disengages! (costs full movement)[/color]\n" % combatant.name)
		else:
			combatant.status_effects.erase("engaged")  # No longer adjacent, auto-disengage
	movement = mov
	update_points_weight()
	_pan_camera_to(combatant.sprite.position)

## Fall Back: Shaken unit flees directly away from nearest enemy
func _apply_fall_back(combatant: Dictionary, mov: int) -> void:
	var pos: Vector2i = combatant.position
	var nearest_enemy_pos := Vector2i(18, 10)  # Default center
	var nearest_dist := 999
	for idx in combat.groups[1 - combatant.side]:
		var enemy = combat.combatants[idx]
		if enemy.alive:
			var dist = absi(pos.x - enemy.position.x) + absi(pos.y - enemy.position.y)
			if dist < nearest_dist:
				nearest_dist = dist
				nearest_enemy_pos = enemy.position
	# Move away from nearest enemy
	var dir := Vector2(pos - nearest_enemy_pos).normalized()
	var new_pos := Vector2i(pos) + Vector2i(roundi(dir.x * mov), roundi(dir.y * mov))
	new_pos.x = clampi(new_pos.x, 0, 35)
	new_pos.y = clampi(new_pos.y, 0, 20)
	_occupied_spaces.erase(pos)
	combatant.position = new_pos
	_occupied_spaces.append(new_pos)
	if combatant.get("sprite"):
		combatant.sprite.position = Vector2(new_pos * 32) + Vector2(16, 16)
	combat.update_information.emit("[color=orange]%s falls back in panic![/color]\n" % combatant.name)

## Consolidate: after destroying an enemy in melee, move up to 3 tiles toward nearest enemy
func apply_consolidate(combatant: Dictionary) -> void:
	if not combatant.alive:
		return
	var pos: Vector2i = combatant.position
	var nearest_enemy_pos: Vector2i = pos
	var nearest_dist := 999
	for idx in combat.groups[1 - combatant.side]:
		var enemy = combat.combatants[idx]
		if enemy.alive:
			var dist = absi(pos.x - enemy.position.x) + absi(pos.y - enemy.position.y)
			if dist < nearest_dist:
				nearest_dist = dist
				nearest_enemy_pos = enemy.position
	if nearest_dist >= 999:
		return  # No enemies left
	var dir := Vector2(nearest_enemy_pos - pos).normalized()
	var consolidate_dist := mini(GameRules.CONSOLIDATE_DISTANCE, nearest_dist - 1)
	if consolidate_dist <= 0:
		return
	var new_pos := Vector2i(pos) + Vector2i(roundi(dir.x * consolidate_dist), roundi(dir.y * consolidate_dist))
	new_pos.x = clampi(new_pos.x, 0, 35)
	new_pos.y = clampi(new_pos.y, 0, 20)
	_occupied_spaces.erase(pos)
	combatant.position = new_pos
	_occupied_spaces.append(new_pos)
	if combatant.get("sprite"):
		combatant.sprite.position = Vector2(new_pos * 32) + Vector2(16, 16)
	combat.update_information.emit("[color=silver]%s consolidates toward the enemy![/color]\n" % combatant.name)

func update_points_weight():
	#Update occupied spaces for flying units
	for point in _occupied_spaces:
		if combat.get_current_combatant().movement_class == 1:
			_astargrid.set_point_weight_scale(point, 1)
		else:
			_astargrid.set_point_weight_scale(point, INF)
	#Update point weights for blocking spaces
	for class_m in range(_blocking_spaces.size()):
		for space in _blocking_spaces[class_m]:
			if combat.get_current_combatant().movement_class == class_m:
				_astargrid.set_point_weight_scale(space, INF)
			else:
				_astargrid.set_point_weight_scale(space, 1)

func get_distance(point1: Vector2i, point2: Vector2i):
	return absi(point1.x - point2.x) + absi(point1.y - point2.y)

## Smoothly pan camera toward a world position
func _pan_camera_to(target_pos: Vector2) -> void:
	if _camera == null:
		return
	var tween = create_tween()
	tween.tween_property(_camera, "position", target_pos, 0.35).set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_CUBIC)


var _arrived = true

var _path : PackedVector2Array

var _next_position

var _position_id = 0

var move_speed = 96

var _previous_position : Vector2i
var _move_start_position : Vector2i  # For charge detection

## Check if the current combatant moved 5+ tiles in a straight line (same row or column)
## toward the target. If so, sets has_charged = true on the combatant.
func detect_charge(combatant: Dictionary) -> void:
	var end_pos: Vector2i = combatant.position
	var start_pos: Vector2i = _move_start_position
	var distance: int = absi(end_pos.x - start_pos.x) + absi(end_pos.y - start_pos.y)
	if distance < GameRules.CHARGE_DISTANCE:
		return
	# Must be straight line (same row or same column)
	if start_pos.x != end_pos.x and start_pos.y != end_pos.y:
		return
	# Must end adjacent to an enemy
	for idx in combat.groups[1 - combatant.side]:
		var enemy = combat.combatants[idx]
		if enemy.alive:
			var dist_to_enemy = absi(end_pos.x - enemy.position.x) + absi(end_pos.y - enemy.position.y)
			if dist_to_enemy <= 1:
				combatant.has_charged = true
				combat.update_information.emit("[color=yellow]%s CHARGES! (+%d ATK)[/color]\n" % [
					combatant.name, GameRules.COMBAT_MODIFIERS.get("charging", {}).get("atk_mod", 1)])
				return

## Auto-engage: when a unit ends movement adjacent to an enemy,
## both become engaged (cannot shoot, cannot freely move).
func _apply_auto_engagement(combatant: Dictionary) -> void:
	if not combatant.alive:
		return
	var pos: Vector2i = combatant.position
	for idx in combat.groups[1 - combatant.side]:
		var enemy = combat.combatants[idx]
		if not enemy.alive:
			continue
		var dist = absi(pos.x - enemy.position.x) + absi(pos.y - enemy.position.y)
		if dist <= GameRules.ENGAGEMENT_RANGE:
			if "engaged" not in combatant.get("status_effects", []):
				combatant.status_effects.append("engaged")
			if "engaged" not in enemy.get("status_effects", []):
				enemy.status_effects.append("engaged")

func _process(delta):
	# Camera panning with WASD/arrow keys
	if _camera:
		var cam_dir := Vector2.ZERO
		if Input.is_action_pressed("ui_left"):
			cam_dir.x -= 1
		if Input.is_action_pressed("ui_right"):
			cam_dir.x += 1
		if Input.is_action_pressed("ui_up"):
			cam_dir.y -= 1
		if Input.is_action_pressed("ui_down"):
			cam_dir.y += 1
		if cam_dir != Vector2.ZERO:
			_camera.position += cam_dir.normalized() * 200.0 * delta / _camera.zoom.x

	if _arrived == false:
		controlled_node.position += controlled_node.position.direction_to(_next_position) * delta * move_speed
		if controlled_node.position.distance_to(_next_position) < 1:
			_occupied_spaces.erase(_previous_position)
			_astargrid.set_point_weight_scale(_previous_position, 1)
			var tile_cost = get_tile_cost(_previous_position)
			controlled_node.position = _next_position
			var new_position: Vector2i = tile_map.local_to_map(_next_position)
			combat.get_current_combatant().position = new_position
			_previous_position = new_position
			_occupied_spaces.append(new_position)
			update_points_weight()
			var next_tile_cost = get_tile_cost(new_position)
			movement -= tile_cost
			if _position_id < _path.size() - 1 and movement > 0 and next_tile_cost <= movement:
				_position_id += 1
				_next_position = _path[_position_id]
			else:
				# Detect charge and auto-engage after movement completes
				detect_charge(combat.get_current_combatant())
				_apply_auto_engagement(combat.get_current_combatant())
				# Update facing to direction of movement
				_update_facing_after_move(combat.get_current_combatant(), _move_start_position)
				finished_move.emit()
				_arrived = true

## Update unit facing based on movement direction
func _update_facing_after_move(combatant: Dictionary, start_pos: Vector2i) -> void:
	var end_pos: Vector2i = combatant.position
	var dx := end_pos.x - start_pos.x
	var dy := end_pos.y - start_pos.y
	if absi(dx) >= absi(dy):
		combatant.facing = GameRules.Facing.RIGHT if dx > 0 else GameRules.Facing.LEFT
	else:
		combatant.facing = GameRules.Facing.DOWN if dy > 0 else GameRules.Facing.UP


func set_movement(value):
	movement = value
	movement_changed.emit(value)


func get_movement():
	return movement


const tiles_to_check = [
	Vector2i.RIGHT,
	Vector2i.UP,
	Vector2i.LEFT,
	Vector2i.DOWN
]
func ai_process(target_position: Vector2i):
	#find nearest non-solid tile to target_position
	var current_position = tile_map.local_to_map(controlled_node.position)
	var moved := false
	for tile in tiles_to_check:
		var candidate: Vector2i = target_position + tile
		# Clamp to grid bounds to avoid AStarGrid2D crash
		if candidate.x < 0 or candidate.y < 0 or candidate.x >= 36 or candidate.y >= 21:
			continue
		if !_astargrid.get_point_weight_scale(candidate) > 999999:
			ai_move(candidate)
			moved = true
			break
	if not moved:
		# No adjacent tile reachable — emit immediately to avoid infinite await
		finished_move.emit()
	return finished_move


func ai_move(target_position: Vector2i):
	var current_position = tile_map.local_to_map(controlled_node.position)
	find_path(target_position)
	move_on_path(current_position)


func find_path(tile_position: Vector2i):
	var current_position = tile_map.local_to_map(controlled_node.position)
	# Clamp to grid bounds
	tile_position.x = clampi(tile_position.x, 0, 35)
	tile_position.y = clampi(tile_position.y, 0, 20)
	if _astargrid.get_point_weight_scale(tile_position) > 999999:
		var dir : Vector2i
		if current_position.x > tile_position.x:
			dir = Vector2i.LEFT
		if current_position.y > tile_position.y:
			dir = Vector2i.UP
		if tile_position.x > current_position.x:
			dir = Vector2i.RIGHT
		if tile_position.y > current_position.y:
			dir = Vector2i.DOWN
		tile_position += dir
		# Re-clamp after adjustment
		tile_position.x = clampi(tile_position.x, 0, 35)
		tile_position.y = clampi(tile_position.y, 0, 20)
	_path = _astargrid.get_point_path(current_position, tile_position)
	queue_redraw()


func move_player():
	var current_position = tile_map.local_to_map(controlled_node.position)
	var _path_size = _path.size()
	if _path_size > 1 and movement > 0:
		move_on_path(current_position)


func move_on_path(current_position):
	if _path.size() < 2:
		finished_move.emit()
		return
	# Record movement start position for charge detection
	_move_start_position = current_position
	_previous_position = current_position
	_position_id = 1
	_next_position = _path[_position_id]
	_arrived = false
	queue_redraw()


var _selected_skill: String

func set_selected_skill(skill: String):
	_selected_skill = skill


func begin_target_selection():
	# For SELF-targeting skills, auto-cast on the caster immediately (no click needed)
	var skill_def = SkillDatabase.skills.get(_selected_skill) if SkillDatabase else null
	if skill_def and skill_def.target_type == SkillDefinition.TargetType.SELF:
		var caster = combat.get_current_combatant()
		if caster and combat.has_method(_selected_skill):
			combat.call(_selected_skill, caster, caster)
		_skill_selected = false
		target_selection_finished.emit()
		return
	# For AREA skills centered on caster (heat_vent, terror_shriek, etc.), also auto-cast
	if skill_def and skill_def.target_type == SkillDefinition.TargetType.AREA and skill_def.is_aoe:
		var caster = combat.get_current_combatant()
		if caster and combat.has_method(_selected_skill):
			combat.call(_selected_skill, caster, caster)
		_skill_selected = false
		target_selection_finished.emit()
		return
	_skill_selected = true
	target_selection_started.emit()


func target_selected(target: Dictionary):
	if _selected_skill.is_empty():
		_skill_selected = false
		target_selection_finished.emit()
		return
	if not combat.has_method(_selected_skill):
		push_warning("No combat method for skill: " + _selected_skill)
		_skill_selected = false
		target_selection_finished.emit()
		return
	# Validate target using SkillDefinition.target_type from the database
	var attacker = combat.get_current_combatant()
	var skill_def = SkillDatabase.skills.get(_selected_skill) if SkillDatabase else null
	var target_type = skill_def.target_type if skill_def else SkillDefinition.TargetType.ENEMY
	match target_type:
		SkillDefinition.TargetType.ENEMY:
			if target.side == attacker.side:
				combat.update_information.emit("[color=red]Cannot use that skill on allies.[/color]\n")
				_skill_selected = false
				target_selection_finished.emit()
				return
		SkillDefinition.TargetType.ALLY:
			if target.side != attacker.side:
				combat.update_information.emit("[color=red]That skill targets allies only.[/color]\n")
				_skill_selected = false
				target_selection_finished.emit()
				return
		SkillDefinition.TargetType.SELF:
			# SELF skills should have been auto-cast in begin_target_selection
			pass
		SkillDefinition.TargetType.AREA, SkillDefinition.TargetType.CONE:
			# Area/cone skills can target any position — no side validation needed
			pass
	combat.call(_selected_skill, combat.get_current_combatant(), target)
	_skill_selected = false
	target_selection_finished.emit()


const grid_tex = preload("res://imagese/grid_marker.png")

func get_tile_cost(tile):
	var tile_data = tile_map.get_cell_tile_data(0, tile)
	if tile_data == null:
		return 99
	if combat.get_current_combatant().movement_class == 0:
		return int(tile_data.get_custom_data("Cost"))
	else:
		return 1

func get_tile_cost_at_point(point):
	var tile = tile_map.local_to_map(point)
	var tile_data = tile_map.get_cell_tile_data(0, tile)
	if tile_data == null:
		return 99
	if combat.get_current_combatant().movement_class == 0:
		return int(tile_data.get_custom_data("Cost"))
	else:
		return 1

func _draw():
	if _arrived == true and player_turn == true:
		# Draw movement range overlay — highlight all reachable tiles
		_draw_movement_range()

		# Draw path from current position to mouse target
		var path_length = movement
		for i in range(_path.size()):
			var point = _path[i]
			if i > 0:
				path_length -= get_tile_cost_at_point(point)
			if i > 0:
				# Draw path dots: blue if reachable, dim if out of range
				if path_length >= 0:
					_draw_path_tile(point, Color(0.25, 0.55, 1.0, 0.5))
				else:
					_draw_path_tile(point, Color(0.5, 0.5, 0.5, 0.25))

		# Draw target markers
		if _attack_target_position != null:
			_draw_target_marker(_attack_target_position, Color(1.0, 0.15, 0.2, 0.7))
		if _ally_target_position != null:
			_draw_target_marker(_ally_target_position, Color(0.2, 0.6, 1.0, 0.7))
		if _blocked_target_position != null:
			_draw_blocked_marker(_blocked_target_position)

## Draw a semi-transparent blue overlay on all tiles the active unit can reach
func _draw_movement_range():
	if combat == null or combat.combatants.is_empty():
		return
	var comb = combat.get_current_combatant()
	var start = comb.position
	var mov = movement
	if mov <= 0:
		return
	# BFS flood fill to find reachable tiles
	var visited := {}
	var queue := [[start, 0]]
	visited[start] = true
	while queue.size() > 0:
		var entry = queue.pop_front()
		var pos: Vector2i = entry[0]
		var cost_so_far: int = entry[1]
		for dir in [Vector2i.RIGHT, Vector2i.LEFT, Vector2i.UP, Vector2i.DOWN]:
			var next: Vector2i = pos + dir
			if next in visited:
				continue
			if next.x < 0 or next.y < 0 or next.x >= 36 or next.y >= 21:
				continue
			if _astargrid.get_point_weight_scale(next) > 999999:
				continue
			var tile_data = tile_map.get_cell_tile_data(0, next)
			if tile_data == null:
				continue
			var step_cost: int
			if comb.movement_class == 0:
				step_cost = int(tile_data.get_custom_data("Cost"))
			else:
				step_cost = 1
			var total = cost_so_far + step_cost
			if total <= mov:
				visited[next] = true
				queue.append([next, total])
	# Draw reachable tiles (skip the unit's own tile)
	for tile_pos in visited:
		if tile_pos == start:
			continue
		var world_pos = tile_map.map_to_local(tile_pos)
		draw_rect(Rect2(world_pos.x - 15, world_pos.y - 15, 30, 30), Color(0.3, 0.6, 1.0, 0.12))

## Draw a highlighted path tile
func _draw_path_tile(point: Vector2, color: Color):
	draw_rect(Rect2(point.x - 14, point.y - 14, 28, 28), color)

## Draw attack/ally target marker — crosshair corners
func _draw_target_marker(pos: Vector2, color: Color):
	var s := 14.0
	var l := 6.0
	var w := 2.0
	# Corner brackets
	draw_line(Vector2(pos.x - s, pos.y - s), Vector2(pos.x - s + l, pos.y - s), color, w)
	draw_line(Vector2(pos.x - s, pos.y - s), Vector2(pos.x - s, pos.y - s + l), color, w)
	draw_line(Vector2(pos.x + s, pos.y - s), Vector2(pos.x + s - l, pos.y - s), color, w)
	draw_line(Vector2(pos.x + s, pos.y - s), Vector2(pos.x + s, pos.y - s + l), color, w)
	draw_line(Vector2(pos.x - s, pos.y + s), Vector2(pos.x - s + l, pos.y + s), color, w)
	draw_line(Vector2(pos.x - s, pos.y + s), Vector2(pos.x - s, pos.y + s - l), color, w)
	draw_line(Vector2(pos.x + s, pos.y + s), Vector2(pos.x + s - l, pos.y + s), color, w)
	draw_line(Vector2(pos.x + s, pos.y + s), Vector2(pos.x + s, pos.y + s - l), color, w)

## Draw X marker for blocked tiles
func _draw_blocked_marker(pos: Vector2):
	var color := Color(0.7, 0.3, 0.3, 0.5)
	draw_line(Vector2(pos.x - 10, pos.y - 10), Vector2(pos.x + 10, pos.y + 10), color, 2.0)
	draw_line(Vector2(pos.x + 10, pos.y - 10), Vector2(pos.x - 10, pos.y + 10), color, 2.0)
