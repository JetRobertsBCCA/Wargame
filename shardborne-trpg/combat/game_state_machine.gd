extends Node
## GameStateMachine — Controls the overall flow of a Shardborne battle.
## States: ARMY_SELECT → DEPLOYMENT → BATTLE → GAME_OVER
## Within BATTLE, phases cycle: COMMAND → MOVEMENT → COMBAT → END
##
## Usage: GameStateMachine is registered as an autoload.
##   GameStateMachine.transition_to(GameStateMachine.GameState.BATTLE)
##   GameStateMachine.advance_phase()
##   GameStateMachine.end_turn()

signal state_changed(old_state: int, new_state: int)
signal phase_changed(old_phase: int, new_phase: int)
signal turn_started(side: int, turn: int)
signal round_started(round_number: int)

enum GameState {
	NONE,
	ARMY_SELECT,
	DEPLOYMENT,
	BATTLE,
	GAME_OVER,
}

enum BattlePhase {
	NONE,
	COMMAND,
	MOVEMENT,
	COMBAT,
	END,
}

var current_state: GameState = GameState.NONE
var current_phase: BattlePhase = BattlePhase.NONE
var current_turn: int = 0
var round_number: int = 0
var active_side: int = 0  # 0 = player, 1 = enemy
var max_rounds: int = 6

## Whether the game is in the BATTLE state
var is_battling: bool:
	get: return current_state == GameState.BATTLE

## Whether the game has ended
var is_over: bool:
	get: return current_state == GameState.GAME_OVER


# ══════════════════════════════════════════════════════════════
# STATE TRANSITIONS
# ══════════════════════════════════════════════════════════════

## Transition to a new game state with validation
func transition_to(new_state: GameState) -> bool:
	if not _is_valid_transition(current_state, new_state):
		push_warning("GameStateMachine: Invalid state transition: %s → %s" % [
			GameState.keys()[current_state], GameState.keys()[new_state]])
		return false

	var old := current_state
	current_state = new_state
	current_phase = BattlePhase.NONE

	match new_state:
		GameState.ARMY_SELECT:
			_enter_army_select()
		GameState.DEPLOYMENT:
			_enter_deployment()
		GameState.BATTLE:
			round_number = 1
			current_turn = 0
			active_side = 0
			_enter_battle()
		GameState.GAME_OVER:
			_enter_game_over()

	state_changed.emit(old, new_state)
	return true

## Force-set state without validation (for loading saves, testing, etc.)
func force_state(new_state: GameState, phase: BattlePhase = BattlePhase.NONE) -> void:
	current_state = new_state
	current_phase = phase


# ══════════════════════════════════════════════════════════════
# PHASE MANAGEMENT (within BATTLE state)
# ══════════════════════════════════════════════════════════════

## Advance to the next battle phase within BATTLE state
func advance_phase() -> void:
	if current_state != GameState.BATTLE:
		push_warning("GameStateMachine: Cannot advance phase outside BATTLE state")
		return

	var old_phase := current_phase
	match current_phase:
		BattlePhase.NONE, BattlePhase.END:
			current_phase = BattlePhase.COMMAND
		BattlePhase.COMMAND:
			current_phase = BattlePhase.MOVEMENT
		BattlePhase.MOVEMENT:
			current_phase = BattlePhase.COMBAT
		BattlePhase.COMBAT:
			current_phase = BattlePhase.END

	phase_changed.emit(old_phase, current_phase)

## End the current side's turn and switch to the other
func end_turn() -> void:
	if current_state != GameState.BATTLE:
		return

	active_side = 1 - active_side
	current_turn += 1

	if active_side == 0:
		# Both sides have gone — new round
		round_number += 1
		if round_number > max_rounds:
			transition_to(GameState.GAME_OVER)
			return
		round_started.emit(round_number)

	current_phase = BattlePhase.NONE
	turn_started.emit(active_side, current_turn)
	advance_phase()

## Start a new round explicitly (used when Combat.gd manages its own round tracking)
func start_round(round_num: int) -> void:
	round_number = round_num
	round_started.emit(round_number)

## Get a human-readable string of the current state
func get_state_text() -> String:
	var state_str := GameState.keys()[current_state]
	if current_state == GameState.BATTLE:
		var phase_str := BattlePhase.keys()[current_phase]
		return "Round %d — %s (Side %d)" % [round_number, phase_str, active_side]
	return state_str

## Get the name of the current phase
func get_phase_name() -> String:
	return BattlePhase.keys()[current_phase] if current_phase != BattlePhase.NONE else "—"


# ══════════════════════════════════════════════════════════════
# VALIDATION
# ══════════════════════════════════════════════════════════════

func _is_valid_transition(from: GameState, to: GameState) -> bool:
	match to:
		GameState.ARMY_SELECT:
			return from == GameState.NONE or from == GameState.GAME_OVER
		GameState.DEPLOYMENT:
			return from == GameState.ARMY_SELECT
		GameState.BATTLE:
			# Allow from NONE for Quick Battle (skips army select)
			return from == GameState.NONE or from == GameState.DEPLOYMENT or from == GameState.ARMY_SELECT
		GameState.GAME_OVER:
			return from == GameState.BATTLE
	return false


# ══════════════════════════════════════════════════════════════
# STATE ENTRY HANDLERS
# ══════════════════════════════════════════════════════════════

func _enter_army_select() -> void:
	print("[GameStateMachine] → ARMY_SELECT")

func _enter_deployment() -> void:
	print("[GameStateMachine] → DEPLOYMENT")

func _enter_battle() -> void:
	print("[GameStateMachine] → BATTLE (Round 1)")
	round_started.emit(round_number)
	advance_phase()

func _enter_game_over() -> void:
	print("[GameStateMachine] → GAME_OVER (after %d rounds)" % round_number)

## Reset everything for a new game
func reset() -> void:
	current_state = GameState.NONE
	current_phase = BattlePhase.NONE
	current_turn = 0
	round_number = 0
	active_side = 0
	max_rounds = 6
