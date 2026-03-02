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

func _unhandled_input(event):
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
	var mov = combatant.movement
	# Trapped status reduces movement by half (min 1)
	if combatant.get("status_effects", []).has("trapped"):
		mov = maxi(1, mov / 2)
		combatant.status_effects.erase("trapped")  # Wears off after 1 turn
	# Engaged units can't move
	if combatant.get("status_effects", []).has("engaged"):
		mov = 0
		combatant.status_effects.erase("engaged")  # Wears off after 1 turn
	movement = mov
	update_points_weight()

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


var _arrived = true

var _path : PackedVector2Array

var _next_position

var _position_id = 0

var move_speed = 96

var _previous_position : Vector2i

func _process(delta):
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
				finished_move.emit()
				_arrived = true


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
		if !_astargrid.get_point_weight_scale(target_position + tile) > 999999:
			ai_move(target_position + tile)
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
	_path = _astargrid.get_point_path(current_position, tile_position)
	queue_redraw()


func move_player():
	var current_position = tile_map.local_to_map(controlled_node.position)
	var _path_size = _path.size()
	if _path_size > 1 and movement > 0:
		move_on_path(current_position)


func move_on_path(current_position):
	_previous_position = current_position
	_position_id = 1
	_next_position = _path[_position_id]
	_arrived = false
	queue_redraw()


var _selected_skill: String

func set_selected_skill(skill: String):
	_selected_skill = skill


func begin_target_selection():
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
	# Validate target side: attack skills require enemy, support skills require ally
	var attacker = combat.get_current_combatant()
	var is_offensive = _selected_skill in ["attack_melee", "attack_ranged", "basic_magic",
		"flame_burst", "inferno_charge", "heat_vent", "pyroclasm",
		"coordinated_fire", "artillery_barrage", "fragment_overload",
		"corrupt_bite", "terror_shriek", "shadow_step",
		"web_snare", "gossamer_trap", "natures_wrath",
		"stance_strike", "phase_strike", "feast"]
	var is_ally_only = _selected_skill in ["rally", "repair", "honor_guard",
		"shield_wall", "fate_weave", "ritual_channel", "stoke_flames", "blood_tithe"]
	if is_offensive and target.side == attacker.side:
		combat.update_information.emit("[color=red]Cannot use that skill on allies.[/color]\n")
		_skill_selected = false
		target_selection_finished.emit()
		return
	if is_ally_only and target.side != attacker.side:
		combat.update_information.emit("[color=red]That skill targets allies only.[/color]\n")
		_skill_selected = false
		target_selection_finished.emit()
		return
	combat.call(_selected_skill, combat.get_current_combatant(), target)
	_skill_selected = false
	target_selection_finished.emit()


const grid_tex = preload("res://imagese/grid_marker.png")

func get_tile_cost(tile):
	var tile_data = tile_map.get_cell_tile_data(0, tile)
	if combat.get_current_combatant().movement_class == 0:
		return int(tile_data.get_custom_data("Cost"))
	else:
		return 1

func get_tile_cost_at_point(point):
	var tile = tile_map.local_to_map(point)
	var tile_data = tile_map.get_cell_tile_data(0, tile)
	if combat.get_current_combatant().movement_class == 0:
		return int(tile_data.get_custom_data("Cost"))
	else:
		return 1

func _draw():
	if _arrived == true and player_turn == true:
		var path_length = movement
		for i in range(_path.size()):
			var point = _path[i]
			var draw_color = Color.WHITE
			if path_length > 0:
				draw_color = Color.ROYAL_BLUE
			if i > 0:
				path_length -= get_tile_cost_at_point(point)
			draw_texture(grid_tex, point - Vector2(16, 16), draw_color)
		if _attack_target_position != null:
			draw_texture(grid_tex, _attack_target_position - Vector2(16, 16), Color.CRIMSON)
		if _ally_target_position != null:
			draw_texture(grid_tex, _ally_target_position - Vector2(16, 16), Color.DODGER_BLUE)
		if _blocked_target_position != null:
			draw_texture(grid_tex, _blocked_target_position - Vector2(16, 16))
