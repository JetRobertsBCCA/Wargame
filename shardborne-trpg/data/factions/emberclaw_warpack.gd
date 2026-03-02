class_name EmberclawData
## All Emberclaw Warpack unit definitions — 63 units total.

const FACTION_ID = "emberclaw_warpack"
const FACTION_NAME = "Emberclaw Warpack"
const FACTION_ENUM = 0  # CombatantDefinition.Faction.EMBERCLAW

# Unit type constants matching CombatantDefinition.UnitType
const CMD = 0; const INF = 1; const CAV = 2; const SUP = 3
const SCT = 4; const ART = 5; const SPC = 6; const WM = 7

## Returns array of dictionaries, each representing one unit definition.
## Keys: name, type, atk, def, hp, mov, rng, mor, pts, specials, cmd, legendary, legendary_cmdr
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
		_u("Scorchcaller Vex", CMD, 18, 5, 33, 10, 2, 9, 24, ["Fire mastery", "Speed", "Breath Weapon"], 9),
		_u("Flamewarden Kora", CMD, 12, 3, 24, 6, 8, 10, 20, ["Phoenix fire", "Healing", "Resurrection"], 7),
		_u("Ashborn Ryx", CMD, 15, 4, 27, 5, 10, 7, 18, ["Fragment specialist", "Ranged fire"], 6),
		_u("Wyrmlord Tzarak", CMD, 27, 7, 45, 8, 3, 10, 35, ["Obsidian Wyrm bond", "Melee powerhouse"], 8),
		_u("Skydancer Lyss", CMD, 15, 3, 21, 14, 4, 8, 19, ["Fly", "Evasion", "Speed"], 7),
		_u("Embersmith Torvan", CMD, 12, 5, 30, 4, 6, 9, 22, ["Equipment crafting", "War machine buffs"], 8),
		_u("Pyroclaw Drenna", CMD, 24, 4, 36, 7, 1, 10, 21, ["Melee fury", "Berserker", "Fire claws"], 5),
		_u("Skywatcher Orin", CMD, 12, 3, 24, 10, 8, 8, 17, ["Reconnaissance", "Intel", "Ranged support"], 8),
		_u("Clutchmaster Vayne", CMD, 15, 5, 30, 6, 4, 9, 20, ["Drake spawning", "Swarm tactics"], 7),
		_u("Cinderfist Brok", CMD, 21, 6, 39, 5, 2, 9, 23, ["Anti-armor", "Siege", "Demolition"], 6),
		_u("Flameheart Syrax", CMD, 9, 4, 27, 5, 12, 10, 22, ["Prophecy", "Morale", "Divine channel"], 8),
		_u("Skullcrusher Threx", CMD, 24, 5, 36, 8, 1, 10, 24, ["Melee duelist", "Drake melee", "Challenge"], 7),
		_u("Tidescar the Exiled", CMD, 15, 3, 27, 8, 10, 7, 21, ["Corrupted fragments", "High-risk power"], 6),
	]

# ── Infantry (15) ──────────────────────────────────────
static func _infantry() -> Array:
	return [
		_u("Ashborn Infantry", INF, 6, 3, 3, 5, 1, 6, 2, ["Fire Resistant"]),
		_u("Emberclaw Warriors", INF, 6, 3, 3, 5, 4, 7, 2, ["Fire Resistant", "Javelin Thrower"]),
		_u("Flameborn Guard", INF, 12, 4, 6, 5, 1, 8, 3, ["Fire Resistant", "Flame Ward", "Drakeblood Fury"]),
		_u("Pyromancer Adepts", INF, 9, 2, 3, 5, 8, 7, 3, ["Fire Bolt", "Fragment User"]),
		_u("Emberforged Blades", INF, 15, 4, 6, 6, 1, 8, 4, ["Flame Weapons", "Ember Riposte"]),
		_u("Hatchery Guard", INF, 9, 5, 6, 4, 1, 9, 3, ["Stubborn", "Hold Ground"]),
		_u("Unbonded Berserkers", INF, 15, 2, 3, 6, 1, 10, 3, ["Fearless", "Furious Charge"]),
		_u("Fragment Artillery Crew", INF, 6, 3, 6, 4, 1, 7, 3, ["Operates War Machines", "Fragment Specialist"]),
		_u("Reborn Phalanx", INF, 12, 5, 9, 4, 1, 9, 5, ["Stubborn", "Phoenix Rebirth"]),
		_u("Ashwalker Skirmishers", INF, 6, 2, 3, 7, 6, 6, 2, ["Skirmish", "Retreat and Fire"]),
		_u("Forge Acolytes", INF, 6, 3, 3, 4, 1, 7, 3, ["Field Repairs", "Fragment Forging"]),
		_u("Faithful Guard", INF, 9, 4, 6, 5, 1, 10, 3, ["War Chant of Ash", "Faithful", "Fire Resistant"]),
		_u("Scorched Veterans", INF, 15, 5, 9, 5, 1, 9, 5, ["Veteran", "Fire Immune", "Reroll 1s"]),
		_u("Ember Council Honor Guard", INF, 18, 6, 9, 5, 1, 10, 6, ["Pyre Guardian", "Fearless", "Flame Ward"]),
		_u("Immolation Infantry", INF, 12, 3, 3, 6, 6, 10, 4, ["Fearless", "Death Explosion"]),
	]

# ── Cavalry (5) ────────────────────────────────────────
static func _cavalry() -> Array:
	return [
		_u("Ashrider Scouts", CAV, 12, 3, 6, 12, 4, 7, 5, ["Ash Runner", "Fast"]),
		_u("Skytalon Lancers", CAV, 15, 4, 9, 10, 2, 8, 5, ["Fly", "Inferno Charge", "Fire Lance"]),
		_u("Emberknight Riders", CAV, 18, 5, 12, 10, 2, 9, 8, ["Fly", "Drake Bond", "Breath Weapon"]),
		_u("Swift Talon Outriders", CAV, 12, 3, 6, 12, 4, 8, 4, ["Fly", "Scorch and Soar", "Evasion"]),
		_u("Scorchcaller Elites", CAV, 21, 6, 15, 10, 3, 10, 10, ["Fly", "Drake Bond", "Inferno Breath", "Ancient Resilience"]),
	]

# ── Support (8) ────────────────────────────────────────
static func _support() -> Array:
	return [
		_u("Pyromancer Circle", SUP, 9, 2, 6, 5, 12, 7, 5, ["Fireball", "Fragment Manipulation", "Magic Resistance"]),
		_u("Fragment Shapers", SUP, 6, 3, 6, 4, 1, 7, 3, ["Fragment Stabilization", "Buff Fragment Users"]),
		_u("Flameheart Clerics", SUP, 6, 3, 6, 5, 6, 8, 4, ["Phoenix Mend", "Phoenix Blessing"]),
		_u("Drake Handlers", SUP, 6, 3, 6, 5, 1, 7, 3, ["Command Drakes", "Calm Beast"]),
		_u("Embersmith Apprentices", SUP, 6, 4, 6, 4, 1, 7, 3, ["Field Repairs", "Weapon Enhancement"]),
		_u("Smoke Weavers", SUP, 6, 2, 3, 5, 8, 6, 3, ["Smoke Screen", "Cover Provider"]),
		_u("Divine Acolytes", SUP, 6, 3, 6, 5, 1, 9, 4, ["War Chant of Ash", "Prophecy"]),
		_u("Bonfire Keepers", SUP, 6, 3, 6, 4, 6, 7, 3, ["Create Burning Terrain", "Fire Immune"]),
	]

# ── Scouts (3) ─────────────────────────────────────────
static func _scouts() -> Array:
	return [
		_u("Silent Wing Scouts", SCT, 9, 2, 6, 12, 6, 7, 3, ["Fly", "Smoke Veil", "Ash Runner", "Forward Deploy"]),
		_u("Thermal Trackers", SCT, 6, 2, 3, 6, 8, 6, 3, ["Detect Hidden Units", "Thermal Vision"]),
		_u("Sky Watchers", SCT, 9, 3, 6, 10, 12, 8, 4, ["Fly", "Perfect Vision", "Relay Commands"]),
	]

# ── Artillery (3) ──────────────────────────────────────
static func _artillery() -> Array:
	return [
		_u("Pyroclast Catapult", ART, 18, 3, 9, 3, 24, 7, 6, ["Indirect Fire", "Blast", "Creates Burning Terrain"]),
		_u("Fragment Launcher", ART, 21, 3, 9, 3, 30, 7, 7, ["Indirect Fire", "Fragment Detonation", "Variable Effect"]),
		_u("Ember Ballista", ART, 12, 3, 9, 3, 24, 7, 5, ["Anti-Air", "Armor Piercing"]),
	]

# ── Specialists (5) ────────────────────────────────────
static func _specialists() -> Array:
	return [
		_u("Fledgling Swarm", SPC, 6, 2, 3, 10, 1, 6, 3, ["Fly", "Swarm", "Spark Breath"]),
		_u("Immolation Bombers", SPC, 18, 2, 3, 12, 1, 10, 4, ["Fly", "Fearless", "Kamikaze"]),
		_u("Phoenix Guard", SPC, 15, 4, 6, 5, 1, 10, 6, ["Phoenix Rebirth", "Fire Immune", "Ember Inspiration"]),
		_u("Fragment-Blade Assassins", SPC, 18, 3, 6, 7, 1, 8, 5, ["Smoke Veil", "Dragonfire Strike", "Fragment Blade"]),
		_u("Flame Prophets", SPC, 9, 2, 6, 5, 12, 10, 5, ["Prophecy", "Terror", "Maddening Visions"]),
	]

# ── War Machines (11) ──────────────────────────────────
static func _war_machines() -> Array:
	return [
		_u("Grounded Wyrm", WM, 27, 7, 36, 4, 3, 10, 110, ["Massive", "Cataclysm Breath", "Earthquake Stomp"]),
		_u("Mature War Drake", WM, 21, 5, 24, 10, 2, 9, 80, ["Fly", "Inferno Breath", "Rending Claws", "Terror"]),
		_u("Young War Drake", WM, 18, 4, 18, 12, 2, 8, 60, ["Fly", "Flame Breath", "Dive Attack"]),
		_u("Fire Colossus", WM, 24, 6, 30, 5, 6, 10, 90, ["Fearless", "Fragment Core", "Fire Aura"]),
		_u("Magma Titan", WM, 24, 5, 33, 4, 8, 10, 95, ["Fire Immune", "Creates Lava Terrain", "Magma Blast"]),
		_u("Drake Nest Mobile", WM, 12, 6, 24, 3, 1, 10, 70, ["Spawn Fledglings", "Heavily Armored", "Slow"]),
		_u("Obsidax", WM, 42, 9, 72, 10, 6, 10, 200, ["Fly", "Cataclysm Breath", "Ancient Power", "Earthquake Landing", "Massive"], 0, true, "Wyrmlord Tzarak"),
		_u("Pyrathax", WM, 30, 7, 48, 12, 4, 10, 150, ["Fly", "Crimson Inferno Breath", "Ancient Resilience", "Massive"], 0, true, "Scorchcaller Vex"),
		_u("Flame Engine", WM, 12, 5, 21, 4, 1, 10, 65, ["Fragment Amplification Aura", "Buff Fire Attacks", "Fragile Core"]),
		_u("Cinder Golem", WM, 21, 6, 27, 5, 1, 10, 70, ["Fearless", "Regeneration", "Ash Cloud Aura"]),
		_u("Scorched Titan", WM, 27, 7, 36, 4, 2, 10, 100, ["Massive", "Siege Breaker", "Fire Stomp", "Slow but Unstoppable"]),
	]

# ── Helper: create unit dictionary ─────────────────────
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
