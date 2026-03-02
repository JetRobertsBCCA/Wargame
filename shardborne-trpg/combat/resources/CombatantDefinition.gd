extends Resource
class_name CombatantDefinition

## Shardborne unit definition — holds all stats for commanders, units, and war machines.

# ── Enums ──────────────────────────────────────────────
enum Faction { EMBERCLAW, IRON_DOMINION, NIGHTFANG, THORNWEFT, VEILBOUND }
enum UnitType { COMMANDER, INFANTRY, CAVALRY, SUPPORT, SCOUT, ARTILLERY, SPECIALIST, WAR_MACHINE }
enum MovementClass { GROUND, FLYING, MOUNTED }

# ── Identity ───────────────────────────────────────────
@export var unit_name: String = ""
@export var faction: Faction = Faction.EMBERCLAW
@export var unit_type: UnitType = UnitType.INFANTRY

# ── Core Stats (Shardborne) ────────────────────────────
@export_group("Core Stats")
@export var atk: int = 6          ## Number of d6 rolled when attacking
@export var defense: int = 4      ## Target number on d6 to score a hit
@export var max_hp: int = 3       ## Hit points
@export var mov: int = 5          ## Movement in tiles (1 tile = 1 inch)
@export var rng: int = 1          ## Attack range in tiles (1 = melee only)
@export var mor: int = 6          ## Morale — roll 2d6; exceed = Shaken/Routed
@export var cmd: int = 0          ## Command stat (commanders only, generates CP)
@export var pts: int = 2          ## Point cost for army building

# ── Faction-Specific Stats ─────────────────────────────
@export_group("Faction Mechanics")
@export var corruption_spread: int = 0   ## Nightfang: corruption tokens applied per melee hit
@export var flow_value: int = 0          ## Veilbound: ritual flow generated per turn
@export var is_legendary: bool = false   ## Legendary unit (one per army, commander-locked)
@export var legendary_commander: String = ""  ## Which commander unlocks this legendary

# ── Special Abilities ──────────────────────────────────
@export_group("Abilities")
@export var specials: PackedStringArray = []  ## List of keyword abilities
@export var skills: Array[String] = []        ## Skill keys for the skill database

# ── Visual ─────────────────────────────────────────────
@export_group("Visual")
@export var icon: Texture2D
@export var map_sprite: Texture2D

# ── Derived Properties ─────────────────────────────────

## Combat class derived from range
var class_t: int:
	get:
		if rng <= 1:
			return 0  # Melee
		elif has_special("Magic") or has_special("Fragment User"):
			return 2  # Magic
		else:
			return 1  # Ranged

## Movement class derived from specials & type
var class_m: int:
	get:
		if has_special("Fly") or has_special("Spirit Glide"):
			return MovementClass.FLYING
		elif unit_type == UnitType.CAVALRY:
			return MovementClass.MOUNTED
		else:
			return MovementClass.GROUND

## Movement in grid tiles (alias for mov)
var movement: int:
	get: return mov

## Initiative derived from MOV (faster = higher initiative)
var initiative: int:
	get: return mov

## Display name (backwards compatible with old .name usage)
var name: String:
	get: return unit_name
	set(value): unit_name = value

# ── Helper Methods ─────────────────────────────────────

func has_special(keyword: String) -> bool:
	for s in specials:
		if s.to_lower().contains(keyword.to_lower()):
			return true
	return false

func is_commander() -> bool:
	return unit_type == UnitType.COMMANDER

func is_melee_only() -> bool:
	return rng <= 1

func is_ranged() -> bool:
	return rng > 1

func get_faction_name() -> String:
	match faction:
		Faction.EMBERCLAW: return "Emberclaw Warpack"
		Faction.IRON_DOMINION: return "Iron Dominion"
		Faction.NIGHTFANG: return "Nightfang Dominion"
		Faction.THORNWEFT: return "Thornweft Matriarchy"
		Faction.VEILBOUND: return "Veilbound Shogunate"
	return "Unknown"

func get_type_name() -> String:
	match unit_type:
		UnitType.COMMANDER: return "Commander"
		UnitType.INFANTRY: return "Infantry"
		UnitType.CAVALRY: return "Cavalry"
		UnitType.SUPPORT: return "Support"
		UnitType.SCOUT: return "Scout"
		UnitType.ARTILLERY: return "Artillery"
		UnitType.SPECIALIST: return "Specialist"
		UnitType.WAR_MACHINE: return "War Machine"
	return "Unknown"
