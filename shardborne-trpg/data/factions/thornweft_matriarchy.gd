class_name ThornweftMatriarchyData
## All Thornweft Matriarchy unit definitions — 63 units total.

const FACTION_ID = "thornweft_matriarchy"
const FACTION_NAME = "Thornweft Matriarchy"
const FACTION_ENUM = 3  # CombatantDefinition.Faction.THORNWEFT

const CMD = 0; const INF = 1; const CAV = 2; const SUP = 3
const SCT = 4; const ART = 5; const SPC = 6; const WM = 7

static func get_units() -> Array:
	var units := []
	units.append_array(_commanders())
	units.append_array(_infantry())
	units.append_array(_cavalry())
	units.append_array(_support())
	units.append_array(_scouts())
	units.append_array(_artillery())
	units.append_array(_specialists())
	units.append_array(_war_machines())
	return units

# ── Commanders (13) ────────────────────────────────────
static func _commanders() -> Array:
	return [
		_u("Loom-Mother Vethiss", CMD, 12, 5, 30, 6, 8, 9, 24, ["Web mastery", "Fate manipulation"], 10),
		_u("Thread-Seer Kythara", CMD, 15, 3, 24, 7, 12, 8, 22, ["Fate reading", "Probability control"], 8),
		_u("Silk-Marshal Draven", CMD, 15, 4, 27, 7, 8, 8, 20, ["Venom warfare", "Combined arms"], 7),
		_u("Thread-Cutter Nyx", CMD, 21, 2, 18, 9, 4, 9, 19, ["Assassination", "Fate-severing"], 6),
		_u("Brood-Warden Thessari", CMD, 9, 5, 30, 5, 4, 9, 21, ["Spider spawning", "Beast command"], 7),
		_u("Silk-Warden Morthis", CMD, 9, 6, 33, 4, 6, 9, 20, ["Defensive web", "Terrain control"], 8),
		_u("Loom-Mother Silivex", CMD, 9, 3, 24, 7, 12, 9, 22, ["Intelligence", "Psychic warfare"], 9),
		_u("Spindle-Knight Varek", CMD, 15, 7, 42, 5, 1, 10, 23, ["Tank", "Bodyguard", "Immovable"], 7),
		_u("Web-Walker Ithris", CMD, 15, 2, 21, 16, 6, 8, 20, ["Phase", "Teleport", "Extreme mobility"], 7),
		_u("Cocoon-Keeper Rathis", CMD, 12, 4, 27, 6, 6, 8, 18, ["Resource harvesting", "Economy"], 7),
		_u("Silk-Mender Yalith", CMD, 9, 5, 24, 5, 4, 9, 18, ["Healing", "Silk restoration"], 6),
		_u("Fang-Rider Kaelyx", CMD, 18, 4, 27, 10, 2, 8, 22, ["Cavalry charges", "Spider-mount"], 8),
		_u("Loom-Shaper Quileth", CMD, 12, 4, 24, 5, 8, 9, 20, ["Terrain creation", "Web architecture"], 7),
	]

# ── Infantry (15) ──────────────────────────────────────
static func _infantry() -> Array:
	return [
		_u("Thread-Warden Infantry", INF, 6, 3, 3, 5, 1, 6, 2, ["Venom Strike", "Web-Sensitive"]),
		_u("Silk-Warden Regulars", INF, 9, 3, 3, 5, 1, 7, 2, ["Venom Strike", "Silk Barricade", "Web-Walk"]),
		_u("Gossamer Guard", INF, 12, 5, 6, 5, 1, 8, 3, ["Silk-Anchored", "Silk Armor", "Venom Strike"]),
		_u("Venom Dancers", INF, 12, 2, 3, 7, 1, 7, 3, ["Venom Strike", "Dodge", "Web Snare Retreat"]),
		_u("Web-Spinner Sappers", INF, 6, 3, 3, 5, 1, 7, 2, ["Lay Web Terrain", "Anchor Construction"]),
		_u("Silk-Shot Skirmishers", INF, 9, 2, 3, 6, 8, 6, 3, ["Venom Darts", "Skirmish"]),
		_u("Cocoon Wardens", INF, 9, 4, 6, 4, 1, 7, 3, ["Cocoon Harvest", "Silk-Anchored"]),
		_u("Phase-Silk Infiltrators", INF, 15, 2, 3, 7, 1, 8, 4, ["Silk Camouflage", "Assassinate", "Silk-Step"]),
		_u("Thread-Seer Acolytes", INF, 6, 3, 6, 5, 8, 8, 4, ["Fate-Read", "Fragment User"]),
		_u("Fang Guard Elite", INF, 15, 5, 9, 5, 1, 9, 5, ["Venom Strike", "Silk Barricade", "Thread-Bond", "Fate-Bound"]),
		_u("Shuttle-Consort Militia", INF, 6, 2, 3, 5, 1, 5, 2, ["Expendable", "Screen"]),
		_u("Silk-Blade Duelists", INF, 15, 3, 6, 6, 1, 8, 4, ["Thread-Dancer", "Venom Strike", "Venom Riposte"]),
		_u("Anchor Guard", INF, 9, 5, 6, 4, 1, 9, 3, ["Silk-Anchored", "Hold Ground"]),
		_u("Fear-Weavers", INF, 9, 3, 6, 5, 1, 9, 4, ["Terror Aura", "Fate-Bound"]),
		_u("Fate-Blessed Veterans", INF, 15, 5, 9, 5, 1, 9, 5, ["Veteran", "Venom Strike", "Reroll 1s", "Web-Walk"]),
	]

# ── Cavalry (5) ────────────────────────────────────────
static func _cavalry() -> Array:
	return [
		_u("Spiderling Scouts", CAV, 9, 2, 6, 10, 4, 6, 4, ["Web-Sense Patrol", "Web-Walk", "Lay Web"]),
		_u("Silk-Rider Lancers", CAV, 15, 4, 9, 8, 2, 8, 5, ["Wall-Climber", "Spider-Pounce", "Venom Lance"]),
		_u("Matriarch Riders", CAV, 18, 5, 12, 8, 4, 9, 8, ["Wall-Climber", "Web-Caster", "Mobile Web-Anchor", "Fate-Read"]),
		_u("Phase-Silk Cavalry", CAV, 12, 3, 9, 12, 4, 8, 6, ["Silk-Step", "Web Snare Retreat", "Silk Camouflage"]),
		_u("Queen-Spawn War-mount", CAV, 21, 6, 15, 7, 6, 10, 10, ["Wall-Climber", "Mobile Web-Anchor", "Silk Storm", "Reality Weaving"]),
	]

# ── Support (8) ────────────────────────────────────────
static func _support() -> Array:
	return [
		_u("Web-Anchor Engineers", SUP, 6, 3, 6, 5, 1, 7, 3, ["Deploy Web-Anchor", "Repair Anchor", "Web-Walk"]),
		_u("Venom Alchemists", SUP, 6, 2, 6, 5, 8, 7, 4, ["Coat Weapons", "Venom Bomb"]),
		_u("Silk Surgeons", SUP, 6, 3, 6, 5, 4, 7, 3, ["Heal", "Cleanse Venom"]),
		_u("Fate-Thread Weavers", SUP, 6, 2, 6, 5, 12, 8, 5, ["Fate Manipulation", "Fragment User", "Prophecy"]),
		_u("Gossamer Trap Layers", SUP, 6, 3, 6, 5, 1, 6, 3, ["Lay Gossamer Trap", "Web-Walk"]),
		_u("Vibration Drummers", SUP, 6, 3, 6, 5, 1, 8, 3, ["Inspiring Vibration", "Web Pulse"]),
		_u("Spider Handlers", SUP, 6, 3, 6, 5, 1, 7, 3, ["Command Spiders", "Calm Beast", "Spawn Spiderling"]),
		_u("Cocoon Processors", SUP, 6, 4, 6, 4, 1, 7, 4, ["Process Cocoon", "Field Repairs"]),
	]

# ── Scouts (3) ─────────────────────────────────────────
static func _scouts() -> Array:
	return [
		_u("Silk-Shadow Scouts", SCT, 9, 2, 6, 10, 6, 7, 3, ["Silk Camouflage", "Web-Sense Patrol", "Wall-Climber", "Forward Deploy"]),
		_u("Tremor Sentinels", SCT, 6, 2, 3, 5, 1, 7, 2, ["Detect Hidden Units", "Web-Walk", "Anti-Stealth"]),
		_u("Thread-Reader Outriders", SCT, 9, 3, 6, 9, 8, 8, 4, ["Fate-Read", "Wall-Climber", "Relay Commands"]),
	]

# ── Artillery (3) ──────────────────────────────────────
static func _artillery() -> Array:
	return [
		_u("Silk Catapult", ART, 12, 3, 9, 3, 24, 7, 6, ["Indirect Fire", "Web-Bomb", "Terrain Denial"]),
		_u("Venom Mortar", ART, 15, 3, 9, 3, 24, 7, 7, ["Indirect Fire", "Venom Blast", "Poison Cloud"]),
		_u("Fate-Loom Siege Engine", ART, 9, 3, 12, 3, 30, 8, 8, ["Fate Disruption", "Thread Tangle"]),
	]

# ── Specialists (5) ────────────────────────────────────
static func _specialists() -> Array:
	return [
		_u("Spiderling Swarm", SPC, 9, 1, 3, 8, 1, 5, 3, ["Swarm", "Wall-Climber", "Venom Bite", "Expendable"]),
		_u("Cocoon Bombers", SPC, 9, 3, 6, 6, 8, 7, 4, ["Cocoon Grenade", "Web-Walk"]),
		_u("Thread-Cutter Assassins", SPC, 18, 2, 6, 8, 1, 9, 5, ["Silk Camouflage", "Assassinate", "Fate-Sever"]),
		_u("Reality Weavers", SPC, 9, 3, 6, 5, 8, 8, 6, ["Terrain Weaving", "Fragment User", "Web-Walk"]),
		_u("Silk Wraiths", SPC, 15, 1, 6, 8, 1, 8, 5, ["Silk-Step", "Teleport", "Ethereal"]),
	]

# ── War Machines (11) ──────────────────────────────────
static func _war_machines() -> Array:
	return [
		_u("Brood-Mother Spider", WM, 21, 6, 30, 6, 4, 10, 90, ["Spawn Spiderlings", "Wall-Climber", "Venomstrike", "Mobile Web-Anchor"]),
		_u("Silk Colossus", WM, 24, 7, 36, 5, 6, 10, 100, ["Massive", "Silk Storm", "Creates Web", "Living Fortress"]),
		_u("Gossamer Titan", WM, 27, 6, 39, 4, 8, 10, 110, ["Reality Weaving", "Fate Command", "Wall-Climber"], 0, true),
		_u("Venom Engine", WM, 18, 5, 24, 5, 12, 10, 70, ["Venom Spray", "Poison Cloud Aura", "Web-Walk"]),
		_u("Web-Fortress", WM, 12, 8, 30, 0, 12, 10, 80, ["Immovable", "Enhanced Web-Anchor", "Garrison", "Self-Repair"]),
		_u("Fate-Loom Engine", WM, 12, 5, 27, 3, 30, 10, 85, ["Fate Weaving", "Thread Amplification", "Fragile Core"]),
		_u("Crawler Siege Engine", WM, 18, 5, 21, 6, 8, 10, 65, ["Wall-Climber", "Web-Bomb Launcher", "Siege"]),
		_u("Skithari", WM, 36, 8, 60, 8, 10, 10, 180, ["Wall-Climber", "Reality Weaving", "Silk Storm", "Mobile Fortress Web-Anchor"], 0, true, "Loom-Mother Vethiss"),
		_u("Phase-Silk Wraith Spider", WM, 18, 3, 18, 10, 4, 10, 70, ["Silk-Step", "Teleport", "Wall-Climber", "Ethereal"]),
		_u("Cocoon Harvester", WM, 15, 5, 21, 5, 4, 10, 60, ["Mass Cocoon", "Process", "Fate-Bound"]),
		_u("Trap-Layer Construct", WM, 9, 4, 15, 6, 1, 10, 60, ["Auto-Trap", "Wall-Climber", "Web-Walk"]),
	]

# ── Helper ─────────────────────────────────────────────
static func _u(n: String, t: int, a: int, d: int, h: int, m: int, r: int,
		mo: int, p: int, sp: Array = [], c: int = 0,
		leg: bool = false, leg_cmdr: String = "") -> Dictionary:
	return {
		"name": n, "faction": FACTION_ENUM, "type": t,
		"atk": a, "def": d, "hp": h, "mov": m, "rng": r, "mor": mo,
		"pts": p, "cmd": c, "specials": sp,
		"corruption": 0, "flow": 0,
		"legendary": leg, "legendary_cmdr": leg_cmdr,
	}
