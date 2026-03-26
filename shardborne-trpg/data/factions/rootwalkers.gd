class_name RootwalkerData
## All Rootwalker unit definitions — 63 units total.
## Ancient forest spirits: treants, dryads, bark-skinned warriors.
## Faction theme: Deep moss green (#2D5A27) with amber-gold highlights.
## Slowest faction (MOV 2-3), highest passive DEF, snowballs late-game via Root terrain.

const FACTION_ID = "rootwalkers"
const FACTION_NAME = "The Rootwalkers"
const FACTION_ENUM = 5  # CombatantDefinition.Faction.ROOTWALKER

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
# Sylvara = primary campaign commander, terrain seeder/entangler;
# Deepwood Eldest = legendary ancient, summons saplings, unstoppable anchor;
# Greyroot = immovable slow fortress commander; Bramblethorn = fast aggressive striker;
# Mossborn Elder = healing/root-spreading ranged support; Fernwhisper = stealth scout-leader;
# Ashenbark = wrathborn berserker, fire-resistant melee; Verdant Patriarch = bulwark reclaimer;
# Thornvast = anti-armor heavy hitter; Ivywarden = root-walk stealth ranged;
# The Green Hunger = glass-cannon regenerator; Sapwood Seer = indirect artillery support;
# Rootmaw = terror melee with devour
static func _commanders() -> Array:
	return [
		_u("Sylvara the Thornweaver", CMD, 12, 6, 42, 3, 1, 12, 28, ["Root-Born", "Thornweave Aura"], 10, false, "", ["ancient_growth", "entangle", "deep_root_stance"]),
		_u("Deepwood Eldest",         CMD, 15, 8, 54, 2, 1, 14, 35, ["Ancient", "Towering", "Fearless"], 9, true, "", ["ancient_call", "root_pulse", "deep_root_stance"]),
		_u("Greyroot the Patient",    CMD, 12, 7, 42, 2, 1, 12, 25, ["Stubborn", "Immovable"], 8, false, "", ["deep_root_stance", "root_pulse"]),
		_u("Bramblethorn",            CMD, 15, 5, 36, 4, 1, 10, 22, ["Charge", "Thorn Aura"], 7, false, "", ["bark_surge", "entangle"]),
		_u("Mossborn Elder",          CMD, 9,  6, 36, 2, 4, 13, 20, ["Healer", "Verdant Aura"], 7, false, "", ["ancient_growth", "root_pulse"]),
		_u("Fernwhisper",             CMD, 9,  5, 30, 4, 6, 11, 19, ["Stealth", "Scout", "Silk Camouflage"], 6, false, "", ["entangle", "ancient_growth"]),
		_u("Ashenbark",               CMD, 15, 6, 36, 3, 1, 10, 22, ["Fire Resistant", "Wrathborn (triggered on ally death)"], 7, false, "", ["bark_surge", "root_pulse"]),
		_u("Verdant Patriarch",       CMD, 12, 8, 42, 2, 1, 13, 24, ["Bulwark", "Towering"], 8, false, "", ["deep_root_stance", "ancient_growth", "reclaim"]),
		_u("Thornvast",               CMD, 15, 7, 42, 3, 1, 11, 26, ["Massive", "Anti-Armor"], 8, false, "", ["bark_surge", "thorn_volley"]),
		_u("Ivywarden",               CMD, 9,  6, 36, 3, 5, 12, 20, ["Root-Walk", "Stealth in Root terrain"], 7, false, "", ["entangle", "ancient_growth"]),
		_u("The Green Hunger",        CMD, 18, 5, 36, 4, 1, 9,  23, ["Blood-Drunk", "Regeneration"], 6, false, "", ["bark_surge", "entangle"]),
		_u("Sapwood Seer",            CMD, 9,  5, 30, 2, 8, 13, 19, ["Non-Combatant", "Indirect Fire", "Prophecy Aura"], 7, false, "", ["ancient_growth", "root_pulse"]),
		_u("Rootmaw",                 CMD, 18, 5, 36, 4, 1, 9,  24, ["Terror", "Void Resolve", "Devour (heals 2 on kill)"], 6, false, "", ["bark_surge", "ancient_call"]),
	]

# ── Infantry (15) ──────────────────────────────────────
static func _infantry() -> Array:
	return [
		_u("Vine Walker",         INF, 6,  3, 6,  3, 1, 7,  2, ["Root-Walk"]),
		_u("Bark Warrior",        INF, 9,  5, 9,  2, 1, 8,  3, ["Stubborn"], 0, false, "", ["bark_surge"]),
		_u("Thornguard",          INF, 9,  6, 9,  2, 1, 9,  4, ["Brace"], 0, false, "", ["deep_root_stance"]),
		_u("Root Sentinel",       INF, 9,  5, 12, 2, 1, 10, 4, ["Stubborn", "Fearless"]),
		_u("Ancient Shambler",    INF, 12, 6, 15, 1, 1, 10, 5, ["Massive", "Regeneration", "Fearless"]),
		_u("Briarbane",           INF, 9,  4, 9,  3, 1, 8,  3, ["Stealth in Root terrain"], 0, false, "", ["entangle"]),
		_u("Sporeborn",           INF, 6,  3, 6,  2, 1, 7,  2, ["Thrall", "Expendable"]),
		_u("Wraithwood",          INF, 9,  5, 9,  2, 1, 9,  4, ["Phase", "Mist Form"], 0, false, "", ["entangle"]),
		_u("Mirewalker",          INF, 9,  4, 9,  3, 1, 8,  3, ["Aquatic", "Root-Walk"]),
		_u("Thornblade",          INF, 12, 4, 9,  3, 1, 8,  3, ["Charge", "Momentum Strike"]),
		_u("Rootbound Warrior",   INF, 9,  5, 9,  2, 1, 8,  3, [], 0, false, "", ["bark_surge"]),
		_u("Ancient Foot",        INF, 9,  6, 12, 2, 1, 10, 4, ["Fearless", "Immovable"]),
		_u("Grove Warden",        INF, 9,  5, 12, 2, 1, 9,  4, ["Bulwark", "Stubborn"]),
		_u("Verdant Thrall",      INF, 6,  3, 6,  2, 1, 7,  2, ["Expendable", "Thrall"]),
		_u("Thorn Creeper",       INF, 9,  4, 9,  2, 1, 8,  3, ["Burrowing", "Stealth"]),
	]

# ── Cavalry (5) ────────────────────────────────────────
static func _cavalry() -> Array:
	return [
		_u("Ancient Stag Rider", CAV, 12, 5, 12, 5, 1, 9,  6, ["Charge"]),
		_u("Vine Rider",         CAV, 12, 4, 9,  5, 1, 8,  5, ["Momentum Strike"]),
		_u("Thornback Elk",      CAV, 15, 5, 15, 5, 1, 9,  7, ["Charge", "Thorn Aura"], 0, false, "", ["bark_surge"]),
		_u("Canopy Drake Rider", CAV, 15, 5, 12, 5, 1, 9,  8, ["Fly", "Spirit Glide"]),
		_u("Root Cavalry",       CAV, 12, 5, 12, 4, 1, 9,  6, ["Stubborn"], 0, false, "", ["deep_root_stance"]),
	]

# ── Support (8) ────────────────────────────────────────
static func _support() -> Array:
	return [
		_u("Grove Keeper",         SUP, 6, 4, 9, 2, 1, 10, 4, ["Healer", "Non-Combatant"], 0, false, "", ["ancient_growth"]),
		_u("Dryad",                SUP, 6, 4, 9, 3, 4, 9,  3, ["Stealth", "Silk Camouflage"], 0, false, "", ["entangle"]),
		_u("Root Tender",          SUP, 3, 4, 9, 2, 1, 10, 3, ["Healer", "Non-Combatant"], 0, false, "", ["ancient_growth"]),
		_u("Sapwood Oracle",       SUP, 9, 4, 9, 2, 8, 10, 4, ["Indirect Fire"], 0, false, "", ["thorn_volley"]),
		_u("Ancient Seed",         SUP, 3, 3, 6, 2, 1, 9,  3, ["Non-Combatant"], 0, false, "", ["ancient_growth", "ancient_call"]),
		_u("Moss Shaper",          SUP, 6, 4, 9, 2, 3, 10, 4, ["Healer"], 0, false, "", ["deep_root_stance", "ancient_growth"]),
		_u("Thornweave Initiate",  SUP, 6, 4, 9, 2, 3, 9,  3, [], 0, false, "", ["entangle"]),
		_u("Verdant Shepherd",     SUP, 6, 4, 9, 3, 1, 10, 4, ["Aura: +1 MOV to adjacent allies on Root tiles"], 0, false, "", ["ancient_growth"]),
	]

# ── Scouts (3) ─────────────────────────────────────────
static func _scouts() -> Array:
	return [
		_u("Spriggan Scout", SCT, 9, 3, 6,  5, 4, 8, 3, ["Scout", "Stealth", "Ambush"]),
		_u("Root Runner",    SCT, 9, 4, 9,  6, 1, 8, 4, ["Scout", "Root-Walk", "Plants Roots while moving"]),
		_u("Thornling",      SCT, 6, 3, 6,  4, 3, 7, 2, ["Stealth", "Ambush"]),
	]

# ── Artillery (3) ──────────────────────────────────────
static func _artillery() -> Array:
	return [
		_u("Thornball Hurler",     ART, 12, 4, 18, 1, 10, 8, 8,  ["Indirect Fire", "Blast 2"], 0, false, "", ["thorn_volley"]),
		_u("Ancient Catapult Tree",ART, 15, 5, 21, 1, 10, 9, 10, ["Indirect Fire", "Blast 3", "Siege"], 0, false, "", ["thorn_volley"]),
		_u("Root Mortar",          ART, 9,  4, 15, 1, 8,  8, 7,  ["Indirect Fire"], 0, false, "", ["thorn_volley"]),
	]

# ── Specialists (5) ────────────────────────────────────
static func _specialists() -> Array:
	return [
		_u("Root Shaper",  SPC, 9,  5, 12, 2, 3, 9, 5, [], 0, false, "", ["ancient_growth", "reclaim"]),
		_u("Entangler",    SPC, 9,  4, 9,  3, 8, 8, 4, ["Sharpshot"], 0, false, "", ["entangle"]),
		_u("Bark Hulk",    SPC, 12, 7, 18, 2, 1, 9, 6, ["Massive", "Immovable"], 0, false, "", ["deep_root_stance"]),
		_u("Briar Witch",  SPC, 9,  4, 9,  3, 5, 9, 5, ["Ward"], 0, false, "", ["entangle", "root_pulse"]),
		_u("Ancient Vine", SPC, 9,  5, 12, 2, 4, 8, 4, [], 0, false, "", ["entangle", "ancient_growth"]),
	]

# ── War Machines (11) ──────────────────────────────────
static func _war_machines() -> Array:
	return [
		_u("Living Siege Tree",        WM, 21, 8,  42, 2, 6,  10, 80,  ["Towering", "Siege", "Blast 2"]),
		_u("Thornwall Construct",      WM, 15, 10, 45, 1, 1,  11, 90,  ["Immovable", "Bulwark", "Towering"], 0, false, "", ["deep_root_stance"]),
		_u("Ancient Grove Walker",     WM, 21, 7,  48, 3, 1,  10, 100, ["Massive", "Regeneration"], 0, false, "", ["root_pulse"]),
		_u("Root Colossus",            WM, 24, 8,  54, 2, 1,  11, 120, ["Massive", "Towering", "Fearless", "Immovable"]),
		_u("Verdant Engine",           WM, 18, 8,  42, 2, 8,  10, 95,  ["Indirect Fire", "Blast 3"], 0, false, "", ["thorn_volley"]),
		_u("Briarthorn Siege",         WM, 18, 7,  36, 2, 5,  9,  85,  ["Anti-Armor", "Siege", "Blast 2"]),
		_u("Sapwood Titan",            WM, 21, 9,  48, 2, 1,  11, 110, ["Regeneration", "Massive", "Stubborn"]),
		_u("Grove Hulk",               WM, 15, 9,  36, 2, 1,  10, 75,  ["Massive"], 0, false, "", ["deep_root_stance"]),
		_u("Ancient Oak Sentinel",     WM, 12, 10, 36, 1, 1,  11, 65,  ["Immovable", "Stubborn", "Bulwark"], 0, false, "", ["deep_root_stance"]),
		_u("Thornspire",               WM, 18, 7,  30, 1, 10, 9,  70,  ["Indirect Fire", "Blast 2"], 0, false, "", ["thorn_volley"]),
		_u("Deepwood Elder",           WM, 27, 10, 60, 2, 1,  13, 150, ["Towering", "Fearless", "Massive", "Regeneration", "Legendary"], 0, true, "Deepwood Eldest", ["ancient_call", "root_pulse", "deep_root_stance"]),
	]

# ── Helper: create unit dictionary ─────────────────────
static func _u(n: String, t: int, a: int, d: int, h: int, m: int, r: int,
		mo: int, p: int, sp: Array = [], c: int = 0,
		leg: bool = false, leg_cmdr: String = "",
		sk: Array = []) -> Dictionary:
	return {
		"name": n, "faction": FACTION_ENUM, "type": t,
		"atk": a, "def": d, "hp": h, "mov": m, "rng": r, "mor": mo,
		"pts": p, "cmd": c, "specials": sp, "skills": sk,
		"corruption": 0, "flow": 0,
		"legendary": leg, "legendary_cmdr": leg_cmdr,
	}
