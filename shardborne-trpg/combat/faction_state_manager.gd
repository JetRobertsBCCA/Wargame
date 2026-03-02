extends RefCounted
class_name FactionStateManager
## FactionStateManager — Manages all per-faction state, round-start processing,
## and faction-specific helper calculations.
## Extracted from Combat.gd to isolate faction mechanics from core combat logic.

signal faction_log(message: String)


# ══════════════════════════════════════════════════════════════
# STATE INITIALIZATION
# ══════════════════════════════════════════════════════════════

## Create and return the initial state dict for a given faction.
static func create_faction_state(faction: int) -> Dictionary:
	match faction:
		CombatantDefinition.Faction.EMBERCLAW:
			return {
				"heat": 0,
				"heat_max": GameRules.HEAT_MAX,
				"overheat_this_round": false,
				"drake_bonds": [],   # Array of [rider_idx, drake_idx] pairs
			}
		CombatantDefinition.Faction.IRON_DOMINION:
			return {
				"grid_cohesion": 0,
				"fragments_placed": 0,
			}
		CombatantDefinition.Faction.NIGHTFANG:
			return {
				"hunger": 0,
				"hunger_tier": "peckish",
			}
		CombatantDefinition.Faction.THORNWEFT:
			return {
				"fate_threads": 0,
				"web_anchors": [],
				"teleports_used": 0,
			}
		CombatantDefinition.Faction.VEILBOUND:
			return {
				"flow": 0,
				"flow_max": GameRules.FLOW_MAX,
				"flow_tier": "none",
				"active_stance": "balanced",
			}
		_:
			return {}


# ══════════════════════════════════════════════════════════════
# ROUND-START PROCESSING
# ══════════════════════════════════════════════════════════════

## Process round-start effects for one side. Called from Combat._on_round_start().
func process_round_start(side: int, faction: int, state: Dictionary,
		combatants: Array, groups: Array) -> void:
	match faction:
		CombatantDefinition.Faction.EMBERCLAW:
			_emberclaw_round_start(side, state, combatants, groups)
		CombatantDefinition.Faction.IRON_DOMINION:
			_iron_dominion_round_start(side, state, combatants, groups)
		CombatantDefinition.Faction.NIGHTFANG:
			_nightfang_round_start(combatants)
		CombatantDefinition.Faction.THORNWEFT:
			_thornweft_round_start(side, state)
		CombatantDefinition.Faction.VEILBOUND:
			_veilbound_round_start(side, state, combatants, groups)


func _emberclaw_round_start(side: int, state: Dictionary,
		combatants: Array, groups: Array) -> void:
	# Step 1: Cooldown first (lose 3 Heat — forges cool)
	var cooldown = mini(state.heat, GameRules.HEAT_COOLDOWN_PER_TURN)
	state.heat = maxi(0, state.heat - cooldown)
	state.overheat_this_round = false

	# Step 2: Generate Heat from Fire keyword units
	var fire_heat := 0
	for idx in groups[side]:
		var comb = combatants[idx]
		if comb.alive and comb.definition.has_special("Fire"):
			fire_heat += GameRules.HEAT_GENERATION.get("fire_unit", 1)
	state.heat = mini(state.heat + fire_heat, state.heat_max)

	# Step 3: Commander generates Heat = half CMD (rounded up)
	var cmd_heat := 0
	for idx in groups[side]:
		var comb = combatants[idx]
		if comb.alive and comb.definition.unit_type == CombatantDefinition.UnitType.COMMANDER:
			var cmd_stat = comb.definition.cmd if comb.definition.cmd > 0 else 0
			cmd_heat += ceili(cmd_stat / 2.0)
	state.heat = mini(state.heat + cmd_heat, state.heat_max)

	if cooldown > 0 or fire_heat > 0 or cmd_heat > 0:
		_log("[color=orange]Emberclaw Heat: -%d cooldown, +%d fire units, +%d commander CMD = %d[/color]\n" % [
			cooldown, fire_heat, cmd_heat, state.heat])

	# Step 4: Check for Overheat (>15 at end of phase)
	if state.heat > GameRules.HEAT_MAX:
		state.overheat_this_round = true
		state.heat = GameRules.HEAT_OVERHEAT_RESET
		# All Emberclaw units suffer 1 damage from thermal backlash
		for idx in groups[side]:
			var comb = combatants[idx]
			if comb.alive:
				comb.hp -= 1
				if comb.hp <= 0:
					comb.alive = false
		_log("[color=red]OVERHEAT! Heat reset to %d. All units suffer 1 damage![/color]\n" % state.heat)


## Emberclaw: Auto-detect Drake Bond pairs from units with "Drake Bond" special.
## Call once at battle start to populate state.drake_bonds.
func setup_drake_bonds(side: int, state: Dictionary,
		combatants: Array, groups: Array) -> void:
	var bond_units := []
	for idx in groups[side]:
		var comb = combatants[idx]
		if comb.definition.has_special("Drake Bond"):
			bond_units.append(idx)
	# Pair them up (first with second, third with fourth, etc.)
	state.drake_bonds = []
	for i in range(0, bond_units.size() - 1, 2):
		state.drake_bonds.append([bond_units[i], bond_units[i + 1]])
		var a = combatants[bond_units[i]]
		var b = combatants[bond_units[i + 1]]
		a["bonded_partner_idx"] = bond_units[i + 1]
		b["bonded_partner_idx"] = bond_units[i]
		_log("[color=orange]Drake Bond: %s <-> %s[/color]\n" % [a.name, b.name])


## Emberclaw: Get the bonded partner of a Drake Bond unit (or null).
func get_drake_bond_partner(comb: Dictionary, combatants: Array) -> Dictionary:
	var partner_idx = comb.get("bonded_partner_idx", -1)
	if partner_idx >= 0 and partner_idx < combatants.size():
		return combatants[partner_idx]
	return {}


## Emberclaw: Drake Bond ATK bonus (+1 ATK when within 6 tiles of partner).
func get_drake_bond_atk_bonus(comb: Dictionary, combatants: Array) -> int:
	var partner = get_drake_bond_partner(comb, combatants)
	if partner.is_empty() or not partner.get("alive", false):
		return 0
	if _distance(comb, partner) <= 6:
		return 1
	return 0


## Emberclaw: Handle Drake Bond death — partner gains Vengeful status.
func on_drake_bond_death(dead: Dictionary, combatants: Array) -> void:
	var partner = get_drake_bond_partner(dead, combatants)
	if partner.is_empty() or not partner.get("alive", false):
		return
	# Grant Vengeful status: +2 ATK, +2 MOV, Fearless
	if "vengeful" not in partner.get("status_effects", []):
		partner.status_effects.append("vengeful")
		partner.atk_modifier += 2
		partner.mov += 2
		_log("[color=red]%s VENGEFUL — their bonded partner %s has fallen! +2 ATK, +2 MOV, Fearless.[/color]\n" % [
			partner.name, dead.name])


func _iron_dominion_round_start(side: int, state: Dictionary,
		combatants: Array, groups: Array) -> void:
	recalculate_grid_cohesion(side, state, combatants, groups)


func _nightfang_round_start(combatants: Array) -> void:
	process_corruption_effects(combatants)


func _thornweft_round_start(side: int, state: Dictionary) -> void:
	var threads = mini(GameRules.MAX_FATE_THREADS_PER_TURN, count_web_anchors(state))
	state.fate_threads += threads
	state.teleports_used = 0
	if threads > 0:
		_log("[color=green]Thornweft gains %d Fate Threads (total: %d)[/color]\n" % [
			threads, state.fate_threads])


func _veilbound_round_start(side: int, state: Dictionary,
		combatants: Array, groups: Array) -> void:
	var flow_gain := 0
	for idx in groups[side]:
		var comb = combatants[idx]
		if comb.alive and comb.definition.flow_value > 0:
			flow_gain += comb.definition.flow_value
		# Revelation stance generates +1 Flow per unit in that stance
		if comb.alive and comb.get("stance", "") == "revelation":
			flow_gain += 1
	state.flow = mini(state.flow + flow_gain, state.flow_max)
	update_flow_tier(state)
	if flow_gain > 0:
		_log("[color=cyan]Veilbound gains %d Flow (total: %d — %s)[/color]\n" % [
			flow_gain, state.flow, state.flow_tier])


## Veilbound: Switch a unit's stance between honor and revelation.
## Only infantry and cavalry can use stances. Free action during Command Phase.
## Returns true if stance was changed.
func switch_stance(comb: Dictionary, new_stance: String) -> bool:
	if comb.definition.faction != CombatantDefinition.Faction.VEILBOUND:
		return false
	if not comb.alive:
		return false
	# Only infantry and cavalry can switch stances
	var utype = comb.definition.unit_type
	if utype != CombatantDefinition.UnitType.INFANTRY and \
		utype != CombatantDefinition.UnitType.CAVALRY:
		_log("[color=gray]%s cannot switch stances (only infantry/cavalry).[/color]\n" % comb.name)
		return false
	if new_stance != "honor" and new_stance != "revelation":
		return false
	var old_stance = comb.get("stance", "")
	if old_stance == new_stance:
		return false  # Already in this stance

	# Remove old stance modifiers
	if old_stance in GameRules.STANCES:
		var old_mod = GameRules.STANCES[old_stance]
		comb.atk_modifier -= old_mod.get("atk_mod", 0)
		comb.def_modifier -= old_mod.get("def_mod", 0)

	# Apply new stance modifiers
	comb.stance = new_stance
	var new_mod = GameRules.STANCES[new_stance]
	comb.atk_modifier += new_mod.get("atk_mod", 0)
	comb.def_modifier += new_mod.get("def_mod", 0)

	_log("[color=cyan]%s switches to %s Stance (%s)[/color]\n" % [
		comb.name, new_stance.capitalize(), new_mod.get("extra", "")])
	return true


# ══════════════════════════════════════════════════════════════
# FACTION COMBAT MODIFIERS
# ══════════════════════════════════════════════════════════════

## Calculate faction-specific ATK bonus for an attacker.
func get_faction_attack_bonus(attacker: Dictionary, _target: Dictionary,
		_attack_key: String, faction_state: Array,
		combatants: Array, groups: Array) -> int:
	var bonus := 0
	var def: CombatantDefinition = attacker.definition
	var state = faction_state[attacker.side]

	# ── Universal Keyword Bonuses ──
	# Assassin: +2 ATK vs Commanders
	if def.has_special("Assassin") and _target.definition.is_commander():
		bonus += 2
	# Anti-Large: +2 ATK vs War Machines
	if def.has_special("Anti-Large") and _target.definition.is_war_machine():
		bonus += 2
	# Anti-Armor: +2 ATK vs War Machines
	if def.has_special("Anti-Armor") and _target.definition.is_war_machine():
		bonus += 2
	# Commander Hunter: +2 ATK vs Commanders
	if def.has_special("Commander Hunter") and _target.definition.is_commander():
		bonus += 2
	# Executioner: +2 ATK vs targets below half HP
	if def.has_special("Executioner") and _target.hp < _target.max_hp / 2:
		bonus += 2
	# Swarm: +1 ATK for every 2 friendly Swarm units within 3"
	if def.has_special("Swarm"):
		var nearby_swarm = count_nearby_with_special(attacker, "Swarm", 3, combatants, groups)
		bonus += nearby_swarm / 2
	# Armour Piercing: effectively -1 target DEF (we add +1 ATK as equivalent)
	if def.has_special("Armour Piercing"):
		bonus += 1
	# Sniper: ignore cover penalty (handled elsewhere, but +1 ATK at range)
	if def.has_special("Sniper") and _attack_key == "attack_ranged":
		bonus += 1
	# Charge keyword: extra +1 ATK on charge (stacks with base charge bonus)
	if def.has_special("Charge") and attacker.get("has_charged", false) and _attack_key == "attack_melee":
		bonus += 1

	# ── Faction-Specific Bonuses ──
	match def.faction:
		CombatantDefinition.Faction.EMBERCLAW:
			if state.get("heat", 0) >= 8:
				bonus += 1

		CombatantDefinition.Faction.IRON_DOMINION:
			var grid_tier = get_grid_tier(attacker, combatants, groups)
			bonus += grid_tier.get("atk_mod", 0)

		CombatantDefinition.Faction.NIGHTFANG:
			if def.has_special("Pack Tactics"):
				var nearby_pack = count_nearby_with_special(attacker, "Pack Tactics", 3, combatants, groups)
				if nearby_pack >= 2:
					bonus += 1
			if def.has_special("Blood-Drunk") and attacker.hp <= attacker.max_hp / 2:
				bonus += 1

		CombatantDefinition.Faction.VEILBOUND:
			if attacker.stance == "revelation":
				bonus += 1
			elif attacker.stance == "honor":
				bonus -= 1

	return bonus

## Calculate faction-specific DEF bonus for a target.
func get_faction_defense_bonus(target: Dictionary, faction_state: Array,
		combatants: Array, groups: Array) -> int:
	var bonus := 0
	var def: CombatantDefinition = target.definition

	# ── Universal Keyword Bonuses ──
	# Shield Wall: +1 DEF if adjacent ally also has Shield Wall
	if def.has_special("Shield Wall"):
		var nearby_sw = count_nearby_with_special(target, "Shield Wall", 2, combatants, groups)
		if nearby_sw >= 1:
			bonus += 1
	# Brace: +1 DEF if unit didn't move this turn
	if def.has_special("Brace") and target.turn_taken == false:
		bonus += 1
	# Mist Form: +1 DEF
	if def.has_special("Mist Form"):
		bonus += 1
	# Bulwark: adjacent allies gain +1 DEF vs ranged (check if any ally with Bulwark is adjacent)
	for idx in groups[target.side]:
		var ally = combatants[idx]
		if ally != target and ally.alive and ally.definition.has_special("Bulwark"):
			if _distance(target, ally) <= 1:
				bonus += 1
				break
	# Ward: +1 DEF vs magic/fragment attacks (approximated by checking basic_magic)
	if def.has_special("Ward"):
		bonus += 1  # Conservative: always applies (magic detection is complex)
	# Towering: provides cover to adjacent allies
	if not def.has_special("Towering"):
		for idx in groups[target.side]:
			var ally = combatants[idx]
			if ally.alive and ally.definition.has_special("Towering") and _distance(target, ally) <= 1:
				bonus += 1
				break

	# ── Faction-Specific Bonuses ──
	match def.faction:
		CombatantDefinition.Faction.IRON_DOMINION:
			var grid_tier = get_grid_tier(target, combatants, groups)
			bonus += grid_tier.get("def_mod", 0)

		CombatantDefinition.Faction.VEILBOUND:
			if target.stance == "honor":
				bonus += 1
			elif target.stance == "revelation":
				bonus -= 1

		CombatantDefinition.Faction.THORNWEFT:
			var web_tier = get_web_tier(target, faction_state, combatants, groups)
			bonus += web_tier.get("def_mod", 0)

		CombatantDefinition.Faction.NIGHTFANG:
			# Nocturnal Predators: +1 DEF when in cover (checked via status tag)
			if target.get("_in_cover", false):
				bonus += 1

	return bonus


# ══════════════════════════════════════════════════════════════
# POST-ATTACK FACTION EFFECTS
# ══════════════════════════════════════════════════════════════

## Called after a successful hit lands.
func on_attack_hit(attacker: Dictionary, target: Dictionary,
		_result: Dictionary, attack_key: String,
		faction_state_dict: Array) -> void:
	var a_def: CombatantDefinition = attacker.definition

	# Emberclaw: Generate Heat on fire attacks
	if a_def.faction == CombatantDefinition.Faction.EMBERCLAW:
		if a_def.has_special("Fire") or a_def.has_special("Breath Weapon"):
			var state = faction_state_dict[attacker.side]
			state.heat = mini(state.heat + GameRules.HEAT_GENERATION.get("breath_weapon", 2), state.heat_max)
		# Apply burning on fire/breath weapon hits (crits always burn)
		if target.alive and (a_def.has_special("Fire") or a_def.has_special("Breath Weapon")):
			if _result.crits > 0 and "burning" not in target.get("status_effects", []):
				target.status_effects.append("burning")
				_log("[color=orange]%s is set ABLAZE![/color]\n" % target.name)

	# Nightfang: Apply corruption tokens
	if a_def.faction == CombatantDefinition.Faction.NIGHTFANG:
		if attack_key == "attack_melee" and a_def.corruption_spread > 0:
			var tokens = a_def.corruption_spread
			target.corruption_tokens = mini(target.corruption_tokens + tokens, GameRules.MAX_CORRUPTION_TOKENS)
			_log("[color=purple]%s applies %d corruption to %s (total: %d)[/color]\n" % [
				attacker.name, tokens, target.name, target.corruption_tokens])

	# Nightfang: Blood Drain
	if a_def.has_special("Blood Drain") and not target.alive:
		attacker.hp = mini(attacker.hp + 1, attacker.max_hp)
		_log("[color=crimson]%s drains blood — heals 1 HP![/color]\n" % attacker.name)

	# Nightfang: Feed Hunger Pool on kill
	if a_def.faction == CombatantDefinition.Faction.NIGHTFANG and not target.alive:
		var state = faction_state_dict[attacker.side]
		state.hunger += 1
		update_hunger_tier(state)


## Called after any attack completes (hit or miss).
func on_attack_complete(attacker: Dictionary, _target: Dictionary,
		_attack_key: String, faction_state_dict: Array) -> void:
	# Emberclaw: Generate heat on fire kill
	if attacker.definition.faction == CombatantDefinition.Faction.EMBERCLAW and not _target.alive:
		if attacker.definition.has_special("Fire"):
			var state = faction_state_dict[attacker.side]
			state.heat = mini(state.heat + GameRules.HEAT_GENERATION.get("fire_kill", 1), state.heat_max)
			_log("[color=orange]%s fire kill: +%d Heat (total: %d)[/color]\n" % [
				attacker.name, GameRules.HEAT_GENERATION.get("fire_kill", 1), state.heat])

	# Emberclaw: Breath Weapon attacks generate 2 Heat
	if attacker.definition.faction == CombatantDefinition.Faction.EMBERCLAW:
		if attacker.definition.has_special("Breath Weapon") and _attack_key == "attack_ranged":
			var state = faction_state_dict[attacker.side]
			var bw_heat = GameRules.HEAT_GENERATION.get("breath_weapon", 2)
			state.heat = mini(state.heat + bw_heat, state.heat_max)
			_log("[color=orange]%s Breath Weapon: +%d Heat (total: %d)[/color]\n" % [
				attacker.name, bw_heat, state.heat])

	# Veilbound: Revelation stance generates flow
	if attacker.definition.faction == CombatantDefinition.Faction.VEILBOUND:
		if attacker.stance == "revelation":
			var state = faction_state_dict[attacker.side]
			state.flow = mini(state.flow + 1, state.flow_max)


# ══════════════════════════════════════════════════════════════
# FACTION HELPERS — Grid, Corruption, Hunger, Web, Flow
# ══════════════════════════════════════════════════════════════

## Iron Dominion: Determine grid tier for a combatant.
func get_grid_tier(comb: Dictionary, combatants: Array, groups: Array) -> Dictionary:
	var allies_in_range := 0
	var has_support := false
	for idx in groups[comb.side]:
		var ally = combatants[idx]
		if ally != comb and ally.alive and _distance(comb, ally) <= GameRules.GRID_RANGE:
			# Grid Anchor counts as 2 units for Grid Cohesion
			var count := 1
			if ally.definition.has_special("Grid Anchor"):
				count = 2
			allies_in_range += count
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


## Iron Dominion: Recalculate grid cohesion count for a side.
func recalculate_grid_cohesion(side: int, state: Dictionary,
		combatants: Array, groups: Array) -> void:
	var total_connected := 0
	for idx in groups[side]:
		var comb = combatants[idx]
		if comb.alive:
			var tier = get_grid_tier(comb, combatants, groups)
			if tier.get("atk_mod", 0) > 0:
				total_connected += 1
	state.grid_cohesion = total_connected


## Nightfang: Get DEF penalty from corruption tokens.
static func get_corruption_def_penalty(tokens: int) -> int:
	if tokens >= 9:
		return GameRules.CORRUPTION_THRESHOLDS["consumed"]["def_mod"]
	elif tokens >= 6:
		return GameRules.CORRUPTION_THRESHOLDS["corrupted"]["def_mod"]
	elif tokens >= 3:
		return GameRules.CORRUPTION_THRESHOLDS["tainted"]["def_mod"]
	return 0


## Nightfang: Apply corruption debuffs each round.
## Idempotent — sets modifiers from scratch rather than adding, safe for mirror matches.
func process_corruption_effects(combatants: Array) -> void:
	for comb in combatants:
		if comb.alive and comb.corruption_tokens > 0:
			var threshold := ""
			if comb.corruption_tokens >= 9:
				threshold = "consumed"
			elif comb.corruption_tokens >= 6:
				threshold = "corrupted"
			elif comb.corruption_tokens >= 3:
				threshold = "tainted"
			if threshold != "":
				var effects = GameRules.CORRUPTION_THRESHOLDS[threshold]
				# Mark the corruption contribution separately to avoid double-stacking
				var old_corr_atk = comb.get("_corruption_atk", 0)
				var old_corr_mor = comb.get("_corruption_mor", 0)
				var new_corr_atk = effects.get("atk_mod", 0)
				var new_corr_mor = effects.get("mor_mod", 0)
				comb.atk_modifier += (new_corr_atk - old_corr_atk)
				comb.mor_modifier += (new_corr_mor - old_corr_mor)
				comb["_corruption_atk"] = new_corr_atk
				comb["_corruption_mor"] = new_corr_mor


## Nightfang: Update hunger tier based on current hunger value.
## Uses battle_size from BattleConfig to scale thresholds.
static func update_hunger_tier(state: Dictionary) -> void:
	var size_key = BattleConfig.battle_size if BattleConfig else "standard"
	var config = GameRules.BATTLE_SIZES.get(size_key, GameRules.BATTLE_SIZES["standard"])["hunger_thresholds"]
	var old_tier = state.get("hunger_tier", "peckish")
	if state.hunger >= config.get("gorged", 15):
		state.hunger_tier = "gorged"
	elif state.hunger >= config.get("ravenous", 10):
		state.hunger_tier = "ravenous"
	else:
		state.hunger_tier = "peckish"
	# Log tier change
	if state.hunger_tier != old_tier:
		print("[Nightfang] Hunger tier changed: %s -> %s (battle size: %s)" % [old_tier, state.hunger_tier, size_key])


## Thornweft: Count active web anchors (including starting anchors).
static func count_web_anchors(state: Dictionary) -> int:
	return state.get("web_anchors", []).size() + GameRules.STARTING_ANCHORS


## Thornweft: Determine web tier for a combatant based on PROXIMITY to Web-Anchors.
## Counts Web-Anchor units within ANCHOR_RANGE tiles of this specific combatant.
func get_web_tier(comb: Dictionary, faction_state: Array,
		combatants: Array = [], groups: Array = []) -> Dictionary:
	# Count anchors within range of this specific unit
	var anchor_count := 0
	var side = comb.get("side", 0)
	if combatants.size() > 0 and groups.size() > side:
		for idx in groups[side]:
			var ally = combatants[idx]
			if ally != comb and ally.alive:
				if ally.definition.has_special("Web-Anchor") or ally.definition.has_special("Mobile Web-Anchor"):
					if _distance(comb, ally) <= GameRules.ANCHOR_RANGE:
						anchor_count += 1
	# Also count placed web anchors from state
	var state = faction_state[side]
	for anchor_pos in state.get("web_anchors", []):
		if typeof(anchor_pos) == TYPE_VECTOR2I:
			var dist = absi(comb.position.x - anchor_pos.x) + absi(comb.position.y - anchor_pos.y)
			if dist <= GameRules.ANCHOR_RANGE:
				anchor_count += 1
	# Add starting anchors (assume they are near the deployment zone)
	anchor_count += GameRules.STARTING_ANCHORS

	if anchor_count >= 3:
		return GameRules.WEB_TIERS["enthroned"]
	elif anchor_count >= 2:
		return GameRules.WEB_TIERS["woven"]
	elif anchor_count >= 1:
		return GameRules.WEB_TIERS["threaded"]
	else:
		return GameRules.WEB_TIERS["severed"]


## Veilbound: Update flow tier from current flow amount.
static func update_flow_tier(state: Dictionary) -> void:
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


## Count adjacent (distance <= 1) alive allies.
func count_adjacent_allies(comb: Dictionary, combatants: Array, groups: Array) -> int:
	var count := 0
	for idx in groups[comb.side]:
		var ally = combatants[idx]
		if ally != comb and ally.alive and _distance(comb, ally) <= 1:
			count += 1
	return count


## Count alive allies within range that have the specified special.
func count_nearby_with_special(comb: Dictionary, special: String, range_tiles: int,
		combatants: Array, groups: Array) -> int:
	var count := 0
	for idx in groups[comb.side]:
		var ally = combatants[idx]
		if ally != comb and ally.alive and _distance(comb, ally) <= range_tiles:
			if ally.definition.has_special(special):
				count += 1
	return count


# ══════════════════════════════════════════════════════════════
# INTERNAL
# ══════════════════════════════════════════════════════════════

## Manhattan distance between two combatants.
static func _distance(a: Dictionary, b: Dictionary) -> int:
	return absi(a.position.x - b.position.x) + absi(a.position.y - b.position.y)


func _log(message: String) -> void:
	faction_log.emit(message)
