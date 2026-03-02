extends Node
## FactionDatabase — Autoload singleton that loads all faction data and provides lookup.
## Access via: FactionDatabase.get_unit("Scorchcaller Vex"), etc.

# Preload faction data scripts
const _Emberclaw = preload("res://data/factions/emberclaw_warpack.gd")
const _IronDominion = preload("res://data/factions/iron_dominion.gd")
const _Nightfang = preload("res://data/factions/nightfang_dominion.gd")
const _Thornweft = preload("res://data/factions/thornweft_matriarchy.gd")
const _Veilbound = preload("res://data/factions/veilbound_shogunate.gd")

# ── Data Storage ───────────────────────────────────────
## All CombatantDefinition resources, keyed by unit name (lowercase)
var all_units: Dictionary = {}

## Units grouped by faction enum value → Array[CombatantDefinition]
var faction_units: Dictionary = {}

## Units grouped by faction enum → unit type enum → Array[CombatantDefinition]
var faction_type_units: Dictionary = {}

## Faction metadata
const FACTIONS = {
	CombatantDefinition.Faction.EMBERCLAW: {
		"id": "emberclaw_warpack", "name": "Emberclaw Warpack",
		"mechanic": "Heat Pool", "resource": "Heat",
	},
	CombatantDefinition.Faction.IRON_DOMINION: {
		"id": "iron_dominion", "name": "Iron Dominion",
		"mechanic": "Grid Cohesion", "resource": "Grid",
	},
	CombatantDefinition.Faction.NIGHTFANG: {
		"id": "nightfang_dominion", "name": "Nightfang Dominion",
		"mechanic": "Corruption / Hunger Pool", "resource": "Corruption",
	},
	CombatantDefinition.Faction.THORNWEFT: {
		"id": "thornweft_matriarchy", "name": "Thornweft Matriarchy",
		"mechanic": "Web-Anchor Network / Fate Threads", "resource": "Fate Threads",
	},
	CombatantDefinition.Faction.VEILBOUND: {
		"id": "veilbound_shogunate", "name": "Veilbound Shogunate",
		"mechanic": "Ritual Flow / Stances", "resource": "Flow",
	},
}

# ══════════════════════════════════════════════════════════════
# INITIALIZATION
# ══════════════════════════════════════════════════════════════

func _ready() -> void:
	_load_all_factions()
	print("[FactionDatabase] Loaded %d total units across %d factions." % [all_units.size(), faction_units.size()])

func _load_all_factions() -> void:
	# Initialize faction containers
	for f in CombatantDefinition.Faction.values():
		faction_units[f] = []
		faction_type_units[f] = {}
		for t in CombatantDefinition.UnitType.values():
			faction_type_units[f][t] = []

	# Load each faction's data
	_load_faction_data(_Emberclaw, CombatantDefinition.Faction.EMBERCLAW)
	_load_faction_data(_IronDominion, CombatantDefinition.Faction.IRON_DOMINION)
	_load_faction_data(_Nightfang, CombatantDefinition.Faction.NIGHTFANG)
	_load_faction_data(_Thornweft, CombatantDefinition.Faction.THORNWEFT)
	_load_faction_data(_Veilbound, CombatantDefinition.Faction.VEILBOUND)

func _load_faction_data(data_script, faction_enum: int) -> void:
	var raw_units: Array = data_script.get_units()
	for data in raw_units:
		var def := _dict_to_combatant(data)
		var key := def.unit_name.to_lower()
		all_units[key] = def
		faction_units[faction_enum].append(def)
		faction_type_units[faction_enum][def.unit_type].append(def)

## Convert a raw dictionary from faction data → CombatantDefinition resource.
func _dict_to_combatant(data: Dictionary) -> CombatantDefinition:
	var def := CombatantDefinition.new()
	def.unit_name = data.get("name", "")
	def.faction = data.get("faction", 0)
	def.unit_type = data.get("type", 1)
	def.atk = data.get("atk", 6)
	def.defense = data.get("def", 4)
	def.max_hp = data.get("hp", 3)
	def.mov = data.get("mov", 5)
	def.rng = data.get("rng", 1)
	def.mor = data.get("mor", 6)
	def.cmd = data.get("cmd", 0)
	def.pts = data.get("pts", 2)
	def.specials = PackedStringArray(data.get("specials", []))
	def.corruption_spread = data.get("corruption", 0)
	def.flow_value = data.get("flow", 0)
	def.is_legendary = data.get("legendary", false)
	def.legendary_commander = data.get("legendary_cmdr", "")
	# Assign procedural placeholder sprites
	SpriteGenerator.assign_sprites(def)
	return def

# ══════════════════════════════════════════════════════════════
# LOOKUP FUNCTIONS
# ══════════════════════════════════════════════════════════════

## Get a CombatantDefinition by exact name (case-insensitive).
func get_unit(unit_name: String) -> CombatantDefinition:
	return all_units.get(unit_name.to_lower(), null)

## Get all units belonging to a faction.
func get_faction(faction_enum: int) -> Array:
	return faction_units.get(faction_enum, [])

## Get units of a specific type within a faction.
func get_faction_type(faction_enum: int, type_enum: int) -> Array:
	if faction_type_units.has(faction_enum):
		return faction_type_units[faction_enum].get(type_enum, [])
	return []

## Get all commanders for a faction.
func get_commanders(faction_enum: int) -> Array:
	return get_faction_type(faction_enum, CombatantDefinition.UnitType.COMMANDER)

## Get all war machines for a faction.
func get_war_machines(faction_enum: int) -> Array:
	return get_faction_type(faction_enum, CombatantDefinition.UnitType.WAR_MACHINE)

## Get all legendary units for a faction.
func get_legendaries(faction_enum: int) -> Array:
	var result := []
	for unit in get_faction(faction_enum):
		if unit.is_legendary:
			result.append(unit)
	return result

## Get all non-commander, non-war-machine units (core army units).
func get_core_units(faction_enum: int) -> Array:
	var result := []
	for unit in get_faction(faction_enum):
		if not unit.is_commander() and not unit.is_war_machine():
			result.append(unit)
	return result

## Search units by keyword in name or specials. Returns Array[CombatantDefinition].
func search_units(query: String, faction_filter: int = -1) -> Array:
	var q := query.to_lower()
	var results := []
	for unit in all_units.values():
		if faction_filter >= 0 and unit.faction != faction_filter:
			continue
		if unit.unit_name.to_lower().contains(q):
			results.append(unit)
			continue
		for s in unit.specials:
			if s.to_lower().contains(q):
				results.append(unit)
				break
	return results

## Get total point cost for an array of CombatantDefinitions.
func calculate_army_cost(units: Array) -> int:
	var total := 0
	for unit in units:
		total += unit.pts
	return total

## Validate an army list against a battle size config.
func validate_army(units: Array, battle_size: String = "standard") -> Dictionary:
	var config = GameRules.BATTLE_SIZES.get(battle_size, GameRules.BATTLE_SIZES["standard"])
	var total_pts := calculate_army_cost(units)
	var wm_count := 0
	var legendary_count := 0
	var commanders := []
	var errors := []

	for unit in units:
		if unit.is_war_machine():
			wm_count += 1
		if unit.is_legendary:
			legendary_count += 1
		if unit.is_commander():
			commanders.append(unit)

	if total_pts > config["points_max"]:
		errors.append("Army exceeds max points (%d / %d)" % [total_pts, config["points_max"]])
	if total_pts < config["points_min"]:
		errors.append("Army below min points (%d / %d)" % [total_pts, config["points_min"]])
	if units.size() < config["min_units"]:
		errors.append("Too few units (%d / %d min)" % [units.size(), config["min_units"]])
	if units.size() > config["max_units"]:
		errors.append("Too many units (%d / %d max)" % [units.size(), config["max_units"]])
	if wm_count > config["max_war_machines"]:
		errors.append("Too many war machines (%d / %d max)" % [wm_count, config["max_war_machines"]])
	if legendary_count > 1:
		errors.append("Only 1 legendary unit allowed per army")
	if commanders.is_empty():
		errors.append("Army must include at least 1 commander")

	return {
		"valid": errors.is_empty(),
		"errors": errors,
		"total_pts": total_pts,
		"unit_count": units.size(),
		"wm_count": wm_count,
		"legendary_count": legendary_count,
		"commander_count": commanders.size(),
	}
