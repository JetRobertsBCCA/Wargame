class_name VeilboundShogunateData
## All Veilbound Shogunate unit definitions — 73 units total.
## Veilbound has a unique "flow" stat per unit.

const FACTION_ID = "veilbound_shogunate"
const FACTION_NAME = "Veilbound Shogunate"
const FACTION_ENUM = 4  # CombatantDefinition.Faction.VEILBOUND

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
		_u("The Shrouded Shogun", CMD, 18, 5, 45, 7, 6, 10, 29, ["Supreme command", "Stance mastery"], 10),
		_u("Masked Lord Kurohane", CMD, 18, 5, 36, 6, 3, 10, 26, ["Elite melee", "Bodyguard"], 9),
		_u("Elite Cmdr Asagiri", CMD, 15, 4, 27, 10, 6, 9, 22, ["Mobility", "Scouting"], 6),
		_u("Elite Cmdr Hoshimaru", CMD, 15, 5, 33, 6, 3, 10, 23, ["Infantry command", "Defense"], 8),
		_u("Ritual Cpt Akikaze", CMD, 15, 3, 27, 5, 6, 10, 19, ["Ritual Flow support"], 6),
		_u("Ritual Cpt Tsukihana", CMD, 15, 4, 27, 6, 6, 9, 20, ["Flow manipulation", "Healing"], 7),
		_u("Elite Cmdr Rengoku", CMD, 15, 4, 33, 8, 3, 10, 22, ["Aggressive cavalry", "Charges"], 8),
		_u("Elite Cmdr Yukimaru", CMD, 15, 4, 30, 9, 3, 10, 22, ["Fast strike", "Flanking"], 7),
		_u("Cmdr Hisame", CMD, 12, 3, 27, 8, 6, 9, 20, ["Ranged support", "Artillery"], 7),
		_u("Cmdr Midorikaze", CMD, 9, 4, 30, 6, 6, 10, 22, ["Healing", "Defensive support"], 7),
		_u("Cmdr Kagero", CMD, 18, 3, 24, 10, 3, 9, 19, ["Assassin", "Stealth"], 6),
		_u("Cmdr Tsuyukusa", CMD, 15, 4, 27, 7, 6, 9, 21, ["Versatile", "Balanced"], 7),
		_u("Cmdr Hoshikami", CMD, 12, 3, 27, 7, 6, 9, 19, ["Fragment specialist", "Sigils"], 7),
	]

# ── Infantry (16) ──────────────────────────────────────
static func _infantry() -> Array:
	return [
		_u("Shrine Wardens", INF, 6, 4, 6, 5, 1, 7, 3, ["Stance", "Objective Holders"], 0, false, "", 1),
		_u("Veiled Ashigaru", INF, 6, 3, 3, 5, 1, 6, 2, ["Stance", "Cavalry Screen"], 0, false, "", 1),
		_u("Mask Bearers", INF, 0, 3, 6, 5, 1, 8, 2, ["Stance", "Dread Aura", "Non-Combatant", "Temple Vow"], 0, false, "", 2),
		_u("Inkblade Initiates", INF, 6, 3, 3, 6, 1, 6, 2, ["Stance", "Duelist"], 0, false, "", 1),
		_u("Temple Defenders", INF, 6, 5, 9, 4, 1, 8, 3, ["Stance", "Shield Wall", "Brace"], 0, false, "", 1),
		_u("Starblade Samurai", INF, 12, 4, 6, 5, 1, 8, 4, ["Stance", "Revelation Mastery"], 0, false, "", 2),
		_u("Oni Mask Executioners", INF, 12, 3, 6, 6, 1, 8, 4, ["Stance", "Executioner", "Yokai Presence"], 0, false, "", 1),
		_u("Moonlit Duelists", INF, 9, 4, 6, 6, 1, 8, 3, ["Stance", "Riposte", "Samurai's Challenge"], 0, false, "", 2),
		_u("Lotus Ascetics", INF, 9, 4, 6, 5, 1, 8, 4, ["Stance", "Adaptive"], 0, false, "", 2),
		_u("Kintsugi Blademasters", INF, 12, 4, 12, 5, 1, 9, 5, ["Stance", "Kintsugi Rage", "Gold-Scarred"], 0, false, "", 1),
		_u("Spirit Javelin Skirmishers", INF, 6, 3, 6, 6, 10, 7, 3, ["Stance", "Skirmish", "Flank Bonus"], 0, false, "", 1),
		_u("Moonlit Wanderers", INF, 9, 3, 6, 6, 1, 7, 3, ["Stance", "Flowing Retreat", "Free Disengage"], 0, false, "", 1),
		_u("Spirit Wolf Packs", INF, 9, 3, 6, 7, 1, 7, 4, ["Stance", "Pack Tactics", "Flank Bonus"], 0, false, "", 2),
		_u("Void Serpent Harriers", INF, 9, 3, 6, 7, 1, 7, 4, ["Stance", "Serpent Strike", "Phase"], 0, false, "", 2),
		_u("Hollow Lord Phalanx", INF, 12, 5, 15, 5, 1, 9, 6, ["Stance", "Transformation Catalyst", "Momentum Engine"], 0, false, "", 3),
		_u("Inkblade Masters", INF, 12, 4, 9, 5, 1, 8, 5, ["Stance", "Commander Bond", "Samurai's Challenge", "Master Swordsman"], 0, false, "", 2),
	]

# ── Cavalry (10) ───────────────────────────────────────
static func _cavalry() -> Array:
	return [
		_u("Star Serpent Lancers", CAV, 12, 4, 6, 9, 1, 7, 5, ["Charge", "Momentum Chain"], 0, false, "", 2),
		_u("Lunar Kitsune Riders", CAV, 9, 4, 6, 9, 1, 8, 5, ["Illusion", "Misdirect"], 0, false, "", 2),
		_u("Crimson Oni Riders", CAV, 15, 4, 9, 8, 1, 8, 6, ["Charge", "Yokai Presence", "Formation Breaker"], 0, false, "", 1),
		_u("Void Crane Riders", CAV, 12, 4, 9, 10, 1, 7, 6, ["Spirit Glide", "Spirit Descent", "Samurai's Challenge"], 0, false, "", 2),
		_u("Thunder Kirin Cavalry", CAV, 9, 4, 6, 9, 1, 7, 5, ["Momentum Strike", "Cascading Thunder"], 0, false, "", 2),
		_u("Dreambound Riders", CAV, 12, 4, 12, 10, 1, 8, 7, ["Dream Walk", "Dream Step", "Momentum Strike"], 0, false, "", 3),
		_u("Shrine Lion Riders", CAV, 9, 4, 9, 8, 1, 8, 5, ["Momentum Strike", "Guardian Aura", "Shrine Oath"], 0, false, "", 1),
		_u("Spirit Wolf Hunters", CAV, 9, 3, 9, 9, 1, 7, 5, ["Pack Tactics", "Momentum Strike"], 0, false, "", 2),
		_u("Eclipse Manta Riders", CAV, 12, 3, 6, 10, 6, 7, 6, ["Spirit Glide", "Suppression", "Flowing Retreat"], 0, false, "", 2),
		_u("Spirit Dragon Cohort", CAV, 9, 4, 6, 9, 1, 8, 5, ["Momentum Strike", "Cavalry Amplifier", "Dragon Bond"], 0, false, "", 3),
	]

# ── Support (7) ────────────────────────────────────────
static func _support() -> Array:
	return [
		_u("Banner of Silent Prayer", SUP, 0, 3, 6, 5, 1, 8, 2, ["Inspiring", "Flow Amplifier", "Non-Combatant", "Temple Vow"], 0, false, "", 2),
		_u("Spirit Healer Monks", SUP, 0, 4, 9, 5, 1, 8, 3, ["Heal", "Non-Combatant", "Temple Vow", "Flow Healer"], 0, false, "", 3),
		_u("Flow Adepts", SUP, 3, 3, 6, 5, 1, 7, 3, ["Flow Amplifier", "Ritual Surge"], 0, false, "", 4),
		_u("Shrine Artificers", SUP, 3, 3, 6, 5, 1, 7, 3, ["Construct Spirit Wall", "Spirit Trap"], 0, false, "", 2),
		_u("Lantern Bearers", SUP, 3, 3, 3, 5, 1, 8, 2, ["Lantern Light", "Inspiring"], 0, false, "", 1),
		_u("Ink Sigil Crafters", SUP, 3, 3, 6, 5, 12, 7, 3, ["Sigil of Binding", "Sigil of Weakness"], 0, false, "", 2),
		_u("Phantom Ward Constructs", SUP, 0, 5, 15, 0, 1, 10, 5, ["Immovable", "Phantom Shield", "Non-Combatant", "Temple Vow"], 0, false, "", 2),
	]

# ── Scouts (4) ─────────────────────────────────────────
static func _scouts() -> Array:
	return [
		_u("Ink Dragon Scouts", SCT, 6, 3, 6, 9, 8, 7, 4, ["Spirit Sight Patrol", "Flowing Retreat"], 0, false, "", 1),
		_u("Ink Shadow Scouts", SCT, 6, 3, 3, 8, 1, 7, 3, ["Spirit Sight Patrol", "Ink Shadow Cloak", "Disruption"], 0, false, "", 1),
		_u("Ink Messengers", SCT, 3, 2, 3, 10, 1, 6, 2, ["Stance", "Swift", "Spirit Mark", "Fragile"], 0, false, "", 0),
		_u("Spirit Tracker Pack", SCT, 6, 3, 6, 8, 1, 7, 3, ["Stance", "Spirit Sight", "Pack Hunter", "All-Terrain"], 0, false, "", 0),
	]

# ── Artillery (4) ──────────────────────────────────────
static func _artillery() -> Array:
	return [
		_u("Dreampiercer Archers", ART, 9, 3, 6, 5, 20, 7, 4, ["Phase Arrows", "Disorientation"], 0, false, "", 1),
		_u("Void Bolt Crossbowmen", ART, 12, 3, 6, 4, 16, 7, 4, ["Armor Piercing", "Heavy"], 0, false, "", 1),
		_u("Celestial Slingers", ART, 9, 3, 6, 5, 14, 7, 4, ["Blast", "Flow Infused"], 0, false, "", 2),
		_u("Shadow Marksmen", ART, 9, 3, 6, 5, 22, 8, 5, ["Sharpshot", "Sniper", "Commander Hunter"], 0, false, "", 2),
	]

# ── Specialists (8) ────────────────────────────────────
static func _specialists() -> Array:
	return [
		_u("Silent Ink Assassins", SPC, 9, 3, 6, 7, 1, 7, 4, ["Ink Shadow Cloak", "Phase", "Assassin"], 0, false, "", 1),
		_u("Ritual Captains", SPC, 6, 4, 9, 5, 1, 9, 5, ["Flow Nexus", "Ritual Command", "Commander Bond"], 0, false, "", 5),
		_u("Spirit Monolith", SPC, 0, 6, 18, 0, 1, 10, 6, ["Immovable", "Zone of Power", "Blocks Movement", "Non-Combatant", "Temple Vow"], 0, false, "", 4),
		_u("Veilbound Sigil Bearers", SPC, 6, 3, 6, 5, 1, 7, 3, ["Sigil of Dread", "Terror Aura"], 0, false, "", 3),
		_u("Hollow Shrine Guardians", SPC, 9, 4, 9, 4, 1, 9, 5, ["Terror Aura", "Slow Aura", "Void Resolve"], 0, false, "", 3),
		_u("Lotus Phantom Assassins", SPC, 12, 3, 6, 7, 1, 8, 5, ["Dream Walk", "Teleport", "Assassin"], 0, false, "", 3),
		_u("Shrouded Shogun Vassals", SPC, 15, 5, 12, 5, 1, 10, 6, ["Shogun Only", "Bodyguard", "Void Resolve", "Elite"], 0, false, "", 5),
		_u("Masked Lord Retinue", SPC, 12, 4, 9, 5, 1, 9, 5, ["Commander Bond", "Shrine Oath", "Retinue Synergy"], 0, false, "", 4),
	]

# ── War Machines (11) ──────────────────────────────────
static func _war_machines() -> Array:
	return [
		_u("Shrine Dragon", WM, 24, 5, 36, 6, 8, 10, 100, ["Spirit Glide", "Dragon Breath", "Terrifying", "Void Resolve"], 0, false, "", 3),
		_u("Walking Torii Gate", WM, 12, 6, 30, 4, 1, 10, 75, ["Immovable after deploy", "Stance", "Gate Anchor", "Void Resolve"], 0, false, "", 4),
		_u("Komainu Guardian Colossus", WM, 18, 5, 30, 5, 1, 10, 85, ["Guardian Aura", "Terrifying", "Void Resolve"], 0, false, "", 2),
		_u("Spirit Temple Walker", WM, 15, 4, 24, 5, 6, 10, 70, ["Flow Beacon", "Heal", "Void Resolve"], 0, false, "", 4),
		_u("Hollow Ronin Construct", WM, 18, 4, 24, 6, 1, 10, 80, ["Stance", "Kintsugi Rage", "Berserker", "Void Resolve"], 0, false, "", 2),
		_u("Celestial Ink Dragon", WM, 21, 4, 30, 8, 10, 10, 95, ["Spirit Glide", "Ink Breath", "Void Resolve"], 0, false, "", 3),
		_u("Eclipse Manta Titan", WM, 18, 4, 30, 10, 6, 10, 90, ["Spirit Glide", "Knockback Wave", "Suppression", "Void Resolve"], 0, false, "", 2),
		_u("Lotus Ascendant Monolith", WM, 9, 5, 24, 0, 1, 10, 65, ["Bloom", "Flow Beacon", "Immovable", "Void Resolve"], 0, false, "", 5),
		_u("Veilbound Oni Juggernaut", WM, 27, 4, 36, 5, 1, 10, 95, ["Devastating Charge", "Terror Aura", "Void Resolve", "Rampage"], 0, false, "", 3),
		_u("Shrouded Throne Entity", WM, 15, 5, 36, 0, 8, 10, 90, ["Reality Distortion", "Flow Nexus", "Void Resolve", "Immovable"], 0, false, "", 5),
		_u("Celestial Shogun Construct", WM, 27, 7, 54, 5, 6, 10, 150, ["Stance", "Ancestral Resonance", "Celestial Blade", "Spirit Shield", "Flow Surge", "Massive", "Fearless"], 0, true, "", 3),
	]

# ── Helper: Veilbound includes flow column ─────────────
static func _u(n: String, t: int, a: int, d: int, h: int, m: int, r: int,
		mo: int, p: int, sp: Array = [], c: int = 0,
		leg: bool = false, leg_cmdr: String = "", flow: int = 0) -> Dictionary:
	return {
		"name": n, "faction": FACTION_ENUM, "type": t,
		"atk": a, "def": d, "hp": h, "mov": m, "rng": r, "mor": mo,
		"pts": p, "cmd": c, "specials": sp,
		"corruption": 0, "flow": flow,
		"legendary": leg, "legendary_cmdr": leg_cmdr,
	}
