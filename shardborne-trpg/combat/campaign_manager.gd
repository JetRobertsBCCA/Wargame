extends Node
## CampaignManager — Manages multi-battle campaign progression.
## Tracks persistent army state, territory control, resource accumulation, and narrative.

signal campaign_battle_started(battle_info: Dictionary)
signal campaign_battle_ended(result: Dictionary)
signal campaign_ended(winner: String, summary: Dictionary)

# ══════════════════════════════════════════════════════════════
# CAMPAIGN DATA
# ══════════════════════════════════════════════════════════════

var campaign_name: String = "Shardborne Campaign"
var campaign_active: bool = false
var current_battle: int = 0
var max_battles: int = 5

## Per-side persistent state
var player_state: Dictionary = {}
var enemy_state: Dictionary = {}

## Battle history
var battle_history: Array = []

## Territory map (simple linear path)
var territories: Array = []

# ══════════════════════════════════════════════════════════════
# INITIALIZATION
# ══════════════════════════════════════════════════════════════

func start_campaign(player_faction: int, enemy_faction: int, battles: int = 5):
	campaign_active = true
	current_battle = 0
	max_battles = battles
	battle_history.clear()

	player_state = _create_campaign_state(player_faction)
	enemy_state = _create_campaign_state(enemy_faction)

	# Generate territory path
	territories = _generate_territories(battles)

func _create_campaign_state(faction: int) -> Dictionary:
	return {
		"faction": faction,
		"faction_name": _get_faction_name(faction),
		"victories": 0,
		"territories_held": 0,
		"glory_points": 0,    # Campaign-wide VP
		"resources": 50,      # For reinforcements/upgrades
		"army": [],           # Persistent army roster (unit names)
		"veterancy": {},      # unit_name -> {xp, level, bonuses}
		"casualties": [],     # Units lost across battles
		"reinforcements": 1,  # Free unit add per battle
	}

func _generate_territories(count: int) -> Array:
	var result := []
	var scenario_keys = GameRules.SCENARIOS.keys()
	for i in range(count):
		var idx = i % scenario_keys.size()
		result.append({
			"name": "Territory %d" % (i + 1),
			"scenario": scenario_keys[idx],
			"terrain_type": ["plains", "forest", "mountains", "ruins", "swamp"][i % 5],
			"bonus": ["resources", "veterancy", "reinforcement", "glory", "resources"][i % 5],
			"owner": -1,  # -1 = neutral, 0 = player, 1 = enemy
		})
	return result


# ══════════════════════════════════════════════════════════════
# BATTLE FLOW
# ══════════════════════════════════════════════════════════════

func get_next_battle() -> Dictionary:
	if current_battle >= max_battles:
		return {}

	var territory = territories[current_battle]
	return {
		"battle_number": current_battle + 1,
		"territory": territory,
		"scenario": territory.scenario,
		"player_faction": player_state.faction,
		"enemy_faction": enemy_state.faction,
		"player_army": player_state.army,
		"enemy_army": enemy_state.army,
	}

func begin_battle() -> Dictionary:
	var battle = get_next_battle()
	if battle.is_empty():
		return {}
	campaign_battle_started.emit(battle)
	return battle

func end_battle(winner_side: int, player_vp: int, enemy_vp: int, 
	player_casualties: Array, enemy_casualties: Array):
	var territory = territories[current_battle]

	var result = {
		"battle_number": current_battle + 1,
		"territory_name": territory.name,
		"scenario": territory.scenario,
		"winner": winner_side,
		"player_vp": player_vp,
		"enemy_vp": enemy_vp,
		"player_casualties": player_casualties,
		"enemy_casualties": enemy_casualties,
	}
	battle_history.append(result)

	# Update territory ownership
	territory.owner = winner_side

	# Update states
	if winner_side == 0:
		player_state.victories += 1
		player_state.territories_held += 1
		player_state.glory_points += player_vp + 5  # Bonus for winning
		player_state.resources += 20
		_apply_territory_bonus(player_state, territory)
	else:
		enemy_state.victories += 1
		enemy_state.territories_held += 1
		enemy_state.glory_points += enemy_vp + 5
		enemy_state.resources += 20
		_apply_territory_bonus(enemy_state, territory)

	# Process casualties — units can be healed between battles
	for name in player_casualties:
		player_state.casualties.append(name)
	for name in enemy_casualties:
		enemy_state.casualties.append(name)

	# Grant veterancy XP to surviving units
	_grant_veterancy(player_state, player_casualties)
	_grant_veterancy(enemy_state, enemy_casualties)

	current_battle += 1
	campaign_battle_ended.emit(result)

	# Check campaign end
	if current_battle >= max_battles:
		_finish_campaign()

	return result

func _apply_territory_bonus(state: Dictionary, territory: Dictionary):
	match territory.bonus:
		"resources":
			state.resources += 30
		"veterancy":
			# All surviving units get bonus XP
			for name in state.army:
				if not name in state.casualties:
					if not state.veterancy.has(name):
						state.veterancy[name] = {"xp": 0, "level": 0, "bonuses": []}
					state.veterancy[name].xp += 10
		"reinforcement":
			state.reinforcements += 1
		"glory":
			state.glory_points += 10

func _grant_veterancy(state: Dictionary, casualties: Array):
	for name in state.army:
		if name in casualties:
			continue  # Dead units don't get XP
		if not state.veterancy.has(name):
			state.veterancy[name] = {"xp": 0, "level": 0, "bonuses": []}
		state.veterancy[name].xp += 5
		# Level up check
		var vet = state.veterancy[name]
		while vet.xp >= _xp_for_level(vet.level + 1):
			vet.level += 1
			var bonus = _get_level_bonus(vet.level)
			vet.bonuses.append(bonus)

func _xp_for_level(level: int) -> int:
	return level * 15  # Linear scaling

func _get_level_bonus(level: int) -> String:
	var bonuses = ["+1 HP", "+1 ATK", "+1 DEF", "+1 MOV", "+1 MOR", "+1 HP"]
	return bonuses[(level - 1) % bonuses.size()]


# ══════════════════════════════════════════════════════════════
# REINFORCEMENT & RECOVERY
# ══════════════════════════════════════════════════════════════

## Recover a casualty by spending resources
func recover_unit(state: Dictionary, unit_name: String) -> bool:
	if unit_name not in state.casualties:
		return false
	var cost = 15  # Base recovery cost
	var unit_def = FactionDatabase.get_unit(unit_name)
	if unit_def:
		cost = unit_def.pts / 2  # Half original point cost
	if state.resources < cost:
		return false
	state.resources -= cost
	state.casualties.erase(unit_name)
	return true

## Add a new unit as reinforcement
func add_reinforcement(state: Dictionary, unit_name: String) -> bool:
	if state.reinforcements <= 0:
		return false
	var unit_def = FactionDatabase.get_unit(unit_name)
	if unit_def == null:
		return false
	if unit_def.pts > state.resources:
		return false
	state.resources -= unit_def.pts
	state.reinforcements -= 1
	state.army.append(unit_name)
	return true

## Apply veterancy bonuses to a CombatantDefinition
func apply_veterancy(state: Dictionary, unit_name: String, comb: Dictionary) -> void:
	if not state.veterancy.has(unit_name):
		return
	var vet = state.veterancy[unit_name]
	for bonus in vet.bonuses:
		match bonus:
			"+1 HP":
				comb.max_hp += 1
				comb.hp += 1
			"+1 ATK":
				comb.atk += 1
			"+1 DEF":
				comb.defense += 1
			"+1 MOV":
				comb.mov += 1
			"+1 MOR":
				comb.mor += 1


# ══════════════════════════════════════════════════════════════
# CAMPAIGN END
# ══════════════════════════════════════════════════════════════

func _finish_campaign():
	var winner: String
	if player_state.glory_points > enemy_state.glory_points:
		winner = player_state.faction_name
	elif enemy_state.glory_points > player_state.glory_points:
		winner = enemy_state.faction_name
	else:
		# Tiebreaker: most territories
		if player_state.territories_held > enemy_state.territories_held:
			winner = player_state.faction_name
		else:
			winner = enemy_state.faction_name

	var summary = {
		"winner": winner,
		"player_glory": player_state.glory_points,
		"enemy_glory": enemy_state.glory_points,
		"player_victories": player_state.victories,
		"enemy_victories": enemy_state.victories,
		"battles_fought": battle_history.size(),
		"total_player_casualties": player_state.casualties.size(),
		"total_enemy_casualties": enemy_state.casualties.size(),
	}

	campaign_active = false
	campaign_ended.emit(winner, summary)

func _get_faction_name(faction: int) -> String:
	for key in FactionDatabase.FACTIONS:
		var f = FactionDatabase.FACTIONS[key]
		if f.get("faction_enum", -1) == faction:
			return f.get("name", "Unknown")
	match faction:
		CombatantDefinition.Faction.EMBERCLAW: return "Emberclaw Warpack"
		CombatantDefinition.Faction.IRON_DOMINION: return "Iron Dominion"
		CombatantDefinition.Faction.NIGHTFANG: return "Nightfang Dominion"
		CombatantDefinition.Faction.THORNWEFT: return "Thornweft Matriarchy"
		CombatantDefinition.Faction.VEILBOUND: return "Veilbound Shogunate"
	return "Unknown"


# ══════════════════════════════════════════════════════════════
# STATUS / UI HELPERS
# ══════════════════════════════════════════════════════════════

func get_campaign_summary_text() -> String:
	var text := "[color=gold]%s — Battle %d / %d[/color]\n" % [
		campaign_name, current_battle + 1, max_battles]
	text += "%s: %d Glory, %d Territories\n" % [
		player_state.faction_name, player_state.glory_points, player_state.territories_held]
	text += "%s: %d Glory, %d Territories\n" % [
		enemy_state.faction_name, enemy_state.glory_points, enemy_state.territories_held]
	return text

func get_territory_map_text() -> String:
	var text := ""
	for i in range(territories.size()):
		var t = territories[i]
		var marker = "[ ]"
		if t.owner == 0: marker = "[P]"
		elif t.owner == 1: marker = "[E]"
		if i == current_battle: marker = "[>]"
		text += "%s %s (%s)\n" % [marker, t.name, t.scenario]
	return text
