extends RefCounted
class_name CombatResolver
## CombatResolver — Pure logic for resolving attacks, morale checks, and damage.
## No scene tree dependencies — fully testable and reusable.
## Extracted from Combat.gd to separate game logic from scene management.

signal combat_log(message: String)


# ══════════════════════════════════════════════════════════════
# RESULT CLASSES
# ══════════════════════════════════════════════════════════════

## Result of a single attack roll
class AttackResult:
	var attacker_name: String
	var target_name: String
	var dice_rolled: int
	var target_def: int
	var dice_results: Array = []
	var hits: int = 0
	var crits: int = 0
	var total_damage: int = 0
	var target_destroyed: bool = false
	var modifiers_applied: PackedStringArray = []

	func get_rolls_bbcode() -> String:
		var parts := []
		for r in dice_results:
			if r == 6:
				parts.append("[color=gold]%d[/color]" % r)
			elif r >= target_def:
				parts.append("[color=lime]%d[/color]" % r)
			else:
				parts.append("[color=gray]%d[/color]" % r)
		return " ".join(parts)

## Result of a morale check
class MoraleResult:
	var unit_name: String
	var d1: int
	var d2: int
	var roll: int  # 2d6 total
	var target_mor: int
	var passed: bool
	var margin: int  # positive = passed by this much, negative = failed
	var result_type: int  # GameRules.MoraleResult enum

	func is_routed() -> bool:
		return result_type == GameRules.MoraleResult.ROUTED


# ══════════════════════════════════════════════════════════════
# DICE ROLLING
# ══════════════════════════════════════════════════════════════

## Roll N d6 dice, return array of results
static func roll_dice(count: int) -> Array[int]:
	var results: Array[int] = []
	for i in range(count):
		results.append(randi_range(1, 6))
	return results

## Roll 2d6 and return the total
static func roll_2d6() -> Array[int]:
	return [randi_range(1, 6), randi_range(1, 6)]


# ══════════════════════════════════════════════════════════════
# ATTACK RESOLUTION
# ══════════════════════════════════════════════════════════════

## Roll attack dice: each die >= target DEF is a hit, natural 6 = crit (2 damage)
func resolve_attack_dice(dice_count: int, def_target: int) -> AttackResult:
	var result := AttackResult.new()
	result.dice_rolled = dice_count
	result.target_def = def_target

	var final_dice := maxi(1, dice_count)
	var final_def := maxi(2, def_target)

	for i in range(final_dice):
		var roll := randi_range(1, 6)
		result.dice_results.append(roll)
		if roll == GameRules.CRITICAL_VALUE:
			result.crits += 1
			result.hits += 1
		elif roll >= final_def:
			result.hits += 1

	# Crits deal 2 damage, normal hits deal 1
	result.total_damage = (result.hits - result.crits) + (result.crits * 2)
	return result

## Full attack resolution with combatant dictionaries and modifier calculation
func resolve_attack(attacker: Dictionary, target: Dictionary, attack_key: String,
		extra_atk_mod: int = 0, extra_def_mod: int = 0) -> AttackResult:
	# Calculate total modifiers
	var atk_mod: int = attacker.get("atk_modifier", 0) + extra_atk_mod
	var def_mod: int = target.get("def_modifier", 0) + extra_def_mod

	# Shaken attacker penalty
	if attacker.get("shaken", false):
		atk_mod -= 1

	# Charging bonus for melee
	if attacker.get("has_charged", false) and attack_key == "attack_melee":
		atk_mod += GameRules.COMBAT_MODIFIERS.get("charging", {}).get("atk_mod", 1)

	# Corruption penalty on target's DEF
	var corruption := target.get("corruption_tokens", 0)
	if corruption > 0:
		def_mod += _get_corruption_def_penalty(corruption)

	var dice_count := maxi(1, attacker.get("atk", 6) + atk_mod)
	var def_target := maxi(2, target.get("defense", 4) + def_mod)

	var result := resolve_attack_dice(dice_count, def_target)
	result.attacker_name = attacker.get("name", "?")
	result.target_name = target.get("name", "?")

	# Log the attack
	var log_msg := "[color=yellow]%s[/color] attacks [color=red]%s[/color] — [%dd6 vs DEF %d]\n" % [
		result.attacker_name, result.target_name, dice_count, def_target]
	log_msg += "Rolls: %s → [color=lime]%d hits[/color], [color=gold]%d crits[/color]\n" % [
		result.get_rolls_bbcode(), result.hits, result.crits]
	combat_log.emit(log_msg)

	return result


# ══════════════════════════════════════════════════════════════
# MORALE
# ══════════════════════════════════════════════════════════════

## Roll morale for a combatant. Returns a MoraleResult.
func resolve_morale(combatant: Dictionary, mor_bonus: int = 0) -> MoraleResult:
	var result := MoraleResult.new()
	result.unit_name = combatant.get("name", "?")
	result.d1 = randi_range(1, 6)
	result.d2 = randi_range(1, 6)
	result.roll = result.d1 + result.d2
	result.target_mor = combatant.get("mor", 6) + combatant.get("mor_modifier", 0) + mor_bonus
	result.margin = result.target_mor - result.roll
	result.passed = result.roll <= result.target_mor

	if result.passed:
		result.result_type = GameRules.MoraleResult.PASSED
	elif result.margin <= -GameRules.MORALE_ROUTED_THRESHOLD:
		result.result_type = GameRules.MoraleResult.ROUTED
	else:
		result.result_type = GameRules.MoraleResult.SHAKEN

	var status := "PASSED" if result.passed else ("ROUTED" if result.is_routed() else "SHAKEN")
	var color := "lime" if result.passed else ("red" if result.is_routed() else "orange")
	combat_log.emit("[color=%s]Morale: %s rolls %d vs MOR %d — %s[/color]\n" % [
		color, result.unit_name, result.roll, result.target_mor, status])

	return result


# ══════════════════════════════════════════════════════════════
# RANGE & TARGETING
# ══════════════════════════════════════════════════════════════

## Manhattan distance between two combatants
static func get_distance(a: Dictionary, b: Dictionary) -> int:
	var p1: Vector2i = a.get("position", Vector2i.ZERO)
	var p2: Vector2i = b.get("position", Vector2i.ZERO)
	return absi(p1.x - p2.x) + absi(p1.y - p2.y)

## Check if an attack is in range
static func is_in_attack_range(attacker: Dictionary, target: Dictionary, attack_key: String) -> bool:
	var distance := get_distance(attacker, target)
	var max_range: int
	match attack_key:
		"attack_melee":
			max_range = 1
		"attack_ranged":
			max_range = attacker.get("rng", 1)
		"basic_magic":
			max_range = maxi(attacker.get("rng", 1), 6)
		_:
			max_range = attacker.get("rng", 1)
	return distance <= max_range

## Determine the best attack type for an AI unit at a given distance
static func pick_attack_key(combatant: Dictionary, distance: int) -> String:
	if combatant.get("rng", 1) > 1 and distance <= combatant.get("rng", 1) and distance > 1:
		return "attack_ranged"
	return "attack_melee"


# ══════════════════════════════════════════════════════════════
# CORRUPTION HELPERS
# ══════════════════════════════════════════════════════════════

static func _get_corruption_def_penalty(tokens: int) -> int:
	if tokens >= 9:
		return GameRules.CORRUPTION_THRESHOLDS["consumed"]["def_mod"]
	elif tokens >= 6:
		return GameRules.CORRUPTION_THRESHOLDS["corrupted"]["def_mod"]
	elif tokens >= 3:
		return GameRules.CORRUPTION_THRESHOLDS["tainted"]["def_mod"]
	return 0

static func get_corruption_threshold_name(tokens: int) -> String:
	if tokens >= 9: return "consumed"
	if tokens >= 6: return "corrupted"
	if tokens >= 3: return "tainted"
	if tokens > 0: return "clean"
	return ""
