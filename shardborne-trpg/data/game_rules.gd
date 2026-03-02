extends Node
## GameRules — Autoload singleton containing all Shardborne rules constants.
## Access via: GameRules.BATTLE_SIZES, GameRules.COMBAT_MODIFIERS, etc.

# ══════════════════════════════════════════════════════════════
# BATTLE SIZE CONFIGURATIONS
# ══════════════════════════════════════════════════════════════

const BATTLE_SIZES = {
	"skirmish": {
		"points_min": 50, "points_max": 100, "points_default": 75,
		"min_units": 5, "max_units": 20, "max_war_machines": 1,
		"table_size": "30x30", "recommended_turns": 5,
		"max_fragments": 2, "max_anchors": 4, "max_gossamer_traps": 3,
		"artillery_range_cap": 10,
		"scout_forward_deploy": 4,
		"hunger_thresholds": {"peckish": 3, "ravenous": 6, "gorged": 10},
	},
	"standard": {
		"points_min": 200, "points_max": 300, "points_default": 250,
		"min_units": 15, "max_units": 30, "max_war_machines": 3,
		"table_size": "48x48", "recommended_turns": 6,
		"max_fragments": 3, "max_anchors": 6, "max_gossamer_traps": 5,
		"artillery_range_cap": -1,
		"scout_forward_deploy": 8,
		"hunger_thresholds": {"peckish": 5, "ravenous": 10, "gorged": 15},
	},
	"epic": {
		"points_min": 500, "points_max": 9999, "points_default": 500,
		"min_units": 30, "max_units": 60, "max_war_machines": 6,
		"table_size": "60x72", "recommended_turns": 7,
		"max_fragments": 5, "max_anchors": 10, "max_gossamer_traps": 8,
		"artillery_range_cap": -1,
		"scout_forward_deploy": 8,
		"hunger_thresholds": {"peckish": 8, "ravenous": 15, "gorged": 25},
	},
}

# ══════════════════════════════════════════════════════════════
# TURN STRUCTURE
# ══════════════════════════════════════════════════════════════

const PHASES = ["Command", "Movement", "Combat", "End"]

const PHASE_DESCRIPTIONS = {
	"Command": "Generate CP, draw 2 cards (hand limit 7), play Command/Fragment cards. Calculate faction bonuses.",
	"Movement": "Activate each unit one at a time. Move up to MOV stat. Difficult terrain costs double. Charging: 5\"+ straight = +1 ATK.",
	"Combat": "Ranged first, then melee. Roll ATK dice vs DEF. 6s = critical (2 damage). Destroyed units are removed immediately.",
	"End": "Morale checks for damaged units. Rally Shaken units. Score objectives. Cleanup effects. Discard to hand limit.",
}

const STARTING_CP = 3
const STARTING_HAND_SIZE = 5
const DRAW_PER_TURN = 2
const MAX_HAND_SIZE = 7
const DECK_SIZE = 15
const CARD_POOL_SIZE = 20
const MAX_COPIES_PER_CARD = 2
const MIN_CARDS_PER_TYPE = 2  # At least 2 of each type (Command, Tech, Fragment, Tactical)

# ══════════════════════════════════════════════════════════════
# COMBAT RESOLUTION
# ══════════════════════════════════════════════════════════════

## Roll ATK d6s. Each die >= target DEF = 1 hit (1 damage).
## Natural 6 = critical: always hits, deals 2 damage, ignores defense cards.
const CRITICAL_VALUE = 6
const MELEE_RANGE = 1
const CHARGE_DISTANCE = 5  # Must move 5+ tiles in straight line
const ENGAGEMENT_RANGE = 1  # Within 1" = engaged

const COMBAT_MODIFIERS = {
	"flanking":        {"atk_mod": 1, "def_mod": 0, "description": "Flanking (90°+ angle from front): +1 ATK die"},
	"rear":            {"atk_mod": 2, "def_mod": 0, "description": "Rear attack (behind target facing): +2 ATK dice"},
	"light_cover":     {"atk_mod": 0, "def_mod": 1, "description": "Light cover: +1 DEF vs ranged"},
	"heavy_cover":     {"atk_mod": 0, "def_mod": 2, "description": "Heavy cover: +2 DEF vs ranged"},
	"elevated":        {"atk_mod": 1, "def_mod": 0, "description": "Elevated attacker (ranged): +1 ATK die"},
	"charging":        {"atk_mod": 1, "def_mod": 0, "description": "Charging (moved 5\"+ toward target): +1 ATK die (melee)"},
	"diving_charge":   {"atk_mod": 2, "def_mod": 0, "description": "Diving charge (flying unit from above): +2 ATK dice"},
	"shaken":          {"atk_mod": -1, "def_mod": 0, "description": "Unit is Shaken: -1 ATK die (min 1)"},
	"grid_active":     {"atk_mod": 1, "def_mod": 0, "description": "Grid Active (Iron Dominion, 2+ allies within 4\"): +1 ATK"},
	"grid_fortified":  {"atk_mod": 1, "def_mod": 1, "description": "Grid Fortified (3+ allies incl. Support): +1 ATK +1 DEF"},
	"isolated":        {"atk_mod": -1, "def_mod": 0, "description": "Isolated (Iron Dominion, 0 allies within 4\"): -1 ATK"},
	"honor_stance":    {"atk_mod": -1, "def_mod": 1, "description": "Honor Stance (Veilbound): +1 DEF, -1 ATK, no flanking"},
	"revelation_stance": {"atk_mod": 1, "def_mod": -1, "description": "Revelation Stance (Veilbound): +1 ATK, -1 DEF"},
	"commander_aura":  {"atk_mod": 0, "def_mod": 0, "description": "Commander Aura (within 8\"): +1 MOR to friendlies"},
}

# ══════════════════════════════════════════════════════════════
# MORALE
# ══════════════════════════════════════════════════════════════

## Roll 2d6. If result > MOR: Shaken or Routed/destroyed.
const MORALE_ROUTED_THRESHOLD = 3  # Fail by 3+ = Routed (destroyed)

enum MoraleResult { PASSED, SHAKEN, ROUTED, RALLIED }

static func roll_morale(mor: int) -> Dictionary:
	var d1 = randi_range(1, 6)
	var d2 = randi_range(1, 6)
	var total = d1 + d2
	var result: MoraleResult
	var margin = total - mor
	if total <= mor:
		result = MoraleResult.PASSED
	elif margin < MORALE_ROUTED_THRESHOLD:
		result = MoraleResult.SHAKEN
	else:
		result = MoraleResult.ROUTED
	return {"d1": d1, "d2": d2, "total": total, "mor": mor, "result": result, "margin": margin}

# ══════════════════════════════════════════════════════════════
# ARMY COMPOSITION RULES
# ══════════════════════════════════════════════════════════════

const MAX_UNIT_COPIES = 3              # Max 3 copies of any single unit type
const SPECIALIST_BUDGET_PERCENT = 0.25  # Max 25% of total pts
const SUPPORT_BUDGET_PERCENT = 0.25     # Max 25% of total pts
const INFANTRY_PER_50_POINTS = 1        # At least 1 Infantry per 50 pts

# ══════════════════════════════════════════════════════════════
# FACTION MECHANICS — EMBERCLAW HEAT POOL
# ══════════════════════════════════════════════════════════════

const HEAT_MAX = 15
const HEAT_COOLDOWN_PER_TURN = 3
const HEAT_OVERHEAT_RESET = 10

const HEAT_COSTS = {
	"superheated_strikes": 2,  # +1 damage per hit this turn
	"extra_breath": 3,         # Use Breath Weapon a second time
	"thermal_updraft": 4,      # Flying units +2 MOV, +1 ATK
	"firestorm": 5,            # 4" radius fire attack, creates burning terrain
}

const HEAT_GENERATION = {
	"fire_unit": 1,            # Each Fire keyword unit per Command Phase
	"breath_weapon": 2,        # After each Breath Weapon attack
	"drake_bond_pair": 1,      # Bonded pair activating within 8"
	"fire_kill": 1,            # Kill with Fire attack
}

# ══════════════════════════════════════════════════════════════
# FACTION MECHANICS — IRON DOMINION GRID COHESION
# ══════════════════════════════════════════════════════════════

const GRID_RANGE = 4  # Tiles within which allies count for Grid
const GRID_TIERS = {
	"isolated":  {"allies": 0, "atk_mod": -1, "def_mod": 0},
	"connected": {"allies": 1, "atk_mod": 0,  "def_mod": 0},
	"active":    {"allies": 2, "atk_mod": 1,  "def_mod": 0},
	"fortified": {"allies": 3, "atk_mod": 1,  "def_mod": 1},  # Requires 1+ Support
}

const FRAGMENT_INSTABILITY = {
	"low":       {"cost": 1, "threshold": 1},     # Backfire on d6 roll of 1
	"medium":    {"cost": 2, "threshold": 2},     # Backfire on 1-2
	"high":      {"cost": 3, "threshold": 3},     # Backfire on 1-3
	"very_high": {"cost": 4, "threshold": 4},     # Backfire on 1-4
}

# ══════════════════════════════════════════════════════════════
# FACTION MECHANICS — NIGHTFANG CORRUPTION
# ══════════════════════════════════════════════════════════════

const MAX_CORRUPTION_TOKENS = 9

const CORRUPTION_THRESHOLDS = {
	"clean":     {"tokens": 0, "atk_mod": 0,  "def_mod": 0,  "mor_mod": 0},
	"tainted":   {"tokens": 3, "atk_mod": -1, "def_mod": 0,  "mor_mod": -1},
	"corrupted": {"tokens": 6, "atk_mod": -2, "def_mod": -1, "mor_mod": -2},
	"consumed":  {"tokens": 9, "atk_mod": -3, "def_mod": -2, "mor_mod": -3},
	# Consumed also: roll d6 at turn start — on 1-2, unit cannot act
}

const BLOOD_TITHE = {
	"unit_cost": 1,       # Sacrifice 1 HP
	"unit_bonus_atk": 1,  # Gain +1 ATK die
	"commander_cost": 2,  # Sacrifice 2 HP
	"commander_draw": 1,  # Draw 1 card
}

# ══════════════════════════════════════════════════════════════
# FACTION MECHANICS — VEILBOUND RITUAL FLOW
# ══════════════════════════════════════════════════════════════

const FLOW_MAX = 40

const FLOW_THRESHOLDS = {
	"stirring":    {"flow": 5,  "effect": "Unlock Tier 1 Flow abilities"},
	"surging":     {"flow": 12, "effect": "Unlock Tier 2. All Veilbound +1 MOR"},
	"overflowing": {"flow": 20, "effect": "Unlock Tier 3. Commander plays 1 free card/turn"},
	"ascendant":   {"flow": 30, "effect": "Unlock Tier 4. All Veilbound +1 ATK. Transformations available"},
}

const STANCES = {
	"honor":      {"atk_mod": -1, "def_mod": 1, "extra": "Cannot be flanked"},
	"revelation": {"atk_mod": 1, "def_mod": -1, "extra": "+1 Ritual Flow this turn"},
}

# ══════════════════════════════════════════════════════════════
# FACTION MECHANICS — THORNWEFT WEB-ANCHOR NETWORK
# ══════════════════════════════════════════════════════════════

const ANCHOR_RANGE = 8        # Tiles — bonus calculation range
const ANCHOR_TELEPORT_RANGE = 4  # Must be within 4" of an Anchor to teleport
const MAX_TELEPORTS_PER_TURN = 3
const STARTING_ANCHORS = 2
const MAX_FATE_THREADS_PER_TURN = 2

const WEB_TIERS = {
	"severed":   {"anchors": 0, "atk_mod": -1, "def_mod": 0, "mor_mod": -1},
	"threaded":  {"anchors": 1, "atk_mod": 0,  "def_mod": 0, "mor_mod": 0},
	"woven":     {"anchors": 2, "atk_mod": 0,  "def_mod": 1, "mor_mod": 0},
	"enthroned": {"anchors": 3, "atk_mod": 1,  "def_mod": 1, "mor_mod": 0},
}

const FATE_THREAD_COSTS = {
	"force_reroll_hit": 1,     # Force enemy to reroll 1 successful hit
	"grant_reroll_miss": 1,    # Grant friendly reroll on 1 failed hit
	"force_reroll_morale": 2,  # Force enemy to reroll Morale check
	"negate_card": 3,          # Negate enemy card effect
}

# ══════════════════════════════════════════════════════════════
# TERRAIN TYPES
# ══════════════════════════════════════════════════════════════

const TERRAIN_TYPES = {
	"open":            {"cost": 1, "cover": 0, "blocks_los": false},
	"difficult":       {"cost": 2, "cover": 0, "blocks_los": false},
	"light_cover":     {"cost": 1, "cover": 1, "blocks_los": false},
	"heavy_cover":     {"cost": 2, "cover": 2, "blocks_los": false},
	"impassable":      {"cost": -1, "cover": 0, "blocks_los": true},
	"elevated":        {"cost": 2, "cover": 1, "blocks_los": false},
	"burning":         {"cost": 1, "cover": 0, "blocks_los": false, "damage": 1, "duration": 2},
	"web":             {"cost": 1, "cover": 0, "blocks_los": false},  # Impassable for enemies
	"gossamer_trap":   {"cost": -1, "cover": 0, "blocks_los": false},  # Impassable for enemies
	"corruption_zone": {"cost": 1, "cover": 0, "blocks_los": false, "corruption_per_turn": 1},
}

# ══════════════════════════════════════════════════════════════
# SCENARIOS
# ══════════════════════════════════════════════════════════════

const SCENARIOS = {
	"king_of_the_hill": {
		"name": "King of the Hill",
		"description": "Control the center objective for 2 VP per turn. Side objectives worth 1 VP each.",
		"objectives": {"center": 2, "sides": 1},
	},
	"shardstorm": {
		"name": "Shardstorm",
		"description": "Fragment shards rain each turn. Collect fragments for bonus VP.",
		"objectives": {"kill": 1, "fragment": 2},
	},
	"the_last_stand": {
		"name": "The Last Stand",
		"description": "Player 1 defends 3 objectives. Player 2 must capture 2 of 3 by Turn 5.",
		"objectives": {"defender_hold": 2, "attacker_capture": 2},
	},
	"total_war": {
		"name": "Total War",
		"description": "All-out conflict. Unit kill = 1 VP, Commander kill = 5 VP.",
		"objectives": {"unit_kill": 1, "commander_kill": 5},
	},
	"supply_lines": {
		"name": "Supply Lines",
		"description": "4 supply caches along centerline. Each controlled = +1 CP per turn.",
		"objectives": {"cache_count": 4, "cp_bonus": 1},
	},
	"broken_ground": {
		"name": "Broken Ground",
		"description": "Devastated field. 5 objectives, 1 VP each per turn controlled.",
		"objectives": {"objective_count": 5, "vp_per_turn": 1},
	},
}

# ══════════════════════════════════════════════════════════════
# STATUS EFFECTS
# ══════════════════════════════════════════════════════════════

const STATUS_EFFECTS = {
	"shaken":    {"atk_mod": -1, "description": "−1 ATK die. Must rally in Command Phase."},
	"engaged":   {"description": "Cannot shoot. Cannot move away freely (must Disengage)."},
	"stealthed": {"description": "Hidden from ranged attacks beyond 8\"."},
	"activated": {"description": "Has acted this turn."},
	"fearless":  {"description": "Auto-pass all Morale checks."},
	"vengeful":  {"atk_mod": 2, "mov_mod": 2, "description": "+2 ATK, +2 MOV, Fearless. (Drake Bond survivor)"},
	"grounded":  {"mor_mod": -2, "description": "Flying unit forced to land. -2 MOR until next turn."},
	"burning":   {"damage_per_turn": 1, "description": "Takes 1 damage at start of turn."},
}

# ══════════════════════════════════════════════════════════════
# KEYWORD GLOSSARY
# ══════════════════════════════════════════════════════════════

const KEYWORDS = {
	"Fly": "Unit can move over terrain and other units. Ignores terrain movement costs.",
	"Fire Resistant": "Takes half damage from Fire attacks (round down, min 1).",
	"Fire Immune": "Takes no damage from Fire attacks.",
	"Fearless": "Automatically passes all Morale checks.",
	"Stubborn": "+2 MOR when defending an objective.",
	"Stealth": "Cannot be targeted by ranged attacks beyond 8\" unless revealed.",
	"Scout": "Deploy up to 8\" ahead of deployment zone (4\" in Skirmish).",
	"Indirect Fire": "Can attack without line of sight. -1 ATK die if no spotter.",
	"Blast": "Hits all units in a radius around the impact point.",
	"Siege": "Deals double damage to structures and fortifications.",
	"Grid Node": "Counts for Iron Dominion Grid Cohesion calculations.",
	"Grid Anchor": "Counts as 2 units for Grid Cohesion. War Machine keyword.",
	"Corruption Spread": "Applies corruption tokens on melee hit (per corruption_spread stat).",
	"Blood Drain": "On kill, heal 1 HP.",
	"Pack Tactics": "+1 ATK when 2+ friendly Pack Tactics units within 3\".",
	"Web-Walk": "Can move through Web and Gossamer Trap terrain as open ground.",
	"Silk Camouflage": "Stealth while within 8\" of Web-Anchor.",
	"Venom Strike": "Applies venom tokens on hit (acts like corruption for Thornweft thematic).",
	"Wall-Climber": "Can traverse vertical surfaces as normal movement.",
	"Stance": "Can switch between Honor and Revelation stance (Veilbound).",
	"Momentum Strike": "+1 ATK on charge attack.",
	"Spirit Glide": "Flying movement. Ignores terrain.",
	"Terror": "Enemies within 6\" suffer -1 MOR.",
	"Towering": "May be targeted from beyond normal LoS. Provides cover to adjacent allies.",
	"Massive": "Cannot be knocked back. Immune to instant-kill effects.",
	"Thrall": "Expendable unit. Does not count for Morale cascade.",
	"Expendable": "When destroyed, nearby allies do not need to test Morale.",
	"Breath Weapon": "Cone attack that hits all units in area. Ignores cover.",
	"Drake Bond": "Paired with a Drake unit. Share wounds when within 8\".",
	"Blood-Drunk": "+1 ATK when below half HP.",
	"Mist Form": "Can pass through units and non-impassable terrain. +1 DEF.",
	"Shadow Meld": "Stealth in any terrain that provides cover.",
	"Void Resolve": "Immune to Fear and Terror effects.",
	"Temple Vow": "Cannot be forced to move by enemy abilities.",
	"Non-Combatant": "Cannot make attacks. Dedicated support role.",
}

# ══════════════════════════════════════════════════════════════
# UTILITY FUNCTIONS
# ══════════════════════════════════════════════════════════════

## Roll N d6 dice, return array of results
func roll_dice(count: int) -> Array[int]:
	var results: Array[int] = []
	for i in range(count):
		results.append(randi_range(1, 6))
	return results

## Resolve an attack: ATK dice vs DEF, with modifiers
func resolve_attack(atk_dice: int, target_def: int, modifiers: Array[String] = []) -> Dictionary:
	var atk_mod := 0
	var def_mod := 0
	for mod_key in modifiers:
		if mod_key in COMBAT_MODIFIERS:
			atk_mod += COMBAT_MODIFIERS[mod_key]["atk_mod"]
			def_mod += COMBAT_MODIFIERS[mod_key]["def_mod"]
	var final_atk = maxi(1, atk_dice + atk_mod)
	var final_def = maxi(2, target_def + def_mod)
	var rolls = roll_dice(final_atk)
	var hits := 0
	var crits := 0
	for roll in rolls:
		if roll == CRITICAL_VALUE:
			crits += 1
			hits += 1
		elif roll >= final_def:
			hits += 1
	var total_damage = hits + crits
	return {
		"rolls": rolls, "hits": hits, "crits": crits,
		"total_damage": total_damage,
		"atk_dice": final_atk, "target_def": final_def,
		"modifiers": modifiers
	}
