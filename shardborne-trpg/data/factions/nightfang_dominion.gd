class_name NightfangDominionData
## All Nightfang Dominion unit definitions — 74 units total.
## Nightfang has a unique "corruption" stat per unit.

const FACTION_ID = "nightfang_dominion"
const FACTION_NAME = "Nightfang Dominion"
const FACTION_ENUM = 2  # CombatantDefinition.Faction.NIGHTFANG

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
		_u("Lord Sanguinar", CMD, 18, 4, 33, 5, 3, 10, 25, ["Blood magic", "Corruption mastery"], 10),
		_u("Countess Nyxara", CMD, 12, 3, 27, 5, 6, 9, 20, ["Shadow magic", "Debuffs"], 8),
		_u("Grand Fang Voraxis", CMD, 21, 5, 36, 6, 1, 10, 29, ["Melee beast", "Tiger bond"], 6),
		_u("Thrallmaster Ghul", CMD, 9, 3, 24, 5, 3, 8, 17, ["Thrall command", "Summoning"], 7),
		_u("Lady Hemora", CMD, 12, 4, 30, 4, 6, 9, 22, ["Blood rituals", "Healing"], 7),
		_u("Shadowfang Kreev", CMD, 18, 3, 24, 7, 1, 9, 22, ["Assassin", "Stealth", "Ambush"], 6),
		_u("The Crimson Prophet", CMD, 9, 4, 30, 4, 8, 10, 21, ["Corruption spread", "Prophecy"], 8),
		_u("Warlord Rathka", CMD, 15, 5, 33, 4, 3, 10, 25, ["Defensive", "Fortress tactics"], 9),
		_u("Blood Duchess Lysara", CMD, 15, 4, 27, 5, 6, 10, 23, ["Blood drain", "Aristocratic warfare"], 8),
		_u("Plague Herald Mortivex", CMD, 12, 3, 27, 6, 6, 8, 20, ["Plague spreading", "Area denial"], 7),
		_u("Fang General Zharak", CMD, 15, 4, 30, 5, 3, 9, 23, ["Combined arms", "Tiger units"], 8),
		_u("The Hollow King", CMD, 12, 6, 39, 3, 1, 10, 26, ["Undying tank", "Ancient power"], 7),
		_u("Nightclaw Vex", CMD, 21, 3, 30, 8, 1, 9, 25, ["Fast striker", "Melee assassin"], 6),
	]

# ── Infantry (18) ──────────────────────────────────────
static func _infantry() -> Array:
	return [
		_u("Thrall Conscripts", INF, 3, 3, 3, 5, 1, 4, 1, ["Thrall", "Expendable"], 0, false, "", 0),
		_u("Plague Horde", INF, 6, 3, 3, 4, 1, 5, 2, ["Corruption Spread"], 0, false, "", 1),
		_u("Blood Thralls", INF, 6, 3, 3, 5, 1, 5, 2, ["Thrall", "Blood Drain"], 0, false, "", 0),
		_u("Corrupted Militia", INF, 6, 3, 3, 5, 1, 5, 2, ["Corruption Spread"], 0, false, "", 1),
		_u("Fang Guard", INF, 9, 4, 6, 5, 1, 7, 3, ["Corruption Spread"], 0, false, "", 1),
		_u("Crimson Spearmen", INF, 9, 3, 6, 5, 1, 6, 3, ["Corruption Spread"], 0, false, "", 1),
		_u("Nightfang Warriors", INF, 12, 4, 6, 5, 1, 7, 4, ["Corruption Spread", "Pack Tactics"], 0, false, "", 1),
		_u("Blood Reavers", INF, 12, 3, 6, 6, 1, 7, 4, ["Blood Drain", "Corruption Spread"], 0, false, "", 1),
		_u("Plague Knights", INF, 9, 4, 9, 4, 1, 7, 4, ["Corruption Aura"], 0, false, "", 2),
		_u("Tiger Berserkers", INF, 15, 3, 6, 6, 1, 8, 5, ["Corruption Spread", "Pack Tactics", "Blood-Drunk"], 0, false, "", 2),
		_u("Shadow Claw Infantry", INF, 9, 3, 6, 6, 1, 6, 3, ["Shadow Meld", "Lurker Strike"], 0, false, "", 1),
		_u("Corruption Guard", INF, 9, 4, 9, 4, 1, 7, 4, ["Corruption Aura"], 0, false, "", 2),
		_u("Blight Reapers", INF, 12, 3, 6, 5, 1, 7, 4, ["Corruption Spread"], 0, false, "", 2),
		_u("Infected Archers", INF, 6, 3, 3, 5, 12, 5, 3, ["Corruption Spread"], 0, false, "", 1),
		_u("Blightspitter Thralls", INF, 6, 3, 3, 5, 8, 4, 2, ["Thrall", "Corruption Spread"], 0, false, "", 1),
		_u("Tiger Fang Elite", INF, 15, 4, 9, 6, 1, 8, 6, ["Pack Tactics", "Blood-Drunk", "Terrifying"], 0, false, "", 2),
		_u("Crimson Halberdiers", INF, 9, 4, 6, 5, 2, 7, 4, ["Corruption Spread"], 0, false, "", 1),
		_u("Bloodsworn Templars", INF, 12, 4, 9, 5, 1, 8, 5, ["Blood Drain", "Corruption Spread"], 0, false, "", 2),
	]

# ── Cavalry (6) ────────────────────────────────────────
static func _cavalry() -> Array:
	return [
		_u("Thrall Riders", CAV, 6, 3, 6, 7, 1, 5, 3, ["Thrall", "Expendable"], 0, false, "", 0),
		_u("Tiger Chargers", CAV, 12, 3, 6, 8, 1, 7, 5, ["Pack Tactics", "Charge"], 0, false, "", 2),
		_u("Blood Fanged Riders", CAV, 12, 4, 9, 7, 1, 8, 6, ["Blood Drain", "Pack Tactics"], 0, false, "", 2),
		_u("Plague Runners", CAV, 9, 3, 6, 8, 1, 6, 4, ["Corruption Spread"], 0, false, "", 2),
		_u("Nightstalker Cavalry", CAV, 15, 4, 9, 7, 1, 8, 7, ["Shadow Meld", "Lurker Strike"], 0, false, "", 2),
		_u("Shadow Pounce Cavalry", CAV, 12, 3, 6, 8, 1, 7, 5, ["Shadow Meld", "Pounce"], 0, false, "", 1),
	]

# ── Support (8) ────────────────────────────────────────
static func _support() -> Array:
	return [
		_u("Blood Shamans", SUP, 3, 3, 6, 5, 6, 7, 3, ["Blood Ritual", "Heal via Blood Drain"], 0, false, "", 1),
		_u("Corruption Spreaders", SUP, 0, 3, 6, 5, 6, 7, 3, ["Plague Censer", "Non-Combatant"], 0, false, "", 2),
		_u("Plague Apothecaries", SUP, 0, 3, 6, 5, 1, 7, 3, ["Intensify Corruption", "Non-Combatant"], 0, false, "", 1),
		_u("Thrall Masters", SUP, 3, 3, 6, 5, 1, 7, 2, ["Thrall Command"], 0, false, "", 1),
		_u("Hunger Priests", SUP, 0, 3, 6, 4, 1, 8, 3, ["Hunger Amplification", "Non-Combatant"], 0, false, "", 1),
		_u("Blood Collectors", SUP, 0, 3, 3, 5, 1, 5, 2, ["Blood Harvest", "Non-Combatant", "Expendable"], 0, false, "", 0),
		_u("Blight Weavers", SUP, 0, 3, 6, 4, 1, 8, 3, ["Create Corruption Zone", "Non-Combatant"], 0, false, "", 2),
		_u("Crimson Chanters", SUP, 0, 3, 6, 5, 1, 8, 3, ["Blood Song", "Rally Cry", "Non-Combatant"], 0, false, "", 1),
	]

# ── Scouts (6) ─────────────────────────────────────────
static func _scouts() -> Array:
	return [
		_u("Shadow Stalkers", SCT, 3, 3, 3, 8, 1, 4, 2, ["Thrall", "Blood Scent Scout", "Spotter"], 0, false, "", 0),
		_u("Tiger Scout Pack", SCT, 6, 3, 3, 9, 1, 6, 3, ["Corruption Spread", "Blood Scent Scout", "Pack Tactics"], 0, false, "", 1),
		_u("Corruption Scouts", SCT, 6, 3, 3, 8, 8, 5, 3, ["Corruption Spread", "Blood Scent Scout", "Shadow Meld"], 0, false, "", 1),
		_u("Blood Runners", SCT, 3, 2, 3, 10, 1, 4, 2, ["Thrall", "Expendable", "Blood Scent Scout"], 0, false, "", 0),
		_u("Nightveil Infiltrators", SCT, 9, 3, 6, 8, 1, 7, 4, ["Corruption Spread", "Shadow Meld", "Lurker Strike", "Mist Form"], 0, false, "", 1),
		_u("Blight Hound Pack", SCT, 6, 3, 3, 9, 1, 5, 3, ["Corruption Spread", "Blood Scent Scout"], 0, false, "", 1),
	]

# ── Artillery (5) ──────────────────────────────────────
static func _artillery() -> Array:
	return [
		_u("Plague Catapult Crew", ART, 12, 3, 9, 3, 24, 7, 5, ["Blast", "Corruption Spread", "Immobile"], 0, false, "", 1),
		_u("Blood Mortar Team", ART, 9, 3, 6, 4, 18, 7, 4, ["Blast", "Corruption Spread", "Indirect Fire"], 0, false, "", 1),
		_u("Corruption Spire Battery", ART, 15, 3, 9, 0, 24, 7, 6, ["Corruption Spread", "Predator Eyes", "Immovable"], 0, false, "", 2),
		_u("Bile Cannon Crew", ART, 15, 3, 6, 3, 10, 7, 5, ["Blast", "Corruption Spread", "Cone Attack"], 0, false, "", 2),
		_u("Plague Ballista Crew", ART, 12, 3, 6, 4, 20, 7, 4, ["Corruption Spread", "Anti-Large", "Predator Eyes"], 0, false, "", 1),
	]

# ── Specialists (7) ────────────────────────────────────
static func _specialists() -> Array:
	return [
		_u("Blood Champion", SPC, 15, 4, 9, 6, 1, 9, 5, ["Blood Duel", "Blood Drain", "Commander Bond"], 0, false, "", 2),
		_u("Tiger Alpha", SPC, 15, 4, 12, 7, 1, 9, 6, ["Alpha Roar", "Pack Tactics", "Terrifying"], 0, false, "", 2),
		_u("Plague Doctor", SPC, 6, 3, 6, 5, 1, 7, 3, ["Purge Corruption", "Inject Corruption"], 0, false, "", 1),
		_u("Midnight Assassin", SPC, 15, 3, 6, 7, 1, 7, 4, ["Shadow Meld", "Lurker Strike", "Assassination", "Mist Form"], 0, false, "", 1),
		_u("Hunger Wraith", SPC, 12, 6, 9, 6, 1, 10, 6, ["Corruption Aura", "Mist Form", "Ethereal", "Blood-Drunk"], 0, false, "", 2),
		_u("Feral Skinchanger", SPC, 12, 4, 9, 6, 1, 8, 5, ["Corruption Spread", "Shapeshift"], 0, false, "", 2),
		_u("Blood Hierophant", SPC, 0, 3, 6, 4, 6, 8, 4, ["Fragment Attunement", "Blood Tithe", "Non-Combatant"], 0, false, "", 1),
	]

# ── War Machines (11) ──────────────────────────────────
static func _war_machines() -> Array:
	return [
		_u("Crimson Behemoth", WM, 21, 5, 30, 6, 1, 10, 85, ["Corruption Aura", "Blood Drain", "Towering", "Terrifying", "Blood-Drunk"], 0, false, "", 3),
		_u("Plague Titan", WM, 24, 5, 36, 4, 1, 10, 95, ["Corruption Aura", "Towering", "Siege", "Terrifying", "Blood-Drunk", "Blight Regen"], 0, false, "", 4),
		_u("Blood Engine", WM, 18, 4, 24, 4, 12, 10, 80, ["Blood-Powered", "Blast", "Blood-Drunk"], 0, false, "", 2),
		_u("Corruption Colossus", WM, 15, 5, 27, 5, 8, 10, 85, ["Corruption Trail", "Corruption Spread", "Towering", "Blood-Drunk"], 0, false, "", 3),
		_u("Nightfang Dragon", WM, 24, 4, 33, 10, 12, 10, 100, ["Fly", "Silent Approach", "Corruption Breath", "Towering", "Terrifying", "Blood-Drunk"], 0, false, "", 4),
		_u("Bile Wurm", WM, 18, 4, 24, 6, 1, 10, 75, ["Burrow", "Corruption Spread", "Terrifying", "Blood-Drunk"], 0, false, "", 2),
		_u("Blood Harvester Juggernaut", WM, 18, 5, 27, 5, 1, 10, 80, ["Blood Drain", "Trample", "Siege", "Blood-Drunk"], 0, false, "", 2),
		_u("Elder Tiger Horror", WM, 21, 4, 30, 8, 1, 10, 85, ["Corruption Aura", "Supreme Alpha", "Pack Tactics", "Terrifying", "Blood-Drunk"], 0, false, "", 3),
		_u("Plague Broodmother", WM, 12, 4, 27, 3, 1, 10, 80, ["Spawn Thralls", "Corruption Aura", "Blood-Drunk"], 0, false, "", 2),
		_u("Shadow Leviathan", WM, 27, 4, 30, 7, 1, 10, 95, ["Corruption Aura", "Shadow Meld", "Mist Form", "Ambush", "Towering", "Terrifying", "Blood-Drunk"], 0, false, "", 4),
		_u("The Patriarch's Avatar", WM, 27, 6, 54, 5, 1, 10, 150, ["Corruption Aura", "Blood Harvest", "Apex Terror", "Massive", "Fearless", "Blood-Drunk"], 0, true, "", 5),
	]

# ── Helper: Nightfang includes corruption column ──────
static func _u(n: String, t: int, a: int, d: int, h: int, m: int, r: int,
		mo: int, p: int, sp: Array = [], c: int = 0,
		leg: bool = false, leg_cmdr: String = "", corr: int = 0) -> Dictionary:
	return {
		"name": n, "faction": FACTION_ENUM, "type": t,
		"atk": a, "def": d, "hp": h, "mov": m, "rng": r, "mor": mo,
		"pts": p, "cmd": c, "specials": sp,
		"corruption": corr, "flow": 0,
		"legendary": leg, "legendary_cmdr": leg_cmdr,
	}
