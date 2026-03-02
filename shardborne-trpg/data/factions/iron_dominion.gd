class_name IronDominionData
## All Iron Dominion unit definitions — 69 units total.

const FACTION_ID = "iron_dominion"
const FACTION_NAME = "Iron Dominion"
const FACTION_ENUM = 1  # CombatantDefinition.Faction.IRON_DOMINION

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
		_u("Lord Calculon", CMD, 15, 4, 30, 5, 6, 9, 21, ["Grid mastery", "Analytical warfare"], 8),
		_u("Lady Cogsworth", CMD, 15, 4, 27, 9, 3, 10, 21, ["Clockwork cavalry", "Mobility"], 7),
		_u("Archmagister Gearbane", CMD, 12, 3, 27, 6, 6, 9, 17, ["Aether magic", "Fragment specialist"], 5),
		_u("Commander Ironweld", CMD, 18, 5, 33, 4, 3, 10, 24, ["Infantry buffing", "Defensive doctrine"], 9),
		_u("Lady Brassveil", CMD, 15, 3, 24, 8, 6, 9, 19, ["Espionage", "Sabotage", "Stealth"], 6),
		_u("High Engineer Vortan", CMD, 15, 4, 30, 5, 6, 9, 21, ["War machine specialist", "Repairs"], 7),
		_u("General Steamjaw", CMD, 18, 5, 36, 6, 1, 10, 25, ["Melee powerhouse", "Morale", "Leadership"], 9),
		_u("Lady Aetheris", CMD, 15, 3, 27, 7, 6, 9, 19, ["Aether technology", "Ranged support"], 6),
		_u("Lord Piston", CMD, 15, 4, 30, 4, 3, 10, 20, ["Defensive engineering", "Fortification"], 8),
		_u("Captain Ironclad", CMD, 15, 5, 39, 5, 3, 10, 25, ["Heavy armor", "Bodyguard", "Tank"], 8),
		_u("Engineer Brassforge", CMD, 15, 4, 27, 7, 6, 9, 21, ["Field engineering", "Improvisation"], 6),
		_u("Lady Mechana", CMD, 15, 4, 30, 6, 3, 10, 21, ["Construct commander", "Automation"], 7),
		_u("Lord Gearheart", CMD, 15, 4, 30, 7, 3, 9, 21, ["Combined arms", "Versatile"], 7),
	]

# ── Infantry (20) ──────────────────────────────────────
static func _infantry() -> Array:
	return [
		_u("Infantry Regiment", INF, 6, 3, 3, 5, 1, 6, 2, ["Grid Node"]),
		_u("Clockwork Infantry", INF, 6, 4, 6, 4, 1, 7, 3, ["Grid Node"]),
		_u("Aether Infused Soldiers", INF, 9, 3, 3, 6, 8, 6, 3, ["Grid Node", "Ranged"]),
		_u("Elite Vanguard", INF, 9, 4, 6, 5, 1, 8, 4, ["Grid Node"]),
		_u("Siege Infantry", INF, 9, 4, 6, 4, 1, 7, 4, ["Grid Node", "Siege"]),
		_u("Mechanized Infantry", INF, 6, 4, 6, 6, 1, 7, 3, ["Grid Node", "All-Terrain"]),
		_u("Experimental Construct", INF, 12, 3, 9, 5, 1, 10, 4, ["Fearless", "Unstable"]),
		_u("Steam-Powered Sharpshooters", INF, 6, 3, 3, 5, 18, 6, 3, ["Grid Node", "Sharpshot"]),
		_u("Steam Grenadiers", INF, 9, 3, 6, 5, 8, 7, 3, ["Grid Node", "Blast"]),
		_u("Aether Marksmen", INF, 9, 3, 3, 5, 18, 7, 3, ["Grid Node", "Sharpshot"]),
		_u("Gear-Linked Infantry", INF, 6, 3, 6, 5, 1, 7, 3, ["Grid Node", "Network"]),
		_u("Clockwork Grenadiers", INF, 9, 3, 6, 5, 10, 7, 3, ["Grid Node", "Blast"]),
		_u("Gearstorm Infantry", INF, 12, 3, 6, 6, 1, 7, 4, ["Grid Node", "Reckless"]),
		_u("Steam Heavy Guards", INF, 6, 5, 9, 4, 1, 8, 4, ["Grid Node", "Bodyguard"]),
		_u("Fragment Swarm Units", INF, 15, 2, 6, 6, 3, 10, 4, ["Fearless", "Swarm", "Unstable"]),
		_u("Steam Sentinels", INF, 6, 5, 9, 3, 1, 8, 4, ["Grid Node", "Shield Wall", "Unyielding"]),
		_u("Arcane Steam Marksmen", INF, 6, 3, 3, 5, 20, 7, 3, ["Grid Node", "Sharpshot", "Sniper"]),
		_u("Steam Shock Infantry", INF, 12, 3, 6, 6, 1, 7, 4, ["Grid Node", "Piston Charge"]),
		_u("Clockwork Vanguard", INF, 9, 4, 9, 5, 1, 9, 4, ["Grid Node", "Inspiring"]),
		_u("Gear Infused Infantry", INF, 6, 4, 6, 5, 1, 7, 2, ["Grid Node"]),
	]

# ── Cavalry (5) ────────────────────────────────────────
static func _cavalry() -> Array:
	return [
		_u("Clockwork Cavalry", CAV, 9, 4, 6, 9, 1, 7, 4, ["Grid Node", "Piston Charge", "Spark Lance"]),
		_u("Steam Lancers", CAV, 9, 3, 6, 9, 1, 7, 3, ["Grid Node", "Lance Charge"]),
		_u("Gear-Rider Hussars", CAV, 12, 4, 9, 8, 1, 8, 5, ["Grid Node", "Mechanical Endurance", "Sabre Sweep"]),
		_u("Aether Dragoons", CAV, 12, 3, 9, 9, 12, 8, 6, ["Grid Node", "Mounted Fire", "Carbine Volley"]),
		_u("Iron Stampede", CAV, 15, 5, 12, 7, 1, 9, 7, ["Grid Anchor", "Devastating Charge", "Heavy Armor"]),
	]

# ── Support (9) ────────────────────────────────────────
static func _support() -> Array:
	return [
		_u("Gearwright Engineers", SUP, 3, 3, 6, 4, 1, 6, 2, ["Grid Node", "Repair"]),
		_u("Clockwork Pioneers", SUP, 3, 4, 6, 4, 1, 7, 2, ["Grid Node", "Construct Barricade", "Trap Layer"]),
		_u("Steam Miners", SUP, 3, 3, 3, 4, 1, 5, 2, ["Grid Node", "Salvage"]),
		_u("Steam Medic Corps", SUP, 0, 3, 3, 5, 1, 7, 2, ["Grid Node", "Heal", "Non-Combatant"]),
		_u("Mechanical Sappers", SUP, 6, 3, 6, 5, 1, 7, 3, ["Grid Node", "Plant Charge"]),
		_u("Overclocked Engineers", SUP, 3, 3, 9, 5, 1, 7, 2, ["Grid Node", "Rapid Repair"]),
		_u("Clockwork Engineers", SUP, 3, 3, 6, 6, 1, 6, 2, ["Grid Node", "Repair", "Mobile Workshop"]),
		_u("Aether Engineers", SUP, 3, 4, 6, 4, 6, 8, 3, ["Grid Node", "Trap Layer", "Remote Detonate"]),
		_u("Steam Reclaimers", SUP, 3, 3, 3, 5, 1, 6, 2, ["Grid Node", "Salvage"]),
	]

# ── Scouts (3) ─────────────────────────────────────────
static func _scouts() -> Array:
	return [
		_u("Scouts/Recon", SCT, 3, 3, 3, 7, 6, 6, 2, ["Grid Node", "Scout", "Forward Deploy"]),
		_u("Steam Recon Flyers", SCT, 6, 3, 6, 10, 8, 7, 4, ["Fly", "Spotter"]),
		_u("Mechanized Scouts", SCT, 6, 3, 6, 8, 8, 7, 3, ["Scout", "All-Terrain"]),
	]

# ── Artillery (3) ──────────────────────────────────────
static func _artillery() -> Array:
	return [
		_u("Steam Artillery Crew", ART, 12, 3, 6, 3, 18, 7, 5, ["Grid Node", "Blast", "Indirect Fire"]),
		_u("Aether Blasters", ART, 9, 3, 6, 4, 16, 7, 3, ["Grid Node", "Overcharge"]),
		_u("Gearwright Artillery", ART, 15, 3, 9, 3, 24, 7, 5, ["Grid Node", "Blast", "Immobile", "Heavy Ordinance"]),
	]

# ── Specialists (5) ────────────────────────────────────
static func _specialists() -> Array:
	return [
		_u("Specialist Hero", SPC, 9, 4, 6, 6, 1, 8, 4, ["Commander Bond", "Duelist"]),
		_u("Aether Hackers", SPC, 3, 3, 6, 5, 12, 7, 4, ["Hack", "Grid Node"]),
		_u("Arcane Tinkerers", SPC, 3, 4, 6, 4, 1, 8, 3, ["Fragment Amplifier", "Unstable Aura"]),
		_u("Aether Infiltrators", SPC, 6, 3, 6, 7, 1, 7, 3, ["Stealth", "Sabotage"]),
		_u("Arcane Tinker Battalion", SPC, 3, 4, 9, 4, 1, 8, 3, ["Fragment Amplifier", "Fragment Battery"]),
	]

# ── War Machines (11) ──────────────────────────────────
static func _war_machines() -> Array:
	return [
		_u("Clockwork Titan", WM, 21, 5, 30, 4, 1, 10, 90, ["Grid Anchor", "Stomp", "Fearless", "Towering"]),
		_u("Steam Colossus", WM, 18, 5, 24, 3, 24, 10, 80, ["Grid Anchor", "Blast", "Siege", "Fearless"]),
		_u("Aether Cannon Walker", WM, 21, 4, 24, 4, 20, 10, 85, ["Grid Anchor", "Blast", "Terrain Warp", "Fearless"]),
		_u("Gear-Beast Construct", WM, 21, 4, 24, 6, 1, 10, 80, ["Grid Anchor", "Charge", "All-Terrain", "Fearless", "Malfunction"]),
		_u("Experimental Leviathan", WM, 24, 5, 36, 4, 3, 10, 110, ["Grid Anchor", "Stomp", "Reality Distortion", "Unstable", "Fearless"]),
		_u("Overclocked Automaton", WM, 18, 4, 21, 7, 1, 10, 80, ["Grid Anchor", "Double Strike", "Overheat", "Fearless"]),
		_u("Steam Gargoyle", WM, 18, 4, 24, 10, 8, 10, 90, ["Grid Anchor", "Fly", "Dive Attack", "Fearless"]),
		_u("Mechanized Siege Engine", WM, 18, 5, 27, 3, 18, 10, 80, ["Grid Anchor", "Siege", "Terrain Collapse", "Immobile", "Fearless"]),
		_u("Arcane Steam Golem", WM, 18, 5, 27, 4, 1, 10, 85, ["Grid Anchor", "Fragment Aura", "Unstable", "Fearless"]),
		_u("Chrono Walker", WM, 15, 5, 30, 5, 12, 10, 100, ["Grid Anchor", "Time Warp", "Temporal Shield", "Fearless", "Unstable"]),
		_u("Titan Engine Imperius", WM, 30, 8, 60, 4, 24, 10, 180, ["Grid Anchor", "Twin Cannons", "Reactor Core", "Supreme Grid", "Massive", "Fearless"], 0, true),
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
