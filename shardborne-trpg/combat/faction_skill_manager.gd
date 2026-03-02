extends RefCounted
class_name FactionSkillManager
## FactionSkillManager — Executes all faction-specific skills.
## Extracted from Combat.gd to keep combat logic modular and each faction self-contained.
##
## Each skill method follows the signature: func skill_name(combat, attacker, target) -> void
## where `combat` is the Combat node reference for accessing combatants, groups, etc.

signal skill_log(message: String)


# ══════════════════════════════════════════════════════════════
# SKILL DISPATCH
# ══════════════════════════════════════════════════════════════

## Execute a faction skill by key. Returns true if handled, false if not found.
func execute_skill(skill_key: String, combat: Node, attacker: Dictionary, target: Dictionary) -> bool:
	if not has_method(skill_key):
		return false
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
	if state.heat < 5:
		_log("Not enough Heat (need 5, have %d).\n" % state.heat)
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.heat -= 5
	_log("[color=red]%s vents Heat (-5 → %d)! AoE damage![/color]\n" % [attacker.name, state.heat])
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


# ══════════════════════════════════════════════════════════════
# NIGHTFANG SKILLS
# ══════════════════════════════════════════════════════════════

## Nightfang: Corrupt Bite — enhanced corruption on melee hit
func corrupt_bite(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	_log("[color=purple]%s delivers a Corrupt Bite![/color]\n" % attacker.name)
	var old_corruption = attacker.definition.corruption_spread
	attacker.definition.corruption_spread = maxi(old_corruption, 2)
	combat.attack(attacker, target, "attack_melee")
	attacker.definition.corruption_spread = old_corruption

## Nightfang: Blood Tithe — sacrifice HP to buff nearby allies
func blood_tithe(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	if attacker.hp <= 1:
		_log("Not enough HP for Blood Tithe.\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	attacker.hp -= 1
	var state = combat.faction_state[attacker.side]
	state.hunger += 1
	combat._update_hunger_tier(attacker.side)
	for idx in combat.groups[attacker.side]:
		var ally = combat.combatants[idx]
		if ally.alive and combat.get_distance(attacker, ally) <= 3:
			ally.atk_modifier += 1
	_log("[color=crimson]%s performs Blood Tithe (-1 HP, nearby allies +1 ATK, +1 Hunger → %d)[/color]\n" % [
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
			attacker.position = dest
			attacker.sprite.position = Vector2(dest.x * 32 + 16, dest.y * 32 + 16)
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
	var state = combat.faction_state[attacker.side]
	state.hunger += 3
	combat._update_hunger_tier(attacker.side)
	_log("[color=crimson]%s feasts! +%d HP, +3 Hunger → %d[/color]\n" % [
		attacker.name, heal, state.hunger])
	combat.update_combatants.emit(combat.combatants)
	combat.advance_turn()

## Nightfang: Terror Shriek — force morale checks on nearby enemies
func terror_shriek(combat: Node, attacker: Dictionary, _target: Dictionary) -> void:
	_log("[color=purple]%s unleashes a Terror Shriek![/color]\n" % attacker.name)
	var enemy_side = 1 if attacker.side == 0 else 0
	for idx in combat.groups[enemy_side]:
		var enemy = combat.combatants[idx]
		if enemy.alive and combat.get_distance(attacker, enemy) <= 4:
			combat.check_morale(enemy)
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
func stance_strike(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.flow < 1:
		_log("Not enough Flow.\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.flow -= 1
	_log("[color=cyan]%s performs Stance Strike (%s stance)![/color]\n" % [
		attacker.name, attacker.stance])
	combat.attack(attacker, target, "attack_melee")

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
func phase_strike(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.flow < 2:
		_log("Not enough Flow (need 2).\n")
		if attacker.side == 1:
			combat.advance_turn()
		return
	state.flow -= 2
	_log("[color=cyan]%s phases through the Veil to strike![/color]\n" % attacker.name)
	combat.attack(attacker, target, "attack_melee")

## Veilbound: Veil Walk — teleport adjacent to ally
func veil_walk(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.flow < 3:
		_log("Not enough Flow (need 3).\n")
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
			attacker.position = dest
			attacker.sprite.position = Vector2(dest.x * 32 + 16, dest.y * 32 + 16)
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
func honor_guard(combat: Node, attacker: Dictionary, target: Dictionary) -> void:
	var state = combat.faction_state[attacker.side]
	if state.flow < 1:
		_log("Not enough Flow.\n")
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


# ══════════════════════════════════════════════════════════════
# INTERNAL
# ══════════════════════════════════════════════════════════════

func _log(message: String) -> void:
	skill_log.emit(message)
