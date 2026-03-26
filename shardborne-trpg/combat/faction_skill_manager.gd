extends RefCounted
class_name FactionSkillManager
## FactionSkillManager — Executes all faction-specific skills.
## Extracted from Combat.gd to keep combat logic modular and each faction self-contained.
##
## Each skill method follows the signature: func skill_name(combat, attacker, target) -> void
## where `combat` is the Combat node reference for accessing combatants, groups, etc.

signal skill_log(message: String)

const TILE_SIZE := 32


# ══════════════════════════════════════════════════════════════
# SKILL DISPATCH
# ══════════════════════════════════════════════════════════════

## War machine-exclusive abilities that are blocked on round 1.
const WAR_MACHINE_BLOCKED_TURN_1 := [
	"heat_vent",
	"pyroclasm",
	"artillery_barrage",
	"fragment_overload",
]

## Execute a faction skill by key. Returns true if handled, false if not found.
func execute_skill(skill_key: String, combat: Node, attacker: Dictionary, target: Dictionary) -> bool:
	if not has_method(skill_key):
		return false

	# Task 1: Block war machine heavy abilities on Turn 1
	if combat.round_number <= 1 \
			and attacker.definition.is_war_machine() \
			and skill_key in WAR_MACHINE_BLOCKED_TURN_1:
		_log("[color=gray]%s cannot use %s on Turn 1 (war machine ability lockout).[/color]\n" % [
			attacker.name, skill_key])
		if attacker.side == 1:
			combat.advance_turn()
		return true

	call(skill_key, combat, attacker, target)
	return true


# ══════════════════════════════════════════════════════════════
# EMBERCLAW SKILLS
# ══════════════════════════════════════════════════════════════

## Emberclaw: Flame Burst breath weapon
func flame_burst(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	state.heat = mini(state.heat + 2, state.heat_max)
	_log("[color=orange]%s unleashes Flame Burst! (+2 Heat → %d)[/color]\n" % [
		attacker.name, state.heat])
	attacker.atk_modifier += 2
	combat.attack(attacker, target, "attack_melee")
	attacker.atk_modifier -= 2

## Emberclaw: Stoke Flames — ATK buff to nearby allies
func stoke_flames(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	state.heat = mini(state.heat + 3, state.heat_max)
	for idx in combat.groups[attacker.side]:
		var ally = combat.combatants[idx]
		if ally.alive and combat.get_distance(attacker, ally) <= 4:
			ally.atk_modifier += 1
	_log("[color=orange]%s Stokes Flames! (Nearby allies +1 ATK, +3 Heat → %d)[/color]\n" % [
		attacker.name, state.heat])
	combat.advance_turn()

## Emberclaw: Inferno Charge
func inferno_charge(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	state.heat = mini(state.heat + 2, state.heat_max)
	_log("[color=orange]%s launches Inferno Charge![/color]\n" % attacker.name)
	attacker.atk_modifier += 3
	combat.attack(attacker, target, "attack_melee")
	attacker.atk_modifier -= 3

## Emberclaw: Heat Vent — AoE damage spending heat
func heat_vent(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.heat < 3:
		_log("Not enough Heat (need 3, have %d).\n" % state.heat)
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.heat -= 3
	_log("[color=red]%s vents Heat (-3 → %d)! AoE damage![/color]\n" % [attacker.name, state.heat])
	var enemy_side = 1 if attacker.side == 0 else 0
	for idx in combat.groups[enemy_side].duplicate():
		var enemy = combat.combatants[idx]
		if enemy.alive and combat.get_distance(attacker, enemy) <= 3:
			combat.apply_damage(enemy, 2)
			if combat._combat_over:
				return
	if combat._check_combat_over():
		return
	combat.advance_turn()

## Emberclaw: Pyroclasm
func pyroclasm(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.heat < 3:
		_log("Not enough Heat (need 3, have %d).\n" % state.heat)
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.heat -= 3
	_log("[color=red]%s casts Pyroclasm! (-3 Heat → %d)[/color]\n" % [attacker.name, state.heat])
	attacker.atk_modifier += 2
	combat.attack(attacker, target, "attack_ranged")
	attacker.atk_modifier -= 2


# ══════════════════════════════════════════════════════════════
# IRON DOMINION SKILLS
# ══════════════════════════════════════════════════════════════

## Iron Dominion: Shield Wall — Boost DEF of adjacent allies
func shield_wall(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	for idx in combat.groups[attacker.side]:
		var ally = combat.combatants[idx]
		if ally.alive and ally != attacker and combat.get_distance(attacker, ally) <= 1:
			ally.def_modifier += 1
			_log("[color=steel_blue]%s boosts %s DEF via Shield Wall![/color]\n" % [attacker.name, ally.name])
	combat.advance_turn()

## Iron Dominion: Fragment Overload — AoE blast around target
func fragment_overload(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	_log("[color=steel_blue]%s overloads a Fragment! AoE blast![/color]\n" % attacker.name)
	var enemy_side = 1 if attacker.side == 0 else 0
	for idx in combat.groups[enemy_side].duplicate():
		var enemy = combat.combatants[idx]
		if enemy.alive and combat.get_distance(target, enemy) <= 2:
			combat.apply_damage(enemy, 3)
			if combat._combat_over:
				return
	if combat._check_combat_over():
		return
	combat.advance_turn()

## Iron Dominion: Coordinated Fire
func coordinated_fire(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var adj_count = combat._count_adjacent_allies(attacker)
	var bonus = 2 if adj_count >= 2 else 0
	_log("[color=steel_blue]%s fires with coordination (+%d ATK from %d allies)![/color]\n" % [
		attacker.name, bonus, adj_count])
	attacker.atk_modifier += bonus
	combat.attack(attacker, target, "attack_ranged")
	attacker.atk_modifier -= bonus

## Iron Dominion: Field Repair
func repair(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	if target.side != attacker.side:
		_log("Can only repair allies.\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	var heal_amount = mini(2, target.max_hp - target.hp)
	target.hp += heal_amount
	AudioManager.play_sfx("heal")
	_log("[color=steel_blue]%s repairs %s for %d HP![/color]\n" % [attacker.name, target.name, heal_amount])
	combat.update_combatants.emit(combat.combatants)
	combat.advance_turn()

## Iron Dominion: Artillery Barrage
func artillery_barrage(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var distance = combat.get_distance(attacker, target)
	if distance < 4:
		_log("Artillery minimum range is 4 tiles.\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	_log("[color=steel_blue]%s fires an Artillery Barrage![/color]\n" % attacker.name)
	attacker.atk_modifier += 4
	combat.attack(attacker, target, "attack_ranged")
	attacker.atk_modifier -= 4

## Iron Dominion: Grid Fire Order — spend 2 cohesion, all allies +2 ATK this turn
func grid_fire_order(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.grid_cohesion < 2:
		_log("Not enough Grid Cohesion (need 2, have %d).\n" % state.grid_cohesion)
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.grid_cohesion -= 2
	state.grid_cohesion_spent = state.get("grid_cohesion_spent", 0) + 2
	for idx in combat.groups[attacker.side]:
		var ally = combat.combatants[idx]
		if ally.alive:
			ally.atk_modifier += 2
	_log("[color=steel_blue]%s issues Grid Fire Order! All allies +2 ATK (-2 Cohesion → %d)[/color]\n" % [
		attacker.name, state.grid_cohesion])
	combat.advance_turn()

## Iron Dominion: Grid Shield Protocol — spend 2 cohesion, all allies +2 DEF this turn
func grid_shield_protocol(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.grid_cohesion < 2:
		_log("Not enough Grid Cohesion (need 2, have %d).\n" % state.grid_cohesion)
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.grid_cohesion -= 2
	state.grid_cohesion_spent = state.get("grid_cohesion_spent", 0) + 2
	for idx in combat.groups[attacker.side]:
		var ally = combat.combatants[idx]
		if ally.alive:
			ally.def_modifier += 2
	_log("[color=steel_blue]%s activates Grid Shield Protocol! All allies +2 DEF (-2 Cohesion → %d)[/color]\n" % [
		attacker.name, state.grid_cohesion])
	combat.advance_turn()

## Iron Dominion: Grid Relay — spend 3 cohesion, restore 1 CP
func grid_relay(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.grid_cohesion < 3:
		_log("Not enough Grid Cohesion (need 3, have %d).\n" % state.grid_cohesion)
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.grid_cohesion -= 3
	state.grid_cohesion_spent = state.get("grid_cohesion_spent", 0) + 3
	combat.command_points[attacker.side] += 1
	_log("[color=steel_blue]%s relays through the Grid! +1 CP (-3 Cohesion → %d)[/color]\n" % [
		attacker.name, state.grid_cohesion])
	combat.advance_turn()


# ══════════════════════════════════════════════════════════════
# NIGHTFANG SKILLS
# ══════════════════════════════════════════════════════════════

## Nightfang: Corrupt Bite — enhanced corruption on melee hit
func corrupt_bite(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	_log("[color=purple]%s delivers a Corrupt Bite![/color]\n" % attacker.name)
	# Use a transient flag on the combatant dict — never mutate the shared definition
	attacker["_corrupt_bite_active"] = true
	combat.attack(attacker, target, "attack_melee")
	attacker.erase("_corrupt_bite_active")

## Nightfang: Blood Tithe — sacrifice HP to buff nearby allies
func blood_tithe(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	if attacker.hp <= 1:
		_log("Not enough HP for Blood Tithe.\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	attacker.hp -= 1
	var state = combat.faction_state[attacker.side]
	state.hunger += 2
	combat._update_hunger_tier(attacker.side)
	for idx in combat.groups[attacker.side]:
		var ally = combat.combatants[idx]
		if ally.alive and combat.get_distance(attacker, ally) <= 3:
			ally.atk_modifier += 1
	_log("[color=crimson]%s performs Blood Tithe (-1 HP, nearby allies +1 ATK, +2 Hunger → %d)[/color]\n" % [
		attacker.name, state.hunger])
	combat.update_combatants.emit(combat.combatants)
	combat.advance_turn()

## Nightfang: Shadow Step — Teleport adjacent to target
func shadow_step(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var target_pos = target.position
	var directions = [Vector2i(1, 0), Vector2i(-1, 0), Vector2i(0, 1), Vector2i(0, -1)]
	var teleported := false
	for dir in directions:
		var dest = target_pos + dir
		var occupied := false
		for c in combat.combatants:
			if c.alive and c.position == dest:
				occupied = true
				break
		if not occupied:
			var old_pos = attacker.position
			if combat.controller:
				combat.controller._occupied_spaces.erase(old_pos)
				combat.controller._occupied_spaces.append(dest)
			attacker.position = dest
			if combat.controller and combat.controller.tile_map:
				attacker.sprite.position = combat.controller.tile_map.map_to_local(dest)
			else:
				attacker.sprite.position = Vector2(dest.x * TILE_SIZE + TILE_SIZE / 2, dest.y * TILE_SIZE + TILE_SIZE / 2)
			_log("[color=purple]%s shadow steps from (%d,%d) to (%d,%d)![/color]\n" % [
				attacker.name, old_pos.x, old_pos.y, dest.x, dest.y])
			teleported = true
			break
	if not teleported:
		_log("[color=red]No open tile adjacent to target for Shadow Step.[/color]\n")
	combat.update_combatants.emit(combat.combatants)
	combat.advance_turn()

## Nightfang: Feast — consume a destroyed unit to heal
func feast(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	if target.alive:
		_log("Can only feast on destroyed units.\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	var heal = mini(3, attacker.max_hp - attacker.hp)
	attacker.hp += heal
	AudioManager.play_sfx("heal")
	var state = combat.faction_state[attacker.side]
	state.hunger += 3
	combat._update_hunger_tier(attacker.side)
	_log("[color=crimson]%s feasts! +%d HP, +3 Hunger → %d[/color]\n" % [
		attacker.name, heal, state.hunger])
	combat.update_combatants.emit(combat.combatants)
	combat.advance_turn()

## Nightfang: Terror Shriek — force morale checks on nearby enemies
## Units that already checked morale this round are immune (prevents infinite loops)
func terror_shriek(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	_log("[color=purple]%s unleashes a Terror Shriek![/color]\n" % attacker.name)
	var enemy_side = 1 if attacker.side == 0 else 0
	var affected := 0
	for idx in combat.groups[enemy_side]:
		var enemy = combat.combatants[idx]
		if enemy.alive and combat.get_distance(attacker, enemy) <= 4:
			if enemy.get("morale_checked_this_round", false):
				_log("  %s already tested morale this round — immune.\n" % enemy.name)
				continue
			enemy["morale_checked_this_round"] = true
			combat.check_morale(enemy)
			affected += 1
	if affected == 0:
		_log("  No enemies affected by Terror Shriek.\n")
	combat.advance_turn()


# ══════════════════════════════════════════════════════════════
# THORNWEFT SKILLS
# ══════════════════════════════════════════════════════════════

## Thornweft: Web Snare — engage target
func web_snare(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var distance = combat.get_distance(attacker, target)
	if distance > 8:
		_log("Target out of web range.\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	target.status_effects.append("engaged")
	target.status_effects.append("web_snared")
	_log("[color=green]%s snares %s in web! (Engaged for 1 turn)[/color]\n" % [attacker.name, target.name])
	combat.advance_turn()

## Thornweft: Fate Weave — spend fate thread for reroll
func fate_weave(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.fate_threads < 1:
		_log("No Fate Threads available.\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.fate_threads -= 1
	target["fate_reroll"] = true
	_log("[color=green]%s weaves fate for %s! (Reroll failed dice next attack)[/color]\n" % [
		attacker.name, target.name])
	combat.advance_turn()

## Thornweft: Gossamer Trap — AoE debuff
func gossamer_trap(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var trap_radius := 3
	var enemy_side = 1 if attacker.side == 0 else 0
	var caught := 0
	for idx in combat.groups[enemy_side]:
		var enemy = combat.combatants[idx]
		if enemy.alive and combat.get_distance(target, enemy) <= trap_radius:
			enemy.status_effects.append("trapped")
			enemy.atk_modifier -= 1
			caught += 1
	if caught > 0:
		_log("[color=green]%s places a Gossamer Trap! %d enemies caught (-1 ATK, trapped)[/color]\n" % [
			attacker.name, caught])
	else:
		_log("[color=green]%s places a Gossamer Trap but no enemies are nearby.[/color]\n" % attacker.name)
	combat.advance_turn()

## Thornweft: Anchor Pulse — +1 DEF to nearby allies
func anchor_pulse(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	_log("[color=green]%s activates Anchor Pulse! +1 DEF to nearby allies.[/color]\n" % attacker.name)
	for idx in combat.groups[attacker.side]:
		var ally = combat.combatants[idx]
		if ally.alive and combat.get_distance(attacker, ally) <= 4:
			ally.def_modifier += 1
	combat.advance_turn()

## Thornweft: Plant Web Anchor — place a web anchor at the attacker's current position.
## The number of placed anchors is capped by the battle-size "max_anchors" config value.
func plant_web_anchor(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	var size_key = BattleConfig.battle_size if BattleConfig else "standard"
	var config = GameRules.BATTLE_SIZES.get(size_key, GameRules.BATTLE_SIZES["standard"])
	var max_anchors: int = config.get("max_anchors", 6)
	if state.web_anchors.size() >= max_anchors:
		_log("[color=green]Cannot plant Web Anchor — maximum reached (%d / %d).[/color]\n" % [
			state.web_anchors.size(), max_anchors])
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.web_anchors.append(attacker.position)
	_log("[color=green]%s plants a Web Anchor at (%d, %d)! (%d / %d anchors placed)[/color]\n" % [
		attacker.name, attacker.position.x, attacker.position.y,
		state.web_anchors.size(), max_anchors])
	combat.advance_turn()


## Thornweft: Nature's Wrath — spend fate threads for powerful attack
func natures_wrath(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.fate_threads < 2:
		_log("Not enough Fate Threads (need 2).\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.fate_threads -= 2
	_log("[color=green]%s channels Nature's Wrath![/color]\n" % attacker.name)
	attacker.atk_modifier += 3
	combat.attack(attacker, target, "basic_magic")
	attacker.atk_modifier -= 3


# ══════════════════════════════════════════════════════════════
# VEILBOUND SKILLS
# ══════════════════════════════════════════════════════════════

## Veilbound: Stance Strike — flow-powered melee attack
## Cost and bonus vary by the faction's active_stance:
##   revelation → 2 Flow, +2 ATK (Aggressive)
##   honor      → 1 Flow, +1 DEF (Defensive)
##   balanced   → 1 Flow, +1 ATK +1 DEF (Balanced)
func stance_strike(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	var current_stance: String = state.get("active_stance", "balanced")

	# Determine cost and modifiers based on current stance
	var flow_cost: int
	var atk_bonus: int
	var def_bonus: int
	var variant_label: String
	if current_stance == "revelation":
		flow_cost = 2
		atk_bonus = 2
		def_bonus = 0
		variant_label = "Aggressive"
	elif current_stance == "honor":
		flow_cost = 1
		atk_bonus = 0
		def_bonus = 1
		variant_label = "Defensive"
	else:
		flow_cost = 1
		atk_bonus = 1
		def_bonus = 1
		variant_label = "Balanced"

	if state.flow < flow_cost:
		_log("Not enough Flow (need %d, have %d).\n" % [flow_cost, state.flow])
		if attacker.side == 1:
			combat.advance_turn()
		return

	state.flow -= flow_cost
	attacker.atk_modifier += atk_bonus
	attacker.def_modifier += def_bonus
	_log("[color=cyan][Stance Strike — %s] %s strikes! (+%d ATK, +%d DEF, %d Flow spent → %d)[/color]\n" % [
		variant_label, attacker.name, atk_bonus, def_bonus, flow_cost, state.flow])
	combat.attack(attacker, target, "attack_melee")
	attacker.atk_modifier -= atk_bonus
	attacker.def_modifier -= def_bonus

## Veilbound: Ritual Channel — generate flow and boost morale
func ritual_channel(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	state.flow = mini(state.flow + 3, state.flow_max)
	combat._update_flow_tier(attacker.side)
	for idx in combat.groups[attacker.side]:
		var ally = combat.combatants[idx]
		if ally.alive and combat.get_distance(attacker, ally) <= 3:
			ally.mor_modifier += 1
	_log("[color=cyan]%s channels ritual energy! +3 Flow → %d, nearby allies +1 MOR[/color]\n" % [
		attacker.name, state.flow])
	combat.advance_turn()

## Veilbound: Phase Strike — teleport-attack
## Requires flow_tier "surging" (flow >= 6).
func phase_strike(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	var _surging_threshold: int = GameRules.FLOW_THRESHOLDS["surging"]["flow"]
	if state.flow < _surging_threshold:
		_log("[color=cyan]%s cannot use Phase Strike — requires Surging flow (>= %d, have %d).[/color]\n" % [
			attacker.name, _surging_threshold, state.flow])
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.flow -= 2
	# Teleport adjacent to target before striking
	var directions = [Vector2i(1, 0), Vector2i(-1, 0), Vector2i(0, 1), Vector2i(0, -1)]
	var teleported := false
	for dir in directions:
		var dest = target.position + dir
		var occupied := false
		for c in combat.combatants:
			if c.alive and c.position == dest:
				occupied = true
				break
		if not occupied:
			var old_pos = attacker.position
			if combat.controller:
				combat.controller._occupied_spaces.erase(old_pos)
				combat.controller._occupied_spaces.append(dest)
			attacker.position = dest
			if combat.controller and combat.controller.tile_map:
				attacker.sprite.position = combat.controller.tile_map.map_to_local(dest)
			else:
				attacker.sprite.position = Vector2(dest.x * TILE_SIZE + TILE_SIZE / 2, dest.y * TILE_SIZE + TILE_SIZE / 2)
			teleported = true
			break
	_log("[color=cyan]%s phases through the Veil to strike![/color]\n" % attacker.name)
	combat.attack(attacker, target, "attack_melee")

## Veilbound: Veil Walk — teleport adjacent to ally
## Requires flow_tier "overflowing" (flow >= 10).
func veil_walk(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	var _overflowing_threshold: int = GameRules.FLOW_THRESHOLDS["overflowing"]["flow"]
	if state.flow < _overflowing_threshold:
		_log("[color=cyan]%s cannot use Veil Walk — requires Overflowing flow (>= %d, have %d).[/color]\n" % [
			attacker.name, _overflowing_threshold, state.flow])
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.flow -= 3
	var dirs = [Vector2i(1, 0), Vector2i(-1, 0), Vector2i(0, 1), Vector2i(0, -1)]
	var moved := false
	for dir in dirs:
		var dest = target.position + dir
		var occupied := false
		for c in combat.combatants:
			if c.alive and c.position == dest:
				occupied = true
				break
		if not occupied:
			var old_pos = attacker.position
			if combat.controller:
				combat.controller._occupied_spaces.erase(old_pos)
				combat.controller._occupied_spaces.append(dest)
			attacker.position = dest
			if combat.controller and combat.controller.tile_map:
				attacker.sprite.position = combat.controller.tile_map.map_to_local(dest)
			else:
				attacker.sprite.position = Vector2(dest.x * TILE_SIZE + TILE_SIZE / 2, dest.y * TILE_SIZE + TILE_SIZE / 2)
			_log("[color=cyan]%s walks through the Veil from (%d,%d) to (%d,%d)![/color]\n" % [
				attacker.name, old_pos.x, old_pos.y, dest.x, dest.y])
			moved = true
			break
	if not moved:
		_log("[color=red]No open tile near target for Veil Walk.[/color]\n")
	combat._update_flow_tier(attacker.side)
	combat.update_combatants.emit(combat.combatants)
	combat.advance_turn()

## Veilbound: Honor Guard — redirect next attack to guard
## Requires flow_tier "stirring" (flow >= 3).
func honor_guard(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	var _stirring_threshold: int = GameRules.FLOW_THRESHOLDS["stirring"]["flow"]
	if state.flow < _stirring_threshold:
		_log("[color=cyan]%s cannot use Honor Guard — requires Stirring flow (>= %d, have %d).[/color]\n" % [
			attacker.name, _stirring_threshold, state.flow])
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.flow -= 1
	attacker.guarding = target.name
	target.guarded_by = attacker.name
	_log("[color=cyan]%s guards %s with honor! (Next attack redirected to guard)[/color]\n" % [
		attacker.name, target.name])
	combat.advance_turn()


# ══════════════════════════════════════════════════════════════
# ROOTWALKER SKILLS
# ══════════════════════════════════════════════════════════════

## Rootwalker: Ancient Growth — place 3 root tiles in a cross pattern around the attacker
func ancient_growth(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	var max_roots: int = GameRules.MAX_ROOT_TILES
	var placed := 0
	var offsets = [Vector2i(0, -1), Vector2i(0, 1), Vector2i(-1, 0), Vector2i(1, 0)]
	for offset in offsets:
		if placed >= 3:
			break
		var pos = attacker.position + offset
		# Skip mountain/impassable tiles
		if combat.controller and combat.controller.tile_map:
			var tile_data = combat.controller.tile_map.get_cell_tile_data(0, pos)
			if tile_data and tile_data.get_custom_data("terrain_type") == "impassable":
				continue
		if pos not in state.root_tiles and pos not in state.deep_root_tiles:
			if state.root_tiles.size() < max_roots:
				state.root_tiles.append(pos)
				state.roots_this_battle += 1
				placed += 1
	_log("[color=green]%s calls upon ancient growth! %d Root tiles spread.[/color]\n" % [
		attacker.name, placed])
	combat.advance_turn()


## Rootwalker: Entangle — ranged status attack (range 5)
func entangle(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var distance = combat.get_distance(attacker, target)
	if distance > 5:
		_log("[color=green]%s: target out of entangle range (need ≤5, have %d).[/color]\n" % [
			attacker.name, distance])
		if attacker.side == 1:
			combat.advance_turn()
		return
	target.status_effects.append("entangled")
	target["entangled_no_move"] = true
	target["entangled_dmg_bonus"] = 1
	_log("[color=green]%s entangles %s! (Cannot move next activation, +1 damage from next hit)[/color]\n" % [
		attacker.name, target.name])
	combat.advance_turn()


## Rootwalker: Bark Surge — melee attack with bonus on root tile
func bark_surge(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	var on_root = attacker.position in state.root_tiles or attacker.position in state.deep_root_tiles
	if on_root:
		attacker.atk_modifier += 2
		_log("[color=green]%s surges with bark power! (+2 ATK from root tile)[/color]\n" % attacker.name)
	else:
		_log("[color=green]%s attacks with Bark Surge![/color]\n" % attacker.name)
	combat.attack(attacker, target, "attack_melee")
	attacker.atk_modifier -= 2 if on_root else 0
	if on_root:
		attacker.def_modifier += 1
		_log("[color=green]%s hardens — +1 DEF from root stance.[/color]\n" % attacker.name)


## Rootwalker: Root Pulse — AoE damage to enemies adjacent to any nearby root tile
func root_pulse(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.get("root_pulse_used_this_round", false):
		_log("[color=green]Root Pulse already used this round.[/color]\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	state["root_pulse_used_this_round"] = true

	# Collect all root tiles within 6 Manhattan tiles of attacker
	var nearby_roots: Array = []
	for pos in state.root_tiles:
		var dist = absi(attacker.position.x - pos.x) + absi(attacker.position.y - pos.y)
		if dist <= 6:
			nearby_roots.append(pos)
	for pos in state.deep_root_tiles:
		var dist = absi(attacker.position.x - pos.x) + absi(attacker.position.y - pos.y)
		if dist <= 6:
			nearby_roots.append(pos)

	_log("[color=green]The roots pulse with ancient fury![/color]\n")
	var enemy_side = 1 if attacker.side == 0 else 0
	var hit_count := 0
	for idx in combat.groups[enemy_side].duplicate():
		var enemy = combat.combatants[idx]
		if not enemy.alive:
			continue
		# Check if adjacent (distance <= 1) to any nearby root tile
		var adjacent_to_root := false
		for root_pos in nearby_roots:
			var d = absi(enemy.position.x - root_pos.x) + absi(enemy.position.y - root_pos.y)
			if d <= 1:
				adjacent_to_root = true
				break
		if adjacent_to_root:
			combat.apply_damage(enemy, 1)
			hit_count += 1
			if combat._combat_over:
				return
	if hit_count == 0:
		_log("[color=green]Root Pulse found no enemies adjacent to nearby roots.[/color]\n")
	if combat._check_combat_over():
		return
	combat.advance_turn()


## Rootwalker: Deep Root Stance — plant deep roots, gain +2 DEF, immobilize
func deep_root_stance(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	var pos = attacker.position
	# Remove from regular root tiles if present, then add to deep_root_tiles
	if pos in state.root_tiles:
		state.root_tiles.erase(pos)
	if pos not in state.deep_root_tiles:
		state.deep_root_tiles.append(pos)
	if attacker.name not in state.deep_root_units:
		state.deep_root_units.append(attacker.name)
	attacker.def_modifier += 2
	attacker["deep_rooted"] = true
	_log("[color=green]%s plants deep roots, becoming one with the earth. (+2 DEF)[/color]\n" % attacker.name)
	combat.advance_turn()


## Rootwalker: Thorn Volley — ranged Blast(2) attack, converts hit tiles to root terrain
func thorn_volley(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var distance = combat.get_distance(attacker, target)
	if distance > 8:
		_log("[color=green]%s: target out of thorn volley range (need ≤8, have %d).[/color]\n" % [
			attacker.name, distance])
		if attacker.side == 1:
			combat.advance_turn()
		return
	var state = combat.faction_state[attacker.side]
	var max_roots: int = GameRules.MAX_ROOT_TILES
	_log("[color=green]A volley of thorns tears through the earth![/color]\n")
	var blast_radius := 2
	var enemy_side = 1 if attacker.side == 0 else 0
	# Collect all combatants (both sides) within blast radius of target
	var all_sides = [enemy_side, attacker.side]
	for side_idx in all_sides:
		for idx in combat.groups[side_idx].duplicate():
			var unit = combat.combatants[idx]
			if unit.alive and combat.get_distance(target, unit) <= blast_radius:
				attacker.atk_modifier += 1
				combat.attack(attacker, unit, "attack_ranged")
				attacker.atk_modifier -= 1
				if combat._combat_over:
					return
	# Convert all tiles within blast radius to root terrain
	for dx in range(-blast_radius, blast_radius + 1):
		for dy in range(-blast_radius, blast_radius + 1):
			if absi(dx) + absi(dy) <= blast_radius:
				var tile_pos = target.position + Vector2i(dx, dy)
				if tile_pos not in state.root_tiles and tile_pos not in state.deep_root_tiles:
					if state.root_tiles.size() < max_roots:
						state.root_tiles.append(tile_pos)
						state.roots_this_battle += 1
	if combat._check_combat_over():
		return
	combat.advance_turn()


## Rootwalker: Ancient Call — once per battle, summon a Sapling on nearest root tile
func ancient_call(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.get("ancient_call_used", false):
		_log("[color=green]Ancient Call has already been used this battle.[/color]\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	state["ancient_call_used"] = true

	# Find nearest root tile within 8 tiles
	var all_roots: Array = state.root_tiles + state.deep_root_tiles
	var best_pos: Vector2i = Vector2i(-1, -1)
	var best_dist := 9999
	for pos in all_roots:
		var d = absi(attacker.position.x - pos.x) + absi(attacker.position.y - pos.y)
		if d <= 8 and d < best_dist:
			# Check tile not already occupied
			var occupied := false
			for c in combat.combatants:
				if c.alive and c.position == pos:
					occupied = true
					break
			if not occupied:
				best_dist = d
				best_pos = pos

	if best_pos == Vector2i(-1, -1):
		_log("[color=green]%s calls upon the ancient forest, but no root tile is close enough![/color]\n" % attacker.name)
		combat.advance_turn()
		return

	# Build a minimal Sapling combatant dict matching existing combatant structure
	var sapling: Dictionary = combat.combatants[0].duplicate(true)
	sapling["name"] = "Sapling"
	sapling["side"] = attacker.side
	sapling["hp"] = 6
	sapling["max_hp"] = 6
	sapling["atk_modifier"] = 0
	sapling["def_modifier"] = 0
	sapling["mor_modifier"] = 0
	sapling["alive"] = true
	sapling["position"] = best_pos
	sapling["status_effects"] = []
	sapling["turn_taken"] = false
	sapling["corruption_tokens"] = 0
	sapling.erase("bonded_partner_idx")
	# Assign a minimal CombatantDefinition-like object from attacker's side
	# Keep definition reference from a friendly unit but override key stats
	var sapling_def: CombatantDefinition = attacker.definition.duplicate()
	sapling_def.atk = 6
	sapling_def.def = 3
	sapling_def.hp  = 6
	sapling_def.mov = 2
	sapling_def.unit_name = "Sapling"
	sapling["definition"] = sapling_def
	if sapling.get("sprite"):
		sapling["sprite"] = attacker.sprite  # Fallback — controller should reassign
	combat.combatants.append(sapling)
	combat.groups[attacker.side].append(combat.combatants.size() - 1)
	_log("[color=green]%s calls upon the ancient forest! A Sapling rises at (%d, %d)![/color]\n" % [
		attacker.name, best_pos.x, best_pos.y])
	combat.update_combatants.emit(combat.combatants)
	combat.advance_turn()


## Rootwalker: Reclaim — commander skill, convert 5 root tiles to deep root tiles
func reclaim(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	# Find root_tiles within 4 Manhattan tiles of attacker
	var nearby: Array = []
	for pos in state.root_tiles:
		var d = absi(attacker.position.x - pos.x) + absi(attacker.position.y - pos.y)
		if d <= 4:
			nearby.append(pos)
	if nearby.size() < 5:
		_log("[color=#8B4513]%s cannot reclaim — need at least 5 root tiles within 4 tiles (found %d).[/color]\n" % [
			attacker.name, nearby.size()])
		if attacker.side == 1:
			combat.advance_turn()
		return
	# Remove up to 5 from root_tiles and add to deep_root_tiles
	var to_convert = nearby.slice(0, 5)
	for pos in to_convert:
		state.root_tiles.erase(pos)
		if pos not in state.deep_root_tiles:
			state.deep_root_tiles.append(pos)
	_log("[color=#8B4513]%s reclaims the earth — Dense Roots form! (%d tiles converted)[/color]\n" % [
		attacker.name, to_convert.size()])
	combat.advance_turn()


# ══════════════════════════════════════════════════════════════
# UNIVERSAL SKILLS
# ══════════════════════════════════════════════════════════════

## Rally (universal commander ability)
func rally(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	if target.side != attacker.side:
		_log("Can only rally allies.\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	if not target.shaken:
		_log("%s is not Shaken.\n" % target.name)
		if attacker.side == 1:
			combat.advance_turn()
		return
	var result = combat.roll_morale(target)
	if result.passed:
		target.shaken = false
		_log("[color=lime]%s rallies %s! Shaken removed.[/color]\n" % [attacker.name, target.name])
	else:
		_log("[color=orange]%s fails to rally %s (rolled %d vs MOR %d)[/color]\n" % [
			attacker.name, target.name, result.total, result.mor])
	combat.advance_turn()

## Overwatch
func overwatch(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	attacker.overwatch_active = true
	_log("[color=steel_blue]%s sets Overwatch — will fire at next enemy in range.[/color]\n" % attacker.name)
	combat.advance_turn()

## Brace (universal) — hold position for +1 DEF, +1 MOR until next activation
func brace(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	attacker.def_modifier += 1
	attacker.mor_modifier += 1
	attacker["braced"] = true
	_log("[color=steel_blue]%s braces for impact! (+1 DEF, +1 MOR, cannot move)[/color]\n" % attacker.name)
	combat.advance_turn()


## Iron Dominion: Overcharge — Double ATK dice this attack, then take d3 self-damage
func overcharge_attack(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var original_atk = attacker.atk_modifier
	attacker.atk_modifier += attacker.definition.atk  # Effectively doubles ATK dice
	_log("[color=yellow]%s OVERCHARGES weapons! (Double ATK dice)[/color]\n" % attacker.name)
	combat.attack(attacker, target, "attack_ranged" if attacker.rng > 1 else "attack_melee", false)
	# Restore ATK modifier
	attacker.atk_modifier = original_atk
	# Self-damage: d3 (1-3)
	var self_damage = randi_range(1, 3)
	attacker.hp -= self_damage
	_log("[color=red]%s takes %d overcharge backlash damage![/color]\n" % [attacker.name, self_damage])
	if attacker.hp <= 0 and attacker.alive:
		combat.combatant_die(attacker)
	combat.update_combatants.emit(combat.combatants)
	combat.advance_turn()


# ══════════════════════════════════════════════════════════════
# INTERNAL
# ══════════════════════════════════════════════════════════════

func _log(message: String) -> void:
	skill_log.emit(message)
