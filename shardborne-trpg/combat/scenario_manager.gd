extends Node
## ScenarioManager — Manages objectives, VP scoring, and win conditions during combat.

signal scenario_ended(winner_side: int, player_vp: int, enemy_vp: int)

var active_scenario: Dictionary = {}
var scenario_key: String = ""
var vp: Array = [0, 0]  # [player_vp, enemy_vp]
var objectives: Array = []  # Array of {position, owner, type, vp_value}
var max_rounds: int = 6
var current_round: int = 0
var _ended: bool = false

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

func _place_objectives():
	match scenario_key:
		"king_of_the_hill":
			# Center + 2 side objectives
			objectives.append({"position": Vector2i(18, 10), "owner": -1, "type": "center", "vp_value": 2})
			objectives.append({"position": Vector2i(8, 5), "owner": -1, "type": "side", "vp_value": 1})
			objectives.append({"position": Vector2i(28, 15), "owner": -1, "type": "side", "vp_value": 1})

		"shardstorm":
			# Random fragment drops each round — handled in on_round_end
			pass

		"the_last_stand":
			# 3 defender objectives on player side
			objectives.append({"position": Vector2i(6, 5), "owner": 0, "type": "defend", "vp_value": 2})
			objectives.append({"position": Vector2i(6, 10), "owner": 0, "type": "defend", "vp_value": 2})
			objectives.append({"position": Vector2i(6, 15), "owner": 0, "type": "defend", "vp_value": 2})

		"total_war":
			# No placed objectives — VP from kills only
			pass

		"supply_lines":
			# 4 caches along center
			for i in range(4):
				var y = 4 + i * 4
				objectives.append({"position": Vector2i(18, y), "owner": -1, "type": "cache", "vp_value": 1})

		"broken_ground":
			# 5 scattered objectives
			var positions = [Vector2i(10, 5), Vector2i(18, 10), Vector2i(26, 15), Vector2i(12, 14), Vector2i(24, 6)]
			for pos in positions:
				objectives.append({"position": pos, "owner": -1, "type": "objective", "vp_value": 1})

func get_scenario_name() -> String:
	return active_scenario.get("name", "Total War")

func get_scenario_description() -> String:
	return active_scenario.get("description", "Destroy the enemy army.")


# ══════════════════════════════════════════════════════════════
# ROUND SCORING
# ══════════════════════════════════════════════════════════════

## Called at the end of each round by Combat.gd
func on_round_end(round_num: int):
	if _ended:
		return
	current_round = round_num

	match scenario_key:
		"king_of_the_hill", "broken_ground", "supply_lines":
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

func _get_objective_controller(pos: Vector2i) -> int:
	# Whoever has a unit closest to the objective (within 2 tiles) controls it
	var closest_side := -1
	var closest_dist := 999
	for comb in combat.combatants:
		if not comb.alive:
			continue
		var dist = absi(comb.position.x - pos.x) + absi(comb.position.y - pos.y)
		if dist <= 2 and dist < closest_dist:
			closest_dist = dist
			closest_side = comb.side
	return closest_side

func _objective_type_name(obj: Dictionary) -> String:
	match obj.type:
		"center": return "the Hill"
		"side": return "side objective"
		"defend": return "defense point"
		"cache": return "supply cache"
		"objective": return "objective"
		_: return "point"

func _spawn_shard_fragment():
	# Random fragment appears on the battlefield
	var pos = Vector2i(randi_range(5, 30), randi_range(3, 17))
	objectives.append({"position": pos, "owner": -1, "type": "fragment", "vp_value": 2})
	if combat:
		combat.update_information.emit("[color=gold]A Shard Fragment materializes at (%d, %d)![/color]\n" % [pos.x, pos.y])

func _check_last_stand():
	var captured := 0
	for obj in objectives:
		var controller_side = _get_objective_controller(obj.position)
		if controller_side == 1:
			captured += 1
	if captured >= 2:
		vp[1] += 10
		_end_scenario(1)
	elif current_round >= 5:
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
